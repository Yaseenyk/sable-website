import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro } from "@/components/Blocks";
import { STACK } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { APP, CONTACT, MAKER } from "@/lib/site";

const TITLE = "About Sable and Who Makes It";
const DESCRIPTION =
  "Sable is a personal money app for Android, made by Yaseen Khatib in Hyderabad. What it is, where it stands today, and how it is built.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "about", name: TITLE, description: DESCRIPTION }), breadcrumbJsonLd([{ name: "About", path: "about" }])]} />
      <Breadcrumbs trail={[{ name: "About" }]} />
      <PageIntro title="About Sable" lead="Sable is a small personal money app for Android, made by one person. This page says who that is, where the app stands today and how it is built." />
      <Container className="prose-sable pb-16">
        <h2>Who makes it</h2>
        <p>
          I am <a href={MAKER.url} rel="author">{MAKER.name}</a>, a full stack AI developer in {CONTACT.city}, {CONTACT.country}. I design, write and test Sable myself. My other products and the rest of my work are on <a href={MAKER.url}>my portfolio</a>.
        </p>

        <h2>What Sable is for</h2>
        <p>
          Sable answers three questions: what is left this month, who owes whom, and where the money went. You add entries by typing them, by telling Sable in chat, or by importing a bank statement or payment screenshots. It has no categories and no budgets to maintain.
        </p>
        <p>
          It is built for India: rupees and paise, lakh and crore, UPI payment screenshots and Indian bank statements.
        </p>

        <h2>Where it stands today</h2>
        <ul>
          <li>Version {APP.version}, for {APP.minAndroid}. I built the first version in July 2026.</li>
          <li>It is in private testing. It is not on the Play Store and there is no iPhone build.</li>
          <li>There is no price, and nobody is charged for it.</li>
          <li>There are no reviews, ratings or user numbers to quote, so this site does not quote any.</li>
        </ul>
        <p>
          If you would like to try it, <Link href="/early-access/">ask for early access</Link>.
        </p>

        <h2>How it is built</h2>
        <p>The app is written in TypeScript with React Native. Your records are stored in a SQLite database on the phone, and the app has no server of its own.</p>
        <ul>
          {STACK.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p>
          The <Link href="/your-data/">Your data</Link> page lists exactly what the AI features send to OpenAI, and when.
        </p>

        <h2>Not financial advice</h2>
        <p>
          Sable keeps records and adds them up. It does not recommend investments, and nothing on this site or in the app is advice from a registered financial adviser.
        </p>

        <h2>Get in touch</h2>
        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, or use the <Link href="/contact/">contact page</Link>.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}
