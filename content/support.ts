/**
 * Your Technology Partner — recurring support plans. Technology keeps changing
 * after launch; these keep systems reliable over time.
 */

export type SupportPlan = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  features: string[];
  /** Visually emphasised as the recommended middle plan. */
  featured?: boolean;
};

export const SUPPORT_PLANS: SupportPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$100",
    cadence: "/month",
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
    features: [
      "User support",
      "Device management",
      "Security guidance",
      "Network support",
    ],
  },
];
