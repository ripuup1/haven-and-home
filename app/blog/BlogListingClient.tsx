"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BlogGrid from "@/components/blog/BlogGrid";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Sidebar from "@/components/layout/Sidebar";
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

interface SidebarPost {
  slug: string;
  title: string;
  category: string;
}

interface BlogListingClientProps {
  posts: BlogPost[];
  popularPosts: SidebarPost[];
}

const CATEGORIES = [
  "All",
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Living Room",
  "Organization",
  "Budget Finds",
  "Amazon Picks",
];

export default function BlogListingClient({
  posts,
  popularPosts,
}: BlogListingClientProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  // Read ?category= from URL on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.some((c) => c.toLowerCase() === cat.toLowerCase())) {
      setActiveCategory(CATEGORIES.find((c) => c.toLowerCase() === cat.toLowerCase()) || "All");
    }
  }, [searchParams]);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter(
          (post) =>
            post.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div>
      {/* Page Header */}
      <section className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <ScrollReveal>
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              The Blog
            </h1>
            <p className="mt-4 font-body text-lg text-medium-gray max-w-2xl mx-auto">
              Home decor tips, honest product reviews, room makeovers, and
              organization ideas to help you love your space.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Floating Card Content */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-soft-white/90 shadow-sm backdrop-blur-sm p-4 sm:p-6 lg:p-8">
          {/* Category Filter */}
          <div className="border-b border-clay/10 pb-4 mb-8">
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            {/* Posts Grid - Main Column */}
            <div className="flex-1 min-w-0">
              {filteredPosts.length > 0 ? (
                <BlogGrid posts={filteredPosts} />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="font-heading text-2xl font-bold text-charcoal">
                    No posts found
                  </p>
                  <p className="mt-2 font-body text-medium-gray">
                    We don&apos;t have any posts in &ldquo;{activeCategory}&rdquo; yet.
                    Check back soon!
                  </p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="mt-6 rounded-lg bg-terracotta px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
                  >
                    View All Posts
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Desktop */}
            <div className="w-full shrink-0 lg:w-80">
              <div className="lg:sticky lg:top-24">
                <Sidebar popularPosts={popularPosts} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
