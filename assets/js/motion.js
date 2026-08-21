/* ============================================
   Total24 Automobile — Motion layer (premium, subtil)
   Folosește Motion (window.Motion) deja instalat — fără librării noi.
   Se încarcă DOAR pe HOME și DOAR dacă prefers-reduced-motion nu e activ
   (vezi app.js → loadEnhancements). Principiu: 80% static / 20% motion.
   ============================================ */
(function () {
  const M = window.Motion;
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T24Motion = {
    init() {
      if (!M || reduce()) return;
      this.heroBg();
      this.trustBar();
    },

    // HERO — zoom cinematic lent (o singură dată) + parallax foarte mic (doar desktop).
    // Compunem scale + translateY într-un singur `transform` (GPU, fără reflow).
    heroBg() {
      const bg = document.querySelector('.hero-photo .hero-bg');
      if (!bg) return;
      bg.style.willChange = 'transform';

      let scale = 1, py = 0;
      const apply = () => {
        bg.style.transform = `scale(${scale.toFixed(4)}) translate3d(0, ${py.toFixed(1)}px, 0)`;
      };

      // Zoom scale(1.00) → scale(1.04) în ~9s, ease-out cubic, o singură dată.
      const DUR = 9000; let t0 = null;
      const tick = (ts) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / DUR);
        scale = 1 + 0.04 * (1 - Math.pow(1 - p, 3));
        apply();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      // Parallax subtil — doar pe device cu mouse fin și ecran lat.
      const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 760;
      if (!desktop) return;
      const hero = bg.parentElement;
      let ticking = false;
      const update = () => {
        const r = hero.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          py = Math.min(40, Math.max(0, window.scrollY * 0.06));
          apply();
        }
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
    },

    // TRUST BAR — apariție cu stagger, când banda intră în viewport.
    trustBar() {
      const box = document.querySelector('.hero-trust');
      if (!box || typeof M.inView !== 'function') return;
      M.inView(box, () => {
        const items = box.querySelectorAll('.trust-item, .trust-stat');
        if (!items.length) return;
        const delay = typeof M.stagger === 'function' ? M.stagger(0.08) : (i) => i * 0.08;
        M.animate(
          items,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.55, delay, ease: [0.22, 0.7, 0.2, 1] }
        );
      }, { amount: 0.2 });
    }
  };

  window.T24Motion = T24Motion;
})();
