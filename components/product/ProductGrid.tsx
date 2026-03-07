"use client";

import ProductCard from "./ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export interface Product {
  name: string;
  price: string;
  rating: number;
  reviewCount: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  category?: string;
}

export default function ProductGrid({ products, category }: ProductGridProps) {
  const filtered = category
    ? products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      )
    : products;

  if (filtered.length === 0) {
    return (
      <p className="py-12 text-center font-body text-medium-gray">
        No products found{category ? ` in "${category}"` : ""}.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map((product, index) => (
        <ScrollReveal key={product.affiliateUrl} delay={index * 0.08}>
          <ProductCard
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviewCount={product.reviewCount}
            description={product.description}
            imageUrl={product.imageUrl}
            affiliateUrl={product.affiliateUrl}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
