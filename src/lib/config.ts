/**
 * App-wide settings. Mirrors window.CHARTEREDONE_CONFIG from the original index.html.
 * Values can be overridden with environment variables (see .env.example).
 */
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916300347380";

export const CONFIG = {
  brandName: "CharteredONE",

  /**
   * Services list. By default it comes from src/data/services.fallback.json (edit that file and
   * push to update the live site). Set SERVICES_API_URL to read a live feed at build time instead.
   */
  servicesApiUrl: process.env.SERVICES_API_URL || "",

  whatsappNumber,
  talkToExpertUrl:
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent("Hi CharteredONE, I need expert guidance on a compliance service."),
  phoneDisplay: "+91 63003 47380",

  /**
   * Where "Request Service" / "Start Request" goes. Placeholders: {id} {name} {state} {message}.
   * Default: a WhatsApp chat pre-filled with the service name and ID (opens in a new tab).
   * Set NEXT_PUBLIC_START_REQUEST_URL="" to show the "opening soon" toast instead
   * (and dispatch the `charteredone:start-request` event, same as the original page).
   */
  startRequestUrl: process.env.NEXT_PUBLIC_START_REQUEST_URL ?? "https://wa.me/" + whatsappNumber + "?text={message}",

  homeUrl: process.env.NEXT_PUBLIC_HOME_URL || "https://www.charteredone.com",

  /** Sample user, notifications and requests (the live page hides these with showSampleData:false). */
  showSampleData: process.env.NEXT_PUBLIC_SHOW_SAMPLE_DATA !== "false",
} as const;

export function whatsappLink(message: string) {
  return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}
