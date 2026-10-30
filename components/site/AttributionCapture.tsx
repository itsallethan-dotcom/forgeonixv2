"use client";

import { useEffect } from "react";
import { UTM_KEYS, type Attribution } from "@/content/contact";

const KEY = "fx_attribution";

/**
 * Captures UTM parameters + referrer on the first page load of a session and
 * stashes them in sessionStorage, so campaign attribution survives client-side
 * navigation to /contact. Renders nothing. All storage access is guarded —
 * sessionStorage can throw (private mode, blocked cookies) and must never break
 * the page.
 */
export function AttributionCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) utm[k] = v;
      }
      sessionStorage.setItem(
        KEY,
        JSON.stringify({ utm, referrer: document.referrer || undefined }),
      );
    } catch {
      /* storage unavailable — attribution is best-effort */
    }
  }, []);

  return null;
}

/** Read stored attribution + the current path, for the contact submit payload. */
export function readAttribution(): Attribution {
  const path = typeof window !== "undefined" ? window.location.pathname : undefined;
  try {
    const raw = sessionStorage.getItem(KEY);
    const base = raw ? (JSON.parse(raw) as Partial<Attribution>) : {};
    return { utm: base.utm ?? {}, referrer: base.referrer, path };
  } catch {
    return { utm: {}, path };
  }
}
