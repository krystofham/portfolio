# Dokumentace webového projektu

**Autor:** Kryštof Ham  
**Třída:** I1B  
**Školní rok:** 2025/2026

---

## Název a téma webu

**Název:** Kryštof Ham — Osobní portfolio  
**Téma:** Osobní prezentační web sloužící jako portfolio studenta IT. Web shrnuje informace o autorovi, jeho dovednostech, projektech, certifikacích, soutěžních výsledcích a kontaktních údajích. Součástí je fotogalerie a možnost přepnutí do tmavého režimu.

---

## URL adresa webu

**Produkční nasazení:** https://krystofham.github.io/portfolio  
**Zdrojový kód:** https://github.com/krystofham/portfolio

---

## Popis použité HTML struktury

Web se skládá z **5 samostatných HTML stránek**, každá sdílí stejnou strukturu:

```
index.html / about.html / projects.html / gallery.html / contact.html
```

### Společné prvky všech stránek

- **`<nav class="navbar">`** — fixní navigační lišta obsahující logo, odkazy na všechny stránky, tlačítko přepnutí dark mode a hamburger menu pro mobilní zařízení.
- **`<div class="mobile-nav">`** — překryvné menu pro mobilní zařízení, ovládané JavaScriptem.
- **`<main>`** — hlavní obsahová oblast stránky.
- **`<footer class="footer">`** — patička s ikonami sociálních sítí a copyrightem.
- **`<button id="scrollTopBtn">`** — tlačítko pro návrat na začátek stránky.

### Specifické prvky jednotlivých stránek

**`index.html`** — Hero sekce (`<section class="hero">`) s dekorativními vrstvami (`hero__grid-lines`, `hero__inner`), blokový prvek s názvem (`hero__name`), rozmazaná karta se specializacemi (`hero__card` s `backdrop-filter`), spodní pás s popisem a scroll indikátorem.

**`about.html`** — Stránkové záhlaví (`<header class="page-header">`), sekce s životopisem, **tabulka dovedností** (`<table class="sortable">`), **číslované seznamy** (`<ol class="list-numbered">`), karty soutěžních úspěchů (`.achievement`), odrážkový seznam seminářů (`.list-bullet`).

**`projects.html`** — Mřížka projektových karet (`.project-grid`), každá karta (`<article class="project-card">`) obsahuje záhlaví s názvem a technologiemi, tělo s popisem a seznam funkcí, patičku s tlačítky GitHub a Live ukázka.

**`gallery.html`** — Filtrovací tlačítka (`.filter-btn`) s atributem `data-filter`, fotomřížka (`.gallery-grid`) s položkami obsahujícími `<img>`, záložní placeholder a overlay s lupou. Lightbox (`<div class="lightbox">`) pro zvětšené zobrazení fotky.

**`contact.html`** — Dvousloupcový layout (`.contact-grid`) se sociálními odkazy (`.social-link`) a e-mail blokem (`.email-block`), tabulka kontaktních informací, karta s dostupností.

### Sémantické HTML

V celém projektu jsou důsledně používány sémantické elementy — `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>` a atributy přístupnosti `aria-label`, `aria-expanded`, `role`.

---

## Popis zvoleného CSS layoutu

Veškeré styly jsou v jediném souboru **`styles.css`** (~600 řádků). Design vychází z **editoriálního brutalismu** — dominantní černobílá paleta s modrými akcenty.

### CSS proměnné (Custom Properties)

Veškeré barvy, stíny a přechody jsou definovány jako CSS proměnné v `:root`. Přepnutí dark mode funguje tak, že třída `.dark-mode` na elementu `<body>` přepíše hodnoty proměnných:

```css
:root {
  --bg: #f5f5f0;    --fg: #0a0a0a;
  --card: #ffffff;  --border: #0a0a0a;
  --blue: #1a5cff;
}
.dark-mode {
  --bg: #0a0a0a;    --fg: #f5f5f0;
  --card: #1c1c1c;  --border: #c8c8c8;
}
```

### Layout systém

Stránky využívají kombinaci **CSS Grid** a **Flexbox**:

