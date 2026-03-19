gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero__card", {
  scrollTrigger: {
    trigger: ".hero",      // kdy začít — když hero sekce vstoupí do view
    start: "top top",      // začni když je vršek triggeru na vršku obrazovky
    end: "bottom top",     // konec když je spodek triggeru na vršku obrazovky
    scrub: true,           // animace se váže přímo na scroll pozici
  },
  "border-color": "rgba(255,255,255,0)",  // border zmizí
  opacity: 0.3,
});