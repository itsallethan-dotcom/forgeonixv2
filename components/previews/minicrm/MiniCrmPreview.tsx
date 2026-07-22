"use client";

import { useMemo, useState } from "react";
import {
  STAGES,
  formatMoney,
  initialLeads,
  leadsInStage,
  nextStage,
  pipelineValue,
  type Lead,
} from "@/components/previews/minicrm/minicrmLogic";

export function MiniCrmPreview() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [wonCents, setWonCents] = useState(0);
  const [wonCount, setWonCount] = useState(0);

  const open = useMemo(() => pipelineValue(leads), [leads]);

  function advance(lead: Lead) {
    const next = nextStage(lead.stageKey);
    if (next === "won") {
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      setWonCents((c) => c + lead.valueCents);
      setWonCount((n) => n + 1);
    } else {
      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, stageKey: next } : l)),
      );
    }
  }

  return (
    <div className="minicrm crm-shell">
      {/* Brand bar */}
      <div className="crm-bar">
        <span className="crm-brand">
          <span className="crm-badge" aria-hidden>
            ▦
          </span>
          <span className="crm-name">MiniCRM</span>
        </span>
        <span className="crm-metrics" aria-live="polite">
          <span className="crm-metric">
            <span className="crm-metric__k">Pipeline</span>
            <span className="crm-metric__v">{formatMoney(open)}</span>
          </span>
          <span className="crm-metric">
            <span className="crm-metric__k">Won</span>
            <span className="crm-metric__v crm-metric__v--won">
              {formatMoney(wonCents)}
              {wonCount ? <span className="crm-metric__n"> · {wonCount}</span> : null}
            </span>
          </span>
        </span>
      </div>

      {/* Pipeline board */}
      <div className="crm-board">
        {STAGES.map((stage) => {
          const items = leadsInStage(leads, stage.key);
          return (
            <div key={stage.key} className="crm-col">
              <div className="crm-col__head">
                <span className="crm-col__label">{stage.label}</span>
                <span className="crm-col__count">{items.length}</span>
              </div>
              <ul className="crm-col__list">
                {items.map((l) => (
                  <li key={l.id} className="crm-card">
                    <span className="crm-card__name">{l.name}</span>
                    <span className="crm-card__co">{l.company}</span>
                    <span className="crm-card__row">
                      <span className="crm-card__val">{formatMoney(l.valueCents)}</span>
                      <button
                        type="button"
                        className="crm-advance"
                        onClick={() => advance(l)}
                        aria-label={`Advance ${l.name} to ${
                          nextStage(l.stageKey) === "won" ? "Won" : nextStage(l.stageKey)
                        }`}
                      >
                        {nextStage(l.stageKey) === "won" ? "Mark won" : "Advance →"}
                      </button>
                    </span>
                  </li>
                ))}
                {items.length === 0 ? <li className="crm-empty">—</li> : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
