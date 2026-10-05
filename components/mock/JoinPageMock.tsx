import { mocks } from "@/lib/content";
import { PhoneFrame } from "./PhoneFrame";

/** A gym's public join page, on a phone. Decorative: the caption describes it. */
export function JoinPageMock() {
  const j = mocks.joinPage;
  return (
    <PhoneFrame>
      <div className="px-4 pt-10 pb-5 text-left">
        <p className="rounded-full bg-surface px-3 py-1.5 text-center text-[11px] font-semibold text-muted">
          {j.url}
        </p>

        <p
          className="mt-5 font-display text-[22px] leading-tight font-bold tracking-[-0.035em]"
          style={{ fontVariationSettings: "'opsz' 32" }}
        >
          {j.title}
        </p>
        <p className="mt-1 text-xs text-secondary">{j.subtitle}</p>

        <ul className="mt-4 flex flex-col gap-2">
          {j.plans.map((p, i) => {
            const on = i === j.selected;
            return (
              <li
                key={p.name}
                className={`flex items-center justify-between rounded-md border px-3 py-2.5 ${
                  on ? "border-accent bg-accent-muted" : "border-border-default"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`flex size-4 items-center justify-center rounded-full border ${
                      on ? "border-accent" : "border-border-default"
                    }`}
                  >
                    {on && <span className="size-2 rounded-full bg-accent" />}
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold">
                      {p.name}
                    </span>
                    <span className="block text-[10px] text-muted">
                      {p.period}
                    </span>
                  </span>
                </span>
                <span className="num text-[13px] font-bold">{p.price}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex flex-col gap-2">
          {j.fields.map((f) => (
            <span
              key={f}
              className="rounded-md border border-border-default px-3 py-2.5 text-xs text-muted"
            >
              {f}
            </span>
          ))}
        </div>

        <span className="num mt-4 flex h-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-card">
          {j.pay}
        </span>
      </div>
    </PhoneFrame>
  );
}
