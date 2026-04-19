# Webový projekt — ZWA

**Autor:** Kryštof Ham  
**Třída:** I1B  
**Školní rok:** 2025/2026

---

## Název a téma webu

**Název a téma:** Kryštof Ham — Osobní portfolio

---

## URL adresa webu

**Web:** https://krystofham.github.io/portfolio  
**Zdrojový kód:** https://github.com/krystofham/portfolio

---

## Postup tvorby

| Od | Do | Počet hodin | Popis |
|---|---|---|---|
| 28. 12. 2025 | 28. 12. 2025 | 4 h | Základní struktura projektu, initial commit, HTML kostry stránek, první CSS, dark mode, hamburger menu, scroll-to-top |
| 28. 12. 2025 | 30. 12. 2025 | 3 h | Doplnění obsahu (dovednosti, soutěže, certifikace, zájmy), úpravy navigace pro mobilní zařízení |
| 19. 3. 2026 | 19. 3. 2026 | 5 h | Kompletní refaktor HTML a CSS, první pokusy s GSAP animacemi, přidání async JS, oprava přístupnosti (aria atributy) |
| 12. 3. 2026 | 26. 3. 2026 | 4 h | Aktualizace obsahu (about, projects, contact), úpravy index stránky, Claude refaktor |
| 16. 4. 2026 | 16. 4. 2026 | 3 h | Refaktor hero sekce, přidání projektů, aktualizace about stránky |
| 18. 4. 2026 | 18. 4. 2026 | 6 h | GSAP animace pro galerii a projekty, oprava dark mode, mobilní navigace, DOM galerie |
| 19. 4. 2026 | 19. 4. 2026 | 4 h | Ladění GSAP galerie (7 pokusů), konverze obrázků na WebP, přidání Formspree formuláře, W3C validace všech stránek |
| **Celkem** | | **~29 h** | |

---

## Popis použité HTML struktury

Web tvoří **5 samostatných HTML stránek**: `index.html`, `about.html`, `projects.html`, `gallery.html`, `contact.html`.

Každá stránka sdílí stejné společné prvky:

- **`<nav class="navbar">`** — fixní navigační lišta s logem, odkazy, přepínačem dark mode a hamburger tlačítkem pro mobilní zařízení.
- **`<div class="mobile-nav">`** — překryvné menu pro mobilní zařízení.
- **`<main>`** — hlavní obsahová oblast.
- **`<footer>`** — patička s ikonami sociálních sítí a copyrightem.
- **`<button id="scrollTopBtn">`** — tlačítko pro návrat nahoru.

---

## Popis zvoleného CSS layoutu

Veškeré styly jsou v souboru **`styles.css`**. 

**CSS proměnné (Custom Properties)** — všechny barvy jsou definovány v `:root`. Dark mode funguje přepsáním hodnot proměnných třídou `.dark-mode` na elementu `<html>`:

```css
:root { --bg: #f5f5f0; --fg: #0a0a0a; --card: #ffffff; --border: #0a0a0a; }
.dark-mode { --bg: #0a0a0a; --fg: #f5f5f0; --card: #1c1c1c; }
```

**Layout** — kombinace CSS Grid a Flexbox:
- Navbar: `display: flex`, `justify-content: space-between`
- Dvousloupcové sekce: `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))` — automaticky přechází na jeden sloupec na mobilu
- Fotogalerie: `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`, první položka `grid-column: span 2`
- Hero: `min-height: 100svh`, jméno vlevo nahoře, karta absolutně vystředěna, pás dole

**Animace** — třída `.reveal` nastavuje `opacity: 0` + `transform: translateY(20px)`, JavaScript přidává `.visible` přes `IntersectionObserver`. Komplexnější animace řeší GSAP (scroll-triggered entrance, 3D hover tilt, parallax hero, stagger efekty).

**Responzivita** — breakpointy `@media (max-width: 768px)` a `@media (max-width: 600px)`.

---

## Schéma typické stránky

Níže je schéma stránky `about.html` jako příklad typické vnitřní stránky:

```
┌──────────────────────────────────────────────────────┐
│  <nav class="navbar">                                │  position: fixed, z-index: 100
│  [KH]  [Úvod] [O mně*] [Projekty] [Galerie] [🌙]   │  * aktivní odkaz — třída .active
├──────────────────────────────────────────────────────┤
│                                                      │
│  <header class="page-header">                        │  padding-top: 60px (výška navbaru)
│    <h1>O mně</h1>                                    │  DM Serif Display, clamp(2.2rem→4.5rem)
│  ─────────────────────────────────────────────────   │  border-bottom: 1px solid var(--border)
│                                                      │
│  <section> — Kdo jsem                                │
│  ┌─────────────────────┐ ┌─────────────────────┐    │  CSS Grid: auto-fill, minmax(340px,1fr)
│  │ <div class="card">  │ │ <div class="card">  │    │  border: 1px solid; border-radius: 16px
│  │  Bio, <strong>,<em> │ │  <ul> Jazyky/Zájmy  │    │
│  │  <div class="tags"> │ │  <span class="tag"> │    │
│  └─────────────────────┘ └─────────────────────┘    │
│                                                      │
│  <section> — Dovednosti                              │
│  ┌──────────────────────────────────────────────┐   │
│  │ <table class="sortable">                     │   │  overflow-x: auto (mobil)
│  │  <thead> Technologie │ Oblast │ Úroveň │ ... │   │  thead: tmavé pozadí, bílý text
│  │  <tbody> HTML │ Frontend │ Pokročilý │ ...  │   │  tbody tr: hover efekt
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  <section> — Soutěže                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐  │  CSS Grid, 2 sloupce
│  │ .achievement │ │ .achievement │ │ .achievement│  │  reveal animace při scrollu
│  │  🥉 3. místo │ │  🥇 1. místo │ │  ✓ Řešitel  │  │
│  └──────────────┘ └──────────────┘ └─────────────┘  │
│                                                      │
├──────────────────────────────────────────────────────┤
│  <footer class="footer">                             │  tmavé pozadí, bílý text
│  [Kryštof Ham © 2026]              [LinkedIn][GitHub]│
└──────────────────────────────────────────────────────┘
         ↑ .container: max-width 1100px, margin: 0 auto
```

**Vysvětlivky:**
- Každá sekce má třídu `.section` s paddingem `clamp(3rem, 8vw, 7rem)`
- Prvky s třídou `.reveal` jsou při načtení neviditelné (`opacity: 0`) a zobrazí se při scrollování přes `IntersectionObserver`
- Karty `.card` mají `border: 1px solid var(--border)` a `border-radius: 16px`
- Tabulka je zabalena v `.table-wrap` s `overflow-x: auto` pro mobilní zařízení

SPOLUGENEROVÁNO CLAUDE AI Sonnet 3.6