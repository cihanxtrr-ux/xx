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
  LifeBuoy,
  User,
  LogOut
} from 'lucide-react';

import Logo from './components/Logo';
import { useApp } from './context/AppContext';
import { EstimateConfiguration, CostBreakdown } from './types';
import { seoMetadata, getRouteKey } from './data/seoMetadata';
import { NewsDatabase } from './data/news';
import BasketDrawer from './components/BasketDrawer';
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

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
import StaticLogin from './pages/Login';
import StaticRegister from './pages/Register';
import StaticDashboard from './pages/Dashboard';

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
const Login = isServer ? StaticLogin : React.lazy(() => import('./pages/Login'));
const Register = isServer ? StaticRegister : React.lazy(() => import('./pages/Register'));
const Dashboard = isServer ? StaticDashboard : React.lazy(() => import('./pages/Dashboard'));

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
    setBasketOpen,
    currentUser,
    logout
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    <div style={{ background: 'linear-gradient(170deg,rgba(62, 0, 143, 0.45) 0%, rgba(48, 48, 176, 0.20) 35%, rgba(62, 0, 143, 0.15) 60%, rgba(48, 48, 176, 0.20) 75%)' }} className="min-h-screen bg-white dark:bg-[#000000] text-gray-800 dark:text-gray-100 font-sans antialiased selection:bg-[#0012FF]/10 selection:text-[#0012FF] flex flex-col justify-between transition-colors duration-200">
      
      {/* Background Smokey Fluid Simulation Canvas */}
      <canvas 
        id="smokey-fluid-canvas" 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 backdrop-blur-3xl background:transparent"
      />
      
      {/* DESKTOP PERSISTENT LEFT SIDEBAR */}
      <Sidebar navigateTo={navigateTo} isLinkActive={isLinkActive} />

      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigateTo={navigateTo}
        isLinkActive={isLinkActive}
      />

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigateTo={navigateTo}
        isLinkActive={isLinkActive}
      />

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
            <Route path="/login" element={<Login onNavigate={navigateTo} />} />
            <Route path="/register" element={<Register onNavigate={navigateTo} />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  onNavigate={navigateTo} 
                  inquiries={inquiries} 
                  onAddNewInquiry={handleAddNewInquiry} 
                  onDismissInquiry={handleDismissInquiry} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AnimatePresence>
        </React.Suspense>
      </main>

      {/* FOOTER SECTION */}
      <Footer navigateTo={navigateTo} />

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
