"use client";

import { useState } from "react";

const EMAIL = "ethan@forgeonix.dev";

const TOPICS = [
  "Custom business system",
  "Business automation",
  "Website or digital tool",
  "Technology support",
  "Not sure yet",
];

const field =
  "mt-2 w-full rounded-[var(--fx-radius)] border border-[var(--fx-line-strong)] bg-[var(--fx-void)] px-3.5 py-2.5 text-[0.9rem] text-ink placeholder:text-ink-faint focus-visible:border-signal focus-visible:outline-none";
const label = "fx-mono text-[0.6rem] text-ink-muted";

/**
 * Contact form. The site is statically hosted with no mail backend, so on
 * submit this composes a pre-filled email in the visitor's own mail app — a
 * real, working form that never silently drops a message. The direct email and
 * links below are the fallback.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Project enquiry — ${topic}`;
    const body = [
      `Name: ${name}`,
      business ? `Business: ${business}` : null,
      `Email: ${email}`,
      `Topic: ${topic}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="fx-panel fx-ticks p-6 sm:p-8" noValidate={false}>
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
          />
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
          />
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
            {TOPICS.map((t) => (
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
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="fx-btn fx-btn--primary">
          Send message
        </button>
        <p className="text-[0.78rem] text-ink-faint">
          This opens your email app with the details filled in.
        </p>
      </div>
    </form>
  );
}
