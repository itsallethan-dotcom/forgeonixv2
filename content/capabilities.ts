/**
 * Capabilities — the "Solutions" band at the top of the page.
 *
 * These are the categories of work Forgeonix takes on, framed as business
 * problems and outcomes rather than technology features. This is distinct from
 * the SOLUTIONS content (interactive demos) and DELIVERED content (shipped
 * client work); this is the positioning-level menu.
 */

export type Capability = {
  id: string;
  index: string;
  title: string;
  problem: string;
  solution: string;
  examples: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: "custom-systems",
    index: "01",
    title: "Custom Business Systems",
    problem:
      "Customer information, leads, and workflows are often scattered across multiple tools.",
    solution:
      "Custom systems built around the way your business actually operates.",
    examples: [
      "Customer management",
      "Lead tracking",
      "Scheduling",
      "Quotes and invoices",
      "Internal dashboards",
    ],
  },
  {
    id: "automation",
    index: "02",
    title: "Business Automation",
    problem: "Businesses waste time repeating the same manual tasks.",
    solution: "Connect your tools and automate repetitive work.",
    examples: [
      "Follow-ups",
      "Notifications",
      "Reports",
      "Data processing",
      "AI-assisted workflows",
    ],
  },
  {
    id: "websites",
    index: "03",
    title: "Websites & Digital Tools",
    problem: "A website should do more than just exist.",
    solution: "Build digital experiences that help your business grow.",
    examples: [
      "Business websites",
      "Booking systems",
      "Interactive tools",
      "Customer portals",
    ],
  },
  {
    id: "tech-support",
    index: "04",
    title: "Technology Support",
    problem: "Technology problems slow businesses down.",
    solution: "Practical technology help without the corporate IT headache.",
    examples: [
      "Troubleshooting",
      "Device setup",
      "Microsoft 365",
      "Networks",
      "Business technology consulting",
    ],
  },
];
