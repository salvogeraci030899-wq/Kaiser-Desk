'use strict';
// Colori sfondo (come su PinscherTrade): tre pallini nelle Impostazioni, ognuno cicla tra colore di base, colori e nessuna luce; nero e bianco restano predominanti.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = (f) => fs.readFileSync(require.resolve('../' + f), 'utf8');

test('theme.js: dieci stati per pallino (base, otto colori, nessuna luce), salvati come ids e valori CSS; ogni pallino cicla da solo', () => {
  const js = read('theme.js');
  const ids = [...js.matchAll(/\['(\w+)', '[A-Z]/g)].map((m) => m[1]);
  assert.deepEqual(ids, ['base', 'blu', 'verde', 'viola', 'rosa', 'arancio', 'ciano', 'giallo', 'rosso', 'nessuno']);
  assert.match(js, /var WALL_KEY = 'kz_wall'/); assert.match(js, /JSON\.stringify\(\{ ids: ids, css: ids\.map/); assert.match(js, /root\.classList\.toggle\('tint'/);
  assert.match(js, /\.wall-dot'\) : null; if \(dot\) \{ cycleWall\(Number\(dot\.getAttribute\('data-i'\)\) \|\| 0\)/);
  assert.match(js, /applyWall\(\); syncWallUi\(\)/);
});

test('primo disegno senza lampi: lo script nell\'head applica i colori salvati e la classe tint', () => {
  const html = read('index.html'), head = html.slice(0, html.indexOf('</head>'));
  assert.match(head, /localStorage\.getItem\('kz_wall'\)/); assert.match(head, /setProperty\('--wall-c' \+ \(i \+ 1\), c\)/); assert.match(head, /root\.classList\.add\('tint'\)/);
});

test('Impostazioni, Generale: riga «Colori sfondo» con tre pallini sotto il Vetro; nessun colore fisso nelle luci, solo le variabili con i colori di sempre come predefiniti', () => {
  const html = read('index.html'), css = read('style.css');
  const row = html.slice(html.indexOf('<label>Colori sfondo</label>'), html.indexOf('<label>Colori sfondo</label>') + 520);
  assert.equal((row.match(/class="wall-dot" data-i="[012]"/g) || []).length, 3); assert.ok(html.indexOf('data-val="anim">Animato') < html.indexOf('<label>Colori sfondo</label>'), 'sotto il Vetro');
  for (const n of [1, 2, 3]) assert.match(css, new RegExp('--wall-c' + n + ', rgb\\('));
  assert.ok(!/\.wall-anim i:nth-child\(\d\) \{ --c: rgba\(/.test(css), 'le luci animate usano le variabili');
  assert.ok(!/--wall: radial-gradient\(60% 45% at 0% 0%, rgba\(/.test(css), 'lo sfondo del Vetro usa le variabili');
  assert.match(css, /html\.tint:not\(\.glass\) body, html\.tint:not\(\.glass\) #app/); assert.match(css, /var\(--bg\); \}/, 'con il Vetro spento le luci stanno su nero o bianco del tema');
  assert.match(css, /\.wall-dot\[data-i="0"\] \{ --dot: var\(--wall-c1, rgb\(10 132 255\)\); \}/);
});
