export interface MetaTagSet {
  title: string;
  description: string;
  keywords: string;
}

export const seoMetadata: Record<string, MetaTagSet> = {
  'home': {
    title: "X Elektrik | Heavy-Duty Electrical Engineering & Grid Automation",
    description: "X Elektrik is a premium electrical contracting and heavy industrial power distribution engineer. Partnering with data centers, high-voltage networks, and green infrastructure.",
    keywords: "electrical engineering, grid automation, heavy voltage, power distribution, energy systems"
  },
  'services': {
    title: "X-Services Engineering | High-Tension Substation & Grid Commissioning",
    description: "Our world-class electrical contracting services cover medium to high-voltage grid integrations, BIM-clash prevention, substation assembly, and advanced safety interlocks.",
    keywords: "substation engineering, grid commissioning, BIM engineering, high voltage"
  },
  'products': {
    title: "X-Products Showcase | Medium Voltage Switchgear & MegaPack BESS Solutions",
    description: "Explore our ready-to-deploy industrial grid solutions, including custom XE-MVS Switchgear, Tesla MegaPack grid-scale batteries, dynamic ATS, and high-power EV chargers.",
    keywords: "medium voltage switchgear, battery energy storage systems, BESS, automatic transfer switch"
  },
  'estimator': {
    title: "X-Estimator | SmartGrid Project Cost & Asset Configurator",
    description: "Get real-time electrical engineering project cost estimates. Configure load currents, voltage steps, auxiliary safety integrations, and get instant timeline quotes.",
    keywords: "electrical project estimator, industrial power calculator, grid cost configured"
  },
  'portfolio': {
    title: "X-Portfolio | High-Fidelity Infrastructure Engineering Case Studies",
    description: "Explore our successful projects including the hyperscale Dublin Datacenter Backup Integration, Solar Array Grid stabilizing in Turkey, and complex grid-interlock operations.",
    keywords: "datacenter electrification, green energy microgrid, engineering case studies"
  },
  'blog': {
    title: "X-Insights Blog | Power Grid Security, BIM Engineering & IEEE Standards",
    description: "Stay ahead of the industry with advanced articles about double-feed ATS designs, electromagnetic interference safety, substation operations, and BIM modeling standards.",
    keywords: "substation safety, BIM clashing, IEEE compliance, grid security"
  },
  'about': {
    title: "About X Elektrik | Global Heavy Infrastructure Leaders Since 1998",
    description: "Driven by rigorous engineering standards, X Elektrik empowers critical industries with redundant power flows and zero-fault high-voltage transmission structures.",
    keywords: "electrical contracting firm, redundant power systems, heavy traction leaders"
  },
  'careers': {
    title: "Careers at X Elektrik | Shape the Next-Generation High-Voltage Grid",
    description: "Join our elite engineering force. We are recruiting lead protection engineers, BIM designers, commissioning experts, and field technicians with top tier compensation packages.",
    keywords: "electrical engineering jobs, BIM modeler careers, high voltage technician recruitment"
  },
  'contact': {
    title: "Contact X Elektrik | High-Tension Engineering Submissions & RFP",
    description: "Initiate your high-capacity grid configuration or RFP with us. Speak with our lead project engineers for data-center, renewable hub, and traction projects.",
    keywords: "electrical RFP, heavy power contact, grid connection consultation"
  },
  'support': {
    title: "X-Support Help Center | 24/7 Grid Diagnostics & Telemetry Assistance",
    description: "Query our authenticated high-voltage knowledge base, execute step-by-step telemetry troubleshooting guides, and log instant technical service tickets in real-time.",
    keywords: "help desk, electrical troubleshooting, grid diagnostics, support ticket, live chat"
  },
  'documents': {
    title: "Engineering Blueprints & Documentation | X Elektrik Technical Assets",
    description: "Download certified electrical schematics, Revit family models, compliance certificates, and IEEE grid integration papers for our complete product suite.",
    keywords: "revit families electrical, IEEE compliance documentation, switchgear specifications"
  },
  'app-center': {
    title: "Digital App Center & Operations Terminal | X Elektrik Suite",
    description: "Deploy and manage utility grid controllers, transmission flow simulation tools, and real-time battery pack heat diagnostics locally.",
    keywords: "substation utilities, grid simulator download, electrical fleet monitor"
  },
  'iot': {
    title: "X-IoT Active Grid Control Center | Telemetry & Waveform Diagnostics",
    description: "Monitor real-time high-tension grid telemetry, harmonic distortions (THD), automatic phase alignment, and remote liquid-cooled BESS discharging metrics live.",
    keywords: "industrial iot grid, utility telemetry, power factor optimization, SCADA harmonics"
  },
  'products-prod-mvs': {
    title: "XE-MVS Switchgear (13.8kV, 1200A) | Medium Voltage Metal-Clad Hardware",
    description: "Full technical specifications of XE-MVS Switchgear. IEC 62271-200 arc-resistant design featuring vacuum circuit breakers for heavy industrial and substation power lines.",
    keywords: "medium voltage switchgear, metal clad switchgear, vacuum breakers, substation hardware"
  },
  'products-prod-megapack': {
    title: "5.0 MWh Tesla MegaPack BESS | Utility-Scale Liquid-Cooled Storage",
    description: "Explore specifications of our 5.0 Megawatt-hour MegaPack battery installations. Features 1C billing dispatcher peak-shaving, double fire barriers, and active cooling.",
    keywords: "tesla megapack, battery energy storage, BESS, peak shaving microgrid, liquid cooled battery"
  },
  'products-prod-ats': {
    title: "Form-4 High-Transition Automatic Transfer Switch (ATS) | X Elektrik",
    description: "Read technical specs for our high-availability dual-feed ATS with transition latency under 4ms. Isolated Form 4 Type 7 busbars built for hyperscale datacenters.",
    keywords: "automatic transfer switch, ats transition, datacenter redundant power, Form 4 busbars"
  },
  'products-prod-charger': {
    title: "350kW DC Rapid Liquid-Cooled EV Charger | X Elektrik Grid Ready Stations",
    description: "Robust IP66-enclosed 350kW DC rapid battery chargers. Built-in power factor correction, dual CCS / NACS support, and gigabit monitoring telemetry.",
    keywords: "350kw dc charger, commercial ev station, liquid cooled dc charger, grid power correction"
  },
  'products-prod-bms': {
    title: "Smart BMS Modbus/BACnet Automation Panel | X Elektrik Commercial Controls",
    description: "Integrate BACnet/Modbus TCP/IP seamlessly. Digital automation panel for active load-shedding SCADA setups with a 10-inch high-contrast diagnostic display.",
    keywords: "building management automation, bms controller, bacnet automation, industrial scada panel"
  },
  'blog-art-1': {
    title: "Calculating 3-Phase Transformer Secondary Settings | X-Insights Blog",
    description: "A professional engineering analysis of winding impedance formulas, symmetrical short-circuit current limiters, and secondary phase protection coordination under IEEE standards.",
    keywords: "transformer calculation, symmetrical fault, impedance formulas, phase protection"
  },
  'blog-art-2': {
    title: "LOD 400 Coordination Protocols in Modern BIM | X-Insights Blog",
    description: "Solving space clashes, cable tray routing, and switchgear corridors layout within Autodesk Revit models before fabrication to minimize onsite construction delays.",
    keywords: "LOD 400 bim, revit clash detection, cable tray placement, switchboard access corridor"
  },
  'blog-art-3': {
    title: "N+1 Resilient Architectures for Hyperscale Datacenters | X-Insights Blog",
    description: "How high-availability double-feed ATS designs and static UPS buffers deliver zero-power disruption. Complete power riser redundancy analysis for mission critical systems.",
    keywords: "datacenter redundancy, N+1 power layout, double feed ATS, UPS battery buffers"
  },
  'press-kit': {
    title: "X-Media & Press Hub | Official Guidelines & Media Assets",
    description: "Access official vector logo suites, tech specs templates, and corporate boilerplate blocks for X Elektrik.",
    keywords: "press kit, media kit, corporate design assets, X Elektrik vector logos"
  },
  'branding': {
    title: "X-Branding Guidelines & Corporate Identity Standards",
    description: "Official design standards, responsive vector logo configurations, corporate font styles, and safety color values for X Elektrik heavy power engineering.",
    keywords: "branding guidelines, color palette, design system, corporate typography standards"
  },
  'news': {
    title: "X Elektrik News & Grid Engineering Updates",
    description: "Read about our latest 5MWh LFP BESS microgrid commissionings, datacenter substation expansions, and zero accident safety records.",
    keywords: "news feed, energy news, grid engineering, battery storage, high voltage substations"
  }
};

