"use client";

import { useEffect, useState, type ReactNode } from "react";
import { hero } from "@/lib/content";

const INTERVAL = 5200; // ms per slide; the 0.9s cross-fade lives in CSS

/**
 * Background slides + the indicator bars beneath the hero copy.
 * Autoplay stops for good the moment someone uses an indicator, and never
 * starts under prefers-reduced-motion.
 */
export function HeroSlideshow({
  slides,
  children,
}: {
  slides: ReactNode[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  const go = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setPrev(active);
      setActive((active + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, autoplay, slides.length]);

  return (
    <>
      <div
        className="absolute inset-0 overflow-hidden"
        role="group"
        aria-roledescription="slideshow"
        aria-label={hero.slideshowLabel}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className={`hero-slide absolute inset-0 ${
              i === active ? "is-active" : i === prev ? "is-leaving" : ""
            }`}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      <div className="hero-scrim-top absolute inset-0" aria-hidden="true" />

      <div className="hero-copy relative mx-auto w-full max-w-page">
        {children}

        <div className="mt-8 flex gap-1 sm:mt-10 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setAutoplay(false);
                go(i);
              }}
              aria-label={`${hero.indicatorLabel} ${i + 1}: ${hero.slideLabels[i]}`}
              aria-pressed={i === active}
              className="group flex h-11 w-14 items-center rounded-sm sm:h-8 sm:w-12"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-border-on-dark transition-colors group-hover:bg-on-dark-muted">
                {i === active && (
                  <span
                    key={`${active}-${autoplay}`}
                    className={`absolute inset-0 rounded-full bg-accent-bright ${
                      autoplay ? "hero-progress" : ""
                    }`}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
