"use client";

import { useIntl } from "@/lib/intl/IntlProvider";

/** An amount shown in the visitor's chosen display currency (≈ converted), like co-intl "tagged" mode. */
export function Price({ amount, currency = "INR" }: { amount: number; currency?: string }) {
  const { formatAmount, displayCcy } = useIntl();
  const converted = displayCcy(currency) !== currency;
  return (
    <span title={converted ? "Charged in " + currency : undefined} suppressHydrationWarning>
      {formatAmount(amount, currency)}
    </span>
  );
}
