document.addEventListener("DOMContentLoaded", () => {

    const headernavHTML = `
    <header>
        <h1>Kryštof Ham</h1>
        <p>Student</p>
        <button class="dark-toggle" id="mode-switcher">
            <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="28" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75
                       0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3
                       11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0
                       9.002-5.998Z" />
            </svg>
            <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="28" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
        </button>
    </header>
    <nav>
            <a href="index.html">Informace</a>
            <a href="projects.html">Projekty</a>
            <a href="contact.html">Kontakt</a>
    </nav>
    `;

    const top = `
    <button id="scrollTopBtn" title="Nahoru">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
        </svg>
    </button>
    `;

    const footerHTML = `
        <footer>
        <a href="https://www.linkedin.com/in/kry%C5%A1tof-ham-bb79533a1/" aria-label="LinkedIn" target="_blank">
            <svg  width=40 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        </a>

        <a href="https://github.com/krystofham/" target="_blank">
        <svg width=40  role="img" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg></a><br>
        <a href="mailto:krystof.ham@proton.me"><p>krystof.ham@proton.me</p></a>
        Kryštof Ham 2025</footer>
    `;

    document.querySelectorAll("[data-include]").forEach(el => {
        const type = el.getAttribute("data-include");
        if (type === "headernav") el.innerHTML = headernavHTML;
        if (type === "top") el.innerHTML = top;
        if (type === "footer") el.innerHTML = footerHTML;
    });

    const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("visible");
    } else {
        scrollBtn.classList.remove("visible");
    }
});


    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
});
