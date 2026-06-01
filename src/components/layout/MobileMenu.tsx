import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home as HomeIcon, 
  Layers, 
  Cpu, 
  ChevronDown, 
  Activity, 
  Calculator, 
  Briefcase, 
  Newspaper, 
  Megaphone, 
  Info, 
  Award, 
  FileText, 
  AppWindow, 
  Mail, 
  LifeBuoy, 
  User, 
  LogOut,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo';

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigateTo: (path: string) => void;
  isLinkActive: (path: string) => boolean;
}

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  navigateTo,
  isLinkActive
}: MobileMenuProps) {
  const { 
    t, 
    theme, 
    language, 
    setSelectedCategory, 
    setSelectedIotUseCase,
    currentUser,
    logout
  } = useApp();

  const [mobileIotSubmenuOpen, setMobileIotSubmenuOpen] = useState(false);
  const [mobileProductsSubmenuOpen, setMobileProductsSubmenuOpen] = useState(false);
  const [mobileAboutSubmenuOpen, setMobileAboutSubmenuOpen] = useState(false);

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backing Backdrop Cover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 xl:hidden"
          />

          {/* Drawer Sheet Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 380, damping: 35 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#000000] shadow-2xl z-50 p-6 flex flex-col justify-start overflow-y-auto border-l border-gray-150 dark:border-white/10 xl:hidden text-left"
          >
            {/* Header Section inside Drawer */}
            <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/5">
              <Logo size="md" lightBackground={theme === 'light'} />
              
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer border-0 flex items-center justify-center animate-none"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Subnav links Scroll Container */}
            <nav className="py-6 flex flex-col gap-6 text-xs uppercase tracking-wider font-bold">
              {/* Category Group 1: CORE NAVIGATION */}
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-gray-450 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                  {language === 'tr' ? 'ANA MENÜ' : 'CORE NAVIGATION'}
                </span>
                <button 
                  onClick={() => { navigateTo('/home'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/home') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <HomeIcon className="h-4 w-4" />
                  <span>{t.nav.vision}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/services'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/services') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>{t.nav.services}</span>
                </button>
              </div>

              {/* Category Group 2: SYSTEM CAPABILITIES */}
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-gray-455 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                  {language === 'tr' ? 'SİSTEMLER VE ŞEBEKE' : 'SYSTEMS & GRID'}
                </span>

                {/* Products Accordion */}
                <div className="flex flex-col">
                  <button 
                    onClick={() => setMobileProductsSubmenuOpen(!mobileProductsSubmenuOpen)} 
                    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                      isLinkActive('/products') 
                        ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                        : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Cpu className="h-4 w-4" />
                      <span>{t.nav.products}</span>
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileProductsSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
                  </button>
                  
                  {mobileProductsSubmenuOpen && (
                    <div className="pl-6 mt-1.5 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-1 ml-4 py-1.5 text-[10px]">
                      <button 
                        onClick={() => { setSelectedCategory(null); navigateTo('/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        🚀 {language === 'tr' ? '1. Tüm Sistemler' : '1. All Systems'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('industrial'); navigateTo('/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        🏭 {language === 'tr' ? '2. Ağır Sanayi' : '2. Heavy Industrial'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('renewable'); navigateTo('/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        ☀️ {language === 'tr' ? '3. Yenilenebilir Şebeke' : '3. Renewable Grid'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('datacenter'); navigateTo('/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        💾 {language === 'tr' ? '4. Kritik Yedekleme' : '4. Critical Backup'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('commercial'); navigateTo('/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        🏢 {language === 'tr' ? '5. Akıllı Bina (BMS)' : '5. Smart BMS Panel'}
                      </button>
                    </div>
                  )}
                </div>

                {/* IoT Accordion */}
                <div className="flex flex-col">
                  <button 
                    onClick={() => setMobileIotSubmenuOpen(!mobileIotSubmenuOpen)} 
                    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                      isLinkActive('/iot') 
                        ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                        : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Activity className="h-4 w-4" />
                      <span>{t.nav.iot}</span>
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileIotSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
                  </button>
                  
                  {mobileIotSubmenuOpen && (
                    <div className="pl-6 mt-1.5 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-1 ml-4 py-1.5 text-[10px]">
                      <button 
                        onClick={() => { setSelectedIotUseCase('thermal'); navigateTo('/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        ❄️ 1. Predictive Cooling
                      </button>
                      <button 
                        onClick={() => { setSelectedIotUseCase('peak-shaving'); navigateTo('/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        🔋 2. Peak Shaving BESS
                      </button>
                      <button 
                        onClick={() => { setSelectedIotUseCase('var-control'); navigateTo('/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        ⚡ 3. CAP-Correction Sync
                      </button>
                      <button 
                        onClick={() => { setSelectedIotUseCase('islanding'); navigateTo('/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        🛡️ 4. Islanding Breaker
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { navigateTo('/estimator'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/estimator') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Calculator className="h-4 w-4" />
                  <span>{t.nav.estimator}</span>
                </button>
              </div>

              {/* Category Group 3: COMPANY OUTLINE */}
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-gray-455 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                  {language === 'tr' ? 'KURUMSAL KİMLİK' : 'COMPANY INFO'}
                </span>

                <button 
                  onClick={() => { navigateTo('/portfolio'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/portfolio') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>{t.nav.works}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/blog'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/blog') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Newspaper className="h-4 w-4" />
                  <span>{t.nav.blog}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/news'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/news') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Megaphone className="h-4 w-4" />
                  <span>{t.nav.news}</span>
                </button>

                {/* About Accordion */}
                <div className="flex flex-col">
                  <button 
                    onClick={() => setMobileAboutSubmenuOpen(!mobileAboutSubmenuOpen)} 
                    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                      isLinkActive('/about') || isLinkActive('/press-kit') || isLinkActive('/branding')
                        ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                        : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Info className="h-4 w-4" />
                      <span>{t.nav.about}</span>
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileAboutSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
                  </button>
                  
                  {mobileAboutSubmenuOpen && (
                    <div className="pl-6 mt-1.5 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-1 ml-4 py-1.5 text-[10px]">
                      <button 
                        onClick={() => { navigateTo('/about'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        📖 {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                      </button>
                      <button 
                        onClick={() => { navigateTo('/branding'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        🎨 {language === 'tr' ? 'Marka Kimliği' : 'Branding Guidelines'}
                      </button>
                      <button 
                        onClick={() => { navigateTo('/press-kit'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        📂 {language === 'tr' ? 'Basın Kiti' : 'Press Kit'}
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { navigateTo('/careers'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/careers') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>{t.nav.careers}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/documents'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/documents') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-405 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>{t.nav.documents}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/app-center'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/app-center') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-405 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <AppWindow className="h-4 w-4" />
                  <span>{t.nav.appCenter}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/contact'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/contact') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-405 dark:hover:text-white hover:bg-gray-55 dark:hover:bg-white/5'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.nav.contact}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('/support'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/support') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-405 dark:hover:text-white hover:bg-gray-55 dark:hover:bg-white/5'
                  }`}
                >
                  <LifeBuoy className="h-4 w-4" />
                  <span>{language === 'tr' ? 'Destek Masası' : 'Help Desk'}</span>
                </button>
              </div>
            </nav>

            {/* Footer Section pinned inside Drawer */}
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 space-y-3.5">
              {/* Mobile Client Portal Controls */}
              {currentUser ? (
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-150/60 dark:border-white/5 space-y-2.5 text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gray-955 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center font-mono text-[10px] font-black tracking-wide border border-gray-200/40">
                      {currentUser.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold text-gray-955 dark:text-white truncate font-sans">{currentUser.name}</span>
                      <span className="block text-[8.5px] text-[#0012FF] dark:text-cyan-400 uppercase font-mono font-bold tracking-tight truncate">{currentUser.companyName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { navigateTo('/dashboard'); setMobileMenuOpen(false); }}
                      className="py-2.5 px-1.5 rounded-lg bg-[#0012FF]/10 hover:bg-[#0012FF]/25 dark:bg-cyan-400/15 dark:hover:bg-cyan-400/25 text-[#0012FF] dark:text-cyan-400 border border-[#0012FF]/15 dark:border-cyan-400/20 text-[9px] font-mono font-black uppercase transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Activity className="h-3 w-3" />
                      <span>{language === 'tr' ? 'KONTROLÜ AÇ' : 'OPEN CONSOLE'}</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigateTo('/home');
                        setMobileMenuOpen(false);
                      }}
                      className="py-1 px-1.5 rounded-lg bg-gray-100 hover:bg-rose-50 dark:bg-white/5 dark:hover:bg-rose-955/15 text-gray-650 hover:text-rose-600 dark:text-gray-405 dark:hover:text-rose-400 border border-transparent hover:border-rose-500/10 text-[9px] font-mono font-bold uppercase transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <LogOut className="h-3 w-3" />
                      <span>{language === 'tr' ? 'ÇIKIŞ YAP' : 'LOGOUT'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { navigateTo('/login'); setMobileMenuOpen(false); }}
                  className="w-full h-11 flex items-center justify-center p-3 rounded-xl bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-[#0012FF] dark:text-cyan-300 font-extrabold uppercase text-[10.5px] tracking-wide border border-dashed border-[#0012FF]/30 dark:border-cyan-400/30 gap-1.5 transition cursor-pointer"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>{language === 'tr' ? 'Müşteri Girişi' : 'Client Login Signature'}</span>
                </button>
              )}

              <button
                onClick={() => { navigateTo('/estimator'); setMobileMenuOpen(false); }}
                className="w-full h-11 flex items-center justify-center p-3 rounded-xl bg-[#0012FF] text-white dark:bg-cyan-400 dark:text-slate-950 font-bold hover:opacity-90 transition-all uppercase text-[10px] tracking-wider cursor-pointer border-0 gap-1 mb-6"
              >
                <span>{t.nav.actionBtn}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
