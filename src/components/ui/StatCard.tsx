import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Props = {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon: IconName;
  /** Icon colour theme: blue | green | orange | purple | red | gold | teal */
  tone?: string;
  href?: string;
};

export function StatCard({ label, value, hint, icon, tone = "blue", href }: Props) {
  const body = (
    <>
      <span className={"stat-ico c-" + tone}>
        <Icon name={icon} size={22} />
      </span>
      <span className="stat-text">
        <span className="stat-label">{label}</span>
        <b className="stat-value">{value}</b>
        {hint && <small className="stat-hint">{hint}</small>}
      </span>
    </>
  );
  return href ? (
    <Link href={href} className="stat-card">
      {body}
    </Link>
  ) : (
    <div className="stat-card">{body}</div>
  );
}
