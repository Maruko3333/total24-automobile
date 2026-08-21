/* ============================================
   Total24 Automobile — Motion layer (minimal, cinematic)
   Folosește Motion (window.Motion) deja instalat — fără librării noi.
   Se încarcă DOAR pe HOME și DOAR dacă prefers-reduced-motion nu e activ
   (vezi app.js → loadEnhancements).
   Singura animație aici: slow zoom pe fotografia hero. Fără parallax.
   Restul (hero content, secțiuni, stagger carduri) = CSS + IntersectionObserver.
   ============================================ */
(function () {
  const M = window.Motion;
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T24Motion = {
    init() {
      if (!M || reduce()) return;
      this.heroZoom();
      this.trustBar();
    },

    // HERO — slow cinematic zoom scale(1.00 → 1.025) în ~9s, o singură dată.
    heroZoom() {
      const bg = document.querySelector('.hero-photo .hero-bg');
      if (!bg) return;
      bg.style.willChange = 'transform';
      M.animate(bg, { scale: [1, 1.02] }, { duration: 10, ease: 'easeOut' });
    },

    // TRUST BAR — fade + translateY 15px, foarte subtil, la intrarea în viewport.
    trustBar() {
      const box = document.querySelector('.hero-trust');
      if (!box || typeof M.inView !== 'function') return;
      M.inView(box, () => {
        const items = box.querySelectorAll('.trust-item');
        if (!items.length) return;
        const delay = typeof M.stagger === 'function' ? M.stagger(0.07) : (i) => i * 0.07;
        M.animate(items, { opacity: [0, 1], y: [15, 0] }, { duration: 0.5, delay, ease: [0.22, 0.7, 0.2, 1] });
      }, { amount: 0.3 });
    }
  };

  window.T24Motion = T24Motion;
})();
