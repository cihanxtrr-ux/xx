import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Cpu, 
  TrendingUp, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

const LOCAL_T = {
  en: {
    pfcTitle: "Harmonics-Filtered Power Factor Calculator",
    pfcDesc: "Calculate optimized capacitor bank kVAR, payback schedules, detuned reactor values, and dynamic load reductions.",
    activeLoad: "Active Facility Load (kW)",
    existingPf: "Existing Power Factor (cos φ₁)",
    targetPf: "Target Power Factor (cos φ₂)",
    pfcRequired: "Required Capacitor Bank (kVAR)",
    pfcSavings: "Projected Annual Utility Savings",
    pfcPayback: "Estimated Payback Period",
    pfcCost: "Equipment Capital Expenditure",
    pfcCurrentDemand: "Phase Current Demand Reduction",
    pfcGridPhasor: "Vector Phasor Power Triangle Analysis",
    detunedTitle: "DETUNED HARMONIC BLOCK REACTOR",
    detunedDesc: "Includes 7% impedance tuning (189Hz resonance) to prevent active harmonic resonance burns.",
    stage12: "12-STAGE FULL SWITCH",
    penaltyGain: "PENALTY + KVA GAIN",
    projRoi: "PROJECTED ROI HORIZON",
    lineSlashed: "Line Current Slashed By ",
    originalS: "Original Apparent (S₁):",
    correctedS: "Corrected Apparent (S₂):",
    lineSaved: "Line Current Saved:",
    pfcRelieves: "PFC relieves upstream thermal strain, expanding active secondary feeder capacities.",
    deploymentGuide: "X ELEKTRIK TECHNICAL DEPLOYMENT BLUEPRINT",
    phase1Title: "Phase 01 - Discharge Integrity",
    phase1Desc: "Fitted with continuous discharge resistors designed to drop static terminal voltage below 50V in seconds.",
    phase2Title: "Phase 02 - IntelliSwitching Module",
    phase2Desc: "Smart rotational routing switches physical capacitor steps evenly, boosting structural lifespans.",
    years: "Years",
    inputManual: "Enter exact value manually"
  },
  tr: {
    pfcTitle: "Harmonik Filtreli Kompanzasyon Hesaplayıcı",
    pfcDesc: "Dinamik yük düşüşlerini, akım azalımlarını ve reaktif ceza tasarruflarını belirlemek için gereken kondansatör gücünü hesaplayın.",
    activeLoad: "Aktif Tesis Yükü (kW)",
    existingPf: "Mevcut Güç Faktörü (cos φ₁)",
    targetPf: "Hedef Güç Faktörü (cos φ₂)",
    pfcRequired: "Gerekli Reaktif Güç (kVAR)",
    pfcSavings: "Tahmini Yıllık Ceza Tasarrufu",
    pfcPayback: "Yatırım Geri Dönüş Süresi",
    pfcCost: "Ekipman ve Montaj Maliyeti",
    pfcCurrentDemand: "Faz Akımı Azaltım Analizi",
    pfcGridPhasor: "Şebeke Vektör Fazör Güç Üçgeni Analizi",
    detunedTitle: "DETUNED HARMONİK BLOKAJ REAKTÖRLERİ",
    detunedDesc: "%7 empedans sönümlemesi (189Hz rezonans) ile aşırı akım yıpranmalarını engeller.",
    stage12: "12 KADEMELİ SİSTEM",
    penaltyGain: "CEZA + KVA KAZANCI",
    projRoi: "ÖNGÖRÜLEN ROI SEVİYESİ",
    lineSlashed: "Faz Akımı %",
    originalS: "İlk Görünür Güç (S₁):",
    correctedS: "Yeni Görünür Güç (S₂):",
    lineSaved: "Kaydedilen Şebeke Akımı:",
    pfcRelieves: "Elektrik şebekesi kompanzasyonu, iletim verimliliğini artırarak transformatörlerin ve kabloların aşırı ısınmasını engeller.",
    deploymentGuide: "X ELEKTRİK KOMPANZASYON ADIM ADIM DEPLOYMENT KILAVUZU",
    phase1Title: "Faz 01 - Kondansatör Deşarj Güvenliği",
    phase1Desc: "60 saniyede gerilimi 50V altına düşürecek deşarj dirençleri barındırır.",
    phase2Title: "Faz 02 - Mikroişlemci Kontrollü Röle",
    phase2Desc: "Eşit kondansatör yaşlandırması için otomatik dairesel rotasyon algoritması devrede.",
    years: "Yıl",
    inputManual: "Kesin değeri elle girin"
  }
};

