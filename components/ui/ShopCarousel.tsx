"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ShopProduct {
  name: string;
  price: string;
  image: string;
  url: string;
}

export default function ShopCarousel({ products }: { products: ShopProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
  }

  return (
    <div className="relative mt-10">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg shadow-charcoal/10 backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg shadow-charcoal/10 backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {products.map((product) => (
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
