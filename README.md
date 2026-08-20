# Total24 Automobile 🚗

Site de prezentare și stoc pentru **Total24 Automobile** — mașini premium importate din Germania (Fürth).
Site static (HTML / CSS / JavaScript), fără backend, găzduibil gratuit pe **GitHub Pages**.

## 🌐 Structura site-ului (6 pagini + detaliu + admin)

| Pagină | Fișier | Descriere |
|--------|--------|-----------|
| Acasă | `index.html` | Hero, mașini recomandate, de ce noi, CTA |
| Stoc Auto | `stoc.html` | Listare cu filtre (marcă, model, preț, an, km, caroserie) + sortare |
| Detaliu mașină | `masina.html?id=...` | Galerie, specificații, dotări, contact WhatsApp |
| Despre Noi | `despre.html` | Prezentare firmă + statistici |
| Servicii | `servicii.html` | Import, verificare, garanție, finanțare, buy-back |
| Finanțare | `finantare.html` | Calculator de rate |
| Contact | `contact.html` | Date contact, formular, hartă |
| **Admin** | `admin.html` | Panou intern de administrare a stocului |

## 📁 Structura fișierelor

```
total24-automobile/
├── index.html, stoc.html, masina.html, despre.html,
│   servicii.html, finantare.html, contact.html, admin.html
├── assets/
│   ├── css/style.css        # tot design-ul
│   ├── js/
│   │   ├── app.js           # config, header/footer, iconițe, helpers
│   │   ├── cars.js          # carduri, filtre, pagina de detaliu
│   │   ├── finance.js       # calculator rate
│   │   └── admin.js         # panou de administrare
│   └── img/
│       ├── brand/           # logo, favicon, imagini hero/showroom
│       └── cars/            # (opțional) poze mașini ca fișiere
└── data/
    ├── config.json          # date firmă (telefon, email, adresă, program)
    └── cars.json            # stocul de mașini
```

## ✏️ Cum adaugi / editezi mașini

1. Deschide `admin.html` în browser (prin serverul local, vezi mai jos).
2. Apasă **„+ Adaugă mașină"**, completează câmpurile și încarcă pozele (se redimensionează automat).
3. Apasă **„Exportă cars.json"** → se descarcă fișierul.
4. Înlocuiește `data/cars.json` cu cel descărcat.
5. **Commit + push pe GitHub** → site-ul se actualizează automat.

> Modificările din admin se salvează întâi în browser (localStorage). Publicarea pe site se face doar prin exportul lui `cars.json` și push pe GitHub.

## 🖥️ Rulare locală

Site-ul folosește `fetch` pentru fișierele JSON, deci trebuie rulat printr-un server (nu direct `file://`):

```bash
# Python (preinstalat de obicei)
python -m http.server 8000
# apoi deschide http://localhost:8000
```

## 🚀 Publicare pe GitHub Pages

1. Creează un repository nou pe GitHub (ex. `total24-automobile`).
2. Push la acest folder.
3. Settings → Pages → Source: `main` / root → Save.
4. Site-ul devine live la `https://<user>.github.io/total24-automobile/`.

## ⚙️ Date de configurat (`data/config.json`)

Actualizează: telefon, WhatsApp, email, adresă (Fürth), program, rețele sociale.

---
© Total24 Automobile
