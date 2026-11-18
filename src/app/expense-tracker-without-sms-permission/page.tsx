import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, FaqList, PageIntro, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/Blocks";
import PhoneShot from "@/components/Phone";
import { BLOCKED_PERMISSIONS, CHAT_EXAMPLES, PERMISSIONS } from "@/lib/content";
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

const PATH = "expense-tracker-without-sms-permission";
const TITLE = "Expense Tracker Without SMS Permission (Android)";
const DESCRIPTION =
  "Sable is an expense tracker app for Android that never asks to read your SMS or log in to your bank. How it gets your spending instead, and the cost.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const WAYS: { way: string; sees: string; effort: string; sable: boolean }[] = [
  {
    way: "Reads your SMS",
    sees: "Every message in your inbox, not only bank alerts. That includes one-time passwords and personal messages.",
    effort: "None after you grant the permission.",
    sable: false,
  },
  {
    way: "Links to your bank account",
    sees: "Your account history, fetched from the bank with your login or consent.",
    effort: "A one-time link, renewed from time to time.",
    sable: false,
  },
  {
    way: "You tell it, or import a file",
    sees: "Only what you type and the files you pick.",
    effort: "A few words when you spend, or one statement import a month.",
    sable: true,
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Can an expense tracker work without SMS permission?",
    a: "Yes. An app only needs SMS access if it wants to log your spending by itself from bank alerts. Sable takes the other route: you tell it what happened in a few words, or you import a bank statement or payment screenshots. The SMS permissions are blocked in the build, so the app cannot even ask for them.",
  },
  {
    q: "Does Sable need my bank login or net banking password?",
    a: "No. Sable never connects to a bank. If you want your bank history in it, you download the statement PDF from your bank yourself and import that file.",
  },
  {
    q: "Does Sable work offline?",
    a: "Yes, for everything except the AI features. Adding money, the common chat phrases, people and loans, accounts, analytics, search, the PDF report and backup all run on the phone with no internet. Importing a file and AI answers need the internet and your own OpenAI key.",
  },
  {
    q: "Is anything uploaded when I import a statement?",
    a: "Yes, and you should know it before you do: the file you pick is sent to OpenAI to be read, using your own OpenAI key. It goes from your phone to OpenAI and does not pass through me. If you do not want that, add entries by hand or in chat, which stays on the phone.",
  },
];

export default function NoSmsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION, shots: [SHOTS.chat] }),
          breadcrumbJsonLd([{ name: "Expense tracker without SMS permission", path: PATH }]),
          faqPageJsonLd(FAQ),
        ]}
      />
      <Breadcrumbs trail={[{ name: "Without SMS permission" }]} />
      <PageIntro
        title="An expense tracker that never asks to read your SMS"
        lead="Many expense tracker apps in India fill themselves in by reading your bank alerts. Sable does not. This page explains what that choice costs you, what you get for it, and how to check it yourself."
      >
        <PrimaryLink href="/early-access/">Ask for early access</PrimaryLink>
        <SecondaryLink href="/your-data/">What leaves the phone</SecondaryLink>
      </PageIntro>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Three ways an app can learn what you spent" lead="Every expense tracker uses one of these. Each has a price, paid either in access or in effort." />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line text-sm text-ink-mute">
                  <th scope="col" className="w-[24%] py-3 pr-5 font-medium">How it gets your spending</th>
                  <th scope="col" className="py-3 pr-5 font-medium">What the app can see</th>
                  <th scope="col" className="w-[28%] py-3 font-medium">Effort for you</th>
                </tr>
              </thead>
              <tbody>
                {WAYS.map((w) => (
                  <tr key={w.way} className={`border-b border-line/70 align-top ${w.sable ? "bg-cyan/[0.06]" : ""}`}>
                    <th scope="row" className="py-4 pl-3 pr-5 font-semibold text-ink">
                      {w.way}
                      {w.sable && <span className="mt-1 block font-mono text-[12px] font-normal text-cyan">This is Sable</span>}
                    </th>
                    <td className="py-4 pr-5 leading-relaxed text-ink-soft">{w.sees}</td>
                    <td className="py-4 pr-3 leading-relaxed text-ink-soft">{w.effort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading title="What Sable does instead" lead="Three ways to add money, none of which read anything you did not hand over." />
            <ol className="mt-8 space-y-6">
              <li className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold text-ink">1. Tell it in a few words</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  Type the way you would say it, such as {CHAT_EXAMPLES.slice(0, 3).map((e, i) => (
                    <span key={e.say}>
                      {i > 0 && (i === 2 ? " or " : ", ")}
                      <span className="font-mono text-[14px] text-ink">{e.say}</span>
                    </span>
                  ))}
                  . Sable shows a card with what it will save, and saves nothing until you confirm. These phrases are understood on the phone itself.
                </p>
              </li>
              <li className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold text-ink">2. Import your bank statement</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  Download the statement PDF from your bank and give it to Sable once a month. It reads every debit and credit, skips what you already have, and shows you the rows before saving.
                </p>
              </li>
              <li className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold text-ink">3. Import payment screenshots</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  Pick several screenshots of your Google Pay, PhonePe or bank history at once. Useful for UPI payments that you want in before the statement arrives.
                </p>
              </li>
            </ol>
          </div>
          <PhoneShot shot={SHOTS.chat} />
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="The honest trade-off" />
          <div className="prose-sable">
            <p>
              <strong>Sable will not log a payment by itself.</strong> An app that reads SMS catches every card swipe without you lifting a finger. With Sable you either say it when it happens or import a statement later. If you want zero effort, an SMS-reading app will suit you better.
            </p>
            <p>
              <strong>Importing a file is not offline.</strong> Reading a statement or screenshot is done by OpenAI&apos;s model, so the file you pick is sent to OpenAI with your own key. Typing and chat phrases stay on the phone. The <Link href="/your-data/">Your data</Link> page lists every case.
            </p>
            <p>
              <strong>What you get in return</strong> is an app that cannot read your one-time passwords, your personal messages or your bank login, because it never has access to any of them.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid gap-12 py-14 sm:py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Check it yourself</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              On your phone, open Settings, then Apps, then Sable, then Permissions. You will find Camera and Notifications, and no entry for SMS, microphone or storage. What the app uses:
            </p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {PERMISSIONS.map((p) => (
                <li key={p.name} className="py-3.5">
                  <span className="font-semibold text-ink">{p.name}.</span> <span className="text-ink-soft">{p.why}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Blocked in the build</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">These permissions are switched off in the app&apos;s configuration, so Android will never show a prompt for them:</p>
            <ul className="mt-4 space-y-2">
              {BLOCKED_PERMISSIONS.map((p) => (
                <li key={p} className="flex gap-2.5 text-ink-soft">
                  <i aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-bad" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Questions about SMS, bank login and offline use" />
          <div className="mt-8 max-w-[76ch]">
            <FaqList items={FAQ} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
