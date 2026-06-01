import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { seoMetadata, getRouteKey } from './src/data/seoMetadata';

// Determine root directory equivalents for ES module and CommonJS bundle formats
const getDirname = () => {
  try {
    return __dirname;
  } catch {
    return path.dirname(fileURLToPath(import.meta.url));
  }
};
const dirPath = getDirname();

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

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

// Memory database for persistent state during server runtime
const db = {
  inquiries: [
    {
      id: "RFP-9407",
      clientName: "Vertiv Systems Ltd",
      clientEmail: "bids@vertiv.com",
      clientPhone: "+353 1 450 9400",
      projectType: "datacenter",
      scaleSqFt: 45000,
      specs: "1200 A - 277/480V • Backup N+1 Power",
      estimatedCost: 3520000,
      timeline: "14 Weeks Estimated",
      timestamp: "Today at 02:44 AM"
    },
    {
      id: "RFP-9118",
      clientName: "BMW Logistics Hub",
      clientEmail: "infra@bmw.ie",
      clientPhone: "+353 21 430 9100",
      projectType: "renewable",
      scaleSqFt: 110000,
      specs: "400 A - 120/208V • Sustainable Microgrid",
      estimatedCost: 2189000,
      timeline: "11 Weeks Estimated",
      timestamp: "Yesterday"
    }
  ] as InquiryItem[],
  messages: [] as MessageItem[]
};

