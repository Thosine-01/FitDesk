import { PLACES_LEFT } from "@/lib/commitment";
import { hero } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { HeroSlideshow } from "./HeroSlideshow";

export function Hero() {
  const slides = hero.slides.map((slot, i) => (
    <Figure
      key={slot}
      slot={slot}
      fill
      sizes="100vw"
      quality={60}
      preload={i === 0}
    />
  ));

  return (
    <section
      id="hero"
      className="on-dark relative isolate flex overflow-hidden bg-dark px-5 pt-32 pb-10 text-on-dark sm:min-h-[min(88vh,880px)] sm:items-end sm:px-8 sm:pt-40 sm:pb-14"
    >
      <HeroSlideshow slides={slides}>
        {/* The badge carries the scarcity; once places are gone it reverts. */}
        {PLACES_LEFT > 0 ? (
          <p className="inline-flex items-center gap-2 rounded-full border border-border-on-dark bg-dark/50 px-3.5 py-1.5 text-[13px] font-bold text-on-dark backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-accent-bright"
            />
            {hero.badge}
          </p>
        ) : (
          <p className="eyebrow">{hero.eyebrow}</p>
        )}
        <h1 className="mt-5 max-w-[13ch]">
          {hero.headline.before}
          <span className="text-accent-bright">{hero.headline.highlight}</span>
          {hero.headline.after}
        </h1>
        <p className="mt-6 max-w-[34rem] text-[17px] text-on-dark-sec sm:text-lg">
          {hero.sub}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={hero.primaryCta.href} variant="bright" size="lg">
            {hero.primaryCta.label}
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="outline-dark"
            size="lg"
          >
            {hero.secondaryCta.label}
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-sm text-on-dark-muted">
          {hero.offer.map((item, i) => (
            <li key={item} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              {item}
            </li>
          ))}
        </ul>
      </HeroSlideshow>
    </section>
  );
}
