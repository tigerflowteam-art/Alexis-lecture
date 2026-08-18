/* =========================================================
   js/parent.js — L'espace parent (§32 à §39, §46)
   Objectif : comprendre en 20 secondes, sans être noyé de chiffres.
   ========================================================= */

window.App = window.App || {};

App.Parent = (function () {

  var tab = 'overview';
  var skillLang = 'fr';
  var lockAnswer = 0, lockBuf = '';

  function el(t, c, h) { var n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; }
  function $(id) { return document.getElementById(id); }

  function mins(sec) { return Math.round((sec || 0) / 60); }

  /* ---------------- Verrou d'entrée ---------------- */
  function askUnlock() {
    var a = 3 + Math.floor(Math.random() * 7);
    var b = 4 + Math.floor(Math.random() * 8);
    lockAnswer = a * b; lockBuf = '';
    var box = $('plock');
    box.innerHTML = '';
    box.appendChild(el('div', 'eyebrow eyebrow--light', 'Espace parent'));
    box.appendChild(el('div', 'plock__q', a + ' × ' + b + ' = ?'));
    var out = el('div', 'plock__out', ''); box.appendChild(out);
    var err = el('div', 'plock__err', ''); box.appendChild(err);

    var keys = el('div', 'plock__keys');
    ['1','2','3','4','5','6','7','8','9','←','0','OK'].forEach(function (k) {
      var btn = el('button', 'plock__k', k);
      btn.addEventListener('click', function () {
        if (k === '←') lockBuf = lockBuf.slice(0, -1);
        else if (k === 'OK') {
          if (parseInt(lockBuf, 10) === lockAnswer) { box.hidden = true; open(); return; }
          err.textContent = 'Ce n\'est pas le bon résultat.';
          lockBuf = '';
        } else if (lockBuf.length < 4) lockBuf += k;
        out.textContent = lockBuf;
      });
      keys.appendChild(btn);
    });
    box.appendChild(keys);
    var cancel = el('button', 'btn btn--ghost', 'Annuler');
    cancel.addEventListener('click', function () { box.hidden = true; });
    box.appendChild(cancel);
    box.hidden = false;
  }

  /* ---------------- Ouverture ---------------- */
  function open() {
    $('parent').hidden = false;
    tab = 'overview';
    draw();
  }
  function close() { $('parent').hidden = true; App.UI.refresh(); }

  function draw() {
    var host = $('parent');
    host.innerHTML = '';

    var head = el('div', 'phead');
    head.appendChild(el('div', 'phead__t', 'Alexis'));
    var x = el('button', 'phead__x', 'Fermer');
    x.addEventListener('click', close);
    head.appendChild(x);
    host.appendChild(head);

    var tabs = el('div', 'ptabs');
    [['overview', 'Vue d\'ensemble'], ['fr', '🇫🇷 Français'], ['en', '🇬🇧 English'],
     ['skills', 'Compétences'], ['plan', 'Planning'], ['set', 'Paramètres']].forEach(function (r) {
      var b = el('button', 'ptab' + (tab === r[0] ? ' is-on' : ''), r[1]);
      b.addEventListener('click', function () { tab = r[0]; draw(); });
      tabs.appendChild(b);
    });
    host.appendChild(tabs);

    var body = el('div', 'pbody');
    host.appendChild(body);

    if (tab === 'overview') drawOverview(body);
    if (tab === 'fr') drawLang(body, 'fr');
    if (tab === 'en') drawLang(body, 'en');
    if (tab === 'skills') drawSkills(body);
    if (tab === 'plan') drawPlan(body);
    if (tab === 'set') drawSettings(body);
  }

  /* ---------------- Vue d'ensemble (§32) ---------------- */
  function drawOverview(body) {
    var st = App.State.get();
    var w = App.State.weekTotals();

    var c1 = el('div', 'pcard');
    c1.appendChild(el('div', 'pcard__h', 'Cette semaine'));
    var g = el('div', 'pgrid');
    [[mins(w.fr) + ' min', '🇫🇷 Français'], [mins(w.en) + ' min', '🇬🇧 English'],
     [mins(w.fr + w.en) + ' min', 'Total']].forEach(function (r) {
      var s = el('div', 'pstat');
      s.appendChild(el('div', 'pstat__n', r[0]));
      s.appendChild(el('div', 'pstat__l', r[1]));
      g.appendChild(s);
    });
    c1.appendChild(g);
    body.appendChild(c1);

    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', 'Progression'));
    [['fr', '🇫🇷', 'Français'], ['en', '🇬🇧', 'English']].forEach(function (r) {
      var p = App.Engine.progress(r[0]);
      var row = el('div', 'plang');
      row.appendChild(el('span', 'plang__flag', r[1]));
      row.appendChild(el('span', 'plang__name', r[2]));
      var bar = el('div', 'plang__bar');
      var fill = el('div', 'plang__fill plang__fill--' + r[0]);
      fill.style.width = p + '%';
      bar.appendChild(fill); row.appendChild(bar);
      row.appendChild(el('span', 'plang__pct', p + '%'));
      c2.appendChild(row);
    });
    body.appendChild(c2);

    /* Ne pas afficher un pourcentage sans explication (§35) */
    var c3 = el('div', 'pcard');
    c3.appendChild(el('div', 'pcard__h', 'Ce qu\'il se passe'));
    c3.appendChild(el('div', 'pnarrative', App.Engine.narrative('fr')));
    var n2 = el('div', 'pnarrative pnarrative--warn');
    n2.style.marginTop = '10px';
    n2.innerHTML = App.Engine.narrative('en');
    c3.appendChild(n2);
    body.appendChild(c3);

    /* Conseil du jour (§37) */
    var c4 = el('div', 'pcard');
    c4.appendChild(el('div', 'pcard__h', '💡 Petite activité à faire ensemble'));
    var tips = DATA.fr.parentTips.concat(DATA.en.parentTips);
    var day = new Date().getDate();
    c4.appendChild(el('div', 'pnarrative pnarrative--tip', tips[day % tips.length]));
    body.appendChild(c4);

    var c5 = el('div', 'pcard');
    c5.appendChild(el('div', 'pcard__h', 'Régularité'));
    c5.appendChild(el('div', 'plabel', 'Jours consécutifs'));
    c5.appendChild(el('div', 'pstat__n', st.streak + ' jour' + (st.streak > 1 ? 's' : '')));
    if (st.log.length) {
      var last = el('div', 'plabel', 'Dernières séances');
      last.style.marginTop = '14px';
      c5.appendChild(last);
      var ul = el('div', 'pchips');
      ul.style.marginTop = '6px';
      st.log.slice(0, 6).forEach(function (l) {
        ul.appendChild(el('span', 'pchip pchip--sm', (l.lang === 'fr' ? '🇫🇷 ' : '🇬🇧 ') + l.d.slice(5) + ' · ' + l.stars + '⭐'));
      });
      c5.appendChild(ul);
    }
    body.appendChild(c5);
  }

  /* ---------------- Vue par langue (§33, §34) ---------------- */
  function drawLang(body, lang) {
    var groups = [
      { key: 'mastered',      label: 'Maîtrisé',        color: 'var(--m-mastered)' },
      { key: 'consolidation', label: 'En consolidation', color: 'var(--m-consolidation)' },
      { key: 'learning',      label: 'À renforcer',      color: 'var(--m-learning)' },
      { key: 'discovery',     label: 'Tout juste découvert', color: 'var(--m-discovery)' }
    ];
    var intro = App.Engine.introduced(lang);

    var c0 = el('div', 'pcard');
    c0.appendChild(el('div', 'pcard__h', (lang === 'fr' ? '🇫🇷 Lecture française' : '🇬🇧 English reading')));
    c0.appendChild(el('div', 'pnarrative' + (lang === 'en' ? ' pnarrative--warn' : ''), App.Engine.narrative(lang)));
    body.appendChild(c0);

    var c = el('div', 'pcard');
    groups.forEach(function (grp) {
      var list = intro.filter(function (sk) { return App.Engine.masteryState(App.Engine.score(sk.id)) === grp.key; });
      if (!list.length) return;
      var gwrap = el('div', 'pgroup');
      var h = el('div', 'pgroup__h');
      var dot = el('span', 'pdot'); dot.style.background = grp.color;
      h.appendChild(dot);
      h.appendChild(document.createTextNode(grp.label + ' (' + list.length + ')'));
      gwrap.appendChild(h);
      var chips = el('div', 'pchips');
      list.forEach(function (sk) {
        chips.appendChild(el('span', 'pchip' + ((sk.label || '').length > 3 ? ' pchip--sm' : ''), sk.label || sk.short));
      });
      gwrap.appendChild(chips);
      c.appendChild(gwrap);
    });
    if (!intro.length) c.appendChild(el('p', '', 'Aucune compétence travaillée pour l\'instant.'));
    body.appendChild(c);

    var notYet = App.Engine.skills(lang).filter(function (sk) { return !App.Engine.seen(sk.id); });
    if (notYet.length) {
      var c2 = el('div', 'pcard');
      c2.appendChild(el('div', 'pcard__h', 'À venir'));
      var chips2 = el('div', 'pchips');
      notYet.slice(0, 12).forEach(function (sk) {
        var chip = el('span', 'pchip pchip--sm', sk.label || sk.short);
        chip.style.opacity = '.5';
        chips2.appendChild(chip);
      });
      c2.appendChild(chips2);
      body.appendChild(c2);
    }

    var rev = el('button', 'pbtn', 'Lancer une révision ' + (lang === 'fr' ? 'française' : 'anglaise'));
    rev.addEventListener('click', function () { close(); App.Lesson.start(lang, 'revision'); });
    body.appendChild(rev);
  }

  /* ---------------- Fiche compétence détaillée (§36) ---------------- */
  function drawSkills(body) {
    var sw = el('div', 'ptabs');
    sw.style.background = 'transparent';
    sw.style.border = '0';
    sw.style.padding = '0 0 12px';
    [['fr', '🇫🇷 Français'], ['en', '🇬🇧 English']].forEach(function (r) {
      var b = el('button', 'ptab' + (skillLang === r[0] ? ' is-on' : ''), r[1]);
      b.addEventListener('click', function () { skillLang = r[0]; draw(); });
      sw.appendChild(b);
    });
    body.appendChild(sw);

    var list = App.Engine.introduced(skillLang)
      .sort(function (a, b) { return App.Engine.priority(b) - App.Engine.priority(a); });

    if (!list.length) {
      body.appendChild(el('div', 'pcard', '<p>Rien à afficher : le parcours n\'a pas encore commencé.</p>'));
      return;
    }

    var c = el('div', 'pcard');
    c.appendChild(el('div', 'pcard__h', 'Par ordre de priorité de travail'));
    list.forEach(function (sk) {
      var m = App.State.get().mastery[sk.id];
      var sc = m.score;
      var state = App.Engine.masteryState(sc);
      var row = el('div', 'pskill');
      var top = el('div', 'pskill__top');
      top.appendChild(el('div', 'pskill__name', (sk.label || sk.short) + (sk.phoneme && sk.phoneme !== '—' ? ' <span style="color:#8FA3B4;font-family:var(--font-body);font-size:.8em">' + sk.phoneme + '</span>' : '')));
      var badge = el('span', 'pskill__state', String(sc) + '%');
      badge.style.background = 'var(--m-' + state + ')';
      badge.style.color = state === 'discovery' ? '#16232E' : '#fff';
      top.appendChild(badge);
      row.appendChild(top);

      var dims = el('div', 'pdims');
      [['recognition', 'Reconnaissance'], ['sound', 'Son'], ['reading', 'Lecture']].forEach(function (d) {
        var box = el('div', '');
        box.appendChild(el('div', 'pdim__l', d[1]));
        var bar = el('div', 'pdim__b');
        var f = el('div', 'pdim__f');
        f.style.width = (m.dims[d[0]] || 0) + '%';
        bar.appendChild(f); box.appendChild(bar);
        dims.appendChild(box);
      });
      row.appendChild(dims);
      row.appendChild(el('div', 'pskill__last',
        m.attempts + ' essai' + (m.attempts > 1 ? 's' : '') + ' · ' +
        Math.round(m.attempts ? (m.correct / m.attempts) * 100 : 0) + '% de réussite · ' +
        'dernier travail ' + when(m.last)));
      c.appendChild(row);
    });
    body.appendChild(c);
  }

  function when(ts) {
    if (!ts) return 'jamais';
    var d = Math.floor((Date.now() - ts) / 86400000);
    if (d <= 0) return "aujourd'hui";
    if (d === 1) return 'hier';
    return 'il y a ' + d + ' jours';
  }

  /* ---------------- Planning (§38) et révision (§39) ---------------- */
  function drawPlan(body) {
    var st = App.State.get();
    var names = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

    var c = el('div', 'pcard');
    c.appendChild(el('div', 'pcard__h', 'Semaine type'));
    c.appendChild(el('div', 'plabel', 'Touchez un jour pour changer la langue'));
    var week = el('div', 'pweek');
    week.style.marginTop = '12px';
    for (var i = 0; i < 7; i++) {
      (function (day) {
        var cell = el('div', 'pday');
        cell.appendChild(el('div', 'pday__n', names[day]));
        var v = st.schedule[day];
        var b = el('button', 'pday__b' + (v === 'fr' ? ' is-fr' : v === 'en' ? ' is-en' : ''),
          v === 'fr' ? 'FR' : v === 'en' ? 'EN' : '–');
        b.addEventListener('click', function () {
          st.schedule[day] = v === 'fr' ? 'en' : v === 'en' ? 'free' : 'fr';
          App.State.save(); draw();
        });
        cell.appendChild(b);
        week.appendChild(cell);
      })(i);
    }
    c.appendChild(week);
    body.appendChild(c);

    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', "Langue d'aujourd'hui"));
    c2.appendChild(el('div', 'pnarrative', 'Le système a choisi : ' +
      (App.State.langOfDay() === 'fr' ? '🇫🇷 Français' : '🇬🇧 English') +
      '. Vous pouvez forcer l\'autre langue pour aujourd\'hui seulement.'));
    var row = el('div', 'prow');
    row.style.marginTop = '10px';
    ['fr', 'en'].forEach(function (l) {
      var b = el('button', 'pbtn' + (App.State.langOfDay() === l ? '' : ' pbtn--ghost'),
        l === 'fr' ? '🇫🇷 Français' : '🇬🇧 English');
      b.style.marginRight = '8px';
      b.addEventListener('click', function () { App.State.setOverride(l); draw(); });
      row.appendChild(b);
    });
    c2.appendChild(row);
    body.appendChild(c2);

    var c3 = el('div', 'pcard');
    c3.appendChild(el('div', 'pcard__h', 'Mode révision'));
    c3.appendChild(el('div', 'plabel', 'Ne travaille que les compétences fragiles'));
    var r = el('div', 'prow');
    r.style.marginTop = '10px';
    [['fr', '🇫🇷 Réviser'], ['en', '🇬🇧 Review'], ['both', '🌍 La plus faible']].forEach(function (o) {
      var b = el('button', 'pbtn pbtn--ghost', o[1]);
      b.style.marginRight = '8px';
      b.addEventListener('click', function () {
        var l = o[0];
        if (l === 'both') l = App.Engine.progress('fr') <= App.Engine.progress('en') ? 'fr' : 'en';
        close(); App.Lesson.start(l, 'revision');
      });
      r.appendChild(b);
    });
    c3.appendChild(r);
    body.appendChild(c3);
  }

  /* ---------------- Paramètres ---------------- */
  function drawSettings(body) {
    var st = App.State.get();

    /* Audio : la règle absolue du §48 */
    var c0 = el('div', 'pcard');
    c0.appendChild(el('div', 'pcard__h', '🎙️ Voix'));
    ['fr', 'en'].forEach(function (l) {
      var voices = App.Audio.listFor(l);
      var row = el('div', 'prow');
      var left = el('div', 'prow__l');
      left.appendChild(el('div', 'prow__t', l === 'fr' ? 'Voix française' : 'Voix anglaise'));
      left.appendChild(el('div', 'prow__d', voices.length ? voices.length + ' voix disponibles' : 'Aucune voix installée'));
      row.appendChild(left);
      if (voices.length) {
        var sel = el('select', 'pselect');
        voices.forEach(function (v) {
          var o = document.createElement('option');
          o.value = v.name; o.textContent = v.name;
          if ((l === 'fr' ? st.settings.voiceFr : st.settings.voiceEn) === v.name) o.selected = true;
          sel.appendChild(o);
        });
        var cur = App.Audio.current(l);
        if (cur && !(l === 'fr' ? st.settings.voiceFr : st.settings.voiceEn)) sel.value = cur.name;
        sel.addEventListener('change', function () {
          if (l === 'fr') st.settings.voiceFr = sel.value; else st.settings.voiceEn = sel.value;
          App.State.save(); App.Audio.refresh();
          App.Audio.speak(l === 'fr' ? 'Bonjour Alexis' : 'Hello Alexis', l, {});
        });
        row.appendChild(sel);
      }
      c0.appendChild(row);
    });
    if (!App.Audio.listFor('en').length) {
      c0.appendChild(el('div', 'pnarrative pnarrative--warn',
        "Aucune voix anglaise n'est installée sur cet appareil. L'application préfère se taire plutôt que de prononcer l'anglais avec une voix française. Installez une voix anglaise dans les réglages du système."));
    }
    body.appendChild(c0);

    var c1 = el('div', 'pcard');
    c1.appendChild(el('div', 'pcard__h', 'Séance'));

    var r1 = el('div', 'prow');
    var l1 = el('div', 'prow__l');
    l1.appendChild(el('div', 'prow__t', 'Vitesse de la voix'));
    l1.appendChild(el('div', 'prow__d', 'Plus lent = plus facile à décoder'));
    r1.appendChild(l1);
    var sel1 = el('select', 'pselect');
    [[0.65, 'Très lente'], [0.8, 'Lente'], [0.95, 'Normale']].forEach(function (o) {
      var op = document.createElement('option');
      op.value = o[0]; op.textContent = o[1];
      if (Math.abs(st.settings.rate - o[0]) < 0.01) op.selected = true;
      sel1.appendChild(op);
    });
    sel1.addEventListener('change', function () { st.settings.rate = parseFloat(sel1.value); App.State.save(); });
    r1.appendChild(sel1);
    c1.appendChild(r1);

    var r2 = el('div', 'prow');
    var l2 = el('div', 'prow__l');
    l2.appendChild(el('div', 'prow__t', 'Longueur de séance'));
    l2.appendChild(el('div', 'prow__d', 'Cible : 5 à 10 minutes'));
    r2.appendChild(l2);
    var sel2 = el('select', 'pselect');
    [[5, 'Courte (5 étapes)'], [7, 'Normale (7 étapes)'], [10, 'Longue (10 étapes)']].forEach(function (o) {
      var op = document.createElement('option');
      op.value = o[0]; op.textContent = o[1];
      if (st.settings.sessionSteps === o[0]) op.selected = true;
      sel2.appendChild(op);
    });
    sel2.addEventListener('change', function () { st.settings.sessionSteps = parseInt(sel2.value, 10); App.State.save(); });
    r2.appendChild(sel2);
    c1.appendChild(r2);

    var r3 = el('div', 'prow');
    var l3 = el('div', 'prow__l');
    l3.appendChild(el('div', 'prow__t', 'Petits sons de retour'));
    l3.appendChild(el('div', 'prow__d', 'Clochettes de bonne réponse'));
    r3.appendChild(l3);
    var tg = el('button', 'pbtn' + (st.settings.sound ? '' : ' pbtn--ghost'), st.settings.sound ? 'Activés' : 'Coupés');
    tg.addEventListener('click', function () { st.settings.sound = !st.settings.sound; App.State.save(); draw(); });
    r3.appendChild(tg);
    c1.appendChild(r3);
    body.appendChild(c1);

    /* Outils de démonstration : ce prototype doit pouvoir être exploré vite */
    var c2 = el('div', 'pcard');
    c2.appendChild(el('div', 'pcard__h', '🧪 Prototype'));
    c2.appendChild(el('div', 'plabel', 'Uniquement pour tester la V1'));
    var r4 = el('div', 'prow');
    r4.style.flexWrap = 'wrap'; r4.style.gap = '8px';
    var demo = el('button', 'pbtn pbtn--ghost', 'Charger une progression de démonstration');
    demo.addEventListener('click', function () { seedDemo(); draw(); });
    r4.appendChild(demo);
    var reset = el('button', 'pbtn pbtn--danger', 'Tout remettre à zéro');
    reset.addEventListener('click', function () {
      if (confirm('Effacer toute la progression d\'Alexis ?')) { App.State.reset(); close(); App.UI.refresh(); }
    });
    r4.appendChild(reset);
    c2.appendChild(r4);
    body.appendChild(c2);

    var c3 = el('div', 'pcard');
    c3.appendChild(el('div', 'pcard__h', 'Ce que le parent contrôle'));
    c3.appendChild(el('div', 'pnarrative pnarrative--tip',
      "Vous réglez le cadre : planning, langue du jour, révisions, voix, durée. Le programme lui-même reste construit par le moteur — vous n'avez jamais à choisir l'exercice suivant."));
    body.appendChild(c3);
  }

  /* Progression fictive pour explorer le prototype (§7 : données locales) */
  function seedDemo() {
    var st = App.State.get();
    var plan = {
      fr: ['fr.ph.syllabes', 'fr.ph.rimes', 'fr.ph.initial', 'fr.ph.fusion',
           'fr.g.a', 'fr.g.i', 'fr.g.o', 'fr.g.m', 'fr.g.l', 'fr.g.t', 'fr.g.p', 'fr.g.r', 'fr.g.s',
           'fr.b.m', 'fr.b.l', 'fr.b.t', 'fr.b.p', 'fr.syl.read', 'fr.w.cvcv', 'fr.t.outils'],
      en: ['en.ph.syllables', 'en.ph.rhyme', 'en.ph.initial', 'en.ph.blendoral',
           'en.g.s', 'en.g.a', 'en.g.t', 'en.g.p', 'en.g.i', 'en.g.n', 'en.g.m', 'en.g.d',
           'en.b.cv', 'en.b.cvc', 'en.w.cvc']
    };
    var scores = [96, 94, 91, 88, 87, 85, 82, 79, 74, 71, 68, 64, 61, 57, 52, 48, 44, 39, 34, 28];
    ['fr', 'en'].forEach(function (l) {
      plan[l].forEach(function (id, i) {
        var m = App.State.skill(id);
        m.score = scores[i] !== undefined ? scores[i] : 30;
        m.attempts = 6 + Math.floor(Math.random() * 14);
        m.correct = Math.round(m.attempts * (m.score / 100) * 0.95);
        m.seen = 1;
        m.last = Date.now() - Math.floor(Math.random() * 6) * 86400000;
        m.dims = {
          recognition: Math.min(100, m.score + 8),
          sound: m.score,
          reading: Math.max(0, m.score - 16)
        };
      });
    });
    st.stars = 214;
    st.streak = 4;
    st.counters = { wordsRead: 26, sentencesRead: 7, bilingual: 1 };
    st.booksRead = ['fr.b1'];
    var t = App.State.today();
    st.days[t] = { fr: 420, en: 300 };
    var d = new Date();
    for (var i = 1; i < 6; i++) {
      d.setDate(d.getDate() - 1);
      var k = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
      st.days[k] = { fr: i % 2 ? 480 : 60, en: i % 2 ? 90 : 460 };
    }
    st.log = [
      { d: t, lang: 'fr', stars: 12 }, { d: t, lang: 'en', stars: 9 },
      { d: t, lang: 'fr', stars: 14 }, { d: t, lang: 'en', stars: 11 }
    ];
    App.State.save();
    App.Rewards.checkBadges();
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  return { askUnlock: askUnlock, open: open, close: close, seedDemo: seedDemo };
})();
