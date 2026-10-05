/** ₦15,000 — tabular-friendly naira formatting. */
export function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
