/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, ShoppingCart, Check, ChevronLeft, ChevronRight, Plus, Minus, Info, Search, X, AlertTriangle, Images } from 'lucide-react';
import { EstimateConfiguration, CostBreakdown } from '../types';
import { getProductCollection } from '../data/products';
import MathCaptchaCheckbox from '../components/MathCaptchaCheckbox';

interface ProductsProps {
  onAddNewInquiry: (
    config: EstimateConfiguration & { cost: CostBreakdown; timeline: string },
    clientInfo?: { name: string; email: string; phone?: string }
  ) => void;
  onNavigate: (path: string) => void;
  key?: string;
}

export default function Products({ onAddNewInquiry, onNavigate }: ProductsProps) {
  const { t, language, basket, addToBasket, updateBasketQuantity } = useApp();
  const { category, page } = useParams<{ category?: string; page?: string }>();
  const navigate = useNavigate();

  const selectedCategory = category || null;
  const currentPage = page ? parseInt(page, 10) : 1;

  const [searchParams] = useSearchParams();
  const activeSearchQuery = searchParams.get('q') || '';

  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [inputVal, setInputVal] = useState(activeSearchQuery);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);

  // Reset verification when switching active inquiry form
  useEffect(() => {
    setVerified(false);
  }, [activeInquiryId]);
  const [isSearching, setIsSearching] = useState(false);
  const PAGE_SIZE = 2;

  const productCollection = getProductCollection(t);

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

  const categories = [
    { id: null, labelEn: 'All Systems', labelTr: 'Tüm Sistemler' },
    { id: 'industrial', labelEn: 'Heavy Industrial', labelTr: 'Ağır Sanayi' },
    { id: 'renewable', labelEn: 'Renewable Grid', labelTr: 'Yenilenebilir Enerji' },
    { id: 'datacenter', labelEn: 'Critical Backup', labelTr: 'Kritik Veri Girişi' },
    { id: 'commercial', labelEn: 'Smart BMS Panel', labelTr: 'Akıllı Bina Panosu' },
  ];

  const subCategoriesMap: Record<string, { id: string; labelEn: string; labelTr: string }[]> = {
    all: [
      { id: 'all', labelEn: 'All Specialties', labelTr: 'Tüm Uzmanlıklar' },
      { id: 'distribution', labelEn: 'Distribution & Switchgear', labelTr: 'Dağıtım & Şalt' },
      { id: 'motor-control', labelEn: 'Motor Control & Protection', labelTr: 'Motor Kontrol & Koruma' },
      { id: 'storage', labelEn: 'Grid Battery Storage', labelTr: 'Tümleşik Depolama' },
      { id: 'ev-infrastructure', labelEn: 'EV Charger Pedestals', labelTr: 'EV Şarj Üniteleri' },
      { id: 'switching', labelEn: 'Critical Power Switch', labelTr: 'Kritik Güç Geçişi' },
      { id: 'ups-systems', labelEn: 'UPS & Power Conditioning', labelTr: 'Kesintisiz Güç UPS' },
      { id: 'automation', labelEn: 'BMS Control Cabinets', labelTr: 'BMS Yönetim Panoları' },
      { id: 'monitoring', labelEn: 'Power Quality Analysis', labelTr: 'Güç Kalitesi Analizi' },
    ],
    industrial: [
      { id: 'all', labelEn: 'All Industrial', labelTr: 'Tüm Sanayi' },
      { id: 'distribution', labelEn: 'Switchgear & Distribution', labelTr: 'Şalt ve Dağıtım' },
      { id: 'motor-control', labelEn: 'Motor Control & Protection', labelTr: 'Motor Kontrol & Koruma' },
    ],
    renewable: [
      { id: 'all', labelEn: 'All Renewables', labelTr: 'Tüm Yenilenebilir' },
      { id: 'storage', labelEn: 'Utility Battery Storage', labelTr: 'Şebeke Batarya Depolama' },
      { id: 'ev-infrastructure', labelEn: 'EV Fast Chargers', labelTr: 'EV Hızlı Şarj' },
    ],
    datacenter: [
      { id: 'all', labelEn: 'All Datacenters', labelTr: 'Tüm Veri Merkezleri' },
      { id: 'switching', labelEn: 'High-Amperage ATS', labelTr: 'Yüksek Amperaj ATS' },
      { id: 'ups-systems', labelEn: 'UPS & Power Conditioning', labelTr: 'Kesintisiz Güç & Analiz' },
    ],
    commercial: [
      { id: 'all', labelEn: 'All Commercial Panels', labelTr: 'Tüm Binatronic Panolar' },
      { id: 'automation', labelEn: 'BMS Automation Controls', labelTr: 'BMS Otomasyon Kontrolleri' },
      { id: 'monitoring', labelEn: 'Quality Diagnostics & Telemetry', labelTr: 'Güç Kalitesi & Telemetri' },
    ],
  };

  const handleCategoryChange = (catId: string | null) => {
    const qSuffix = activeSearchQuery ? `?q=${encodeURIComponent(activeSearchQuery)}` : '';
    if (catId) {
      navigate(`/products/c/${catId}${qSuffix}`);
    } else {
      navigate(`/products${qSuffix}`);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputVal.trim();
    const qSuffix = query ? `?q=${encodeURIComponent(query)}` : '';
    if (selectedCategory) {
      navigate(`/products/c/${selectedCategory}${qSuffix}`);
    } else {
      navigate(`/products${qSuffix}`);
    }
  };

  const handleSearchClear = () => {
    setInputVal('');
    if (selectedCategory) {
      navigate(`/products/c/${selectedCategory}`);
    } else {
      navigate('/products');
    }
  };

  const handlePageChange = (pageNum: number) => {
    const qSuffix = activeSearchQuery ? `?q=${encodeURIComponent(activeSearchQuery)}` : '';
    if (selectedCategory) {
      navigate(`/products/c/${selectedCategory}/p/${pageNum}${qSuffix}`);
    } else {
      navigate(`/products/p/${pageNum}${qSuffix}`);
    }
  };

  const filteredProducts = productCollection.filter((prod) => {
    const matchesCategory = selectedCategory ? prod.discipline === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory === 'all' ? true : prod.subCategory === selectedSubCategory;
    const matchesSearch = activeSearchQuery
      ? prod.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
        prod.desc.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
        prod.specs.some((spec) => spec.toLowerCase().includes(activeSearchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const activePage = currentPage > totalPages ? 1 : currentPage;
  const displayedProducts = filteredProducts.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE
  );

  const handleProductSubmit = (e: React.FormEvent, prod: typeof productCollection[0]) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    if (!verified) return;

    onAddNewInquiry({
      projectType: prod.discipline,
      areaSqFt: 15000,
      amperage: prod.amperage,
      voltage: prod.voltage,
      resilientPower: prod.discipline === 'datacenter',
      smartControls: prod.id === 'prod-bms',
      greenEnergy: prod.discipline === 'renewable',
      industrialMachinery: prod.discipline === 'industrial',
      networking: true,
      cost: {
        designCost: Math.round(prod.estimatedCost * 0.1),
        materialsCost: Math.round(prod.estimatedCost * 0.7),
        laborCost: Math.round(prod.estimatedCost * 0.15),
        commissioningCost: Math.round(prod.estimatedCost * 0.05),
        totalCost: prod.estimatedCost,
      },
      timeline: `${prod.leadTime} ${t.products.weeks}`,
    }, {
      name: clientName,
      email: clientEmail,
      phone: clientPhone
    });

    setSubmitted(prod.id);
    setTimeout(() => {
      setSubmitted(null);
      setActiveInquiryId(null);
      setClientName('');
      setClientEmail('');
      setClientPhone('');
      setVerified(false);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Page Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block">
          {t.products.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.products.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.products.desc}
        </p>
      </div>

      {/* Enterprise Only Security Advisory Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-amber-300/40 dark:border-amber-500/25 bg-amber-500/5 dark:bg-amber-500/5 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-left shadow-sm"
      >
        {/* Amber Pulsing Alert Indicator */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400">
          <motion.div
            className="absolute inset-0 rounded-2xl bg-amber-400/20"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <AlertTriangle className="w-5.5 h-5.5 relative z-10" />
        </div>

        <div className="space-y-1.5 flex-grow">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-extrabold tracking-widest text-amber-700 dark:text-amber-300 uppercase bg-amber-500/10 dark:bg-amber-400/15 px-2 py-0.5 rounded">
              {language === 'tr' ? 'PROTOKOL GÜVENLİĞİ' : 'B2B SECURITY PROTOCOL'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-amber-600/90 dark:text-amber-400/80 uppercase">
              {language === 'tr' ? 'YALNIZCA KURUMSAL DESTEK' : 'ENTERPRISE OPERATORS ONLY'}
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-150 leading-snug">
            {language === 'tr' 
              ? 'X-Elektrik sistemleri yalnızca kayıtlı tüzel kişilere, sanayi tesislerine ve akredite operatörlere satılmaktadır.'
              : 'X-Elektrik components and microgrids are strictly reserved for registered enterprise entities, industrial operators, and certified utility administrators.'}
          </h4>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
            {language === 'tr'
              ? 'Sipariş tekliflerinizi (RFQ) işleme alabilmemiz için geçerli bir şirket unvanı, kurumsal e-posta ve telefon numarası girmelisiniz. Bireysel perakende satışı yapılmamaktadır.'
              : 'To authorize request for quotes (RFQs), a valid corporate title, company email, and telephone coordinate verification are mandatory. Individual retail purchases are automatically blocked.'}
          </p>
        </div>
      </motion.div>

      {/* Search & Category Filter Section */}
      <div className="space-y-4">
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-md">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={language === 'tr' ? 'Sistemlerde veya özelliklerde ara...' : 'Search in systems or specs...'}
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0012FF] dark:focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-gray-800 dark:text-white placeholder:text-gray-450 dark:placeholder:text-gray-500"
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
            className="px-5 py-2.5 bg-[#0012FF] hover:bg-[#0011dd] dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 text-white rounded-2xl font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer border-0"
          >
            {language === 'tr' ? 'Ara' : 'Search'}
          </button>
        </form>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap items-center gap-2.5 bg-gray-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-gray-150 dark:border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold ml-1">
            {language === 'tr' ? 'KATEGORİ FILTRESİ:' : 'CATEGORY RANGE:'}
          </span>
          <div className="flex flex-wrap gap-1.5 ml-1 sm:ml-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = language === 'tr' ? cat.labelTr : cat.labelEn;
              return (
                <button
                  key={cat.id ?? 'all'}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`py-1.5 px-3.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm font-extrabold'
                      : 'bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border border-gray-150 dark:border-white/5'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sub-Category Selector Pills */}
        {(() => {
          const currentCategoryKey = selectedCategory || 'all';
          const subCategoryOptions = subCategoriesMap[currentCategoryKey] || [];
          
          return (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentCategoryKey}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center gap-2.5 bg-blue-50/5 dark:bg-slate-950/20 p-4 rounded-2xl border border-blue-500/10 dark:border-white/5"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0012FF]/80 dark:text-cyan-400 font-bold ml-1">
                {language === 'tr' ? 'ALT KATEGORİ SEÇİN:' : 'SPEC SUB-RANGE:'}
              </span>
              <div className="flex flex-wrap gap-1.5 ml-1 sm:ml-4">
                {subCategoryOptions.map((sub) => {
                  const isActive = selectedSubCategory === sub.id;
                  const label = language === 'tr' ? sub.labelTr : sub.labelEn;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCategory(sub.id)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0012FF]/90 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm font-bold'
                          : 'bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border border-gray-150 dark:border-white/5'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })()}
      </div>

      {/* Grid List */}
      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0012FF] dark:border-t-cyan-400" />
          <span className="mt-4 text-xs font-mono text-gray-400 uppercase tracking-widest animate-pulse">
            {language === 'tr' ? 'SİSTEMLER ARANIYOR (API)...' : 'SEARCHING SYSTEMS (API)...'}
          </span>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-gray-200 dark:border-white/10 rounded-3xl space-y-4 max-w-md mx-auto">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 dark:bg-slate-900/60 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <Info className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">
              {language === 'tr' ? 'Sonuç Bulunamadı' : 'No Products Found'}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {language === 'tr' 
                ? 'Arama kriterlerinize veya seçilen kategoriye uygun bir ürün bulunamadı.' 
                : 'No systems match your active search terms or selected category.'}
            </p>
          </div>
          <button
            onClick={handleSearchClear}
            className="py-1.5 px-4 bg-gray-955 dark:bg-cyan-400 text-white dark:text-slate-950 font-mono text-xs font-semibold rounded-xl hover:bg-opacity-90 transition-all cursor-pointer border-0"
          >
            {language === 'tr' ? 'Aramayı Temizle' : 'Clear Search & Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedProducts.map((prod) => {
          const isFormOpen = activeInquiryId === prod.id;
          const isThisSubmitted = submitted === prod.id;

          return (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 bg-[#0012FF]/5 dark:bg-[#0012FF]/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-300">
                    <Zap className="h-3.5 w-3.5" />
                    <span>{prod.voltage} • {prod.amperage}A</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {t.products.estimatedLead}: <strong className="text-gray-900 dark:text-white">{prod.leadTime} {t.products.weeks}</strong>
                  </span>
                </div>

                {prod.imageSrc && (
                  <div 
                    onClick={() => onNavigate('/products/' + prod.id)}
                    className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-white/5 group mb-4 cursor-pointer"
                  >
                    <img 
                      src={prod.imageSrc} 
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                    {prod.images && prod.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-gray-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-[10px] text-white font-mono font-bold shadow-sm transition-colors">
                        <Images className="h-3.5 w-3.5 text-cyan-400" />
                        <span>
                          {prod.images.length} {language === 'tr' ? 'Görsel' : 'Images'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gray-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/15">
                        {language === 'tr' ? 'Özellikleri ve Telemetriyi İncele ➔' : 'View Specs & Telemetry ➔'}
                      </span>
                    </div>
                  </div>
                )}

                <h3 
                  onClick={() => onNavigate('/products/' + prod.id)}
                  className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-gray-900 dark:text-white hover:text-[#0012FF] dark:hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  {prod.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {prod.desc}
                </p>

                <div className="flex justify-start">
                  <button
                    onClick={() => onNavigate('/products/' + prod.id)}
                    className="text-xs font-mono font-semibold text-[#0012FF] dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                  >
                    <span>{language === 'tr' ? 'Detaylı İncele ve Canlı Telemetri' : 'Detailed Specs & Live IoT Telemetry'} &rarr;</span>
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-gray-150/50 dark:border-white/5">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-2">
                    {t.products.specifications}
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    {prod.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="h-1 w-1 bg-[#00FF00] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10 space-y-4">
                <div className="flex items-baseline justify-between select-none">
                  <span className="text-xs text-gray-400 font-mono uppercase">{t.products.techDetails}</span>
                  <span className="text-2xl font-mono font-bold text-[#0012FF] dark:text-[#00FF00]">
                    ${prod.estimatedCost.toLocaleString()} <span className="text-xs text-gray-400 font-sans font-normal">USD</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Action row */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Add to basket block */}
                    {(() => {
                      const itemInBasket = basket.find(item => item.id === prod.id);
                      if (itemInBasket) {
                        return (
                          <div className="flex items-center justify-between bg-[#0012FF]/5 dark:bg-cyan-400/5 border border-[#0012FF]/20 dark:border-cyan-400/25 rounded-xl px-2 py-1 h-11">
                            <button
                              onClick={() => updateBasketQuantity(prod.id, itemInBasket.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0012FF]/10 text-gray-800 dark:text-white border-none cursor-pointer text-xs font-bold"
                              title="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-[#0012FF] dark:text-cyan-300">
                              {itemInBasket.quantity}×
                            </span>
                            <button
                              onClick={() => updateBasketQuantity(prod.id, itemInBasket.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0012FF]/10 text-gray-800 dark:text-white border-none cursor-pointer text-xs font-bold"
                              title="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      } else {
                        return (
                          <button
                            onClick={() => addToBasket({
                              id: prod.id,
                              name: prod.name,
                              desc: prod.desc,
                              specs: prod.specs,
                              estimatedCost: prod.estimatedCost,
                              voltage: prod.voltage,
                              amperage: prod.amperage,
                              leadTime: prod.leadTime,
                              discipline: prod.discipline,
                              imageSrc: prod.imageSrc
                            })}
                            className="w-full py-2.5 px-3 rounded-xl bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-opacity-90 font-bold text-xs transition uppercase flex items-center justify-center gap-1.5 cursor-pointer border-0"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            <span>{language === 'tr' ? 'Sepete Ekle' : 'Add to Basket'}</span>
                          </button>
                        );
                      }
                    })()}

                    {/* Direct RFQ form toggle */}
                    <button
                      onClick={() => setActiveInquiryId(isFormOpen ? null : prod.id)}
                      className={`py-2.5 px-3 rounded-xl border font-bold text-xs transition uppercase flex items-center justify-center gap-1.5 cursor-pointer bg-transparent truncate ${
                        isFormOpen
                          ? 'border-red-500/30 text-red-500 hover:bg-red-500/5'
                          : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#0012FF] dark:hover:border-cyan-400'
                      }`}
                    >
                      <span>{isFormOpen ? (language === 'tr' ? 'Kapat' : 'Close') : (language === 'tr' ? 'Hızlı Teklif' : 'Quick RFQ')}</span>
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {isThisSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3.5 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-xl text-center text-xs text-[#00FF00] font-semibold"
                      >
                        <Check className="h-4 w-4 mx-auto mb-1 stroke-[3]" />
                        <span>{t.products.inquirySuccess}</span>
                      </motion.div>
                    ) : isFormOpen ? (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={(e) => handleProductSubmit(e, prod)}
                        className="bg-gray-50/50 dark:bg-slate-950 p-4 rounded-xl border border-gray-150 dark:border-white/5 space-y-3 mt-2 overflow-hidden"
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#0012FF] dark:text-cyan-400 block">
                          {t.products.inquiryTitle}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            required
                            type="text"
                            placeholder={t.estimator.formName}
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white"
                          />
                          <input
                            required
                            type="email"
                            placeholder={t.estimator.formEmail}
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white"
                          />
                          <input
                            required
                            type="tel"
                            placeholder={t.contact.phoneNumber}
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white"
                          />
                        </div>
                        <div className="pt-1.5">
                          <MathCaptchaCheckbox onVerified={setVerified} className="max-w-full" />
                        </div>
                        <button
                          type="submit"
                          disabled={!verified}
                          className="w-full py-2 px-3 rounded-lg bg-gray-900 dark:bg-[#00FF00] dark:text-gray-950 text-white font-bold hover:bg-gray-800 dark:hover:bg-[#00E000] text-xs transition uppercase cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t.products.inquireBtn}
                        </button>
                      </motion.form>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>    </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8" id="products-pagination">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`h-10 w-10 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer border ${
                  currentPage === pageNum
                    ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 border-gray-950 dark:border-cyan-400 shadow-sm font-extrabold'
                    : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
