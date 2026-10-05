import { PLACES_LEFT } from "@/lib/commitment";
import { commitment } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CommitmentCalculator } from "./CommitmentCalculator";

/**
 * Founding gym commitment — replaces pricing. Dark band, two panels.
 * When PLACES_LEFT reaches 0 the section changes rather than staying up.
 */
export function Commitment() {
  const full = PLACES_LEFT <= 0;

  return (
    <section
      id="commitment"
      aria-labelledby="commitment-title"
      className="on-dark section bg-dark text-on-dark"
    >
      <div className="mx-auto max-w-page">
        {full ? (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{commitment.eyebrow}</p>
            <h2 id="commitment-title" className="mt-4">
              {commitment.full.title}
            </h2>
            <p className="mt-4 text-[17px] text-on-dark-sec">
              {commitment.full.body}
            </p>
            <Button
              href={commitment.full.cta.href}
              variant="bright"
              size="lg"
              className="mt-8"
            >
              {commitment.full.cta.label}
            </Button>
          </Reveal>
        ) : (
          <>
            <SectionHeader
              id="commitment-title"
              eyebrow={commitment.eyebrow}
              title={commitment.title}
              intro={commitment.intro}
            />
            <Reveal delay={1}>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-on-dark px-3.5 py-1.5 text-sm font-semibold text-on-dark-sec">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-accent-bright"
                />
                {commitment.placesLeft(PLACES_LEFT)}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <CommitmentCalculator />
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
