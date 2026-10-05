import { z } from "zod";
import { isValidFee } from "./commitment";
import { cityOptions, earlyAccessForm, memberBandOptions } from "./content";

// Shared by the form (client) and the route handler (server).

const e = earlyAccessForm.errors;

/** Accepts 0803…, 234803…, +234 803… with spaces, dashes or brackets. */
const NG_MOBILE = /^(?:\+?234|0)([789][01]\d{8})$/;

export function normalisePhone(raw: string): string | null {
  const m = raw.replace(/[\s\-().]/g, "").match(NG_MOBILE);
  return m ? `+234${m[1]}` : null;
}

const text = (msg: string, max: number) =>
  z.string().trim().min(1, { error: msg }).max(max, { error: e.tooLong });

export const leadSchema = z.object({
  gymName: text(e.gymName, 120),
  contactName: text(e.contactName, 80),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => {
      const n = normalisePhone(v);
      if (!n) {
        ctx.addIssue({ code: "custom", message: e.phone });
        return z.NEVER;
      }
      return n;
    }),
  email: z
    .union([z.literal(""), z.email({ error: e.email }).max(160)])
    .optional()
    .transform((v) => v || undefined),
  city: z.enum(cityOptions, { error: e.city }),
  memberBand: z.enum(memberBandOptions, { error: e.memberBand }),
  /** utm params or referrer, captured client-side. */
  source: z.string().trim().max(300).optional(),
  /** Naira amount chosen in the commitment calculator, if any. Months are
   *  recalculated on the server — never trusted from the client. */
  commitmentFee: z.number().int().refine(isValidFee).optional(),
  /** Honeypot — humans never see it, so it must stay empty. */
  website: z.string().optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type LeadField = keyof LeadInput;

export type EarlyAccessResponse =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "rate_limited" | "server";
      fields?: Partial<Record<LeadField, string>>;
    };

export function fieldErrors(error: z.ZodError) {
  const flat = z.flattenError(error).fieldErrors as Partial<
    Record<LeadField, string[]>
  >;
  const out: Partial<Record<LeadField, string>> = {};
  for (const [k, v] of Object.entries(flat)) {
    if (v?.[0]) out[k as LeadField] = v[0];
  }
  return out;
}
