/* ═══════════════════════════════════════════════════════
   GALLERY — GSAP animations
   Requires: gsap, ScrollTrigger, CustomEase
   ═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
gsap.registerPlugin(ScrollTrigger, CustomEase);

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

items.forEach((item, i) => {
    const variant = ENTRANCE_VARIANTS[i % ENTRANCE_VARIANTS.length];

    /* Skryj před spuštěním */
    gsap.set(item, { opacity: 0 });

    ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        once: true,
        onEnter: () => variant(item),
    });
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
                    el.classList.add("hidden");
                    gsap.set(el, { clearProps: "all" });
                    gsap.set(el, { opacity: 0 });
                }
            });
        });

        /* Příchod — každý svoji variantou */
        toShow.forEach((el, i) => {
            el.classList.remove("hidden");
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
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";

    const rect   = originEl.getBoundingClientRect();
    const fromX  = (rect.left + rect.width  / 2 - window.innerWidth  / 2) * 0.35;
    const fromY  = (rect.top  + rect.height / 2 - window.innerHeight / 2) * 0.35;

    gsap.fromTo(lightbox,
        { backgroundColor: "rgba(0,0,0,0)" },
        { backgroundColor: "rgba(0,0,0,0.88)", duration: 0.5, ease: "expo.out" }
    );
    gsap.fromTo(lbImg,
        { scale: 0.5, x: fromX, y: fromY, opacity: 0, rotation: -3 },
        { scale: 1,   x: 0,     y: 0,     opacity: 1, rotation: 0,
          duration: 0.7, ease: "back.pop" }
    );
    if (lbClose) {
        gsap.fromTo(lbClose,
            { opacity: 0, rotate: -90, scale: 0.7 },
            { opacity: 1, rotate: 0,   scale: 1, duration: 0.5, delay: 0.3, ease: "back.pop" }
        );
    }
    if (lbCaption) {
        gsap.fromTo(lbCaption,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0,  duration: 0.5, delay: 0.35, ease: "expo.out" }
        );
    }
}

function closeLightbox() {
    if (!lbOpen || !lightbox) return;
    const tl = gsap.timeline({ onComplete: () => {
        lightbox.classList.remove("open");
        lbImg.src = "";
        lbOpen = false;
        document.body.style.overflow = "";
    }});
    tl.to([lbImg, lbCaption, lbClose].filter(Boolean),
        { opacity: 0, scale: 0.88, y: 24, stagger: 0.04, duration: 0.3, ease: "power3.in" });
    tl.to(lightbox,
        { backgroundColor: "rgba(0,0,0,0)", duration: 0.3, ease: "power2.in" }, "<0.1");
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
}