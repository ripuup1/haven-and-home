// Amazon Search URL → Direct ASIN Link Resolver
// Scans all blog posts for Amazon search URLs, resolves each to a direct ASIN link.
//
// Usage:
//   node scripts/resolve-amazon-links.mjs          # resolve all
//   node scripts/resolve-amazon-links.mjs --resume  # resume from previous run (skips already resolved)
//
// Output:
//   scripts/amazon-link-map.json     — successful mappings
//   scripts/amazon-link-failures.json — URLs that couldn't be resolved

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BLOG_DIR = join(import.meta.dirname, "..", "content", "blog");
const MAP_FILE = join(import.meta.dirname, "amazon-link-map.json");
const FAIL_FILE = join(import.meta.dirname, "amazon-link-failures.json");

const SEARCH_URL_RE = /https:\/\/www\.amazon\.com\/s\?k=[^"'\s)]+/g;
const ASIN_RE = /\/dp\/(B0[A-Z0-9]{8})\b/;
const DATA_ASIN_RE = /data-asin="(B0[A-Z0-9]{8})"/g;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// 1. Scan blog posts for unique Amazon search URLs
// ---------------------------------------------------------------------------
async function scanBlogPosts() {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"));
  const urlFileMap = new Map(); // url -> Set<filename>
  let totalHits = 0;

  for (const file of files) {
    const content = await readFile(join(BLOG_DIR, file), "utf-8");
    const matches = content.match(SEARCH_URL_RE);
    if (!matches) continue;
    for (const url of matches) {
      totalHits++;
      if (!urlFileMap.has(url)) urlFileMap.set(url, new Set());
      urlFileMap.get(url).add(file);
    }
  }

  console.log(
    `Found ${totalHits} Amazon search URLs across ${files.length} blog posts`
  );
  console.log(`Unique search URLs: ${urlFileMap.size}`);
  return urlFileMap;
}

// ---------------------------------------------------------------------------
// 2. Fetch an Amazon search page and extract the top organic ASIN
// ---------------------------------------------------------------------------
async function extractAsin(html) {
  // Remove sponsored sections first
  const cleaned = html
    .replace(/class="[^"]*s-sponsored[^"]*"[\s\S]*?<\/div>/gi, "")
    .replace(/class="[^"]*AdHolder[^"]*"[\s\S]*?<\/div>/gi, "");

  // Strategy 1: data-asin attributes
  const dataAsins = [];
  let m;
  while ((m = DATA_ASIN_RE.exec(cleaned)) !== null) {
    if (m[1] && m[1] !== "" && m[1].startsWith("B0")) {
      dataAsins.push(m[1]);
    }
  }
  if (dataAsins.length > 0) return { asin: dataAsins[0], method: "data-asin" };

  // Strategy 2: /dp/ASIN in links
  const dpMatches = cleaned.match(/\/dp\/B0[A-Z0-9]{8}/g);
  if (dpMatches && dpMatches.length > 0) {
    const asin = dpMatches[0].replace("/dp/", "");
    return { asin, method: "dp-link" };
  }

  // Strategy 3: any ASIN-like pattern
  const anyAsin = cleaned.match(/\bB0[A-Z0-9]{8}\b/);
  if (anyAsin) return { asin: anyAsin[0], method: "fallback-pattern" };

  return null;
}

function extractProductTitle(html, asin) {
  // Try to find the product title near the ASIN
  const idx = html.indexOf(asin);
  if (idx === -1) return "Unknown";

  // Look for a nearby aria-label or title text
  const region = html.substring(Math.max(0, idx - 2000), idx + 2000);

  // Try aria-label
  const ariaMatch = region.match(/aria-label="([^"]{10,120})"/);
  if (ariaMatch) return ariaMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'");

  // Try alt text of an image
  const altMatch = region.match(/alt="([^"]{10,120})"/);
  if (altMatch) return altMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'");

  // Try h2 > a > span text
  const spanMatch = region.match(/<span[^>]*class="a-text-normal"[^>]*>([^<]{10,120})<\/span>/);
  if (spanMatch) return spanMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'");

  return "Unknown";
}

