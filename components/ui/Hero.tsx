"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Wood background — matches the fixed texture, local to hero */}
      <Image
        src="/images/wood-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-75"
      />

      {/* Subtle dark vignette for depth and text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/10"
      />
      {/* Warm cream fade at bottom to blend into page content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/60"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <h1 className="font-heading text-5xl font-bold tracking-tight text-charcoal sm:text-6xl md:text-7xl">
          Haven &amp; Home
        </h1>

        <p className="mt-4 font-accent text-xl italic text-charcoal/70 sm:text-2xl">
          Spaces worth coming home to.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/blog"
            className="rounded-lg bg-terracotta px-8 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-terracotta-dark"
          >
            Read the Blog
          </Link>
          <Link
            href="/favorites"
            className="rounded-lg border-2 border-charcoal/20 px-8 py-3 font-body text-sm font-bold text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
          >
            Shop Our Picks
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1"
      >
        <span className="font-body text-xs uppercase tracking-widest text-charcoal/40">
          Scroll
        </span>
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-charcoal/30"
        >
          <polyline points="4 7 10 13 16 7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
