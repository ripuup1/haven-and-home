import { getAllPosts } from '@/lib/mdx';

const SITE_URL = 'https://www.havenandhome.live';

const CATEGORY_MAP: Record<string, { label: string; match: string[] }> = {
  kitchen: { label: 'Kitchen', match: ['kitchen'] },
  bathroom: { label: 'Bathroom', match: ['bathroom'] },
  bedroom: { label: 'Bedroom', match: ['bedroom'] },
  'living-room': { label: 'Living Room', match: ['living room'] },
  organization: { label: 'Organization', match: ['organization', 'organization/storage'] },
  seasonal: { label: 'Seasonal', match: ['seasonal', 'seasonal/trending', 'outdoor'] },
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category: `${category}.xml` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: rawCategory } = await params;
  const slug = rawCategory.replace(/\.xml$/i, '').toLowerCase();
  const config = CATEGORY_MAP[slug];

  if (!config) {
    return new Response('Not found', { status: 404 });
  }

  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => {
    const cat = post.frontmatter.category.trim().toLowerCase();
    return config.match.includes(cat);
  });

  const items = posts
    .map((post) => {
      const { title, slug: postSlug, date, category, excerpt, featuredImage } = post.frontmatter;
      const pubDate = new Date(date).toUTCString();
      const imageUrl = featuredImage.startsWith('http')
        ? featuredImage
        : `${SITE_URL}${featuredImage}`;
      const safeImageUrl = escapeXml(imageUrl);

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${title} — ${excerpt} | Haven & Home]]></description>
      <link>${SITE_URL}/blog/${postSlug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${postSlug}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${category}]]></category>
      <enclosure url="${safeImageUrl}" type="image/jpeg" length="0" />
      <media:content url="${safeImageUrl}" medium="image" />
      <media:description><![CDATA[${title} — ${excerpt}]]></media:description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Haven &amp; Home — ${config.label}</title>
    <description>${config.label} ideas, product picks, and home inspiration from Haven &amp; Home.</description>
    <link>${SITE_URL}/blog/category/${slug}</link>
    <image>
      <url>${SITE_URL}/images/logo-transparent.png</url>
      <title>Haven &amp; Home — ${config.label}</title>
      <link>${SITE_URL}</link>
    </image>
    <atom:link href="${SITE_URL}/feed/${slug}.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
