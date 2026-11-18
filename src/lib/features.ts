import { SHOTS, type Shot } from "@/lib/shots";

/**
 * One page per feature, at /features/<slug>/. Every line was checked against the app's source on 19 November 2026.
 * The people, loans and EMI feature has its own page at /udhar-loan-tracker/ and is linked from the hub instead.
 */
export interface FeaturePage {
  slug: string;
  /** Short name, for links and the hub. */
  name: string;
  /** The page title, at most 65 characters with " | Sable" added. */
  title: string;
  /** 50 to 160 characters. */
  description: string;
  h1: string;
  lead: string;
  shot?: Shot;
  /** Where to find it in the app. */
  where: string;
  needsKey: "no" | "yes" | "optional";
  keyNote: string;
  steps: string[];
  sections: { h: string; body?: string; points?: string[] }[];
  limits: string[];
  faq: { q: string; a: string }[];
  related: string[];
}

export const FEATURE_PAGES: FeaturePage[] = [
  {
    slug: "add-money",
    name: "Add money by hand",
    title: "Add Expenses by Hand in Seconds",
    description: "Log a spend or money received in Sable with just an amount, in or out, and a note. No categories, no account, no internet needed.",
    h1: "Add a spend or money received in a few seconds",
    lead: "The quickest way to keep Sable up to date: one amount, a choice of in or out, and a note if you want one. Nothing to set up first.",
    shot: SHOTS.addMoney,
    where: "Home, the large Add money button in the middle of the round buttons.",
    needsKey: "no",
    keyNote: "Works fully on the phone, with no internet and no AI key.",
    steps: [
      "Tap Add money on Home.",
      "Choose Out (spent) or In (received). Out is picked by default.",
      "Type the amount in rupees. Decimals are fine.",
      "Add a note if you want one, such as lunch or petrol, then tap Add.",
    ],
    sections: [
      {
        h: "What gets saved",
        body: "An entry with the amount, in or out, your note and the date and time you tapped Add. Amounts are kept in paise, so totals never drift by a rounding error. A spend with no note is saved as Spent, and money received with no note as Received.",
      },
      {
        h: "Where it shows up",
        points: [
          "Left this month on Home changes at once.",
          "It appears at the top of Recent on Home.",
          "It is counted in Analytics, Search and the PDF report.",
          "Money in that you add by hand counts as salary in the This month card.",
        ],
      },
    ],
    limits: [
      "The date is always now: there is no field to log something from an earlier day.",
      "Type the amount without commas. 1000 works; 1,000 is read as 1.",
      "There is no category or account to pick, and adding a spend does not change an account balance.",
      "An entry cannot be edited or deleted on its own yet.",
    ],
    faq: [
      {
        q: "Does adding money by hand need the internet?",
        a: "No. The entry is saved straight into the database on your phone.",
      },
      {
        q: "Can I add an expense for yesterday?",
        a: "Not by hand: the entry takes the current date and time. An imported statement or screenshot keeps the date printed on it.",
      },
    ],
    related: ["chat", "import", "analytics"],
  },
  {
    slug: "chat",
    name: "Tell Sable in chat",
    title: "Log Expenses and Loans by Chat in Plain Words",
    description: "Type spent 250 on lunch or lent Ramesh 1000 and Sable shows a card to confirm. Common phrases work on the phone with no internet or AI key.",
    h1: "Type what happened, the way you would say it",
    lead: "Chat is the centre button of Sable. Write a short sentence about money and Sable turns it into a card that shows exactly what it will save. Nothing is saved until you tap Confirm.",
    shot: SHOTS.chat,
    where: "The raised centre button of the tab bar, or Tell Sable on Home.",
    needsKey: "optional",
    keyNote: "Common phrases are understood on the phone. Your own OpenAI key adds looser wording, questions and reminders.",
    steps: [
      "Open Chat from the centre button.",
      "Type something like spent 250 on lunch, or tap one of the examples.",
      "Read the Review & Confirm card.",
      "Tap Confirm to save it, or Cancel to leave no trace.",
    ],
    sections: [
      {
        h: "Phrases understood on the phone",
        points: [
          "Spending: spent, paid, bought, used. \"spent 250 on lunch\" is money out with the note Lunch.",
          "Money in: got, received, salary, income, credited, refund. \"got salary 50000\" is money in, noted as Salary.",
          "Money you lent: gave, lent. \"lent Ramesh 1000\" adds ₹1,000 to You'll get, under Ramesh.",
          "Money you borrowed: took, borrowed. \"took 500 from Asim\" adds ₹500 to You'll pay.",
          "Settling: paid me back, returned, settled, cleared. \"Asim paid me back\" settles Asim's latest open entry.",
          "Amounts can be written with ₹ or rs, and as 2k, 1.5 lakh or 1 cr.",
        ],
      },
      {
        h: "With your own OpenAI key",
        points: [
          "Typos and looser wording are understood, and one message can produce more than one card.",
          "You can ask questions such as how much you earned this month. To answer, the message is sent with a snapshot: this month's money in, out and salary, open loans, the last six months' totals and up to 40 of this month's entries.",
          "You can ask for a reminder, such as \"remind me to pay rent on the 5th\". It becomes a phone notification once you confirm it.",
          "If the key is missing or the call fails, Sable quietly falls back to the phrases above.",
        ],
      },
      {
        h: "Why every message becomes a card",
        body: "Sable never writes to your records on its own, whether the sentence was read on the phone or by OpenAI. The card says exactly what will change, and only Confirm changes it.",
      },
    ],
    limits: [
      "Entries from chat take the current date and time.",
      "\"paid 500 to Asim\" is saved as a spend, not a loan. Use gave, lent, took or borrowed for loans.",
      "Chat history is not kept: it is cleared when the app restarts. The entries you confirmed stay.",
      "Reminders need an OpenAI key, and there is no screen yet to see or cancel them.",
    ],
    faq: [
      {
        q: "Does Sable's chat need the internet?",
        a: "Not for the common phrases: spent, got, salary, lent, took, paid me back. They are understood on the phone. Looser wording and questions need your own OpenAI key and the internet.",
      },
      {
        q: "Can the chat change my records without asking?",
        a: "No. Every message becomes a Review & Confirm card, and nothing is saved until you tap Confirm.",
      },
    ],
    related: ["add-money", "import", "analytics"],
  },
  {
    slug: "import",
    name: "Import statements and screenshots",
    title: "Import Bank Statement PDFs and UPI Screenshots",
    description: "Give Sable a bank statement PDF or Google Pay and PhonePe screenshots. It reads every row, skips duplicates and shows you the list before saving.",
    h1: "Hand Sable a statement or screenshots, and approve the rows",
    lead: "You should not have to type six months of history. Import a bank statement PDF, several payment screenshots at once, or a photo, and Sable reads the rows for you.",
    shot: SHOTS.home,
    where: "Home, the Upload and Scan buttons; Reports, Import bank statement; Settings, Import from screenshot.",
    needsKey: "yes",
    keyNote: "Reading files is done by OpenAI's model with your own key. The file you pick is sent to OpenAI.",
    steps: [
      "Tap Upload for screenshots or a PDF, Scan for the camera, or Import bank statement in Reports.",
      "Pick the files. You can select many screenshots at once.",
      "Wait while Sable reads them. Long statements are read four pages at a time.",
      "Review the list: rows you already have are greyed out, new ones are ticked. Untick any you do not want.",
      "Tap Import.",
    ],
    sections: [
      {
        h: "What it can read",
        points: [
          "Bank statement PDFs: every debit and credit. If a chunk is too large to read, it is split again, down to single pages, and partial results are kept.",
          "Payment history screenshots from Google Pay, PhonePe, Paytm or your bank app.",
          "Salary slips: one entry for the net take-home pay.",
          "EMI schedules: each instalment as a payment.",
          "A photo of a receipt or payment screen.",
          "Rows marked failed or cancelled, running balances and month-total lines are skipped.",
        ],
      },
      {
        h: "Duplicates",
        body: "An imported row counts as one you already have when an entry with the same amount, the same direction, the same day and the same name is already saved. Those rows are greyed out and left out, so importing the same statement twice does not double anything.",
      },
      {
        h: "Bank statements: your balance",
        body: "For a statement, Sable also reads the bank's name, the last four digits of the account number and the closing balance from the first two pages. You can then tap Save this balance to keep it under Accounts. It never asks for the full account number.",
      },
    ],
    limits: [
      "It needs your own OpenAI key and the internet. Without a key, the import screen says so.",
      "The whole file you pick is sent to OpenAI, including anything printed on it.",
      "Rows can be ticked or unticked before saving, but not edited.",
      "I built and tested it on my own ICICI statement and my own Google Pay and PhonePe screenshots. Other layouts may read less well.",
      "Future-dated rows on an EMI schedule are saved with their future dates.",
    ],
    faq: [
      {
        q: "Which banks does the statement import work with?",
        a: "It reads any bank statement PDF it can open, but I have tested it on ICICI statements and on Google Pay and PhonePe screenshots. You always see the rows before they are saved.",
      },
      {
        q: "Is my bank statement uploaded?",
        a: "Yes, to OpenAI and only with your own key, so its model can read the rows. It goes from your phone to OpenAI and does not pass through me. Sable keeps only the rows you approve, on your phone.",
      },
    ],
    related: ["accounts", "earnings", "chat"],
  },
  {
    slug: "accounts",
    name: "Accounts and balances",
    title: "Track Bank, Wallet and Cash Balances in One Place",
    description: "Keep a balance for each bank account, wallet and cash in Sable and see what you have in total on the Home screen. Works offline, no bank login.",
    h1: "What you have, across bank, wallet and cash",
    lead: "Add each account with its current balance and Sable shows the total on Home, with the first few accounts as chips underneath.",
    shot: SHOTS.accounts,
    where: "Home, the You have card; or Reports, Accounts & balances.",
    needsKey: "no",
    keyNote: "Adding and editing accounts works on the phone. Filling a balance from a bank statement needs an OpenAI key.",
    steps: [
      "Open Accounts & balances from Reports, or tap the card on Home.",
      "Tap Add account.",
      "Give it a name, such as ICICI, Cash or Paytm, and pick Bank, Wallet or Cash.",
      "Type the current balance and tap Add account.",
    ],
    sections: [
      {
        h: "What you see",
        points: [
          "A total across all your accounts, at the top of the screen and on Home.",
          "Each account with its type and the date its balance was last set.",
          "Tap an account to change its balance or delete it.",
        ],
      },
      {
        h: "From a bank statement",
        body: "When you import a bank statement, Sable can read its closing balance and offer Save this balance. That updates the account with the same name, or adds it.",
      },
    ],
    limits: [
      "Balances do not change on their own when you add a spend or import entries. Update them by hand or from a statement.",
      "Entries are not linked to accounts.",
      "Balances are not part of Left this month or the PDF report.",
    ],
    faq: [
      {
        q: "Does Sable connect to my bank to get balances?",
        a: "No. You type the balance, or Sable reads the closing balance from a statement PDF you import. It never connects to a bank.",
      },
      {
        q: "Can I add cash and wallets as well as bank accounts?",
        a: "Yes. Each account is a Bank, a Wallet or Cash, and all of them add up to one total.",
      },
    ],
    related: ["import", "analytics", "backup"],
  },
  {
    slug: "analytics",
    name: "Analytics",
    title: "Spending Analytics: See Where Your Money Went",
    description: "A ring chart of the people and shops you paid most, totals for in, out and net, and month by month bars. Sable works it out on your phone.",
    h1: "See where your money went",
    lead: "Analytics takes every entry you have and shows it five ways on one screen, from a ring chart of your biggest payments to who paid you.",
    shot: SHOTS.analytics,
    where: "Reports, Analytics.",
    needsKey: "optional",
    keyNote: "Every chart is worked out on the phone. With your own OpenAI key, the note at the top is written by OpenAI from your totals.",
    steps: ["Open Reports.", "Tap Analytics.", "Scroll for the ring chart, the months, and who you paid and who paid you."],
    sections: [
      {
        h: "On the screen",
        points: [
          "A short note about the pattern.",
          "Totals for In, Out and Net.",
          "Where it went: a ring chart of the six people and shops you paid most, with the rest as Other.",
          "Month by month: money in and out for each month that has entries, up to the last 12.",
          "Who you paid, with Show more, and who paid you.",
          "Open loans, when you have any.",
        ],
      },
      {
        h: "The note at the top",
        body: "With your own OpenAI key, two or three short sentences are written from your totals: money in and out, your top six payees and your monthly spend. Without a key, Sable writes a simpler note on the phone: what you spent and received, your biggest payment and whether you came out ahead.",
      },
    ],
    limits: [
      "It covers all your entries since the first one. There is no date range to pick yet.",
      "People and shops are grouped by exact name, so Zomato and Zomato Ltd show separately.",
      "There are no categories, by design.",
    ],
    faq: [
      {
        q: "Does Sable send my transactions to make the charts?",
        a: "No. The charts are worked out on your phone. Only the short note uses OpenAI, and only if you add a key; it is sent totals and your top payees, not every entry.",
      },
      {
        q: "Can I see spending by category?",
        a: "No. Sable has no categories on purpose. It groups by the people and shops you paid instead.",
      },
    ],
    related: ["search", "pdf-report", "accounts"],
  },
  {
    slug: "search",
    name: "Search",
    title: "Search Every Expense by Name, Shop or Person",
    description: "Find every entry for Zomato, Amazon or a friend in Sable, with totals for what you spent and received. Works offline, on your phone.",
    h1: "Find every entry for one name",
    lead: "Type a shop, an app or a person and Sable lists every entry that matches, with what you spent, what you received and how many entries there were.",
    shot: SHOTS.search,
    where: "Reports, Search.",
    needsKey: "no",
    keyNote: "Search runs on the phone, with no internet.",
    steps: ["Open Reports, then Search.", "Type a name, or tap a quick chip: Zepto, Zomato, Swiggy, Amazon or Salary.", "Read the totals, and scroll the matching entries."],
    sections: [
      {
        h: "What it shows",
        points: [
          "Spent, Received and Count for the entries that match.",
          "Each entry with its date and amount, newest first.",
          "30 at a time, with Show more for the rest.",
          "With an empty search box, every entry you have.",
        ],
      },
    ],
    limits: ["It matches the name or note on an entry. It does not search people and loans.", "There are no date or amount filters yet.", "Entries in the results cannot be edited or deleted."],
    faq: [
      {
        q: "How do I see how much I spent on Zomato?",
        a: "Open Reports, then Search, and tap the Zomato chip or type Zomato. The Spent tile shows the total across every matching entry.",
      },
    ],
    related: ["analytics", "pdf-report", "add-money"],
  },
  {
    slug: "earnings",
    name: "Earnings from salary slips",
    title: "Salary Slip Tracker: Add Up Your Take-Home Pay",
    description: "Upload salary slips as a PDF or photo and Sable reads the net take-home pay and period, then keeps a running total of what you have earned.",
    h1: "Add up what your salary slips say",
    lead: "Earnings keeps your salary slips in one list and adds up the net pay on each, so you always know what you have taken home.",
    shot: SHOTS.earnings,
    where: "Reports, Earnings.",
    needsKey: "yes",
    keyNote: "Reading a slip is done by OpenAI's model with your own key. The slip you pick is sent to OpenAI.",
    steps: [
      "Open Reports, then Earnings.",
      "Tap Salary PDF or Photo and pick the slip.",
      "Check the net pay, the employer and the period Sable found.",
      "Tap Add.",
    ],
    sections: [
      {
        h: "What it reads",
        body: "The employer, the pay period and the net take-home pay. Not the gross pay and not the CTC.",
      },
      {
        h: "Kept separate on purpose",
        body: "Earnings is its own total. A slip added here does not create an entry and does not change Home or Analytics, so a bonus month does not distort your monthly picture. To count a slip as money in, import it from Home instead.",
      },
    ],
    limits: [
      "Needs your own OpenAI key and the internet.",
      "The values it finds can be added or cancelled, but not edited.",
      "If you already have a slip for the same month, Sable asks before adding another.",
    ],
    faq: [
      {
        q: "Does Sable read gross salary or net pay from a payslip?",
        a: "Net, the take-home or in-hand pay. It is told to ignore the gross figure and the CTC.",
      },
    ],
    related: ["import", "analytics", "pdf-report"],
  },
  {
    slug: "pdf-report",
    name: "PDF report",
    title: "Download Your Expense Report as a PDF",
    description: "Make a PDF of today, this week, this month or everything in Sable, with totals, top spends and every entry, and share it from your phone.",
    h1: "Make a PDF of your money, ready to share",
    lead: "Pick a period and Sable builds a clean PDF on the phone, then opens the normal Android share sheet so you can save it or send it.",
    shot: SHOTS.pdfReport,
    where: "Reports, Download PDF report.",
    needsKey: "no",
    keyNote: "The PDF is made on the phone, with no internet.",
    steps: ["Open Reports.", "Tap Download PDF report.", "Choose Today, This week, This month or All time.", "Save or send the file from the share sheet."],
    sections: [
      {
        h: "In the PDF",
        points: [
          "Money in, money out and net for the period.",
          "Your top 10 spends by person or shop, with how many times and the total.",
          "Every entry in the period, with its date, name and amount.",
          "Your name and the date it was made.",
        ],
      },
      {
        h: "The periods",
        body: "Today starts at midnight, This week starts on Monday, This month on the 1st, and All time covers every entry you have.",
      },
    ],
    limits: ["People and loans, accounts and earnings are not in the PDF.", "There are no charts in it."],
    faq: [
      {
        q: "Can I send my expense report to my accountant?",
        a: "Yes. Make the PDF for the period you need, then send it from the share sheet by email, WhatsApp or Drive.",
      },
    ],
    related: ["analytics", "search", "backup"],
  },
  {
    slug: "backup",
    name: "Backup and restore",
    title: "Back Up and Restore Your Expense Data",
    description: "Export everything in Sable to one file and import it on a new phone. Your OpenAI key is never put in the file. Android backup works too.",
    h1: "Take your records with you to a new phone",
    lead: "Your records live on your phone, so Sable gives you a way to take them out and put them back: one backup file, made and read in Settings.",
    shot: SHOTS.settings,
    where: "Settings, Backup & restore.",
    needsKey: "no",
    keyNote: "Export and import work on the phone, with no internet.",
    steps: [
      "Open Settings and find Backup & restore.",
      "Tap Export, then save the file to Drive or Files, or send it to yourself.",
      "On the new phone, install Sable, open Settings and tap Import.",
      "Pick the file and confirm Restore.",
    ],
    sections: [
      {
        h: "What the file holds",
        points: [
          "Your profile, entries, people and loans, accounts and salary slips, in one JSON file named with the date.",
          "Not your OpenAI key: add it again on the new phone.",
        ],
      },
      {
        h: "Restoring replaces, it does not merge",
        body: "Import replaces what is in the app with what is in the file, after you confirm. It cannot be undone, so export first if the phone already has records you want to keep.",
      },
      {
        h: "Android backup",
        body: "If device backup is on in your Android settings, Android also includes the Sable database in its own backup to your Google account. The export file is the dependable way.",
      },
    ],
    limits: ["Reminders you set are restored as records but not scheduled again as notifications.", "Only files exported by Sable can be imported."],
    faq: [
      {
        q: "What happens to my data if I uninstall Sable?",
        a: "Android removes it with the app. Export a backup file first, and import it after you reinstall.",
      },
      {
        q: "Is my OpenAI key in the backup file?",
        a: "No. The key stays in Android's secure storage and is never written to the file.",
      },
    ],
    related: ["accounts", "pdf-report", "add-money"],
  },
];

export const FEATURE_BY_SLUG: Record<string, FeaturePage> = Object.fromEntries(FEATURE_PAGES.map((f) => [f.slug, f]));
