param(
  [Parameter(Mandatory = $true)]
  [string]$SiteUrl,

  [string]$VerificationFileName = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Normalize-SiteUrl {
  param([string]$Url)
  $normalized = $Url.Trim()
  if (-not ($normalized.StartsWith("http://") -or $normalized.StartsWith("https://"))) {
    throw "SiteUrl must start with http:// or https://"
  }
  return $normalized.TrimEnd("/")
}

function Update-RegexOrFail {
  param(
    [string]$Content,
    [string]$Pattern,
    [string]$Replacement,
    [string]$Label
  )

  if (-not [regex]::IsMatch($Content, $Pattern)) {
    throw "Could not update $Label. Pattern not found."
  }
  $updated = [regex]::Replace($Content, $Pattern, $Replacement)
  return $updated
}

function Write-TextNoBom {
  param(
    [string]$Path,
    [string]$Content
  )
  if (Test-Path $Path) {
    $current = [System.IO.File]::ReadAllText($Path)
    if ($current -eq $Content) {
      return
    }
  }
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

$root = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $root "index.html"
$robotsPath = Join-Path $root "robots.txt"
$sitemapPath = Join-Path $root "sitemap.xml"
$cnamePath = Join-Path $root "CNAME"

if (-not (Test-Path $indexPath)) {
  throw "index.html not found at: $indexPath"
}

$site = Normalize-SiteUrl -Url $SiteUrl
$siteHost = ([Uri]$site).Host
$today = Get-Date -Format "yyyy-MM-dd"
$nl = [Environment]::NewLine

$index = Get-Content -Raw -Path $indexPath
$index = Update-RegexOrFail -Content $index -Pattern '<link rel="canonical" href="[^"]*"\s*/?>' -Replacement "<link rel=`"canonical`" href=`"$site/`" />" -Label "canonical"
$index = Update-RegexOrFail -Content $index -Pattern '<meta property="og:url" content="[^"]*"\s*/?>' -Replacement "<meta property=`"og:url`" content=`"$site/`" />" -Label "og:url"
$index = Update-RegexOrFail -Content $index -Pattern '"url"\s*:\s*"[^"]*"' -Replacement "`"url`": `"$site/`"" -Label "JSON-LD url"
Write-TextNoBom -Path $indexPath -Content $index

$robots = @(
  "User-agent: *"
  "Allow: /"
  ""
  "Sitemap: $site/sitemap.xml"
) -join $nl
Write-TextNoBom -Path $robotsPath -Content $robots

$sitemap = @(
  "<?xml version=`"1.0`" encoding=`"UTF-8`"?>"
  "<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">"
  "  <url>"
  "    <loc>$site/</loc>"
  "    <lastmod>$today</lastmod>"
  "    <changefreq>weekly</changefreq>"
  "    <priority>1.0</priority>"
  "  </url>"
  "</urlset>"
) -join $nl
Write-TextNoBom -Path $sitemapPath -Content $sitemap

if ($siteHost -notlike "*.netlify.app") {
  Write-TextNoBom -Path $cnamePath -Content $siteHost
}

if ($VerificationFileName.Trim() -ne "") {
  $fileName = $VerificationFileName.Trim()
  if ($fileName -notmatch '^google[0-9a-z]+\.html$') {
    throw "VerificationFileName must look like: google123abc.html"
  }
  $verificationPath = Join-Path $root $fileName
  $verificationContent = "google-site-verification: $fileName"
  Write-TextNoBom -Path $verificationPath -Content $verificationContent
}

Write-Host "SEO files updated for: $site"
Write-Host "Updated: index.html, robots.txt, sitemap.xml"
if ($siteHost -notlike "*.netlify.app") {
  Write-Host "Updated: CNAME -> $siteHost"
}
if ($VerificationFileName.Trim() -ne "") {
  Write-Host "Created verification file: $VerificationFileName"
}
