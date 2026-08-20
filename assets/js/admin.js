/* ============================================
   Total24 Automobile — Admin panel (client-side)
   Working copy in localStorage, export cars.json
   ============================================ */

const Admin = {
  KEY: 't24_cars',
  cars: [],
  editing: null,

  async init() {
    await this.load();
    this.renderList();
    document.getElementById('btnNew').addEventListener('click', () => this.openForm());
    document.getElementById('btnExport').addEventListener('click', () => this.export());
    document.getElementById('btnImport').addEventListener('click', () => document.getElementById('importFile').click());
    document.getElementById('importFile').addEventListener('change', e => this.import(e));
    document.getElementById('carForm').addEventListener('submit', e => this.save(e));
    document.getElementById('btnCancel').addEventListener('click', () => this.closeForm());
    document.getElementById('imgInput').addEventListener('change', e => this.addImages(e));
  },

  async load() {
    const saved = localStorage.getItem(this.KEY);
    if (saved) { this.cars = JSON.parse(saved); return; }
    // seed from file
    try { const r = await fetch('data/cars.json'); const d = await r.json(); this.cars = d.cars || []; }
    catch { this.cars = []; }
    this.persist();
  },

  persist() { localStorage.setItem(this.KEY, JSON.stringify(this.cars)); },

  status(text, ok = true) {
    const s = document.getElementById('adminStatus');
    s.textContent = text;
    s.style.color = ok ? 'var(--green)' : 'var(--red)';
    setTimeout(() => { s.textContent = ''; }, 3500);
  },

  renderList() {
    const el = document.getElementById('adminList');
    document.getElementById('adminCount').textContent = this.cars.length;
    if (!this.cars.length) { el.innerHTML = '<p style="color:var(--text-muted);padding:20px">Niciun anunț. Apasă „Adaugă mașină".</p>'; return; }
    el.innerHTML = this.cars.map((c, i) => `
      <div class="admin-row">
        <div class="admin-thumb">${c.images && c.images.length ? `<img src="${c.images[0]}">` : T24.icon('car', 26, 1.4)}</div>
        <div class="admin-info">
          <b>${c.make} ${c.model}</b>
          <span>${c.year} · ${T24.km(c.mileage)} · ${T24.price(c.price)} · <em class="status-${c.status}">${c.status}</em></span>
        </div>
        <div class="admin-acts">
          <button class="btn btn-outline btn-sm" onclick="Admin.openForm(${i})">Editează</button>
          <button class="btn btn-outline btn-sm danger" onclick="Admin.remove(${i})">Șterge</button>
        </div>
      </div>`).join('');
  },

  openForm(index = null) {
    this.editing = index;
    const c = index !== null ? this.cars[index] : {};
    const f = document.getElementById('carForm');
    const set = (n, v) => { if (f[n]) f[n].value = v ?? ''; };
    set('make', c.make); set('model', c.model); set('year', c.year); set('firstReg', c.firstReg);
    set('price', c.price); set('mileage', c.mileage); set('fuel', c.fuel || 'Diesel');
    set('transmission', c.transmission || 'Automată'); set('power', c.power); set('engine', c.engine);
    set('capacity', c.capacity); set('color', c.color); set('body', c.body || 'Sedan');
    set('doors', c.doors || 4); set('seats', c.seats || 5); set('co2', c.co2);
    set('features', (c.features || []).join(', '));
    set('description', c.description); set('status', c.status || 'available');
    f.featured.checked = !!c.featured;
    this.tempImages = (c.images || []).slice();
    this.renderImages();
    document.getElementById('formTitle').textContent = index !== null ? 'Editează mașina' : 'Adaugă mașină';
    document.getElementById('formModal').classList.add('open');
  },

  closeForm() { document.getElementById('formModal').classList.remove('open'); this.tempImages = []; },

  tempImages: [],

  addImages(e) {
    const files = [...e.target.files];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          // downscale to max 1280px wide, JPEG 0.82
          const max = 1280;
          let { width, height } = img;
          if (width > max) { height = Math.round(height * max / width); width = max; }
          const cv = document.createElement('canvas');
          cv.width = width; cv.height = height;
          cv.getContext('2d').drawImage(img, 0, 0, width, height);
          this.tempImages.push(cv.toDataURL('image/jpeg', 0.82));
          this.renderImages();
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  },

  renderImages() {
    const el = document.getElementById('imgPreview');
    el.innerHTML = this.tempImages.map((src, i) => `
      <div class="img-chip">
        <img src="${src}">
        <button type="button" onclick="Admin.removeImage(${i})">${T24.icon('close', 14, 2.4)}</button>
      </div>`).join('');
  },

  removeImage(i) { this.tempImages.splice(i, 1); this.renderImages(); },

  slug(make, model, year) {
    return `${make}-${model}-${year}`.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  },

  save(e) {
    e.preventDefault();
    const f = e.target;
    const num = v => v === '' ? 0 : Number(v);
    const car = {
      id: this.editing !== null ? this.cars[this.editing].id : this.slug(f.make.value, f.model.value, f.year.value),
      make: f.make.value.trim(), model: f.model.value.trim(),
      year: num(f.year.value), firstReg: f.firstReg.value.trim(),
      price: num(f.price.value), mileage: num(f.mileage.value),
      fuel: f.fuel.value, transmission: f.transmission.value,
      power: num(f.power.value), engine: f.engine.value.trim(),
      capacity: num(f.capacity.value), color: f.color.value.trim(),
      body: f.body.value, doors: num(f.doors.value), seats: num(f.seats.value),
      co2: num(f.co2.value),
      features: f.features.value.split(',').map(s => s.trim()).filter(Boolean),
      description: f.description.value.trim(),
      images: this.tempImages.slice(),
      status: f.status.value, featured: f.featured.checked
    };
    if (this.editing !== null) this.cars[this.editing] = car;
    else this.cars.unshift(car);
    this.persist();
    this.renderList();
    this.closeForm();
    this.status('✓ Salvat. Nu uita să exporți cars.json și să faci commit pe GitHub.');
  },

  remove(i) {
    if (!confirm(`Ștergi ${this.cars[i].make} ${this.cars[i].model}?`)) return;
    this.cars.splice(i, 1);
    this.persist();
    this.renderList();
  },

  export() {
    const data = JSON.stringify({ cars: this.cars }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cars.json';
    a.click();
    this.status('✓ cars.json descărcat. Înlocuiește data/cars.json și fă commit.');
  },

  import(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const d = JSON.parse(ev.target.result);
        this.cars = d.cars || [];
        this.persist(); this.renderList();
        this.status('✓ Importat ' + this.cars.length + ' mașini.');
      } catch { this.status('✗ Fișier invalid.', false); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
};
