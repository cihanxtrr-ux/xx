/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Routes, Route, Navigate, Link } from 'react-router';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin,
  Sun,
  Moon,
  Globe2,
  ChevronDown,
  ShoppingCart,
  Home as HomeIcon,
  Layers,
  Cpu,
  Zap,
  Calculator,
  Briefcase,
  Newspaper,
  Megaphone,
  Info,
  Award,
  Download,
  FileText,
  Mail,
  Activity,
  Eye,
  AppWindow,
  LifeBuoy
} from 'lucide-react';

import Logo from './components/Logo';
import { useApp } from './context/AppContext';
import { EstimateConfiguration, CostBreakdown } from './types';
import { seoMetadata, getRouteKey } from './data/seoMetadata';
import { NewsDatabase } from './data/news';
import BasketDrawer from './components/BasketDrawer';

// Static imports for SSR rendering
import StaticHome from './pages/Home';
import StaticServices from './pages/Services';
import StaticProducts from './pages/Products';
import StaticEstimator from './pages/Estimator';
import StaticPortfolio from './pages/Portfolio';
import StaticBlog from './pages/Blog';
import StaticAbout from './pages/About';
import StaticCareers from './pages/Careers';
import StaticContacts from './pages/Contacts';
import StaticDocuments from './pages/Documents';
import StaticAppCenter from './pages/AppCenter';
import StaticAppDetails from './pages/AppDetails';
import StaticIot from './pages/Iot';
import StaticProductDetails from './pages/ProductDetails';
import StaticPressKit from './pages/PressKit';
import StaticBrandingGuidelines from './pages/BrandingGuidelines';
import StaticNews from './pages/News';
import StaticNewsDetail from './pages/NewsDetail';
import StaticSupport from './pages/Support';

const isServer = typeof window === 'undefined';

// Standalone separate page views - dynamically imported on client for code split performance benefits
const Home = isServer ? StaticHome : React.lazy(() => import('./pages/Home'));
const Services = isServer ? StaticServices : React.lazy(() => import('./pages/Services'));
const Products = isServer ? StaticProducts : React.lazy(() => import('./pages/Products'));
const Estimator = isServer ? StaticEstimator : React.lazy(() => import('./pages/Estimator'));
const Portfolio = isServer ? StaticPortfolio : React.lazy(() => import('./pages/Portfolio'));
const Blog = isServer ? StaticBlog : React.lazy(() => import('./pages/Blog'));
const About = isServer ? StaticAbout : React.lazy(() => import('./pages/About'));
const Careers = isServer ? StaticCareers : React.lazy(() => import('./pages/Careers'));
const Contacts = isServer ? StaticContacts : React.lazy(() => import('./pages/Contacts'));
const Documents = isServer ? StaticDocuments : React.lazy(() => import('./pages/Documents'));
const AppCenter = isServer ? StaticAppCenter : React.lazy(() => import('./pages/AppCenter'));
const AppDetails = isServer ? StaticAppDetails : React.lazy(() => import('./pages/AppDetails'));
const Iot = isServer ? StaticIot : React.lazy(() => import('./pages/Iot'));
const ProductDetails = isServer ? StaticProductDetails : React.lazy(() => import('./pages/ProductDetails'));
const PressKit = isServer ? StaticPressKit : React.lazy(() => import('./pages/PressKit'));
const BrandingGuidelines = isServer ? StaticBrandingGuidelines : React.lazy(() => import('./pages/BrandingGuidelines'));
const News = isServer ? StaticNews : React.lazy(() => import('./pages/News'));
const NewsDetail = isServer ? StaticNewsDetail : React.lazy(() => import('./pages/NewsDetail'));
const Support = isServer ? StaticSupport : React.lazy(() => import('./pages/Support'));

interface InquiryItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectType: string;
  scaleSqFt: number;
  specs: string;
  estimatedCost: number;
  timeline: string;
  timestamp: string;
  hasUserConfig?: boolean;
}

interface AppProps {
  ssrPath?: string;
  initialData?: any;
}

