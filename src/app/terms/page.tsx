import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

const TITLE = "Terms of Use for the Sable Website";
const DESCRIPTION =
  "The terms for using the Sable website and its test builds: information only, an early product provided as it is, your records are yours, and no financial advice.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "terms" });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "terms", name: TITLE, description: DESCRIPTION }), breadcrumbJsonLd([{ name: "Terms", path: "terms" }])]} />
      <Breadcrumbs trail={[{ name: "Terms" }]} />
      <PageIntro title="Terms of use" lead="These terms cover this website and any test build of the Sable app that I send you. They are written to be read." />
      <Container className="prose-sable pb-20">
        <h2>Information on this site</h2>
        <p>
          This site describes Sable, an early product in private testing. It is general information. Features described here can change, and the site says where something has a limit. Nothing here is an offer that binds anyone.
        </p>

        <h2>Not financial advice</h2>
        <p>
          Sable keeps records of your money and adds them up. Neither the app nor this site gives investment, tax, legal or accounting advice, and any note the app writes is for your own information. Decisions about your money remain yours.
        </p>

        <h2>Test builds</h2>
        <p>
          A test build is provided as it is, with no warranty, to people who asked for it. It can contain mistakes, including in how it reads a statement or screenshot, so check the rows before you save them and check totals that matter against your bank&apos;s own record. Please do not pass a build on or publish it.
        </p>

        <h2>Your records and your key</h2>
        <p>
          Your records are stored on your phone and are your responsibility to keep: the app can export them to a file, and you should do that before changing or resetting a phone. If you add an OpenAI key, your use of OpenAI is under OpenAI&apos;s terms and is billed to you by OpenAI. The <Link href="/your-data/">Your data</Link> page explains what is sent.
        </p>

        <h2>Your messages</h2>
        <p>
          If you send a form on this site, you agree that I may use what you typed to reply to you. Please do not put bank details, statements, passwords or other people&apos;s personal data in a message. The <Link href="/privacy/">privacy notice</Link> explains how it is handled.
        </p>

        <h2>Content and reuse</h2>
        <p>
          The text and design of this site are mine. You may quote short passages with a link back; please do not copy whole pages. The app screens shown on this site are real screens with sample entries typed in for the purpose, not anyone&apos;s real money.
        </p>

        <h2>Links and advertising</h2>
        <p>The site may link to other websites that I do not control. It shows no ads.</p>

        <h2>Liability and changes</h2>
        <p>
          The site and the test builds are provided as they are. To the extent the law allows, I am not liable for loss that comes from relying on them. I may update these terms, and the date below shows the latest version. Questions: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <p>Last updated 19 November 2026.</p>
      </Container>
    </>
  );
}
