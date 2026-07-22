"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Wordmark } from "@/components/ui/Mark";

const LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Matches the `md` breakpoint (768px) where the full nav is shown. */
const MOBILE_QUERY = "(max-width: 767.98px)";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy over the sections the nav points at.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Track the breakpoint. The mobile menu (button + panel) only exists below it;
  // crossing up to desktop force-closes so no lock can survive the resize.
  useEffect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia(MOBILE_QUERY);
    const apply = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setOpen(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Scroll lock is bound to an actually-open mobile panel, and always cleaned up.
  useEffect(() => {
    if (!(open && isMobile)) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobile]);

  // Escape to close; move focus into the panel on open.
  useEffect(() => {
    if (!(open && isMobile)) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, isMobile]);

  // Final safety net: never leave the body locked if the component unmounts.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const panelOpen = mounted && isMobile && open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || panelOpen
            ? "border-[var(--fx-line)] bg-[rgba(var(--fx-void-rgb),0.9)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="fx-shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <a
            href="#top"
            className="rounded-sm"
            aria-label="Forgeonix — back to top"
            onClick={() => setOpen(false)}
          >
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`rounded-sm px-3 py-2 text-sm transition-colors ${
                  active === link.href
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink-dim"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="fx-btn fx-btn--primary ml-3 !py-2 !px-4">
              Start a project
            </a>
          </nav>

          {/* Menu control exists only at mobile widths. */}
          {mounted && isMobile ? (
            <button
              ref={toggleRef}
              type="button"
              className="fx-btn fx-btn--ghost !px-3 !py-2"
              aria-expanded={open}
              aria-controls="fx-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="fx-mono text-[0.65rem]">{open ? "Close" : "Menu"}</span>
            </button>
          ) : null}
        </div>
      </header>

      {/* Mobile menu panel — portalled to <body> so no header stacking/overflow
          context can hide or clip it. Rendered only when open on mobile. */}
      {panelOpen
        ? createPortal(
            <div
              id="fx-mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-0 z-[90] bg-[rgba(var(--fx-void-rgb),0.98)] backdrop-blur-md"
              onClick={close}
            >
              <div
                ref={panelRef}
                className="fx-shell flex min-h-dvh flex-col pt-6 pb-10"
              >
                <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
                  <Wordmark />
                  <button
                    type="button"
                    className="fx-btn fx-btn--ghost !px-3 !py-2"
                    onClick={close}
                  >
                    <span className="fx-mono text-[0.65rem]">Close</span>
                  </button>
                </div>

                <nav
                  aria-label="Primary mobile"
                  className="mt-4 flex flex-col"
                >
                  {LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="border-b border-[var(--fx-line-faint)] py-4 text-lg text-ink-dim transition-colors last:border-0 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={close}
                    className="fx-btn fx-btn--primary mt-6 self-start"
                  >
                    Start a project
                  </a>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
