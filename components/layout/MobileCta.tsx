"use client";

import { useEffect, useState } from "react";
import { mobileCta } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Sticky bottom bar under 980px. Appears once the hero (#hero) has scrolled
 * out; hides while the form (#early-access) or the footer is on screen, so it
 * never covers the thing it points at.
 */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [targetInView, setTargetInView] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const targets = ["early-access", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const heroIo = new IntersectionObserver(([e]) =>
      setPastHero(!e.isIntersecting),
    );
    if (hero) heroIo.observe(hero); // home page only; always present there

    const visible = new Set<Element>();
    const targetIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setTargetInView(visible.size > 0);
    });
    targets.forEach((t) => targetIo.observe(t));

    return () => {
      heroIo.disconnect();
      targetIo.disconnect();
    };
  }, []);

  const shown = pastHero && !targetInView;

  return (
    <div
      className={`on-dark fixed inset-x-0 bottom-0 z-30 border-t border-border-on-dark bg-dark/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 nav:hidden ${
        shown ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <Button
          href={whatsappLink("mobile_cta")}
          variant="outline-dark"
          className="flex-1"
        >
          <Icon name="whatsapp" />
          {mobileCta.whatsappLabel}
        </Button>
        <Button
          href={mobileCta.primary.href}
          variant="bright"
          className="flex-[1.4]"
        >
          {mobileCta.primary.label}
        </Button>
      </div>
    </div>
  );
}
