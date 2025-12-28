document.addEventListener("DOMContentLoaded", function() {
    const modeSwitcher = document.getElementById('mode-switcher');
    const body = document.body;
    const currentMode = localStorage.getItem('mode');

    if (currentMode && currentMode === 'dark') {
        body.classList.add('dark-mode');
    }

    modeSwitcher.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('mode', mode);
        updateButtonText();
    });
});