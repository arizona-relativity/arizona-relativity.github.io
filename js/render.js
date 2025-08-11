/* ===== UTIL ===== */
const $ = id => document.getElementById(id);

/* ===== CARD RENDERERS ===== */
function renderMembers() {
    const grid = $("membersGrid"); grid.innerHTML = "";
    members.forEach((m, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-left rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition";
        btn.onclick = () => openMemberModal(i);
        btn.innerHTML = `
                        <div class="flex items-center gap-4">
                            <!-- Photo circle -->
                            <img
                            src="${m.photo || ''}"
                            alt="${m.photoAlt || m.name || 'Member photo'}"
                            class="h-12 w-12 rounded-full object-cover border border-white/10"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                            />
                            <!-- Gradient fallback if no photo -->
                            <div class="h-12 w-12 rounded-full hidden"
                                style="background:linear-gradient(135deg, var(--ua-blue), var(--ua-red));"></div>

                            <!-- Text info -->
                            <div>
                            <h3 class="font-semibold text-white">${m.name}</h3>
                            <p class="text-sm text-gray-300">${m.role ?? ""}</p>
                            <p class="text-xs text-gray-400">${m.email ?? ""}</p>
                            </div>
                        </div>

                        <!-- Bio snippet -->
                        <p class="mt-4 text-sm text-gray-300">${m.bio ?? ""}</p>
                        `;
        grid.appendChild(btn);
    });
}

function headerBlock(src, alt, hClass = "h-36") {
  return `
    <div class="w-full ${hClass} relative overflow-hidden">
      <div class="absolute inset-0 header-placeholder"></div>
      ${src ? `
        <img src="${src}" alt="${alt || ''}"
             class="block w-full h-full object-cover"
             onload="this.previousElementSibling.style.display='none';"
             onerror="this.style.display='none'; this.previousElementSibling.style.display='block';">
      ` : ``}
    </div>
  `;
}


function renderProjects() {
    const grid = $("projectsGrid"); grid.innerHTML = "";
    projects.forEach((p, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden";
        btn.onclick = () => openProjectModal(i);
        btn.innerHTML = `
                    ${headerBlock(p.image, p.imageAlt, "h-36")}
                    <div class="p-5">
                        <div class="text-xs uppercase tracking-widest" style="color: rgba(171,5,32,0.85)">${p.area ?? ""}</div>
                        <h3 class="font-semibold text-white mt-1">${p.title}</h3>
                        <p class="text-sm text-gray-300 mt-2">${p.desc ?? ""}</p>
                        ${p.highlights?.length ? `<ul class="mt-3 list-disc pl-5 text-sm text-gray-300">
                        ${p.highlights.map(h => `<li>${h}</li>`).join("")}
                        </ul>` : ""}
                    </div>`;
        grid.appendChild(btn);
    });
}

function renderHighlights() {
    const grid = $("highlights"); grid.innerHTML = "";
    highlights.forEach((h, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden";
        btn.onclick = () => openHighlightModal(i);
        btn.innerHTML = `
                    ${headerBlock(h.image, h.imageAlt, "h-32")}
                    <div class="p-5">
                        <div class="text-xs uppercase tracking-widest" style="color: rgba(171,5,32,0.85)">${h.tag}</div>
                        <h3 class="mt-1 font-semibold text-white">${h.title}</h3>
                        <p class="mt-2 text-sm text-gray-300">${h.blurb}</p>
                        <div class="mt-3 text-sm text-[color:var(--ua-red)] underline underline-offset-4">Read more</div>
                    </div>
                    `;
        grid.appendChild(btn);
    });
}

function renderPubs() {
    $("pubList").innerHTML = publications.map(p => `<li>${p}</li>`).join("");
}

function renderPillars() {
    const grid = $("pillarsGrid"); grid.innerHTML = "";
    pillars.forEach((p, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden";
        btn.onclick = () => openPillarModal(i);
        btn.innerHTML = `
                    ${headerBlock(p.image, p.imageAlt, "h-32")}
                    <div class="p-5">
                        <div class="text-xs uppercase tracking-widest" style="color: rgba(171,5,32,0.85)">${p.tag}</div>
                        <p class="mt-2 text-sm text-gray-300">${p.blurb}</p>
                        <div class="mt-3 text-sm text-[color:var(--ua-red)] underline underline-offset-4">Learn more</div>
                    </div>
                    `;
        grid.appendChild(btn);
    });
}

function openPersonModal(m) {
    hideModalHeader();
    setModalAvatar(m.photo || m.photoLarge || null, m.photoAlt || m.name || "");

    $("modalTitle").textContent = m.name;
    $("modalSubtitle").textContent =
        `${m.role ?? ""}${m.email ? " • " + m.email : ""}${m.now ? " • " + m.now : ""}`;
    $("modalBody").innerHTML = `<p>${m.bio ?? ""}</p>`;

    const links = $("modalLinks"); links.innerHTML = "";
    if (m.links) {
        for (const [k, v] of Object.entries(m.links)) {
            if (v) {
                links.innerHTML += `<a class="underline text-[color:var(--ua-red)]" target="_blank" rel="noopener" href="${v}">${k[0].toUpperCase() + k.slice(1)}</a>`;
            }
        }
    }
    showModal();
}

// Keep these for each list
function openMemberModal(i) { openPersonModal(members[i]); }
function openPastMemberModal(i) { openPersonModal(pastMembers[i]); }

function renderMemberGrid(list, gridId, onOpen) {
    const grid = document.getElementById(gridId); grid.innerHTML = "";
    list.forEach((m, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "text-left rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition";
        btn.onclick = () => onOpen(i);
        btn.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${m.photo || ''}" alt="${m.photoAlt || m.name || 'Member photo'}"
                    class="h-12 w-12 rounded-full object-cover border border-white/10"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                <div class="member-placeholder hidden"></div>
                <div>
                <h3 class="font-semibold text-white">${m.name}</h3>
                <p class="text-sm text-gray-300">${m.role ?? ""}</p>
                ${m.now ? `<p class="text-xs text-gray-400">${m.now}</p>` : ""}
                ${m.email ? `<p class="text-xs text-gray-400">${m.email}</p>` : ""}
                </div>
            </div>
            ${m.bio ? `<p class="mt-4 text-sm text-gray-300">${m.bio}</p>` : ""}
            `;
        grid.appendChild(btn);
    });
}