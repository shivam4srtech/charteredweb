"use client";

import { useState } from "react";
import { CONFIG } from "@/lib/config";
import { formatDate } from "@/lib/format";
import { faqs, sampleRequests, sampleTickets } from "@/lib/mock";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { StatusPill } from "@/components/ui/Status";
import { useToast } from "@/components/ui/Toast";

export function SupportView() {
  const toast = useToast();
  const [tickets, setTickets] = useState(sampleTickets.slice());
  const [subject, setSubject] = useState("");
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("");

  // MVP: tickets are kept in the page. Connect to the support API to create them for real.
  const submit = () => {
    if (!subject.trim() || !message.trim()) {
      toast("Please add a subject and a short description");
      return;
    }
    const id = "TCK-" + (1043 + tickets.length - sampleTickets.length);
    setTickets((t) => [{ id, subject: subject.trim(), status: "Open", tone: "blue", updatedOn: new Date().toISOString().slice(0, 10) }, ...t]);
    setSubject("");
    setRequestId("");
    setMessage("");
    toast("Ticket " + id + " created — we'll reply in Messages");
  };

  return (
    <section className="content">
      <PageHeader title="Support" description="Get help from the CharteredONE team — chat, call, or raise a ticket." />

      <div className="contact-grid">
        <div className="contact-card">
          <span className="stat-ico c-green">
            <Icon name="whatsapp" size={22} />
          </span>
          <b>Chat on WhatsApp</b>
          <p>The quickest way to reach a compliance specialist for guidance on any service.</p>
          <a className="btn primary" href={CONFIG.talkToExpertUrl} target="_blank" rel="noopener noreferrer">
            Talk to Expert
          </a>
        </div>
        <div className="contact-card">
          <span className="stat-ico c-blue">
            <Icon name="phone" size={22} />
          </span>
          <b>Call us</b>
          <p>Speak to our team directly at {CONFIG.phoneDisplay}.</p>
          <a className="btn outline" href={"tel:+" + CONFIG.whatsappNumber}>
            Call {CONFIG.phoneDisplay}
          </a>
        </div>
        <div className="contact-card">
          <span className="stat-ico c-purple">
            <Icon name="ticket" size={22} />
          </span>
          <b>Raise a ticket</b>
          <p>For anything about a request, document or invoice — we&apos;ll reply in your Messages.</p>
          <a className="btn outline" href="#new-ticket">
            New Ticket
          </a>
        </div>
      </div>

      <div className="page-grid">
        <div className="stack">
          <Panel title="Frequently Asked Questions">
            {faqs.map((f, i) => (
              <details className="faq" key={i} open={i === 0}>
                <summary>
                  {f.q}
                  <Icon name="chevronDown" size={18} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Panel>

          <Panel title="Your Tickets" action={CONFIG.showSampleData ? <span className="sample-pill">Sample data</span> : undefined}>
            <ul className="rows">
              {tickets.map((t) => (
                <li key={t.id}>
                  <span className="dot-ico c-blue">
                    <Icon name="ticket" size={16} />
                  </span>
                  <span className="row-main">
                    <b>{t.subject}</b>
                    <small>
                      {t.id} · updated {formatDate(t.updatedOn)}
                    </small>
                  </span>
                  <StatusPill tone={t.tone}>{t.status}</StatusPill>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="stack">
          <Panel title="New Ticket" padded id="new-ticket">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div className="field" style={{ marginBottom: 14 }}>
                <label className="field-label" htmlFor="t-subject">
                  Subject
                </label>
                <input id="t-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What do you need help with?" />
              </div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label className="field-label" htmlFor="t-request">
                  Related request <span className="muted">(optional)</span>
                </label>
                <select id="t-request" value={requestId} onChange={(e) => setRequestId(e.target.value)}>
                  <option value="">Not about a specific request</option>
                  {sampleRequests.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.serviceName} · {r.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="t-message">
                  Message
                </label>
                <textarea id="t-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe the issue in a few lines..." />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn primary block">
                  <Icon name="send" size={17} />
                  Submit Ticket
                </button>
              </div>
            </form>
          </Panel>
        </div>
      </div>
    </section>
  );
}
