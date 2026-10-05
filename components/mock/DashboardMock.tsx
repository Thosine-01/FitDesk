import { mocks, type MemberStatus } from "@/lib/content";
import { toneClass } from "@/components/ui/tones";

const statusTone: Record<MemberStatus, string> = {
  paid: toneClass.accent,
  due: toneClass.amber,
  overdue: toneClass.coral,
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

/** Owner dashboard, built as markup. Decorative: the caption describes it. */
export function DashboardMock() {
  const d = mocks.dashboard;
  return (
    <div
      aria-hidden="true"
      className="@container overflow-hidden rounded-lg border border-border-default bg-card text-left shadow-mock select-none"
    >
      {/* App bar */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3 @md:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-sm bg-accent text-[11px] font-extrabold text-card">
            {initials(mocks.gymName)}
          </span>
          <span className="text-sm font-bold">{mocks.gymName}</span>
        </div>
        <span className="text-xs font-semibold text-muted">{d.title}</span>
      </div>

      <div className="p-4 @md:p-5">
        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-2 @md:gap-3">
          {d.stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-md p-2.5 @md:p-3.5 ${toneClass[s.tone]}`}
            >
              <p className="text-[10px] leading-tight font-semibold @md:text-xs">
                {s.label}
              </p>
              <p
                className="num mt-1.5 font-display text-[15px] leading-none font-bold tracking-[-0.03em] @md:text-2xl"
                style={{ fontVariationSettings: "'opsz' 24" }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Renewals list */}
        <div className="mt-4 flex items-baseline justify-between">
          <p className="text-sm font-bold">{d.listTitle}</p>
          <p className="text-xs font-semibold text-accent">{d.listAction}</p>
        </div>
        <div className="mt-2 hidden grid-cols-[1.6fr_1fr_1fr_auto] gap-3 border-b border-border-subtle pb-2 text-[11px] font-semibold text-muted @lg:grid">
          <span>{d.columns.member}</span>
          <span>{d.columns.plan}</span>
          <span>{d.columns.status}</span>
          <span className="text-right">{d.columns.amount}</span>
        </div>
        <ul className="mt-1">
          {d.members.map((m) => (
            <li
              key={m.name}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border-subtle py-2.5 last:border-0 @lg:grid-cols-[1.6fr_1fr_1fr_auto]"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-bold text-secondary">
                  {initials(m.name)}
                </span>
                <span className="truncate text-[13px] font-semibold">
                  {m.name}
                </span>
              </span>
              <span className="hidden text-[13px] text-secondary @lg:block">
                {m.plan}
              </span>
              <span>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${statusTone[m.status]}`}
                >
                  {d.statusLabels[m.status]}
                </span>
              </span>
              <span className="num text-right text-[13px] font-semibold">
                {m.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
