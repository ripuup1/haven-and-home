// Apply Amazon ASIN Link Replacements
// Reads the mapping from resolve-amazon-links.mjs and applies replacements to blog posts.
//
// Usage:
//   node scripts/apply-amazon-links.mjs --dry-run   # preview changes without writing
//   node scripts/apply-amazon-links.mjs              # apply changes

import { readdir, readFile, writeFile, cp } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const BLOG_DIR = join(import.meta.dirname, "..", "content", "blog");
const BACKUP_DIR = join(import.meta.dirname, "..", "content", "blog-backup");
const MAP_FILE = join(import.meta.dirname, "amazon-link-map.json");

const SEARCH_URL_RE = /https:\/\/www\.amazon\.com\/s\?k=[^"'\s)]+/g;

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  if (dryRun) {
    console.log("=== DRY RUN — no files will be modified ===\n");
  }

  // Load mapping
  let map;
  try {
    map = JSON.parse(await readFile(MAP_FILE, "utf-8"));
  } catch (err) {
    console.error(
      `Error: Could not read ${MAP_FILE}. Run resolve-amazon-links.mjs first.`
    );
    process.exit(1);
  }

  const mappedCount = Object.values(map).filter((v) => v.asin).length;
  console.log(`Loaded ${mappedCount} resolved URL mappings\n`);

  // Create backup before applying (unless dry run)
  if (!dryRun && !existsSync(BACKUP_DIR)) {
    console.log(`Creating backup at ${BACKUP_DIR}...`);
    await cp(BLOG_DIR, BACKUP_DIR, { recursive: true });
    console.log("Backup created.\n");
  }

  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"));
  let totalReplaced = 0;
  let filesUpdated = 0;

  for (const file of files) {
    const filePath = join(BLOG_DIR, file);
    const original = await readFile(filePath, "utf-8");
    let updated = original;
    let fileReplacements = 0;

    const matches = original.match(SEARCH_URL_RE);
    if (!matches) {
      if (!dryRun) continue;
      // In dry run, still show skipped files
      continue;
    }

    for (const url of matches) {
      const entry = map[url];
      if (!entry || !entry.asin || !entry.directUrl) continue;

      // Only replace if we have a valid direct URL
      if (updated.includes(url)) {
        updated = updated.replace(url, entry.directUrl);
        fileReplacements++;
      }
    }

    if (fileReplacements > 0) {
      if (!dryRun) {
        await writeFile(filePath, updated);
      }
      console.log(
        `${dryRun ? "[DRY RUN] Would update" : "Updated"}: ${file} (${fileReplacements} links replaced)`
      );
      totalReplaced += fileReplacements;
      filesUpdated++;
    }
  }

  console.log(
    `\n${dryRun ? "[DRY RUN] Would replace" : "Total"}: ${totalReplaced} links across ${filesUpdated} files`
  );

  if (dryRun) {
    console.log("\nRun without --dry-run to apply changes.");
  }
}

main().catch(console.error);
