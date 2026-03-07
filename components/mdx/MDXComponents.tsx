import React from 'react';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Turn heading text into a URL-friendly slug for anchor linking.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Recursively extract the plain text content from React children so we can
 * slugify heading text regardless of whether it contains inline elements.
 */
function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join('');
  if (React.isValidElement(children) && children.props) {
    return getTextContent((children.props as { children?: React.ReactNode }).children);
  }
  return '';
}

// ---------------------------------------------------------------------------
// Custom heading components
// ---------------------------------------------------------------------------

function CustomH2({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) {
  const text = getTextContent(children);
  const id = slugify(text);
  return (
    <h2 id={id} {...props}>
      {children}
    </h2>
  );
}

function CustomH3({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  const text = getTextContent(children);
  const id = slugify(text);
  return (
    <h3 id={id} {...props}>
      {children}
    </h3>
  );
}

// ---------------------------------------------------------------------------
// Styled blockquote
// ---------------------------------------------------------------------------

function StyledBlockquote({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      className="font-accent italic border-l-4 border-terracotta pl-4 my-6 text-medium-gray"
      {...props}
    >
      {children}
    </blockquote>
  );
}

// ---------------------------------------------------------------------------
// Styled link (terracotta with hover, external links open in new tab)
// ---------------------------------------------------------------------------

function StyledLink({
  href = '',
  children,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  return (
    <a
      href={href}
      className="text-terracotta underline underline-offset-2 hover:text-terracotta/80 transition-colors"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Image wrapper using next/image
// ---------------------------------------------------------------------------

function MDXImage(props: React.ComponentPropsWithoutRef<'img'>) {
  const { src, alt, width, height } = props;

  if (!src || typeof src !== 'string') return null;

  return (
    <span className="block my-6">
      <Image
        src={src}
        alt={alt ?? ''}
        width={Number(width) || 800}
        height={Number(height) || 450}
        className="rounded-lg w-full h-auto"
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component mapping for next-mdx-remote
// ---------------------------------------------------------------------------

const components = {
  ProductCard,
  h2: CustomH2,
  h3: CustomH3,
  blockquote: StyledBlockquote,
  a: StyledLink,
  img: MDXImage,
};

export default components;
