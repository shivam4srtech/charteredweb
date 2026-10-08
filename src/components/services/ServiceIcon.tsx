import type { Service } from "@/lib/services/types";

/** Service icon glyphs from the original page ({f:1} = filled glyph). */
const ICONS: Record<string, { s: string; f?: boolean }> = {
  shield: { s: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/>' },
  export: { s: '<path d="M4 17h16"/><path d="M7 17V9h10v8"/><path d="M12 3v8"/><path d="m8 7 4-4 4 4"/><path d="M6 21h12"/>' },
  factory: { f: true, s: '<path d="M3 21V9l6-3v6l6-3v4l6-3v11H3Zm3-4h2v-2H6v2Zm5 0h2v-2h-2v2Zm5 0h2v-2h-2v2Z"/>' },
  pill: { s: '<path d="m10 21 10-10a5 5 0 0 0-7-7L3 14a5 5 0 0 0 7 7Z"/><path d="M9 15 15 9"/>' },
  hardhat: { f: true, s: '<path d="M4 19h16v2H4v-2Zm2-1h12v-7a6 6 0 0 0-4-5.65V3h-4v2.35A6 6 0 0 0 6 11v7Z"/>' },
  shop: { f: true, s: '<path d="M4 4h16l1 5H3l1-5Zm0 7h16v9H4v-9Zm3 2v5h3v-5H7Z"/>' },
  food: { s: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 4v4M12 3v5M16 4v4"/>' },
  building: { s: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>' },
  document: { s: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>' },
  rupee: { s: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>' },
  users: { s: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>' },
  briefcase: { s: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' },
  scale: { s: '<path d="M12 3v18M5 21h14M3 7h18M6 7l-3 7a3 3 0 0 0 6 0L6 7ZM18 7l-3 7a3 3 0 0 0 6 0l-3-7Z"/>' },
  calendar: { s: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
};

type Props = {
  service: Pick<Service, "icon" | "icon_text" | "icon_color">;
  /** true = the large logo in the detail panel */
  big?: boolean;
};

export function ServiceIcon({ service: s, big }: Props) {
  const color = "c-" + (s.icon_color || "blue");
  const base = big ? "detail-logo" : "icon-box";

  if (s.icon_text) {
    const t = String(s.icon_text);
    const lower = t === t.toLowerCase();
    const size = big ? (t.length <= 3 ? 24 : 20) : t.length <= 3 ? 17 : t.length <= 5 ? 18 : 13;
    return (
      <div
        className={base + " " + color}
        style={{ fontSize: size, ...(lower ? { fontStyle: "italic", fontWeight: 800 } : null) }}
      >
        {t}
      </div>
    );
  }

  if (s.icon === "carpet") {
    return (
      <div className={base} style={{ background: "#fff", ...(big ? null : { padding: 4 }) }}>
        <div className="carpet" />
      </div>
    );
  }

  const ic = ICONS[s.icon] || ICONS.document;
  return (
    <div className={base + " " + color}>
      {ic.f ? (
        <svg viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: ic.s }} />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: ic.s }}
        />
      )}
    </div>
  );
}
