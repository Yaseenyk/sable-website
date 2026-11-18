import { BLOCKED_PERMISSIONS, CHAT_EXAMPLES, DATA_FLOWS, FAQS, FEATURE_GROUPS, LIMITS, PERMISSIONS, QUESTIONS, STACK } from "@/lib/content";
import { canonicalUrl } from "@/lib/seo";
import { APP, CONTACT, MAKER, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export const dynamic = "force-static";

// The whole site as plain text, built from the same content the pages render.
export function GET() {
  const parts: string[] = [];

  parts.push(
    `# Sable\n\nURL: ${canonicalUrl("")}\n\n${SITE_TAGLINE}. ${SITE_DESCRIPTION}\n\nStatus: ${APP.status.toLowerCase()}. ${APP.store}. Version ${APP.version}, ${APP.minAndroid}. ${APP.currency} only. Made by ${MAKER.name} (${MAKER.url}), ${CONTACT.city}, ${CONTACT.country}. Contact: ${CONTACT.email}.`,
  );

  parts.push(`# The three questions Sable answers\n\n` + QUESTIONS.map((x) => `## ${x.q}\n${x.a}`).join("\n\n"));

  parts.push(
    `# Telling Sable in chat\n\nEvery message becomes a card that shows what will be saved. Nothing is written until the user taps Confirm.\n\n` +
      CHAT_EXAMPLES.map((e) => `- "${e.say}" becomes: ${e.card}`).join("\n"),
  );

  parts.push(
    `# Features\n\nURL: ${canonicalUrl("features")}\n\n` +
      FEATURE_GROUPS.map((g) => `## ${g.title}\n${g.lead}\n\n` + g.features.map((f) => `### ${f.name}\n${f.summary}\n${f.points.map((p) => `- ${p}`).join("\n")}`).join("\n\n")).join("\n\n"),
  );

  parts.push(
    `# Your data\n\nURL: ${canonicalUrl("your-data")}\n\nEvery record is kept in a SQLite database inside the app, on the phone. There is no account and Sable has no server of its own.\n\n## What leaves the phone, and when\n` +
      DATA_FLOWS.map((r) => `- ${r.when}: ${r.what} Sent to: ${r.to}.`).join("\n") +
      `\n\n## Permissions the app uses\n` +
      PERMISSIONS.map((p) => `- ${p.name}: ${p.why}`).join("\n") +
      `\n\n## Permissions blocked in the build\n` +
      BLOCKED_PERMISSIONS.map((p) => `- ${p}`).join("\n") +
      `\n\nThe OpenAI key is kept in Android's secure storage and is never included in an export file.`,
  );

  parts.push(`# What Sable is not\n\n` + LIMITS.map((l) => `## ${l.title}\n${l.body}`).join("\n\n"));

  parts.push(`# Common questions\n\n` + FAQS.map((f) => `## ${f.q}\n${f.a}`).join("\n\n"));

  parts.push(`# How it is built\n\nURL: ${canonicalUrl("about")}\n\n` + STACK.map((s) => `- ${s}`).join("\n"));

  return new Response(parts.join("\n\n---\n\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
