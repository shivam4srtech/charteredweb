"use client";

import { memo } from "react";
import { days } from "@/lib/format";
import { BADGE_LABEL, type Effective } from "@/lib/services/filter";
import type { Service } from "@/lib/services/types";
import { Icon } from "@/components/ui/Icon";
import { ServiceIcon } from "./ServiceIcon";

type Props = {
  service: Service;
  eff: Effective;
  price: string;
  isSaved: boolean;
  selected: boolean;
  onView: (id: string, el: HTMLElement) => void;
  onSave: (id: string) => void;
  onRequest: (id: string) => void;
};

export const ServiceCard = memo(function ServiceCard({ service: s, eff, price, isSaved, selected, onView, onSave, onRequest }: Props) {
  return (
    <article
      className={"service-card" + (selected ? " selected" : "")}
      tabIndex={0}
      data-id={s.id}
      aria-label={s.name}
      onClick={(e) => onView(s.id, e.currentTarget)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
          e.preventDefault();
          onView(s.id, e.currentTarget);
        }
      }}
    >
      <button
        type="button"
        className="heart"
        aria-pressed={isSaved}
        aria-label={isSaved ? "Remove from saved" : "Save for later"}
        onClick={(e) => {
          e.stopPropagation();
          onSave(s.id);
        }}
      >
        <Icon name="heart" />
      </button>
      <div className="service-main">
        <ServiceIcon service={s} />
        <div>
          <h3>{s.name}</h3>
          <p>{s.card_description}</p>
        </div>
      </div>
      <div className="service-meta">
        <span>{days(eff.tmin, eff.tmax)}</span>
        <i />
        <span>From {price}</span>
      </div>
      <div className="badges">
        {(s.badges || []).map((b) => (
          <span key={b} className={"badge " + b}>
            {BADGE_LABEL[b]}
          </span>
        ))}
      </div>
      <div className="card-actions">
        <button type="button" className="small-btn view">
          View Details
        </button>
        <button
          type="button"
          className="small-btn request"
          onClick={(e) => {
            e.stopPropagation();
            onRequest(s.id);
          }}
        >
          Request Service
        </button>
      </div>
    </article>
  );
});
