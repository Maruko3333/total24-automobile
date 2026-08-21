/* ============================================
   Total24 Automobile — Core app
   Shared config, header/footer, icons, helpers
   ============================================ */

const T24 = {
  config: null,
  cars: null,

  // ---- SVG icon set (24x24, stroke) ----
  icons: {
    car: '<path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4h2m12-4v4h-2m-8 0h8M7 17v1M17 17v1"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
    gauge: '<path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M12 12l3-3"/><path d="M4 18a8 8 0 1116 0"/>',
    certificate: '<circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/>',
    truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/>',
    heart: '<path d="M12 20s-7-4.3-9.3-8.5C1.3 8.8 2.6 6 5.5 6c1.8 0 3 1 3.5 2 .5-1 1.7-2 3.5-2 2.9 0 4.2 2.8 2.8 5.5C19 15.7 12 20 12 20z"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
    fuel: '<path d="M5 21V5a2 2 0 012-2h5a2 2 0 012 2v16M4 21h11"/><path d="M14 8h2.5A1.5 1.5 0 0118 9.5V16a1.5 1.5 0 003 0V9"/><path d="M14 12h3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    power: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    phone: '<path d="M4 5c0 8 7 15 15 15l1-4-4-2-2 2c-2-1-5-4-6-6l2-2-2-4-4 1z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21c4-4 7-7.5 7-11a7 7 0 10-14 0c0 3.5 3 7 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    whatsapp: '<path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z"/><path d="M8.5 8.5c0 4 3 7 6.5 7 .8 0 1.3-.6 1-1.2l-1-1.5-1.7.6c-1.2-.6-2.2-1.6-2.6-2.7l.6-1.4-1.3-1.4c-.6-.3-1.5.3-1.5 1z"/>',
    facebook: '<path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8.5c0-.3.2-.5.5-.5z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="16.5" cy="7.5" r="1"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-5"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',
    users: '<circle cx="9" cy="9" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 6a3 3 0 010 6M17 15c2 0 4 2 4 5"/>',
    star: '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>',
    download: '<path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/>',
    wrench: '<path d="M15 6a4 4 0 00-5 5L4 17l3 3 6-6a4 4 0 005-5l-2.5 2.5L18 9l-1.5-2.5z"/>',
    handshake: '<path d="M8 12l3-3 2 2 3-3 4 4-4 4-2-2-3 3-4-4z"/><path d="M2 10l4-2M22 10l-4-2"/>',
    tag: '<path d="M3 12l9-9 9 9-9 9-9-9z"/><circle cx="9" cy="9" r="1.5"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10.5 8.5l5 3.5-5 3.5z"/>',
    headset: '<path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="3" y="13" width="4" height="7" rx="1.6"/><rect x="17" y="13" width="4" height="7" rx="1.6"/><path d="M20 20a3 3 0 01-3 3h-3"/>'
  },

  icon(name, size = 20, stroke = 1.7) {
    const p = this.icons[name] || '';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  },

  // Logo — siluetă de mașină (ca în design)
  logoIcon() {
    return `<svg width="42" height="23" viewBox="0 0 48 26" fill="none" stroke="#f5b301" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 16.5l2.4-6.7A4 4 0 019.2 7h15.6a4 4 0 013.2 1.6L32 14l8.8 1.4A2.4 2.4 0 0143 17.8v.9a2 2 0 01-2 2h-2.6"/>
      <path d="M3 16.5V19a2 2 0 002 2h2.4"/>
      <path d="M17.5 21h13"/>
      <circle cx="13.5" cy="20.5" r="3.2"/>
      <circle cx="34.5" cy="20.5" r="3.2"/>
    </svg>`;
  },

  // ---- Formatting ----
  price(n) { return Number(n).toLocaleString('de-DE') + ' €'; },
  km(n) { return Number(n).toLocaleString('de-DE') + ' km'; },

  // WhatsApp deep-link pentru o mașină
  waCar(car, extra = '') {
    const wa = (this.config.company.whatsapp || '').replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Bună ziua! Sunt interesat de ${car.make} ${car.model} (${car.year}) – ${this.price(car.price)}. ${extra}Este disponibilă?`);
    return `https://wa.me/${wa}?text=${msg}`;
  },

  // Rată lunară estimată (avans %, luni, dobândă anuală %)
  monthly(price, downPct = 20, term = 60, apr = 8.9) {
    const principal = price * (1 - downPct / 100);
    const r = apr / 100 / 12;
    const m = r === 0 ? principal / term : principal * r / (1 - Math.pow(1 + r, -term));
    return Math.round(m);
  },

  // ---- Data loading ----
  async loadConfig() {
    if (this.config) return this.config;
    const r = await fetch('data/config.json');
    this.config = await r.json();
    return this.config;
  },
  async loadCars() {
    if (this.cars) return this.cars;
    const r = await fetch('data/cars.json');
    const d = await r.json();
    this.cars = d.cars || [];
    return this.cars;
  },

  // ---- SEO helpers ----
  setMeta(name, content, attr = 'name') {
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  },
  setCanonical(url) {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
    el.href = url;
  },
  addJsonLd(obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  },
  siteUrl() { return (this.config.meta.siteUrl || '').replace(/\/$/, ''); },

  // ---- Header / Footer injection ----
  nav: [
    { label: 'Acasă', href: 'index.html', key: 'home' },
    { label: 'Stoc Auto', href: 'stoc.html', key: 'stoc' },
    { label: 'Despre Noi', href: 'despre.html', key: 'despre' },
    { label: 'Servicii', href: 'servicii.html', key: 'servicii' },
    { label: 'Finanțare', href: 'finantare.html', key: 'finantare' },
    { label: 'Contact', href: 'contact.html', key: 'contact' }
  ],

  renderHeader(active) {
    const c = this.config.company;
    const links = this.nav.map(n =>
      `<a href="${n.href}" class="${n.key === active ? 'active' : ''}">${n.label}</a>`
    ).join('');
    const a = c.address;
    return `
    <div class="topbar">
      <div class="container topbar-in">
        <div class="topbar-left">
          <span>${this.icon('pin', 15)} ${a.city}, ${a.country}</span>
          <a href="tel:${c.phone}">${this.icon('phone', 15)} ${c.phone}</a>
          <a href="mailto:${c.email}">${this.icon('mail', 15)} ${c.email}</a>
        </div>
        <div class="topbar-right">
          <span>${this.icon('clock', 15)} Luni – Vineri: ${c.hours.weekdays}</span>
          <span class="topbar-lang">🇷🇴 RO</span>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="container nav">
        <a href="index.html" class="logo" aria-label="Total24 Automobile">
          <img src="assets/img/brand/logo.png" alt="Total24 Automobile" class="logo-img">
        </a>
        <nav class="nav-links" id="navLinks">${links}</nav>
        <div class="nav-cta">
          <a href="contact.html" class="btn btn-primary">${this.icon('phone', 16)} Contact rapid</a>
          <button class="nav-toggle" id="navToggle" aria-label="Meniu">${this.icon('menu', 26, 2)}</button>
        </div>
      </div>
    </header>`;
  },

  renderFooter() {
    const c = this.config.company;
    const y = new Date().getFullYear();
    const links = this.nav.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('');
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo" aria-label="Total24 Automobile">
              <img src="assets/img/brand/logo.png" alt="Total24 Automobile" class="logo-img footer-logo-img">
            </a>
            <p>${c.tagline}. Import direct din Germania, verificate și cu documente complete.</p>
          </div>
          <div>
            <h5>Navigare</h5>
            <ul class="footer-links">${links}</ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul class="footer-links">
              <li><a href="tel:${c.phone}">${c.phone}</a></li>
              <li><a href="mailto:${c.email}">${c.email}</a></li>
              <li>${c.address.street}, ${c.address.zip} ${c.address.city}</li>
            </ul>
          </div>
          <div>
            <h5>Program</h5>
            <ul class="footer-links">
              <li>Luni – Vineri: ${c.hours.weekdays}</li>
              <li>Sâmbătă: ${c.hours.saturday}</li>
              <li>Duminică: ${c.hours.sunday}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${y} Total24 Automobile. Toate drepturile rezervate.</span>
          <span>Politica de confidențialitate · Termeni și condiții</span>
        </div>
      </div>
    </footer>`;
  },

  async mount(active) {
    await this.loadConfig();
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.innerHTML = this.renderHeader(active);
    if (f) f.innerHTML = this.renderFooter();
    // mobile nav toggle
    const t = document.getElementById('navToggle');
    const l = document.getElementById('navLinks');
    if (t && l) t.addEventListener('click', () => l.classList.toggle('open'));
    // Pe HOME: header transparent peste fotografia hero, devine solid la scroll
    if (active === 'home' && h) {
      document.body.classList.add('home');
      h.classList.add('nav-overlay');
      const onScroll = () => h.classList.toggle('is-stuck', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    this.mountWhatsApp();
    this.observeReveal();
    await this.loadEnhancements();
  },

  // ---- Vendor asset loaders (injectate dinamic, ca header/footer) ----
  loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  },
  loadJS(src) {
    return new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) return res();
      const s = document.createElement('script');
      s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('load fail: ' + src));
      document.head.appendChild(s);
    });
  },

  // Încarcă librăriile care îmbunătățesc experiența, în funcție de pagină
  async loadEnhancements() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const V = 'assets/js/vendor/', C = 'assets/css/vendor/';

    // Smooth scroll (Lenis) — pe tot site-ul, dar nu dacă userul cere reduced-motion
    if (!reduce) {
      this.loadCSS(C + 'lenis.css');
      try { await this.loadJS(V + 'lenis.min.js'); this.initLenis(); } catch (e) { /* silențios */ }
    }
    // Lightbox foto (GLightbox) — doar pe pagina de detalii mașină
    if (document.getElementById('detailWrap')) {
      this.loadCSS(C + 'glightbox.min.css');
      try { await this.loadJS(V + 'glightbox.min.js'); } catch (e) { /* silențios */ }
    }
    // Strat Motion premium — doar pe HOME (există hero-photo) și fără reduced-motion
    if (!reduce && document.querySelector('.hero-photo')) {
      try {
        await this.loadJS(V + 'motion.js');
        await this.loadJS('assets/js/motion.js');
        if (window.T24Motion) window.T24Motion.init();
      } catch (e) { /* silențios */ }
    }
  },

  // Smooth scroll premium + anchor-uri fine
  initLenis() {
    if (this._lenis || !window.Lenis) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1 });
    this._lenis = lenis;
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -100 }); }
    });
  },

  // ---- Trimitere formulare prin FormSubmit.co (fără backend/cont) ----
  // Livrează pe emailul firmei din config. Prima trimitere cere o activare
  // unică (email de confirmare de la FormSubmit către adresa firmei).
  async sendLead(payload) {
    const email = (this.config.company.email || '').trim();
    if (!email) throw new Error('no email configured');
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error('send failed: ' + r.status);
    return r.json();
  },

  // ---- Favorite (localStorage, fără cont) ----
  favs: {
    KEY: 't24_favs',
    list() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
    has(id) { return this.list().includes(id); },
    toggle(id) {
      const l = this.list(); const i = l.indexOf(id);
      if (i > -1) l.splice(i, 1); else l.push(id);
      try { localStorage.setItem(this.KEY, JSON.stringify(l)); } catch (e) { /* private mode */ }
      document.dispatchEvent(new CustomEvent('favchange'));
      return i === -1;
    },
    count() { return this.list().length; }
  },

  // Buton flotant WhatsApp (desktop) + bară sticky (mobil)
  mountWhatsApp() {
    if (document.querySelector('.wa-float')) return;
    const wa = (this.config.company.whatsapp || '').replace(/\D/g, '');
    if (!wa) return;
    const a = document.createElement('a');
    a.href = `https://wa.me/${wa}`;
    a.className = 'wa-float';
    a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', 'Scrie-ne pe WhatsApp');
    a.innerHTML = this.icon('whatsapp', 28, 1.9);
    document.body.appendChild(a);
    // Bară sticky jos, doar pe mobil (CSS controlează vizibilitatea)
    const bar = document.createElement('a');
    bar.href = `https://wa.me/${wa}`;
    bar.className = 'wa-sticky';
    bar.target = '_blank'; bar.rel = 'noopener';
    bar.innerHTML = `${this.icon('whatsapp', 22, 1.9)} <span>Întreabă pe WhatsApp</span>`;
    document.body.appendChild(bar);
  },

  // Scroll reveal — inclusiv conținut încărcat dinamic (carduri)
  observeReveal() {
    if (this._revealInit || !('IntersectionObserver' in window)) return;
    this._revealInit = true;
    const sel = '.section-head,.car-card,.feat-card,.why-split,.service-card,.about-feature,.stat-big,.finance-benefit,.info-item,.calc-card,.cta-band,.tradein-band,.about-visual,.spec-table';
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    // carduri din grid → stagger la intrarea în viewport (max 8)
    const STAGGER = ['car-card', 'feat-card', 'service-card', 'step-card'];
    const arm = el => {
      if (el.dataset.rev) return;
      el.dataset.rev = '1';
      el.classList.add('reveal');
      const cls = STAGGER.find(c => el.classList.contains(c));
      if (cls && el.parentElement) {
        const sibs = [...el.parentElement.children].filter(x => x.classList.contains(cls));
        const idx = sibs.indexOf(el);
        if (idx > 0) el.style.transitionDelay = (Math.min(idx, 7) * 0.07) + 's';
      }
      // deja în viewport → afișează imediat (fără flash)
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in');
      else io.observe(el);
    };
    const scan = root => {
      if (root.nodeType !== 1) return;
      if (root.matches && root.matches(sel)) arm(root);
      root.querySelectorAll && root.querySelectorAll(sel).forEach(arm);
    };
    scan(document.body);
    new MutationObserver(muts =>
      muts.forEach(m => m.addedNodes.forEach(scan))
    ).observe(document.body, { childList: true, subtree: true });
  }
};
