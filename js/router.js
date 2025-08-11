/* ===== NAV with hash routing (back/forward support) ===== */
let pubsLoaded = false;

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  (document.getElementById(id) || document.getElementById("home")).classList.remove("hidden");
  document.querySelectorAll("button[data-nav]").forEach(b=>{
    if (b.getAttribute("data-nav") === id) b.classList.add("bg-white/10");
    else b.classList.remove("bg-white/10");
  });

  // Lazy-load publications once when Science is opened
  if (id === "science" && !pubsLoaded) {
    pubsLoaded = true;
    import('/js/pubs.js').then(m => m.renderPubsFromJSON()); // uses data/publications.json by default
  }
}

function navigate(id){
  if (location.hash !== '#' + id) history.pushState({ page:id }, "", "#" + id);
  showPage(id);
}

document.addEventListener("DOMContentLoaded", () => {
  // Nav clicks
  document.querySelectorAll("button[data-nav]").forEach(b=>{
    b.addEventListener("click", ()=> navigate(b.getAttribute("data-nav")));
  });
  document.getElementById("logoLink")?.addEventListener("click", (e)=>{
    e.preventDefault();
    navigate("home");
  });

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Modal interactions
  $("modal")?.addEventListener("click", closeModal);
  $("modalPanel")?.addEventListener("click", e=>e.stopPropagation());
  $("modalCloseBtn")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", e=>{ if (e.key==="Escape") closeModal(); });

  // Render static content
  renderPillars();
  renderMembers();
  renderProjects();
  renderHighlights();
  // ⛔️ remove renderPubs(); you now load pubs via pubs.js when Science tab opens

  // Member grids (current + past)
  renderMemberGrid?.(members, "membersGrid", openMemberModal);
  renderMemberGrid?.(pastMembers, "pastMembersGrid", openPastMemberModal);

  // Mobile menu toggle
  const toggle = document.getElementById("navToggle");
  const menu   = document.getElementById("mobileMenu");
  function closeMenu(){
    if (!menu) return;
    menu.classList.add("hidden");
    toggle?.setAttribute("aria-expanded","false");
  }
  function openMenu(){
    if (!menu) return;
    menu.classList.remove("hidden");
    toggle?.setAttribute("aria-expanded","true");
  }
  toggle?.addEventListener("click", ()=>{
    const isOpen = !menu.classList.contains("hidden");
    isOpen ? closeMenu() : openMenu();
  });
  menu?.addEventListener("click", (e)=>{
    const t = e.target;
    if (t.matches("[data-nav], a")) closeMenu();
  });
  document.addEventListener("keydown", e=>{ if (e.key==="Escape") closeMenu(); });

  // Initial route
  const initial = location.hash ? location.hash.slice(1) : "home";
  showPage(initial);
  if (!location.hash) history.replaceState({ page: initial }, "", "#" + initial);
});

// Single popstate handler (also closes mobile menu)
window.addEventListener("popstate", (e)=>{
  const id = (e.state && e.state.page) || (location.hash ? location.hash.slice(1) : "home");
  showPage(id);
  // also collapse mobile menu on back/forward
  document.getElementById("mobileMenu")?.classList.add("hidden");
  document.getElementById("navToggle")?.setAttribute("aria-expanded","false");
});
