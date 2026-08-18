/* =========================================================
   js/exercises.js — La bibliothèque de mécaniques (§18)
   Chaque fonction retourne une DESCRIPTION d'exercice.
   L'affichage est fait ailleurs : on peut ajouter une mécanique
   sans toucher à l'interface.
   ========================================================= */

window.App = window.App || {};

App.Exercises = (function () {

  var T = function (l, k) { return App.T(l, k); };
  var sh = function (a) { return App.Engine.shuffle(a); };

  /* ---------------- Helpers de contenu ---------------- */
  function words(lang) { return DATA[lang].words; }

  function seenSk(id) { return App.Engine.seen(id); }

  function readable(w, lang) {
    if (!w.sk || !w.sk.length) return false;
    for (var i = 0; i < w.sk.length; i++) if (!seenSk(w.sk[i])) return false;
    return true;
  }

  function readableWords(lang) {
    var r = words(lang).filter(function (w) { return readable(w, lang); });
    return r.length ? r : words(lang).filter(function (w) { return w.sk && w.lvl <= 5; });
  }

  function pictureWords(lang) {
    return words(lang).filter(function (w) { return w.e; });
  }

  function graphemes(lang) {
    return DATA[lang].skills.filter(function (s) { return s.type === 'grapheme' || s.type === 'complex'; });
  }

  var labMap = null;
  function byLabel(lang, label) {
    if (!labMap) {
      labMap = { fr: {}, en: {} };
      ['fr', 'en'].forEach(function (l) {
        graphemes(l).forEach(function (s) { labMap[l][s.label.toUpperCase()] = s; });
      });
    }
    return labMap[lang][String(label).toUpperCase()] || null;
  }

  function sayOf(lang, unit) {
    var g = byLabel(lang, unit);
    return g ? g.say : String(unit).toLowerCase();
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function pickN(arr, n, exclude) {
    var pool = arr.filter(function (x) { return !exclude || exclude.indexOf(x) === -1; });
    return sh(pool).slice(0, n);
  }

  function wordsStarting(lang, first) {
    return pictureWords(lang).filter(function (w) { return w.first === first; });
  }

  function wordsNotStarting(lang, first) {
    return pictureWords(lang).filter(function (w) { return w.first !== first && w.first; });
  }

  /* Distracteurs de lettres : on prend des graphèmes déjà rencontrés, sinon voisins */
  function letterDistractors(lang, sk, n) {
    var pool = graphemes(lang).filter(function (g) { return g.id !== sk.id && seenSk(g.id); });
    if (pool.length < n) {
      pool = pool.concat(graphemes(lang).filter(function (g) {
        return g.id !== sk.id && pool.indexOf(g) === -1;
      }));
    }
    return sh(pool).slice(0, n);
  }

  function base(step, lang, dim, instruction) {
    return {
      drill: step.drill, skillId: step.skillId, phase: step.phase,
      lang: lang, dim: dim, instruction: instruction,
      layout: 'grid3', special: null, choices: [], prompt: null, tries: 0
    };
  }

  /* =========================================================
     LES MÉCANIQUES
     ========================================================= */
  var build = {};

  /* 1 — Écouter le son, choisir la lettre */
  build['sound-to-letter'] = function (step, lang, sk) {
    if (!sk.label) return null;
    var e = base(step, lang, 'recognition', T(lang, 'q_soundToLetter'));
    e.prompt = { type: 'audio', say: sk.say, lang: lang, hint: T(lang, 'tapToHear') };
    var others = letterDistractors(lang, sk, 2);
    e.choices = sh([{ label: sk.label, correct: true, kind: 'letter' }].concat(
      others.map(function (o) { return { label: o.label, correct: false, kind: 'letter' }; })));
    e.help = lang === 'fr' ? 'Réécoute bien le son.' : 'Listen to the sound again.';
    return e;
  };

  /* 2 — Voir la lettre, retrouver son son */
  build['letter-to-sound'] = function (step, lang, sk) {
    if (!sk.label) return null;
    var e = base(step, lang, 'sound', T(lang, 'q_letterToSound'));
    e.prompt = { type: 'glyph', text: sk.label };
    var others = letterDistractors(lang, sk, 2);
    e.choices = sh([{ label: '🔊', say: sk.say, correct: true, kind: 'audio' }].concat(
      others.map(function (o) { return { label: '🔊', say: o.say, correct: false, kind: 'audio' }; })));
    e.layout = 'grid3';
    e.help = lang === 'fr' ? 'Appuie sur chaque haut-parleur et écoute.' : 'Tap each speaker and listen.';
    return e;
  };

  /* 3 — Son → image */
  /* Images candidates pour un son.
     - graphème simple : des mots qui COMMENCENT par ce son
     - graphème complexe (OU, CH, EE...) : des mots qui CONTIENNENT ce son
     - à défaut : les exemples portés par la compétence elle-même         */
  function imageCandidates(lang, sk) {
    if (!sk.lower) return null;
    var starts = wordsStarting(lang, sk.lower);
    if (sk.type !== 'complex' && starts.length) {
      return { mode: 'start', good: starts, bad: wordsNotStarting(lang, sk.lower) };
    }
    var up = sk.lower.toUpperCase();
    var inside = pictureWords(lang).filter(function (w) { return w.t.indexOf(up) >= 0; });
    var outside = pictureWords(lang).filter(function (w) { return w.t.indexOf(up) < 0; });
    if (inside.length) return { mode: 'inside', good: inside, bad: outside };
    if (sk.examples && sk.examples.length) {
      var ex = sk.examples.filter(function (x) { return x.e; })
        .map(function (x) { return { t: x.w, e: x.e }; });
      if (ex.length) {
        return {
          mode: sk.type === 'complex' ? 'inside' : 'start',
          good: ex,
          bad: pictureWords(lang).filter(function (w) { return w.t.indexOf(up) < 0; })
        };
      }
    }
    return null;
  }

  build['sound-to-image'] = function (step, lang, sk) {
    var c = imageCandidates(lang, sk);
    if (!c) return null;
    var g = pick(c.good);
    var bad = pickN(c.bad, 2);
    if (!g || bad.length < 2) return null;
    var e = base(step, lang, 'sound', T(lang, c.mode === 'inside' ? 'q_soundInside' : 'q_soundToImage'));
    e.prompt = { type: 'audio', say: sk.say, lang: lang, hint: T(lang, 'tapToHear') };
    e.choices = sh([{ label: g.e, word: g.t, correct: true, kind: 'emoji', say: g.t }].concat(
      bad.map(function (b) { return { label: b.e, word: b.t, correct: false, kind: 'emoji', say: b.t }; })));
    e.help = lang === 'fr'
      ? (c.mode === 'inside' ? 'Dis chaque mot lentement et écoute bien à l\'intérieur.' : 'Dis chaque mot dans ta tête et écoute son début.')
      : (c.mode === 'inside' ? 'Say each word slowly and listen inside it.' : 'Say each word and listen to its start.');
    return e;
  };

  /* 4 — Image → premier son */
  build['image-to-first-sound'] = function (step, lang, sk) {
    var pool = pictureWords(lang).filter(function (w) { return byLabel(lang, w.first) || byLabel(lang, (w.first || '').toUpperCase()); });
    if (!pool.length) return null;
    var w = sk.lower ? (pick(wordsStarting(lang, sk.lower) ) || pick(pool)) : pick(pool);
    var target = byLabel(lang, w.first);
    if (!target) return null;
    var others = letterDistractors(lang, target, 2);
    var e = base(step, lang, 'sound', T(lang, 'q_firstSound'));
    e.prompt = { type: 'emoji', text: w.e, say: w.t, lang: lang, caption: w.t };
    var oral = sk.type === 'phono';
    e.choices = sh([{ label: oral ? '🔊' : target.label, say: target.say, correct: true, kind: oral ? 'audio' : 'letter' }].concat(
      others.map(function (o) { return { label: oral ? '🔊' : o.label, say: o.say, correct: false, kind: oral ? 'audio' : 'letter' }; })));
    e.help = lang === 'fr' ? 'Répète le mot tout doucement.' : 'Say the word slowly.';
    return e;
  };

  /* 5 — Fusion orale : j'entends les sons séparés, je devine le mot */
  build['blend-oral'] = function (step, lang, sk) {
    var pool = readableWords(lang).filter(function (w) { return w.u && w.u.length <= 4 && w.e; });
    if (pool.length < 3) pool = pictureWords(lang).filter(function (w) { return w.s && w.s.length <= 2; });
    if (pool.length < 3) return null;
    var w = pick(pool);
    var bad = pickN(pool, 2, [w]);
    var e = base(step, lang, 'sound', T(lang, 'q_blendOral'));
    var parts = (w.u || w.s || []).map(function (u) { return sayOf(lang, u); });
    e.prompt = { type: 'audio-seq', parts: parts, whole: w.t, lang: lang, hint: T(lang, 'tapToHear') };
    e.choices = sh([{ label: w.e, correct: true, kind: 'emoji', say: w.t }].concat(
      bad.map(function (b) { return { label: b.e, correct: false, kind: 'emoji', say: b.t }; })));
    e.help = lang === 'fr' ? 'Colle les sons dans ta tête.' : 'Push the sounds together in your head.';
    return e;
  };

  /* 6 — LA FUSION VISUELLE (signature du produit) */
  build['blend'] = function (step, lang, sk) {
    var list = (DATA[lang].syllables || {})[sk.id];
    if (!list || !list.length) {
      var all = [];
      for (var k in DATA[lang].syllables) all = all.concat(DATA[lang].syllables[k]);
      list = all;
    }
    if (!list.length) return null;
    var target = pick(list);
    var a = target.length > 2 ? target.charAt(0) : target.charAt(0);
    var b = target.slice(1);
    var e = base(step, lang, 'reading', T(lang, 'q_blend'));
    e.special = 'blend';
    e.blend = { a: a, b: b, result: target, sayA: sayOf(lang, a), sayB: sayOf(lang, b), sayR: target.toLowerCase() };
    var bad = pickN(list, 2, [target]);
    while (bad.length < 2) bad.push(pick(list.concat(['LO', 'RI', 'TU'])));
    e.question = T(lang, 'q_blendPick');
    e.choices = sh([{ label: target, correct: true, kind: 'word' }].concat(
      bad.map(function (x) { return { label: x, correct: false, kind: 'word' }; })));
    e.help = lang === 'fr' ? 'Regarde encore les deux sons se coller.' : 'Watch the two sounds join again.';
    return e;
  };

  /* 7 — Lire une syllabe */
  build['syllable-read'] = function (step, lang, sk) {
    var all = [];
    for (var k in (DATA[lang].syllables || {})) all = all.concat(DATA[lang].syllables[k]);
    if (all.length < 3) return null;
    var target = pick(all);
    var bad = pickN(all, 2, [target]);
    var e = base(step, lang, 'reading', T(lang, 'q_syllableRead'));
    e.prompt = { type: 'audio', say: target.toLowerCase(), lang: lang, hint: T(lang, 'tapToHear') };
    e.choices = sh([{ label: target, correct: true, kind: 'word' }].concat(
      bad.map(function (x) { return { label: x, correct: false, kind: 'word' }; })));
    return e;
  };

  /* 8 — Segmentation : combien de sons ? */
  build['segment'] = function (step, lang, sk) {
    var pool = readableWords(lang).filter(function (w) { return w.u && w.u.length >= 2 && w.u.length <= 5; });
    if (!pool.length) return null;
    var w = pick(pool);
    var n = w.u.length;
    var opts = [n];
    while (opts.length < 3) {
      var c = Math.max(2, n + (Math.random() < 0.5 ? -1 : 1) + (opts.length === 2 ? 1 : 0));
      if (opts.indexOf(c) === -1) opts.push(c);
    }
    var e = base(step, lang, 'sound', T(lang, 'q_segment'));
    e.prompt = { type: 'audio-word', say: w.t, text: w.t, lang: lang, hint: T(lang, 'tapToHear') };
    e.choices = sh(opts.map(function (o) { return { label: String(o), correct: o === n, kind: 'word' }; }));
    e.help = lang === 'fr' ? 'Compte sur tes doigts.' : 'Count on your fingers.';
    return e;
  };

  /* 9 — Construire le mot (modèle visible) */
  build['word-builder'] = function (step, lang, sk) {
    var pool = readableWords(lang).filter(function (w) { return w.u && w.u.length >= 2 && w.u.length <= 5 && w.e; });
    if (!pool.length) return null;
    var w = pick(pool);
    var e = base(step, lang, 'reading', T(lang, 'q_builder'));
    e.special = 'builder';
    e.builder = {
      target: w.u.slice(), word: w.t, emoji: w.e,
      bank: sh(w.u.concat(pickN(['A', 'O', 'I', 'S', 'T', 'M', 'L', 'P', 'R', 'U'], 1, w.u))),
      showModel: true, kind: 'letters'
    };
    e.prompt = { type: 'emoji', text: w.e, say: w.t, lang: lang };
    return e;
  };

  /* 10 — Remettre les lettres dans l'ordre (pas de modèle) */
  build['letter-order'] = function (step, lang, sk) {
    var pool = readableWords(lang).filter(function (w) { return w.u && w.u.length >= 3 && w.u.length <= 5 && w.e; });
    if (!pool.length) return null;
    var w = pick(pool);
    var e = base(step, lang, 'reading', T(lang, 'q_order'));
    e.special = 'builder';
    e.builder = { target: w.u.slice(), word: w.t, emoji: w.e, bank: sh(w.u.slice()), showModel: false, kind: 'letters' };
    e.prompt = { type: 'emoji', text: w.e, say: w.t, lang: lang };
    return e;
  };

  /* 11 — Lire le mot puis choisir l'image (§22 : l'image ne donne pas la réponse) */
  build['word-to-image'] = function (step, lang, sk) {
    var pool = readableWords(lang).filter(function (w) { return w.e; });
    if (pool.length < 3) return null;
    var w = pick(pool);
    var bad = pickN(pool, 2, [w]);
    var e = base(step, lang, 'reading', T(lang, 'q_wordToImage'));
    e.prompt = { type: 'word', text: w.t, say: w.t, lang: lang, silent: true };
    e.choices = sh([{ label: w.e, correct: true, kind: 'emoji', say: w.t }].concat(
      bad.map(function (b) { return { label: b.e, correct: false, kind: 'emoji', say: b.t }; })));
    e.help = lang === 'fr' ? 'Lis le mot lettre par lettre.' : 'Sound the word out, letter by letter.';
    return e;
  };

  /* 12 — Image → mot écrit */
  build['image-to-word'] = function (step, lang, sk) {
    var pool = readableWords(lang).filter(function (w) { return w.e; });
    if (pool.length < 3) return null;
    var w = pick(pool);
    var bad = pickN(pool, 2, [w]);
    var e = base(step, lang, 'reading', T(lang, 'q_imageToWord'));
    e.prompt = { type: 'emoji', text: w.e };
    e.layout = 'stack';
    e.choices = sh([{ label: w.t, correct: true, kind: 'word' }].concat(
      bad.map(function (b) { return { label: b.t, correct: false, kind: 'word' }; })));
    return e;
  };

  /* 13 — Compter les syllabes (oral) */
  build['syllable-count'] = function (step, lang, sk) {
    var pool = pictureWords(lang).filter(function (w) { return w.s && w.s.length; });
    if (!pool.length) return null;
    var w = pick(pool);
    var n = w.s.length;
    var opts = [1, 2, 3];
    if (n > 3) opts = [2, 3, 4];
    var e = base(step, lang, 'sound', T(lang, 'q_syllableCount'));
    e.prompt = { type: 'emoji', text: w.e, say: w.t, lang: lang, caption: '', autoplay: true };
    e.choices = opts.map(function (o) { return { label: String(o), correct: o === n, kind: 'word' }; });
    e.help = lang === 'fr' ? 'Tape dans tes mains en disant le mot.' : 'Clap the word out loud.';
    return e;
  };

  /* 14 — Rimes */
  build['rhyme'] = function (step, lang, sk) {
    var set = DATA[lang].rhymes;
    if (!set || !set.length) return null;
    var r = pick(set);
    var e = base(step, lang, 'sound', T(lang, 'q_rhyme') + ' ' + r.target.t + ' ?');
    e.prompt = { type: 'emoji', text: r.target.e, say: r.target.t, lang: lang, caption: r.target.t, autoplay: true };
    e.choices = sh([{ label: r.good.e, correct: true, kind: 'emoji', say: r.good.t }].concat(
      r.bad.slice(0, 2).map(function (b) { return { label: b.e, correct: false, kind: 'emoji', say: b.t }; })));
    e.help = lang === 'fr' ? 'Écoute la fin des mots.' : 'Listen to the end of each word.';
    return e;
  };

  /* 15 — Mots-outils */
  build['tricky-word'] = function (step, lang, sk) {
    var list = DATA[lang].tricky;
    if (!list || list.length < 3) return null;
    var w = pick(list);
    var bad = pickN(list, 2, [w]);
    var e = base(step, lang, 'reading', T(lang, 'q_tricky'));
    e.prompt = { type: 'audio', say: w, lang: lang, hint: T(lang, 'tapToHear') };
    e.layout = 'grid3';
    e.choices = sh([{ label: w, correct: true, kind: 'word' }].concat(
      bad.map(function (b) { return { label: b, correct: false, kind: 'word' }; })));
    return e;
  };

  /* 16 — Lire une phrase */
  build['sentence-read'] = function (step, lang, sk) {
    var list = (DATA[lang].sentences || []).filter(function (s) {
      return !s.sk || s.sk.every(seenSk);
    });
    if (!list.length) list = DATA[lang].sentences || [];
    if (!list.length) return null;
    var s = pick(list);
    var e = base(step, lang, 'reading', T(lang, 'q_sentenceRead'));
    e.special = 'sentence';
    e.sentence = { text: s.t, words: s.t.replace(/\s+/g, ' ').trim().split(' '), emoji: s.e };
    e.hint = T(lang, 'tapWords');
    return e;
  };

  /* 17 — Remettre la phrase dans l'ordre */
  build['sentence-order'] = function (step, lang, sk) {
    var list = (DATA[lang].sentences || []).filter(function (s) { return !s.sk || s.sk.every(seenSk); });
    if (!list.length) return null;
    var s = pick(list);
    var ws = s.t.replace(/\.$/, '').split(' ');
    var e = base(step, lang, 'reading', T(lang, 'q_sentenceOrder'));
    e.special = 'builder';
    e.builder = { target: ws.slice(), word: s.t, emoji: s.e, bank: sh(ws.slice()), showModel: false, kind: 'words' };
    e.prompt = { type: 'audio', say: s.t, lang: lang, hint: T(lang, 'tapToHear') };
    return e;
  };

  /* 18 — Compréhension */
  build['comprehension'] = function (step, lang, sk) {
    var list = (DATA[lang].sentences || []).filter(function (s) { return s.q; });
    if (!list.length) return null;
    var s = pick(list);
    var e = base(step, lang, 'reading', T(lang, 'q_comprehension'));
    e.special = 'comprehension';
    e.reading = { text: s.t, emoji: s.e };
    e.question = s.q.q;
    e.layout = 'stack';
    e.choices = sh(s.q.options.map(function (o, i) {
      return { label: o, correct: i === s.q.a, kind: 'text' };
    }));
    return e;
  };

  /* 19 — Mission bilingue (§23) */
  build['bilingual'] = function (step, lang) {
    var b = pick(DATA.bilingual);
    var e = base(step, lang, 'sound', T(lang, 'q_bilingual'));
    e.special = 'bilingual';
    e.bi = b;
    e.skillId = null;
    e.question = b.question_fr;
    e.choices = [
      { label: T(lang, 'same'), value: 'same', correct: b.answer === 'same', kind: 'text' },
      { label: T(lang, 'different'), value: 'different', correct: b.answer === 'different', kind: 'text' }
    ];
    e.layout = 'grid2';
    return e;
  };

  /* ---------------- Point d'entrée ---------------- */
  function make(step, lang) {
    var sk = step.skillId ? App.Engine.byId(step.skillId) : null;
    var fn = build[step.drill];
    if (!fn) return null;
    var ex;
    try { ex = fn(step, lang, sk); } catch (e) { ex = null; }
    if (!ex) return null;
    ex.skill = sk;
    return ex;
  }

  /* Fabrique une carte "nouvelle notion" */
  function teach(step, lang) {
    var sk = App.Engine.byId(step.skillId);
    if (!sk) return null;
    return {
      drill: 'teach', special: 'teach', skillId: sk.id, skill: sk, lang: lang, phase: step.phase,
      instruction: sk.type === 'grapheme' || sk.type === 'complex' ? T(lang, 'newSound') : T(lang, 'discover')
    };
  }

  function available() { return Object.keys(build); }

  return { make: make, teach: teach, available: available, readableWords: readableWords };
})();
