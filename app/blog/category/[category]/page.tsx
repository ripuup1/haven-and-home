import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import BlogGrid from "@/components/blog/BlogGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const SITE_URL = "https://www.havenandhome.live";

const CATEGORIES: Record<
  string,
  {
    label: string;
    match: string[];
    heading: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  kitchen: {
    label: "Kitchen",
    match: ["kitchen"],
    heading: "Kitchen Ideas & Finds",
    intro:
      "Organizers, gadgets, and decor picks that turn everyday kitchens into spaces worth lingering in. Every product is hand-picked and under $75.",
    metaTitle: "Kitchen Ideas, Organizers & Decor Under $75 | Haven & Home",
    metaDescription:
      "Budget-friendly kitchen organization, gadgets, and decor ideas. Curated picks under $75 that look 3x their price.",
  },
  bathroom: {
    label: "Bathroom",
    match: ["bathroom"],
    heading: "Bathroom Ideas & Upgrades",
    intro:
      "Spa-worthy bathroom upgrades, storage solutions, and budget decor swaps. Everything here is affordable, renter-friendly, and under $75.",
    metaTitle: "Bathroom Decor, Storage & Upgrades Under $75 | Haven & Home",
    metaDescription:
      "Bathroom organization, spa upgrades, and small-space solutions — budget-friendly picks curated by Haven & Home.",
  },
  bedroom: {
    label: "Bedroom",
    match: ["bedroom"],
    heading: "Bedroom Refresh & Cozy Finds",
    intro:
      "Hotel-inspired bedding, nightstand essentials, and cozy upgrades that make your bedroom feel like a retreat — all for less than you'd think.",
    metaTitle: "Bedroom Decor, Bedding & Cozy Upgrades | Haven & Home",
    metaDescription:
      "Bedroom decor ideas, bedding upgrades, and cozy retreat essentials curated by Haven & Home — all under $75.",
  },
  "living-room": {
    label: "Living Room",
    match: ["living room"],
    heading: "Living Room Decor & Styling",
    intro:
      "Throw pillows, rugs, accent furniture, and styling ideas that elevate your living room without a full makeover budget.",
    metaTitle: "Living Room Decor, Pillows & Accent Finds | Haven & Home",
    metaDescription:
      "Living room decor, throw pillows, rugs, and accent pieces under $75 — curated styling ideas from Haven & Home.",
  },
  organization: {
    label: "Organization",
    match: ["organization", "organization/storage"],
    heading: "Home Organization & Storage",
    intro:
      "Drawer dividers, closet systems, pantry swaps, and the exact products that actually end the clutter — tested and budget-friendly.",
    metaTitle: "Home Organization Ideas & Storage Solutions | Haven & Home",
    metaDescription:
      "Home organization ideas, drawer dividers, closet systems, and storage hacks that actually work — budget picks under $75.",
  },
  seasonal: {
    label: "Seasonal",
    match: ["seasonal", "seasonal/trending", "outdoor"],
    heading: "Seasonal Ideas & Trending Finds",
    intro:
      "Seasonal decor, entertaining essentials, and trending finds that make every holiday, season, and gathering feel pulled-together.",
    metaTitle: "Seasonal Decor & Holiday Finds Under $75 | Haven & Home",
    metaDescription:
      "Seasonal home decor, holiday entertaining ideas, and trending finds curated by Haven & Home — all under $75.",
  },
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORIES[category];
  if (!config) return {};
  const canonical = `${SITE_URL}/blog/category/${category}`;
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": `${SITE_URL}/feed/${category}.xml`,
      },
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = CATEGORIES[category];
  if (!config) notFound();

  const allPosts = getAllPosts();
  const filtered = allPosts.filter((post) => {
    const cat = post.frontmatter.category.trim().toLowerCase();
    return config.match.includes(cat);
  });

  const posts = filtered.map((post) => ({
    title: post.frontmatter.title,
    slug: post.frontmatter.slug,
    excerpt: post.frontmatter.excerpt,
    category: post.frontmatter.category,
    featuredImage: post.frontmatter.featuredImage || "/images/blog/placeholder.jpg",
    readTime: post.readTime.text,
    date: formatDate(post.frontmatter.date),
  }));

  const otherCategories = Object.entries(CATEGORIES).filter(([slug]) => slug !== category);

  return (
    <div>
      <section className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <ScrollReveal>
            <p className="font-body text-sm uppercase tracking-widest text-terracotta">
              Haven &amp; Home · {config.label}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              {config.heading}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-medium-gray">
              {config.intro}
            </p>
            <p className="mt-3 font-body text-sm text-medium-gray">
              {posts.length} curated {posts.length === 1 ? "post" : "posts"}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-soft-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-6 lg:p-8">
          {posts.length > 0 ? (
            <BlogGrid posts={posts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-heading text-2xl font-bold text-charcoal">
                No posts in this category yet
              </p>
              <Link
                href="/blog"
                className="mt-6 rounded-lg bg-terracotta px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:opacity-90"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Browse other categories
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherCategories.map(([slug, info]) => (
              <Link
                key={slug}
                href={`/blog/category/${slug}`}
                className="rounded-full border border-clay/30 bg-white px-5 py-2 font-body text-sm font-medium text-charcoal transition-colors hover:bg-cream"
              >
                {info.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
