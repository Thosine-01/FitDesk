import { segments } from "@/lib/content";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cardSizes = "(min-width: 1180px) 380px, (min-width: 768px) 33vw, 100vw";

/** Who it's for — surface band, three photo cards. */
export function Segments() {
  return (
    <section
      id="who"
      aria-labelledby="who-title"
      className="section bg-surface"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          id="who-title"
          eyebrow={segments.eyebrow}
          title={segments.title}
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {segments.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.slot}
              delay={(i + 1) as 1 | 2 | 3}
              className="lift-card overflow-hidden rounded-lg border border-border-subtle bg-card"
            >
              <Figure slot={item.slot} sizes={cardSizes} />
              <div className="p-6">
                <h3>{item.title}</h3>
                <p className="mt-2 text-[15px] text-secondary">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
