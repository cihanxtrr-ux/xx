/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import PowerFactorCalculator from '../components/dashboard/PowerFactorCalculator';
import { 
  ShieldCheck, 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Lock, 
  FileText, 
  User, 
  LogOut, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Wrench, 
  FileCode, 
  Layers2, 
  Plus, 
  Building2, 
  Mail, 
  PhoneCall, 
  HelpCircle,
  Sparkles,
  Trash2,
  X
} from 'lucide-react';

const SECTORS_METRIC_TEMPLATES = {
  datacenter: {
    systemTitleEn: "Hyperscale Thermal & Power Matrix",
    systemTitleTr: "Hiporölçek Termal ve Güç Matrisi",
    redundancyLevel: "N+2 Redundant Dual Path active",
    metrics: [
      { key: "pue", labelEn: "Target PUE Rating", labelTr: "Hedef PUE Değeri", val: "1.12 PUE", trend: "0.02%", positive: true, icon: Cpu },
      { key: "temp", labelEn: "Cold Aisle Temperature", labelTr: "Soğuk Koridor Sıcaklığı", val: "19.5 °C", trend: "Stable", positive: true, icon: Server },
      { key: "capacity", labelEn: "Substation MW Buffer", labelTr: "Trafo Çıkışı MW Rezervi", val: "12.8 MW / 24 MW", trend: "Normal Load", positive: true, icon: Zap },
      { key: "ups", labelEn: "UPS Autonomy Fuel State", labelTr: "UPS Otonom Yakıt Durumu", val: "99.8%", trend: "100h capacity", positive: true, icon: Database }
    ]
  },
  renewable: {
    systemTitleEn: "Battery Energy Storage & Solar Plant Flow",
    systemTitleTr: "Akü Enerji Depolama ve Güneş Santrali Akışı",
    redundancyLevel: "Grid-Tied Frequency Droop Controlled",
    metrics: [
      { key: "soc", labelEn: "BESS State of Charge", labelTr: "BESS Akü Isıl Doluluk", val: "84.2%", trend: "Charging", positive: true, icon: Cpu },
      { key: "gen", labelEn: "Daily Yield Generated", labelTr: "Günlük Üretilen Hacim", val: "14,840 kWh", trend: "+12.4%", positive: true, icon: Zap },
      { key: "voltage", labelEn: "PCC Feed Interconnection", labelTr: "PCC Besleme Ara Bağlantısı", val: "110 kV", trend: "Locked", positive: true, icon: Layers },
      { key: "carbon", labelEn: "Carbon Offset Metric", labelTr: "Eşdeğer Karbon Engelleme", val: "4.82 Tons CO₂", trend: "Cumulative", positive: true, icon: Sparkles }
    ]
  },
  industrial: {
    systemTitleEn: "Heavy Transformer & Busduct Telemetry",
    systemTitleTr: "Ağır Trafo ve Bara Telemetrisi",
    redundancyLevel: "Dual Primary Feed Auto-Transfer Ready",
    metrics: [
      { key: "mcc", labelEn: "Motor Control Feeder Current", labelTr: "MCC Sürücü Akımı", val: "1,240 Amps", trend: "Normal Phase", positive: true, icon: Layers2 },
      { key: "powerfactor", labelEn: "Power Factor Correction", labelTr: "Güç Faktörü Kompanzasyonu", val: "0.98 cosφ", trend: "Optimized", positive: true, icon: Cpu },
      { key: "harmonic", labelEn: "Total Harmonic Distortion (THD)", labelTr: "Toplam Harmonik Çöküşü (THD)", val: "1.45%", trend: "< 3.0% OK", positive: true, icon: Activity },
      { key: "oil", labelEn: "Transformer Core Oil Temp", labelTr: "Trafo Yağ Sıcaklığı", val: "62.4 °C", trend: "Safe Limit", positive: true, icon: Wrench }
    ]
  },
  commercial: {
    systemTitleEn: "Building Management Integration Core",
    systemTitleTr: "Bina Yönetim Entegrasyonu Çekirdeği",
    redundancyLevel: "Grid Interactive Demand Response Active",
    metrics: [
      { key: "load", labelEn: "Primary Building Demand", labelTr: "Birincil Bina Güç Talebi", val: "480 kW", trend: "Peak Zone", positive: false, icon: Zap },
      { key: "savings", labelEn: "Peak Shaving Offsets", labelTr: "Talep Sınırlandırma Katkısı", val: "145 kW Saved", trend: "Active", positive: true, icon: TrendingUp },
      { key: "submeters", labelEn: "Modbus Airflow Terminals", labelTr: "Modbus Havalandırma Terminalleri", val: "128 / 128 Nodes", trend: "Online", positive: true, icon: Server },
      { key: "cop", labelEn: "Chiller Plant COP Efficiency", labelTr: "Chiller Grubu Enerji Verimliliği", val: "4.2 COP", trend: "Peak Range", positive: true, icon: Cpu }
    ]
  }
};

