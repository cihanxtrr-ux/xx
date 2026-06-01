/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, KeyRound, ArrowRight, UserCheck } from 'lucide-react';
import MathCaptchaCheckbox from '../components/MathCaptchaCheckbox';

const LOCAL_T = {
  en: {
    title: "Client Portal Credentials",
    subtitle: "Authorized Operator Login",
    desc: "Access your X Elektrik bidding queue, BIM documents, IoT grid telemetry, and current project RFPs.",
    emailLabel: "Operator Email (Active Signature)",
    emailPlaceholder: "name@company.com",
    passwordLabel: "Decryption Key / Password",
    passwordPlaceholder: "Enter security password",
    rememberMe: "Remember active token selection",
    forgotPass: "Recover lost signoff key?",
    signInBtn: "Initialize Secured Connection",
    noAccount: "New operator?",
    registerPrompt: "Register Security Signature",
    demoFiller: "Auto-Fill Client Demo Credentials",
    generalError: "Decryption protocol failed. Verify credentials.",
    successMsg: "Grid connection authorized. Routing to node...",
    secNotice: "This machine logs active sessions under ISO/IEC 27001 network monitoring directives.",
  },
  tr: {
    title: "Müşteri Portalı Girişi",
    subtitle: "Yetkili Operatör Girişi",
    desc: "X Elektrik teklif kuyruğunuza, BIM belgelerinize, IoT şebeke telemetrilerinize ve aktif proje taleplerinize erişin.",
    emailLabel: "Operatör E-posta Adresi (Aktif İmza)",
    emailPlaceholder: "isim@sirket.com",
    passwordLabel: "Şifre Çözme Anahtarı / Şifre",
    passwordPlaceholder: "Güvenlik şifrenizi girin",
    rememberMe: "Aktif token seçimini hatırla",
    forgotPass: "Şifre anahtarını mı kaybettiniz?",
    signInBtn: "Güvenli Bağlantıyı Başlat",
    noAccount: "Yeni operatör müsünüz?",
    registerPrompt: "Güvenlik İmzası Oluşturun",
    demoFiller: "Müşteri Demo Bilgilerini Doldur",
    generalError: "Şifre çözme başarısız. Bilgileri doğrulayın.",
    successMsg: "Şebeke bağlantısı onaylandı. Ana düğüme yönlendiriliyorsunuz...",
    secNotice: "Bu makine, ISO/IEC 27001 korumalı ağ izleme direktifleri uyarınca aktif oturumları kaydeder.",
  }
};

interface LoginProps {
  onNavigate: (path: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const { language, setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const t = LOCAL_T[language === 'tr' ? 'tr' : 'en'];

  const handleDemoFill = () => {
    setEmail('demosignature@xelectrik.com');
    setPassword('Hex-Voltage-Grid99');
    setErrorText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorText(language === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill out all fields.');
      return;
    }

    if (!isCaptchaVerified) {
      setErrorText(language === 'tr' ? 'Lütfen güvenlik doğrulamasını (X-CAPTCHA) tamamlayın.' : 'Please complete the physical security challenge (X-CAPTCHA).');
      return;
    }

    setIsSubmitting(true);
    setErrorText('');

    // Simulate authenticating against registered system locally
    setTimeout(() => {
      // If it's the demo filler or standard login check
      // For high fidelity, let's accept any login to make it extremely smooth to play with while saving their specific data!
      const userEmail = email.trim();
      const userName = userEmail.split('@')[0];
      const nameCapitalized = userName.charAt(0).toUpperCase() + userName.slice(1);

      // Try searching local persistence storage of registered users first
      const registeredUsersStr = localStorage.getItem('x_elektrik_registered_accounts');
      let matchedUser = null;
      if (registeredUsersStr) {
        try {
          const registeredUsers = JSON.parse(registeredUsersStr);
          matchedUser = registeredUsers.find((u: any) => u.email.toLowerCase() === userEmail.toLowerCase());
        } catch (e) {
          console.error(e);
        }
      }

      const verifiedUser = matchedUser || {
        name: nameCapitalized,
        email: userEmail,
        companyName: "Vertiv Systems Ltd",
        sector: "datacenter",
        phone: "+353 1 450 9400",
        createdAt: new Date().toISOString()
      };

      setCurrentUser(verifiedUser);
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
      className="max-w-md mx-auto px-4 py-12 text-left"
    >
      <div className="space-y-6">
        {/* Header Block */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-[#0012FF]/10 dark:bg-cyan-400/10 text-[#0012FF] dark:text-cyan-400 mb-2 border border-[#0012FF]/20 dark:border-cyan-400/20">
            <KeyRound className="h-6 w-6 stroke-[2]" />
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

        {/* Demo filler CTA */}
        <button
          type="button"
          onClick={handleDemoFill}
          className="w-full text-center py-2 px-3 rounded-xl border border-dashed border-[#0012FF]/30 dark:border-cyan-400/25 bg-[#0012FF]/5 dark:bg-cyan-400/5 hover:bg-[#0012FF]/10 dark:hover:bg-cyan-400/10 text-gray-850 dark:text-cyan-300 text-[11px] font-mono tracking-wide font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5"
          id="btn-demo-creds-fill"
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>{t.demoFiller}</span>
        </button>

        {/* Form elements */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all relative overflow-hidden">
          {/* Neon laser decorative line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0012FF] dark:via-cyan-400 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Operator Email */}
            <div className="space-y-1.5">
              <label className="text-[10.5px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10.5px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                  {t.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="text-[10px] text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 transition uppercase font-mono font-bold bg-transparent border-none p-0 cursor-pointer"
                >
                  {t.forgotPass}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                  className="w-full h-11 pl-11 pr-11 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 transition-all text-xs"
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

            {/* Captcha Verification */}
            <div className="pt-2">
              <MathCaptchaCheckbox onVerified={setIsCaptchaVerified} />
            </div>

            {/* Feedback items */}
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

            {/* Remember active token Selection */}
            <div className="flex items-center gap-2">
              <input
                id="remember-token-box"
                type="checkbox"
                defaultChecked
                className="accent-[#0012FF] dark:accent-cyan-450 h-3.5 w-3.5 border-gray-150 dark:border-white/10 bg-transparent rounded cursor-pointer"
              />
              <label htmlFor="remember-token-box" className="text-[10px] font-mono font-bold text-gray-450 dark:text-gray-400 select-none cursor-pointer">
                {t.rememberMe}
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-gray-950 dark:bg-cyan-400 hover:bg-white dark:hover:bg-transparent text-white dark:text-slate-950 hover:text-gray-955 dark:hover:text-cyan-400 border border-gray-955 dark:border-cyan-400 hover:border-gray-200 hover:shadow-xl rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <span>{isSubmitting ? 'INITIALIZING PROTOCOLS...' : t.signInBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Outer redirect block */}
        <div className="text-center font-mono text-[11px] font-bold text-gray-500 dark:text-gray-400">
          <span>{t.noAccount} </span>
          <button
            onClick={() => onNavigate('/register')}
            className="text-[#0012FF] dark:text-cyan-300 hover:underline bg-transparent border-0 cursor-pointer p-0 font-extrabold uppercase tracking-wide"
          >
            {t.registerPrompt}
          </button>
        </div>

        {/* Audit logging compliance notice */}
        <div className="text-center p-3 rounded-xl border border-gray-150/40 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex gap-2 items-start justify-center">
          <ShieldCheck className="h-4 w-4 text-[#0012FF] dark:text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-[9.5px] font-sans text-gray-450 dark:text-gray-500 max-w-xs text-left leading-normal">
            {t.secNotice}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
