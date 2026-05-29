import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { appsData, reviewsData, ApplicationInfo, Review } from '../data/appsData';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  Loader2, 
  Star, 
  Cpu, 
  Activity, 
  Zap, 
  ShieldAlert, 
  Share2, 
  Copy, 
  Check,
  Twitter, 
  Linkedin, 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Terminal, 
  Info, 
  SlidersHorizontal,
  AppWindow,
  HelpCircle,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';

export default function AppDetails() {
  const { language } = useApp();
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();

  // Find targeted application registry
  const app = appsData.find(item => item.id === appId) || appsData[0];
  const reviews = reviewsData[app.id] || [];

  const [activeTab, setActiveTab] = useState<'info' | 'requirements' | 'history' | 'install'>('info');
  const [downloadStates, setDownloadStates] = useState<Record<string, 'idle' | 'loading' | 'completed'>>({});
  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({});
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [hasLikedReview, setHasLikedReview] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [integrityPlatform, setIntegrityPlatform] = useState<string>('');
  const [copiedHash, setCopiedHash] = useState(false);
  const [userInputHash, setUserInputHash] = useState('');

  // Localized texts
  const localTexts = {
    en: {
      backBtn: 'App Center',
      version: 'Current Version',
      released: 'Released',
      developer: 'Developer Team',
      sha256: 'SHA-256 Integrity Verification',
      copied: 'Checkout Link Copied!',
      copySupport: 'Copy Share Link',
      featuresTitle: 'Detailed Description',
      releaseNotes: 'Active Release Notes',
      requirements: 'Technical Requirements',
      minRequirements: 'Minimum Requirements',
      recRequirements: 'Recommended Requirements',
      installGuide: 'Step-by-Step Installation',
      changelog: 'Full Version History',
      faqTitle: 'Frequently Asked Questions',
      downloadPlatform: 'Download for Specific Platforms',
      relatedTitle: 'Related App Suite',
      shareTitle: 'Share App Integration',
      reviewsTitle: 'Customer Reviews & Ratings',
      outOf: 'out of 5 stars',
      basedOn: 'based on validation entries',
      helpfulness: 'Was this review helpful?',
      helpfulButton: 'Helpful',
      reviewTitle: 'Submit Feedback Verification',
      os: 'Operating System',
      cpu: 'Central Processor',
      ram: 'Memory (RAM)',
      storage: 'Solid Disk Space',
      gpu: 'Graphics Processing',
      getNow: 'Deploy Secure App Stub',
      downloadBtn: 'Get App',
      downloadingBtn: 'Deploying',
      downloadedBtn: 'Deployed',
      ratingDistribution: 'Ratings Distribution',
      supportContact: 'Support Portal Enquiries',
      integrityPlatformTitle: 'Platform Checksum',
      integritySelectPlatform: 'Select Platform',
      inputPlaceholder: 'Paste SHA-256 hash to verify...',
      verifyBtn: 'Verify Checksum',
      matchMsg: 'Success: Secure match verified!',
      mismatchMsg: 'Warning: Hash discrepancy detected!',
      noInputResult: 'Enter computed local hash to run secure validation loop.',
      instructionsLabel: 'Verification Terminal commands:',
      winCmd: 'Windows Cmd:',
      macCmd: 'macOS / Linux Shell:',
      platformLabel: 'Platform OS Binding',
      verifierTitle: 'Active Integrity Match Validator'
    },
    tr: {
      backBtn: 'Uygulama Merkezi',
      version: 'Mevcut Sürüm',
      released: 'Yayınlanma',
      developer: 'Geliştirici Ekip',
      sha256: 'SHA-256 Güvenlik İmzası',
      copied: 'Paylaşım Linki Kopyalandı!',
      copySupport: 'Paylaşım Linkini Kopyala',
      featuresTitle: 'Detaylı Açıklama',
      releaseNotes: 'Aktif Sürüm Notları',
      requirements: 'Teknik Sistem Gereksinimleri',
      minRequirements: 'Minimum Gereksinimler',
      recRequirements: 'Önerilen Gereksinimler',
      installGuide: 'Adım Adım Kurulum Kılavuzu',
      changelog: 'Tüm Sürüm Geçmişi',
      faqTitle: 'Sıkça Sorulan Sorular',
      downloadPlatform: 'Platform Özelinde İndirme Seçenekleri',
      relatedTitle: 'İlgili Diğer Uygulamalar',
      shareTitle: 'Uygulamayı Paylaş',
      reviewsTitle: 'Kullanıcı İncelemeleri & Puanlar',
      outOf: '5 yıldız üzerinden',
      basedOn: 'doğrulanmış değerlendirme girişleri',
      helpfulness: 'Bu inceleme faydalı oldu mu?',
      helpfulButton: 'Faydalı',
      reviewTitle: 'Geri Bildirim Bildir',
      os: 'İşletim Sistemi',
      cpu: 'İşlemci (CPU)',
      ram: 'Bellek (RAM)',
      storage: 'Kalan Disk Alanı',
      gpu: 'Grafik İşlemci (GPU)',
      getNow: 'Güvenli Dosyayı Deplore Et',
      downloadBtn: 'İndir',
      downloadingBtn: 'Kuruluyor',
      downloadedBtn: 'Kuruldu',
      ratingDistribution: 'Puan Dağılım Tablosu',
      supportContact: 'Destek Portalı İletişim',
      integrityPlatformTitle: 'Platform Kontrol Toplamı',
      integritySelectPlatform: 'Platform Seç',
      inputPlaceholder: 'Doğrulamak için SHA-256 özetini yapıştırın...',
      verifyBtn: 'Doğrula',
      matchMsg: 'Başarılı: Güvenli eşleşme onaylandı!',
      mismatchMsg: 'Uyarı: Karma (hash) uyuşmazlığı saptandı!',
      noInputResult: 'Doğrulama döngüsünü çalıştırmak için yerel özeti yapıştırın.',
      instructionsLabel: 'Terminal Doğrulama Komutları:',
      winCmd: 'Windows Komut İstemi:',
      macCmd: 'macOS / Linux Kabuk (Shell):',
      platformLabel: 'Platform İşletim Sistemi',
      verifierTitle: 'Aktif Bütünlük Eşleştirme Aracı'
    }
  }[language];

  const handleDownloadPlatform = (platformName: string) => {
    if (downloadStates[platformName] === 'loading' || downloadStates[platformName] === 'completed') return;

    setDownloadStates(prev => ({ ...prev, [platformName]: 'loading' }));

    setTimeout(() => {
      setDownloadStates(prev => ({ ...prev, [platformName]: 'completed' }));
      
      // Standalone browser client download creator
      try {
        const platformObj = app.platforms.find(p => p.name === platformName);
        const targetSha = platformObj?.sha256 || app.sha256;
        const fileContent = `X ELEKTRIK SECURITY PROTOCOL SUITE\n\nApp target: ${app.name}\nSpecified Platform OS Binding: ${platformName}\nSHA256: ${targetSha}\nAuthorized cryptokey signature: RSA2048-VERIFIED`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `XE_${app.id}_${platformName.toLowerCase()}_installer.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Platform download simulator error', err);
      }
    }, 1500);
  };

  const copyShareLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error('Sharing clipboard copy failure', e);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLikeReview = (reviewId: string) => {
    if (hasLikedReview[reviewId]) return;

    setHasLikedReview(prev => ({ ...prev, [reviewId]: true }));
    setReviewsList(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        return { ...rev, helpfulCount: rev.helpfulCount + 1 };
      }
      return rev;
    }));
  };

  const renderAppIcon = (name: string, color: string) => {
    const iconClass = "h-14 w-14 text-white";
    switch (name) {
      case 'grid':
        return (
          <div className={`p-4 rounded-3xl bg-gradient-to-br ${color} shadow-md flex items-center justify-center`}>
            <Cpu className={iconClass} />
          </div>
        );
      case 'power':
        return (
          <div className={`p-4 rounded-3xl bg-gradient-to-br ${color} shadow-md flex items-center justify-center`}>
            <Zap className={iconClass} />
          </div>
        );
      case 'battery':
        return (
          <div className={`p-4 rounded-3xl bg-gradient-to-br ${color} shadow-md flex items-center justify-center`}>
            <Activity className={iconClass} />
          </div>
        );
      default:
        return (
          <div className={`p-4 rounded-3xl bg-gradient-to-br from-gray-600 to-gray-700 shadow-md flex items-center justify-center`}>
            <SlidersHorizontal className={iconClass} />
          </div>
        );
    }
  };

  // Find related applications
  const relatedApps = appsData.filter(item => item.id !== app.id).slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left"
    >
      {/* Return Navigation Anchor */}
      <button
        onClick={() => navigate('/app-center')}
        className="inline-flex items-center gap-2 group text-xs font-mono font-bold uppercase tracking-wider text-gray-500 hover:text-[#0012FF] dark:hover:text-cyan-400 cursor-pointer bg-transparent border-none transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {localTexts.backBtn}
      </button>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column Section */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Header Module */}
          <div className="flex flex-col sm:flex-row items-start gap-6 bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute right-[-80px] top-[-80px] w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl" />
            
            {renderAppIcon(app.iconName, app.iconColor)}

            <div className="space-y-3 flex-1">
              <div>
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-[#0012FF] dark:text-cyan-400 mb-1 block">
                  {app.categoryLabel[language]}
                </span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
                  {app.name}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <strong className="text-gray-700 dark:text-gray-200">{app.rating}</strong> ({app.reviewsCount} records)
                </span>
                <span>•</span>
                <span>{localTexts.version}: <strong className="text-gray-700 dark:text-gray-200">{app.version}</strong></span>
                <span>•</span>
                <span>{localTexts.released}: <strong className="text-gray-700 dark:text-gray-200">{app.releaseDate}</strong></span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {app.shortDesc[language]}
              </p>
            </div>
          </div>

          {/* Interactive Screenshot Gallery Module requested */}
          <div className="space-y-3">
            <div className="h-[250px] sm:h-[450px] rounded-3xl border border-gray-150 dark:border-white/10 overflow-hidden relative group bg-black">
              {/* Main Display Box */}
              <img 
                src={app.screenshots[activeScreenshot]} 
                alt={`${app.name} active screen ${activeScreenshot + 1}`}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              
              {/* Modern Ambient Title Ribbon */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-950 to-transparent p-6 text-white text-left flex items-end justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[#0012FF] dark:text-cyan-400 uppercase font-bold tracking-wider">SYSTEM RUN TIME PREVIEW</span>
                  <p className="text-xs text-gray-300">Live mock display {activeScreenshot + 1} of {app.screenshots.length}</p>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnail Bar */}
            <div className="flex gap-3">
              {app.screenshots.map((screen, index) => (
                <button
                  key={index}
                  onClick={() => setActiveScreenshot(index)}
                  className={`relative h-16 w-24 rounded-xl overflow-hidden border-2 transition-all block cursor-pointer bg-slate-900 ${
                    activeScreenshot === index 
                      ? 'border-[#0012FF] dark:border-cyan-400' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={screen} 
                    alt={`Thumb ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informational detailed Tabs */}
          <div className="border-b border-gray-150 dark:border-white/10 flex flex-wrap gap-4">
            {(['info', 'requirements', 'install', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-xs font-bold uppercase tracking-wide border-b-2 transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'border-[#0012FF] dark:border-cyan-400 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'info' && localTexts.featuresTitle}
                {tab === 'requirements' && localTexts.requirements}
                {tab === 'install' && localTexts.installGuide}
                {tab === 'history' && localTexts.changelog}
              </button>
            ))}
          </div>

          {/* Active Tab Panel Output */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-150 dark:border-white/5">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{localTexts.featuresTitle}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                    {app.longDesc[language]}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/40 border border-gray-200/50 dark:border-white/5 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-[#0012FF] dark:text-cyan-400" />
                    {localTexts.releaseNotes}
                  </h4>
                  <p className="text-xs text-gray-400 italic">
                    {app.releaseNotes[language]}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                {/* Minimum System Bounds */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 border-b border-gray-100 dark:border-white/5 pb-2">
                    {localTexts.minRequirements}
                  </h4>
                  <ul className="space-y-3 list-none p-0 m-0 text-gray-400">
                    <li><strong>{localTexts.os}:</strong> {app.systemRequirements.minimum.os}</li>
                    <li><strong>{localTexts.cpu}:</strong> {app.systemRequirements.minimum.cpu}</li>
                    <li><strong>{localTexts.ram}:</strong> {app.systemRequirements.minimum.ram}</li>
                    <li><strong>{localTexts.storage}:</strong> {app.systemRequirements.minimum.storage}</li>
                  </ul>
                </div>

                {/* Recommended System Bounds */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 border-b border-gray-100 dark:border-white/5 pb-2">
                    {localTexts.recRequirements}
                  </h4>
                  <ul className="space-y-3 list-none p-0 m-0 text-gray-400">
                    <li><strong>{localTexts.os}:</strong> {app.systemRequirements.recommended.os}</li>
                    <li><strong>{localTexts.cpu}:</strong> {app.systemRequirements.recommended.cpu}</li>
                    <li><strong>{localTexts.ram}:</strong> {app.systemRequirements.recommended.ram}</li>
                    <li><strong>{localTexts.storage}:</strong> {app.systemRequirements.recommended.storage}</li>
                    {app.systemRequirements.recommended.gpu && (
                      <li><strong>{localTexts.gpu}:</strong> {app.systemRequirements.recommended.gpu}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'install' && (
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#0012FF] dark:text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider mb-2">
                  <Terminal className="h-4 w-4" />
                  Terminal CLI setup instructions
                </div>
                
                <ol className="space-y-4 list-decimal pl-5 text-gray-400 m-0">
                  {app.installGuide[language].map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                {app.changelog.map((log, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10 space-y-2">
                    <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-[#0012FF] dark:bg-cyan-400" />
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-800 dark:text-white">{log.version}</span>
                      <span className="text-[10px] font-mono text-gray-400">({log.date})</span>
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        log.type === 'feature' ? 'bg-indigo-500/10 text-indigo-400' :
                        log.type === 'security' ? 'bg-red-500/10 text-red-400' :
                        log.type === 'performance' ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'
                      }`}>
                        {log.type}
                      </span>
                    </div>

                    <ul className="list-disc pl-4 text-xs text-gray-400 space-y-1">
                      {log.changes.map((change, cIdx) => (
                        <li key={cIdx}>{change}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQs Accordion card requested */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              {localTexts.faqTitle}
            </h3>

            <div className="divide-y divide-gray-150 dark:divide-white/10 border border-gray-150 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
              {app.faqs.map((faq, index) => {
                const isExpanded = faqExpanded[index] || false;
                return (
                  <div key={index} className="p-4">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800 dark:text-white bg-transparent border-0 cursor-pointer focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2 text-xs text-gray-400 leading-relaxed italic border-l-2 border-indigo-500/50 pl-3">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Reviews & Ratings module requested */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {localTexts.reviewsTitle}
            </h3>

            {/* Ratings distribution metrics preview */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 rounded-3xl">
              <div className="sm:col-span-4 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-4xl font-display font-medium text-gray-900 dark:text-white">
                  {app.rating}
                </span>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(app.rating) ? 'fill-current' : 'opacity-30'}`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-gray-400">
                  {localTexts.basedOn}
                </span>
              </div>

              {/* Graphical rating distributions */}
              <div className="sm:col-span-8 flex flex-col justify-center space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percent = star === 5 ? 85 : star === 4 ? 12 : star === 3 ? 3 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3 text-xs font-mono text-gray-400">
                      <span className="w-3 text-right">{star}</span>
                      <Star className="h-3 w-3 fill-gray-400 text-gray-400" />
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Structured Review List */}
            <div className="space-y-4">
              {reviewsList.map((review) => {
                const liked = hasLikedReview[review.id] || false;
                return (
                  <div key={review.id} className="p-5 border border-gray-150 dark:border-white/10 rounded-2xl bg-white dark:bg-slate-950 text-left space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-gray-600 dark:text-gray-300 uppercase">
                          {review.author.slice(0, 2)}
                        </div>
                        <div>
                          <strong className="text-xs text-gray-900 dark:text-white block">{review.author}</strong>
                          <span className="text-[9px] text-gray-400 font-mono">{review.role}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'opacity-30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-gray-450">{review.date}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{review.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-gray-100 dark:border-white/5">
                      <span className="text-gray-450">{localTexts.helpfulness}</span>
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        disabled={liked}
                        className={`inline-flex items-center gap-1 cursor-pointer bg-transparent border-none text-[11px] font-bold ${
                          liked ? 'text-emerald-500' : 'text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-400'
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{liked ? 'Liked' : localTexts.helpfulButton} ({review.helpfulCount})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column Section: Persistent Control Panel Info */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Platform Specific Download Buttons requested */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-150 dark:border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
              {localTexts.downloadPlatform}
            </h3>

            <div className="space-y-2.5">
              {app.platforms.map((plat) => {
                const platStatus = downloadStates[plat.name] || 'idle';
                return (
                  <button
                    key={plat.name}
                    onClick={() => handleDownloadPlatform(plat.name)}
                    disabled={platStatus === 'loading'}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-between border cursor-pointer ${
                      platStatus === 'completed'
                        ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
                        : platStatus === 'loading'
                        ? 'bg-gray-150 dark:bg-slate-800 text-gray-400 border-transparent'
                        : 'bg-gray-50 dark:bg-slate-950 dark:border-white/5 dark:text-cyan-400 text-[#0012FF] border-gray-150 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="capitalize">{plat.name} Secure Setup</span>
                      <span className="text-[10px] text-gray-400 font-normal">({plat.fileSize})</span>
                    </div>

                    {platStatus === 'loading' && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                    {platStatus === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {platStatus === 'idle' && <Download className="h-4 w-4 text-gray-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secure SHA-256 integrity verification code requested */}
          {(() => {
            const defaultPlatformName = app.platforms[0]?.name || 'Windows';
            const selectedPlatformName = integrityPlatform || defaultPlatformName;
            const currentPlatformObj = app.platforms.find(p => p.name === selectedPlatformName) || app.platforms[0];
            const activeIntegrityPlatformName = currentPlatformObj?.name || '';
            const activePlatformHash = currentPlatformObj?.sha256 || app.sha256;
            
            const isHashMatching = userInputHash.trim().toLowerCase() === activePlatformHash.toLowerCase();
            
            const copyHashToClipboard = () => {
              try {
                navigator.clipboard.writeText(activePlatformHash);
                setCopiedHash(true);
                setTimeout(() => setCopiedHash(false), 2000);
              } catch (e) {
                console.error('SHA-256 copy error', e);
              }
            };
            
            return (
              <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-3xl border border-gray-150 dark:border-white/10 space-y-4 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-500">
                    <ShieldAlert className="h-4 w-4" />
                    Sovereign Grid Security
                  </span>
                  
                  {/* Subtle Indicator lamp */}
                  <span className="flex h-2 w-[12px] relative items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-3 col-span-1 border-0">
                  {/* Platform Selection pills */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                      {localTexts.platformLabel}
                    </label>
                    <div className="flex flex-wrap gap-1 bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 p-1 rounded-xl">
                      {app.platforms.map((plat) => {
                        const isActive = activeIntegrityPlatformName === plat.name;
                        return (
                          <button
                            key={plat.name}
                            type="button"
                            onClick={() => {
                              setIntegrityPlatform(plat.name);
                              setCopiedHash(false);
                            }}
                            className={`flex-1 py-1 px-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wide transition-all cursor-pointer border-0 ${
                              isActive
                                ? 'bg-[#0012FF] text-white shadow-sm'
                                : 'bg-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {plat.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hash Value Container */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-gray-400">
                      <p className="leading-normal font-sans text-[9px]">
                        {localTexts.sha256}
                      </p>
                      
                      <button
                        onClick={copyHashToClipboard}
                        className="p-1 px-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 transition-all flex items-center gap-1 cursor-pointer border border-gray-150 dark:border-white/10"
                      >
                        {copiedHash ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span className="text-[9px] font-bold text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-gray-400" />
                            <span className="text-[9px] font-bold">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 p-3 rounded-xl select-all break-all text-gray-700 dark:text-gray-300 text-left text-[9px] font-bold shadow-inner">
                      {activePlatformHash}
                    </div>
                  </div>
                </div>

                {/* Match Validator Tools */}
                <hr className="border-gray-150 dark:border-white/5 my-2" />
                
                <div className="space-y-2.5 text-left">
                  <span className="font-bold uppercase tracking-wider text-[#0012FF] dark:text-cyan-400 block text-[9px]">
                    ⚡ {localTexts.verifierTitle}
                  </span>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-400 block font-sans">
                      {localTexts.pasteLabel}
                    </label>
                    <input
                      type="text"
                      value={userInputHash}
                      onChange={(e) => setUserInputHash(e.target.value)}
                      placeholder={localTexts.inputPlaceholder}
                      className="w-full px-3 py-2 text-[10px] rounded-xl bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-gray-700 dark:text-gray-300 font-mono select-all transition-colors shadow-inner"
                    />
                  </div>

                  {userInputHash.trim() !== '' && (
                    <div className={`p-2.5 rounded-xl border flex items-start gap-2 text-[9px] font-bold transition-all leading-relaxed ${
                      isHashMatching
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 shadow-sm'
                    }`}>
                      {isHashMatching ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
                          <span>{localTexts.matchMsg}</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-3.5 w-3.5 mt-0.5 shrink-0 text-red-500" />
                          <span>{localTexts.mismatchMsg}</span>
                        </>
                      )}
                    </div>
                  )}

                  {userInputHash.trim() === '' && (
                    <div className="p-2.5 bg-white/40 dark:bg-slate-900/40 rounded-xl text-center text-gray-400 text-[9px] italic border border-dashed border-gray-200 dark:border-white/5 font-sans leading-relaxed">
                      {localTexts.noInputResult}
                    </div>
                  )}
                </div>

                {/* Command Shell Instructions helper box */}
                <hr className="border-gray-150 dark:border-white/5 my-2" />
                <div className="space-y-2 text-[9px] text-left">
                  <span className="font-bold text-gray-400 block uppercase tracking-wider">{localTexts.instructionsLabel}</span>
                  <div className="space-y-2 font-mono text-gray-400 leading-normal bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-100 dark:border-white/5">
                    <div>
                      <span className="text-[#0012FF] dark:text-cyan-400 font-bold block mb-0.5">{localTexts.winCmd}</span>
                      <code className="block select-all text-[8px] text-gray-650 dark:text-gray-300 bg-gray-50 dark:bg-slate-950 p-1.5 rounded border border-gray-100 dark:border-white/5 whitespace-pre-wrap break-all">
                        certutil -hashfile XE_{app.id}_{activeIntegrityPlatformName.toLowerCase()}_installer.txt SHA256
                      </code>
                    </div>
                    <div>
                      <span className="text-[#0012FF] dark:text-cyan-400 font-bold block mb-0.5">{localTexts.macCmd}</span>
                      <code className="block select-all text-[8px] text-gray-650 dark:text-gray-300 bg-gray-50 dark:bg-slate-950 p-1.5 rounded border border-gray-100 dark:border-white/5 whitespace-pre-wrap break-all">
                        shasum -a 256 XE_{app.id}_{activeIntegrityPlatformName.toLowerCase()}_installer.txt
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Developer Details & Contact Support */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-150 dark:border-white/10 space-y-3 font-sans text-xs">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              {localTexts.developer}
            </h4>

            <div className="space-y-1 text-gray-400">
              <strong className="text-gray-800 dark:text-white block">{app.developer}</strong>
              <a 
                href={`mailto:${app.developerContact}`} 
                className="hover:underline text-[#0012FF] dark:text-cyan-400 block break-all"
              >
                {app.developerContact}
              </a>
            </div>

            <hr className="border-gray-100 dark:border-white/5" />

            <div className="pt-1 flex items-center justify-between text-gray-405">
              <span>{localTexts.supportContact}</span>
              <a href="#/contact" className="hover:text-[#0012FF] dark:hover:text-cyan-400">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Share Integration requested */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-150 dark:border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
              {localTexts.shareTitle}
            </h3>

            <div className="flex gap-2">
              <button
                onClick={copyShareLink}
                className="flex-1 py-2.5 px-3 rounded-xl border border-gray-150 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-xs font-bold font-mono text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-gray-400" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=Deploying ${app.name} (${app.version}) secure dashboard for utility grid controllers from X Elektrik repository!`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-gray-150 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-400 hover:text-sky-400 transition-all flex items-center justify-center cursor-pointer bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-gray-150 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-400 hover:text-blue-500 transition-all flex items-center justify-center cursor-pointer bg-transparent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Related App Suite recommendations requested */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
              {localTexts.relatedTitle}
            </h3>

            <div className="space-y-4">
              {relatedApps.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => { navigate(`/app-center/${rel.id}`); window.scrollTo(0, 0); }}
                  className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 p-4 rounded-2xl flex items-center gap-3.5 hover:border-cyan-400/25 transition-all cursor-pointer group text-left"
                >
                  {renderAppIcon(rel.iconName, rel.iconColor)}

                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#0012FF] dark:group-hover:text-cyan-400 transition-colors leading-tight">
                      {rel.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 leading-normal line-clamp-2">
                      {rel.shortDesc[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
