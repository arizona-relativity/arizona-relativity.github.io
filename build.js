#!/usr/bin/env node
// build.js — generates static HTML from data/site.json
// Usage: node build.js

const fs   = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("data/site.json", "utf8"));
const year = new Date().getFullYear();

// ── HTML escape (for attribute values and text nodes) ──
function e(s) {
  return String(s ?? "")
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;");
}

// ── Card image or gradient placeholder ──
function cardImg(src, alt, height = "h-9rem") {
  return src
    ? `<img class="card-img" src="${e(src)}" alt="${e(alt)}"
           onerror="this.outerHTML='<div class=card-img-ph></div>'">`
    : `<div class="card-img-ph"></div>`;
}

// ── Card: pillar ──
function pillarCard(p, i) {
  return `
  <button class="card" onclick="openModal('pillars',${i})" type="button">
    ${cardImg(p.image, p.imageAlt)}
    <div class="card-body">
      <div class="card-tag">${e(p.tag)}</div>
      <p>${e(p.blurb)}</p>
      <span class="card-more">Learn more</span>
    </div>
  </button>`;
}

// ── Card: highlight ──
function highlightCard(h, i) {
  return `
  <button class="card" onclick="openModal('highlights',${i})" type="button">
    ${cardImg(h.image, h.imageAlt)}
    <div class="card-body">
      <div class="card-tag">${e(h.tag)}</div>
      <h3>${e(h.title)}</h3>
      <p>${e(h.blurb)}</p>
      <span class="card-more">Read more</span>
    </div>
  </button>`;
}

// ── Card: project ──
function projectCard(p, i) {
  return `
  <button class="card" onclick="openModal('projects',${i})" type="button">
    ${cardImg(p.image, p.imageAlt)}
    <div class="card-body">
      <div class="card-tag">${e(p.area)}</div>
      <h3>${e(p.title)}</h3>
      <p>${e(p.desc)}</p>
    </div>
  </button>`;
}

// ── Card: member ──
function memberCard(m, i, type) {
  const avatar = m.photo
    ? `<img class="avatar" src="${e(m.photo)}" alt="${e(m.photoAlt || m.name)}"
           loading="lazy"
           onerror="this.outerHTML='<div class=avatar-ph></div>'">`
    : `<div class="avatar-ph"></div>`;
  return `
  <button class="member-card" onclick="openModal('${type}',${i})" type="button">
    <div class="member-row">
      ${avatar}
      <div>
        <div class="member-name">${e(m.name)}</div>
        <div class="member-role">${e(m.role ?? "")}</div>
      </div>
    </div>
    ${m.bio ? `<p class="member-bio">${e(m.bio)}</p>` : ""}
  </button>`;
}

// ── Shared nav / footer / modal ──
function nav(active) {
  const link = (href, label, key) =>
    `<a href="${href}"${active === key ? ' class="active"' : ""}>${label}</a>`;
  return `
  <header>
    <div class="header-inner">
      <a class="logo" href="index_new.html">
        <div class="logo-dot"></div>
        Arizona Relativity
      </a>
      <nav>
        ${link("index_new.html",   "Home",    "home")}
        ${link("science_new.html", "Science", "science")}
        ${link("members_new.html", "Members", "members")}
        <a href="compass.html">COMPASS ↗</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer>
    <div class="footer-inner">
      <span>© ${year} Arizona Relativity Group · Steward Observatory</span>
      <div class="footer-links">
        <a href="https://astro.arizona.edu/" target="_blank" rel="noopener">Steward Observatory</a>
        <a href="https://astro.arizona.edu/research-groups/theoretical-astrophysics-program" target="_blank" rel="noopener">TAP</a>
        <a href="https://ui.adsabs.harvard.edu/search/q=orcid:0000-0002-8099-9023&sort=date%20desc" target="_blank" rel="noopener">ADS Publications</a>
      </div>
    </div>
  </footer>`;
}

