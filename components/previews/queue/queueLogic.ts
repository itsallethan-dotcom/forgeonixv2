/**
 * Oak & Steel queue — preview domain logic.
 *
 * Adapted from the real barbershop queue application (lib/queue): the same
 * entry lifecycle, position recomputation, wait-time estimate, and
 * "who's next for this barber" selection. Trimmed to what the curated preview
 * needs and populated with FICTIONAL data per the Demo Branding Rule — no real
 * shop, staff, or customer details.
 */

export type EntryStatus = "waiting" | "in_service" | "completed";
export type BarberStatus = "available" | "busy";

export interface Barber {
  id: string;
  name: string;
  status: BarberStatus;
}

export interface Entry {
  id: string;
  customerName: string;
  /** Requested barber, or null for "first available". */
  preferredBarberId: string | null;
  assignedBarberId: string | null;
  status: EntryStatus;
  position: number | null;
  estimatedWaitMinutes: number | null;
  joinedAt: number;
}

export interface QueueState {
  barbers: Barber[];
  entries: Entry[];
  /** Monotonic counter for stable fictional ids. */
  seq: number;
}

export const AVG_SERVICE_MINUTES = 25;

/** Real formula from lib/queue/demo-data.ts */
export function estimateWaitMinutes(
  waitingCount: number,
  averageServiceMinutes: number,
  availableStaffCount: number,
): number {
  if (availableStaffCount <= 0) return waitingCount * averageServiceMinutes;
  return Math.ceil((waitingCount / availableStaffCount) * averageServiceMinutes);
}

function availableCount(barbers: Barber[]): number {
  return Math.max(1, barbers.filter((b) => b.status === "available").length);
}

/**
 * Recompute waiting positions + wait estimates, ordered by join time.
 * Mirrors recalculateDemoWaitTimes() in the source app.
 */
export function recompute(state: QueueState): QueueState {
  const avail = availableCount(state.barbers);
  const waiting = state.entries
    .filter((e) => e.status === "waiting")
    .sort((a, b) => a.joinedAt - b.joinedAt);

  const byId = new Map(waiting.map((e, i) => [e.id, i + 1] as const));

  const entries = state.entries.map((e) => {
    if (e.status !== "waiting") {
      return { ...e, position: null, estimatedWaitMinutes: null };
    }
    const pos = byId.get(e.id)!;
    return {
      ...e,
      position: pos,
      estimatedWaitMinutes: estimateWaitMinutes(pos, AVG_SERVICE_MINUTES, avail),
    };
  });

  return { ...state, entries };
}

/**
 * Next customer a barber should call — their own preferred waiters first, then
 * the first-available pool. Mirrors getNextCustomerToCall() / staff-view.ts.
 */
export function nextForBarber(state: QueueState, barberId: string): Entry | null {
  const waiting = state.entries
    .filter((e) => e.status === "waiting")
    .sort((a, b) => a.joinedAt - b.joinedAt);

  const mine = waiting.find((e) => e.preferredBarberId === barberId);
  if (mine) return mine;
  return waiting.find((e) => e.preferredBarberId === null) ?? null;
}

export function currentFor(state: QueueState, barberId: string): Entry | null {
  return (
    state.entries.find(
      (e) => e.assignedBarberId === barberId && e.status === "in_service",
    ) ?? null
  );
}

export function barberLabel(barberId: string | null, barbers: Barber[]): string {
  if (!barberId) return "First available";
  return barbers.find((b) => b.id === barberId)?.name ?? "—";
}

export function formatWait(minutes: number | null): string {
  if (minutes == null) return "—";
  if (minutes <= 0) return "Up next";
  return `~${minutes} min`;
}

// --- Fictional seed (Oak & Steel Barbers) ------------------------------------

const BARBERS: Barber[] = [
  { id: "b1", name: "Marcus", status: "busy" },
  { id: "b2", name: "Theo", status: "available" },
  { id: "b3", name: "Sal", status: "available" },
];

/** Fictional walk-in name pool for the check-in control. */
export const FICTIONAL_NAMES = [
  "Devon",
  "Priya",
  "Marco",
  "Aisha",
  "Luis",
  "Nadia",
  "Owen",
  "Bianca",
  "Reggie",
  "Sofia",
  "Hassan",
  "Cora",
];

export function initialState(): QueueState {
  const t = 0;
  const state: QueueState = {
    barbers: BARBERS.map((b) => ({ ...b })),
    seq: 100,
    entries: [
      {
        id: "e1",
        customerName: "James R.",
        preferredBarberId: "b1",
        assignedBarberId: "b1",
        status: "in_service",
        position: null,
        estimatedWaitMinutes: null,
        joinedAt: t - 30,
      },
      {
        id: "e2",
        customerName: "Elena",
        preferredBarberId: "b1",
        assignedBarberId: null,
        status: "waiting",
        position: null,
        estimatedWaitMinutes: null,
        joinedAt: t - 20,
      },
      {
        id: "e3",
        customerName: "Jordan M.",
        preferredBarberId: null,
        assignedBarberId: null,
        status: "waiting",
        position: null,
        estimatedWaitMinutes: null,
        joinedAt: t - 14,
      },
      {
        id: "e4",
        customerName: "Marisol",
        preferredBarberId: "b3",
        assignedBarberId: null,
        status: "waiting",
        position: null,
        estimatedWaitMinutes: null,
        joinedAt: t - 8,
      },
    ],
  };
  return recompute(state);
}
