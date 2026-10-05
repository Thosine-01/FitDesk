import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** id for the h2, so the section can be `aria-labelledby` it. */
  id?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-[17px] text-secondary in-[.on-dark]:text-on-dark-sec">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
