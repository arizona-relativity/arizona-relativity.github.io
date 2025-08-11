/* ===== MODAL MEDIA HELPERS ===== */
function setModalAvatar(src, alt = "") {
    const avatar = $("modalAvatar");
    const img = $("modalPhoto");
    const ph = $("modalPlaceholder");
    const row = $("modalMemberRow");
    if (!avatar || !img || !ph || !row) return;

    // Text container (row) is ALWAYS visible; we only toggle the avatar itself
    row.classList.remove("hidden");

    if (src) {
        avatar.classList.remove("hidden");
        img.src = src;
        img.alt = alt || "";
        img.classList.remove("hidden");
        ph.classList.add("hidden");
        img.onerror = () => {
            img.classList.add("hidden");
            img.removeAttribute("src");
            img.alt = "";
            ph.classList.remove("hidden");
        };
    } else {
        // Hide avatar, keep text visible
        img.classList.add("hidden");
        img.removeAttribute("src");
        img.alt = "";
        ph.classList.remove("hidden");       // keep gradient inside avatar (in case you ever show it)
        avatar.classList.add("hidden");      // hide avatar block for non-members
    }
}

function setModalHeader(src, alt = "") {
    const wrap = $("modalHeaderWrap");
    const img = $("modalHeaderImg");
    const ph = $("modalHeaderPh");
    if (!wrap || !img || !ph) return;

    wrap.classList.remove("hidden");
    ph.classList.remove("hidden");

    if (src) {
        img.classList.remove("hidden");
        img.src = src;
        img.alt = alt || "";
        img.onload = () => { ph.classList.add("hidden"); };
        img.onerror = () => {
            img.classList.add("hidden");
            img.removeAttribute("src");
            ph.classList.remove("hidden");
        };
    } else {
        // No image provided: show gradient
        img.classList.add("hidden");
        img.removeAttribute("src");
        ph.classList.remove("hidden");
    }
}

function hideModalHeader() {
    const wrap = $("modalHeaderWrap");
    const img = $("modalHeaderImg");
    const ph = $("modalHeaderPh");
    if (!wrap || !img || !ph) return;
    img.classList.add("hidden");
    img.removeAttribute("src");
    ph.classList.remove("hidden");
    wrap.classList.add("hidden");
}

/* ===== MODAL OPENERS ===== */
function showModal() {
    const m = $("modal");
    m.classList.remove("hidden"); m.classList.add("flex");
    document.body.classList.add("no-scroll");
}
function closeModal() {
    const m = $("modal");
    m.classList.add("hidden"); m.classList.remove("flex");
    document.body.classList.remove("no-scroll");
    // reset media
    hideModalHeader();
    setModalAvatar(null);
}

function openMemberModal(i) {
    const m = members[i];

    hideModalHeader();                                     // no header for members
    setModalAvatar(m.photo, m.photoAlt || m.name || "");   // show avatar

    $("modalTitle").textContent = m.name;
    $("modalSubtitle").textContent = `${m.role ?? ""}${m.email ? " • " + m.email : ""}`;
    $("modalBody").innerHTML = `<p>${m.bio ?? ""}</p>`;

    const links = $("modalLinks"); links.innerHTML = "";
    if (m.links) {
        for (const [k, v] of Object.entries(m.links)) {
            if (v) links.innerHTML += `<a class="underline text-[color:var(--ua-red)]" target="_blank" rel="noopener" href="${v}">${k[0].toUpperCase() + k.slice(1)}</a>`;
        }
    }
    showModal();
}

function openProjectModal(i) {
    const p = projects[i];

    setModalHeader(p.image || null, p.imageAlt || p.title); // header (image or gradient)
    setModalAvatar(null);                                   // hide avatar, keep text

    $("modalTitle").textContent = p.title;
    $("modalSubtitle").textContent = p.area ?? "";
    const body = [`<p>${p.desc ?? ""}</p>`];
    if (p.more) body.push(`<p class="mt-2">${p.more}</p>`);
    if (p.highlights?.length) body.push(`<ul class="mt-3 list-disc pl-5">${p.highlights.map(h => `<li>${h}</li>`).join("")}</ul>`);
    $("modalBody").innerHTML = body.join("");
    $("modalLinks").innerHTML = p.link ? `<a class="underline text-[color:var(--ua-red)]" target="_blank" rel="noopener" href="${p.link}">Learn more</a>` : "";
    showModal();
}

function openHighlightModal(i) {
    const h = highlights[i];

    setModalHeader(h.image || null, h.imageAlt || h.title); // header (image or gradient)
    setModalAvatar(null);                                    // no avatar

    $("modalTitle").textContent = h.title;
    $("modalSubtitle").textContent = h.tag ?? "";
    $("modalBody").innerHTML = `<p>${h.blurb ?? ""}</p>${h.more ? `<p class="mt-2">${h.more}</p>` : ""}`;
    $("modalLinks").innerHTML = h.link ? `<a class="underline text-[color:var(--ua-red)]" target="" rel="noopener" href="${h.link}">Learn more</a>` : "";
    showModal();
}

function openPillarModal(i) {
    const p = pillars[i];

    setModalHeader(p.image || null, p.imageAlt || p.tag); // header (image or gradient)
    setModalAvatar(null);                                  // hide avatar

    $("modalTitle").textContent = p.tag;
    $("modalSubtitle").textContent = "";
    $("modalBody").innerHTML = p.details;
    $("modalLinks").innerHTML = "";
    showModal();
}