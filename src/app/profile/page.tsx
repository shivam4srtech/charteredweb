import type { Metadata } from "next";
import { getServices } from "@/lib/services/get-services";
import { ProfileView } from "./ProfileView";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const data = await getServices();
  // ?tab=… is read in the browser by ProfileView.
  return <ProfileView states={data.states} />;
}
