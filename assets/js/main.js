// Initialize Lucide icons
        lucide.createIcons();

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Resource tab filtering
        const tabs = document.querySelectorAll('.resource-tab');
        const articles = document.querySelectorAll('[data-type]');

        function setActiveTab(activeTab) {
            tabs.forEach(tab => {
                tab.classList.remove('active-tab', 'bg-slate-900', 'text-white', 'border-slate-900');
                tab.classList.add('border-slate-200', 'text-slate-500');
            });
            activeTab.classList.add('active-tab', 'bg-slate-900', 'text-white', 'border-slate-900');
            activeTab.classList.remove('border-slate-200', 'text-slate-500');
        }

        // Set initial active state for "All" tab
        setActiveTab(document.querySelector('[data-tab="all"]'));

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.tab;
                setActiveTab(tab);

                articles.forEach(article => {
                    if (filter === 'all' || article.dataset.type === filter) {
                        article.style.display = '';
                        article.style.opacity = '0';
                        article.style.transform = 'translateY(8px)';
                        requestAnimationFrame(() => {
                            article.style.transition = 'opacity 300ms ease, transform 300ms ease';
                            article.style.opacity = '1';
                            article.style.transform = 'translateY(0)';
                        });
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        });

        // Contact form handling
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formMessage.className = 'text-center text-sm font-medium py-2 rounded-lg bg-red-50 text-red-500';
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.remove('hidden');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="animate-pulse">Sending...</span>';

            setTimeout(() => {
                formMessage.className = 'text-center text-sm font-medium py-2 rounded-lg bg-emerald-50 text-emerald-500';
                formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formMessage.classList.remove('hidden');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i data-lucide="send" class="w-4 h-4"></i>';
                lucide.createIcons();

                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });

        // Navbar background on scroll
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                nav.classList.add('shadow-sm');
            } else {
                nav.classList.remove('shadow-sm');
            }
        });
        
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