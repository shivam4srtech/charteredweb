"use client";

import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/format";
import { REQUEST_STATUS, type ServiceRequest } from "@/lib/mock";
import { ProgressBar, StatusPill } from "@/components/ui/Status";
import { Icon } from "@/components/ui/Icon";

type Column = "service" | "id" | "status" | "progress" | "eta" | "step" | "updated" | "actions";

const HEAD: Record<Column, string> = {
  service: "Service",
  id: "Request ID",
  status: "Status",
  progress: "Progress",
  eta: "ETA",
  step: "Current Step",
  updated: "Last Update",
  actions: "",
};

type Props = {
  requests: ServiceRequest[];
  columns?: Column[];
  /** Row click → My Services detail (when provided). */
  onSelect?: (id: string) => void;
  selectedId?: string | null;
};

/** The "My Active Requests" table from the original page, reusable with extra columns. */
export function RequestsTable({
  requests,
  columns = ["service", "id", "status", "progress", "eta", "actions"],
  onSelect,
  selectedId,
}: Props) {
  const router = useRouter();
  const open = (id: string) => (onSelect ? onSelect(id) : router.push("/my-services?request=" + encodeURIComponent(id)));

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{HEAD[c]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => {
            const st = REQUEST_STATUS[r.status];
            return (
              <tr
                key={r.id}
                className={"clickable" + (selectedId === r.id ? " selected-row" : "")}
                onClick={() => open(r.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") open(r.id);
                }}
              >
                {columns.map((c) => {
                  switch (c) {
                    case "service":
                      return (
                        <td key={c}>
                          <div className="req-service">
                            <span className={"mini-icon " + r.mini.color}>{r.mini.text}</span>
                            {r.serviceName}
                          </div>
                        </td>
                      );
                    case "id":
                      return <td key={c}>{r.id}</td>;
                    case "status":
                      return (
                        <td key={c}>
                          <StatusPill tone={st.tone}>{st.label}</StatusPill>
                        </td>
                      );
                    case "progress":
                      return (
                        <td key={c}>
                          <ProgressBar value={r.progress} />
                        </td>
                      );
                    case "eta":
                      return <td key={c}>{r.eta}</td>;
                    case "step":
                      return <td key={c}>{r.currentStep}</td>;
                    case "updated":
                      return <td key={c}>{formatDate(r.updatedOn)}</td>;
                    case "actions":
                      return (
                        <td key={c} className="num">
                          <span className="icon-btn" aria-hidden="true">
                            <Icon name="chevronRight" size={18} />
                          </span>
                        </td>
                      );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
