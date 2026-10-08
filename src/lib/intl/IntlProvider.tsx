"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_COUNTRY,
  FALLBACK_RATES,
  RATES_TTL_HOURS,
  RATES_URL,
  STORAGE_KEYS,
  convert,
  fmt,
  lsGet,
  lsSet,
  up,
  type RatesState,
} from "./currency";

type IntlContextValue = {
  /** Selected "Services in" country code (e.g. "IN"). */
  countryCode: string;
  setCountryCode: (code: string) => void;
  /** Display currency chosen by the visitor, or null = local currency of the country. */
  ccyPref: string | null;
  setCurrency: (ccy: string | null) => void;
  rates: RatesState;
  /** Currency prices are shown in, for prices charged in `native`. */
  displayCcy: (native: string) => string;
  /** "₹6,500" or "≈ $68" when the visitor picked another currency. */
  formatAmount: (amount: number, native: string) => string;
  ready: boolean;
};

const IntlContext = createContext<IntlContextValue | null>(null);

function setUrlParam(name: string, value: string | null) {
  try {
    const u = new URL(location.href);
    if (!u.searchParams.has(name)) return;
    if (value) u.searchParams.set(name, value);
    else u.searchParams.delete(name);
    history.replaceState(history.state, "", u.toString());
  } catch {
    /* ignore */
  }
}

export function IntlProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryState] = useState(DEFAULT_COUNTRY);
  const [ccyPref, setCcyState] = useState<string | null>(null);
  const [rates, setRates] = useState<RatesState>(FALLBACK_RATES);
  const [ready, setReady] = useState(false);

  // Restore choices from ?country= / ?currency= or browser storage, then load live rates.
  useEffect(() => {
    let params: URLSearchParams | null = null;
    try {
      params = new URLSearchParams(location.search);
    } catch {
      /* ignore */
    }
    const fromUrl = up(params?.get("country"));
    if (fromUrl) lsSet(STORAGE_KEYS.country, fromUrl);
    const country = fromUrl || up(lsGet(STORAGE_KEYS.country));
    if (/^[A-Z]{2}$/.test(country)) setCountryState(country);
    const cur = up(params?.get("currency")) || up(lsGet(STORAGE_KEYS.ccy));
    if (/^[A-Z]{3}$/.test(cur)) setCcyState(cur);
    setReady(true);

    let cached: (RatesState & { fetched?: number }) | null = null;
    try {
      cached = JSON.parse(lsGet(STORAGE_KEYS.rates) || "null");
    } catch {
      /* ignore */
    }
    if (cached && cached.rates) setRates({ rates: cached.rates, ts: cached.ts, live: true });
    if (cached && cached.rates && cached.fetched && Date.now() - cached.fetched < RATES_TTL_HOURS * 36e5) return;

    const ctrl = new AbortController();
    fetch(RATES_URL, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => {
        if (!j || !j.rates || !j.rates.USD) throw new Error("bad rates");
        const obj = { rates: j.rates, ts: j.time_last_update_unix || Math.floor(Date.now() / 1000), fetched: Date.now() };
        lsSet(STORAGE_KEYS.rates, JSON.stringify(obj));
        setRates({ rates: obj.rates, ts: obj.ts, live: true });
      })
      .catch((e) => {
        if ((e as Error).name !== "AbortError") console.warn("[co-intl] live rates unavailable, using fallback rates", e);
      });
    return () => ctrl.abort();
  }, []);

  const setCountryCode = useCallback((code: string) => {
    const c = up(code);
    lsSet(STORAGE_KEYS.country, c);
    setUrlParam("country", c);
    setCountryState(c);
  }, []);

  const setCurrency = useCallback((ccy: string | null) => {
    const c = ccy ? up(ccy) : null;
    lsSet(STORAGE_KEYS.ccy, c);
    setUrlParam("currency", c);
    setCcyState(c);
  }, []);

  const displayCcy = useCallback(
    (native: string) => (ccyPref && (rates.rates[ccyPref] || ccyPref === native) ? ccyPref : native),
    [ccyPref, rates],
  );

  const formatAmount = useCallback(
    (amount: number, native: string) => {
      const to = displayCcy(native);
      if (to === native) return fmt(amount, native);
      const v = convert(amount, native, to, rates.rates);
      return v == null ? fmt(amount, native) : "≈ " + fmt(v, to);
    },
    [displayCcy, rates],
  );

  const value = useMemo(
    () => ({ countryCode, setCountryCode, ccyPref, setCurrency, rates, displayCcy, formatAmount, ready }),
    [countryCode, setCountryCode, ccyPref, setCurrency, rates, displayCcy, formatAmount, ready],
  );

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

export function useIntl() {
  const ctx = useContext(IntlContext);
  if (!ctx) throw new Error("useIntl must be used inside <IntlProvider>");
  return ctx;
}
