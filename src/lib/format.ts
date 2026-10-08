/** Formatting helpers shared across pages (ported from the original page script). */

export function money(n: number | null | undefined) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}

/** "5-10 Days", "1 Day", "3 Working Days" … */
export function days(a: number | null | undefined, b: number | null | undefined, unit = "Days") {
  if (a == null && b == null) return "";
  if (a === b || a == null || b == null) {
    const d = (a == null ? b : a) as number;
    return d + " " + (d === 1 ? unit.replace(/s$/, "") : unit);
  }
  return a + "-" + b + " " + unit;
}

/** "2026-10-05" is read as a local calendar date (not UTC midnight), so it never shifts a day. */
export function parseDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(iso);
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  try {
    return parseDate(iso).toLocaleDateString("en-IN", opts);
  } catch {
    return iso;
  }
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
