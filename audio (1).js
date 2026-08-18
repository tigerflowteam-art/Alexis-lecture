/* =========================================================
   js/audio.js — Architecture audio (V2)

   Principe : l'application ne parle JAMAIS directement a la synthese
   vocale. Elle demande une CLE audio. La couche ci-dessous decide :

     1. un enregistrement existe dans assets/audio/... ?  -> on le joue
     2. sinon -> repli sur la synthese, en dernier recours

   Le jour ou les enregistrements professionnels arrivent, il suffit de
   deposer les fichiers au bon endroit : aucune ligne de code a changer.

   Forme d'une cle :  lang:type:slug
     fr:phoneme:m      -> assets/audio/fr/phoneme/m.mp3
     fr:word:moto      -> assets/audio/fr/word/moto.mp3
     fr:ui:bravo       -> assets/audio/fr/ui/bravo.mp3
     en:story:sam-1    -> assets/audio/en/story/sam-1.mp3
   ========================================================= */

window.App = window.App || {};

App.Audio = (function () {

  var BASE = 'assets/audio/';
  var known = {};      /* cle -> 'file' | 'missing' */
  var cache = {};      /* cle -> HTMLAudioElement pret */
  var voices = [];
  var ready = [];
  var current = null;

  /* ---------- Resolution d'une cle ---------- */

  function parse(key) {
    var p = String(key).split(':');
    if (p.length < 3) return null;
    return { lang: p[0], type: p[1], slug: p.slice(2).join('-') };
  }

  function slugify(s) {
    return String(s).toLowerCase()
      .replace(/[\u00e0\u00e2\u00e4]/g, 'a').replace(/[\u00e9\u00e8\u00ea\u00eb]/g, 'e')
      .replace(/[\u00ee\u00ef]/g, 'i').replace(/[\u00f4\u00f6]/g, 'o')
      .replace(/[\u00f9\u00fb\u00fc]/g, 'u').replace(/\u00e7/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function path(key) {
    var p = parse(key);
    if (!p) return null;
    return BASE + p.lang + '/' + p.type + '/' + p.slug + '.mp3';
  }

  /* Texte de repli : ce que la synthese doit dire si le fichier manque. */
  function fallback(key) {
    var m = window.DATA && DATA.audio && DATA.audio.map[key];
    if (m) return m;
    var p = parse(key);
    if (!p) return null;
    return { text: p.slug.replace(/-/g, ' '), lang: p.lang };
  }

  /* ---------- Lecture ---------- */

  function stop() {
    if (current) {
      try { current.pause(); current.currentTime = 0; } catch (e) {}
      current = null;
    }
    if (window.speechSynthesis) { try { speechSynthesis.cancel(); } catch (e) {} }
  }

  function play(key, opts) {
    opts = opts || {};
    if (opts.stopFirst !== false) stop();
    if (!App.State.get().settings.sound) return Promise.resolve();

    var p = (known[key] === 'missing')
      ? synth(key, opts)
      : file(key, opts).catch(function () { return synth(key, opts); });

    /* Filet de securite : une promesse audio qui ne se resout pas figerait
       l'etayage et bloquerait la mission. On borne systematiquement. */
    return settle(p, 5000);
  }

  function settle(p, ms) {
    return new Promise(function (resolve) {
      var done = false;
      function fin() { if (!done) { done = true; resolve(); } }
      try { p.then(fin, fin); } catch (e) { fin(); }
      setTimeout(fin, ms);
    });
  }

  function file(key, opts) {
    return new Promise(function (resolve, reject) {
      var src = path(key);
      if (!src || !window.Audio) return reject();

      var a = cache[key];
      if (!a) { a = new window.Audio(src); a.preload = 'auto'; }

      var done = false;
      function ok() { if (!done) { done = true; known[key] = 'file'; cache[key] = a; resolve(); } }
      function ko() { if (!done) { done = true; known[key] = 'missing'; reject(); } }

      a.onended = ok;
      a.onerror = ko;
      try { a.playbackRate = opts.rate || App.State.get().settings.rate || 1; } catch (e) {}
      current = a;

      var p = a.play();
      if (p && p.catch) p.catch(ko);
      setTimeout(function () { if (!done && !a.readyState) ko(); }, 1000);
    });
  }

  /* ---------- Repli : synthese vocale ---------- */

  function synth(key, opts) {
    var f = fallback(key);
    if (!f) return Promise.resolve();
    return speak(f.text, f.lang, opts);
  }

  function pickVoice(lang) {
    var want = lang === 'en' ? 'en' : 'fr';
    var pref = lang === 'en'
      ? ['Samantha', 'Google UK English Female', 'Google US English', 'Zira', 'Karen', 'Daniel']
      : ['Amelie', 'Am\u00e9lie', 'Google fran\u00e7ais', 'Hortense', 'Thomas', 'Audrey'];
    var pool = voices.filter(function (v) { return (v.lang || '').toLowerCase().indexOf(want) === 0; });
    if (!pool.length) return null;
    for (var i = 0; i < pref.length; i++) {
      for (var j = 0; j < pool.length; j++) {
        if (pool[j].name.indexOf(pref[i]) >= 0) return pool[j];
      }
    }
    var local = pool.filter(function (v) { return v.localService; });
    return local[0] || pool[0];
  }

  /* Regle absolue : jamais d'anglais avec une voix francaise (et l'inverse). */
  function speak(text, lang, opts) {
    opts = opts || {};
    if (!window.speechSynthesis || !text) return Promise.resolve();
    var v = pickVoice(lang);
    if (!v) return Promise.resolve();

    return new Promise(function (resolve) {
      var u = new window.SpeechSynthesisUtterance(text);
      u.voice = v;
      u.lang = v.lang;
      u.rate = opts.rate || App.State.get().settings.rate || 0.85;
      u.pitch = 1.05;
      u.onend = resolve;
      u.onerror = resolve;
      try { speechSynthesis.speak(u); } catch (e) { resolve(); }
      setTimeout(resolve, 420 + String(text).length * 130);
    });
  }

  /* Enchainer plusieurs cles : ['fr:phoneme:m','fr:phoneme:a','fr:syll:ma'] */
  function sequence(keys, gap) {
    var i = 0;
    stop();
    function step() {
      if (i >= keys.length) return Promise.resolve();
      var k = keys[i++];
      return play(k, { stopFirst: false })
        .then(function () { return new Promise(function (r) { setTimeout(r, gap == null ? 240 : gap); }); })
        .then(step, step);
    }
    return step();
  }

  /* ---------- Effets, generes sans aucun fichier ---------- */

  function tone(freqs, dur, type) {
    if (!App.State.get().settings.sound) return;
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      var ctx = App.Audio._ctx || (App.Audio._ctx = new C());
      var t0 = ctx.currentTime;
      freqs.forEach(function (f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(f, t0 + i * dur);
        g.gain.setValueAtTime(0.0001, t0 + i * dur);
        g.gain.exponentialRampToValueAtTime(0.16, t0 + i * dur + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * dur + dur);
        o.connect(g); g.connect(ctx.destination);
        o.start(t0 + i * dur); o.stop(t0 + i * dur + dur + 0.02);
      });
    } catch (e) {}
  }

  var sfx = {
    good:   function () { tone([660, 880], 0.11); },
    great:  function () { tone([523, 659, 784, 1047], 0.1); },
    soft:   function () { tone([392, 349], 0.13); },
    pop:    function () { tone([520], 0.07, 'triangle'); },
    unlock: function () { tone([523, 784, 1047, 1319], 0.13); }
  };

  /* ---------- Voix disponibles ---------- */

  function refresh() {
    if (!window.speechSynthesis) return;
    voices = speechSynthesis.getVoices() || [];
    if (voices.length) { ready.forEach(function (f) { f(); }); ready = []; }
  }

  function init() {
    refresh();
    if (window.speechSynthesis) {
      speechSynthesis.onvoiceschanged = refresh;
      setTimeout(refresh, 300);
      setTimeout(refresh, 1200);
    }
  }

  return {
    init: init,
    play: play,
    sequence: sequence,
    speak: speak,
    stop: stop,
    sfx: sfx,
    slugify: slugify,
    path: path,
    has: function (lang) { return !!pickVoice(lang); },
    hasRecordings: function () {
      for (var k in known) { if (known[k] === 'file') return true; }
      return false;
    },
    listFor: function (lang) {
      var want = lang === 'en' ? 'en' : 'fr';
      return voices.filter(function (v) { return (v.lang || '').toLowerCase().indexOf(want) === 0; });
    },
    onReady: function (f) { if (voices.length) f(); else ready.push(f); },

    /* Raccourcis lisibles depuis le reste du code */
    phoneme: function (lang, s) { return play(lang + ':phoneme:' + slugify(s)); },
    word:    function (lang, w) { return play(lang + ':word:' + slugify(w)); },
    syll:    function (lang, s) { return play(lang + ':syll:' + slugify(s)); },
    ui:      function (lang, k) { return play(lang + ':ui:' + k); },
    line:    function (lang, i) { return play(lang + ':line:' + i); }
  };
})();
