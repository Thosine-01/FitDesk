import "server-only";
import { Resend } from "resend";
import { monthsFor } from "./commitment";
import { naira } from "./format";
import type { Lead } from "./validation";

/**
 * Emails you on every new lead. The subject carries gym name and member band
 * so leads triage straight from the inbox list. No-op without the env vars.
 */
export async function notifyNewLead(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!key || !to) {
    console.warn("[early-access] Resend not configured — no email sent.");
    return;
  }

  const from =
    process.env.LEAD_NOTIFY_FROM || "Fitdesk leads <onboarding@resend.dev>";
  const commit = lead.commitmentFee
    ? `${naira(lead.commitmentFee)} for ${monthsFor(lead.commitmentFee)} months`
    : null;
  const subject = `${commit ? "Founding gym" : "New lead"}: ${lead.gymName} · ${lead.memberBand} members · ${lead.city}${commit ? ` · ${commit}` : ""}`;
  const text = [
    `Gym:      ${lead.gymName}`,
    `Contact:  ${lead.contactName}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email ?? "—"}`,
    `City:     ${lead.city}`,
    `Members:  ${lead.memberBand}`,
    `Commit:   ${commit ?? "—"}`,
    `Source:   ${lead.source || "direct"}`,
    "",
    `WhatsApp: https://wa.me/${lead.phone.replace("+", "")}`,
  ].join("\n");

  const { error } = await new Resend(key).emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    subject,
    text,
    ...(lead.email ? { replyTo: lead.email } : {}),
  });
  if (error) console.error("[early-access] Resend error:", error);
}
