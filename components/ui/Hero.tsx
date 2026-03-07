"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-cream px-4 text-center">
      {/* Warm gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-terracotta/5 via-transparent to-warm-gold/10"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-charcoal">
          Haven &amp; Home
        </h1>

        <p className="mt-4 font-accent text-xl sm:text-2xl italic text-medium-gray">
          Spaces worth coming home to.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1"
      >
        <span className="font-body text-xs uppercase tracking-widest text-medium-gray/60">
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
          className="text-medium-gray/50"
        >
          <polyline points="4 7 10 13 16 7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
