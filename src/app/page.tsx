"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The original app opened on Explore Services, so "/" goes there.
 * On the server this is done by public/.htaccess; this page is the fallback.
 */
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/explore-services" + window.location.search + window.location.hash);
  }, [router]);
  return (
    <section className="content">
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/explore-services" />
      </noscript>
    </section>
  );
}
