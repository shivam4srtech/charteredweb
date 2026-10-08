import type { ReactNode } from "react";
import { CONFIG } from "@/lib/config";

type Props = {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  /** Shows a small "Sample data" pill while the page runs on placeholder data. */
  sample?: boolean;
};

export function PageHeader({ title, description, actions, sample }: Props) {
  return (
    <div className="page-head">
      <div>
        <h1>
          {title}
          {sample && CONFIG.showSampleData && <span className="sample-pill">Sample data</span>}
        </h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-head-actions">{actions}</div>}
    </div>
  );
}
