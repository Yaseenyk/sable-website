import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro, PrimaryLink, SecondaryLink } from "@/components/Blocks";
import PhoneShot from "@/components/Phone";
import { FEATURE_GROUPS } from "@/lib/content";
import { SHOTS } from "@/lib/shots";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = "Sable Features: Expense, Udhar and EMI Tracking";
const DESCRIPTION =
  "Every feature of the Sable expense tracker: add money by hand, in chat or from a bank statement, track udhar and EMIs, and see reports, all on your phone.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "features", absoluteTitle: true });

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "features", name: TITLE, description: DESCRIPTION, shots: [SHOTS.reports, SHOTS.people] }), breadcrumbJsonLd([{ name: "Features", path: "features" }])]} />
      <Breadcrumbs trail={[{ name: "Features" }]} />
      <PageIntro
        title="Everything Sable does"
        lead="Sable has five tabs: Home, People, Reports, Chat and Settings. This page lists every feature behind them, with what each one needs. Features that use AI say so, because those are the only ones that send anything off your phone."
      >
        <PrimaryLink href="/early-access/">Ask for early access</PrimaryLink>
        <SecondaryLink href="/your-data/">How your data is handled</SecondaryLink>
      </PageIntro>

      <Container className="pb-6">
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {FEATURE_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded-full border border-line bg-navy-card px-3.5 py-1.5 text-sm text-ink-soft hover:border-ink-mute hover:text-ink">
              {g.title}
            </a>
          ))}
        </nav>
      </Container>

      {FEATURE_GROUPS.map((g) => (
        <section key={g.id} className="border-t border-line">
          <Container className="py-14 sm:py-16">
            <h2 id={g.id} className="scroll-mt-24 text-3xl font-semibold tracking-tight text-ink">{g.title}</h2>
            <p className="mt-3 max-w-[64ch] text-lg leading-relaxed text-ink-soft">{g.lead}</p>
            <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {g.features.map((f) => (
                <article key={f.name} className="border-t border-line pt-5">
                  <h3 className="text-xl font-semibold text-ink">{f.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{f.summary}</p>
                  <ul className="mt-3 space-y-2">
                    {f.points.map((p) => (
                      <li key={p} className="flex gap-2.5 leading-relaxed text-ink-soft">
                        <i aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-line">
        <Container className="grid gap-10 py-14 sm:grid-cols-2 sm:py-16">
          <PhoneShot shot={SHOTS.reports} />
          <PhoneShot shot={SHOTS.people} />
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14">
          <p className="max-w-[68ch] leading-relaxed text-ink-soft">
            Looking for something that is not here? Sable does not read SMS, does not connect to your bank, and has no budgets or categories. The{" "}
            <Link href="/#questions" className="text-cyan underline underline-offset-2 hover:text-cyan-soft">common questions</Link> cover the rest.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
