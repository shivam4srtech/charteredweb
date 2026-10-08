"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { formatDate } from "@/lib/format";
import { sampleUser } from "@/lib/mock";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Tabs } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast";

type TabKey = "personal" | "business" | "notifications" | "security";
const TABS: { value: TabKey; label: string }[] = [
  { value: "personal", label: "Personal Details" },
  { value: "business", label: "Business Details" },
  { value: "notifications", label: "Notifications" },
  { value: "security", label: "Security" },
];

const ENTITY_TYPES = [
  "Sole Proprietorship",
  "Partnership Firm",
  "Limited Liability Partnership",
  "Private Limited Company",
  "One Person Company",
  "Public Limited Company",
  "Trust / Society / Section 8",
  "Individual",
];

function Field({ label, children, span, hint }: { label: string; children: ReactNode; span?: boolean; hint?: string }) {
  return (
    <label className={"field" + (span ? " span-2" : "")}>
      <span className="field-label">{label}</span>
      {children}
      {hint && <small className="field-hint">{hint}</small>}
    </label>
  );
}

function Toggle({ title, text, defaultOn }: { title: string; text: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="setting-row">
      <span className="row-main">
        <b>{title}</b>
        <small>{text}</small>
      </span>
      <label className="switch">
        <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} aria-label={title} />
        <span />
      </label>
    </div>
  );
}

export function ProfileView({ states }: { states: string[] }) {
  const toast = useToast();
  const [tab, setTab] = useState<TabKey>("personal");

  // Deep link: /profile?tab=business
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    if (t && TABS.some((x) => x.value === t)) setTab(t as TabKey);
  }, []);
  const u = sampleUser;

  // MVP: saving only confirms on screen. Connect to the profile API to persist.
  const save = (what: string) => (e: FormEvent) => {
    e.preventDefault();
    toast(what + " saved");
  };

  return (
    <section className="content">
      <PageHeader title="Profile" sample description="Your account, business details and how we keep in touch." />

      <div className="profile-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u.avatarUrl} alt="" />
        <div>
          <h2>{u.name}</h2>
          <div className="meta-line">
            <span>
              <Icon name="mail" size={15} /> {u.email}
            </span>
            <span>
              <Icon name="phone" size={15} /> {u.phone}
            </span>
            <span>
              <Icon name="building" size={15} /> {u.business.name}
            </span>
            <span>
              <Icon name="calendar" size={15} /> Member since {formatDate(u.memberSince, { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
        <span className="spacer" />
        <button type="button" className="btn outline" onClick={() => toast("Photo upload will work once the profile API is connected")}>
          <Icon name="upload" size={17} />
          Change Photo
        </button>
      </div>

      <Tabs items={TABS} value={tab} onChange={setTab} label="Profile sections" />

      <div className="section-gap" style={{ maxWidth: 920 }}>
        {tab === "personal" && (
          <Panel title="Personal Details" padded>
            <form onSubmit={save("Personal details")}>
              <div className="form-grid">
                <Field label="Full name">
                  <input defaultValue={u.name} autoComplete="name" />
                </Field>
                <Field label="Role">
                  <input defaultValue={u.role} disabled />
                </Field>
                <Field label="Email">
                  <input type="email" defaultValue={u.email} autoComplete="email" />
                </Field>
                <Field label="Mobile number" hint="Used for WhatsApp updates and OTPs">
                  <input type="tel" defaultValue={u.phone} autoComplete="tel" />
                </Field>
              </div>
              <div className="form-actions">
                <button type="reset" className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Save Changes
                </button>
              </div>
            </form>
          </Panel>
        )}

        {tab === "business" && (
          <Panel title="Business Details" padded>
            <form onSubmit={save("Business details")}>
              <div className="form-grid">
                <Field label="Business name" span>
                  <input defaultValue={u.business.name} autoComplete="organization" />
                </Field>
                <Field label="Entity type">
                  <select defaultValue={u.business.entityType}>
                    {ENTITY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="State">
                  <select defaultValue={u.business.state}>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="PAN">
                  <input defaultValue={u.business.pan} style={{ textTransform: "uppercase" }} />
                </Field>
                <Field label="GSTIN" hint="Leave empty if not registered for GST">
                  <input defaultValue={u.business.gstin} style={{ textTransform: "uppercase" }} />
                </Field>
                <Field label="Registered address" span>
                  <textarea defaultValue={u.business.address} rows={3} />
                </Field>
              </div>
              <div className="form-actions">
                <button type="reset" className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Save Changes
                </button>
              </div>
            </form>
          </Panel>
        )}

        {tab === "notifications" && (
          <Panel title="Notifications">
            <Toggle title="Request updates on WhatsApp" text="Status changes, document requests and delivery of certificates" defaultOn />
            <Toggle title="Email updates" text="Invoices, receipts and a copy of every certificate" defaultOn />
            <Toggle title="Compliance deadline reminders" text="Reminders before GST, TDS, ROC and income-tax due dates" defaultOn />
            <Toggle title="SMS alerts" text="Only for payments and OTPs" />
            <Toggle title="News and offers" text="Occasional updates about new services" />
          </Panel>
        )}

        {tab === "security" && (
          <div className="stack">
            <Panel title="Sign-in & Security">
              <div className="setting-row">
                <span className="dot-ico c-blue">
                  <Icon name="lock" size={16} />
                </span>
                <span className="row-main">
                  <b>Password</b>
                  <small>Change the password you use to sign in</small>
                </span>
                <button type="button" className="btn sm outline" onClick={() => toast("Password change will work once sign-in is connected")}>
                  Change
                </button>
              </div>
              <Toggle title="Two-step verification" text="Ask for an OTP on your mobile when signing in on a new device" />
            </Panel>
            <Panel title="Session">
              <div className="setting-row">
                <span className="dot-ico c-red">
                  <Icon name="logout" size={16} />
                </span>
                <span className="row-main">
                  <b>Sign out</b>
                  <small>Sign out of CharteredONE on this device</small>
                </span>
                <button type="button" className="btn sm" onClick={() => toast("Sign-out will work once sign-in is connected")}>
                  Sign Out
                </button>
              </div>
            </Panel>
          </div>
        )}
      </div>
    </section>
  );
}
