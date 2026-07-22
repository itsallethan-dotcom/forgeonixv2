# Forgeonix Design Principles

> Governing specification for Forgeonix V3. Read and follow this before writing code.

## Purpose

Forgeonix exists to demonstrate how custom software solves real business problems.

The website is NOT a portfolio of code.
The website is NOT a developer blog.
The website is NOT an app dashboard.

Every section should answer: **"How does this help a business owner?"**

---

## Design Language

Modern · Premium · Technical · Confident · Fast · Minimal · Purposeful

Avoid: cyberpunk clichés, floating cards, moving cards, excessive glassmorphism,
decorative animations, animation for the sake of animation.

---

## Motion

Motion should communicate process.

- **Good:** data flowing, workflow progression, background node movement, section reveals, hover feedback.
- **Bad:** floating objects, constant movement, rotating UI, scroll hijacking, mouse-follow effects.

All motion must honor `prefers-reduced-motion`.

---

## Colors

Charcoal · Blue · White. **No pure black backgrounds.**

---

## Typography

- **Sora** — the Forgeonix wordmark, headings, and major statements.
- **Inter** — navigation, body copy, buttons, forms, and general UI.
- **IBM Plex Mono** — restrained technical accents only: section labels, workflow
  statuses, demo metadata, small eyebrow text.
- Do **not** make the site feel like a terminal.

---

## Every solution section contains

1. Problem-focused headline
2. Product or fictional business name
3. One short problem sentence
4. One short solution sentence
5. Interactive showcase

The interactive applications are the portfolio. Visitors should experience the
core value of each product without leaving the homepage — there is no separate
"full demo" page, and copy stays light because the live showcase does the explaining.

---

## Every feature must justify itself

If it doesn't help explain a problem, build trust, or improve usability — don't build it.

---

## Demo Branding Rule

Interactive demos must use **fictional businesses and fictional data** unless the
business has explicitly approved public use as a case study.

Demos and case studies are separate:

- **Demos** show the *types* of problems Forgeonix can solve (fictional brands, fictional data).
- **Case studies** provide proof of completed work for real clients (real branding, used only with explicit permission).
- Real client branding must **never** be reused in a public demo without explicit permission.

Practice builds and internal prototypes must be re-skinned as fictional brands before
appearing anywhere public. Example: the barbershop queue prototype ships publicly as the
fictional **Oak & Steel Barbers** — no real shop name, logo, staff, location, or contact details.

---

## Initial launch solution sections

1. **Oak & Steel Barbers** — "Still using a clipboard?" (fictional demo brand)
2. **Realty Leaderboard** — "Boring data doesn't motivate people."
3. **Solea Nail Designer** — "Stop asking customers to imagine the result."
4. **MiniCRM** — "Sticky notes don't scale."

Blackgate Studios appears later as a **real-client credibility case study**, not as a main
interactive solution section. MatStats and Workout Leaderboard are intentionally deferred.
