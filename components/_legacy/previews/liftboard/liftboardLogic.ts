/**
 * Workout Leaderboard — preview domain logic.
 *
 * Adapted from the original gym leaderboard: ranking is by total training
 * VOLUME (weight × reps × sets), and volume is formatted with the app's real
 * `formatLiftboardVolume` rule. Fictional roster; "You" is the visitor, who
 * climbs the board by logging sets — the single workflow that turns boring
 * numbers into something competitive.
 */

export interface Athlete {
  id: string;
  name: string;
  volume: number;
  isYou?: boolean;
}

export interface Ranked extends Athlete {
  rank: number;
}

/** A preset set the visitor can log, with its volume contribution. */
export interface Lift {
  id: string;
  label: string;
  weight: number;
  reps: number;
  sets: number;
}

export const LIFTS: Lift[] = [
  { id: "squat", label: "Squat", weight: 225, reps: 5, sets: 3 },
  { id: "bench", label: "Bench", weight: 185, reps: 5, sets: 3 },
  { id: "deadlift", label: "Deadlift", weight: 315, reps: 3, sets: 3 },
];

export function liftVolume(l: Lift): number {
  return l.weight * l.reps * l.sets;
}

/** Real formatter from lib/os/liftboard.ts */
export function formatVolume(volume: number): string {
  if (volume <= 0) return "0";
  if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `${(volume / 1_000).toFixed(1)}k`;
  return volume.toLocaleString();
}

export function rankAll(athletes: Athlete[]): Ranked[] {
  return [...athletes]
    .sort((a, b) => b.volume - a.volume)
    .map((a, i) => ({ ...a, rank: i + 1 }));
}

/** Fictional roster. "You" starts mid-pack so there's room to climb. */
export function initialRoster(): Athlete[] {
  return [
    { id: "a1", name: "A. Carter", volume: 52_340 },
    { id: "a2", name: "M. Brooks", volume: 49_720 },
    { id: "a3", name: "S. Nguyen", volume: 48_110 },
    { id: "you", name: "You", volume: 44_900, isYou: true },
    { id: "a4", name: "D. Owens", volume: 43_260 },
    { id: "a5", name: "R. Mercer", volume: 40_880 },
    { id: "a6", name: "K. Flores", volume: 38_450 },
  ];
}
