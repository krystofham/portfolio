gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("expo.out", "M0,0 C0.06,0.975 0.15,1 1,1");
CustomEase.create("back.pop", "M0,0 C0.05,0 0.157,0.771 0.25,0.85 0.354,0.935 0.44,1.046 0.534,1.059 0.661,1.074 0.758,1.003 1,1");

/* ── Page header ── */
gsap.from(".page-header h1", {
    y: 50, opacity: 0, duration: 1.1, ease: "expo.out", delay: 0.1,
});

/* ── Project cards — každá přijede jinak ── */
const cards = gsap.utils.toArray(".project-card");

cards.forEach((card, i) => {
    const fromX = i % 3 === 0 ? -60 : i % 3 === 2 ? 60 : 0;
    const fromY = i % 3 === 1 ? 70 : 30;

    gsap.set(card, { transformPerspective: 900, opacity: 0 });

    ScrollTrigger.create({
        trigger: card,
        start: "top 88%",
        once: true,
        onEnter: () => {
            gsap.fromTo(card,
                { x: fromX, y: fromY, opacity: 0, rotationY: fromX * 0.1, scale: 0.95 },
                { x: 0, y: 0, opacity: 1, rotationY: 0, scale: 1,
                  duration: 0.85, delay: (i % 2) * 0.1, ease: "expo.out" }
            );
        }
    });

    /* Hover 3D tilt */
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  / r.height - 0.5) * -8;
        const ry = ((e.clientX - r.left) / r.width  - 0.5) * 10;
        gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.02,
            duration: 0.3, ease: "power2.out",
            transformPerspective: 800, transformOrigin: "center center" });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1,
            duration: 0.7, ease: "elastic.out(1, 0.45)" });
    });

    /* Hover — tlačítka */
    card.querySelectorAll(".btn-solid, .btn-ghost").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { y: -2, duration: 0.2, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });
});

/* ── Tagy — wave stagger uvnitř každé karty ── */
cards.forEach(card => {
    const tags = card.querySelectorAll(".tag");
    ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true,
        onEnter: () => {
            gsap.from(tags, {
                opacity: 0, y: 10, scale: 0.85,
                stagger: 0.06, duration: 0.4, delay: 0.3,
                ease: "back.pop",
            });
        }
    });
});

/* ── Scroll progress bar ── */
const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
    gsap.to(progressBar, {
        width: "100%", ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
}