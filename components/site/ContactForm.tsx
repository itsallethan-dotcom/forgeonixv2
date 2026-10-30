"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_TOPICS } from "@/content/contact";
import { readAttribution } from "@/components/site/AttributionCapture";

const EMAIL = "ethan@forgeonix.dev";

const field =
  "mt-2 w-full rounded-[var(--fx-radius)] border border-[var(--fx-line-strong)] bg-[var(--fx-void)] px-3.5 py-2.5 text-[0.9rem] text-ink placeholder:text-ink-faint focus-visible:border-signal focus-visible:outline-none aria-[invalid=true]:border-[var(--fx-amber)]";
const label = "fx-mono text-[0.6rem] text-ink-muted";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

/**
 * Contact form — submits directly to the server (/api/contact), which emails the
 * inquiry via Resend. No email app involved. Honeypot + time-on-form signal,
 * accessible success/error states, and UTM/referrer attribution. Same five
 * visible fields and the existing design.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(CONTACT_TOPICS[0]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  // Set on mount (not during render) so the purity rule is satisfied; used only
  // as a soft time-on-form signal, never a sole rejection reason.
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          business,
          email,
          topic,
          message,
          website,
          elapsedMs: Date.now() - mountedAt.current,
          attribution: readAttribution(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }

      setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
      setStatus("error");
    } catch {
      setErrors({ form: "Could not send right now. Please try again or email us directly." });
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="fx-panel fx-ticks p-6 sm:p-8" role="status" aria-live="polite">
        <span className="fx-mono text-[0.6rem] text-good">Message sent</span>
        <h3 className="fx-h3 mt-3 text-[1.2rem] text-ink">Thanks — it&apos;s on its way.</h3>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">
          Your message is headed to {EMAIL}. I usually reply within a working day.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";
  const describe = (f: keyof FieldErrors) => (errors[f] ? `${f}-error` : undefined);

  return (
    <form onSubmit={onSubmit} className="fx-panel fx-ticks p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name <span className="text-signal">*</span>
          </label>
          <input
            id="cf-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-[0.75rem] text-amber">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-business" className={label}>
            Business
          </label>
          <input
            id="cf-business"
            autoComplete="organization"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className={field}
            placeholder="Business name (optional)"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={label}>
            Email <span className="text-signal">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
            placeholder="you@business.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-[0.75rem] text-amber">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-topic" className={label}>
            What can we help with?
          </label>
          <select
            id="cf-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={field}
          >
            {CONTACT_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={label}>
          What&apos;s slowing your business down? <span className="text-signal">*</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y`}
          placeholder="Describe the process or problem you'd like to fix."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-[0.75rem] text-amber">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from people, enticing to bots. Off-screen, not focusable. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Live region for form-level status / errors */}
      <div aria-live="polite" className="sr-only">
        {submitting ? "Sending your message…" : errors.form ? errors.form : ""}
      </div>

      {errors.form ? (
        <p className="mt-5 rounded-[var(--fx-radius)] border border-[rgba(223,160,74,0.4)] bg-[rgba(223,160,74,0.08)] px-3.5 py-2.5 text-[0.82rem] text-amber">
          {errors.form}{" "}
          <a href={`mailto:${EMAIL}?subject=Project%20enquiry`} className="underline underline-offset-2">
            Email {EMAIL}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="fx-btn fx-btn--primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-[0.78rem] text-ink-faint">
          We usually reply within a working day.
        </p>
      </div>
    </form>
  );
}
