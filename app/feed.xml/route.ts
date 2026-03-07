import { getAllPosts } from '@/lib/mdx';

const SITE_URL = 'https://havenandhome.co';

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const { title, slug, date, category, excerpt } = post.frontmatter;
      const pubDate = new Date(date).toUTCString();

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${excerpt}]]></description>
      <link>${SITE_URL}/blog/${slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${category}]]></category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Haven &amp; Home</title>
    <description>Curated home decor ideas, organization tips, and product recommendations to help you create spaces worth coming home to.</description>
    <link>${SITE_URL}</link>
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
