# drozdorus.com

Personal website / business card for Ruslan Drozdov.

- **EN version:** `/` (root)
- **UA version:** `/ua/`
- **Stack:** Vanilla HTML / CSS / JS
- **Analytics:** GTM container `GTM-5PTHHBV8`

## Hosting

Cloudflare Pages, project `drozdorus-com` (`drozdorus-com.pages.dev`). DNS: `drozdorus.com` CNAME → `drozdorus-com.pages.dev` (proxied, zone `drozdorus.com` in Cloudflare).

Deploy: push to `main` → Pages builds and publishes automatically. No GitHub Actions workflow in this repo.

`www.drozdorus.com` → `https://drozdorus.com` 301 (path + query kept) via Cloudflare Redirect Rule `www to apex` (zone ruleset `84eecdbb…`, phase `http_request_dynamic_redirect`, created 2026-10-11). Before that, www served a duplicate copy of the site.

Security headers (HSTS, CSP, etc.) live in `_headers`; unknown paths return a real 404 via `404.html`. Note: the repo is public and Pages serves every committed file — don't commit anything that shouldn't be world-readable.

## Indexing

- `sitemap.xml` (bump `<lastmod>` on content changes), `robots.txt` (allows everyone, incl. AI crawlers; Cloudflare AI-bot blocking is off), `llms.txt` (plain-text bio for LLMs — keep in sync with the page).
- **IndexNow** key file: `/6cd91e581c817f69be39b85c51c90d0f.txt`. After a deploy, ping Bing/Copilot, Yandex and others:
  `curl -s -X POST https://api.indexnow.org/indexnow -H 'Content-Type: application/json' -d '{"host":"drozdorus.com","key":"6cd91e581c817f69be39b85c51c90d0f","urlList":["https://drozdorus.com/","https://drozdorus.com/ua/","https://drozdorus.com/llms.txt"]}'`
- Images: hero is `img/user1-{280,420}.webp` (PNG stays for schema/OG); slider images have `-400.webp` variants (`cwebp -q 80 -resize 400 0`) — add one for every new `mediaN`/`newsN`.
