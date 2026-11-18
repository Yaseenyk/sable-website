import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, FaqList, PageIntro, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/Blocks";
import PhoneShot from "@/components/Phone";
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

const PATH = "udhar-loan-tracker";
const TITLE = "Udhar and Loan Tracker App: Money Lent, Borrowed, EMIs";
const DESCRIPTION =
  "Track udhar with friends and family in Sable: who owes you, whom you owe, and EMIs with a start and end month. A personal loan tracker app for Android.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, absoluteTitle: true });

const PHRASES: { say: string; does: string }[] = [
  { say: "lent Ramesh 1000", does: "Adds ₹1,000 to You'll get, under Ramesh." },
  { say: "gave 5500 to Satya", does: "Adds ₹5,500 to You'll get, under Satya." },
  { say: "took 500 from Asim", does: "Adds ₹500 to You'll pay, under Asim." },
  { say: "Ramesh paid me back", does: "Finds the open entry for Ramesh and settles it." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Can I use Sable as an udhar khata for friends and family?",
    a: "Yes. That is what the People tab is for. It keeps one list of money people owe you and one list of money you owe, each with a total. It is a personal record: it is built for one person's own money, not for a shop's customers.",
  },
  {
    q: "Does the other person need the app, or get a message?",
    a: "No. Nothing is shared and Sable never messages anyone. The entry is a note for you, kept on your phone.",
  },
  {
    q: "Can Sable track a loan EMI?",
    a: "Yes. When you add an entry you can choose EMI instead of one-time, enter the monthly amount and pick the first and last month. The list then shows the monthly amount and the months it runs between.",
  },
  {
    q: "Does it calculate interest?",
    a: "No. Sable records the amount you enter. For an EMI, enter the monthly instalment your lender charges, which already includes the interest.",
  },
];

export default function UdharPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION, shots: [SHOTS.people] }),
          breadcrumbJsonLd([{ name: "Udhar and loan tracker", path: PATH }]),
          faqPageJsonLd(FAQ),
        ]}
      />
      <Breadcrumbs trail={[{ name: "Udhar and loan tracker" }]} />
      <PageIntro
        title="Keep track of udhar: who owes you, and whom you owe"
        lead="Money lent to a friend is easy to forget and awkward to ask about. Sable keeps it in two plain lists, next to your own spending, so the answer is always one tap away."
      >
        <PrimaryLink href="/early-access/">Ask for early access</PrimaryLink>
        <SecondaryLink href="/features/#people">All People features</SecondaryLink>
      </PageIntro>

      <section className="border-t border-line">
        <Container className="grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading title="Two lists, in your own words" lead="Sable does not say creditor or debtor. It says what you would say." />
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-line pt-4">
                <dt className="text-lg font-semibold text-good">You&apos;ll get</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">Money you lent or paid on someone&apos;s behalf. The total and the number of people sit at the top.</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-lg font-semibold text-warn">You&apos;ll pay</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">Money you borrowed, from a person or as a loan. Kept apart, so you never mix the two up.</dd>
              </div>
            </dl>
            <p className="mt-8 max-w-[60ch] leading-relaxed text-ink-soft">
              Tap any row to change the amount, settle it when the money comes back, or delete it. Settled entries leave the totals.
            </p>
          </div>
          <PhoneShot shot={SHOTS.people} />
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Add it in a few words" lead="You do not have to open a form. Type it in chat, check the card Sable shows, and tap Confirm." />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line text-sm text-ink-mute">
                  <th scope="col" className="py-2.5 pr-4 font-medium">You type</th>
                  <th scope="col" className="py-2.5 font-medium">What happens after you confirm</th>
                </tr>
              </thead>
              <tbody>
                {PHRASES.map((p) => (
                  <tr key={p.say} className="border-b border-line/70">
                    <td className="whitespace-nowrap py-3 pr-4 font-mono text-[14px] text-ink">{p.say}</td>
                    <td className="py-3 text-ink-soft">{p.does}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-[64ch] leading-relaxed text-ink-soft">
            These phrases are understood on the phone itself, with no internet. Amounts can be written as 2k, 1.5 lakh or 1 cr. You can also add an entry from the People tab with the Add button.
          </p>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid gap-12 py-14 sm:py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">EMIs, with a start and an end</h2>
            <div className="prose-sable">
              <p>
                A bike loan or a phone on instalments is not one amount, it is the same amount every month for a while. Choose EMI when you add the entry, enter the monthly instalment, and pick the first and last month from a month grid.
              </p>
              <p>The list shows the monthly amount and the months it runs between, so you can see when each one ends.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">What it does not do</h2>
            <div className="prose-sable">
              <ul>
                <li>It does not send reminders or messages to the other person.</li>
                <li>It does not calculate interest.</li>
                <li>It is not a khata book for a shop: there are no customer accounts, invoices or payment links.</li>
                <li>It does not lend money or offer loans. It only keeps your record.</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Alongside the rest of your money" />
          <div className="prose-sable">
            <p>
              Udhar is one part of the picture. The same app shows what is left this month and where the money went, and it does all of it <Link href="/expense-tracker-without-sms-permission/">without reading your SMS</Link>. Your records are kept in a database on your phone, with no account and no server. See <Link href="/features/">every feature</Link> or read <Link href="/your-data/">how your data is handled</Link>.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Questions about tracking udhar and loans" />
          <div className="mt-8 max-w-[76ch]">
            <FaqList items={FAQ} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