async function resolveUrl(url, retryCount = 0) {
  try {
    const resp = await fetch(url, {
      headers: HEADERS,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (resp.status === 403 || resp.status === 503) {
      if (retryCount < 1) {
        console.log(`  ⚠ Got ${resp.status}, retrying in 10s...`);
        await delay(10000);
        return resolveUrl(url, retryCount + 1);
      }
      return { error: `HTTP ${resp.status} after retry` };
    }

    if (!resp.ok) {
      return { error: `HTTP ${resp.status}` };
    }

    const html = await resp.text();
    const result = await extractAsin(html);

    if (!result) {
      return { error: "No ASIN found in search results" };
    }

    const title = extractProductTitle(html, result.asin);

    return {
      asin: result.asin,
      directUrl: `https://www.amazon.com/dp/${result.asin}?tag=havenandhomec-20`,
      productTitle: title,
      method: result.method,
      resolvedAt: new Date().toISOString(),
    };
  } catch (err) {
    if (retryCount < 1) {
      console.log(`  ⚠ Error: ${err.message}, retrying in 10s...`);
      await delay(10000);
      return resolveUrl(url, retryCount + 1);
    }
    return { error: err.message };
  }
}

// ---------------------------------------------------------------------------
// 3. Main
// ---------------------------------------------------------------------------
async function main() {
  const resumeMode = process.argv.includes("--resume");

  // Load existing map if resuming
  let existingMap = {};
  if (resumeMode) {
    try {
      existingMap = JSON.parse(await readFile(MAP_FILE, "utf-8"));
      console.log(`Resuming: loaded ${Object.keys(existingMap).length} previously resolved URLs`);
    } catch {
      console.log("No previous map found, starting fresh");
    }
  }

  const urlFileMap = await scanBlogPosts();
  const urls = [...urlFileMap.keys()];

  const map = { ...existingMap };
  const failures = {};
  let resolved = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    // Skip if already resolved
    if (map[url] && map[url].asin) {
      skipped++;
      continue;
    }

    console.log(
      `[${i + 1}/${urls.length}] Resolving: ${url.substring(0, 80)}...`
    );

    const result = await resolveUrl(url);

    if (result.error) {
      console.log(`  ✗ Failed: ${result.error}`);
      failures[url] = {
        error: result.error,
        files: [...urlFileMap.get(url)],
        attemptedAt: new Date().toISOString(),
      };
      failed++;
    } else {
      console.log(
        `  ✓ ${result.asin} (${result.method}) — ${result.productTitle.substring(0, 50)}`
      );
      map[url] = result;
      resolved++;
    }

    // Rate limit: 2-3 seconds between requests
    if (i < urls.length - 1) {
      await delay(2000 + Math.random() * 1000);
    }

    // Save progress every 10 URLs
    if ((i + 1) % 10 === 0) {
      await writeFile(MAP_FILE, JSON.stringify(map, null, 2));
      await writeFile(FAIL_FILE, JSON.stringify(failures, null, 2));
    }
  }

  // Final save
  await writeFile(MAP_FILE, JSON.stringify(map, null, 2));
  await writeFile(FAIL_FILE, JSON.stringify(failures, null, 2));

  console.log("\n--- Summary ---");
  console.log(`Total unique search URLs: ${urls.length}`);
  console.log(`Successfully resolved: ${resolved}`);
  console.log(`Previously resolved (skipped): ${skipped}`);
  console.log(`Failed to resolve: ${failed}`);
  console.log(`\nMapping saved to: ${MAP_FILE}`);
  if (failed > 0) console.log(`Failures saved to: ${FAIL_FILE}`);
}

main().catch(console.error);
