import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { formatDate, extractHeadings } from "@/lib/utils";
import mdxComponents from "@/components/mdx/MDXComponents";
import TableOfContents from "@/components/blog/TableOfContents";
import ShopThisPost from "@/components/product/ShopThisPost";
import BlogCard from "@/components/blog/BlogCard";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      images: [post.frontmatter.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.frontmatter.slug !== slug &&
        p.frontmatter.category === post.frontmatter.category
    )
    .slice(0, 3);

  // If not enough related posts from the same category, fill with recent posts
  const finalRelated =
    relatedPosts.length >= 3
      ? relatedPosts
      : [
          ...relatedPosts,
          ...allPosts
            .filter(
              (p) =>
                p.frontmatter.slug !== slug &&
                !relatedPosts.find(
                  (r) => r.frontmatter.slug === p.frontmatter.slug
                )
            )
            .slice(0, 3 - relatedPosts.length),
        ];

  // Extract product links from content for ShopThisPost sidebar
  const productRegex =
    /name="([^"]+)"[\s\S]*?price="([^"]+)"[\s\S]*?affiliateUrl="([^"]+)"/g;
  const products: { name: string; price: string; affiliateUrl: string }[] = [];
  let match;
  while ((match = productRegex.exec(post.content)) !== null) {
    products.push({ name: match[1], price: match[2], affiliateUrl: match[3] });
  }

  return (
    <article className="bg-soft-white">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[320px] w-full md:h-[50vh]">
        <Image
          src={post.frontmatter.featuredImage}
          alt={post.frontmatter.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-10">
            <span className="mb-3 inline-block rounded-full bg-olive px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-white">
              {post.frontmatter.category}
            </span>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {post.frontmatter.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-[#e5ddd0] bg-cream">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 px-6 py-4 font-body text-sm text-medium-gray">
          <span>By {post.frontmatter.author || "Haven & Home"}</span>
          <span className="text-clay">|</span>
          <span>{formatDate(post.frontmatter.date)}</span>
          <span className="text-clay">|</span>
          <span>{post.readTime.text}</span>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex gap-12">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <div className="prose mx-auto max-w-none lg:max-w-[720px]">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                  },
                }}
              />
            </div>

            {/* Affiliate Disclosure */}
            <div className="mx-auto mt-12 max-w-[720px] rounded-lg border border-[#e5ddd0] bg-cream p-6 font-body text-sm leading-relaxed text-medium-gray">
              <p className="font-bold text-charcoal">Affiliate Disclosure</p>
              <p className="mt-1">
                This post contains affiliate links. Haven & Home may earn a
                commission on purchases made through these links, at no extra
                cost to you. We only recommend products we genuinely love.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-8">
              {headings.length > 0 && <TableOfContents headings={headings} />}
              {products.length > 0 && <ShopThisPost products={products} />}
              {/* Email Signup Mini */}
              <div className="rounded-xl border border-[#e5ddd0] bg-cream p-6">
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  Get Inspired Weekly
                </h3>
                <p className="mt-2 font-body text-sm text-medium-gray">
                  Our best finds, tips, and deals — delivered every Thursday.
                </p>
                <form className="mt-4 space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-clay/30 bg-soft-white px-3 py-2 font-body text-sm text-charcoal outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-terracotta py-2 font-body text-sm font-bold text-white transition-colors hover:bg-terracotta-dark"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {finalRelated.length > 0 && (
          <section className="mt-16 border-t border-[#e5ddd0] pt-12">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-charcoal">
              You Might Also Love
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {finalRelated.map((p) => (
                <BlogCard
                  key={p.frontmatter.slug}
                  title={p.frontmatter.title}
                  slug={p.frontmatter.slug}
                  excerpt={p.frontmatter.excerpt}
                  category={p.frontmatter.category}
                  featuredImage={p.frontmatter.featuredImage}
                  readTime={p.readTime.text}
                  date={formatDate(p.frontmatter.date)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
