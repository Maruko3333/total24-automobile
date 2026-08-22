/* ============================================
   Total24 Automobile — Ratgeber (Blog/Guide)
   Hub (ratgeber.html) + Articol (artikel.html)
   ============================================ */

const Ratgeber = {
  data: null,
  starSvg: '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L12 17l-5.5 3.2 1.4-6.1L3.2 9.9l6.2-.6z"/></svg>',

  async load() {
    if (this.data) return this.data;
    const r = await fetch('data/ratgeber.json', { cache: 'no-store' });
    this.data = await r.json();
    return this.data;
  },
  catByKey(key) { return (this.data.categories || []).find(c => c.key === key); },
  fmtDate(d) {
    if (!d) return '';
    const [y, m] = String(d).split('-');
    const mm = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'];
    return (m ? mm[+m - 1] + ' ' : '') + y;
  },

  // ---- Card articol (grid) ----
  artCard(a) {
    const cat = this.catByKey(a.category);
    const img = a.image
      ? `<img src="${a.image}" alt="${a.title}" loading="lazy" decoding="async">`
      : `<div class="no-img">${T24.icon('doc', 40, 1.3)}</div>`;
    return `<a href="artikel.html?slug=${a.slug}" class="art-card">
      <div class="art-media">${img}${cat ? `<span class="art-cat">${cat.label}</span>` : ''}</div>
      <div class="art-body">
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <div class="art-meta"><span>${a.readingTime || 5} Min. Lesezeit</span><span class="dot"></span><span>${this.fmtDate(a.date)}</span></div>
      </div></a>`;
  },

  // ==========================================================
  //  HUB — ratgeber.html
  // ==========================================================
  async initHub() {
    await this.load();
    const cats = this.data.categories || [], arts = this.data.articles || [];
    const activeKey = new URLSearchParams(location.search).get('cat');
    const active = activeKey ? this.catByKey(activeKey) : null;

    // Grilă categorii
    const catWrap = document.getElementById('catGrid');
    if (catWrap) catWrap.innerHTML = cats.map(c => {
      const n = arts.filter(a => a.category === c.key).length;
      return `<a href="ratgeber.html?cat=${c.key}" class="cat-card ${c.key === activeKey ? 'is-active' : ''}">
        <span class="ic">${T24.icon(c.icon, 24, 1.6)}</span>
        <h3>${c.label}</h3><p>${c.desc}</p>
        <span class="count">${n} Artikel ${T24.icon('arrowRight', 13)}</span></a>`;
    }).join('');

    // Titlu listă + filtrare
    const title = document.getElementById('artListTitle');
    if (title) title.textContent = active ? active.label : 'Alle Artikel';
    const sub = document.getElementById('artListSub');
    if (sub) sub.textContent = active ? active.desc : 'Ratgeber, Kaufberatung und Wissen rund um Gebrauchtwagen.';

    const list = active ? arts.filter(a => a.category === activeKey) : arts;
    const grid = document.getElementById('artGrid');
    if (grid) grid.innerHTML = list.length
      ? list.map(a => this.artCard(a)).join('')
      : `<div class="empty-state" style="grid-column:1/-1">${T24.icon('doc', 46, 1.4)}
          <h3 style="margin:14px 0 6px">Bald verfügbar</h3>
          <p>In dieser Kategorie erscheinen in Kürze neue Artikel.</p></div>`;
  },

  // ==========================================================
  //  ARTICOL — artikel.html
  // ==========================================================
  blockHtml(b) {
    switch (b.t) {
      case 'h2': return `<h2 id="${b.id || ''}">${b.text}</h2>`;
      case 'h3': return `<h3>${b.text}</h3>`;
      case 'p': return `<p>${b.html}</p>`;
      case 'ul': return `<ul>${b.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      case 'ol': return `<ol>${b.items.map(i => `<li>${i}</li>`).join('')}</ol>`;
      case 'note': return `<div class="article-note"><span class="ic">${T24.icon('checkCircle', 22)}</span>
        <div>${b.title ? `<b>${b.title}</b>` : ''}<p>${b.html}</p></div></div>`;
      case 'rating': return this.ratingHtml(b);
      default: return '';
    }
  },
  ratingHtml(b) {
    const stars = n => `<span class="stars">${[1, 2, 3, 4, 5].map(i => `<span class="${i <= n ? '' : 'empty'}">${this.starSvg}</span>`).join('')}</span>`;
    return `<div class="rating-box"><h3><span class="ic">${T24.icon('star', 20)}</span>${b.title || 'Unsere Einschätzung'}</h3>
      ${(b.rows || []).map(([l, s]) => `<div class="rating-row"><span class="lbl">${l}</span>${stars(s)}</div>`).join('')}</div>`;
  },

  setArticleSEO(a) {
    const base = T24.siteUrl();
    const url = `${base}/artikel.html?slug=${a.slug}`;
    const img = a.image ? (a.image.startsWith('http') ? a.image : `${base}/${a.image}`) : `${base}/assets/img/brand/showroom.jpg`;
    T24.setMeta('description', a.excerpt);
    T24.setCanonical(url);
    T24.setMeta('og:type', 'article', 'property');
    T24.setMeta('og:title', a.title, 'property');
    T24.setMeta('og:description', a.excerpt, 'property');
    T24.setMeta('og:image', img, 'property');
    T24.setMeta('og:url', url, 'property');
    T24.setMeta('twitter:card', 'summary_large_image');
    T24.addJsonLd({
      '@context': 'https://schema.org', '@type': 'Article',
      headline: a.title, description: a.excerpt, image: img,
      datePublished: a.date, dateModified: a.date,
      author: { '@type': 'Organization', name: 'Total24 Automobile' },
      publisher: { '@type': 'Organization', name: 'Total24 Automobile', logo: { '@type': 'ImageObject', url: `${base}/assets/img/brand/logo.png` } },
      mainEntityOfPage: url
    });
    const cat = this.catByKey(a.category);
    T24.addJsonLd({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${base}/index.html` },
        { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${base}/ratgeber.html` },
        ...(cat ? [{ '@type': 'ListItem', position: 3, name: cat.label, item: `${base}/ratgeber.html?cat=${cat.key}` }] : []),
        { '@type': 'ListItem', position: cat ? 4 : 3, name: a.title }
      ]
    });
    if (a.faq && a.faq.length) {
      T24.addJsonLd({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } }))
      });
    }
  },

  async initArticle() {
    await this.load();
    const slug = new URLSearchParams(location.search).get('slug');
    const a = (this.data.articles || []).find(x => x.slug === slug);
    const wrap = document.getElementById('articleWrap');
    if (!wrap) return;
    if (!a) {
      wrap.innerHTML = `<div class="container"><div class="empty-state" style="padding:80px 20px">${T24.icon('doc', 46, 1.4)}
        <h3 style="margin:14px 0 6px">Artikel nicht gefunden</h3>
        <p><a href="ratgeber.html" style="color:var(--blue-deep)">Zum Ratgeber →</a></p></div></div>`;
      return;
    }
    document.title = `${a.title} | Ratgeber — Total24 Automobile`;
    this.setArticleSEO(a);
    const cat = this.catByKey(a.category);

    // TOC din h2 cu id
    const heads = (a.blocks || []).filter(b => b.t === 'h2' && b.id);
    const toc = (a.toc && heads.length > 2)
      ? `<div class="article-toc"><h4>Inhalt</h4><ol>${heads.map(h => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ol></div>`
      : '';

    const body = (a.blocks || []).map(b => this.blockHtml(b)).join('');
    const faq = (a.faq && a.faq.length)
      ? `<h2 id="faq">Häufige Fragen</h2><div class="faq-list" style="margin:0">${a.faq.map(([q, ans]) =>
          `<details class="faq-item"><summary>${q}<span class="fq-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></summary><div class="fq-a">${ans}</div></details>`).join('')}</div>`
      : '';

    wrap.innerHTML = `
      <div class="article-hero">
        ${a.image ? `<img src="${a.image}" alt="${a.title}">` : ''}
        <div class="container">
          ${cat ? `<a href="ratgeber.html?cat=${cat.key}" class="art-cat">${cat.label}</a>` : ''}
          <h1>${a.title}</h1>
          <div class="art-meta"><span>${a.readingTime || 5} Min. Lesezeit</span><span class="dot"></span><span>${this.fmtDate(a.date)}</span></div>
        </div>
      </div>
      <div class="container">
        <div class="breadcrumb" style="margin-top:22px"><a href="index.html">Startseite</a> / <a href="ratgeber.html">Ratgeber</a>${cat ? ` / <a href="ratgeber.html?cat=${cat.key}">${cat.label}</a>` : ''}</div>
        <article class="article-body">
          ${a.lead ? `<p class="article-lead">${a.lead}</p>` : ''}
          ${toc}
          ${body}
          ${faq}
          <div class="share-row"><span>Teilen:</span>
            <button type="button" class="btn btn-detail" id="artShare">${T24.icon('share', 16)} Senden</button>
            <a class="btn btn-outline" href="ratgeber.html">${T24.icon('arrowRight', 15)} Mehr Ratgeber</a>
          </div>
        </article>

        <div id="relatedWrap"></div>

        <div class="article-body" style="margin-top:44px">
          <div class="article-cta">
            <h3>Sie suchen einen geprüften Gebrauchtwagen?</h3>
            <p>Sehen Sie unseren aktuellen Bestand oder sagen Sie uns, was Sie suchen — wir finden das passende Fahrzeug.</p>
            <div class="cta-actions" style="justify-content:center">
              <a href="stoc.html" class="btn btn-primary btn-lg">Fahrzeuge ansehen ${T24.icon('arrowRight', 16)}</a>
              <a href="contact.html" class="btn btn-ghost-light btn-lg">Kontakt aufnehmen</a>
            </div>
          </div>
        </div>
      </div>`;

    // Share articol
    const sb = document.getElementById('artShare');
    if (sb) sb.addEventListener('click', async () => {
      const url = `${T24.siteUrl()}/artikel.html?slug=${a.slug}`;
      if (navigator.share) { try { await navigator.share({ title: a.title, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
      window.open(`https://wa.me/?text=${encodeURIComponent(a.title + ' ' + url)}`, '_blank', 'noopener');
    });

    // „Aktuell bei Total24" — mașini legate din STOC (după marcă). Se ascunde dacă nu există.
    if (a.relatedMake && window.Cars) {
      try {
        const cars = await T24.loadCars();
        const rel = cars.filter(c => c.make === a.relatedMake && c.status === 'available').slice(0, 3);
        if (rel.length) {
          document.getElementById('relatedWrap').innerHTML = `
            <div class="article-body"><div class="article-related">
              <h2>Aktuell bei Total24 Automobile</h2>
              <p class="rel-sub">Passende ${a.relatedMake}-Fahrzeuge aus unserem Bestand.</p>
              <div class="feat-grid">${rel.map(c => Cars.featuredCard(c)).join('')}</div>
            </div></div>`;
        }
      } catch (e) { /* silențios */ }
    }
  }
};
