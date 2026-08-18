/* =========================================================
   js/state.js — État de l'enfant, persistance locale
   Aucun backend (§7). Tout vit dans localStorage.
   ========================================================= */

window.App = window.App || {};

App.State = (function () {

  var KEY = 'alexis.reading.v1';
  var s = null;

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function fresh() {
    return {
      v: 1,
      child: { name: 'Alexis', avatar: 'fox', accessory: null },
      /* 0 = dimanche. Planning par défaut du cahier des charges §7 */
      schedule: { 1: 'fr', 2: 'en', 3: 'fr', 4: 'en', 5: 'fr', 6: 'en', 0: 'free' },
      overrideLang: null,
      overrideDate: null,
      mastery: {},              /* skillId -> { score, dims, attempts, correct, seen, last } */
      stars: 0,
      badges: [],
      booksRead: [],
      favorites: [],
      accessories: [],
      counters: { wordsRead: 0, sentencesRead: 0, bilingual: 0 },
      days: {},                 /* '2026-08-17' -> { fr: seconds, en: seconds } */
      streak: 0,
      lastDay: null,
      settings: { rate: 0.8, sessionSteps: 7, voiceFr: '', voiceEn: '', sound: true },
      log: []                   /* historique court des séances */
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      s = raw ? JSON.parse(raw) : fresh();
    } catch (e) { s = fresh(); }
    if (!s || s.v !== 1) s = fresh();
    touchDay();
    return s;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  function reset() { s = fresh(); save(); }

  function get() { return s; }

  function touchDay() {
    var t = today();
    if (!s.days[t]) s.days[t] = { fr: 0, en: 0 };
    if (s.lastDay !== t) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yk = y.getFullYear() + '-' + pad(y.getMonth() + 1) + '-' + pad(y.getDate());
      s.streak = (s.lastDay === yk) ? s.streak + 1 : 1;
      s.lastDay = t;
      save();
    }
  }

  function addTime(lang, seconds) {
    touchDay();
    var d = s.days[today()];
    d[lang] = (d[lang] || 0) + seconds;
    save();
  }

  /* --- Maîtrise --- */
  function skill(id) {
    if (!s.mastery[id]) {
      s.mastery[id] = {
        score: 0, attempts: 0, correct: 0, seen: 0, last: null,
        dims: { recognition: 0, sound: 0, reading: 0 }
      };
    }
    return s.mastery[id];
  }

  function isSeen(id) { return !!s.mastery[id]; }

  /* Moyenne mobile : une compétence ne devient jamais "maîtrisée"
     sur une seule bonne réponse (§13). */
  function record(id, dim, ok) {
    var m = skill(id);
    m.attempts += 1;
    if (ok) m.correct += 1;
    m.last = Date.now();

    var target = ok ? 100 : 0;
    /* poids décroissant : les premières réponses bougent plus le score */
    var w = Math.max(0.16, 0.5 - m.attempts * 0.02);
    m.score = Math.round(m.score + (target - m.score) * w);

    if (dim && m.dims[dim] !== undefined) {
      m.dims[dim] = Math.round(m.dims[dim] + (target - m.dims[dim]) * 0.34);
    }
    /* Plafond tant qu'il n'y a pas assez de tentatives dans le temps */
    if (m.attempts < 4 && m.score > 70) m.score = 70;
    if (m.attempts < 8 && m.score > 88) m.score = 88;
    save();
    return m;
  }

  function markSeen(id) {
    var m = skill(id);
    m.seen += 1;
    if (!m.last) m.last = Date.now();
    save();
  }

  function addStars(n) { s.stars += n; save(); }

  function bump(counter, n) {
    s.counters[counter] = (s.counters[counter] || 0) + (n || 1);
    save();
  }

  function langOfDay() {
    if (s.overrideLang && s.overrideDate === today()) return s.overrideLang;
    var day = new Date().getDay();
    var l = s.schedule[day];
    if (l === 'free' || !l) {
      /* Dimanche : on propose la langue la moins travaillée cette semaine */
      var t = weekTotals();
      return t.fr <= t.en ? 'fr' : 'en';
    }
    return l;
  }

  function setOverride(lang) {
    s.overrideLang = lang;
    s.overrideDate = today();
    save();
  }

  function weekTotals() {
    var out = { fr: 0, en: 0 };
    var d = new Date();
    for (var i = 0; i < 7; i++) {
      var k = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
      if (s.days[k]) { out.fr += s.days[k].fr || 0; out.en += s.days[k].en || 0; }
      d.setDate(d.getDate() - 1);
    }
    return out;
  }

  return {
    load: load, save: save, reset: reset, get: get,
    today: today, addTime: addTime, weekTotals: weekTotals,
    skill: skill, isSeen: isSeen, record: record, markSeen: markSeen,
    addStars: addStars, bump: bump,
    langOfDay: langOfDay, setOverride: setOverride
  };
})();
