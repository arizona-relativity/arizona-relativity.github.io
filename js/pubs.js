// js/pubs.js
function fmtLink(url, label){
  return `<a class='text-[color:var(--ua-red)] hover:underline' target="_blank" rel="noopener" href="${url}">${label}</a>`;
}

function toItemHTML(doc) {
  const title    = Array.isArray(doc.title) ? doc.title[0] : (doc.title || "Untitled");
  const year     = doc.year || "";
  const journal  = doc.bibstem ? `<i>${doc.bibstem}</i>` : "";
  const doiURL   = doc.doi?.[0] ? `https://doi.org/${doc.doi[0]}` : null;
  const axURL    = doc.arxiv_eprint ? `https://arxiv.org/abs/${doc.arxiv_eprint}` : null;
  const fallback = doc.bibcode ? `https://ui.adsabs.harvard.edu/abs/${doc.bibcode}/abstract` : "#";
  const link     = doiURL ? fmtLink(doiURL, "DOI") : (axURL ? fmtLink(axURL, "arXiv") : fmtLink(fallback, "ADS"));

  // Format first 3 authors as "First Last"
  let authors = "";
  if (Array.isArray(doc.author) && doc.author.length > 0) {
    const firstThree = doc.author.slice(0, 3).map(name => {
      const parts = name.split(",").map(s => s.trim());
      return parts.length === 2 ? `${parts[1]} ${parts[0]}` : name;
    });
    authors = firstThree.join(", ");
    if (doc.author.length > 3) authors += " et al.";
  }

  return `<li>${authors} (${year}). ${title}. ${journal} ${link}</li>`;
}



export async function renderPubsFromJSON(jsonPath = "publications.json"){
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
