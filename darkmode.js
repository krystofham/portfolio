document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeSwitcher = document.getElementById("mode-switcher");

  if (modeSwitcher) {
    modeSwitcher.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark-mode");
      localStorage.setItem(
        "mode",
        document.documentElement.classList.contains("dark-mode") ? "dark" : "light"
      );
    });
  }

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const open = hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
      body.style.overflow = open ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      });
    });
  }

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");
  const successScr = document.getElementById("successScreen");
  const FORMSPREE_URL = "https://formspree.io/f/mrerkord";

  if (form && submitBtn && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Vyplň prosím všechna pole.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Zadej platnou e-mailovou adresu.";
        return;
      }

      submitBtn.disabled = true;

      try {
        const res = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (res.ok) {
          form.style.display = "none";
          if (successScr) successScr.hidden = false;
        } else {
          status.textContent = "Něco se pokazilo. Zkus to znovu.";
        }
      } catch {
        status.textContent = "Chyba připojení. Zkontroluj internet a zkus to znovu.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
