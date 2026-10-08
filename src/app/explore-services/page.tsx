import type { Metadata } from "next";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { getServices } from "@/lib/services/get-services";

export const metadata: Metadata = {
  title: "Explore Services",
  description:
    "Explore CharteredONE services: licenses, registrations and compliance, with prices, timelines, documents required and the step-by-step process.",
};


export default async function ExploreServicesPage() {
  const data = await getServices();
  return <ServiceExplorer data={data} />;
}
