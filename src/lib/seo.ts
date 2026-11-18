import type { Metadata } from "next";
import { FEATURE_GROUPS } from "@/lib/content";
import { ALL_SHOTS, type Shot } from "@/lib/shots";
import { APP, CONTACT, MAKER, PRODUCT, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRODUCT_ID = `${SITE_URL}/#product`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const personRef = { "@id": MAKER.id };

const DESCRIPTION_MAX = 155;
const DESCRIPTION_MIN = 110;

/** Absolute, slash-terminated URL so canonicals never point at a redirect. */
export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

/** First sentences of a summary, inside the search-snippet limit. */
export function seoDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= DESCRIPTION_MAX) return clean;
  const cut = clean.slice(0, DESCRIPTION_MAX);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
  if (lastStop >= DESCRIPTION_MIN) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

/** The share card (1200x630). One card for the whole site, made by scripts/make-images.py. */
export function shareImage(alt: string) {
  return { url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt };
}

export const OG_ALT = "Sable: a personal money app for Android that keeps every record on your phone";

/** Per-page metadata: canonical, Open Graph and Twitter all from one call. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  /** Form-only pages stay out of search and out of the sitemap. */
  noindex?: boolean;
}): Metadata {
  const desc = seoDescription(description);
  const url = canonicalUrl(path);
  const og = shareImage(OG_ALT);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: { type: "website", title, description: desc, url, siteName: PRODUCT, images: [og] },
    twitter: { card: "summary_large_image", title, description: desc, images: [og] },
  };
}

const imageObject = (s: Shot) => ({
  "@type": "ImageObject",
  contentUrl: `${SITE_URL}${s.src}`,
  url: `${SITE_URL}${s.src}`,
  width: s.width,
  height: s.height,
  caption: s.caption,
  description: s.alt,
});

/** A page about the product, with any app screens on it as ImageObjects (image search and AI answers). */
export function webPageJsonLd({ path, name, description, shots = [] }: { path: string; name: string; description: string; shots?: Shot[] }) {
  const images = shots.map(imageObject);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl(path)}#webpage`,
    url: canonicalUrl(path),
    name,
    description: seoDescription(description),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PRODUCT_ID },
    author: personRef,
    inLanguage: "en",
    ...(images.length ? { primaryImageOfPage: images[0], image: images } : {}),
  };
}

/** Sitewide entity graph, emitted once in the root layout. */
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": MAKER.id,
      name: MAKER.name,
      jobTitle: MAKER.jobTitle,
      url: MAKER.url,
      email: `mailto:${CONTACT.email}`,
      sameAs: MAKER.sameAs,
      address: { "@type": "PostalAddress", addressLocality: CONTACT.city, addressCountry: CONTACT.country },
    },
    {
      // The brand: its logo is what search engines show next to results.
      "@type": "Organization",
      "@id": ORG_ID,
      name: PRODUCT,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
      image: `${SITE_URL}/og.png`,
      description: SITE_DESCRIPTION,
      founder: personRef,
      email: CONTACT.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT.email,
        availableLanguage: ["English"],
        url: canonicalUrl("contact"),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: PRODUCT,
      description: SITE_DESCRIPTION,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      // No offer, price or rating: the app is in private testing and none of those exist yet.
      "@type": "SoftwareApplication",
      "@id": PRODUCT_ID,
      name: PRODUCT,
      url: `${SITE_URL}/`,
      applicationCategory: "FinanceApplication",
      applicationSubCategory: "Personal finance tracker",
      operatingSystem: APP.platform,
      softwareVersion: APP.version,
      description: SITE_DESCRIPTION,
      author: personRef,
      publisher: { "@id": ORG_ID },
      image: `${SITE_URL}/og.png`,
      screenshot: ALL_SHOTS.map(imageObject),
      inLanguage: "en",
      featureList: FEATURE_GROUPS.flatMap((g) => g.features.map((f) => f.name)),
    },
  ],
};

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const crumbs = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

/** Built from the same array the page renders, so markup and visible text never drift. */
export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
