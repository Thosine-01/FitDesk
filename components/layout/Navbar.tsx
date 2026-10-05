"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

/**
 * Transparent over the home hero, solid dark once scrolled (and on every other
 * page). Under 980px the links collapse into a full-screen panel: body scroll
 * locked, Escape closes, focus trapped, focus returned to the toggle on close.
 */
export function Navbar() {
  const onHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows past the breakpoint while open.
    const mq = window.matchMedia("(min-width: 980px)");
    const onMq = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const solid = scrolled || !onHome;

  return (
    <>
      <header
        className={`on-dark fixed inset-x-0 top-0 z-40 text-on-dark transition-[background-color,border-color] duration-300 ${
          solid
            ? "border-b border-border-on-dark bg-dark/95 backdrop-blur"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-page items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label={nav.homeLabel} className="rounded-sm">
            <Logo onDark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 nav:flex">
            <ul className="flex items-center gap-7 text-[15px] font-semibold text-on-dark-sec">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-sm transition-colors hover:text-on-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={nav.cta.href} variant="bright">
              {nav.cta.label}
            </Button>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={nav.menuLabel}
            className="-mr-2 flex size-11 items-center justify-center rounded-md nav:hidden"
          >
            <Icon name="menu" className="size-6" />
          </button>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would contain a fixed child. */}
      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={nav.menuTitle}
          className="on-dark fixed inset-0 z-50 flex flex-col bg-dark px-5 pb-[max(24px,env(safe-area-inset-bottom))] text-on-dark nav:hidden"
        >
          <div className="flex h-18 items-center justify-between">
            <Link
              href="/"
              aria-label={nav.homeLabel}
              onClick={() => setOpen(false)}
              className="rounded-sm"
            >
              <Logo onDark />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label={nav.closeLabel}
              className="-mr-2 flex size-11 items-center justify-center rounded-md"
            >
              <Icon name="close" className="size-6" />
            </button>
          </div>

          <nav aria-label="Main" className="mt-6 flex flex-1 flex-col">
            <ul className="flex flex-col">
              {nav.links.map((l) => (
                <li key={l.href} className="border-b border-border-on-dark">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-[28px] font-semibold tracking-[-0.03em]"
                    style={{ fontVariationSettings: "'opsz' 32" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              variant="bright"
              size="lg"
              className="mt-auto w-full"
            >
              {nav.cta.label}
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
