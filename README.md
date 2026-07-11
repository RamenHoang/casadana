# Casadana Homestay — Website

A Next.js recreation of the Casadana Homestay landing page design (bilingual EN/VI, scroll animations, Messenger booking links). Plain `<img>` tags, no CMS/backend yet — ready to extend later.

## Project structure
```
casadana-homestay/
  app/
    layout.js          root layout, fonts
    globals.css         all styles (plain CSS, no framework)
    content.js           all copy + data (EN/VI), edit text here
    Reveal.js             scroll-reveal wrapper component
    page.js                 the Home page
    properties/[slug]/page.js   placeholder page for each of the 3 homestays
  public/assets/         photos used on the site
```

## Phase 1 — Run it locally
```bash
cd casadana-homestay
npm install
npm run dev
```
Open http://localhost:3000

## Phase 2 — Test checklist
- [ ] EN / VI toggle in the nav switches all copy
- [ ] Hero image breathes + parallaxes on scroll; text fades in on load
- [ ] Sections fade up as you scroll (About, Rooms, Stays, Gallery, Location)
- [ ] Nav shrinks + gets a shadow after scrolling down
- [ ] "Our Homestays" rows link to `/properties/le-dinh-duong`, `/properties/nguyen-thong-1`, `/properties/nguyen-thong-2` (placeholder pages for now)
- [ ] Messenger buttons point to `https://m.me/casadana.home` (update the handle in `app/content.js` if needed)
- [ ] Resize the window under ~900px to check the mobile layout

## Phase 3 — Sync into your local `/Users/mac/MyProjects/casadana` project
This design tool can't write directly to your machine, so:
1. Download this `casadana-homestay` folder (zip) from the design tool.
2. Unzip it and copy the contents into `/Users/mac/MyProjects/casadana`. If that folder already has other files from Claude Code, don't blindly overwrite — open Claude Code there and ask it to merge/review the incoming files instead.
3. In that folder, run `npm install && npm run dev` to confirm it still works.
4. From here on, use Claude Code in that project for further changes (new pages, a booking backend, CMS, etc.) — this design tool is for the visual design, Claude Code is for the real codebase.

## Phase 4 — Push to GitHub
```bash
git init                     # if not already a repo
git add -A
git commit -m "Casadana Homestay — initial Next.js site"
# create the repo on github.com, then:
git remote add origin git@github.com:<you>/casadana-homestay.git
git branch -M main
git push -u origin main
```
(Or use `gh repo create casadana-homestay --source=. --public --push` if you have the GitHub CLI.)

## Phase 5 — Deploy to Vercel (GitHub-connected)
1. Go to vercel.com → **Add New… → Project**.
2. Import the `casadana-homestay` GitHub repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. You'll get a `*.vercel.app` URL. Every push to `main` auto-redeploys.

## Phase 6 — Later
- Connect a custom domain (e.g. `casadana.home`) in the Vercel project's Domains tab once you own one.
- Replace the 3 placeholder pages in `app/properties/[slug]/page.js` with real per-property content (rooms, galleries, pricing).
- When you add a booking backend/CMS, keep `app/content.js` as the fallback/default copy and wire real data in on top.
