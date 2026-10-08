import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import "@/styles/explore.css";
import "@/styles/pages.css";

import { AppShell } from "@/components/layout/AppShell";
import { ToastProvider } from "@/components/ui/Toast";
import { IntlProvider } from "@/lib/intl/IntlProvider";

export const metadata: Metadata = {
  title: {
    default: "CharteredONE",
    template: "%s · CharteredONE",
  },
  description:
    "CharteredONE client app: explore licences, registrations and compliance services, track requests, documents and payments.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IntlProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
