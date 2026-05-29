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
  Palette, 
  Type, 
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import Logo from '../components/Logo';

const rawLogoSvg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main diagonal bar of X (deep royal blue) -->
  <path d="M15 15 L32 15 L85 85 L68 85 Z" fill="#0012FF" />
  <!-- Top-right to center-left bar of X (deep royal blue) -->
  <path d="M85 15 L68 15 L46 45 L63 45 Z" fill="#0012FF" />
  <!-- Bottom-left accent bar (vibrant neon green) -->
  <path d="M37 57 L15 85 L32 85 L54 57 Z" fill="#00FF00" />
</svg>`;

const localizedDict = {
  en: {
    tag: 'X ELEKTRİK CORPORATE DESIGN SYSTEM',
    title: 'Visual Identity Standards',
    desc: 'Approved specs, logo construction models, physical emblem guidelines, and colour coordination indices for X Elektrik.',
    logoSuiteTitle: 'Logo Architecture & Geometry',
    logoSuiteDesc: 'Our emblem combines dual power vectors representing transmission load and structural grid grounding. Keep surrounding negative space clean.',
    logoLabelLight: 'On Light Background',
    logoLabelDark: 'On Dark Background',
    logoLabelMonochrome: 'Monochrome Blueprint',
    copySvg: 'Copy Vector Code',
    copiedSvg: 'SVG Copied!',
    downloadSvg: 'Download Master SVG',
    
    colorsTitle: 'Signal Colour Index',
    colorsDesc: 'Corporate spectrum calculated for extreme legibility in safety control rooms and rugged industrial field terminals.',
    colorCopySuccess: 'HEX Code Copied!',
    colorCoreName: 'X CORE BLUE',
    colorCoreDesc: 'Primary brand load representing active grid power lines.',
    colorSafetyName: 'SAFETY NEON',
    colorSafetyDesc: 'Nominal operational green, zero-accident tolerance indicator.',
    colorCosmicName: 'COSMIC CARBON',
    colorCosmicDesc: 'Deep structural backing anchoring our diagnostic monitors.',
    colorCyanName: 'TELEMETRY CYAN',
    colorCyanDesc: 'Active data telemetry and automatic cooling cycle state.',
    colorAmberName: 'PROTOCOL AMBER',
    colorAmberDesc: 'Enterprise threshold interlock warnings and secure commands.',

    typographyTitle: 'Typography & Code Specimen',
    typographyDesc: 'We pair high-tension space displays with high-contrast screen readable mono typefaces. Use consistently across forms and diagnostic software.',
    fontDisplayLabel: 'Space Grotesk — Display Type',
    fontDisplayDesc: 'Used strictly for headers, high-tension numbers, and landing titles with tight -0.02em tracking.',
    fontSansLabel: 'Inter — Core UI Typography',
    fontSansDesc: 'Optimized for high-density diagnostic data charts, data forms, and client dashboard metrics.',
    fontMonoLabel: 'JetBrains Mono — Technical Coordinates',
    fontMonoDesc: 'Assigned for terminal streams, coordinates, microvolt readouts, and B2B load details.',
  },
  tr: {
    tag: 'X ELEKTRİK KURUMSAL TASARIM SİSTEMİ',
    title: 'Görsel Kimlik Standartları',
    desc: 'X Elektrik tescilli mimari sembolleri, logo konstrüksiyon planı, kurumsal renk kodları ve tipografi yönergeleri.',
    logoSuiteTitle: 'Logo Mimarisi ve Geometrik Yapı',
    logoSuiteDesc: 'Kurumsal sembolümüz, aktif iletim yükünü ve güvenli topraklama hatlarını temsil eden iki güç vektörünün kesişimini simgeler.',
    logoLabelLight: 'Açık Zemin',
    logoLabelDark: 'Koyu Zemin',
    logoLabelMonochrome: 'Monokrom Teknik Çizim',
    copySvg: 'Vektör Kodunu Kopyala',
    copiedSvg: 'SVG Kopyalandı!',
    downloadSvg: 'SVG Formatında İndir',
    
    colorsTitle: 'Sinyal Renk Dizini',
    colorsDesc: 'Kontrol terminalleri ve zorlu saha ortamlarında en yüksek kontrastı ve emniyeti sağlayacak şekilde hesaplanmış tescilli renkler.',
    colorCopySuccess: 'HEX Kodu Kopyalandı!',
    colorCoreName: 'X ELEKTRİK MAVİSİ',
    colorCoreDesc: 'Aktif yüksek gerilim hatlarını ve birincil güç iletimini temsil eder.',
    colorSafetyName: 'GÜVENLİK NEONU',
    colorSafetyDesc: 'Nominal güvenli çalışma durumu, sıfır kaza hedef göstergesi.',
    colorCosmicName: 'KOZMİK KARBON',
    colorCosmicDesc: 'Telemetri sistemlerinin ve dijital göstergelerin derin siyah arka planı.',
    colorCyanName: 'TELEMETRİ SİYAN',
    colorCyanDesc: 'Aktif sensör akışı, akıllı yazılım ve IoT veri katmanları renk uyarısı.',
    colorAmberName: 'PROTOKOL TURUNCUSU',
    colorAmberDesc: 'Emniyet devresi kilit uyarıları ve mekanik interlok protokolleri.',

    typographyTitle: 'Tipografi ve Karakter Şablonu',
    typographyDesc: 'Güçlü ve estetik Space Grotesk gövdesini, yüksek veri yoğunluklu harf biçimleriyle eşleştiriyoruz.',
    fontDisplayLabel: 'Space Grotesk — Başlık Karakteri',
    fontDisplayDesc: 'Sadece ana başlıklar, yüksek gerilim kilovolt verileri ve tescilli manşetler için sıkı harf aralığı ile kullanılır.',
    fontSansLabel: 'Inter — Arayüz ve Gövde Yazı Tipi',
    fontSansDesc: 'B2B kullanıcı panelleri, karmaşık parametre şemaları ve teknik raporlarda üstün okuma konforu için seçilmiştir.',
    fontMonoLabel: 'JetBrains Mono — Teknik Parametre Yazı Tipi',
    fontMonoDesc: 'Saha logları, terminal kod bileşenleri, koordinatlar ve B2B elektriksel koordinat tabetlerinde kullanılır.',
  }
};

export default function BrandingGuidelines() {
  const { language } = useApp();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [logoCopiedMsg, setLogoCopiedMsg] = useState(false);

  const localized = language === 'tr' ? localizedDict.tr : localizedDict.en;

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const handleCopyLogoSvg = () => {
    navigator.clipboard.writeText(rawLogoSvg);
    setLogoCopiedMsg(true);
    setTimeout(() => setLogoCopiedMsg(false), 1500);
  };

  const handleDownloadLogoSvg = () => {
    const blob = new Blob([rawLogoSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'x_elektrik_primary_logo.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const colors = [
    { name: localized.colorCoreName, hex: '#0012FF', rgb: '0, 18, 255', text: 'text-white', bg: 'bg-[#0012FF]', desc: localized.colorCoreDesc },
    { name: localized.colorSafetyName, hex: '#00FF00', rgb: '0, 255, 0', text: 'text-slate-950', bg: 'bg-[#00FF00]', desc: localized.colorSafetyDesc },
    { name: localized.colorCosmicName, hex: '#0C1322', rgb: '12, 19, 34', text: 'text-gray-100', bg: 'bg-[#0C1322] border border-white/10', desc: localized.colorCosmicDesc },
    { name: localized.colorCyanName, hex: '#00F0FF', rgb: '0, 240, 255', text: 'text-slate-950', bg: 'bg-[#00F0FF]', desc: localized.colorCyanDesc },
    { name: localized.colorAmberName, hex: '#F59E0B', rgb: '245, 158, 11', text: 'text-slate-950', bg: 'bg-[#F29F05]', desc: localized.colorAmberDesc }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="branding-guidelines-page"
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

      {/* Grid containing Sections */}
      <div className="space-y-12">
        {/* Section 1: Logos */}
        <section className="bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 text-left space-y-6">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/10 font-black uppercase">
              GRID ARCHITECTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {localized.logoSuiteTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {localized.logoSuiteDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl flex flex-col items-center justify-between gap-6 border border-gray-200/50 dark:border-white/5 relative min-h-[220px]">
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold text-gray-400 uppercase">
                {localized.logoLabelLight}
              </span>
              <div className="flex-grow flex items-center justify-center p-4">
                <Logo size="md" lightBackground={true} className="scale-110" />
              </div>
              <div className="w-full text-center text-[10px] font-mono font-bold text-gray-400 border-t border-gray-150 dark:border-white/5 pt-3">
                PRIMARY COMBINED SPEC
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl flex flex-col items-center justify-between gap-6 border border-white/10 relative min-h-[220px]">
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold text-slate-500 uppercase">
                {localized.logoLabelDark}
              </span>
              <div className="flex-grow flex items-center justify-center p-4">
                <Logo size="md" lightBackground={false} className="scale-110" />
              </div>
              <div className="w-full text-center text-[10px] font-mono font-bold text-slate-500 border-t border-white/5 pt-3">
                HIGH TENSION INVERSE
              </div>
            </div>

            <div className="bg-blue-900/10 dark:bg-blue-950/15 p-6 rounded-2xl flex flex-col items-center justify-between gap-6 border border-blue-500/20 relative min-h-[220px]">
              <span className="absolute top-3 left-3 text-[9px] font-mono font-bold text-blue-500 uppercase">
                {localized.logoLabelMonochrome}
              </span>
              <div className="flex-grow flex items-center justify-center p-4">
                <div className="flex items-center gap-2 opacity-80 filter grayscale">
                  <Logo size="md" lightBackground={true} />
                </div>
              </div>
              <div className="w-full text-center text-[10px] font-mono font-bold text-blue-500/80 border-t border-blue-500/10 pt-3">
                GRID WIREFRAME SCHEME
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleDownloadLogoSvg}
              className="flex-1 sm:flex-initial h-11 px-6 rounded-xl bg-[#0012FF] hover:bg-opacity-90 dark:bg-cyan-400 text-white dark:text-slate-950 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border-0 shadow-sm"
              id="copy-logo-down"
            >
              <Download className="h-4 w-4" />
              {localized.downloadSvg}
            </button>
            <button
              onClick={handleCopyLogoSvg}
              className="flex-1 sm:flex-initial h-11 px-6 rounded-xl bg-gray-55 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-250 dark:border-white/10"
              id="copy-logo-svg"
            >
              {logoCopiedMsg ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500 animate-bounce" />
                  <span className="text-emerald-555 dark:text-emerald-450 font-bold">{localized.copiedSvg}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>{localized.copySvg}</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Section 2: Colors */}
        <section className="bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 text-left space-y-6">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/10 font-black uppercase">
              COLOR TELEMETRY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {localized.colorsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {localized.colorsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {colors.map((color) => {
              const isCopied = copiedColor === color.hex;
              return (
                <div 
                  key={color.hex}
                  className="bg-gray-50 dark:bg-slate-950 rounded-2xl p-4 border border-gray-200/60 dark:border-white/5 flex flex-col justify-between h-[280px] hover:shadow-md transition-shadow group relative"
                  id={`color-swatch-${color.hex.replace('#', '')}`}
                >
                  <div className={`w-full h-[120px] rounded-xl relative overflow-hidden ${color.bg}`}>
                    <button
                      onClick={() => handleCopyColor(color.hex)}
                      className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-mono tracking-wider font-bold uppercase cursor-pointer border-0 w-full"
                    >
                      <span className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform">
                        {isCopied ? <Check className="h-3.5 w-3.5 text-[#00FF00]" /> : <Copy className="h-3.5 w-3.5" />}
                        {isCopied ? 'COPIED!' : 'COPY HEX'}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {isCopied && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute inset-x-0 bottom-2 mx-2 bg-emerald-500 text-white font-mono text-[9px] py-1 rounded text-center font-extrabold"
                        >
                          {localized.colorCopySuccess}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1.5 pt-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none uppercase">
                        {color.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium leading-tight mt-1">
                        {color.desc}
                      </p>
                    </div>

                    <div className="space-y-1 border-t border-gray-200/50 dark:border-white/5 pt-2">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-400 dark:text-gray-500 font-semibold uppercase">HEX:</span>
                        <span className="text-gray-800 dark:text-gray-200 font-bold">{color.hex}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-400 dark:text-gray-500 font-semibold uppercase">RGB:</span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{color.rgb}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Typography */}
        <section className="bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 text-left space-y-6">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/10 font-black uppercase">
              GRID TYPOGRAPHY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {localized.typographyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              {localized.typographyDesc}
            </p>
          </div>

          <div className="space-y-6 divide-y divide-gray-150 dark:divide-white/5">
            <div className="pt-0 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0012FF] dark:text-cyan-400 font-bold uppercase">
                  <Type className="h-3.5 w-3.5" />
                  {localized.fontDisplayLabel}
                </span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {localized.fontDisplayDesc}
                </p>
              </div>
              <div className="lg:col-span-8 bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-white/5 space-y-3">
                <div className="text-3xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-none">
                  Space Grotesk Heavy 400/500/600
                </div>
                <div className="text-lg text-gray-400 dark:text-slate-500 font-display uppercase tracking-[0.1em]">
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                </div>
              </div>
            </div>

            <div className="pt-6 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0012FF] dark:text-cyan-400 font-bold uppercase">
                  <Type className="h-3.5 w-3.5" />
                  {localized.fontSansLabel}
                </span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {localized.fontSansDesc}
                </p>
              </div>
              <div className="lg:col-span-8 bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-white/5 space-y-3">
                <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans font-normal">
                  The quick brown fox jumps over the lazy dog. Inter is designed specifically for screen optimization and ensures high-tension schematics coordinates read cleanly under bright field environments.
                </div>
                <div className="text-xs font-mono text-gray-400 dark:text-gray-500 font-bold">
                  ClassName usage: font-sans (Inter, system-ui, sans-serif)
                </div>
              </div>
            </div>

            <div className="pt-6 pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#0012FF] dark:text-cyan-400 font-bold uppercase">
                  <Type className="h-3.5 w-3.5" />
                  {localized.fontMonoLabel}
                </span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {localized.fontMonoDesc}
                </p>
              </div>
              <div className="lg:col-span-8 bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-white/5 space-y-3">
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/10 space-y-1">
                  <div>XE-OUTLET-MVS: 13.8kV @ 1200A [OK]</div>
                  <div>GRID_HARMONIC_THD: 1.22 % (IEEE519-NOMINAL)</div>
                  <div>ACTIVE_COOLING_CYCLE: ACTIVE (34.2 °C)</div>
                </div>
                <div className="text-xs font-mono text-gray-400 dark:text-gray-500 pt-1 font-bold">
                  ClassName usage: font-mono ("JetBrains Mono", monospace)
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
