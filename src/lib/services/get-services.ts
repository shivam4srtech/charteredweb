import "server-only";
import { CONFIG } from "@/lib/config";
import fallback from "@/data/services.fallback.json";
import { cleanServices } from "./catalog";
import type { CleanServices, ServicesFeed } from "./types";

/**
 * Loads the services list at build time.
 * 1. Live feed (CONFIG.servicesApiUrl) when one is configured.
 * 2. Otherwise / if unreachable: the bundled list in src/data/services.fallback.json.
 */
export async function getServices(): Promise<CleanServices> {
  let feed: ServicesFeed | null = null;
  if (CONFIG.servicesApiUrl) try {
    const res = await fetch(CONFIG.servicesApiUrl, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = (await res.json()) as ServicesFeed;
    if (!Array.isArray(json.services) || !json.services.length) throw new Error("empty feed");
    feed = json;
  } catch (err) {
    console.warn("[CharteredONE] Services API unavailable, using bundled data.", (err as Error).message);
  }
  return cleanServices(feed ?? (fallback as unknown as ServicesFeed));
}