// Generates dynamic JSON-LD Structured Data Schema for high efficacy SEO
const getSchemaMarkup = (routeKey: string, meta: any, origin: string, url: string) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "X Elektrik",
    "url": origin,
    "logo": `${origin}/src/assets/images/mvs_switchgear_1779335480278.png`,
    "description": "High-fidelity digital experience for X Elektrik, a premium electrical construction and engineering firm specializing in complex commercial power, hyperscale data centers, and advanced grid automations."
  };

  if (routeKey === 'home') {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          ...baseSchema,
          "@type": "LocalBusiness",
          "telephone": "+353 1 902 4499",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Grand Canal Dock",
            "addressLocality": "Dublin",
            "addressCountry": "IE"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "X Elektrik",
          "url": origin,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${origin}/products?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };
  }

  if (routeKey.startsWith('products-prod-')) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": meta.title,
      "description": meta.description,
      "image": `${origin}/src/assets/images/mvs_switchgear_1779335480278.png`,
      "brand": {
        "@type": "Brand",
        "name": "X Elektrik Products"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "19500",
        "highPrice": "1150000",
        "offerCount": "5"
      }
    };
  }

  if (routeKey.startsWith('blog-art-')) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": meta.title,
      "description": meta.description,
      "author": {
        "@type": "Organization",
        "name": "X Elektrik Lead Protection Engineers"
      },
      "publisher": {
        "@type": "Organization",
        "name": "X Elektrik",
        "logo": {
          "@type": "ImageObject",
          "url": `${origin}/src/assets/images/mvs_switchgear_1779335480278.png`
        }
      },
      "datePublished": "2026-05-18",
      "mainEntityOfPage": `${origin}${url}`
    };
  }

  return baseSchema;
};

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Middlewares to support rich post payloads
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production, EXCLUDING index.html itself so SSR handles request
    const distPath = isProd ? dirPath : path.resolve(dirPath, 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  // Dynamic file-read helper matching dev and production targets
  const getStaticFilePath = (filename: string) => {
    const publicPath = path.resolve(isProd ? dirPath : path.resolve(dirPath, 'public'), filename);
    if (fs.existsSync(publicPath)) {
      return publicPath;
    }
    const rootPath = path.resolve(isProd ? path.dirname(dirPath) : dirPath, filename);
    if (fs.existsSync(rootPath)) {
      return rootPath;
    }
    return null;
  };

  // 1. DYNAMIC INTERCEPT: /sitemap.xml
  app.get('/sitemap.xml', (req, res) => {
    const sitemapFile = getStaticFilePath('sitemap.xml');
    if (!sitemapFile) {
      return res.status(404).send('Sitemap not found');
    }

    try {
      let content = fs.readFileSync(sitemapFile, 'utf-8');
      
      // Determine active dynamic origin equivalent
      const requestProto = req.headers['x-forwarded-proto'] || req.protocol;
      const requestHost = req.headers['x-forwarded-host'] || req.get('host');
      const origin = `${requestProto}://${requestHost}`;
      
      // Replace fallback hardcoded domain with host domain dynamically
      content = content.replace(/https:\/\/ais-pre-y[a-zA-Z0-9-]+\.europe-[a-z0-9-]+\.run\.app/g, origin);
      content = content.replace(/https:\/\/ais-pre-[a-zA-Z0-9-]+\.europe-[a-z0-9-]+\.run\.app/g, origin);
      content = content.replace(/https:\/\/ais-dev-[a-zA-Z0-9-]+\.europe-[a-z0-9-]+\.run\.app/g, origin);
      
      res.header('Content-Type', 'application/xml');
      return res.status(200).send(content);
    } catch (err: any) {
      console.error('Error serving sitemap.xml:', err);
      return res.status(500).send('Error loading sitemap');
    }
  });

  // 2. DYNAMIC INTERCEPT: /robots.txt
  app.get('/robots.txt', (req, res) => {
    const robotsFile = getStaticFilePath('robots.txt');
    if (!robotsFile) {
      return res.status(404).send('Robots.txt not found');
    }

    try {
      let content = fs.readFileSync(robotsFile, 'utf-8');
      
      const requestProto = req.headers['x-forwarded-proto'] || req.protocol;
      const requestHost = req.headers['x-forwarded-host'] || req.get('host');
      const origin = `${requestProto}://${requestHost}`;
      
      content = content.replace(/https:\/\/ais-pre-y[a-zA-Z0-9-]+\.europe-[a-z0-9-]+\.run\.app/g, origin);
      content = content.replace(/https:\/\/ais-pre-[a-zA-Z0-9-]+\.europe-[a-z0-9-]+\.run\.app/g, origin);
      content = content.replace(/https:\/\/ais-dev-[a-zA-Z0-9-]+\.europe-[a-z0-9-]+\.run\.app/g, origin);
      
      res.header('Content-Type', 'text/plain');
      return res.status(200).send(content);
    } catch (err: any) {
      console.error('Error serving robots.txt:', err);
      return res.status(500).send('Error loading robots');
    }
  });

  // 3. API RETRIEVE ENDPOINT: Get Inquiries
  app.get('/api/inquiries', (req, res) => {
    res.json({ inquiries: db.inquiries });
  });

  // 4. API POST ENDPOINT: Add Inquiry (RFP)
  app.post('/api/inquiries', (req, res) => {
    const { clientName, clientEmail, clientPhone, projectType, scaleSqFt, specs, estimatedCost, timeline } = req.body;
    
    if (!clientName || !clientEmail || !projectType) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const randomId = `RFP-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newInquiry: InquiryItem = {
      id: randomId,
      clientName,
      clientEmail,
      clientPhone,
      projectType,
      scaleSqFt: Number(scaleSqFt) || 12000,
      specs: specs || "Automatic Configuration",
      estimatedCost: Number(estimatedCost) || 250000,
      timeline: timeline || "8 Weeks Estimated",
      timestamp: `Today at ${nowStr}`,
      hasUserConfig: true
    };

    db.inquiries = [newInquiry, ...db.inquiries];
    res.status(201).json({ success: true, inquiries: db.inquiries, newInquiry });
  });

  // 5. API POST ENDPOINT: Contact Submissions
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newMessage: MessageItem = {
      id: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    db.messages.push(newMessage);
    console.log(`[Contact Submission] Saved message ${newMessage.id} from ${name}`);
    res.json({ success: true, messageId: newMessage.id, message: 'Your message has been logged.' });
  });

  // 6. API DISMISS INQUIRY ENDPOINT
  app.delete('/api/inquiries/:id', (req, res) => {
    const { id } = req.params;
    db.inquiries = db.inquiries.filter(item => item.id !== id);
    res.json({ success: true, inquiries: db.inquiries });
  });

  // 7. SSR Rendering support
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl.split('?')[0]; // strip query params
    
    // Skip file-like assets so express.static or vite can handle them
    if (url.includes('.') || url.startsWith('/api/') || url.startsWith('/@fs/')) {
      return next();
    }

    // Hybrid SSG Fallback: Serve static pre-rendered HTML files if they exist
    if (isProd) {
      const cleanRoute = url === '/' ? 'index' : url.substring(1);
      const staticHtmlPath = path.resolve(dirPath, `${cleanRoute}.html`);
      const staticDirHtmlPath = path.resolve(dirPath, cleanRoute, 'index.html');

      if (fs.existsSync(staticHtmlPath)) {
        return res.sendFile(staticHtmlPath);
      } else if (fs.existsSync(staticDirHtmlPath)) {
        return res.sendFile(staticDirHtmlPath);
      }
    }

    try {
      // 1. Read index.html template
      let template: string;
      let renderFn: (path: string, initialData?: any) => { html: string };

      if (!isProd) {
        // Dev: read template from root & transform using Vite compiled plugins/styles
        template = fs.readFileSync(path.resolve(dirPath, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        // Dev: load entry-server on the fly
        const serverModule = await vite.ssrLoadModule('/src/entry-server.tsx');
        renderFn = serverModule.render;
      } else {
        // Prod: read built template from dist/ (which is sibling to server.cjs as dirPath resolves to dist/)
        template = fs.readFileSync(path.resolve(dirPath, 'index.html'), 'utf-8');
        // Load the compiled SSR bundle from dist/entry-server.js
        const entryServerPath = pathToFileURL(path.resolve(dirPath, 'entry-server.js')).href;
        const serverModule = await import(entryServerPath);
        renderFn = serverModule.render;
      }

      // 2. Identify active route for SEO metadata lookup
      const routeKey = getRouteKey(url);
      const meta = seoMetadata[routeKey] || seoMetadata['home'];

      // Route data loader system to hydrate react states seamlessly
      const routeData: any = {
        inquiries: db.inquiries,
        activePath: url,
        routeKey: routeKey
      };

      // 3. Render the React App with injected initial server state
      const { html } = renderFn(url, routeData);

      // 4. Inject rendered HTML into template
      let htmlOutput = template.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`);

      // Determine canonical and og protocol, host, and full URLs
      const requestProto = req.headers['x-forwarded-proto'] || req.protocol;
      const requestHost = req.headers['x-forwarded-host'] || req.get('host');
      const origin = `${requestProto}://${requestHost}`;
      const canonicalUrl = `${origin}${url}`;

      // Injected structured JSON-LD schema
      const schemaMarkup = getSchemaMarkup(routeKey, meta, origin, url);
      const schemaJson = JSON.stringify(schemaMarkup, null, 2);

      // Serialize routeData as client-side hydration window globals
      const hydrationScript = `
    <script id="ssr-hydration-data">
      window.__ROUTE_DATA__ = ${JSON.stringify(routeData).replace(/</g, '\\u003c')};
    </script>
    <script type="application/ld+json">
      ${schemaJson}
    </script>
      `;

      // 5. Inject SEO description, keywords, canonical URLs, and Open Graph tags
      const seoTags = `
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="${meta.keywords}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${origin}/src/assets/images/mvs_switchgear_1779335480278.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${origin}/src/assets/images/mvs_switchgear_1779335480278.png" />
    ${hydrationScript}
      `;

      // Replace pre-existing generic title or inject into head
      if (htmlOutput.includes('<title>')) {
        htmlOutput = htmlOutput.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      } else {
        htmlOutput = htmlOutput.replace('</head>', `<title>${meta.title}</title>\n</head>`);
      }
      htmlOutput = htmlOutput.replace('</head>', `${seoTags}\n</head>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlOutput);
    } catch (e: any) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