export default function PowerFactorCalculator() {
  const { language } = useApp();
  const currentLang = (language === 'tr' || language === 'en') ? language : 'en';
  const t = LOCAL_T[currentLang];

  // States
  const [activeLoad, setActiveLoad] = useState<number>(450); // kW
  const [existingPf, setExistingPf] = useState<number>(0.74); // ratio
  const [targetPf, setTargetPf] = useState<number>(0.97); // ratio
  const [tariffRate, setTariffRate] = useState<number>(0.16); // USD/kWh

  // Manual input field visibilities for accessibility
  const [showLoadInput, setShowLoadInput] = useState(false);
  const [showExistInput, setShowExistInput] = useState(false);
  const [showTargetInput, setShowTargetInput] = useState(false);
  const [showTariffInput, setShowTariffInput] = useState(false);

  // Calculations
  const pf1 = existingPf;
  const pf2 = targetPf;
  
  const phi1 = Math.acos(pf1);
  const phi2 = Math.acos(pf2);
  
  const q1 = activeLoad * Math.tan(phi1);
  const q2 = activeLoad * Math.tan(phi2);
  const reqKvar = Math.max(0, q1 - q2);

  const s1 = activeLoad / pf1;
  const s2 = activeLoad / pf2;

  // Currents at 480V 3-phase
  const current1 = (s1 * 1000) / (480 * 1.732);
  const current2 = (s2 * 1000) / (480 * 1.732);
  const currentReduced = Math.max(0, current1 - current2);

  // Estimated equipment cost: $55 per installed kVAR (including reactors)
  const totalCost = Math.round(reqKvar * 55);

  // Utility Power Factor surcharge savings
  const pfPenaltyOriginal = pf1 < 0.95 ? (activeLoad * tariffRate * 180 * (0.95 - pf1)) * 12 : 0;
  const pfPenaltyCorrected = pf2 < 0.95 ? (activeLoad * tariffRate * 180 * (0.95 - pf2)) * 12 : 0;
  const penaltySavings = Math.max(0, pfPenaltyOriginal - pfPenaltyCorrected);

  // KVA peak demand savings: $12 per month per kVA reduced
  const kvaDemandReduced = Math.max(0, s1 - s2);
  const kvaSavingsYear = kvaDemandReduced * 12.50 * 12;

  const totalAnnualSavings = Math.round(penaltySavings + kvaSavingsYear);
  const paybackPeriod = totalAnnualSavings > 0 ? (totalCost / totalAnnualSavings).toFixed(1) : 'N/A';

  // Manual input handlers with bounds checking
  const handleLoadChange = (val: number) => {
    if (isNaN(val)) return;
    const clamped = Math.max(10, Math.min(10000, val));
    setActiveLoad(clamped);
  };

  const handleExistPfChange = (val: number) => {
    if (isNaN(val)) return;
    const clamped = Math.max(0.40, Math.min(0.99, val));
    setExistingPf(clamped);
    if (targetPf < clamped) {
      setTargetPf(Math.min(1.0, clamped + 0.01));
    }
  };

  const handleTargetPfChange = (val: number) => {
    if (isNaN(val)) return;
    const clamped = Math.max(existingPf + 0.01, Math.min(1.0, val));
    setTargetPf(clamped);
  };

  const handleTariffChange = (val: number) => {
    if (isNaN(val)) return;
    const clamped = Math.max(0.01, Math.min(2.0, val));
    setTariffRate(clamped);
  };

  return (
    <div className="space-y-8 text-left" role="region" aria-labelledby="pfc-heading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Sliders & Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-150/40 dark:border-white/5 pb-3">
            <div className="flex items-center gap-2 text-[#0012FF] dark:text-cyan-400">
              <Activity className="h-5 w-5" aria-hidden="true" />
              <h3 id="pfc-heading" className="text-sm font-mono font-bold uppercase tracking-wider">
                {t.pfcTitle}
              </h3>
            </div>
            <p className="text-[11px] text-gray-450 dark:text-gray-400 mt-1 leading-relaxed">
              {t.pfcDesc}
            </p>
          </div>

          <div className="space-y-5">
            {/* 1. Active Load kW */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono">
                <label htmlFor="pfc-active-load" className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">
                  {t.activeLoad}
                </label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowLoadInput(!showLoadInput)}
                    className="text-[9px] underline text-gray-400 dark:text-gray-500 hover:text-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
                    aria-label={t.inputManual}
                  >
                    [+/-]
                  </button>
                  <span className="text-sm font-black text-gray-955 dark:text-white">{activeLoad} kW</span>
                </div>
              </div>

              {showLoadInput ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={activeLoad}
                    onChange={(e) => handleLoadChange(Number(e.target.value))}
                    min="10"
                    max="10000"
                    placeholder="kW"
                    className="w-full text-xs font-mono p-1 rounded border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Direct Active Facility Load in kW"
                  />
                </div>
              ) : null}

              <input
                id="pfc-active-load"
                type="range"
                min="20"
                max="3000"
                step="10"
                value={activeLoad}
                onChange={(e) => setActiveLoad(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-105 dark:bg-zinc-800 accent-[#0012FF] dark:accent-cyan-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                aria-valuemin={20}
                aria-valuemax={3000}
                aria-valuenow={activeLoad}
                aria-valuetext={`${activeLoad} kilowatts`}
              />
            </div>

            {/* 2. Existing Power Factor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono">
                <label htmlFor="pfc-existing-pf" className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">
                  {t.existingPf}
                </label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowExistInput(!showExistInput)}
                    className="text-[9px] underline text-gray-400 dark:text-gray-500 hover:text-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
                    aria-label={t.inputManual}
                  >
                    [+/-]
                  </button>
                  <span className="text-sm font-black text-amber-500">{existingPf.toFixed(2)} cosφ</span>
                </div>
              </div>

              {showExistInput ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={existingPf}
                    onChange={(e) => handleExistPfChange(Number(e.target.value))}
                    min="0.40"
                    max="0.99"
                    placeholder="0.74"
                    className="w-full text-xs font-mono p-1 rounded border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Direct Existing Power Factor"
                  />
                </div>
              ) : null}

              <input
                id="pfc-existing-pf"
                type="range"
                min="0.50"
                max="0.95"
                step="0.01"
                value={existingPf}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setExistingPf(val);
                  if (targetPf < val) {
                    setTargetPf(Math.min(1.0, val + 0.05));
                  }
                }}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-105 dark:bg-zinc-800 accent-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                aria-valuemin={0.50}
                aria-valuemax={0.95}
                aria-valuenow={existingPf}
                aria-valuetext={`${existingPf.toFixed(2)} existing power factor`}
              />
            </div>

            {/* 3. Target Power Factor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono">
                <label htmlFor="pfc-target-pf" className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">
                  {t.targetPf}
                </label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowTargetInput(!showTargetInput)}
                    className="text-[9px] underline text-gray-400 dark:text-gray-500 hover:text-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
                    aria-label={t.inputManual}
                  >
                    [+/-]
                  </button>
                  <span className="text-sm font-black text-emerald-500">{targetPf.toFixed(2)} cosφ</span>
                </div>
              </div>

              {showTargetInput ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={targetPf}
                    onChange={(e) => handleTargetPfChange(Number(e.target.value))}
                    min={existingPf + 0.01}
                    max="1.00"
                    placeholder="0.97"
                    className="w-full text-xs font-mono p-1 rounded border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Direct Target Power Factor"
                  />
                </div>
              ) : null}

              <input
                id="pfc-target-pf"
                type="range"
                min={Math.max(0.70, Number((existingPf + 0.01).toFixed(2)))}
                max="1.00"
                step="0.01"
                value={targetPf}
                onChange={(e) => setTargetPf(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-105 dark:bg-zinc-800 accent-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                aria-valuemin={Number((existingPf + 0.01).toFixed(2))}
                aria-valuemax={1.00}
                aria-valuenow={targetPf}
                aria-valuetext={`${targetPf.toFixed(2)} target power factor`}
              />
            </div>

            {/* 4. Industrial Tariff Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono">
                <label htmlFor="pfc-tariff" className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">
                  {currentLang === 'tr' ? 'Endüstriyel Enerji Tarifesi (USD/kWh)' : 'Industrial Energy Tariff ($/kWh)'}
                </label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowTariffInput(!showTariffInput)}
                    className="text-[9px] underline text-gray-400 dark:text-gray-500 hover:text-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
                    aria-label={t.inputManual}
                  >
                    [+/-]
                  </button>
                  <span className="text-sm font-black text-cyan-400">${tariffRate.toFixed(3)}</span>
                </div>
              </div>

              {showTariffInput ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.005"
                    value={tariffRate}
                    onChange={(e) => handleTariffChange(Number(e.target.value))}
                    min="0.01"
                    max="2.00"
                    placeholder="0.160"
                    className="w-full text-xs font-mono p-1 rounded border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Direct Industrial Energy Tariff Rate per kilowatt-hour"
                  />
                </div>
              ) : null}

              <input
                id="pfc-tariff"
                type="range"
                min="0.05"
                max="0.45"
                step="0.01"
                value={tariffRate}
                onChange={(e) => setTariffRate(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-105 dark:bg-zinc-800 accent-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                aria-valuemin={0.05}
                aria-valuemax={0.45}
                aria-valuenow={tariffRate}
                aria-valuetext={`Tariff ${tariffRate.toFixed(3)} dollars per kilowatt-hour`}
              />
            </div>

            {/* Harmonic detuned reactor selection checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none font-mono">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="mt-0.5 rounded border-gray-300 dark:border-white/10 text-[#0012FF] dark:text-cyan-400 focus:ring-0 cursor-pointer"
                  aria-label="Detuned harmonic blocker activation"
                />
                <div className="text-left font-mono text-[10.5px]">
                  <span className="font-bold text-gray-800 dark:text-gray-200 uppercase block">
                    {t.detunedTitle}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 block leading-tight mt-0.5">
                    {t.detunedDesc}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Panel: Phasor Vector Canvas and Analysis Matrix */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="group" aria-label="Calculated Performance Analytics">
            
            {/* Capacitor bank rating */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden" tabIndex={0} aria-label={`${Math.round(reqKvar).toLocaleString()} kVAR Required Capacitor Bank power`}>
              <div className="absolute top-0 right-0 p-3 opacity-10 text-[#0012FF] dark:text-cyan-400">
                <Cpu className="h-10 w-10" aria-hidden="true" />
              </div>
              <span className="block text-[9.5px] font-mono tracking-wider font-extrabold text-gray-400 dark:text-gray-400 uppercase text-left">
                {t.pfcRequired}
              </span>
              <div className="pt-2 text-left">
                <span className="text-2xl font-mono font-black text-[#0012FF] dark:text-cyan-400">
                  {Math.round(reqKvar).toLocaleString()}
                </span>
                <span className="text-xs font-mono text-gray-500 ml-1.5">kVAR</span>
              </div>
              <span className="block text-[9.5px] font-mono text-gray-450 dark:text-gray-500 uppercase text-left">
                {t.stage12}
              </span>
            </div>

            {/* Projected Savings */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden font-mono" tabIndex={0} aria-label={`Projected Annual Savings is ${totalAnnualSavings.toLocaleString()} dollars`}>
              <div className="absolute top-0 right-0 p-3 opacity-10 text-emerald-500">
                <TrendingUp className="h-10 w-10" aria-hidden="true" />
              </div>
              <span className="block text-[9.5px] tracking-wider font-extrabold text-gray-400 dark:text-gray-400 uppercase text-left">
                {t.pfcSavings}
              </span>
              <div className="pt-2 text-left">
                <span className="text-2xl font-black text-emerald-500">
                  ${totalAnnualSavings.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 ml-1.5">/ Year</span>
              </div>
              <span className="block text-[9.5px] text-gray-450 dark:text-gray-500 uppercase text-left">
                {t.penaltyGain}
              </span>
            </div>

            {/* Payback period */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden font-mono" tabIndex={0} aria-label={`Estimated payback period is ${paybackPeriod} years`}>
              <div className="absolute top-0 right-0 p-3 opacity-10 text-cyan-400">
                <Clock className="h-10 w-10" aria-hidden="true" />
              </div>
              <span className="block text-[9.5px] tracking-wider font-extrabold text-gray-400 dark:text-gray-400 uppercase text-left">
                {t.pfcPayback}
              </span>
              <div className="pt-2 text-left">
                <span className="text-2xl font-black text-cyan-400">
                  {paybackPeriod}
                </span>
                <span className="text-xs text-gray-400 ml-1.5">
                  {paybackPeriod === 'N/A' ? '' : t.years}
                </span>
              </div>
              <span className="block text-[9.5px] text-gray-450 dark:text-gray-400 uppercase text-left">
                {t.projRoi}
              </span>
            </div>

          </div>

          {/* Dynamic Graphical Vector Phasor Canvas */}
          <div className="bg-[#050510] border border-gray-150/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 text-slate-100 relative space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 text-left">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>{t.pfcGridPhasor}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* SVG Phasor Chart - 7 cols */}
              <div className="md:col-span-7 flex justify-center bg-black/40 rounded-xl p-3 border border-white/5" role="img" aria-label="SVG vector chart illustrating the reduction in reactive and apparent power with capacitor correction">
                {(() => {
                  const baseW = 160;
                  const hOrig = Math.max(20, Math.min(150, baseW * Math.tan(phi1)));
                  const hCorr = Math.max(10, Math.min(150, baseW * Math.tan(phi2)));

                  const ox = 40;
                  const oy = 180;

                  const ax = ox + baseW;
                  const ay = oy;

                  const o_ey = oy - hOrig;
                  const c_ey = oy - hCorr;

                  return (
                    <svg viewBox="0 0 280 210" className="w-full max-w-[280px]">
                      {/* Coordinate Grid Guides */}
                      <line x1={ox} y1={oy} x2={ox+baseW+40} y2={oy} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1={ox} y1={oy} x2={ox} y2={oy-160} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1={ax} y1={oy} x2={ax} y2={oy-160} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />

                      {/* Axis Marks */}
                      <text x={ox-15} y={oy+4} className="text-[8px] fill-slate-500 font-mono">0</text>
                      <text x={ax} y={oy+15} className="text-[8px] fill-emerald-400 font-mono text-center">P (Active kW)</text>
                      <text x={ox-30} y={oy-150} className="text-[8px] fill-amber-500 font-mono">Q (Reactive kVAR)</text>

                      {/* Active Power Vector P */}
                      <line x1={ox} y1={oy} x2={ax} y2={ay} stroke="#10b981" strokeWidth="3.5" />
                      <polygon points={`${ax},${ay} ${ax-7},${ay-4} ${ax-7},${ay+4}`} className="fill-emerald-400" />

                      {/* Original Q vector Q1 */}
                      <line x1={ax} y1={ay} x2={ax} y2={o_ey} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
                      
                      {/* Corrected Q vector Q2 */}
                      <line x1={ax} y1={ay} x2={ax} y2={c_ey} stroke="#38bdf8" strokeWidth="3.5" />
                      <polygon points={`${ax},${c_ey} ${ax-3},${c_ey+6} ${ax+3},${c_ey+6}`} className="fill-cyan-400" />

                      {/* Compensation segment delta QC */}
                      {reqKvar > 0 && (
                        <g>
                          <line x1={ax+8} y1={o_ey} x2={ax+8} y2={c_ey} stroke="#f43f5e" strokeWidth="2.5" />
                          <text x={ax+14} y={(o_ey + c_ey)/2 + 4} className="text-[8px] fill-rose-400 font-mono font-bold">
                            ΔQc
                          </text>
                        </g>
                      )}

                      {/* Original Hypotenuse apparent power S1 */}
                      <line x1={ox} y1={oy} x2={ax} y2={o_ey} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
                      
                      {/* Corrected Hypotenuse apparent power S2 */}
                      <line x1={ox} y1={oy} x2={ax} y2={c_ey} stroke="#06b6d4" strokeWidth="2.5" />

                      {/* Visual Angular arc indicators */}
                      <path d={`M ${ox+25} ${oy} A 25 25 0 0 0 ${ox+Math.cos(phi1)*25} ${oy-Math.sin(phi1)*25}`} fill="none" stroke="#f59e0b" strokeWidth="1" />
                      <path d={`M ${ox+40} ${oy} A 40 40 0 0 0 ${ox+Math.cos(phi2)*40} ${oy-Math.sin(phi2)*40}`} fill="none" stroke="#22d3ee" strokeWidth="1" />

                      {/* Text Legends on Vectors */}
                      <text x={ox+55} y={oy-Math.sin(phi2)*40 - 15} className="text-[8px] fill-cyan-400 font-mono font-bold">S₂ (Corrected)</text>
                      <text x={ox+45} y={oy-Math.sin(phi1)*25 - 42} className="text-[8px] fill-amber-500 font-mono font-bold">S₁ (Original)</text>
                    </svg>
                  );
                })()}
              </div>

              {/* Text explanation and spec values - 5 cols */}
              <div className="md:col-span-5 text-left space-y-3.5 font-mono text-xs">
                <div className="border-b border-white/10 pb-2">
                  <span className="block text-[9.5px] text-gray-500 uppercase font-black">
                    {t.pfcCurrentDemand}
                  </span>
                  <p className="text-sm font-bold text-white mt-1" tabIndex={0}>
                    {t.lineSlashed}
                    <span className="text-[#0012FF] dark:text-cyan-400 font-black">
                      {s1 > 0 ? (((s1 - s2) / s1) * 100).toFixed(1) : 0}%
                    </span>
                  </p>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="flex justify-between" tabIndex={0}>
                    <span className="text-slate-450">{t.originalS}</span>
                    <span className="text-amber-500 font-bold">{Math.round(s1)} kVA</span>
                  </div>
                  <div className="flex justify-between" tabIndex={0}>
                    <span className="text-slate-450">{t.correctedS}</span>
                    <span className="text-cyan-400 font-bold">{Math.round(s2)} kVA</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-white/5" tabIndex={0}>
                    <span className="text-slate-450">{t.lineSaved}</span>
                    <span className="text-emerald-400 font-bold">
                      {currentReduced.toFixed(1)} Amps
                    </span>
                  </div>
                  <div className="flex justify-between pt-1" tabIndex={0}>
                    <span className="text-slate-450">{t.pfcCost}:</span>
                    <span className="text-white font-bold">${totalCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[9.5px] text-slate-450 leading-normal" tabIndex={0}>
                  {t.pfcRelieves}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Step-by-Step Electrical Deployment Guide */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl p-5 space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-left">
              {t.deploymentGuide}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-white/5 space-y-1.5 text-left" tabIndex={0}>
                <span className="text-[10px] font-mono text-cyan-500 dark:text-cyan-400 font-bold uppercase block">
                  {t.phase1Title}
                </span>
                <p className="text-gray-550 dark:text-gray-400 text-[11px] leading-relaxed">
                  {t.phase1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-white/5 space-y-1.5 text-left" tabIndex={0}>
                <span className="text-[10px] font-mono text-[#0012FF] dark:text-cyan-400 font-bold uppercase block">
                  {t.phase2Title}
                </span>
                <p className="text-gray-550 dark:text-gray-400 text-[11px] leading-relaxed">
                  {t.phase2Desc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
