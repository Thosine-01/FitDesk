import { mocks } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

const initials = mocks.gymName
  .split(" ")
  .map((p) => p[0])
  .join("");

/** A renewal reminder thread as a member sees it. Decorative. */
export function ChatMock({ className = "" }: { className?: string }) {
  const c = mocks.chat;
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[340px] overflow-hidden rounded-lg border border-border-default bg-surface text-left shadow-mock select-none ${className}`}
    >
      <div className="flex items-center gap-2.5 bg-accent px-3.5 py-2.5 text-card">
        <span className="flex size-8 items-center justify-center rounded-full bg-card text-[11px] font-extrabold text-accent">
          {initials}
        </span>
        <span className="flex-1">
          <span className="block text-[13px] font-bold">{mocks.gymName}</span>
          <span className="block text-[10px] opacity-80">{c.status}</span>
        </span>
        <Icon name="whatsapp" className="size-5" />
      </div>
      <ul className="flex flex-col gap-2 p-3">
        {c.messages.map((m, i) => {
          const fromGym = m.from === "gym";
          return (
            <li
              key={i}
              className={`max-w-[85%] rounded-md px-3 py-2 text-[12.5px] leading-snug ${
                fromGym
                  ? "self-start rounded-tl-sm bg-card"
                  : "self-end rounded-tr-sm bg-accent-muted"
              }`}
            >
              {m.text}
              <span className="num mt-0.5 block text-right text-[10px] text-muted">
                {m.time}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
