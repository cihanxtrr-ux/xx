/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, RefreshCw, X, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface MathCaptchaCheckboxProps {
  onVerified: (verified: boolean) => void;
  className?: string;
  id?: string;
}

interface SVGChallenge {
  num1: number;
  operator: string;
  num2: number;
  answer: number;
  noiseLines: Array<{ d: string; stroke: string; strokeWidth: number }>;
  noiseDots: Array<{ cx: number; cy: number; r: number; fill: string; opacity: number }>;
  textElements: Array<{ char: string; x: number; y: number; rotate: number; scale: number; fill: string }>;
}

const LOCAL_T = {
  en: {
    checkboxLabel: "I'm not a robot",
    modalTitle: "Security Verification",
    modalSubtitle: "Complete this mathematical equation to verify that you are a human operator.",
    placeholder: "Verify answer...",
    verifyBtn: "Verify",
    verifyingBtn: "Analyzing...",
    success: "Verification Approved",
    failure: "Incorrect answer. Captcha regenerated.",
    empty: "Please enter an answer.",
    brand: "X-CAPTCHA",
    securedBy: "Secured by",
    privacyText: "Privacy • Terms",
    regenerate: "Regenerate challenge",
    sliderTitle: "Initial Verification",
    sliderSubtitle: "Slide the modern activator completely to the right to verify human intent.",
    sliderPrompt: "Slide to verify",
    sliderSuccess: "Unlocking challenge...",
  },
  tr: {
    checkboxLabel: "Ben robot değilim",
    modalTitle: "Güvenlik Doğrulaması",
    modalSubtitle: "İnsan operatör olduğunuzu doğrulamak için bu matematik denklemini çözün.",
    placeholder: "Sonucu girin...",
    verifyBtn: "Doğrula",
    verifyingBtn: "Analiz ediliyor...",
    success: "Doğrulama Onaylandı",
    failure: "Hatalı sonuç. Captcha yeniden üretildi.",
    empty: "Lütfen bir cevap giriniz.",
    brand: "X-CAPTCHA",
    securedBy: "Koruyan:",
    privacyText: "Gizlilik • Koşullar",
    regenerate: "Yeni şifre üret",
    sliderTitle: "İlk Doğrulama",
    sliderSubtitle: "İnsan niyetini doğrulamak için aktivatörü tamamen sağa kaydırın.",
    sliderPrompt: "Doğrulamak için kaydırın",
    sliderSuccess: "Bulmaca açılıyor...",
  }
};

