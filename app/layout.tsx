import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name} ${site.suffix}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: `${site.name} ${site.suffix}`,
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {/* Marks that JavaScript is available, before first paint, so the
            reveal animation can gate itself on it. Without this flag the
            animation would apply unconditionally and hide content from
            anyone whose JS never runs. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.setAttribute("data-js","on")`}
        </Script>

        <a
          href="#main"
          className="micro-label sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:border focus:border-ink focus:bg-ink focus:px-6 focus:py-4 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
