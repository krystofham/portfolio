# Kryštof Ham — Osobní portfolio

Osobní prezentační web studenta IT. Zahrnuje bio, přehled dovedností, projekty, fotogalerii a kontaktní formulář. Nasazeno na GitHub Pages.

**Live:** https://krystofham.github.io/portfolio  
**Repo:** https://github.com/krystofham/portfolio

---

## Stránky

| Soubor | Obsah |
|---|---|
| `index.html` | Hero sekce, přehledové karty, tech tagy, quick-info tabulka |
| `about.html` | Bio, dovednosti, certifikace, soutěže, semináře, plány |
| `projects.html` | Projektové karty — Testolingo, F1 simulátor, Portfolio |
| `gallery.html` | Fotogalerie s filtry a lightboxem |
| `contact.html` | Sociální profily, e-mail, kontaktní formulář (Formspree) |

---

## Technologie

**Čistý web stack — žádné frameworky, žádné závislosti pro build.**

- HTML5, CSS3 (vlastní proměnné, Grid, Flexbox, `clamp()`)
- Vanilla JavaScript (ES6+)
- [GSAP 3](https://gsap.com/) + ScrollTrigger + CustomEase — animace
- [Formspree](https://formspree.io/) — zpracování kontaktního formuláře

---

## Struktura projektu

```
portfolio/
├── index.html          # Domovská stránka
├── about.html          # O mně
├── projects.html       # Projekty
├── gallery.html        # Fotogalerie
├── contact.html        # Kontakt
│
├── styles.css          # Veškeré styly (~600 řádků)
├── darkmode.js         # Navbar, dark mode, hamburger, scroll-to-top, view transitions
├── gsap.js             # GSAP animace pro index.html
├── projects-gsap.js    # GSAP animace pro projects.html
├── gallery-gsap.js     # GSAP animace + lightbox pro gallery.html
│
└── img/                # Fotky pro galerii
```

---

## Funkce

**Dark mode** — přepínač v navbaru, stav se ukládá do `localStorage`, třída `.dark-mode` na `<html>` přepíná CSS proměnné.

**Responzivní design** — breakpointy na `768px` a `600px`. Pod `768px` se skryje desktopová navigace a zobrazí hamburger menu.

**Animace (GSAP)** — scroll-triggered entrance animace, 3D hover tilt na kartách, parallax hero sekce, stagger efekty na tazích a řádcích tabulky.

**Galerie** — filtrování podle kategorie s animovanými přechody, lightbox se zoom animací (origin-aware), 3D hover tilt na fotkách.

**Kontaktní formulář** — asynchronní odeslání přes Formspree API bez přesměrování, klientská validace, loading spinner, animovaná success obrazovka, honeypot anti-spam pole.

**Page transitions** — nativní View Transitions API (`document.startViewTransition`) pro plynulé přechody mezi stránkami, kde je prohlížeč podporuje.

**Sortable tabulka** — klik na záhlaví třídí řádky podle sloupce (česká lokalizace přes `localeCompare`).

---

## Nasazení

Web je statický — žádný build krok není potřeba. Stačí nahrát soubory na libovolný hosting.

**GitHub Pages:**

```bash
git clone https://github.com/krystofham/portfolio
cd portfolio
# Pushni na větev gh-pages nebo nastav Pages na main v nastavení repozitáře
```

---

## Autor

**Kryštof Ham** — student SPŠEI Ostrava, I1B, 2025/2026  
Frontend (HTML/CSS/JS), Python, Flask, Git, základy kybernetické bezpečnosti

- Email: krystof.ham@proton.me  
- LinkedIn: [linkedin.com/in/kryštof-ham](https://www.linkedin.com/in/kry%C5%A1tof-ham-bb79533a1/)  
- GitHub: [github.com/krystofham](https://github.com/krystofham)