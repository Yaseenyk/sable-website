# Sable website

The website for Sable, a personal expense tracker app for Android. Live at https://sable.streamerosai.com.

Next.js 14 (App Router, static export), TypeScript, Tailwind. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out, then the checks below
```

## Where things live

- `src/lib/content.ts`: every fact on the site (features, what is sent to OpenAI, limits, FAQ). Edit content here. Each line was checked against the app's source; nothing is invented.
- `src/lib/site.ts`: name, description, version, contact, verification tokens, analytics ids.
- `src/lib/shots.ts` and `public/shots/`: real screens from the app (720 x 1600 WebP).
- `src/lib/routes.ts`: every indexable page. The sitemap, llms.txt and the build check read it.
- `src/lib/seo.ts`: canonicals, per-page metadata and all JSON-LD (written only through `components/JsonLd.tsx`).
- `src/app/`: one folder per page. `/early-access/` is a form-only page: noindex, and not in the sitemap.

## Rules

- Honest content only: no invented numbers, reviews, ratings or user counts. The app is in private testing and the site says so.
- The app pictures are real screens with sample entries, and every caption says that.
- No ads. `scripts/verify-no-ads.mjs` fails the build if Google ad code appears.
- Only approved third-party scripts. `scripts/check-third-party.mjs` fails the build on any other host, and on any payment provider.
- Every sitemap page needs a canonical, exactly one h1, a 50 to 160 character description and the share image (`scripts/verify-sitemap.mjs`).
- The privacy page describes only what is switched on. Google Analytics and Clarity are off (empty ids in `site.ts`); if you add an id, add its paragraph to `src/app/privacy/page.tsx` in the same change.

## Images

`python scripts/make-images.py <path to the app's 1024px icon.png>` rebuilds the icons and the share card (`public/og.png`, from `scripts/og-card.html`). Needs Pillow and Chrome or Edge.

## One-time setup (done on 19 Nov 2026 unless marked)

- DNS: CNAME record `sable` pointing to `yaseenyk.github.io` (GoDaddy).
- GitHub Pages: source "GitHub Actions", custom domain `sable.streamerosai.com`, Enforce HTTPS.
- To do: add `sable.streamerosai.com` to the allowed origins in the EmailJS dashboard, or the forms fall back to the email link.
- To do: add the site as a URL-prefix property in Google Search Console and submit `/sitemap.xml`.

Made by [Yaseen Khatib](https://yk.streamerosai.com).
