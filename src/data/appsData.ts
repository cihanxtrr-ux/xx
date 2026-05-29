export interface AppRequirement {
  os: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  type: 'feature' | 'fix' | 'security' | 'performance';
  changes: string[];
}

export interface PlatformConfig {
  name: 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux' | 'Web';
  fileSize: string;
  downloadUrl: string;
  badgeColor: string;
  sha256?: string;
}

export interface ApplicationInfo {
  id: string;
  name: string;
  shortDesc: { en: string; tr: string };
  longDesc: { en: string; tr: string };
  category: 'grid' | 'monitoring' | 'analysis';
  categoryLabel: { en: string; tr: string };
  version: string;
  rating: number;
  reviewsCount: number;
  developer: string;
  developerContact: string;
  releaseDate: string;
  sha256: string;
  iconName: 'grid' | 'power' | 'battery' | 'wave' | 'trafo';
  iconColor: string;
  screenshots: string[]; // Mock screenshot paths or high-fidelity UI specifications
  platforms: PlatformConfig[];
  systemRequirements: {
    minimum: AppRequirement;
    recommended: AppRequirement;
  };
  installGuide: { en: string[]; tr: string[] };
  faqs: FAQItem[];
  changelog: ChangelogItem[];
  releaseNotes: { en: string; tr: string };
}

