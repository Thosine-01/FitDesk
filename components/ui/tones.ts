import type { Tone } from "@/lib/content";

/** Tint background + its matching dark text. The only way a hue is used. */
export const toneClass: Record<Tone, string> = {
  accent: "bg-accent-muted text-accent",
  amber: "bg-amber-tint text-amber",
  coral: "bg-coral-tint text-coral",
  blue: "bg-blue-tint text-blue",
  violet: "bg-violet-tint text-violet",
};

/** Rotation for lists that don't name their own tone. */
export const toneCycle: Tone[] = ["accent", "amber", "blue", "violet", "coral"];