export default function App({ ssrPath, initialData }: AppProps) {
  const { 
    t, 
    theme, 
    language, 
    toggleTheme, 
    toggleLanguage, 
    setSelectedIotUseCase, 
    setSelectedCategory, 
    basket, 
    isBasketOpen, 
    setBasketOpen 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileIotSubmenuOpen, setMobileIotSubmenuOpen] = useState(false);
  const [mobileProductsSubmenuOpen, setMobileProductsSubmenuOpen] = useState(false);
  const [mobileAboutSubmenuOpen, setMobileAboutSubmenuOpen] = useState(false);
  const [desktopIotSubmenuOpen, setDesktopIotSubmenuOpen] = useState(false);
  const [desktopProductsSubmenuOpen, setDesktopProductsSubmenuOpen] = useState(false);
  const [desktopAboutSubmenuOpen, setDesktopAboutSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Initialize Smokey Fluid Interactive Background on Client Only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('smokey-fluid-cursor').then(module => {
        try {
          module.initFluid({
            id: 'smokey-fluid-canvas',
            transparent: true,
            densityDissipation: 2.2,
            velocityDissipation: 1.8,
            curl: 10,
            splatRadius: 0.18,
            splatForce: 3800,
            shading: true,
            colorUpdateSpeed: 8,
            paused: false
          });
        } catch (err) {
          console.error("Failed to run smokey-fluid-cursor:", err);
        }
      }).catch(err => {
        console.error("Error loading smokey-fluid-cursor:", err);
      });
    }
  }, []);

  // Auto-open submenus based on route
  useEffect(() => {
    if (currentPath.startsWith('/products')) {
      setDesktopProductsSubmenuOpen(true);
    }
    if (currentPath.startsWith('/iot')) {
      setDesktopIotSubmenuOpen(true);
    }
    if (currentPath.startsWith('/about') || currentPath.startsWith('/press-kit')) {
      setDesktopAboutSubmenuOpen(true);
      setMobileAboutSubmenuOpen(true);
    }
  }, [currentPath]);

  // Scroll to top on path changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentPath]);

  // Dynamically update site metadata (title, description, keywords) on client-side navigation
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const key = getRouteKey(currentPath);
      const meta = seoMetadata[key] || seoMetadata['home'];
      
      let title = meta.title;
      let description = meta.description;
      let keywords = meta.keywords;

      // Dynamic SEO override for individual news article pages
      if (currentPath.startsWith('/news/')) {
        const id = currentPath.substring('/news/'.length);
        const newsList = NewsDatabase[language === 'tr' ? 'tr' : 'en'] || NewsDatabase['en'];
        const newsItem = newsList.find(item => item.id === id);
        if (newsItem) {
          title = `${newsItem.title} | ${language === 'tr' ? 'X Elektrik Haberleri' : 'X Elektrik News'}`;
          description = newsItem.summary;
          keywords = `${newsItem.category.toLowerCase()}, news, ${newsItem.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, x elektrik`;
        }
      }

      // Update page title
      document.title = title;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // Update meta keywords
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.setAttribute('name', 'keywords');
        document.head.appendChild(metaKey);
      }
      metaKey.setAttribute('content', keywords);
    }
  }, [currentPath, language]);

  // Navigation utility with backward compatibility adapter for existing button triggers
  const navigateTo = (pathOrHash: string) => {
    let route = pathOrHash.replace(/^#\//, '').replace(/^\//, ''); // e.g. "services"
    if (route === '' || route === 'home') {
      route = 'home';
    }
    
    // Correctly resolve product ids in the adapter
    if (route.startsWith('products/details/') || route.startsWith('products/')) {
      if (!route.startsWith('products/c/') && !route.startsWith('products/p/') && !route.startsWith('products/details/')) {
        const prodId = route.substring('products/'.length);
        route = `products/details/${prodId}`;
      }
    }
    
    navigate(`/${route}`);
    setMobileMenuOpen(false);
  };

  // Hydrate initial staging inquiries from server-rendered global state or fallback
  const getInitialInquiries = () => {
    if (initialData?.inquiries) {
      return initialData.inquiries;
    }
    if (typeof window !== 'undefined' && (window as any).__ROUTE_DATA__?.inquiries) {
      return (window as any).__ROUTE_DATA__.inquiries;
    }
    return [
      {
        id: "RFP-9407",
        clientName: "Vertiv Systems Ltd",
        clientEmail: "bids@vertiv.com",
        projectType: "datacenter",
        scaleSqFt: 45000,
        specs: "1200 A - 277/480V • Backup N+1 Power",
        estimatedCost: 3520000,
        timeline: "14 Weeks Estimated",
        timestamp: "Today at 02:44 AM"
      },
      {
        id: "RFP-9118",
        clientName: "BMW Logistics Hub",
        clientEmail: "infra@bmw.ie",
        projectType: "renewable",
        scaleSqFt: 110000,
        specs: "400 A - 120/208V • Sustainable Microgrid",
        estimatedCost: 2189000,
        timeline: "11 Weeks Estimated",
        timestamp: "Yesterday"
      }
    ];
  };

  const [inquiries, setInquiries] = useState<InquiryItem[]>(getInitialInquiries);

  // Synchronize dynamic inquiries list on mount if not already done
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).__v_has_fetched) {
      (window as any).__v_has_fetched = true;
      fetch('/api/inquiries')
        .then(res => res.json())
        .then(data => {
          if (data && data.inquiries) {
            setInquiries(data.inquiries);
          }
        })
        .catch(err => console.error("Error synchronizing inquiries with API:", err));
    }
  }, []);

  // Handle client scroll state for elegant header transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for adding dynamic RFPs from the SmartGrid estimator with API persistence
  const handleAddNewInquiry = async (
    config: EstimateConfiguration & { cost: CostBreakdown; timeline: string },
    clientInfo?: { name: string; email: string; phone?: string }
  ) => {
    const lineFeedSpecs = `${config.amperage} A - ${config.voltage} ${
      [
        config.resilientPower ? '• UPS' : '',
        config.smartControls ? '• Smart' : '',
        config.greenEnergy ? '• Solar' : '',
        config.industrialMachinery ? '• Heavys' : '',
        config.networking ? '• Comm' : '',
      ].filter(Boolean).join(' ')
    }`;

    const payload = {
      clientName: clientInfo?.name || "You (Staged)",
      clientEmail: clientInfo?.email || "local.sandbox@x-elektrik.com",
      clientPhone: clientInfo?.phone || "",
      projectType: config.projectType,
      scaleSqFt: config.areaSqFt,
      specs: lineFeedSpecs,
      estimatedCost: config.cost.totalCost,
      timeline: config.timeline
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) {
          setInquiries(data.inquiries);
          return;
        }
      }
    } catch (err) {
      console.error("Error submitting inquiry to API:", err);
    }

    // Client-side fallback if server connection goes down
    const randomId = `RFP-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newInquiry: InquiryItem = {
      id: randomId,
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      clientPhone: payload.clientPhone,
      projectType: payload.projectType,
      scaleSqFt: payload.scaleSqFt,
      specs: payload.specs,
      estimatedCost: payload.estimatedCost,
      timeline: payload.timeline,
      timestamp: `Today at ${nowStr}`,
      hasUserConfig: true
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const handleDismissInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) {
          setInquiries(data.inquiries);
          return;
        }
      }
    } catch (err) {
      console.error("Error dismissing inquiry via API:", err);
    }
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const handleAddBasketInquiry = async (newInquiry: InquiryItem) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: newInquiry.clientName,
          clientEmail: newInquiry.clientEmail,
          clientPhone: newInquiry.clientPhone,
          projectType: newInquiry.projectType,
          scaleSqFt: newInquiry.scaleSqFt,
          specs: newInquiry.specs,
          estimatedCost: newInquiry.estimatedCost,
          timeline: newInquiry.timeline
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) {
          setInquiries(data.inquiries);
          return;
        }
      }
    } catch (err) {
      console.error("Error submitting basket RFP via API:", err);
    }
    setInquiries(prev => [newInquiry, ...prev]);
  };

  // Helper to determine active link states
  const isLinkActive = (pathOrHash: string) => {
    const cleanPath = pathOrHash.replace(/^#/, ''); // e.g. /home or /services
    const normalize = (p: string) => p.startsWith('/') ? p : `/${p}`;
    const cleanCurrent = currentPath === '/' ? '/home' : normalize(currentPath);
    const cleanLeft = cleanPath === '/' ? '/home' : normalize(cleanPath);
    return cleanCurrent === cleanLeft || cleanCurrent.startsWith(cleanLeft + '/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-gray-800 dark:text-gray-100 font-sans antialiased selection:bg-[#0012FF]/10 selection:text-[#0012FF] flex flex-col justify-between transition-colors duration-200">
      
      {/* Background Smokey Fluid Simulation Canvas */}
      <canvas 
        id="smokey-fluid-canvas" 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70 dark:opacity-85 backdrop-blur-3xl"
      />
      
      {/* DESKTOP PERSISTENT LEFT SIDEBAR */}
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
                    <Activity className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('/iot') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-650 dark:group-hover:text-gray-300'}`} />
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
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
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
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
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
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
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

          <button
            onClick={() => navigateTo('/estimator')}
            className="w-full h-12 flex items-center justify-center py-3 px-4 rounded-xl border-2 border-gray-900 dark:border-cyan-400 text-white dark:text-slate-950 bg-gray-955 dark:bg-cyan-400 hover:bg-white hover:text-gray-955 dark:hover:bg-transparent dark:hover:text-cyan-400 hover:border-gray-200 hover:shadow-lg transition-all duration-300 gap-1.5 cursor-pointer text-[12.5px] font-extrabold uppercase tracking-wider"
          >
            <span>{t.nav.actionBtn}</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </aside>

      {/* HIGH-END STICKY TOP GLASS NAVIGATION */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/85 dark:bg-black/60 backdrop-blur-xl shadow-lg shadow-black/5 py-7 border-gray-150/40 dark:border-white/5' 
          : 'bg-white/60 dark:bg-black/25 backdrop-blur-md py-10 border-gray-100/30 dark:border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('/home')} 
            className="flex-shrink-0 transition-opacity hover:opacity-90 cursor-pointer bg-transparent border-none p-0"
          >
            <Logo size="md" lightBackground={theme === 'light'} />
          </button>

          {/* Desktop Navigation Links */}
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
                          <span className="block text-[9px] text-gray-450 dark:text-gray-400 font-normal leading-tight mt-0.5">{language === 'tr' ? 'Switchgear kabinleri, 24kV orta gerilim donanımları' : 'Switchgear hardware, medium-voltage distribution systems'}</span>
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
                          <span className="block text-[9px] text-gray-450 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Kimiz & vizyon' : 'Our team & safety'}</span>
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
                          <span className="block text-[9px] text-gray-450 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Projelerimiz' : 'Reference works'}</span>
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
                          <span className="block text-[9px] text-gray-450 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Mühendislik ekibi' : 'Engineers team'}</span>
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
                          <span className="block text-[9px] text-gray-450 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Şartnameler' : 'Spec sheets archive'}</span>
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
                          <span className="block text-[9px] text-gray-450 dark:text-gray-400 mt-0.5">{language === 'tr' ? 'Hızlı hesaplayıcı' : 'Telemetry control'}</span>
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

          {/* Action CTA, Utility toggles and hamburger menu aligned right */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              title="Switch Language"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 transition flex items-center gap-1.5 cursor-pointer border-0 bg-transparent text-xs font-mono font-bold uppercase"
            >
              <Globe2 className="h-4 w-4" />
              <span>{language === 'en' ? 'EN' : 'TR'}</span>
            </button>

            {/* Theme Trigger */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme Mode"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 transition cursor-pointer border-0 bg-transparent"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
            </button>

            {/* Mobile Basket Trigger */}
            <button
              onClick={() => setBasketOpen(true)}
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
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-955 dark:hover:text-white focus:outline-none bg-transparent border-none cursor-pointer flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

        {/* Mobile Navigation Drawer */}
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
                className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#000000] shadow-2xl z-50 p-6 flex flex-col justify-start overflow-y-auto border-l border-gray-150 dark:border-white/10 xl:hidden"
              >
                {/* Header Section inside Drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/5">
                  <Logo size="md" lightBackground={theme === 'light'} />
                  
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer border-0 flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Subnav links Scroll Container */}
                <nav className="py-6 flex flex-col gap-6 text-xs uppercase tracking-wider font-bold">
                  {/* Category Group 1: CORE NAVIGATION */}
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
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
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
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
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                  {language === 'tr' ? 'KURUMSAL KİMLİK' : 'COMPANY INFO'}
                </span>

                <button 
                  onClick={() => { navigateTo('/portfolio'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('/portfolio') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
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
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
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
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
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
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
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
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
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
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-55 dark:hover:bg-white/5'
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
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-55 dark:hover:bg-white/5'
                  }`}
                >
                  <LifeBuoy className="h-4 w-4" />
                  <span>{language === 'tr' ? 'Destek Masası' : 'Help Desk'}</span>
                </button>
              </div>
            </nav>

            {/* Footer Section pinned inside Drawer */}
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 space-y-3">
              <button
                onClick={() => { navigateTo('/estimator'); setMobileMenuOpen(false); }}
                className="w-full h-11 flex items-center justify-center p-3 rounded-xl bg-[#0012FF] text-white dark:bg-cyan-400 dark:text-slate-950 font-bold hover:opacity-90 transition-all uppercase text-[10px] tracking-wider cursor-pointer border-0 gap-1"
              >
                <span>{t.nav.actionBtn}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      {/* DETACHED MAIN TRANSITIONAL CONTENT LAYER */}
      <main className="flex-grow pt-24 sm:pt-28 xl:pt-28 pb-12 w-full">
        <React.Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0012FF] dark:border-t-cyan-400" />
            <span className="mt-4 text-xs font-mono text-gray-400 uppercase tracking-widest animate-pulse">
              GRID CONNECTION INITIALIZING...
            </span>
          </div>
        }>
          <AnimatePresence mode="wait">
            <Routes>
            <Route path="/" element={<Home onNavigate={navigateTo} />} />
            <Route path="/home" element={<Home onNavigate={navigateTo} />} />
            <Route path="/services" element={<Services onNavigate={navigateTo} />} />
            
            <Route path="/products" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/c/:category" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/p/:page" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/c/:category/p/:page" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/details/:productId" element={<ProductDetails onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/:productId" element={<ProductDetails onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />

            <Route path="/estimator" element={<Estimator inquiries={inquiries} onAddNewInquiry={handleAddNewInquiry} onDismissInquiry={handleDismissInquiry} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/c/:category" element={<Blog />} />
            <Route path="/blog/p/:page" element={<Blog />} />
            <Route path="/blog/c/:category/p/:page" element={<Blog />} />
            <Route path="/blog/article/:articleId" element={<Blog />} />

            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/c/:category" element={<Documents />} />

            <Route path="/app-center" element={<AppCenter />} />
            <Route path="/app-center/:appId" element={<AppDetails />} />

            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/support" element={<Support />} />
            <Route path="/iot" element={<Iot />} />
            <Route path="/iot/:useCase" element={<Iot />} />
            <Route path="/press-kit" element={<PressKit />} />
            <Route path="/branding" element={<BrandingGuidelines />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AnimatePresence>
        </React.Suspense>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-900 relative">
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-gray-55/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 text-left w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-white/5 pb-12">
            
            {/* Col 1: Logo & Brief */}
            <div className="md:col-span-5 space-y-4">
              <button 
                onClick={() => navigateTo('/home')} 
                className="transition-opacity hover:opacity-90 bg-transparent border-none p-0 block cursor-pointer"
              >
                <Logo size="md" lightBackground={false} />
              </button>
              <p className="text-xs leading-relaxed max-w-sm text-gray-400">
                {t.footer.brief}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>{t.footer.address}</span>
              </div>
            </div>

            {/* Col 2: Capabilities links */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{t.footer.solutionsTitle}</span>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.commTitle}</button></li>
                <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.indTitle}</button></li>
                <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors text-cyan-400 bg-transparent border-none p-0 text-left cursor-pointer font-bold">{t.services.datacenterTitle}</button></li>
                <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.renewTitle}</button></li>
              </ul>
            </div>

            {/* Col 3: Resources & Standards */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{t.footer.corporateTitle}</span>
              <p className="text-xs leading-relaxed max-w-xs text-gray-500">
                {t.footer.corporateText}
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-white text-xs bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-[#00FF00]" />
                <strong>+353 1 902 4499</strong>
              </span>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
            <div>
              <span>{t.footer.rights}</span>
              <span className="mx-2">•</span>
              <button onClick={() => navigateTo('/home')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t.footer.privacy}</button>
              <span className="mx-2">•</span>
              <button onClick={() => navigateTo('/estimator')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t.footer.terms}</button>
              <span className="mx-2">•</span>
              <button onClick={() => navigateTo('/press-kit')} className="hover:text-cyan-400 font-mono tracking-wider transition-colors bg-transparent border-none p-0 cursor-pointer font-bold">{language === 'tr' ? 'MARKA & BASIN' : 'BRANDING & PRESS'}</button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[10px]">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>{t.footer.accreditation}</span>
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Order Basket Dynamic FAB */}
      <AnimatePresence>
        {basket.length > 0 && !isBasketOpen && (
          <motion.button
            key="basket-fab"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={() => setBasketOpen(true)}
            className="fixed bottom-6 right-6 z-45 p-4 rounded-full bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200 border-0 cursor-pointer"
            id="order-basket-fab"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono hidden sm:inline">
              {language === 'tr' ? 'Sepeti İncele' : 'Review Basket'}
            </span>
            <span className="bg-white dark:bg-slate-900 text-[#0012FF] dark:text-cyan-400 h-5 w-5 rounded-full text-[10px] font-mono font-extrabold flex items-center justify-center leading-none shadow-inner">
              {basket.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-out checkout Drawer */}
      <BasketDrawer onAddInquiry={handleAddBasketInquiry} />

    </div>
  );
}
