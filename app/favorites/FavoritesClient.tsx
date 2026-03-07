"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Product {
  name: string;
  price: string;
  rating: number;
  reviewCount: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
}

const CATEGORIES = [
  "All",
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Living Room",
  "Office",
  "Decor",
];

const PRODUCTS: Product[] = [
  // Kitchen
  {
    name: "Bamboo Drawer Organizer (Set of 6)",
    price: "$29.99",
    rating: 4.7,
    reviewCount: "3,240",
    description:
      "Expandable bamboo dividers that fit any drawer size. Perfect for utensils, gadgets, and junk drawer chaos. We use these in every kitchen we organize.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE01?tag=havenandhomec-20",
    category: "Kitchen",
  },
  {
    name: "Ceramic Utensil Holder Crock",
    price: "$24.99",
    rating: 4.5,
    reviewCount: "1,870",
    description:
      "Heavy, sturdy, and genuinely beautiful on the counter. The matte finish resists fingerprints and comes in six neutral colorways.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE02?tag=havenandhomec-20",
    category: "Kitchen",
  },
  {
    name: "Glass Airtight Food Storage Set",
    price: "$39.99",
    rating: 4.8,
    reviewCount: "5,120",
    description:
      "12-piece borosilicate glass set with bamboo lids. Microwave and dishwasher safe. Makes your pantry look like a magazine spread.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE03?tag=havenandhomec-20",
    category: "Kitchen",
  },
  // Bathroom
  {
    name: "Teak Shower Bench",
    price: "$79.99",
    rating: 4.6,
    reviewCount: "2,430",
    description:
      "Solid teak wood with a waterproof finish. Turns any shower into a spa experience. Holds up beautifully even after months of daily use.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE04?tag=havenandhomec-20",
    category: "Bathroom",
  },
  {
    name: "Matte Black Bathroom Accessories Set",
    price: "$32.99",
    rating: 4.4,
    reviewCount: "1,560",
    description:
      "Soap dispenser, toothbrush holder, tumbler, and soap dish in a sleek matte black finish. Instant bathroom upgrade for under $35.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE05?tag=havenandhomec-20",
    category: "Bathroom",
  },
  {
    name: "Turkish Cotton Towel Set (6-Piece)",
    price: "$44.99",
    rating: 4.7,
    reviewCount: "8,910",
    description:
      "Hotel-quality Turkish cotton at a fraction of the price. Gets softer with every wash. The oatmeal color is our absolute favorite.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE06?tag=havenandhomec-20",
    category: "Bathroom",
  },
  // Bedroom
  {
    name: "Linen Duvet Cover Set",
    price: "$89.99",
    rating: 4.6,
    reviewCount: "4,320",
    description:
      "Stonewashed French linen that's impossibly soft from day one. The relaxed, lived-in look is effortlessly chic. Includes two pillow shams.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE07?tag=havenandhomec-20",
    category: "Bedroom",
  },
  {
    name: "Bedside Floating Shelf (Set of 2)",
    price: "$26.99",
    rating: 4.3,
    reviewCount: "2,150",
    description:
      "Minimalist wall-mounted shelves that replace bulky nightstands. Perfect for small bedrooms. Each shelf holds up to 15 lbs.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE08?tag=havenandhomec-20",
    category: "Bedroom",
  },
  {
    name: "Blackout Curtains (2 Panels)",
    price: "$34.99",
    rating: 4.5,
    reviewCount: "12,430",
    description:
      "100% blackout with a linen-look texture. Block light without sacrificing style. The ivory color looks incredible in any bedroom.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE09?tag=havenandhomec-20",
    category: "Bedroom",
  },
  // Living Room
  {
    name: "Chunky Knit Throw Blanket",
    price: "$49.99",
    rating: 4.8,
    reviewCount: "6,780",
    description:
      "The cozy factor is off the charts. Handwoven chenille that drapes beautifully over a sofa or chair. A best-seller for a reason.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE10?tag=havenandhomec-20",
    category: "Living Room",
  },
  {
    name: "Woven Seagrass Storage Baskets (Set of 3)",
    price: "$38.99",
    rating: 4.5,
    reviewCount: "3,670",
    description:
      "Natural seagrass with cotton rope handles. Three nesting sizes for flexible storage. Gorgeous as plant holders or blanket baskets.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE11?tag=havenandhomec-20",
    category: "Living Room",
  },
  {
    name: "Gold Round Wall Mirror (24\")",
    price: "$45.99",
    rating: 4.6,
    reviewCount: "2,890",
    description:
      "Brushed gold frame with a subtle Art Deco feel. Makes any room look bigger and brighter. The quality rivals mirrors three times the price.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE12?tag=havenandhomec-20",
    category: "Living Room",
  },
  // Office
  {
    name: "Monitor Stand with Storage",
    price: "$36.99",
    rating: 4.4,
    reviewCount: "4,510",
    description:
      "Bamboo monitor riser with two drawers and side compartments. Elevates your screen to the perfect ergonomic height while decluttering your desk.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE13?tag=havenandhomec-20",
    category: "Office",
  },
  {
    name: "Desk Organizer & Pencil Holder",
    price: "$19.99",
    rating: 4.3,
    reviewCount: "2,340",
    description:
      "Five-compartment wooden organizer that keeps pens, notepads, and supplies tidy. The walnut finish adds warmth to any workspace.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE14?tag=havenandhomec-20",
    category: "Office",
  },
  {
    name: "Ergonomic Lumbar Support Pillow",
    price: "$29.99",
    rating: 4.5,
    reviewCount: "7,890",
    description:
      "Memory foam lumbar pillow with a breathable mesh cover. A game-changer for long work days. Fits any office chair or car seat.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE15?tag=havenandhomec-20",
    category: "Office",
  },
  // Decor
  {
    name: "Dried Pampas Grass Bouquet",
    price: "$22.99",
    rating: 4.4,
    reviewCount: "5,670",
    description:
      "60 stems of natural and white pampas grass. Lasts forever, no watering needed. The easiest way to add texture and warmth to any room.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE16?tag=havenandhomec-20",
    category: "Decor",
  },
  {
    name: "Soy Candle Set (3-Pack)",
    price: "$24.99",
    rating: 4.7,
    reviewCount: "3,450",
    description:
      "Hand-poured soy candles in amber glass jars. Scents include vanilla bean, cedarwood, and lavender sage. Clean burn with incredible throw.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE17?tag=havenandhomec-20",
    category: "Decor",
  },
  {
    name: "Linen Throw Pillow Covers (Set of 4)",
    price: "$27.99",
    rating: 4.5,
    reviewCount: "4,120",
    description:
      "Pre-washed linen blend in coordinating neutral tones. Hidden zipper closure. The fastest way to refresh your sofa or bed for under $30.",
    imageUrl: "/images/products/placeholder.jpg",
    affiliateUrl: "https://www.amazon.com/dp/B0EXAMPLE18?tag=havenandhomec-20",
    category: "Decor",
  },
];

