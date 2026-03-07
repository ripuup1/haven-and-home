import { clsx } from 'clsx';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Heading {
  id: string;
  text: string;
  level: number;
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Format a date string into the human-readable form "Month DD, YYYY".
 *
 * @example
 * formatDate('2025-06-15') // "June 15, 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Class-name merge
// ---------------------------------------------------------------------------

/**
 * Merge class names, filtering out falsy values.
 * Thin wrapper around `clsx` for convenience.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return clsx(...classes);
}

// ---------------------------------------------------------------------------
// Heading extraction
// ---------------------------------------------------------------------------

/**
 * Turn a heading string into a URL-friendly slug.
 *
 * @example
 * slugify('My Cool Heading!') // "my-cool-heading"
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // remove non-word chars (except spaces/hyphens)
    .replace(/\s+/g, '-')      // collapse whitespace to hyphens
    .replace(/-+/g, '-');       // collapse consecutive hyphens
}

/**
 * Extract h2 and h3 headings from raw markdown content. Each heading is
 * returned with a slugified `id` suitable for anchor linking, the plain
 * `text`, and the heading `level` (2 or 3).
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // 2 or 3
    const text = match[2].trim();
    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}
