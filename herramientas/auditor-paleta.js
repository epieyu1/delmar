// Auditor de paleta · Del Mar Artesanías
// Se ejecuta en la consola del navegador sobre la app servida.
// Devuelve un JSON con todo lo que NO cumple el sistema de color.
//
// Cubre lo que `getComputedStyle(elemento).backgroundColor` no ve:
//   · pseudoelementos ::before y ::after (degradados del hero, velos, líneas del menú)
//   · background-image (degradados con rgb/hex dentro)
//   · box-shadow (colores derivados)
//   · SVG: fill y stroke computados
//   · censo de colores de texto, para detectar más de una tinta

(() => {
  const PAL = {
    '226,242,239': 'MIST #E2F2EF',
    '195,223,227': 'GLASS #C3DFE3',
    '165,207,205': 'AQUA #A5CFCD',
    '127,187,178': 'SEA #7FBBB2',
    '228,222,208': 'SAND #E4DED0',
    '235,234,229': 'SHELL #EBEAE5',
    '35,63,82': 'INK #233F52'
  };
  const INK = '35,63,82';
  // únicos lugares donde se admite alpha: velos y sombras
  const ALPHA_ALLOWED = ['.menu-scrim', '.menu-drawer', '.product-tile-card', '.contact-card', '.story-quote-box'];

  const parse = (v) => {
    const m = String(v).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const n = m[1].split(',').map(Number);
    if (n.length < 3) return null;
    return { r: n[0], g: n[1], b: n[2], a: n[3] === undefined ? 1 : n[3] };
  };
  const key = (c) => [c.r, c.g, c.b].map(Math.round).join(',');
  const name = (el) => {
    const cls = String(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '');
    return (el.tagName.toLowerCase() + (cls ? '.' + cls.trim().split(/\s+/).slice(0, 2).join('.') : '')).slice(0, 70);
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0;
  };

  const offPalette = [];   // color sólido fuera de la paleta
  const alphaNotAllowed = []; // color con alpha donde no toca
  const gradients = [];    // colores usados dentro de background-image
  const shadows = new Set();
  const textColors = {};
  const svgColors = new Set();
  const allowed = (el) => ALPHA_ALLOWED.some((s) => el.closest && el.closest(s));

  const checkValue = (el, prop, v, isPseudo) => {
    if (!v || v === 'none' || v === 'transparent') return;
    const c = parse(v);
    if (c) {
      if (c.a < 0.05) return;
      const k = key(c);
      if (c.a < 0.95) {
        if (!allowed(el)) alphaNotAllowed.push(`${name(el)}${isPseudo} ${prop}=${v}`);
        return;
      }
      if (!PAL[k]) offPalette.push(`${name(el)}${isPseudo} ${prop}=${v}`);
      return;
    }
    // degradados / url(...) con colores dentro
    const found = String(v).match(/rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}/g) || [];
    for (const f of found) {
      const gc = parse(f) || (f[0] === '#' ? {
        r: parseInt(f.slice(1, 3), 16), g: parseInt(f.slice(3, 5), 16), b: parseInt(f.slice(5, 7), 16), a: 1
      } : null);
      if (!gc) continue;
      gradients.push(`${name(el)}${isPseudo} ${prop}: ${f}`);
      if (gc.a >= 0.95 && !PAL[key(gc)]) offPalette.push(`${name(el)}${isPseudo} ${prop} contiene ${f}`);
    }
  };

  const PROPS = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'];

  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    for (const p of PROPS) checkValue(el, p, s[p], '');
    checkValue(el, 'backgroundImage', s.backgroundImage, '');
    if (s.boxShadow && s.boxShadow !== 'none') shadows.add(s.boxShadow);
    // Controles nativos: el gris del sistema no sale en el elemento, solo en su pseudo.
    if (el.matches('input[type="file"]')) {
      const fb = getComputedStyle(el, '::file-selector-button');
      checkValue(el, 'backgroundColor', fb.backgroundColor, '::file-selector-button');
      checkValue(el, 'color', fb.color, '::file-selector-button');
      checkValue(el, 'borderTopColor', fb.borderTopColor, '::file-selector-button');
    }
    if (el.matches('input, textarea')) {
      checkValue(el, 'color', getComputedStyle(el, '::placeholder').color, '::placeholder');
    }

    for (const pseudo of ['::before', '::after']) {
      const ps = getComputedStyle(el, pseudo);
      if (ps.content === 'none' || ps.content === 'normal') continue;
      for (const p of PROPS) checkValue(el, p, ps[p], pseudo);
      checkValue(el, 'backgroundImage', ps.backgroundImage, pseudo);
    }
    // censo de tinta: solo nodos con texto propio
    const hasText = [...el.childNodes].some((nd) => nd.nodeType === 3 && nd.textContent.trim());
    if (hasText) {
      const c = parse(s.color);
      if (c && c.a > 0.9) {
        const k = key(c);
        textColors[k] = textColors[k] || { count: 0, ejemplo: name(el), token: PAL[k] || 'FUERA' };
        textColors[k].count++;
      }
    }
  }

  // Solo formas: el <svg> raíz computa fill:black por defecto y no pinta nada.
  for (const el of document.querySelectorAll('svg path, svg rect, svg circle, svg ellipse, svg line, svg polyline, svg polygon, svg text, svg use, svg g[fill], svg g[stroke]')) {
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    for (const p of ['fill', 'stroke']) {
      const v = s[p];
      if (!v || v === 'none') continue;
      const c = parse(v);
      if (!c || c.a < 0.05) continue;
      const k = key(c);
      svgColors.add(`${PAL[k] || 'FUERA DE PALETA'} (${v})`);
      if (c.a >= 0.95 && !PAL[k]) offPalette.push(`${name(el)} ${p}=${v}`);
    }
  }

  const inkOff = Object.entries(textColors).filter(([k]) => k !== INK);

  return JSON.stringify({
    veredicto: offPalette.length === 0 && inkOff.length === 0 && alphaNotAllowed.length === 0 ? 'PASS' : 'FAIL',
    solidosFueraDePaleta: { total: offPalette.length, muestra: offPalette.slice(0, 15) },
    tintas: textColors,
    tintasDistintasDeLaTinta: inkOff.map(([k, v]) => ({ color: k, token: v.token, usos: v.count, ejemplo: v.ejemplo })),
    alphaNoPermitido: { total: alphaNotAllowed.length, muestra: alphaNotAllowed.slice(0, 10) },
    degradados: [...new Set(gradients)].slice(0, 12),
    sombras: [...shadows].slice(0, 6),
    coloresSVG: [...svgColors],
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }, null, 1);
})()
