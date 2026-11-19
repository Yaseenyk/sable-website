# AdSense changes, 19 Nov 2026 (sable.streamerosai.com)

## Privacy and crawl audit (19 Nov 2026)

Method: home loaded in headless Chromium with every third-party request and cookie recorded, two feature pages fetched
raw, and `src/app/layout.tsx` read for scripts injected later. `scripts/check-third-party.mjs` (part of the build) also
lists external script hosts: only pulse.yaseenyk.workers.dev, www.googletagmanager.com and www.clarity.ms.

- Loaded on sable.streamerosai.com: Google Analytics 4 (googletagmanager.com, analytics.google.com,
  stats.g.doubleclick.net; cookies `_ga`, `_ga_V2QT47F2RR`), Microsoft Clarity (clarity.ms, c.bing.com; cookies `_clck`,
  `_clsk`, plus Microsoft's `MUID`/`MR`/`SM`), Pulse (pulse.yaseenyk.workers.dev, no cookies; off on /contact and
  /early-access). On demand only: EmailJS when a form is sent. No AdSense, no Google Fonts request (fonts are self-hosted).
- Privacy page fixed: the Pulse text said only "page views, the page you came from and link clicks"; it now lists what is
  recorded (country, network name, device, scroll, time, speed, clicks). Clarity's own and Microsoft's cookies and a GA
  opt-out link were added. The "No advertising" section is unchanged.
- Crawl: robots.txt allows crawling and names the sitemap. All 18 sitemap URLs return 200, none redirects, none is
  noindex, every canonical matches.
- Raw HTML: main text is in the static HTML (home about 1,620 words, feature pages 780 to 930 words).
