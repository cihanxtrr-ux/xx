/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  ShieldCheck, 
  Phone, 
  Clock, 
  Building2, 
  Network, 
  Users, 
  Award,
  Image as ImageIcon
} from 'lucide-react';

const localDict = {
  en: {
    tag: 'X ELEKTRIK MEDIA & PRESS HUB',
    title: 'Media Kit & Press Assets',
    desc: 'Approved corporate boilerplate blocks, primary operations coordinates, executive fact sheets, and accredited B2B media download vaults.',
    
    boilerplateTitle: 'Corporation Overview & Boilerplate',
    boilerplateDesc: 'Official ready-to-use description block of X Elektrik for publications, journals, and accredited media coverage.',
    boilerplateCopy: 'Copy Corporate Bio',
    boilerplateContent: 'Founded in 1998, X Elektrik is an acronym for safety-first heavy-duty power grid engineering and grid automation. The firm engineers, constructs, and deploys high-tension electrical substations, digital switchgears, containerized battery energy storage systems (BESS), and smart motor control panels. Serving critical industrial operations, hyper-scale datacenters, and national utilities, X Elektrik operates under a strict B2B security protocol with an industry-leading 0.00 TRIR safety rate.',
    
    factsTitle: 'X Elektrik Key Facts',
    factFounded: 'Founded',
    factOffices: 'Primary Coordinates',
    factOfficesValue: 'Dublin, Istanbul, Zurich',
    factSafety: 'Safety Record (TRIR)',
    factSafetyValue: '0.00 (Perfect Compliance)',
    factTarget: 'Market Focus',
    factTargetValue: 'High-Voltage Enterprise B2B only',
    
    mediaAssetsTitle: 'Downloadable Assets Vault',
    mediaAssetsDesc: 'Approved media resources, certified schematic templates, Revit family profiles, and vector catalog brochures.',
    assetLogoPack: 'Hi-Res Vector Logo Suite',
    assetLogoPackDesc: 'Includes SVG, PDF, and PNG icons in primary, reverse, and monochrome configurations.',
    assetBrochure: 'Product Catalog & Substation Profiles',
    assetBrochureDesc: 'Complete heavy-hardware lineup technical manual including MVS switchboard risers.',
    assetSchematic: 'Revit (BIM) CAD Blueprint Template',
    assetSchematicDesc: 'Standard BIM families with precise clearance boxes to construct mock system hallways.',
    assetPressSheet: 'Q2 2026 Executive Fact Sheet',
    assetPressSheetDesc: 'PDF briefing containing grid installation statistics, current capacity, and growth projections.',
    assetDownloadBtn: 'Download Asset',

    contactTitle: 'Media Relations & Inquiry Coordinate',
    contactDesc: 'Official channel for press inquiries, journalist interviews, standard panel inspection briefings, and media validation requests.',
    contactLabel: 'Communications Director Bureau',
    contactTime: 'Average Response Margin: < 12 Hours',
  },
  tr: {
    tag: 'X ELEKTRİk MEDYA & BASIN MERKEZİ',
    title: 'Resmi Basın Kiti & Medya Dosyaları',
    desc: 'Akredite yayıncılar ve haber kaynakları için onaylanmış kurumsal bilgi metinleri, temel operasyon verileri ve yüksek çözünürlüklü indirme kasası.',
    
    boilerplateTitle: 'Kurumsal Özet & Hazır Metin',
    boilerplateDesc: 'Yayınlar, makaleler ve akredite medya organları için X Elektrik resmi tanıtım metni.',
    boilerplateCopy: 'Metni Kopyala',
    boilerplateContent: '1998 yılında kurulan X Elektrik, yüksek emniyetli ağır sanayi şebeke mühendisliği ve otomasyon tescilli markasıdır. Şirket; yüksek gerilimli trafo merkezleri, dijital AG/OG şalt panoları, konteyner tipi batarya enerji depolama sistemleri (BESS) ve akıllı motor kontrol kabinleri tasarlar, imal eder ve devreye alır. Kritik sanayi tesislerine, veri merkezlerine ve şebeke dağıtım şirketlerine hizmet veren firma, küresel olarak %0.00 TRIR sıfır iş kazası oranıyla faaliyet göstermektedir.',
    
    factsTitle: 'Verilerle X Elektrik',
    factFounded: 'Kuruluş Yılı',
    factOffices: 'Ana Merkezler',
    factOfficesValue: 'Dublin, İstanbul, Zürih',
    factSafety: 'Güvenlik Rekoru (TRIR)',
    factSafetyValue: '0.00 (Tam Uyum ve Emniyet)',
    factTarget: 'Pazar Alanı',
    factTargetValue: 'Yalnızca Kurumsal B2B ve Sanayi Tesisleri',
    
    mediaAssetsTitle: 'İndirilebilir Resmi Varlık Kasası',
    mediaAssetsDesc: 'Onaylı medya görselleri, BIM Revit kütüphaneleri, teknik broşürler ve vektör tescil dosyaları.',
    assetLogoPack: 'Vektörel Logo Seti (Yüksek Çözünürlük)',
    assetLogoPackDesc: 'Açık, koyu ve monokrom kullanım senaryolarına uygun SVG, PDF ve PNG dosyaları.',
    assetBrochure: 'Ürün Kataloğu & Teknik El Kitabı',
    assetBrochureDesc: 'OG Şalt panolarından tır tipi bataryalara kadar tüm ağır elektrik donanım özelliklerini içerir.',
    assetSchematic: 'Revit (BIM) CAD Şablon Taslakları',
    assetSchematicDesc: 'Bariyer, pano ve koridor planlama çalışmalarında kullanılacak standart Revit aileleri.',
    assetPressSheet: 'B2B Kurumsal Bilgi Föyü Q2 2026',
    assetPressSheetDesc: 'Yıllık kurulum verilerini, anlık güç kalitesi referanslarını içeren resmi PDF belgesi.',
    assetDownloadBtn: 'Dosyayı İndir',

    contactTitle: 'Medya İlişkileri Koordinatları',
    contactDesc: 'Basın bültenleri, röportaj talepleri, katalog inceleme başvuruları ve yetkili tescil teyitleri için tek resmi kanal.',
    contactLabel: 'Kurumsal İletişim Direktörlüğü',
    contactTime: 'Ortalama Dönüş Süresi: < 12 Saat',
  }
};

