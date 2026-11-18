"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV } from "@/components/nav";

// The hamburger button and its panel. The panel sits directly under the sticky header bar (h-16).
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="rounded-md p-2 text-ink md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full md:hidden">
          <nav id="mobile-nav" aria-label="Main" className="border-b border-t border-line bg-navy px-4 pb-5 pt-2">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line/70 py-3 text-base text-ink">
                {n.label}
              </Link>
            ))}
            <Link href="/early-access/" onClick={() => setOpen(false)} className="sable-gradient mt-4 block rounded-lg px-4 py-3 text-center font-semibold text-navy">
              Ask for early access
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
