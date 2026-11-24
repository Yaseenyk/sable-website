import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Container, CtaBand, DataTable, FaqList, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/Blocks";
import PhoneShot from "@/components/Phone";
import { CHAT_EXAMPLES, FAQS, LIMITS, QUESTIONS } from "@/lib/content";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { ALL_SHOTS, SHOTS } from "@/lib/shots";
import { APP, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

const KIND_TONE: Record<string, string> = { in: "text-good", out: "text-ink", get: "text-good", pay: "text-warn", settle: "text-cyan" };

const IMPORTS: { name: string; body: string }[] = [
  { name: "Bank statement PDF", body: "Every debit and credit, read a few pages at a time so a long statement does not fail half way. It can save the closing balance to your account too." },
  { name: "Payment screenshots", body: "Pick many at once from Google Pay, PhonePe or your bank app. Entries you already have are skipped." },
  { name: "Salary slips", body: "The net pay and the pay period, added to a running total of what you have earned." },
  { name: "A photo", body: "Point the camera at a receipt, a payment screen or an EMI schedule." },
];

const REPORTS: { name: string; body: string }[] = [
  { name: "Accounts and balances", body: "A balance for each account, and what you have in total." },
  { name: "Analytics", body: "Where it went, money in and out, month by month." },
  { name: "Search", body: "Every entry for a person, a shop or a note." },
  { name: "Earnings", body: "What your salary slips add up to." },
  { name: "PDF report", body: "A day, a week, a month or everything, ready to share." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "", name: "Sable: personal expense tracker app for India", description: SITE_DESCRIPTION, shots: ALL_SHOTS }), faqPageJsonLd(FAQS)]} />

      {/* Hero. Most visitors never scroll, so the first screen says what Sable is (eyebrow and first sentence)
          and stays short enough on a phone for the top of the app screen to show below the buttons. */}
      <section>
        <Container className="grid items-center gap-8 pb-14 pt-7 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-navy-card px-3 py-1.5 text-[13px] text-ink-soft sm:font-mono sm:text-[12.5px]">
              <i className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
              Expense tracker for {APP.platform} · {APP.status.toLowerCase()}
            </p>
            <h1 className="mt-4 max-w-[17ch] text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-ink sm:mt-6 sm:text-5xl lg:text-[3.5rem]">
              Know what is left this month, and <span className="sable-text">who owes whom</span>
            </h1>
            <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              Sable is a personal expense tracker app for India. Say what happened in plain words, or hand it a bank statement, and it keeps the record on your phone. It never asks to read your SMS, and there is no account, no sign-up and no server of mine.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <PrimaryLink href="/early-access/">Ask for early access</PrimaryLink>
              <SecondaryLink href="/your-data/">How your data is handled</SecondaryLink>
            </div>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-ink-mute sm:mt-5">
              {APP.store}. Version {APP.version}, for {APP.minAndroid}. Rupees only.
            </p>
            <p className="mt-5 hidden lg:block">
              <a href="#what-it-does" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cyan hover:text-cyan-soft">
                See what it does <span aria-hidden="true">↓</span>
              </a>
            </p>
          </div>
          <PhoneShot shot={SHOTS.home} priority className="max-w-[270px] lg:max-w-[260px]" />
        </Container>
      </section>

      {/* Three questions */}
      <section id="what-it-does" className="scroll-mt-16 border-t border-line">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={SITE_TAGLINE} title="Three questions, answered on one phone" lead="Sable is deliberately small. It does not ask you to sort your life into categories. It answers three plain questions." />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {QUESTIONS.map((x, i) => (
              <div key={x.q} className="border-t border-line pt-5">
                <p className="font-mono text-[12.5px] text-cyan">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{x.q}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{x.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Chat */}
      <section className="border-t border-line">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 lg:order-1">
            <PhoneShot shot={SHOTS.chat} />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Tell Sable" title="Type it the way you would say it" lead="Every message becomes a card that says exactly what will be saved. Nothing is written until you tap Confirm." />
            <div className="mt-8">
              <DataTable
                head={["You type", "Sable shows, for you to confirm"]}
                rows={CHAT_EXAMPLES.map((e) => ({
                  key: e.say,
                  cells: [<span key="say" className="font-mono text-[14px] font-normal">{e.say}</span>, <span key="card" className={KIND_TONE[e.kind]}>{e.card}</span>],
                }))}
              />
            </div>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-ink-soft">
              These phrases are understood on the phone itself, and amounts can be written as 2k, 1.5 lakh or 1 cr. Add your own OpenAI key and Sable also copes with typos and looser wording, and can answer questions such as how much you earned this month.
            </p>
          </div>
        </Container>
      </section>

      {/* People */}
      <section className="border-t border-line">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading eyebrow="People" title="Money between you and other people" lead="Most money apps stop at your own spending. Sable keeps two more lists, in the words you would use yourself." />
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-line pt-4">
                <dt className="text-lg font-semibold text-good">You&apos;ll get</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">Money people owe you, with a total at the top. Mark it settled when it comes back, from the list or by telling Sable.</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-lg font-semibold text-warn">You&apos;ll pay</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">Money you owe, as a one-time amount or as an EMI with a first and last month picked from a month grid.</dd>
              </div>
            </dl>
            <p className="mt-8">
              <Link href="/udhar-loan-tracker/" className="font-semibold text-cyan underline underline-offset-4 hover:text-cyan-soft">How Sable tracks udhar, loans and EMIs</Link>
            </p>
          </div>
          <PhoneShot shot={SHOTS.people} />
        </Container>
      </section>

      {/* Import */}
      <section className="border-t border-line">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Import" title="Hand it the paperwork" lead="You should not have to type six months of history. Give Sable the file and approve the rows it finds." />
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {IMPORTS.map((x) => (
              <div key={x.name} className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold text-ink">{x.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{x.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[68ch] rounded-xl border border-line bg-navy-card px-5 py-4 leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">Reading a file needs your own OpenAI key.</strong> The reading is done by OpenAI&apos;s model, so the file you pick is sent to OpenAI with your key. Sable shows you the rows before anything is saved.{" "}
            <Link href="/your-data/" className="text-cyan underline underline-offset-2 hover:text-cyan-soft">See exactly what is sent</Link>.
          </p>
        </Container>
      </section>

      {/* Reports */}
      <section className="border-t border-line">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 lg:order-1">
            <PhoneShot shot={SHOTS.analytics} />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Reports" title="One tab for every view of your money" lead="The same records, added up five ways." />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {REPORTS.map((r) => (
                <li key={r.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="shrink-0 font-semibold text-ink sm:w-52">{r.name}</span>
                  <span className="leading-relaxed text-ink-soft">{r.body}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/features/" className="font-semibold text-cyan underline underline-offset-4 hover:text-cyan-soft">See every feature</Link>
            </p>
          </div>
        </Container>
      </section>

      {/* Your data */}
      <section className="border-t border-line">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Private by design" title="Your records stay on your phone" lead="Sable never asks for your bank login or your messages. It works from what you type and the files you choose." />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="border-t border-line pt-5">
              <h3 className="text-lg font-semibold text-ink">No account, no server</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">The records live in a database on the phone. There is nothing to sign up for, and I have no copy of your entries.</p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="text-lg font-semibold text-ink">AI only with your own key</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">Without an OpenAI key, nothing leaves the phone. With one, only what each AI feature needs is sent, straight from your phone to OpenAI.</p>
            </div>
            <div className="border-t border-line pt-5">
              <h3 className="text-lg font-semibold text-ink">Yours to take away</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">Export everything to one file and import it on another phone. Your key is never put in that file.</p>
            </div>
          </div>
          <p className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <Link href="/your-data/" className="font-semibold text-cyan underline underline-offset-4 hover:text-cyan-soft">Read what leaves the phone, and when</Link>
            <Link href="/expense-tracker-without-sms-permission/" className="font-semibold text-cyan underline underline-offset-4 hover:text-cyan-soft">Why Sable works without SMS permission</Link>
          </p>
        </Container>
      </section>

      {/* Limits */}
      <section className="border-t border-line">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Honest limits" title="What Sable is not" lead="It is an early product made by one person. Here is what it does not do, so you can decide before you ask for it." />
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {LIMITS.map((l) => (
              <div key={l.title} className="border-t border-line pt-5">
                <dt className="text-lg font-semibold text-ink">{l.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{l.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <Container className="py-16 sm:py-20">
          <SectionHeading id="questions" title="Common questions" />
          <div className="mt-8 max-w-[76ch]">
            <FaqList items={FAQS} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