- **Navbar** — `display: flex` s `justify-content: space-between`
- **Dvousloupcové sekce** — `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))`, automaticky přechází na jeden sloupec na mobilních zařízeních
- **Fotogalerie** — `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`, první položka `grid-column: span 2` pro efekt hlavní fotky
- **Hero sekce** — `min-height: 100vh`, `display: flex`, `flex-direction: column`, `justify-content: space-between` — jméno nahoře vlevo, karta uprostřed (absolutní pozicování), popis dole

### Typografie

Fonty jsou načítány z Google Fonts:
- **DM Serif Display** — nadpisy, display texty (serif, charakter)
- **DM Sans** — tělo textu, navigace, popisky (sans-serif, čitelnost)

Velikosti fontů využívají `clamp()` pro plynulé škálování: `font-size: clamp(2.4rem, 6vw, 5rem)`

### Animace

- **Scroll reveal** — třída `.reveal` nastavuje `opacity: 0` a `transform: translateY(20px)`, JavaScript přidává třídu `.visible` přes `IntersectionObserver`
- **Hero animace** — keyframe animace `heroNameIn`, `heroCardIn`, `heroBottomIn` se zpožděním (`animation-delay`)
- **Hover přechody** — `transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1)` na kartách, odkazech a tlačítkách

### Responzivní design

Breakpointy pomocí `@media`:
- `max-width: 768px` — přechod na jednosloupcový layout, skrytí desktopové navigace, zobrazení hamburger menu
- `max-width: 600px` — úprava hero sekce, zmenšení fontů, vertikální layout patičky

---

## Schéma typické stránky

Níže je zjednodušené schéma struktury stránky `about.html` jako příkladu typické vnitřní stránky:

```
┌─────────────────────────────────────────────────┐
│  NAVBAR  [KH]  [Úvod][O mně][Projekty]..  [🌙]  │  ← position: fixed, černé pozadí
├─────────────────────────────────────────────────┤
│                                                 │
│  PAGE HEADER                                    │  ← padding-top: 60px (výška navbaru)
│  label: "Stránka 01"                            │
│  h1: "O mně"                                    │  ← DM Serif Display, clamp(2.2rem→4.5rem)
│  ───────────────────────────────────────────    │  ← border-bottom: 1px solid
│                                                 │
│  SECTION — Kdo jsem                             │
│  ┌──────────────────┐  ┌──────────────────┐    │  ← CSS Grid, 2 sloupce (auto-fill)
│  │  .card           │  │  .card--dark      │    │
│  │  Bio text        │  │  Jazyky / Zájmy   │    │
│  │  + .tags         │  │  .list-bullet     │    │
│  └──────────────────┘  └──────────────────┘    │
│                                                 │
│  ── divider ─────────────────────────────────   │  ← border-top: 1px solid
│                                                 │
│  SECTION — Dovednosti                           │
│  ┌─────────────────────────────────────────┐   │
│  │  <table class="sortable">               │   │  ← thead černý, tbody střídá hover
│  │  Technologie │ Oblast │ Úroveň │ Použití │   │
│  │  HTML        │ Front  │ ██████  │ ...    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  SECTION — Soutěže                              │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐  │  ← Grid, 2 sloupce
│  │ .achievement│  │.achievement│  │    ...   │  │
│  │ [🥉] text  │  │ [🥇] text  │  │          │  │
│  └────────────┘  └────────────┘  └──────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│  FOOTER  [KH © 2026]          [in] [gh]         │  ← černé pozadí, bílý text
└─────────────────────────────────────────────────┘
         ↑ max-width: 1100px, margin: 0 auto (container)
```

**Vysvětlivky ke schématu:**
- Celý obsah je zabalený v `.container` (max-width: 1100px, horizontální padding přes `clamp()`)
- Každá sekce má třídu `.section` s vertikálním paddingem `clamp(3rem, 8vw, 7rem)`
- Karty `.card` mají `border: 1px solid var(--border)` a `border-radius: 16px`
- Tabulka je zabalena v `.table-wrap` s `overflow-x: auto` pro mobilní zařízení
- Prvky s třídou `.reveal` jsou při načtení neviditelné a zobrazí se při scrollování

---

*Dokumentace vypracována v rámci předmětu webového vývoje, školní rok 2025/2026.*