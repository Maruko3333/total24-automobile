/* ============================================
   Total24 Automobile — Finance calculator
   ============================================ */

const Finance = {
  APR: 8.9, // dobândă anuală orientativă (%) — editabilă

  init() {
    const price = document.getElementById('cPrice');
    const down = document.getElementById('cDown');
    const term = document.getElementById('cTerm');
    if (!price || !down || !term) return;

    // Prefill from ?price=
    const p = new URLSearchParams(location.search).get('price');
    if (p) price.value = p;

    [price, down, term].forEach(e => e.addEventListener('input', () => this.calc()));
    this.calc();
  },

  calc() {
    const price = Number(document.getElementById('cPrice').value) || 0;
    const downPct = Number(document.getElementById('cDown').value) || 0;
    const term = Number(document.getElementById('cTerm').value) || 12;

    const down = Math.round(price * downPct / 100);
    const principal = Math.max(price - down, 0);
    const r = this.APR / 100 / 12;
    let monthly;
    if (r === 0) monthly = principal / term;
    else monthly = principal * r / (1 - Math.pow(1 + r, -term));

    // Update displayed values
    document.getElementById('cPriceVal').textContent = T24.price(price);
    document.getElementById('cDownVal').textContent = downPct + '%  (' + T24.price(down) + ')';
    document.getElementById('cTermVal').textContent = term + ' luni';
    document.getElementById('cResult').innerHTML =
      T24.price(Math.round(monthly)) + ' <small>/ lună</small>';
  }
};
