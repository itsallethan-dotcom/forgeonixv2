/**
 * Shipped Client Work — real, delivered client projects. Distinct from the
 * Interactive Concepts & Demos band (see content/solutions.ts), which is
 * fictional or unbuilt.
 *
 * Rules: no invented metrics, revenue, conversion, or usage numbers. Media is
 * either a LIVE framed view of the running site, or a real screenshot. A
 * screenshot that shows demo/sample data is marked `demo` and rendered with a
 * DEMO treatment so it is never mistaken for a live client deployment.
 */

export type CaseMedia =
  | { kind: "live"; href: string; host: string }
  | {
      kind: "shot";
      src: string;
      alt: string;
      /** Address-bar label for the browser frame. */
      host: string;
      /** Screenshot shows demo/sample data, not a live client site. */
      demo?: boolean;
    };

export type CaseStudy = {
  id: string;
  /** URL slug — case study lives at /work/<slug>. */
  slug: string;
  name: string;
  /** Short category label, e.g. "Custom CRM & operations". */
  kind: string;
  /** One-sentence summary for cards and carousels. */
  blurb: string;
  /** Case-study page subtitle. */
  subtitle: string;
  /** Give this build the strongest emphasis. */
  featured?: boolean;
  /** Case-study copy. Blackgate keeps a plain description instead. */
  problem?: string;
  solution?: string;
  outcome?: string;
  /** Fallback lead copy when problem/solution are not used. */
  description?: string;
  /** Built features / capabilities (not technologies). */
  features: string[];
  media: CaseMedia;
  /** Optional external link (live sites only). */
  href?: string;
  hrefLabel?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "causey-roofing-crm",
    slug: "causey-roofing",
    name: "Causey Roofing CRM",
    kind: "Custom CRM & business operations system",
    blurb:
      "A custom CRM and business operations system built around a roofing contractor's real workflow.",
    subtitle:
      "A custom business operations system built around a roofing contractor's workflow.",
    featured: true,
    problem:
      "Customer information, leads, estimates, materials, and business workflows were difficult to manage through disconnected processes and generic tools.",
    solution:
      "A custom CRM and business operations system built specifically around Causey Roofing's workflow.",
    outcome:
      "A single custom system designed around how the roofing company actually operates, instead of forcing the business into generic CRM software.",
    features: [
      "Lead and customer management",
      "Follow-up tracking",
      "Estimates and invoices",
      "Roofing material management and pricing",
      "Editable labor / material costs",
      "Job and customer statuses",
      "Maps / location functionality",
      "Profitability tools",
      "Gmail / email integration",
      "Custom workflow tailored to the business",
    ],
    media: {
      kind: "shot",
      src: "/causey-crm.png",
      alt: "Causey Roofing CRM lead detail screen showing contact, job status, documents, job costs, and activity — displaying demo data.",
      host: "causey-roofing-crm",
      demo: true,
    },
  },
  {
    id: "blackgate-studios",
    slug: "blackgate-studios",
    name: "Blackgate Studios",
    kind: "Studio website & content platform",
    blurb:
      "A custom portfolio and gallery website built to showcase a tattoo studio's work.",
    subtitle:
      "A custom portfolio and gallery website for a working tattoo studio.",
    description:
      "Professional tattoo studio website, portfolio platform, and content management system built for a working studio.",
    features: [
      "Artist portfolio management",
      "Gallery administration",
      "Cloud media management",
      "Video integration",
      "Secure admin tools",
      "Mobile-first experience",
    ],
    media: {
      kind: "live",
      href: "https://blackgatestudios.art",
      host: "blackgatestudios.art",
    },
    href: "https://blackgatestudios.art",
    hrefLabel: "Visit site",
  },
  {
    id: "solea-nails",
    slug: "solea-nails",
    name: "Solea Nails",
    kind: "Brand website & interactive product designer",
    blurb:
      "A branded website and interactive nail designer built to help customers visualize custom press-on designs.",
    subtitle:
      "A branded website and interactive nail designer for custom press-on nails.",
    problem:
      "Solea needed a branded online presence that could do more than simply display products. Customers needed a better way to visualize custom press-on nail designs before ordering.",
    solution:
      "A custom website and interactive nail designer built around the Solea brand.",
    outcome:
      "A website that acts as both a digital storefront and an interactive product visualization tool.",
    features: [
      "Interactive nail designer",
      "Multiple nail shapes and lengths",
      "Per-nail colors",
      "Glossy, matte, glitter, chrome, and other finishes",
      "Patterns, decals, letters, symbols, and design elements",
      "Save / export design functionality",
      "Mobile-friendly experience",
      "Etsy and Instagram funnel",
      "Branded marketing website",
    ],
    media: {
      kind: "live",
      href: "https://solea.forgeonix.dev",
      host: "solea.forgeonix.dev",
    },
    href: "https://solea.forgeonix.dev",
    hrefLabel: "Visit site",
  },
];
