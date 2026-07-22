"use client";

import { useReducer, useRef, useState } from "react";
import {
  barberLabel,
  currentFor,
  formatWait,
  FICTIONAL_NAMES,
  initialState,
  nextForBarber,
  recompute,
  type Entry,
  type QueueState,
} from "@/components/previews/queue/queueLogic";

type Action =
  | { type: "CHECK_IN"; name: string; preferredBarberId: string | null }
  | { type: "CALL_NEXT"; barberId: string }
  | { type: "COMPLETE"; barberId: string }
  | { type: "RESET" };

function randomName(state: QueueState): string {
  const active = new Set(
    state.entries
      .filter((e) => e.status !== "completed")
      .map((e) => e.customerName),
  );
  const free = FICTIONAL_NAMES.filter((n) => !active.has(n));
  const pool = free.length ? free : FICTIONAL_NAMES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function reducer(state: QueueState, action: Action): QueueState {
  switch (action.type) {
    case "CHECK_IN": {
      const seq = state.seq + 1;
      const entry: Entry = {
        id: `e${seq}`,
        customerName: action.name.trim() || randomName(state),
        preferredBarberId: action.preferredBarberId,
        assignedBarberId: null,
        status: "waiting",
        position: null,
        estimatedWaitMinutes: null,
        joinedAt: seq,
      };
      return recompute({ ...state, seq, entries: [...state.entries, entry] });
    }
    case "CALL_NEXT": {
      if (currentFor(state, action.barberId)) return state;
      const next = nextForBarber(state, action.barberId);
      if (!next) return state;
      return recompute({
        ...state,
        barbers: state.barbers.map((b) =>
          b.id === action.barberId ? { ...b, status: "busy" } : b,
        ),
        entries: state.entries.map((e) =>
          e.id === next.id
            ? { ...e, status: "in_service", assignedBarberId: action.barberId }
            : e,
        ),
      });
    }
    case "COMPLETE": {
      const cur = currentFor(state, action.barberId);
      if (!cur) return state;
      return recompute({
        ...state,
        barbers: state.barbers.map((b) =>
          b.id === action.barberId ? { ...b, status: "available" } : b,
        ),
        entries: state.entries.map((e) =>
          e.id === cur.id ? { ...e, status: "completed" } : e,
        ),
      });
    }
    case "RESET":
      return initialState();
  }
}

export function QueuePreview() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [name, setName] = useState("");
  const [pref, setPref] = useState<string>("");
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const waiting = state.entries
    .filter((e) => e.status === "waiting")
    .sort((a, b) => (a.position ?? 99) - (b.position ?? 99));

  function checkIn() {
    const seq = state.seq + 1;
    dispatch({ type: "CHECK_IN", name, preferredBarberId: pref || null });
    setName("");
    setPref("");
    setLastAdded(`e${seq}`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLastAdded(null), 1600);
  }

  return (
    <div className="oaksteel os-shell">
      {/* Shop brand bar — the product's own identity */}
      <div className="os-bar">
        <span className="os-brand">
          <span className="os-badge" aria-hidden>
            O&amp;S
          </span>
          <span>
            <span className="os-name">Oak &amp; Steel</span>
            <span className="os-tag">Barbers · Walk-in list</span>
          </span>
        </span>
        <span className="os-open" aria-live="polite">
          <span className="os-open__dot" aria-hidden />
          {waiting.length} waiting
        </span>
      </div>

      <div className="os-board">
        {/* Waiting list */}
        <div className="os-col">
          <p className="os-label">Waiting</p>
          <ul className="space-y-1.5" aria-live="polite">
            {waiting.length === 0 ? (
              <li className="os-empty">Line&apos;s empty — walk-ins welcome</li>
            ) : (
              waiting.map((e) => (
                <li
                  key={e.id}
                  className={`os-row${lastAdded === e.id ? " os-row--new" : ""}`}
                >
                  <span className="os-num">{e.position}</span>
                  <span className="min-w-0 flex-1">
                    <span className="os-cust block truncate">{e.customerName}</span>
                    <span className="os-meta block truncate">
                      {barberLabel(e.preferredBarberId, state.barbers)}
                    </span>
                  </span>
                  <span className="os-wait">{formatWait(e.estimatedWaitMinutes)}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Chairs */}
        <div className="os-col">
          <p className="os-label">Chairs</p>
          <ul>
            {state.barbers.map((b) => {
              const cur = currentFor(state, b.id);
              const next = nextForBarber(state, b.id);
              return (
                <li key={b.id} className="os-chair">
                  <div className="flex items-center justify-between gap-3">
                    <span className="os-chair__name">{b.name}</span>
                    <span
                      className={`os-chair__status ${
                        cur ? "os-chair__status--busy" : "os-chair__status--open"
                      }`}
                    >
                      {cur ? "In chair" : "Open"}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="os-meta truncate">
                      {cur
                        ? cur.customerName
                        : next
                          ? `Next: ${next.customerName}`
                          : "No one waiting"}
                    </span>
                    {cur ? (
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "COMPLETE", barberId: b.id })}
                        className="os-btn os-btn--done"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "CALL_NEXT", barberId: b.id })}
                        disabled={!next}
                        className="os-btn os-btn--call"
                      >
                        Call next
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Check-in control */}
      <form
        className="os-foot"
        onSubmit={(ev) => {
          ev.preventDefault();
          checkIn();
        }}
      >
        <label htmlFor="q-name" className="sr-only">
          Customer name
        </label>
        <input
          id="q-name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Add a walk-in…"
          className="os-input"
        />
        <label htmlFor="q-barber" className="sr-only">
          Requested barber
        </label>
        <select
          id="q-barber"
          value={pref}
          onChange={(ev) => setPref(ev.target.value)}
          className="os-select"
        >
          <option value="">First available</option>
          {state.barbers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <button type="submit" className="os-btn os-btn--call">
          Check in
        </button>
      </form>
    </div>
  );
}
