/**
 * Every word and list on the page lives here. Components never hardcode copy.
 *
 * Status: drafted from the brief. The HTML prototype is the source of truth for
 * copy — paste its wording over these drafts. `{LIKE_THIS}` marks a value the
 * brief does not give (prices, etc.); any left at QA is a blocker
 * (`grep -nE "\{[A-Z_]+\}" lib/content.ts`).
 *
 * Rule: no invented testimonials, logos, customer counts or statistics.
 * Every claim here must be true before the page is shared.
 */

import {
  BASE_MONTHS,
  FOUNDING_PLACES,
  MAX,
  MAX_MONTHS,
  MIN,
  MONTHS_PER_STEP,
  ACCESS_STARTS_BY,
  RATE_LOCK_YEARS,
  STEP,
} from "./commitment";
import { naira } from "./format";
import type { ImageSlot } from "./images";

/** Supporting hues — rendered only as tint + matching dark text. */
export type Tone = "accent" | "amber" | "coral" | "blue" | "violet";

/** Icon keys, resolved to SVGs by the icon component (build step 6). */
export type IconName =
  | "phone"
  | "wallet"
  | "users"
  | "bell"
  | "chart"
  | "link"
  | "upload"
  | "shield"
  | "whatsapp";

export type Link = { label: string; href: string };

// ─── Site ───────────────────────────────────────────────────────────────────

export const site = {
  name: "Fitdesk",
  email: "hello@fitdesk.ng", // confirm the mailbox exists before launch (brief §13)
  cities: ["Port Harcourt", "Enugu"],
  positioning:
    "Membership and collections software for Nigerian gyms, spas and fitness studios.",
} as const;

// ─── SEO / sharing ──────────────────────────────────────────────────────────

export const seo = {
  title: "Fitdesk — gym membership and payment software for Nigeria",
  description:
    "Fitdesk keeps member records, tracks payments and chases renewals for gyms, spas and fitness studios in Port Harcourt and Enugu — all from your phone.",
  ogAlt: "Fitdesk — run your gym from your phone.",
  ogLine: "Membership and payments for gyms, spas and studios",
  ogCities: "Port Harcourt · Enugu",
  locale: "en_NG",
  appCategory: "BusinessApplication",
};

// ─── Navigation ─────────────────────────────────────────────────────────────

