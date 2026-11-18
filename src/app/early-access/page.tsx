import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import LeadForm from "@/components/LeadForm";
import { pageMetadata } from "@/lib/seo";
import { APP } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Ask for early access",
  description: "Sable is in private testing on Android and is not on the Play Store. Send a short request and the maker will reply by email.",
  path: "early-access",
  noindex: true,
});

export default function EarlyAccessPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Early access" }]} />
      <PageIntro
        title="Ask for early access"
        lead="Sable is in private testing, so there is no public download and it is not on the Play Store. Send a request and it lands in my inbox. I reply by email."
      />
      <Container className="grid gap-12 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-line bg-navy-card p-6 sm:p-8">
          <LeadForm intent="early-access" />
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-ink">Before you ask</h2>
            <ul className="mt-3 space-y-2.5 leading-relaxed text-ink-soft">
              <li>It runs on {APP.minAndroid}. There is no iPhone build.</li>
              <li>It works in {APP.currency.toLowerCase()} only.</li>
              <li>Importing files needs your own OpenAI key. Everything else works without one.</li>
              <li>It is an early version made by one person, so expect rough edges.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">What I do with this form</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Your name, email and message are sent to my inbox so I can reply. They are not added to a mailing list and are not shared.
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
