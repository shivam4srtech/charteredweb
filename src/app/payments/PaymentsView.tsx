"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/format";
import { INVOICE_STATUS, sampleInvoices, sampleUser, type InvoiceStatus } from "@/lib/mock";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Price } from "@/components/ui/Price";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState, StatusPill } from "@/components/ui/Status";
import { Tabs } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast";

type TabKey = "all" | InvoiceStatus | "open";

export function PaymentsView() {
  const toast = useToast();
  const [tab, setTab] = useState<TabKey>("all");

  const paid = sampleInvoices.filter((i) => i.status === "paid");
  const open = sampleInvoices.filter((i) => i.status !== "paid");
  const paidTotal = paid.reduce((n, i) => n + i.amount, 0);
  const openTotal = open.reduce((n, i) => n + i.amount, 0);
  const last = paid.slice().sort((a, b) => (b.paidOn || "").localeCompare(a.paidOn || ""))[0];

  const list = useMemo(
    () => sampleInvoices.filter((i) => tab === "all" || (tab === "open" ? i.status !== "paid" : i.status === tab)),
    [tab],
  );

  const pay = (id: string) =>
    toast("Online payment for " + id + " opens soon. Please use Talk to Expert to pay for now.");

  return (
    <section className="content">
      <PageHeader title="Payments" sample description="Invoices, payment history and anything that's due." />

      <div className="stat-grid">
        <StatCard icon="checkCircle" tone="green" label="Total Paid" value={<Price amount={paidTotal} />} hint={paid.length + " invoices"} />
        <StatCard icon="alert" tone="orange" label="Outstanding" value={<Price amount={openTotal} />} hint={open.length + " invoice" + (open.length === 1 ? "" : "s") + " due"} />
        <StatCard icon="card" tone="blue" label="Last Payment" value={last ? <Price amount={last.amount} /> : "—"} hint={last ? formatDate(last.paidOn!) + " · " + last.serviceName : undefined} />
        <StatCard icon="fileText" tone="purple" label="Invoices" value={sampleInvoices.length} hint="Since you joined" />
      </div>

      {open.map((i) => (
        <div className="due-banner" key={i.id}>
          <span className="dot-ico">
            <Icon name="card" size={20} />
          </span>
          <span className="row-main">
            <b>
              <Price amount={i.amount} /> due for {i.serviceName}
            </b>
            <small>
              {i.id} · due by {formatDate(i.dueOn)} · work starts once payment is received
            </small>
          </span>
          <button type="button" className="btn primary" onClick={() => pay(i.id)}>
            Pay Now
          </button>
        </div>
      ))}

      <Tabs
        items={[
          { value: "all", label: "All Invoices", count: sampleInvoices.length },
          { value: "open", label: "Outstanding", count: open.length },
          { value: "paid", label: "Paid", count: paid.length },
        ]}
        value={tab}
        onChange={setTab}
        label="Invoice status"
      />

      <div className="page-grid">
        <div className="stack">
          {list.length ? (
            <Panel>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th className="num">Amount</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((i) => {
                      const st = INVOICE_STATUS[i.status];
                      return (
                        <tr key={i.id}>
                          <td>
                            <b>{i.id}</b>
                          </td>
                          <td>
                            <div className="req-service">
                              {i.serviceName}
                            </div>
                            <small className="muted">{i.requestId}</small>
                          </td>
                          <td>{formatDate(i.paidOn || i.issuedOn)}</td>
                          <td>{i.method || <span className="muted">—</span>}</td>
                          <td>
                            <StatusPill tone={st.tone}>{st.label}</StatusPill>
                          </td>
                          <td className="num amount">
                            <Price amount={i.amount} />
                          </td>
                          <td className="num">
                            {i.status === "paid" ? (
                              <button
                                type="button"
                                className="icon-btn"
                                aria-label={"Download invoice " + i.id}
                                onClick={() => toast("Invoice downloads will work once billing is connected")}
                              >
                                <Icon name="download" size={18} />
                              </button>
                            ) : (
                              <button type="button" className="btn sm primary" onClick={() => pay(i.id)}>
                                Pay
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          ) : (
            <EmptyState title="No invoices here" />
          )}
        </div>

        <div className="stack">
          <Panel title="Billing Details" action={<Link href="/profile?tab=business">Edit</Link>} padded>
            <dl className="kv" style={{ marginTop: 0 }}>
              <dt>Billed to</dt>
              <dd>{sampleUser.business.name}</dd>
              <dt>GSTIN</dt>
              <dd>{sampleUser.business.gstin}</dd>
              <dt>State</dt>
              <dd>{sampleUser.business.state}</dd>
              <dt>Email</dt>
              <dd>{sampleUser.email}</dd>
            </dl>
          </Panel>
          <Panel title="Need help with a payment?" padded>
            <p className="muted" style={{ margin: "0 0 14px", lineHeight: 1.5, fontSize: 13 }}>
              Questions about an invoice, a refund or a failed payment? Our team will sort it out.
            </p>
            <Link href="/support" className="btn outline block">
              <Icon name="phone" size={18} />
              Contact Support
            </Link>
          </Panel>
        </div>
      </div>
    </section>
  );
}
