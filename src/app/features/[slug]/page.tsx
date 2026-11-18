import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, FaqList, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/Blocks";
import PhoneShot from "@/components/Phone";
import { FEATURE_BY_SLUG, FEATURE_PAGES } from "@/lib/features";
import { breadcrumbJsonLd, canonicalUrl, faqPageJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { PRODUCT } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURE_PAGES.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const f = FEATURE_BY_SLUG[params.slug];
  if (!f) return {};
  return pageMetadata({ title: `${f.title} | ${PRODUCT}`, description: f.description, path: `features/${f.slug}`, absoluteTitle: true });
}

const KEY_LABEL = { no: "No AI key needed", optional: "AI key optional", yes: "Needs your OpenAI key" } as const;
const KEY_TONE = { no: "text-good", optional: "text-cyan", yes: "text-warn" } as const;

/** The steps as a HowTo, built from the same array the page renders. */
function howToJsonLd(name: string, path: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    url: canonicalUrl(path),
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
  };
}

export default function FeaturePageView({ params }: { params: { slug: string } }) {
  const f = FEATURE_BY_SLUG[params.slug];
  if (!f) notFound();
  const path = `features/${f.slug}`;
  const related = f.related.map((s) => FEATURE_BY_SLUG[s]).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path, name: f.title, description: f.description, shots: f.shot ? [f.shot] : [] }),
          breadcrumbJsonLd([
            { name: "Features", path: "features" },
            { name: f.name, path },
          ]),
          howToJsonLd(f.h1, path, f.steps),
          faqPageJsonLd(f.faq),
        ]}
      />
      <Breadcrumbs trail={[{ name: "Features", href: "/features/" }, { name: f.name }]} />

      <Container className="grid items-start gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-navy-card px-3 py-1.5 font-mono text-[12.5px]">
            <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            <span className={KEY_TONE[f.needsKey]}>{KEY_LABEL[f.needsKey]}</span>
          </p>
          <h1 className="mt-6 max-w-[20ch] text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">{f.h1}</h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-soft">{f.lead}</p>
          <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-mute">Where in the app</dt>
              <dd className="mt-1.5 leading-relaxed text-ink">{f.where}</dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-mute">AI and internet</dt>
              <dd className="mt-1.5 leading-relaxed text-ink">{f.keyNote}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryLink href="/early-access/">Ask for early access</PrimaryLink>
            <SecondaryLink href="/features/">All features</SecondaryLink>
          </div>
        </div>
        {f.shot && <PhoneShot shot={f.shot} priority />}
      </Container>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="How to use it" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {f.steps.map((s, i) => (
              <li key={s} className="flex gap-4 rounded-xl border border-line bg-navy-card px-5 py-4">
                <span className="font-mono text-[13px] text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-relaxed text-ink">{s}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {f.sections.map((s) => (
        <section key={s.h} className="border-t border-line">
          <Container className="py-14 sm:py-16">
            <SectionHeading title={s.h} />
            {s.body && <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-ink-soft">{s.body}</p>}
            {s.points && (
              <ul className="mt-6 max-w-[72ch] space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-ink-soft">
                    <i aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      ))}

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="What it does not do yet" lead="Limits, so you know before you try it." />
          <ul className="mt-6 max-w-[72ch] space-y-3">
            {f.limits.map((l) => (
              <li key={l} className="flex gap-3 leading-relaxed text-ink-soft">
                <i aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Questions" />
          <div className="mt-8 max-w-[76ch]">
            <FaqList items={f.faq} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Related features" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/features/${r.slug}/`} className="block h-full rounded-xl border border-line bg-navy-card px-5 py-4 transition-colors hover:border-ink-mute">
                  <span className="font-semibold text-ink">{r.name}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            Money you lent or borrowed, and EMIs, are on the <Link href="/udhar-loan-tracker/" className="text-cyan underline underline-offset-2 hover:text-cyan-soft">udhar and loan tracker</Link> page.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
