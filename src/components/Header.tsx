import Link from "next/link";
import Logo from "@/components/Logo";
import NavLinks from "@/components/NavLinks";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-navy/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Sable home">
          <Logo id="sable-mark-header" />
        </Link>

        <NavLinks />

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/early-access/" className="sable-gradient rounded-lg px-4 py-2 text-[15px] font-semibold text-navy hover:opacity-90">
            Ask for early access
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
