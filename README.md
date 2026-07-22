# Forgeonix — v3 landing page

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Structure

```
app/
  layout.tsx        fonts (Space Grotesk / Inter / JetBrains Mono) + metadata
  globals.css       design tokens, primitives, animation, reduced-motion rules
  page.tsx          section composition only
components/
  site/             one file per landing-page section
  ui/               Mark, Reveal, SectionHead
  visuals/          custom SVG artwork (system map, schematics, work previews)
```

## Notes

- Everything is one page. Nav links are in-page anchors; no extra routes exist yet.
- All artwork is inline SVG or CSS. No images beyond `public/forgeonix-mark.png`,
  no illustration libraries, no particle systems.
- Animation is CSS-driven. `Reveal` uses one IntersectionObserver per element and
  flips a data attribute rather than React state. Everything is disabled under
  `prefers-reduced-motion: reduce`.
- Colours, type scale, spacing and panel styles live as CSS custom properties in
  `globals.css` and are exposed to Tailwind through `@theme inline`.
