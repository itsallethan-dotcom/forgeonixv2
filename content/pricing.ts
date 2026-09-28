/**
 * Starting Investments — typical starting points, not fixed quotes. Kept honest
 * with a disclaimer; final pricing is always scoped per project.
 */

export type PriceTier = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  description: string;
  includes: string[];
};

export const PRICING: PriceTier[] = [
  {
    id: "websites",
    name: "Business Websites",
    price: "$1,500",
    description: "Professional websites designed for small businesses.",
    includes: [
      "Mobile-friendly design",
      "Contact forms",
      "Hosting setup",
      "Basic SEO setup",
    ],
  },
  {
    id: "systems",
    name: "Custom Business Systems",
    price: "$2,500",
    description:
      "Tools built around your workflow instead of forcing your business into existing software.",
    includes: [
      "Customer management",
      "Lead tracking",
      "Scheduling",
      "Dashboards",
      "Quote systems",
    ],
  },
  {
    id: "automation",
    name: "Automation Solutions",
    price: "$750",
    description: "Remove repetitive work and connect your existing tools.",
    includes: [
      "Automated follow-ups",
      "Notifications",
      "Reports",
      "Data processing",
    ],
  },
  {
    id: "support",
    name: "Technology Support",
    price: "$100",
    cadence: "/hr",
    description: "Help when technology becomes the problem.",
    includes: [
      "Troubleshooting",
      "Software issues",
      "Device setup",
      "Technology guidance",
    ],
  },
];

export const PRICING_DISCLAIMER =
  "Pricing varies based on project scope. Contact us for a custom solution.";
