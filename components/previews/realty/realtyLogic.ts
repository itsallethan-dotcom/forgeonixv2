/**
 * Realty Leaderboard — preview domain logic.
 *
 * Adapted from the realty-leaderboard project: agents are ranked by YTD sales
 * VOLUME (sum of sale prices), tracked alongside closings, and money is
 * formatted with the app's real `formatCurrency` rule ($X.XXM / $XK). Fictional
 * brokerage + agents; "You" logs a sale to climb the board — the single
 * workflow that turns a flat sales report into live competition.
 */

export interface Agent {
  id: string;
  name: string;
  initials: string;
  volume: number;
  closings: number;
  isYou?: boolean;
}

export interface Ranked extends Agent {
  rank: number;
}

/** A preset closing the visitor can log. */
export interface Sale {
  id: string;
  label: string;
  price: number;
}

export const SALES: Sale[] = [
  { id: "condo", label: "Condo", price: 385_000 },
  { id: "family", label: "Single-family", price: 720_000 },
  { id: "luxury", label: "Luxury", price: 1_400_000 },
];

/** Real formatter from lib/real-estate/formatting.ts */
export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Ranking mirrors buildAgentRankings(): sort desc by YTD volume. */
export function rankAll(agents: Agent[]): Ranked[] {
  return [...agents]
    .sort((a, b) => b.volume - a.volume)
    .map((a, i) => ({ ...a, rank: i + 1 }));
}

/** Fictional roster. "You" starts mid-pack with room to climb. */
export function initialRoster(): Agent[] {
  return [
    { id: "a1", name: "Alicia Moreno", initials: "AM", volume: 11_950_000, closings: 18 },
    { id: "a2", name: "Grant Whitfield", initials: "GW", volume: 10_300_000, closings: 15 },
    { id: "a3", name: "Priya Raman", initials: "PR", volume: 9_180_000, closings: 14 },
    { id: "you", name: "You", initials: "YOU", volume: 7_640_000, closings: 11, isYou: true },
    { id: "a4", name: "Devon Clarke", initials: "DC", volume: 6_720_000, closings: 12 },
    { id: "a5", name: "Sofia Bianchi", initials: "SB", volume: 5_410_000, closings: 9 },
    { id: "a6", name: "Marcus Reid", initials: "MR", volume: 4_260_000, closings: 8 },
  ];
}
