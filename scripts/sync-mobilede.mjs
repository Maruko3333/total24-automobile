#!/usr/bin/env node
/**
 * Total24 Automobile — Sincronizare stoc din Mobile.de Seller API -> data/cars.json
 *
 * Rulează LOCAL (nu în browser). Face DOAR cereri GET (citește anunțurile tale).
 * NU modifică și NU șterge nimic pe Mobile.de.
 *
 *   node scripts/sync-mobilede.mjs
 *
 * Credențiale: scripts/mobilede.credentials.json  (gitignorat — nu ajunge pe GitHub)
 * Docs API: https://services.mobile.de/docs/seller-api.html
 */
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CRED_PATH = join(__dirname, 'mobilede.credentials.json');
const CARS_PATH = join(ROOT, 'data', 'cars.json');
const SAMPLE_PATH = join(__dirname, 'mobilede-sample.json');

const die = (msg) => { console.error('\n❌ ' + msg + '\n'); process.exit(1); };

// ---------- Credențiale ----------
if (!existsSync(CRED_PATH)) die('Lipsește scripts/mobilede.credentials.json — completează username / password / sellerId.');
let cred;
try { cred = JSON.parse(readFileSync(CRED_PATH, 'utf8')); }
catch (e) { die('mobilede.credentials.json nu e JSON valid: ' + e.message); }

const environment = cred.environment === 'sandbox' ? 'sandbox' : 'production';
const username = (cred.username || '').trim();
const password = (cred.password || '').trim();
let sellerId = (cred.sellerId ? String(cred.sellerId) : '').trim();
if (!username || !password) die('Completează "username" și "password" în scripts/mobilede.credentials.json.');

const BASE = environment === 'sandbox'
  ? 'https://services.sandbox.mobile.de/seller-api'
  : 'https://services.mobile.de/seller-api';
const AUTH = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

// ---------- Helper HTTP (doar GET) ----------
async function fetchJson(path) {
  const res = await fetch(BASE + path, { headers: { Authorization: AUTH, Accept: 'application/json' } });
  const text = await res.text();
  let body; try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { ok: res.ok, status: res.status, statusText: res.statusText, body };
}
// varianta „dură" — oprește scriptul la eroare (pentru cererile principale)
async function api(path) {
  const r = await fetchJson(path);
  if (!r.ok) {
    const hint = r.status === 401 ? 'username/parolă greșite'
      : r.status === 403 ? 'cont fără acces la Seller-API (cere activarea la suportul Mobile.de)'
      : r.status === 404 ? 'sellerId greșit sau resursă inexistentă' : '';
    die(`API ${r.status} ${r.statusText} la ${path}${hint ? ` — ${hint}` : ''}\n` +
        (typeof r.body === 'string' ? r.body : JSON.stringify(r.body, null, 2)));
  }
  return r.body;
}
// verifică dacă un sellerId e valid (întoarce 200 la lista de anunțuri)
async function sellerWorks(id) {
  const r = await fetchJson(`/sellers/${encodeURIComponent(id)}/ads?page.number=1&page.size=1`);
  return r.ok;
}
// descoperă automat sellerId
async function discoverSellerId() {
  // 1) endpoint listă vânzători (dacă există)
  const s = await fetchJson('/sellers');
  if (s.ok && s.body) {
    const list = Array.isArray(s.body) ? s.body : (s.body.sellers || s.body.items || []);
    if (list && list.length) {
      const id = String(list[0].mobileSellerId || list[0].id || list[0].sellerId || '');
      if (id && await sellerWorks(id)) return id;
    }
  }
  // 2) username-ul e des chiar numărul de vânzător
  if (await sellerWorks(username)) return username;
  // 3) dacă username-ul e numeric, mai încearcă o dată explicit
  if (/^\d+$/.test(username) && await sellerWorks(username)) return username;
  return '';
}

// ---------- Mapări cod -> etichetă germană ----------
const FUEL = { PETROL:'Benzin', DIESEL:'Diesel', ELECTRICITY:'Elektro', HYBRID:'Hybrid',
  HYBRID_PLUGIN:'Plug-in-Hybrid', LPG:'Autogas (LPG)', CNG:'Erdgas (CNG)',
  HYDROGENIUM:'Wasserstoff', ETHANOL:'Ethanol', OTHER:'Sonstige' };
const GEAR = { MANUAL_GEAR:'Schaltgetriebe', AUTOMATIC_GEAR:'Automatik', SEMIAUTOMATIC_GEAR:'Halbautomatik' };

const kwToPs = (kw) => kw ? Math.round(Number(kw) * 1.35962) : null;
const yearOf = (s) => { const m = String(s || '').match(/(\d{4})/); return m ? Number(m[1]) : null; };
const slug = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '');
// Mobile.de întoarce des câmpuri fie ca string-cod, fie ca {key, local}
const lbl = (v) => (v && typeof v === 'object') ? (v.local || v.value || v.key || '') : (v ?? '');

// Alege URL-ul de imagine (preferă rezoluție mare din "representations")
function imageUrls(images, ad) {
  const list = (images && images.length) ? images : (ad.images || []);
  return list.map((im) => {
    if (typeof im === 'string') return im;
    if (im.ref || im.url) return im.ref || im.url;
    if (Array.isArray(im.representations)) {
      const big = im.representations.find(r => /ICON1024|XXXL|XXL|L\b/.test(r.rule || r.size || '')) || im.representations[im.representations.length - 1];
      return big && (big.url || big.ref);
    }
    return null;
  }).filter(Boolean);
}

