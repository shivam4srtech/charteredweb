"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "@/lib/config";
import { NAV_ITEMS, isActive } from "@/lib/navigation";
import { unreadMessages } from "@/lib/mock";
import { Icon } from "@/components/ui/Icon";
import { ExpertCard } from "./ExpertCard";

export function Sidebar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname() || "/";
  const badges = { messages: CONFIG.showSampleData ? unreadMessages : 0 };

  return (
    <aside className="sidebar" id="sidebar" aria-label="Main menu">
      <div className="brand">
        <a className="brand-name" href={CONFIG.homeUrl}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/images/charteredone-app-logo.png" alt="CharteredONE" width={705} height={90} />
        </a>
        <button type="button" className="hamb" aria-label="Close menu" onClick={onClose}>
          <i />
        </button>
      </div>

      <nav className="nav">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const count = item.badgeKey ? badges[item.badgeKey] : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              <Icon name={item.icon} />
              {item.label}
              {count > 0 && <span className="msg-count">{count}</span>}
            </Link>
          );
        })}
      </nav>

      <ExpertCard />
    </aside>
  );
}
