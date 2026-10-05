"use client";

import { useEffect, type ElementType, type ReactNode } from "react";

/**
 * One IntersectionObserver for the whole page. Any element with the `reveal`
 * class fades up the first time it enters the viewport, then is unobserved.
 * A MutationObserver picks up `.reveal` elements rendered after mount.
 */
export function RevealProvider() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    const observe = (root: ParentNode) =>
      root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    observe(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".reveal:not(.in)")) io.observe(node);
          observe(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

type RevealProps = {
  as?: ElementType;
  /** Stagger step: 1 = 80ms, 2 = 160ms, 3 = 240ms. */
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: RevealProps) {
  const d = delay ? ` reveal-d${delay}` : "";
  return <Tag className={`reveal${d} ${className}`.trim()}>{children}</Tag>;
}
