"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import { sampleNotifications, sampleUser } from "@/lib/mock";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useSearch } from "./SearchContext";

const EXPLORE = "/explore-services";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [kbd, setKbd] = useState("Ctrl K");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const onExplore = pathname === EXPLORE;

  // ⌘K / Ctrl+K focuses search (topbar on desktop, page search on mobile)
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || "")) setKbd("⌘ K");
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const top = inputRef.current;
        if (top && top.offsetParent) top.focus();
        else (document.getElementById("search") as HTMLInputElement | null)?.focus();
      }
      if (e.key === "Escape") setNotifOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // close the notifications menu on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const onDown = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [notifOpen]);

  const submitSearch = () => {
    if (!onExplore) router.push(EXPLORE);
    else document.getElementById("grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const newRequest = () => {
    // Same as the original: jump to the service search so the user can pick a service.
    if (onExplore) window.dispatchEvent(new Event("charteredone:focus-search"));
    else router.push(EXPLORE + "?focus=search");
  };

  return (
    <header className="topbar">
      <button type="button" className="menu-btn" aria-label="Open menu" aria-controls="sidebar" onClick={onMenu}>
        <Icon name="menu" size={22} />
      </button>

      <div className="search">
        <Icon name="search" strokeWidth={1} />
        <input
          ref={inputRef}
          id="topSearch"
          type="search"
          placeholder="Search for services, compliance, or documents..."
          aria-label="Search services"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitSearch();
          }}
        />
        <kbd>{kbd}</kbd>
      </div>

      <div className="top-actions">
        <button type="button" className="new-btn" onClick={newRequest}>
          + New<span className="long">&nbsp;Service Request</span>
        </button>

        {CONFIG.showSampleData && (
          <>
            <div className="bell-wrap" ref={notifRef}>
              <button
                type="button"
                className="bell"
                aria-label="Notifications"
                aria-expanded={notifOpen}
                onClick={() => setNotifOpen((v) => !v)}
              >
                <Icon name="bell" size={22} />
                <span>{sampleNotifications.length}</span>
              </button>
              {notifOpen && (
                <div className="notif-menu" role="menu">
                  <header>
                    <b>Notifications</b>
                    <span className="sample-pill">Sample</span>
                  </header>
                  <ul>
                    {sampleNotifications.map((n) => (
                      <li key={n.id}>
                        <Link href={n.href} onClick={() => setNotifOpen(false)} role="menuitem">
                          <span className="notif-ico">
                            <Icon name={n.icon as IconName} size={16} />
                          </span>
                          <span>
                            <b>{n.title}</b>
                            <small>{n.text}</small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link href="/profile" className="profile" aria-label="Your profile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sampleUser.avatarUrl} alt="" />
              <div>
                <b>{sampleUser.name}</b>
                <small>{sampleUser.role}</small>
              </div>
              <Icon name="chevronDown" size={18} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
