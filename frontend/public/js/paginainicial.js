document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('language');
    const elements = document.querySelectorAll('[data-lang]');

    function updateLanguage(lang) {
        elements.forEach(el => {
            const text = el.dataset[lang];
            if(text) el.textContent = text;
        });
    }

    selector.addEventListener('change', e => {
        updateLanguage(e.target.value);
    });

    updateLanguage('pt');
});
