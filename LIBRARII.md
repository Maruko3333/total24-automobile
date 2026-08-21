# Librării instalate (toolkit web designer)

Site static, fără bundler. Toate librăriile sunt "vendorate" în `assets/js/vendor/`
și `assets/css/vendor/` ca build-uri de browser — merg offline și pe GitHub Pages.
`node_modules/` există doar pentru actualizări (`npm update`) și e ignorat de git.

## Active acum (deja conectate)

| Librărie   | Rol                                   | Unde                          |
|------------|---------------------------------------|-------------------------------|
| **Lenis**  | Smooth scroll premium + anchor-uri    | Tot site-ul (via `app.js`)    |
| **GLightbox** | Vizualizare foto full-screen (zoom, swipe) | Pagina mașinii (`masina.html`) |

- Se încarcă automat din `app.js` → `loadEnhancements()`, în funcție de pagină.
- Lenis respectă `prefers-reduced-motion` (nu pornește dacă userul cere mai puțină mișcare).
- Lightbox-ul se activează singur când o mașină are poze în `cars.json` (`images: [...]`).

## Vendorate, gata de folosit (neconectate încă)

| Librărie   | Rol                                   | Cum activez                   |
|------------|---------------------------------------|-------------------------------|
| **Swiper** | Carusel/galerie foto touch (mobil)    | vezi mai jos                  |
| **Motion** | Animații fine (fade, stagger, count-up) | `window.Motion.animate(...)` |

### Swiper — exemplu carusel galerie mașină
```html
<link rel="stylesheet" href="assets/css/vendor/swiper-bundle.min.css">
<script src="assets/js/vendor/swiper-bundle.min.js"></script>
```
```js
new Swiper('.gallery-swiper', { loop: true, navigation: true, pagination: { clickable: true } });
```

### Motion — exemplu apariție carduri
```html
<script src="assets/js/vendor/motion.js"></script>
```
```js
const { inView, animate } = Motion;
inView('.car-card', el => animate(el, { opacity: [0,1], y: [24,0] }, { duration: .5 }));
```

## Actualizare
```
npm update
```
Apoi copiază build-ul nou din `node_modules/<lib>/dist/` peste fișierul din `assets/*/vendor/`.
