/* =========================================================
   js/audio.js — Le produit est construit autour de l'audio (§48)
   Règle absolue : jamais de voix française pour l'anglais.
   Si aucune voix anglaise n'existe sur l'appareil, on se tait et on prévient
   le parent — mieux vaut pas de son qu'un son faux.
   ========================================================= */

window.App = window.App || {};

App.Audio = (function () {

  var synth = window.speechSynthesis || null;
  var voices = [];
  var picked = { fr: null, en: null };
  var unlocked = false;
  var ctx = null;
  var listeners = [];

  /* Voix préférées, par ordre de qualité constatée sur les OS courants */
  var PREF = {
    fr: ['Amelie', 'Amélie', 'Thomas', 'Audrey', 'Google français', 'Microsoft Denise', 'Microsoft Hortense', 'Aurelie'],
    en: ['Samantha', 'Daniel', 'Karen', 'Google UK English Female', 'Google US English', 'Microsoft Aria', 'Microsoft Sonia']
  };

  function refresh() {
    if (!synth) return;
    voices = synth.getVoices() || [];
    picked.fr = choose('fr');
    picked.en = choose('en');
    listeners.forEach(function (fn) { fn(); });
  }

  function choose(lang) {
    var st = App.State.get();
    var wanted = lang === 'fr' ? st.settings.voiceFr : st.settings.voiceEn;
    var i, v;
    if (wanted) {
      for (i = 0; i < voices.length; i++) if (voices[i].name === wanted) return voices[i];
    }
    var pool = voices.filter(function (v) { return (v.lang || '').toLowerCase().indexOf(lang) === 0; });
    if (!pool.length) return null;
    for (i = 0; i < PREF[lang].length; i++) {
      for (var j = 0; j < pool.length; j++) {
        if (pool[j].name.indexOf(PREF[lang][i]) !== -1) return pool[j];
      }
    }
    /* à défaut : une voix locale plutôt qu'une voix distante */
    for (i = 0; i < pool.length; i++) if (pool[i].localService) return pool[i];
    return pool[0];
  }

  function listFor(lang) {
    return voices.filter(function (v) { return (v.lang || '').toLowerCase().indexOf(lang) === 0; });
  }

  function has(lang) { return !!picked[lang]; }

  function onReady(fn) { listeners.push(fn); }

  /* iOS/Safari exigent un premier geste utilisateur */
  function unlock() {
    if (unlocked || !synth) return;
    try {
      var u = new SpeechSynthesisUtterance(' ');
      u.volume = 0; synth.speak(u);
      unlocked = true;
    } catch (e) {}
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }

  function stop() { if (synth) { try { synth.cancel(); } catch (e) {} } }

  /* speak(texte, langue, options)
     opts: { rate, pitch, onend, slow } */
  function speak(text, lang, opts) {
    opts = opts || {};
    if (!synth || !text) { if (opts.onend) setTimeout(opts.onend, 250); return false; }
    var voice = picked[lang];
    if (!voice) { if (opts.onend) setTimeout(opts.onend, 250); return false; }

    stop();
    var u = new SpeechSynthesisUtterance(String(text));
    u.voice = voice;
    u.lang = voice.lang;
    var base = App.State.get().settings.rate || 0.8;
    u.rate = Math.max(0.4, Math.min(1.2, (opts.rate || base) * (opts.slow ? 0.75 : 1)));
    u.pitch = opts.pitch || 1.05;
    u.volume = 1;
    if (opts.onend) u.onend = opts.onend;
    if (opts.onend) u.onerror = opts.onend;
    try { synth.speak(u); } catch (e) { if (opts.onend) opts.onend(); }
    return true;
  }

  /* Prononce LE SON d'une compétence (pas le nom de la lettre) */
  function sayPhoneme(sk, lang, opts) {
    var txt = sk.say || sk.label || '';
    return speak(txt, lang, Object.assign({ slow: true, pitch: 1 }, opts || {}));
  }

  /* Enchaîne plusieurs énoncés avec des pauses */
  function sequence(items, done) {
    var i = 0;
    function next() {
      if (i >= items.length) { if (done) done(); return; }
      var it = items[i++];
      if (it.pause) { setTimeout(next, it.pause); return; }
      var ok = speak(it.text, it.lang, { rate: it.rate, slow: it.slow, onend: function () { setTimeout(next, it.gap || 120); } });
      if (!ok) setTimeout(next, 320);
    }
    next();
  }

  /* --- Petits sons de retour, générés (aucun asset externe) --- */
  function tone(freqs, dur, type) {
    if (!App.State.get().settings.sound) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var t0 = ctx.currentTime;
      freqs.forEach(function (f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type || 'sine';
        o.frequency.value = f;
        var start = t0 + i * 0.085;
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        o.connect(g); g.connect(ctx.destination);
        o.start(start); o.stop(start + dur + 0.05);
      });
    } catch (e) {}
  }

  function sfxGood()  { tone([660, 880, 1320], 0.22); }
  function sfxSoft()  { tone([392, 330], 0.2, 'triangle'); }
  function sfxStar()  { tone([880, 1175, 1568, 2093], 0.3); }
  function sfxFuse()  { tone([330, 494], 0.35, 'triangle'); }

  function init() {
    if (!synth) return;
    refresh();
    if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = refresh;
    /* certains navigateurs peuplent les voix en différé */
    setTimeout(refresh, 400);
    setTimeout(refresh, 1400);
    document.addEventListener('pointerdown', unlock, { once: true });
  }

  return {
    init: init, refresh: refresh, speak: speak, sayPhoneme: sayPhoneme,
    sequence: sequence, stop: stop, has: has, listFor: listFor, onReady: onReady,
    current: function (l) { return picked[l]; },
    sfxGood: sfxGood, sfxSoft: sfxSoft, sfxStar: sfxStar, sfxFuse: sfxFuse
  };
})();