export const appsData: ApplicationInfo[] = [
  {
    id: 'gridmaster-os',
    name: 'GridMaster OS',
    shortDesc: {
      en: 'Real-time substation supervisory control and utility grid automation interface.',
      tr: 'Gerçek zamanlı trafo merkezi denetleyici kontrolü ve şebeke otomasyon arayüzü.'
    },
    longDesc: {
      en: 'GridMaster OS is an enterprise-grade power system supervisory platform designed for utilities and grid operators. It streams sub-millisecond telemetry from digital electrical relays, correlates synchrophasor PMU measurements, and provides real-time intelligent automated power shedding. Built on high-performance industrial standards, it features advanced cyber-sec cryptokey bindings and robust backup replication.',
      tr: 'GridMaster OS, şebeke operatörleri için tasarlanmış endüstriyel sınıf süpervizörlük platformudur. Dijital rölelerden milisaniyenin altında telemetri akışı sağlar, senkronofazör PMU ölçümlerini ilişkilendirir ve akıllı şebeke yük atma otomasyonu sunar. Yüksek güvenlikli kriptografik kimlik bağları ve yedeklilik mimarileri ile donatılmıştır.'
    },
    category: 'grid',
    categoryLabel: {
      en: 'Grid Control',
      tr: 'Şebeke Kontrolü'
    },
    version: 'v4.2.0',
    rating: 4.9,
    reviewsCount: 142,
    developer: 'X Elektrik Grid Automation Labs',
    developerContact: 'automation-support@xelektrik.com',
    releaseDate: '2026-03-12',
    sha256: '8fce9e2365bd3df86a110a11a1200f865ae93108c9d4b067d2b271fbc0363ad4',
    iconName: 'grid',
    iconColor: 'from-[#0012FF] to-blue-600',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    platforms: [
      { name: 'Windows', fileSize: '142 MB', downloadUrl: 'GridMaster_OS_v4.2.0_x64.msi', badgeColor: 'bg-blue-500/10 text-blue-500', sha256: '8fce9e2365bd3df86a110a11a1200f865ae93108c9d4b067d2b271fbc0363ad4' },
      { name: 'macOS', fileSize: '136 MB', downloadUrl: 'GridMaster_OS_v4.2.0_ARM64.dmg', badgeColor: 'bg-indigo-500/10 text-indigo-500', sha256: 'be58c73ceb2539ff8be220f12fa23df5ca923108c9d1ab41c6d1a581e6eef5ee' },
      { name: 'Linux', fileSize: '158 MB', downloadUrl: 'GridMaster_OS_v4.2.0.AppImage', badgeColor: 'bg-neutral-500/10 text-neutral-500', sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { name: 'iOS', fileSize: '48 MB', downloadUrl: 'App Store Redirect', badgeColor: 'bg-[#0012FF]/10 text-[#0012FF]', sha256: 'a2f1b3e4f55a6d71b312ea99d0caee4ff6c8360183ca20d1c5aef34bdce82b13' }
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 Build 19045+ / macOS Monterey+ / Ubuntu 22.04 LTS',
        cpu: 'Intel Core i5 (8th Gen) or Apple M1 (8 Cores)',
        ram: '8 GB LPDDR4',
        storage: '500 MB Solid State Drive (SSD) space'
      },
      recommended: {
        os: 'Windows 11 Enterprise / macOS Sonoma / RHEL 9',
        cpu: 'Intel Xeon or AMD Ryzen 7 / Apple M2 Pro+ (12 Cores)',
        ram: '16 GB Dual-Channel DDR5',
        storage: '2 GB NVMe PCIe Gen4 SSD space',
        gpu: 'NVIDIA RTX-A2000 or Apple M2 GPU (dedicated 4GB VRAM)'
      }
    },
    installGuide: {
      en: [
        'Download the binary package suitable for your host OS platform.',
        'Run the setup executable with high administrative privileges.',
        'Import your corporate X Elektrik digital certificate keys when requested.',
        'Establish direct TCP/IP address mapping to your substation Gateway.'
      ],
      tr: [
        'Sunucu işletim sisteminize uygun dosya paketini indirin.',
        'Kurulum dosyasını yönetici ayrıcalıkları ile çalıştırın.',
        'Sorulduğunda kurumsal X Elektrik dijital sertifika anahtarlarınızı yükleyin.',
        'Trafo merkezi ağ geçidinize erişmek için TCP/IP adres tanımlamalarını yapın.'
      ]
    },
    faqs: [
      {
        question: 'Does GridMaster OS support international IEC 61850 protocol standards?',
        answer: 'Yes, GridMaster OS is fully compliant with IEC 61850 (Edition 2.1) including GOOSE rapid messaging and SV stream architectures.'
      },
      {
        question: 'How is data encrypted in transit?',
        answer: 'All peer transmissions are hardened using TLS 1.3 with AES-GCM-256 state encryption and SHA-512 authentication signatures.'
      }
    ],
    changelog: [
      {
        version: 'v4.2.0',
        date: '2026-03-12',
        type: 'feature',
        changes: [
          'Added real-time GOOSE messaging diagnostic console panels.',
          'Enhanced memory optimization for high telemetry traffic from relays.',
          'Upgraded certificate authentication binding to standard SHA-256 chains.'
        ]
      },
      {
        version: 'v4.1.8',
        date: '2025-11-05',
        type: 'fix',
        changes: [
          'Resolved an issue with secondary interface connection timeouts on specific RTU devices.',
          'Corrected waveform phase offset display discrepancy in dark visualization theme.'
        ]
      }
    ],
    releaseNotes: {
      en: 'This major release features the updated Substation Telemetry Pipeline engine. Real-time GOOSE and Sampled Values monitoring screens have been integrated with low-latency GPU graphing.',
      tr: 'Bu sürüm, güncellenmiş Şebeke Telemetri Sürüş motorunu içerir. Gerçek zamanlı GOOSE ve Örneklenmiş Değerler (Sampled Values) izleme ekranları düşük gecikmeli grafikler ile entegre edilmiştir.'
    }
  },
  {
    id: 'powerflow-sim',
    name: 'PowerFlow SIM',
    shortDesc: {
      en: 'State estimation and high-voltage transmission load flow simulation engine.',
      tr: 'Durum tahmini ve yüksek gerilim iletim yük akışı simülasyon motoru.'
    },
    longDesc: {
      en: 'PowerFlow SIM empowers transmission grid planners to forecast and simulate network loads with incredible mathematical fidelity limit. Execute Newton-Raphson, Gauss-Seidel, and Fast-Decoupled power flows seamlessly. Model infinite active generators, buses, transformer phase shifters, and shunt capacitors under varying meteorological contingency matrices.',
      tr: 'PowerFlow SIM, yüksek gerilim iletim şebekesi planlayıcılarının yüksek matematiksel hassasiyette yük akışı simülasyonları yapmasını sağlar. Newton-Raphson, Gauss-Seidel ve Hızlı Ayrıştırılmış (Fast-Decoupled) güç akışı analizlerini saniyeler içinde çalıştırın.'
    },
    category: 'analysis',
    categoryLabel: {
      en: 'Analysis & Simulation',
      tr: 'Analiz & Simülasyon'
    },
    version: 'v3.1.2',
    rating: 4.8,
    reviewsCount: 96,
    developer: 'X Elektrik Scientific Analysis Group',
    developerContact: 'scientific-support@xelektrik.com',
    releaseDate: '2026-01-20',
    sha256: '9cbdf826da0a3fac8c234aeeee77129fbc8bc0363ad48e9d2b271abcde0364d2',
    iconName: 'power',
    iconColor: 'from-amber-500 to-orange-600',
    screenshots: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    platforms: [
      { name: 'Windows', fileSize: '280 MB', downloadUrl: 'PowerFlow_SIM_Setup_v3.1.2.exe', badgeColor: 'bg-blue-500/10 text-blue-500', sha256: '9cbdf826da0a3fac8c234aeeee77129fbc8bc0363ad48e9d2b271abcde0364d2' },
      { name: 'macOS', fileSize: '264 MB', downloadUrl: 'PowerFlow_SIM_Mac_v3.1.2.pkg', badgeColor: 'bg-indigo-500/10 text-indigo-500', sha256: 'fd826ca0a3fac8c234aeeee77129fbc8bc0363ad48e9d2b271abcde0364d2df41' }
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 x64 / macOS Ventura',
        cpu: 'Intel Core i7 (6 cores) or Apple M1',
        ram: '16 GB DDR4',
        storage: '800 MB SSD space'
      },
      recommended: {
        os: 'Windows 11 Pro / macOS Sonoma',
        cpu: 'AMD Ryzen 9 or Intel Core i9 (16 Cores+) / Apple M3 Max',
        ram: '32 GB DDR5',
        storage: '2 GB Ultra-Speed NVMe, with active cache files enabled',
        gpu: 'DirectX 12 support, NVIDIA RTX-4070 or better with 8GB dedicated VRAM'
      }
    },
    installGuide: {
      en: [
        'Extract all contents of the installer package or launch the MSI workflow.',
        'Complete the graphical steps setting preferred CAD/BIM directory roots.',
        'Authorize floating network license keys using the local license server manager.'
      ],
      tr: [
        'Yükleyici paketini klasöre çıkarın veya MSI kurulum dosyasını başlatın.',
        'CAD/BIM kök dizinlerinizi belirtecek şekilde grafik pencerelerini tamamlayın.',
        'Yerel lisans yöneticinizi kullanarak yüzer kurumsal ağ lisansınızı onaylayın.'
      ]
    },
    faqs: [
      {
        question: 'Does this simulate solar and wind generation curves fluctuations?',
        answer: 'Yes, it incorporates standard IEEE weather contingency models allowing you to upload CSV load-generation forecasting datasets.'
      }
    ],
    changelog: [
      {
        version: 'v3.1.2',
        date: '2026-01-20',
        type: 'performance',
        changes: [
          'Overhauled calculations with multicore parallel loops, cutting Newton-Raphson completion times by 45%.',
          'Updated standard CAD-DXF schema imports validation.'
        ]
      }
    ],
    releaseNotes: {
      en: 'This release includes active performance improvements utilizing multi-threaded parallel execution grids for matrix algorithms.',
      tr: 'Bu sürüm, çok kaynaklı paralel matris algoritma hesaplamalarında %45 işlem gücü verimliliği ve performans artışı sağlar.'
    }
  },
  {
    id: 'voltguard-fleet',
    name: 'VoltGuard Fleet',
    shortDesc: {
      en: 'Fleet telemetrics and battery thermal safety monitoring for large-scale energy storage.',
      tr: 'Büyük ölçekli şebeke bataryaları için telemetrik ve termal güvenlik takibi uygulaması.'
    },
    longDesc: {
      en: 'VoltGuard Fleet provides comprehensive mobile-optimized dashboard telemetry for grid-connected battery structures, static VAR setups, and virtual power plants. Track state-of-charge (SoC), thermal variance indexes, battery health indices (SoH), and isolate cooling ventilation anomalies in the palm of your hand. Get immediate push alerts during critical heat thresholds.',
      tr: 'VoltGuard Fleet, şebeke ölçeğindeki lityum ve sodyum batarya parkları için mobil uyumlu izleme arayüzüdür. Batarya şarj seviyelerini (SoC), termal dalgalanmaları ve sağlık indekslerini (SoH) anlık olarak uzaktan takip edin.'
    },
    category: 'monitoring',
    categoryLabel: {
      en: 'Monitoring & IoT',
      tr: 'İzleme & IoT'
    },
    version: 'v1.8.5',
    rating: 4.7,
    reviewsCount: 56,
    developer: 'X Elektrik Battery Solutions Group',
    developerContact: 'battery-fleet@xelektrik.com',
    releaseDate: '2026-02-05',
    sha256: 'a99db32bc00afbde12bc4cc9310de402df93108c9d4b067d2b271fbc03631f45',
    iconName: 'battery',
    iconColor: 'from-emerald-500 to-teal-600',
    screenshots: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    ],
    platforms: [
      { name: 'iOS', fileSize: '52 MB', downloadUrl: 'Redirecting to Apple App Store', badgeColor: 'bg-[#0012FF]/10 text-[#0012FF]', sha256: 'a99db32bc00afbde12bc4cc9310de402df93108c9d4b067d2b271fbc03631f45' },
      { name: 'Android', fileSize: '56 MB', downloadUrl: 'VoltGuard_Fleet_v1.8.5.apk', badgeColor: 'bg-emerald-500/10 text-emerald-500', sha256: 'd1a581e6eef5eefe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495' },
      { name: 'Web', fileSize: 'Instant App', downloadUrl: 'https://fleet.xelektrik.com', badgeColor: 'bg-teal-500/10 text-teal-500', sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
    ],
    systemRequirements: {
      minimum: {
        os: 'iOS 15.0+ / Android 9.0+ / Modern Web Browser (WebAssembly support)',
        cpu: 'Qualcomm Snapdragon 680 / Apple A12 Bionic',
        ram: '4 GB',
        storage: '100 MB cached offline storage space available'
      },
      recommended: {
        os: 'iOS 17.0+ / Android 13.0+',
        cpu: 'Qualcomm Snapdragon 8 Gen 1+ / Apple A16 Bionic or newer',
        ram: '6 GB+',
        storage: '250 MB'
      }
    },
    installGuide: {
      en: [
        'Secure Android app downloads through the standalone APK portal or official Play Store links.',
        'Approve camera/location frame permissions when requested to decode container QR codes.'
      ],
      tr: [
        'APK dosyasını indirerek doğrudan kurun veya yetkili market uygulamaları üzerinden aratarak yükleyin.',
        'Saha konteyner karekodlarını taratmak için istendiğinde kamera ve konum izinlerini verin.'
      ]
    },
    faqs: [
      {
        question: 'Does this app run offline inside high-attenuation sub-ground shielding rooms?',
        answer: 'Yes! Features offline state synchronization cache. It saves state metrics locally and publishes updates as soon as telemetry networks are active.'
      }
    ],
    changelog: [
      {
        version: 'v1.8.5',
        date: '2026-02-05',
        type: 'security',
        changes: [
          'Upgraded secure QR code encoder firmware validation chains.',
          'Enhanced encryption of persistent biometric auth keys on mobile devices.'
        ]
      }
    ],
    releaseNotes: {
      en: 'Provides advanced notification integration and remote battery module health telemetry filters.',
      tr: 'Batarya hücresi bazında detaylı termal gradyan raporlama grafiklerini ve filtrelerini içerir.'
    }
  }
];

