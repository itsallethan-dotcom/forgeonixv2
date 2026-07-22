/**
 * Delivered products — completed, shipped client work (distinct from the
 * interactive Solutions showcases). These are real deployments; per the Demo
 * Branding Rule, real client branding appears here as an approved case study,
 * not as a demo.
 */

export type DeliveredProduct = {
  id: string;
  name: string;
  /** Short capability-led description. */
  description: string;
  /** Capabilities, not technologies. */
  capabilities: string[];
  /** Live site URL — shown as a live browser-framed view of the product. */
  href: string;
  /** Display host for the browser frame's address bar. */
  host: string;
};

export const DELIVERED: DeliveredProduct[] = [
  {
    id: "blackgate-studios",
    name: "Blackgate Studios",
    description:
      "Professional tattoo studio website, portfolio platform, and content management system built for a working studio.",
    capabilities: [
      "Artist portfolio management",
      "Gallery administration",
      "Cloud media management",
      "Video integration",
      "Secure admin tools",
      "Mobile-first experience",
    ],
    href: "https://blackgatestudios.art",
    host: "blackgatestudios.art",
  },
];
