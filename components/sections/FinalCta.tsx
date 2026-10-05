import { finalCta } from "@/lib/content";
import { hasWhatsapp, whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Dark, centred. WhatsApp is the primary path; the form is the net.
 * With no WhatsApp number configured the button is hidden — the form is
 * already right here, which is where the fallback link would point.
 */
export function FinalCta({ form }: { form: React.ReactNode }) {
  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="on-dark section bg-dark text-on-dark"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          id="early-access-title"
          eyebrow={finalCta.eyebrow}
          title={finalCta.title}
          intro={finalCta.body}
          align="center"
        />

        {hasWhatsapp && (
          <Reveal delay={1} className="mt-8 flex flex-col items-center gap-6">
            <Button href={whatsappLink("final_cta")} variant="bright" size="lg">
              <Icon name="whatsapp" />
              {finalCta.whatsappLabel}
            </Button>
            <p className="eyebrow text-on-dark-muted">{finalCta.orLabel}</p>
          </Reveal>
        )}

        <Reveal delay={2} className="mx-auto mt-10 max-w-xl">
          {form}
        </Reveal>
      </div>
    </section>
  );
}
