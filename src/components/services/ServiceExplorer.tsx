"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CONFIG } from "@/lib/config";
import { cx } from "@/lib/format";
import { DEFAULT_COUNTRY, buildCountries, svcCountry } from "@/lib/intl/currency";
import { useIntl } from "@/lib/intl/IntlProvider";
import { sampleRequests } from "@/lib/mock";
import { POPULAR_IDS, POPULAR_LABEL, POPULAR_TAB } from "@/lib/services/catalog";
import { CHIPS, SORT_OPTIONS, effective, visibleServices, type ChipKey, type SortKey } from "@/lib/services/filter";
import type { CleanServices, Service } from "@/lib/services/types";
import { useSavedServices } from "@/lib/services/useSavedServices";
import { useSearch } from "@/components/layout/SearchContext";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { RequestsTable } from "@/components/requests/RequestsTable";
import { IntlBar } from "./IntlBar";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailPanel } from "./ServiceDetailPanel";

const PUSH_MODE_QUERY = "(min-width:1760px)";

/**
 * Explore Services — the original app page:
 * category tabs, quick-filter chips, search, sort, state filter, saved services,
 * detail panel (deep-linkable with #service=ID), country & currency bar.
 */
export function ServiceExplorer({ data }: { data: CleanServices }) {
  const toast = useToast();
  const { query, setQuery } = useSearch();
  const intl = useIntl();

  /* ---------- country ---------- */
  const countries = useMemo(() => buildCountries(data.services, data.countries, data.states), [data]);
  const country =
    countries.find((c) => c.code === intl.countryCode) ||
    countries.find((c) => c.code === DEFAULT_COUNTRY) ||
    countries[0];
  const services = useMemo(() => data.services.filter((s) => svcCountry(s) === country.code), [data, country.code]);
  const byId = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);
  const allById = useMemo(() => new Map(data.services.map((s) => [s.id, s])), [data]);

  /* ---------- filters ---------- */
  const [tab, setTab] = useState<string | null>(null);
  const [chip, setChip] = useState<ChipKey>("all");
  const [sort, setSort] = useState<SortKey>("popularity");
  const [region, setRegion] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const { saved, toggle } = useSavedServices(data.aliases);

  useEffect(() => setRegion(""), [country.code]);

  const tabs = useMemo(() => {
    const used = data.categories.filter((c) => services.some((s) => s.category === c));
    const hasPopular = POPULAR_IDS.some((id) => byId.has(id));
    return (hasPopular ? [POPULAR_TAB] : []).concat(used);
  }, [data.categories, services, byId]);
  const activeTab = tab && tabs.includes(tab) ? tab : tabs[0] ?? null;

  const q = query.trim();
  const searching = !!q || savedOnly;

  const list = useMemo(
    () => visibleServices(services, { tab: activeTab, chip, query, sort, region, savedOnly, saved }),
    [services, activeTab, chip, query, sort, region, savedOnly, saved],
  );
  const savedCount = useMemo(() => services.filter((s) => saved.has(s.id)).length, [services, saved]);

  const priceOf = useCallback(
    (amount: number) => intl.formatAmount(amount, country.currency),
    [intl, country.currency],
  );

  /* ---------- detail panel ---------- */
  const [openId, setOpenId] = useState<string | null>(null);
  const [shownId, setShownId] = useState<string | null>(null); // keeps content during the close animation
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openIdRef = useRef<string | null>(null);
  openIdRef.current = openId;

  const openPanel = useCallback((id: string, fromEl?: HTMLElement | null) => {
    if (!openIdRef.current) lastFocus.current = fromEl || (document.activeElement as HTMLElement | null);
    setOpenId(id);
    setShownId(id);
    const panel = document.getElementById("panel");
    if (panel) panel.scrollTop = 0;
    document.documentElement.classList.toggle("lock", !window.matchMedia(PUSH_MODE_QUERY).matches);
    try {
      history.replaceState(history.state, "", "#service=" + encodeURIComponent(id));
    } catch {
      /* ignore */
    }
    setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 30);
  }, []);

  const closePanel = useCallback(() => {
    if (!openIdRef.current) return;
    setOpenId(null);
    document.documentElement.classList.remove("lock");
    try {
      history.replaceState(history.state, "", location.pathname + location.search);
    } catch {
      /* ignore */
    }
    const el = lastFocus.current;
    if (el && document.contains(el)) el.focus({ preventScroll: true });
  }, []);

  // Escape closes the panel (the mobile menu takes priority), push-mode changes, cleanup
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.querySelector(".app.nav-open")) return;
      closePanel();
    };
    const mq = window.matchMedia(PUSH_MODE_QUERY);
    const onMq = () => document.documentElement.classList.toggle("lock", !!openIdRef.current && !mq.matches);
    document.addEventListener("keydown", onKey);
    mq.addEventListener?.("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener?.("change", onMq);
      document.documentElement.classList.remove("lock");
    };
  }, [closePanel]);

  // Deep links: #service=ID (old/duplicate IDs are redirected to their replacement)
  useEffect(() => {
    if (!intl.ready) return;
    const fromHash = () => {
      const m = /^#service=(.+)$/.exec(location.hash);
      if (!m) return;
      let id = decodeURIComponent(m[1]);
      if (data.aliases[id]) id = data.aliases[id];
      const s = allById.get(id);
      if (!s) return;
      if (svcCountry(s) !== intl.countryCode) intl.setCountryCode(svcCountry(s));
      setTab(s.category);
      openPanel(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl.ready]);

  // "+ New Service Request": focus the service search
  useEffect(() => {
    const focusSearch = () => {
      closePanel();
      const el = document.getElementById("search") as HTMLInputElement | null;
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    try {
      const u = new URL(location.href);
      if (u.searchParams.get("focus") === "search") {
        u.searchParams.delete("focus");
        history.replaceState(history.state, "", u.pathname + u.search + u.hash);
        setTimeout(focusSearch, 50);
      }
    } catch {
      /* ignore */
    }
    window.addEventListener("charteredone:focus-search", focusSearch);
    return () => window.removeEventListener("charteredone:focus-search", focusSearch);
  }, [closePanel]);

  /* ---------- actions ---------- */
  const onSave = useCallback(
    (id: string) => {
      const nowSaved = toggle(id);
      toast(nowSaved ? "Saved for later" : "Removed from saved");
    },
    [toggle, toast],
  );

  const startRequest = useCallback(
    (id: string) => {
      const s = allById.get(id);
      if (!s) return;
      if (CONFIG.startRequestUrl) {
        const msg =
          "Hi CharteredONE, I would like to start a request for " +
          s.name +
          (region ? " in " + region : "") +
          " (Service ID: " +
          s.id +
          ").";
        const url = CONFIG.startRequestUrl
          .replace("{id}", encodeURIComponent(id))
          .replace("{name}", encodeURIComponent(s.name))
          .replace("{state}", encodeURIComponent(region || ""))
          .replace("{message}", encodeURIComponent(msg));
        if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(url)) window.open(url, "_blank", "noopener");
        else location.href = url;
        return;
      }
      const ev = new CustomEvent("charteredone:start-request", {
        detail: { serviceId: id, state: region || null },
        cancelable: true,
      });
      if (!document.dispatchEvent(ev)) return; // handled elsewhere
      if (openIdRef.current !== id) openPanel(id);
      toast("Online requests are opening soon. Please use Talk to Expert for now.");
    },
    [allById, region, openPanel, toast],
  );

  // Small API for future integrations (same as window.CharteredONEExplore in the original)
  useEffect(() => {
    const w = window as unknown as { CharteredONEExplore?: unknown };
    w.CharteredONEExplore = { open: (id: string) => openPanel(id), close: closePanel };
    return () => {
      delete w.CharteredONEExplore;
    };
  }, [openPanel, closePanel]);

  /* ---------- render ---------- */
  const shown: Service | null = shownId ? allById.get(shownId) ?? null : null;
  const shownEff = shown ? effective(shown, region) : null;

  let resultLine: ReactNode = null;
  if (q)
    resultLine = (
      <>
        <b>{list.length}</b> result{list.length === 1 ? "" : "s"} for “{q}” across all categories{" "}
        <button type="button" className="link-btn" onClick={() => setQuery("")}>
          Clear search
        </button>
      </>
    );
  else if (savedOnly)
    resultLine = (
      <>
        <b>{list.length}</b> saved service{list.length === 1 ? "" : "s"}{" "}
        <button type="button" className="link-btn" onClick={() => setSavedOnly(false)}>
          Show all
        </button>
      </>
    );
  else if (region)
    resultLine = (
      <>
        Showing prices and timelines for <b>{region}</b>
      </>
    );

  const emptyMsg =
    savedOnly && !saved.size
      ? ["No saved services yet", "Tap the heart on any service to save it for later."]
      : q
        ? ["No services match your search", "Try a different word, or clear the filters."]
        : ["No services here yet", "Try another category, filter or state."];

  return (
    <>
      <div className={cx("backdrop", openId && "open")} id="panelBackdrop" onClick={closePanel} />
      <section className={cx("content", openId && "panel-open")} id="content">
        <PageHeader title="Explore Services" description="Browse services, check requirements, and start a new request in minutes." />

        <IntlBar countries={countries} country={country} />

        <div className={cx("tabs", searching && "searching")} id="tabs" role="tablist" aria-label="Service categories">
          {tabs.map((c) => {
            const on = c === activeTab;
            return (
              <button
                key={c}
                type="button"
                className={cx("tab", on && "active")}
                role="tab"
                aria-selected={on && !searching}
                onClick={() => {
                  setTab(c);
                  if (query) setQuery("");
                  setSavedOnly(false);
                }}
              >
                {c === POPULAR_TAB ? POPULAR_LABEL : c}
              </button>
            );
          })}
        </div>

        <div className="filter-row">
          <div className="field search-service">
            <input
              id="search"
              type="search"
              placeholder="Search services..."
              aria-label="Search services"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Icon name="search" strokeWidth={1} />
          </div>
          <div className="field">
            <select id="sort" aria-label="Sort services" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <select
              id="state"
              aria-label={"Filter by " + country.regionLabel.toLowerCase()}
              value={region}
              disabled={!country.regions.length}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">All {country.regionLabelPlural}</option>
              {country.regions.map((st) => (
                <option key={st}>{st}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="filter-btn"
            aria-pressed={savedOnly}
            title="Show saved services only"
            aria-label="Show saved services only"
            onClick={() => setSavedOnly((v) => !v)}
          >
            <Icon name="heart" />
            <span className={cx("count", savedCount > 0 && "show")}>{savedCount}</span>
          </button>
        </div>

        <div className="chips" id="chips">
          {CHIPS.map((c) => (
            <button
              key={c.value}
              type="button"
              className={cx("chip", chip === c.value && "active")}
              aria-pressed={chip === c.value}
              onClick={() => setChip(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="result-line" id="resultLine" aria-live="polite">
          {resultLine}
        </div>

        <div className="service-grid" id="grid">
          {!services.length ? (
            <div className="empty">
              <b>Services couldn’t be loaded</b>Please refresh the page.
            </div>
          ) : !list.length ? (
            <div className="empty">
              <b>{emptyMsg[0]}</b>
              {emptyMsg[1]}
            </div>
          ) : (
            list.map((s) => {
              const e = effective(s, region);
              return (
                <ServiceCard
                  key={s.id}
                  service={s}
                  eff={e}
                  price={priceOf(e.price)}
                  isSaved={saved.has(s.id)}
                  selected={s.id === openId}
                  onView={openPanel}
                  onSave={onSave}
                  onRequest={startRequest}
                />
              );
            })
          )}
        </div>

        {CONFIG.showSampleData && (
          <div className="requests">
            <div className="requests-head">
              <h3>My Active Requests</h3>
              <Link href="/my-services">View All</Link>
            </div>
            <RequestsTable requests={sampleRequests.slice(0, 3)} />
          </div>
        )}
      </section>

      <ServiceDetailPanel
        ref={closeRef}
        open={!!openId}
        service={shown}
        eff={shownEff}
        price={shownEff ? priceOf(shownEff.price) : ""}
        region={region}
        isSaved={shown ? saved.has(shown.id) : false}
        onClose={closePanel}
        onSave={onSave}
        onRequest={startRequest}
      />
    </>
  );
}
