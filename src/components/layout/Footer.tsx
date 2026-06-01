import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo';

interface FooterProps {
  navigateTo: (path: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  const { t, language } = useApp();

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-900 relative">
      <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-gray-55/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 text-left w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-white/5 pb-12">
          
          {/* Col 1: Logo & Brief */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => navigateTo('/home')} 
              className="transition-opacity hover:opacity-90 bg-transparent border-none p-0 block cursor-pointer"
              aria-label="Navigate to Home"
            >
              <Logo size="md" lightBackground={false} />
            </button>
            <p className="text-xs leading-relaxed max-w-sm text-gray-400">
              {t.footer.brief}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{t.footer.address}</span>
            </div>
          </div>

          {/* Col 2: Capabilities links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{t.footer.solutionsTitle}</span>
            <ul className="space-y-2 text-xs list-none p-0 m-0">
              <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.commTitle}</button></li>
              <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.indTitle}</button></li>
              <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors text-cyan-400 bg-transparent border-none p-0 text-left cursor-pointer font-bold">{t.services.datacenterTitle}</button></li>
              <li><button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.renewTitle}</button></li>
            </ul>
          </div>

          {/* Col 3: Resources & Standards */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{t.footer.corporateTitle}</span>
            <p className="text-xs leading-relaxed max-w-xs text-gray-550">
              {t.footer.corporateText}
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-white text-xs bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-[#00FF00] flex-shrink-0" />
              <strong>+353 1 902 4499</strong>
            </span>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-550 gap-4">
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
              <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>{t.footer.accreditation}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
