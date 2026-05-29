/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ChevronDown, 
  Check, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  Download, 
  Send, 
  Star, 
  ThumbsUp, 
  RefreshCw, 
  Eye, 
  FileText, 
  X, 
  MessageCircle, 
  Activity, 
  Sliders, 
  LifeBuoy,
  ChevronRight,
  Triangle,
  Lightbulb,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import MathCaptchaCheckbox from '../components/MathCaptchaCheckbox';

// Article structure
interface HelpArticle {
  id: string;
  category: 'hardware' | 'software' | 'safety' | 'procurement';
  titleEn: string;
  titleTr: string;
  excerptEn: string;
  excerptTr: string;
  contentEn: string;
  contentTr: string;
  views: number;
}

// System Service status
interface ServiceStatus {
  nameEn: string;
  nameTr: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: string;
}

export default function Support() {
  const { t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Ticket Form States
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketCategory, setTicketCategory] = useState('technical');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketFiles, setTicketFiles] = useState<File[]>([]);
  const [ticketFileNames, setTicketFileNames] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketVerified, setTicketVerified] = useState(false);
  const [ticketErrors, setTicketErrors] = useState<Record<string, string>>({});

  // Troubleshooting Wizard
  const [activeTroubleGuide, setActiveTroubleGuide] = useState<'switchgear' | 'charger' | 'bms'>('switchgear');
  const [troubleStep, setTroubleStep] = useState(0);

  // Chatbot drawer
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'agent', text: string, time: string }>>([
    { sender: 'agent', text: language === 'tr' ? 'Merhaba, X Elektrik Yardım terminaline hoş geldiniz! Sinyal kalitesi %99.8. Size nasıl yardımcı olabilirim?' : 'Greetings, welcome to the X Elektrik Support Terminal! Signal quality 99.8%. How may I assist your engineering inquiry today?', time: 'Just now' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Feedback widget
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackCategory, setFeedbackCategory] = useState('kb');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [likeCount, setLikeCount] = useState<Record<string, number>>({});

  // Localized texts dictionary to support standard dual language behavior
  const supportTexts = {
    en: {
      breadcrumbsSupport: 'Support & Help Desk',
      breadcrumbsHome: 'Home',
      pageTag: 'X ELEKTRIK TECHNICAL DISPATCH',
      pageTitle: 'Grid Help Center & Troubleshooting Hub',
      pageDesc: 'Execute diagnostic loops, query high-voltage knowledge systems, or log high-priority tickets with certified grid controllers.',
      searchPlaceholder: 'Search articles, firmware numbers, error codes (e.g., ERR-401)...',
      liveStatus: 'Active Services Telemetry State',
      allSystemsGo: 'Sovereign Systems Fully Operational',
      statusOperational: 'Operational',
      statusDegraded: 'Degraded Speed',
      statusMaintenance: 'Scheduled Maintenance',
      kbHeading: 'Browse Technical Knowledge Base',
      kbSummary: 'Access authenticated engineering manuals and commissioning standards.',
      faqHeading: 'Frequently Interrogated Inquiries',
      ticketHeading: 'Submit High-Priority Support Ticket',
      ticketDesc: 'Register structured technical tickets with certified 24-Hour on-site technicians.',
      emergContact: '24/7 Redundancy Crisis Hotline',
      emergNo: 'EMERGENCY GRID CUTS ONLY (STRICT ADHERENCE): +353 (0) 1 897 0911',
      supportHours: 'Help Desk Live Agent Operational Span',
      hoursVal: 'Monday to Sunday, 00:00 - 24:00 UTC (Continuous NOC Standby)',
      chatTitle: 'NOC Smart Help Chatbot',
      feedbackHeading: 'Documentation and Hub Feedback',
      feedbackBtn: 'Submit Feedback Report',
      feedbackSuccess: 'Report Logged! Thank you for backing our Quality Standards.',
      troubleHeading: 'Interactive On-Site Diagnostics Modeler',
      troubleSub: 'Simulate troubleshooting sequences before physical equipment contact.',
      backBtn: 'App Center',
    },
    tr: {
      breadcrumbsSupport: 'Kullanıcı Destek & Yardım',
      breadcrumbsHome: 'Ana Sayfa',
      pageTag: 'X ELEKTRIK TEKNİK SEVK MERKEZİ',
      pageTitle: 'Şebeke Destek & İnteraktif Arıza Giderme Merkezi',
      pageDesc: 'Hata teşhis döngülerini çalıştırın, yüksek gerilim bilgi bankasını sorgulayın veya sertifikalı şebeke operatörlerimiz için yüksek öncelikli destek kaydı oluşturun.',
      searchPlaceholder: 'Makale, yazılım sürümü veya hata kodu arayın (örn: ERR-401)...',
      liveStatus: 'Aktif Altyapı Telemetri İzleme',
      allSystemsGo: 'Tüm Servisler Sorunsuz Çalışıyor',
      statusOperational: 'Aktif / Çevrimiçi',
      statusDegraded: 'Yavaşlama Saptandı',
      statusMaintenance: 'Planlı Bakım Aşamasında',
      kbHeading: 'Teknik Bilgi Bankası Kategorileri',
      kbSummary: 'Onaylı mühendislik kılavuzlarına ve devreye alma standartlarına erişin.',
      faqHeading: 'Sık Sorulan Teknik Sorular',
      ticketHeading: 'Yüksek Öncelikli Mühendislik Destek Talebi',
      ticketDesc: '7/24 nöbetçi teknik saha ekiplerimiz için yapılandırılmış servis ve arıza kaydı açın.',
      emergContact: '7/24 Acil Kriz Müdahale Hattı',
      emergNo: 'YALNIZCA ACİL SEKTÖR KESİNTİLERİ İÇİN (KATIDIR): +353 (0) 1 897 0911',
      supportHours: 'Kullanıcı Destek Operasyonel Çerçevesi',
      hoursVal: 'Kesintisiz 7/24 Çalışma Süresi (NOC Standby)',
      chatTitle: 'NOC Akıllı Destek Sinyal Aracı',
      feedbackHeading: 'Destek Portalı & Bilgi Bankası Değerlendirmesi',
      feedbackBtn: 'Değerlendirme Raporunu Kaydet',
      feedbackSuccess: 'Rapor Kaydedildi! Kalite kriterlerimize katkı sağladığınız için teşekkürler.',
      troubleHeading: 'İnteraktif Saha Teşhis Modelleme Aracı',
      troubleSub: 'Elektrik tesisatına fiziksel müdahaleden önce kılavuzlu doğrulama adımlarını izleyin.',
      backBtn: 'Uygulama Merkezi',
    }
  }[language === 'tr' ? 'tr' : 'en'];

  // Tech Knowledge Base Static database
  const helpArticles: HelpArticle[] = [
    {
      id: 'ART-101',
      category: 'hardware',
      titleEn: 'XE-MVS Vacuum Switchgear Interlocking Overrides',
      titleTr: 'XE-MVS Vakumlu Hücrelerde Mekanik Geçiş Kilitleri',
      excerptEn: 'Safe operational guidelines to resolve spring charge blockages during secondary power bus bypass loops.',
      excerptTr: 'Sekonder bara baypas döngüleri esnasında mekanik yay kurma takılmalarını çözmek için güvenli müdahale adımları.',
      views: 1420,
      contentEn: 'Step 1: Ensure total upstream isolation and confirm ground switch is positioned to EARTH.\nStep 2: Access the secondary interlocking array inside the front cover lower assembly.\nStep 3: Insert the emergency manual release key, applying a clockwise rotation of 90 degrees.',
      contentTr: 'Adım 1: Hat girişinin tamamen izole edildiğinden emin olun ve toprak şalterini TOPRAK konumuna alın.\nAdım 2: Ön kapak alt takım bölmesindeki sekonder kilitleme grubuna erişin.\nAdım 3: Acil durum manuel serbest bırakma anahtarını yerleştirin ve saat yönünde 90 derece döndürün.'
    },
    {
      id: 'ART-203',
      category: 'software',
      titleEn: 'Firmware Update Sequence for MegaPack Grid Stabilizer V4.1a',
      titleTr: 'MegaPack Şebeke Kararlaştırıcı V4.1a Yazılım Güncelleme Sekansı',
      excerptEn: 'Prevent communication drops inside Modbus/TCP registers when flashing local inverter control modules.',
      excerptTr: 'Lokal invertör kontrol modüllerini güncellerken Modbus/TCP yazmaçlarındaki iletişim kopmalarını önleme prosedürü.',
      views: 985,
      contentEn: 'Ensure to back up registers before applying the write state. Do not interrupt peak loads during flashing. Flash during scheduled 02:00 UTC low intervals.',
      contentTr: 'Yazma durumunu uygulamadan önce modbus konfigürasyonunu yedekleyin. Yazma esnasında tepe yük geçişlerine izin vermeyin. Güncellemeyi 02:00 UTC zaman aralığında gerçekleştirin.'
    },
    {
      id: 'ART-304',
      category: 'safety',
      titleEn: 'Electrostatic Field Clearances around 24kV Main Transformers',
      titleTr: '24kV Ana Güç Trafoları Etrafında Elektrostatik Alan Güvenlik Mesafeleri',
      excerptEn: 'Strict clearance zones and physical guardrails routing layout standards under IEC-61936 regulations.',
      excerptTr: 'IEC-61936 direktifleri kapsamında yüksek gerilim trafo sahalarında katı yaklaşım ve fiziki çit sınırlama ölçüleri.',
      views: 2310,
      contentEn: 'Maintenance personnel must maintain a strict line-of-sight minimum clear insulation zone of 2.5 meters around non-insulated high tension points.',
      contentTr: 'Bakım personeli, yalıtımsız yüksek gerilim noktalarından en az 2.5 metrelik net emniyet mesafesini muhafaza etmekle yükümlüdür.'
    },
    {
      id: 'ART-402',
      category: 'procurement',
      titleEn: 'SmartGrid Cost Estimator Factor Adjustments on Copper Casts',
      titleTr: 'SmartGrid Hesaplama Odasında Bakır Emtia Fiyat Katsayı Ayarları',
      excerptEn: 'How international LME metal indexes dynamically modify cable tray single phase budgets in real-time.',
      excerptTr: 'Uluslararası LME emtia endekslerinin, kablo kanalı tek faz bütçe hesaplamalarımızı anlık olarak nasıl etkilediği hakkında bilgilendirme.',
      views: 755,
      contentEn: 'Our system locks calculations with a dynamic 3.5% padding factor matched against the London Metal Exchange index ticker values daily at 08:35 GMT.',
      contentTr: 'Sistemimiz, Londra Metal Borsası (LME) endeks değerlerine göre her sabah 08:35 GMT itibarıyla %3.5 oranında dinamik bir risk payı katsayısı ekler.'
    }
  ];

  // Live status data
  const statusTelemetry: ServiceStatus[] = [
    { nameEn: 'SmartGrid Estimator Engine', nameTr: 'SmartGrid Hesaplayıcı Altyapısı', status: 'operational', uptime: '99.98%' },
    { nameEn: 'XE-IoT SCADA Telemetry Node', nameTr: 'XE-IoT SCADA Telemetri Protokolleri', status: 'operational', uptime: '100.00%' },
    { nameEn: 'Bidding Desk Support Portal', nameTr: 'Destek Portalı Dosya Sunucuları', status: 'operational', uptime: '99.95%' },
    { nameEn: 'Firmware CDN Distribution Array', nameTr: 'Yazılım Dağıtım Sunucuları (CDN)', status: 'degraded', uptime: '98.40%' }
  ];

  // Live ChatBot Simulated Response Flow
  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const updatedLog = [...chatLog, { sender: 'user' as const, text: userText, time: timeStr }];
    setChatLog(updatedLog);
    setChatMessage('');
    setIsTyping(true);

    // AI dispatch simulation
    setTimeout(() => {
      let responseText = '';
      const promptLower = userText.toLowerCase();

      if (promptLower.includes('switchgear') || promptLower.includes('hücre') || promptLower.includes('interlock')) {
        responseText = language === 'tr' 
          ? 'XE-MVS Hücrelerinde şebeke kilitleri mi yaşıyorsunuz? Güvenlik için öncelikle toprak anahtarının [EARTH] konumunda olduğunu doğrulayın, ardından acil durum yay gerpme mandalını 90 derece çevirin.'
          : 'Detected query regarding Switchgear interlocks. Ensure the ground relay line state reads [EARTH] before inserting the manual bypass interlocking safety key. Rotate key 90 degrees.';
      } else if (promptLower.includes('firmware') || promptLower.includes('yazılım') || promptLower.includes('güncelle')) {
        responseText = language === 'tr'
          ? 'MegaPack V4.1a kararlı yazılım sürümü (Firmware) aktif durumda. Bu paketi "Belgeler" alanından indirebilir ve Modbus TCP üzerinden RS-485 hattınıza flaşlayabilirsiniz.'
          : 'The MegaPack V4.1a firmware payload is hosted inside our secured "Documents" directory. Unpack carefully and execute transmission flashing over standard Modbus gateway endpoints.';
      } else if (promptLower.includes('hesaplayıcı') || promptLower.includes('estimator') || promptLower.includes('fiyat') || promptLower.includes('teklif')) {
        responseText = language === 'tr'
          ? 'SmartGrid Proje Hesaplayıcı aracımız bütçeleri otomatik çıkarır. Trafo boyutunu, kablo metrajını ve ek bileşenleri seçip anında kurumsal panoya gönderebilirsiniz.'
          : 'Our dynamic SmartGrid Estimator models full turn-key electrical pricing including labor margins. Enter square feet, voltage specs, and toggle premium microgrid features to query bidding slots.';
      } else if (promptLower.includes('kaza') || promptLower.includes('hata') || promptLower.includes('err') || promptLower.includes('offline')) {
        responseText = language === 'tr'
          ? 'Saha hata tespiti devrede. Lütfen hata kodunu girin veya terminal üzerinden interaktif saha teşhis modelleyicimizi çalıştırarak adım adım adımları takip edin.'
          : 'Fault detection register diagnostics are active. Enter the telemetry hex code or consult our visual interactive diagnostic modeling steps inside this Support tab.';
      } else {
        responseText = language === 'tr'
          ? 'X Elektrik mühendisi olarak konuyu kaydettim. Bize doğrudan "Destek Talebi Formu" aracılığıyla veya acil durumlarda +353 (0) 1 897 0911 numaralı kriz hattımızdan ulaşabilirsiniz.'
          : 'Noted inquiry inside the NOC local dispatch log. For detailed assistance, submit an authenticated ticket or initiate emergency escalation through our hotline +353 (0) 1 897 0911.';
      }

      setChatLog(prev => [...prev, { sender: 'agent' as const, text: responseText, time: timeStr }]);
      setIsTyping(false);
    }, 1200);
  };

  // Star Rating & Comment Submission handler
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackRating === 0) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackRating(0);
      setFeedbackComment('');
    }, 5000);
  };

  // Support Ticket Submit Handler with simple fields verification
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!ticketName.trim()) errors.name = language === 'tr' ? 'Ad soyad zorunludur' : 'Full name is required';
    if (!ticketEmail.trim() || !ticketEmail.includes('@')) errors.email = language === 'tr' ? 'Geçerli bir e-posta girin' : 'Provide a valid email';
    if (!ticketMessage.trim() || ticketMessage.length < 10) errors.message = language === 'tr' ? 'Açıklama en az 10 karakter olmalıdır' : 'Description must be at least 10 characters';
    if (!ticketVerified) errors.verified = language === 'tr' ? 'Doğrulama kutusunu işaretleyin' : 'Tick the security interlock';

    if (Object.keys(errors).length > 0) {
      setTicketErrors(errors);
      return;
    }

    setTicketErrors({});
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketName('');
      setTicketEmail('');
      setTicketMessage('');
      setTicketFiles([]);
      setTicketFileNames([]);
      setTicketVerified(false);
    }, 6000);
  };

  // Mock drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArr = Array.from(e.dataTransfer.files) as File[];
      setTicketFiles(prev => [...prev, ...filesArr]);
      setTicketFileNames(prev => [...prev, ...filesArr.map((f: File) => f.name)]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files) as File[];
      setTicketFiles(prev => [...prev, ...filesArr]);
      setTicketFileNames(prev => [...prev, ...filesArr.map((f: File) => f.name)]);
    }
  };

  const removeFile = (idx: number) => {
    setTicketFiles(prev => prev.filter((_, i) => i !== idx));
    setTicketFileNames(prev => prev.filter((_, i) => i !== idx));
  };

  // Filtering Knowledge base articles
  const filteredArticles = useMemo(() => {
    return helpArticles.filter(art => {
      const title = language === 'tr' ? art.titleTr : art.titleEn;
      const excerpt = language === 'tr' ? art.excerptTr : art.excerptEn;
      const content = language === 'tr' ? art.contentTr : art.contentEn;
      
      const fitsSearch = [title, excerpt, content, art.id].some(text => 
        text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const fitsCategory = selectedCategory === 'all' || art.category === selectedCategory;
      
      return fitsSearch && fitsCategory;
    });
  }, [searchQuery, selectedCategory, language]);

  // Troubleshooting Wizard config
  const troubleGuides = {
    switchgear: {
      titleEn: 'XE-MVS Switchgear Lockout Reset',
      titleTr: 'XE-MVS Hücre Kilitleme Sıfırlama Sekansı',
      steps: [
        {
          labelEn: 'Lockout status detection',
          labelTr: 'Kilitleme durum tespiti',
          descEn: 'Observe the visual indicator on the panel face. If flagged "LOCK" or yellow LED is active, secondary mechanical springs have failed to discharge automatically.',
          descTr: 'Panel yüzündeki görsel göstergeyi izleyin. Eğer "LOCK" bayrağı veya sarı LED aktifse, sekonder mekanik yaylar otomatik olarak boşalmamış demektir.'
        },
        {
          labelEn: 'Ensure complete ground isolation',
          labelTr: 'Tam toprak izolasyonu sağlama',
          descEn: 'Shift the primary isolated breaker handle down to the bottom tier. Confirm isolation switch displays green auxiliary circuit status.',
          descTr: 'Birincil izole edilmiş kesici kolunu alt seviyeye indirin. İzolasyon şalterinin yeşil yardımcı devre durumunu gösterdiğini doğrulayın.'
        },
        {
          labelEn: 'Rotary bypass release',
          labelTr: 'Döner baypas kilidini açma (manivela)',
          descEn: 'Insert the security release interlock key in compartment slot B-4. Rotate precisely 90° clockwise. You will hear a loud physical click as mechanical springs disengage.',
          descTr: 'B-4 bölme yuvasına güvenlik açma anahtarını yerleştirin. Tam olarak 90° saat yönünde döndürün. Mekanik yaylar devreden çıkarken fiziksel bir klik duyacaksınız.'
        },
        {
          labelEn: 'Status Verification',
          labelTr: 'Durum Doğrulaması',
          descEn: 'Verify indicator display has cleared. Turn the auxiliary switch toggle back on. Grid telemetry signals should sync green with the main SCADA stack.',
          descTr: 'Göstergenin temizlendiğini doğrulayın. Yardımcı şalter mandalını tekrar açık konuma getirin. Şebeke telemetri sinyali SCADA ile senkronize olmalıdır.'
        }
      ]
    },
    charger: {
      titleEn: 'HyperCharger Level-3 DC Coolant Offline Check',
      titleTr: 'HyperCharger Seviye-3 DC Sıvı Radyatör Arıza Teşhisi',
      steps: [
        {
          labelEn: 'Check coolant pump status',
          labelTr: 'Sıvı pompası durum kontrolü',
          descEn: 'Analyze flow rate monitors. If flow telemetry reads below 0.8 L/min, liquid coolant pump safety relay has tripped due to thermal expansion constraints.',
          descTr: 'Akış hızı izleyicilerini inceleyin. Eğer akış hızı 0.8 L/dk altındaysa, sıvı soğutucu pompası güvenlik rölesi termal genişleme sınırı nedeniyle atmıştır.'
        },
        {
          labelEn: 'Bypass thermal safety registers',
          labelTr: 'Termal güvenlik register baypası',
          descEn: 'Locate registers inside Modbus controller board. Send a momentary write override command to register address 0x05F4.',
          descTr: 'Modbus kontrol kartı içindeki kaydedicileri (register) bulun. 0x05F4 kaydedici adresine anlık bir yazma (override) sinyali gönderin.'
        },
        {
          labelEn: 'Check loop pressure',
          labelTr: 'Devridaim basınç dengesini doğrulama',
          descEn: 'Confirm system pressure is strictly between 1.5 - 2.2 bar. Adjust localized coolant valve flow if pressure values deviate.',
          descTr: 'Sistem basıncının katı bir şekilde 1.5 - 2.2 bar arasında olduğunu teyit edin. Basınç sapmışsa lokal vanadan akışı ayarlayın.'
        }
      ]
    },
    bms: {
      titleEn: 'XE-BMS Telemetry Ingress Re-sync',
      titleTr: 'XE-BMS Telemetri Girişi Senkronizasyon Kaybı Giderme',
      steps: [
        {
          labelEn: 'Interface fiber optic link query',
          labelTr: 'Fiber optik hat kontrolü',
          descEn: 'Observe the active Ethernet fiber link port. If lights are flashing amber, frame errors are high on the main pipeline.',
          descTr: 'Aktif fiber port ışıklarını izleyin. Eğer sarı renkte yanıp sönüyorlarsa, ana veri hattında yüksek çerçeve (frame) hataları oluşmaktadır.'
        },
        {
          labelEn: 'Baud rate calibration',
          labelTr: 'Baud hızı kalibrasyonu',
          descEn: 'Log into management shell. Calibrate controller serial baud rate to 115200 bps. High density grids require this exact frequency offset.',
          descTr: 'Yönetim kabuğuna bağlanın. Seri arabirim baud hızını 115200 bps değerine kalibre edin. Yüksek yoğunluklu sistemler bu frekansa ihtiyaç duyar.'
        },
        {
          labelEn: 'Hard Reset Command',
          labelTr: 'Yeniden başlatma komutu gönderme',
          descEn: 'Toggle auxiliary power switch panel SW-10 to cycle internal telecom cards without dumping active grid breaker status configurations.',
          descTr: 'Lokal şalter panosundaki SW-10 şalterini indirip kaldırarak, aktif kesici ayarlarını sıfırlamadan telemetri kartını yeniden başlatın.'
        }
      ]
    }
  };

  const currentGuide = troubleGuides[activeTroubleGuide];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-gray-400 select-none">
        <span className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer font-bold">
          {supportTexts.breadcrumbsHome}
        </span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0012FF] dark:text-cyan-400 font-bold">
          {supportTexts.breadcrumbsSupport}
        </span>
      </nav>

      {/* 2. Hero Header Section */}
      <div className="relative overflow-hidden bg-gray-950 text-white rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
        {/* Backdrop Grid Glow decorative lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00FF00] block">
            ⚡ {supportTexts.pageTag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight leading-tight">
            {supportTexts.pageTitle}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            {supportTexts.pageDesc}
          </p>
          
          {/* Main Search Bar of the help articles */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-3.5 h-[18px] w-[18px] text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={supportTexts.searchPlaceholder}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-gray-900 focus:text-gray-950 placeholder-gray-500 rounded-2xl pl-12 pr-4 py-3.5 text-xs outline-none focus:ring-2 focus:ring-[#00FF00] dark:focus:ring-cyan-400 transition-all font-sans"
            />
          </div>
        </div>

        {/* Live Chat Launcher Trigger Card */}
        <div className="relative z-10 min-w-[240px] bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#00FF00]">
              {language === 'tr' ? 'NOC CANLI BAĞLANTI' : 'NOC LIVE LINK'}
            </span>
          </div>
          <p className="text-[11px] text-gray-300 leading-tight">
            {language === 'tr' ? 'Mühendislik merkezimizle anlık kodlanmış sohbet oturumu başlatın.' : 'Establish instant telemetry dialogue with local network dispatch agents.'}
          </p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#00FF00] text-gray-950 font-black text-xs uppercase hover:bg-[#00D000] transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{language === 'tr' ? 'Canlı Sohbet Başlat' : 'Launch Live Chat'}</span>
          </button>
        </div>
      </div>

      {/* 3. Live Service Status Monitor Sector */}
      <div className="bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/15 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#0012FF] dark:text-cyan-400" />
              <span>{supportTexts.liveStatus}</span>
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-tight">
              {language === 'tr' ? 'X Elektrik bulut sunucuları ve endüstriyel SCADA ağlarının anlık ulaşılamazlık denetimleri.' : 'Real-time ping checks and reliability measurements for our cloud systems.'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{supportTexts.allSystemsGo}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {statusTelemetry.map((srv, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 p-4 rounded-xl space-y-3 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-snug">
                  {language === 'tr' ? srv.nameTr : srv.nameEn}
                </span>
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1 ${
                  srv.status === 'operational' ? 'bg-emerald-500' : srv.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Uptime</span>
                <span className="font-bold text-gray-900 dark:text-white">{srv.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Troubleshooting Wizard Section */}
      <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl text-left space-y-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0012FF] dark:text-cyan-400">
            🔧 {supportTexts.troubleHeading}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'tr' ? 'Rehberli Altyapı Hata Teşhis Terminali' : 'Guided Fault Rectification Terminal'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
            {supportTexts.troubleSub}
          </p>
        </div>

        {/* Wizard Selection Side Bar tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start border-t border-gray-100 dark:border-white/5 pt-6">
          <div className="flex flex-col gap-2">
            {(['switchgear', 'charger', 'bms'] as const).map(guideKey => {
              const active = activeTroubleGuide === guideKey;
              return (
                <button
                  key={guideKey}
                  type="button"
                  onClick={() => {
                    setActiveTroubleGuide(guideKey);
                    setTroubleStep(0);
                  }}
                  className={`w-full p-3 rounded-xl text-xs font-bold font-sans text-left transition select-none cursor-pointer flex items-center justify-between ${
                    active 
                      ? 'bg-[#0012FF] text-white shadow-md' 
                      : 'bg-gray-50 dark:bg-slate-950 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{troubleGuides[guideKey][language === 'tr' ? 'titleTr' : 'titleEn']}</span>
                  <Sliders className={`h-4 w-4 shrink-0 transition ${active ? 'rotate-180' : 'opacity-60'}`} />
                </button>
              );
            })}

            {/* Support Hotline Notice Box inline */}
            <div className="bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 p-4 rounded-xl mt-4 text-left space-y-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-amber-500">
                <ShieldAlert className="h-4 w-4" />
                {supportTexts.emergContact}
              </span>
              <p className="text-[10px] text-gray-400 font-mono leading-relaxed select-all">
                {supportTexts.emergNo}
              </p>
            </div>
          </div>

          {/* Stepper Wizard Active step displays */}
          <div className="lg:col-span-3 bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-white/5 rounded-2xl p-6 relative">
            <span className="absolute top-4 right-4 text-[10px] font-mono font-bold text-gray-400 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 px-2.5 py-1 rounded-full">
              STEP {troubleStep + 1} OF {currentGuide.steps.length}
            </span>

            <h3 className="text-sm font-mono font-black uppercase text-[#0012FF] dark:text-cyan-400 mb-4 tracking-wide">
              🤖 DIAGNOSTIC SUB-SEQUENCE
            </h3>

            {/* Animated Step Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTroubleGuide}-${troubleStep}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  {currentGuide.steps[troubleStep][language === 'tr' ? 'labelTr' : 'labelEn']}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                  {currentGuide.steps[troubleStep][language === 'tr' ? 'descTr' : 'descEn']}
                </p>
                
                {/* Visual feedback simulation checklist detail */}
                <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-3.5 rounded-xl flex items-start gap-2 max-w-md">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-gray-400 leading-snug">
                    {language === 'tr' ? 'UYGULAMA NOTU: Fiziksel test manivelalarını kurarken iş güvenlik eldiveni ve izolasyon kaskı giyilmesi yasal olarak zorunludur.' : 'FIELD NOTICE: Certified class safety apparel (insulated rubber gloves + arc protective visor) is strictly enforced under state grid statutes.'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stepper progress control triggers */}
            <div className="flex items-center gap-2 mt-8 pt-4 border-t border-gray-200 dark:border-white/5">
              <button
                type="button"
                disabled={troubleStep === 0}
                onClick={() => setTroubleStep(prev => prev - 1)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-40 transition-all cursor-pointer border border-gray-200 dark:border-white/10"
              >
                {language === 'tr' ? 'Geri' : 'Back'}
              </button>
              
              {troubleStep < currentGuide.steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setTroubleStep(prev => prev + 1)}
                  className="px-4 py-2 rounded-lg bg-[#0012FF] text-white text-xs font-bold hover:bg-[#000EB3] transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{language === 'tr' ? 'Sonraki Adım' : 'Next Step'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{language === 'tr' ? 'Arıza Teşhisi Başarıyla Tamamlandı' : 'Calibration Diagnostics Secured'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Browse Technical Knowledge Base (Filtered output) */}
      <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <LifeBuoy className="h-5.5 w-5.5 text-[#0012FF] dark:text-cyan-400" />
              <span>{supportTexts.kbHeading}</span>
            </h2>
            <p className="text-xs text-gray-400">
              {supportTexts.kbSummary}
            </p>
          </div>

          {/* Quick Knowledge Base Categories pills */}
          <div className="flex flex-wrap gap-1.5 bg-gray-50 dark:bg-slate-950 p-1 rounded-xl border border-gray-200 dark:border-white/10">
            {([
              { key: 'all', labelEn: 'All', labelTr: 'Tümü' },
              { key: 'hardware', labelEn: 'Hardware', labelTr: 'Donanım' },
              { key: 'software', labelEn: 'Software', labelTr: 'Yazılım' },
              { key: 'safety', labelEn: 'Safety', labelTr: 'Emniyet' },
              { key: 'procurement', labelEn: 'Estimating', labelTr: 'Hesaplama' }
            ]).map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition select-none cursor-pointer border-0 ${
                  selectedCategory === cat.key
                    ? 'bg-[#0012FF] text-white shadow-sm'
                    : 'bg-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {language === 'tr' ? cat.labelTr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic searchable grid database lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => {
              const isOpen = activeFaq === art.id;
              const likes = likeCount[art.id] || 0;
              
              return (
                <div
                  key={art.id}
                  className="bg-gray-55 dark:bg-slate-950 border border-gray-150 dark:border-white/5 p-5 rounded-2xl space-y-4 hover:border-gray-300 dark:hover:border-white/10 transition-all text-left flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span className="font-bold text-[#0012FF] dark:text-cyan-400 uppercase tracking-wider bg-[#0012FF]/5 dark:bg-cyan-400/5 px-2.5 py-0.5 rounded-lg">
                        {art.id} • {art.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {art.views} views
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {language === 'tr' ? art.titleTr : art.titleEn}
                    </h4>
                    
                    <p className="text-xs text-gray-450 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {language === 'tr' ? art.excerptTr : art.excerptEn}
                    </p>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-150 dark:border-white/10 text-xs font-mono text-gray-750 dark:text-gray-300 whitespace-pre-wrap leading-relaxed shadow-inner mt-3 text-left"
                      >
                        {language === 'tr' ? art.contentTr : art.contentEn}
                      </motion.div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-200 dark:border-white/5">
                    {/* Expand view trigger */}
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : art.id)}
                      className="text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-400 underline hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                    >
                      {isOpen 
                        ? (language === 'tr' ? '[-] Kılavuzu Daralt' : '[-] Collapse Detail') 
                        : (language === 'tr' ? '[+] Tam Kılavuzu Oku' : '[+] Read Instruction')}
                    </button>

                    {/* Like button metric */}
                    <button
                      type="button"
                      onClick={() => {
                        setLikeCount(prev => ({ ...prev, [art.id]: (prev[art.id] || 0) + 1 }));
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 text-xs text-gray-450 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span className="font-mono text-[11px] font-bold">{likes}</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-slate-950 p-8 rounded-2xl text-center text-gray-400 font-sans italic border border-dashed border-gray-200 dark:border-white/5 space-y-2">
              <ShieldAlert className="h-8 w-8 text-amber-500 mx-auto" />
              <p className="text-xs">
                {language === 'tr' ? 'Seçilen kriterlere uygun teknik makale veya döküm bulunamadı.' : 'No registered engineering guides match your search parameters.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 6. High-Priority Ticket Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Ticket Desk Form (Left/Colspan 3) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl text-left shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Triangle className="h-4 w-4 font-bold fill-[#0012FF] text-[#0012FF] dark:fill-cyan-400 dark:text-cyan-400 rotate-180" />
              <span>{supportTexts.ticketHeading}</span>
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {supportTexts.ticketDesc}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {ticketSubmitted ? (
              <motion.div
                key="ticket-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#00FF00]/10 border border-[#00FF00]/20 p-8 rounded-2xl text-center space-y-4 shadow-inner"
              >
                <div className="h-12 w-12 bg-[#00FF00]/20 rounded-full flex items-center justify-center mx-auto text-[#00FF00]">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <h4 className="text-lg font-bold text-gray-950 dark:text-white">
                  {language === 'tr' ? 'Mühendislik Destek Kaydı Alındı' : 'Technical Dispatched Secured'}
                </h4>
                <div className="text-left font-mono text-[10px] bg-white dark:bg-slate-950 border border-gray-150 p-4 rounded-xl leading-relaxed text-gray-500 space-y-2 dark:border-white/5 max-w-md mx-auto">
                  <p className="text-gray-900 dark:text-white font-bold">📄 TICKET #XE-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong>Operator Queue:</strong> NOC Technical Duty Officer</p>
                  <p><strong>Response ETA:</strong> Under 45 minutes</p>
                  <p className="text-[9px] pt-1.5 border-t border-gray-100 dark:border-white/5">
                    {language === 'tr' ? 'Sevk sistemimize ilettiğiniz bilgiler şube veri bankasında izole tutulmaktadır.' : 'Blueprints & technical coordinates logged safely within corporate database.'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {language === 'tr' ? 'Adınız Soyadınız' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 ${
                        ticketErrors.name ? 'border-red-500' : 'border-gray-250 dark:border-white/10'
                      }`}
                    />
                    {ticketErrors.name && <p className="text-red-500 text-[10px] font-mono">{ticketErrors.name}</p>}
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {language === 'tr' ? 'Kurumsal E-posta Adresiniz' : 'Company Email Address'}
                    </label>
                    <input
                      type="email"
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 ${
                        ticketErrors.email ? 'border-red-500' : 'border-gray-250 dark:border-white/10'
                      }`}
                    />
                    {ticketErrors.email && <p className="text-red-500 text-[10px] font-mono">{ticketErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {language === 'tr' ? 'Destek Kategorisi' : 'Inquiry Category'}
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF] focus:border-transparent cursor-pointer"
                    >
                      <option value="technical">{language === 'tr' ? 'Teknik Pano & Saha Arızası' : 'Technical / Switchgear Field Error'}</option>
                      <option value="software">{language === 'tr' ? 'SCADA & IoT Kararsızlık' : 'SCADA Telemetry & IoT Control'}</option>
                      <option value="procurement">{language === 'tr' ? 'Emtia Fiyat Teklif Bütçeleme' : 'BMS Estimating Customizations'}</option>
                      <option value="regulatory">{language === 'tr' ? 'IEC / NEC Standart Uygunluk' : 'IEC & NEC Compliance Filing'}</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {language === 'tr' ? 'Teknik Aciliyet Seviyesi' : 'Severity Criticality'}
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-slate-950 p-1 rounded-xl border border-gray-250 dark:border-white/10">
                      {(['low', 'medium', 'high'] as const).map((prio) => {
                        const active = ticketPriority === prio;
                        const label = { low: 'LOW', medium: 'MEDIUM', high: '⚡ EMERGENCY' }[prio];
                        return (
                          <button
                            key={prio}
                            type="button"
                            onClick={() => setTicketPriority(prio)}
                            className={`py-1.5 px-2 rounded-lg text-[9px] font-bold uppercase transition select-none cursor-pointer border-0 ${
                              active
                                ? prio === 'high' 
                                  ? 'bg-red-500 text-white font-extrabold shadow-sm' 
                                  : 'bg-[#0012FF] dark:bg-cyan-400 text-white shadow-sm'
                                : 'bg-transparent text-gray-400 hover:text-gray-900'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                    {language === 'tr' ? 'Teknik Arıza Ayrıntıları' : 'Fault Topology & Symptoms Description'}
                  </label>
                  <textarea
                    rows={4}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder={language === 'tr' ? 'Hücre kodu (örn: XE-MVS-04), oluşan durum röle uyarıları...' : 'Enter system serial number, relay display status warnings or active physical conditions...'}
                    className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-400 resize-none ${
                      ticketErrors.message ? 'border-red-500' : 'border-gray-250 dark:border-white/10'
                    }`}
                  />
                  {ticketErrors.message && <p className="text-red-500 text-[10px] font-mono">{ticketErrors.message}</p>}
                </div>

                {/* File Upload drag and drop box */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                    {language === 'tr' ? 'Saha Şema veya Ek Dosyalar' : 'Field Schematics & Log Drops'}
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                      isDragging 
                        ? 'border-[#0012FF] bg-[#0012FF]/5 dark:border-cyan-400 dark:bg-cyan-400/5' 
                        : 'border-gray-200 dark:border-white/15'
                    }`}
                  >
                    <input
                      type="file"
                      id="ticket-file-input"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="ticket-file-input"
                      className="cursor-pointer space-y-2 block"
                    >
                      <FileText className="h-6 w-6 text-gray-400 mx-auto" />
                      <p className="text-xs text-gray-450 dark:text-gray-300">
                        {language === 'tr' 
                          ? 'Mühendislik fotoğraflarını buraya sürükleyin veya göz atmak için tıklayın' 
                          : 'Drag and drop blueprint files or click to upload local assets'}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Support formats: .PDF, .DXF, .DWG, .PNG max 25MB
                      </p>
                    </label>

                    {ticketFileNames.length > 0 && (
                      <div className="mt-3.5 space-y-1.5 border-t border-gray-100 dark:border-white/5 pt-2 text-left">
                        {ticketFileNames.map((name, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px] font-mono bg-gray-100 dark:bg-slate-950 p-1.5 rounded-lg border border-gray-200 dark:border-white/5">
                            <span className="truncate text-gray-700 dark:text-gray-300 max-w-[200px]">{name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-red-500 hover:text-red-700 p-0.5"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <MathCaptchaCheckbox onVerified={setTicketVerified} className="mb-4" />
                  {ticketErrors.verified && <p className="text-red-500 text-[10px] font-mono mb-2">{ticketErrors.verified}</p>}
                </div>

                <button
                  type="submit"
                  disabled={!ticketVerified}
                  className="w-full py-3 px-4 rounded-xl bg-gray-950 dark:bg-cyan-400 dark:text-gray-950 text-white font-black text-xs transition uppercase flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-cyan-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow"
                >
                  <Send className="h-4 w-4" />
                  <span>{language === 'tr' ? 'Sevk Talebini Gönder' : 'Dispatch High-Priority Ticket'}</span>
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Info Sidebar (Right/Colspan 2) */}
        <div className="lg:col-span-2 space-y-6 text-left">
          {/* Support Hours card */}
          <div className="bg-gray-905 dark:bg-slate-950 text-white p-6 sm:p-8 rounded-3xl space-y-5 shadow-lg border border-white/5">
            <h4 className="text-xs font-mono font-black tracking-widest text-[#00FF00] uppercase">
              {language === 'tr' ? 'NOC KONTROL ODASI' : 'NOC CONTROL ROOM'}
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <Clock className="h-5 w-5 text-[#4D64FF] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-mono text-gray-400 uppercase text-[10px] block">{supportTexts.supportHours}</span>
                  <span className="font-medium">{supportTexts.hoursVal}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="h-5 w-5 text-[#4D64FF] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-mono text-gray-400 uppercase text-[10px] block">Bidding Desk Email</span>
                  <span className="font-mono">noc-operations@xelektrik.com</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="h-5 w-5 text-[#4D64FF] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-mono text-gray-400 uppercase text-[10px] block">WhatsApp Business Hotline</span>
                  <span className="font-bold text-[#00FF00]">+353 (0) 1 897 0214</span>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-[11px] leading-relaxed text-gray-300">
                {language === 'tr' 
                  ? 'Acil saha mühendislik koordinasyonu için şube müdürünüz ile kodlanmış krik anahtarlarını hazır bulundurmanızı öneririz.' 
                  : 'We advise keeping your secure cryptokey signatures ready when invoking immediate on-site crisis standby dispatch crews.'}
              </p>
            </div>
          </div>

          {/* Downloadable Recovery Resources Box */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 rounded-3xl text-left space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
              <Download className="h-4 w-4 text-[#0012FF] dark:text-cyan-400 animate-bounce" />
              <span>{language === 'tr' ? 'ACİL YAZILIM VE REHBERLER' : 'CRITICAL ASSETS & UTILITIES'}</span>
            </h4>

            <div className="space-y-3 pt-1">
              {[
                { name: 'MegaPack_E-Modbus_Registers_V4.1.csv', size: '1.4 MB', label: 'E-Registers Map' },
                { name: 'XE-MVS_Bypass_Key_Manual_REV2.pdf', size: '840 KB', label: 'Mechanical Overrides' },
                { name: 'XE-BMS_Baud_Reconnection_Patch.bin', size: '124 KB', label: 'Telemetry Driver' }
              ].map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-slate-950 rounded-xl border border-gray-150 dark:border-white/5">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-mono font-bold text-gray-800 dark:text-gray-200 truncate max-w-[150px]">{res.name}</p>
                    <span className="text-[9px] font-mono text-gray-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-white/5">{res.size} • {res.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const fileContent = `X ELEKTRIK FIRMWARE LOADER SECURITY BLOCK\nAsset: ${res.name}\nSize: ${res.size}\nAuthor: QA Safety Desk`;
                      const blob = new Blob([fileContent], { type: 'text/plain' });
                      const a = document.createElement('a');
                      a.href = URL.createObjectURL(blob);
                      a.download = res.name;
                      a.click();
                    }}
                    className="p-1 px-2.5 rounded-lg bg-[#0012FF]/5 hover:bg-[#0012FF]/10 text-[#0012FF] text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="h-3 w-3" />
                    <span>DL</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Customer Feedback Widget */}
          <div className="bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-white/10 p-6 rounded-3xl text-left space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#0012FF] dark:text-cyan-400 uppercase flex items-center gap-1.5">
              <Star className="h-4 w-4" />
              <span>{supportTexts.feedbackHeading}</span>
            </h4>

            <AnimatePresence mode="wait">
              {feedbackSubmitted ? (
                <motion.div
                  key="feedback-success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/35 p-4 rounded-xl text-center text-[11px] font-sans font-medium text-emerald-600 dark:text-emerald-400 leading-normal"
                >
                  {supportTexts.feedbackSuccess}
                </motion.div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-[11px]">
                  <div className="space-y-1">
                    <span className="text-gray-400 block font-mono uppercase text-[9px] font-bold">RATE PORTAL DESIGN:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const isSelected = feedbackRating >= starValue;
                        return (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() => setFeedbackRating(starValue)}
                            className="p-1 transition-transform hover:scale-125 hover:text-amber-400 cursor-pointer text-gray-300 select-none border-0 bg-transparent"
                          >
                            <Star className={`h-5 w-5 fill-current ${
                              isSelected ? 'text-amber-400' : 'text-gray-250 dark:text-slate-800'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 block font-mono uppercase text-[9px] font-bold">COMMENTS:</span>
                    <input
                      type="text"
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder={language === 'tr' ? 'Bize geri bildirim bırakın...' : 'Provide review comments...'}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#0012FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={feedbackRating === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-950 dark:bg-slate-900 text-white font-bold text-xs uppercase hover:bg-gray-800 dark:hover:bg-slate-800 cursor-pointer disabled:opacity-40 select-none border border-gray-200 dark:border-white/10"
                  >
                    {supportTexts.feedbackBtn}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 7. NOC Smart Help Chatbot drawer bottom-right panel simulation */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-55 w-80 sm:w-96 bg-white dark:bg-slate-950 border border-gray-150 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between text-left h-[420px]"
          >
            {/* Chat header */}
            <div className="bg-gray-950 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF00]">
                  {supportTexts.chatTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Log lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-slate-900/50">
              {chatLog.map((log, idx) => {
                const isUser = log.sender === 'user';
                return (
                  <div key={idx} className={`flex flex-col max-w-[85%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <div className={`p-3 rounded-2xl text-xs leading-normal font-sans shadow-sm break-words ${
                      isUser 
                        ? 'bg-[#0012FF] text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-950 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-tl-none'
                    }`}>
                      {log.text}
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 tracking-tight mt-1">{log.time}</span>
                  </div>
                );
              })}
              
              {isTyping && (
                <div className="flex items-center gap-1 bg-white dark:bg-slate-950 border border-gray-100 dark:border-white/5 p-2 rounded-xl text-xs text-gray-400 w-16">
                  <RefreshCw className="h-3 w-3 animate-spin text-[#0012FF]" />
                  <span className="font-bold">...</span>
                </div>
              )}
            </div>

            {/* Chat input form */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-gray-100 dark:border-white/15 bg-white dark:bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={language === 'tr' ? 'Mesajınızı buraya girin...' : 'Inquire here...'}
                className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0012FF] text-gray-800 dark:text-gray-100 font-sans"
              />
              <button
                type="submit"
                disabled={!chatMessage.trim()}
                className="p-2 rounded-xl bg-[#0012FF] hover:bg-[#000EB3] text-white disabled:opacity-40 transition cursor-pointer select-none border-0 text-center flex items-center justify-center shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Bottom CTA section */}
      <div className="bg-[#0012FF]/5 dark:bg-cyan-400/5 border border-[#0012FF]/10 dark:border-cyan-400/10 p-8 rounded-3xl text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {language === 'tr' ? 'Özel Mühendislik Çözümüne mi İhtiyacınız Var?' : 'Require Custom Substation Integrations?'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-normal max-w-xl mx-auto">
          {language === 'tr' 
            ? 'SmartGrid Proje Hesaplama aracımızı kullanarak anlık bütçe raporu çıkarın ve ihale planlama birimimizi kurumsal bütçelerle kilitleyin.' 
            : 'Configure specialized equipment and line measurements inside our SmartGrid simulator room to secure instant bidding approvals.'}
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.hash = '#/estimator';
            // Fallback for standard react routing
            const a = document.createElement('a');
            a.href = '/estimator';
            a.click();
          }}
          className="inline-flex items-center gap-1.5 py-3 px-6 rounded-xl bg-gray-950 dark:bg-[#00FF00] text-white dark:text-gray-950 font-black text-xs uppercase hover:bg-gray-800 dark:hover:bg-[#00D000] cursor-pointer transition select-none shadow hover:shadow-lg"
        >
          <span>{language === 'tr' ? 'SmartGrid Proje Hesaplayıcıyı Başlat' : 'Initialize SmartGrid Estimator'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </motion.div>
  );
}
