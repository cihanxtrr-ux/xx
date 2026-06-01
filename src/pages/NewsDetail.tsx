/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { NewsDatabase } from '../data/news';
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Zap,
  FileText,
  Share2
} from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useApp();

  const newsList = NewsDatabase[language === 'tr' ? 'tr' : 'en'];
  const newsItem = newsList.find(item => item.id === id);

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-6 font-mono">
        <h2 className="text-2xl font-bold text-red-500 uppercase">
          {language === 'tr' ? 'BU HABER DETAYI BULUNAMADI' : 'NEWS DEEPLINK NOT FOUND'}
        </h2>
        <p className="text-sm text-gray-400">
          {language === 'tr' 
            ? 'İstediğiniz haber bülteni veri tabanımızdan çıkarılmış veya taşınmış olabilir.' 
            : 'The requested engineering circular could not be resolved in the currently energized database.'}
        </p>
        <button
          onClick={() => navigate('/news')}
          className="px-6 py-2.5 bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 font-bold uppercase text-xs rounded-xl hover:bg-opacity-90 transition-all border-none cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{language === 'tr' ? 'HABER KÜTÜPHANESİNE DÖN' : 'BACK TO NEWS LIBRARY'}</span>
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.summary,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'tr' ? 'Bağlantı panoya kopyalandı!' : 'Publication URL copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      id="news-detail-root"
    >
      {/* Return & Share upper bar */}
      <div className="flex items-center justify-between font-mono select-none">
        <button
          onClick={() => navigate('/news')}
          className="group text-xs font-bold text-gray-500 hover:text-[#0012FF] dark:hover:text-cyan-400 flex items-center gap-2 bg-transparent border-0 cursor-pointer transition-colors uppercase"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>{language === 'tr' ? 'Tüm Haberler' : 'ALL RELEASES'}</span>
        </button>

        <button
          onClick={handleShare}
          className="text-xs font-bold text-gray-500 hover:text-[#0012FF] dark:hover:text-cyan-400 flex items-center gap-2 bg-transparent border-0 cursor-pointer transition-colors uppercase"
        >
          <Share2 className="h-4 w-4" />
          <span>{language === 'tr' ? 'Paylaş' : 'SHARE'}</span>
        </button>
      </div>

      {/* Main Container */}
      <article className="bg-white dark:bg-[#090909] border border-gray-150 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col">
        {/* Full image header */}
        <div className="aspect-[21/9] w-full relative bg-slate-100 dark:bg-slate-950 overflow-hidden shrink-0">
          <img 
            src={newsItem.image} 
            alt={newsItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
            <span className="bg-cyan-400 text-slate-950 text-[9px] font-mono font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
              {newsItem.category}
            </span>
            <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-bold font-sans tracking-tight leading-snug drop-shadow-md">
              {newsItem.title}
            </h1>
          </div>
        </div>

        {/* Outer details content */}
        <div className="p-6 sm:p-10 space-y-8 text-left">
          {/* Metadata badges row */}
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 dark:text-gray-500 pb-4 border-b border-gray-100 dark:border-white/5">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#0012FF] dark:text-cyan-400" />
              {newsItem.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-500" />
              {newsItem.readTime}
            </span>
          </div>

          {/* Large summary quote block */}
          <p className="text-gray-500 dark:text-gray-400 font-sans italic text-sm sm:text-base border-l-4 border-cyan-400 pl-4 py-1 leading-relaxed">
            {newsItem.summary}
          </p>

          {/* News body text */}
          <p className="text-gray-700 dark:text-gray-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {newsItem.content}
          </p>

          {/* Technical specifications specs block (craftsmanship item) */}
          {newsItem.specs && (
            <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-2xl border border-gray-150 dark:border-white/5 space-y-4 font-mono">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
                {language === 'tr' ? 'AĞIR ELEKTRİK PARAMETRELERİ & ANALİZ' : 'OPERATOR ELECTRICAL PARAMETERS'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] pt-2 border-t border-gray-100 dark:border-white/5">
                {newsItem.specs.map((spec, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <span className="text-gray-400 uppercase font-bold text-[9px]">{spec.label}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-extrabold text-[10px] uppercase">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer with reference to the grid archive */}
        <div className="bg-gray-50 dark:bg-slate-950 px-6 sm:px-10 py-5 flex justify-between items-center border-t border-gray-150 dark:border-white/5 shrink-0 select-none">
          <span className="text-[10px] font-mono font-bold text-gray-400 flex items-center gap-1.5 uppercase">
            <FileText className="h-4 w-4" />
            <span>X ELEKTRİK PRESS RELEASE ARCHIVE</span>
          </span>
          <button
            onClick={() => navigate('/news')}
            className="h-9 px-5 rounded-xl bg-[#0012FF] hover:bg-opacity-90 dark:bg-cyan-400 text-white dark:text-slate-950 text-xs font-mono font-bold uppercase cursor-pointer border-0 shadow-sm transition-colors"
          >
            {language === 'tr' ? 'KÜTÜPHANEYE DÖN' : 'BACK TO LIST'}
          </button>
        </div>
      </article>
    </motion.div>
  );
}
