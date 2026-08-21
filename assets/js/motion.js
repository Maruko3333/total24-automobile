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
    },

    // HERO — slow cinematic zoom scale(1.00 → 1.025) în ~9s, o singură dată.
    heroZoom() {
      const bg = document.querySelector('.hero-photo .hero-bg');
      if (!bg) return;
      bg.style.willChange = 'transform';
      M.animate(bg, { scale: [1, 1.025] }, { duration: 9, ease: 'easeOut' });
    }
  };

  window.T24Motion = T24Motion;
})();
