export type Route = { path: string; title: string; priority: number; summary: string };

/** Every indexable page. The sitemap, llms.txt and the build check all read this list.
    /early-access/ is a form-only page: it is noindex and stays out of this list on purpose. */
export const ROUTES: Route[] = [
  { path: "", title: "Sable home", priority: 1, summary: "what Sable does, its limits, and common questions" },
  { path: "features", title: "Features", priority: 0.9, summary: "every feature: adding money, people and loans, reports, backup" },
  { path: "your-data", title: "Your data", priority: 0.9, summary: "where records are kept, what is sent to OpenAI and when, permissions" },
  { path: "expense-tracker-without-sms-permission", title: "Expense tracker without SMS permission", priority: 0.9, summary: "why Sable never reads SMS, what it does instead, and the trade-off" },
  { path: "udhar-loan-tracker", title: "Udhar and loan tracker", priority: 0.9, summary: "tracking money lent and borrowed, settling up, and EMIs" },
  { path: "about", title: "About Sable", priority: 0.5, summary: "who makes it, why, and its current status" },
  { path: "contact", title: "Contact", priority: 0.5, summary: "email and WhatsApp" },
  { path: "privacy", title: "Privacy notice", priority: 0.2, summary: "what this website and the app collect" },
  { path: "terms", title: "Terms of use", priority: 0.2, summary: "terms for the website and the test builds" },
];
