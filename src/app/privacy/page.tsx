import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { CONTACT, MAKER } from "@/lib/site";

const TITLE = "Privacy Notice for the Sable Website and App";
const DESCRIPTION =
  "What the Sable website records about a visit, what the forms send, and how the Sable app keeps your money records on your phone. No ads on the site.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "privacy" });

// This page describes what is switched on today: the first-party counter, Google Analytics and Microsoft Clarity
// (ANALYTICS in src/lib/site.ts). If either id is changed or removed, change this page in the same commit.
export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "privacy", name: TITLE, description: DESCRIPTION }), breadcrumbJsonLd([{ name: "Privacy", path: "privacy" }])]} />
      <Breadcrumbs trail={[{ name: "Privacy" }]} />
      <PageIntro
        title="Privacy notice"
        lead={`This notice covers two things: this website, and the Sable app. Both are run by ${MAKER.name}, an individual developer in ${CONTACT.city}, ${CONTACT.country}.`}
      />
      <Container className="prose-sable pb-20">
        <h2>This website</h2>

        <h3>What is recorded about a visit</h3>
        <p>
          <strong>First-party visit counter.</strong> A small script from my own Cloudflare Worker (pulse.yaseenyk.workers.dev) counts page views, the page you came from and link clicks, and tells human visits from bots. It sets no cookie and stores no IP address, no browser user-agent string and no text you type. To count one visitor once a day it makes a one-way code from the address and browser name with a random key; that key is deleted the next day, so the code cannot be turned back into an address or linked across days. The counter switches itself off if your browser sends Do Not Track or Global Privacy Control, and it does not run on the contact and early-access pages. Records are deleted after 90 days.
        </p>
        <p>
          <strong>Hosting.</strong> The site is served by GitHub Pages, which may log requests such as IP addresses under its own policy.
        </p>
        <p>
          <strong>Google Analytics.</strong> Sets first-party cookies and sends usage data to Google: pages viewed, approximate location, device and browser, and the source of the visit.
        </p>
        <p>
          <strong>Microsoft Clarity.</strong> A free tool that records anonymised heatmaps and session replays so I can see where visitors get stuck. It sets cookies. Text typed into the forms on this site is masked and is not recorded.
        </p>
        <p>
          Both load a few seconds after the page, or when you first touch it. None of this is used to target you with advertising, and the site has no advertising cookies. You can block both with a browser extension or by turning off cookies, and the site keeps working. The fonts are served from this site, not from Google.
        </p>

        <h3>The forms</h3>
        <p>
          The early-access and contact forms send what you type (your name, email address and message, and the phone model if you give it) to my email inbox through EmailJS, an email delivery service. I use it only to reply to you. It is not added to a mailing list and is not sold or shared.
        </p>

        <h3>No advertising</h3>
        <p>This site shows no ads and loads no advertising scripts. If that ever changes, this notice will be updated before it does.</p>

        <h2>The Sable app</h2>
        <p>
          Your money records are stored in a database on your phone. The app has no account, no sign-up and no server of its own, so I do not receive your entries and cannot see them.
        </p>
        <p>
          The AI features send data to OpenAI only if you add your own OpenAI key in the app&apos;s settings. Files you choose to import are sent to be read; chat sends your message with a snapshot of your recent numbers; Home and Analytics send totals to write a short note. Without a key, nothing leaves the phone. The <Link href="/your-data/">Your data</Link> page lists each case in full, along with the permissions the app uses and the ones that are blocked.
        </p>
        <p>
          The app does not read your SMS, does not connect to your bank and contains no advertising or analytics code.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Turn on Do Not Track or Global Privacy Control in your browser to switch the visit counter off.</li>
          <li>Block Google Analytics and Microsoft Clarity with a browser extension, or by turning off cookies for this site.</li>
          <li>
            Ask me what you sent through a form, or ask me to delete it: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </li>
          <li>In the app, remove your OpenAI key in Settings to stop anything being sent, and use the clear button or uninstall the app to remove your records.</li>
        </ul>

        <h2>Changes</h2>
        <p>If what this site or the app collects changes, this page changes first. Last updated 19 November 2026.</p>
      </Container>
    </>
  );
}
