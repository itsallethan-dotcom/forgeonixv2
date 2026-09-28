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
  title: "Forgeonix | Technology Solutions for Small Businesses",
  description:
    "Forgeonix helps small businesses solve technology problems through custom software, automation, websites, and IT support.",
  openGraph: {
    title: "Forgeonix | Technology Solutions for Small Businesses",
    description:
      "Forgeonix helps small businesses solve technology problems through custom software, automation, websites, and IT support.",
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
