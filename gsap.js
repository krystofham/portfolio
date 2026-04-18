gsap.registerPlugin(ScrollTrigger, CustomEase);
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.set("body", { overflowX: "hidden" });
CustomEase.create("expo.out",  "M0,0 C0.06,0.975 0.15,1 1,1");
CustomEase.create("back.pop",  "M0,0 C0.05,0 0.157,0.771 0.25,0.85 0.354,0.935 0.44,1.046 0.534,1.059 0.661,1.074 0.758,1.003 1,1");

/* ════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════ */
if (document.querySelector(".hero")) {

    /* — Jméno: slide zdola, pak zmizí při scrollu — */
    gsap.from(".hero__name", {
        y: 60, opacity: 0, duration: 1.2,
        ease: "expo.out", delay: 0.1,
    });

    gsap.to(".hero__name", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "50% top",
            scrub: 1.2,
        },
        y: -80, opacity: 0,
    });

    /* — Role (Frontend / Python) — bez kartičky, jen text — */
    /* Odstraň .hero__card z HTML, nech jen .hero__card-roles */
    gsap.from(".hero__card-roles", {
        opacity: 0, scale: 0.85, duration: 1.3,
        ease: "back.pop", delay: 0.35,
    transformOrigin: "center center",
    });

    gsap.from(".hero__role", {
        opacity: 0, y: 30, stagger: 0.18, duration: 1.0,
        ease: "expo.out", delay: 0.5,
    });

    gsap.from(".hero__divider", {
        scaleY: 0, duration: 0.8,
        ease: "expo.out", delay: 0.7,
    });

    /* Roles mizí při scrollu */
    gsap.to(".hero__center", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "60% top",
            scrub: 1,
        },
        opacity: 0, scale: 0.9,
            transformOrigin: "center center", 
    });

    /* — Kontakt tlačítko — */
    gsap.from(".contact__button", {
        opacity: 0, y: 20, duration: 0.9,
        ease: "expo.out", delay: 0.85,
    });

    /* — Bottom strip — */
    gsap.from(".hero__bottom", {
        opacity: 0, y: 30, duration: 1.0,
        ease: "expo.out", delay: 0.9,
    });

    gsap.to(".hero__bottom", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "50% top",
            scrub: 1,
        },
        y: 50, opacity: 0,
    });

    /* — Grid lines parallax — */
    gsap.to(".hero__grid-lines", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        backgroundPositionY: "40%",
        opacity: 0,
    });
}

/* ════════════════════════════════════════════════
   QUICK LINKS — karty (O mně / Projekty / Galerie)
   Přijíždějí z různých stran s 3D perspektivou
════════════════════════════════════════════════ */
const quickCards = gsap.utils.toArray(".grid-3 .card");

quickCards.forEach((card, i) => {
    const fromX = i === 0 ? -80 : i === 2 ? 80 : 0;
    const fromY = i === 1 ? 60 : 20;
    const rotate = i === 0 ? -4 : i === 2 ? 4 : 0;

    gsap.set(card, { transformPerspective: 900 });

    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
        },
        x: fromX,
        y: fromY,
        rotationY: rotate * 1.5,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: "expo.out",
    });

    /* Hover — lehký 3D tilt */
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
        const ry = ((e.clientX - r.left) / r.width  - 0.5) *  12;
        gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.03,
            duration: 0.35, ease: "power2.out",
            transformPerspective: 800, transformOrigin: "center center" });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1,
            duration: 0.7, ease: "elastic.out(1, 0.45)" });
    });
});

/* ════════════════════════════════════════════════
   RYCHLÉ INFO — tabulka + nadpis
   Odhalení po řádcích + shimmer čára
════════════════════════════════════════════════ */
const tableSection = document.querySelector(".table-wrap");

if (tableSection) {
    /* Nadpis */
    gsap.from("#info-heading", {
        scrollTrigger: { trigger: "#info-heading", start: "top 88%" },
        opacity: 0, x: -30, duration: 0.8, ease: "expo.out",
    });

    /* Tabulka jako celek — clip reveal */
    gsap.from(tableSection, {
        scrollTrigger: { trigger: tableSection, start: "top 88%" },
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        onComplete: () => { tableSection.style.clipPath = ""; },
    });

    /* Řádky — stagger */
    gsap.from("tbody tr", {
        scrollTrigger: { trigger: tableSection, start: "top 80%" },
        opacity: 0, x: 20,
        stagger: 0.12,
        duration: 0.6,
        delay: 0.3,
        ease: "expo.out",
    });
}

/* ════════════════════════════════════════════════
   TECH TAGY — wave stagger
════════════════════════════════════════════════ */
gsap.utils.toArray(".tags").forEach((tagGroup) => {
    const tags = tagGroup.querySelectorAll(".tag");

    gsap.from(tags, {
        scrollTrigger: { trigger: tagGroup, start: "top 88%" },
        opacity: 0,
        y: 20,
        scale: 0.85,
        stagger: { each: 0.06, from: "start" },
        duration: 0.5,
        ease: "back.pop",
    });
});

/* ════════════════════════════════════════════════
   SECTION HEADINGS
════════════════════════════════════════════════ */
gsap.utils.toArray(".section-head h2, .label").forEach((el) => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0, y: 18, duration: 0.7, ease: "power2.out",
    });
});

/* ════════════════════════════════════════════════
   ACHIEVEMENT CARDS
════════════════════════════════════════════════ */
gsap.utils.toArray(".achievement").forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 0.6,
        delay: i * 0.08,
        ease: "expo.out",
    });
});

/* ════════════════════════════════════════════════
   SCROLL PROGRESS BAR (pokud existuje)
════════════════════════════════════════════════ */
const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
    gsap.to(progressBar, {
        width: "100%", ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
        },
    });
}