export const nav = {
  links: [
    { label: "Who it's for", href: "/#who" },
    { label: "How it works", href: "/#how" },
    { label: "See it", href: "/#see-it" },
    { label: "Founding offer", href: "/#commitment" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies Link[],
  cta: { label: "Get early access", href: "/#early-access" },
  homeLabel: "Fitdesk home",
  menuLabel: "Open menu",
  closeLabel: "Close menu",
  menuTitle: "Menu",
};

// ─── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "For gyms, spas and fitness studios",
  // Rendered as: {before}<span accent-bright>{highlight}</span>{after}
  headline: {
    before: "Run your gym from ",
    highlight: "your phone",
    after: ".",
  },
  sub: "Fitdesk keeps your member list, tells you who has paid and who hasn't, and chases renewals for you — so you stop running the business from a notebook and a WhatsApp group.",
  primaryCta: { label: "Get early access", href: "#early-access" },
  secondaryCta: { label: "See the founding offer", href: "#commitment" },
  // Scarcity lives in the badge above the headline.
  badge: `${FOUNDING_PLACES} founding gyms only · up to ${MAX_MONTHS} months free`,
  offer: [
    `Commit from ${naira(MIN)}`,
    `${BASE_MONTHS}+ months free`,
    "Fully refundable until your gym goes live",
  ],
  slides: ["heroGym", "heroSpa", "heroStudio"] satisfies ImageSlot[],
  slideLabels: ["Gyms", "Spas", "Studios"],
  indicatorLabel: "Show slide",
  slideshowLabel: "Featured photos",
};

// ─── Value bar ──────────────────────────────────────────────────────────────

export const valueBar: {
  icon: IconName;
  tone: Tone;
  title: string;
  body: string;
}[] = [
  {
    icon: "users",
    tone: "accent",
    title: "Every member in one place",
    body: "Plans, start dates and renewal dates, on your phone.",
  },
  {
    icon: "wallet",
    tone: "amber",
    title: "See who owes you",
    body: "Know at a glance who is paid up and who is overdue.",
  },
  {
    icon: "bell",
    tone: "blue",
    title: "Renewals chased for you",
    body: "Reminders go out before a membership lapses.",
  },
];

// ─── Who it's for ───────────────────────────────────────────────────────────

export const segments = {
  eyebrow: "Who it's for",
  title: "Built for businesses that run on memberships.",
  items: [
    {
      slot: "segGym",
      title: "Gyms",
      body: "Monthly and yearly plans, walk-ins and the front desk rush — all tracked without a register.",
    },
    {
      slot: "segSpa",
      title: "Spas and wellness",
      body: "Packages and repeat clients, with a clear record of who has paid for what.",
    },
    {
      slot: "segStudio",
      title: "Fitness studios",
      body: "Class-based memberships for yoga, dance and boot camps, kept in step with payments.",
    },
  ] satisfies { slot: ImageSlot; title: string; body: string }[],
};

// ─── How it works ───────────────────────────────────────────────────────────

export const howItWorks = {
  eyebrow: "How it works",
  title: "Three steps. We do the first one.",
  stepLabel: "Step",
  steps: [
    {
      slot: "step1",
      tone: "accent",
      title: "We set you up",
      body: "Send us your current member list — paper, Excel or WhatsApp — and we move it across for free.",
    },
    {
      slot: "step2",
      tone: "amber",
      title: "Members join and pay from their phone",
      body: "Your gym gets its own join page. Share the link and new members sign up and pay without queueing at the desk.",
    },
    {
      slot: "step3",
      tone: "violet",
      title: "You run the floor, Fitdesk runs the list",
      body: "See today's payments and who is due, and let the reminders go out on their own.",
    },
  ] satisfies { slot: ImageSlot; tone: Tone; title: string; body: string }[],
};

// ─── See it (mock screens — data for the mocks lands in step 7) ─────────────

export const screens = {
  eyebrow: "See it",
  title: "Two screens do most of the work.",
  dashboard: {
    caption: "Your dashboard",
    body: "Who has paid, who is due this week and who has lapsed.",
  },
  joinPage: {
    caption: "Your gym's join page",
    body: "A link members open on their phone to pick a plan and pay.",
  },
  chat: {
    caption: "Reminders on WhatsApp",
    body: "Members hear from you before their plan runs out.",
  },
  note: "Example screens with sample data.",
  demoCta: { label: "Try the join page", href: "#see-it" }, // hidden unless NEXT_PUBLIC_DEMO_URL is set
};

// ─── Mock screen data — sample only, never presented as real customers ─────

export type MemberStatus = "paid" | "due" | "overdue";

export const mocks = {
  gymName: "Your Gym",
  dashboard: {
    title: "Today",
    stats: [
      { label: "Collected this month", value: "₦1,240,000", tone: "accent" },
      { label: "Due this week", value: "14", tone: "amber" },
      { label: "Overdue", value: "6", tone: "coral" },
    ] satisfies { label: string; value: string; tone: Tone }[],
    listTitle: "Renewals",
    listAction: "See all",
    columns: {
      member: "Member",
      plan: "Plan",
      status: "Status",
      amount: "Amount",
    },
    statusLabels: {
      paid: "Paid",
      due: "Due Fri",
      overdue: "Overdue",
    } satisfies Record<MemberStatus, string>,
    members: [
      { name: "Amaka Eze", plan: "Monthly", status: "paid", amount: "₦15,000" },
      {
        name: "Tamuno Briggs",
        plan: "Quarterly",
        status: "due",
        amount: "₦40,000",
      },
      {
        name: "Chinedu Okafor",
        plan: "Monthly",
        status: "overdue",
        amount: "₦15,000",
      },
      {
        name: "Ifeoma Nwosu",
        plan: "Yearly",
        status: "paid",
        amount: "₦150,000",
      },
      { name: "Ebi Tari", plan: "Monthly", status: "due", amount: "₦15,000" },
    ] satisfies {
      name: string;
      plan: string;
      status: MemberStatus;
      amount: string;
    }[],
  },
  joinPage: {
    url: "fitdesk.ng/yourgym",
    title: "Join Your Gym",
    subtitle: "Pick a plan and pay in under a minute.",
    plans: [
      { name: "Monthly", price: "₦15,000", period: "per month" },
      { name: "Quarterly", price: "₦40,000", period: "every 3 months" },
      { name: "Yearly", price: "₦150,000", period: "per year" },
    ],
    selected: 1,
    fields: ["Full name", "Phone number"],
    pay: "Pay ₦40,000",
  },
  chat: {
    status: "online",
    messages: [
      {
        from: "gym",
        text: "Hi Amaka, your monthly membership at Your Gym ends on Friday. Renew here: fitdesk.ng/yourgym",
        time: "09:02",
      },
      { from: "member", text: "Thanks, paying now", time: "09:15" },
      {
        from: "gym",
        text: "Payment received — ₦15,000. You're renewed for another month. See you at the gym!",
        time: "09:16",
      },
    ] satisfies { from: "gym" | "member"; text: string; time: string }[],
  },
};

// ─── What you get ───────────────────────────────────────────────────────────

export const features = {
  eyebrow: "What you get",
  title: "Everything the front desk notebook does, without the notebook.",
  items: [
    {
      icon: "users",
      title: "Member records",
      body: "Name, phone, plan, start and end date for everyone — searchable in seconds.",
    },
    {
      icon: "wallet",
      title: "Payment tracking",
      body: "Every payment logged against the member, so nothing depends on memory.",
    },
    {
      icon: "bell",
      title: "Renewal reminders",
      body: "Members are reminded before their plan runs out, not after.",
    },
    {
      icon: "link",
      title: "Your own join page",
      body: "A shareable link where new members choose a plan and pay.",
    },
    {
      icon: "chart",
      title: "Daily summary",
      body: "What came in today, what is due and what is overdue.",
    },
    {
      icon: "upload",
      title: "Free migration",
      body: "We move your existing members across during setup.",
    },
  ] satisfies { icon: IconName; title: string; body: string }[],
};

// ─── Founding gym commitment (numbers come from lib/commitment.ts) ─────────

export const commitment = {
  eyebrow: "Founding gyms",
  title: `Commit now. Get up to ${MAX_MONTHS} months free.`,
  intro: `We're taking ${FOUNDING_PLACES} founding gyms — the number we can set up and support properly. Pay a refundable commitment today and your free months start the day your gym goes live.`,
  placesLeft: (n: number) =>
    n === 1
      ? "1 founding place left"
      : `${n} of ${FOUNDING_PLACES} founding places left`,
  control: {
    label: "Your commitment",
    sliderLabel: "Commitment amount",
    helper: `Choose ${naira(MIN)} to ${naira(MAX)}, in steps of ${naira(STEP)}. Every ${naira(STEP)} above ${naira(MIN)} adds ${MONTHS_PER_STEP} free months, up to ${MAX_MONTHS}.`,
    min: naira(MIN),
    max: naira(MAX),
  },
  outcome: {
    monthsUnit: (m: number) => (m === 1 ? "month free" : "months free"),
    rows: {
      setup: "Free setup and member import",
      access: (m: number) => `${m} months of full access, free, from go-live`,
      pricing: (m: number) => `Normal monthly pricing starts in month ${m + 1}`,
      rateLock: `Founding gym rate locked for ${RATE_LOCK_YEARS} years`,
    },
    cta: (fee: number) => `Commit ${naira(fee)}`,
    refund: "Fully refundable, any time, until your gym goes live.",
    termsLink: { label: "How the offer works", href: "/terms" },
  },
  full: {
    title: "All founding places are taken.",
    body: "Thank you to the gyms who joined. Leave your details and we'll tell you when Fitdesk opens to more gyms.",
    cta: { label: "Leave your details", href: "#early-access" },
  },
};

// ─── FAQ (also emitted as FAQPage structured data) ──────────────────────────

export const faq = {
  eyebrow: "FAQ",
  title: "Questions owners ask.",
  items: [
    {
      q: "Do my members need to download an app?",
      a: "No. Members open your gym's join link in their phone's browser to sign up and pay, and their reminders come on WhatsApp. There is nothing to download.",
    },
    {
      q: "I keep everything in a notebook. Can you move it across?",
      a: "Yes. Send us a photo, a spreadsheet or your WhatsApp list and we'll set your members up during onboarding, free.",
    },
    {
      q: "How does the founding gym offer work?",
      a: `You pay a one-off commitment of ${naira(MIN)} to ${naira(MAX)}. In return your setup is free and you get ${BASE_MONTHS} to ${MAX_MONTHS} months of Fitdesk free, starting the day your gym goes live. Only ${FOUNDING_PLACES} gyms can join this way.`,
    },
    {
      q: "What if Fitdesk isn't ready, or I change my mind?",
      a: "Your commitment is fully refundable, any time, until your gym goes live — just ask. We keep commitments separate and don't spend them until your gym is live, so a refund is always there to give.",
    },
    {
      q: "Which cities are you in?",
      a: "We're starting with gyms in Port Harcourt and Enugu, and we set you up in person. If you're elsewhere, send us a message anyway.",
    },
    {
      q: "How do members pay?",
      a: "Online through your gym's join page, by card or bank transfer. If a member pays cash or transfers at the desk, you record it in Fitdesk in a few taps so your list stays accurate.",
    },
    {
      q: "What happens to my data?",
      a: "It's yours. We don't sell it or share it, and you can ask us to export or delete it at any time. Our privacy policy has the details.",
    },
  ] satisfies { q: string; a: string }[],
};

// ─── Final CTA + early-access form ──────────────────────────────────────────

export const finalCta = {
  eyebrow: "Early access",
  title: "Let's get your gym set up.",
  body: "Message us on WhatsApp, or leave your details and we'll call you.",
  whatsappLabel: "Chat on WhatsApp",
  orLabel: "or leave your details",
};

export const whatsapp = {
  prefill: "Hi Fitdesk, I run a gym and I'd like early access. My gym is ",
  commitPrefill: (fee: number, months: number) =>
    `Hi Fitdesk, I want to join as a founding gym. I am committing ${naira(fee)} for ${months} months free. My gym is `,
};

export const cityOptions = ["Port Harcourt", "Enugu", "Other"] as const;
export const memberBandOptions = [
  "Under 50",
  "50–150",
  "150–300",
  "300+",
] as const;

export const earlyAccessForm = {
  title: "Leave your details",
  intro: "We'll call or WhatsApp you to arrange a visit.",
  fields: {
    gymName: { label: "Gym name" },
    contactName: { label: "Your name" },
    phone: { label: "Phone", placeholder: "0803 123 4567" },
    email: { label: "Email", optional: "optional" },
    city: { label: "City", placeholder: "Choose a city" },
    memberBand: {
      label: "Roughly how many members?",
      placeholder: "Choose one",
    },
    honeypot: { label: "Leave this field empty" },
  },
  errors: {
    gymName: "Tell us the name of your gym.",
    contactName: "Tell us your name.",
    phone: "Enter a Nigerian phone number, like 0803 123 4567.",
    email: "That email doesn't look right — or leave it blank.",
    city: "Choose a city.",
    memberBand: "Choose roughly how many members you have.",
    tooLong: "That's a bit long — please shorten it.",
  },
  required: "required",
  commitment: {
    note: (fee: number, months: number) =>
      `Founding gym commitment: ${naira(fee)} for ${months} months free`,
    remove: "Remove",
  },
  submit: "Get early access",
  submitting: "Sending…",
  success: {
    title: "Thanks — we've got your details.",
    body: "We'll be in touch within a day. Rather talk now?",
    bodyNoWhatsapp: "We'll be in touch within a day.",
    whatsappLabel: "Message us on WhatsApp",
  },
  error: {
    title: "That didn't go through.",
    body: "Your details are still here. Try again, or message us on WhatsApp instead.",
    bodyNoWhatsapp:
      "Your details are still here. Please try again in a moment.",
    rateLimited:
      "Too many tries in a short time. Wait a few minutes, or message us on WhatsApp.",
    retry: "Try again",
    whatsappLabel: "Message us on WhatsApp",
  },
  privacy: {
    before: "We only use this to contact you about Fitdesk. ",
    link: { label: "Privacy policy", href: "/privacy" },
  },
};

// ─── Mobile sticky CTA ──────────────────────────────────────────────────────

export const mobileCta = {
  whatsappLabel: "WhatsApp",
  primary: { label: "Get early access", href: "#early-access" },
};

// ─── Footer ─────────────────────────────────────────────────────────────────

export const footer = {
  tagline: site.positioning,
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] satisfies Link[],
  contactLabel: "Email us",
  copyright: `© ${new Date().getFullYear()} Fitdesk`,
};

