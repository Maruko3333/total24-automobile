/* ============================================
   Total24 Automobile — Cars rendering
   ============================================ */

const Cars = {
  // ---- Card markup ----
  card(car) {
    const img = (car.images && car.images.length)
      ? `<img src="${car.images[0]}" alt="${car.make} ${car.model}" loading="lazy">`
      : `<div class="no-img">${T24.icon('car', 46, 1.4)}</div>`;
    const statusBadge = car.status !== 'available'
      ? `<span class="badge-status status-${car.status}">${car.status === 'reserved' ? 'Rezervat' : 'Vândut'}</span>`
      : '';
    return `
    <a href="masina.html?id=${car.id}" class="car-card">
      <div class="car-media">
        ${img}
        <span class="car-badge">${car.year} · ${car.fuel}</span>
        <span class="car-fav">${T24.icon('heart', 18)}</span>
      </div>
      <div class="car-body">
        <div class="car-title">${car.make} ${car.model}</div>
        <div class="car-sub">Prima înmatriculare ${car.firstReg || car.year} ${statusBadge}</div>
        <div class="car-specs">
          <span class="car-spec"><span class="ic">${T24.icon('gauge', 16)}</span>${T24.km(car.mileage)}</span>
          <span class="car-spec"><span class="ic">${T24.icon('fuel', 16)}</span>${car.fuel}</span>
          <span class="car-spec"><span class="ic">${T24.icon('gear', 16)}</span>${car.transmission}</span>
          <span class="car-spec"><span class="ic">${T24.icon('power', 16)}</span>${car.power} CP</span>
        </div>
        <div class="car-foot">
          <div class="car-price">${T24.price(car.price)}<small>preț final</small></div>
          <span class="btn btn-outline" style="padding:9px 16px;font-size:13px;">Detalii ${T24.icon('arrowRight', 15)}</span>
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
    el.innerHTML = list.map(c => this.card(c)).join('');
  },

  // ---- Stoc: full listing with filters ----
  state: { all: [], filtered: [] },

  async initStoc() {
    const cars = await T24.loadCars();
    this.state.all = cars;
    this.buildFilterOptions(cars);
    this.applyFilters();

    ['fMake', 'fModel', 'fYear', 'fKm', 'fBody', 'fSort'].forEach(id => {
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
  },

  buildFilterOptions(cars) {
    const makes = [...new Set(cars.map(c => c.make))].sort();
    const years = [...new Set(cars.map(c => c.year))].sort((a, b) => b - a);
    const bodies = [...new Set(cars.map(c => c.body))].sort();
    this.fill('fMake', makes, 'Toate mărcile');
    this.fill('fYear', years, 'Oricare');
    this.fill('fBody', bodies, 'Oricare');
    this.buildModelOptions();
    const maxPrice = Math.max(...cars.map(c => c.price), 30000);
    const price = document.getElementById('fPrice');
    if (price) {
      price.max = Math.ceil(maxPrice / 5000) * 5000;
      price.value = price.max;
      document.getElementById('priceVal').textContent = T24.price(price.value);
      document.getElementById('priceMin').textContent = T24.price(price.min);
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
    const km = val('fKm'), sort = val('fSort');
    const price = document.getElementById('fPrice');
    const maxPrice = price ? Number(price.value) : Infinity;

    let list = this.state.all.filter(c => {
      if (make && c.make !== make) return false;
      if (model && c.model !== model) return false;
      if (year && String(c.year) !== year) return false;
      if (body && c.body !== body) return false;
      if (c.price > maxPrice) return false;
      if (km && c.mileage > Number(km)) return false;
      return true;
    });

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
    if (count) count.innerHTML = `<b>${list.length}</b> mașini găsite`;
    const btn = document.getElementById('fApplyCount');
    if (btn) btn.textContent = `Filtrează (${list.length})`;
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        ${T24.icon('search', 46, 1.4)}
        <h3 style="margin:14px 0 6px">Nicio mașină găsită</h3>
        <p>Încearcă să ajustezi filtrele.</p></div>`;
      return;
    }
    grid.innerHTML = list.map(c => this.card(c)).join('');
  },

  reset() {
    ['fMake', 'fModel', 'fYear', 'fKm', 'fBody', 'fSort'].forEach(id => {
      const e = document.getElementById(id); if (e) e.value = '';
    });
    const price = document.getElementById('fPrice');
    if (price) { price.value = price.max; document.getElementById('priceVal').textContent = T24.price(price.value); }
    this.buildModelOptions();
    this.applyFilters();
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
    document.title = `${car.make} ${car.model} — Total24 Automobile`;
    const c = T24.config.company;
    const wa = c.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(`Bună ziua, sunt interesat de ${car.make} ${car.model} (${car.year}) - ${T24.price(car.price)}.`);

    const mainImg = (car.images && car.images.length)
      ? `<img src="${car.images[0]}" id="galMain" alt="${car.make} ${car.model}">`
      : `<div class="no-img">${T24.icon('car', 60, 1.3)}<p>Fotografii în curând</p></div>`;
    const thumbs = (car.images || []).map((src, i) =>
      `<div class="thumb ${i === 0 ? 'active' : ''}" data-src="${src}"><img src="${src}" alt=""></div>`
    ).join('');

    const specs = [
      ['Prima înmatriculare', car.firstReg || car.year],
      ['Kilometraj', T24.km(car.mileage)],
      ['Combustibil', car.fuel],
      ['Transmisie', car.transmission],
      ['Putere', car.power + ' CP'],
      ['Capacitate', car.capacity ? car.capacity + ' cm³' : '—'],
      ['Motor', car.engine || '—'],
      ['Caroserie', car.body],
      ['Culoare', car.color],
      ['Uși / Locuri', `${car.doors} / ${car.seats}`],
      ['Emisii CO₂', car.co2 ? car.co2 + ' g/km' : '—'],
      ['Stare', car.status === 'available' ? 'Disponibilă' : (car.status === 'reserved' ? 'Rezervată' : 'Vândută')]
    ];
    const features = (car.features || []).map(f =>
      `<div class="feature-li"><span class="ic">${T24.icon('check', 16)}</span>${f}</div>`).join('');

    wrap.innerHTML = `
      <div class="breadcrumb"><a href="index.html">Acasă</a> / <a href="stoc.html">Stoc Auto</a> / ${car.make} ${car.model}</div>
      <div class="detail-grid">
        <div>
          <div class="gallery-main">${mainImg}</div>
          ${thumbs ? `<div class="gallery-thumbs">${thumbs}</div>` : ''}
        </div>
        <aside class="detail-panel">
          <h1>${car.make} ${car.model}</h1>
          <div class="sub">${car.year} · ${T24.km(car.mileage)} · ${car.fuel}</div>
          <div class="detail-price">${T24.price(car.price)}</div>
          <div class="detail-price-note">Preț final · Import inclus · TVA deductibil la cerere</div>
          <div class="detail-actions">
            <a href="https://wa.me/${wa}?text=${msg}" target="_blank" class="btn btn-primary btn-block">${T24.icon('whatsapp', 18)} Scrie pe WhatsApp</a>
            <a href="tel:${c.phone}" class="btn btn-outline btn-block">${T24.icon('phone', 18)} ${c.phone}</a>
            <a href="finantare.html?price=${car.price}" class="btn btn-outline btn-block">${T24.icon('percent', 18)} Calculează rata</a>
          </div>
        </aside>
      </div>
      <div class="spec-table">
        <h3>Specificații tehnice</h3>
        <div class="spec-list">
          ${specs.map(([k, v]) => `<div class="spec-item"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}
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
  }
};
