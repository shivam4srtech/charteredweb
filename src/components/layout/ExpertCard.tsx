"use client";

import { CONFIG } from "@/lib/config";
import { Icon } from "@/components/ui/Icon";

/** "Need expert guidance?" card at the bottom of the sidebar. */
export function ExpertCard() {
  return (
    <div className="expert-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=220&h=260&fit=crop&crop=face" alt="" />
      <div className="expert-text">
        <b>Need expert guidance?</b>
        <p>Talk to our compliance specialist.</p>
        <button
          type="button"
          className="talk-btn"
          onClick={() => window.open(CONFIG.talkToExpertUrl, "_blank", "noopener")}
        >
          <Icon name="phone" size={16} />
          Talk to Expert
        </button>
      </div>
    </div>
  );
}
