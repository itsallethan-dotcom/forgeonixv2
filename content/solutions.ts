/**
 * Solution sections — source of truth for the Solutions band.
 *
 * DEMO BRANDING RULE (see DESIGN_PRINCIPLES.md): interactive demos use
 * FICTIONAL businesses and FICTIONAL data unless a real client has explicitly
 * approved public case-study use. The barbershop practice build ships publicly
 * as the fictional "Oak & Steel Barbers" — no real shop name, logo, staff,
 * location, or contact details anywhere.
 *
 * The interactive showcase on the homepage IS the demo — there is no separate
 * full-demo page, so copy stays light: one problem sentence, one solution
 * sentence, and the live preview does the explaining.
 */

export type Solution = {
  /** Stable slug — used for the anchor id. */
  id: string;
  /** Ordinal shown in the mono eyebrow, e.g. "01". */
  index: string;
  /** Product / demo brand name (fictional unless an approved case study). */
  brand: string;
  /** Short category descriptor. */
  kind: string;
  /** The problem-focused headline. */
  headline: string;
  /** One short problem sentence. */
  problem: string;
  /** One short solution sentence. */
  solution: string;
  /** Whether this brand is a fictional demo or an approved real-client study. */
  fictional: boolean;
};

export const SOLUTIONS: Solution[] = [
  {
    id: "oak-and-steel",
    index: "01",
    brand: "Oak & Steel Barbers",
    kind: "Digital queue",
    headline: "Still using a clipboard?",
    problem: "A paper sign-in sheet hides the wait and loses walk-ins.",
    solution: "A live queue shows customers their place and barbers who's next.",
    fictional: true,
  },
  {
    id: "realty-leaderboard",
    index: "02",
    brand: "Realty Leaderboard",
    kind: "Sales performance",
    headline: "Make every closing count.",
    problem: "Agent production sits in month-end spreadsheets nobody opens.",
    solution: "Turn closed deals into a live leaderboard your team actually checks.",
    fictional: true,
  },
  {
    id: "solea-nail-designer",
    index: "03",
    brand: "Solea Nail Designer",
    kind: "Visual configurator",
    headline: "Stop asking customers to imagine the result.",
    problem: "Clients describe a design and hope the finished result matches.",
    solution: "Let them build and preview the look before the appointment.",
    fictional: true,
  },
  {
    id: "minicrm",
    index: "04",
    brand: "MiniCRM",
    kind: "Lead + client tracking",
    headline: "Sticky notes don't scale.",
    problem: "Leads and follow-ups live on notes and memory, so things slip.",
    solution: "One clear pipeline the whole business can see.",
    fictional: true,
  },
];
