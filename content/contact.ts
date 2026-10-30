/**
 * Contact form — shared types and server-side validation.
 *
 * Framework-agnostic so the API route and the client form agree on shape. All
 * trust decisions happen on the server (see validateContact). User free-text
 * never goes into email headers — only the fixed subject/topic and the sender's
 * validated address do — so header injection isn't possible.
 */

export const CONTACT_TOPICS = [
  "Custom business system",
  "Business automation",
  "Website or digital tool",
  "Technology support",
  "Not sure yet",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Keys read from the page URL / referrer for lead attribution. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Attribution = {
  utm: Partial<Record<(typeof UTM_KEYS)[number], string>>;
  referrer?: string;
  path?: string;
};

/** Raw payload the browser POSTs. `website` is the honeypot (must stay empty). */
export type ContactPayload = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
  elapsedMs?: unknown; // time-on-form signal (never a sole rejection reason)
  attribution?: unknown;
};

export type CleanContact = {
  name: string;
  business: string;
  email: string;
  topic: ContactTopic;
  message: string;
  attribution: Attribution;
  /** Milliseconds between form mount and submit, if the client provided it. */
  elapsedMs: number | null;
};

export type ValidationResult =
  | { ok: true; data: CleanContact }
  | { ok: false; errors: Record<string, string> };

export const LIMITS = {
  name: 100,
  business: 120,
  email: 160,
  message: 5000,
  attrValue: 200,
} as const;

// Pragmatic email check: single @, no spaces, a dot in the domain. Intentionally
// not RFC-exhaustive — it rejects obvious junk without blocking real addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function clip(v: string, max: number): string {
  return v.length > max ? v.slice(0, max) : v;
}

function cleanAttribution(raw: unknown): Attribution {
  const out: Attribution = { utm: {} };
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  // UTM params arrive nested under `utm` (see AttributionCapture.readAttribution).
  const utmSrc =
    r.utm && typeof r.utm === "object" ? (r.utm as Record<string, unknown>) : {};
  for (const key of UTM_KEYS) {
    const val = asString(utmSrc[key]);
    if (val) out.utm[key] = clip(val, LIMITS.attrValue);
  }
  const referrer = asString(r.referrer);
  if (referrer) out.referrer = clip(referrer, LIMITS.attrValue);
  const path = asString(r.path);
  if (path) out.path = clip(path, LIMITS.attrValue);
  return out;
}

/**
 * Validate + sanitize a raw payload. Returns field-level errors the form can
 * show. The honeypot is checked here too: a filled `website` field means a bot,
 * reported as a generic error. A fast submit is NOT rejected on its own.
 */
export function validateContact(raw: ContactPayload): ValidationResult {
  // Honeypot: real users never see or fill this.
  if (asString(raw.website)) {
    return { ok: false, errors: { form: "Submission rejected." } };
  }

  const errors: Record<string, string> = {};

  const name = clip(asString(raw.name), LIMITS.name);
  if (!name) errors.name = "Please enter your name.";

  const email = clip(asString(raw.email), LIMITS.email);
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";

  const message = clip(asString(raw.message), LIMITS.message);
  if (!message) errors.message = "Please describe what you need help with.";

  const business = clip(asString(raw.business), LIMITS.business);

  const topicRaw = asString(raw.topic) as ContactTopic;
  const topic: ContactTopic = CONTACT_TOPICS.includes(topicRaw)
    ? topicRaw
    : CONTACT_TOPICS[0];

  const elapsedMs =
    typeof raw.elapsedMs === "number" && Number.isFinite(raw.elapsedMs)
      ? raw.elapsedMs
      : null;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      business,
      email,
      topic,
      message,
      attribution: cleanAttribution(raw.attribution),
      elapsedMs,
    },
  };
}
