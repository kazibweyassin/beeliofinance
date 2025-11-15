import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

const excluded = ['_app', '_document', '_error', 'api', 'sitemap.xml'];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

// Define priority and change frequency based on page type
function getUrlMetadata(urlPath: string): { priority: number; changefreq: string } {
  // Homepage - highest priority
  if (urlPath === '/' || urlPath === '/index') {
    return { priority: 1.0, changefreq: 'daily' };
  }
  
  // Auth and dashboard pages - high priority
  if (urlPath.includes('/auth') || urlPath.includes('/dashboard')) {
    return { priority: 0.9, changefreq: 'daily' };
  }
  
  // FAQ and How It Works - high priority
  if (urlPath.includes('/faq') || urlPath.includes('/how-it-works')) {
    return { priority: 0.9, changefreq: 'weekly' };
  }

  // Company pages
  if (urlPath === '/about' || urlPath === '/technology' || urlPath === '/team') {
    return { priority: 0.9, changefreq: 'weekly' };
  }
  
  // Features pages - medium-high priority
  if (urlPath.includes('/features')) {
    return { priority: 0.8, changefreq: 'weekly' };
  }
  
  // KYC and payment pages - high priority for users
  if (urlPath.includes('/kyc') || urlPath.includes('/payment')) {
    return { priority: 0.8, changefreq: 'monthly' };
  }
  
  // Legal and security pages - medium priority
  if (urlPath.includes('/legal') || urlPath.includes('/security')) {
    return { priority: 0.6, changefreq: 'monthly' };
  }
  
  // Contact and testimonials - medium priority
  if (urlPath.includes('/contact') || urlPath.includes('/testimonials')) {
    return { priority: 0.7, changefreq: 'weekly' };
  }
  
  // Default for other pages
  return { priority: 0.5, changefreq: 'monthly' };
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pagesDir = path.join(process.cwd(), 'pages');

  const walk = (dir: string, base = ''): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const urls: string[] = [];
    for (const ent of entries) {
      const name = ent.name;
      if (ent.isDirectory()) {
        if (excluded.includes(name)) continue;
        urls.push(...walk(path.join(dir, name), path.posix.join(base, name)));
      } else {
        // skip excluded files
        const rel = path.posix.join(base, name);
        const parts = rel.split('/');
        if (parts.some(p => p.startsWith('[') || p.startsWith('_'))) continue; // dynamic or private
        if (excluded.includes(parts[0])) continue;
        if (!/\.(tsx|ts|jsx|js)$/i.test(name)) continue;
        // Skip sitemap itself
        if (name === 'sitemap.xml.tsx' || name === 'sitemap.xml.ts') continue;
        urls.push(rel);
      }
    }
    return urls;
  };

  const files = walk(pagesDir).map(p => p.replace(/\\/g, '/'));

  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://beelio.finance';

  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const sitemapUrls: SitemapUrl[] = files
    .map(f => {
      // remove pages/ prefix if present
      const cleaned = f.replace(/^pages\//, '');
      const withoutExt = cleaned.replace(/\.(tsx|ts|jsx|js)$/i, '');
      // handle nested index files
      const urlPath = withoutExt.endsWith('/index')
        ? withoutExt.replace(/\/index$/, '')
        : withoutExt;
      const pathUrl = urlPath === 'index' || urlPath === '' ? '/' : `/${urlPath}`;
      const fullUrl = `${baseUrl.replace(/\/$/, '')}${pathUrl}`;
      
      const metadata = getUrlMetadata(pathUrl);
      
      return {
        loc: fullUrl,
        lastmod: currentDate,
        changefreq: metadata.changefreq,
        priority: metadata.priority
      };
    })
    // dedupe by location
    .filter((v, i, a) => a.findIndex(u => u.loc === v.loc) === i)
    // sort by priority (highest first)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemapUrls
      .map(u => {
        return `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${(u.priority || 0.5).toFixed(1)}</priority>
  </url>`;
      })
      .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  // getServerSideProps handles the response
  return null;
}
