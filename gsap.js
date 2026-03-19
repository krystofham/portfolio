gsap.registerPlugin(ScrollTrigger);

// Spusť hero animace jen když hero existuje
if (document.querySelector(".hero")) {
// ── 1. HERO CARD — border mizí při scrollu ──────────────────
gsap.to(".hero__card", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",      // začni hned na začátku
    end: "bottom top",     // skonči když hero zmizí z obrazovky
    scrub: true,           // váže se přímo na scroll, ne časovač
  },
  borderColor: "rgba(26, 92, 255, 0)",  // --blue → průhledná
  opacity: 0,
});

// ── 2. HERO NAME — posun nahoru při scrollu ─────────────────
gsap.to(".hero__name", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "center top",
    scrub: 1,              // scrub: 1 = malé zpoždění, plynulejší
  },
  y: -60,                 // posun nahoru o 60px
  opacity: 0,
});

// ── 3. HERO TAGLINE — posun dolů při scrollu ────────────────
gsap.to(".hero__bottom", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "center top",
    scrub: 1,
  },
  y: 40,
  opacity: 0,
});

}

// ── 4. KARTY — staggered reveal při scrollu ─────────────────
// gsap.utils.toArray vezme všechny .card elementy jako pole
gsap.utils.toArray(".card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",   // spusť když je karta 90% od vršku obrazovky
      toggleActions: "play none none none", // jen jednou, ne scrub
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.05,  // každá karta o 50ms později = stagger efekt
  });
});

// ── 5. ACHIEVEMENT CARDS — slide z leva/prava ───────────────
gsap.utils.toArray(".achievement").forEach((el, index) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    x: index % 2 === 0 ? -40 : 40, // sudé zleva, liché zprava
    duration: 0.5,
    delay: index * 0.08,
  });
});

// ── 6. SECTION HEADINGS — underline se rozrůstá ─────────────
gsap.utils.toArray(".section-head h2").forEach((heading) => {
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: "power2.out",
  });
});