'use strict';
// Altezza dell'app installata (barra in basso): un calo momentaneo non stringe l'interfaccia, un calo che dura si segue, la rotazione riparte da zero,
// i ricalcoli forzati sono pochi e solo nei primi secondi, gli episodi si registrano.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function world(opts = {}) {
  const w = { t: 1_000_000, innerH: 852, innerW: 393, outerH: 852, listeners: {}, props: {}, store: {}, kicks: 0 };
  const win = {
    get innerHeight() { return w.innerH; }, get innerWidth() { return w.innerW; }, get outerHeight() { return w.outerH; }, scrollY: 0, matchMedia: null,
    addEventListener: (ev, fn) => { (w.listeners[ev] = w.listeners[ev] || []).push(fn); }, dispatchEvent: () => true, scrollTo: () => {}, requestAnimationFrame: () => 0, visualViewport: null,
  };
  const root = { classList: { contains: (c) => c === 'pwa-mode', toggle: () => {}, add: () => {}, remove: () => {} }, style: { setProperty: (k, v) => { w.props[k] = v; }, removeProperty: () => {}, height: '' }, getAttribute: () => null, setAttribute: () => {}, scrollTop: 0, offsetHeight: 0 };
  const doc = { documentElement: root, addEventListener: () => {}, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, visibilityState: 'visible' };
  const ctx = { window: win, document: doc, screen: { height: 852 }, performance: { now: () => w.t }, localStorage: { getItem: (k) => (k in w.store ? w.store[k] : null), setItem: (k, v) => { w.store[k] = String(v); } },
    Date: class extends Date { static now() { return w.t; } constructor(...a) { super(...(a.length ? a : [w.t])); } }, setTimeout: () => 0, setInterval: () => 0, requestAnimationFrame: () => 0, Event: class {}, CustomEvent: class {}, console };
  win.performance = ctx.performance; win.localStorage = ctx.localStorage; win.screen = ctx.screen; win.Date = ctx.Date;
  vm.runInNewContext(fs.readFileSync(require.resolve('../theme.js'), 'utf8'), Object.assign(ctx, win, { window: win }));
  w.fit = () => (w.listeners.resize || []).forEach((f) => f()); w.h = () => w.props['--app-h']; w.log = () => win.KZTheme.hlog().map((x) => x[5] + '@' + x[1]); w.win = win; return w;
}

test('calo momentaneo: ignorato; calo che dura 4 secondi: seguito; crescita e calo piccolo: subito', () => {
  const w = world(); assert.equal(w.h(), '852px', 'avvio');
  w.innerH = 790; w.fit(); w.t += 1500; w.fit(); assert.equal(w.h(), '852px', 'a 790 da 1,5 s: resta 852');
  w.innerH = 852; w.fit(); assert.equal(w.h(), '852px'); assert.ok(w.log().includes('calo ignorato@790'));
  w.innerH = 790; w.fit(); w.t += 4200; w.fit(); assert.equal(w.h(), '790px', 'durato oltre 4 s: si accetta'); assert.ok(w.log().includes('calo accettato@790'));
  w.innerH = 840; w.fit(); assert.equal(w.h(), '840px', 'crescita: subito'); w.innerH = 830; w.fit(); assert.equal(w.h(), '830px', 'calo di 10 px: subito');
});

test('rotazione: riparte da zero e segue subito la nuova altezza', () => {
  const w = world(); w.innerW = 852; w.innerH = 393; w.fit(); assert.equal(w.h(), '393px'); w.innerW = 393; w.innerH = 852; w.fit(); assert.equal(w.h(), '852px');
  assert.equal(JSON.stringify(w.log().filter((x) => x.startsWith('rotazione'))), JSON.stringify(['rotazione@393', 'rotazione@852']));
});

test('ricalcoli forzati: al massimo 8, solo nei primi 15 secondi; il ricalcolo a mano riparte da zero; il registro tiene gli ultimi 14 episodi', () => {
  const w = world(); w.outerH = 1000;                     // finestra piu' bassa dello schermo
  for (let i = 0; i < 40; i++) { w.t += 800; w.fit(); }   // 32 s di eventi
  assert.ok(w.win.__kzKicks <= 8 && w.win.__kzKicks >= 1, 'ricalcoli ' + w.win.__kzKicks); const k = w.win.__kzKicks; w.t += 800; w.fit(); assert.equal(w.win.__kzKicks, k, 'dopo i primi 15 secondi nessun altro');
  w.win.KZTheme.recalc(); assert.ok(w.log().includes('ricalcolo a mano@852')); assert.equal(w.win.__kzKicks, 1, 'a mano: riparte dal primo');
  for (let i = 0; i < 40; i++) { w.innerH = i % 2 ? 700 : 852; w.t += 5000; w.fit(); } assert.ok(JSON.parse(w.store.kz_hlog).length <= 14);
});

test('app e diagnostica: nessun ricalcolo a ogni tocco, tasto «Ricalcola il layout ora» e riga degli episodi', () => {
  const js = fs.readFileSync(require.resolve('../theme.js'), 'utf8'), html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.ok(!/touchstart', 'pointerdown'\]\.forEach/.test(js), 'niente ricalcolo a ogni tocco'); assert.match(js, /SHRINK_MS = 4000, MAX_KICKS = 8/); assert.match(js, /closest\('#diagRecalc'\)\) recalc\(\)/);
  assert.match(html, /id=\\?"diagRecalc\\?"/); assert.match(html, /episodi altezza \(ora, inner, outer, vv, schermo, azione\)/);
});
