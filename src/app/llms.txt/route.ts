import { FAQS, FEATURE_GROUPS, LIMITS } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { canonicalUrl } from "@/lib/seo";
import { APP, CONTACT, MAKER, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// llmstxt.org format: a short, link-rich map of the site for AI answer engines.
export function GET() {
  const body = `# Sable

> ${SITE_DESCRIPTION} Made by ${MAKER.name} (${MAKER.url}) in ${CONTACT.city}, ${CONTACT.country}. Contact: ${CONTACT.email}.

Key facts:
- Status: ${APP.status.toLowerCase()}. ${APP.store}. Version ${APP.version}, ${APP.minAndroid}. No iPhone build. No price yet.
- Records are stored in a SQLite database on the phone. There is no account, no sign-up and no Sable server.
- Sable does not read SMS and does not connect to a bank. Entries are typed, told in chat, or imported from a file the user picks.
- AI features use the user's own OpenAI key. Without a key, nothing leaves the phone and file import is unavailable.
- Chat turns a message such as "lent Ramesh 1000" into a card; nothing is saved until the user confirms.
- It works in Indian rupees only. It is not financial advice.

## Pages
${ROUTES.map((r) => `- [${r.title}](${canonicalUrl(r.path)}): ${r.summary}`).join("\n")}

## Features
${FEATURE_GROUPS.map((g) => `- ${g.title}: ${g.features.map((f) => f.name).join(", ")} (${canonicalUrl("features")}#${g.id})`).join("\n")}

## Limits
${LIMITS.map((l) => `- ${l.title}: ${l.body}`).join("\n")}

## Common questions
${FAQS.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Optional
- [Full text for AI](${SITE_URL}/llms-full.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
