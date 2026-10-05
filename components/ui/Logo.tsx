import { site } from "@/lib/content";

/** Wordmark. `onDark` switches the mark to --accent-bright. */
export function Logo({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[22px] font-bold tracking-[-0.03em] ${className}`}
      style={{ fontVariationSettings: "'opsz' 24" }}
    >
      <span
        aria-hidden="true"
        className={`size-2.5 rounded-sm ${onDark ? "bg-accent-bright" : "bg-accent"}`}
      />
      {site.name}
    </span>
  );
}
