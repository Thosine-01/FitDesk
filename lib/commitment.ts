/**
 * The founding-gym commitment offer — every constant and all the maths.
 * The offer will change after the first few conversations: it must stay a
 * one-file edit. Tests: lib/commitment.test.ts (`npm test`).
 */

/** Commitment fee range, in naira. */
export const MIN = 15000;
export const MAX = 60000;
export const STEP = 5000;
/** Where the calculator starts. */
export const DEFAULT_FEE = 30000;

/** Free months: BASE at the minimum, +MONTHS_PER_STEP per STEP above it, capped. */
export const BASE_MONTHS = 6;
export const MONTHS_PER_STEP = 2;
export const MAX_MONTHS = 18;

/** Founding places — your real support capacity. Update PLACES_LEFT as gyms commit;
 *  at 0 the section switches to its "full" state. */
export const FOUNDING_PLACES = 10;
export const PLACES_LEFT = 10;

/** The founding monthly rate is locked for this long once paid billing starts. */
export const RATE_LOCK_YEARS = 2;

/** The month founding gyms' access begins at the latest — a dated promise that
 *  goes into /terms. Decide it before the section goes live. */
export const ACCESS_STARTS_BY = "{ACCESS_START_MONTH}";

export function monthsFor(fee: number): number {
  const steps = Math.floor((fee - MIN) / STEP);
  return Math.min(BASE_MONTHS + steps * MONTHS_PER_STEP, MAX_MONTHS);
}

export function clampFee(v: number): number {
  return Math.min(Math.max(Math.round(v / STEP) * STEP, MIN), MAX);
}

/** True for a fee the offer actually accepts (in range and on a step). */
export function isValidFee(fee: number): boolean {
  return Number.isInteger(fee) && clampFee(fee) === fee;
}

/** Slider fill, 0–100. */
export function pctFor(fee: number): number {
  return ((clampFee(fee) - MIN) / (MAX - MIN)) * 100;
}

/** Naira → kobo, for storage. */
export const toKobo = (naira: number) => naira * 100;
