/* ===== NAV with hash routing (back/forward support) ===== */

let pubsLoaded = false;


function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    (document.getElementById(id) || document.getElementById("home")).classList.remove("hidden");
    document.querySelectorAll("button[data-nav]").forEach(b => {
        if (b.getAttribute("data-nav") === id) b.classList.add("bg-white/10");
        else b.classList.remove("bg-white/10");
    });

    // Lazy-load publications once when Science is opened
    if (id === "science" && !pubsLoaded) {
        pubsLoaded = true;
        import('./pubs.js').then(m => m.renderPubsFromJSON()); // path to your JSON defaults to data/publications.json
    }
}

function navigate(id) {
    if (location.hash !== '#' + id) history.pushState({ page: id }, "", "#" + id);
    showPage(id);
}

document.addEventListener("DOMContentLoaded", () => {
    // Nav clicks
    document.querySelectorAll("button[data-nav]").forEach(b => {
        b.addEventListener("click", () => navigate(b.getAttribute("data-nav")));
    });

    document.getElementById("logoLink")?.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("home");
    });

    // Year
    const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

    // Modal interactions
    $("modal").addEventListener("click", closeModal);
    $("modalPanel").addEventListener("click", e => e.stopPropagation());
    $("modalCloseBtn").addEventListener("click", closeModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    // Render content
    renderPillars();
    renderMembers();
    renderProjects();
    renderHighlights();
    renderPubs();

    // Initial route
    const initial = location.hash ? location.hash.slice(1) : "home";
    showPage(initial);
    if (!location.hash) history.replaceState({ page: initial }, "", "#" + initial);
});

window.addEventListener("popstate", (e) => {
    const id = (e.state && e.state.page) || (location.hash ? location.hash.slice(1) : "home");
    showPage(id);
});

// Call for both lists when page loads
document.addEventListener("DOMContentLoaded", () => {
    renderMemberGrid(members, "membersGrid", openMemberModal);
    renderMemberGrid(pastMembers, "pastMembersGrid", openPastMemberModal);
});