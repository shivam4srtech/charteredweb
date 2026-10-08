import { POPULAR_IDS, POPULAR_TAB } from "./catalog";
import type { BadgeKey, Service } from "./types";

export type SortKey = "popularity" | "price_asc" | "price_desc" | "fastest" | "name";
export type ChipKey = "all" | BadgeKey;

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popularity", label: "Sort by Popularity" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "fastest", label: "Fastest First" },
  { value: "name", label: "Name: A to Z" },
];

export const CHIPS: { value: ChipKey; label: string }[] = [
  { value: "all", label: "All" },
  { value: "popular", label: "🔥 Popular" },
  { value: "quick", label: "⚡ Fast Processing" },
  { value: "new", label: "🆕 New" },
  { value: "recommended", label: "⭐ Recommended" },
];

export const BADGE_LABEL: Record<BadgeKey, string> = {
  popular: "Popular",
  quick: "Quick",
  recommended: "Recommended",
  new: "New",
};

export type Effective = {
  price: number;
  tmin: number;
  tmax: number;
  available: boolean;
  note: string;
  overridden: boolean;
};

/** Price / timeline / availability after applying the chosen state's override. */
export function effective(s: Service, region: string): Effective {
  const o = (region && s.state_overrides && s.state_overrides[region]) || {};
  const listed =
    s.available_states === "ALL" || (Array.isArray(s.available_states) && s.available_states.includes(region));
  return {
    price: o.price_from != null ? o.price_from : s.price_from,
    tmin: o.tat_min != null ? o.tat_min : s.tat_min,
    tmax: o.tat_max != null ? o.tat_max : s.tat_max,
    available: !region || (o.available != null ? o.available : listed),
    note: o.note || "",
    overridden: o.price_from != null || o.tat_min != null || o.tat_max != null,
  };
}

export function matches(s: Service, q: string) {
  const hay = [s.name, s.card_description, s.intro, s.category]
    .concat((s.documents || []).map((d) => d.name))
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w));
}

type FilterState = {
  tab: string | null;
  chip: ChipKey;
  query: string;
  sort: SortKey;
  region: string;
  savedOnly: boolean;
  saved: Set<string>;
};

/** Cards shown for the current tab / search / filters (supports "Most Popular"). */
export function visibleServices(services: Service[], st: FilterState) {
  const q = st.query.trim().toLowerCase();
  const popular = st.tab === POPULAR_TAB && !q && !st.savedOnly;
  const list = services.filter((s) => {
    if (!q && !st.savedOnly) {
      if (popular) {
        if (!POPULAR_IDS.includes(s.id)) return false;
      } else if (s.category !== st.tab) return false;
    }
    if (q && !matches(s, q)) return false;
    if (st.savedOnly && !st.saved.has(s.id)) return false;
    if (st.chip !== "all" && !(s.badges || []).includes(st.chip)) return false;
    return effective(s, st.region).available;
  });

  const e = (s: Service) => effective(s, st.region);
  const cmp: Record<SortKey, (a: Service, b: Service) => number> = {
    popularity: popular
      ? (a, b) => POPULAR_IDS.indexOf(a.id) - POPULAR_IDS.indexOf(b.id)
      : (a, b) => a.display_rank - b.display_rank || a.name.localeCompare(b.name),
    price_asc: (a, b) => e(a).price - e(b).price,
    price_desc: (a, b) => e(b).price - e(a).price,
    fastest: (a, b) => e(a).tmax - e(b).tmax || e(a).tmin - e(b).tmin,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return list.sort(cmp[st.sort]);
}
