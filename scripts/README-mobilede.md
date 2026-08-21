# Sincronizare stoc din Mobile.de → `data/cars.json`

Trage anunțurile tale din **Mobile.de Seller API** și le scrie în `data/cars.json`,
de unde site-ul le afișează automat (cu poze reale).

Rulează **local** (pe calculatorul tău), nu în browser. Face **doar cereri GET** — nu
modifică și nu șterge nimic pe Mobile.de.

## 1. Completează credențialele

Editează `scripts/mobilede.credentials.json` (fișier privat, gitignorat):

```json
{
  "environment": "production",
  "username": "USER_MOBILE_DE",
  "password": "PAROLA_MOBILE_DE",
  "sellerId": "MOBILE_SELLER_ID"
}
```

- `username` / `password` — datele tale de Basic Auth pentru API (de la Mobile.de).
- `sellerId` — `mobileSellerId` (numărul tău de vânzător). Dacă îl lași gol, scriptul
  încearcă să-l descopere automat.
- Pentru testare fără riscuri, pune `"environment": "sandbox"`.

⚠️ Fișierul cu credențiale **nu** se urcă pe GitHub (e în `.gitignore`).

## 2. Rulează sincronizarea

```bash
node scripts/sync-mobilede.mjs
```

Rezultat:
- `data/cars.json` — populat cu mașinile tale reale (backup vechi în `data/cars.json.bak`).
- `scripts/mobilede-sample.json` — primul anunț brut din API (pentru verificare).

## 3. Publică

Comite și urcă `data/cars.json` (NU credențialele). Site-ul afișează stocul nou.

## Automatizare (opțional)
Poți rula scriptul periodic (Task Scheduler / cron / GitHub Action cu secrets) ca stocul
să se actualizeze singur.

## Dacă apar erori
- `401` → username/parolă greșite.
- `403` → contul nu are acces la Seller-API → cere activarea la suportul Mobile.de.
- `404` → `sellerId` greșit.
- Valori mapate greșit (combustibil, cutie, preț) → trimite `scripts/mobilede-sample.json`
  și ajustăm maparea din `sync-mobilede.mjs`.
