/**
 * SEO constants + JSON-LD builders. Single source of truth for the canonical
 * host and structured data.
 *
 * Rules (per SEO strategy): canonical host is www.forgeonix.dev; local business
 * uses a SERVICE-AREA model (city + region, no street address); only factual
 * data already present in the project is used — no fake coordinates, reviews,
 * ratings, founding dates, awards, employees, or address.
 */

export const SITE = {
  url: "https://www.forgeonix.dev",
  name: "Forgeonix",
  email: "ethan@forgeonix.dev",
  logo: "https://www.forgeonix.dev/forgeonix-mark.png",
  locality: "Richmond",
  region: "KY",
  country: "US",
  sameAs: [
    "https://www.linkedin.com/in/ethan-edwards-948934187/",
    "https://www.facebook.com/profile.php?id=61590915625742",
  ],
} as const;

/**
 * Per-page metadata helper — produces a unique canonical + page-specific
 * OpenGraph/Twitter block so interior pages don't inherit the homepage's social
 * card. `title` is the bare page title (the layout template adds "| Forgeonix"
 * to the document <title>); OG/Twitter use the fully-branded form.
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
}): import("next").Metadata {
  const url = `${SITE.url}${opts.path === "/" ? "/" : opts.path}`;
  const branded = `${opts.title} | Forgeonix`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: branded,
      description: opts.description,
      url,
      siteName: "Forgeonix",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: branded,
      description: opts.description,
    },
  };
}

const ORG_ID = `${SITE.url}/#organization`;
const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** Sitewide identity graph — rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        url: `${SITE.url}/`,
        email: SITE.email,
        logo: { "@type": "ImageObject", url: SITE.logo },
        sameAs: [...SITE.sameAs],
        founder: {
          "@type": "Person",
          name: "Ethan Edwards",
          sameAs: ["https://www.linkedin.com/in/ethan-edwards-948934187/"],
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: SITE.name,
        url: `${SITE.url}/`,
        email: SITE.email,
        image: SITE.logo,
        parentOrganization: { "@id": ORG_ID },
        // Service-area model: city + region only, deliberately no streetAddress.
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.locality,
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        areaServed: [
          { "@type": "City", name: "Richmond, Kentucky" },
          { "@type": "City", name: "Lexington, Kentucky" },
          { "@type": "State", name: "Kentucky" },
        ],
        serviceType: [
          "Custom software development",
          "Custom CRM systems",
          "Business automation",
          "Website development",
          "IT support",
          "Technology consulting",
        ],
        knowsAbout: [
          "Custom software",
          "CRM systems",
          "Business automation",
          "Small business websites",
          "IT support",
          "Technology infrastructure",
        ],
        sameAs: [...SITE.sameAs],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE.url}/`,
        name: SITE.name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList for an interior page. `path` is root-relative (e.g. "/work"). */
export function breadcrumb(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === "/" ? "/" : it.path}`,
    })),
  };
}

/** Service entities — only use where the page genuinely describes the service. */
export function services(list: { name: string; description: string }[]) {
  return list.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: "Richmond, Kentucky" },
      { "@type": "City", name: "Lexington, Kentucky" },
      { "@type": "State", name: "Kentucky" },
    ],
  }));
}

/** Case-study / project schema. Only factual fields — no fabricated dates. */
export function caseStudy(input: {
  name: string;
  description: string;
  about: string;
  slug: string;
  features: string[];
  liveUrl?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    about: input.about,
    url: `${SITE.url}/work/${input.slug}`,
    creator: { "@id": ORG_ID },
    keywords: input.features.join(", "),
    inLanguage: "en-US",
  };
  if (input.liveUrl) data.sameAs = [input.liveUrl];
  return data;
}
