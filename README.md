# drozdorus.com

Personal website / business card for Ruslan Drozdov.

- **EN version:** `/` (root)
- **UA version:** `/ua/`
- **Stack:** Vanilla HTML / CSS / JS
- **Analytics:** GTM container `GTM-5PTHHBV8`

## Hosting

Cloudflare Pages, project `drozdorus-com` (`drozdorus-com.pages.dev`). DNS: `drozdorus.com` CNAME → `drozdorus-com.pages.dev` (proxied, zone `drozdorus.com` in Cloudflare).

Deploy: push to `main` → Pages builds and publishes automatically. No GitHub Actions workflow in this repo.

Known gap (as of 2026-06-10): `www` subdomain is not attached to the Pages project (returns 522) — fix manually in the Cloudflare dashboard (Workers & Pages → `drozdorus-com` → Custom domains).

Security headers (HSTS, CSP, etc.) live in `_headers`; unknown paths return a real 404 via `404.html`. Note: the repo is public and Pages serves every committed file — don't commit anything that shouldn't be world-readable.
