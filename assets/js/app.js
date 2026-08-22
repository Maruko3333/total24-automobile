/* ============================================
   Total24 Automobile — Core app
   Shared config, header/footer, icons, helpers
   ============================================ */

const T24 = {
  config: null,
  cars: null,
  lang: 'de',

  // ============================================
  //  i18n — DE / EN / RO
  // ============================================
  i18n: {
    de: {
      'nav.home': 'Startseite', 'nav.cars': 'Fahrzeuge', 'nav.ratgeber': 'Ratgeber',
      'nav.about': 'Über uns', 'nav.financing': 'Finanzierung', 'nav.contact': 'Kontakt',
      'nav.rat.kaufberatung': 'Kaufberatung', 'nav.rat.vergleich': 'Fahrzeugvergleich',
      'nav.rat.wissen': 'Auto-Wissen', 'nav.rat.deutschland': 'Auto aus Deutschland', 'nav.rat.finanzierung': 'Finanzierung',
      'btn.quickcontact': 'Schnellkontakt',
      'footer.tagline': 'Geprüfte Fahrzeuge. Faire Preise.',
      'footer.h.vehicles': 'Fahrzeuge', 'footer.h.company': 'Unternehmen', 'footer.h.contact': 'Kontakt',
      'footer.link.brands': 'Marken', 'footer.link.services': 'Leistungen',
      'footer.mobilede.title': 'Verifiziert auf Mobile.de', 'footer.mobilede.sub': 'Zum Händlerprofil',
      'footer.rights': 'Alle Rechte vorbehalten.',
      'cta.call': 'Anrufen', 'cta.wa': 'WhatsApp', 'wa.aria': 'Schreiben Sie uns auf WhatsApp',
      'card.details': 'Details ansehen', 'card.wa.aria': 'Auf WhatsApp anfragen',
      'badge.new': 'Neu', 'badge.reserved': 'Reserviert', 'badge.sold': 'Verkauft',
      'card.link': 'Fahrzeug ansehen',
      'hero.eyebrow': 'Autohaus in Fürth · Deutschland',
      'hero.title': 'Geprüfte Fahrzeuge. Faire Preise. <span class="accent">Aus Deutschland.</span>',
      'hero.sub': 'Sorgfältig ausgewählte Fahrzeuge mit transparenter Historie und persönlichem Service.',
      'hero.btn.cars': 'Fahrzeuge ansehen', 'hero.btn.contact': 'Kontakt aufnehmen',
      'feat.eyebrow': 'Fahrzeuge', 'feat.title': 'Fahrzeuge im Angebot', 'feat.sub': 'Eine Auswahl unserer aktuellen Fahrzeuge.',
      'feat.btnall': 'Alle Fahrzeuge ansehen',
      'why.eyebrow': 'Bestand & Transparenz', 'why.title': 'Warum Kunden bei Total24 kaufen',
      'why.intro': 'Wir wählen ausschließlich Fahrzeuge aus erster Hand mit klarer Historie und vollständiger Dokumentation. Keine Überraschungen — nur geprüfte Fahrzeuge zu fairen Preisen.',
      'why.btn': 'Mehr erfahren',
      'reviews.eyebrow': 'Kundenstimmen', 'reviews.title': 'Das sagen unsere Kunden',
      'reviews.count': 'Bewertungen', 'reviews.source': 'Quelle:',
      'reviews.empty.title': 'Echte Bewertungen auf Mobile.de',
      'reviews.empty.text': 'Lesen Sie geprüfte Kundenbewertungen direkt auf Deutschlands größter Fahrzeugbörse.',
      'reviews.empty.btn': 'Bewertungen ansehen',
      'steps.eyebrow': "So funktioniert's", 'steps.title': 'In 4 einfachen Schritten',
      'steps.sub': 'Von der Auswahl bis zur Übergabe — einfach und transparent.',
      'rt.eyebrow': 'Ratgeber', 'rt.title': 'Kaufberatung & Auto-Wissen',
      'rt.sub': 'Alles rund um Kauf, Finanzierung und Fahrzeuge aus Deutschland — verständlich erklärt.',
      'rt.btn': 'Alle Ratgeber ansehen',
      'faq.eyebrow': 'Häufige Fragen', 'faq.title': 'Fragen & Antworten',
      'faq.sub': 'Das Wichtigste rund um Kauf, Besichtigung, Finanzierung und Lieferung.',
      'cta.title': 'Nicht das passende Fahrzeug gefunden?', 'cta.sub': 'Wir finden es für Sie.', 'cta.btn': 'Fahrzeug anfragen',
      'home.trust': [
        ['Geprüfte Fahrzeuge', 'Technisch geprüft und<br>in einwandfreiem Zustand'],
        ['Transparente Historie', 'Vollständige Historie und<br>alle Dokumente einsehbar'],
        ['Faire Preise', 'Marktgerechte Preise<br>ohne versteckte Kosten'],
        ['Persönliche Beratung', 'Individuelle Beratung<br>und persönlicher Service']
      ],
      'home.why': [
        ['Aus erster Hand', 'Alle unsere Fahrzeuge mit nur einem Vorbesitzer'],
        ['Persönlich geprüft', 'Jedes Fahrzeug wird vor dem Verkauf sorgfältig kontrolliert'],
        ['Transparente Fahrzeughistorie', 'VIN, Dokumente und Wartungshistorie nachvollziehbar'],
        ['Kein anonymer Online-Händler', 'Persönliche Beratung direkt in Fürth'],
        ['Lieferung möglich', 'Deutschlandweit nach Absprache'],
        ['Finanzierung', 'Flexible Finanzierungsmöglichkeiten']
      ],
      'home.steps': [
        ['Fahrzeug auswählen', 'Aus unserem Bestand oder nach Ihren Wünschen — wir finden das passende Fahrzeug.'],
        ['Beratung erhalten', 'Persönliche Beratung zu Historie, Preis, Papieren und Finanzierung.'],
        ['Kauf abschließen', 'Wir bereiten gemeinsam alle Unterlagen vor — transparent und ohne Umstände.'],
        ['Fahrzeug übernehmen', 'Abholung im Showroom in Fürth oder Lieferung nach Absprache.']
      ],
      'home.faq': [
        ['Kann ich das Fahrzeug vor Ort besichtigen?', 'Ja, sehr gerne. Vereinbaren Sie einfach einen Termin — wir zeigen Ihnen das Fahrzeug persönlich in unserem Showroom in Fürth.'],
        ['Sind die Fahrzeuge geprüft?', 'Ja. Jedes Fahrzeug wird vor dem Verkauf technisch und optisch kontrolliert. Fahrzeughistorie und Dokumente sind für Sie einsehbar.'],
        ['Sind die Fahrzeuge aus erster Hand?', 'Ja. Unsere Fahrzeuge stammen aus erster Hand — mit nur einem Vorbesitzer und nachvollziehbarer Historie.'],
        ['Ist eine Finanzierung möglich?', 'Ja, wir bieten flexible Finanzierungsmöglichkeiten. Details finden Sie auf unserer <a href="finantare.html">Finanzierungsseite</a> oder sprechen Sie uns direkt an.'],
        ['Kann das Fahrzeug geliefert werden?', 'Eine Lieferung ist deutschlandweit nach Absprache möglich. Kontaktieren Sie uns für die Details zu Ihrem Standort.'],
        ['Welche Unterlagen erhalte ich beim Kauf?', 'Sie erhalten alle relevanten Fahrzeugdokumente — u. a. Fahrzeugbrief und -schein, Serviceheft (sofern vorhanden), Kaufvertrag und Rechnung.'],
        ['Nehmen Sie mein altes Fahrzeug in Zahlung?', 'In vielen Fällen ja. Sprechen Sie uns an — wir prüfen gerne eine faire Inzahlungnahme Ihres aktuellen Fahrzeugs.'],
        ['Finde ich Ihre Fahrzeuge auch auf Mobile.de?', 'Ja. Unser gesamter Bestand sowie echte Kundenbewertungen sind auf Mobile.de verfügbar — der größten Fahrzeugbörse Deutschlands.']
      ]
    },
    en: {
      'nav.home': 'Home', 'nav.cars': 'Vehicles', 'nav.ratgeber': 'Guide',
      'nav.about': 'About us', 'nav.financing': 'Financing', 'nav.contact': 'Contact',
      'nav.rat.kaufberatung': 'Buying advice', 'nav.rat.vergleich': 'Comparisons',
      'nav.rat.wissen': 'Car knowledge', 'nav.rat.deutschland': 'Cars from Germany', 'nav.rat.finanzierung': 'Financing',
      'btn.quickcontact': 'Quick contact',
      'footer.tagline': 'Checked vehicles. Fair prices.',
      'footer.h.vehicles': 'Vehicles', 'footer.h.company': 'Company', 'footer.h.contact': 'Contact',
      'footer.link.brands': 'Brands', 'footer.link.services': 'Services',
      'footer.mobilede.title': 'Verified on Mobile.de', 'footer.mobilede.sub': 'To dealer profile',
      'footer.rights': 'All rights reserved.',
      'cta.call': 'Call', 'cta.wa': 'WhatsApp', 'wa.aria': 'Message us on WhatsApp',
      'card.details': 'View details', 'card.wa.aria': 'Ask on WhatsApp',
      'badge.new': 'New', 'badge.reserved': 'Reserved', 'badge.sold': 'Sold',
      'card.link': 'View vehicle',
      'hero.eyebrow': 'Car dealership in Fürth · Germany',
      'hero.title': 'Checked vehicles. Fair prices. <span class="accent">From Germany.</span>',
      'hero.sub': 'Carefully selected vehicles with transparent history and personal service.',
      'hero.btn.cars': 'View vehicles', 'hero.btn.contact': 'Get in touch',
      'feat.eyebrow': 'Vehicles', 'feat.title': 'Vehicles on offer', 'feat.sub': 'A selection of our current vehicles.',
      'feat.btnall': 'View all vehicles',
      'why.eyebrow': 'Inventory & transparency', 'why.title': 'Why customers buy at Total24',
      'why.intro': 'We select exclusively first-hand vehicles with a clear history and complete documentation. No surprises — only checked vehicles at fair prices.',
      'why.btn': 'Learn more',
      'reviews.eyebrow': 'Testimonials', 'reviews.title': 'What our customers say',
      'reviews.count': 'reviews', 'reviews.source': 'Source:',
      'reviews.empty.title': 'Real reviews on Mobile.de',
      'reviews.empty.text': "Read verified customer reviews directly on Germany's largest vehicle marketplace.",
      'reviews.empty.btn': 'View reviews',
      'steps.eyebrow': 'How it works', 'steps.title': 'In 4 simple steps',
      'steps.sub': 'From selection to handover — simple and transparent.',
      'rt.eyebrow': 'Guide', 'rt.title': 'Buying advice & car knowledge',
      'rt.sub': 'Everything about buying, financing and cars from Germany — clearly explained.',
      'rt.btn': 'View all guides',
      'faq.eyebrow': 'FAQ', 'faq.title': 'Questions & answers',
      'faq.sub': 'The essentials about buying, viewing, financing and delivery.',
      'cta.title': "Didn't find the right vehicle?", 'cta.sub': "We'll find it for you.", 'cta.btn': 'Request a vehicle',
      'home.trust': [
        ['Checked vehicles', 'Technically checked and<br>in perfect condition'],
        ['Transparent history', 'Full history and<br>all documents available'],
        ['Fair prices', 'Market-fair prices<br>without hidden costs'],
        ['Personal advice', 'Individual advice<br>and personal service']
      ],
      'home.why': [
        ['First-hand', 'All our vehicles with only one previous owner'],
        ['Personally checked', 'Every vehicle is carefully inspected before sale'],
        ['Transparent vehicle history', 'VIN, documents and service history verifiable'],
        ['No anonymous online dealer', 'Personal advice directly in Fürth'],
        ['Delivery available', 'Nationwide by arrangement'],
        ['Financing', 'Flexible financing options']
      ],
      'home.steps': [
        ['Choose a vehicle', 'From our stock or to your wishes — we find the right vehicle.'],
        ['Get advice', 'Personal advice on history, price, paperwork and financing.'],
        ['Complete the purchase', 'We prepare all documents together — transparent and hassle-free.'],
        ['Take delivery', 'Pick-up at our showroom in Fürth or delivery by arrangement.']
      ],
      'home.faq': [
        ['Can I view the vehicle in person?', 'Yes, gladly. Just book an appointment — we will show you the vehicle personally at our showroom in Fürth.'],
        ['Are the vehicles checked?', 'Yes. Every vehicle is technically and visually inspected before sale. History and documents are available for you to review.'],
        ['Are the vehicles first-hand?', 'Yes. Our vehicles are first-hand — with only one previous owner and a verifiable history.'],
        ['Is financing possible?', 'Yes, we offer flexible financing options. See details on our <a href="finantare.html">financing page</a> or simply contact us.'],
        ['Can the vehicle be delivered?', 'Delivery is possible nationwide by arrangement. Contact us for details regarding your location.'],
        ['Which documents do I receive when buying?', 'You receive all relevant vehicle documents — including registration parts I and II, service booklet (if available), sales contract and invoice.'],
        ['Do you take my old car in part-exchange?', 'In many cases yes. Get in touch — we are happy to assess a fair part-exchange for your current vehicle.'],
        ['Can I also find your vehicles on Mobile.de?', "Yes. Our entire stock and genuine customer reviews are available on Mobile.de — Germany's largest vehicle marketplace."]
      ]
    },
    ro: {
      'nav.home': 'Acasă', 'nav.cars': 'Mașini', 'nav.ratgeber': 'Ghid',
      'nav.about': 'Despre noi', 'nav.financing': 'Finanțare', 'nav.contact': 'Contact',
      'nav.rat.kaufberatung': 'Ghid de cumpărare', 'nav.rat.vergleich': 'Comparații',
      'nav.rat.wissen': 'Cunoștințe auto', 'nav.rat.deutschland': 'Mașini din Germania', 'nav.rat.finanzierung': 'Finanțare',
      'btn.quickcontact': 'Contact rapid',
      'footer.tagline': 'Mașini verificate. Prețuri corecte.',
      'footer.h.vehicles': 'Mașini', 'footer.h.company': 'Companie', 'footer.h.contact': 'Contact',
      'footer.link.brands': 'Mărci', 'footer.link.services': 'Servicii',
      'footer.mobilede.title': 'Verificat pe Mobile.de', 'footer.mobilede.sub': 'Vezi profilul dealerului',
      'footer.rights': 'Toate drepturile rezervate.',
      'cta.call': 'Sună', 'cta.wa': 'WhatsApp', 'wa.aria': 'Scrie-ne pe WhatsApp',
      'card.details': 'Vezi detalii', 'card.wa.aria': 'Întreabă pe WhatsApp',
      'badge.new': 'Nou', 'badge.reserved': 'Rezervat', 'badge.sold': 'Vândut',
      'card.link': 'Vezi mașina',
      'hero.eyebrow': 'Dealer auto în Fürth · Germania',
      'hero.title': 'Mașini verificate. Prețuri corecte. <span class="accent">Din Germania.</span>',
      'hero.sub': 'Mașini alese cu grijă, cu istoric transparent și service personal.',
      'hero.btn.cars': 'Vezi mașinile', 'hero.btn.contact': 'Contactează-ne',
      'feat.eyebrow': 'Mașini', 'feat.title': 'Mașini disponibile', 'feat.sub': 'O selecție a mașinilor noastre actuale.',
      'feat.btnall': 'Vezi toate mașinile',
      'why.eyebrow': 'Stoc & transparență', 'why.title': 'De ce cumpără clienții de la Total24',
      'why.intro': 'Alegem exclusiv mașini din prima mână, cu istoric clar și documentație completă. Fără surprize — doar mașini verificate, la prețuri corecte.',
      'why.btn': 'Află mai mult',
      'reviews.eyebrow': 'Recenzii', 'reviews.title': 'Ce spun clienții noștri',
      'reviews.count': 'recenzii', 'reviews.source': 'Sursă:',
      'reviews.empty.title': 'Recenzii reale pe Mobile.de',
      'reviews.empty.text': 'Citește recenzii verificate ale clienților direct pe cea mai mare platformă auto din Germania.',
      'reviews.empty.btn': 'Vezi recenziile',
      'steps.eyebrow': 'Cum funcționează', 'steps.title': 'În 4 pași simpli',
      'steps.sub': 'De la alegere până la predare — simplu și transparent.',
      'rt.eyebrow': 'Ghid', 'rt.title': 'Ghid de cumpărare & cunoștințe auto',
      'rt.sub': 'Tot ce ține de cumpărare, finanțare și mașini din Germania — explicat pe înțelesul tuturor.',
      'rt.btn': 'Vezi toate ghidurile',
      'faq.eyebrow': 'Întrebări frecvente', 'faq.title': 'Întrebări & răspunsuri',
      'faq.sub': 'Esențialul despre cumpărare, vizionare, finanțare și livrare.',
      'cta.title': 'Nu ai găsit mașina potrivită?', 'cta.sub': 'O găsim noi pentru tine.', 'cta.btn': 'Cere o mașină',
      'home.trust': [
        ['Mașini verificate', 'Verificate tehnic și<br>în stare impecabilă'],
        ['Istoric transparent', 'Istoric complet și<br>toate documentele disponibile'],
        ['Prețuri corecte', 'Prețuri corecte de piață<br>fără costuri ascunse'],
        ['Consiliere personală', 'Consiliere individuală<br>și service personal']
      ],
      'home.why': [
        ['Din prima mână', 'Toate mașinile noastre cu un singur proprietar anterior'],
        ['Verificate personal', 'Fiecare mașină este controlată atent înainte de vânzare'],
        ['Istoric transparent', 'VIN, documente și istoric de service verificabile'],
        ['Nu un dealer online anonim', 'Consiliere personală direct în Fürth'],
        ['Livrare posibilă', 'În toată Germania, pe bază de înțelegere'],
        ['Finanțare', 'Opțiuni flexibile de finanțare']
      ],
      'home.steps': [
        ['Alege mașina', 'Din stocul nostru sau după dorințele tale — găsim mașina potrivită.'],
        ['Primește consiliere', 'Consiliere personală despre istoric, preț, acte și finanțare.'],
        ['Finalizează achiziția', 'Pregătim împreună toate actele — transparent și fără bătăi de cap.'],
        ['Preia mașina', 'Ridicare din showroom-ul din Fürth sau livrare pe bază de înțelegere.']
      ],
      'home.faq': [
        ['Pot vedea mașina la fața locului?', 'Da, cu plăcere. Stabilește o programare — îți arătăm mașina personal în showroom-ul nostru din Fürth.'],
        ['Sunt mașinile verificate?', 'Da. Fiecare mașină este verificată tehnic și vizual înainte de vânzare. Istoricul și documentele sunt disponibile pentru tine.'],
        ['Sunt mașinile din prima mână?', 'Da. Mașinile noastre sunt din prima mână — cu un singur proprietar anterior și istoric verificabil.'],
        ['Este posibilă finanțarea?', 'Da, oferim opțiuni flexibile de finanțare. Vezi detalii pe <a href="finantare.html">pagina de finanțare</a> sau contactează-ne direct.'],
        ['Poate fi livrată mașina?', 'Livrarea este posibilă în toată Germania, pe bază de înțelegere. Contactează-ne pentru detalii legate de locația ta.'],
        ['Ce documente primesc la cumpărare?', 'Primești toate documentele relevante ale mașinii — inclusiv talonul (partea I și II), carnetul de service (dacă există), contractul de vânzare și factura.'],
        ['Preluați mașina mea veche la schimb?', 'În multe cazuri, da. Contactează-ne — evaluăm cu plăcere o preluare corectă a mașinii tale actuale.'],
        ['Găsesc mașinile voastre și pe Mobile.de?', 'Da. Întregul nostru stoc și recenzii reale ale clienților sunt disponibile pe Mobile.de — cea mai mare platformă auto din Germania.']
      ]
    }
  },

  t(key) {
    const L = this.i18n[this.lang] || {}, D = this.i18n.de || {};
    return (key in L) ? L[key] : (key in D ? D[key] : key);
  },
  initLang() {
    const q = new URLSearchParams(location.search).get('lang');
    let l = q || null;
    try { l = l || localStorage.getItem('t24_lang'); } catch (e) { /* private */ }
    if (!['de', 'en', 'ro'].includes(l)) l = 'de';
    this.lang = l;
    try { localStorage.setItem('t24_lang', l); } catch (e) { /* private */ }
    document.documentElement.lang = l;
  },
  setLang(l) {
    if (!['de', 'en', 'ro'].includes(l) || l === this.lang) return;
    try { localStorage.setItem('t24_lang', l); } catch (e) { /* private */ }
    location.reload();
  },
  langName(l) { return { de: 'Deutsch', en: 'English', ro: 'Română' }[l] || l; },
  // Traduce elementele statice din DOM (data-i18n / data-i18n-html)
  applyI18n(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const v = this.t(el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.textContent = v;
    });
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = this.t(el.getAttribute('data-i18n-html'));
      if (typeof v === 'string') el.innerHTML = v;
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const v = this.t(key);
        if (typeof v === 'string') el.setAttribute(attr, v);
      });
    });
  },

  // ---- SVG icon set (24x24, stroke) ----
  icons: {
    car: '<path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4h2m12-4v4h-2m-8 0h8M7 17v1M17 17v1"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
    gauge: '<path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M12 12l3-3"/><path d="M4 18a8 8 0 1116 0"/>',
    certificate: '<circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/>',
    truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/>',
    heart: '<path d="M12 20s-7-4.3-9.3-8.5C1.3 8.8 2.6 6 5.5 6c1.8 0 3 1 3.5 2 .5-1 1.7-2 3.5-2 2.9 0 4.2 2.8 2.8 5.5C19 15.7 12 20 12 20z"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
    fuel: '<path d="M5 21V5a2 2 0 012-2h5a2 2 0 012 2v16M4 21h11"/><path d="M14 8h2.5A1.5 1.5 0 0118 9.5V16a1.5 1.5 0 003 0V9"/><path d="M14 12h3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    power: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    phone: '<path d="M4 5c0 8 7 15 15 15l1-4-4-2-2 2c-2-1-5-4-6-6l2-2-2-4-4 1z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21c4-4 7-7.5 7-11a7 7 0 10-14 0c0 3.5 3 7 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    whatsapp: '<path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z"/><path d="M8.5 8.5c0 4 3 7 6.5 7 .8 0 1.3-.6 1-1.2l-1-1.5-1.7.6c-1.2-.6-2.2-1.6-2.6-2.7l.6-1.4-1.3-1.4c-.6-.3-1.5.3-1.5 1z"/>',
    facebook: '<path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8.5c0-.3.2-.5.5-.5z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="16.5" cy="7.5" r="1"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-5"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/>',
    users: '<circle cx="9" cy="9" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 6a3 3 0 010 6M17 15c2 0 4 2 4 5"/>',
    star: '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>',
    download: '<path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/>',
    wrench: '<path d="M15 6a4 4 0 00-5 5L4 17l3 3 6-6a4 4 0 005-5l-2.5 2.5L18 9l-1.5-2.5z"/>',
    handshake: '<path d="M8 12l3-3 2 2 3-3 4 4-4 4-2-2-3 3-4-4z"/><path d="M2 10l4-2M22 10l-4-2"/>',
    tag: '<path d="M3 12l9-9 9 9-9 9-9-9z"/><circle cx="9" cy="9" r="1.5"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10.5 8.5l5 3.5-5 3.5z"/>',
    headset: '<path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="3" y="13" width="4" height="7" rx="1.6"/><rect x="17" y="13" width="4" height="7" rx="1.6"/><path d="M20 20a3 3 0 01-3 3h-3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2"/>'
  },

  icon(name, size = 20, stroke = 1.7) {
    const p = this.icons[name] || '';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  },

  // Logo textual — „TOTAL 24 / AUTOMOBILE" (ca în design)
  brandLogo(extra = '') {
    return `<a href="index.html" class="logo brand-logo ${extra}" aria-label="Total24 Automobile">
      <span class="brand-top"><span class="bt-total">TOTAL</span><span class="bt-24">24</span></span>
      <span class="brand-sub"><i class="bt-line"></i>AUTOMOBILE</span>
    </a>`;
  },

  // Chevron mic (▾) pentru dropdown-uri în nav / topbar
  caret(size = 13) {
    return `<svg class="caret" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
  },

  // ---- Formatting ----
  price(n) { return Number(n).toLocaleString('de-DE') + ' €'; },
  km(n) { return Number(n).toLocaleString('de-DE') + ' km'; },

  // WhatsApp deep-link pentru o mașină — mesaj contextual (marcă, model, an, km, preț)
  waCar(car, extra = '') {
    const wa = (this.config.company.whatsapp || '').replace(/\D/g, '');
    const km = car.mileage ? `, ${this.km(car.mileage)}` : '';
    const msg = encodeURIComponent(
      `Hallo! Ich interessiere mich für den ${car.make} ${car.model} (${car.year}${km}) – ${this.price(car.price)}. ${extra}Ist das Fahrzeug noch verfügbar?`);
    return `https://wa.me/${wa}?text=${msg}`;
  },

  // URL public (partajabil) al unei mașini
  carUrl(car) { return `${this.siteUrl()}/masina.html?id=${car.id}`; },

  // Share „trimite unui prieten": Web Share API pe mobil (WhatsApp/Messenger/…),
  // fallback = WhatsApp fără destinatar (userul alege contactul). Textul conține
  // marca/model/an/preț + link → prietenul vede datele chiar dacă preview-ul e generic.
  async shareCar(car) {
    const url = this.carUrl(car);
    const title = `${car.make} ${car.model} ${car.year} — Total24 Automobile`;
    const text = `${car.make} ${car.model} (${car.year}) – ${this.price(car.price)} bei Total24 Automobile`;
    if (navigator.share) {
      try { await navigator.share({ title, text, url }); return 'shared'; }
      catch (e) { if (e && e.name === 'AbortError') return 'cancelled'; }
    }
    // fallback WhatsApp (deschide alegerea contactului)
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank', 'noopener');
    return 'whatsapp';
  },

  // Rată lunară estimată (avans %, luni, dobândă anuală %)
  monthly(price, downPct = 20, term = 60, apr = 8.9) {
    const principal = price * (1 - downPct / 100);
    const r = apr / 100 / 12;
    const m = r === 0 ? principal / term : principal * r / (1 - Math.pow(1 + r, -term));
    return Math.round(m);
  },

  // ---- Data loading ----
  async loadConfig() {
    if (this.config) return this.config;
    const r = await fetch('data/config.json', { cache: 'no-store' });
    this.config = await r.json();
    return this.config;
  },
  async loadCars() {
    if (this.cars) return this.cars;
    // fără cache — stocul se poate schimba oricând
    const r = await fetch('data/cars.json', { cache: 'no-store' });
    const d = await r.json();
    this.cars = d.cars || [];
    return this.cars;
  },

  // ---- SEO helpers ----
  setMeta(name, content, attr = 'name') {
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  },
  setCanonical(url) {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
    el.href = url;
  },
  addJsonLd(obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  },
  siteUrl() { return (this.config.meta.siteUrl || '').replace(/\/$/, ''); },

  // ---- Header / Footer injection ----
  nav: [
    { i18n: 'nav.home', href: 'index.html', key: 'home' },
    { i18n: 'nav.cars', href: 'stoc.html', key: 'stoc' },
    {
      i18n: 'nav.ratgeber', href: 'ratgeber.html', key: 'ratgeber', children: [
        { i18n: 'nav.rat.kaufberatung', href: 'ratgeber.html?cat=kaufberatung', icon: 'search' },
        { i18n: 'nav.rat.vergleich', href: 'ratgeber.html?cat=vergleich', icon: 'gauge' },
        { i18n: 'nav.rat.wissen', href: 'ratgeber.html?cat=wissen', icon: 'wrench' },
        { i18n: 'nav.rat.deutschland', href: 'deutschland.html', icon: 'shield' },
        { i18n: 'nav.rat.finanzierung', href: 'ratgeber.html?cat=finanzierung', icon: 'percent' }
      ]
    },
    { i18n: 'nav.about', href: 'despre.html', key: 'despre' },
    { i18n: 'nav.financing', href: 'finantare.html', key: 'finantare' },
    { i18n: 'nav.contact', href: 'contact.html', key: 'contact' }
  ],

  langSwitcher() {
    const flags = {
      de: '<svg width="20" height="13" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#000"/><rect y="6.67" width="30" height="6.66" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/></svg>',
      en: '<svg width="20" height="13" viewBox="0 0 60 30" aria-hidden="true"><clipPath id="s"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#s)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
      ro: '<svg width="20" height="13" viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#002B7F"/><rect x="10" width="10" height="20" fill="#FCD116"/><rect x="20" width="10" height="20" fill="#CE1126"/></svg>'
    };
    const opts = ['de', 'en', 'ro'].map(l =>
      `<a href="#" data-setlang="${l}" class="${l === this.lang ? 'active' : ''}">${flags[l]} ${this.langName(l)}</a>`).join('');
    return `<div class="topbar-lang" id="langSwitch">
      <button type="button" class="lang-current" aria-label="Sprache / Language">${flags[this.lang]} ${this.lang.toUpperCase()} ${this.caret(13)}</button>
      <div class="lang-dd">${opts}</div>
    </div>`;
  },

  renderHeader(active) {
    const c = this.config.company;
    const links = this.nav.map(n => {
      const cls = n.key === active ? 'active' : '';
      const label = this.t(n.i18n);
      if (n.children) {
        const items = n.children.map(ch =>
          `<a href="${ch.href}"><span class="ic">${this.icon(ch.icon, 16)}</span>${this.t(ch.i18n)}</a>`).join('');
        return `<div class="nav-item"><a href="${n.href}" class="${cls}">${label}${this.caret(13)}</a><div class="nav-dd">${items}</div></div>`;
      }
      return `<a href="${n.href}" class="${cls}">${label}</a>`;
    }).join('');
    const a = c.address;
    return `
    <div class="topbar">
      <div class="container topbar-in">
        <div class="topbar-left">
          <span>${this.icon('pin', 15)} ${a.city}, ${a.country}</span>
          <a href="tel:${c.phone}">${this.icon('phone', 15)} ${c.phone}</a>
          <a href="mailto:${c.email}">${this.icon('mail', 15)} ${c.email}</a>
        </div>
        <div class="topbar-right">
          <span>${this.icon('clock', 15)} Mo – Fr: ${c.hours.weekdays}</span>
          ${this.langSwitcher()}
        </div>
      </div>
    </div>
    <header class="header">
      <div class="container nav">
        <a href="index.html" class="logo" aria-label="Total24 Automobile">
          <img src="assets/img/brand/logo.png" alt="Total24 Automobile" class="logo-img">
        </a>
        <nav class="nav-links" id="navLinks">${links}<div class="nav-lang-m">${['de', 'en', 'ro'].map(l => `<a href="#" data-setlang="${l}" class="${l === this.lang ? 'active' : ''}">${l.toUpperCase()}</a>`).join('')}</div></nav>
        <div class="nav-cta">
          <a href="contact.html" class="btn btn-primary">${this.icon('phone', 16)} ${this.t('btn.quickcontact')}</a>
          <button class="nav-toggle" id="navToggle" aria-label="Menu">${this.icon('menu', 26, 2)}</button>
        </div>
      </div>
    </header>`;
  },

  renderFooter() {
    const c = this.config.company;
    const y = new Date().getFullYear();
    const wa = (c.whatsapp || '').replace(/\D/g, '');
    const mobile = c.mobileDeUrl || '';
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo" aria-label="Total24 Automobile">
              <img src="assets/img/brand/logo.png" alt="Total24 Automobile" class="logo-img footer-logo-img">
            </a>
            <p>${this.t('footer.tagline')}</p>
            ${mobile ? `<a href="${mobile}" target="_blank" rel="noopener" class="footer-mobilede">
              <span class="fm-ic">${this.icon('checkCircle', 18, 1.7)}</span>
              <span class="fm-txt"><b>${this.t('footer.mobilede.title')}</b><small>${this.t('footer.mobilede.sub')} ${this.icon('arrowRight', 12)}</small></span>
            </a>` : ''}
          </div>
          <div>
            <h5>${this.t('footer.h.vehicles')}</h5>
            <ul class="footer-links">
              <li><a href="stoc.html">${this.t('nav.cars')}</a></li>
              <li><a href="stoc.html">${this.t('footer.link.brands')}</a></li>
              <li><a href="contact.html">${this.t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h5>${this.t('footer.h.company')}</h5>
            <ul class="footer-links">
              <li><a href="despre.html">${this.t('nav.about')}</a></li>
              <li><a href="ratgeber.html">${this.t('nav.ratgeber')}</a></li>
              <li><a href="servicii.html">${this.t('footer.link.services')}</a></li>
              <li><a href="finantare.html">${this.t('nav.financing')}</a></li>
            </ul>
          </div>
          <div>
            <h5>${this.t('footer.h.contact')}</h5>
            <ul class="footer-links">
              <li>${c.address.zip} ${c.address.city}, ${c.address.country}</li>
              <li><a href="tel:${c.phone}">${c.phone}</a></li>
              <li><a href="mailto:${c.email}">${c.email}</a></li>
              <li><a href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${y} ${c.name}. ${this.t('footer.rights')}</span>
          <span class="footer-legal">
            <a href="impressum.html">Impressum</a>
            <a href="datenschutz.html">Datenschutz</a>
            <a href="agb.html">AGB</a>
          </span>
        </div>
      </div>
    </footer>`;
  },

  async mount(active) {
    this.initLang();
    await this.loadConfig();
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.innerHTML = this.renderHeader(active);
    if (f) f.innerHTML = this.renderFooter();
    // traduce conținutul static (data-i18n) al paginii
    this.applyI18n(document);
    // comutator de limbă (delegat)
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-setlang]');
      if (!b) return;
      e.preventDefault();
      this.setLang(b.dataset.setlang);
    });
    // mobile nav toggle
    const t = document.getElementById('navToggle');
    const l = document.getElementById('navLinks');
    if (t && l) t.addEventListener('click', () => l.classList.toggle('open'));
    // Header solid navy pe toate paginile; umbră subtilă la scroll
    const headerEl = h && h.querySelector('.header');
    if (headerEl) {
      const onScroll = () => headerEl.classList.toggle('is-stuck', window.scrollY > 10);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    this.mountWhatsApp();
    this.observeReveal();
    await this.loadEnhancements();
  },

  // ---- Vendor asset loaders (injectate dinamic, ca header/footer) ----
  loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  },
  loadJS(src) {
    return new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) return res();
      const s = document.createElement('script');
      s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('load fail: ' + src));
      document.head.appendChild(s);
    });
  },

  // Încarcă librăriile care îmbunătățesc experiența, în funcție de pagină
  async loadEnhancements() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const V = 'assets/js/vendor/', C = 'assets/css/vendor/';

    // Smooth scroll (Lenis) — pe tot site-ul, dar nu dacă userul cere reduced-motion
    if (!reduce) {
      this.loadCSS(C + 'lenis.css');
      try { await this.loadJS(V + 'lenis.min.js'); this.initLenis(); } catch (e) { /* silențios */ }
    }
    // Lightbox foto (GLightbox) — doar pe pagina de detalii mașină
    if (document.getElementById('detailWrap')) {
      this.loadCSS(C + 'glightbox.min.css');
      try { await this.loadJS(V + 'glightbox.min.js'); } catch (e) { /* silențios */ }
    }
    // Strat Motion premium — doar pe HOME (există hero-photo) și fără reduced-motion
    if (!reduce && document.querySelector('.hero-photo')) {
      try {
        await this.loadJS(V + 'motion.js');
        await this.loadJS('assets/js/motion.js');
        if (window.T24Motion) window.T24Motion.init();
      } catch (e) { /* silențios */ }
    }
  },

  // Smooth scroll premium + anchor-uri fine
  initLenis() {
    if (this._lenis || !window.Lenis) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1 });
    this._lenis = lenis;
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -100 }); }
    });
  },

  // ---- Trimitere formulare prin FormSubmit.co (fără backend/cont) ----
  // Livrează pe emailul firmei din config. Prima trimitere cere o activare
  // unică (email de confirmare de la FormSubmit către adresa firmei).
  async sendLead(payload) {
    const email = (this.config.company.email || '').trim();
    if (!email) throw new Error('no email configured');
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error('send failed: ' + r.status);
    return r.json();
  },

  // ---- Favorite (localStorage, fără cont) ----
  favs: {
    KEY: 't24_favs',
    list() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
    has(id) { return this.list().includes(id); },
    toggle(id) {
      const l = this.list(); const i = l.indexOf(id);
      if (i > -1) l.splice(i, 1); else l.push(id);
      try { localStorage.setItem(this.KEY, JSON.stringify(l)); } catch (e) { /* private mode */ }
      document.dispatchEvent(new CustomEvent('favchange'));
      return i === -1;
    },
    count() { return this.list().length; }
  },

  // Buton flotant WhatsApp (desktop) + bară sticky (mobil)
  mountWhatsApp() {
    if (document.querySelector('.wa-float')) return;
    const wa = (this.config.company.whatsapp || '').replace(/\D/g, '');
    if (!wa) return;
    const a = document.createElement('a');
    a.href = `https://wa.me/${wa}`;
    a.className = 'wa-float';
    a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', this.t('wa.aria'));
    a.innerHTML = this.icon('whatsapp', 28, 1.9);
    document.body.appendChild(a);
    // Bară CTA sticky jos, doar pe mobil (CSS controlează vizibilitatea): Anrufen + WhatsApp
    const phone = this.config.company.phone || '';
    const bar = document.createElement('div');
    bar.className = 'mobile-cta';
    bar.innerHTML =
      `<a href="tel:${phone}" class="mcta mcta-call" aria-label="${this.t('cta.call')}">${this.icon('phone', 20, 1.9)}<span>${this.t('cta.call')}</span></a>` +
      `<a href="https://wa.me/${wa}" target="_blank" rel="noopener" class="mcta mcta-wa" aria-label="WhatsApp">${this.icon('whatsapp', 20, 1.9)}<span>${this.t('cta.wa')}</span></a>`;
    document.body.appendChild(bar);
  },

  // Scroll reveal — inclusiv conținut încărcat dinamic (carduri)
  observeReveal() {
    if (this._revealInit || !('IntersectionObserver' in window)) return;
    this._revealInit = true;
    const sel = '.section-head,.car-card,.feat-card,.why-split,.service-card,.about-feature,.stat-big,.finance-benefit,.info-item,.calc-card,.cta-band,.tradein-band,.about-visual,.spec-table';
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    // carduri din grid → stagger la intrarea în viewport (max 8)
    const STAGGER = ['car-card', 'feat-card', 'service-card', 'step-card'];
    const arm = el => {
      if (el.dataset.rev) return;
      el.dataset.rev = '1';
      el.classList.add('reveal');
      const cls = STAGGER.find(c => el.classList.contains(c));
      if (cls && el.parentElement) {
        const sibs = [...el.parentElement.children].filter(x => x.classList.contains(cls));
        const idx = sibs.indexOf(el);
        if (idx > 0) el.style.transitionDelay = (Math.min(idx, 7) * 0.07) + 's';
      }
      // deja în viewport → afișează imediat (fără flash)
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in');
      else io.observe(el);
    };
    const scan = root => {
      if (root.nodeType !== 1) return;
      if (root.matches && root.matches(sel)) arm(root);
      root.querySelectorAll && root.querySelectorAll(sel).forEach(arm);
    };
    scan(document.body);
    new MutationObserver(muts =>
      muts.forEach(m => m.addedNodes.forEach(scan))
    ).observe(document.body, { childList: true, subtree: true });
  }
};
