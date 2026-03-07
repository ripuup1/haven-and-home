import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  readTime: string;
  date: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {posts.map((post, index) => (
        <ScrollReveal key={post.slug} delay={index * 0.1}>
          <BlogCard {...post} />
        </ScrollReveal>
      ))}
    </div>
  );
}
