import type { Metadata, Viewport } from "next";
import {
  Sora,
  Inter,
  IBM_Plex_Mono,
  Zilla_Slab,
  Playfair_Display,
  Fraunces,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { AttributionCapture } from "@/components/site/AttributionCapture";
import { SITE, siteGraph } from "@/content/seo";

// Scoped product typefaces — each preview owns its inner voice, none belong to
// the Forgeonix type system. Zilla Slab = Oak & Steel, Playfair Display =
// Realty Leaderboard, Fraunces = Solea. (MiniCRM reuses Inter for a calm feel.)
const shop = Zilla_Slab({
  variable: "--font-shop",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const realty = Playfair_Display({
  variable: "--font-realty",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const solea = Fraunces({
  variable: "--font-solea",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Sora — wordmark, headings, and major statements.
const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Inter — navigation, body copy, buttons, forms, general UI.
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// IBM Plex Mono — restrained technical accents only (labels, statuses, metadata).
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const HOME_TITLE =
  "Forgeonix — Custom Software, Automation & IT Support for Kentucky Small Businesses";
const HOME_DESCRIPTION =
  "Kentucky technology company building custom software, CRM systems, automation, and websites — with practical IT support — for small businesses in Richmond, Lexington, and statewide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_TITLE,
    template: "%s | Forgeonix",
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE.url,
    siteName: "Forgeonix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#14171c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${shop.variable} ${realty.variable} ${solea.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={siteGraph()} />
        <AttributionCapture />
        <a
          href="#main"
          className="fx-btn fx-btn--primary sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
