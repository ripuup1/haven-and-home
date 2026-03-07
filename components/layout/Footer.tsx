import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

const categoryLinks = [
  { href: "/blog", label: "Kitchen" },
  { href: "/blog", label: "Bathroom" },
  { href: "/blog", label: "Bedroom" },
  { href: "/blog", label: "Living Room" },
  { href: "/blog", label: "Organization" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-clay/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight text-charcoal">
                Haven &amp; Home
              </span>
            </Link>
            <p className="mt-3 font-accent text-lg italic text-medium-gray">
              Spaces worth coming home to.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-medium-gray">
              Curated home decor ideas, organization tips, and honest product
              recommendations to help you create a home you love.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="font-heading text-base font-semibold text-charcoal mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-medium-gray transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-heading text-base font-semibold text-charcoal mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-medium-gray transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-heading text-base font-semibold text-charcoal mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {/* Pinterest */}
              <a
                href="https://pinterest.com/havenandhomeco"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-medium-gray transition-colors hover:text-terracotta"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Pinterest
              </a>

              {/* Email */}
              <a
                href="mailto:hello@havenandhome.co"
                className="inline-flex items-center gap-2 font-body text-sm text-medium-gray transition-colors hover:text-terracotta"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="border-t border-clay/20 py-6">
          <p className="font-body text-xs leading-relaxed text-medium-gray text-center max-w-2xl mx-auto">
            Haven &amp; Home is a participant in the Amazon Services LLC
            Associates Program, an affiliate advertising program designed to
            provide a means for sites to earn advertising fees by advertising and
            linking to Amazon.com. Some links on this site are affiliate links,
            meaning we may earn a small commission at no extra cost to you.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-clay/20 py-5">
          <p className="font-body text-xs text-medium-gray text-center">
            &copy; {currentYear} Haven &amp; Home. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
