"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS } from "@/lib/emailjs";
import { withBase } from "@/lib/site";
import { gaEvent } from "@/lib/ga";

export type Intent = "early-access" | "question";

const TODAY = ["I do not track it", "Notes or a spreadsheet", "Another app", "My bank's app"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  today: "",
  message: "",
  website: "", // honeypot: hidden from people, filled by bots
};

type Status = "idle" | "sending" | "sent" | "error";

const SUBMIT_LABEL: Record<Intent, string> = { "early-access": "Ask for early access", question: "Send message" };
const SENT_MESSAGE: Record<Intent, string> = {
  "early-access": "Thank you. Your request is with me and I will reply by email.",
  question: "Message sent. I will reply by email.",
};

export default function LeadForm({ intent = "early-access" }: { intent?: Intent }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "sent" || status === "error") setStatus("idle");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (form.website) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    setErrorDetail("");

    const body = [
      `*** SABLE — ${intent === "early-access" ? "EARLY ACCESS REQUEST" : "QUESTION"} ***`,
      `Android phone: ${form.phone || "-"}`,
      `Tracks money today with: ${form.today || "-"}`,
      `Page: ${typeof window !== "undefined" ? window.location.pathname : "-"}`,
      "",
      form.message || "(no message)",
    ].join("\n");

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          reply_to: form.email,
          to_name: EMAILJS.toName,
          to_email: EMAILJS.toEmail,
          message: body,
        },
        EMAILJS.publicKey,
      );
      gaEvent("generate_lead", { form_name: "sable-lead", cta_text: intent });
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      const x = err as { status?: number; text?: string };
      setErrorDetail(x?.text ? `${x.status ?? ""} ${x.text}`.trim() : "");
      setStatus("error");
    }
  }

  const disabled = status === "sending";
  const field =
    "mt-1.5 block w-full rounded-lg border border-line bg-navy-sunken px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-mute focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/25 disabled:opacity-60";
  const label = "block text-sm font-medium text-ink";
  const optional = <span className="font-normal text-ink-mute">(optional)</span>;

  return (
    <form onSubmit={submit} data-clarity-mask="true" className="relative grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Your name
          <input name="name" required autoComplete="name" value={form.name} onChange={update} disabled={disabled} className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required autoComplete="email" value={form.email} onChange={update} disabled={disabled} className={field} />
        </label>
        {intent === "early-access" && (
          <>
            <label className={label}>
              Your Android phone {optional}
              <input name="phone" placeholder="e.g. Pixel 7, Android 15" value={form.phone} onChange={update} disabled={disabled} className={field} />
            </label>
            <label className={label}>
              How do you track money today? {optional}
              <select name="today" value={form.today} onChange={update} disabled={disabled} className={field}>
                <option value="">Choose one</option>
                {TODAY.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </>
        )}
      </div>

      <label className={label}>
        {intent === "early-access" ? "Anything you want Sable to do for you?" : "Your message"} {intent === "early-access" && optional}
        <textarea name="message" rows={4} required={intent === "question"} value={form.message} onChange={update} disabled={disabled} className={field} />
      </label>

      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={disabled} className="sable-gradient inline-flex items-center justify-center rounded-lg px-6 py-3 text-[15px] font-semibold text-navy transition-opacity hover:opacity-90 disabled:opacity-70">
          {status === "sending" ? "Sending…" : SUBMIT_LABEL[intent]}
        </button>
        <p className="text-sm text-ink-mute">
          I use your details only to reply. See the{" "}
          <a href={withBase("/privacy/")} className="underline underline-offset-2 hover:text-ink">privacy notice</a>.
        </p>
      </div>

      <div aria-live="polite" className="text-[15px]">
        {status === "sent" && <p className="rounded-lg border border-good/40 bg-good/10 px-4 py-3 text-ink">{SENT_MESSAGE[intent]}</p>}
        {status === "error" && (
          <p className="rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-ink">
            The message did not send{errorDetail ? ` (${errorDetail})` : ""}. Email{" "}
            <a href={`mailto:${EMAILJS.toEmail}`} className="font-medium underline">{EMAILJS.toEmail}</a> instead, or try again.
          </p>
        )}
      </div>
    </form>
  );
}
