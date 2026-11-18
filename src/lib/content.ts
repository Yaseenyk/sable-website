/**
 * Every fact on the site lives here, so the pages, llms.txt and llms-full.txt can never disagree.
 * Nothing is invented: each line was checked against the app's source (the private sable-app repository)
 * on 19 November 2026. If the app changes, change it here.
 */

/** What you type in chat, and the card Sable shows before saving. From the app's on-device parser. */
export const CHAT_EXAMPLES: { say: string; card: string; kind: "in" | "out" | "get" | "pay" | "settle" }[] = [
  { say: "spent 250 on lunch", card: "Money out · ₹250 · lunch", kind: "out" },
  { say: "got salary 50000", card: "Money in · ₹50,000 · Salary", kind: "in" },
  { say: "lent Ramesh 1000", card: "You'll get · ₹1,000 from Ramesh", kind: "get" },
  { say: "took 500 from Asim", card: "You'll pay · ₹500 to Asim", kind: "pay" },
  { say: "Asim paid me back", card: "Settle · close what Asim owes", kind: "settle" },
];

/** The three questions on the home page. */
export const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "What is left this month?",
    a: "Money in minus money out, as one number on the first screen. Tap any month on the chart to see that month instead. There are no categories to keep tidy.",
  },
  {
    q: "Who owes whom?",
    a: "Two plain lists: You'll get and You'll pay. An entry can be a one-time amount or an EMI with a start month and an end month.",
  },
  {
    q: "Where did it go?",
    a: "The people and shops you paid most, month by month, with search across every entry you have ever added.",
  },
];

export type Feature = { name: string; summary: string; points: string[] };
export type FeatureGroup = { id: string; title: string; lead: string; features: Feature[] };

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "add",
    title: "Adding money",
    lead: "Three ways to get an entry in. All of them end on the same simple record: an amount, in or out, a date and a note.",
    features: [
      {
        name: "Add by hand",
        summary: "An amount, a choice of in or out, and an optional note. That is the whole form.",
        points: [
          "No categories, tags or budgets to set up first.",
          "Amounts are stored in paise, so totals never drift by a rounding error.",
        ],
      },
      {
        name: "Tell Sable in chat",
        summary: "Type what happened the way you would say it. Sable turns it into a card that shows exactly what will be saved.",
        points: [
          "Nothing is written until you tap Confirm. Cancel leaves no trace.",
          "Common phrases are understood on the phone itself: spent, got, salary, lent, gave, took, paid me back, settled.",
          "Amounts can be written as 2k, 1.5 lakh or 1 cr.",
          "With your own OpenAI key, it also copes with typos and looser wording, and can answer questions such as how much you earned this month.",
        ],
      },
      {
        name: "Import a file",
        summary: "Hand Sable a bank statement PDF, payment screenshots, a salary slip or an EMI schedule, and it reads the rows for you.",
        points: [
          "Pick many screenshots at once. Entries you already have are skipped, so importing the same file twice does not double anything.",
          "Long statements are read a few pages at a time, so a six-month PDF does not fail half way.",
          "You see the rows it found and approve them before they are saved.",
          "Reading files is done by OpenAI's model, so it needs your own OpenAI key. Without one, the import screen tells you so.",
        ],
      },
    ],
  },
  {
    id: "people",
    title: "People and loans",
    lead: "The part most money apps leave out: money between you and other people.",
    features: [
      {
        name: "You'll get and You'll pay",
        summary: "Two lists with a total on each. One for money people owe you, one for money you owe.",
        points: [
          "Tap a row to change it, settle it or delete it.",
          "Settle from chat too: \"Asim paid me back\" finds the open entry for Asim.",
        ],
      },
      {
        name: "EMIs",
        summary: "A loan can be a monthly EMI instead of a single amount.",
        points: [
          "Pick the first and last month from a month grid. No dates to type.",
          "The list shows the monthly amount and the months it runs between.",
        ],
      },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    lead: "One tab holds every view of the same records. Nothing here needs the internet except the short AI note.",
    features: [
      {
        name: "Accounts and balances",
        summary: "Keep a balance for each bank account, wallet or cash, and see what you have in total on the first screen.",
        points: ["A statement import can save the statement's closing balance to the account for you."],
      },
      {
        name: "Analytics",
        summary: "A ring chart of the six people and shops you paid most, totals for money in, out and net, and bars for each month.",
        points: [
          "Who you paid and who paid you, as two lists you can page through.",
          "Open loans alongside, so the full picture is on one screen.",
          "With your own OpenAI key, a short plain-language note about the pattern. Without one, a simpler note written on the phone.",
        ],
      },
      {
        name: "Search",
        summary: "Find every entry for a person, a shop or a note, with totals for what you spent and received from them.",
        points: ["Quick chips for common searches such as Zomato, Amazon or Salary."],
      },
      {
        name: "Earnings",
        summary: "Upload salary slips and Sable keeps a running total of what you have earned, by pay period.",
        points: ["It reads the net pay and the pay period from each slip.", "Kept as its own total, apart from the monthly chart."],
      },
      {
        name: "PDF report",
        summary: "Make a PDF of a day, a week, a month or everything, and share it from the normal Android share sheet.",
        points: ["Useful for an accountant, a family member or your own records."],
      },
    ],
  },
  {
    id: "keep",
    title: "Keeping your records",
    lead: "The records are yours, so you can take them out and put them back.",
    features: [
      {
        name: "Export and import",
        summary: "Settings has two buttons: export everything to one file, and import that file on another phone.",
        points: [
          "The file holds your entries, people, accounts and salary records.",
          "Your OpenAI key is never put in the file.",
        ],
      },
      {
        name: "Android backup",
        summary: "If device backup is switched on in your Android settings, the Sable database is included, like other apps.",
        points: ["That backup is made by Android to your own Google account. Switch it off in Android settings if you do not want it."],
      },
    ],
  },
];

