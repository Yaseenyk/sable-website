// Pages reports http:// until its certificate is issued; the site is HTTPS-only, so canonicals must say https.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://sable.streamerosai.com")
  .replace(/^http:\/\//, "https://")
  .replace(/\/$/, "");

/** Path prefix the site is served under ("" on its own domain). Next adds it to <Link> and its own assets; plain src/href need withBase. */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}

export const HOST = "sable.streamerosai.com";
export const PRODUCT = "Sable";

/** The app's own line, from its splash screen. */
export const SITE_TAGLINE = "AI money, on your terms";

export const SITE_DESCRIPTION =
  "Sable is a personal expense tracker app for India on Android. No SMS access, no bank login: track spending, udhar and EMIs, with records kept on your phone.";

/** Facts about the build, read from the app's own config (app.json, package.json, android/gradle.properties). */
export const APP = {
  version: "1.0.0",
  platform: "Android",
  minAndroid: "Android 7.0 or later",
  status: "In private testing",
  store: "Not on the Play Store",
  currency: "Indian rupees",
} as const;

export const CONTACT = {
  email: "contact@streamerosai.com",
  phone: "8208335028",
  phoneDisplay: "+91 82083 35028",
  phoneHref: "tel:+918208335028",
  whatsapp: "https://wa.me/918208335028",
  city: "Hyderabad",
  country: "India",
} as const;

export const MAKER = {
  name: "Yaseen Khatib",
  url: "https://yk.streamerosai.com",
  // Same @id the portfolio uses, so search engines join the two sites into one entity.
  id: "https://yk.streamerosai.com/#person",
  jobTitle: "Full Stack AI Developer",
  sameAs: ["https://www.linkedin.com/in/yaseen-yk", "https://github.com/Yaseenyk"],
} as const;

/** Search-console verification tokens. Empty strings are left out of the page. */
export const VERIFICATION = {
  google: "OG5PRiRPw3I5jB5p-G7nDzf_mlxdiZzrpLaFYCZ0p1M",
  bing: "",
} as const;

/** Google Analytics and Microsoft Clarity are not set up for this site yet. While these are empty, neither script is loaded
    and the privacy page does not mention them. Fill both, then add the two paragraphs back to src/app/privacy/page.tsx. */
export const ANALYTICS = {
  ga4: "",
  clarity: "",
} as const;
