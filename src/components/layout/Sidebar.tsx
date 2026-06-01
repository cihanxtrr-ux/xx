import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  FileText, 
  AppWindow, 
  Mail, 
  LifeBuoy, 
  User, 
  LogOut, 
  Activity, 
  ShoppingCart, 
  ChevronDown, 
  Home as HomeIcon,
  Layers,
  Cpu,
  Briefcase,
  Newspaper,
  Megaphone,
  Info,
  Globe2,
  Moon,
  Sun,
  Calculator
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo';

interface SidebarProps {
  navigateTo: (path: string) => void;
  isLinkActive: (path: string) => boolean;
}

export default function Sidebar({ navigateTo, isLinkActive }: SidebarProps) {
  const { 
    t, 
    theme, 
    language, 
    toggleTheme, 
    toggleLanguage, 
    setSelectedCategory, 
    setSelectedIotUseCase,
    basket, 
    setBasketOpen,
    currentUser,
    logout
  } = useApp();

  const [desktopProductsSubmenuOpen, setDesktopProductsSubmenuOpen] = useState(false);
  const [desktopIotSubmenuOpen, setDesktopIotSubmenuOpen] = useState(false);
  const [desktopAboutSubmenuOpen, setDesktopAboutSubmenuOpen] = useState(false);

  return (
    <aside className="hidden">
      <div className="space-y-6">
        {/* Logo Branding Header */}
        <div className="pb-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <Link 
            to="/home" 
            className="flex-shrink-0 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer bg-transparent border-none p-0 inline-block"
          >
            <Logo size="md" lightBackground={theme === 'light'} />
          </Link>
        </div>
        
        <nav className="flex flex-col gap-6 font-sans font-bold tracking-wider uppercase">
          
          {/* Category 1: CORE NAV */}
          <div className="space-y-1">
            <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-4 mb-3 font-bold">
              {language === 'tr' ? 'MÜHENDİSLİK GİRİŞ' : 'CORE NAV'}
            </span>
            
            <Link 
              to="/home" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/home') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/home') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <HomeIcon className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/home') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.vision}</span>
            </Link>

            <Link 
              to="/services" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/services') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/services') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Layers className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/services') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.services}</span>
            </Link>
          </div>

          {/* Category 2: SYSTEMS & ENGINEERING */}
          <div className="space-y-1">
            <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-4 mb-3 font-bold">
              {language === 'tr' ? 'SİSTEMLER VE ŞEBEKE' : 'SYSTEMS & GRID'}
            </span>

            {/* Products Dropdown Accordion */}
            <div className="flex flex-col">
              <Link 
                to="/products"
                onClick={() => {
                  setDesktopProductsSubmenuOpen(!desktopProductsSubmenuOpen);
                  setSelectedCategory(null);
                }} 
                className={`group w-full flex items-center justify-between transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('/products') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('/products') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-3.5">
                  <Cpu className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:rotate-12 ${isLinkActive('/products') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-655 dark:group-hover:text-gray-300'}`} />
                  <span>{t.nav.products}</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${desktopProductsSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : 'text-gray-450 dark:text-gray-500'}`} />
              </Link>
              
              <AnimatePresence initial={false}>
                {desktopProductsSubmenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col ml-6"
                  >
                    <button 
                      onClick={() => {
                        setSelectedCategory(null);
                        navigateTo('/products');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-350 uppercase flex items-center justify-between"
                    >
                      <span>{language === 'tr' ? '1. Sistemler' : '1. All Systems'}</span>
                      <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity">🚀</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCategory('industrial');
                        navigateTo('/products');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-355 uppercase flex items-center justify-between"
                    >
                      <span>{language === 'tr' ? '2. Ağır Sanayi' : '2. Heavy Ind'}</span>
                      <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">🏭</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCategory('renewable');
                        navigateTo('/products');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-355 uppercase flex items-center justify-between"
                    >
                      <span>{language === 'tr' ? '3. Yenilenebilir' : '3. Renewable'}</span>
                      <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">☀️</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCategory('datacenter');
                        navigateTo('/products');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-355 uppercase flex items-center justify-between"
                    >
                      <span>{language === 'tr' ? '4. Kritik Yedek' : '4. Critical'}</span>
                      <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">💾</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCategory('commercial');
                        navigateTo('/products');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-355 uppercase flex items-center justify-between"
                    >
                      <span>{language === 'tr' ? '5. Akıllı BMS' : '5. Smart BMS'}</span>
                      <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">🏢</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* IoT Grid Dropdown Accordion */}
            <div className="flex flex-col">
              <Link 
                to="/iot"
                onClick={() => {
                  setDesktopIotSubmenuOpen(!desktopIotSubmenuOpen);
                }} 
                className={`group w-full flex items-center justify-between transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('/iot') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('/iot') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-3.5">
                  <Activity className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/iot') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-655 dark:group-hover:text-gray-300'}`} />
                  <span>{t.nav.iot}</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${desktopIotSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : 'text-gray-450 dark:text-gray-500'}`} />
              </Link>
              
              <AnimatePresence initial={false}>
                {desktopIotSubmenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col ml-6"
                  >
                    <button 
                      onClick={() => {
                        setSelectedIotUseCase('thermal');
                        navigateTo('/iot');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                    >
                      <span>❄️ 1. Cooling</span>
                      <span className="text-[9px] opacity-60 font-bold">THERMAL</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedIotUseCase('peak-shaving');
                        navigateTo('/iot');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                    >
                      <span>🔋 2. Shaving</span>
                      <span className="text-[9px] opacity-60 font-bold">PEAK</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedIotUseCase('var-control');
                        navigateTo('/iot');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                    >
                      <span>⚡ 3. CAP-Corr</span>
                      <span className="text-[9px] opacity-60 font-bold">VAR</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedIotUseCase('islanding');
                        navigateTo('/iot');
                      }}
                      className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-355 uppercase flex items-center justify-between"
                    >
                      <span>🛡️ 4. Isolated</span>
                      <span className="text-[9px] opacity-60 font-bold">ISLAND</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/estimator" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/estimator') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/estimator') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Calculator className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/estimator') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.estimator}</span>
            </Link>
          </div>

          {/* Category 3: CORP DETAILS */}
          <div className="space-y-1">
            <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-4 mb-3 font-bold">
              {language === 'tr' ? 'KURUMSAL KİMLİK' : 'COMPANY INFO'}
            </span>

            <Link 
              to="/portfolio" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/portfolio') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/portfolio') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Briefcase className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/portfolio') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.works}</span>
            </Link>

            <Link 
              to="/blog" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/blog') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/blog') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Newspaper className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/blog') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.blog}</span>
            </Link>

            <Link 
              to="/news" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/news') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-55 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/news') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Megaphone className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/news') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.news}</span>
            </Link>

            {/* About Dropdown Accordion */}
            <div className="flex flex-col">
              <Link 
                to="/about"
                onClick={(e) => {
                  e.preventDefault();
                  setDesktopAboutSubmenuOpen(!desktopAboutSubmenuOpen);
                }} 
                className={`group w-full flex items-center justify-between transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('/about') || isLinkActive('/press-kit') || isLinkActive('/branding')
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-55 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {(isLinkActive('/about') || isLinkActive('/press-kit') || isLinkActive('/branding')) && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-3.5">
                  <Info className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/about') || isLinkActive('/press-kit') || isLinkActive('/branding') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                  <span>{t.nav.about}</span>
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${desktopAboutSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : 'text-gray-450 dark:text-gray-500'}`} />
              </Link>
              
              <AnimatePresence initial={false}>
                {desktopAboutSubmenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col ml-6"
                  >
                    <button 
                      onClick={() => {
                        navigateTo('/about');
                      }}
                      className="group w-full text-left py-2 px-3 rounded-lg hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                    >
                      <span>📖 {language === 'tr' ? 'Hakkımızda' : 'About Us'}</span>
                      <span className="text-[9px] opacity-65 font-bold">INFO</span>
                    </button>
                    <button 
                      onClick={() => {
                        navigateTo('/branding');
                      }}
                      className="group w-full text-left py-2 px-3 rounded-lg hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                    >
                      <span>🎨 {language === 'tr' ? 'Marka Kimliği' : 'Branding Guidelines'}</span>
                      <span className="text-[9px] opacity-65 font-bold">BRAND</span>
                    </button>
                    <button 
                      onClick={() => {
                        navigateTo('/press-kit');
                      }}
                      className="group w-full text-left py-2 px-3 rounded-lg hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-550 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                    >
                      <span>📂 {language === 'tr' ? 'Basın Kiti' : 'Press Kit'}</span>
                      <span className="text-[9px] opacity-65 font-bold">PRESS</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/careers" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/careers') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/careers') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Award className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/careers') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.careers}</span>
            </Link>

            <Link 
              to="/documents" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/documents') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/documents') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <FileText className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/documents') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.documents}</span>
            </Link>

            <Link 
              to="/app-center" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/app-center') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/app-center') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <AppWindow className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/app-center') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.appCenter}</span>
            </Link>

            <Link 
              to="/contact" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/contact') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-55 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/contact') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Mail className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/contact') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{t.nav.contact}</span>
            </Link>

            <Link 
              to="/support" 
              className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                isLinkActive('/support') 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-55 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
              }`}
            >
              {isLinkActive('/support') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <LifeBuoy className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/support') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
              <span>{language === 'tr' ? 'Destek Masası' : 'Help Desk'}</span>
            </Link>
          </div>

          {/* Operator Client Portal Item */}
          <div className="pt-2 border-t border-gray-100 dark:border-white/5">
            {currentUser ? (
              <div className="p-3 rounded-xl bg-[#0012FF]/5 dark:bg-cyan-400/5 border border-gray-100 dark:border-white/10 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-955 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center font-mono text-[9px] font-black tracking-wide border border-gray-200/40">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold text-gray-955 dark:text-white truncate font-sans">{currentUser.name}</span>
                    <span className="block text-[8px] text-[#0012FF] dark:text-cyan-400 uppercase font-mono font-bold tracking-tight truncate">{currentUser.companyName}</span>
                  </div>
                </div>
                
                {/* Dynamic Sector Accent Indicator */}
                <div className="px-1.5 py-0.5 rounded bg-gray-50 dark:bg-black/35 border border-gray-100 dark:border-white/5 flex items-center gap-1">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                  </span>
                  <span className="text-[8px] font-mono uppercase font-bold text-gray-450 dark:text-gray-400 tracking-tight truncate">
                    {currentUser.sector === 'datacenter' && (language === 'tr' ? 'Veri Merkezi Şebekesi' : 'Datacenter Grid')}
                    {currentUser.sector === 'renewable' && (language === 'tr' ? 'Yenilenebilir Güç' : 'Renewable Power')}
                    {currentUser.sector === 'industrial' && (language === 'tr' ? 'Ağır Sanayi Beslemesi' : 'Industrial Feed')}
                    {currentUser.sector === 'commercial' && (language === 'tr' ? 'Ticari Şebeke' : 'Commercial Grid')}
                  </span>
                </div>

                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="w-full py-1.5 px-1.5 rounded bg-[#0012FF]/10 hover:bg-[#0012FF]/20 dark:bg-cyan-400/10 dark:hover:bg-cyan-400/20 text-[#0012FF] dark:text-cyan-400 border border-[#0012FF]/15 dark:border-cyan-400/20 text-[8.5px] font-mono font-bold uppercase transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Activity className="h-2.5 w-2.5" />
                  <span>{language === 'tr' ? 'KONTROL PANELİ' : 'GO TO DASHBOARD'}</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigateTo('/home');
                  }}
                  className="w-full py-1 px-1.5 rounded bg-gray-50 hover:bg-rose-50 dark:bg-white/5 dark:hover:bg-rose-955/20 text-gray-650 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-450 border border-gray-100 dark:border-white/5 hover:border-rose-500/10 text-[8.5px] font-mono font-bold uppercase transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <LogOut className="h-2.5 w-2.5" />
                  <span>{language === 'tr' ? 'ÇIKIŞ YAP' : 'LOG OUT'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('/login')}
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('/login') || isLinkActive('/register')
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {(isLinkActive('/login') || isLinkActive('/register')) && (
                  <motion.span
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <User className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/login') || isLinkActive('/register') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span className="text-[12px] uppercase font-mono tracking-wider">{language === 'tr' ? 'Müşteri Girişi' : 'Client Login'}</span>
              </button>
            )}
          </div>

          {/* Specialty Item: SHOPPING BASKET */}
          <div className="pt-2 border-t border-gray-100 dark:border-white/5">
            <button 
              onClick={() => setBasketOpen(true)}
              className={`w-full text-left transition-all duration-300 cursor-pointer bg-transparent border-hidden px-4 py-3 rounded-xl flex items-center justify-between group relative ${
                basket.length > 0 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/5 border border-dashed border-[#0012FF]/40 dark:border-cyan-400/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3.5 font-bold">
                <ShoppingCart className={`h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-[-10deg] ${basket.length > 0 ? 'text-[#0012FF] dark:text-cyan-400 scale-110 animate-bounce' : 'text-gray-400 dark:text-gray-500'}`} />
                <span className="text-[12px] uppercase font-mono tracking-wider">{language === 'tr' ? 'Teklif Sepetiniz' : 'Order Basket'}</span>
              </span>
              {basket.length > 0 ? (
                <motion.span 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold leading-none"
                >
                  {basket.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.span>
              ) : (
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 opacity-80 uppercase tracking-tighter">Empty</span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar Utilities (Theme, Lang & Estimation CTA) */}
      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between gap-1 bg-gray-50 dark:bg-[#0c0c0c] p-1.5 rounded-2xl border border-gray-100 dark:border-white/5">
          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            title="Switch Language"
            className="flex-1 py-1.5 px-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-xs transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer border-0 bg-transparent text-[11.5px] font-mono font-bold uppercase"
          >
            <Globe2 className="h-4 w-4" />
            <span>{language === 'en' ? 'EN' : 'TR'}</span>
          </button>

          {/* Vertical Line divider */}
          <span className="h-4 w-[1px] bg-gray-200 dark:bg-white/10" />

          {/* Theme Trigger */}
          <button
            onClick={toggleTheme}
            title="Toggle Theme Mode"
            className="flex-1 py-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:shadow-xs transition duration-200 flex items-center justify-center cursor-pointer border-0 bg-transparent"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
