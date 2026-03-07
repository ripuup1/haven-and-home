"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clsx } from "clsx";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in seconds before the animation starts */
  delay?: number;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
