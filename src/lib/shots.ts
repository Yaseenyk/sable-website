/**
 * Real screens from the Sable app (version 1.0.0), captured on 19 November 2026 from the release build running on
 * Android 14. The entries in them are sample entries typed into the app for the capture, not anyone's real money.
 * Files: public/shots/<id>.webp, 720 x 1600.
 */
export type Shot = { src: string; width: number; height: number; alt: string; caption: string };

const shot = (id: string, alt: string, caption: string): Shot => ({ src: `/shots/${id}.webp`, width: 720, height: 1600, alt, caption });

export const SHOTS = {
  home: shot(
    "home",
    "Sable's Home screen on Android: left this month ₹38,350, money in ₹62,000, money out ₹23,650, a total of ₹87,700 across two accounts, and a row of round buttons to upload, scan, add money, tell Sable or open reports",
    "Home: what is left this month, and what you have",
  ),
  chat: shot(
    "chat",
    "Sable's chat on Android: the message lent Ramesh 2000 has become a Review and Confirm card reading You'll get ₹2,000 from Ramesh, with Confirm and Cancel buttons",
    "Chat: every message becomes a card you confirm",
  ),
  people: shot(
    "people",
    "Sable's People screen on Android: You'll get ₹6,500 from two people, You'll pay ₹500 to one person, with Ramesh, Satya and Asim listed",
    "People: who owes you, and whom you owe",
  ),
  analytics: shot(
    "analytics",
    "Sable's Analytics screen on Android: a note on spending, totals for in, out and net, a ring chart of where the money went, and month by month bars",
    "Analytics: where the money went",
  ),
  reports: shot(
    "reports",
    "Sable's Reports screen on Android, listing Accounts and balances, Analytics, Search, Earnings, Import bank statement and Download PDF report",
    "Reports: every view of the same records",
  ),
} as const;

export const ALL_SHOTS: Shot[] = Object.values(SHOTS);
