"use client";

import { useCallback, useEffect, useState } from "react";
import { lsGet, lsSet } from "@/lib/intl/currency";

const SAVED_KEY = "charteredone.savedServices";

/**
 * "Save for later" hearts, kept in the browser (same storage key as the original page,
 * so hearts saved on the old page carry over). Old/duplicate IDs are moved to their replacement.
 */
export function useSavedServices(aliases: Record<string, string>) {
  const [saved, setSaved] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    let ids: string[] = [];
    try {
      ids = JSON.parse(lsGet(SAVED_KEY) || "[]");
    } catch {
      ids = [];
    }
    let changed = false;
    const set = new Set<string>();
    ids.forEach((id) => {
      if (aliases[id]) {
        set.add(aliases[id]);
        changed = true;
      } else set.add(id);
    });
    if (changed) lsSet(SAVED_KEY, JSON.stringify(Array.from(set)));
    setSaved(set);
  }, [aliases]);

  /** Returns true when the service is now saved. */
  const toggle = useCallback(
    (id: string) => {
      const willSave = !saved.has(id);
      const next = new Set(saved);
      if (willSave) next.add(id);
      else next.delete(id);
      lsSet(SAVED_KEY, JSON.stringify(Array.from(next)));
      setSaved(next);
      return willSave;
    },
    [saved],
  );

  return { saved, toggle };
}
