document.addEventListener("DOMContentLoaded", () => {

    // --- Dark mode ---
    const modeSwitcher = document.getElementById('mode-switcher');
    const body = document.body;
    const currentMode = localStorage.getItem('mode');

    if (currentMode && currentMode === 'dark') {
        body.classList.add('dark-mode');
    }

    if (modeSwitcher) {
        modeSwitcher.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('mode', mode);
        });
    }

    // --- Scroll top button ---
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