function mapAd(ad, images) {
  const price = ad.price || {};
  const make = lbl(ad.make);
  const model = lbl(ad.model);
  const modelDesc = ad.modelDescription || '';
  const year = yearOf(ad.firstRegistration);
  const cc = ad.cubicCapacity ? Number(ad.cubicCapacity) : null;
  const id = ad.mobileAdId || ad.adId || ad.id || slug(`${make}-${modelDesc || model}-${year || ''}`);
  return {
    id: String(id),
    make,
    model: (modelDesc || model),
    year,
    firstReg: ad.firstRegistration || (year ? String(year) : ''),
    price: Math.round(Number(price.consumerPriceGross ?? price.grossAmount ?? price.amount ?? 0)) || 0,
    mileage: Number(ad.mileage) || 0,
    fuel: FUEL[ad.fuel] || lbl(ad.fuel) || '',
    transmission: GEAR[ad.gearbox] || lbl(ad.gearbox) || '',
    power: kwToPs(ad.power),           // kW -> PS
    engine: cc ? (Math.round(cc / 100) / 10) + '' : '',
    capacity: cc,
    color: lbl(ad.exteriorColor) || '',
    body: lbl(ad.category) || lbl(ad.vehicleClass) || '',
    doors: ad.doors ? (Number(String(ad.doors).replace(/\D/g, '')) || null) : null,
    seats: ad.seats ? Number(ad.seats) : null,
    co2: ad.emissionsCo2 ? Number(ad.emissionsCo2) : null,
    vin: ad.vin || '',
    features: Array.isArray(ad.features) ? ad.features.map(lbl).filter(Boolean) : [],
    description: (typeof ad.description === 'string' ? ad.description : (ad.description?.value || '')) || '',
    images: imageUrls(images, ad),
    status: 'available',
    featured: false
  };
}

// ---------- Preluare anunțuri (cu paginare defensivă) ----------
async function getAllAds() {
  const out = [];
  for (let page = 1, guard = 0; guard++ < 200; page++) {
    const body = await api(`/sellers/${encodeURIComponent(sellerId)}/ads?page.number=${page}&page.size=100`);
    const ads = Array.isArray(body) ? body
      : (body.ads || body.items || body._embedded?.ads || body.content || []);
    out.push(...ads);
    const totalPages = body && (body.totalPages || (body.total ? Math.ceil(body.total / 100) : null));
    if (Array.isArray(body) || ads.length < 100) break;
    if (totalPages && page >= totalPages) break;
  }
  return out;
}

// ---------- Rulare ----------
(async () => {
  if (!sellerId) {
    console.log('… caut automat sellerId (nu l-ai completat)…');
    sellerId = await discoverSellerId();
    if (sellerId) console.log('ℹ️  sellerId găsit automat:', sellerId);
    else die('Nu am putut afla sellerId automat.\n' +
      '   → Caută "Kundennummer" în contul tău Mobile.de (Händlerbereich) și pune-l la "sellerId" în\n' +
      '     scripts/mobilede.credentials.json. SAU trimite-mi ce vezi și îl aflăm împreună.');
  } else if (!(await sellerWorks(sellerId))) {
    die(`sellerId "${sellerId}" nu răspunde (401/403/404). Verifică-l sau lasă-l gol pentru descoperire automată.`);
  }

  console.log(`→ Mediu: ${environment} | sellerId: ${sellerId}`);
  const ads = await getAllAds();
  console.log(`→ ${ads.length} anunțuri primite din Mobile.de.`);

  if (!ads.length) {
    console.log('⚠️  Niciun anunț activ — păstrez data/cars.json neschimbat (nu suprascriu cu gol).');
    return;
  }

  // salvează primul anunț BRUT pentru inspecție (ca să rafinăm maparea dacă e nevoie)
  writeFileSync(SAMPLE_PATH, JSON.stringify(ads[0], null, 2));

  const cars = [];
  for (const ad of ads) {
    let images = ad.images;
    const adId = ad.mobileAdId || ad.adId || ad.id;
    if ((!images || !images.length) && adId) {
      try {
        const im = await api(`/sellers/${encodeURIComponent(sellerId)}/ads/${adId}/images`);
        images = Array.isArray(im) ? im : (im.images || im.items || []);
      } catch { /* fără imagini */ }
    }
    cars.push(mapAd(ad, images));
  }
  cars.slice(0, 3).forEach(c => c.featured = true); // primele 3 apar pe homepage

  // backup înainte de suprascriere
  if (existsSync(CARS_PATH)) copyFileSync(CARS_PATH, CARS_PATH + '.bak');
  const outObj = { cars, meta: { source: 'mobile.de-seller-api', syncedAt: new Date().toISOString(), count: cars.length } };
  writeFileSync(CARS_PATH, JSON.stringify(outObj, null, 2) + '\n');

  console.log(`✓ Scris ${cars.length} mașini în data/cars.json (backup: data/cars.json.bak)`);
  console.log(`ℹ️  Primul anunț brut: scripts/mobilede-sample.json — trimite-mi-l dacă vreo valoare arată greșit, ajustez maparea.`);
})().catch(e => die(e.stack || e.message));
