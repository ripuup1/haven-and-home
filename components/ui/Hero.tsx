"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 pt-8 text-center">
      {/* Content card — frosted glass panel on the wood */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 rounded-2xl bg-soft-white/80 px-10 py-14 shadow-lg shadow-charcoal/8 backdrop-blur-sm sm:px-16 sm:py-16"
      >
        <h1 className="logo-3d font-heading text-5xl font-bold tracking-tight text-charcoal sm:text-6xl md:text-7xl">
          Haven &amp; Home
        </h1>

        <p className="mt-4 font-accent text-xl italic text-medium-gray sm:text-2xl">
          Spaces worth coming home to.
        </p>

        <div className="mt-3 mx-auto h-px w-24 bg-terracotta/40" />

        <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-medium-gray sm:text-base">
          Curated home decor ideas, organization tips, and honest product
          recommendations to help you create a home you love.
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
        className="absolute bottom-6 z-10 flex flex-col items-center gap-1"
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
