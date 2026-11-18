import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import LeadForm from "@/components/LeadForm";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { CONTACT, MAKER } from "@/lib/site";

const TITLE = "Contact the Maker of Sable";
const DESCRIPTION = "Questions about the Sable app, a problem with this website, or a privacy request: reach Yaseen Khatib by email, WhatsApp or the form on this page.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "contact", name: TITLE, description: DESCRIPTION }), breadcrumbJsonLd([{ name: "Contact", path: "contact" }])]} />
      <Breadcrumbs trail={[{ name: "Contact" }]} />
      <PageIntro title="Contact" lead={`Sable is made by one person, ${MAKER.name}, so your message comes straight to me.`} />
      <Container className="grid gap-12 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-ink">Email</h2>
            <p className="mt-2 text-ink-soft">
              <a href={`mailto:${CONTACT.email}`} className="text-cyan underline underline-offset-2 hover:text-cyan-soft">{CONTACT.email}</a>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">WhatsApp</h2>
            <p className="mt-2 text-ink-soft">
              <a href={CONTACT.whatsapp} rel="noopener noreferrer" target="_blank" className="text-cyan underline underline-offset-2 hover:text-cyan-soft">{CONTACT.phoneDisplay}</a>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Good reasons to write</h2>
            <ul className="mt-3 space-y-2 leading-relaxed text-ink-soft">
              <li>A question about what Sable does or how it handles your data.</li>
              <li>Something on this website that is wrong or broken.</li>
              <li>A request to see or delete what you sent through a form here.</li>
            </ul>
          </div>
          <p className="leading-relaxed text-ink-mute">Based in {CONTACT.city}, {CONTACT.country}. Please do not send bank details, statements or passwords.</p>
        </div>
        <div className="rounded-2xl border border-line bg-navy-card p-6 sm:p-8">
          <h2 className="mb-5 text-lg font-semibold text-ink">Send a message</h2>
          <LeadForm intent="question" />
        </div>
      </Container>
    </>
  );
}
