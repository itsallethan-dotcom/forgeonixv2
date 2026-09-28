import Link from "next/link";
import { Wordmark } from "@/components/ui/Mark";
import { SOCIAL } from "@/content/social";

const LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--fx-line)] bg-[var(--fx-shell)]">
      <div className="fx-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-3 text-[0.8rem] text-ink-faint">
            Custom software and technology support for small businesses.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-[0.82rem] text-ink-muted transition-colors hover:text-ink-dim"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="fx-shell flex flex-col gap-2 border-t border-[var(--fx-line)] py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="fx-mono text-[0.55rem] text-ink-faint">
          © {new Date().getFullYear()} Forgeonix
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="mailto:ethan@forgeonix.dev"
            className="fx-mono rounded-sm text-[0.55rem] text-ink-muted transition-colors hover:text-signal-soft"
          >
            ethan@forgeonix.dev
          </a>
          {SOCIAL.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.description}
              className="fx-mono rounded-sm text-[0.55rem] text-ink-muted transition-colors hover:text-signal-soft"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
