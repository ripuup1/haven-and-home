"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  // Need to wait for mount before using createPortal
  useEffect(() => setMounted(true), []);

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
    <>
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
              className="md:hidden relative z-[120] flex h-11 w-11 items-center justify-center rounded-lg text-charcoal transition-colors hover:text-terracotta active:bg-charcoal/5"
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
      </header>

      {/* Mobile menu rendered via portal to avoid stacking context issues */}
      {mounted &&
        createPortal(
          <div className="md:hidden">
            {/* Mobile Overlay */}
            <div
              className={`fixed inset-0 z-[100] bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${
                mobileOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Slide-out Drawer */}
            <div
              className={`fixed top-0 right-0 z-[110] h-full w-72 bg-cream shadow-xl transition-transform duration-300 ease-in-out ${
                mobileOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Close button inside drawer */}
              <div className="flex justify-end px-4 pt-5">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-charcoal transition-colors hover:text-terracotta active:bg-charcoal/5"
                  aria-label="Close menu"
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
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex h-[calc(100%-4rem)] flex-col px-6 pb-6">
                <nav className="flex flex-col gap-1">
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

                {/* Mobile drawer footer */}
                <div className="mt-auto border-t border-clay/20 pt-6">
                  <p className="font-accent text-base italic text-medium-gray">
                    Spaces worth coming home to.
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://pinterest.com/havenandhomeco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-sm text-medium-gray transition-colors hover:text-terracotta"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                      Pinterest
                    </a>
                    <a
                      href="https://instagram.com/homeandhavencompany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-sm text-medium-gray transition-colors hover:text-terracotta"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
