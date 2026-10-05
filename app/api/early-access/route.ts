import { after, type NextRequest } from "next/server";
import { monthsFor, toKobo } from "@/lib/commitment";
import { notifyNewLead } from "@/lib/notify";
import { supabaseAdmin } from "@/lib/supabase";
import {
  fieldErrors,
  leadSchema,
  type EarlyAccessResponse,
} from "@/lib/validation";

// Simple per-IP rate limit. In-memory, so it's per server instance — enough
// to blunt a bored script; the honeypot handles the rest. No CAPTCHA.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: EarlyAccessResponse, status = 200) =>
  Response.json(body, { status });

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  if (Number(req.headers.get("content-length") ?? 0) > 10_000) {
    return json({ ok: false, error: "validation" }, 413);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "validation" }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { ok: false, error: "validation", fields: fieldErrors(parsed.error) },
      400,
    );
  }
  const lead = parsed.data;

  // Honeypot filled → a bot. Pretend it worked so it doesn't retry.
  if (lead.website) return json({ ok: true });

  const db = supabaseAdmin();
  if (!db) {
    if (process.env.NODE_ENV !== "production") {
      // Not connected yet: log locally so the form can be tested end to end.
      console.info(
        "[early-access] Supabase not configured. Lead:",
        JSON.stringify(lead),
      );
      after(() => notifyNewLead(lead));
      return json({ ok: true });
    }
    // In production a lead must never be silently dropped.
    console.error("[early-access] Supabase env vars missing in production.");
    return json({ ok: false, error: "server" }, 500);
  }

  const { error } = await db.from("leads").insert({
    gym_name: lead.gymName,
    contact_name: lead.contactName,
    phone: lead.phone,
    email: lead.email ?? null,
    city: lead.city,
    member_band: lead.memberBand,
    source: lead.source || null,
    ...(lead.commitmentFee
      ? {
          commitment_amount: toKobo(lead.commitmentFee),
          commitment_months: monthsFor(lead.commitmentFee),
          commitment_status: "interested",
        }
      : {}),
  });
  if (error) {
    console.error("[early-access] Supabase insert failed:", error);
    return json({ ok: false, error: "server" }, 500);
  }

  // Email after the response is sent; a mail failure never fails the lead.
  after(() => notifyNewLead(lead));
  return json({ ok: true });
}
