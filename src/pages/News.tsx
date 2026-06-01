/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { NewsDatabase } from '../data/news';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight
} from 'lucide-react';

const ITEMS_PER_PAGE = 3;

export default function News() {
  const { language } = useApp();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const newsList = NewsDatabase[language === 'tr' ? 'tr' : 'en'];
  
  // Pagination calculations
  const totalPages = Math.ceil(newsList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = newsList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
      id="news-page-root"
    >
      {/* Header Container */}
      <div className="max-w-4xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0012FF] dark:text-cyan-400 block animate-pulse">
          {language === 'tr' ? 'X ELEKTRİK HABER SUTUNU' : 'X ELEKTRIK NEWS FEED'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {language === 'tr' ? 'Elektrik Şebekesinden Güncel Gelişmeler' : 'Heavy Grid Engineering News'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {language === 'tr' 
            ? 'Şebeke entegrasyonu, BESS istasyonları, dijital şalt hücre montajları ve mühendislik duyurularımıza buradan ulaşabilirsiniz.' 
            : 'Track our latest high-voltage substation commissionings, containerized energy storage rollouts, and B2B engineering events.'}
        </p>
      </div>

      {/* Main Grid: Card lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paginatedNews.map((item) => (
          <motion.article 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col bg-white dark:bg-slate-905 rounded-2xl overflow-hidden border border-gray-150 dark:border-white/10 text-left hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => navigate(`/news/${item.id}`)}
            id={`news-card-${item.id}`}
          >
            {/* Image Container with Hover Scale */}
            <div className="aspect-[16/10] overflow-hidden relative bg-slate-100 dark:bg-slate-900">
              <img 
                src={item.image} 
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-black/90 border border-white/15 text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                {item.category}
              </span>
            </div>

            {/* Core Card Details */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4 font-sans">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.readTime}
                  </span>
                </div>
                
                <h3 className="text-md font-bold text-gray-900 dark:text-white group-hover:text-[#0012FF] dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-400 pt-3 border-t border-gray-100 dark:border-white/5 uppercase select-none">
                <span>{language === 'tr' ? 'DEVAMINI OKU' : 'READ DETAILS'}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Custom High-Contrast Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-150 dark:border-white/10 pt-6 font-mono select-none" id="news-pagination-bar">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`h-10 px-4 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all border-0 cursor-pointer ${
              currentPage === 1
                ? 'bg-transparent text-gray-300 dark:text-gray-700 cursor-not-allowed'
                : 'bg-gray-55 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-340 hover:text-black dark:hover:text-cyan-400'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{language === 'tr' ? 'Önceki' : 'PREVIOUS'}</span>
          </button>

          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
            {language === 'tr' ? 'SAYFA' : 'PAGE'} <span className="text-[#0012FF] dark:text-cyan-400 px-1 font-extrabold">{currentPage}</span> / {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`h-10 px-4 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all border-0 cursor-pointer ${
              currentPage === totalPages
                ? 'bg-transparent text-gray-300 dark:text-gray-700 cursor-not-allowed'
                : 'bg-gray-55 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-340 hover:text-black dark:hover:text-cyan-400'
            }`}
          >
            <span>{language === 'tr' ? 'Sonraki' : 'NEXT'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
