// KAISER · tema, Vetro e barra di stato (logica presa da PinscherTrade, src/core/theme.js)
// Le preferenze restano su questo dispositivo (localStorage). Il primo frame lo imposta lo script in <head>;
// qui si gestiscono il cambio dalle Impostazioni e il cambio di iOS mentre l'app è aperta.
(function () {
  'use strict';
  var KEY = 'kz_theme', GLASS_KEY = 'kz_glass';
  var THEMES = ['auto', 'light', 'dark'], GLASS = ['off', 'on', 'anim'];
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  var get = function (k, list, d) { try { var v = localStorage.getItem(k); return list.indexOf(v) >= 0 ? v : d; } catch (e) { return d; } };
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  function resolved() {
    var p = get(KEY, THEMES, 'auto');
    return p === 'auto' ? (media && media.matches ? 'light' : 'dark') : p;
  }
  function apply() {
    var theme = resolved();
    if (root.getAttribute('data-theme') !== theme) root.setAttribute('data-theme', theme);
    var m = document.getElementById('metaThemeColor'); if (m) m.setAttribute('content', theme === 'light' ? '#f2f2f7' : '#000000');
    var s = document.getElementById('metaStatusBar');
    if (s) s.setAttribute('content', theme === 'light' ? 'default' : 'black-translucent');
    syncUi();
    // il grafico DexScreener dentro la scheda di dettaglio segue il tema
    document.querySelectorAll('iframe.chart').forEach(function (f) {
      var u = f.getAttribute('src') || ''; var n = u.replace(/theme=(dark|light)/, 'theme=' + theme);
      if (n !== u) f.setAttribute('src', n);
    });
    window.dispatchEvent(new CustomEvent('kz-theme', { detail: theme }));
  }
  function syncWalls() {
    if (!root.classList.contains('glass-anim')) return;
    document.querySelectorAll('.wall-anim i').forEach(function (i) { try { i.getAnimations().forEach(function (a) { a.startTime = 0; }); } catch (e) {} });
  }
  function applyGlass() {
    var g = get(GLASS_KEY, GLASS, 'off');
    root.classList.toggle('glass', g !== 'off');
    root.classList.toggle('glass-anim', g === 'anim');
    requestAnimationFrame(syncWalls);
  }
  // Colori sfondo: tre luci, ognuna del colore scelto, su nero o bianco che restano predominanti. Ogni pallino cicla: colore di base, colori, nessuna luce.
  // Si salva anche il valore CSS, cosi' il primo disegno (script nell'head di index.html) non lampeggia.
  var WALL_KEY = 'kz_wall';
  var WALL_COLORS = [['base', 'Base', null], ['blu', 'Blu', 'rgb(10 132 255)'], ['verde', 'Verde', 'rgb(48 209 88)'], ['viola', 'Viola', 'rgb(191 90 242)'],
    ['rosa', 'Rosa', 'rgb(255 55 95)'], ['arancio', 'Arancio', 'rgb(255 159 10)'], ['ciano', 'Ciano', 'rgb(100 210 255)'], ['giallo', 'Giallo', 'rgb(255 214 10)'],
    ['rosso', 'Rosso', 'rgb(255 69 58)'], ['nessuno', 'Nessuna luce', 'transparent']];
  var wallOf = function (id) { for (var i = 0; i < WALL_COLORS.length; i++) if (WALL_COLORS[i][0] === id) return WALL_COLORS[i]; return null; };
  function getWall() {
    try { var v = JSON.parse(localStorage.getItem(WALL_KEY) || 'null'); if (v && Array.isArray(v.ids) && v.ids.length === 3 && v.ids.every(wallOf)) return v.ids; } catch (e) { /* senza memoria: colori di base */ }
    return ['base', 'base', 'base'];
  }
  function applyWall(ids) {
    ids = ids || getWall();
    ids.forEach(function (id, i) { var c = wallOf(id), css = c ? c[2] : null; if (css) root.style.setProperty('--wall-c' + (i + 1), css); else root.style.removeProperty('--wall-c' + (i + 1)); });
    root.classList.toggle('tint', ids.some(function (id) { return id !== 'base'; }));
  }
  function cycleWall(i) {
    var ids = getWall(), at = 0; for (var k = 0; k < WALL_COLORS.length; k++) if (WALL_COLORS[k][0] === ids[i]) at = k;
    ids[i] = WALL_COLORS[(at + 1) % WALL_COLORS.length][0];
    try { localStorage.setItem(WALL_KEY, JSON.stringify({ ids: ids, css: ids.map(function (id) { return (wallOf(id) || [])[2] || null; }) })); } catch (e) { /* vale fino alla chiusura */ }
    applyWall(ids); return ids;
  }
  function syncWallUi() {
    getWall().forEach(function (id, i) {
      var b = document.querySelector('#wallDots .wall-dot[data-i="' + i + '"]'), c = wallOf(id) || WALL_COLORS[0];
      if (b) { b.title = 'Luce ' + (i + 1) + ': ' + c[1] + '. Tocca per cambiare'; b.setAttribute('aria-label', b.title); }
    });
  }
  function syncUi() {
    var cur = { theme: get(KEY, THEMES, 'auto'), glass: get(GLASS_KEY, GLASS, 'off') };
    document.querySelectorAll('[data-pref]').forEach(function (b) { b.classList.toggle('active', cur[b.getAttribute('data-pref')] === b.getAttribute('data-val')); });
  }

  document.addEventListener('click', function (e) {
    var dot = e.target.closest ? e.target.closest('.wall-dot') : null; if (dot) { cycleWall(Number(dot.getAttribute('data-i')) || 0); syncWallUi(); return; }
    var b = e.target.closest ? e.target.closest('[data-pref]') : null; if (!b) return;
    var pref = b.getAttribute('data-pref'), val = b.getAttribute('data-val');
    if (pref === 'theme' && THEMES.indexOf(val) >= 0) set(KEY, val);
    else if (pref === 'glass' && GLASS.indexOf(val) >= 0) { set(GLASS_KEY, val); applyGlass(); }
    else return;
    apply();
  });
  if (media) {
    var onChange = function () { if (get(KEY, THEMES, 'auto') === 'auto') apply(); };
    if (media.addEventListener) media.addEventListener('change', onChange); else if (media.addListener) media.addListener(onChange);
  }
  // Altezza dell'app installata = altezza REALE della finestra (innerHeight). iOS la aggiorna in ritardo (all'avvio, con la barra di stato,
  // dopo la tastiera): si rimisura spesso per i primi secondi e a ogni evento utile, e si evita che la pagina scorra da sola.
  var pwa = root.classList.contains('pwa-mode'), lastH = 0;
  function fitHeight() {
    if (!pwa) return;
    var h = Math.round(window.innerHeight); if (!(h > 300)) return;
    var hist = (window.__kzH = window.__kzH || []), now = Math.round(performance.now() / 100) / 10;
    if (!hist.length || hist[hist.length - 1][1] !== h) hist.push([now, h, Math.round(window.outerHeight || 0)]);
    if (h !== lastH) { lastH = h; root.style.setProperty('--app-h', h + 'px'); }
    if (window.scrollY || document.documentElement.scrollTop) window.scrollTo(0, 0);
    // Se iOS ha dato una finestra più bassa dello schermo (outerHeight è quello vero) la si fa ricalcolare: succede a caso all'apertura
    if (window.outerHeight - h > 60 && Date.now() - lastKick > (kicks < 20 ? 500 : 2500)) kick();
  }
  var kicks = 0, lastKick = 0;
  function kick() {
    kicks++; lastKick = Date.now(); window.__kzKicks = kicks;
    var m = document.querySelector('meta[name=viewport]'), c0 = m && m.getAttribute('content'), mode = kicks % 3;
    if (mode === 1 && m) { m.setAttribute('content', c0.replace('maximum-scale=1', 'maximum-scale=1.01')); setTimeout(function () { m.setAttribute('content', c0); fitHeight(); }, 80); }
    else if (mode === 2) { var s = document.documentElement.style; s.height = '101%'; void document.documentElement.offsetHeight; setTimeout(function () { s.height = ''; window.scrollTo(0, 0); fitHeight(); }, 80); }
    else { window.scrollTo(0, 1); setTimeout(function () { window.scrollTo(0, 0); window.dispatchEvent(new Event('resize')); fitHeight(); }, 80); }
    setTimeout(fitHeight, 400);
  }
  if (pwa) {
    ['resize', 'orientationchange', 'pageshow', 'focus', 'load', 'scroll'].forEach(function (ev) { window.addEventListener(ev, fitHeight, { passive: true }); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', fitHeight);
    document.addEventListener('visibilitychange', fitHeight);
    document.addEventListener('focusout', function () { setTimeout(fitHeight, 50); setTimeout(fitHeight, 400); });
    ['touchstart', 'pointerdown'].forEach(function (ev) { document.addEventListener(ev, function () { if (window.outerHeight - lastH > 60) { kick(); } }, { passive: true }); });
    fitHeight(); var n = 0, tick = function () { fitHeight(); if (++n < 40) requestAnimationFrame(tick); }; requestAnimationFrame(tick);   // primo secondo, a ogni frame
    var slow = 0, iv = setInterval(function () { fitHeight(); if (++slow > 20) clearInterval(iv); }, 500);                                  // poi ogni mezzo secondo per 10 s
    setInterval(fitHeight, 3000);
  }
  document.addEventListener('DOMContentLoaded', function () { applyGlass(); applyWall(); syncWallUi(); apply(); syncWalls(); });
  window.KZTheme = { apply: apply, resolved: resolved, wall: getWall, cycleWall: cycleWall, layout: function () { return pwa ? 'misurato' : 'fisso'; } };
})();
