import os
import requests
import json

# --- CONFIG ---
ORCIDS = [
    "0000-0002-8099-9023",  # Replace with your ORCID
    # "0000-0003-AAAA-BBBB",  # Add more if needed
]
YEAR_RANGE = "2017-3000"
FIELDS = ["bibcode", "author", "title", "year", "bibstem", "doi", "arxiv_eprint"]
ROWS = 50  # Max results per ORCID

# --- ADS Token ---
TOKEN = os.getenv("ADS_API_TOKEN")
if not TOKEN:
    raise SystemExit("❌ Please set ADS_API_TOKEN environment variable.")

all_pubs = []

for orcid in ORCIDS:
    print(f"🔍 Fetching for ORCID {orcid}...")
    q = f'orcid:"{orcid}" year:{YEAR_RANGE}'
    url = "https://api.adsabs.harvard.edu/v1/search/query"
    params = {
        "q": q,
        "fl": ",".join(FIELDS),
        "sort": "date desc",
        "rows": ROWS
    }
    resp = requests.get(url, headers={"Authorization": f"Bearer {TOKEN}"}, params=params)
    resp.raise_for_status()
    docs = resp.json()["response"]["docs"]
    all_pubs.extend(docs)

# Remove duplicates by bibcode
unique_pubs = {pub["bibcode"]: pub for pub in all_pubs}.values()

# Sort newest first
sorted_pubs = sorted(unique_pubs, key=lambda p: p["year"], reverse=True)

# --- Save to publications.json ---
with open("publications.json", "w") as f:
    json.dump({"response": {"docs": sorted_pubs}}, f, indent=2)

print(f"✅ Saved {len(sorted_pubs)} unique publications to publications.json")
