/* =========================================================
   js/engine.js — Ouverture des missions et lecture de la progression

   Regle simple et lisible : une mission s'ouvre quand la precedente
   de la meme langue est terminee. Pas de niveau numerique, pas de
   deblocage arbitraire.
   ========================================================= */

window.App = window.App || {};

App.Engine = (function () {

  function all(lang) { return DATA.missions[lang] || []; }

  function byId(id) {
    var a = all('fr').concat(all('en'));
    for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i];
    return null;
  }

  function playable(m) { return !!(m && !m.locked && m.steps && m.steps.length); }

  /* Ouverte si : premiere de la langue, ou precedente terminee. */
  function isOpen(m) {
    var list = all(m.id.indexOf('en.') === 0 ? 'en' : 'fr');
    var i = list.indexOf(m);
    if (i <= 0) return true;
    var prev = list[i - 1];
    return App.State.isMissionDone(prev.id);
  }

  function status(m) {
    if (App.State.isMissionDone(m.id)) return 'done';
    if (!playable(m)) return 'soon';
    return isOpen(m) ? 'now' : 'locked';
  }

  /* La prochaine mission a faire dans une langue */
  function next(lang) {
    var list = all(lang);
    for (var i = 0; i < list.length; i++) {
      if (!App.State.isMissionDone(list[i].id) && playable(list[i]) && isOpen(list[i])) return list[i];
    }
    /* Tout ce qui est jouable est fait : on propose de refaire la derniere */
    for (var j = list.length - 1; j >= 0; j--) {
      if (playable(list[j])) return list[j];
    }
    return null;
  }

  function progress(lang) {
    var list = all(lang);
    if (!list.length) return 0;
    var done = 0;
    list.forEach(function (m) { if (App.State.isMissionDone(m.id)) done++; });
    return Math.round(done / list.length * 100);
  }

  function playableProgress(lang) {
    var list = all(lang).filter(playable);
    if (!list.length) return 0;
    var done = 0;
    list.forEach(function (m) { if (App.State.isMissionDone(m.id)) done++; });
    return Math.round(done / list.length * 100);
  }

  /* Missions groupees par monde, pour la carte */
  function worlds(lang) {
    var out = [];
    (DATA.worlds[lang] || []).forEach(function (w) {
      var ms = all(lang).filter(function (m) { return m.world === w.n; });
      if (ms.length) out.push({ world: w, missions: ms });
    });
    return out;
  }

  function currentWorld(lang) {
    var n = next(lang);
    return n ? n.world : 1;
  }

  /* ---------- Vue parent : les competences ---------- */

  function skillsFor(lang) {
    return (DATA[lang].skills || []).map(function (sk) {
      var m = App.State.get().mastery[sk.id];
      return {
        id: sk.id, label: sk.label, world: sk.world, type: sk.type,
        score: m ? Math.round(m.score) : 0,
        attempts: m ? m.attempts : 0,
        correct: m ? m.correct : 0,
        seen: m ? m.seen : 0,
        last: m ? m.last : null,
        dims: m ? m.dims : null
      };
    });
  }

  function stateOf(score, attempts) {
    if (!attempts) return DATA.masteryStates[0];
    var st = DATA.masteryStates[0];
    DATA.masteryStates.forEach(function (x) { if (score >= x.min) st = x; });
    return st;
  }

  /* Ce qu'il faut retravailler : vu au moins une fois, score faible */
  function toReinforce(lang) {
    return skillsFor(lang)
      .filter(function (s) { return s.attempts >= 2 && s.score < 75; })
      .sort(function (a, b) { return a.score - b.score; });
  }

  /* La progression racontee, pas chiffree (§23) */
  function narrative(lang) {
    var done = App.State.missionsDone(lang);
    var name = lang === 'fr' ? 'fran\u00e7ais' : 'anglais';
    if (!done) return 'Alexis n\'a pas encore commenc\u00e9 le parcours ' + name + '.';
    var n = next(lang);
    var weak = toReinforce(lang);
    var txt = 'Alexis a termin\u00e9 ' + done + ' mission' + (done > 1 ? 's' : '') + ' en ' + name + '. ';
    if (n && App.Engine.playable(n)) txt += 'Il travaille maintenant : ' + n.title + '. ';
    if (weak.length) txt += 'Le point le plus fragile reste ' + weak[0].label + '.';
    else if (done >= 2) txt += 'Rien ne bloque pour l\'instant.';
    return txt;
  }

  return {
    all: all, byId: byId, playable: playable, isOpen: isOpen, status: status,
    next: next, progress: progress, playableProgress: playableProgress,
    worlds: worlds, currentWorld: currentWorld,
    skillsFor: skillsFor, stateOf: stateOf, toReinforce: toReinforce, narrative: narrative
  };
})();
