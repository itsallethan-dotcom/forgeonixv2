import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SOCIAL } from "@/content/social";

const EMAIL = "ethan@forgeonix.dev";

export function Contact() {
  return (
    <Section
      id="contact"
      grid
      connector
      pulse
      className="relative border-t border-[var(--fx-line)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(77,151,255,0.10), transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow index="04">Contact</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="contact-title" className="fx-h2 mt-6 text-ink">
            Describe the part of your business that keeps causing problems.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="fx-lede mx-auto mt-5 max-w-xl">
            Show me where the process breaks down. If custom software is the
            right answer, I&apos;ll tell you what it would take.
          </p>
        </Reveal>

        <Reveal
          delay={210}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href={`mailto:${EMAIL}?subject=Project%20enquiry`} variant="primary">
            Email {EMAIL}
          </Button>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.85rem] text-ink-muted">
            <span className="fx-mono text-[0.58rem] text-ink-faint">Or connect</span>
            {SOCIAL.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.description}
                className="rounded-sm transition-colors hover:text-signal-soft"
              >
                {s.label}
                <span aria-hidden> ↗</span>
              </a>
            ))}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="fx-mono mt-8 text-[0.58rem] text-ink-faint">
            Replies usually within a working day
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
