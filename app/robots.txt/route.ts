const SITE_URL = 'https://www.havenandhome.live';

export async function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
