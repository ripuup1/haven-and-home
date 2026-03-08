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
import PinItButton from "@/components/ui/PinItButton";
import MiniEmailSignup from "@/components/ui/MiniEmailSignup";
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
    other: {
      "pin:media": post.frontmatter.featuredImage,
      "pin:description": `${post.frontmatter.title} — ${post.frontmatter.excerpt} | Haven & Home`,
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
    <article>
      {/* Hero Image */}
      <div className="group relative h-[40vh] min-h-[320px] w-full md:h-[50vh]">
        <Image
          src={post.frontmatter.featuredImage}
          alt={post.frontmatter.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <PinItButton
          imageUrl={post.frontmatter.featuredImage}
          description={`${post.frontmatter.title} — ${post.frontmatter.excerpt} | Haven & Home`}
          pageUrl={`https://www.havenandhome.live/blog/${slug}`}
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

      {/* Floating Card Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl bg-soft-white/90 shadow-sm backdrop-blur-sm">
          {/* Meta bar */}
          <div className="border-b border-clay/20 rounded-t-2xl bg-cream/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 px-6 py-4 font-body text-sm text-medium-gray">
              <span>By {post.frontmatter.author || "Haven & Home"}</span>
              <span className="text-clay">|</span>
              <span>{formatDate(post.frontmatter.date)}</span>
              <span className="text-clay">|</span>
              <span>{post.readTime.text}</span>
            </div>
          </div>

          {/* Content + Sidebar */}
          <div className="px-4 py-8 sm:px-6 sm:py-12">
            <div className="flex flex-col lg:flex-row lg:gap-12">
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
                <div className="mx-auto mt-12 max-w-[720px] rounded-lg border border-clay/20 bg-cream p-6 font-body text-sm leading-relaxed text-medium-gray">
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
                  <MiniEmailSignup />
                </div>
              </aside>
            </div>

            {/* Related Posts */}
            {finalRelated.length > 0 && (
              <section className="mt-16 border-t border-clay/20 pt-12">
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
        </div>
      </div>
    </article>
  );
}
