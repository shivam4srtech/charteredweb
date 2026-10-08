/**
 * Catalog rules carried over from the original index.html:
 * "Most Popular" tab, tab order by demand, removed "Licenses" category, duplicate guard.
 */
import type { CleanServices, Service, ServicesFeed } from "./types";

export const POPULAR_TAB = "__popular";
export const POPULAR_LABEL = "Most Popular";

/** High-demand services shown in "Most Popular", in this order. Edit IDs freely. */
export const POPULAR_IDS = [
  "REG-PVT", "GST-REG", "ITR-IND", "IP-TM", "REG-LLP",
  "REG-UDYAM", "GST-RETURN-M", "FSSAI-BASIC", "REG-PROP", "EXIM-IEC",
  "MCA-ANNUAL-PVT", "ACC-BOOK", "SHOP-ACT", "REG-STARTUP", "REG-OPC",
];

/** Tab order, highest demand first. Any category not listed goes at the end (A–Z). */
export const CATEGORY_ORDER = [
  "Business Registration", "GST & Indirect Tax", "Income Tax", "Startup & MSME",
  "Intellectual Property", "Food & FSSAI", "MCA & ROC Compliance", "Accounting & Payroll",
  "Import Export", "Business Licenses", "Labour & Payroll Compliance", "Labour & HR Compliance",
  "Government Procurement", "CA Certificates", "Audit & Assurance", "Finance & Advisory",
  "NGO & Nonprofit", "ISO & Management Systems", "Foreign Business Setup",
  "EPR & Waste Compliance", "BIS & Product Certification", "Legal Metrology", "Real Estate",
  "Pharma & Healthcare", "Valuation & Transaction", "Quality & Compliance Certificates",
  "Product Compliance", "Environmental Compliance", "Industrial Licenses",
  "Manufacturing Compliance", "Telecom & Wireless",
];

/** Categories that must never show as a tab. */
const REMOVED_CATEGORIES = ["Licenses"];
const REMOVED_FALLBACK_CATEGORY = "Business Licenses";

/** Old "Licenses" services: hidden when the proper service exists, otherwise moved. */
const LEGACY_SERVICES: Record<string, { to: string; replacedBy?: string; rank?: number }> = {
  "LIC-BIS": { to: "BIS & Product Certification", replacedBy: "BIS-HALLMARK" },
  "LIC-IEC": { to: "Import Export", replacedBy: "EXIM-IEC" },
  "LIC-FSSAI": { to: "Food & FSSAI", replacedBy: "FSSAI-BASIC" },
  "LIC-LABOUR": { to: "Labour & Payroll Compliance", replacedBy: "LAB-LIC" },
  "LIC-DRUG": { to: "Pharma & Healthcare", replacedBy: "DRUG-RETAIL" },
  "LIC-FACTORY": { to: "Manufacturing Compliance", replacedBy: "FACTORY-LIC" },
  "LIC-TRADE": { to: "Business Licenses", replacedBy: "TRADE-LIC" },
  "LIC-RCMC-CEPC": { to: "Import Export", rank: 115.5 },
};

/**
 * Same key = same service. Ignores case, brackets and words like Registration / License.
 * Text after " - " (state, plan, variant) is kept, so "... - Bihar" ≠ "... - Assam".
 */
function dupKey(s: Service) {
  const parts = String(s.name || "").toLowerCase().replace(/[–—]/g, "-").split(" - ");
  const base = parts[0]
    .replace(/\(.*?\)/g, " ")
    .replace(/\b(registrations?|licen[cs]es?|certificates?|certification|services?|filing|online|setup|support|and)\b/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return (base || parts[0].trim()) + "|" + parts.slice(1).join(" - ").trim();
}

export function cleanServices(feed: ServicesFeed): CleanServices {
  const aliases: Record<string, string> = {};
  const hidden: string[] = [];
  let all = (feed.services || []).map((s) => ({ ...s }));
  const ids = new Set(all.map((s) => s.id));

  // 1. Old "Licenses" services
  all = all.filter((s) => {
    const L = LEGACY_SERVICES[s.id];
    if (L && L.replacedBy && ids.has(L.replacedBy)) {
      aliases[s.id] = L.replacedBy;
      hidden.push(`${s.id} (replaced by ${L.replacedBy})`);
      return false;
    }
    if (L) {
      s.category = L.to;
      if (L.rank != null) s.display_rank = L.rank;
    }
    if (REMOVED_CATEGORIES.includes(s.category)) {
      hidden.push(`${s.id} (moved from ${s.category} to ${REMOVED_FALLBACK_CATEGORY})`);
      s.category = REMOVED_FALLBACK_CATEGORY;
    }
    return true;
  });

  // 2. Duplicate guard: repeated ID, or repeated service name
  const seenId = new Set<string>();
  const seenKey: Record<string, string> = {};
  all = all.filter((s) => {
    if (seenId.has(s.id)) {
      hidden.push(`${s.id} (repeated ID)`);
      return false;
    }
    const k = dupKey(s);
    if (seenKey[k]) {
      aliases[s.id] = seenKey[k];
      hidden.push(`${s.id} (same service as ${seenKey[k]})`);
      return false;
    }
    seenId.add(s.id);
    seenKey[k] = s.id;
    return true;
  });

  // 3. Only active services
  all = all.filter((s) => s.active !== false);

  // 4. Tabs: drop removed categories, add any missing, order by demand
  const cats = (feed.categories || []).filter((c) => !REMOVED_CATEGORIES.includes(c));
  all.forEach((s) => {
    if (!cats.includes(s.category)) cats.push(s.category);
  });
  const pos = (c: string) => {
    const i = CATEGORY_ORDER.indexOf(c);
    return i === -1 ? 999 : i;
  };
  cats.sort((a, b) => pos(a) - pos(b) || a.localeCompare(b));

  if (hidden.length && process.env.NODE_ENV !== "production") {
    console.warn("[CharteredONE] Hidden duplicate/legacy services:", hidden);
  }

  return {
    version: feed.version,
    generated_at: feed.generated_at,
    categories: cats,
    states: feed.states || [],
    countries: feed.countries || [],
    services: all,
    aliases,
  };
}
