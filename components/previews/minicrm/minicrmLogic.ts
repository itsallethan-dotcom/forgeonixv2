/**
 * MiniCRM — preview domain logic.
 *
 * Reuses the original CRM's pipeline model: ordered stages, leads with a
 * cent-denominated value, and pipeline-value / won-revenue metrics
 * (lib/crm: types.ts, metrics.ts). The single workflow: advance a lead through
 * the pipeline and watch value move from open to won — the opposite of leads
 * living on sticky notes.
 */

export type StageKey = "new" | "contacted" | "qualified" | "proposal";

export interface Stage {
  key: StageKey;
  label: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  valueCents: number;
  stageKey: StageKey;
}

/** Open stages shown on the board. "Won" is terminal and leaves the board. */
export const STAGES: Stage[] = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "proposal", label: "Proposal" },
];

const ORDER: StageKey[] = ["new", "contacted", "qualified", "proposal"];

/** Next stage, or "won" when advancing past the last open stage. */
export function nextStage(key: StageKey): StageKey | "won" {
  const i = ORDER.indexOf(key);
  return i >= ORDER.length - 1 ? "won" : ORDER[i + 1];
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/** Real metric shape: open pipeline value = sum of leads still on the board. */
export function pipelineValue(leads: Lead[]): number {
  return leads.reduce((sum, l) => sum + l.valueCents, 0);
}

export function leadsInStage(leads: Lead[], key: StageKey): Lead[] {
  return leads.filter((l) => l.stageKey === key);
}

/** Fictional pipeline. */
export function initialLeads(): Lead[] {
  return [
    { id: "l1", name: "Priya Shah", company: "Northwind Cafe", valueCents: 240000, stageKey: "new" },
    { id: "l2", name: "Marcus Bell", company: "Bell & Co Fitness", valueCents: 520000, stageKey: "new" },
    { id: "l3", name: "Dana Lowe", company: "Lowe Dental", valueCents: 180000, stageKey: "contacted" },
    { id: "l4", name: "Sofia Reyes", company: "Reyes Realty", valueCents: 610000, stageKey: "contacted" },
    { id: "l5", name: "Owen Pratt", company: "Pratt Plumbing", valueCents: 150000, stageKey: "qualified" },
    { id: "l6", name: "Nadia Khan", company: "Khan Studios", valueCents: 430000, stageKey: "proposal" },
  ];
}