export default function FavoritesClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter(
          (product) =>
            product.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="bg-soft-white">
      {/* Page Header */}
      <section className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <ScrollReveal>
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl">
              Our Favorites
            </h1>
            <p className="mt-4 font-body text-lg text-medium-gray max-w-2xl mx-auto">
              Every product here has been personally vetted by our team. These
              are the items we reach for again and again in our own homes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-20 border-b border-clay/10 bg-soft-white/95 backdrop-blur-sm px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Results Count */}
          <p className="mb-6 font-body text-sm text-medium-gray">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {activeCategory !== "All" && (
              <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
            )}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <ScrollReveal key={product.name} delay={index * 0.05}>
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
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-heading text-2xl font-bold text-charcoal">
                No products found
              </p>
              <p className="mt-2 font-body text-medium-gray">
                We don&apos;t have any products in &ldquo;{activeCategory}&rdquo;
                yet. Check back soon!
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-6 rounded-lg bg-terracotta px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-terracotta-dark"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="border-t border-clay/15 bg-soft-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-lg bg-cream/60 p-6">
              <h3 className="font-heading text-base font-semibold text-charcoal">
                Affiliate Disclosure
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-medium-gray">
                Haven &amp; Home is a participant in the Amazon Services LLC
                Associates Program, an affiliate advertising program designed to
                provide a means for sites to earn advertising fees by advertising
                and linking to Amazon.com. When you purchase through our links, we
                may earn a small commission at no extra cost to you. This helps us
                keep the site running and continue creating content we love. We
                only recommend products we genuinely believe in.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