// ─── Legal pages ────────────────────────────────────────────────────────────
// Plain-English drafts. Have them checked by a Nigerian lawyer before launch,
// and add the CAC-registered company name once it exists.

export type LegalSection = { heading: string; body: string[]; list?: string[] };

export const legal = {
  updated: "1 October 2026",
  updatedLabel: "Last updated",
  privacy: {
    title: "Privacy policy",
    description:
      "What Fitdesk collects when you ask for early access, why, how long we keep it, and how to have it deleted.",
    intro:
      "Fitdesk (“we”, “us”) is membership and payments software for gyms, spas and fitness studios in Nigeria. This policy explains what we collect when you contact us through this website or WhatsApp, and what we do with it. We handle personal data in line with the Nigeria Data Protection Act 2023.",
    sections: [
      {
        heading: "What we collect",
        body: ["When you fill in the early-access form we collect:"],
        list: [
          "your gym's name",
          "your name",
          "your phone number",
          "your email address, if you choose to give it",
          "your city and roughly how many members your gym has",
          "the commitment amount you chose, if you used the founding gym calculator",
          "how you found this page (for example, a link someone shared), if the link tells us",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          "Only to contact you about Fitdesk: to answer your request, arrange a visit, and set your gym up if you go ahead. The member count tells us which plan fits you. We do not sell your details, and we do not use them for unrelated marketing.",
        ],
      },
      {
        heading: "WhatsApp",
        body: [
          "If you message us on WhatsApp, the conversation is carried by WhatsApp (Meta) under its own terms and privacy policy. We use what you send only to reply to you and help you get set up.",
        ],
      },
      {
        heading: "Who else handles it",
        body: [
          "We use a small number of service providers to run this website and store your details securely. They process data only on our instructions:",
        ],
        list: [
          "Vercel — hosts this website",
          "Supabase — stores the details you submit",
          "Resend — emails us when a new request arrives",
          "Paystack — processes commitment payments, through a payment link we send you",
        ],
      },
      {
        heading: "Cookies and analytics",
        body: [
          "This website does not use advertising or tracking cookies. We use privacy-friendly, cookieless analytics that count visits and button taps without identifying you.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "If you become a Fitdesk customer, we keep your contact details for as long as you use Fitdesk. If you don't, we delete your details 12 months after we last spoke, unless you ask us to delete them sooner.",
        ],
      },
      {
        heading: "Your rights, and how to have your data deleted",
        body: [
          `You can ask us at any time to see the details we hold about you, correct them, or delete them. Email us at ${site.email} or message us on WhatsApp, and we will act on your request within 30 days. If you are unhappy with how we handle your data, you can also complain to the Nigeria Data Protection Commission.`,
        ],
      },
      {
        heading: "Changes",
        body: [
          "If we change this policy we will update the date at the top of this page.",
        ],
      },
    ] satisfies LegalSection[],
  },
  terms: {
    title: "Terms",
    description:
      "How Fitdesk's founding gym offer works: the commitment, your free months, the refund promise and our delivery date.",
    intro:
      "These terms cover Fitdesk's founding gym offer and the use of this website. “Fitdesk”, “we” and “us” mean the business that runs Fitdesk. The full service agreement is shared with you before your gym goes live.",
    sections: [
      {
        heading: "The founding gym offer",
        body: [
          `Up to ${FOUNDING_PLACES} gyms can join Fitdesk as founding gyms. A founding gym pays a one-off commitment fee of between ${naira(MIN)} and ${naira(MAX)}, in steps of ${naira(STEP)}. In return it gets:`,
        ],
        list: [
          "free setup, including moving your existing member list across from paper, a spreadsheet or WhatsApp",
          `free months of Fitdesk: ${BASE_MONTHS} months for ${naira(MIN)}, plus ${MONTHS_PER_STEP} months for every ${naira(STEP)} above that, up to ${MAX_MONTHS} months`,
          `a founding gym monthly rate, agreed with you before you go live and locked for ${RATE_LOCK_YEARS} years from when paid billing starts`,
        ],
      },
      {
        heading: "How you pay",
        body: [
          "We agree the amount with you on WhatsApp and send you a Paystack payment link. Nothing is charged on this website. The offer applies once per business; a business with several branches joins as one founding gym.",
        ],
      },
      {
        heading: "Your refund promise",
        body: [
          "Your commitment fee is fully refundable, any time, for any reason, until your gym's access starts. Ask us by WhatsApp or email and we refund the full amount to the account you paid from.",
          "We hold commitment fees separately and do not spend them until your gym is live, so the money for your refund is always there.",
        ],
      },
      {
        heading: "When your access starts",
        body: [
          `We will have your gym set up and live on Fitdesk no later than ${ACCESS_STARTS_BY}. If we miss that date, you can still take a full refund at any time until your access starts.`,
        ],
      },
      {
        heading: "What “free months” means",
        list: [
          "Your free months start counting on the day your gym goes live — the day your account is set up and ready to use — not the day you pay.",
          "They run as consecutive calendar months, with full access to Fitdesk.",
          "Before your free months end we remind you, and confirm your founding rate. Paid billing only starts if you choose to continue.",
        ],
        body: [],
      },
      {
        heading: "If you pull out",
        list: [
          "Before your gym goes live: you get your full commitment fee back.",
          "After your gym goes live: you can stop using Fitdesk at any time. The commitment fee is not refundable once your access has started, and unused free months have no cash value.",
        ],
        body: [],
      },
      {
        heading: "Founding places",
        body: [
          `There are ${FOUNDING_PLACES} founding places, because that is how many gyms we can set up and support properly. When they are gone we close the offer; gyms already in keep everything above.`,
        ],
      },
      {
        heading: "This website",
        body: [
          "The screens shown on this website are examples with sample data. We work to keep the information here accurate, but it is not a contract — the service agreement you receive before going live is.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the Federal Republic of Nigeria.",
        ],
      },
      {
        heading: "Questions",
        body: [`Email ${site.email} or message us on WhatsApp.`],
      },
    ] satisfies LegalSection[],
  },
};
