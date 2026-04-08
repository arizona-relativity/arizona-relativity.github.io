(function () {
  function $(id) { return document.getElementById(id); }

  function openModal(type, idx) {
    const list = window.SITE[type];
    if (!list) return;
    const item = list[idx];
    if (!item) return;

    // ── Header image (projects, highlights, pillars) ──
    const hdr = $("modal-header");
    const isCard = ["pillars","highlights","projects"].includes(type);
    if (isCard) {
      hdr.hidden = false;
      hdr.innerHTML = item.image
        ? `<img class="modal-header-img" src="${item.image}" alt="${item.imageAlt || ''}"
               onerror="this.outerHTML='<div class=modal-header-ph></div>'">`
        : `<div class="modal-header-ph"></div>`;
    } else {
      hdr.hidden = true;
      hdr.innerHTML = "";
    }

    // ── Avatar (members) ──
    const avatarWrap = $("modal-avatar-wrap");
    const isMember = type === "members" || type === "pastMembers";
    if (isMember) {
      avatarWrap.hidden = false;
      $("modal-avatar").src = item.photo || "";
      $("modal-avatar").alt = item.photoAlt || item.name || "";
    } else {
      avatarWrap.hidden = true;
    }

    // ── Title / subtitle ──
    $("modal-title").textContent    = item.name || item.title || item.tag || "";
    $("modal-subtitle").textContent = isMember
      ? [item.role, item.email].filter(Boolean).join(" • ")
      : (item.area || item.tag || "");

    // ── Body ──
    let body = "";
    if (item.details) {
      body = item.details;                                     // pillars: pre-built HTML
    } else {
      const desc = item.bio || item.blurb || item.desc || "";
      if (desc) body += `<p>${desc}</p>`;
      if (item.more) body += `<p style="margin-top:0.5rem">${item.more}</p>`;
      if (item.highlights?.length)
        body += `<ul style="margin-top:0.75rem;padding-left:1.25rem">
                   ${item.highlights.map(h => `<li>${h}</li>`).join("")}
                 </ul>`;
    }
    $("modal-text").innerHTML = body;

    // ── Links ──
    let links = "";
    if (item.links) {
      for (const [k, v] of Object.entries(item.links)) {
        if (v && v !== "#")
          links += `<a href="${v}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`;
      }
    }
    if (item.link) links += `<a href="${item.link}" target="_blank" rel="noopener">Learn more</a>`;
    $("modal-links").innerHTML = links;

    $("modal-backdrop").classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    $("modal-backdrop").classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  window.openModal  = openModal;
  window.closeModal = closeModal;

  document.addEventListener("DOMContentLoaded", function () {
    $("modal-backdrop")?.addEventListener("click", closeModal);
    $("modal-panel")?.addEventListener("click", function (e) { e.stopPropagation(); });
    $("modal-close")?.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  });
})();
