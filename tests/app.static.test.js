'use strict';
// Controlli statici sull'app: nessun campo per segreti, niente zoom/selezione, versione coerente, icone presenti.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

const html = read('index.html');

test('l\'app non ha campi in cui inserire token, chiavi o indirizzi: solo numeri, interruttori e scelte dei parametri', () => {
  assert.ok(!/<textarea\b/i.test(html), 'c\'è una <textarea>');
  for (const m of html.matchAll(/<input\b[^>]*>/gi)) { const t = m[0]; assert.match(t, /type="(number|checkbox)"/, 'campo non ammesso: ' + t); assert.match(t, /data-(param|reset)=/, 'campo senza data-param/data-reset: ' + t); assert.ok(!/placeholder/i.test(t)); }
  for (const m of html.matchAll(/<select\b[^>]*>/gi)) assert.match(m[0], /data-param=/, 'select non dei parametri: ' + m[0]);
  assert.ok(!/type="(text|password|url|search|email|tel)"/i.test(html), 'campo di testo');
  for (const bad of ['x-app-token', 'executorToken', 'appToken', 'data-pref="token', 'localStorage.setItem(\'kaiser.v1\'', 'prompt(']) assert.ok(!html.includes(bad), 'trovato: ' + bad);
  for (const f of ['lock.js', 'theme.js']) { const s = read(f); assert.ok(!/<input\b/i.test(s) && !/createElement\('input'\)/.test(s), f + ' crea un campo'); }
});
test('l\'app scrive in un solo punto: la richiesta di modifica dei parametri, senza segreti', () => {
  const posts = [...html.matchAll(/method:\s*'(POST|PUT|DELETE|PATCH)'/g)]; assert.equal(posts.length, 1, 'più di una scrittura');
  assert.match(html, /fetch\(`\$\{EXEC\}\/propose`, \{ method: 'POST', headers: \{ 'Content-Type': 'application\/json' \}, body: JSON\.stringify\(body\) \}\)/);
  assert.equal([...html.matchAll(/postPropose\(/g)].length, 7, 'postPropose: definizione + parametri + reset + emergenza + chiusura + scorciatoia approvazione + pannello');
  assert.ok(!/<input[^>]*data-reset[^>]*type="(text|password)"/.test(html));
  assert.ok(!/Authorization|x-app-token|x-pt|Bearer/i.test(html), 'intestazioni di autenticazione nell\'app');
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
  assert.match(html, new RegExp('name="kz-build" content="' + v.replace(/\./g, '\\.') + '"'), 'meta kz-build diversa dalla versione');
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

test('ogni $(\'#id\') usato dallo script esiste nella pagina (niente errori dopo aver tolto una sezione)', () => {
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  const used = [...new Set([...html.matchAll(/\$\('#([A-Za-z0-9_-]+)'\)/g)].map((m) => m[1]))];
  assert.deepEqual(used.filter((i) => !ids.has(i)), []);
});

test('nessuna emoji nell\'app, nel runner e nei messaggi del Worker (restano frecce e segni di testo)', () => {
  const EMO = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{270E}\u{2705}\u{274C}\u{21A9}\u{23F3}\u{FE0F}\u{200D}]/u;
  for (const f of ['index.html', 'lock.js', 'theme.js', 'style.css', 'runner/runner.js', 'worker/src/exec.js', 'worker/src/tg.js', 'worker/src/index.js', 'worker/src/params.js']) assert.ok(!EMO.test(read(f)), f + ' contiene emoji');
});

test('profili pronti: ogni valore e\' ammesso dal Worker (intervalli e tipi)', async () => {
  const { validate, SCHEMA } = await import('../worker/src/params.js');
  const a = html.indexOf('const PRESETS = ['), b = html.indexOf('\n];', a); assert.ok(a > 0 && b > a, 'PRESETS non trovato');
  const presets = new Function('return ' + html.slice(a + 'const PRESETS = '.length, b + 3))();
  assert.ok(presets.some((p) => p.id === 'young'), 'manca il profilo dei giovani');
  for (const p of presets) { const { clean, errors } = validate(p.vals); assert.deepEqual(errors, [], p.id + ': ' + JSON.stringify(errors)); assert.deepEqual(Object.keys(clean).sort(), Object.keys(p.vals).sort(), p.id + ': chiavi non ammesse'); for (const k of Object.keys(p.vals)) assert.ok(SCHEMA[k], k); }
});