const LOCAL_T = {
  en: {
    signedInAs: "Operator Identity authenticated under Secure Socket Protocol.",
    unauthorizedTitle: "Authorization Signature Required",
    unauthorizedSubtitle: "Awaiting operator credentials validation. Please authenticate with local workspace key or demo token.",
    loginBtn: "Go to Login Page",
    registerBtn: "Register Signature",
    secNotice: "Authorized operator keys can configure grid models and inspect bidding sheets securely in real time.",
    welcomeBack: "Secured Operator Portal",
    welcomeDesc: "Secure access point for X Elektrik technical templates, priority bid estimator, and active grid projects.",
    statsHeader: "Live Telemetry Controls",
    estimatorWidgetTitle: "Operational Bidding Pipeline",
    noBids: "No active project bidding worksheets. Design a custom electrical grid layout to initiate standard quotation queue.",
    goToEstimator: "Initialize Grid Price Estimator",
    latestInquiry: "Recent Registered RFP Estimate",
    pendingStatus: "PENDING ASSIGNED DESIGN ENGINEER",
    docsVault: "Technical Documentation Vault",
    docsVaultDesc: "Download complete static electrical BIM templates, dwg layouts, and single line diagrams.",
    downloadsCounter: "Files Authorized under Project ISO Guidelines",
    profileTitle: "Operator Signature Identity",
    editProfile: "Update Security Profile Information",
    saveProfileBtn: "Update Registered Signature",
    profileUpdated: "Profile updated successfully.",
    companyLabel: "Company Entity",
    contactMail: "Authorized Signature Email",
    contactPhone: "Registered Primary Phone",
    focusSectorLabel: "Assigned Power Grid Sector",
    auditLogs: "Secure Terminal Audit Logs",
    consoleIdle: "Workspace telemetry logging node active. Stream ready.",
    quotationsTab: "Quotations & Bidding",
    createQuoteTitle: "Configure New SmartGrid™ Proposal",
    listQuoteTitle: "Active RFPs & Project Proposals Queue",
    customQuoteName: "Project Name Signature",
    customQuoteEmail: "Primary Contact Email",
    customQuotePhone: "Contact Phone (Optional)",
    customQuoteSector: "Target Power Sector",
    customQuoteScale: "Facility Built Surface Area",
    customQuoteRedundancy: "Redundancy Design Grade",
    customQuoteVoltage: "Target Voltage Configuration",
    customQuoteAmps: "Switchgear Amperage Rating",
    btnGenerateQuote: "Save & Commit Secure Proposal",
    searchProposals: "Search by ID, client or specs...",
    allSect: "All Sectors",
    delQuoteTip: "Revoke and dismiss proposal security file",
    detailedSpecTitle: "SmartGrid™ Blueprint Specifications Sheet",
    specBreakdown: "Physical Component Cost Estimation Matrix",
    specValidation: "Automated Engineering Safety Pre-Checks",
    estimatedTotal: "Calculated Net Estimate",
    calculatedTimeline: "Estimated Assembly Phase",
    btnExportClipboard: "Export Proposal Draft to Clipboard",
    btnPrintSpec: "Print BIM Technical Sheet",
    copiedClipboard: "BOM Specifications exported to clipboard!",
    pfcTab: "Power Factor Correction",
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
  },
  tr: {
    signedInAs: "Operatör Kimliği, Güvenli Soket Protokolü kapsamında doğrulandı.",
    unauthorizedTitle: "Yetkilendirme İmzası Gerekli",
    unauthorizedSubtitle: "Operatör kimlik doğrulaması bekleniyor. Lütfen yerel iş alanı anahtarınız veya demo belirtecinizle kimlik doğrulayın.",
    loginBtn: "Giriş Sayfasına Git",
    registerBtn: "Operatör İmzası Kaydet",
    secNotice: "Yetkili operatör anahtarları, şebeke modellerini yapılandırabilir ve teklif sayfalarını gerçek zamanlı olarak güvenle inceleyebilir.",
    welcomeBack: "Güvenli Operatör Portalı",
    welcomeDesc: "X Elektrik teknik şablonlarına, öncelikli teklif tahmincisine ve aktif şebeke projelerine güvenli erişim noktası.",
    statsHeader: "Canlı Telemetri Kontrolleri",
    estimatorWidgetTitle: "Operasyonel Teklif Akışı",
    noBids: "Aktif proje teklif çalışma sayfası bulunmuyor. Standart teklif sırasını başlatmak için özel bir elektrik şebekesi planı tasarlayın.",
    goToEstimator: "Şebeke Maliyet Tahmincisini Başlat",
    latestInquiry: "Son Kaydedilen RFP Fiyat Teklifi",
    pendingStatus: "MÜHENDİS ATAMASI BEKLENİYOR",
    docsVault: "Teknik Doküman Kasası",
    docsVaultDesc: "Eksiksiz statik elektrik BIM şablonlarını, dwg çizimlerini ve tek hat diyagramlarını PDF/DXF formatında indirin.",
    downloadsCounter: "ISO Kılavuzları Kapsamında İndirilebilir Belgeler",
    profileTitle: "Operatör İmza Kimliği",
    editProfile: "Güvenlik Profil Bilgilerini Güncelle",
    saveProfileBtn: "Kayıtlı İmzayı Güncelle",
    profileUpdated: "Profil başarıyla güncellendi.",
    companyLabel: "Şirket Kuruluşu",
    contactMail: "Yetkili İmza E-postası",
    contactPhone: "Kayıtlı Birincil Telefon",
    focusSectorLabel: "Atanan Elektrik Enerjisi Sektörü",
    auditLogs: "Güvenli Terminal Denetim Günlüğü",
    consoleIdle: "İş istasyonu telemetri günlük düğümü aktif. Akış hazır.",
    quotationsTab: "Fiyat Teklifleri",
    createQuoteTitle: "Yeni SmartGrid™ Teklifi Yapılandır",
    listQuoteTitle: "Aktif RFP'ler ve Proje Teklif Kuyruğu",
    customQuoteName: "Proje Adı İmzası",
    customQuoteEmail: "Birincil İrtibat E-postası",
    customQuotePhone: "İletişim Telefonu (İsteğe Bağlı)",
    customQuoteSector: "Hedef Enerji Sektörü",
    customQuoteScale: "Tesis Yapısal Yüzey Alanı",
    customQuoteRedundancy: "Yedeklilik Tasarım Sınıfı",
    customQuoteVoltage: "Hedef Gerilim Konfigürasyonu",
    customQuoteAmps: "Şalt Amper Değeri",
    btnGenerateQuote: "Kaydet ve Teklifi Taahhüt Et",
    searchProposals: "ID, müşteri veya teknik özelliklerde ara...",
    allSect: "Tüm Sektörler",
    delQuoteTip: "Teklif güvenlik dosyasını iptal et ve kaldır",
    detailedSpecTitle: "SmartGrid™ Plan Detay Özellikler Sayfası",
    specBreakdown: "Fiziksel Bileşen Maliyet Matrisi",
    specValidation: "Otomatik Mühendislik Güvenlik Ön Kontrolleri",
    estimatedTotal: "Hesaplanan Net Maliyet",
    calculatedTimeline: "Tahmini Montaj/Kurulum Fazı",
    btnExportClipboard: "Teklif Taslağını Panoya Kopyala",
    btnPrintSpec: "BIM Teknik Sayfasını Yazdır",
    copiedClipboard: "BOM Spesifikasyonları panoya kopyalandı!",
    pfcTab: "Güç Faktörü Kompanzasyonu",
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
  }
};

const DUMMY_DOCS = [
  { id: 'doc-1', name: 'X-E_CLASS_1_MVS_SWITCHGEAR_BIM.rfa', format: 'Revit Family', size: '24.8 MB', code: 'ISO-TR-450' },
  { id: 'doc-2', name: 'X-E_SUBSTATION_SINGLE_LINE_DIAGRAM_38KV.dwg', format: 'CAD DWG Layout', size: '14.2 MB', code: 'ISO-EE-102' },
  { id: 'doc-3', name: 'X-E_BESS_MEGAPACK_FIRE_SUPPRESS_PLAN.pdf', format: 'PDF Schematic', size: '4.1 MB', code: 'ISO-NFPA-855' },
];

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

