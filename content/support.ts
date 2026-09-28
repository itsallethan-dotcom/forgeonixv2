/**
 * Your Technology Partner — recurring support plans. Technology keeps changing
 * after launch; these keep systems reliable over time.
 */

export type SupportPlan = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  /** One-line summary of who the plan is for. */
  summary: string;
  /** Response expectation — deliberately concrete, never "instant". */
  response: string;
  features: string[];
  /** Visually emphasised as the recommended middle plan. */
  featured?: boolean;
};

/**
 * What monthly support covers vs. what is billed as project work. Used to keep
 * plans honest — no "unlimited" promises.
 */
export const SUPPORT_SCOPE = {
  included: [
    "Maintenance — updates, security patches, backups, uptime checks",
    "Troubleshooting — fixing things that broke in existing, delivered work",
    "Minor changes — small copy, content, and configuration tweaks",
    "Guidance — questions, planning, and technology advice",
  ],
  projectWork: [
    "New features or pages",
    "New integrations or automations",
    "New systems or major redesigns",
    "Data migrations and one-off build work",
  ],
  note:
    "Monthly plans cover maintenance, small changes, and guidance within reasonable use — not unlimited development. Larger changes are scoped and quoted as project work, and support hours don't roll over month to month.",
};

export const SUPPORT_PLANS: SupportPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$100",
    cadence: "/month",
    summary: "Keep a delivered site or system current and healthy.",
    response: "Response within 2 business days",
    features: [
      "Website updates",
      "Software updates",
      "Minor changes",
      "Monthly check-in",
    ],
  },
  {
    id: "business-partner",
    name: "Business Partner",
    price: "$300",
    cadence: "/month",
    featured: true,
    summary: "Ongoing improvement and monitoring for a system you rely on daily.",
    response: "Priority response within 1 business day",
    features: [
      "Priority support",
      "System monitoring",
      "Backup checks",
      "Workflow improvements",
      "Technology guidance",
    ],
  },
  {
    id: "dedicated",
    name: "Dedicated Support",
    price: "Custom pricing",
    summary: "Broader technology support across devices, users, and networks.",
    response: "Response terms agreed per engagement",
    features: [
      "User support",
      "Device management",
      "Security guidance",
      "Network support",
    ],
  },
];
