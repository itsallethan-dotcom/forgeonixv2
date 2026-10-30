import { NextResponse } from "next/server";
import { validateContact, type CleanContact } from "@/content/contact";

// Node runtime; this route sends email and must never be statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "Forgeonix <inquiries@send.forgeonix.dev>";
const TO = "ethan@forgeonix.dev";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Remove CR/LF so dynamic values can't break the subject line. */
function oneLine(v: string): string {
  return v.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderText(d: CleanContact): string {
  const a = d.attribution;
  const utm = Object.entries(a.utm)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n");
  return [
    "New website inquiry",
    "",
    `Name: ${d.name}`,
    `Business: ${d.business || "—"}`,
    `Email: ${d.email}`,
    `Topic: ${d.topic}`,
    "",
    "Message:",
    d.message,
    "",
    "— Attribution —",
    utm || "  (no UTM parameters)",
    `  referrer: ${a.referrer || "—"}`,
    `  page: ${a.path || "—"}`,
    `  time on form: ${d.elapsedMs != null ? `${Math.round(d.elapsedMs / 1000)}s` : "—"}`,
  ].join("\n");
}

function renderHtml(d: CleanContact): string {
  const a = d.attribution;
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#6e7887;font-size:12px;vertical-align:top">${label}</td><td style="padding:4px 0;color:#1a1d22;font-size:14px">${value}</td></tr>`;
  const utm = Object.entries(a.utm)
    .map(([k, v]) => `${escapeHtml(k)}=${escapeHtml(v)}`)
    .join(", ");
  return `<div style="font-family:system-ui,Arial,sans-serif;max-width:560px">
    <h2 style="font-size:16px;margin:0 0 12px">New website inquiry</h2>
    <table style="border-collapse:collapse">
      ${row("Name", escapeHtml(d.name))}
      ${row("Business", escapeHtml(d.business) || "&mdash;")}
      ${row("Email", `<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`)}
      ${row("Topic", escapeHtml(d.topic))}
    </table>
    <p style="color:#6e7887;font-size:12px;margin:16px 0 4px">Message</p>
    <p style="white-space:pre-wrap;color:#1a1d22;font-size:14px;margin:0">${escapeHtml(d.message)}</p>
    <hr style="border:none;border-top:1px solid #e4e8ee;margin:16px 0" />
    <table style="border-collapse:collapse">
      ${row("UTM", utm ? escapeHtml(utm) : "&mdash;")}
      ${row("Referrer", escapeHtml(a.referrer || "—"))}
      ${row("Page", escapeHtml(a.path || "—"))}
      ${row("Time on form", d.elapsedMs != null ? `${Math.round(d.elapsedMs / 1000)}s` : "—")}
    </table>
  </div>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never log the key itself; just note it's absent.
    console.error("contact: RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Email is not configured. Please email us directly." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = validateContact((body ?? {}) as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }
  const d = result.data;

  const subject = oneLine(`New inquiry — ${d.topic} — ${d.name}`);

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: d.email,
        subject,
        text: renderText(d),
        html: renderHtml(d),
      }),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please try again or email us directly." },
      { status: 502 },
    );
  }

  if (!res.ok) {
    // Log status only — never the request body or key.
    console.error(`contact: Resend responded ${res.status}`);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
