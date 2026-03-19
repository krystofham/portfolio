document.addEventListener("DOMContentLoaded", () => {

/* ────────────────────────────────────────
    1. DARK MODE
  ──────────────────────────────────────── */
const modeSwitcher = document.getElementById("mode-switcher");
const body = document.body;

if (localStorage.getItem("mode") === "dark") {
    body.classList.add("dark-mode");
}

if (modeSwitcher) {
        modeSwitcher.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("mode", body.classList.contains("dark-mode") ? "dark" : "light");
    });
}

/* ────────────────────────────────────────
    2. NAVBAR — scroll state + active link
  ──────────────────────────────────────── */
const navbar = document.querySelector(".navbar");

if (navbar) {
    const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
};
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mark active link
    const currentPage = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar__links a, .mobile-nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  /* ────────────────────────────────────────
     3. HAMBURGER MENU
  ──────────────────────────────────────── */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const open = hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open", open);
      body.style.overflow = open ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
        body.style.overflow = "";
      });
    });
  }

  /* ────────────────────────────────────────
     4. SCROLL-TO-TOP BUTTON
  ──────────────────────────────────────── */
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ────────────────────────────────────────
     5. REVEAL ON SCROLL (IntersectionObserver)
  ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ────────────────────────────────────────
     6. GALLERY LIGHTBOX
  ──────────────────────────────────────── */
  const lightbox     = document.querySelector(".lightbox");
  const lightboxImg  = lightbox?.querySelector("img");
  const lightboxCap  = lightbox?.querySelector(".lightbox__caption");
  const lightboxClose = lightbox?.querySelector(".lightbox__close");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!img) return;
        lightboxImg.src = img.dataset.full || img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCap) lightboxCap.textContent = img.alt || "";
        lightbox.classList.add("open");
        body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      body.style.overflow = "";
      // Reset src after transition
      setTimeout(() => { lightboxImg.src = ""; }, 300);
    };

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }



  /* ────────────────────────────────────────
     8. HERO TYPE EFFECT (index only)
  ──────────────────────────────────────── */
  const heroName = document.querySelector(".hero__name");

  if (heroName) {
    // Stagger children if any spans exist
    const spans = heroName.querySelectorAll("span");
    spans.forEach((span, i) => {
      span.style.animationDelay = `${i * 0.08}s`;
    });
  }

  /* ────────────────────────────────────────
     9. TABLE — sort on header click (simple)
  ──────────────────────────────────────── */
  document.querySelectorAll("table.sortable").forEach(table => {
    const headers = table.querySelectorAll("thead th");
    headers.forEach((th, col) => {
      th.style.cursor = "pointer";
      th.title = "Seřadit";
      let asc = true;

      th.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((a, b) => {
          const aText = a.cells[col]?.textContent.trim() ?? "";
          const bText = b.cells[col]?.textContent.trim() ?? "";
          return asc ? aText.localeCompare(bText, "cs") : bText.localeCompare(aText, "cs");
        });

        asc = !asc;
        rows.forEach(row => tbody.appendChild(row));

        headers.forEach(h => h.removeAttribute("data-sort"));
        th.dataset.sort = asc ? "desc" : "asc";
      });
    });
  });

  /* ────────────────────────────────────────
     10. SMOOTH LINK TRANSITIONS
  ──────────────────────────────────────── */
  if ("startViewTransition" in document) {
    document.querySelectorAll("a[href]").forEach(link => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.startViewTransition(() => {
          window.location.href = href;
        });
      });
    });
  }

});