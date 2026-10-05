import { faq } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

// FAQPage structured data, built from the same array the page renders.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/** Native <details>/<summary>; the first one starts open. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-page">
      <div className="mx-auto grid max-w-page gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader
            id="faq-title"
            eyebrow={faq.eyebrow}
            title={faq.title}
          />
        </div>

        <Reveal delay={1} className="lg:col-span-8">
          <div className="border-t border-border-rule">
            {faq.items.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="group border-b border-border-rule"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[17.5px]">{item.q}</h3>
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-muted text-accent transition-transform duration-300 group-open:rotate-45">
                    <Icon name="plus" className="size-4" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pr-10 pb-6 text-secondary">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>

      <JsonLd data={jsonLd} />
    </section>
  );
}
