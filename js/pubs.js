// js/pubs.js

const JOURNAL_NAMES = {
  "PhRvD":  "Physical Review D",
  "PhRvL":  "Physical Review Letters",
  "ApJ":    "The Astrophysical Journal",
  "ApJL":   "The Astrophysical Journal Letters",
  "ApJS":   "The Astrophysical Journal Supplement",
  "MNRAS":  "Monthly Notices of the Royal Astronomical Society",
  "A&A":    "Astronomy & Astrophysics",
  "CQGra":  "Classical and Quantum Gravity",
  "NatAs":  "Nature Astronomy",
  "Natur":  "Nature",
  "Sci":    "Science",
  "JCAP":   "Journal of Cosmology and Astroparticle Physics",
  "GReGr":  "General Relativity and Gravitation",
  "LRR":    "Living Reviews in Relativity",
  "ARA&A":  "Annual Review of Astronomy and Astrophysics",
};

function fmtLink(url, label) {
  return `<a target="_blank" rel="noopener" href="${url}">${label}</a>`;
}

function toItemHTML(doc) {
  const title  = Array.isArray(doc.title) ? doc.title[0] : (doc.title || "Untitled");
  const year   = doc.year || "";
  const stem   = Array.isArray(doc.bibstem) ? doc.bibstem[0] : (doc.bibstem || "");
  const journal = JOURNAL_NAMES[stem] || stem;

  // DOI: first entry that isn't the arXiv DOI
  const dois   = doc.doi ?? [];
  const doiRaw = dois.find(d => !d.startsWith("10.48550"));
  const doiURL = doiRaw ? `https://doi.org/${doiRaw}` : null;

  // arXiv: extract from the 10.48550/arXiv.XXXX DOI entry
  const axDOI  = dois.find(d => d.startsWith("10.48550/arXiv."));
  const axID   = axDOI ? axDOI.replace("10.48550/arXiv.", "") : (doc.arxiv_eprint ?? null);
  const axURL  = axID ? `https://arxiv.org/abs/${axID}` : null;

  const fallback = doc.bibcode
    ? `https://ui.adsabs.harvard.edu/abs/${doc.bibcode}/abstract` : "#";

  const links = [
    doiURL ? fmtLink(doiURL, "DOI") : null,
    axURL  ? fmtLink(axURL,  "arXiv") : null,
    (!doiURL && !axURL) ? fmtLink(fallback, "ADS") : null,
  ].filter(Boolean).join(" · ");

  // Format authors as "F. Last"
  let authors = "";
  if (Array.isArray(doc.author) && doc.author.length > 0) {
    const fmt = doc.author.slice(0, 5).map(name => {
      const parts = name.split(",").map(s => s.trim());
      if (parts.length === 2) {
        const initials = parts[1].split(/\s+/).map(w => w[0] + ".").join(" ");
        return `${initials} ${parts[0]}`;
      }
      return name;
    });
    authors = fmt.join(", ");
    if (doc.author.length > 5) authors += " et al.";
  }

  const meta = [authors, year, journal ? `<i>${journal}</i>` : "", links]
    .filter(Boolean).join(" · ");

  return `<li class="pub-item">
    <div class="pub-title">${title}</div>
    <div class="pub-meta">${meta}</div>
  </li>`;
}



export async function renderPubsFromJSON(jsonPath = "data/publications.json"){
  const ul = document.getElementById("pubList");
  if (!ul) return;
  ul.innerHTML = "<li>Loading…</li>";
  try {
    const res = await fetch(jsonPath, { cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const docs = data?.response?.docs ?? [];
    ul.innerHTML = docs.length ? docs.map(toItemHTML).join("") : "<li>No results.</li>";
  } catch (err) {
    console.error("Publications load failed:", err);
    ul.innerHTML = "<li>Failed to load publications.</li>";
  }
}
