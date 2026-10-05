/**
 * Photo manifest. Every image on the page is declared here — no inline <img>,
 * no hardcoded paths. Drop the exported file into /public/images under `file`
 * and <Figure /> picks it up; until then it renders a placeholder carrying the
 * art direction. Exports are produced by scripts/process-photos.mjs (crop,
 * grade, resize) from the Pexels originals listed under `source`.
 *
 * Sourcing rules (brief §7):
 * 1. Prioritise African and Nigerian subjects.
 * 2. Licensed stock only (Unsplash / Pexels) — log `source` and `licence`.
 * 3. Never present a stock person as a customer, member or testimonial.
 * 4. Grade before export: warm, slightly contrasty — saturate(1.05) contrast(1.04).
 * Page-weight budget is 1.4 MB, so compress hard.
 */

export type ImageSpec = {
  /** Path under /public. */
  file: string;
  ratio: "16:9" | "3:2" | "16:10";
  /** Export size in px. */
  width: number;
  height: number;
  art: string;
  alt: string;
  /** Source page URL, filled in when sourced. */
  source: string;
  licence: "" | "Unsplash" | "Pexels";
};

export const images = {
  heroGym: {
    file: "/images/hero-gym.jpg",
    ratio: "16:9",
    width: 1920,
    height: 1080,
    art: "Gym, warm artificial light. Left half must stay dark and quiet — the headline sits there.",
    alt: "A man gripping a barbell before a deadlift in a gym with a painted mural wall",
    source:
      "https://www.pexels.com/photo/man-holding-black-barbell-in-the-gym-4720813/",
    licence: "Pexels",
  },
  heroSpa: {
    file: "/images/hero-spa.jpg",
    ratio: "16:9",
    width: 1920,
    height: 1080,
    art: "Spa treatment, calm, warm low light.",
    alt: "A softly lit massage room with a treatment bed and folded towels",
    source:
      "https://www.pexels.com/photo/interior-design-of-a-massage-room-11774389/",
    licence: "Pexels",
  },
  heroStudio: {
    file: "/images/hero-studio.jpg",
    ratio: "16:9",
    width: 1920,
    height: 1080,
    art: "Member in a Nigerian gym — energy, subject right of centre.",
    alt: "A woman in workout clothes in a gym in Lagos",
    source:
      "https://www.pexels.com/photo/confident-woman-in-gym-exercise-pose-33832204/",
    licence: "Pexels",
  },
  segGym: {
    file: "/images/seg-gym.jpg",
    ratio: "3:2",
    width: 1200,
    height: 800,
    art: "Gym — one clear subject.",
    alt: "A man training in a dimly lit gym",
    source:
      "https://www.pexels.com/photo/man-in-tank-top-holding-dumbbell-1978505/",
    licence: "Pexels",
  },
  segSpa: {
    file: "/images/seg-spa.jpg",
    ratio: "3:2",
    width: 1200,
    height: 800,
    art: "Spa and wellness — one clear subject.",
    alt: "A woman relaxing in a candlelit bath with flowers",
    source: "https://www.pexels.com/photo/healthy-nature-fashion-love-6724589/",
    licence: "Pexels",
  },
  segStudio: {
    file: "/images/seg-studio.jpg",
    ratio: "3:2",
    width: 1200,
    height: 800,
    art: "Fitness studio — a class in session.",
    alt: "A woman in workout clothes in a gym in Lagos",
    source:
      "https://www.pexels.com/photo/confident-woman-in-gym-exercise-pose-33832204/",
    licence: "Pexels",
  },
  step1: {
    file: "/images/step-1.jpg",
    ratio: "16:10",
    width: 1200,
    height: 750,
    art: "Setup — a paper member list going onto a laptop.",
    alt: "A man copying notes from paper onto a laptop",
    source:
      "https://www.pexels.com/photo/crop-black-businessman-writing-on-paper-near-laptop-in-cafeteria-5648032/",
    licence: "Pexels",
  },
  step2: {
    file: "/images/step-2.jpg",
    ratio: "16:10",
    width: 1200,
    height: 750,
    art: "Member in gym clothes joining and paying on a phone.",
    alt: "Two people in a gym looking at a phone together",
    source:
      "https://www.pexels.com/photo/woman-showing-her-cellphone-to-a-man-8555324/",
    licence: "Pexels",
  },
  step3: {
    file: "/images/step-3.jpg",
    ratio: "16:10",
    width: 1200,
    height: 750,
    art: "Owner on the gym floor, checking the numbers on a screen.",
    alt: "A tablet showing figures, held up in front of a busy gym floor",
    source: "https://www.pexels.com/photo/person-holding-black-tablet-3912956/",
    licence: "Pexels",
  },
} satisfies Record<string, ImageSpec>;

export type ImageSlot = keyof typeof images;
