import type { ReactNode } from "react";
import { cx } from "@/lib/format";

/** Coloured status pill: tone = blue | orange | yellow | green | red | purple | gray */
export function StatusPill({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className={cx("status", tone)}>{children}</span>;
}

export function ProgressBar({ value, showLabel = true }: { value: number; showLabel?: boolean }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress-wrap">
      <div className={cx("progress", v === 100 && "green")} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <i style={{ width: v + "%" }} />
      </div>
      {showLabel && v + "%"}
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty">
      <b>{title}</b>
      {children}
    </div>
  );
}
