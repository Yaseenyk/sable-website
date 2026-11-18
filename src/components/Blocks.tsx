import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Page header for inner pages: one h1, a plain-language lead, optional actions. */
export function PageIntro({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <Container className="pb-10 pt-12 sm:pt-16">
      <h1 className="max-w-[20ch] text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{lead}</p>
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </Container>
  );
}

export function SectionHeading({ title, lead, id, eyebrow }: { title: string; lead?: string; id?: string; eyebrow?: string }) {
  return (
    <div className="max-w-[60ch]">
      {eyebrow && <p className="mb-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-cyan">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="sable-gradient inline-flex items-center rounded-lg px-5 py-3 text-[15px] font-semibold text-navy transition-opacity hover:opacity-90">
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center rounded-lg border border-line bg-navy-card px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink-mute">
      {children}
    </Link>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <Container className="pt-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-mute">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">Home</Link>
          </li>
          {trail.map((t) => (
            <li key={t.name} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {t.href ? (
                <Link href={t.href} className="hover:text-ink">{t.name}</Link>
              ) : (
                <span aria-current="page" className="text-ink-soft">{t.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
            <h3>{f.q}</h3>
            <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-ink-mute transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** The closing call to action, the same on every page. */
export function CtaBand() {
  return (
    <section className="border-t border-line">
      <Container className="py-16 sm:py-20">
        <div className="rounded-2xl border border-line bg-navy-card px-6 py-10 sm:px-10">
          <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Want to try Sable on your own phone?</h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            It is in private testing on Android and is not on the Play Store. Tell me a little about how you track money today and I will reply by email.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryLink href="/early-access/">Ask for early access</PrimaryLink>
            <SecondaryLink href="/your-data/">How your data is handled</SecondaryLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
