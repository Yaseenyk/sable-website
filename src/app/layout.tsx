import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { OG_ALT, shareImage, siteGraphJsonLd } from "@/lib/seo";
import { ANALYTICS, HOST, MAKER, PRODUCT, SITE_DESCRIPTION, SITE_URL, VERIFICATION } from "@/lib/site";

const TITLE = "Sable: Personal Expense Tracker App for India, No SMS Access";

const other: Record<string, string> = {};
if (VERIFICATION.bing) other["msvalidate.01"] = VERIFICATION.bing;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${PRODUCT}` },
  description: SITE_DESCRIPTION,
  applicationName: PRODUCT,
  keywords: [
    "personal expense tracker app India",
    "expense tracker app",
    "expense manager app India",
    "expense tracker without SMS permission",
    "expense tracker no bank login",
    "offline expense tracker",
    "udhar tracker app",
    "loan tracker app",
    "EMI tracker app",
    "app to track money lent to friends",
    "money manager app India",
    "daily expense tracker app",
  ],
  authors: [{ name: MAKER.name, url: MAKER.url }],
  creator: MAKER.name,
  alternates: { canonical: `${SITE_URL}/`, types: { "text/plain": `${SITE_URL}/llms.txt` } },
  openGraph: {
    type: "website",
    siteName: PRODUCT,
    locale: "en_IN",
    url: `${SITE_URL}/`,
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [shareImage(OG_ALT)],
  },
  twitter: { card: "summary_large_image", images: [shareImage(OG_ALT)] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#070b16", colorScheme: "dark", width: "device-width", initialScale: 1 };

// Google Analytics and Microsoft Clarity load only when their ids are set in src/lib/site.ts (they are empty today, so
// neither script is on the page). Same loader as the sibling sites: nothing on localhost, and the third-party files
// are fetched once, on the first interaction or a few seconds after load.
const gaBoot = (id: string) =>
  `(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search)){window.gaEvent=function(){};window.gtag=function(){};return}var w=window;w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=gtag;gtag('js',new Date());gtag('config','${id}');w.gaEvent=function(n,p){try{p=p||{};p.cta_page=p.cta_page||location.pathname;gtag('event',n,p)}catch(e){}};})();`;
const thirdPartyLoader = (ga: string, clarity: string) =>
  `(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search))return;var w=window,d=document,done=false;function go(){if(done)return;done=true;${
    ga ? `var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${ga}';d.head.appendChild(s);` : ""
  }${
    clarity
      ? `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(w,d,'clarity','script','${clarity}');`
      : ""
  }}['pointerdown','keydown','scroll','touchstart'].forEach(function(e){w.addEventListener(e,go,{once:true,passive:true})});function onLoad(){setTimeout(go,4000)}if(d.readyState==='complete')onLoad();else w.addEventListener('load',onLoad,{once:true})})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {ANALYTICS.ga4 && <script dangerouslySetInnerHTML={{ __html: gaBoot(ANALYTICS.ga4) }} />}
        {(ANALYTICS.ga4 || ANALYTICS.clarity) && <script dangerouslySetInnerHTML={{ __html: thirdPartyLoader(ANALYTICS.ga4, ANALYTICS.clarity) }} />}
        {/* First-party visit counter (the owner's own Cloudflare Worker): no cookies, no stored address. Off on the form pages. */}
        <script defer src="https://pulse.yaseenyk.workers.dev/p.js" data-site={HOST} data-exclude="/contact,/early-access"></script>
      </head>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy-card focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <JsonLd data={siteGraphJsonLd} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
