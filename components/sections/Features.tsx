import { features } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { toneClass, toneCycle } from "@/components/ui/tones";

/** What you get — six cards, icon tints rotating through the hues. */
export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="section bg-page"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          id="features-title"
          eyebrow={features.eyebrow}
          title={features.title}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="lift-card rounded-lg border border-border-subtle bg-card p-6"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-md ${toneClass[toneCycle[i % toneCycle.length]]}`}
              >
                <Icon name={f.icon} />
              </span>
              <h3 className="mt-5">{f.title}</h3>
              <p className="mt-2 text-[15px] text-secondary">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
