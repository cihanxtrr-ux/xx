/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Share2,
  Copy,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';

interface Article {
  id: string;
  category: 'substation' | 'bim' | 'grid';
  titleEn: string;
  titleTr: string;
  summaryEn: string;
  summaryTr: string;
  readTime: number;
  date: string;
  contentEn: string;
  contentTr: string;
  image: string;
}

export default function Blog() {
  const { t, language } = useApp();
  const { category, page, articleId } = useParams<{ category?: string; page?: string; articleId?: string }>();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const activeSearchQuery = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(activeSearchQuery);
  const [isSearching, setIsSearching] = useState(false);

  // Sharing & Liking States
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, number>>({
    'art-1': 42,
    'art-2': 18,
    'art-3': 29,
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const handleShareCopy = (artId: string, customUrl?: string) => {
    const finalUrl = customUrl || `${window.location.origin}/blog/article/${artId}`;
    try {
      navigator.clipboard.writeText(finalUrl);
      setCopiedId(artId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback
      const input = document.createElement('input');
      input.value = finalUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedId(artId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleToggleLike = (artId: string) => {
    if (userLiked[artId]) {
      setUserLiked(prev => ({ ...prev, [artId]: false }));
      setLikedArticles(prev => ({ ...prev, [artId]: prev[artId] - 1 }));
    } else {
      setUserLiked(prev => ({ ...prev, [artId]: true }));
      setLikedArticles(prev => ({ ...prev, [artId]: prev[artId] + 1 }));
    }
  };

  // Sync search input with route query param
  useEffect(() => {
    setInputVal(activeSearchQuery);
  }, [activeSearchQuery]);

  // Simulate API search loading logic for 350ms
  useEffect(() => {
    if (activeSearchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [activeSearchQuery]);

  const selectedCat = (category || 'all') as 'all' | 'substation' | 'bim' | 'grid';
  const currentPage = page ? parseInt(page, 10) : 1;
  const activeArticleId = articleId || null;

  const PAGE_SIZE = 2;

  const articles: Article[] = [
    {
      id: 'art-1',
      category: 'substation',
      titleEn: 'Calculating 3-Phase Transformer Secondary Settings',
      titleTr: '3 Fazlı Trafo Sekonder Ayarlarının Hesaplanması',
      summaryEn: 'An in-depth look into standard substation secondary torque limits, impedance calculations, and load balancing ratios.',
      summaryTr: 'Standart trafo merkezi sekonder tork limitleri, empedans hesaplamaları ve yük dengeleme oranlarına derinlemesine bakış.',
      readTime: 6,
      date: '2026-05-18',
      contentEn: `### Understanding Transformer Impedance and Short-Circuit Current
Substation transformers are engineered to step down high-voltage grids safely under shifting industrial factors. This technical report covers winding impedance formulas and phase matching calculations.

#### Core Formula Selection:
The symmetrical three-phase short-circuit fault current ($I_{sc}$) is calculated using the system secondary voltage and winding parameters:
$$I_{sc} = \\frac{I_{rated}}{\\%Z} \\times 100$$

Where $I_{rated}$ represents the rated full-load current of the transformer secondary, and $\\%Z$ represents the percent impedance on the manufacturer datasheet. Proper calibrations protect upstream breakers from magnetic trip sags and coordination failures.`,
      contentTr: `### Transformatör Empedansı ve Kısa Devre Akımının Anlaşılması
Trafo merkezi transformatörleri, değişen endüstriyel faktörler altında yüksek voltajlı şebekeleri güvenli bir şekilde düşürmek üzere tasarlanmıştır. Bu teknik rapor, sargı empedansı formüllerini ve faz eşleştirme hesaplamalarını kapsar.

#### Temel Formül Seçimi:
Simetrik üç fazlı kısa devre arıza akımı ($I_{sc}$), sistem sekonder voltajı ve sargı parametreleri kullanılarak hesaplanır:
$$I_{sc} = \\frac{I_{rated}}{\\%Z} \\times 100$$

Burada $I_{rated}$ transformatör sekonderinin nominal tam yük akımını, $\\%Z$ ise üretici veri sayfasındaki yüzde empedansı temsil eder. Doğgun kalibrasyonlar, üst akım kesicileri manyetik açma dalgalanmalarından ve koordinasyon hatalarından korur.`,
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-2',
      category: 'bim',
      titleEn: 'LOD 400 Coordination Protocols in Modern BIM Workflows',
      titleTr: 'Modern BIM İş Akışlarında LOD 400 Koordinasyon Protokolleri',
      summaryEn: 'How solving physical spatial collisions inside Autodesk Revit environment prior to fabrication reduces on-site construction delays.',
      summaryTr: 'Autodesk Revit ortamında imalat öncesinde fiziksel boyutsal çakışmaları çözmenin şantiye gecikmelerini nasıl azalttığı üzerine analiz.',
      readTime: 8,
      date: '2026-05-12',
      contentEn: `### Driving Collision Rate Down to Absolute Zero
LOD 400 (Level of Development) implies high accuracy detail where components are modeled with precise fabrication, assembly, and installation details. We analyze spatial tolerances for cable tray routing and busway brackets.

#### Our BIM Quality Gates:
1. **Geometric Cleansing**: Rigid checking of conduit clearances.
2. **Access Clearance Zone**: Isolating switchgear access corridors.
3. **Weight Load Modeling**: Structuring overhead steel attachments under certified torque ratings.`,
      contentTr: `### Çakışma Oranını Mutlak Sıfıra İndirmek
LOD 400 (Level of Development), bileşenlerin kesin imalat, montaj ve kurulum detaylarıyla modellendiği yüksek hassasiyetli detayı ifade eder. Kablo tavası rotaları ve bara braketleri için alansal toleransları analiz ediyoruz.

#### BIM Kalite Geçitlerimiz:
1. **Geometric Temizlik**: Boru hattı boşluklarının katı tespiti.
2. **Erişim Korumalı Bölge**: Switchgear erişim koridorlarının izole edilmesi.
3. **Ağırlık Yükü Modellemesi**: Sertifikalı tork değerleri altında asma çelik bağlantıların yapılandırılması.`,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-3',
      category: 'grid',
      titleEn: 'N+1 Resilient Architectures for Hyperscale Datacenters',
      titleTr: 'Hiper Ölçekli Veri Merkezleri İçin N+1 Yedeklilik Mimarileri',
      summaryEn: 'Integrating high-speed automatic transfer switches (ATS) and static UPS battery buffers for zero downtime operation.',
      summaryTr: 'Sıfır kesinti süreli çalışma için yüksek hızlı otomatik transfer şalterleri (ATS) ve statik UPS akü tamponlarının entegrasyonu.',
      readTime: 5,
      date: '2026-05-02',
      contentEn: `### High-Efficiency Power Riser Redundancy
Datacenter power sags result in catastrophic system loss. X Elektrik connects dual-feed (2N) primary circuits supported by parallel static switches and synchronous backup generator controls.

This article reviews the latency limitations during automated grid switching, mapping physical microgrid controller inputs, and circuit isolation protocols under NEC regulatory targets.`,
      contentTr: `### Yüksek Verimli Güç Sütun Yedekliliği
Veri merkezi güç dalgalanmaları feci sistem kayıplarına yol açar. X Elektrik, paralel statik transfer anahtarları ve senkronize yedek jeneratör kontrolleri ile desteklenen çift beslemeli (2N) birincil devreleri bağlar.

Bu makale, otomatik şebeke geçişi sırasındaki gecikme sınırlamalarını, fiziksel mikroşebeke denetleyici girişlerinin haritalandırılmasını ve NEC düzenleme hedefleri altındaki devre izolasyon protokollerini gözden geçirmektedir.`,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleCategoryChange = (cat: 'all' | 'substation' | 'bim' | 'grid') => {
    const qSuffix = activeSearchQuery ? `?q=${encodeURIComponent(activeSearchQuery)}` : '';
    if (cat === 'all') {
      navigate(`/blog${qSuffix}`);
    } else {
      navigate(`/blog/c/${cat}${qSuffix}`);
    }
  };

  const handlePageChange = (pageNum: number) => {
    const qSuffix = activeSearchQuery ? `?q=${encodeURIComponent(activeSearchQuery)}` : '';
    if (selectedCat && selectedCat !== 'all') {
      navigate(`/blog/c/${selectedCat}/p/${pageNum}${qSuffix}`);
    } else {
      navigate(`/blog/p/${pageNum}${qSuffix}`);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputVal.trim();
    const qSuffix = query ? `?q=${encodeURIComponent(query)}` : '';
    if (selectedCat && selectedCat !== 'all') {
      navigate(`/blog/c/${selectedCat}${qSuffix}`);
    } else {
      navigate(`/blog${qSuffix}`);
    }
  };

  const handleSearchClear = () => {
    setInputVal('');
    if (selectedCat && selectedCat !== 'all') {
      navigate(`/blog/c/${selectedCat}`);
    } else {
      navigate('/blog');
    }
  };

  const handleArticleClick = (artId: string) => {
    const qSuffix = activeSearchQuery ? `?q=${encodeURIComponent(activeSearchQuery)}` : '';
    navigate(`/blog/article/${artId}${qSuffix}`);
  };

  const handleBackToBlog = () => {
    const qSuffix = activeSearchQuery ? `?q=${encodeURIComponent(activeSearchQuery)}` : '';
    if (selectedCat && selectedCat !== 'all') {
      navigate(`/blog/c/${selectedCat}${qSuffix}`);
    } else {
      navigate(`/blog${qSuffix}`);
    }
  };

  const filtered = articles.filter((art) => {
    const title = language === 'en' ? art.titleEn : art.titleTr;
    const summary = language === 'en' ? art.summaryEn : art.summaryTr;
    const matchesSearch = activeSearchQuery
      ? title.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
        summary.toLowerCase().includes(activeSearchQuery.toLowerCase())
      : true;
    const matchesCat = selectedCat === 'all' || art.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const activeArticle = articles.find((art) => art.id === activeArticleId);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const displayedArticles = filtered.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <AnimatePresence mode="wait">
        {activeArticle ? (
          <motion.div
            key="article-detail"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="space-y-6 text-left max-w-3xl"
          >
            <button
              onClick={handleBackToBlog}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4 bg-transparent border-none p-0 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Articles
            </button>

            {/* Premium Article Cover Hero Banner */}
            {activeArticle.image && (
              <div className="relative rounded-3xl overflow-hidden border border-gray-150 dark:border-white/10 aspect-video sm:h-[380px] w-full bg-slate-950 shadow-sm group">
                <img 
                  src={activeArticle.image} 
                  alt={language === 'en' ? activeArticle.titleEn : activeArticle.titleTr} 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-[1.01] transition duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md px-3.5 py-1.5 text-[9px] font-mono font-bold tracking-widest text-[#0012FF] dark:text-cyan-400 rounded-full uppercase">
                  {activeArticle.category}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500 dark:text-gray-400">
                <span className="bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded uppercase tracking-wider text-[#0012FF] dark:text-cyan-400 font-bold">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {activeArticle.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activeArticle.readTime} {t.blog.minRead}
                </span>
              </div>

              {/* Quick Interactions Row */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleLike(activeArticle.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border cursor-pointer bg-transparent transition ${
                    userLiked[activeArticle.id]
                      ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5 font-extrabold'
                      : 'border-gray-200 dark:border-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400'
                  }`}
                >
                  <ThumbsUp className={`h-3 w-3 ${userLiked[activeArticle.id] ? 'fill-current' : ''}`} />
                  <span>{likedArticles[activeArticle.id] || 0}</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
              {language === 'en' ? activeArticle.titleEn : activeArticle.titleTr}
            </h1>

            {/* Sharing Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-150 dark:border-white/10 text-xs text-gray-400">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5" />
                {language === 'en' ? 'Share standard:' : 'Paylaşım seçenekleri:'}
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Copy Link */}
                <button
                  onClick={() => handleShareCopy(activeArticle.id)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono transition duration-150 cursor-pointer bg-transparent flex items-center gap-1.5 ${
                    copiedId === activeArticle.id
                      ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                      : 'border-gray-200 dark:border-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'
                  }`}
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedId === activeArticle.id ? (language === 'en' ? 'Copied ✓' : 'Kopyalandı ✓') : (language === 'en' ? 'Copy Link' : 'Kopyala')}</span>
                </button>

                {/* Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(language === 'en' ? `Read "${activeArticle.titleEn}" on X Elektrik Engineering Blog` : `X Elektrik Blogunda "${activeArticle.titleTr}" makalesini okuyun`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-gray-200 dark:border-white/5 text-gray-400 hover:text-[#1DA1F2] dark:hover:text-cyan-400 hover:bg-[#1DA1F2]/5 transition cursor-pointer"
                  title="Twitter (X)"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-gray-200 dark:border-white/5 text-gray-400 hover:text-[#0A66C2] dark:hover:text-cyan-400 hover:bg-[#0A66C2]/5 transition cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-gray-200 dark:border-white/5 text-gray-400 hover:text-[#1877F2] dark:hover:text-cyan-400 hover:bg-[#1877F2]/5 transition cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:?subject=${encodeURIComponent(language === 'en' ? activeArticle.titleEn : activeArticle.titleTr)}&body=${encodeURIComponent(language === 'en' ? `Check out this technical report from X Elektrik: ${window.location.href}` : `X Elektrik teknik raporuna göz atın: ${window.location.href}`)}`}
                  className="p-2 rounded-lg border border-gray-200 dark:border-white/5 text-gray-400 hover:text-rose-500 hover:bg-rose-500/5 transition cursor-pointer"
                  title="Email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed border-l-2 border-[#0012FF] dark:border-cyan-400 pl-4 py-1 italic">
              {language === 'en' ? activeArticle.summaryEn : activeArticle.summaryTr}
            </p>

            <article className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
              {language === 'en' ? (
                <div className="whitespace-pre-line">{activeArticle.contentEn}</div>
              ) : (
                <div className="whitespace-pre-line">{activeArticle.contentTr}</div>
              )}
            </article>

            {/* Smart Grid Bottom Share Panel */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-white/10 bg-gray-50/50 dark:bg-slate-900/40 space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Spread the Grid Engineering Expertise' : 'Şebeke Mühendisliği Uzmanlığını Paylaşın'}
                </h4>
                <p className="text-xs text-gray-400 leading-normal">
                  {language === 'en'
                    ? 'Share this certified IEEE-grade technical article with your design team, Autodesk Revit coordinators, or substation maintenance engineers.'
                    : 'Bu sertifikalı IEEE düzeyindeki teknik makaleyi tasarım ekiplerinizle, Autodesk Revit koordinatörlerinizle veya trafo merkezi bakım mühendislerinizle paylaşın.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleShareCopy(activeArticle.id)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 border cursor-pointer bg-white dark:bg-slate-950 dark:border-white/5 dark:text-cyan-400 text-[#0012FF] border-gray-150 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5"
                >
                  {copiedId === activeArticle.id ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{language === 'en' ? 'Reference Link Copied!' : 'Referans Link Kopyalandı!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 animate-none" />
                      <span>{language === 'en' ? 'Copy Reference URL' : 'Kayıt Referans Linkini Kopyala'}</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(language === 'en' ? `Read "${activeArticle.titleEn}" on X Elektrik Engineering Blog` : `X Elektrik Blogunda "${activeArticle.titleTr}" makalesini okuyun`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-gray-150 dark:border-white/10 text-gray-400 hover:text-[#1DA1F2] dark:hover:text-cyan-400 hover:bg-[#1DA1F2]/5 transition flex items-center justify-center bg-white dark:bg-slate-950"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-gray-150 dark:border-white/10 text-gray-400 hover:text-[#0A66C2] dark:hover:text-cyan-400 hover:bg-[#0A66C2]/5 transition flex items-center justify-center bg-white dark:bg-slate-950"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="article-list"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-150 dark:border-white/10 pb-6 text-left">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-4xl font-display font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-[#0012FF] dark:text-cyan-400" />
                  {t.blog.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  {t.blog.desc}
                </p>
              </div>

              {/* Search bar */}
              <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t.blog.searchPlaceholder}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white focus:outline-none"
                  />
                  {inputVal && (
                    <button
                      type="button"
                      onClick={handleSearchClear}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-650 dark:text-gray-500 dark:hover:text-gray-300 bg-transparent border-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0012FF] hover:bg-[#0011dd] dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 text-white rounded-xl font-mono text-xs font-bold transition-all shadow-sm cursor-pointer border-0"
                >
                  {language === 'tr' ? 'Ara' : 'Search'}
                </button>
              </form>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {(['all', 'substation', 'bim', 'grid'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition cursor-pointer ${
                      selectedCat === cat
                        ? 'bg-gray-950 text-white dark:bg-cyan-400 dark:text-black font-bold'
                        : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border border-gray-150 dark:border-white/10 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid list */}
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0012FF] dark:border-t-cyan-400" />
                <span className="mt-4 text-xs font-mono text-gray-400 uppercase tracking-widest animate-pulse">
                  {language === 'tr' ? 'MAKALELER ARANIYOR (API)...' : 'SEARCHING ARTICLES (API)...'}
                </span>
              </div>
            ) : displayedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedArticles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.01] hover:shadow-lg transition-all duration-300 group"
                  >
                    <div>
                      {/* Grid Cover Image */}
                      {art.image && (
                        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-gray-150 dark:border-white/5">
                          <img 
                            src={art.image} 
                            alt={language === 'en' ? art.titleEn : art.titleTr} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition duration-550"
                            referrerPolicy="no-referrer"
                          />
                          {/* Left Category Overlay */}
                          <div className="absolute top-3 left-3 bg-gray-950/85 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono font-bold uppercase text-[#0012FF] dark:text-cyan-400 rounded-lg">
                            {art.category}
                          </div>

                          {/* Quick Share Overlay Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareCopy(art.id);
                            }}
                            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md border transition duration-200 cursor-pointer ${
                              copiedId === art.id
                                ? 'bg-emerald-500/90 text-white border-transparent'
                                : 'bg-gray-950/80 text-gray-300 hover:text-white border-white/10 hover:border-white/20'
                            }`}
                            title={language === 'en' ? 'Quick Copy Link' : 'Hızlı Link Kopyala'}
                          >
                            {copiedId === art.id ? (
                              <span className="text-[9px] font-mono font-bold">{language === 'en' ? 'Copied ✓' : 'Kopyalandı!'}</span>
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      )}

                      <div className="p-6 space-y-3 text-left">
                        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                          <span className="text-[10px] uppercase text-gray-400 font-bold flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0012FF] dark:bg-cyan-400" />
                            {art.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {art.readTime} min
                          </span>
                        </div>

                        <h3 
                          onClick={() => handleArticleClick(art.id)}
                          className="text-lg font-bold text-gray-900 dark:text-white hover:text-[#0012FF] dark:hover:text-cyan-300 transition line-clamp-2 cursor-pointer leading-snug"
                        >
                          {language === 'en' ? art.titleEn : art.titleTr}
                        </h3>
                        <p className="text-gray-550 dark:text-gray-400 text-xs leading-relaxed line-clamp-3">
                          {language === 'en' ? art.summaryEn : art.summaryTr}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Compact Like counter representation */}
                        <button
                          onClick={() => handleToggleLike(art.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded border cursor-pointer bg-transparent transition duration-200 ${
                            userLiked[art.id]
                              ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                              : 'border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsUp className={`h-3 w-3 ${userLiked[art.id] ? 'fill-current' : ''}`} />
                          <span>{likedArticles[art.id] || 0}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleArticleClick(art.id)}
                        className="text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-300 hover:underline cursor-pointer bg-transparent border-0 p-0"
                      >
                        {t.blog.readMore} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl max-w-sm mx-auto space-y-3">
                <span className="block text-sm font-semibold">{language === 'tr' ? 'Sonuç bulunamadı' : 'No matching articles found.'}</span>
                <button
                  onClick={handleSearchClear}
                  className="py-1 px-3 bg-[#0012FF] text-white dark:bg-cyan-400 dark:text-slate-950 font-mono text-xs rounded-lg hover:opacity-90 transition-all cursor-pointer border-0"
                >
                  {language === 'tr' ? 'Temizle' : 'Clear Search'}
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4" id="blog-pagination">
                <button
                  onClick={() => handlePageChange(Math.max(activePage - 1, 1))}
                  disabled={activePage === 1}
                  className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-10 w-10 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer border ${
                        activePage === pageNum
                          ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 border-gray-950 dark:border-cyan-400 shadow-sm font-extrabold'
                          : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(Math.min(activePage + 1, totalPages))}
                  disabled={activePage === totalPages}
                  className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
