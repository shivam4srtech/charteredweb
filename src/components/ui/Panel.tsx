import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type Props = {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Adds inner padding (tables usually sit flush). */
  padded?: boolean;
  id?: string;
};

/** White rounded card with an optional header row — the "My Active Requests" card style. */
export function Panel({ title, action, children, className, padded, id }: Props) {
  return (
    <section className={cx("panel", className)} id={id}>
      {(title || action) && (
        <div className="panel-head">
          {typeof title === "string" ? <h3>{title}</h3> : title}
          {action}
        </div>
      )}
      {padded ? <div className="panel-body">{children}</div> : children}
    </section>
  );
}
