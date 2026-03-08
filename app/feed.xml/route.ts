import { getAllPosts } from '@/lib/mdx';

const SITE_URL = 'https://www.havenandhome.live';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const { title, slug, date, category, excerpt, featuredImage } = post.frontmatter;
      const pubDate = new Date(date).toUTCString();
      // Resolve image URL for Pinterest auto-publish
      const imageUrl = featuredImage.startsWith('http')
        ? featuredImage
        : `${SITE_URL}${featuredImage}`;
      const safeImageUrl = escapeXml(imageUrl);

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${title} — ${excerpt} | Haven & Home]]></description>
      <link>${SITE_URL}/blog/${slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${slug}</guid>
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
    <title>Haven &amp; Home</title>
    <description>Curated home decor ideas, organization tips, and product recommendations to help you create spaces worth coming home to.</description>
    <link>${SITE_URL}</link>
    <image>
      <url>${SITE_URL}/images/logo-transparent.png</url>
      <title>Haven &amp; Home</title>
      <link>${SITE_URL}</link>
    </image>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
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
