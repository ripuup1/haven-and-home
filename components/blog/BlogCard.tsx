import Link from "next/link";
import Image from "next/image";
import PinItButton from "@/components/ui/PinItButton";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  readTime: string;
  date: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  category,
  featuredImage,
  readTime,
  date,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-lg bg-soft-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-charcoal/10"
    >
      {/* Featured Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={featuredImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-olive px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-white">
          {category}
        </span>

        {/* Pin It Button */}
        <PinItButton
          imageUrl={featuredImage}
          description={`${title} — Haven & Home`}
          pageUrl={`https://havenandhome.co/blog/${slug}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-heading text-xl font-bold leading-snug text-charcoal transition-colors duration-200 group-hover:text-terracotta">
          {title}
        </h3>

        <p className="line-clamp-3 font-body text-sm leading-relaxed text-medium-gray">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="mt-2 flex items-center gap-3 border-t border-clay/15 pt-3 font-body text-xs text-medium-gray">
          <span>{readTime}</span>
          <span className="text-clay/40">&bull;</span>
          <time dateTime={date}>{date}</time>
        </div>
      </div>
    </Link>
  );
}
