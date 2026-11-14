'use strict';
// Controlli statici sull'app: nessun campo per segreti, niente zoom/selezione, versione coerente, icone presenti.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

const html = read('index.html');

test('l\'app non ha campi in cui inserire token, chiavi o indirizzi', () => {
  assert.ok(!/<input\b/i.test(html), 'c\'è un <input>');
  assert.ok(!/<textarea\b/i.test(html), 'c\'è una <textarea>');
  assert.ok(!/<select\b/i.test(html), 'c\'è una <select>');
  for (const bad of ['x-app-token', 'executorToken', 'appToken', 'data-pref="token', 'localStorage.setItem(\'kaiser.v1\'', 'prompt(']) assert.ok(!html.includes(bad), 'trovato: ' + bad);
  for (const f of ['lock.js', 'theme.js']) { const s = read(f); assert.ok(!/<input\b/i.test(s) && !/createElement\('input'\)/.test(s), f + ' crea un campo'); }
});
test('l\'app non scrive: nessuna chiamata POST verso l\'esterno', () => {
  assert.ok(!/method:\s*'POST'/.test(html), 'c\'è una POST nell\'app');
  assert.ok(!/fetch\([^)]*\{[^}]*method:\s*'(POST|PUT|DELETE)'/.test(html));
});
test('niente zoom, niente selezione del testo, niente lente di ingrandimento', () => {
  assert.match(html, /maximum-scale=1/); assert.match(html, /user-scalable=no/);
  assert.match(html, /gesturestart/); assert.match(html, /contextmenu/); assert.match(html, /selectstart/);
  const css = read('style.css');
  assert.match(css, /user-select:\s*none/); assert.match(css, /-webkit-touch-callout:\s*none/); assert.match(css, /touch-action:\s*manipulation/); assert.match(css, /overscroll-behavior:\s*none/);
});
test('la versione è mostrata ed è la stessa in package.json e version.js', () => {
  const v = JSON.parse(read('package.json')).version, m = read('version.js').match(/KZ_VERSION\s*=\s*'([^']+)'/);
  assert.ok(m, 'version.js senza KZ_VERSION'); assert.equal(m[1], v);
  assert.match(html, /id="ver"/); assert.match(html, /<script src="version\.js">/);
});
test('manifest e icone: file presenti, fantasmino al posto della K, installabile da Pages', () => {
  const man = JSON.parse(read('manifest.json'));
  assert.equal(man.display, 'standalone'); assert.equal(man.start_url, './'); assert.equal(man.scope, './');
  for (const i of man.icons) assert.ok(fs.existsSync(path.join(root, i.src.split('?')[0])), 'manca ' + i.src);
  assert.ok(man.icons.some((i) => i.purpose === 'maskable'));
  for (const f of ['icon-180.png', 'favicon-32.png', 'icon.svg', '.nojekyll']) assert.ok(fs.existsSync(path.join(root, f)), 'manca ' + f);
  assert.match(html, /<symbol id="ghost"/); assert.ok(!/class="logo"[^>]*>K</.test(html));
  const png = fs.readFileSync(path.join(root, 'icon-512.png')); assert.equal(png.readUInt32BE(16), 512); assert.equal(png.readUInt32BE(20), 512);
  const apple = fs.readFileSync(path.join(root, 'icon-180.png')); assert.equal(apple.readUInt32BE(16), 180);
});
test('percorsi relativi: la pagina funziona da una sottocartella (GitHub Pages)', () => {
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)) { const u = m[1]; if (/^(https?:|data:)/.test(u) || u.startsWith('#')) continue; assert.ok(!u.startsWith('/'), 'percorso assoluto: ' + u); }
  const man = read('manifest.json'); assert.ok(!/"src":\s*"\//.test(man));
});
