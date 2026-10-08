import type { Metadata } from "next";
import { sampleRequests } from "@/lib/mock";
import { getServices } from "@/lib/services/get-services";
import { MyServicesView, type StepsByService } from "./MyServicesView";

export const metadata: Metadata = { title: "My Services" };

export default async function MyServicesPage() {
  const data = await getServices();

  // Process steps for the services the client has requested (for the progress timeline).
  const byId = new Map(data.services.map((s) => [s.id, s]));
  const steps: StepsByService = {};
  sampleRequests.forEach((r) => {
    const s = byId.get(r.serviceId);
    if (s) steps[r.serviceId] = s.steps.map((st) => ({ name: st.name, description: st.description }));
  });

  // ?tab=… and ?request=… are read in the browser by MyServicesView.
  return <MyServicesView steps={steps} />;
}
