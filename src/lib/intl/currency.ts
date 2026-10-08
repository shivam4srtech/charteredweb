/**
 * Country & currency helpers (port of co-intl.js v1.1).
 * - "Services in" country picker: only services offered in that country are shown
 * - Prices shown in that country's currency by default (INR, THB, AED, …)
 * - Visitor can switch display currency (live rates) and open a converter
 */
import type { Country, Service } from "@/lib/services/types";

export const DEFAULT_COUNTRY = "IN";
export const RATES_URL = "https://open.er-api.com/v6/latest/USD";
export const RATES_TTL_HOURS = 6;
export const STORAGE_KEYS = { country: "co_intl_country", ccy: "co_intl_ccy", rates: "co_intl_rates_v1" };

export const POPULAR_CCY = ["USD", "EUR", "GBP", "INR", "AED", "SGD", "THB", "AUD", "CAD", "JPY", "CNY", "HKD", "MYR", "SAR", "QAR", "NZD", "CHF"];
const AMBIGUOUS = ["$", "Rs", "kr", "¥", "£", "R", "Fr", "K", "L", "Ks", "Sh"];

// ISO country -> currency (CLDR), packed as CC+CCY.
const CC =
  "ACSHPADEURAEAEDAFAFNAGXCDAIXCDALALLAMAMDAOAOAARARSASUSDATEURAUAUDAWAWGAXEURAZAZNBABAMBBBBDBDBDTBEEURBFXOFBGEURBHBHDBIBIFBJXOFBLEURBMBMDBNBNDBOBOBBQUSDBRBRLBSBSDBTBTNBVNOKBWBWPBYBYNBZBZDCACADCCAUDCDCDFCFXAFCGXAFCHCHFCIXOFCKNZDCLCLPCMXAFCNCNYCOCOPCRCRCCUCUPCVCVECWXCGCXAUDCYEURCZCZKDEEURDGUSDDJDJFDKDKKDMXCDDODOPDZDZDEAEURECUSDEEEUREGEGPEHMADERERNESEURETETBFIEURFJFJDFKFKPFMUSDFODKKFREURGAXAFGBGBPGDXCDGEGELGFEURGGGBPGHGHSGIGIPGLDKKGMGMDGNGNFGPEURGQXAFGREURGSGBPGTGTQGUUSDGWXOFGYGYDHKHKDHMAUDHNHNLHREURHTHTGHUHUFICEURIDIDRIEEURILILSIMGBPININRIOUSDIQIQDIRIRRISISKITEURJEGBPJMJMDJOJODJPJPYKEKESKGKGSKHKHRKIAUDKMKMFKNXCDKPKPWKRKRWKWKWDKYKYDKZKZTLALAKLBLBPLCXCDLICHFLKLKRLRLRDLSZARLTEURLUEURLVEURLYLYDMAMADMCEURMDMDLMEEURMFEURMGMGAMHUSDMKMKDMLXOFMMMMKMNMNTMOMOPMPUSDMQEURMRMRUMSXCDMTEURMUMURMVMVRMWMWKMXMXNMYMYRMZMZNNAZARNCXPFNEXOFNFAUDNGNGNNINIONLEURNONOKNPNPRNRAUDNUNZDNZNZDOMOMRPAPABPEPENPFXPFPGPGKPHPHPPKPKRPLPLNPMEURPNNZDPRUSDPSILSPTEURPWUSDPYPYGQAQARREEURRORONRSRSDRURUBRWRWFSASARSBSBDSCSCRSDSDGSESEKSGSGDSHSHPSIEURSJNOKSKEURSLSLESMEURSNXOFSOSOSSRSRDSSSSPSTSTNSVUSDSXXCGSYSYPSZSZLTAGBPTCUSDTDXAFTFEURTGXOFTHTHBTJTJSTKNZDTLUSDTMTMTTNTNDTOTOPTRTRYTTTTDTVAUDTWTWDTZTZSUAUAHUGUGXUMUSDUSUSDUYUYUUZUZSVAEURVCXCDVEVESVGUSDVIUSDVNVNDVUVUVWFXPFWSWSTYEYERYTEURZAZARZMZMWZWUSD";
export const CCY_OF: Record<string, string> = {};
for (let i = 0; i < CC.length; i += 5) CCY_OF[CC.substr(i, 2)] = CC.substr(i + 2, 3);

export type Rates = Record<string, number>;
export type RatesState = { rates: Rates; ts: number; live: boolean };

/** Used only until live rates load (USD base, 6 Oct 2026). */
export const FALLBACK_RATES: RatesState = {
  ts: 1791244951,
  live: false,
  rates: {
    USD: 1, INR: 96.38, THB: 33.69, AED: 3.6725, SGD: 1.2798, EUR: 0.8921, GBP: 0.7565, AUD: 1.4357, CAD: 1.4256,
    JPY: 157.98, CNY: 6.7145, HKD: 7.8471, MYR: 4.0869, SAR: 3.75, QAR: 3.64, KWD: 0.3092, BHD: 0.376, OMR: 0.3845,
    NZD: 1.7864, CHF: 0.8311, ZAR: 16.648, IDR: 17892.58, PHP: 62.642, VND: 25966.23, KRW: 1342.77, NPR: 154.19,
    LKR: 330.44, BDT: 123.14, SEK: 10.041, NOK: 9.5938, DKK: 6.6705, BRL: 5.017, MXN: 18.106, PKR: 277.1,
    TRY: 49.164, EGP: 52.432, NGN: 1331, KES: 129.75, ILS: 3.0513, TWD: 31.785,
  },
};

