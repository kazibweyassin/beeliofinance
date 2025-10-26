import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

const excluded = ['_app', '_document', '_error', 'api'];

function prettyUrlFromFile(file: string) {
  // remove extension
  const noExt = file.replace(/\.(tsx|ts|jsx|js)$/i, '');
  // index => /
  if (noExt === 'index') return '/';
  return `/${noExt}`;
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
        // ignore api handlers
        urls.push(rel);
      }
    }
    return urls;
  };

  const files = walk(pagesDir).map(p => p.replace(/\\/g, '/'));

  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const urls = files
    .map(f => {
      // remove pages/ prefix if present
      const cleaned = f.replace(/^pages\//, '');
      const withoutExt = cleaned.replace(/\.(tsx|ts|jsx|js)$/i, '');
      // handle nested index files
      const urlPath = withoutExt.endsWith('/index')
        ? withoutExt.replace(/\/index$/, '')
        : withoutExt;
      const pathUrl = urlPath === 'index' || urlPath === '' ? '/' : `/${urlPath}`;
      return `${baseUrl.replace(/\/$/, '')}${pathUrl}`;
    })
    // dedupe
    .filter((v, i, a) => a.indexOf(v) === i);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(u => {
        return `<url><loc>${u}</loc></url>`;
      })
      .join('\n')}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  // getServerSideProps handles the response
  return null;
}
