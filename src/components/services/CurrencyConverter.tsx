"use client";

import { useEffect, useRef, useState } from "react";
import { POPULAR_CCY, ccyName, convert, fmt, fmtDate, fmtRate, visitorCcy } from "@/lib/intl/currency";
import { useIntl } from "@/lib/intl/IntlProvider";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Currency fees are charged in (selected country's currency). */
  native: string;
  countryName: string;
};

/** Popular first (incl. the country's and the visitor's own currency), then all others A–Z. */
export function currencyOptions(rates: Record<string, number>, native: string) {
  const all = Object.keys(rates).filter((c) => /^[A-Z]{3}$/.test(c)).sort();
  let pop = POPULAR_CCY.slice();
  const mine = visitorCcy();
  if (mine && !pop.includes(mine)) pop.unshift(mine);
  if (!pop.includes(native)) pop.unshift(native);
  pop = pop.filter((c) => rates[c] || c === native);
  return { popular: pop, others: all.filter((c) => !pop.includes(c)) };
}

export function CurrencyOptionGroups({ rates, native }: { rates: Record<string, number>; native: string }) {
  const { popular, others } = currencyOptions(rates, native);
  return (
    <>
      <optgroup label="Popular">
        {popular.map((c) => (
          <option key={c} value={c}>
            {c} · {ccyName(c)}
          </option>
        ))}
      </optgroup>
      <optgroup label="All currencies">
        {others.map((c) => (
          <option key={c} value={c}>
            {c} · {ccyName(c)}
          </option>
        ))}
      </optgroup>
    </>
  );
}

/** Currency converter dialog (from co-intl.js). */
export function CurrencyConverter({ open, onClose, native, countryName }: Props) {
  const { rates, displayCcy, setCurrency } = useIntl();
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState(native);
  const [to, setTo] = useState("USD");
  const amtRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<Element | null>(null);

  // Reset the pair each time the dialog opens
  useEffect(() => {
    if (!open) return;
    let target = displayCcy(native);
    if (target === native) {
      const v = visitorCcy();
      target = v && v !== native ? v : native === "USD" ? "INR" : "USD";
    }
    setFrom(native);
    setTo(target);
    lastFocus.current = document.activeElement;
    const t = setTimeout(() => {
      amtRef.current?.focus();
      amtRef.current?.select();
    }, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      (lastFocus.current as HTMLElement | null)?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, native]);

  if (!open) return null;

  const a = parseFloat(amount);
  const v = isFinite(a) ? convert(a, from, to, rates.rates) : null;
  const showingAlready = displayCcy(native) === to;

  return (
    <div
      className="co-intl co-intl-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="co-intl-dialog" role="dialog" aria-modal="true" aria-labelledby="co-intl-title">
        <div className="co-intl-head">
          <h2 id="co-intl-title">Currency converter</h2>
          <button type="button" className="co-intl-x" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <label className="co-intl-in">
          <span>Amount</span>
          <input
            ref={amtRef}
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <div className="co-intl-pair">
          <label>
            <span>From</span>
            <select className="co-intl-from" aria-label="From currency" value={from} onChange={(e) => setFrom(e.target.value)}>
              <CurrencyOptionGroups rates={rates.rates} native={native} />
            </select>
          </label>
          <button
            type="button"
            className="co-intl-swap"
            aria-label="Swap currencies"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            ⇄
          </button>
          <label>
            <span>To</span>
            <select className="co-intl-to" aria-label="To currency" value={to} onChange={(e) => setTo(e.target.value)}>
              <CurrencyOptionGroups rates={rates.rates} native={native} />
            </select>
          </label>
        </div>
        <div className="co-intl-result" aria-live="polite">
          <div className="co-intl-big">{v == null ? "—" : fmt(a, from, true) + " = " + fmt(v, to, true)}</div>
          <div className="co-intl-rate">
            1 {from} = {fmtRate(convert(1, from, to, rates.rates))} {to} · 1 {to} = {fmtRate(convert(1, to, from, rates.rates))} {from}
          </div>
        </div>
        {!showingAlready && (
          <button
            type="button"
            className="co-intl-apply"
            onClick={() => {
              setCurrency(to === native ? null : to);
              onClose();
            }}
          >
            Show all prices in {to}
          </button>
        )}
        <p className="co-intl-src">
          {rates.live ? "Mid-market rates updated " + fmtDate(rates.ts) + ". " : "Indicative rates (live rates unavailable). "}
          For reference only. Fees for {countryName} services are charged in {native}.{" "}
          <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">
            Rates by Exchange Rate API
          </a>
        </p>
      </div>
    </div>
  );
}
