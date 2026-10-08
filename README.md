# CharteredONE App (Next.js)

The CharteredONE client app (app.charteredone.com), rebuilt from the single `index.html`
as a Next.js application. Same look, colours, fonts and spacing as the original, with
one page per sidebar menu item.

| Menu item        | Route                | What's on it (MVP)                                                                 |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------- |
| Dashboard        | `/dashboard`         | Summary cards, active requests, popular services, upcoming deadlines, activity     |
| My Services      | `/my-services`       | All requests with status tabs, search, and a detail card with a progress timeline  |
| Explore Services | `/explore-services`  | **The original page, fully working** – tabs, search, filters, saved, detail panel, country & currency, converter |
| Documents        | `/documents`         | Document library by category, "requested from you" list, upload (drag & drop)      |
| Payments         | `/payments`          | Paid / outstanding totals, due banner, invoice table, billing details              |
| Messages         | `/messages`          | Conversation list + chat thread with composer                                      |
| Support          | `/support`           | WhatsApp / call / ticket options, FAQs, new-ticket form, your tickets              |
| Profile          | `/profile`           | Personal & business details, notification settings, security                      |

`/` opens Explore Services, just like the original app did.

> **Sample data:** Every page except Explore Services runs on placeholder data
> (`src/lib/mock/index.ts`) and shows a small "Sample data" tag. Explore Services uses the
> real services feed. Set `NEXT_PUBLIC_SHOW_SAMPLE_DATA=false` to hide the sample user,
> bell and requests (this is how the live page is set today).

---

## How it goes live (auto-deploy)

```
push to GitHub branch `web`  →  GitHub Actions builds the site  →  branch `web-build`
                                                                      ↓ (checked every 5 min)
                                     InMotion server: ~/charteredone-deploy.sh copies it into
                                     the app.charteredone.com folder  →  live
```

- Code lives on the **`web` branch** of `shivam4srtech/charteredweb` (the marketing site stays on `master`).
- `.github/workflows/build-app.yml` builds on every push to `web` and publishes the finished
  files to the **`web-build`** branch (never edit that branch by hand).
- On the server, a cron job runs `deploy/deploy.sh` (installed as `~/charteredone-deploy.sh`)
  every 5 minutes. When `web-build` has changed, it updates the website folder. Log:
  `~/charteredone-deploy.log`. Run it with `--force` to redeploy immediately.
- The site is a **static build** (plain HTML/JS/CSS) served by Apache, so it needs no Node.js on
  the server. URL rules (clean URLs, old Laravel addresses, caching) are in `public/.htaccess`.
- The previous Laravel app was left untouched on the server; switching the subdomain's document
  root back in cPanel → Domains restores it.

## Running it on a computer

You need **Node.js 20.9 or newer** (https://nodejs.org).

```bash
npm install        # once, downloads the libraries
npm run dev        # development mode → http://localhost:3000
npm run build      # production build → out/ folder
```

Optional settings go in a `.env.local` file – copy `.env.example` and edit.

---

## Where things live

```
src/
  app/                      one folder per route (page.tsx = the page)
    layout.tsx              shell: fonts, styles, sidebar + topbar around every page
    dashboard/ my-services/ explore-services/ documents/ payments/ messages/ support/ profile/
  components/
    layout/                 AppShell, Sidebar, Topbar, ExpertCard, shared search
    ui/                     Icon, PageHeader, Panel, StatCard, Tabs, Status pills, Price, Toast
    services/               Explore Services: ServiceExplorer, ServiceCard, ServiceDetailPanel,
                            ServiceIcon, IntlBar (country/currency), CurrencyConverter
    requests/               RequestsTable (used on Dashboard, My Services, Explore)
  lib/
    config.ts               WhatsApp number, links, feed URL, sample-data switch
    navigation.ts           sidebar menu (add/rename/reorder items here)
    services/               feed types, catalog rules (Most Popular, tab order, duplicates),
                            filtering, server loader with fallback
    intl/                   country & currency logic (port of co-intl.js), live rates
    mock/                   SAMPLE DATA for the MVP pages – replace with API calls
    format.ts               money, days, dates
  data/services.fallback.json   THE services list (prices, documents, steps…) — edit + push to update.
                                Also served at /api/app-services like before.
  styles/                   tokens.css (colours/sizes), base, layout, components, explore, pages
public/images/              logo
```

### Common changes

- **Add a menu item** – add a line to `src/lib/navigation.ts` and create `src/app/<route>/page.tsx`.
- **Change colours / sizes** – `src/styles/tokens.css` (same variables as the original `:root`).
- **"Most Popular" services or tab order** – `src/lib/services/catalog.ts`.
- **Connect real data** – replace the exports in `src/lib/mock/index.ts` with API calls
  (keep the same shapes). Each page marks where saving/uploading/sending is local-only with an `MVP:` comment.
- **"Request Service" destination** – `NEXT_PUBLIC_START_REQUEST_URL` (default: WhatsApp chat pre-filled
  with the service name and ID). Point it at the new request flow once it exists.
- **Update services / prices** – edit `src/data/services.fallback.json` and push to `web`.

### Kept from the original

- The services list (now bundled in the repo) and the `/api/app-services` address.
- Old `#service=ID` links and saved hearts (same browser storage key) keep working; legacy
  "Licenses" IDs redirect to their replacements.
- Country picker, display currency with live rates, converter (same storage keys as `co-intl.js`).
- 75% zoom on desktop, mobile slide-in menu, ⌘K / Ctrl K search, Escape to close.
- `window.CharteredONEExplore.open(id)` / `.close()` and the `charteredone:start-request` event.
