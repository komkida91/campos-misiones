# SEO Automation Playbook

## Objective
Use one quick flow for every new static site so it can be indexed in Google with minimal manual work.

## 1) Run local automation
From repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\seo-setup.ps1 -SiteUrl "https://your-domain.com"
```

With Google verification file creation:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\seo-setup.ps1 -SiteUrl "https://your-domain.com" -VerificationFileName "google123abc.html"
```

What it updates:
- `index.html`: `canonical`, `og:url`, JSON-LD website `url`
- `robots.txt`: sitemap line
- `sitemap.xml`: home URL + `lastmod`
- `CNAME`: only if domain is not `*.netlify.app`
- Google verification file (optional)

## 2) One-command flow (SEO + optional Search Console submit)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\seo-run.ps1 -SiteUrl "https://your-domain.com"
```

With Search Console submit:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\seo-run.ps1 `
  -SiteUrl "https://your-domain.com" `
  -SubmitSitemapToSearchConsole `
  -ClientSecrets ".secrets/google-oauth-client.json" `
  -TokenFile ".secrets/google-token.json"
```

## 3) Publish
```powershell
git add .
git commit -m "SEO setup for domain"
git push origin main
```

## 4) Validate online
- `https://your-domain.com/robots.txt`
- `https://your-domain.com/sitemap.xml`
- Optional verification file:
  - `https://your-domain.com/google123abc.html`

## 5) Search Console API setup (one-time)
1. Create a Google Cloud project
2. Enable Search Console API
3. Create OAuth client credentials (Desktop app)
4. Download JSON to `.secrets/google-oauth-client.json`
5. First script run opens browser auth and stores token in `.secrets/google-token.json`
6. Add `.secrets/` to `.gitignore` (never commit credentials)

Install dependencies:
```powershell
python -m pip install -r .\scripts\requirements-search-console.txt
```

Direct submit command:
```powershell
python .\scripts\search_console_submit.py --site-url "https://your-domain.com/" --sitemap "sitemap.xml"
```

## 6) Google Search Console (manual fallback)
1. Open `https://search.google.com/search-console`
2. Add property (URL prefix) with the final domain
3. Verify ownership (HTML file or HTML tag)
4. Submit sitemap: `sitemap.xml`
5. Request indexing for home URL

## 7) Rules for all future sites
- Keep one primary domain only (avoid duplicate hosts in production)
- HTTPS enabled
- Canonical must point to the final domain
- `robots.txt` must include sitemap URL
- Sitemap must be reachable and valid XML

## 8) What cannot be fully automated
- First ownership verification may require manual action
- URL "Request indexing" has quota limits and may fail with "quota exceeded"
- Indexing speed is always controlled by Google

## Quick troubleshoot
- If Search Console says "Couldn't fetch":
  - Confirm sitemap opens in browser
  - Re-submit after 5-15 minutes
  - Ensure property domain matches sitemap domain exactly
