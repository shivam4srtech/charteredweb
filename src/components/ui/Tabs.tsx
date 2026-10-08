"use client";

import { cx } from "@/lib/format";

export type TabItem<T extends string> = { value: T; label: string; count?: number };

type Props<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
};

/** Underlined tab row — same look as the Explore Services category tabs. */
export function Tabs<T extends string>({ items, value, onChange, label, className }: Props<T>) {
  return (
    <div className={cx("tabs", className)} role="tablist" aria-label={label}>
      {items.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            className={cx("tab", on && "active")}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.value)}
          >
            {t.label}
            {t.count != null && <span className="tab-count">{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
