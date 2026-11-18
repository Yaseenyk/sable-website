/**
 * Real screens from the Sable app (version 1.0.0), captured on 19 November 2026 from the release build running on
 * Android 14. The entries in them are sample entries typed into the app for the capture, not anyone's real money.
 * Files: public/shots/<version>/<id>.webp, 720 x 1600. v2 is the restyled app (19 November 2026).
 */
export type Shot = { src: string; width: number; height: number; alt: string; caption: string };

/** Bump this, and the folder name, whenever the screens are recaptured: a new path means no browser shows an old saved copy. */
const VERSION = "v2";

const shot = (id: string, alt: string, caption: string): Shot => ({ src: `/shots/${VERSION}/${id}.webp`, width: 720, height: 1600, alt, caption });

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
  addMoney: shot(
    "add-money",
    "Sable's Add money form on Android: a choice of Out (spent) or In (received), an amount in rupees, an optional note and an Add button",
    "Add money: an amount, in or out, and a note",
  ),
  emi: shot(
    "emi",
    "Sable's Add a person or loan form on Android with EMI (monthly) selected: HDFC Bike Loan, monthly EMI amount 4200, and From and To month pickers",
    "A loan as an EMI, with a first and last month",
  ),
  accounts: shot(
    "accounts",
    "Sable's Accounts screen on Android: a total of ₹87,700 across a savings account of ₹84,500 and cash of ₹3,200, with an Add account button",
    "Accounts: what you have, across bank, wallet and cash",
  ),
  search: shot(
    "search",
    "Sable's Search screen on Android: the search Zomato, quick chips for Zepto, Zomato, Swiggy, Amazon and Salary, totals for spent, received and count, and the matching entry",
    "Search: every entry for one name, with totals",
  ),
  earnings: shot(
    "earnings",
    "Sable's Earnings screen on Android: total earned from salary slips, and buttons to add a salary PDF or a photo",
    "Earnings: what your salary slips add up to",
  ),
  pdfReport: shot(
    "pdf-report",
    "Sable's Download PDF report sheet on Android with four choices: Today, This week, This month and All time",
    "PDF report: pick a period, then share the file",
  ),
  settings: shot(
    "settings",
    "Sable's Settings screen on Android: the profile, a Backup and restore card with Export and Import buttons, and the AI key card",
    "Settings: backup and restore, and your own AI key",
  ),
} as const;

export const ALL_SHOTS: Shot[] = Object.values(SHOTS);
