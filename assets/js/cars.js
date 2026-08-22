/* ============================================
   Total24 Automobile — Cars rendering
   ============================================ */

const Cars = {
  // ---- Primul URL VALID de imagine (pregătit pentru orice sursă: cars.json / Mobile.de API) ----
  // Așteaptă car.images = [...] și întoarce prima intrare non-goală. Fără hardcodare pe marcă.
  firstImage(car) {
    const imgs = Array.isArray(car && car.images) ? car.images : [];
    return imgs.find(u => typeof u === 'string' && u.trim() !== '') || '';
  },

  // ---- Card markup (aerisit, cu CTA WhatsApp) ----
  card(car) {
    const src = this.firstImage(car);
    const img = src
      ? `<img class="vehicle-card-image" src="${src}" alt="${car.make} ${car.model}" loading="lazy" decoding="async">`
      : `<div class="no-img">${T24.icon('car', 46, 1.4)}</div>`;
    const statusBadge = car.status !== 'available'
      ? `<span class="car-status status-${car.status}">${car.status === 'reserved' ? T24.t('badge.reserved') : T24.t('badge.sold')}</span>`
      : (car.featured ? `<span class="car-badge">${T24.t('badge.new')}</span>` : '');
    const meta = [car.year, T24.km(car.mileage), car.fuel, car.transmission].filter(Boolean).join(' · ');
    const favCls = T24.favs.has(car.id) ? ' is-fav' : '';
    return `
    <div class="car-card">
      <a href="masina.html?id=${car.id}" class="car-media">
        ${img}
        ${statusBadge}
        <span class="car-fav${favCls}" data-fav="${car.id}" role="button" tabindex="0" aria-label="${T24.t('card.fav.aria')}">${T24.icon('heart', 18)}</span>
      </a>
      <div class="car-body">
        <a href="masina.html?id=${car.id}" class="car-title">${car.make} ${car.model}</a>
        <div class="car-meta">${meta}</div>
        <div class="car-price">${T24.price(car.price)}</div>
        <div class="car-actions">
          <a href="masina.html?id=${car.id}" class="btn btn-primary car-cta">${T24.t('card.details')} ${T24.icon('arrowRight', 15)}</a>
          <a href="${T24.waCar(car)}" target="_blank" rel="noopener" class="car-wa" aria-label="${T24.t('card.wa.aria')}">${T24.icon('whatsapp', 18)}</a>
        </div>
      </div>
    </div>`;
  },

  // ---- Home: card mare, aerisit (imagine mare, MODEL / meta / preț / „Vezi mașina") ----
  featuredCard(car) {
    const src = this.firstImage(car);
    const img = src
      ? `<img class="vehicle-card-image" src="${src}" alt="${car.make} ${car.model}" loading="lazy" decoding="async">`
      : `<div class="no-img">${T24.icon('car', 54, 1.3)}</div>`;
    const meta = [car.year, T24.km(car.mileage), car.fuel, car.transmission].filter(Boolean).join(' · ');
    const badge = car.status === 'reserved'
      ? `<span class="car-status status-reserved">${T24.t('badge.reserved')}</span>`
      : car.status === 'sold'
        ? `<span class="car-status status-sold">${T24.t('badge.sold')}</span>`
        : (car.featured ? `<span class="car-badge">${T24.t('badge.new')}</span>` : '');
    return `
    <a href="masina.html?id=${car.id}" class="feat-card">
      <div class="feat-media">${img}${badge}</div>
      <div class="feat-body">
        <h3 class="feat-title">${car.make} ${car.model}</h3>
        <div class="feat-meta">${meta}</div>
        <div class="feat-foot">
          <span class="feat-price">${T24.price(car.price)}</span>
          <span class="feat-link">${T24.t('card.details')} ${T24.icon('arrowRight', 15)}</span>
        </div>
      </div>
    </a>`;
  },

  // ---- Home: featured ----
  async renderFeatured(elId, limit = 3) {
    const el = document.getElementById(elId);
    if (!el) return;
    const cars = await T24.loadCars();
    const featured = cars.filter(c => c.featured && c.status === 'available').slice(0, limit);
    const list = featured.length ? featured : cars.slice(0, limit);
    el.innerHTML = list.map(c => this.featuredCard(c)).join('');
  },

  // ---- Stoc: full listing with filters ----
  state: { all: [], filtered: [] },

  async initStoc() {
    const cars = await T24.loadCars();
    this.state.all = cars;
    this.buildFilterOptions(cars);
    this.applyFilters();

    // iconițe pe butoanele din toolbar
    const foBtn = document.getElementById('filterOpen');
    if (foBtn) foBtn.insertAdjacentHTML('afterbegin', T24.icon('menu', 15, 2) + ' ');
    const ftBtn = document.getElementById('favToggle');
    if (ftBtn) ftBtn.insertAdjacentHTML('afterbegin', T24.icon('heart', 14) + ' ');

    ['fMake', 'fModel', 'fYear', 'fKm', 'fFuel', 'fGear', 'fBody', 'fSort'].forEach(id => {
      const e = document.getElementById(id);
      if (e) e.addEventListener('change', () => {
        if (id === 'fMake') this.buildModelOptions();
        this.applyFilters();
      });
    });
    const price = document.getElementById('fPrice');
    if (price) price.addEventListener('input', () => {
      document.getElementById('priceVal').textContent = T24.price(price.value);
      this.applyFilters();
    });
    const reset = document.getElementById('fReset');
    if (reset) reset.addEventListener('click', () => this.reset());

    // Favorite — inimă pe carduri (delegat), toggle + persistență
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-fav]');
      if (!b) return;
      e.preventDefault();
      const on = T24.favs.toggle(b.dataset.fav);
      b.classList.toggle('is-fav', on);
    });
    const updFav = () => {
      const c = document.getElementById('favCount');
      if (c) c.textContent = T24.favs.count();
    };
    document.addEventListener('favchange', () => { updFav(); if (this.state.favOnly) this.applyFilters(); });
    updFav();
    const favT = document.getElementById('favToggle');
    if (favT) favT.addEventListener('click', () => {
      this.state.favOnly = !this.state.favOnly;
      favT.classList.toggle('active', this.state.favOnly);
      this.applyFilters();
    });

    // Filtre — drawer pe mobil
    const side = document.querySelector('.filters-side');
    const backdrop = document.getElementById('filterBackdrop');
    const setDrawer = open => {
      if (side) side.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    const openB = document.getElementById('filterOpen');
    const closeB = document.getElementById('filterClose');
    if (openB) openB.addEventListener('click', () => setDrawer(true));
    if (closeB) closeB.addEventListener('click', () => setDrawer(false));
    if (backdrop) backdrop.addEventListener('click', () => setDrawer(false));
    // aplicarea filtrului închide drawerul pe mobil
    if (document.getElementById('fApplyCount'))
      document.getElementById('fApplyCount').addEventListener('click', () => setDrawer(false));
  },

  buildFilterOptions(cars) {
    const uniq = k => [...new Set(cars.map(c => c[k]).filter(Boolean))];
    this.fill('fMake', uniq('make').sort(), T24.t('stoc.f.allmakes'));
    this.fill('fYear', uniq('year').sort((a, b) => b - a), T24.t('stoc.f.any'));
    this.fill('fFuel', uniq('fuel').sort(), T24.t('stoc.f.any'));
    this.fill('fGear', uniq('transmission').sort(), T24.t('stoc.f.any'));
    this.fill('fBody', uniq('body').sort(), T24.t('stoc.f.any'));
    this.buildModelOptions();
    const maxPrice = Math.max(...cars.map(c => c.price), 30000);
    const price = document.getElementById('fPrice');
    if (price) {
      price.max = Math.ceil(maxPrice / 5000) * 5000;
      price.value = price.max;
      document.getElementById('priceVal').textContent = T24.price(price.value);
      document.getElementById('priceMax').textContent = T24.price(price.max);
    }
  },

  buildModelOptions() {
    const make = document.getElementById('fMake')?.value;
    let cars = this.state.all;
    if (make) cars = cars.filter(c => c.make === make);
    const models = [...new Set(cars.map(c => c.model))].sort();
    this.fill('fModel', models, T24.t('stoc.f.allmodels'));
  },

  fill(id, items, placeholder) {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = `<option value="">${placeholder}</option>` +
      items.map(i => `<option value="${i}">${i}</option>`).join('');
  },

  applyFilters() {
    const val = id => document.getElementById(id)?.value || '';
    const make = val('fMake'), model = val('fModel'), year = val('fYear'), body = val('fBody');
    const fuel = val('fFuel'), gear = val('fGear'), km = val('fKm'), sort = val('fSort');
    const price = document.getElementById('fPrice');
    const maxPrice = price ? Number(price.value) : Infinity;

    let list = this.state.all.filter(c => {
      if (make && c.make !== make) return false;
      if (model && c.model !== model) return false;
      if (year && String(c.year) !== year) return false;
      if (body && c.body !== body) return false;
      if (fuel && c.fuel !== fuel) return false;
      if (gear && c.transmission !== gear) return false;
      if (c.price > maxPrice) return false;
      if (km && c.mileage > Number(km)) return false;
      return true;
    });

    if (this.state.favOnly) {
      const favs = T24.favs.list();
      list = list.filter(c => favs.includes(c.id));
    }

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'km-asc': list.sort((a, b) => a.mileage - b.mileage); break;
      case 'year-desc': list.sort((a, b) => b.year - a.year); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    this.state.filtered = list;
    this.renderList();
  },

  renderList() {
    const grid = document.getElementById('carsGrid');
    const count = document.getElementById('carsCount');
    const list = this.state.filtered;
    const noun = list.length === 1 ? T24.t('stoc.available.one') : T24.t('stoc.available.many');
    if (count) count.innerHTML = `<b>${list.length}</b> ${this.state.favOnly ? T24.t('stoc.favorites') : noun}`;
    const btn = document.getElementById('fApplyCount');
    if (btn) btn.textContent = `${T24.t('stoc.f.apply')} (${list.length})`;
    if (!grid) return;
    if (!list.length) {
      const fav = this.state.favOnly;
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        ${T24.icon(fav ? 'heart' : 'search', 46, 1.4)}
        <h3 style="margin:14px 0 6px">${fav ? T24.t('stoc.empty.fav.title') : T24.t('stoc.empty.none.title')}</h3>
        <p>${fav ? T24.t('stoc.empty.fav.text') : T24.t('stoc.empty.none.text')}</p></div>`;
      return;
    }
    grid.innerHTML = list.map(c => this.card(c)).join('');
  },

  reset() {
    ['fMake', 'fModel', 'fYear', 'fKm', 'fFuel', 'fGear', 'fBody', 'fSort'].forEach(id => {
      const e = document.getElementById(id); if (e) e.value = '';
    });
    const price = document.getElementById('fPrice');
    if (price) { price.value = price.max; document.getElementById('priceVal').textContent = T24.price(price.value); }
    this.buildModelOptions();
    this.applyFilters();
  },

  // ---- SEO pentru pagina mașinii ----
  setDetailSEO(car) {
    const base = T24.siteUrl();
    const url = `${base}/masina.html?id=${car.id}`;
    const img = (car.images && car.images[0])
      ? (car.images[0].startsWith('http') ? car.images[0] : `${base}/${car.images[0]}`)
      : `${base}/assets/img/brand/logo.png`;
    const avail = car.status === 'available';
    const desc = `${car.make} ${car.model}, ${car.year}, ${T24.km(car.mileage)}, ${car.fuel}, ${car.transmission}. ${T24.t('seo.price')} ${T24.price(car.price)}. ${T24.t('detail.seo.suffix')}`;

    T24.setMeta('description', desc);
    T24.setCanonical(url);
    T24.setMeta('og:type', 'product', 'property');
    T24.setMeta('og:title', `${car.make} ${car.model} ${car.year} — ${T24.price(car.price)}`, 'property');
    T24.setMeta('og:description', desc, 'property');
    T24.setMeta('og:image', img, 'property');
    T24.setMeta('og:url', url, 'property');
    T24.setMeta('twitter:card', 'summary_large_image');

    T24.addJsonLd({
      '@context': 'https://schema.org', '@type': 'Car',
      name: `${car.make} ${car.model}`,
      brand: { '@type': 'Brand', name: car.make },
      model: car.model,
      vehicleModelDate: car.year,
      mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
      fuelType: car.fuel, vehicleTransmission: car.transmission,
      ...(car.color ? { color: car.color } : {}),
      ...(car.power ? { vehicleEngine: { '@type': 'EngineSpecification', enginePower: { '@type': 'QuantitativeValue', value: car.power, unitCode: 'BHP' } } } : {}),
      image: img, url,
      offers: {
        '@type': 'Offer', price: car.price, priceCurrency: 'EUR',
        availability: avail ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        itemCondition: 'https://schema.org/UsedCondition', url,
        seller: { '@type': 'AutoDealer', name: 'Total24 Automobile' }
      }
    });
    T24.addJsonLd({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: T24.t('nav.home'), item: `${base}/index.html` },
        { '@type': 'ListItem', position: 2, name: T24.t('nav.cars'), item: `${base}/stoc.html` },
        { '@type': 'ListItem', position: 3, name: `${car.make} ${car.model}` }
      ]
    });
  },

  // ---- Detail page ----
  async initDetail() {
    const id = new URLSearchParams(location.search).get('id');
    const cars = await T24.loadCars();
    const car = cars.find(c => c.id === id);
    const wrap = document.getElementById('detailWrap');
    if (!wrap) return;
    if (!car) {
      wrap.innerHTML = `<div class="empty-state">${T24.icon('car', 46, 1.4)}
        <h3 style="margin:14px 0 6px">${T24.t('notfound.title')}</h3>
        <p><a href="stoc.html" style="color:var(--blue-deep)">${T24.t('notfound.link')}</a></p></div>`;
      return;
    }
    document.title = `${car.make} ${car.model} ${car.year} — Total24 Automobile`;
    this.setDetailSEO(car);
    const c = T24.config.company;
    const phone = c.phone;

    const mainImg = (car.images && car.images.length)
      ? `<img src="${car.images[0]}" id="galMain" alt="${car.make} ${car.model}">`
      : `<div class="no-img">${T24.icon('car', 60, 1.3)}</div>`;
    const thumbs = (car.images || []).map((src, i) =>
      `<div class="thumb ${i === 0 ? 'active' : ''}" data-src="${src}"><img src="${src}" alt=""></div>`
    ).join('');

    const mobileDe = c.mobileDeUrl || '';
    const sub = [car.year, T24.km(car.mileage), car.fuel, car.transmission].filter(Boolean).join(' · ');

    // Specificații-cheie (mari, vizibile) — doar cele cu valoare
    const keyList = [
      ['power', car.power ? car.power + ' ' + T24.t('unit.ps') : null, T24.t('spec.power')],
      ['gauge', T24.km(car.mileage), T24.t('spec.mileage')],
      ['fuel', car.fuel, T24.t('spec.fuel')],
      ['gear', car.transmission, T24.t('spec.transmission')],
      ['calendar', car.year, T24.t('spec.year')],
      ['car', car.body, T24.t('spec.body')]
    ].filter(([, v]) => v);
    const keySpecs = keyList.map(([ic, v, l]) =>
      `<div class="key-spec"><span class="ic">${T24.icon(ic, 20)}</span><div><b>${v}</b><span>${l}</span></div></div>`).join('');

    // Tabel detaliat complet
    const specs = [
      ['calendar', T24.t('spec.firstReg'), car.firstReg || car.year],
      ['gauge', T24.t('spec.mileage'), T24.km(car.mileage)],
      ['fuel', T24.t('spec.fuel'), car.fuel],
      ['gear', T24.t('spec.transmission'), car.transmission],
      ['power', T24.t('spec.power'), car.power ? car.power + ' ' + T24.t('unit.ps') : '—'],
      ['car', T24.t('spec.capacity'), car.capacity ? car.capacity + ' ' + T24.t('unit.ccm') : '—'],
      ['car', T24.t('spec.body'), car.body],
      ['tag', T24.t('spec.color'), car.color || '—'],
      ['car', T24.t('spec.doorsSeats'), `${car.doors || '—'} / ${car.seats || '—'}`],
      ['gauge', T24.t('spec.co2'), car.co2 ? car.co2 + ' g/km' : '—']
    ];
    const features = (car.features || []).map(f =>
      `<div class="feature-li"><span class="ic">${T24.icon('check', 16)}</span>${f}</div>`).join('');

    wrap.innerHTML = `
      <div class="breadcrumb"><a href="index.html">${T24.t('nav.home')}</a> / <a href="stoc.html">${T24.t('nav.cars')}</a> / ${car.make} ${car.model}</div>
      <div class="detail-head">
        <h1>${car.make} ${car.model}</h1>
        <div class="detail-sub">${sub}</div>
      </div>
      <div class="detail-grid">
        <div class="detail-left">
          <div class="gallery-main">${mainImg}</div>
          ${thumbs ? `<div class="gallery-thumbs">${thumbs}</div>` : ''}
        </div>
        <aside class="detail-panel">
          <div class="detail-price">${T24.price(car.price)}</div>
          <a href="finantare.html" class="detail-finance">${T24.icon('percent', 15)} <b>${T24.t('detail.finance.badge')}</b> — ${T24.t('detail.finance.cta')}</a>
          <ul class="detail-trust">
            <li>${T24.icon('checkCircle', 17)} ${T24.t('detail.trust.1')}</li>
            <li>${T24.icon('checkCircle', 17)} ${T24.t('detail.trust.2')}</li>
            <li>${T24.icon('checkCircle', 17)} ${T24.t('detail.trust.3')}</li>
          </ul>
          <a href="${T24.waCar(car)}" target="_blank" rel="noopener" class="btn btn-wa btn-block" style="margin-bottom:12px">${T24.icon('whatsapp', 18)} ${T24.t('detail.wa')}</a>
          <div class="detail-cta-row">
            <a href="tel:${phone}" class="btn btn-primary btn-block">${T24.icon('phone', 18)} ${T24.t('cta.call')}</a>
            <a href="mailto:${c.email}?subject=${encodeURIComponent(`Anfrage: ${car.make} ${car.model} ${car.year}`)}" class="btn btn-outline btn-block">${T24.icon('mail', 18)} ${T24.t('detail.email')}</a>
          </div>
          <button type="button" class="btn btn-detail btn-block detail-share" id="shareBtn" style="margin-top:12px">${T24.icon('share', 17)} ${T24.t('detail.share')}</button>
          ${mobileDe ? `<a href="${mobileDe}" target="_blank" rel="noopener" class="detail-mobilede">
            <span>${T24.t('detail.mobilede.pre')}</span>
            <b>${T24.t('detail.mobilede.link')} ${T24.icon('arrowRight', 14)}</b>
          </a>` : ''}
          <div id="modelGuide"></div>

          <div class="lead-box">
            <h3>${T24.t('lead.title')}</h3>
            <p>${T24.t('lead.sub')}</p>
            <form class="lead-form" id="leadForm">
              <input name="name" placeholder="${T24.t('lead.name')}" required>
              <input name="phone" type="tel" placeholder="${T24.t('lead.phone')}" required>
              <input name="email" type="email" placeholder="${T24.t('lead.email')}">
              <label class="lead-check"><input type="checkbox" name="finance"> ${T24.t('lead.finance')}</label>
              <button type="submit" class="btn btn-primary btn-block">${T24.t('lead.submit')}</button>
            </form>
            <p class="lead-note" id="leadNote"></p>
          </div>
        </aside>
      </div>

      <div class="spec-table">
        <h3>${T24.t('detail.h.specs')}</h3>
        <div class="key-specs">${keySpecs}</div>
        <div class="spec-grid">
          ${specs.map(([ic, k, v]) => `<div class="spec-cell"><span class="ic">${T24.icon(ic, 18)}</span><div><span class="k">${k}</span><span class="v">${v}</span></div></div>`).join('')}
        </div>
      </div>
      ${features ? `<div class="spec-table"><h3>${T24.t('detail.h.features')}</h3><div class="features-grid">${features}</div></div>` : ''}
      ${car.description ? `<div class="spec-table"><h3>${T24.t('detail.h.desc')}</h3><p class="detail-desc">${car.description}</p></div>` : ''}
    `;

    // gallery thumbs
    wrap.querySelectorAll('.thumb').forEach(t => t.addEventListener('click', () => {
      wrap.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const m = document.getElementById('galMain');
      if (m) m.src = t.dataset.src;
    }));

    // Share „trimite unui prieten" — amplifică bucla de recomandare
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.addEventListener('click', async () => {
      const res = await T24.shareCar(car);
      if (res === 'shared' || res === 'whatsapp') {
        const orig = shareBtn.innerHTML;
        shareBtn.innerHTML = `${T24.icon('checkCircle', 17)} ${T24.t('detail.shared')}`;
        setTimeout(() => { shareBtn.innerHTML = orig; }, 2200);
      }
    });

    // Link către ghidul modelului (mașină → articol Ratgeber), dacă există
    try {
      const rg = await (await fetch('data/ratgeber.json', { cache: 'no-store' })).json();
      const art = (rg.articles || []).find(a => a.relatedMake && a.relatedMake === car.make);
      const mg = document.getElementById('modelGuide');
      if (art && mg) mg.innerHTML = `<a href="artikel.html?slug=${art.slug}" class="detail-mobilede" style="margin-top:12px">
        <span>${T24.t('detail.modelguide.pre')}</span>
        <b>${art.title.split('–')[0].trim()} — ${T24.t('detail.modelguide.suffix')} ${T24.icon('arrowRight', 14)}</b></a>`;
    } catch (e) { /* silențios */ }

    // Lightbox full-screen (GLightbox) — click pe imaginea principală
    if (window.GLightbox && car.images && car.images.length) {
      const lb = GLightbox({
        elements: car.images.map(src => ({ href: src, type: 'image' })),
        loop: true, zoomable: true, touchNavigation: true
      });
      const main = document.getElementById('galMain');
      const gm = wrap.querySelector('.gallery-main');
      if (gm) {
        gm.classList.add('zoomable');
        const cue = document.createElement('span');
        cue.className = 'gallery-zoom-cue';
        cue.innerHTML = T24.icon('search', 18);
        gm.appendChild(cue);
      }
      if (main) main.addEventListener('click', () => {
        const thumbs = [...wrap.querySelectorAll('.thumb')];
        const active = wrap.querySelector('.thumb.active');
        lb.openAt(active ? Math.max(0, thumbs.indexOf(active)) : 0);
      });
    }

    // lead form -> trimite pe email (FormSubmit) cu contextul mașinii; fallback WhatsApp
    const lead = document.getElementById('leadForm');
    if (lead) lead.addEventListener('submit', async e => {
      e.preventDefault();
      const note = document.getElementById('leadNote');
      const btn = lead.querySelector('button[type=submit]');
      const orig = btn.textContent;
      btn.disabled = true; btn.textContent = T24.t('lead.sending');
      try {
        await T24.sendLead({
          _subject: `Total24 Automobile — Fahrzeuganfrage: ${car.make} ${car.model} (${car.year})`,
          _template: 'box',
          ...(lead.email.value ? {
            _replyto: lead.email.value,
            _autoresponse:
              `Hallo ${lead.name.value},\n\n` +
              `vielen Dank für Ihr Interesse am ${car.make} ${car.model} (${car.year}) ` +
              `zum Preis von ${T24.price(car.price)} bei Total24 Automobile. ` +
              `Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit einem Angebot.\n\n` +
              `Mit freundlichen Grüßen\n` +
              `Ihr Team von Total24 Automobile\n` +
              `${c.phone} · ${c.email}`
          } : {}),
          Fahrzeug: `${car.make} ${car.model} ${car.year}`,
          Preis: T24.price(car.price),
          Link: `${T24.siteUrl()}/masina.html?id=${car.id}`,
          Name: lead.name.value,
          Telefon: lead.phone.value,
          'E-Mail': lead.email.value || '—',
          Finanzierung: lead.finance.checked ? 'Ja, Informationen gewünscht' : 'Nein'
        });
        note.style.color = 'var(--green)';
        note.textContent = T24.t('lead.ok');
        lead.reset();
      } catch (err) {
        note.style.color = 'var(--red)';
        note.innerHTML = `${T24.t('lead.errPre')} <a href="${T24.waCar(car)}" target="_blank" rel="noopener" style="color:var(--blue-deep)">${T24.t('lead.errLink')}</a>.`;
      } finally {
        btn.disabled = false; btn.textContent = orig;
      }
    });
  }
};
