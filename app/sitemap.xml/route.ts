import { getAllPosts } from '@/lib/mdx';

const SITE_URL = 'https://www.havenandhome.live';

export async function GET() {
  const posts = getAllPosts();
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { url: '/blog', lastmod: today, changefreq: 'daily', priority: '0.9' },
    { url: '/about', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/favorites', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { url: '/blog/category/kitchen', lastmod: today, changefreq: 'daily', priority: '0.85' },
    { url: '/blog/category/bathroom', lastmod: today, changefreq: 'daily', priority: '0.85' },
    { url: '/blog/category/bedroom', lastmod: today, changefreq: 'daily', priority: '0.85' },
    { url: '/blog/category/living-room', lastmod: today, changefreq: 'daily', priority: '0.85' },
    { url: '/blog/category/organization', lastmod: today, changefreq: 'daily', priority: '0.85' },
    { url: '/blog/category/seasonal', lastmod: today, changefreq: 'daily', priority: '0.85' },
  ];

  const staticEntries = staticPages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const postEntries = posts
    .map((post) => {
      const lastmod = new Date(post.frontmatter.date).toISOString().split('T')[0];
      return `  <url>
    <loc>${SITE_URL}/blog/${post.frontmatter.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
