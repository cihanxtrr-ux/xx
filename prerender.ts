import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { seoMetadata, getRouteKey } from './src/data/seoMetadata.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/home',
  '/services',
  '/products',
  '/products/details/prod-mvs',
  '/products/details/prod-megapack',
  '/products/details/prod-ats',
  '/products/details/prod-charger',
  '/products/details/prod-bms',
  '/products/prod-mvs',
  '/products/prod-megapack',
  '/products/prod-ats',
  '/products/prod-charger',
  '/products/prod-bms',
  '/estimator',
  '/portfolio',
  '/blog',
  '/blog/article/art-1',
  '/blog/article/art-3',
  '/blog/article/art-2',
  '/documents',
  '/app-center',
  '/about',
  '/careers',
  '/contact',
  '/support',
  '/iot',
  '/press-kit',
  '/branding',
  '/news'
];

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

async function runPrerender() {
  console.log('⚡ Starting static site generation (SSG) pre-render pass...');

  const templatePath = path.resolve(__dirname, 'dist', 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Build template not found at ${templatePath}. Run "vite build" first.`);
    process.exit(1);
  }

  const entryServerPath = path.resolve(__dirname, 'dist', 'entry-server.js');
  if (!fs.existsSync(entryServerPath)) {
    console.error(`❌ SSR Server bundle not found at ${entryServerPath}. Run "vite build --ssr" first.`);
    process.exit(1);
  }

  // Read index.html template once
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load the compiled SSR bundle dynamically
  const { render } = await import(pathToFileURL(entryServerPath).href);

  for (const route of routes) {
    try {
      console.log(`✨ Pre-rendering route: ${route}`);

      const routeKey = getRouteKey(route);
      const meta = seoMetadata[routeKey] || seoMetadata['home'];

      // Empty standard inquiries to let client dynamic hydration load additional entries
      const routeData = {
        inquiries: [],
        activePath: route,
        routeKey: routeKey
      };

      // Render React app to HTML string
      const { html } = render(route, routeData);

      // Interpolate into the root index.html template
      let htmlOutput = template.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`);

      // SEO injection
      const origin = "https://x-elektrik.com";
      const canonicalUrl = `${origin}${route}`;
      const schemaMarkup = getSchemaMarkup(routeKey, meta, origin, route);
      const schemaJson = JSON.stringify(schemaMarkup, null, 2);

      const hydrationScript = `
    <script id="ssr-hydration-data">
      window.__ROUTE_DATA__ = ${JSON.stringify(routeData).replace(/</g, '\\u003c')};
    </script>
    <script type="application/ld+json">
      ${schemaJson}
    </script>
      `;

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

      // Replace or insert titles & headers
      if (htmlOutput.includes('<title>')) {
        htmlOutput = htmlOutput.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      } else {
        htmlOutput = htmlOutput.replace('</head>', `<title>${meta.title}</title>\n</head>`);
      }
      htmlOutput = htmlOutput.replace('</head>', `${seoTags}\n</head>`);

      const cleanRoute = route.split('?')[0];

      if (cleanRoute === '/' || cleanRoute === '') {
        // Direct index file overwrite
        fs.writeFileSync(path.resolve(__dirname, 'dist', 'index.html'), htmlOutput, 'utf-8');
      } else {
        // Static output file as both directory/index.html and absolute route.html for ultimate SSG support
        const fileWithExtension = path.resolve(__dirname, 'dist', `${cleanRoute.substring(1)}.html`);
        const fileInDirectory = path.resolve(__dirname, 'dist', `${cleanRoute.substring(1)}`, 'index.html');

        fs.mkdirSync(path.dirname(fileWithExtension), { recursive: true });
        fs.mkdirSync(path.dirname(fileInDirectory), { recursive: true });

        fs.writeFileSync(fileWithExtension, htmlOutput, 'utf-8');
        fs.writeFileSync(fileInDirectory, htmlOutput, 'utf-8');
      }
    } catch (err) {
      console.error(`❌ Failed pre-rendering route ${route}:`, err);
    }
  }

  console.log('✅ SSG compilation completed successfully! Static pages compiled to dist/.');
}

runPrerender().catch((err) => {
  console.error('❌ Error during static site pre-rendering process:', err);
  process.exit(1);
});
