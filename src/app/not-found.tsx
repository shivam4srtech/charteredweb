import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <section className="content">
      <PageHeader title="Page not found" description="The page you were looking for doesn't exist or has moved." />
      <div className="empty" style={{ marginTop: 24 }}>
        <b>Let&apos;s get you back on track</b>
        <Link className="link-btn" href="/dashboard">
          Go to Dashboard
        </Link>
        <Link className="link-btn" href="/explore-services">
          Explore Services
        </Link>
      </div>
    </section>
  );
}
