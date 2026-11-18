// Third-party script gate. Runs at the end of `npm run build`.
// Scans the static export in ./out and FAILS when
//   1. a page loads a script from a host that is not on the allowlist (script src attributes, and script URLs that an
//      inline loader assigns with `.src="https://..."`), or
//   2. any HTML or JS file in out/ points at a payment provider. Sable's site takes no payments; a payment SDK
//      appearing here needs a deliberate, reviewed change.
// Today the only external script is the owner's own visit counter. Google Analytics and Clarity are allowed for the
// day their ids are set in src/lib/site.ts.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, sep } from "node:path";

const ROOT = resolve(process.argv[2] ?? ".");
const OUT = join(ROOT, "out");

const ALLOWED_HOSTS = [
  "pulse.yaseenyk.workers.dev", // the owner's first-party visit counter (no cookies); off on the form pages via data-exclude
  "googletagmanager.com", // not loaded today; allowed for when a GA4 id is set
  "clarity.ms", // not loaded today; allowed for when a Clarity id is set
];
const OWN_HOSTS = ["sable.streamerosai.com"];
const PAYMENT = /https?:\/\/[a-z0-9.-]*(razorpay|stripe|paytm|payu|phonepe|cashfree|paypal|braintree|instamojo|billdesk|ccavenue|juspay|adyen|checkout\.com)[a-z0-9.-]*/gi;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const hostOk = (host) => [...ALLOWED_HOSTS, ...OWN_HOSTS].some((h) => host === h || host.endsWith("." + h));
const hostOf = (url) => { try { return new URL(url.startsWith("//") ? "https:" + url : url).hostname.toLowerCase(); } catch { return ""; } };

if (!existsSync(OUT)) { console.error("check:third-party: no ./out folder. Run `npm run build` first."); process.exit(2); }

const problems = [];
const seen = new Map(); // host -> page count
const files = walk(OUT);
let pages = 0;
for (const f of files) {
  const rel = f.slice(OUT.length + 1).split(sep).join("/");
  const isHtml = f.endsWith(".html");
  const isJs = f.endsWith(".js");
  if (!isHtml && !isJs) continue;
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(PAYMENT)) problems.push(`${rel}: payment provider reference ${m[0]}`);
  if (!isHtml) continue;
  pages++;
  const urls = new Set();
  for (const m of text.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)) urls.add(m[1]);
  for (const m of text.matchAll(/\.src=\\*["'](https?:\/\/[^"'\\]+)/g)) urls.add(m[1]); // inline loader
  for (const u of urls) {
    if (!/^(https?:)?\/\//.test(u)) continue; // same-origin relative script
    const host = hostOf(u);
    seen.set(host, (seen.get(host) ?? 0) + 1);
    if (!host || !hostOk(host)) problems.push(`${rel}: script from disallowed host ${host || u}`);
  }
}

console.log(`check:third-party: scanned ${pages} HTML pages; external script hosts: ${[...seen].map(([h, n]) => `${h} (${n})`).join(", ") || "none"}`);
if (problems.length) {
  for (const p of [...new Set(problems)].slice(0, 50)) console.error(`check:third-party FAIL: ${p}`);
  process.exit(1);
}
console.log("check:third-party: ok");
