window.copyContactTailwind = function(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = btn.querySelector('span');
        const originalText = tooltip.getAttribute('data-original') || tooltip.textContent.trim();
        if (!tooltip.hasAttribute('data-original')) {
            tooltip.setAttribute('data-original', originalText);
        }
        tooltip.textContent = 'Copied!';
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
            tooltip.textContent = originalText;
        }, 2000);
    });
};
