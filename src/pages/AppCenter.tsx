import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { appsData, ApplicationInfo } from '../data/appsData';
import { 
  Search, 
  Download, 
  CheckCircle2, 
  Loader2, 
  SlidersHorizontal, 
  Activity, 
  Cpu, 
  Zap, 
  Trophy, 
  Star,
  Monitor,
  Smartphone,
  Globe,
  Plus
} from 'lucide-react';

export default function AppCenter() {
  const { language, t } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'grid' | 'monitoring' | 'analysis'>('all');
  const [downloadStates, setDownloadStates] = useState<Record<string, 'idle' | 'loading' | 'completed'>>({});

  // Localized general texts for the App Center dashboard
  const localTexts = {
    en: {
      tag: 'INDUSTRIAL COMPOSITIONS & TOOLS',
      title: 'Digital App Center',
      desc: 'Deploy official utility, transmission analysis, and mobile remote telemetrics setups locally across major platform terminals.',
      searchPlaceholder: 'Search applications...',
      all: 'All Solutions',
      grid: 'Grid Control',
      monitoring: 'Monitoring & IoT',
      analysis: 'Analysis & Simulation',
      version: 'Version',
      fileSize: 'File Size',
      downloadBtn: 'Get App',
      downloadingBtn: 'Deploying',
      downloadedBtn: 'Deployed',
      detailsBtn: 'Application Details',
      statsHeader: 'SYSTEM INTEGRITY STATE',
      noApps: 'No applications found',
      noAppsDesc: 'Try adjusting your filters or search keywords.',
      clearFilters: 'Clear All Filters',
    },
    tr: {
      tag: 'ENDÜSTRİYEL UYGULAMALAR VE ARAÇLAR',
      title: 'Dijital Uygulama Merkezi',
      desc: 'Şebeke analiz araçlarımızı, mobil telemetrik izleme terminallerini ve otomasyon panellerini yerel sistemlerinize hızla kurun.',
      searchPlaceholder: 'Uygulamalarda ara...',
      all: 'Tüm Çözümler',
      grid: 'Şebeke Kontrolü',
      monitoring: 'İzleme & IoT',
      analysis: 'Analiz & Simülasyon',
      version: 'Sürüm',
      fileSize: 'Dosya Boyutu',
      downloadBtn: 'Uygulamayı Al',
      downloadingBtn: 'Kuruluyor',
      downloadedBtn: 'Kuruldu',
      detailsBtn: 'Detaya Git',
      statsHeader: 'SİSTEM BÜTÜNLÜK DURUMU',
      noApps: 'Uygulama bulunamadı',
      noAppsDesc: 'Filtreleri değiştirmeyi veya farklı bir arama yapmayı deneyin.',
      clearFilters: 'Filtreleri Temizle',
    }
  }[language];

  // Map application system icons elegantly
  const renderAppIcon = (name: string, color: string) => {
    const iconClass = "h-8 w-8 text-white";
    switch (name) {
      case 'grid':
        return (
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-sm flex items-center justify-center`}>
            <Cpu className={iconClass} />
          </div>
        );
      case 'power':
        return (
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-sm flex items-center justify-center`}>
            <Zap className={iconClass} />
          </div>
        );
      case 'battery':
        return (
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-sm flex items-center justify-center`}>
            <Activity className={iconClass} />
          </div>
        );
      default:
        return (
          <div className={`p-4 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 shadow-sm flex items-center justify-center`}>
            <SlidersHorizontal className={iconClass} />
          </div>
        );
    }
  };

  // Map platform configuration directly to elegant icons
  const getPlatformIcon = (platform: 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux' | 'Web') => {
    switch (platform) {
      case 'Windows':
      case 'macOS':
      case 'Linux':
        return <Monitor className="h-3 w-3 inline" />;
      case 'iOS':
      case 'Android':
        return <Smartphone className="h-3 w-3 inline" />;
      case 'Web':
        return <Globe className="h-3 w-3 inline" />;
    }
  };

  const simulateDownload = (e: React.MouseEvent, app: ApplicationInfo) => {
    e.stopPropagation(); // Avoid triggering details nav click
    if (downloadStates[app.id] === 'loading' || downloadStates[app.id] === 'completed') return;

    setDownloadStates(prev => ({ ...prev, [app.id]: 'loading' }));

    setTimeout(() => {
      setDownloadStates(prev => ({ ...prev, [app.id]: 'completed' }));
      
      // Standalone simulator stub download
      try {
        const primaryPlatform = app.platforms[0];
        const content = `X ELEKTRIK SYSTEMS DEPLOYMENT GATEWAY\n\nApp ID: ${app.id}\nUnified Binary Name: ${app.name}\nInstalled Version: ${app.version}\nPlatform Targeted: ${primaryPlatform.name}\nChecksum Verify: SHA256:${app.sha256}\n\nSuccessful local deployment. Authorized secure digital key registered.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${app.id}_installer.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Local simulator download trigger failed', err);
      }
    }, 1500);
  };

  // Filter logic
  const filteredApps = appsData.filter(app => {
    const title = app.name[language] || app.name;
    const desc = app.shortDesc[language];
    const matchesSearch = 
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="app-center-dashboard"
    >
      {/* Visual Ambient Banner Decoration */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-lg">
        <div className="absolute right-[-100px] top-[-100px] w-[300px] h-[300px] bg-[#0012FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-[30vw] bottom-[-150px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10 text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 bg-white/10 dark:bg-cyan-950/40 px-3 py-1 rounded-full border border-white/5">
            {localTexts.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight leading-none text-white">
            {localTexts.title}
          </h1>
          <p className="text-gray-300 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            {localTexts.desc}
          </p>
        </div>
      </div>

      {/* Control panel: Categorization tabs and search inputs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150 dark:border-white/10">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'grid', 'monitoring', 'analysis'] as const).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer border relative overflow-hidden ${
                  isActive
                    ? 'text-white dark:text-slate-950 border-transparent shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:text-gray-950 dark:hover:text-white'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gray-950 dark:bg-cyan-400 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{localTexts[cat]}</span>
              </button>
            );
          })}
        </div>

        {/* Live Search Inputs */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder={localTexts.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0012FF] dark:focus:ring-cyan-400 placeholder-gray-400 text-gray-800 dark:text-white transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
        </div>

      </div>

      {/* Grid listing of application cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredApps.map((app) => {
            const status = downloadStates[app.id] || 'idle';
            const avgRating = app.rating;
            const primaryPlatform = app.platforms[0];

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(`/app-center/${app.id}`)}
                className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 rounded-3xl flex flex-col justify-between hover:shadow-xl dark:hover:border-cyan-400/40 transition-all cursor-pointer group text-left relative overflow-hidden"
              >
                {/* Visual Accent Hover Overlay */}
                <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                
                <div className="space-y-5">
                  {/* Top: Icon, category, and Platform badges */}
                  <div className="flex items-start justify-between">
                    {renderAppIcon(app.iconName, app.iconColor)}
                    
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-[10px] font-mono uppercase bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md font-bold">
                        {app.categoryLabel[language]}
                      </span>
                      {/* Platform Badges requested */}
                      <div className="flex gap-1">
                        {app.platforms.map((p) => (
                          <span 
                            key={p.name} 
                            title={p.name}
                            className="bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 text-[9px] font-mono text-gray-400 dark:text-gray-400 p-1 rounded-md inline-flex items-center justify-center"
                          >
                            {getPlatformIcon(p.name)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating, Title/Short Description */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(avgRating) ? 'fill-current' : 'opacity-30'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400">
                        {avgRating} ({app.reviewsCount})
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-[#0012FF] dark:group-hover:text-cyan-400 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed min-h-[50px] line-clamp-3">
                        {app.shortDesc[language]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer specs details + Primary Action download bounds */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{localTexts.version}</span>
                    <strong className="text-xs text-gray-800 dark:text-gray-200">{app.version}</strong>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{localTexts.fileSize}</span>
                    <strong className="text-xs text-gray-800 dark:text-gray-200">{primaryPlatform.fileSize}</strong>
                  </div>

                  {/* Interactive Get/Download Button requested */}
                  <button
                    onClick={(e) => simulateDownload(e, app)}
                    disabled={status === 'loading'}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
                        : status === 'loading'
                        ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 border-transparent'
                        : 'bg-[#0012FF]/5 hover:bg-[#0012FF] hover:text-white dark:bg-cyan-500/5 dark:hover:bg-cyan-400 dark:text-cyan-400 dark:hover:text-slate-950 border-[#0012FF]/10 dark:border-cyan-400/20 text-[#0012FF]'
                    }`}
                  >
                    {status === 'loading' && (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>{localTexts.downloadingBtn}</span>
                      </>
                    )}
                    {status === 'completed' && (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span>{localTexts.downloadedBtn}</span>
                      </>
                    )}
                    {status === 'idle' && (
                      <>
                        <Download className="h-3 w-3" />
                        <span>{localTexts.downloadBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty filtering layout */}
      {filteredApps.length === 0 && (
        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-3xl py-16 px-6 text-center space-y-4">
          <SlidersHorizontal className="h-10 w-10 text-gray-300 mx-auto" />
          <div className="space-y-1">
            <h4 className="font-bold text-gray-700 dark:text-gray-300">{localTexts.noApps}</h4>
            <p className="text-xs text-gray-400">{localTexts.noAppsDesc}</p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="text-xs font-bold text-[#0012FF] dark:text-cyan-400 hover:underline bg-transparent border-0 cursor-pointer"
          >
            {localTexts.clearFilters}
          </button>
        </div>
      )}

    </motion.div>
  );
}
