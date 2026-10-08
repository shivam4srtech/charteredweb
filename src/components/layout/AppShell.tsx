"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { cx } from "@/lib/format";
import { SearchProvider } from "./SearchContext";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Persistent app frame: sidebar + topbar around every page.
 * Handles the mobile slide-in menu (closes on navigation and Escape).
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setNavOpen(false), [pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  return (
    <SearchProvider>
      <div className={cx("app", navOpen && "nav-open")}>
        <Sidebar onClose={() => setNavOpen(false)} />
        <div className="nav-backdrop" onClick={() => setNavOpen(false)} />
        <main className="main">
          <Topbar onMenu={() => setNavOpen(true)} />
          {children}
        </main>
      </div>
    </SearchProvider>
  );
}
