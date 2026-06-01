/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, Building, User, Phone, Zap, ArrowRight, Server, Flame, Activity } from 'lucide-react';
import MathCaptchaCheckbox from '../components/MathCaptchaCheckbox';

const LOCAL_T = {
  en: {
    title: "Register Operator Signature",
    subtitle: "New Client Account Setup",
    desc: "Create an authorized operator profile to secure RFP bids, load static BIM templates, and access priority engineering support.",
    fullNameLabel: "Full Operator Name",
    fullNamePlaceholder: "John Doe",
    emailLabel: "Corporate Email Address",
    emailPlaceholder: "name@company.com",
    companyLabel: "Company / Contractor Name",
    companyPlaceholder: "Enterprise Infrastructure Ltd",
    phoneLabel: "Bidding Desk Phone Number (Optional)",
    phonePlaceholder: "+353 1 450 0000",
    sectorLabel: "Technical Grid / Focus Sector",
    sectorDesc: "Select the primary electrical infrastructure sector for custom tailored telemetry defaults.",
    passwordLabel: "Encryption Key / Password",
    passwordPlaceholder: "Create strong security password",
    agreeToTerms: "Agree to BIM Non-Disclosure and safety terms",
    signUpBtn: "Register Signature",
    hasAccount: "Already registered?",
    loginPrompt: "Authenticate Operator Credentials",
    generalError: "Registration protocol failed. Verify input syntax.",
    successMsg: "Authorized operator registered successfully. Opening panel...",
    secNotice: "Registered credentials will be written under standard client privacy NDA guidelines.",
  },
  tr: {
    title: "Operatör İmzası Kaydı",
    subtitle: "Yeni Müşteri Hesabı Kurulumu",
    desc: "RFP tekliflerini güvenceye almak, statik BIM şablonlarını yüklemek ve öncelikli mühendislik desteğine erişmek için yetkili bir operatör profili oluşturun.",
    fullNameLabel: "Operatörün Tam Adı",
    fullNamePlaceholder: "Ahmet Yılmaz",
    emailLabel: "Kurumsal E-posta Adresi",
    emailPlaceholder: "isim@sirket.com",
    companyLabel: "Şirket / Yüklenici Adı",
    companyPlaceholder: "Enterprise Altyapı Ltd.",
    phoneLabel: "Teklif Masası Telefon Numarası (Opsiyonel)",
    phonePlaceholder: "+90 212 300 0000",
    sectorLabel: "Teknik Şebeke / Odak Sektörü",
    sectorDesc: "Özel olarak uyarlanmış telemetri varsayılanları için birincil elektrik altyapısı sektörünü seçin.",
    passwordLabel: "Şifre Çözme Anahtarı / Şifre",
    passwordPlaceholder: "Güçlü güvenlik şifresi oluşturun",
    agreeToTerms: "BIM Gizlilik Anlaşması ve iş güvenliği şartlarını kabul ediyorum",
    signUpBtn: "İmzayı Kaydet",
    hasAccount: "Zaten kayıtlı mısınız?",
    loginPrompt: "Operatör Girişi Yapın",
    generalError: "Kayıt protokolü başarısız. Giriş biçimini doğrulayın.",
    successMsg: "Yetkili operatör başarıyla kaydedildi. Giriş paneli yükleniyor...",
    secNotice: "Kayıtlı bilgiler, standart müşteri gizliliği NDA direktifleri kapsamında güvence altına alınır.",
  }
};

const SECTORS = [
  { id: 'datacenter', labelEn: 'Data Center & Hyperscale Power', labelTr: 'Veri Merkezi ve Hiporölçekli Güç', descEn: 'Featuring N+1 redundancy feeds, heavy-duty UPS batteries, and cooling controls.', descTr: 'N+1 yedekli beslemeler, ağır hizmet UPS bataryaları ve soğutma kontrollerini içerir.' },
  { id: 'renewable', labelEn: 'Renewable Smart Grids & EV', labelTr: 'Yenilenebilir Akıllı Şebekeler ve EV', descEn: 'Featuring PV solar arrays, battery storage grid, and vehicle charging controllers.', descTr: 'PV güneş enerjisi dizileri, batarya depolama şebekesi ve araç şarj kontrolörlerini içerir.' },
  { id: 'industrial', labelEn: 'Heavy Industrial & Manufacturing', labelTr: 'Ağır Sanayi ve Üretim', descEn: 'Featuring 3-phase transformers, heavy busducts, and motor control centers (MCC).', descTr: '3 fazlı trafoları, ağır bara hatlarını ve motor kontrol merkezlerini (MCC) içerir.' },
  { id: 'commercial', labelEn: 'Commercial & Multi-Tenant Offices', labelTr: 'Ticari ve Çok Kiracılı Ofisler', descEn: 'Featuring grid-tied commercial feeds, panelboards, and smart building automations.', descTr: 'Şebekeye bağlı ticari beslemeleri, pano sistemlerini ve akıllı bina otomasyonlarını içerir.' },
];

interface RegisterProps {
  onNavigate: (path: string) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const { language, setCurrentUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('datacenter');
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const t = LOCAL_T[language === 'tr' ? 'tr' : 'en'];
  const selectedSectorObj = SECTORS.find(s => s.id === sector) || SECTORS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !companyName) {
      setErrorText(language === 'tr' ? 'Lütfen tüm zorunlu alanları doldurun.' : 'Please fill out all required fields.');
      return;
    }

