"use client";

import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: string;
  rating: number;
  reviewCount: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
}

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating);
    stars.push(
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className={filled ? "text-warm-gold" : "text-clay/40"}
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </div>
  );
}

export default function ProductCard({
  name,
  price,
  rating,
  reviewCount,
  description,
  imageUrl,
  affiliateUrl,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row rounded-xl border border-[#e5ddd0] bg-soft-white overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-charcoal/8">
      {/* Product Image */}
      <div className="relative w-full sm:w-48 md:w-56 shrink-0 aspect-square sm:aspect-auto sm:min-h-full overflow-hidden bg-cream">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 639px) 100vw, 224px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="flex flex-col justify-between gap-3 p-5 sm:p-6">
        <div className="space-y-2">
          {/* Product Name */}
          <h3 className="font-heading text-lg font-bold leading-snug text-charcoal">
            {name}
          </h3>

          {/* Price */}
          <p className="text-xl font-bold text-terracotta">{price}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={rating} />
            <span className="text-xs text-medium-gray">({reviewCount})</span>
          </div>

          {/* Description */}
          <p className="font-body text-sm leading-relaxed text-medium-gray line-clamp-3">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-2 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-terracotta px-6 py-2.5 font-body text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:bg-terracotta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          Shop on Amazon
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
        </a>
      </div>
    </div>
  );
}
