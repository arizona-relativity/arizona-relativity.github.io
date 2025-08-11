/* ===== MEMBER DATA ===== */
const members = [
    {
        name: "Vasileios Paschalidis",
        role: "Professor",
        email: "vpaschal@gmail.com",
        bio: " Things",
        photo: "img/members/vasilis.jpg",
        photoAlt: "Vasileios Paschalidis",
        links: { website: "#", scholar: "#" }
    },
    {
        name: "Erik Wessel",
        role: "PhD Candidate",
        email: "ekwessel@arizona.edu",
        bio: "Other things",
        photo: "img/members/erik.jpg",
        photoAlt: "Erik Wessel",
        links: { github: "#" }
    },
    {
        name: "M Smith",
        role: "PhD Candidate",
        email: "mamsmith@arizona.edu",
        bio: "also other things",
        photo: "img/members/m.jpg",
        photoAlt: "M Smith",
        links: { linkedin: "#" }
    },
    {
        name: "Mahdi Naseri",
        role: "PhD Candidate",
        email: "mnaseri@arizona.edu",
        bio: "also other things",
        photo: "img/members/mahdi.jpg",
        photoAlt: "Mahdi Naseri",
        links: { linkedin: "#" }
    },
    {
        name: "Vikram Manikantan",
        role: "PhD Candidate",
        email: "vik@arizona.edu",
        bio: "Binary Black Hole Accretion, Multimessenger Astronomy, Jet Emission",
        photo: "img/members/vikram.jpg",
        photoAlt: "Vikram Manikantan",
        links: { Publications: "https://ui.adsabs.harvard.edu/search/q=author%3A%22Manikantan%2C%20Vikram%22", GitHub: "https://github.com/vikrammanikantan", "Personal Website": "https://www.vikrammanikantan.com" }
    },
];

/* ===== PAST MEMBER DATA ===== */
const pastMembers = [
    {
        name: "Person 1 ",
        role: "doing something @ somewhere",
        email: "",
        bio: "",
        photo: "img/members/person1.jpg",
        photoAlt: "Person 1",
        links: { website: "#" }
    }
];

/* ===== PROJECT DATA ===== */
const projects = [
    {
        area: "GRMHD + Radiation Transport",
        title: "Coincident Multimessenger Bursts from Eccentric Supermassive Black Holes",
        desc: "blurb 1",
        highlights: ["Variable Dual-jet Launching", "Multimessenger Science"],
        more: "more information about this highlight",
        link: "extras/coincident.html",
        image: "assets/img/highlights/coincident.jpg",
        imageAlt: "Coincident Multimessenger Bursts from Eccentric Supermassive Black Holes"
    },
];


/* ===== HIGHLIGHT DATA ===== */
const highlights = [
    {
        tag: "GRMHD + Radiation Transport",
        title: "Coincident Multimessenger Bursts from Eccentric Supermassive Black Holes",
        blurb: "blurb 1",
        more: "more information about this highlight",
        link: "extras/highlight1.html",
        image: "assets/img/highlights/coincident.jpg",
        imageAlt: "title 1"
    },
    {
        tag: "tag 2",
        title: "title 2",
        blurb: "blurb 2",
        more: "more information about this highlight",
        link: "extras/highlight2.html",
        image: "assets/img/highlights/tilted-disks.jpg",
        imageAlt: "title 2"
    },
    {
        tag: "tag 3",
        title: "title 3",
        blurb: "blurb 3",
        more: "more information about this highlight",
        link: "extras/highlight3.html",
        image: "assets/img/highlights/tilted-disks.jpg",
        imageAlt: "title 3"
    },
];


/* ===== PILLAR DATA ===== */
const pillars = [
    {
        tag: "Numerical Relativity",
        blurb: "Solving Einstein’s equations on a computer to model dynamical spacetimes.",
        details: `
                <p><strong>What it is:</strong> Numerical Relativity solves Einstein’s field equations using
                supercomputers. We discretize spacetime (3+1 split) and evolve it in time to study strong-gravity
                events like black hole or neutron star mergers.</p>
                <p class="mt-2"><strong>Why it matters:</strong> It predicts the precise gravitational waveforms
                detected by LIGO/Virgo/KAGRA and provides the spacetime “stage” on which gas and light move.</p>
                <ul class="mt-3 list-disc pl-5">
                    <li>3+1 formulations (BSSN/CCZ4)</li>
                    <li>Horizon finding & remnant properties</li>
                    <li>Coupling to matter/radiation models</li>
                </ul>
                `,
        image: "img/pillars/numerical-relativity.jpg",
        imageAlt: "Numerical relativity visualization"
    },
    {
        tag: "GRMHD",
        blurb: "General-relativistic magnetohydrodynamics of disks and jets around black holes.",
        details: `
                <p><strong>What it is:</strong> GRMHD models the plasma flowing near black holes, including magnetic
                fields, shocks, and turbulence— all in curved spacetime.</p>
                <p class="mt-2"><strong>Why it matters:</strong> why it matters.</p>
                <ul class="mt-3 list-disc pl-5">
                    <li>Application 1</li>
                    <li>Application 2</li>
                </ul>
                `,
        image: "img/pillars/grmhd.png",
        imageAlt: "GRMHD simulation"
    },
    {
        tag: "Radiation",
        blurb: "Connecting gravitational waves with electromagnetic and neutrino signals.",
        details: `
                <p><strong>What it is:</strong> Blurb</p>
                <p class="mt-2"><strong>Why it matters:</strong> Blurb. </p>
                <ul class="mt-3 list-disc pl-5">
                    <li>Application 1 </li>
                    <li>Application 2 </li>
                </ul>
                `,
        image: "", /* demonstrates gradient fallback */
        imageAlt: "Radiation transport rendering"
    }
];


/* ===== PUBLICATION DATA (now dynamic) ===== */
// const publications = [
//     "Doe, A. et al. (2025). Jet variability in MAD disks. <i>ApJ</i>. <a class='text-[color:var(--ua-red)] hover:underline' href='#'>arXiv:2501.01234</a>",
//     "Rao, K. et al. (2024). EM signatures of SMBBH accretion. <i>MNRAS</i>. <a class='text-[color:var(--ua-red)] hover:underline' href='#'>arXiv:2411.04567</a>",
// ];