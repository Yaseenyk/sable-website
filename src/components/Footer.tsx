import Link from "next/link";
import Logo from "@/components/Logo";
import { APP, CONTACT, MAKER, SITE_TAGLINE } from "@/lib/site";

const PRODUCT_LINKS = [
  { href: "/features/", label: "Features" },
  { href: "/your-data/", label: "Your data" },
  { href: "/expense-tracker-without-sms-permission/", label: "No SMS permission" },
  { href: "/udhar-loan-tracker/", label: "Udhar and loan tracker" },
  { href: "/#questions", label: "Common questions" },
  { href: "/early-access/", label: "Ask for early access" },
];

const COMPANY_LINKS = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-navy-sunken">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo id="sable-mark-footer" />
          <p className="mt-4 max-w-[38ch] leading-relaxed text-ink-soft">{SITE_TAGLINE}. A personal money app that keeps every record on your phone.</p>
          <p className="mt-4 font-mono text-[12.5px] text-ink-mute">
            {APP.platform} · version {APP.version} · {APP.status.toLowerCase()}
          </p>
        </div>
        <nav aria-label="Product">
          <h2 className="text-sm font-semibold text-ink">Product</h2>
          <ul className="mt-3 space-y-2.5">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-soft hover:text-ink">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site">
          <h2 className="text-sm font-semibold text-ink">Site</h2>
          <ul className="mt-3 space-y-2.5">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-soft hover:text-ink">{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`} className="text-ink-soft hover:text-ink">{CONTACT.email}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-5 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Sable. Not financial advice.</p>
          <p>
            Made by{" "}
            <a href={MAKER.url} rel="author" className="text-ink-soft underline underline-offset-2 hover:text-ink">
              {MAKER.name}
            </a>{" "}
            in {CONTACT.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