export function getRouteKey(pathname: string): string {
  const cleanUrl = pathname.split('?')[0].toLowerCase();
  
  if (cleanUrl === '/' || cleanUrl === '/home' || cleanUrl === '') {
    return 'home';
  }
  if (cleanUrl.startsWith('/services')) {
    return 'services';
  }
  if (cleanUrl.startsWith('/products/details/')) {
    const id = cleanUrl.substring('/products/details/'.length);
    return `products-${id}`;
  }
  if (cleanUrl.startsWith('/products/')) {
    const id = cleanUrl.substring('/products/'.length);
    if (id && id !== 'c' && id !== 'p') {
      return `products-${id}`;
    }
  }
  if (cleanUrl.startsWith('/products')) {
    return 'products';
  }
  if (cleanUrl.startsWith('/estimator')) {
    return 'estimator';
  }
  if (cleanUrl.startsWith('/portfolio')) {
    return 'portfolio';
  }
  if (cleanUrl.startsWith('/blog/article/')) {
    const id = cleanUrl.substring('/blog/article/'.length);
    return `blog-${id}`;
  }
  if (cleanUrl.startsWith('/blog')) {
    return 'blog';
  }
  if (cleanUrl.startsWith('/about')) {
    return 'about';
  }
  if (cleanUrl.startsWith('/careers')) {
    return 'careers';
  }
  if (cleanUrl.startsWith('/contact')) {
    return 'contact';
  }
  if (cleanUrl.startsWith('/support')) {
    return 'support';
  }
  if (cleanUrl.startsWith('/documents')) {
    return 'documents';
  }
  if (cleanUrl.startsWith('/app-center')) {
    return 'app-center';
  }
  if (cleanUrl.startsWith('/press-kit')) {
    return 'press-kit';
  }
  if (cleanUrl.startsWith('/branding')) {
    return 'branding';
  }
  if (cleanUrl.startsWith('/news')) {
    return 'news';
  }
  if (cleanUrl.startsWith('/iot')) {
    return 'iot';
  }
  
  return 'home';
}
