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
    name: "Adjustable Bamboo Drawer Dividers (Set of 4)",
    price: "$24",
    rating: 4.7,
    reviewCount: "3,200+",
    description:
      "Expandable bamboo dividers that fit any drawer size. Perfect for utensils, gadgets, and junk drawer chaos. We use these in every kitchen we organize.",
    imageUrl: "/images/products/adjustable_bamboo_drawer_dividers_set_of_4.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=adjustable+bamboo+drawer+dividers+set+of+4&tag=havenandhomec-20",
    category: "Kitchen",
  },
  {
    name: "Bamboo Lazy Susan Turntable",
    price: "$18",
    rating: 4.5,
    reviewCount: "8,400+",
    description:
      "10-inch turntable that makes cabinet corners actually usable. Spins smoothly, holds spices, oils, or condiments without anything sliding off.",
    imageUrl: "/images/products/bamboo_lazy_susan_turntable_kitchen_cabinet_10_inch.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=bamboo+lazy+susan+turntable+kitchen+10+inch&tag=havenandhomec-20",
    category: "Kitchen",
  },
  {
    name: "Over-Door Pantry Organizer (9 Tier)",
    price: "$28",
    rating: 4.6,
    reviewCount: "5,100+",
    description:
      "Nine tiers of storage that mount over any standard pantry door. Holds spices, cans, snacks, and wraps without taking up any shelf space.",
    imageUrl: "/images/products/over_door_pantry_organizer_9_tier.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=over+door+pantry+organizer+9+tier&tag=havenandhomec-20",
    category: "Kitchen",
  },
  // Bathroom
  {
    name: "Adhesive Shower Caddy (Stainless Steel)",
    price: "$16",
    rating: 4.5,
    reviewCount: "14,200+",
    description:
      "No-drilling stainless steel shower caddy that actually stays put. Holds shampoo, conditioner, body wash, and a razor without rusting.",
    imageUrl: "/images/products/adhesive_shower_caddy_stainless_steel_no_drilling.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=adhesive+shower+caddy+stainless+steel+no+drilling&tag=havenandhomec-20",
    category: "Bathroom",
  },
  {
    name: "Ceramic Soap Dispenser Set",
    price: "$22",
    rating: 4.4,
    reviewCount: "2,800+",
    description:
      "Matching soap dispenser and toothbrush holder in a clean matte finish. Instantly makes your bathroom counter look put together.",
    imageUrl: "/images/products/ceramic_soap_dispenser_set_bathroom.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=ceramic+soap+dispenser+set+bathroom+matte&tag=havenandhomec-20",
    category: "Bathroom",
  },
  {
    name: "Glass Apothecary Jars (3-Pack)",
    price: "$19",
    rating: 4.6,
    reviewCount: "4,300+",
    description:
      "Three glass jars with lids for cotton balls, swabs, and bath salts. The kind of small touch that makes your bathroom feel like a spa.",
    imageUrl: "/images/products/glass_apothecary_jars_bathroom_set_3_pack.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=glass+apothecary+jars+bathroom+set+3+pack&tag=havenandhomec-20",
    category: "Bathroom",
  },
  // Bedroom
  {
    name: "White Duvet Cover Set (Queen)",
    price: "$38",
    rating: 4.6,
    reviewCount: "9,800+",
    description:
      "Crisp white microfiber duvet cover with a soft, hotel-quality feel. Includes two pillow shams. Machine washable and wrinkle-resistant.",
    imageUrl: "/images/products/white_duvet_cover_set_queen.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=white+duvet+cover+set+queen+soft+hotel&tag=havenandhomec-20",
    category: "Bedroom",
  },
  {
    name: "Euro Pillow Shams 26x26 (Set of 2)",
    price: "$24",
    rating: 4.5,
    reviewCount: "3,400+",
    description:
      "Oversized Euro shams that instantly make your bed look styled and layered. Crisp white with a subtle texture. The easiest bed upgrade there is.",
    imageUrl: "/images/products/euro_pillow_shams_26x26_set_of_2_white.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=euro+pillow+shams+26x26+white+set+of+2&tag=havenandhomec-20",
    category: "Bedroom",
  },
  {
    name: "Bed Risers with USB Outlets",
    price: "$29",
    rating: 4.4,
    reviewCount: "6,200+",
    description:
      "Raises your bed 3 inches for extra storage underneath, and each riser has built-in USB and power outlets. Two problems solved in one product.",
    imageUrl: "/images/products/bed_risers_with_USB_outlets_power.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=bed+risers+with+USB+outlets+power&tag=havenandhomec-20",
    category: "Bedroom",
  },
  // Living Room
  {
    name: "Chunky Knit Throw Blanket",
    price: "$34",
    rating: 4.7,
    reviewCount: "6,800+",
    description:
      "The cozy factor is off the charts. Machine-washable chenille that drapes beautifully over a sofa or chair. A best-seller for a reason.",
    imageUrl: "/images/products/chunky_knit_throw_blanket_machine_washable.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=chunky+knit+throw+blanket+machine+washable&tag=havenandhomec-20",
    category: "Living Room",
  },
  {
    name: "Woven Storage Basket (Large)",
    price: "$26",
    rating: 4.5,
    reviewCount: "3,700+",
    description:
      "Natural woven basket with handles. Perfect for blankets, pillows, or toys. Looks great next to a sofa or in a nursery.",
    imageUrl: "/images/products/woven_storage_basket_large_living_room.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=large+woven+storage+basket+living+room+blankets&tag=havenandhomec-20",
    category: "Living Room",
  },
  {
    name: "Flameless LED Candles with Remote (Set)",
    price: "$22",
    rating: 4.6,
    reviewCount: "11,500+",
    description:
      "Realistic flickering LED candles with a timer and remote. Set them once and they turn on every evening. All the ambiance, none of the fire risk.",
    imageUrl: "/images/products/flameless_LED_candles_with_remote_set.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=flameless+LED+candles+with+remote+timer+set&tag=havenandhomec-20",
    category: "Living Room",
  },
  // Office
  {
    name: "Bamboo Desk Organizer with Drawers",
    price: "$28",
    rating: 4.5,
    reviewCount: "4,500+",
    description:
      "Multi-compartment bamboo organizer with two small drawers. Keeps pens, notepads, and supplies tidy. The warm wood finish adds character to any desk.",
    imageUrl: "/images/products/bamboo_desk_organizer_with_drawers.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=bamboo+desk+organizer+with+drawers&tag=havenandhomec-20",
    category: "Office",
  },
  {
    name: "Monitor Stand Riser with Storage",
    price: "$32",
    rating: 4.4,
    reviewCount: "7,200+",
    description:
      "Raises your monitor to ergonomic height with storage drawers underneath. Clears up desk space and reduces neck strain. Looks clean and minimal.",
    imageUrl: "/images/products/monitor_stand_riser_with_storage.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=monitor+stand+riser+with+storage+drawers&tag=havenandhomec-20",
    category: "Office",
  },
  {
    name: "Under-Desk Cable Management Tray",
    price: "$16",
    rating: 4.3,
    reviewCount: "5,600+",
    description:
      "Clips under your desk to hide every cable, power strip, and adapter. Takes two minutes to install and makes your desk look immediately cleaner.",
    imageUrl: "/images/products/under_desk_cable_management_tray.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=under+desk+cable+management+tray&tag=havenandhomec-20",
    category: "Office",
  },
  // Decor
  {
    name: "Ceramic Vase Set of 3 (Matte White)",
    price: "$24",
    rating: 4.5,
    reviewCount: "5,200+",
    description:
      "Three minimalist matte ceramic vases in varying heights. Beautiful with dried stems, fresh flowers, or completely empty. The perfect shelf accent.",
    imageUrl: "/images/products/ceramic_vase_set_of_3_matte_white_minimalist.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=ceramic+vase+set+of+3+matte+white+minimalist&tag=havenandhomec-20",
    category: "Decor",
  },
  {
    name: "Textured Throw Pillow Covers (Set of 2)",
    price: "$18",
    rating: 4.5,
    reviewCount: "4,100+",
    description:
      "Neutral linen-blend pillow covers with a subtle texture. Hidden zipper closure. The fastest way to refresh your sofa or bed for under $20.",
    imageUrl: "/images/products/textured_throw_pillow_covers_18x18_set_of_2_linen_neutral.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=textured+throw+pillow+covers+18x18+set+of+2+neutral&tag=havenandhomec-20",
    category: "Decor",
  },
  {
    name: "Floating Shelves (Set of 3, Rustic Wood)",
    price: "$29",
    rating: 4.6,
    reviewCount: "8,900+",
    description:
      "Three rustic wood floating shelves with invisible brackets. Perfect for photos, plants, and small decor. Easy to install and they hold up to 15 lbs each.",
    imageUrl: "/images/products/floating_shelves_set_of_3_rustic_wood.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=floating+shelves+set+of+3+rustic+wood&tag=havenandhomec-20",
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
    <div>
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

      {/* Floating Card Content */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-soft-white/90 shadow-sm backdrop-blur-sm p-4 sm:p-6 lg:p-8">
          {/* Category Filter */}
          <div className="border-b border-clay/10 pb-4 mb-8">
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Results Count */}
          <p className="mb-6 font-body text-sm text-medium-gray">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {activeCategory !== "All" && (
              <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
            )}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
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
      <section className="px-4 py-10 sm:px-6 lg:px-8">
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
