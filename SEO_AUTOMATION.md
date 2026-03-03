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

## 2) Publish
```powershell
git add .
git commit -m "SEO setup for domain"
git push origin main
```

## 3) Validate online
- `https://your-domain.com/robots.txt`
- `https://your-domain.com/sitemap.xml`
- Optional verification file:
  - `https://your-domain.com/google123abc.html`

## 4) Google Search Console (manual)
1. Open `https://search.google.com/search-console`
2. Add property (URL prefix) with the final domain
3. Verify ownership (HTML file or HTML tag)
4. Submit sitemap: `sitemap.xml`
5. Request indexing for home URL

## 5) Rules for all future sites
- Keep one primary domain only (avoid duplicate hosts in production)
- HTTPS enabled
- Canonical must point to the final domain
- `robots.txt` must include sitemap URL
- Sitemap must be reachable and valid XML

## Quick troubleshoot
- If Search Console says "Couldn't fetch":
  - Confirm sitemap opens in browser
  - Re-submit after 5-15 minutes
  - Ensure property domain matches sitemap domain exactly