interface DashboardProps {
  onNavigate: (path: string) => void;
  inquiries?: InquiryItem[];
  onAddNewInquiry?: (
    config: any,
    clientInfo?: { name: string; email: string; phone?: string }
  ) => void;
  onDismissInquiry?: (id: string) => void;
}

  export default function Dashboard({ onNavigate, inquiries: propInquiries, onAddNewInquiry, onDismissInquiry }: DashboardProps) {
  const { language, currentUser, setCurrentUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'vault' | 'settings' | 'quotations' | 'pfc'>('overview');

  const [profileName, setProfileName] = useState('');
  const [profileCompany, setProfileCompany] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSector, setProfileSector] = useState('datacenter');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filtering for the Quotations Tab list queue
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquirySector, setSelectedInquirySector] = useState('all');

  // Interactive Quote Form Simulator States inside Dashboard
  const [newQuoteName, setNewQuoteName] = useState('');
  const [newQuoteEmail, setNewQuoteEmail] = useState('');
  const [newQuotePhone, setNewQuotePhone] = useState('');
  const [newQuoteSector, setNewQuoteSector] = useState('datacenter');
  const [newQuoteScale, setNewQuoteScale] = useState(15000);
  const [newQuoteRedundancy, setNewQuoteRedundancy] = useState('N+1');
  const [newQuoteVoltage, setNewQuoteVoltage] = useState('277/480V Standard Industrial');
  const [newQuoteAmps, setNewQuoteAmps] = useState(1200);

  // Selected Quotation ID for Schematic Visualizer Card info drilldown
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  const t = LOCAL_T[language === 'tr' ? 'tr' : 'en'];
  const isAuthorized = !!currentUser;

  // Initialize form state when user loaded
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name);
      setProfileCompany(currentUser.companyName);
      setProfilePhone(currentUser.phone || '');
      setProfileSector(currentUser.sector);
      // Pre-fill active profile fields inside client's estimator form too!
      setNewQuoteName(`${currentUser.name}'s Custom RFP`);
      setNewQuoteEmail(currentUser.email);
      setNewQuotePhone(currentUser.phone || '');
      setNewQuoteSector(currentUser.sector);
    }
  }, [currentUser]);

  // Read latest active inquiries to display locally or via props
  const [localInquiries, setLocalInquiries] = useState<any[]>([]);
  useEffect(() => {
    if (propInquiries && propInquiries.length > 0) {
      setLocalInquiries(propInquiries);
    } else {
      const savedInquiriesStr = localStorage.getItem('x_elektrik_saved_inquiries');
      if (savedInquiriesStr) {
        try {
          setLocalInquiries(JSON.parse(savedInquiriesStr));
        } catch (err) {
          console.error(err);
        }
      } else {
        // Fetch from API direct
        fetch('/api/inquiries')
          .then(res => res.json())
          .then(data => {
            if (data && data.inquiries) {
              setLocalInquiries(data.inquiries);
            }
          })
          .catch(err => console.error("Error loading dashboard inquiries:", err));
      }
    }
  }, [propInquiries]);

  // Micro terminal console event feed simulator
  useEffect(() => {
    if (!isAuthorized) return;
    
    const logs = [
      `[INFO] IP Packet inspection authorized.`,
      `[INFO] Handshake signature: ECDSA SHA-256`,
      `[SYSTEM] Connecting to cluster node... [OK]`,
      `[TELEMETRY] ${currentUser.sector.toUpperCase()} grid model parameters verified.`
    ];
    setTerminalLogs(logs);

    const interval = setInterval(() => {
      const liveEvents = [
        `[SYNC] Telemetry data validated with 0ms drift.`,
        `[HEALTH] Multi-terminal cooling flow optimized at 100%.`,
        `[SIGNAL] Local grid signal margin: +45dB [CRITICAL_EXCELLENT]`,
        `[DATA] BIM vault cryptographic tokens refreshed.`,
        `[GRID] Transformer core temperature verified at healthy limits.`
      ];
      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      setTerminalLogs(prev => [...prev.slice(-6), `[${new Date().toLocaleTimeString()}] ${randomEvent}`]);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAuthorized, currentUser]);

  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [TELEMETRY_PULL] Force-fetching real-time terminal metrics...`]);
    setTimeout(() => {
      setIsRefreshing(false);
      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [TELEMETRY_SUCCESS] Metrics synchronized successfully.`]);
    }, 1200);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: profileName,
      companyName: profileCompany,
      phone: profilePhone,
      sector: profileSector
    };

    setCurrentUser(updatedUser);
    setProfileSuccess(true);
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [PROFILE_UPDATE] Operator signature fields restructured.`]);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleAddNewQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteName || !newQuoteEmail) return;

    // Calculate dynamic cost estimates
    const baseCost = newQuoteScale * 45;
    const redundancyFactor = 
      newQuoteRedundancy === 'N' ? 1.0 :
      newQuoteRedundancy === 'N+1' ? 1.35 : 1.75;
    
    let voltageCost = 45000;
    if (newQuoteVoltage.includes('Low')) voltageCost = 15000;
    else if (newQuoteVoltage.includes('Medium')) voltageCost = 180000;

    const ampsFactor = newQuoteAmps * 250;
    const computedTotalCost = Math.round((baseCost * redundancyFactor) + voltageCost + ampsFactor);
    
    const computedTimelineWeeks = Math.ceil(8 + (newQuoteScale / 25000) + (newQuoteAmps / 850));
    const computedTimeline = `${computedTimelineWeeks} Weeks Estimated`;

    const specsText = `${newQuoteAmps} A - ${newQuoteVoltage} • ${newQuoteRedundancy} Grade redundancy`;

    if (onAddNewInquiry) {
      // Create config payload match what handleAddNewInquiry expects
      const configObj = {
        projectType: newQuoteSector,
        areaSqFt: Number(newQuoteScale),
        amperage: Number(newQuoteAmps),
        voltage: newQuoteVoltage,
        resilientPower: newQuoteRedundancy !== 'N',
        smartControls: true,
        greenEnergy: newQuoteSector === 'renewable',
        industrialMachinery: newQuoteSector === 'industrial',
        networking: newQuoteSector === 'datacenter',
        cost: {
          designCost: Math.round(computedTotalCost * 0.1),
          materialsCost: Math.round(computedTotalCost * 0.55),
          laborCost: Math.round(computedTotalCost * 0.25),
          commissioningCost: Math.round(computedTotalCost * 0.1),
          totalCost: computedTotalCost
        },
        timeline: computedTimeline
      };
      
      const clientObj = {
        name: newQuoteName,
        email: newQuoteEmail,
        phone: newQuotePhone || undefined
      };

      try {
        await onAddNewInquiry(configObj, clientObj);
        setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [PROPOSAL_COMMIT] Custom quote successfully posted to API.`]);
      } catch (err) {
        console.error("Error committing inquiry via prop:", err);
      }
    } else {
      // Local fallback in case prop is not provided
      const randomId = `RFP-${Math.floor(1000 + Math.random() * 9000)}`;
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newInq: InquiryItem = {
        id: randomId,
        clientName: newQuoteName,
        clientEmail: newQuoteEmail,
        clientPhone: newQuotePhone,
        projectType: newQuoteSector,
        scaleSqFt: Number(newQuoteScale),
        specs: specsText,
        estimatedCost: computedTotalCost,
        timeline: computedTimeline,
        timestamp: `Today at ${nowStr}`,
        hasUserConfig: true
      };

      const updated = [newInq, ...localInquiries];
      setLocalInquiries(updated);
      localStorage.setItem('x_elektrik_saved_inquiries', JSON.stringify(updated));
      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [LOCAL_PROPOSAL_GENT] Staged quote locally.`]);
    }

    // Reset Form Input states
    setNewQuoteName(currentUser ? `${currentUser.name}'s Custom RFP` : 'Custom RFP');
    setNewQuotePhone(currentUser?.phone || '');
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleDismissQuote = async (id: string) => {
    if (onDismissInquiry) {
      try {
        await onDismissInquiry(id);
        setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [PROPOSAL_REVOKE] Proposal id ${id} removed.`]);
      } catch (err) {
        console.error("Error dismissing inquiry via prop:", err);
      }
    } else {
      const updated = localInquiries.filter(item => item.id !== id);
      setLocalInquiries(updated);
      localStorage.setItem('x_elektrik_saved_inquiries', JSON.stringify(updated));
      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [LOCAL_PROPOSAL_REVOKE] Staging cleared for id ${id}`]);
    }

    if (selectedQuoteId === id) {
      setSelectedQuoteId(null);
    }
  };

  const activeSectorMetrics = SECTORS_METRIC_TEMPLATES[currentUser?.sector as keyof typeof SECTORS_METRIC_TEMPLATES || 'datacenter'] || SECTORS_METRIC_TEMPLATES.datacenter;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left"
    >
      <AnimatePresence mode="wait">
        {!isAuthorized ? (
          /* Locked State if client is not logged in directly */
          <motion.div
            key="unauthorized-view"
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -15 }}
            className="max-w-md mx-auto py-16 text-center space-y-6"
          >
            <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/25 mb-2">
              <Lock className="h-8 w-8 stroke-[2]" />
            </div>
            <h2 className="text-2xl font-display font-medium text-gray-955 dark:text-white leading-tight">
              {t.unauthorizedTitle}
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
              {t.unauthorizedSubtitle}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => onNavigate('/login')}
                className="h-11 bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-[#0012FF] dark:hover:bg-cyan-300 font-mono text-[11px] uppercase tracking-wider font-extrabold rounded-xl transition cursor-pointer border-0 flex items-center justify-center gap-1.5"
              >
                <span>{t.loginBtn}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onNavigate('/register')}
                className="h-11 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-750 dark:text-gray-300 border border-gray-200 dark:border-white/10 font-mono text-[11px] uppercase tracking-wider font-extrabold rounded-xl transition cursor-pointer"
              >
                {t.registerBtn}
              </button>
            </div>

            <div className="pt-4 flex gap-2 items-start justify-center p-3 rounded-xl bg-gray-50 dark:bg-black/15 border border-gray-100 dark:border-white/5">
              <ShieldCheck className="h-4 w-4 text-[#0012FF] dark:text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-[9.5px] text-gray-450 dark:text-gray-500 text-left max-w-xs leading-normal">
                {t.secNotice}
              </p>
            </div>
          </motion.div>
        ) : (
          /* Authorized Client Workspace Dashboard Dashboard Hub */
          <motion.div
            key="authorized-workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Top Workspace Identity Jumbotron banner */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-150/80 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 p-6 sm:p-8 shadow-2xl">
              <div className="absolute top-0 right-0 h-64 w-64 bg-[#0012FF]/10 dark:bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0012FF] dark:via-cyan-400 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0012FF]/10 dark:bg-cyan-400/10 border border-[#0012FF]/20 dark:border-cyan-400/20 text-[#0012FF] dark:text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>{t.welcomeBack}</span>
                  </div>
                  <h1 className="text-3xl font-display font-medium text-gray-955 dark:text-white leading-tight">
                    {language === 'tr' ? `Tekrar Hoş Geldiniz, Operatör ${currentUser.name}` : `Welcome Back, Operator ${currentUser.name}`}
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                    {t.welcomeDesc}
                  </p>
                </div>

                {/* Micro Actions Block */}
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      logout();
                      onNavigate('/home');
                    }}
                    className="h-10 px-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-955/15 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-thin border-rose-200/40 dark:border-rose-500/20 rounded-xl font-mono text-[10.5px] font-bold uppercase cursor-pointer transition flex items-center gap-1.5"
                    id="btn-workspace-logout"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{language === 'tr' ? 'Oturumu Kapat' : 'Logout Token'}</span>
                  </button>
                </div>
              </div>

              {/* Sub-navigation tabs block */}
              <div className="flex items-center gap-1.5 border-b border-gray-150/40 dark:border-white/5 mt-8 pt-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-[11px] font-mono font-bold uppercase border-b-2 tracking-wide transition cursor-pointer bg-transparent ${
                    activeTab === 'overview'
                      ? 'border-[#0012FF] dark:border-cyan-400 text-gray-955 dark:text-white font-extrabold'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-750 dark:hover:text-gray-300'
                  }`}
                >
                  {language === 'tr' ? 'Genel Kontrol' : 'Overview Console'}
                </button>
                <button
                  onClick={() => setActiveTab('vault')}
                  className={`px-4 py-2 text-[11px] font-mono font-bold uppercase border-b-2 tracking-wide transition cursor-pointer bg-transparent ${
                    activeTab === 'vault'
                      ? 'border-[#0012FF] dark:border-cyan-400 text-gray-955 dark:text-white font-extrabold'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-750 dark:hover:text-gray-300'
                  }`}
                >
                  {language === 'tr' ? 'BIM Doküman Kasası' : 'BIM Document Vault'}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 text-[11px] font-mono font-bold uppercase border-b-2 tracking-wide transition cursor-pointer bg-transparent ${
                    activeTab === 'settings'
                      ? 'border-[#0012FF] dark:border-cyan-400 text-gray-955 dark:text-white font-extrabold'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-750 dark:hover:text-gray-300'
                  }`}
                >
                  {language === 'tr' ? 'Profil Ayarları' : 'Operator Settings'}
                </button>
                <button
                  onClick={() => setActiveTab('quotations')}
                  className={`px-4 py-2 text-[11px] font-mono font-bold uppercase border-b-2 tracking-wide transition cursor-pointer bg-transparent ${
                    activeTab === 'quotations'
                      ? 'border-[#0012FF] dark:border-cyan-400 text-gray-955 dark:text-white font-extrabold'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-750 dark:hover:text-gray-300'
                  }`}
                >
                  {t.quotationsTab}
                </button>
                <button
                  onClick={() => setActiveTab('pfc')}
                  className={`px-4 py-2 text-[11px] font-mono font-bold uppercase border-b-2 tracking-wide transition cursor-pointer bg-transparent ${
                    activeTab === 'pfc'
                      ? 'border-[#0012FF] dark:border-cyan-400 text-gray-955 dark:text-white font-extrabold'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-750 dark:hover:text-gray-300'
                  }`}
                >
                  {t.pfcTab}
                </button>
              </div>
            </div>

            {/* Render Active Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Sector Telemetry */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                          {t.statsHeader}
                        </h3>
                        <p className="text-xl font-display font-medium text-gray-955 dark:text-white leading-tight">
                          {language === 'tr' ? activeSectorMetrics.systemTitleTr : activeSectorMetrics.systemTitleEn}
                        </p>
                      </div>

                      <button
                        onClick={handleRefreshTelemetry}
                        disabled={isRefreshing}
                        className="p-2 border border-gray-150 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 rounded-lg transition cursor-pointer bg-transparent"
                      >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    {/* Dynamic Sector Metering Grid of dashboard widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeSectorMetrics.metrics.map((metric: any, idx: number) => {
                        const IconComponent = metric.icon;
                        return (
                          <div 
                            key={idx}
                            className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-xl p-5 shadow-sm space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-white/5 text-gray-500 dark:text-cyan-400">
                                <IconComponent className="h-4.5 w-4.5" />
                              </div>
                              <span className={`text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded ${metric.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                {metric.trend}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500">
                                {language === 'tr' ? metric.labelTr : metric.labelEn}
                              </span>
                              <span className="block text-xl font-mono font-medium text-gray-990 dark:text-white">
                                {metric.val}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Operational Workspace Grid Worksheets Bidding Queue (Hydrated Estimator values!) */}
                    <div className="bg-white dark:bg-[#050505] border border-gray-150/80 dark:border-white/10 rounded-xl p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-150/40 dark:border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          <h4 className="text-sm font-mono font-bold uppercase text-gray-990 dark:text-white">
                            {t.estimatorWidgetTitle}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">
                          {localInquiries.length} PROJECTS RECORDED
                        </span>
                      </div>

                      {localInquiries.length === 0 ? (
                        <div className="text-center py-8 space-y-4">
                          <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                            {t.noBids}
                          </p>
                          <button
                            onClick={() => onNavigate('/estimator')}
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-extrabold text-[#0012FF] dark:text-cyan-400 hover:underline bg-transparent border-none cursor-pointer"
                          >
                            <span>{t.goToEstimator}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <span className="block text-[10px] font-mono font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest">
                            {t.latestInquiry}
                          </span>

                          <div className="space-y-3">
                            {localInquiries.slice(-2).reverse().map((inq: any, idx: number) => (
                              <div 
                                key={idx} 
                                className="p-4 rounded-xl bg-gray-55/40 dark:bg-slate-900 border border-gray-150/40 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[12.5px] font-medium text-gray-955 dark:text-white">
                                      {inq.name || (language === 'tr' ? 'İsimsiz Sektörel Şebeke' : 'Custom Sector Grid')}
                                    </span>
                                    <span className="text-[9px] font-mono uppercase bg-[#0012FF]/10 text-[#0012FF] dark:bg-cyan-400/10 dark:text-cyan-400 px-1.5 py-0.5 rounded font-black">
                                      {inq.id}
                                    </span>
                                  </div>
                                  <p className="text-[10.5px] text-gray-500 dark:text-gray-400">
                                    {language === 'tr' ? 'Varsayılan Şebeke Segmentleri: ' : 'Included structural segments: '}
                                    <span className="font-mono text-gray-800 dark:text-gray-300 font-bold">
                                      {inq.segments ? inq.segments.length : 'All active'} items
                                    </span>
                                  </p>
                                </div>

                                <div className="text-left sm:text-right space-y-1.5">
                                  <span className="block text-[10px] text-gray-450 dark:text-gray-500 font-mono font-bold uppercase">
                                    {t.pendingStatus}
                                  </span>
                                  <span className="block text-sm font-mono font-extrabold text-[#0012FF] dark:text-cyan-400">
                                    {inq.scopeText || 'N/A EST'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Mini secure terminal feed */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Live console logging element */}
                    <div className="bg-black/95 dark:bg-black/85 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-72">
                      <div className="bg-slate-900/50 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#00FF00] animate-pulse" />
                          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                            SECURE GRID TERMINAL
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-[#00FF00] opacity-75 font-semibold">
                          LOGGING
                        </span>
                      </div>

                      <div className="p-4 flex-1 font-mono text-[10px] text-slate-350 space-y-2 overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
                        {terminalLogs.map((log, lidx) => (
                          <div key={lidx} className="break-all whitespace-pre-wrap">
                            <span className="text-slate-500">sys_srv:~$</span> {log}
                          </div>
                        ))}
                        {terminalLogs.length === 0 && (
                          <div className="text-slate-500 italic">
                            {t.consoleIdle}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bidding Guidelines summary widget */}
                    <div className="p-5 rounded-xl border border-[#0012FF]/10 dark:border-cyan-400/10 bg-[#0012FF]/5 dark:bg-cyan-400/5 space-y-3.5 text-left">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-[#0012FF] dark:text-cyan-400" />
                        <h4 className="text-[12px] font-mono uppercase font-black tracking-wider text-gray-990 dark:text-white">
                          ISO 27001 PROVEN CORES
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        {language === 'tr' 
                          ? 'X Elektrik dijital portalındaki her teklif, kritik altyapı şebekeleriyle aynı güvenlik seviyesinde işlenir. BIM projeleriniz ve fiyatlandırmalarınız şifrelenir.' 
                          : 'Every price inquiry and BIM workbook submitted is localized and signed directly. Substation layouts undergo real-time validation protocols.'
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vault' && (
                <motion.div
                  key="tab-vault"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="max-w-2xl text-left space-y-2">
                    <h3 className="text-xl font-display font-medium text-gray-955 dark:text-white">
                      {t.docsVault}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {t.docsVaultDesc}
                    </p>
                  </div>

                  {/* Documents checklist Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DUMMY_DOCS.map(doc => (
                      <div 
                        key={doc.id}
                        className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-all space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="p-3 rounded-lg bg-[#0012FF]/15 dark:bg-cyan-400/10 text-[#0012FF] dark:text-cyan-400">
                            <FileCode className="h-5 w-5" />
                          </div>
                          <span className="text-[9px] font-mono bg-gray-50 dark:bg-slate-950 px-2 py-0.5 rounded text-gray-550 border border-gray-100 dark:border-white/5 font-extrabold">
                            {doc.code}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-[11.5px] font-sans font-bold text-gray-955 dark:text-white truncate" title={doc.name}>
                            {doc.name}
                          </h4>
                          <p className="text-[10px] font-mono text-gray-450 dark:text-gray-500">
                            {doc.format} // {doc.size}
                          </p>
                        </div>

                        {/* Force client download simulator directly */}
                        <a
                          href={`#download-${doc.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [DOWNLOAD] Token authorized for: ${doc.name}`]);
                            alert(language === 'tr' ? `${doc.name} indirmesi başarıyla tamamlandı (Statik şablon).` : `Crypto validation passed. Local storage static transfer completed for: ${doc.name}`);
                          }}
                          className="w-full py-2.5 rounded-lg bg-gray-95 w-full bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-cyan-500/10 text-gray-800 dark:text-gray-300 font-mono text-[9px] font-black uppercase text-center cursor-pointer transition block border border-gray-150/50 dark:border-white/5"
                        >
                          DOWNLOAD STATICS
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-150/50 dark:border-white/5 flex items-center justify-between text-left">
                    <span className="text-[10.5px] font-sans text-gray-550 dark:text-gray-400">
                      {t.downloadsCounter}
                    </span>
                    <span className="text-[11px] font-mono font-black text-[#0012FF] dark:text-cyan-400 uppercase">
                      ISO 9001 STATUS: VERIFIED
                    </span>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="tab-settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-2xl bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-md"
                >
                  <div className="border-b border-gray-150/40 dark:border-white/5 pb-4 mb-6 text-left">
                    <h3 className="text-xl font-display font-medium text-gray-955 dark:text-white">
                      {t.profileTitle}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {t.editProfile}
                    </p>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                          {language === 'tr' ? 'Operatör Adı' : 'Operator Full Name'}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-450 pointer-events-none" />
                          <input
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                            required
                          />
                        </div>
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                          {t.companyLabel}
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-450 pointer-events-none" />
                          <input
                            type="text"
                            value={profileCompany}
                            onChange={(e) => setProfileCompany(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                            required
                          />
                        </div>
                      </div>

                      {/* Authorized Email */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                          {t.contactMail}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none opacity-50" />
                          <input
                            type="email"
                            value={currentUser.email}
                            disabled
                            className="w-full h-10 pl-9 pr-4 rounded-xl bg-gray-50 dark:bg-slate-950 border border-thin border-gray-150/40 dark:border-white/5 text-gray-400 dark:text-gray-550 focus:outline-none text-xs cursor-not-allowed select-none"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                          {t.contactPhone}
                        </label>
                        <div className="relative">
                          <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-450 pointer-events-none" />
                          <input
                            type="tel"
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            placeholder="+353 1 450 0000"
                            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technical sector Focus Option Dropdown */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                        {t.focusSectorLabel}
                      </label>
                      <select
                        value={profileSector}
                        onChange={(e) => setProfileSector(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-155 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                      >
                        <option value="datacenter">{language === 'tr' ? 'Veri Merkezi ve Hiporölçekli Güç' : 'Data Center & Hyperscale Power'}</option>
                        <option value="renewable">{language === 'tr' ? 'Yenilenebilir Akıllı Şebekeler ve EV' : 'Renewable Smart Grids & EV'}</option>
                        <option value="industrial">{language === 'tr' ? 'Ağır Sanayi ve Üretim' : 'Heavy Industrial & Manufacturing'}</option>
                        <option value="commercial">{language === 'tr' ? 'Ticari ve Çok Kiracılı Ofisler' : 'Commercial & Multi-Tenant Offices'}</option>
                      </select>
                    </div>

                    {profileSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl"
                      >
                        {t.profileUpdated}
                      </motion.div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full h-11 bg-gray-955 dark:bg-cyan-400 hover:bg-[#0012FF] dark:hover:bg-cyan-300 text-white dark:text-slate-950 border-0 font-mono text-xs uppercase tracking-wider font-extrabold rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5"
                      >
                        <span>{t.saveProfileBtn}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === 'quotations' && (
                <motion.div
                  key="tab-quotations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Create Quote Wizard - 4 cols */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                      <div className="border-b border-gray-150/40 dark:border-white/5 pb-3">
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0012FF] dark:text-cyan-400">
                          {t.createQuoteTitle}
                        </h3>
                        <p className="text-[11px] text-gray-450 dark:text-gray-400 mt-1">
                          {language === 'tr' ? 'Özel parametrelerle anlık fizibilite ve şebeke bütçesi çıkarın.' : 'Compute instant budgets & structural layouts on custom grids.'}
                        </p>
                      </div>

                      <form onSubmit={handleAddNewQuote} className="space-y-4">
                        {/* Project Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500 block">
                            {t.customQuoteName}
                          </label>
                          <input
                            type="text"
                            value={newQuoteName}
                            onChange={(e) => setNewQuoteName(e.target.value)}
                            placeholder="e.g. Dublin South Data Centre BESS"
                            className="w-full h-10 px-3 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                            required
                          />
                        </div>

                        {/* Client Email */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500 block">
                            {t.customQuoteEmail}
                          </label>
                          <input
                            type="email"
                            value={newQuoteEmail}
                            onChange={(e) => setNewQuoteEmail(e.target.value)}
                            placeholder="operator@client.com"
                            className="w-full h-10 px-3 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                            required
                          />
                        </div>

                        {/* Primary Phone */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500 block">
                            {t.customQuotePhone}
                          </label>
                          <input
                            type="text"
                            value={newQuotePhone}
                            onChange={(e) => setNewQuotePhone(e.target.value)}
                            placeholder="+353 1 450 0000"
                            className="w-full h-10 px-3 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                          />
                        </div>

                        {/* Sector selection */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500 block">
                            {t.customQuoteSector}
                          </label>
                          <select
                            value={newQuoteSector}
                            onChange={(e) => setNewQuoteSector(e.target.value)}
                            className="w-full h-10 px-2 rounded-xl border border-gray-155 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-905 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                          >
                            <option value="datacenter">{language === 'tr' ? 'Veri Merkezi / Bulut' : 'Data Center / Cloud'}</option>
                            <option value="renewable">{language === 'tr' ? 'Yenilenebilir Şebeke / EV' : 'Renewable Grid / EV'}</option>
                            <option value="industrial">{language === 'tr' ? 'Ağır Sanayi / Üretim' : 'Heavy Industrial'}</option>
                            <option value="commercial">{language === 'tr' ? 'Ticari Altyapı' : 'Commercial Buildings'}</option>
                          </select>
                        </div>

                        {/* Scale Sq Ft Slider */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                            <span>{t.customQuoteScale}</span>
                            <span className="text-[#0012FF] dark:text-cyan-400 font-bold">{newQuoteScale.toLocaleString()} SQFT</span>
                          </div>
                          <input
                            type="range"
                            min="5000"
                            max="250000"
                            step="5000"
                            value={newQuoteScale}
                            onChange={(e) => setNewQuoteScale(Number(e.target.value))}
                            className="w-full accent-[#0012FF] dark:accent-cyan-400 h-1 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* Grid Redundancy Selection */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500 block">
                            {t.customQuoteRedundancy}
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {['N', 'N+1', 'N+2'].map((grade) => (
                              <button
                                type="button"
                                key={grade}
                                onClick={() => setNewQuoteRedundancy(grade)}
                                className={`h-9 rounded-lg text-[10px] font-mono font-bold uppercase transition border ${
                                  newQuoteRedundancy === grade
                                    ? 'bg-[#0012FF]/10 border-[#0012FF] text-[#0012FF] dark:bg-cyan-400/20 dark:border-cyan-400 dark:text-cyan-300'
                                    : 'bg-transparent border-gray-150 dark:border-white/5 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                              >
                                {grade}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Voltage configurations */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500 block">
                            {t.customQuoteVoltage}
                          </label>
                          <select
                            value={newQuoteVoltage}
                            onChange={(e) => setNewQuoteVoltage(e.target.value)}
                            className="w-full h-10 px-2 rounded-xl border border-gray-155 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-905 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                          >
                            <option value="120/208V Low Voltage">120/208V AC Low Voltage</option>
                            <option value="277/480V Standard Industrial">277/480V Standard Industrial</option>
                            <option value="10-38kV Medium Voltage Utility">10-38kV Medium Voltage Utility</option>
                          </select>
                        </div>

                        {/* Amperage selection */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase font-bold text-gray-400 dark:text-gray-500">
                            <span>{t.customQuoteAmps}</span>
                            <span className="text-[#0012FF] dark:text-cyan-400 font-bold">{newQuoteAmps} Amps</span>
                          </div>
                          <input
                            type="range"
                            min="400"
                            max="4000"
                            step="200"
                            value={newQuoteAmps}
                            onChange={(e) => setNewQuoteAmps(Number(e.target.value))}
                            className="w-full accent-[#0012FF] dark:accent-cyan-400 h-1 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* Interactive Calculator Overlay Widget */}
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-white/5 space-y-2">
                          <div className="flex justify-between items-center text-[10.5px] font-mono text-gray-400 dark:text-gray-500">
                            <span>{language === 'tr' ? 'Anlık Fiyat Simülasyonu' : 'Instant Budget Projection'}</span>
                            <span>USD</span>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-lg font-mono font-black text-[#0012FF] dark:text-cyan-400">
                              ${(Math.round(
                                (newQuoteScale * 45 * (newQuoteRedundancy === 'N' ? 1.0 : newQuoteRedundancy === 'N+1' ? 1.35 : 1.75)) + 
                                (newQuoteVoltage.includes('Low') ? 15000 : newQuoteVoltage.includes('Standard') ? 45000 : 180000) + 
                                (newQuoteAmps * 250)
                              )).toLocaleString()}
                            </span>
                            <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 uppercase">
                              + {Math.ceil(8 + (newQuoteScale / 25000) + (newQuoteAmps / 850))} WEEKS
                            </span>
                          </div>
                        </div>

                        {profileSuccess && (
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[10px] font-mono font-bold text-center">
                            {language === 'tr' ? 'Fiyat teklifi başarıyla sıraya eklendi!' : 'Proposal compiled and added to queue!'}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full h-11 bg-gray-955 dark:bg-cyan-400 hover:bg-[#0012FF] dark:hover:bg-cyan-300 text-white dark:text-slate-950 border-0 font-mono text-xs uppercase tracking-wider font-extrabold rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                          <span>{t.btnGenerateQuote}</span>
                        </button>
                      </form>
                    </div>

                    {/* Right Column: Queue & Specs Sheet - 8 cols */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Search and Filters row */}
                      <div className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Search bar helper */}
                        <div className="relative flex-1 max-w-md">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchProposals}
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-155 dark:border-white/10 bg-transparent text-gray-905 dark:text-white focus:outline-none focus:border-[#0012FF] dark:focus:border-cyan-400 text-xs"
                          />
                        </div>

                        {/* Sector Category Filters */}
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { id: 'all', label: t.allSect },
                            { id: 'datacenter', label: language === 'tr' ? 'Veri Merkezi' : 'Data Centers' },
                            { id: 'renewable', label: language === 'tr' ? 'Yenilenebilir' : 'Renewables' },
                            { id: 'industrial', label: language === 'tr' ? 'Sanayi' : 'Industrial' },
                            { id: 'commercial', label: language === 'tr' ? 'Ticari' : 'Commercial' },
                          ].map((sect) => (
                            <button
                              key={sect.id}
                              type="button"
                              onClick={() => setSelectedInquirySector(sect.id)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-tight transition cursor-pointer ${
                                selectedInquirySector === sect.id
                                  ? 'bg-gray-950 text-white dark:bg-cyan-400 dark:text-slate-950'
                                  : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent hover:border-gray-150/40'
                              }`}
                            >
                              {sect.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Proposals List Queue */}
                      <div className="space-y-4">
                        <span className="block text-[10px] font-mono font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest pl-1">
                          {t.listQuoteTitle} ({
                            localInquiries.filter(item => {
                              const sectMatch = selectedInquirySector === 'all' || item.projectType === selectedInquirySector;
                              const searchMatch = 
                                item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.specs.toLowerCase().includes(searchQuery.toLowerCase());
                              return sectMatch && searchMatch;
                            }).length
                          } active)
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {localInquiries
                            .filter(item => {
                              const sectMatch = selectedInquirySector === 'all' || item.projectType === selectedInquirySector;
                              const searchMatch = 
                                item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.specs.toLowerCase().includes(searchQuery.toLowerCase());
                              return sectMatch && searchMatch;
                            })
                            .map((inq: any) => {
                              const isSelected = selectedQuoteId === inq.id;
                              return (
                                <div 
                                  key={inq.id}
                                  className={`p-5 rounded-2xl transition-all cursor-pointer relative flex flex-col justify-between h-52 border ${
                                    isSelected 
                                      ? 'bg-[#0012FF]/5 border-[#0012FF] dark:bg-cyan-400/5 dark:border-cyan-400 ring-1 ring-[#0012FF]/20 dark:ring-cyan-400/20 shadow-md' 
                                      : 'bg-white dark:bg-slate-900 border-gray-150/80 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                  }`}
                                  onClick={() => setSelectedQuoteId(isSelected ? null : inq.id)}
                                >
                                  <div className="space-y-2.5">
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between">
                                      <div className="space-y-0.5">
                                        <span className="text-[10px] font-mono uppercase bg-gray-50 dark:bg-slate-950 font-black px-1.5 py-0.5 rounded border border-gray-100 dark:border-white/5 text-[#0012FF] dark:text-cyan-400">
                                          {inq.id}
                                        </span>
                                        <h4 className="text-xs font-sans font-extrabold text-gray-990 dark:text-white pt-1 truncate max-w-[180px]">
                                          {inq.clientName}
                                        </h4>
                                      </div>
                                      
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (confirm(language === 'tr' ? `${inq.id} no'lu teklifi kaldırmak istiyor musunuz?` : `Are you sure you want to dismiss proposal ${inq.id}?`)) {
                                            handleDismissQuote(inq.id);
                                          }
                                        }}
                                        className="p-1 px-1.5 rounded-lg bg-gray-50 hover:bg-rose-50 dark:bg-slate-950 dark:hover:bg-rose-955/20 text-gray-400 hover:text-rose-500 dark:text-gray-500 border border-gray-150/40 dark:border-white/5 transition flex items-center gap-1 cursor-pointer"
                                        title={t.delQuoteTip}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>

                                    {/* Specs and area */}
                                    <p className="text-[10.5px] font-sans font-medium text-gray-500 dark:text-gray-400 leading-normal line-clamp-2">
                                      {inq.specs}
                                      <span className="block font-mono text-[9.5px] text-gray-450 dark:text-gray-500 mt-1 uppercase">
                                        Scale capacity: {inq.scaleSqFt.toLocaleString()} SQFT
                                      </span>
                                    </p>
                                  </div>

                                  {/* Cost, period & footer metadata */}
                                  <div className="flex items-end justify-between pt-2 border-t border-gray-100 dark:border-white/5">
                                    <div className="space-y-0.5 text-left">
                                      <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 uppercase">
                                        {t.estimatedTotal}
                                      </span>
                                      <span className="block text-sm font-mono font-black text-[#0012FF] dark:text-cyan-400">
                                        ${inq.estimatedCost ? inq.estimatedCost.toLocaleString() : 'N/A'}
                                      </span>
                                    </div>

                                    <div className="text-right space-y-0.5">
                                      <span className="block text-[8.5px] font-mono font-bold uppercase text-emerald-400 flex items-center justify-end gap-1">
                                        <CheckCircle2 className="h-2.5 w-2.5" />
                                        <span>{t.pendingStatus.split(' ')[0]}</span>
                                      </span>
                                      <span className="block text-[9px] font-mono text-gray-500 dark:text-gray-400">
                                        {inq.timeline || '12 Weeks'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                          {localInquiries.filter(item => {
                            const sectMatch = selectedInquirySector === 'all' || item.projectType === selectedInquirySector;
                            const searchMatch = 
                              item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.specs.toLowerCase().includes(searchQuery.toLowerCase());
                            return sectMatch && searchMatch;
                          }).length === 0 && (
                            <div className="col-span-2 text-center py-12 p-6 rounded-2xl bg-gray-50 dark:bg-slate-900/40 border border-dashed border-gray-200 dark:border-white/5 space-y-3">
                              <FileText className="h-8 w-8 text-gray-300 dark:text-gray-600 mx-auto" />
                              <p className="text-xs text-gray-455 max-w-sm mx-auto leading-relaxed">
                                {language === 'tr' ? 'Seçilen filtrelere uygun aktif bir bütçe teklifi bulunamadı.' : 'No active budget proposal sheets matched your selected parameters.'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Selected Proposal Detailed Spec Sheet Drilldown */}
                      <AnimatePresence mode="wait">
                        {selectedQuoteId && (
                          (() => {
                            const selectedItem = localInquiries.find(item => item.id === selectedQuoteId);
                            if (!selectedItem) return null;

                            // Compute simulated specs breakdown for engineering feel
                            const rawCost = selectedItem.estimatedCost || 350000;
                            const bMaterials = Math.round(rawCost * 0.58);
                            const bLabor = Math.round(rawCost * 0.22);
                            const bDesign = Math.round(rawCost * 0.12);
                            const bCommissioning = rawCost - (bMaterials + bLabor + bDesign);

                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="bg-[#050510] border border-[#0012FF]/30 dark:border-cyan-400/20 text-slate-100 rounded-2xl p-6 shadow-2xl relative space-y-6 text-left overflow-hidden"
                              >
                                <div className="absolute top-0 right-0 h-64 w-64 bg-[#0012FF]/5 dark:bg-cyan-400/5 rounded-full blur-[80px] pointer-events-none" />
                                
                                {/* Schematic Title */}
                                <div className="flex items-start justify-between border-b border-white/10 pb-4 relative">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                                      <span className="text-[9.5px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest">
                                        BIM SYSTEM COMPILATION SCHEMATIC
                                      </span>
                                    </div>
                                    <h4 className="text-base font-mono font-bold uppercase tracking-tight text-white flex items-center gap-1.5">
                                      <FileCode className="h-5 w-5 text-cyan-400" />
                                      <span>{selectedItem.clientName} // ID: {selectedItem.id}</span>
                                    </h4>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => setSelectedQuoteId(null)}
                                    className="p-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition text-xs font-mono font-bold flex items-center justify-center cursor-pointer"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>

                                {/* Quick Specifications Table */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="block text-[9px] text-slate-400 uppercase font-black">{t.focusSectorLabel}</span>
                                    <span className="block font-bold text-white uppercase text-[11px]">{selectedItem.projectType}</span>
                                  </div>
                                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="block text-[9px] text-slate-400 uppercase font-black">{language === 'tr' ? 'Fiziksel Boyut' : 'Physical Form Factor'}</span>
                                    <span className="block font-semibold text-white text-[11px]">{selectedItem.scaleSqFt.toLocaleString()} SQFT</span>
                                  </div>
                                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="block text-[9px] text-slate-400 uppercase font-black">{language === 'tr' ? 'Teknik Özellik İmzası' : 'RFP Spec Line Signature'}</span>
                                    <span className="block font-semibold text-white text-[10.5px] truncate" title={selectedItem.specs}>{selectedItem.specs}</span>
                                  </div>
                                </div>

                                {/* Physical Component Cost breakdown matrices */}
                                <div className="space-y-3.5">
                                  <h5 className="text-[10px] font-mono uppercase font-black tracking-wider text-slate-400 flex items-center gap-1.5">
                                    <Layers className="h-4 w-4 text-cyan-500" />
                                    <span>{t.specBreakdown}</span>
                                  </h5>

                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/60 p-4 rounded-xl border border-white/5 font-mono">
                                    <div className="space-y-1 text-left">
                                      <span className="block text-[8px] text-gray-500 uppercase">A. ELECTRICAL DESIGN</span>
                                      <span className="text-xs font-bold text-slate-200">${bDesign.toLocaleString()}</span>
                                    </div>
                                    <div className="space-y-1 text-left">
                                      <span className="block text-[8px] text-gray-500 uppercase">B. SWITCHGEAR & CABLE BOM</span>
                                      <span className="text-xs font-bold text-slate-200">${bMaterials.toLocaleString()}</span>
                                    </div>
                                    <div className="space-y-1 text-left">
                                      <span className="block text-[8px] text-gray-500 uppercase">C. SUBSTATION ONSITE LABOR</span>
                                      <span className="text-xs font-bold text-slate-200">${bLabor.toLocaleString()}</span>
                                    </div>
                                    <div className="space-y-1 text-left">
                                      <span className="block text-[8px] text-gray-500 uppercase">D. ISO COMMS TESTING</span>
                                      <span className="text-xs font-bold text-slate-200">${bCommissioning.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Automated Engineering Safety Pre-Checks list */}
                                <div className="space-y-3">
                                  <h5 className="text-[10px] font-mono uppercase font-black tracking-wider text-slate-400 flex items-center gap-1.5">
                                    <ShieldCheck className="h-4 w-4 text-cyan-500" />
                                    <span>{t.specValidation}</span>
                                  </h5>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                                    {[
                                      { title: language === 'tr' ? 'Aşırı Akım Koruması' : 'Overcurrent Circuit Integrity', val: 'PASSED 100%', ok: true },
                                      { title: language === 'tr' ? 'Bara Termal Endeksi' : 'Busbar Thermal Core Margin', val: '0.02% DRIFT (OK)', ok: true },
                                      { title: language === 'tr' ? 'Uyumlu Reaktif Güç Faktörü' : 'Reactive Power Compensation', val: '0.98 COSFφ VALID', ok: true },
                                    ].map((chk, idx) => (
                                      <div key={idx} className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-between text-[10px] font-mono">
                                        <span className="text-slate-400">{chk.title}</span>
                                        <span className="text-emerald-400 font-bold">{chk.val}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Export & Print actions */}
                                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const fullSpecsText = `
X ELEKTRIK DIGITAL BLUEPRINT PROPOSAL SHEET
=============================================
PROPOSAL ID: ${selectedItem.id}
CLIENT NAME: ${selectedItem.clientName}
CONTACT EMAIL: ${selectedItem.clientEmail}
FACILITY SCALE: ${selectedItem.scaleSqFt} SQFT
SYSTEM DETAILS: ${selectedItem.specs}
ESTIMATED COST: $${rawCost.toLocaleString()} USD
PRODUCTION TIMELINE: ${selectedItem.timeline}
=============================================
ISO-9001 ELECTRICAL ASSURANCE SEAL / X ELEKTRIK
`;
                                      navigator.clipboard.writeText(fullSpecsText.trim());
                                      alert(t.copiedClipboard);
                                      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [CLIPBOARD] Specifications for proposal ${selectedItem.id} exported successfully.`]);
                                    }}
                                    className="px-4 py-2.5 rounded-lg bg-cyan-700/10 hover:bg-cyan-700/25 border border-cyan-400/20 text-cyan-300 font-mono text-[9px] font-black uppercase transition cursor-pointer flex items-center gap-1"
                                  >
                                    <span>{t.btnExportClipboard}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      window.print();
                                      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [PRINT] Technical print job issued for proposal ${selectedItem.id}.`]);
                                    }}
                                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-[9px] border border-transparent font-black uppercase transition cursor-pointer"
                                  >
                                    {t.btnPrintSpec}
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })()
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'pfc' && (
                <motion.div
                  key="tab-pfc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8 text-left"
                >
                  <PowerFactorCalculator />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
