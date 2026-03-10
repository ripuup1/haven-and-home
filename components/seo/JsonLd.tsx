import type { PostFrontmatter } from "@/lib/mdx";

// ---------------------------------------------------------------------------
// Article Schema (for individual blog posts)
// ---------------------------------------------------------------------------

interface ArticleSchemaProps {
  frontmatter: PostFrontmatter;
  url: string;
}

export function ArticleSchema({ frontmatter, url }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    author: {
      "@type": "Organization",
      name: "Haven & Home",
      url: "https://havenandhome.live",
    },
    publisher: {
      "@type": "Organization",
      name: "Haven & Home",
      url: "https://havenandhome.live",
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastModified || frontmatter.date,
    mainEntityOfPage: url,
    image: frontmatter.featuredImage,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// FAQ Schema (generated from FAQ content in blog posts)
// ---------------------------------------------------------------------------

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Product Schema (for ProductCard components)
// ---------------------------------------------------------------------------

interface ProductSchemaProps {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: string;
  affiliateUrl: string;
}

export function ProductSchema({
  name,
  description,
  price,
  rating,
  reviewCount,
  affiliateUrl,
}: ProductSchemaProps) {
  const numericPrice = price.replace(/[^0-9.]/g, "");
  const numericReviews = reviewCount.replace(/[^0-9]/g, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    offers: {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: affiliateUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: parseInt(numericReviews) || 1000,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Website Schema (for the homepage)
// ---------------------------------------------------------------------------

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Haven & Home",
    description:
      "Curated home decor ideas, organization solutions, and honest product recommendations.",
    url: "https://havenandhome.live",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
