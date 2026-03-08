"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

const rightLinks = [
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for transparent → opaque transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClasses = (href: string) =>
    `font-body text-sm font-semibold tracking-widest uppercase transition-colors relative py-1 ${
      isActive(href)
        ? "text-terracotta"
        : "text-charcoal/80 hover:text-terracotta"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-lg border-b border-clay/20 shadow-md shadow-charcoal/8"
          : "bg-cream/40 backdrop-blur-sm border-b border-clay/10"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-22 items-center justify-between md:justify-center">
          {/* Desktop: Left nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link href="/" className="group flex items-center gap-3 md:mx-14">
            <Image
              src="/images/logo-transparent.png"
              alt="Haven & Home"
              width={56}
              height={56}
              className="transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop: Right nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-md text-charcoal transition-colors hover:text-terracotta"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-cream/85 backdrop-blur-lg shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-20 px-6">
          <nav className="flex flex-col gap-2">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-lg font-medium tracking-wide py-3 px-4 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-terracotta bg-terracotta/10"
                    : "text-charcoal hover:text-terracotta hover:bg-terracotta/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile drawer tagline */}
          <div className="mt-auto pt-12 pb-8 border-t border-clay/20">
            <p className="font-accent text-base italic text-medium-gray">
              Spaces worth coming home to.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