function modal() {
  return `
  <div id="modal-backdrop" class="modal-backdrop">
    <div id="modal-panel" class="modal-panel" role="dialog" aria-modal="true">
      <button id="modal-close" class="modal-close">Close</button>

      <div id="modal-header"></div>

      <div class="modal-body">
        <div class="modal-member-top">
          <div id="modal-avatar-wrap">
            <img id="modal-avatar" class="modal-avatar" alt="">
          </div>
          <div id="modal-member-info">
            <div id="modal-title"    class="modal-title"></div>
            <div id="modal-subtitle" class="modal-subtitle"></div>
          </div>
        </div>
        <div id="modal-text"     class="modal-text"></div>
        <div id="modal-links"    class="modal-links"></div>
      </div>
    </div>
  </div>`;
}

function scripts(extra = "") {
  return `
  <script>window.SITE = ${JSON.stringify(data)};</script>
  <script src="js/modal-new.js"></script>${extra}`;
}

const PUBS_SCRIPT = `
  <script type="module">
    import { renderPubsFromJSON } from "./js/pubs.js";
    renderPubsFromJSON();
  </script>`;

function shell(title, active, body, extraScripts = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(title)} — Arizona Relativity</title>
  <link rel="icon" type="image/png" href="img/logo_circle_gradient.png">
  <link rel="stylesheet" href="css/new.css">
</head>
<body>
${nav(active)}
<main>
${body}
</main>
${footer()}
${modal()}
${scripts(extraScripts)}
</body>
</html>`;
}

// ── HOME ──
function buildHome() {
  const pillarsHTML  = data.pillars.map(pillarCard).join("");
  const highlightsHTML = data.highlights.map(highlightCard).join("");

  return shell("Home", "home", `
  <div class="hero">
    <h1>Dynamical Gravity and Multimessenger Astrophysics @ Arizona</h1>
    <p>Gravity · Relativistic Plasmas · Radiation</p>
    <div class="hero-btns">
      <a class="btn btn-red"  href="science_new.html">Our Science</a>
      <a class="btn btn-blue" href="members_new.html">Meet the Team</a>
    </div>
  </div>

  <section>
    <div class="grid-3">${pillarsHTML}</div>
  </section>

  <section>
    <h2>Recent Highlights</h2>
    <div class="grid-3">${highlightsHTML}</div>
  </section>
  `);
}

// ── SCIENCE ──
function buildScience(extraScripts = "") {
  const projectsHTML = data.projects.map(projectCard).join("");

  return shell("Science", "science", `
  <section>
    <h2>Science</h2>
    <div class="grid-2">${projectsHTML}</div>

    <div style="margin-top:3rem">
      <h3>
        Latest Publications
        <a href="https://ui.adsabs.harvard.edu/search/q=orcid:0000-0002-8099-9023&sort=date%20desc"
           target="_blank" rel="noopener"
           style="font-size:0.85rem;font-weight:400;color:var(--red);text-decoration:none;margin-left:0.5rem">[ADS]</a>
      </h3>
      <ul id="pubList"><li>Loading…</li></ul>
    </div>
  </section>
  `, extraScripts);
}

// ── MEMBERS ──
function buildMembers() {
  const currentHTML = data.members.map((m, i) => memberCard(m, i, "members")).join("");
  const pastHTML    = data.pastMembers.map((m, i) => memberCard(m, i, "pastMembers")).join("");

  return shell("Members", "members", `
  <section>
    <h2>Current Members</h2>
    <div class="grid-3">${currentHTML}</div>

    <h2 style="margin-top:3rem">Past Members</h2>
    <div class="grid-3">${pastHTML}</div>
  </section>
  `);
}

// ── Write files ──
const pages = [
  { file: "index_new.html",   html: buildHome()    },
  { file: "science_new.html", html: buildScience(PUBS_SCRIPT) },
  { file: "members_new.html", html: buildMembers() },
];

pages.forEach(({ file, html }) => {
  fs.writeFileSync(path.join(__dirname, file), html);
  console.log(`✓ ${file}`);
});

// Science page needs pubs.js — patch it in after writing
// (pubs.js already fetches data/publications.json at runtime; no changes needed)
console.log("\nDone. Open index_new.html in a browser to preview.");
