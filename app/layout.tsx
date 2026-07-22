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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.forgeonix.dev"),
  title: "Forgeonix — Custom software and internal tools for small businesses",
  description:
    "Forgeonix builds internal tools, dashboards, customer portals, tracking systems, automations, and business websites that fix real operational problems.",
  openGraph: {
    title: "Forgeonix",
    description:
      "Internal tools, dashboards, portals, and automations built for how small businesses actually operate.",
    url: "https://www.forgeonix.dev",
    siteName: "Forgeonix",
    type: "website",
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
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
