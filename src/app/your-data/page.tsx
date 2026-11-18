import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro, SectionHeading } from "@/components/Blocks";
import { BLOCKED_PERMISSIONS, DATA_FLOWS, PERMISSIONS } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = "Your Data: What Stays on Your Phone";
const DESCRIPTION =
  "Sable keeps your money records in a database on your phone. This page lists exactly what is sent to OpenAI, when, and which permissions the app uses.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "your-data" });

export default function YourDataPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ path: "your-data", name: TITLE, description: DESCRIPTION }), breadcrumbJsonLd([{ name: "Your data", path: "your-data" }])]} />
      <Breadcrumbs trail={[{ name: "Your data" }]} />
      <PageIntro
        title="What stays on your phone, and what does not"
        lead="A money app should be able to say exactly where your records go. This page does that for the Sable app. It was checked against the app's source code on 19 November 2026."
      />

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="Where the records live" />
          <div className="prose-sable">
            <p>
              Every entry, person, account and salary record is kept in a <strong>SQLite database inside the app, on your phone</strong>. There is no account and no sign-up, and Sable has no server of its own. I cannot see your entries, and there is nothing of yours for me to lose or hand over.
            </p>
            <p>If you uninstall the app, Android removes that database with it. Settings also has a button that clears everything.</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 sm:py-16">
          <SectionHeading title="What leaves the phone, and when" lead="Only the AI features send anything, and only after you add your own OpenAI key in Settings. It goes straight from your phone to OpenAI. It does not pass through me." />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line text-sm text-ink-mute">
                  <th scope="col" className="w-[26%] py-3 pr-5 font-medium">When</th>
                  <th scope="col" className="py-3 pr-5 font-medium">What is sent</th>
                  <th scope="col" className="w-[20%] py-3 font-medium">To whom</th>
                </tr>
              </thead>
              <tbody>
                {DATA_FLOWS.map((r) => (
                  <tr key={r.when} className="border-b border-line/70 align-top">
                    <th scope="row" className="py-4 pr-5 font-semibold text-ink">{r.when}</th>
                    <td className="py-4 pr-5 leading-relaxed text-ink-soft">{r.what}</td>
                    <td className="py-4 leading-relaxed text-ink-soft">{r.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prose-sable">
            <p>
              What OpenAI does with data sent through its API is set by <a href="https://openai.com/policies/" rel="noopener noreferrer" target="_blank">OpenAI&apos;s own policies</a>, and the usage is billed to your key. If that does not suit you, leave the key empty: the rest of the app works without it.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid gap-12 py-14 sm:py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Your OpenAI key</h2>
            <div className="prose-sable">
              <p>You paste the key once in Settings. It is kept in Android&apos;s secure storage (the Keystore), separate from the database.</p>
              <p>The key is <strong>never included in an export file</strong>, so sharing a backup does not share your key. You can remove it in Settings at any time.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Backups</h2>
            <div className="prose-sable">
              <p><strong>Export and import.</strong> Settings can write all your records to one file and read that file back on another phone. The file stays wherever you save or send it.</p>
              <p><strong>Android backup.</strong> If device backup is on in your Android settings, Android includes the Sable database in the backup to your own Google account, as it does for other apps. Switch that off in Android settings if you do not want it.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid gap-12 py-14 sm:py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Permissions the app uses</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {PERMISSIONS.map((p) => (
                <li key={p.name} className="py-3.5">
                  <span className="font-semibold text-ink">{p.name}.</span> <span className="text-ink-soft">{p.why}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Permissions blocked in the build</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">These are switched off in the app&apos;s configuration, so the app cannot ask for them:</p>
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

      <CtaBand />
    </>
  );
}
