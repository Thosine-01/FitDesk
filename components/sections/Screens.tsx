import { screens } from "@/lib/content";
import { ChatMock } from "@/components/mock/ChatMock";
import { DashboardMock } from "@/components/mock/DashboardMock";
import { JoinPageMock } from "@/components/mock/JoinPageMock";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL;

function Caption({ caption, body }: { caption: string; body: string }) {
  return (
    <figcaption className="mt-5">
      <p className="font-bold">{caption}</p>
      <p className="mt-1 text-[15px] text-secondary">{body}</p>
    </figcaption>
  );
}

/** "See it" — mock screens built as markup, not screenshots. */
export function Screens() {
  return (
    <section
      id="see-it"
      aria-labelledby="see-it-title"
      className="section bg-surface"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          id="see-it-title"
          eyebrow={screens.eyebrow}
          title={screens.title}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-12 lg:col-span-7">
            <Reveal as="figure" delay={1}>
              <DashboardMock />
              <Caption {...screens.dashboard} />
            </Reveal>
            <Reveal
              as="figure"
              delay={2}
              className="flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-8"
            >
              <ChatMock className="mx-auto sm:mx-0 sm:shrink-0" />
              <Caption {...screens.chat} />
            </Reveal>
          </div>

          <Reveal as="figure" delay={2} className="lg:col-span-5">
            <JoinPageMock />
            <div className="mx-auto max-w-[300px]">
              <Caption {...screens.joinPage} />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">{screens.note}</p>
          {demoUrl && (
            <Button href={demoUrl} variant="primary">
              {screens.demoCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
