// KAISER · tema, Vetro e barra di stato (logica presa da PinscherTrade, src/core/theme.js)
// Le preferenze restano su questo dispositivo (localStorage). Il primo frame lo imposta lo script in <head>;
// qui si gestiscono il cambio dalle Impostazioni e il cambio di iOS mentre l'app è aperta.
(function () {
  'use strict';
  var KEY = 'kz_theme', GLASS_KEY = 'kz_glass', BAR_KEY = 'kz_statusbar';
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
    var theme = resolved(), bar = get(BAR_KEY, ['integrated', 'separate'], 'integrated');
    if (root.getAttribute('data-theme') !== theme) root.setAttribute('data-theme', theme);
    var m = document.getElementById('metaThemeColor'); if (m) m.setAttribute('content', theme === 'light' ? '#f2f2f7' : '#000000');
    var s = document.getElementById('metaStatusBar');
    if (s) s.setAttribute('content', theme === 'light' ? 'default' : (bar === 'separate' ? 'black' : 'black-translucent'));
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
  function syncUi() {
    var cur = { theme: get(KEY, THEMES, 'auto'), glass: get(GLASS_KEY, GLASS, 'off'), bar: get(BAR_KEY, ['integrated', 'separate'], 'integrated') };
    document.querySelectorAll('[data-pref]').forEach(function (b) { b.classList.toggle('active', cur[b.getAttribute('data-pref')] === b.getAttribute('data-val')); });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-pref]') : null; if (!b) return;
    var pref = b.getAttribute('data-pref'), val = b.getAttribute('data-val');
    if (pref === 'theme' && THEMES.indexOf(val) >= 0) set(KEY, val);
    else if (pref === 'glass' && GLASS.indexOf(val) >= 0) { set(GLASS_KEY, val); applyGlass(); }
    else if (pref === 'bar') set(BAR_KEY, val === 'separate' ? 'separate' : 'integrated');
    else return;
    apply();
  });
  if (media) {
    var onChange = function () { if (get(KEY, THEMES, 'auto') === 'auto') apply(); };
    if (media.addEventListener) media.addEventListener('change', onChange); else if (media.addListener) media.addListener(onChange);
  }
  // Layout dell'app (Sistema → Generale → Schermo): 'fixed' = ancorata ai bordi (predefinito, nessun calcolo), 'lvh' = altezza lunga, 'inner' = altezza misurata.
  var LAYOUTS = ['screen', 'fixed', 'lvh', 'inner'], LKEY = 'kz_layout2';
  var dflt = function () { return root.classList.contains('pwa-mode') ? 'lvh' : 'fixed'; };
  // 'screen' = altezza dello schermo del telefono (in app installata è l'area visibile intera, senza la barra di Safari)
  function screenH() { var a = screen.width, b = screen.height, port = window.matchMedia ? window.matchMedia('(orientation: portrait)').matches : innerHeight >= innerWidth; return port ? Math.max(a, b) : Math.min(a, b); }
  function fitHeight() {
    if (root.classList.contains('layout-inner')) root.style.setProperty('--app-h', window.innerHeight + 'px');
    else if (root.classList.contains('layout-screen')) root.style.setProperty('--app-h', screenH() + 'px');
  }
  function applyLayout() {
    var l = get(LKEY, LAYOUTS, dflt());
    LAYOUTS.forEach(function (x) { root.classList.toggle('layout-' + x, x === l); });
    if (l === 'inner' || l === 'screen') fitHeight(); else root.style.removeProperty('--app-h');
    document.querySelectorAll('[data-layout]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-layout') === l); });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-layout]') : null; if (!b) return;
    var v = b.getAttribute('data-layout'); if (LAYOUTS.indexOf(v) >= 0) { set(LKEY, v); applyLayout(); }
  });
  ['resize', 'orientationchange', 'pageshow'].forEach(function (ev) { window.addEventListener(ev, fitHeight); });
  applyLayout();
  document.addEventListener('DOMContentLoaded', function () { applyLayout(); applyGlass(); apply(); syncWalls(); });
  window.KZTheme = { apply: apply, resolved: resolved, layout: function () { return get(LKEY, LAYOUTS, dflt()); } };
})();
