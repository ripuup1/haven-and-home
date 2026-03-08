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
    name: "Ceramic Vase Set (Matte White)",
    price: "$22.99",
    image: "/images/products/ceramic_vase_set_of_3_matte_white_minimalist.jpg",
    url: "https://www.amazon.com/s?k=ceramic+vase+set+3+piece+matte+white&tag=havenandhomec-20",
  },
  {
    name: "Woven Storage Basket",
    price: "$15.99",
    image: "/images/products/woven_storage_basket_large_living_room.jpg",
    url: "https://www.amazon.com/s?k=woven+storage+basket&tag=havenandhomec-20",
  },
  {
    name: "Textured Throw Pillow Covers",
    price: "$18.99",
    image: "/images/products/textured_throw_pillow_covers_18x18_set_of_2_linen_neutral.jpg",
    url: "https://www.amazon.com/s?k=linen+throw+pillow+covers+18x18&tag=havenandhomec-20",
  },
  {
    name: "Bamboo Desk Organizer",
    price: "$26.99",
    image: "/images/products/bamboo_desk_organizer_with_drawers.jpg",
    url: "https://www.amazon.com/s?k=bamboo+desk+organizer+with+drawers&tag=havenandhomec-20",
  },
  {
    name: "Scalloped Decorative Tray",
    price: "$16.99",
    image: "/images/products/scalloped_decorative_tray.jpg",
    url: "https://www.amazon.com/s?k=scalloped+decorative+tray&tag=havenandhomec-20",
  },
  {
    name: "Flameless LED Candles",
    price: "$18.99",
    image: "/images/products/flameless_LED_candles_with_remote_set.jpg",
    url: "https://www.amazon.com/s?k=flameless+LED+candles+with+remote&tag=havenandhomec-20",
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
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-soft-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-12">
          <ScrollReveal>
            <h2 className="text-center font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Editor&apos;s Picks
            </h2>
            <p className="mt-3 text-center font-body text-lg text-medium-gray">
              Handpicked reads we think you&apos;ll love.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {editorPicks.map((post, index) => (
              <ScrollReveal key={post.frontmatter.slug} delay={index * 0.15}>
                <Link
                  href={`/blog/${post.frontmatter.slug}`}
                  className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-charcoal/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={post.frontmatter.featuredImage}
                      alt={post.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-olive px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-white">
                      {post.frontmatter.category}
                    </span>
                  </div>
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
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl bg-cream/80 p-8 shadow-sm backdrop-blur-sm sm:p-12">
            <ScrollReveal>
              <h2 className="text-center font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                Latest From the Blog
              </h2>
              <p className="mt-3 text-center font-body text-lg text-medium-gray">
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
                    featuredImage={post.frontmatter.featuredImage}
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
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-soft-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-12">
          <ScrollReveal>
            <h2 className="text-center font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Shop Our Picks
            </h2>
            <p className="mt-3 text-center font-body text-lg text-medium-gray">
              Curated favorites we use and love — all available on Amazon.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative mt-10">
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
                {shopPicks.map((product) => (
                  <a
                    key={product.name}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-clay/15 bg-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-charcoal/10"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-cream">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="256px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
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

      {/* Pinterest CTA */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-soft-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-10">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-accent text-lg italic text-medium-gray">
                Find us on Pinterest for daily inspiration
              </p>
              <a
                href="https://pinterest.com/havenandhomeco"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-charcoal/80"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Follow @havenandhomeco
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Email Capture */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <EmailCapture />
        </ScrollReveal>
      </section>
    </>
  );
}
