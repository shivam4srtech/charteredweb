"use client";

import { forwardRef } from "react";
import { days } from "@/lib/format";
import { BADGE_LABEL, type Effective } from "@/lib/services/filter";
import type { Service } from "@/lib/services/types";
import { Icon } from "@/components/ui/Icon";
import { ServiceIcon } from "./ServiceIcon";

const WHO: Record<string, string> = {
  Client: "You",
  "Service Provider": "Our expert",
  CharteredONE: "CharteredONE",
  "Government Authority": "Govt. authority",
};

type Props = {
  open: boolean;
  service: Service | null;
  eff: Effective | null;
  price: string;
  region: string;
  isSaved: boolean;
  onClose: () => void;
  onSave: (id: string) => void;
  onRequest: (id: string) => void;
};

/** Slide-in "View Details" panel (right side). */
export const ServiceDetailPanel = forwardRef<HTMLButtonElement, Props>(function ServiceDetailPanel(
  { open, service: s, eff, price, region, isSaved, onClose, onSave, onRequest },
  closeRef,
) {
  const stateNote = region && eff?.overridden ? "Price for " + region : "";

  return (
    <aside
      className={"detail-panel" + (open ? " open" : "")}
      id="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="panelTitle"
      aria-hidden={!open}
    >
      <button ref={closeRef} type="button" className="detail-close" aria-label="Close details" onClick={onClose}>
        ×
      </button>
      {s && eff && (
        <div className="detail-inner">
          <div className="detail-top">
            <ServiceIcon service={s} big />
            <div className="detail-title">
              <h2 id="panelTitle">{s.name}</h2>
              <div className="detail-badges">
                <span className="badge cat">{s.category}</span>
                {(s.badges || []).map((b) => (
                  <span key={b} className={"badge " + b}>
                    {BADGE_LABEL[b]}
                  </span>
                ))}
              </div>
              <p>{s.intro}</p>
            </div>
          </div>

          <div className="detail-section overview">
            <h3>
              <Icon name="file" size={17} style={{ color: "var(--blue)" }} />
              Overview
            </h3>
            <p>{s.overview}</p>
          </div>

          <div className="split-lists">
            <div className="list-block">
              <h4>Documents Required</h4>
              <ul className="clean-list">
                {(s.documents || []).map((d, i) => (
                  <li key={i}>
                    <span className="bullet-dot" />
                    <div>
                      {d.name}
                      {!d.mandatory && <span className="opt">(if applicable)</span>}
                      {d.note && <small>{d.note}</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="list-block">
              <h4>What We Will Do</h4>
              <ul className="clean-list">
                {(s.deliverables || []).map((t, i) => (
                  <li key={i}>
                    <span className="check-dot">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="process-area">
            <div>
              <h4>Process Flow</h4>
              <div className="process-list">
                {(s.steps || []).map((st, i) => {
                  const client = st.responsible === "Client";
                  const who = WHO[st.responsible] || st.responsible;
                  const when = client ? "" : " · " + (st.expected_days ? days(st.expected_days, st.expected_days, "days") : "Same day");
                  return (
                    <div className="process-step" key={i}>
                      <div className={"step-num" + (client ? " client" : "")}>{i + 1}</div>
                      <div>
                        <b>{st.name}</b>
                        <span>{st.description}</span>
                        <em className={client ? "you" : undefined}>
                          {who}
                          {when}
                        </em>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-ico">
                  <Icon name="clock" size={23} />
                </div>
                <div>
                  <span>Estimated Time</span>
                  <b>{days(eff.tmin, eff.tmax, "Working Days")}</b>
                  {eff.note && <small>{eff.note}</small>}
                </div>
              </div>
              <div className="info-card">
                <div className="info-ico" style={{ fontSize: 22, fontWeight: 800 }}>
                  ₹
                </div>
                <div>
                  <span>Starting From</span>
                  <b>{price}</b>
                  {s.price_note && <small>({s.price_note})</small>}
                  {stateNote && <small>{stateNote}</small>}
                </div>
              </div>
              <div className="info-card" style={{ background: "#f5fff8" }}>
                <div className="info-ico" style={{ color: "var(--green)" }}>
                  <svg width="23" height="23" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-9 9a9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <span>Expert Support</span>
                  <b>Dedicated compliance specialists</b>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button type="button" className="detail-btn" aria-pressed={isSaved} onClick={() => onSave(s.id)}>
              <Icon name="heart" size={18} />
              {isSaved ? "Saved" : "Save for Later"}
            </button>
            <button type="button" className="detail-btn primary" onClick={() => onRequest(s.id)}>
              Start Request <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
});
