/* =========================================================
   js/mission.js — Le deroule d'une mission

   Gere : la barre d'etapes, les phases affichees, le feedback
   bienveillant, l'ETAYAGE (§16) et l'ecran de fin.

   Etayage : apres deux erreurs sur une etape qui declare un
   "scaffold", on ne repropose pas le meme obstacle. On redescend
   la marche : MAT -> M -> A -> MA -> MAT, puis on revient.
   ========================================================= */

window.App = window.App || {};

App.Mission = (function () {

  var box, bar, taskEl, quitEl, phaseEl;
  var m = null, lang = 'fr', idx = 0, tries = 0, t0 = 0, stars = 0, missed = 0;
  var busy = false;

  function el(t, c, x) { return App.Activities._el(t, c, x); }

  function mount() {
    box = document.getElementById('mission');
    bar = document.getElementById('mBar');
    taskEl = document.getElementById('mTask');
    quitEl = document.getElementById('mQuit');
    phaseEl = document.getElementById('mPhase');
    if (quitEl) quitEl.addEventListener('click', quit);
  }

  function byId(id) {
    var all = (DATA.missions.fr || []).concat(DATA.missions.en || []);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function start(missionId) {
    m = typeof missionId === 'string' ? byId(missionId) : missionId;
    if (!m || m.locked || !m.steps) return false;
    lang = m.id.indexOf('en.') === 0 ? 'en' : 'fr';
    idx = 0; tries = 0; stars = 0; missed = 0; t0 = Date.now();
    box.hidden = false;
    document.documentElement.setAttribute('data-lang', lang);
    render();
    return true;
  }

  function quit() {
    App.Audio.stop();
    box.hidden = true;
    document.documentElement.setAttribute('data-lang', App.State.langOfDay());
    App.UI.refresh();
  }

  /* ---------- Barre d'etapes ---------- */

  function drawBar() {
    bar.innerHTML = '';
    m.steps.forEach(function (s, i) {
      var d = el('span', 'mbar__s' + (i < idx ? ' is-done' : i === idx ? ' is-now' : ''));
      bar.appendChild(d);
    });
    var st = m.steps[idx];
    phaseEl.textContent = st ? App.T('ph_' + st.phase, lang) : '';
  }

  /* ---------- Rendu d'une etape ---------- */

  function render() {
    busy = false;
    tries = 0;
    App.Audio.stop();
    taskEl.innerHTML = '';
    taskEl.scrollTop = 0;
    drawBar();

    var step = m.steps[idx];
    if (!step) return finish();
    if (step.act === 'wrap') return finish();

    App.Activities.render(step, ctx(step));
  }

  function ctx(step) {
    return {
      lang: lang,
      mission: m,
      root: taskEl,
      T: function (k) { return App.T(k, lang); },
      play: function (key) { return App.Audio.play(key); },
      playText: function (txt, l) { return App.Audio.speak(txt, l || lang); },
      win: function (silent) { win(step, silent); },
      miss: function (node, grid) { miss(step, node, grid); }
    };
  }

  /* ---------- Reussite ---------- */

  function win(step, silent) {
    if (busy) return;
    busy = true;
    if (step.skillHint || m.skill) {
      App.State.record(m.skill, phaseDim(step.phase), tries === 0);
    }
    if (tries === 0) stars++;

    if (silent) {
      setTimeout(next, 260);
      return;
    }
    App.Audio.sfx.good();
    banner('good', App.T(tries === 0 ? 'fb_bravo' : 'fb_yes', lang));
    setTimeout(next, 1050);
  }

  function phaseDim(p) {
    if (p === 'discover' || p === 'practice') return 'recognition';
    if (p === 'decode') return 'sound';
    return 'reading';
  }

  function next() {
    idx++;
    render();
  }

  /* ---------- Erreur : jamais de "faux" ---------- */

  function miss(step, node, grid) {
    if (busy) return;
    tries++;
    missed++;
    App.Audio.sfx.soft();
    if (node && node.classList) {
      node.classList.add('shake');
      setTimeout(function () { node.classList.remove('shake'); }, 420);
    }

    if (tries === 1) {
      banner('soft', App.T('fb_again', lang));
      replay(step);
      return;
    }

    if (tries === 2 && step.scaffold && step.scaffold.length) {
      banner('soft', App.T('fb_slower', lang));
      setTimeout(function () { scaffold(step); }, 700);
      return;
    }

    banner('soft', App.T('fb_listen', lang));
    replay(step);
    reduce(step, grid);
  }

  /* Rejoue l'element sonore central de l'etape */
  function replay(step) {
    setTimeout(function () {
      if (step.phonemeKey) App.Audio.play(step.phonemeKey);
      else if (step.audioKey) App.Audio.play(step.audioKey);
      else if (step.resultKey) App.Audio.play(step.resultKey);
      else if (step.say) App.Audio.speak(step.say.text, step.say.lang);
      else if (step.word && step.word.t) App.Audio.speak(step.word.t, lang);
    }, 520);
  }

  /* Retire une mauvaise reponse, en gardant toujours deux boutons */
  function reduce(step, grid) {
    if (!grid) grid = taskEl.querySelector('.choices');
    if (!grid) return;
    var all = [].slice.call(grid.querySelectorAll('.choice'));
    var alive = all.filter(function (n) { return !n.classList.contains('is-off'); });
    if (alive.length <= 2) return;
    for (var i = 0; i < alive.length; i++) {
      if (!alive[i].classList.contains('is-right')) {
        alive[i].classList.add('is-off');
        return;
      }
    }
  }

  /* ---------- ETAYAGE : on redescend la marche (§16) ---------- */

  function scaffold(step) {
    busy = true;
    var overlay = el('div', 'scaffold');
    var card = el('div', 'scaffold__card');
    card.appendChild(el('div', 'scaffold__t', App.T('fb_slower', lang)));

    var row = el('div', 'scaffold__row');
    var nodes = step.scaffold.map(function (key) {
      var label = key.split(':').pop().toUpperCase();
      var n = el('div', 'scaffold__p read', label);
      row.appendChild(n);
      return n;
    });
    card.appendChild(row);
    overlay.appendChild(card);
    taskEl.appendChild(overlay);

    var i = 0, finished = false;

    function done() {
      if (finished) return;
      finished = true;
      if (overlay.parentNode) overlay.remove();
      busy = false;
      tries = 2;
      rebuild(step);
    }

    function chain() {
      if (i >= step.scaffold.length) { setTimeout(done, 700); return; }
      var n = nodes[i];
      n.classList.add('is-on');
      var k = step.scaffold[i];
      i++;
      App.Audio.play(k).then(function () { setTimeout(chain, 320); },
                             function () { setTimeout(chain, 320); });
    }
    chain();

    /* Quoi qu'il arrive du cote audio, on rend la main a l'enfant. */
    setTimeout(done, 1600 + step.scaffold.length * 2200);
  }

  /* Apres l'etayage on redessine l'etape, jamais a l'identique :
     les distracteurs sont reduits. */
  function rebuild(step) {
    taskEl.innerHTML = '';
    App.Activities.render(step, ctx(step));
    var grid = taskEl.querySelector('.choices');
    if (grid) reduce(step, grid);
  }

  /* ---------- Bandeau de retour ---------- */

  function banner(kind, text) {
    var old = taskEl.querySelector('.fb');
    if (old) old.remove();
    var b = el('div', 'fb fb--' + kind, text);
    taskEl.appendChild(b);
    setTimeout(function () { if (b.parentNode) b.remove(); }, 1400);
  }

  /* ---------- Fin de mission ---------- */

  function finish() {
    var mins = Math.max(1, Math.round((Date.now() - t0) / 60000));
    App.State.finishMission(m.id, lang, stars, Date.now() - t0);

    var newBook = null;
    if (m.unlocksBook) {
      newBook = App.State.unlockBook(m.unlocksBook) ? m.unlocksBook : null;
    }
    var gained = App.Rewards.check(m, lang);

    taskEl.innerHTML = '';
    bar.innerHTML = '';
    phaseEl.textContent = App.T('ph_reward', lang);

    var f = el('div', 'finish');
    f.appendChild(el('div', 'finish__ico', '\ud83c\udf1f'));
    f.appendChild(el('div', 'finish__t', App.T('missionDoneTitle', lang)));
    f.appendChild(el('div', 'finish__s', App.T('youLearned', lang) + ' : ' +
      (m.steps[m.steps.length - 1].learned || m.learned || m.title)));

    var st = el('div', 'finish__stars');
    for (var i = 0; i < 3; i++) {
      st.appendChild(el('span', 'finish__star' + (i < starTier() ? ' is-on' : ''), '\u2b50'));
    }
    f.appendChild(st);
    taskEl.appendChild(f);

    if (gained && gained.length) {
      gained.forEach(function (g) {
        var r = el('div', 'gain');
        r.appendChild(el('span', 'gain__i', g.icon));
        r.appendChild(el('span', 'gain__t', g.label));
        taskEl.appendChild(r);
      });
      App.Audio.sfx.unlock();
    } else {
      App.Audio.sfx.great();
    }

    if (newBook) {
      var b = DATA.books.filter(function (x) { return x.id === newBook; })[0];
      var bk = el('div', 'newbook');
      bk.appendChild(el('div', 'newbook__l', App.T('bookUnlocked', lang)));
      bk.appendChild(el('div', 'newbook__c', b.cover));
      bk.appendChild(el('div', 'newbook__t read', b.title));
      var open = el('button', 'btn btn--primary btn--block', App.T('readItNow', lang));
      open.addEventListener('click', function () {
        box.hidden = true;
        App.UI.openBook(b);
      });
      bk.appendChild(open);
      taskEl.appendChild(bk);
      App.Audio.ui(lang, 'newbook');
    } else {
      App.Audio.ui(lang, 'welldone');
    }

    var back = el('button', 'btn ' + (newBook ? 'btn--quiet' : 'btn--primary') + ' btn--block',
      newBook ? App.T('laterBook', lang) : App.T('backHome', lang));
    back.addEventListener('click', quit);
    taskEl.appendChild(back);
  }

  function starTier() {
    var total = m.steps.length;
    var ratio = stars / Math.max(1, total);
    return ratio > 0.85 ? 3 : ratio > 0.6 ? 2 : 1;
  }

  return { mount: mount, start: start, quit: quit, byId: byId };
})();
