/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsItem {
  id: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  specs?: { label: string; value: string }[];
}

export const NewsDatabase: Record<'en' | 'tr', NewsItem[]> = {
  en: [
    {
      id: 'news-1',
      date: 'May 12, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      category: 'GRID AUTOMATION',
      title: 'X Elektrik Commissions 5MWh Battery Energy Storage (BESS) Station in Zurich',
      summary: 'Our engineering crew successfully energized a critical peak-shaving unit for Zurich Innovation Park, featuring active liquid cooling cycles and microvolt harmonics filtering.',
      content: 'We are proud to announce the successful grid integration and hot commissioning of our custom 5MWh containerized battery energy storage system (BESS) at the Zurich Innovation Park. Constructed with N+1 thermal loop redundancy and safety active-interlocks, this system mitigates local peak demand spikes by up to 35% and injects stabilized reactive current within milliseconds of signal detection. Backed by our zero-incident safety protocols, the station represents a major step forward in regional microgrid independence.',
      specs: [
        { label: 'BATTERY CELL TYPE', value: 'High-Density Lithium Iron Phosphate (LFP)' },
        { label: 'PEAK CAPACITY', value: '5.2 Megawatt-hours (MWh)' },
        { label: 'GRID FEED VOLTAGE', value: '11 kilovolts (kV) nominal' },
        { label: 'TRIR EMISSION SAFETY STATUS', value: '0.00 Certified Uptime' }
      ]
    },
    {
      id: 'news-2',
      date: 'April 28, 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      category: 'DATACENTER INFRASTRUCTURE',
      title: 'Dublin Hyperscale Datacenter expansion achieves zero-disturbance milestone',
      summary: 'Using double-feed ATS designs and static continuous-feed UPS couplers, X Elektrik finishes installing 40 medium-voltage switchgear rows ahead of schedule.',
      content: 'In collaboration with global datacenter operators, our heavy engineering division successfully delivered 40 custom-engineered digital switchgears to the newly built Dublin Phase III Hyperscale Hub. To meet rigorous tier-IV redundancy standards, our system uses vacuum circuit breakers rated for 40kA short-circuit interrupts. The installation was fully assembled and certified in our specialized facility, eliminating field wiring errors and achieving zero-disturbance during the final dual-path hot cutover.',
      specs: [
        { label: 'PANEL QUANTITY', value: '40 Continuous Medium Voltage Switchgear panels' },
        { label: 'COOPER RELAY LATENCY', value: 'Under 12 milliseconds' },
        { label: 'INTERLOCK INTEGRITY', value: 'Mechanical & Solenoid Quadruple configuration' }
      ]
    },
    {
      id: 'news-3',
      date: 'March 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      category: 'RENEWABLE INTEGRATION',
      title: 'Aegean Wind Pipeline integrated with smart substation transformers',
      summary: 'Connecting deep maritime wind farms directly into high-voltage distribution networks utilizing modular substation blocks and real-time gas monitoring.',
      content: 'Connecting wind turbines to local utility lines requires reliable, high-performance physical transformers. X Elektrik commissioned three hermetical grid transformers designed to step-up fluctuating maritime wind output to 154kV. Equipped with continuous opto-isolated gas monitoring and intelligent telemetry relays, these substations feed clean wind energy into the national grid while protecting against sudden harmonic disturbances.',
      specs: [
        { label: 'TOTAL TRANSFORMER LOAD', value: '120 Megavolt-Amperes (MVA)' },
        { label: 'NOMINAL COUPLING', value: '34.5kV to 154kV Step-Up' },
        { label: 'MONITORING FREQUENCY', value: 'Real-time telemetry at 50Hz' }
      ]
    },
    {
      id: 'news-4',
      date: 'February 10, 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
      category: 'CORPORATE AWARDS',
      title: 'X Elektrik Achieves 10 Consecutive Years of 0.00 TRIR Safety Rating',
      summary: 'The International Heavy Electrical Safety Council recognizes our zero-accident policy across Dublin, Zurich, and Istanbul offices.',
      content: 'Safety is not just a metric for us—it is an absolute corporate priority. The International Heavy Electrical Safety Council has officially recognized X Elektrik for achieving a perfect 0.00 Total Recordable Incident Rate (TRIR) for ten consecutive years. Across all high-voltage operations, off-site testing, and grid substation sites, our crew has maintained zero accidents through strict safety checklists, predictive hazard identification, and certified protective equipment.',
      specs: [
        { label: 'TRIR SAFETY INDEX', value: '0.00 Certified Zero-Injury' },
        { label: 'CUMULATIVE SITE HOURS', value: 'Over 1,200,000 field operation hours' },
        { label: 'TRAINING FREQUENCY', value: 'Biweekly certified electrical safety labs' }
      ]
    },
    {
      id: 'news-5',
      date: 'January 18, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
      category: 'PRODUCT RELEASE',
      title: 'Next-Generation Dry-Type Cast Resin Transformers Launched',
      summary: 'Engineered specifically for hazardous indoor spaces, our cast resin line eliminates oil explosion hazards while offering high thermal endurance.',
      content: 'For highly populated urban centers and underground infrastructure, liquid oil transformers present a safety hazard. To address this, X Elektrik has commercialized a new series of premium dry-type cast resin transformers. Sealed of self-extinguishing epoxy compounds, these transformers operate safely with zero fluid leak hazards, making them ideal for high-rise commercial structures and underground subway lines.',
      specs: [
        { label: 'INSULATION TEMPERATURE CLASS', value: 'Class H (180°C limit)' },
        { label: 'EXPLOSION RATING', value: 'F1 Self-Extinguishing Non-Explosive' },
        { label: 'IP ENCLOSURE PROTECTION', value: 'IP31 / IP44 Ventilated Options' }
      ]
    },
    {
      id: 'news-6',
      date: 'December 05, 2025',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      category: 'GRID R&D',
      title: 'Smart Grid Telemetry collaboration announced with Dublin Engineering Institute',
      summary: 'Deploying high-frequency digital sensors across city grids to monitor real-time cable degradation and detect insulation failures before they occur.',
      content: 'We are excited to share our latest collaboration with the Dublin Engineering Institute (DEI) on a smart grid monitoring pilot project. The project focuses on deploying high-frequency line sensors directly onto distribution lines. These intelligent nodes monitor electrical discharge levels and heat anomalies, enabling grid operators to locate insulation wear before a physical fault can occur.',
      specs: [
        { label: 'PROJECT FOCUS', value: 'Predictive Grid Cable Insulation Wear Analysis' },
        { label: 'SENSOR POOL', value: '250 High-Frequency Telemetry Transducers' },
        { label: 'PREDICTION RATE', value: 'Up to 92% accuracy on pending faults' }
      ]
    }
  ],
  tr: [
    {
      id: 'news-1',
      date: '12 Mayıs 2026',
      readTime: '4 dk okuma',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      category: 'ŞEBEKE OTOMASYONU',
      title: 'X Elektrik, Zürih’te 5MWh Akıllı Bataryalı Depolama (BESS) İstasyonunu Devreye Aldı',
      summary: 'Mühendislik ekibimiz, Zürih Teknoloji Parkı için aktif sıvı soğutmalı ve mikro saniye tepkili akıllı peak-shaving (tepe yükü tıraşlama) sistemini devreye soktu.',
      content: 'Zürih İnovasyon Parkı’na hizmet veren 5MWh bataryalı enerji depolama ünitemizin (BESS) montaj ve test çalışmalarının başarıyla tamamlandığını duyurmaktan mutluluk duyarız. N+1 yedekli sıvı soğutma teknolojisi ve akıllı koruma devreleriyle donatılmış bu sistem, tesisteki yüksek pik talepleri %35’e varan oranda dengeler. İstasyon tesis genelinde temiz, kesintisiz ve şebeke uyumlu enerji akışını güvenceye almaktadır.',
      specs: [
        { label: 'BATARYA TİPİ', value: 'Yüksek Yoğunluklu Lityum Demir Fosfat (LFP)' },
        { label: 'MAKSİMUM KAPASİTE', value: '5.2 Megavat-saat (MWh)' },
        { label: 'BAĞLANTI VOLTAJI', value: '11 kilovolt (kV) Şebeke Uyumlu' },
        { label: 'GÜVENLİK PROTOKOLÜ STATUSÜ', value: 'Sıfır Hata ve Emniyet Tasarımlı' }
      ]
    },
    {
      id: 'news-2',
      date: '28 Nisan 2026',
      readTime: '3 dk okuma',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      category: 'VERİ MERKEZİ ALTYAPISI',
      title: 'Dublin Veri Merkezi OG Dağıtım Genişletme Projesi Sıfır Kesintiyle Tamamlandı',
      summary: 'Çift beslemeli ATS sistemleri ve statik UPS transfer ünitelerini kullanan X Elektrik, 40 adet orta gerilim hücre montajını vaktinden önce teslim etti.',
      content: 'Küresel bir veri merkezi operatörüyle yürüttüğümüz ortaklık kapsamında, Dublin Dağıtım Merkezi Faz III alanına özel imalatımız olan 40 adet orta gerilim hücresini başarıyla teslim ettik. Tier-IV hatasızlık ve kesintisiz yedekleme standartlarına uyum sağlamak üzere üretilen sistemimiz, dual-path (çift hat) devreye alma esnasında şebekede tek bir mikro saniyelik kesinti dahi oluşturmadan devreye girmiştir.',
      specs: [
        { label: 'PANO ADETİ', value: '40 Göz Hücre Tipi OG Şalt Paneli' },
        { label: 'TRANSFER GECİKMESİ', value: '12 milisaniyenin altında otomatik geçiş' },
        { label: 'Mekanik Kilitleme', value: 'Yüksek emniyetli mekanik ve solenoid kilitler' }
      ]
    },
    {
      id: 'news-3',
      date: '15 Mart 2026',
      readTime: '5 dk okuma',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      category: 'YENİLENEBİLİR ENERJİ',
      title: 'Ege Deniz Üstü Rüzgar Enerji Santrali, Akıllı Trafo İstasyonumuzla Şebekeye Bağlandı',
      summary: 'Deniz üstündeki rüzgar gücünü doğrudan yüksek gerilim iletim ağına bağlayan mobil trafo istasyonu modüllerimiz devreye alındı.',
      content: 'Rüzgar gücünün stabil bir biçimde hatlara beslenmesi, yüksek kaliteli gerilim düzenleme aşamaları gerektirir. X Elektrik tarafından üretilen üç adet hermetik grid trafo ünitesi rüzgar türbin yükünü 154kV iletim hattına taşımak üzere tasarlandı. Gazlı izleme röleleri ve akıllı sensörler sayesinde, şebeke ani frekans dalgalanmalarından tamamen korunuyor.',
      specs: [
        { label: 'TOPLAM TRAFO GÜCÜ', value: '120 Megavolt-Amper (MVA)' },
        { label: 'DAĞITIM SEVİYESİ', value: '34.5kV voltajından 154kV seviyesine yükseltim' },
        { label: 'İZLEME FREKANSI', value: '50Hz anlık yüksek hassasiyetli veri akışı' }
      ]
    },
    {
      id: 'news-4',
      date: '10 Şubat 2026',
      readTime: '3 dk okuma',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
      category: 'KURUMSAL ÖDÜLLER',
      title: 'X Elektrik, Üst Üste 10. Yılda da %0.00 TRIR İş Güvenliği Rekorunu Tazeledi',
      summary: 'Uluslararası Ağır Sanayi Güvenlik Konseyi; Dublin, Zürih ve İstanbul sahalarındaki sıfır kaza politikamızı ödüllendirdi.',
      content: 'Bizim için iş güvenliği bir sayısal veriden daha fazlasıdır; kurumsal varoluş amacımızdır. Uluslararası Ağır Sanayi Güvenlik Konseyi, X Elektrik personeli ve alt yüklenicilerinin şantiyelerde geçirdiği tüm operasyonel saatlerde sıfır iş kazası rekorunu (TRIR 0.00) 10. yılında da mükemmel bir uyumla tescilledi. Çalışanlarımızın yüksek gerilim altındaki üstün emniyet kültürü bu başarıyı doğurmuştur.',
      specs: [
        { label: 'İŞ GÜVENLİĞİ ENDEKSİ', value: '0.00 TRIR (Kusursuz Emniyet)' },
        { label: 'TOPLAM SAHA SAATİ', value: '1,200,000 saatin üzerinde aktif saha çalışması' },
        { label: 'EĞİTİM PERİYODU', value: 'İki haftada bir yenilenen zorunlu İSG laboratuvarları' }
      ]
    },
    {
      id: 'news-5',
      date: '18 Ocak 2026',
      readTime: '4 dk okuma',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
      category: 'YENİ ÜRÜN TANITIMI',
      title: 'Yeni Nesil Kuru Tip Kuru Reçineli Cast Trafo Serisi Satışa Sunuldu',
      summary: 'Binaların iç mekanları ve metro tünelleri için tasarlanan kuru reçineli trafolarımız, yağ sızıntısı ve yangın riskini sıfıra indiriyor.',
      content: 'Şehir merkezleri ve metro hatları gibi hassas yaşam alanlarında yağlı tip trafoların kullanılması yangın riskleri doğurur. X Elektrik, bu sorunun önüne geçmek amacıyla tamamen kendinden sönümlü epoksi gövdeli kuru reçineli cast trafoları ticarileştirdi. Bu trafolar üstün sismik dayanıklılık özellikleri de sunmaktadır.',
      specs: [
        { label: 'YALITIM SICAKLIK SINIFI', value: 'H Sınıfı (180°C limit dayanımı)' },
        { label: 'YANGIN SINIFI', value: 'F1 Kendinden Sönümlü Patlamaz Gövde' },
        { label: 'KORUMA SINIFI', value: 'IP31 ve IP44 Fan Soğutmalı Kabin Seçenekleri' }
      ]
    },
    {
      id: 'news-6',
      date: '05 Aralık 2025',
      readTime: '3 dk okuma',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      category: 'ŞEBEKE AR-GE',
      title: 'İrlanda Ulusal Elektrik Enstitüsü ile Ortak Akıllı Şebeke Projesi Başlatıldı',
      summary: 'Kablolardaki aşınmaları ve iç yalıtım kaçaklarını, arıza oluşmadan saniyeler önce tespit eden yeni dijital sensörlerimizi sahaya sürüyoruz.',
      content: 'İrlanda Ulusal Elektrik Enstitüsü ile birlikte yürüteceğimiz pilot akıllı şebeke izleme projesini resmi olarak hayata geçirdik. Bu çalışma kapsamda yüksek duyarlılıklı 250 adet sensör terminali sisteme entegre edilecektir. Sensörlerden gelen veriler, sahada oluşabilecek yalıtım kaçakları ve fiziksel yıpranmaları saniyeler içinde şebeke kontrol merkezine raporlamaktadır.',
      specs: [
        { label: 'PROJE ODAĞI', value: 'Öngörücü Kablo ve Hücre Aşınma Analizi' },
        { label: 'SENSÖR KAPASİTESİ', value: '250 Adet Yüksek Frekans Akımı Algılayıcısı' },
        { label: 'TAHMİN DOĞRULUĞU', value: '%92ye varan erken hata tespit oranı' }
      ]
    }
  ]
};
