import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Prefetch } from "@/components/shared/prefetch";
import { SiteHeader } from "./_components/header/site-header";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export const metadata: Metadata = {
  title: "ExhibitionRP",
  description: "Community made ExhibitionRP landing page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-background">
        <ErrorBoundary>
          <SiteHeader />
          <TRPCReactProvider>
            <Prefetch />
            <div className="relative min-h-[calc(100vh-4rem)]">{children}</div>
          </TRPCReactProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
