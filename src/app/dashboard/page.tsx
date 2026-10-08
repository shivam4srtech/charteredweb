import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { days, formatDate, parseDate } from "@/lib/format";
import {
  sampleActivity,
  sampleDeadlines,
  sampleDocumentRequests,
  sampleInvoices,
  sampleRequests,
  sampleUser,
} from "@/lib/mock";
import { POPULAR_IDS } from "@/lib/services/catalog";
import { getServices } from "@/lib/services/get-services";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Price } from "@/components/ui/Price";
import { StatCard } from "@/components/ui/StatCard";
import { RequestsTable } from "@/components/requests/RequestsTable";
import { ServiceIcon } from "@/components/services/ServiceIcon";

export const metadata: Metadata = { title: "Dashboard" };

const TODAY = parseDate("2026-10-08"); // sample data is pinned to this date

function daysUntil(iso: string) {
  return Math.round((parseDate(iso).getTime() - TODAY.getTime()) / 864e5);
}

export default async function DashboardPage() {
  const data = await getServices();
  const byId = new Map(data.services.map((s) => [s.id, s]));
  const popular = POPULAR_IDS.map((id) => byId.get(id))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .slice(0, 6);

  const active = sampleRequests.filter((r) => r.status !== "completed");
  const actionNeeded = sampleRequests.filter((r) => r.status === "action_needed" || r.status === "payment_pending");
  const due = sampleInvoices.filter((i) => i.status !== "paid");
  const dueTotal = due.reduce((n, i) => n + i.amount, 0);

  return (
    <section className="content">
      <PageHeader
        title="Dashboard"
        sample
        description={
          <>
            Welcome back, {sampleUser.firstName} — here&apos;s where your compliance work stands today.
          </>
        }
        actions={
          <Link href="/explore-services" className="btn outline">
            <Icon name="compass" size={18} />
            Explore Services
          </Link>
        }
      />

      <div className="stat-grid">
        <StatCard icon="clipboard" tone="blue" label="Active Requests" value={active.length} hint="In progress with our experts" href="/my-services" />
        <StatCard icon="alert" tone="red" label="Needs Your Action" value={actionNeeded.length} hint="Payments or documents pending" href="/my-services?tab=action" />
        <StatCard icon="folder" tone="orange" label="Documents Requested" value={sampleDocumentRequests.length} hint="Upload to keep things moving" href="/documents" />
        <StatCard
          icon="card"
          tone="green"
          label="Amount Due"
          value={<Price amount={dueTotal} />}
          hint={due.length + " invoice" + (due.length === 1 ? "" : "s") + " pending"}
          href="/payments"
        />
      </div>

      <div className="page-grid">
        <div className="stack">
          <Panel title="My Active Requests" action={<Link href="/my-services">View All</Link>}>
            <RequestsTable requests={active} />
          </Panel>

          <Panel title="Popular Services" action={<Link href="/explore-services">Browse all</Link>}>
            <div className="quick-grid">
              {popular.map((s) => (
                <Link key={s.id} href={"/explore-services#service=" + encodeURIComponent(s.id)} className="quick-tile">
                  <ServiceIcon service={s} />
                  <span>
                    <b>{s.name}</b>
                    <small>
                      {days(s.tat_min, s.tat_max)} · From <Price amount={s.price_from} />
                    </small>
                  </span>
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <div className="stack">
          <Panel title="Upcoming Deadlines">
            <ul className="rows">
              {sampleDeadlines.map((d) => {
                const dt = parseDate(d.date);
                const left = daysUntil(d.date);
                return (
                  <li key={d.id}>
                    <span className={"date-chip" + (left <= 5 ? " soon" : "")}>
                      <b>{dt.getDate()}</b>
                      <small>{dt.toLocaleDateString("en-IN", { month: "short" })}</small>
                    </span>
                    <span className="row-main">
                      <b>{d.title}</b>
                      <small>
                        {d.tag} · {left === 0 ? "Due today" : left === 1 ? "Due tomorrow" : "In " + left + " days"}
                      </small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Recent Activity">
            <ul className="rows">
              {sampleActivity.map((a) => (
                <li key={a.id}>
                  <span className={"dot-ico c-" + a.tone}>
                    <Icon name={a.icon as IconName} size={16} />
                  </span>
                  <span className="row-main">
                    <b>{a.text}</b>
                    <small>{formatDate(a.at)}</small>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="help-card">
            <b>Not sure which service you need?</b>
            <p>Tell our compliance specialist about your business and we&apos;ll point you to the right registrations.</p>
            <a className="btn" href={CONFIG.talkToExpertUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              Talk to Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
