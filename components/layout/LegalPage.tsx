import { legal, type LegalSection } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Shared layout for /privacy and /terms: readable measure, plain structure. */
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="bg-page px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <article className="mx-auto max-w-[68ch]">
        <Eyebrow>
          {legal.updatedLabel} {legal.updated}
        </Eyebrow>
        <h1 className="mt-4 text-[clamp(36px,5vw,52px)]">{title}</h1>
        <p className="mt-6 text-lg text-secondary">{intro}</p>

        {sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="text-[clamp(22px,2.6vw,28px)]">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-4 text-secondary">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-secondary marker:text-accent">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
  );
}