    if (!isCaptchaVerified) {
      setErrorText(language === 'tr' ? 'Lütfen güvenlik doğrulamasını (X-CAPTCHA) tamamlayın.' : 'Please complete the microgrid verification (X-CAPTCHA).');
      return;
    }

    setIsSubmitting(true);
    setErrorText('');

    setTimeout(() => {
      const newUser = {
        name,
        email: email.trim(),
        companyName,
        sector,
        phone,
        createdAt: new Date().toISOString()
      };

      // Read registered users from storage and update them
      const registeredUsersStr = localStorage.getItem('x_elektrik_registered_accounts');
      let registeredUsers = [];
      if (registeredUsersStr) {
        try {
          registeredUsers = JSON.parse(registeredUsersStr);
        } catch (e) {
          console.error(e);
        }
      }

      // Check if user already exists
      const userExists = registeredUsers.some((u: any) => u.email.toLowerCase() === newUser.email.toLowerCase());
      if (userExists) {
        setErrorText(language === 'tr' ? 'Bu e-posta adresi zaten kayıtlı.' : 'This email address is already registered as an active operator.');
        setIsSubmitting(false);
        return;
      }

      registeredUsers.push(newUser);
      localStorage.setItem('x_elektrik_registered_accounts', JSON.stringify(registeredUsers));

      // Authenticate active session automatically
      setCurrentUser(newUser);
      setSuccessText(t.successMsg);
      setIsSubmitting(false);

      setTimeout(() => {
        onNavigate('/home');
      }, 1200);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto px-4 py-8 text-left"
    >
      <div className="space-y-6">
        {/* Header Block */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-[#0012FF]/10 dark:bg-cyan-400/10 text-[#0012FF] dark:text-cyan-400 mb-2 border border-[#0012FF]/20 dark:border-cyan-400/20">
            <Zap className="h-6 w-6 stroke-[2] animate-pulse" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#0012FF] dark:text-cyan-400 uppercase block">
            {t.subtitle}
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-gray-955 dark:text-white leading-tight">
            {t.title}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Registration Form */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0012FF] dark:via-cyan-400 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                    {t.fullNameLabel} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      required
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                    {t.companyLabel} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={t.companyPlaceholder}
                      required
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                    {t.emailLabel} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      required
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                    {t.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Focus Sector Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                  {t.sectorLabel}
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-155 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 transition-all text-xs"
                >
                  {SECTORS.map(s => (
                    <option key={s.id} value={s.id}>
                      {language === 'tr' ? s.labelTr : s.labelEn}
                    </option>
                  ))}
                </select>
                {/* Sector descriptive block */}
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-150/50 dark:border-white/5 space-y-1">
                  <span className="text-[9.5px] font-mono uppercase font-black text-[#0012FF] dark:text-cyan-400 block tracking-wide">
                    {language === 'tr' ? 'Varsayılan Şebeke Standartları' : 'Default Grid Standards'}
                  </span>
                  <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-snug">
                    {language === 'tr' ? selectedSectorObj.descTr : selectedSectorObj.descEn}
                  </p>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                  {t.passwordLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    required
                    className="w-full h-10 pl-10 pr-10 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              {/* Captcha Box */}
              <div className="pt-2">
                <MathCaptchaCheckbox onVerified={setIsCaptchaVerified} />
              </div>

              {/* Alerts */}
              {errorText && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 text-[11px] font-mono font-bold bg-rose-50 dark:bg-rose-950/20 border border-rose-250/30 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl"
                >
                  {errorText}
                </motion.div>
              )}

              {successText && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl"
                >
                  {successText}
                </motion.div>
              )}

              {/* Safety Terms agreement token box */}
              <div className="flex items-start gap-2">
                <input
                  id="safety-box-checkbox"
                  type="checkbox"
                  required
                  defaultChecked
                  className="accent-[#0012FF] dark:accent-cyan-450 h-3.5 w-3.5 border-gray-150 dark:border-white/10 bg-transparent rounded cursor-pointer mt-0.5"
                />
                <label htmlFor="safety-box-checkbox" className="text-[10px] font-mono font-bold text-gray-455 dark:text-gray-400 select-none cursor-pointer leading-tight">
                  {t.agreeToTerms}
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gray-950 dark:bg-cyan-400 hover:bg-white dark:hover:bg-transparent text-white dark:text-slate-950 hover:text-gray-955 dark:hover:text-cyan-400 border border-gray-955 dark:border-cyan-400 hover:border-gray-200 hover:shadow-xl rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <span>{isSubmitting ? 'VERIFYING SYSTEM PROTOCOLS...' : t.signUpBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom redirect link */}
        <div className="text-center font-mono text-[11px] font-bold text-gray-500 dark:text-gray-400">
          <span>{t.hasAccount} </span>
          <button
            onClick={() => onNavigate('/login')}
            className="text-[#0012FF] dark:text-cyan-300 hover:underline bg-transparent border-0 cursor-pointer p-0 font-extrabold uppercase tracking-wide"
          >
            {t.loginPrompt}
          </button>
        </div>

        {/* NDA security notice */}
        <div className="text-center p-3 rounded-xl border border-gray-150/40 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex gap-2 items-start justify-center">
          <ShieldCheck className="h-4 w-4 text-[#0012FF] dark:text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-[9.5px] font-sans text-gray-450 dark:text-gray-500 max-w-sm text-left leading-normal">
            {t.secNotice}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