const rawLogoSvg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 15 L32 15 L85 85 L68 85 Z" fill="#0012FF" />
  <path d="M85 15 L68 15 L46 45 L63 45 Z" fill="#0012FF" />
  <path d="M37 57 L15 85 L32 85 L54 57 Z" fill="#00FF00" />
</svg>`;

export default function PressKit() {
  const { language } = useApp();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const localized = language === 'tr' ? localDict.tr : localDict.en;

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleDownloadLogoSvg = () => {
    const blob = new Blob([rawLogoSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'x_elektrik_vector_logos.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTriggerSimulatedDownload = (assetName: string) => {
    alert(
      language === 'tr'
        ? `"${assetName}" indirme işlemi başlatıldı. B2B güvenlik kanalıyla arşiv paketi hazırlanıyor...`
        : `"${assetName}" download initialized. Safe archiving zip is being packeted security channels...`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="press-kit-page"
    >
      {/* Page Header */}
      <div className="max-w-4xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0012FF] dark:text-cyan-400 block animate-pulse">
          {localized.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {localized.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {localized.desc}
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Boilerplate Block */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 text-left space-y-5">
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/10 font-black uppercase">
                OFFICIAL BOILERPLATE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {localized.boilerplateTitle}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                {localized.boilerplateDesc}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-white/5">
              <blockquote className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed font-sans italic">
                "{localized.boilerplateContent}"
              </blockquote>
            </div>

            <button
              onClick={() => handleCopyText(localized.boilerplateContent, 'boilerplate')}
              className="h-11 px-6 rounded-xl bg-gray-55 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-250 dark:border-white/10"
              id="copy-press-boilerplate"
            >
              {copiedText === 'boilerplate' ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-550 dark:text-emerald-400 font-bold">COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>{localized.boilerplateCopy}</span>
                </>
              )}
            </button>
          </div>

          {/* Fast Fact Sheet list */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 text-left space-y-6">
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-emerald-500 bg-emerald-500/10 font-black uppercase">
                METRIC OUTLINE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {localized.factsTitle}
              </h3>
            </div>

            <div className="space-y-4 font-mono">
              <div className="flex flex-col border-b border-gray-150 dark:border-white/5 pb-3">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Building2 className="h-3.5 w-3.5 text-[#0012FF] dark:text-cyan-400" />
                  {localized.factFounded}
                </span>
                <span className="text-sm font-black text-gray-900 dark:text-white mt-1">
                  1998 (28+ Years of Grid Engineering)
                </span>
              </div>

              <div className="flex flex-col border-b border-gray-150 dark:border-white/5 pb-3">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Network className="h-3.5 w-3.5 text-[#0012FF] dark:text-cyan-400" />
                  {localized.factOffices}
                </span>
                <span className="text-sm font-black text-gray-900 dark:text-white mt-1">
                  {localized.factOfficesValue}
                </span>
              </div>

              <div className="flex flex-col border-b border-gray-150 dark:border-white/5 pb-3">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  {localized.factSafety}
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  {localized.factSafetyValue}
                </span>
              </div>

              <div className="flex flex-col pb-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Users className="h-3.5 w-3.5 text-[#0012FF] dark:text-cyan-400" />
                  {localized.factTarget}
                </span>
                <span className="text-sm font-black text-gray-900 dark:text-white mt-1">
                  {localized.factTargetValue}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Media Assets Vault Block Grid */}
        <section className="bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 text-left space-y-6">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/10 font-black uppercase">
              DOWNLOAD CENTER
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {localized.mediaAssetsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {localized.mediaAssetsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Logo suite asset */}
            <div className="bg-gray-55 dark:bg-slate-950 p-5 rounded-2xl border border-gray-200/65 dark:border-white/5 flex flex-col justify-between items-start gap-4 min-h-[200px]" id="asset-logo-card">
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-[#0012FF]/10 dark:bg-cyan-400/10 text-[#0012FF] dark:text-cyan-400 inline-block">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase leading-snug">
                  {localized.assetLogoPack}
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-normal">
                  {localized.assetLogoPackDesc}
                </p>
              </div>
              <button
                onClick={() => handleDownloadLogoSvg()}
                className="w-full h-10 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border border-gray-250 dark:border-white/10 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{localized.assetDownloadBtn}</span>
              </button>
            </div>

            {/* Catalog asset */}
            <div className="bg-gray-55 dark:bg-slate-950 p-5 rounded-2xl border border-gray-200/65 dark:border-white/5 flex flex-col justify-between items-start gap-4 min-h-[200px]" id="asset-brochure-card">
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 inline-block">
                  <FileText className="h-5 w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase leading-snug font-bold">
                  {localized.assetBrochure}
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-normal">
                  {localized.assetBrochureDesc}
                </p>
              </div>
              <button
                onClick={() => handleTriggerSimulatedDownload(localized.assetBrochure)}
                className="w-full h-10 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border border-gray-250 dark:border-white/10 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{localized.assetDownloadBtn}</span>
              </button>
            </div>

            {/* Schematic CAD asset */}
            <div className="bg-gray-55 dark:bg-slate-950 p-5 rounded-2xl border border-gray-200/65 dark:border-white/5 flex flex-col justify-between items-start gap-4 min-h-[200px]" id="asset-schematic-card">
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500 inline-block">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase leading-snug font-bold">
                  {localized.assetSchematic}
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-normal">
                  {localized.assetSchematicDesc}
                </p>
              </div>
              <button
                onClick={() => handleTriggerSimulatedDownload(localized.assetSchematic)}
                className="w-full h-10 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border border-gray-250 dark:border-white/10 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{localized.assetDownloadBtn}</span>
              </button>
            </div>

            {/* Factsheet PDF asset */}
            <div className="bg-gray-55 dark:bg-slate-950 p-5 rounded-2xl border border-gray-200/65 dark:border-white/5 flex flex-col justify-between items-start gap-4 min-h-[200px]" id="asset-pressheet-card">
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 inline-block">
                  <FileText className="h-5 w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase leading-snug font-bold">
                  {localized.assetPressSheet}
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-normal">
                  {localized.assetPressSheetDesc}
                </p>
              </div>
              <button
                onClick={() => handleTriggerSimulatedDownload(localized.assetPressSheet)}
                className="w-full h-10 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border border-gray-250 dark:border-white/10 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{localized.assetDownloadBtn}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Media Contacts Section */}
        <section className="bg-gradient-to-tr from-gray-950 to-slate-900 text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden text-left border border-white/5">
          <div className="absolute inset-0 opacity-10 pointer-events-none font-mono">
            <span className="text-[9px] select-none block tracking-widest text-[#00FF00] animate-pulse">GRID_COMMUNICATIONS_NODE</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#0012FF]/30 border border-[#0012FF] rounded-full px-3.5 py-1 text-[10px] font-mono font-bold uppercase text-[#4D64FF]">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <span>{localized.contactTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3.5xl font-display font-medium tracking-tight">
                {localized.contactTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-lg">
                {localized.contactDesc}
              </p>
              
              <div className="flex gap-4 pt-1 flex-wrap">
                <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  {localized.contactTime}
                </span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">
                  {localized.contactLabel}
                </span>
                <span className="text-sm bg-cyan-400/10 text-cyan-300 font-bold border border-cyan-400/20 px-2 py-0.5 rounded-lg inline-block uppercase tracking-wider text-[11px]">
                  {language === 'tr' ? 'MEDYA VE TANITIM' : 'PR & INVESTOR RELATIONS'}
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs divide-y divide-white/5">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-[#00FF00]" />
                    EMAIL:
                  </span>
                  <a 
                    href="mailto:media@xelektrik.com" 
                    className="text-white hover:text-cyan-400 font-black transition-colors"
                  >
                    media@xelektrik.com
                  </a>
                </div>
                <div className="flex items-center justify-between pt-2 pb-2">
                  <span className="text-gray-400 flex items-center gap-1.5 font-bold">
                    <Phone className="h-4 w-4 text-[#00FF00]" />
                    TELEPHONE:
                  </span>
                  <span className="text-white font-black">
                    +353 1 902 4499
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-400 flex items-center gap-1.5 font-bold">
                    <Building2 className="h-4 w-4 text-emerald-500" />
                    GLOBAL B2B OFFICE:
                  </span>
                  <span className="text-white font-black text-right">
                    Zurich Innovation Park, CH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
