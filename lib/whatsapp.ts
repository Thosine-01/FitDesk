import { whatsapp } from "./content";

/**
 * Every WhatsApp control on the page uses this. With no number configured the
 * link falls back to the early-access form rather than opening a broken chat.
 * `context` is the section the tap came from — used by analytics (step 12).
 * `text` overrides the default pre-filled message (e.g. the commitment one).
 */
export function whatsappLink(
  context?: string,
  text: string = whatsapp.prefill,
) {
  const n = process.env.NEXT_PUBLIC_WHATSAPP;
  return n
    ? `https://wa.me/${n}?text=${encodeURIComponent(text)}`
    : "#early-access";
}

export const hasWhatsapp = Boolean(process.env.NEXT_PUBLIC_WHATSAPP);

/** Fired by the calculator when there's no WhatsApp number, so the form can
 *  carry the chosen commitment. */
export const COMMITMENT_EVENT = "fitdesk:commitment";
export type CommitmentEventDetail = { fee: number };