export const reviewsData: Record<string, Review[]> = {
  'gridmaster-os': [
    {
      id: 'rev-1',
      author: 'Marcus Vance',
      role: 'Lead Grid Operator at National Grid Ireland',
      rating: 5,
      date: '2026-04-18',
      title: 'Flawless Substation GOOSE Telemetry Integration',
      comment: 'Implementing GridMaster OS transformed our grid response speed. The integration of high-fidelity telemetry allows active visual confirmation in less than 2 milliseconds. High level cyber-security compliance gives us ultimate grid system peace of mind.',
      helpfulCount: 42
    },
    {
      id: 'rev-2',
      author: 'Dr. Ayşe Yılmaz',
      role: 'Head of Automation, Power-Gen Turkey',
      rating: 4,
      date: '2026-03-29',
      title: 'Strong IEEE Conformity, Outstanding Performance',
      comment: 'Extremely powerful layout. We map PMU synchronization data seamlessly. Only downside is that the administrative initial setup requires specialized certificates, but the active security benefits far outweigh the setup friction.',
      helpfulCount: 19
    }
  ],
  'powerflow-sim': [
    {
      id: 'pfs-rev-1',
      author: 'Jonathan Thorne',
      role: 'Principal Transmission Planner, High-Volt Consortium',
      rating: 5,
      date: '2026-02-28',
      title: 'Incredible speed boost for matrix simulations',
      comment: 'Overhauling calculation pipelines for multi-core processors saves hours during bulk contingency planning loops. The Newton-Raphson convergence rates are incredibly stable.',
      helpfulCount: 28
    }
  ],
  'voltguard-fleet': [
    {
      id: 'vg-rev-1',
      author: 'Sarah Jenkins',
      role: 'VPP Fleet Integration Manager',
      rating: 5,
      date: '2026-03-10',
      title: 'Indispensable tool for real-time field operations',
      comment: 'We use VoltGuard for localized thermal inspection checks. The automatic push notifications saved our test cell from overheating during a grid peak test.',
      helpfulCount: 15
    }
  ]
};
