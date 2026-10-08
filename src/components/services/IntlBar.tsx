"use client";

import { useEffect, useState } from "react";
import { ccyName, convert, flagOf, fmtDate, fmtRate, type CountryInfo } from "@/lib/intl/currency";
import { useIntl } from "@/lib/intl/IntlProvider";
import { Icon } from "@/components/ui/Icon";
import { CurrencyConverter, CurrencyOptionGroups } from "./CurrencyConverter";

type Props = {
  countries: CountryInfo[];
  country: CountryInfo;
};

/** "Services in" country picker, "Show prices in" currency picker and the converter button. */
export function IntlBar({ countries, country }: Props) {
  const { setCountryCode, ccyPref, setCurrency, rates, displayCcy } = useIntl();
  const [mounted, setMounted] = useState(false);
  const [converterOpen, setConverterOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const native = country.currency;
  const to = displayCcy(native);
  const selectedCcy = ccyPref && to === ccyPref ? ccyPref : "";

  return (
    <div className="co-intl co-intl-bar" role="group" aria-label="Country and currency">
      <label className="co-intl-field">
        <span className="co-intl-lbl">Services in</span>
        <select
          className="co-intl-country"
          aria-label="Country"
          value={country.code}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {countries.map((c) => {
            const flag = mounted ? flagOf(c.code) : "";
            return (
              <option key={c.code} value={c.code}>
                {(flag ? flag + "  " : "") + c.name}
              </option>
            );
          })}
        </select>
      </label>

      <label className="co-intl-field">
        <span className="co-intl-lbl">Show prices in</span>
        <select
          className="co-intl-ccy"
          aria-label="Display currency"
          value={selectedCcy}
          onChange={(e) => setCurrency(e.target.value || null)}
        >
          <option value="">
            Local · {native} ({ccyName(native)})
          </option>
          {mounted && <CurrencyOptionGroups rates={rates.rates} native={native} />}
        </select>
      </label>

      <button type="button" className="co-intl-btn co-intl-open" onClick={() => setConverterOpen(true)}>
        <Icon name="swap" />
        Currency converter
      </button>

      {to !== native && (
        <p className="co-intl-note">
          Fees are charged in <b>{native}</b>. {ccyName(to)} amounts are approximate · 1 {native} ={" "}
          {fmtRate(convert(1, native, to, rates.rates))} {to}
          {rates.live ? " · rates of " + fmtDate(rates.ts) : " · indicative rates"} ·{" "}
          <button type="button" onClick={() => setCurrency(null)}>
            Show in {native}
          </button>
        </p>
      )}

      <CurrencyConverter
        open={converterOpen}
        onClose={() => setConverterOpen(false)}
        native={native}
        countryName={country.name}
      />
    </div>
  );
}
