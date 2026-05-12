/* ═══════════════════════════════════════════════════════
   GALLERY — GSAP animations
   Requires: gsap, ScrollTrigger, CustomEase
   ═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
gsap.registerPlugin(ScrollTrigger, CustomEase);
if (!window.matchMedia("(pointer: coarse)").matches) {

CustomEase.create("expo.out", "M0,0 C0.06,0.975 0.15,1 1,1");
CustomEase.create("back.pop", "M0,0 C0.05,0 0.157,0.771 0.25,0.85 0.354,0.935 0.44,1.046 0.534,1.059 0.661,1.074 0.758,1.003 1,1");

/* ── Každé n-té foto dostane jinou vstupní animaci ── */
const ENTRANCE_VARIANTS = [
    /* 0 — spadne shora + lehce se otočí */
    (el) => gsap.fromTo(el,
        { y: -80, rotation: -6, opacity: 0, scale: 0.9 },
        { y: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.pop" }
    ),

    /* 1 — přijede zleva s blur efektem */
    (el) => gsap.fromTo(el,
        { x: -100, opacity: 0, filter: "blur(12px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "expo.out",
          onComplete: () => el.style.filter = "" }
    ),

    /* 2 — vyroste ze středu jako karta */
    (el) => gsap.fromTo(el,
        { scale: 0.4, opacity: 0, rotation: 8, transformOrigin: "center center" },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.0, ease: "back.pop" }
    ),

    /* 3 — přijede zprava s odrazem */
    (el) => gsap.fromTo(el,
        { x: 120, opacity: 0, skewX: -8 },
        { x: 0, opacity: 1, skewX: 0, duration: 0.8, ease: "expo.out" }
    ),

    /* 4 — odhalení přes clipPath (závěs) */
    (el) => gsap.fromTo(el,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.out",
          onComplete: () => el.style.clipPath = "" }
    ),

    /* 5 — šikmo zdola + rotation */
    (el) => gsap.fromTo(el,
        { y: 100, x: -40, rotation: 5, opacity: 0 },
        { y: 0, x: 0, rotation: 0, opacity: 1, duration: 0.95, ease: "back.pop" }
    ),
];

/* ── Přiřadíme varianty fotkám (cyklicky) ─────────────── */
const items = gsap.utils.toArray(".gallery-item");

// Skryj všechny hned
items.forEach(item => gsap.set(item, { opacity: 0 }));

// Počkej až se načtou všechny obrázky
const images = [...document.querySelectorAll(".gallery-item img")];
const loads  = images.map(img => new Promise(res => {
    if (img.complete) return res();
    img.addEventListener("load",  res, { once: true });
    img.addEventListener("error", res, { once: true });
}));

Promise.all(loads).then(() => {
    items.forEach((item, i) => {
        const variant = ENTRANCE_VARIANTS[i % ENTRANCE_VARIANTS.length];
        const rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight + 50) {
            variant(item);
        } else {
            ScrollTrigger.create({
                trigger: item,
                start: "top 100%",
                once: true,
                onEnter: () => variant(item),
            });
        }
    });

    setTimeout(() => ScrollTrigger.refresh(), 100);
});

/* ── Hover: jemný 3D tilt ─────────────────────────────── */
items.forEach(item => {
    item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / rect.height) * -12;
        const ry = ((e.clientX - cx) / rect.width) * 14;

        gsap.to(item, {
            rotationX: rx,
            rotationY: ry,
            transformPerspective: 800,
            transformOrigin: "center center",
            scale: 1.03,
            duration: 0.35,
            ease: "power2.out",
        });
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(item, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
        });
    });
});

/* ── Filter: stagger out/in s různými exit animacemi ──── */
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const toHide = items.filter(el => !(filter === "all" || el.dataset.cat === filter));
        const toShow = items.filter(el =>   filter === "all" || el.dataset.cat === filter);

        /* Odchod — každý jinak */
        toHide.forEach((el, i) => {
            const exits = [
                { y: -50, rotation: -10, opacity: 0, scale: 0.8 },
                { x: 80,  skewX: 10,     opacity: 0 },
                { scale: 0.3, opacity: 0, rotation: 15 },
            ];
            gsap.to(el, {
                ...exits[i % exits.length],
                duration: 0.35,
                ease: "power3.in",
                onComplete: () => {
                    el.style.display = "none";          // ← místo classList.add("hidden")
                    gsap.set(el, { clearProps: "all" });
                }
            });
        });

        /* Příchod — každý svoji variantou */
        toShow.forEach((el, i) => {
            el.classList.remove("hidden");
            el.style.display = "";
            const variant = ENTRANCE_VARIANTS[i % ENTRANCE_VARIANTS.length];
            gsap.delayedCall(0.2 + i * 0.08, () => variant(el));
        });
    });
});

/* ── Lightbox ─────────────────────────────────────────── */
const lightbox  = document.getElementById("lightbox");
const lbImg     = lightbox?.querySelector("img");
const lbCaption = lightbox?.querySelector(".lightbox__caption");
const lbClose   = lightbox?.querySelector(".lightbox__close");
let lbOpen = false;

function openLightbox(src, alt, originEl) {
    if (lbOpen || !lightbox) return;
    lbOpen = true;

    lbImg.src = src;
    lbImg.alt = alt;
    if (lbCaption) lbCaption.textContent = alt;

    // Nejdřív zobraz element, pak animuj opacity přes GSAP
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";

    // Animuj přes opacity (ne backgroundColor) — CSS má display:flex přes .open
    gsap.fromTo(lightbox,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "expo.out" }
    );
    // Img — nepoužívej scale/x/y, nech CSS transition pracovat
    gsap.fromTo(lbImg,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)" }
    );
    if (lbClose) {
        gsap.fromTo(lbClose,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.35, delay: 0.15, ease: "back.out(1.4)" }
        );
    }
    if (lbCaption) {
        gsap.fromTo(lbCaption,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, delay: 0.2, ease: "expo.out" }
        );
    }
}

function closeLightbox() {
    if (!lbOpen || !lightbox) return;

    gsap.to(lightbox, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            lightbox.classList.remove("open");
            lbImg.src = "";
            lbOpen = false;
            document.body.style.overflow = "";
            // Reset GSAP inline styles aby CSS zase fungoval příště
            gsap.set([lightbox, lbImg, lbClose, lbCaption].filter(Boolean), { clearProps: "all" });
        }
    });
}
items.forEach(item => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!img) return;
        openLightbox(img.dataset.full || img.src, img.alt, item);
    });
    item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.click(); }
    });
});

lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ── Scroll progress bar (pokud existuje) ─────────────── */
const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
    gsap.to(progressBar, {
        width: "100%",
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
}

/* ── Page header word reveal ──────────────────────────── */
const wordInner = document.querySelector(".page-header h1 .word-inner");
if (wordInner) {
    gsap.fromTo(wordInner,
        { y: "110%" },
        { y: "0%", duration: 1.1, ease: "expo.out", delay: 0.1 }
    );
}
});
}