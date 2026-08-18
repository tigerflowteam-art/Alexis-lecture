/* =========================================================
   js/engine.js — Le moteur adaptatif (§12, §13, §14, §15, §45)
   Il décide : quelle langue, quelle compétence, quelle difficulté,
   quel exercice, quelle révision. L'enfant ne choisit rien.
   ========================================================= */

window.App = window.App || {};

App.Engine = (function () {

  var DAY = 86400000;
  var MASTER = 85;      /* seuil "maîtrisée" */
  var UNLOCK = 55;      /* seuil de prérequis suffisant pour ouvrir la suite */

  function skills(lang) { return DATA[lang].skills; }

  var index = null;
  function byId(id) {
    if (!index) {
      index = {};
      ['fr', 'en'].forEach(function (l) {
        DATA[l].skills.forEach(function (sk) { sk.lang = l; index[sk.id] = sk; });
      });
    }
    return index[id];
  }
  function ensureIndex() { byId('x'); }

  function score(id) {
    var st = App.State.get();
    return st.mastery[id] ? st.mastery[id].score : 0;
  }
  function seen(id) { return App.State.isSeen(id); }

  function masteryState(sc) {
    if (sc >= MASTER) return 'mastered';
    if (sc >= 60) return 'consolidation';
    if (sc >= 30) return 'learning';
    return 'discovery';
  }

  /* Le déblocage se fait par compétence, pas par numéro de niveau (§12) */
  function isUnlocked(sk) {
    if (!sk.prereq || !sk.prereq.length) return true;
    for (var i = 0; i < sk.prereq.length; i++) {
      if (score(sk.prereq[i]) < UNLOCK) return false;
    }
    return true;
  }

  function unlocked(lang) { return skills(lang).filter(isUnlocked); }
  function introduced(lang) { return skills(lang).filter(function (sk) { return seen(sk.id); }); }

  function nextNew(lang) {
    var list = skills(lang);
    for (var i = 0; i < list.length; i++) {
      if (!seen(list[i].id) && isUnlocked(list[i])) return list[i];
    }
    /* tout est vu : on renvoie la plus fragile */
    var w = weak(lang);
    return w.length ? w[0] : list[list.length - 1];
  }

  /* Priorité de révision = faiblesse + oubli + taux d'erreur (§14) */
  function priority(sk) {
    var st = App.State.get();
    var m = st.mastery[sk.id];
    if (!m) return 0;
    var days = m.last ? (Date.now() - m.last) / DAY : 5;
    var err = m.attempts ? 1 - (m.correct / m.attempts) : 0;
    return (100 - m.score) * 0.6 + Math.min(days, 14) * 7 + err * 40;
  }

  function weak(lang) {
    return introduced(lang)
      .filter(function (sk) { return score(sk.id) < MASTER; })
      .sort(function (a, b) { return priority(b) - priority(a); });
  }

  function mastered(lang) {
    return introduced(lang).filter(function (sk) { return score(sk.id) >= MASTER; });
  }

  function reviewPool(lang) {
    /* on révise aussi ce qui est maîtrisé mais ancien (répétition espacée) */
    return introduced(lang).sort(function (a, b) { return priority(b) - priority(a); });
  }

  function currentWorld(lang) {
    var n = nextNew(lang);
    return n ? n.world : 10;
  }

  function progress(lang) {
    var list = skills(lang), sum = 0;
    for (var i = 0; i < list.length; i++) sum += Math.min(score(list[i].id), 100);
    return Math.round(sum / (list.length * 100) * 100);
  }

  function worldState(lang, n) {
    var inWorld = skills(lang).filter(function (sk) { return sk.world === n; });
    var done = inWorld.filter(function (sk) { return score(sk.id) >= MASTER; }).length;
    var open = inWorld.some(isUnlocked);
    if (done === inWorld.length && inWorld.length) return 'done';
    if (open) return 'current';
    return 'locked';
  }

  /* ---------- Choix du drill le plus utile pour une compétence ---------- */
  function pickDrill(sk, avoid) {
    var list = (sk.drills || []).filter(function (d) { return d !== avoid; });
    if (!list.length) list = sk.drills || ['sound-to-letter'];
    var st = App.State.get().mastery[sk.id];
    /* on travaille en priorité la dimension la plus faible */
    if (st) {
      var d = st.dims;
      var wanted = null;
      if (d.reading <= d.recognition && d.reading <= d.sound) wanted = ['word-to-image', 'image-to-word', 'sentence-read', 'letter-order', 'syllable-read'];
      else if (d.sound <= d.recognition) wanted = ['sound-to-letter', 'sound-to-image', 'letter-to-sound', 'blend'];
      else wanted = ['image-to-first-sound', 'word-builder', 'segment', 'rhyme'];
      for (var i = 0; i < wanted.length; i++) if (list.indexOf(wanted[i]) !== -1) return wanted[i];
    }
    return list[Math.floor(Math.random() * list.length)];
  }

  /* =========================================================
     LA SÉANCE DU JOUR (§15, §17)
     réactivation → nouvelle notion → manipulation → décodage
     → lecture → compréhension → récompense
     ========================================================= */
  function buildSession(lang, mode) {
    ensureIndex();
    var plan = [];
    var pool = reviewPool(lang);
    var isRevision = mode === 'revision';

    /* --- 1. Réactivation --- */
    var review = (isRevision ? weak(lang) : pool).slice(0, isRevision ? 6 : 2);
    review.forEach(function (sk) {
      plan.push({ kind: 'drill', skillId: sk.id, drill: pickDrill(sk), phase: 'reactivation' });
    });

    if (isRevision) {
      if (!plan.length) {
        var n0 = nextNew(lang);
        plan.push({ kind: 'teach', skillId: n0.id, phase: 'new' });
        plan.push({ kind: 'drill', skillId: n0.id, drill: pickDrill(n0), phase: 'new' });
      }
      return { lang: lang, mode: 'revision', steps: plan };
    }

    /* --- 2. Une seule nouvelle notion --- */
    var nx = nextNew(lang);
    if (nx) {
      if (!seen(nx.id)) plan.push({ kind: 'teach', skillId: nx.id, phase: 'new' });
      var d1 = pickDrill(nx);
      plan.push({ kind: 'drill', skillId: nx.id, drill: d1, phase: 'new' });
      plan.push({ kind: 'drill', skillId: nx.id, drill: pickDrill(nx, d1), phase: 'practice' });
    }

    /* --- 3. Manipulation : fusion ou construction --- */
    var manip = pickWithDrill(lang, ['blend', 'word-builder', 'segment', 'blend-oral']);
    if (manip) plan.push({ kind: 'drill', skillId: manip.sk.id, drill: manip.drill, phase: 'manipulation' });

    /* --- 4. Décodage : syllabe ou mot --- */
    var dec = pickWithDrill(lang, ['syllable-read', 'word-to-image', 'image-to-word', 'letter-order']);
    if (dec) plan.push({ kind: 'drill', skillId: dec.sk.id, drill: dec.drill, phase: 'decoding' });

    /* --- 5. Lecture d'une phrase, si le niveau le permet --- */
    var sent = pickWithDrill(lang, ['sentence-read']);
    if (sent) plan.push({ kind: 'drill', skillId: sent.sk.id, drill: 'sentence-read', phase: 'reading' });

    /* --- 6. Compréhension, seulement quand la lecture existe --- */
    var comp = pickWithDrill(lang, ['comprehension']);
    if (comp) plan.push({ kind: 'drill', skillId: comp.sk.id, drill: 'comprehension', phase: 'understanding' });

    /* --- 6bis. Mission bilingue, seulement si les deux bases tiennent (§23) --- */
    if (mastered('fr').length >= 4 && mastered('en').length >= 4 && Math.random() < 0.35) {
      plan.push({ kind: 'drill', skillId: null, drill: 'bilingual', phase: 'bilingual' });
    }

    /* --- Les tout premiers jours, il n'y a presque rien à réviser :
           on ajoute de la pratique sur la notion du jour plutôt que de
           livrer une séance de 3 étapes. --- */
    var min = Math.min(5, App.State.get().settings.sessionSteps || 7);
    var guard = 0;
    while (plan.length < min && nx && guard++ < 4) {
      plan.push({ kind: 'drill', skillId: nx.id, drill: pickDrill(nx), phase: 'practice' });
    }

    /* --- Longueur cible : séance courte (§16) --- */
    var max = App.State.get().settings.sessionSteps || 7;
    if (plan.length > max) plan = plan.slice(0, max);

    /* Filet de sécurité : jamais une séance vide */
    if (!plan.length) {
      var f = skills(lang)[0];
      plan.push({ kind: 'teach', skillId: f.id, phase: 'new' });
      plan.push({ kind: 'drill', skillId: f.id, drill: f.drills[0], phase: 'new' });
    }
    return { lang: lang, mode: 'daily', steps: plan };
  }

  function pickWithDrill(lang, drills) {
    var cands = [];
    unlocked(lang).forEach(function (sk) {
      if (!seen(sk.id)) return;
      (sk.drills || []).forEach(function (d) {
        if (drills.indexOf(d) !== -1) cands.push({ sk: sk, drill: d, p: priority(sk) + 1 });
      });
    });
    if (!cands.length) return null;
    cands.sort(function (a, b) { return b.p - a.p; });
    /* un peu d'aléatoire dans le haut du panier pour éviter la répétition */
    var top = cands.slice(0, Math.min(4, cands.length));
    return top[Math.floor(Math.random() * top.length)];
  }

  /* ---------- Ce que le parent doit comprendre (§35) ---------- */
  function narrative(lang) {
    var m = mastered(lang), w = weak(lang), intro = introduced(lang);
    var L = lang === 'fr' ? 'français' : 'anglais';
    if (!intro.length) return 'Alexis n\'a pas encore commencé le parcours ' + L + '.';
    var out = [];
    if (m.length) {
      out.push('Alexis reconnaît sans hésiter ' + m.length + ' élément' + (m.length > 1 ? 's' : '') +
               ' en ' + L + ' (' + m.slice(0, 4).map(lab).join(', ') + (m.length > 4 ? '…' : '') + ').');
    } else {
      out.push('Alexis découvre ses premiers sons en ' + L + '. Rien n\'est encore automatisé, c\'est normal.');
    }
    var world = currentWorld(lang);
    var wd = DATA.worlds[lang][world - 1];
    if (wd) out.push('Il travaille actuellement « ' + wd.title + ' » : ' + wd.sub.toLowerCase() + '.');
    var hard = w.slice(0, 3);
    if (hard.length) {
      out.push('À renforcer en priorité : ' + hard.map(lab).join(', ') + '.');
    }
    return out.join(' ');
  }

  function lab(sk) { return sk.label || sk.short || sk.id; }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  return {
    MASTER: MASTER,
    skills: skills, byId: byId, score: score, seen: seen,
    masteryState: masteryState, isUnlocked: isUnlocked,
    unlocked: unlocked, introduced: introduced, weak: weak, mastered: mastered,
    nextNew: nextNew, currentWorld: currentWorld, progress: progress, worldState: worldState,
    buildSession: buildSession, narrative: narrative, shuffle: shuffle,
    priority: priority
  };
})();
