# drozdorus.com

Personal website / business card for Ruslan Drozdov.

- **EN version:** `/` (root)
- **UA version:** `/ua/`
- **Stack:** Vanilla HTML / CSS / JS
- **Analytics:** GTM container `GTM-5PTHHBV8`

## Hosting

Cloudflare Pages, project `drozdorus-com` (`drozdorus-com.pages.dev`). DNS: `drozdorus.com` CNAME → `drozdorus-com.pages.dev` (proxied, zone `drozdorus.com` in Cloudflare).

Deploy: push to `main` → Pages builds and publishes automatically. No GitHub Actions workflow in this repo.

Known gaps (as of 2026-06-10): `www` subdomain is not attached to the Pages project (returns 522); no `404.html`, so unknown paths fall back to `index.html` with HTTP 200.
