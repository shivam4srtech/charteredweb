import feed from "@/data/services.fallback.json";

/**
 * Keeps the old services-feed address working: https://app.charteredone.com/api/app-services
 * Written as a static JSON file at build time.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(feed);
}
