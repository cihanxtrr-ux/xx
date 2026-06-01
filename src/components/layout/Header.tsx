import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  ShoppingCart, 
  Cpu, 
  Activity, 
  Calculator, 
  Info, 
  Briefcase, 
  Award, 
  FileText, 
  AppWindow, 
  Newspaper, 
  Megaphone, 
  LifeBuoy, 
  Mail, 
  Menu, 
  X,
  Sun,
  Moon,
  Globe2,
  User,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigateTo: (path: string) => void;
  isLinkActive: (path: string) => boolean;
}

export default function Header({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  navigateTo, 
  isLinkActive 
}: HeaderProps) {
  const { 
    t, 
    theme, 
    language, 
    toggleTheme, 
    toggleLanguage, 
    basket, 
    setBasketOpen,
    currentUser,
    logout,
    setSelectedCategory
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/85 dark:bg-black/60 backdrop-blur-xl shadow-lg shadow-black/5 py-5 sm:py-6 border-gray-150/40 dark:border-white/5' 
          : 'bg-white/60 dark:bg-black/25 backdrop-blur-md py-8 sm:py-9 border-gray-100/30 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link 
          to="/home" 
          className="flex-shrink-0 transition-opacity hover:opacity-90 cursor-pointer bg-transparent border-none p-0 inline-block"
          aria-label="X Elektrik Home Page"
        >
          <Logo size="md" lightBackground={theme === 'light'} />
        </Link>

        {/* Premium Desktop Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-[11.5px] font-sans font-bold tracking-wider uppercase">
          {/* Direct Link 1: VISION */}
          <button 
            onClick={() => navigateTo('/home')} 
            className={`transition-all duration-200 cursor-pointer bg-transparent border-none py-2 px-1 relative ${
              isLinkActive('/home') ? 'text-[#0012FF] dark:text-cyan-400 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
            }`}
          >
            <span>{t.nav.vision}</span>
            {isLinkActive('/home') && (
              <motion.span 
                layoutId="activeNavLine"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0012FF] dark:bg-cyan-400 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Direct Link 2: SERVICES */}
          <button 
            onClick={() => navigateTo('/services')} 
            className={`transition-all duration-200 cursor-pointer bg-transparent border-none py-2 px-1 relative ${
              isLinkActive('/services') ? 'text-[#0012FF] dark:text-cyan-400 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
            }`}
          >
            <span>{t.nav.services}</span>
            {isLinkActive('/services') && (
              <motion.span 
                layoutId="activeNavLine"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0012FF] dark:bg-cyan-400 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Group 1 Dropdown: SYSTEMS & GRID */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('systems')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={`transition-all duration-200 cursor-pointer bg-transparent border-none flex items-center gap-1 ${
                isLinkActive('/products') || isLinkActive('/iot') || isLinkActive('/estimator')
                  ? 'text-[#0012FF] dark:text-cyan-400 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
              aria-expanded={activeDropdown === 'systems'}
              aria-haspopup="true"
            >
              <span>{language === 'tr' ? 'Sistemler & Şebeke' : 'Systems & Grid'}</span>
              <ChevronDown className={`h-3 w-3 opacity-70 transition-transform duration-200 ${activeDropdown === 'systems' ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'systems' && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border border-gray-150/45 dark:border-white/10 rounded-2xl p-3 shadow-2xl z-50 text-left"
                >
                  <span className="block text-[8px] font-mono text-gray-450 dark:text-gray-500 uppercase tracking-widest px-2 mb-2 font-bold pointer-events-none">
                    {language === 'tr' ? 'MÜHENDİSLİK ÜRÜNLERİ' : 'SYSTEM SOLUTIONS'}
                  </span>
                  <div className="space-y-1">
                    {/* Products */}
                    <button 
                      onClick={() => { setSelectedCategory(null); navigateTo('/products'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10 dark:group-hover/navitem:bg-cyan-400/10">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{t.nav.products}</span>
                        <span className="block text-[9px] text-gray-450 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Switchgear kabinleri, 2kV orta gerilim donanımları' : 'Switchgear hardware, medium-voltage distribution systems'}</span>
                      </div>
                    </button>

                    {/* IoT Grid */}
                    <button 
                      onClick={() => { navigateTo('/iot'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10 dark:group-hover/navitem:bg-cyan-400/10">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{t.nav.iot}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Tahminleyici soğutma ve lithium batarya şebeke kontrolü' : 'Predictive cooling and lithium grid power stabilization'}</span>
                      </div>
                    </button>

                    {/* Estimator */}
                    <button 
                      onClick={() => { navigateTo('/estimator'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10 dark:group-hover/navitem:bg-cyan-400/10">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{t.nav.estimator}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Projeniz için akıllı maliyet ve şebeke güç hesaplayıcı' : 'Smart pricing and electrical specs cost estimator'}</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Group 2 Dropdown: COMPANY & CORPORATE */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('corporate')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={`transition-all duration-200 cursor-pointer bg-transparent border-none flex items-center gap-1 ${
                isLinkActive('/about') || isLinkActive('/portfolio') || isLinkActive('/careers') || isLinkActive('/documents') || isLinkActive('/app-center') || isLinkActive('/branding') || isLinkActive('/press-kit')
                  ? 'text-[#0012FF] dark:text-cyan-400 font-extrabold' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
              aria-expanded={activeDropdown === 'corporate'}
              aria-haspopup="true"
            >
              <span>{language === 'tr' ? 'Kurumsal' : 'Corporate'}</span>
              <ChevronDown className={`h-3 w-3 opacity-70 transition-transform duration-200 ${activeDropdown === 'corporate' ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'corporate' && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[440px] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border border-gray-150/45 dark:border-white/10 rounded-2xl p-4 shadow-2xl z-50 text-left grid grid-cols-2 gap-3"
                >
                  <div className="col-span-2 text-[8px] font-mono text-gray-405 dark:text-gray-500 uppercase tracking-widest px-1 mb-1 font-bold border-b border-gray-100 dark:border-white/5 pb-1 pointer-events-none">
                    {language === 'tr' ? 'KURUMSAL BİLGİLER' : 'CORPORATE STANDARDS'}
                  </div>
                  
                  {/* Column 1 items */}
                  <div className="space-y-1">
                    {/* About */}
                    <button 
                      onClick={() => { navigateTo('/about'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-2.5 group/navitem items-start"
                    >
                      <div className="p-1.5 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <Info className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-bold text-gray-800 dark:text-gray-200 uppercase font-mono">{t.nav.about}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Kimiz & vizyon' : 'Our team & safety'}</span>
                      </div>
                    </button>

                    {/* Portfolio */}
                    <button 
                      onClick={() => { navigateTo('/portfolio'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-2.5 group/navitem items-start"
                    >
                      <div className="p-1.5 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-bold text-gray-800 dark:text-gray-200 uppercase font-mono">{t.nav.works}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Projelerimiz' : 'Reference works'}</span>
                      </div>
                    </button>

                    {/* Careers */}
                    <button 
                      onClick={() => { navigateTo('/careers'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-2.5 group/navitem items-start"
                    >
                      <div className="p-1.5 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-bold text-gray-800 dark:text-gray-200 uppercase font-mono">{t.nav.careers}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Mühendislik ekibi' : 'Engineers team'}</span>
                      </div>
                    </button>
                  </div>

                  {/* Column 2 items */}
                  <div className="space-y-1">
                    {/* Documents */}
                    <button 
                      onClick={() => { navigateTo('/documents'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-2.5 group/navitem items-start"
                    >
                      <div className="p-1.5 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-bold text-gray-800 dark:text-gray-200 uppercase font-mono">{t.nav.documents}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Şartnameler' : 'Spec sheets archive'}</span>
                      </div>
                    </button>

                    {/* App Center */}
                    <button 
                      onClick={() => { navigateTo('/app-center'); setActiveDropdown(null); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-2.5 group/navitem items-start"
                    >
                      <div className="p-1.5 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <AppWindow className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-bold text-gray-800 dark:text-gray-200 uppercase font-mono">{t.nav.appCenter}</span>
                        <span className="block text-[9px] text-gray-455 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Hızlı hesaplayıcı' : 'Telemetry control'}</span>
                      </div>
                    </button>

                    {/* Branding / Press Mini Links */}
                    <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex gap-2 justify-between px-1 text-[9px] font-mono text-gray-400 dark:text-gray-500">
                      <button onClick={() => { navigateTo('/branding'); setActiveDropdown(null); }} className="hover:text-[#0012FF] dark:hover:text-cyan-400 bg-transparent border-0 cursor-pointer p-0 font-bold">BRANDING</button>
                      <span>|</span>
                      <button onClick={() => { navigateTo('/press-kit'); setActiveDropdown(null); }} className="hover:text-[#0012FF] dark:hover:text-cyan-400 bg-transparent border-0 cursor-pointer p-0 font-bold">PRESS KIT</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Group 3 Dropdown: INSIGHTS & CONTACT */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('insights')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={`transition-all duration-200 cursor-pointer bg-transparent border-none flex items-center gap-1 ${
                isLinkActive('/blog') || isLinkActive('/news') || isLinkActive('/support') || isLinkActive('/contact')
                  ? 'text-[#0012FF] dark:text-cyan-400 font-bold' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
              aria-expanded={activeDropdown === 'insights'}
              aria-haspopup="true"
            >
              <span>{language === 'tr' ? 'Haberler & Destek' : 'Insights & Desk'}</span>
              <ChevronDown className={`h-3 w-3 opacity-70 transition-transform duration-200 ${activeDropdown === 'insights' ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'insights' && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border border-gray-150/45 dark:border-white/10 rounded-2xl p-3 shadow-2xl z-50 text-left"
                >
                  <span className="block text-[8px] font-mono text-gray-405 dark:text-gray-500 uppercase tracking-widest px-2 mb-2 font-bold pointer-events-none">
                    {language === 'tr' ? 'GÜNCELLEMELER VE DESTEK' : 'MEDIA & TECH HELP'}
                  </span>
                  <div className="space-y-1">
                    {/* Blog */}
                    <button 
                      onClick={() => { navigateTo('/blog'); setActiveDropdown(null); }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <Newspaper className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{t.nav.blog}</span>
                        <span className="block text-[9px] text-gray-450 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Sektörel makalelerimiz & analizler' : 'Engineering articles & structural summaries'}</span>
                      </div>
                    </button>

                    {/* News */}
                    <button 
                      onClick={() => { navigateTo('/news'); setActiveDropdown(null); }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <Megaphone className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{t.nav.news}</span>
                        <span className="block text-[9px] text-gray-450 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Resmi basın açıklamaları' : 'Official releases & commercial updates'}</span>
                      </div>
                    </button>

                    {/* Support desk */}
                    <button 
                      onClick={() => { navigateTo('/support'); setActiveDropdown(null); }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <LifeBuoy className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{language === 'tr' ? 'Destek Masası' : 'Help Desk'}</span>
                        <span className="block text-[9px] text-gray-450 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Müşteri paneli desteği' : 'Support SLA and direct coordinator logs'}</span>
                      </div>
                    </button>

                    {/* Contact */}
                    <button 
                      onClick={() => { navigateTo('/contact'); setActiveDropdown(null); }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition border-0 bg-transparent cursor-pointer flex gap-3 group/navitem items-start"
                    >
                      <div className="p-2 rounded-lg bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 group-hover/navitem:bg-[#0012FF]/10">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-gray-800 dark:text-gray-200 group-hover/navitem:text-[#0012FF] dark:group-hover/navitem:text-cyan-300 uppercase font-mono">{t.nav.contact}</span>
                        <span className="block text-[9px] text-gray-450 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'İletişime geçin' : 'Request instant infrastructure consultancy'}</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Global Toolbar Panel (Languages, Themes, Client login & Hamburger) */}
        <div className="flex items-center gap-3 sm:gap-4.5">
          {/* Quick Language Switch - Icon display with text */}
          <button
            onClick={toggleLanguage}
            className="py-1.5 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-205 flex items-center gap-1 cursor-pointer border-0 bg-transparent text-[11.5px] font-mono font-bold"
            title={language === 'en' ? 'Türkçe diline geç' : 'Switch to English'}
          >
            <Globe2 className="h-4 w-4" />
            <span>{language === 'en' ? 'EN' : 'TR'}</span>
          </button>

          {/* Quick theme toggler */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-200 flex items-center justify-center cursor-pointer border-0 bg-transparent"
            title="Toggle theme mode"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
          </button>

          <span className="h-5 w-[1px] bg-gray-200 dark:bg-white/10 hidden sm:block" />

          {/* Profile Portal badge representation */}
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2 bg-[#0012FF]/5 dark:bg-cyan-400/5 border border-[#0012FF]/15 dark:border-cyan-400/15 py-1 px-2.5 rounded-full">
              <button 
                onClick={() => navigateTo('/dashboard')}
                className="flex items-center gap-2 group cursor-pointer border-0 bg-transparent overflow-hidden text-left"
              >
                <div className="h-6 w-6 rounded-full bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center font-mono text-[9.5px] font-black uppercase">
                  {currentUser.name.substring(0, 2)}
                </div>
                <div className="max-w-[70px] hidden md:block">
                  <span className="block text-[10px] font-black text-gray-950 dark:text-white truncate font-sans uppercase">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </div>
              </button>
              <button 
                onClick={() => { logout(); navigateTo('/home'); }}
                className="p-1 text-gray-450 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer transition border-0 bg-transparent"
                title="Signout Console"
              >
                <LogOut className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigateTo('/login')}
              className="hidden sm:flex py-1.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase transition gap-1 items-center cursor-pointer border-0 bg-transparent"
            >
              <User className="h-4 w-4" />
              <span>{language === 'tr' ? 'Giriş' : 'Sign In'}</span>
            </button>
          )}

          {/* Shopping Basket Drawer Trigger */}
          <button
            onClick={() => setBasketOpen(true)}
            id="order-basket-header"
            title="Open Order Basket"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 transition cursor-pointer border-0 bg-transparent relative flex items-center justify-center"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {basket.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 h-4 w-4 rounded-full text-[8px] font-mono font-bold flex items-center justify-center leading-none animate-pulse">
                {basket.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Standard Estimator link */}
          <button
            onClick={() => navigateTo('/estimator')}
            className="hidden lg:flex py-2 px-4 rounded-full border border-gray-200 dark:border-white/10 hover:border-[#0012FF] dark:hover:border-cyan-400 text-xs font-bold uppercase hover:bg-[#0012FF]/5 text-gray-800 dark:text-gray-200 transition-all items-center gap-1 cursor-pointer bg-white dark:bg-slate-900"
          >
            <span>{t.nav.actionBtn}</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-955 dark:hover:text-white focus:outline-none bg-transparent border-none cursor-pointer flex items-center justify-center xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
