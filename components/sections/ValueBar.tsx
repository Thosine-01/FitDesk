import { valueBar } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { toneClass } from "@/components/ui/tones";

/** White strip under the hero: what the product does, before anyone scrolls. */
export function ValueBar() {
  return (
    <section className="border-b border-border-subtle bg-card px-5 py-10 sm:px-8 sm:py-12">
      <ul className="mx-auto grid max-w-page gap-7 md:grid-cols-3 md:gap-10">
        {valueBar.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i as 0 | 1 | 2}
            className="flex items-start gap-4"
          >
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-md ${toneClass[item.tone]}`}
            >
              <Icon name={item.icon} />
            </span>
            <div>
              <h3 className="text-[17px]">{item.title}</h3>
              <p className="mt-1 text-[15px] text-secondary">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