export const up = (s: unknown) => String(s == null ? "" : s).trim().toUpperCase();

export function flagOf(cc: string) {
  if (typeof navigator !== "undefined" && /Windows/i.test(navigator.userAgent || "")) return ""; // Windows shows flags as letters
  if (!/^[A-Z]{2}$/.test(cc)) return "";
  return String.fromCodePoint(127397 + cc.charCodeAt(0), 127397 + cc.charCodeAt(1));
}

function displayName(code: string, type: "region" | "currency") {
  try {
    return new Intl.DisplayNames(["en"], { type }).of(code) || code;
  } catch {
    return code;
  }
}
export const countryName = (cc: string) => displayName(cc, "region");
export const ccyName = (c: string) => displayName(c, "currency");

export function fmtDate(ts: number) {
  try {
    return new Date(ts * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export function visitorCcy(): string | null {
  if (typeof navigator === "undefined") return null;
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  for (const l of langs) {
    const r = up((l || "").split("-")[1]);
    if (CCY_OF[r]) return CCY_OF[r];
  }
  return null;
}

export const svcCountry = (s: Pick<Service, "country">) => up(s.country) || DEFAULT_COUNTRY;

export type CountryInfo = {
  code: string;
  name: string;
  currency: string;
  regions: string[];
  regionLabel: string;
  regionLabelPlural: string;
  count: number;
};

/** Countries that have at least one service (plus the default country). */
export function buildCountries(services: Service[], defs: Country[] = [], indiaStates: string[] = []): CountryInfo[] {
  const byCode: Record<string, Country> = {};
  defs.forEach((c) => {
    const code = up(c && c.code);
    if (code) byCode[code] = c;
  });
  const counts: Record<string, number> = {};
  const codes: string[] = [];
  services.forEach((s) => {
    if (s.active === false) return;
    const c = svcCountry(s);
    if (!counts[c]) {
      counts[c] = 0;
      codes.push(c);
    }
    counts[c]++;
  });
  if (!codes.includes(DEFAULT_COUNTRY)) codes.push(DEFAULT_COUNTRY);
  return codes
    .filter((code) => !(byCode[code] && byCode[code].active === false) || code === DEFAULT_COUNTRY)
    .map((code) => {
      const def = byCode[code] || ({} as Country);
      const label = def.region_label || (code === "IN" ? "State" : "Region");
      return {
        code,
        name: def.name || countryName(code),
        currency: up(def.currency) || CCY_OF[code] || "USD",
        regions: Array.isArray(def.regions) ? def.regions : code === "IN" ? indiaStates : [],
        regionLabel: label,
        regionLabelPlural: def.region_label_plural || label + "s",
        count: counts[code] || 0,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function convert(amount: number, from: string, to: string, rates: Rates): number | null {
  if (from === to) return amount;
  if (!rates[from] || !rates[to]) return null;
  return (amount / rates[from]) * rates[to];
}

const fmtCache: Record<string, { format: (n: number) => string }> = {};
export function fmt(v: number, ccy: string, precise = false, fixed?: number | null) {
  const digits = fixed != null && !isNaN(fixed) ? +fixed : precise ? null : Math.abs(v) >= 100 ? 0 : 2;
  const key = ccy + "|" + digits;
  if (!fmtCache[key]) {
    const loc = ccy === "INR" ? "en-IN" : "en";
    let disp: "symbol" | "narrowSymbol" = "symbol";
    try {
      const part = (d: "symbol" | "narrowSymbol") =>
        new Intl.NumberFormat(loc, { style: "currency", currency: ccy, currencyDisplay: d })
          .formatToParts(1)
          .filter((p) => p.type === "currency")[0].value;
      const sym = part("symbol");
      const narrow = part("narrowSymbol");
      if (sym === ccy && narrow !== ccy && !AMBIGUOUS.includes(narrow)) disp = "narrowSymbol";
      const o: Intl.NumberFormatOptions = { style: "currency", currency: ccy, currencyDisplay: disp };
      if (digits !== null) {
        o.minimumFractionDigits = digits;
        o.maximumFractionDigits = digits;
      }
      fmtCache[key] = new Intl.NumberFormat(loc, o);
    } catch {
      fmtCache[key] = { format: (n: number) => ccy + " " + Number(n.toFixed(digits === null ? 2 : digits)).toLocaleString("en") };
    }
  }
  return fmtCache[key].format(v);
}

export function fmtRate(r: number | null) {
  if (r == null) return "—";
  return r >= 100 ? r.toLocaleString("en", { maximumFractionDigits: 2 }) : r.toLocaleString("en", { maximumSignificantDigits: 4 });
}

/* ---------- safe browser storage ---------- */
export function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function lsSet(key: string, val: string | null) {
  try {
    if (val == null) localStorage.removeItem(key);
    else localStorage.setItem(key, val);
  } catch {
    /* storage unavailable */
  }
}
