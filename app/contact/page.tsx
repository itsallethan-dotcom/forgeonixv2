import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { SOCIAL } from "@/content/social";

const EMAIL = "ethan@forgeonix.dev";

export const metadata: Metadata = {
  title: "Contact | Forgeonix",
  description:
    "Tell Forgeonix what's slowing your business down. Start a project or ask a question about custom software, automation, websites, or technology support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a project."
        lede="Tell Forgeonix what's slowing your business down. We'll help determine what technology actually makes sense — and if custom software isn't the answer, we'll say so."
      />

      <section className="fx-section" aria-label="Contact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <ContactForm />

            <div>
              <h2 className="fx-h3 text-[1.1rem] text-ink">Prefer to reach out directly?</h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <p className="fx-mono text-[0.58rem] text-ink-faint">Email</p>
                  <a
                    href={`mailto:${EMAIL}?subject=Project%20enquiry`}
                    className="mt-1 inline-block rounded-sm text-[0.95rem] text-ink-dim transition-colors hover:text-signal-soft"
                  >
                    {EMAIL}
                  </a>
                </li>
                {SOCIAL.map((s) => (
                  <li key={s.href}>
                    <p className="fx-mono text-[0.58rem] text-ink-faint">{s.label}</p>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.description}
                      className="mt-1 inline-block rounded-sm text-[0.95rem] text-ink-dim transition-colors hover:text-signal-soft"
                    >
                      {s.description}
                      <span aria-hidden> ↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="fx-mono mt-8 text-[0.58rem] text-ink-faint">
                Replies usually within a working day
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