export default function MathCaptchaCheckbox({ onVerified, className = '', id = 'math-captcha' }: MathCaptchaCheckboxProps) {
  const { language, theme } = useApp();
  const [verified, setVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isVerifyingState, setIsVerifyingState] = useState(false);
  const [challenge, setChallenge] = useState<SVGChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  
  // Slider states
  const [step, setStep] = useState<'slider' | 'math'>('slider');
  const [sliderVal, setSliderVal] = useState(0);
  const [sliderComplete, setSliderComplete] = useState(false);
  const [sliderResetting, setSliderResetting] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const t = LOCAL_T[language === 'tr' ? 'tr' : 'en'];

  // Generate an authentic secure SVG Math challenge configuration
  const generateNewChallenge = () => {
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = 0;
    let num2 = 0;
    let answer = 0;

    if (operator === '*') {
      // Keep multiplication simple and human-centric (single digits)
      num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      answer = num1 * num2;
    } else if (operator === '-') {
      // Ensure positive non-zero answer
      num1 = Math.floor(Math.random() * 41) + 20; // 20 to 60
      num2 = Math.floor(Math.random() * 19) + 1;  // 1 to 19
      answer = num1 - num2;
    } else {
      // Addition
      num1 = Math.floor(Math.random() * 41) + 10; // 10 to 50
      num2 = Math.floor(Math.random() * 41) + 5;  // 5 to 45
      answer = num1 + num2;
    }

    const chars = `${num1} ${operator} ${num2} = ?`.split('');
    const textElements = chars.map((char, i) => {
      // Symmetrical horizontal spread across a 240px wide canvas
      const x = 20 + i * 18 + (Math.random() * 3 - 1.5);
      const y = 42 + (Math.random() * 8 - 4);
      const rotate = Math.floor(Math.random() * 24 - 12); // subtle rotation (-12 to 12 deg)
      const scale = 0.95 + Math.random() * 0.15;

      // Premium branded security colors
      const colors = theme === 'dark'
        ? ['#00FF00', '#38bdf8', '#818cf8', '#f472b6', '#34d399', '#facc15', '#ffffff']
        : ['#0012FF', '#0284c7', '#3730a3', '#be185d', '#047857', '#b45309', '#111827'];
      const fill = colors[Math.floor(Math.random() * colors.length)];
      return { char, x, y, rotate, scale, fill };
    });

    // Generate 3-4 security curves intersecting the characters
    const noiseLines = Array.from({ length: 3 + Math.floor(Math.random() * 2) }).map(() => {
      const xStart = Math.random() * 15;
      const yStart = 15 + Math.random() * 40;
      const xMid1 = 50 + Math.random() * 50;
      const yMid1 = 5 + Math.random() * 55;
      const xMid2 = 130 + Math.random() * 60;
      const yMid2 = 5 + Math.random() * 55;
      const xEnd = 225 + Math.random() * 15;
      const yEnd = 15 + Math.random() * 40;

      const d = `M ${xStart} ${yStart} C ${xMid1} ${yMid1}, ${xMid2} ${yMid2}, ${xEnd} ${yEnd}`;
      const stroke = theme === 'dark'
        ? `rgba(0, 255, 0, ${0.15 + Math.random() * 0.2})`
        : `rgba(0, 18, 255, ${0.12 + Math.random() * 0.15})`;
      const strokeWidth = 1.2 + Math.random() * 1.8;
      return { d, stroke, strokeWidth };
    });

    // Generate 45-65 noise speckles
    const noiseDots = Array.from({ length: 45 + Math.floor(Math.random() * 20) }).map(() => {
      const cx = 5 + Math.random() * 230;
      const cy = 5 + Math.random() * 65;
      const r = 0.7 + Math.random() * 1.5;
      const fill = theme === 'dark' ? '#00FF00' : '#0012FF';
      const opacity = 0.05 + Math.random() * 0.25;
      return { cx, cy, r, fill, opacity };
    });

    setChallenge({ num1, operator, num2, answer, noiseLines, noiseDots, textElements });
    setUserAnswer('');
    setErrorMessage('');
  };

  // Trigger modal when clicking unchecked captcha box
  const handleCheckboxClick = () => {
    if (verified) return;

    setIsVerifyingState(true);
    // Simulate real reCAPTCHA analytical environment audit latency
    setTimeout(() => {
      setIsVerifyingState(false);
      setStep('slider');
      setSliderVal(0);
      setSliderComplete(false);
      setSliderResetting(false);
      generateNewChallenge();
      setShowModal(true);
    }, 800);
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!challenge) return;

    const trimmedAnswers = userAnswer.trim();
    if (!trimmedAnswers) {
      setErrorMessage(t.empty);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const valueNum = parseInt(trimmedAnswers, 10);
    if (valueNum === challenge.answer) {
      // Success sequence
      setVerified(true);
      setShowModal(false);
      onVerified(true);
    } else {
      // Failure sequence
      setErrorMessage(t.failure);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        generateNewChallenge();
      }, 500);
    }
  };

  // Slider Activator Controls
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sliderComplete || sliderResetting) return;
    const val = parseInt(e.target.value, 10);
    setSliderVal(val);
    if (val >= 100) {
      setSliderComplete(true);
      setTimeout(() => {
        setStep('math');
      }, 450);
    }
  };

  const handleSliderRelease = () => {
    if (sliderComplete) return;
    if (sliderVal < 100) {
      setSliderResetting(true);
      let currentVal = sliderVal;
      const stepDown = () => {
        currentVal = Math.max(0, currentVal - 8);
        setSliderVal(currentVal);
        if (currentVal > 0) {
          requestAnimationFrame(stepDown);
        } else {
          setSliderResetting(false);
        }
      };
      requestAnimationFrame(stepDown);
    }
  };

  // Keyboard accessibility triggers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleCheckboxClick();
    }
  };

  // Focus input automatically on modal screen mount
  useEffect(() => {
    if (showModal && step === 'math' && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [showModal, step]);

  return (
    <div id={id} className={`w-full max-w-[340px] select-none ${className}`}>
      {/* CAPTCHA Widget Box */}
      <div className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900/50 rounded-xl px-3.5 py-3 flex items-center justify-between shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          {/* Custom Interactive Checkbox Outer Frame */}
          <div
            role="checkbox"
            aria-checked={verified}
            tabIndex={verified ? -1 : 0}
            onClick={handleCheckboxClick}
            onKeyDown={handleKeyDown}
            className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all duration-300 outline-none cursor-pointer relative ${
              verified
                ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00D000]'
                : isVerifyingState
                ? 'border-gray-300 dark:border-white/20'
                : 'border-gray-300 dark:border-white/20 bg-white dark:bg-slate-950 hover:border-gray-400 dark:hover:border-white/40 focus:ring-2 focus:ring-[#0012FF]/35'
            }`}
          >
            {verified ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <CheckCircle2 className="w-5.5 h-5.5" strokeWidth={3} />
              </motion.div>
            ) : isVerifyingState ? (
              // Loader sequence from standard captcha
              <motion.div
                className="w-4 h-4 border-2 border-t-transparent rounded-full"
                style={{
                  borderColor: theme === 'dark' ? '#00FF00' : '#0012FF',
                  borderTopColor: 'transparent',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
              />
            ) : null}
          </div>

          {/* Verification Label */}
          <span 
            className={`text-xs select-none cursor-pointer transition-colors duration-200 font-sans font-medium ${
              verified ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-200'
            }`}
            onClick={handleCheckboxClick}
          >
            {t.checkboxLabel}
          </span>
        </div>

        {/* Brand Side Column */}
        <div className="flex flex-col items-end justify-center font-sans">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#0012FF] dark:text-[#00FF00]" />
            <span className="text-[10px] font-black uppercase text-[#0012FF] dark:text-[#00FF00] tracking-wider font-mono">
              {t.brand}
            </span>
          </div>
          <span className="text-[8px] text-gray-400 dark:text-gray-500 mt-0.5">
            {t.securedBy} <strong className="font-bold opacity-80">X-Security</strong>
          </span>
        </div>
      </div>

      {/* Verification Modal Lightbox */}
      <AnimatePresence>
        {showModal && challenge && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Modal Backdrop overlay layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Verification card dialog container */}
            <motion.div
              layout
              initial={{ scale: 0.94, y: 35, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 35, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-full max-w-sm bg-white dark:bg-slate-950 border border-gray-150 dark:border-white/10 rounded-3xl p-6 shadow-2xl relative text-left overflow-hidden ${
                shake ? 'animate-shake' : ''
              }`}
              style={{
                animation: shake ? 'shake 0.4s ease-in-out' : 'none'
              }}
            >
              {/* Close Button Trigger */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 transition-all outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Security Shield Header Accent */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0012FF]/10 dark:bg-[#00FF00]/10 flex items-center justify-center text-[#0012FF] dark:text-[#00FF00]">
                  <ShieldCheck className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-gray-900 dark:text-white">
                    {step === 'slider' ? t.sliderTitle : t.modalTitle}
                  </h3>
                  <span className="text-[9px] font-mono tracking-wider font-extrabold text-[#0012FF] dark:text-[#00FF00] uppercase block font-sans">
                    {t.brand} {step === 'slider' ? 'ACTIVATOR' : 'HUMAN CHECK'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {step === 'slider' ? t.sliderSubtitle : t.modalSubtitle}
              </p>

              {step === 'slider' ? (
                /* Slider ACTIVATOR View Container */
                <div className="space-y-6 py-2">
                  <div className="relative h-13 w-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-full flex items-center overflow-hidden p-1 select-none">
                    
                    {/* Background prompt slider label */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500/80 tracking-wider uppercase font-sans">
                        {sliderComplete ? t.sliderSuccess : t.sliderPrompt}
                      </span>
                    </div>

                    {/* Left Active solid layer filling up to the handle */}
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#0012FF]/10 dark:bg-[#00FF00]/15 border-r border-[#0012FF]/30 dark:border-[#00FF00]/30 rounded-l-full transition-all duration-75"
                      style={{ width: `calc(${sliderVal}% + 18px)` }}
                    />

                    {/* Highly interactive visual handle knob */}
                    <div
                      className="absolute top-1 w-11 h-11 rounded-full bg-gray-950 dark:bg-[#00FF00] text-white dark:text-gray-950 flex items-center justify-center shadow-lg pointer-events-none transition-all duration-75"
                      style={{ left: `calc(${sliderVal}% - ${sliderVal * 0.44}px + 4px)` }}
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={3} />
                    </div>

                    {/* Standard hidden transparent slider capture layer for pristine touch/desktop handling */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={handleSliderChange}
                      onMouseUp={handleSliderRelease}
                      onTouchEnd={handleSliderRelease}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="py-2.5 px-4 rounded-xl border border-gray-150 dark:border-white/5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold text-xs uppercase tracking-wider transition hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Original CAPTCHA Vector Image Canvas */
                <>
                  <div className="relative mb-4 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-white/5 rounded-2xl flex items-center justify-center p-3 overflow-hidden select-none">
                    {/* Embedded static mesh pattern in background for OCR interruption */}
                    <svg
                      width="240"
                      height="70"
                      viewBox="0 0 240 70"
                      className="w-full h-auto"
                    >
                      <defs>
                        <pattern id="captcha-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                          <path d="M 16 0 L 0 0 0 16" fill="none" stroke={theme === 'dark' ? 'rgba(0,255,0,0.06)' : 'rgba(0,18,255,0.04)'} strokeWidth="1" />
                        </pattern>
                      </defs>
                      {/* Grid background mesh */}
                      <rect width="240" height="70" fill="url(#captcha-grid)" />

                      {/* Anti-OCR Speckle noise array */}
                      {challenge.noiseDots.map((dot, idx) => (
                        <circle
                          key={`dot-${idx}`}
                          cx={dot.cx}
                          cy={dot.cy}
                          r={dot.r}
                          fill={dot.fill}
                          opacity={dot.opacity}
                        />
                      ))}

                      {/* Intersecting continuous security curves */}
                      {challenge.noiseLines.map((line, idx) => (
                        <path
                          key={`line-${idx}`}
                          d={line.d}
                          fill="none"
                          stroke={line.stroke}
                          strokeWidth={line.strokeWidth}
                        />
                      ))}

                      {/* Precision individual transformed math characters */}
                      {challenge.textElements.map((el, idx) => (
                        <text
                          key={`char-${idx}`}
                          x={el.x}
                          y={el.y}
                          fill={el.fill}
                          fontSize={21}
                          fontWeight="800"
                          fontFamily='"JetBrains Mono", monospace'
                          transform={`rotate(${el.rotate}, ${el.x}, ${el.y}) scale(${el.scale})`}
                          style={{ transformOrigin: `${el.x}px ${el.y}px` }}
                        >
                          {el.char}
                        </text>
                      ))}
                    </svg>

                    {/* Regenerate Trigger Button overlay */}
                    <button
                      type="button"
                      title={t.regenerate}
                      onClick={generateNewChallenge}
                      className="absolute bottom-2 right-2 text-gray-400 hover:text-[#0012FF] dark:hover:text-[#00FF00] p-1.5 rounded-xl bg-white/70 dark:bg-slate-950/75 hover:scale-105 transition-all shadow-sm cursor-pointer outline-none"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Form Input answer element */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <input
                        ref={inputRef}
                        required
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder={t.placeholder}
                        value={userAnswer}
                        onChange={(e) => {
                          setUserAnswer(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleVerify();
                          }
                        }}
                        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0012FF]/35 dark:focus:ring-[#00FF00]/25 focus:border-[#0012FF] dark:focus:border-[#00FF00] font-mono transition-all text-center"
                      />
                      
                      {/* Error Indicator message block */}
                      <AnimatePresence>
                        {errorMessage && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-1.5 text-red-500 dark:text-red-400 text-[11px] font-medium pt-1 px-1"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{errorMessage}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Action Controls */}
                    <div className="flex gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 py-3 px-4 rounded-2xl border border-gray-200 dark:border-white/5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 font-bold text-xs uppercase tracking-wider transition hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerify()}
                        className="flex-1 py-3 px-4 rounded-2xl bg-gray-950 dark:bg-[#00FF00] dark:text-gray-950 text-white hover:bg-gray-800 dark:hover:bg-[#00D000] font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer outline-none shadow-md"
                      >
                        <span>{t.verifyBtn}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Styled shake-keyframes injected directly into global CSS context */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
