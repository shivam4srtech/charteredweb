"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cx, formatDate } from "@/lib/format";
import { REQUEST_STATUS, sampleRequests, type ServiceRequest } from "@/lib/mock";
import { whatsappLink } from "@/lib/config";
import { RequestsTable } from "@/components/requests/RequestsTable";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Price } from "@/components/ui/Price";
import { EmptyState, ProgressBar, StatusPill } from "@/components/ui/Status";
import { Tabs } from "@/components/ui/Tabs";

export type StepsByService = Record<string, { name: string; description: string }[]>;

type TabKey = "all" | "active" | "action" | "completed";

const FILTERS: Record<TabKey, (r: ServiceRequest) => boolean> = {
  all: () => true,
  active: (r) => r.status !== "completed",
  action: (r) => r.status === "action_needed" || r.status === "payment_pending",
  completed: (r) => r.status === "completed",
};

type Props = { steps: StepsByService };

export function MyServicesView({ steps }: Props) {
  const [tab, setTab] = useState<TabKey>("all");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(sampleRequests[0]?.id ?? null);

  // Deep links: /my-services?tab=action and /my-services?request=REQ-…
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab");
    if (t && t in FILTERS) setTab(t as TabKey);
    const r = params.get("request");
    if (r && sampleRequests.some((x) => x.id === r)) setSelectedId(r);
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return sampleRequests.filter(
      (r) => FILTERS[tab](r) && (!term || (r.serviceName + " " + r.id).toLowerCase().includes(term)),
    );
  }, [tab, q]);

  const selected = sampleRequests.find((r) => r.id === selectedId) ?? null;

  // On narrow screens the detail sits below the table, so bring it into view.
  const select = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width:1100px)").matches) {
      setTimeout(() => document.getElementById("request-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
    }
  };

  const tabs = (Object.keys(FILTERS) as TabKey[]).map((k) => ({
    value: k,
    label: { all: "All Requests", active: "In Progress", action: "Needs Action", completed: "Completed" }[k],
    count: sampleRequests.filter(FILTERS[k]).length,
  }));

  return (
    <section className="content">
      <PageHeader
        title="My Services"
        sample
        description="Track every service you've requested — current step, progress and what's needed from you."
        actions={
          <Link href="/explore-services?focus=search" className="btn primary">
            <Icon name="plus" size={18} />
            New Request
          </Link>
        }
      />

      <Tabs items={tabs} value={tab} onChange={setTab} label="Request status" />

      <div className="page-grid">
        <div className="stack">
          <div className="toolbar" style={{ margin: 0 }}>
            <div className="field search-service">
              <input
                type="search"
                placeholder="Search by service or request ID..."
                aria-label="Search requests"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <Icon name="search" strokeWidth={1} />
            </div>
          </div>

          {list.length ? (
            <Panel>
              <RequestsTable
                requests={list}
                columns={["service", "id", "status", "progress", "step", "updated", "actions"]}
                onSelect={select}
                selectedId={selectedId}
              />
            </Panel>
          ) : (
            <EmptyState title="No requests here">Try another tab or clear the search.</EmptyState>
          )}
        </div>

        <div className="stack">
          {selected ? <RequestDetail request={selected} steps={steps[selected.serviceId] || []} /> : null}
        </div>
      </div>
    </section>
  );
}

function RequestDetail({ request: r, steps }: { request: ServiceRequest; steps: { name: string; description: string }[] }) {
  const st = REQUEST_STATUS[r.status];
  const total = steps.length;
  const current = r.status === "completed" ? total : Math.min(total - 1, Math.floor((r.progress / 100) * total));

  return (
    <Panel title="Request Details" padded id="request-detail">
      <div className="req-detail-head">
        <span className={"mini-icon " + r.mini.color}>{r.mini.text}</span>
        <span>
          <b>{r.serviceName}</b>
          <small>{r.id}</small>
        </span>
      </div>
      <StatusPill tone={st.tone}>{st.label}</StatusPill>
      <div style={{ marginTop: 14 }}>
        <ProgressBar value={r.progress} />
      </div>

      <dl className="kv">
        <dt>Current step</dt>
        <dd>{r.currentStep}</dd>
        <dt>ETA</dt>
        <dd>{r.eta}</dd>
        <dt>Started</dt>
        <dd>{formatDate(r.startedOn)}</dd>
        <dt>Specialist</dt>
        <dd>{r.specialist}</dd>
        <dt>Fee</dt>
        <dd>
          <Price amount={r.amount} />
        </dd>
      </dl>

      {total > 0 && (
        <ol className="timeline" aria-label="Progress">
          {steps.map((s, i) => {
            const state = i < current ? "done" : i === current ? "current" : "pending";
            return (
              <li key={i} className={state}>
                <span className="tl-dot">{state === "done" ? <Icon name="check" size={13} strokeWidth={3} /> : i + 1}</span>
                <span>
                  <b>{s.name.charAt(0).toUpperCase() + s.name.slice(1)}</b>
                  {s.description && <small>{s.description}</small>}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      <div className={cx("form-actions")} style={{ justifyContent: "stretch", flexWrap: "wrap" }}>
        {r.status === "payment_pending" && (
          <Link href="/payments" className="btn primary block">
            <Icon name="card" size={18} /> Pay Now
          </Link>
        )}
        {r.status === "action_needed" && (
          <Link href="/documents" className="btn primary block">
            <Icon name="upload" size={18} /> Upload Documents
          </Link>
        )}
        <Link href="/messages" className="btn block">
          <Icon name="chat" size={18} /> Message Specialist
        </Link>
        <a
          className="btn outline block"
          href={whatsappLink("Hi CharteredONE, I have a question about my request " + r.id + " (" + r.serviceName + ").")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" size={18} /> Ask on WhatsApp
        </a>
      </div>
    </Panel>
  );
}
