// ── Tooltip toggle logic ──
  let activeTooltip = null;

  function toggleTooltip(btn, text, url) {
    const tooltip = btn.querySelector('.ci-tooltip');

    // If clicking the same tooltip that's already open, navigate
    if (activeTooltip === tooltip && tooltip.classList.contains('show')) {
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else if (btn.href.startsWith('tel:')) {
        window.location.href = btn.href;
      } else if (btn.href.startsWith('mailto:')) {
        window.location.href = btn.href;
      }
      closeAllTooltips();
      return;
    }

    // Close any open tooltip
    closeAllTooltips();

    // Open this tooltip
    tooltip.classList.add('show');
    activeTooltip = tooltip;
  }

  function closeAllTooltips() {
    document.querySelectorAll('.ci-tooltip.show').forEach(t => t.classList.remove('show'));
    activeTooltip = null;
  }

  // Close tooltips when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ci-btn')) {
      closeAllTooltips();
    }
  });

  // ── Slide Navigation ──
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  const progressFill = document.getElementById('progressFill');
  const slideCounter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const tocToggle = document.getElementById('tocToggle');
  const tocPanel = document.getElementById('tocPanel');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocList = document.getElementById('tocList');

  // Build TOC
  slides.forEach((slide, i) => {
    const title = slide.getAttribute('data-title') || `Slide ${i + 1}`;
    const item = document.createElement('div');
    item.className = 'toc-item';
    item.textContent = `${String(i + 1).padStart(2, '0')}  ${title}`;
    item.addEventListener('click', () => { goToSlide(i); closeToc(); });
    tocList.appendChild(item);
  });

  function updateUI() {
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    progressFill.style.width = ((currentSlide + 1) / totalSlides * 100) + '%';
    slideCounter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    document.querySelectorAll('.toc-item').forEach((item, i) => item.classList.toggle('active-toc', i === currentSlide));
    const activeSlide = slides[currentSlide];
    activeSlide.querySelectorAll('.fade-up').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
  }

  function goToSlide(n) {
    currentSlide = Math.max(0, Math.min(n, totalSlides - 1));
    updateUI();
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  document.addEventListener('keydown', (e) => {
    if (tocPanel.classList.contains('open')) { if (e.key === 'Escape') closeToc(); return; }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goToSlide(currentSlide + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goToSlide(currentSlide - 1); }
    else if (e.key === 'Escape') openToc();
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 60) { dx < 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1); }
  }, { passive: true });

  function openToc() { tocPanel.classList.add('open'); tocOverlay.classList.add('show'); }
  function closeToc() { tocPanel.classList.remove('open'); tocOverlay.classList.remove('show'); }
  tocToggle.addEventListener('click', () => tocPanel.classList.contains('open') ? closeToc() : openToc());
  tocOverlay.addEventListener('click', closeToc);

  // Subtle parallax
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector('.bg-glow-1').style.transform = `translate(${x}px, ${y}px)`;
    document.querySelector('.bg-glow-2').style.transform = `translate(${-x}px, ${-y}px)`;
  });

  updateUI();