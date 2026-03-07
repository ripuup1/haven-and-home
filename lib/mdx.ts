import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  author: string;
}

export interface ReadTime {
  text: string;
  minutes: number;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readTime: ReadTime;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Ensure the content directory exists. Returns `true` when the directory is
 * present, `false` otherwise. Every public function that touches the
 * filesystem should call this first so consumers never see an ENOENT crash.
 */
function contentDirExists(): boolean {
  return fs.existsSync(CONTENT_DIR);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read a single MDX file by its slug, parse its frontmatter with gray-matter,
 * and compute the estimated reading time.
 */
export function getPostBySlug(slug: string): Post | null {
  if (!contentDirExists()) {
    return null;
  }

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    frontmatter: {
      title: data.title ?? '',
      slug: data.slug ?? slug,
      date: data.date ?? '',
      category: data.category ?? '',
      excerpt: data.excerpt ?? '',
      featuredImage: data.featuredImage ?? '',
      author: data.author ?? '',
    },
    content,
    readTime: {
      text: stats.text,
      minutes: Math.ceil(stats.minutes),
    },
  };
}

/**
 * Read every `.mdx` file from the content/blog directory and return them
 * sorted by date in descending order (newest first).
 */
export function getAllPosts(): Post[] {
  if (!contentDirExists()) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));

  const posts: Post[] = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => post !== null);

  // Sort by date descending
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });

  return posts;
}

/**
 * Return all posts that match the given category (case-insensitive).
 */
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) =>
      post.frontmatter.category.toLowerCase() === category.toLowerCase(),
  );
}
