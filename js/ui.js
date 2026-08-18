/* =========================================================
   js/ui.js — L'espace enfant.
   Une aventure, pas un tableau de bord (§47).
   ========================================================= */

window.App = window.App || {};

App.UI = (function () {

  var current = 'home';
  var mapLang = null;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function T(k) { return App.T(App.State.langOfDay(), k); }

  function avatarEmoji() {
    var st = App.State.get();
    var a = DATA.avatars.filter(function (x) { return x.id === st.child.avatar; })[0];
    return a ? a.emoji : '🦊';
  }
  function accessoryEmoji() {
    var st = App.State.get();
    if (!st.child.accessory) return '';
    var a = DATA.accessories.filter(function (x) { return x.id === st.child.accessory; })[0];
    return a ? a.emoji : '';
  }

  /* ---------------- Navigation ---------------- */
  function go(screen) {
    current = screen;
    ['home', 'map', 'books', 'rewards'].forEach(function (s) {
      $('screen-' + s).hidden = (s !== screen);
      var tab = $('tab-' + s);
      if (tab) tab.classList.toggle('is-active', s === screen);
    });
    refresh();
    var sc = $('screen-' + screen);
    if (sc) sc.scrollTop = 0;
  }

  function refresh() {
    var lang = App.State.langOfDay();
    document.documentElement.setAttribute('data-lang', lang);
    drawTopbar();
    if (current === 'home') drawHome();
    if (current === 'map') drawMap();
    if (current === 'books') drawBooks();
    if (current === 'rewards') drawRewards();
    var st = App.State.get();
    ['home', 'map', 'books', 'rewards'].forEach(function (s) {
      var tab = $('tab-' + s);
      if (tab) tab.querySelector('.tab__lbl').textContent =
        App.T(lang, s === 'home' ? 'tabHome' : s === 'map' ? 'tabMap' : s === 'books' ? 'tabBooks' : 'tabRewards');
    });
  }

  function drawTopbar() {
    var st = App.State.get();
    $('tbAvatar').innerHTML = avatarEmoji() + '<span class="topbar__acc">' + accessoryEmoji() + '</span>';
    $('tbName').textContent = st.child.name;
    $('tbHello').textContent = T('hello');
    $('tbStars').innerHTML = '⭐ ' + st.stars;
  }

  /* ---------------- ACCUEIL ---------------- */
  function drawHome() {
    var lang = App.State.langOfDay();
    var box = $('screen-home');
    box.innerHTML = '';

    /* Le héros du jour : une seule action principale (§8) */
    var hero = el('section', 'today');
    hero.appendChild(el('div', 'today__label', T('today')));
    hero.appendChild(el('div', 'today__flag', lang === 'fr' ? '🇫🇷' : '🇬🇧'));
    hero.appendChild(el('h1', 'today__title', lang === 'fr' ? App.T('fr', 'readFr') : App.T('en', 'readEn')));

    var nx = App.Engine.nextNew(lang);
    var world = DATA.worlds[lang][(nx ? nx.world : 1) - 1];
    hero.appendChild(el('div', 'today__sub', world.icon + '  ' + world.title));

    var cta = el('button', 'btn btn--big btn--block today__cta', T('go') + '  →');
    cta.addEventListener('click', function () { App.Lesson.start(lang, 'daily'); });
    hero.appendChild(cta);
    box.appendChild(hero);

    /* Ma prochaine étape */
    var step = el('section', 'card');
    step.style.marginTop = '16px';
    step.appendChild(el('div', 'eyebrow', T('nextStep')));
    var n1 = el('div', 'nextup');
    n1.style.marginTop = '10px';
    n1.appendChild(el('div', 'nextup__ico', world.icon));
    var meta = el('div', '');
    meta.appendChild(el('div', 'nextup__t', world.title));
    meta.appendChild(el('div', 'nextup__s', nx ? (nx.short || nx.label) : world.sub));
    n1.appendChild(meta);
    n1.appendChild(el('div', 'nextup__go', '›'));
    step.appendChild(n1);
    var barw = el('div', 'bar'); barw.style.marginTop = '14px';
    var fill = el('div', 'bar__fill'); fill.style.width = App.Engine.progress(lang) + '%';
    barw.appendChild(fill); step.appendChild(barw);
    step.addEventListener('click', function () { mapLang = lang; go('map'); });
    box.appendChild(step);

    /* Mon livre. S'il n'est pas encore ouvert, on le montre quand même :
       c'est le but visible du parcours, pas une case vide. */
    var b = bookOfTheDay(lang);
    var soon = null;
    if (!b) soon = DATA.books.filter(function (x) { return x.lang === lang; })[0];
    var shown = b || soon;
    if (shown) {
      var bc = el('section', 'card');
      bc.appendChild(el('div', 'eyebrow', T('myBook')));
      var bh = el('div', 'bookhero');
      bh.style.marginTop = '10px';
      bh.appendChild(el('div', 'bookhero__cover', b ? shown.cover : '🔒'));
      var bm = el('div', '');
      bm.appendChild(el('div', 'nextup__t read', shown.title));
      bm.appendChild(el('div', 'nextup__s', b ? T('bookWaiting')
        : (lang === 'fr' ? 'Ton premier livre, bientôt' : 'Your first book, coming soon')));
      bh.appendChild(bm);
      bh.appendChild(el('div', 'nextup__go', '›'));
      bc.appendChild(bh);
      if (!b) bc.style.opacity = '.62';
      bc.addEventListener('click', function () { if (b) openBook(b); else go('books'); });
      box.appendChild(bc);
    }

    var pk = el('button', 'parentkey', '🔒 ' + App.T('fr', 'parentSpace'));
    pk.addEventListener('click', function () { App.Parent.askUnlock(); });
    box.appendChild(pk);
  }

  function bookOfTheDay(lang) {
    var st = App.State.get();
    var pool = DATA.books.filter(function (b) { return b.lang === lang && bookOpen(b); });
    if (!pool.length) return null;
    var unread = pool.filter(function (b) { return st.booksRead.indexOf(b.id) === -1; });
    return (unread[0] || pool[pool.length - 1]);
  }

  function bookOpen(b) {
    if (!b.need || !b.need.length) return true;
    for (var i = 0; i < b.need.length; i++) if (!App.Engine.seen(b.need[i])) return false;
    return true;
  }

  /* ---------------- MON AVENTURE : la carte-fleuve ---------------- */
  function drawMap() {
    var lang = mapLang || App.State.langOfDay();
    mapLang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    var box = $('screen-map');
    box.innerHTML = '';

    var sw = el('div', 'switch');
    [['fr', '🇫🇷 Français'], ['en', '🇬🇧 English']].forEach(function (r) {
      var b = el('button', r[0] === lang ? 'is-on' : '', r[1]);
      b.addEventListener('click', function () { mapLang = r[0]; drawMap(); });
      sw.appendChild(b);
    });
    box.appendChild(sw);

    var head = el('div', '');
    head.style.padding = '0 16px 4px';
    head.appendChild(el('div', 'eyebrow eyebrow--light',
      App.Engine.progress(lang) + '% · ' + App.Engine.mastered(lang).length + ' ' + App.T(lang, 'sounds')));
    box.appendChild(head);

    var worlds = DATA.worlds[lang];
    var wrap = el('div', 'journey');
    var H = worlds.length * 124 + 60;
    wrap.style.height = H + 'px';

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'journey__svg');
    svg.setAttribute('preserveAspectRatio', 'none');
    var p1 = document.createElementNS(svgNS, 'path'); p1.setAttribute('class', 'journey__path');
    var p2 = document.createElementNS(svgNS, 'path'); p2.setAttribute('class', 'journey__path journey__path--done');
    svg.appendChild(p1); svg.appendChild(p2);
    wrap.appendChild(svg);

    var cur = App.Engine.currentWorld(lang);
    var pts = [];
    var lastChapter = null;

    worlds.forEach(function (w, i) {
      var yy = 46 + i * 124;
      var xx = (i % 2 === 0) ? 30 : 70;   /* en % */
      pts.push({ x: xx, y: yy });

      var state = App.Engine.worldState(lang, w.n);
      if (w.n === cur) state = 'current';
      var node = el('button', 'node is-' + state);
      node.style.left = xx + '%';
      node.style.top = yy + 'px';
      node.appendChild(el('div', 'node__ring'));
      node.appendChild(el('div', 'node__bubble', state === 'locked' ? '🔒' : w.icon));
      node.appendChild(el('div', 'node__label', w.title));
      if (w.n === cur) {
        var you = el('div', 'node__you', avatarEmoji());
        node.appendChild(you);
      }
      node.addEventListener('click', function () { worldSheet(lang, w, state); });
      wrap.appendChild(node);

      if (w.chapter !== lastChapter) {
        lastChapter = w.chapter;
        var ch = el('div', 'chapter', w.chapter);
        ch.style.position = 'absolute';
        ch.style.top = (yy - 52) + 'px';
        ch.style.left = '0'; ch.style.right = '0';
        ch.style.textAlign = 'center'; ch.style.margin = '0';
        wrap.appendChild(ch);
      }
    });

    box.appendChild(wrap);

    /* tracé du fleuve, une fois la largeur connue */
    requestAnimationFrame(function () {
      var W = wrap.clientWidth || 420;
      var d = '';
      pts.forEach(function (p, i) {
        var x = p.x / 100 * W, y = p.y;
        if (i === 0) { d += 'M ' + x + ' ' + y; return; }
        var pv = pts[i - 1];
        var px = pv.x / 100 * W, py = pv.y;
        var mid = (py + y) / 2;
        d += ' C ' + px + ' ' + mid + ', ' + x + ' ' + mid + ', ' + x + ' ' + y;
      });
      p1.setAttribute('d', d); p2.setAttribute('d', d);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      try {
        var L = p2.getTotalLength();
        var frac = Math.max(0.02, (cur - 1) / (worlds.length - 1));
        p2.style.strokeDasharray = L;
        p2.style.strokeDashoffset = L * (1 - frac);
      } catch (e) {}
    });
  }

  /* Fiche d'un monde : ce qu'il contient, où en est Alexis */
  function worldSheet(lang, w, state) {
    var list = App.Engine.skills(lang).filter(function (s) { return s.world === w.n; });
    var body = el('div', 'stack');
    body.appendChild(el('div', 'eyebrow', w.chapter));
    body.appendChild(el('h2', '', w.icon + ' ' + w.title));
    body.appendChild(el('p', 'muted', w.sub));

    var chips = el('div', 'pchips');
    list.forEach(function (sk) {
      var sc = App.Engine.score(sk.id);
      var st = App.Engine.masteryState(sc);
      var c = el('span', 'pchip' + (sk.label && sk.label.length > 3 ? ' pchip--sm' : ''), sk.label || sk.short);
      if (!App.Engine.seen(sk.id)) { c.style.opacity = '.4'; }
      else {
        c.style.borderColor = 'transparent';
        c.style.background = 'var(--m-' + st + ')';
        c.style.color = st === 'discovery' ? 'var(--ink)' : '#fff';
      }
      chips.appendChild(c);
    });
    body.appendChild(chips);

    if (state !== 'locked') {
      var go2 = el('button', 'btn btn--primary btn--block', App.T(lang, 'go'));
      go2.addEventListener('click', function () { closeSheet(); App.Lesson.start(lang, 'daily'); });
      body.appendChild(go2);
    } else {
      body.appendChild(el('p', 'muted', lang === 'fr'
        ? 'Ce monde s\'ouvrira quand les précédents seront solides.'
        : 'This world opens once the previous ones are solid.'));
    }
    openSheet(body);
  }

  /* ---------------- Feuille modale générique ---------------- */
  function openSheet(content) {
    var back = $('sheet');
    back.innerHTML = '';
    var card = el('div', 'card card--tint');
    card.style.maxWidth = '400px';
    card.style.width = '100%';
    card.appendChild(content);
    var close = el('button', 'btn btn--quiet btn--block', '✕');
    close.style.marginTop = '16px';
    close.addEventListener('click', closeSheet);
    card.appendChild(close);
    back.appendChild(card);
    back.hidden = false;
  }
  function closeSheet() { $('sheet').hidden = true; }

  /* ---------------- MES LIVRES ---------------- */
  function drawBooks() {
    var lang = App.State.langOfDay();
    var st = App.State.get();
    var box = $('screen-books');
    box.innerHTML = '';
    box.appendChild(el('h2', '', App.T(lang, 'tabBooks')));

    var b = bookOfTheDay(lang);
    if (b) {
      var hero = el('section', 'card');
      hero.style.marginTop = '14px';
      hero.appendChild(el('div', 'eyebrow', App.T(lang, 'myBook')));
      var bh = el('div', 'bookhero'); bh.style.marginTop = '10px';
      bh.appendChild(el('div', 'bookhero__cover', b.cover));
      var m = el('div', '');
      m.appendChild(el('div', 'nextup__t read', b.title));
      m.appendChild(el('div', 'nextup__s', b.pages.length + ' pages'));
      bh.appendChild(m);
      hero.appendChild(bh);
      var rb = el('button', 'btn btn--primary btn--block', App.T(lang, 'read'));
      rb.style.marginTop = '14px';
      rb.addEventListener('click', function () { openBook(b); });
      hero.appendChild(rb);
      box.appendChild(hero);
    }

    ['fr', 'en'].forEach(function (L) {
      var list = DATA.books.filter(function (x) { return x.lang === L; });
      if (!list.length) return;
      var h = el('div', 'eyebrow eyebrow--light', (L === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'));
      h.style.margin = '26px 0 10px';
      box.appendChild(h);
      var shelf = el('div', 'shelf');
      list.forEach(function (bk) {
        var open = bookOpen(bk);
        var card = el('button', 'book' + (open ? '' : ' is-locked'));
        card.appendChild(el('div', 'book__cover', open ? bk.cover : '🔒'));
        var meta = el('div', 'book__meta');
        meta.appendChild(el('div', 'book__title read', bk.title));
        meta.appendChild(el('div', 'book__lvl',
          st.booksRead.indexOf(bk.id) !== -1 ? '✓ Lu' : (open ? 'Niveau ' + bk.level : App.T(lang, 'lockedBook'))));
        card.appendChild(meta);
        if (open) card.addEventListener('click', function () { openBook(bk); });
        shelf.appendChild(card);
      });
      box.appendChild(shelf);
    });
  }

  /* ---------------- Lecteur de livre ---------------- */
  function openBook(b) {
    var page = 0, qi = 0, phase = 'read';
    var host = $('reader');
    host.hidden = false;
    document.documentElement.setAttribute('data-lang', b.lang);
    draw();

    function draw() {
      host.innerHTML = '';
      var bar = el('div', 'lbar');
      var x = el('button', 'lbar__quit', '✕');
      x.addEventListener('click', function () { App.Audio.stop(); host.hidden = true; refresh(); });
      bar.appendChild(x);
      var tr = el('div', 'lbar__track');
      for (var i = 0; i < b.pages.length; i++) {
        tr.appendChild(el('div', 'lbar__seg' + (i < page ? ' is-done' : i === page ? ' is-now' : '')));
      }
      bar.appendChild(tr);
      bar.appendChild(el('span', 'lbar__lang', b.lang === 'fr' ? '🇫🇷' : '🇬🇧'));
      host.appendChild(bar);

      var task = el('div', 'task');
      host.appendChild(task);

      if (phase === 'read') drawPage(task);
      else drawQuestion(task);
    }

    function drawPage(task) {
      var p = b.pages[page];
      task.appendChild(el('h2', 'task__inst', b.title));
      var body = el('div', 'task__body');

      var pic = el('div', 'sentence__pic', p.img);
      pic.style.opacity = '0';
      pic.style.transition = 'opacity .5s ease';
      body.appendChild(pic);

      var line = el('div', 'sentence');
      p.text.split(' ').forEach(function (w) {
        var s = el('button', 'sentence__w', w);
        s.addEventListener('click', function () {
          line.querySelectorAll('.sentence__w').forEach(function (n) { n.classList.remove('is-lit'); });
          s.classList.add('is-lit');
          App.Audio.speak(w.replace(/[.!?,]/g, ''), b.lang, { slow: true });
        });
        line.appendChild(s);
      });
      body.appendChild(line);
      body.appendChild(el('div', 'listen__hint', App.T(b.lang, 'tapWords')));

      var hear = el('button', 'btn btn--quiet btn--block', '🔊');
      hear.addEventListener('click', function () {
        App.Audio.speak(p.text, b.lang, { slow: true });
        pic.style.opacity = '1';
      });
      body.appendChild(hear);

      var nextBtn = el('button', 'btn btn--primary btn--big btn--block',
        page < b.pages.length - 1 ? App.T(b.lang, 'nextPage') : App.T(b.lang, 'finishBook'));
      nextBtn.addEventListener('click', function () {
        pic.style.opacity = '1';
        if (page < b.pages.length - 1) { page++; draw(); }
        else { phase = 'quiz'; qi = 0; draw(); }
      });
      body.appendChild(nextBtn);
      task.appendChild(body);
    }

    function drawQuestion(task) {
      if (!b.questions || qi >= b.questions.length) return done(task);
      var q = b.questions[qi];
      task.appendChild(el('h2', 'task__inst', q.q));
      var body = el('div', 'task__body');
      var grid = el('div', 'choices choices--stack');
      App.Engine.shuffle(q.options.map(function (o, i) { return { o: o, ok: i === q.a }; })).forEach(function (c) {
        var btn = el('button', 'choice choice--text', c.o);
        btn.addEventListener('click', function () {
          if (c.ok) {
            btn.classList.add('is-right');
            App.Audio.sfxGood();
            App.State.addStars(1);
            var sk = b.lang === 'fr' ? 'fr.k.comprehension' : 'en.k.comprehension';
            App.State.record(sk, 'reading', true);
            setTimeout(function () { qi++; draw(); }, 900);
          } else {
            btn.classList.add('is-wrong');
            App.Audio.sfxSoft();
            setTimeout(function () { btn.classList.remove('is-wrong'); btn.classList.add('is-off'); }, 400);
          }
        });
        grid.appendChild(btn);
      });
      body.appendChild(grid);
      var replay = el('button', 'btn btn--quiet btn--block', '🔊');
      replay.addEventListener('click', function () {
        App.Audio.speak(b.pages.map(function (p) { return p.text; }).join(' '), b.lang, { slow: true });
      });
      body.appendChild(replay);
      task.appendChild(body);
    }

    function done(task) {
      var st = App.State.get();
      if (st.booksRead.indexOf(b.id) === -1) { st.booksRead.push(b.id); App.State.save(); }
      var f = el('div', 'finish');
      f.appendChild(el('div', 'finish__emo', '📖'));
      f.appendChild(el('div', 'finish__h', b.lang === 'fr' ? 'Livre terminé !' : 'Book finished!'));
      f.appendChild(el('div', 'finish__stars', '⭐ +5'));
      App.State.addStars(5);
      var back = el('button', 'btn btn--primary btn--big btn--block', App.T(b.lang, 'backHome'));
      back.addEventListener('click', function () {
        host.hidden = true; refresh();
        setTimeout(function () { App.Rewards.checkBadges(); }, 400);
      });
      f.appendChild(back);
      task.appendChild(f);
      App.Audio.sfxStar();
    }
  }

  /* ---------------- MES ÉTOILES ---------------- */
  function drawRewards() {
    var lang = App.State.langOfDay();
    var st = App.State.get();
    var box = $('screen-rewards');
    box.innerHTML = '';
    box.appendChild(el('h2', '', App.T(lang, 'tabRewards')));

    var hero = el('div', 'hero-avatar');
    var disc = el('div', 'hero-avatar__disc', avatarEmoji());
    if (accessoryEmoji()) disc.appendChild(el('span', 'hero-avatar__acc', accessoryEmoji()));
    hero.appendChild(disc);
    box.appendChild(hero);

    var s = App.Rewards.snapshot();
    var stats = el('div', 'card');
    var g = el('div', 'statgrid');
    [[st.stars, App.T(lang, 'stars')], [s.mastered, App.T(lang, 'sounds')], [s.books, App.T(lang, 'books')]]
      .forEach(function (r) {
        var c = el('div', '');
        c.appendChild(el('div', 'statgrid__n', r[0]));
        c.appendChild(el('div', 'statgrid__l', r[1]));
        g.appendChild(c);
      });
    stats.appendChild(g);
    box.appendChild(stats);

    /* Personnage */
    var pc = el('section', 'card');
    pc.appendChild(el('div', 'eyebrow', App.T(lang, 'chooseAvatar')));
    var pick = el('div', 'picker'); pick.style.marginTop = '12px';
    DATA.avatars.forEach(function (a) {
      var b = el('button', a.id === st.child.avatar ? 'is-on' : '');
      b.appendChild(el('span', 'picker__emo', a.emoji));
      b.appendChild(el('span', 'picker__name', lang === 'fr' ? a.name_fr : a.name_en));
      b.addEventListener('click', function () { st.child.avatar = a.id; App.State.save(); refresh(); });
      pick.appendChild(b);
    });
    pc.appendChild(pick);
    box.appendChild(pc);

    /* Accessoires */
    var ac = el('section', 'card');
    ac.appendChild(el('div', 'eyebrow', App.T(lang, 'chooseAcc')));
    var pick2 = el('div', 'picker'); pick2.style.marginTop = '12px';
    var none = el('button', !st.child.accessory ? 'is-on' : '');
    none.appendChild(el('span', 'picker__emo', '🚫'));
    none.appendChild(el('span', 'picker__name', lang === 'fr' ? 'Aucun' : 'None'));
    none.addEventListener('click', function () { st.child.accessory = null; App.State.save(); refresh(); });
    pick2.appendChild(none);
    DATA.accessories.forEach(function (a) {
      var owned = st.accessories.indexOf(a.id) !== -1;
      var b = el('button', (st.child.accessory === a.id ? 'is-on' : '') + (owned ? '' : ' is-locked'));
      b.appendChild(el('span', 'picker__emo', owned ? a.emoji : '🔒'));
      b.appendChild(el('span', 'picker__name', owned ? a.name_fr : needLabel(a.need)));
      if (owned) b.addEventListener('click', function () { st.child.accessory = a.id; App.State.save(); refresh(); });
      pick2.appendChild(b);
    });
    ac.appendChild(pick2);
    box.appendChild(ac);

    /* Trophées */
    var tc = el('section', 'card');
    tc.appendChild(el('div', 'eyebrow', App.T(lang, 'myBadges')));
    var bg = el('div', 'badges'); bg.style.marginTop = '12px';
    DATA.badges.forEach(function (b) {
      var got = st.badges.indexOf(b.id) !== -1;
      var n = el('div', 'badge' + (got ? '' : ' is-locked'));
      n.appendChild(el('div', 'badge__emo', got ? b.emoji : '🔒'));
      n.appendChild(el('div', 'badge__t', got ? b.title_fr : App.T(lang, 'locked')));
      bg.appendChild(n);
    });
    tc.appendChild(bg);
    box.appendChild(tc);
  }

  function needLabel(n) {
    if (n.type === 'stars') return n.n + ' ⭐';
    if (n.type === 'skills') return n.n + ' sons';
    if (n.type === 'books') return n.n + ' livre';
    return 'mission';
  }

  /* ---------------- Montage ---------------- */
  function mount() {
    ['home', 'map', 'books', 'rewards'].forEach(function (s) {
      var tab = $('tab-' + s);
      if (tab) tab.addEventListener('click', function () { go(s); });
    });
    $('sheet').addEventListener('click', function (e) { if (e.target === $('sheet')) closeSheet(); });
    window.addEventListener('resize', function () { if (current === 'map') drawMap(); });
    go('home');
  }

  return { mount: mount, go: go, refresh: refresh, openBook: openBook };
})();
