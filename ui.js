/* =========================================================
   js/ui.js — Les ecrans de l'enfant

   Regle de localisation (§9) : tout ce qui est affiche ici passe par
   T(), et T() suit la langue du jour. L'interface enfant n'est jamais
   melangee.
   ========================================================= */

window.App = window.App || {};

App.UI = (function () {

  var screens = {}, tabs = {}, cur = 'home';
  var mapLang = null;

  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }
  function T(k) { return App.T(k, App.State.langOfDay()); }
  function lod() { return App.State.langOfDay(); }

  /* ---------- Montage ---------- */

  function mount() {
    ['home', 'map', 'books', 'stars'].forEach(function (k) {
      screens[k] = document.getElementById('screen-' + k);
      tabs[k] = document.getElementById('tab-' + k);
      tabs[k].addEventListener('click', function () { go(k); });
    });
    document.getElementById('sheetClose').addEventListener('click', closeSheet);
    go('home');
  }

  function go(k) {
    cur = k;
    for (var n in screens) {
      screens[n].hidden = n !== k;
      tabs[n].classList.toggle('is-active', n === k);
    }
    refresh();
  }

  function refresh() {
    var lang = lod();
    document.documentElement.setAttribute('data-lang', lang === 'free' ? 'fr' : lang);
    drawTop();
    if (cur === 'home') drawHome();
    if (cur === 'map') drawMap();
    if (cur === 'books') drawBooks();
    if (cur === 'stars') drawStars();
    drawTabs();
  }

  function drawTabs() {
    tabs.home.querySelector('.tab__lbl').textContent = T('home');
    tabs.map.querySelector('.tab__lbl').textContent = T('myJourney');
    tabs.books.querySelector('.tab__lbl').textContent = T('myBooks');
    tabs.stars.querySelector('.tab__lbl').textContent = T('myStars');
  }

  function drawTop() {
    var s = App.State.get();
    document.getElementById('tbAvatar').textContent = App.Rewards.avatarIcon();
    document.getElementById('tbHello').textContent = T('hello');
    document.getElementById('tbName').textContent = s.child.name;
    document.getElementById('tbStars').textContent = '\u2b50 ' + s.stars;
  }

  /* ---------- ACCUEIL ---------- */

  function drawHome() {
    var box = screens.home;
    box.innerHTML = '';
    var lang = lod();
    var next = App.Engine.next(lang);

    /* Le heros du jour : une seule action principale (§20) */
    var hero = el('section', 'today');
    hero.appendChild(el('div', 'today__label', T('today')));
    hero.appendChild(el('div', 'today__flag', lang === 'en' ? '\ud83c\uddec\ud83c\udde7' : '\ud83c\uddeb\ud83c\uddf7'));
    hero.appendChild(el('div', 'today__lang', T('langName')));
    hero.appendChild(el('h1', 'today__title', T('todayTitle')));
    if (next) hero.appendChild(el('div', 'today__sub', next.icon + '  ' + next.title));

    var cta = el('button', 'btn btn--big btn--block today__cta', T('continue') + '  \u2192');
    cta.addEventListener('click', function () {
      if (next && App.Engine.playable(next)) App.Mission.start(next);
      else go('map');
    });
    hero.appendChild(cta);
    box.appendChild(hero);

    /* Ma prochaine etape */
    if (next) {
      var c = el('section', 'card');
      c.appendChild(el('div', 'eyebrow', T('nextStep')));
      var nu = el('div', 'nextup');
      nu.appendChild(el('div', 'nextup__ico', next.icon));
      var mid = el('div', '');
      mid.appendChild(el('div', 'nextup__t', T('mission') + ' ' + next.n + ' \u00b7 ' + next.title));
      mid.appendChild(el('div', 'nextup__s', next.subtitle || ''));
      nu.appendChild(mid);
      nu.appendChild(el('div', 'nextup__go', '\u203a'));
      c.appendChild(nu);

      var bar = el('div', 'bar');
      var fill = el('div', 'bar__fill');
      fill.style.width = App.Engine.playableProgress(lang) + '%';
      bar.appendChild(fill);
      c.appendChild(bar);
      c.addEventListener('click', function () { go('map'); });
      box.appendChild(c);
    }

    /* Mon livre */
    var book = firstOpenBook(lang);
    var soon = !book ? DATA.books.filter(function (b) { return b.lang === lang; })[0] : null;
    var show = book || soon;
    if (show) {
      var bc = el('section', 'card');
      bc.appendChild(el('div', 'eyebrow', T('myBook')));
      var bh = el('div', 'bookhero');
      bh.appendChild(el('div', 'bookhero__cover', book ? show.cover : '\ud83d\udd12'));
      var bm = el('div', '');
      bm.appendChild(el('div', 'nextup__t read', show.title));
      bm.appendChild(el('div', 'nextup__s', book ? T('bookWaiting') : T('bookSoon')));
      bh.appendChild(bm);
      bh.appendChild(el('div', 'nextup__go', '\u203a'));
      bc.appendChild(bh);
      if (!book) bc.style.opacity = '.6';
      bc.addEventListener('click', function () { if (book) openBook(book); else go('books'); });
      box.appendChild(bc);
    }

    var pk = el('button', 'parentkey', '\ud83d\udd12 ' + T('parentSpace'));
    pk.addEventListener('click', function () { App.Parent.askUnlock(); });
    box.appendChild(pk);
  }

  function firstOpenBook(lang) {
    var list = DATA.books.filter(function (b) {
      return b.lang === lang && App.State.isBookUnlocked(b.id);
    });
    var unread = list.filter(function (b) { return App.State.get().booksRead.indexOf(b.id) < 0; });
    return unread[0] || list[0] || null;
  }

  /* ---------- MON AVENTURE : la carte des missions ---------- */

  function drawMap() {
    var box = screens.map;
    box.innerHTML = '';
    var lang = mapLang || lod();
    if (lang === 'free') lang = 'fr';

    var sw = el('div', 'switch');
    [['fr', '\ud83c\uddeb\ud83c\uddf7'], ['en', '\ud83c\uddec\ud83c\udde7']].forEach(function (p) {
      var b = el('button', p[0] === lang ? 'is-on' : '', p[1] + ' ' + App.T('langName', p[0]));
      b.addEventListener('click', function () { mapLang = p[0]; drawMap(); });
      sw.appendChild(b);
    });
    box.appendChild(sw);

    var head = el('div', 'maphead');
    head.appendChild(el('div', 'maphead__n',
      App.State.missionsDone(lang) + ' / ' + App.Engine.all(lang).length + ' ' + App.T('missionsIn', lang)));
    var bar = el('div', 'bar');
    var fill = el('div', 'bar__fill');
    fill.style.width = App.Engine.progress(lang) + '%';
    bar.appendChild(fill);
    head.appendChild(bar);
    box.appendChild(head);

    var trail = el('div', 'trail');
    App.Engine.worlds(lang).forEach(function (grp) {
      var w = el('div', 'wblock');
      var wh = el('div', 'wblock__h');
      wh.appendChild(el('span', 'wblock__i', grp.world.icon));
      var wt = el('div', '');
      wt.appendChild(el('div', 'wblock__t', App.T('world', lang) + ' ' + grp.world.n + ' \u2014 ' + grp.world.title));
      wt.appendChild(el('div', 'wblock__s', grp.world.sub));
      wh.appendChild(wt);
      w.appendChild(wh);

      var list = el('div', 'mlist');
      grp.missions.forEach(function (mi) {
        var st = App.Engine.status(mi);
        var n = el('button', 'mnode is-' + st);
        n.appendChild(el('span', 'mnode__n', String(mi.n)));
        var mid = el('span', 'mnode__m');
        mid.appendChild(el('span', 'mnode__t', mi.title));
        mid.appendChild(el('span', 'mnode__s', mi.subtitle || ''));
        n.appendChild(mid);
        n.appendChild(el('span', 'mnode__b',
          st === 'done' ? '\u2b50' : st === 'now' ? '\u25b6' : st === 'soon' ? '\u23f3' : '\ud83d\udd12'));
        n.addEventListener('click', function () { openMission(mi, st, lang); });
        list.appendChild(n);
      });
      w.appendChild(list);
      trail.appendChild(w);
    });
    box.appendChild(trail);
  }

  function openMission(mi, st, lang) {
    var body = el('div', '');
    body.appendChild(el('div', 'sheet__ico', mi.icon));
    body.appendChild(el('h3', 'sheet__t', App.T('mission', lang) + ' ' + mi.n + ' \u00b7 ' + mi.title));
    body.appendChild(el('div', 'sheet__s', mi.subtitle || ''));

    if (st === 'locked') {
      body.appendChild(el('div', 'note', App.T('missionLocked', lang)));
    } else if (st === 'soon') {
      body.appendChild(el('div', 'note', lang === 'fr'
        ? 'Cette mission arrive bient\u00f4t.' : 'This mission is coming soon.'));
    } else {
      if (mi.learned) body.appendChild(el('div', 'note', mi.learned));
      body.appendChild(el('div', 'sheet__meta', mi.steps.length + ' \u00b7 ' + App.T('stepOf', lang)));
      var go2 = el('button', 'btn btn--primary btn--block',
        st === 'done' ? App.T('replayMission', lang) : App.T('startMission', lang));
      go2.addEventListener('click', function () {
        closeSheet();
        App.Mission.start(mi);
      });
      body.appendChild(go2);
    }
    showSheet(body);
  }

  /* ---------- MES LIVRES ---------- */

  function drawBooks() {
    var box = screens.books;
    box.innerHTML = '';
    box.appendChild(el('h2', 'stitle', T('myBooks')));

    [['fr', T('booksFr')], ['en', T('booksEn')]].forEach(function (p) {
      box.appendChild(el('div', 'eyebrow', p[1]));
      var shelf = el('div', 'shelf');
      DATA.books.filter(function (b) { return b.lang === p[0]; }).forEach(function (b) {
        var open = App.State.isBookUnlocked(b.id);
        var read = App.State.get().booksRead.indexOf(b.id) >= 0;
        var c = el('button', 'book' + (open ? '' : ' is-locked'));
        c.appendChild(el('div', 'book__c', open ? b.cover : '\ud83d\udd12'));
        c.appendChild(el('div', 'book__t read', b.title));
        c.appendChild(el('div', 'book__s',
          open ? (read ? T('bookDone') : T('bookOpen')) : T('bookLocked')));
        c.addEventListener('click', function () { if (open) openBook(b); });
        shelf.appendChild(c);
      });
      box.appendChild(shelf);
    });
  }

  /* ---------- LECTEUR DE LIVRE (§22 : lire d'abord, voir ensuite) ---------- */

  function openBook(b) {
    var r = document.getElementById('reader');
    var lang = b.lang;
    var i = 0;
    r.hidden = false;
    draw();

    function draw() {
      r.innerHTML = '';
      var bar = el('div', 'rbar');
      var q = el('button', 'rbar__quit', '\u2715');
      q.addEventListener('click', close);
      bar.appendChild(q);
      bar.appendChild(el('div', 'rbar__t', b.title));
      bar.appendChild(el('div', 'rbar__n', (i + 1) + '/' + b.pages.length));
      r.appendChild(bar);

      var p = b.pages[i];
      var page = el('div', 'page');
      var line = el('div', 'page__text read');
      p.text.split(' ').forEach(function (w) {
        var s = el('span', 'page__w', w);
        s.addEventListener('click', function () {
          s.classList.add('is-on');
          App.Audio.speak(w.replace(/[.!?,]/g, ''), lang);
          setTimeout(function () { s.classList.remove('is-on'); }, 700);
        });
        line.appendChild(s);
      });
      page.appendChild(line);

      var img = el('div', 'page__img is-hidden', '\u2753');
      page.appendChild(img);
      r.appendChild(page);

      var read = el('button', 'btn btn--primary btn--block', App.T('iReadIt', lang));
      read.addEventListener('click', function () {
        img.textContent = p.e;
        img.classList.remove('is-hidden');
        App.Audio.speak(p.text, lang);
        read.remove();
        var nx = el('button', 'btn btn--primary btn--block',
          i < b.pages.length - 1 ? App.T('turnPage', lang) : App.T('finish', lang));
        nx.addEventListener('click', function () {
          i++;
          if (i < b.pages.length) draw();
          else end();
        });
        r.appendChild(nx);
      });
      r.appendChild(read);

      var hear = el('button', 'btn btn--quiet btn--block', App.T('listen', lang));
      hear.addEventListener('click', function () { App.Audio.speak(p.text, lang); });
      r.appendChild(hear);
    }

    function end() {
      r.innerHTML = '';
      var first = App.State.markBookRead(b.id);
      var gained = App.Rewards.check();
      if (first) App.State.remember('\ud83d\udcd6', b.title);

      var f = el('div', 'finish');
      f.appendChild(el('div', 'finish__ico', '\ud83d\udcd6'));
      f.appendChild(el('div', 'finish__t', App.T('theEnd', lang)));
      f.appendChild(el('div', 'finish__s', b.title));
      r.appendChild(f);

      (gained || []).forEach(function (g) {
        var n = el('div', 'gain');
        n.appendChild(el('span', 'gain__i', g.icon));
        n.appendChild(el('span', 'gain__t', g.label));
        r.appendChild(n);
      });
      App.Audio.sfx.great();

      var back = el('button', 'btn btn--primary btn--block', App.T('backHome', lang));
      back.addEventListener('click', close);
      r.appendChild(back);
    }

    function close() {
      App.Audio.stop();
      r.hidden = true;
      refresh();
    }
  }

  /* ---------- MES ETOILES ---------- */

  function drawStars() {
    var box = screens.stars;
    box.innerHTML = '';
    var s = App.State.get();

    box.appendChild(el('h2', 'stitle', T('myStars')));

    /* Mon personnage */
    var c1 = el('section', 'card');
    c1.appendChild(el('div', 'eyebrow', T('myCharacter')));
    var hero = el('div', 'charhero');
    hero.appendChild(el('div', 'charhero__a', App.Rewards.avatarIcon()));
    var acc = s.child.accessory;
    if (acc) {
      var a = DATA.accessories.filter(function (x) { return x.id === acc; })[0];
      if (a) hero.appendChild(el('div', 'charhero__acc', a.icon));
    }
    c1.appendChild(hero);

    var row = el('div', 'picker');
    DATA.avatars.forEach(function (a) {
      var ok = App.Rewards.avatarUnlocked(a);
      var b = el('button', 'pick' + (s.child.avatar === a.id ? ' is-on' : '') + (ok ? '' : ' is-locked'),
        ok ? a.icon : '\ud83d\udd12');
      b.addEventListener('click', function () {
        if (!ok) return;
        s.child.avatar = a.id; App.State.save(); App.Audio.sfx.pop(); drawStars(); drawTop();
      });
      row.appendChild(b);
    });
    c1.appendChild(row);

    var row2 = el('div', 'picker');
    var none = el('button', 'pick' + (!acc ? ' is-on' : ''), '\u2716');
    none.addEventListener('click', function () { s.child.accessory = null; App.State.save(); drawStars(); });
    row2.appendChild(none);
    DATA.accessories.forEach(function (a) {
      var ok = App.Rewards.accessoryUnlocked(a);
      var b = el('button', 'pick' + (acc === a.id ? ' is-on' : '') + (ok ? '' : ' is-locked'),
        ok ? a.icon : '\ud83d\udd12');
      b.addEventListener('click', function () {
        if (!ok) return;
        s.child.accessory = a.id; App.State.save(); App.Audio.sfx.pop(); drawStars();
      });
      row2.appendChild(b);
    });
    c1.appendChild(row2);
    box.appendChild(c1);

    /* Mes trophees */
    var c2 = el('section', 'card');
    c2.appendChild(el('div', 'eyebrow', T('myTrophies')));
    var g = el('div', 'badges');
    DATA.trophies.forEach(function (t) {
      var has = App.Rewards.trophyOwned(t);
      var b = el('div', 'badge' + (has ? '' : ' is-locked'));
      b.appendChild(el('div', 'badge__i', has ? t.icon : '\ud83d\udd12'));
      b.appendChild(el('div', 'badge__t', has ? t.label : T('locked')));
      if (!has) b.title = t.hint;
      g.appendChild(b);
    });
    c2.appendChild(g);
    box.appendChild(c2);

    /* Mes livres termines */
    var c3 = el('section', 'card');
    c3.appendChild(el('div', 'eyebrow', T('myFinished')));
    if (!s.booksRead.length) {
      c3.appendChild(el('div', 'note', T('albumEmpty')));
    } else {
      var sh = el('div', 'shelf shelf--mini');
      s.booksRead.forEach(function (id) {
        var b = DATA.books.filter(function (x) { return x.id === id; })[0];
        if (!b) return;
        var n = el('div', 'book');
        n.appendChild(el('div', 'book__c', b.cover));
        n.appendChild(el('div', 'book__t read', b.title));
        sh.appendChild(n);
      });
      c3.appendChild(sh);
    }
    box.appendChild(c3);

    /* Mon album : les moments qui comptent */
    var c4 = el('section', 'card');
    c4.appendChild(el('div', 'eyebrow', T('myAlbum')));
    if (!s.album.length) {
      c4.appendChild(el('div', 'note', T('albumEmpty')));
    } else {
      var al = el('div', 'album');
      s.album.forEach(function (a) {
        var n = el('div', 'album__i');
        n.appendChild(el('span', 'album__e', a.icon));
        n.appendChild(el('span', 'album__l', a.label));
        n.appendChild(el('span', 'album__d', a.date));
        al.appendChild(n);
      });
      c4.appendChild(al);
    }
    box.appendChild(c4);
  }

  /* ---------- Feuille modale ---------- */

  function showSheet(node) {
    var sh = document.getElementById('sheet');
    var body = document.getElementById('sheetBody');
    body.innerHTML = '';
    body.appendChild(node);
    sh.hidden = false;
  }
  function closeSheet() { document.getElementById('sheet').hidden = true; }

  return {
    mount: mount, go: go, refresh: refresh,
    openBook: openBook, closeSheet: closeSheet
  };
})();
