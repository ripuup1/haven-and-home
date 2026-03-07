import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/ui/Hero";
import EmailCapture from "@/components/ui/EmailCapture";
import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Haven & Home — Spaces Worth Coming Home To",
};

const shopPicks = [
  {
    name: "Ceramic Utensil Holder",
    price: "$24.99",
    url: "https://www.amazon.com/dp/B0EXAMPLE01?tag=havenandhomec-20",
  },
  {
    name: "Woven Storage Baskets (Set of 3)",
    price: "$34.99",
    url: "https://www.amazon.com/dp/B0EXAMPLE02?tag=havenandhomec-20",
  },
  {
    name: "Linen Throw Pillow Covers",
    price: "$18.99",
    url: "https://www.amazon.com/dp/B0EXAMPLE03?tag=havenandhomec-20",
  },
  {
    name: "Bamboo Drawer Organizer Set",
    price: "$29.99",
    url: "https://www.amazon.com/dp/B0EXAMPLE04?tag=havenandhomec-20",
  },
  {
    name: "Gold Wall Mirror (24\")",
    price: "$45.99",
    url: "https://www.amazon.com/dp/B0EXAMPLE05?tag=havenandhomec-20",
  },
  {
    name: "Aromatherapy Candle Set",
    price: "$22.99",
    url: "https://www.amazon.com/dp/B0EXAMPLE06?tag=havenandhomec-20",
  },
];

export default function HomePage() {
  const allPosts = getAllPosts();
  const editorPicks = allPosts.slice(0, 3);
  const latestPosts = allPosts.slice(3, 9);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Editor's Picks */}
      <section className="bg-soft-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
              Editor&apos;s Picks
            </h2>
            <p className="mt-3 text-center font-body text-medium-gray text-lg">
              Handpicked reads we think you&apos;ll love.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {editorPicks.map((post, index) => (
              <ScrollReveal key={post.frontmatter.slug} delay={index * 0.15}>
                <Link
                  href={`/blog/${post.frontmatter.slug}`}
                  className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Featured Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={post.frontmatter.featuredImage || "/images/blog/placeholder.jpg"}
                      alt={post.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    <span className="absolute left-4 top-4 rounded-full bg-olive px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-white">
                      {post.frontmatter.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold leading-snug text-charcoal transition-colors group-hover:text-terracotta sm:text-2xl">
                      {post.frontmatter.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-medium-gray sm:text-base">
                      {post.frontmatter.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 font-body text-xs text-medium-gray">
                      <time dateTime={post.frontmatter.date}>
                        {formatDate(post.frontmatter.date)}
                      </time>
                      <span className="text-clay/40">&bull;</span>
                      <span>{post.readTime.text}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest From the Blog */}
      {latestPosts.length > 0 && (
        <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
                Latest From the Blog
              </h2>
              <p className="mt-3 text-center font-body text-medium-gray text-lg">
                Fresh ideas for every room in your home.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {latestPosts.map((post, index) => (
                <ScrollReveal key={post.frontmatter.slug} delay={index * 0.1}>
                  <BlogCard
                    title={post.frontmatter.title}
                    slug={post.frontmatter.slug}
                    excerpt={post.frontmatter.excerpt}
                    category={post.frontmatter.category}
                    featuredImage={post.frontmatter.featuredImage || "/images/blog/placeholder.jpg"}
                    readTime={post.readTime.text}
                    date={formatDate(post.frontmatter.date)}
                  />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-terracotta px-8 py-3 font-body font-medium text-terracotta transition-colors duration-200 hover:bg-terracotta hover:text-white"
                >
                  View All Posts
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Shop Our Picks */}
      <section className="bg-soft-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
              Shop Our Picks
            </h2>
            <p className="mt-3 text-center font-body text-medium-gray text-lg">
              Curated favorites we use and love — all available on Amazon.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative mt-10">
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                {shopPicks.map((product) => (
                  <a
                    key={product.name}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-clay/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Product Image Placeholder */}
                    <div className="relative aspect-square w-full overflow-hidden bg-cream">
                      <div className="flex h-full items-center justify-center">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-clay/30"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="font-heading text-base font-bold leading-snug text-charcoal transition-colors group-hover:text-terracotta">
                          {product.name}
                        </h3>
                        <p className="mt-1 font-body text-lg font-bold text-terracotta">
                          {product.price}
                        </p>
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1 font-body text-sm font-medium text-terracotta transition-colors group-hover:text-terracotta-dark">
                        Shop Now
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <EmailCapture />
        </ScrollReveal>
      </section>
    </>
  );
}
