"use client";

import { useEffect, useState, useCallback } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting from the top
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
      }
    },
    []
  );

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <h4 className="mb-4 font-heading text-base font-bold text-charcoal">
        In This Article
      </h4>

      <ul className="flex flex-col gap-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          const isH3 = heading.level === 3;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`block border-l-2 py-1.5 font-body text-sm transition-colors duration-200 ${
                  isH3 ? "pl-6" : "pl-4"
                } ${
                  isActive
                    ? "border-terracotta font-medium text-terracotta"
                    : "border-transparent text-medium-gray hover:border-clay/30 hover:text-charcoal"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
