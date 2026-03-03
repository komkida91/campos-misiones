param(
  [Parameter(Mandatory = $true)]
  [string]$SiteUrl,

  [string]$VerificationFileName = "",

  [switch]$SubmitSitemapToSearchConsole,

  [string]$Sitemap = "sitemap.xml",

  [string]$ClientSecrets = ".secrets/google-oauth-client.json",

  [string]$TokenFile = ".secrets/google-token.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir

Write-Host "1) Applying SEO files..."
& (Join-Path $scriptDir "seo-setup.ps1") -SiteUrl $SiteUrl -VerificationFileName $VerificationFileName

if (-not $SubmitSitemapToSearchConsole) {
  Write-Host "2) Search Console submit skipped."
  exit 0
}

Write-Host "2) Submitting sitemap to Search Console..."
$pythonScript = Join-Path $scriptDir "search_console_submit.py"

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  throw "Python not found in PATH. Install Python 3 and retry."
}

$clientSecretsPath = Join-Path $repoRoot $ClientSecrets
$tokenFilePath = Join-Path $repoRoot $TokenFile

python $pythonScript `
  --site-url $SiteUrl `
  --sitemap $Sitemap `
  --client-secrets $clientSecretsPath `
  --token-file $tokenFilePath

Write-Host "Done."