/** What leaves the phone, and when. The table on the Your data page. */
export const DATA_FLOWS: { when: string; what: string; to: string }[] = [
  {
    when: "You have not added an OpenAI key",
    what: "Nothing. Sable has no server of its own, and the only network code in the app is the call to OpenAI.",
    to: "Nobody",
  },
  {
    when: "You import a screenshot, PDF or photo",
    what: "The whole file you picked, including anything printed on it, such as an account number.",
    to: "OpenAI, with your key",
  },
  {
    when: "You send a chat message",
    what: "Your message, plus a snapshot so it can answer: this month's money in, money out and salary, the last six months' totals, up to 40 of this month's entries, and your open loans.",
    to: "OpenAI, with your key",
  },
  {
    when: "You open Home or Analytics",
    what: "Totals only, to write a one-line note: money in and out, what you will get and pay, and the names and totals of the people and shops you paid most.",
    to: "OpenAI, with your key",
  },
];

export const PERMISSIONS: { name: string; why: string }[] = [
  { name: "Camera", why: "Only when you choose to scan a receipt or payment screen." },
  { name: "Notifications", why: "For reminders you set." },
  { name: "Background work", why: "So a reminder you set still arrives after the phone restarts." },
];

export const BLOCKED_PERMISSIONS: string[] = [
  "Reading or receiving SMS",
  "Microphone",
  "Drawing over other apps",
  "Reading or writing shared storage",
];

/** The honest limits. Shown on the home page and repeated in llms.txt. */
export const LIMITS: { title: string; body: string }[] = [
  {
    title: "Not on the Play Store",
    body: "Sable is version 1.0.0, for Android 7.0 or later, and is in private testing. There is no iPhone build.",
  },
  {
    title: "It does not read your SMS",
    body: "The SMS permissions are blocked in the build. Entries come from you: typed, told in chat or imported from a file you chose.",
  },
  {
    title: "Rupees only",
    body: "It is built for India: rupees and paise, lakh and crore, UPI screenshots and Indian bank statements.",
  },
  {
    title: "Reading files is not perfect",
    body: "I built and tested the import on my own ICICI statement and my own Google Pay and PhonePe screenshots. Other layouts may read less well, which is why you approve the rows before they are saved.",
  },
  {
    title: "Not financial advice",
    body: "Sable keeps records and adds them up. It does not tell you where to invest, and nothing it writes is advice from a registered adviser.",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is Sable on the Play Store?",
    a: "No. Sable is an Android app in private testing, version 1.0.0. You can ask for early access on this site and I will reply by email.",
  },
  {
    q: "Does Sable read my SMS?",
    a: "No. The permissions to read and receive SMS are blocked in the build. You add money by typing it, telling Sable in chat, or importing a statement or screenshot that you pick.",
  },
  {
    q: "Can an expense tracker app work without SMS permission?",
    a: "Yes. Sable never asks for it. Instead of reading bank alerts, you tell it what happened in a few words, or import a bank statement or payment screenshots once in a while. It is a little more effort, and the app never sees your messages.",
  },
  {
    q: "Can I use Sable to track udhar, money I lent to friends?",
    a: "Yes. Sable keeps two lists, You'll get and You'll pay, with a total on each. Add an entry by typing \"lent Ramesh 1000\" in chat, and settle it with \"Ramesh paid me back\". It also tracks EMIs with a start and end month.",
  },
  {
    q: "Where is my money data stored?",
    a: "In a database on your phone. There is no account, no sign-up and no Sable server, so I cannot see your entries.",
  },
  {
    q: "What does Sable send to OpenAI?",
    a: "Nothing, unless you add your own OpenAI key in Settings. With a key, the files you choose to import are sent to be read, chat sends your message with a snapshot of your recent numbers, and Home and Analytics send totals to write a short note. The Your data page lists each case.",
  },
  {
    q: "Does it work without an OpenAI key?",
    a: "Yes, for most things. Adding money by hand, the common chat phrases, people and loans, accounts, analytics, search, the PDF report and backup all run on the phone. Importing files needs a key, because the reading is done by OpenAI's model.",
  },
  {
    q: "What does Sable cost?",
    a: "There is no price yet. Sable is in private testing and nobody is charged for it. If you add an OpenAI key, OpenAI bills you for what your key uses.",
  },
  {
    q: "Can I move my records to a new phone?",
    a: "Yes. Settings can export everything to one file and import it on another phone. Your OpenAI key is not in that file, so you add it again.",
  },
  {
    q: "Which banks and apps does the import understand?",
    a: "It reads bank statement PDFs and screenshots of payment history. I built and tested it on my own ICICI statement and my own Google Pay and PhonePe screenshots, so those are the layouts I can vouch for.",
  },
  {
    q: "Is there an iPhone version?",
    a: "No. Sable is Android only for now.",
  },
  {
    q: "Is Sable financial advice?",
    a: "No. Sable keeps records and adds them up. Any note it writes is for your own information and is not advice from a registered adviser.",
  },
];

/** How it is made. Shown on the About page. From the app's package.json. */
export const STACK: string[] = ["React Native (Expo SDK 54)", "TypeScript", "SQLite on the device", "Zustand", "NativeWind", "OpenAI API with the user's own key"];
