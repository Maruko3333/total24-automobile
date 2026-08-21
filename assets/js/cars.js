/* ============================================
   Total24 Automobile — Cars rendering
   ============================================ */

const Cars = {
  // ---- Card markup (aerisit, cu CTA WhatsApp) ----
  card(car) {
    const img = (car.images && car.images.length)
      ? `<img src="${car.images[0]}" alt="${car.make} ${car.model}" loading="lazy">`
      : `<div class="no-img">${T24.icon('car', 46, 1.4)}</div>`;
    const statusBadge = car.status !== 'available'
      ? `<span class="car-status status-${car.status}">${car.status === 'reserved' ? 'Rezervat' : 'Vândut'}</span>`
      : '';
    const meta = [car.year, T24.km(car.mileage), car.fuel, car.transmission].filter(Boolean).join(' · ');
    const favCls = T24.favs.has(car.id) ? ' is-fav' : '';
    return `
    <div class="car-card">
      <a href="masina.html?id=${car.id}" class="car-media">
        ${img}
        ${statusBadge}
        <span class="car-fav${favCls}" data-fav="${car.id}" role="button" tabindex="0" aria-label="Salvează la favorite">${T24.icon('heart', 18)}</span>
      </a>
      <div class="car-body">
        <a href="masina.html?id=${car.id}" class="car-title">${car.make} ${car.model}</a>
        <div class="car-meta">${meta}</div>
        <div class="car-price">${T24.price(car.price)}</div>
        <div class="car-actions">
          <a href="masina.html?id=${car.id}" class="btn btn-primary car-cta">Vezi mașina ${T24.icon('arrowRight', 15)}</a>
          <a href="${T24.waCar(car)}" target="_blank" rel="noopener" class="car-wa" aria-label="Întreabă pe WhatsApp">${T24.icon('whatsapp', 18)}</a>
        </div>
      </div>
    </div>`;
  },

  // ---- Home: card mare, aerisit (imagine mare, MODEL / meta / preț / „Vezi mașina") ----
  featuredCard(car) {
    const img = (car.images && car.images.length)
      ? `<img src="${car.images[0]}" alt="${car.make} ${car.model}" loading="lazy">`
      : `<div class="no-img">${T24.icon('car', 54, 1.3)}</div>`;
    const meta = [car.year, T24.km(car.mileage), car.fuel, car.transmission].filter(Boolean).join(' · ');
    return `
    <a href="masina.html?id=${car.id}" class="feat-card">
      <div class="feat-media">${img}</div>
      <div class="feat-body">
        <h3 class="feat-title">${car.make} ${car.model}</h3>
        <div class="feat-meta">${meta}</div>
        <div class="feat-foot">
          <span class="feat-price">${T24.price(car.price)}</span>
          <span class="feat-link">Fahrzeug ansehen ${T24.icon('arrowRight', 15)}</span>
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
    this.fill('fMake', uniq('make').sort(), 'Toate mărcile');
    this.fill('fYear', uniq('year').sort((a, b) => b - a), 'Oricare');
    this.fill('fFuel', uniq('fuel').sort(), 'Oricare');
    this.fill('fGear', uniq('transmission').sort(), 'Oricare');
    this.fill('fBody', uniq('body').sort(), 'Oricare');
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
    this.fill('fModel', models, 'Toate modelele');
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
    const noun = list.length === 1 ? 'mașină disponibilă' : 'mașini disponibile';
    if (count) count.innerHTML = `<b>${list.length}</b> ${this.state.favOnly ? 'favorite' : noun}`;
    const btn = document.getElementById('fApplyCount');
    if (btn) btn.textContent = `Filtrează (${list.length})`;
    if (!grid) return;
    if (!list.length) {
      const fav = this.state.favOnly;
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        ${T24.icon(fav ? 'heart' : 'search', 46, 1.4)}
        <h3 style="margin:14px 0 6px">${fav ? 'Nu ai mașini favorite încă' : 'Nicio mașină găsită'}</h3>
        <p>${fav ? 'Apasă ♥ pe o mașină ca s-o salvezi aici.' : 'Încearcă să ajustezi filtrele.'}</p></div>`;
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
    const desc = `${car.make} ${car.model}, ${car.year}, ${T24.km(car.mileage)}, ${car.fuel}, ${car.transmission}. Preț ${T24.price(car.price)}. Prima mână, km la service-ul oficial — Total24 Automobile, Fürth.`;

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
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${base}/index.html` },
        { '@type': 'ListItem', position: 2, name: 'Stoc Auto', item: `${base}/stoc.html` },
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
        <h3 style="margin:14px 0 6px">Mașina nu a fost găsită</h3>
        <p><a href="stoc.html" style="color:var(--gold)">Vezi tot stocul →</a></p></div>`;
      return;
    }
    document.title = `${car.make} ${car.model} ${car.year} — Total24 Automobile`;
    this.setDetailSEO(car);
    const c = T24.config.company;
    const phone = c.phone;
    const monthly = T24.monthly(car.price);

    const mainImg = (car.images && car.images.length)
      ? `<img src="${car.images[0]}" id="galMain" alt="${car.make} ${car.model}">`
      : `<div class="no-img">${T24.icon('car', 60, 1.3)}<p>Fotografii în curând</p></div>`;
    const thumbs = (car.images || []).map((src, i) =>
      `<div class="thumb ${i === 0 ? 'active' : ''}" data-src="${src}"><img src="${src}" alt=""></div>`
    ).join('');

    const mobileDe = c.mobileDeUrl || '';
    const sub = [car.year, T24.km(car.mileage), car.fuel, car.transmission].filter(Boolean).join(' · ');

    // Specificații-cheie (mari, vizibile) — doar cele cu valoare
    const keyList = [
      ['power', car.power ? car.power + ' CP' : null, 'Putere'],
      ['gauge', T24.km(car.mileage), 'Kilometraj'],
      ['fuel', car.fuel, 'Combustibil'],
      ['gear', car.transmission, 'Transmisie'],
      ['calendar', car.year, 'An'],
      ['car', car.body, 'Caroserie']
    ].filter(([, v]) => v);
    const keySpecs = keyList.map(([ic, v, l]) =>
      `<div class="key-spec"><span class="ic">${T24.icon(ic, 20)}</span><div><b>${v}</b><span>${l}</span></div></div>`).join('');

    // Tabel detaliat complet
    const specs = [
      ['calendar', 'Prima înmatriculare', car.firstReg || car.year],
      ['gauge', 'Kilometraj', T24.km(car.mileage)],
      ['fuel', 'Combustibil', car.fuel],
      ['gear', 'Transmisie', car.transmission],
      ['power', 'Putere', car.power ? car.power + ' CP' : '—'],
      ['car', 'Capacitate', car.capacity ? car.capacity + ' cm³' : '—'],
      ['car', 'Caroserie', car.body],
      ['tag', 'Culoare', car.color || '—'],
      ['car', 'Uși / Locuri', `${car.doors || '—'} / ${car.seats || '—'}`],
      ['gauge', 'Emisii CO₂', car.co2 ? car.co2 + ' g/km' : '—']
    ];
    const features = (car.features || []).map(f =>
      `<div class="feature-li"><span class="ic">${T24.icon('check', 16)}</span>${f}</div>`).join('');

    wrap.innerHTML = `
      <div class="breadcrumb"><a href="index.html">Acasă</a> / <a href="stoc.html">Stoc Auto</a> / ${car.make} ${car.model}</div>
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
          <a href="finantare.html?price=${car.price}" class="detail-finance">${T24.icon('percent', 15)} Finanțare de la <b>${monthly} €/lună</b></a>
          <ul class="detail-trust">
            <li>${T24.icon('checkCircle', 17)} Prima mână — un singur proprietar</li>
            <li>${T24.icon('checkCircle', 17)} Km făcuți doar la service-ul oficial</li>
            <li>${T24.icon('checkCircle', 17)} Istoric clar și documente complete</li>
          </ul>
          <div class="detail-cta-row">
            <a href="${T24.waCar(car)}" target="_blank" rel="noopener" class="btn btn-wa btn-block">${T24.icon('whatsapp', 18)} WhatsApp</a>
            <a href="tel:${phone}" class="btn btn-primary btn-block">${T24.icon('phone', 18)} Sună acum</a>
          </div>
          ${mobileDe ? `<a href="${mobileDe}" target="_blank" rel="noopener" class="detail-mobilede">
            <span>Publicat și pe Mobile.de</span>
            <b>Vezi anunțul pe Mobile.de ${T24.icon('arrowRight', 14)}</b>
          </a>` : ''}

          <div class="lead-box">
            <h3>Te interesează această mașină?</h3>
            <p>Lasă-ne datele și te contactăm cu o ofertă.</p>
            <form class="lead-form" id="leadForm">
              <input name="name" placeholder="Numele tău" required>
              <input name="phone" type="tel" placeholder="Telefon" required>
              <input name="email" type="email" placeholder="Email (opțional)">
              <label class="lead-check"><input type="checkbox" name="finance"> Doresc informații despre finanțare</label>
              <button type="submit" class="btn btn-primary btn-block">Trimite cererea</button>
            </form>
            <p class="lead-note" id="leadNote"></p>
          </div>
        </aside>
      </div>

      <div class="spec-table">
        <h3>Specificații</h3>
        <div class="key-specs">${keySpecs}</div>
        <div class="spec-grid">
          ${specs.map(([ic, k, v]) => `<div class="spec-cell"><span class="ic">${T24.icon(ic, 18)}</span><div><span class="k">${k}</span><span class="v">${v}</span></div></div>`).join('')}
        </div>
      </div>
      ${features ? `<div class="spec-table"><h3>Dotări</h3><div class="features-grid">${features}</div></div>` : ''}
      ${car.description ? `<div class="spec-table"><h3>Descriere</h3><p class="detail-desc">${car.description}</p></div>` : ''}
    `;

    // gallery thumbs
    wrap.querySelectorAll('.thumb').forEach(t => t.addEventListener('click', () => {
      wrap.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const m = document.getElementById('galMain');
      if (m) m.src = t.dataset.src;
    }));

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
      btn.disabled = true; btn.textContent = 'Se trimite...';
      try {
        await T24.sendLead({
          _subject: `Cerere ofertă — ${car.make} ${car.model} (${car.year})`,
          _template: 'table',
          ...(lead.email.value ? { _replyto: lead.email.value } : {}),
          Mașina: `${car.make} ${car.model} ${car.year}`,
          Preț: T24.price(car.price),
          Link: `${T24.siteUrl()}/masina.html?id=${car.id}`,
          Nume: lead.name.value,
          Telefon: lead.phone.value,
          Email: lead.email.value || '—',
          Finanțare: lead.finance.checked ? 'Da, dorește informații' : 'Nu'
        });
        note.style.color = 'var(--green)';
        note.textContent = 'Mulțumim! Cererea a fost trimisă — te contactăm cu o ofertă.';
        lead.reset();
      } catch (err) {
        note.style.color = 'var(--red)';
        note.innerHTML = `Nu am putut trimite acum. Scrie-ne pe <a href="${T24.waCar(car)}" target="_blank" rel="noopener" style="color:var(--gold)">WhatsApp</a>.`;
      } finally {
        btn.disabled = false; btn.textContent = orig;
      }
    });
  }
};
