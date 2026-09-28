"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Wordmark } from "@/components/ui/Mark";

const LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

/** Matches the `md` breakpoint (768px) where the full nav is shown. */
const MOBILE_QUERY = "(max-width: 767.98px)";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Track the breakpoint; crossing up to desktop force-closes the sheet.
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

  // Scroll lock bound to an actually-open mobile panel.
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
          <Link href="/" className="rounded-sm" aria-label="Forgeonix — home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-sm px-3 py-2 text-sm transition-colors ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink-dim"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="fx-btn fx-btn--primary ml-3 !py-2 !px-4">
              Start a Project
            </Link>
          </nav>

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
                onClick={(e) => e.stopPropagation()}
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

                <nav aria-label="Primary mobile" className="mt-4 flex flex-col">
                  {LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      className="border-b border-[var(--fx-line-faint)] py-4 text-lg text-ink-dim transition-colors last:border-0 hover:text-ink aria-[current=page]:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/contact" className="fx-btn fx-btn--primary mt-6 self-start">
                    Start a Project
                  </Link>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
