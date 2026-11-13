// KAISER · blocco app con codice di 6 cifre e Face ID / Touch ID (logica presa da PinscherTrade, src/ui/lock.js)
// - Il codice non viene mai salvato: solo un'impronta PBKDF2-SHA256 (150.000 giri, sale casuale) in localStorage.
// - Face ID usa le passkey del sistema (WebAuthn, autenticatore del dispositivo con verifica dell'utente).
// - Codice sbagliato 5 volte: attesa crescente (30 s, 60 s, ...).
// - "Hai dimenticato il codice?": cancella i dati di Kaiser su QUESTO dispositivo (account paper, impostazioni) e toglie il blocco.
// È una protezione contro chi prende in mano il telefono, non una cifratura dei dati. Il desk continua a girare sotto il blocco.
(function () {
  'use strict';
  var KEY = 'kz_lock', PIN_LEN = 6, ITER = 150000;
  var DELAYS = { now: 0, '1m': 60000, '5m': 300000 };
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var b64 = function (buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); };
  var unb64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); };

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function save(cfg) { try { cfg ? localStorage.setItem(KEY, JSON.stringify(cfg)) : localStorage.removeItem(KEY); } catch (e) {} }
  var enabled = function () { return !!(load() || {}).hash; };

  async function hashPin(pin, salt, iter) {
    var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
    var bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unb64(salt), iterations: iter || ITER, hash: 'SHA-256' }, base, 256);
    return b64(bits);
  }
  async function checkPin(pin) { var cfg = load(); return !!cfg && (await hashPin(pin, cfg.salt, cfg.iter)) === cfg.hash; }

  // ---------- Face ID (WebAuthn) ----------
  async function faceIdAvailable() {
    try { return !!(window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()); }
    catch (e) { return false; }
  }
  async function enrollFaceId() {
    var cred = await navigator.credentials.create({ publicKey: {
      rp: { name: 'Kaiser' },
      user: { id: crypto.getRandomValues(new Uint8Array(16)), name: 'kaiser', displayName: 'Kaiser' },
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'discouraged' },
      timeout: 60000, attestation: 'none' } });
    return b64(cred.rawId);
  }
  async function verifyFaceId(credId) {
    var res = await navigator.credentials.get({ publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      allowCredentials: [{ type: 'public-key', id: unb64(credId) }], userVerification: 'required', timeout: 60000 } });
    return !!(res && res.response && res.response.authenticatorData);
  }

  // ---------- Schermata ----------
  // mode: unlock | setup1 | setup2 | verify (per cambiare il codice o togliere il blocco)
  var mode = 'unlock', entry = '', firstPin = '', onVerified = null, busy = false;
  var attemptsWait = function () { return Math.max(0, ((load() || {}).until || 0) - Date.now()); };

  function render(msg, error) {
    var titles = { unlock: 'Inserisci il codice', setup1: 'Scegli un codice di 6 cifre', setup2: 'Ripeti il codice', verify: 'Inserisci il codice attuale' };
    $('lockMsg').textContent = msg || titles[mode];
    $('lockMsg').classList.toggle('error', !!error);
    $('lockDots').innerHTML = Array.from({ length: PIN_LEN }, function (_, i) { return '<span class="' + (i < entry.length ? 'on' : '') + '"></span>'; }).join('');
    var cfg = load() || {};
    $('lockFace').style.visibility = mode === 'unlock' && cfg.faceId ? 'visible' : 'hidden';
    $('lockForgot').style.display = mode === 'unlock' ? '' : 'none';
    $('lockCancel').style.display = mode === 'unlock' ? 'none' : '';
  }
  function show(m) { mode = m; entry = ''; busy = false; root.classList.add('app-locked'); $('lockScreen').classList.add('active'); render(); }
  function hide() { root.classList.remove('app-locked'); $('lockScreen').classList.remove('active'); entry = ''; firstPin = ''; onVerified = null; }
  function shake(msg) {
    entry = ''; render(msg, true);
    var d = $('lockDots'); d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake');
  }
  var say = function (t) { if (window.KZ && window.KZ.toast) window.KZ.toast(t); };

  async function complete() {
    busy = true; var pin = entry;
    if (mode === 'setup1') { firstPin = pin; mode = 'setup2'; entry = ''; busy = false; render(); return; }
    if (mode === 'setup2') {
      if (pin !== firstPin) { mode = 'setup1'; firstPin = ''; busy = false; shake('I codici non coincidono: riprova'); return; }
      var salt = b64(crypto.getRandomValues(new Uint8Array(16))), old = load() || {};
      save({ salt: salt, iter: ITER, hash: await hashPin(pin, salt), faceId: old.faceId || null, after: old.after || '1m' });
      hide(); renderSettings(); say('Blocco attivo: da ora Kaiser chiede il codice all’apertura.');
      return;
    }
    var wait = attemptsWait();
    if (wait > 0) { busy = false; shake('Troppi tentativi: riprova tra ' + Math.ceil(wait / 1000) + ' s'); return; }
    if (await checkPin(pin)) {
      var ok = load(); ok.fails = 0; ok.until = 0; save(ok);
      var next = onVerified, was = mode; hide();
      if (was === 'verify' && next) next();
      return;
    }
    var cfg = load(); cfg.fails = (cfg.fails || 0) + 1;
    if (cfg.fails >= 5) cfg.until = Date.now() + 30000 * Math.pow(2, cfg.fails - 5);
    save(cfg); busy = false;
    shake(cfg.fails >= 5 ? 'Codice errato. Attendi ' + Math.round(30 * Math.pow(2, cfg.fails - 5)) + ' s' : 'Codice errato');
  }
  function key(k) {
    if (busy) return;
    if (k === 'del') { entry = entry.slice(0, -1); render(); return; }
    if (entry.length >= PIN_LEN) return;
    entry += k; render();
    if (entry.length === PIN_LEN) setTimeout(complete, 120);
  }
  async function face() {
    var cfg = load(); if (!cfg || !cfg.faceId || busy) return;
    try { if (await verifyFaceId(cfg.faceId)) { cfg.fails = 0; cfg.until = 0; save(cfg); hide(); } }
    catch (e) { render('Face ID non riuscito: usa il codice', true); }
  }
  function forgot() {
    if (!window.confirm('Hai dimenticato il codice?\n\nPer togliere il blocco cancello i dati di Kaiser su questo dispositivo: account paper, journal e impostazioni (le reinserisci dopo). Il runner su GitHub e il backend non vengono toccati.\n\nProcedo?')) return;
    try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
    location.reload();
  }

  // ---------- Setup → Blocco app ----------
  async function renderSettings() {
    var box = $('lockSettingsBody'); if (!box) return;
    var cfg = load();
    if (!cfg || !cfg.hash) {
      box.innerHTML = '<p class="small muted" style="margin:0 0 10px">Come lo sblocco del telefono: all’apertura Kaiser chiede un codice di 6 cifre (e, se vuoi, Face ID). Il desk continua a lavorare anche con l’app bloccata.</p>' +
        '<button type="button" class="btn gold" data-lock="setup" style="width:100%">Imposta il codice</button>';
      return;
    }
    var fa = await faceIdAvailable(), after = cfg.after || '1m';
    var tg = function (items, cur, fn) { return '<div class="theme-toggle">' + items.map(function (it) { return '<button type="button" class="' + (cur === it[0] ? 'active' : '') + '" data-lock="' + fn + '" data-val="' + it[0] + '">' + it[1] + '</button>'; }).join('') + '</div>'; };
    box.innerHTML =
      '<div class="set wide"><label>Face ID</label>' + (fa ? tg([['1', 'Sì'], ['0', 'No']], cfg.faceId ? '1' : '0', 'face') : '<span class="small muted">non disponibile qui</span>') + '</div>' +
      '<div class="set wide"><label>Blocca dopo<small>tempo fuori dall’app</small></label>' + tg([['now', 'Subito'], ['1m', '1 min'], ['5m', '5 min']], after, 'after') + '</div>' +
      '<div class="row" style="gap:8px;margin-top:10px"><button type="button" class="btn sm" data-lock="change" style="flex:1">Cambia codice</button><button type="button" class="btn sm red" data-lock="off" style="flex:1">Togli il blocco</button></div>' +
      '<p class="tiny muted" id="lockHint" style="margin:10px 0 0">Il blocco protegge dallo sguardo di chi prende il telefono: non cifra i dati.</p>';
  }
  async function setFace(on) {
    var cfg = load(); if (!cfg) return;
    if (!on) { cfg.faceId = null; save(cfg); renderSettings(); return; }
    try { cfg.faceId = await enrollFaceId(); save(cfg); }
    catch (e) { var h = $('lockHint'); if (h) h.textContent = 'Face ID non attivato: ' + (e && e.name === 'NotAllowedError' ? 'richiesta annullata o non consentita.' : (e && e.message) || 'errore'); return; }
    renderSettings();
  }

  document.addEventListener('click', function (e) {
    var k = e.target.closest ? e.target.closest('[data-k]') : null;
    if (k && k.closest('#lockScreen')) { key(k.getAttribute('data-k')); return; }
    var a = e.target.closest ? e.target.closest('[data-lock]') : null; if (!a) return;
    var act = a.getAttribute('data-lock'), val = a.getAttribute('data-val');
    if (act === 'setup') show('setup1');
    else if (act === 'change') { onVerified = function () { show('setup1'); }; show('verify'); }
    else if (act === 'off') { onVerified = function () { save(null); renderSettings(); say('Blocco tolto.'); }; show('verify'); }
    else if (act === 'after') { var c = load(); if (c && val in DELAYS) { c.after = val; save(c); renderSettings(); } }
    else if (act === 'face') setFace(val === '1');
    else if (act === 'faceid') face();
    else if (act === 'forgot') forgot();
    else if (act === 'cancel') hide();
  });

  // ---------- Avvio e ritorno nell'app ----------
  var hiddenAt = 0;
  document.addEventListener('DOMContentLoaded', function () {
    if (enabled()) show('unlock'); else hide();
    document.addEventListener('visibilitychange', function () {
      if (!enabled()) return;
      if (document.visibilityState === 'hidden') { hiddenAt = Date.now(); return; }
      var cfg = load() || {};
      if (hiddenAt && Date.now() - hiddenAt >= (DELAYS[cfg.after || '1m'] != null ? DELAYS[cfg.after || '1m'] : 60000) && mode !== 'setup1' && mode !== 'setup2') show('unlock');
      hiddenAt = 0;
    });
    renderSettings();
  });
})();
