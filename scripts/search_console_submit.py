#!/usr/bin/env python3
"""
Submit sitemap to Google Search Console using the Webmasters API.

First run opens browser for OAuth consent. Credentials are saved locally.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from urllib.parse import urljoin

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters"]


def normalize_site_url(site_url: str) -> str:
    site_url = site_url.strip()
    if not site_url.startswith(("http://", "https://")):
        raise ValueError("site-url must start with http:// or https://")
    if not site_url.endswith("/"):
        site_url += "/"
    return site_url


def build_sitemap_url(site_url: str, sitemap: str) -> str:
    sitemap = sitemap.strip()
    if sitemap.startswith(("http://", "https://")):
        return sitemap
    return urljoin(site_url, sitemap.lstrip("/"))


def load_credentials(client_secrets: str, token_file: str) -> Credentials:
    creds = None
    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    elif not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(client_secrets, SCOPES)
        creds = flow.run_local_server(port=0)
        os.makedirs(os.path.dirname(token_file), exist_ok=True)
        with open(token_file, "w", encoding="utf-8") as f:
            f.write(creds.to_json())

    return creds


def main() -> int:
    parser = argparse.ArgumentParser(description="Submit sitemap to Search Console")
    parser.add_argument("--site-url", required=True, help="Example: https://example.com/")
    parser.add_argument(
        "--sitemap",
        default="sitemap.xml",
        help="Relative path (default sitemap.xml) or full sitemap URL",
    )
    parser.add_argument(
        "--client-secrets",
        default=".secrets/google-oauth-client.json",
        help="OAuth client JSON from Google Cloud Console",
    )
    parser.add_argument(
        "--token-file",
        default=".secrets/google-token.json",
        help="Where OAuth token will be stored",
    )
    parser.add_argument(
        "--show-list",
        action="store_true",
        help="Print sitemap list after submit",
    )
    args = parser.parse_args()

    site_url = normalize_site_url(args.site_url)
    sitemap_url = build_sitemap_url(site_url, args.sitemap)

    if not os.path.exists(args.client_secrets):
        print(f"Missing client secrets file: {args.client_secrets}", file=sys.stderr)
        return 2

    creds = load_credentials(args.client_secrets, args.token_file)
    service = build("webmasters", "v3", credentials=creds)

    service.sitemaps().submit(siteUrl=site_url, feedpath=sitemap_url).execute()
    print(f"Submitted sitemap: {sitemap_url}")
    print(f"For property: {site_url}")

    if args.show_list:
        data = service.sitemaps().list(siteUrl=site_url).execute()
        print(json.dumps(data, indent=2, ensure_ascii=True))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

