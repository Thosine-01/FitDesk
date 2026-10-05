import { howItWorks } from "@/lib/content";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { toneClass } from "@/components/ui/tones";

const cardSizes = "(min-width: 1180px) 380px, (min-width: 768px) 33vw, 100vw";

/** Three numbered steps, a different tint per step number. */
export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="section bg-page">
      <div className="mx-auto max-w-page">
        <SectionHeader
          id="how-title"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {howItWorks.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.slot}
              delay={(i + 1) as 1 | 2 | 3}
              className="lift-card flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-card"
            >
              <Figure slot={step.slot} sizes={cardSizes} />
              <div className="p-6">
                <span
                  className={`num inline-flex size-10 items-center justify-center rounded-md font-display text-lg font-bold ${toneClass[step.tone]}`}
                  style={{ fontVariationSettings: "'opsz' 24" }}
                >
                  <span className="sr-only">{howItWorks.stepLabel} </span>
                  {i + 1}
                </span>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-2 text-[15px] text-secondary">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
