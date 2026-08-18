/* =========================================================
   js/parent.js — Espace parent

   Toujours en francais : il s'adresse a Sophie, pas a Alexis.
   Objectif (§23, §24) : comprendre en dix secondes ou en est
   l'enfant, et surtout CE QU'IL FAUT RENFORCER.
   ========================================================= */

window.App = window.App || {};

App.Parent = (function () {

  var box, tab = 'overview';

  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }

  /* ---------- Verrou : une multiplication simple ---------- */

  function askUnlock() {
    var lock = document.getElementById('plock');
    var a = 3 + Math.floor(Math.random() * 6);
    var b = 4 + Math.floor(Math.random() * 6);
    var want = a * b, typed = '';

    lock.innerHTML = '';
    lock.hidden = false;
    var card = el('div', 'plock__card');
    card.appendChild(el('div', 'plock__h', 'Espace parent'));
    card.appendChild(el('div', 'plock__q', a + ' \u00d7 ' + b + ' = ?'));
    var out = el('div', 'plock__out', '');
    card.appendChild(out);

    var pad = el('div', 'plock__pad');
    ['1','2','3','4','5','6','7','8','9','\u2190','0','OK'].forEach(function (k) {
      var btn = el('button', 'plock__k', k);
      btn.addEventListener('click', function () {
        if (k === '\u2190') typed = typed.slice(0, -1);
        else if (k === 'OK') {
          if (parseInt(typed, 10) === want) { lock.hidden = true; open(); }
          else {
            typed = '';
            card.classList.add('shake');
            setTimeout(function () { card.classList.remove('shake'); }, 400);
          }
        } else if (typed.length < 3) typed += k;
        out.textContent = typed;
      });
      pad.appendChild(btn);
    });
    card.appendChild(pad);

    var cancel = el('button', 'btn btn--quiet btn--block', 'Annuler');
    cancel.addEventListener('click', function () { lock.hidden = true; });
    card.appendChild(cancel);
    lock.appendChild(card);
  }

  /* ---------- Coque ---------- */

  function open() {
    box = document.getElementById('parent');
    box.hidden = false;
    draw();
  }
  function close() {
    document.getElementById('parent').hidden = true;
    App.UI.refresh();
  }

  function draw() {
    box.innerHTML = '';
    var head = el('div', 'phead');
    var back = el('button', 'phead__x', '\u2715');
    back.addEventListener('click', close);
    head.appendChild(back);
    head.appendChild(el('div', 'phead__t', 'Espace parent'));
    head.appendChild(el('div', 'phead__s', App.State.get().child.name));
    box.appendChild(head);

    var tabs = el('div', 'ptabs');
    [['overview', 'Vue d\u2019ensemble'], ['fr', 'Fran\u00e7ais'], ['en', 'English'],
     ['skills', 'Comp\u00e9tences'], ['plan', 'Planning'], ['set', 'R\u00e9glages']]
      .forEach(function (p) {
        var b = el('button', 'ptab' + (tab === p[0] ? ' is-on' : ''), p[1]);
        b.addEventListener('click', function () { tab = p[0]; draw(); });
        tabs.appendChild(b);
      });
    box.appendChild(tabs);

    var body = el('div', 'pbody');
    box.appendChild(body);

    if (tab === 'overview') drawOverview(body);
    if (tab === 'fr') drawLang(body, 'fr');
    if (tab === 'en') drawLang(body, 'en');
    if (tab === 'skills') drawSkills(body);
    if (tab === 'plan') drawPlan(body);
    if (tab === 'set') drawSettings(body);
  }

  function mins(sec) { return Math.round((sec || 0) / 60); }

  function stat(label, value) {
    var n = el('div', 'pstat');
    n.appendChild(el('div', 'pstat__v', String(value)));
    n.appendChild(el('div', 'pstat__l', label));
    return n;
  }

  function row2(l, v) {
    var r = el('div', 'prow');
    r.appendChild(el('span', 'prow__l', l));
    r.appendChild(el('span', 'prow__v', v));
    return r;
  }

  /* ---------- Vue d'ensemble ---------- */

  function drawOverview(b) {
    var s = App.State.get();
    var today = s.days[App.State.today()] || { fr: 0, en: 0 };
    var week = App.State.weekTotals();

    var c0 = el('div', 'pcard');
    c0.appendChild(el('div', 'pcard__h', 'Aujourd\u2019hui'));
    var g0 = el('div', 'pgrid');
    g0.appendChild(stat('\ud83c\uddeb\ud83c\uddf7 Fran\u00e7ais', mins(today.fr) + ' min'));
    g0.appendChild(stat('\ud83c\uddec\ud83c\udde7 English', mins(today.en) + ' min'));
    c0.appendChild(g0);
    b.appendChild(c0);

    var c1 = el('div', 'pcard');
    c1.appendChild(el('div', 'pcard__h', 'Cette semaine'));
    var g1 = el('div', 'pgrid');
    g1.appendChild(stat('\ud83c\uddeb\ud83c\uddf7 Fran\u00e7ais', mins(week.fr) + ' min'));
    g1.appendChild(stat('\ud83c\uddec\ud83c\udde7 English', mins(week.en) + ' min'));
    g1.appendChild(stat('R\u00e9gularit\u00e9', s.streak + ' j'));
    g1.appendChild(stat('Missions', App.State.missionsDone('fr') + App.State.missionsDone('en')));
    c1.appendChild(g1);
    b.appendChild(c1);

    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', 'O\u00f9 en est Alexis'));
    c2.appendChild(el('p', 'ptext', App.Engine.narrative('fr')));
    c2.appendChild(el('p', 'ptext', App.Engine.narrative('en')));
    b.appendChild(c2);

    var c3 = el('div', 'pcard pcard--warn');
    c3.appendChild(el('div', 'pcard__h', '\u00c0 renforcer'));
    var weak = App.Engine.toReinforce('fr').concat(App.Engine.toReinforce('en')).slice(0, 5);
    if (!weak.length) {
      c3.appendChild(el('div', 'ptext', 'Rien ne bloque pour l\u2019instant. Continuez au rythme actuel.'));
    } else {
      weak.forEach(function (w) { c3.appendChild(row2(w.label, w.score + '%')); });
    }
    b.appendChild(c3);
  }

  /* ---------- Une langue ---------- */

  function drawLang(b, lang) {
    var name = lang === 'fr' ? 'Fran\u00e7ais' : 'English';
    var c = el('div', 'pcard');
    c.appendChild(el('div', 'pcard__h', name));
    var bar = el('div', 'bar');
    var fill = el('div', 'bar__fill');
    fill.style.width = App.Engine.progress(lang) + '%';
    bar.appendChild(fill);
    c.appendChild(bar);
    c.appendChild(el('div', 'ptext', App.Engine.narrative(lang)));
    b.appendChild(c);

    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', 'Missions'));
    App.Engine.all(lang).forEach(function (m) {
      var st = App.Engine.status(m);
      c2.appendChild(row2(m.n + '. ' + m.title,
        st === 'done' ? '\u2b50 termin\u00e9e'
        : st === 'now' ? 'en cours'
        : st === 'soon' ? '\u00e0 venir' : 'verrouill\u00e9e'));
    });
    b.appendChild(c2);

    var c3 = el('div', 'pcard');
    c3.appendChild(el('div', 'pcard__h', '\u00c0 renforcer en ' + name.toLowerCase()));
    var weak = App.Engine.toReinforce(lang);
    if (!weak.length) c3.appendChild(el('div', 'ptext', 'Aucun point fragile identifi\u00e9.'));
    else weak.slice(0, 6).forEach(function (w) { c3.appendChild(row2(w.label, w.score + '%')); });
    b.appendChild(c3);
  }

  /* ---------- Competences ---------- */

  function drawSkills(b) {
    ['fr', 'en'].forEach(function (lang) {
      var c = el('div', 'pcard');
      c.appendChild(el('div', 'pcard__h',
        lang === 'fr' ? '\ud83c\uddeb\ud83c\uddf7 Comp\u00e9tences fran\u00e7aises' : '\ud83c\uddec\ud83c\udde7 Comp\u00e9tences anglaises'));
      var seen = App.Engine.skillsFor(lang).filter(function (s) { return s.attempts > 0; });
      if (!seen.length) {
        c.appendChild(el('div', 'ptext', 'Aucune comp\u00e9tence travaill\u00e9e pour l\u2019instant.'));
      } else {
        seen.sort(function (a, z) { return a.score - z.score; }).forEach(function (s) {
          var st = App.Engine.stateOf(s.score, s.attempts);
          var r = el('div', 'skrow');
          r.appendChild(el('span', 'skrow__d', st.dot));
          var mid = el('div', 'skrow__m');
          mid.appendChild(el('div', 'skrow__l', s.label));
          mid.appendChild(el('div', 'skrow__s',
            st.label_fr + ' \u00b7 ' + s.correct + '/' + s.attempts + ' r\u00e9ussites'));
          r.appendChild(mid);
          r.appendChild(el('span', 'skrow__v', s.score + '%'));
          c.appendChild(r);
        });
      }
      b.appendChild(c);
    });
  }

  /* ---------- Planning ---------- */

  function drawPlan(b) {
    var s = App.State.get();
    var days = [['1', 'Lundi'], ['2', 'Mardi'], ['3', 'Mercredi'], ['4', 'Jeudi'],
                ['5', 'Vendredi'], ['6', 'Samedi'], ['0', 'Dimanche']];
    var c = el('div', 'pcard');
    c.appendChild(el('div', 'pcard__h', 'Semaine type'));
    c.appendChild(el('div', 'ptext', 'Alexis alterne les deux langues. Touchez un jour pour le changer.'));
    days.forEach(function (d) {
      var r = el('div', 'prow');
      r.appendChild(el('span', 'prow__l', d[1]));
      var sw = el('div', 'dsw');
      [['fr', '\ud83c\uddeb\ud83c\uddf7'], ['en', '\ud83c\uddec\ud83c\udde7'], ['free', '\u2014']].forEach(function (o) {
        var btn = el('button', 'dsw__b' + (s.schedule[d[0]] === o[0] ? ' is-on' : ''), o[1]);
        btn.addEventListener('click', function () { s.schedule[d[0]] = o[0]; App.State.save(); draw(); });
        sw.appendChild(btn);
      });
      r.appendChild(sw);
      c.appendChild(r);
    });
    b.appendChild(c);

    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', 'Langue d\u2019aujourd\u2019hui'));
    c2.appendChild(el('div', 'ptext', 'Forcer une langue, seulement pour aujourd\u2019hui.'));
    var row = el('div', 'dsw dsw--wide');
    [['fr', '\ud83c\uddeb\ud83c\uddf7 Fran\u00e7ais'], ['en', '\ud83c\uddec\ud83c\udde7 English'], ['', 'Planning']].forEach(function (o) {
      var btn = el('button', 'dsw__b' + ((s.overrideLang || '') === o[0] ? ' is-on' : ''), o[1]);
      btn.addEventListener('click', function () { App.State.setOverride(o[0] || null); draw(); });
      row.appendChild(btn);
    });
    c2.appendChild(row);
    b.appendChild(c2);
  }

  /* ---------- Reglages ---------- */

  function drawSettings(b) {
    var s = App.State.get();

    var c0 = el('div', 'pcard');
    c0.appendChild(el('div', 'pcard__h', 'Audio'));
    c0.appendChild(el('div', 'ptext',
      'L\u2019application cherche d\u2019abord un enregistrement dans assets/audio. ' +
      'Elle ne bascule sur la synth\u00e8se vocale que s\u2019il n\u2019y en a pas. ' +
      'La synth\u00e8se sert \u00e0 valider le parcours, pas \u00e0 apprendre la prononciation.'));
    var fr = App.Audio.listFor('fr'), en = App.Audio.listFor('en');
    c0.appendChild(row2('Enregistrements d\u00e9tect\u00e9s', App.Audio.hasRecordings() ? 'oui' : 'aucun'));
    c0.appendChild(row2('Voix fran\u00e7aise', fr.length ? fr[0].name : '\u26a0 aucune'));
    c0.appendChild(row2('Voix anglaise', en.length ? en[0].name : '\u26a0 aucune'));
    if (!en.length) {
      c0.appendChild(el('div', 'pwarn',
        'Sans voix anglaise, les missions anglaises resteront muettes. ' +
        'L\u2019application ne prononcera jamais l\u2019anglais avec une voix fran\u00e7aise.'));
    }
    b.appendChild(c0);

    var c1 = el('div', 'pcard');
    c1.appendChild(el('div', 'pcard__h', 'Vitesse de la voix'));
    var rng = document.createElement('input');
    rng.type = 'range'; rng.min = '0.5'; rng.max = '1.1'; rng.step = '0.05';
    rng.value = String(s.settings.rate);
    rng.className = 'prange';
    rng.addEventListener('input', function () { s.settings.rate = parseFloat(rng.value); App.State.save(); });
    c1.appendChild(rng);
    var test = el('button', 'btn btn--quiet btn--block', 'Tester la voix fran\u00e7aise');
    test.addEventListener('click', function () { App.Audio.speak('Bonjour Alexis, on va lire ensemble.', 'fr'); });
    c1.appendChild(test);
    var test2 = el('button', 'btn btn--quiet btn--block', 'Tester la voix anglaise');
    test2.addEventListener('click', function () { App.Audio.speak('Hello Alexis, let us read together.', 'en'); });
    c1.appendChild(test2);
    var snd = el('button', 'btn btn--quiet btn--block', s.settings.sound ? 'Son : activ\u00e9' : 'Son : coup\u00e9');
    snd.addEventListener('click', function () { s.settings.sound = !s.settings.sound; App.State.save(); draw(); });
    c1.appendChild(snd);
    b.appendChild(c1);

    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', 'Prototype'));
    var demo = el('button', 'btn btn--primary btn--block', 'Charger une progression de d\u00e9monstration');
    demo.addEventListener('click', function () { seedDemo(); draw(); });
    c2.appendChild(demo);
    c2.appendChild(el('div', 'ptext',
      'Termine les quatre premi\u00e8res missions de chaque langue, d\u00e9bloque les livres ' +
      'et les r\u00e9compenses. Pratique pour explorer sans tout rejouer.'));
    var rst = el('button', 'btn btn--quiet btn--block', 'Tout remettre \u00e0 z\u00e9ro');
    rst.addEventListener('click', function () {
      if (window.confirm('Effacer toute la progression d\u2019Alexis ?')) {
        App.State.reset(); App.State.load(); close();
      }
    });
    c2.appendChild(rst);
    b.appendChild(c2);
  }

  /* ---------- Progression de demonstration ---------- */

  function seedDemo() {
    var s = App.State.get();
    ['fr', 'en'].forEach(function (lang) {
      App.Engine.all(lang).filter(App.Engine.playable).slice(0, 4).forEach(function (m, i) {
        App.State.finishMission(m.id, lang, 3 - (i % 2), 9 * 60000);
        if (m.skill) {
          var k = App.State.skill(m.skill);
          k.score = 78 + Math.round(Math.random() * 18);
          k.attempts = 10 + i; k.correct = k.attempts - 2; k.seen = 2; k.last = Date.now();
        }
      });
    });
    var weak = App.State.skill('fr.g.a');
    weak.score = 44; weak.attempts = 12; weak.correct = 5; weak.seen = 2; weak.last = Date.now();

    s.days[App.State.today()] = { fr: 9 * 60, en: 7 * 60 };
    s.streak = 4;
    App.Rewards.check();
    App.State.save();
  }

  return { askUnlock: askUnlock, open: open, close: close, seedDemo: seedDemo };
})();
