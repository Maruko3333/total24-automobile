#!/usr/bin/env python3
"""Generează sitemap.xml și robots.txt din data/config.json + data/cars.json.
Rulează din rădăcina proiectului:  python scripts/gen_sitemap.py
(Va fi rulat automat de sync-ul Mobile.de în Val 3, ca sitemap-ul să fie mereu actual.)"""
import json, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cfg = json.load(open(os.path.join(ROOT, 'data', 'config.json'), encoding='utf-8'))
cars = json.load(open(os.path.join(ROOT, 'data', 'cars.json'), encoding='utf-8')).get('cars', [])

base = cfg['meta'].get('siteUrl', '').rstrip('/')
today = datetime.date.today().isoformat()

pages = ['index.html', 'stoc.html', 'despre.html', 'servicii.html', 'finantare.html', 'contact.html']
legal = ['impressum.html', 'datenschutz.html', 'agb.html']
urls = [(f'{base}/{p}', '0.8' if p != 'index.html' else '1.0') for p in pages]
urls += [(f'{base}/masina.html?id={c["id"]}', '0.7') for c in cars if c.get('status') == 'available']
urls += [(f'{base}/{p}', '0.3') for p in legal]

def esc(u): return u.replace('&', '&amp;')

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u, pr in urls:
    lines += ['  <url>', f'    <loc>{esc(u)}</loc>', f'    <lastmod>{today}</lastmod>',
              f'    <priority>{pr}</priority>', '  </url>']
lines.append('</urlset>')
open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')

robots = f"""User-agent: *
Allow: /
Disallow: /admin.html

Sitemap: {base}/sitemap.xml
"""
open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8').write(robots)
print(f'sitemap.xml: {len(urls)} URL-uri | robots.txt scris | base={base}')
