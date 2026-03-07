import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import BlogListingClient from "./BlogListingClient";

export const metadata = {
  title: "Blog",
  description: "Home decor tips, product reviews, and organization ideas.",
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  // Serialize posts for the client component
  const posts = allPosts.map((post) => ({
    title: post.frontmatter.title,
    slug: post.frontmatter.slug,
    excerpt: post.frontmatter.excerpt,
    category: post.frontmatter.category,
    featuredImage: post.frontmatter.featuredImage || "/images/blog/placeholder.jpg",
    readTime: post.readTime.text,
    date: formatDate(post.frontmatter.date),
  }));

  // Extract popular posts for the sidebar (first 5)
  const popularPosts = allPosts.slice(0, 5).map((post) => ({
    slug: post.frontmatter.slug,
    title: post.frontmatter.title,
    category: post.frontmatter.category,
  }));

  return <BlogListingClient posts={posts} popularPosts={popularPosts} />;
}
