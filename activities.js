/* =========================================================
   js/activities.js — Les mecaniques d'activite

   Chaque mecanique recoit (step, ctx) et dessine dans ctx.root.
   Elle appelle ctx.win() quand l'enfant reussit, ctx.miss() sinon.
   Le deroule, le feedback et l'etayage sont geres par js/mission.js.

   ctx = { lang, mission, root, win, miss, T, say }
   ========================================================= */

window.App = window.App || {};

App.Activities = (function () {

  /* ---------- petits outils ---------- */

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function instruction(ctx, text) {
    var n = el('div', 'act__inst', text);
    ctx.root.appendChild(n);
    return n;
  }

  /* Gros bouton d'ecoute. C'est le geste central de l'application. */
  function listen(ctx, key, label) {
    var b = el('button', 'listen');
    b.appendChild(el('span', 'listen__ico', '\ud83d\udd0a'));
    if (label) b.appendChild(el('span', 'listen__lbl', label));
    b.addEventListener('click', function () {
      b.classList.add('is-playing');
      setTimeout(function () { b.classList.remove('is-playing'); }, 900);
      ctx.play(key);
    });
    ctx.root.appendChild(b);
    return b;
  }

  function listenText(ctx, text, lang, label) {
    var b = el('button', 'listen');
    b.appendChild(el('span', 'listen__ico', '\ud83d\udd0a'));
    if (label) b.appendChild(el('span', 'listen__lbl', label));
    b.addEventListener('click', function () {
      b.classList.add('is-playing');
      setTimeout(function () { b.classList.remove('is-playing'); }, 900);
      App.Audio.speak(text, lang || ctx.lang);
    });
    ctx.root.appendChild(b);
    return b;
  }

  /* Grille de reponses. onPick(choice, node) -> true si correct */
  function choices(ctx, list, opts) {
    opts = opts || {};
    var grid = el('div', 'choices' + (opts.cls ? ' ' + opts.cls : ''));
    shuffle(list).forEach(function (c) {
      var b = el('button', 'choice' + (c.kind ? ' choice--' + c.kind : ''));
      b.appendChild(el('span', 'choice__main', c.label));
      if (c.sub) b.appendChild(el('span', 'choice__sub', c.sub));
      b.addEventListener('click', function () {
        if (b.classList.contains('is-off') || grid.classList.contains('is-locked')) return;
        if (c.say) ctx.playText(c.say, c.lang);
        else if (c.key) ctx.play(c.key);
        if (c.correct) {
          grid.classList.add('is-locked');
          b.classList.add('is-right');
          ctx.win();
        } else {
          b.classList.add('is-off');
          ctx.miss(b, grid);
        }
      });
      grid.appendChild(b);
    });
    ctx.root.appendChild(grid);
    return grid;
  }

  function imgChoice(o, correct) {
    return { label: o.e, sub: null, correct: !!correct, kind: 'img', say: o.t, word: o.t };
  }

  /* =========================================================
     1. DECOUVERTE — l'enfant rencontre le son, sans rien a reussir
     ========================================================= */
  var A = {};

  A.discover = function (step, ctx) {
    var card = el('div', 'discover');
    card.appendChild(el('div', 'discover__big' + (step.letter ? ' read' : ''), step.big));
    card.appendChild(el('div', 'discover__title', step.title));
    ctx.root.appendChild(card);

    if (step.phonemeKey) listen(ctx, step.phonemeKey, ctx.T('listen'));
    else if (step.say) listenText(ctx, step.say.text, step.say.lang, ctx.T('listen'));

    if (step.examples) {
      var row = el('div', 'exrow');
      step.examples.forEach(function (x) {
        var b = el('button', 'ex');
        b.appendChild(el('span', 'ex__e', x.e));
        b.appendChild(el('span', 'ex__t read', x.t));
        b.addEventListener('click', function () { ctx.playText(x.t); });
        row.appendChild(b);
      });
      ctx.root.appendChild(row);
    }
    if (step.lines) {
      var ll = el('div', 'lines');
      step.lines.forEach(function (l) { ll.appendChild(el('div', 'lines__l read', l)); });
      ctx.root.appendChild(ll);
    }
    if (step.note) ctx.root.appendChild(el('div', 'note', step.note));

    var go = el('button', 'btn btn--primary btn--block', ctx.T('continue'));
    go.addEventListener('click', function () { ctx.win(true); });
    ctx.root.appendChild(go);

    /* On joue le son tout de suite : c'est une decouverte auditive. */
    setTimeout(function () {
      if (step.phonemeKey) ctx.play(step.phonemeKey);
      else if (step.say) App.Audio.speak(step.say.text, step.say.lang);
    }, 420);
  };

  /* =========================================================
     2. COMBIEN DE MORCEAUX  (conscience syllabique)
     ========================================================= */
  A['syllable-count'] = function (step, ctx) {
    var it = step.items[Math.floor(Math.random() * step.items.length)];
    instruction(ctx, ctx.T('q_syllCount'));
    var card = el('div', 'bigimg');
    card.appendChild(el('div', 'bigimg__e', it.e));
    card.appendChild(el('div', 'bigimg__t read', it.t));
    ctx.root.appendChild(card);
    listenText(ctx, it.t);

    var list = [1, 2, 3].map(function (n) {
      return { label: String(n), correct: n === it.n, kind: 'num' };
    });
    choices(ctx, list, { cls: 'choices--num' });
    setTimeout(function () { ctx.playText(it.t); }, 380);
  };

  /* =========================================================
     3. RIMES
     ========================================================= */
  A.rhyme = function (step, ctx) {
    instruction(ctx, ctx.T('q_rhyme') + ' ' + step.base.t + ' ?');
    var card = el('div', 'bigimg');
    card.appendChild(el('div', 'bigimg__e', step.base.e));
    card.appendChild(el('div', 'bigimg__t read', step.base.t));
    ctx.root.appendChild(card);
    listenText(ctx, step.base.t);

    var list = [imgChoice(step.good, true)].concat(step.bad.map(function (b) { return imgChoice(b); }));
    choices(ctx, list);
    setTimeout(function () { ctx.playText(step.base.t); }, 380);
  };

  /* =========================================================
     4. PREMIER SON
     ========================================================= */
  A['first-sound'] = function (step, ctx) {
    instruction(ctx, ctx.T('q_firstSound'));
    var card = el('div', 'bigimg');
    card.appendChild(el('div', 'bigimg__e', step.word.e));
    if (!step.oral) card.appendChild(el('div', 'bigimg__t read', step.word.t));
    ctx.root.appendChild(card);
    listenText(ctx, step.word.t);

    var list = [{ label: step.good, correct: true, kind: 'snd', say: step.good }]
      .concat(step.bad.map(function (b) { return { label: b, correct: false, kind: 'snd', say: b }; }));
    choices(ctx, list, { cls: 'choices--snd' });
    setTimeout(function () { ctx.playText(step.word.t); }, 380);
  };

  /* =========================================================
     5. FUSION ORALE  (aucune lettre : on colle deux sons entendus)
     ========================================================= */
  A['blend-oral'] = function (step, ctx) {
    instruction(ctx, ctx.T('q_blend'));
    var b = el('div', 'blend');
    var p1 = el('div', 'blend__p', step.parts[0]);
    var p2 = el('div', 'blend__p', step.parts[1]);
    var res = el('div', 'blend__r read', '?');
    b.appendChild(p1); b.appendChild(el('div', 'blend__plus', '+')); b.appendChild(p2);
    ctx.root.appendChild(b);
    ctx.root.appendChild(res);

    var play = el('button', 'listen');
    play.appendChild(el('span', 'listen__ico', '\ud83d\udd0a'));
    play.appendChild(el('span', 'listen__lbl', ctx.T('listen')));
    play.addEventListener('click', run);
    ctx.root.appendChild(play);

    function run() {
      b.classList.remove('is-merged');
      res.textContent = '?';
      ctx.playText(step.parts[0]).then(function () {
        p1.classList.add('is-on');
        return ctx.playText(step.parts[1]);
      }).then(function () {
        p2.classList.add('is-on');
        b.classList.add('is-merged');
        return ctx.playText(step.result);
      });
    }
    setTimeout(run, 400);

    instruction(ctx, ctx.T('q_blendResult'));
    var list = [{ label: step.good.t, correct: true, kind: 'read', say: step.good.t }]
      .concat(step.bad.map(function (x) { return { label: x.t, correct: false, kind: 'read', say: x.t }; }));
    choices(ctx, list, { cls: 'choices--read' });
  };

  /* =========================================================
     6. LE SON DANS LES MOTS
     ========================================================= */
  A['sound-in-words'] = function (step, ctx) {
    instruction(ctx, ctx.T('q_whichStarts'));
    listen(ctx, step.phonemeKey, ctx.T('listen'));
    var list = [imgChoice(step.good, true)].concat(step.bad.map(function (b) { return imgChoice(b); }));
    choices(ctx, list);
    if (step.note) ctx.root.appendChild(el('div', 'note', step.note));
    setTimeout(function () { ctx.play(step.phonemeKey); }, 380);
  };

  /* =========================================================
     7. TROUVER LA LETTRE
     ========================================================= */
  A['find-letter'] = function (step, ctx) {
    instruction(ctx, ctx.T('q_findLetter'));
    listen(ctx, step.phonemeKey, ctx.T('listen'));
    var list = [{ label: step.good, correct: true, kind: 'letter', key: step.phonemeKey }]
      .concat(step.bad.map(function (b) { return { label: b, correct: false, kind: 'letter' }; }));
    choices(ctx, list, { cls: 'choices--letter' });
    setTimeout(function () { ctx.play(step.phonemeKey); }, 380);
  };

  /* =========================================================
     8. TRIER  (deux colonnes)
     ========================================================= */
  A.sort = function (step, ctx) {
    instruction(ctx, ctx.T('q_sortIntro'));
    listen(ctx, step.phonemeKey, ctx.T('listen'));

    var board = el('div', 'sort');
    var colYes = el('div', 'sort__col sort__col--yes');
    colYes.appendChild(el('div', 'sort__h', ctx.T('q_sortYes') + ' ' + step.letter));
    var binYes = el('div', 'sort__bin'); colYes.appendChild(binYes);
    var colNo = el('div', 'sort__col sort__col--no');
    colNo.appendChild(el('div', 'sort__h', ctx.T('q_sortNo')));
    var binNo = el('div', 'sort__bin'); colNo.appendChild(binNo);
    board.appendChild(colYes); board.appendChild(colNo);
    ctx.root.appendChild(board);

    var pool = el('div', 'sort__pool');
    ctx.root.appendChild(pool);

    var items = shuffle(
      step.yes.map(function (o) { return { o: o, yes: true }; })
        .concat(step.no.map(function (o) { return { o: o, yes: false }; })));
    var left = items.length, sel = null;

    items.forEach(function (it) {
      var t = el('button', 'tile');
      t.appendChild(el('span', 'tile__e', it.o.e));
      t.appendChild(el('span', 'tile__t read', it.o.t));
      t.addEventListener('click', function () {
        if (t.classList.contains('is-placed')) return;
        ctx.playText(it.o.t);
        if (sel) sel.classList.remove('is-sel');
        sel = t; t.classList.add('is-sel');
      });
      it.node = t;
      pool.appendChild(t);
    });

    function drop(wantYes, bin) {
      return function () {
        if (!sel) return;
        var it = items.filter(function (x) { return x.node === sel; })[0];
        if (!it) return;
        if (it.yes === wantYes) {
          sel.classList.remove('is-sel');
          sel.classList.add('is-placed');
          bin.appendChild(sel);
          sel = null;
          App.Audio.sfx.pop();
          if (--left === 0) ctx.win();
        } else {
          ctx.miss(sel);
        }
      };
    }
    colYes.addEventListener('click', drop(true, binYes));
    colNo.addEventListener('click', drop(false, binNo));
    setTimeout(function () { ctx.play(step.phonemeKey); }, 380);
  };

  /* =========================================================
     9. ATTRAPER  (toucher toutes les bonnes lettres)
     ========================================================= */
  A.catch = function (step, ctx) {
    instruction(ctx, ctx.T('q_catch') + ' ' + step.target);
    var grid = el('div', 'catchg');
    var total = 0;
    shuffle(step.pool).forEach(function (L) {
      var b = el('button', 'catchg__c read', L);
      if (L === step.target) total++;
      b.addEventListener('click', function () {
        if (b.classList.contains('is-got') || b.classList.contains('is-no')) return;
        if (L === step.target) {
          b.classList.add('is-got');
          App.Audio.sfx.pop();
          if (--total === 0) ctx.win();
        } else {
          b.classList.add('is-no');
          ctx.miss(b);
          setTimeout(function () { b.classList.remove('is-no'); }, 700);
        }
      });
      grid.appendChild(b);
    });
    ctx.root.appendChild(grid);
  };

  /* =========================================================
     10. MEMOIRE  (paires lettre <-> image)
     ========================================================= */
  A.memory = function (step, ctx) {
    instruction(ctx, ctx.T('q_memoryIntro'));
    var cards = [];
    step.pairs.forEach(function (p, i) {
      cards.push({ k: i, face: p.e, kind: 'img', word: p.label });
      cards.push({ k: i, face: p.e, kind: 'img', word: p.label });
    });
    var grid = el('div', 'mem');
    var open = [], left = step.pairs.length, busy = false;

    shuffle(cards).forEach(function (c) {
      var b = el('button', 'mem__c');
      var inner = el('span', 'mem__f' + (c.kind === 'letter' ? ' read' : ''), c.face);
      b.appendChild(inner);
      b.addEventListener('click', function () {
        if (busy || b.classList.contains('is-up') || b.classList.contains('is-done')) return;
        b.classList.add('is-up');
        ctx.playText(c.word);
        open.push({ c: c, n: b });
        if (open.length === 2) {
          busy = true;
          if (open[0].c.k === open[1].c.k) {
            setTimeout(function () {
              open.forEach(function (o) { o.n.classList.add('is-done'); });
              open = []; busy = false;
              App.Audio.sfx.good();
              if (--left === 0) ctx.win();
            }, 420);
          } else {
            ctx.miss();
            setTimeout(function () {
              open.forEach(function (o) { o.n.classList.remove('is-up'); });
              open = []; busy = false;
            }, 780);
          }
        }
      });
      grid.appendChild(b);
    });
    ctx.root.appendChild(grid);
  };

  /* =========================================================
     11. REVISION DES LETTRES DEJA VUES
     ========================================================= */
  A['letters-review'] = function (step, ctx) {
    instruction(ctx, step.title);
    var row = el('div', 'exrow');
    step.items.forEach(function (it) {
      var b = el('button', 'ex ex--letter');
      b.appendChild(el('span', 'ex__e read', it.letter));
      b.addEventListener('click', function () { ctx.play(it.key); });
      row.appendChild(b);
    });
    ctx.root.appendChild(row);
    var go = el('button', 'btn btn--primary btn--block', ctx.T('continue'));
    go.addEventListener('click', function () { ctx.win(true); });
    ctx.root.appendChild(go);
    var i = 0;
    (function chain() {
      if (i >= step.items.length) return;
      var it = step.items[i++];
      ctx.play(it.key).then(function () { setTimeout(chain, 400); });
    })();
  };

  /* =========================================================
     12. FUSION  (la signature du produit : deux galets se collent)
     ========================================================= */
  A.blend = function (step, ctx) {
    instruction(ctx, ctx.T('q_blend'));
    var b = el('div', 'blend');
    var p1 = el('div', 'blend__p read', step.a.l);
    var p2 = el('div', 'blend__p read', step.b.l);
    b.appendChild(p1); b.appendChild(el('div', 'blend__plus', '+')); b.appendChild(p2);
    var res = el('div', 'blend__r read', '?');
    ctx.root.appendChild(b);
    ctx.root.appendChild(res);

    p1.addEventListener('click', function () { ctx.play(step.a.key); });
    p2.addEventListener('click', function () { ctx.play(step.b.key); });

    var play = el('button', 'listen');
    play.appendChild(el('span', 'listen__ico', '\ud83d\udd0a'));
    play.appendChild(el('span', 'listen__lbl', ctx.T('listen')));
    play.addEventListener('click', run);
    ctx.root.appendChild(play);

    function run() {
      b.classList.remove('is-merged');
      res.textContent = '?';
      p1.classList.remove('is-on'); p2.classList.remove('is-on');
      ctx.play(step.a.key).then(function () {
        p1.classList.add('is-on');
        return ctx.play(step.b.key);
      }).then(function () {
        p2.classList.add('is-on');
        b.classList.add('is-merged');
        res.textContent = step.result;
        return ctx.play(step.resultKey);
      });
    }
    setTimeout(run, 420);

    instruction(ctx, ctx.T('q_blendResult'));
    var list = [{ label: step.result, correct: true, kind: 'read', key: step.resultKey }]
      .concat(step.bad.map(function (x) { return { label: x, correct: false, kind: 'read', say: x }; }));
    choices(ctx, list, { cls: 'choices--read' });
  };

  /* =========================================================
     13. CONSTRUIRE  (briques a poser dans l'ordre)
     ========================================================= */
  A.build = function (step, ctx) {
    instruction(ctx, step.kind === 'syllables' ? ctx.T('q_build') : ctx.T('q_build'));
    if (step.audioKey) listen(ctx, step.audioKey, ctx.T('listen'));

    var parts = step.kind === 'syllables'
      ? cutSyll(step.target, step.bricks)
      : step.target.split('');

    var slots = el('div', 'slots');
    var slotNodes = parts.map(function () {
      var s = el('div', 'slot'); slots.appendChild(s); return s;
    });
    ctx.root.appendChild(slots);

    var bank = el('div', 'bricks');
    ctx.root.appendChild(bank);
    var filled = 0;

    shuffle(step.bricks).forEach(function (v) {
      var br = el('button', 'brick read', v);
      br.addEventListener('click', function () {
        if (br.classList.contains('is-used')) return;
        if (v === parts[filled]) {
          br.classList.add('is-used');
          slotNodes[filled].textContent = v;
          slotNodes[filled].classList.add('is-full');
          filled++;
          App.Audio.sfx.pop();
          if (filled === parts.length) {
            slots.classList.add('is-done');
            if (step.audioKey) ctx.play(step.audioKey);
            setTimeout(function () { ctx.win(); }, 500);
          }
        } else {
          ctx.miss(br);
        }
      });
      bank.appendChild(br);
    });
  };

  /* Decoupe LAMA en LA + MA a partir des briques disponibles */
  function cutSyll(target, bricks) {
    var out = [], rest = target;
    var sorted = bricks.slice().sort(function (a, b) { return b.length - a.length; });
    var guard = 0;
    while (rest.length && guard++ < 12) {
      var hit = null;
      for (var i = 0; i < sorted.length; i++) {
        if (rest.indexOf(sorted[i]) === 0) { hit = sorted[i]; break; }
      }
      if (!hit) { out.push(rest); break; }
      out.push(hit);
      rest = rest.slice(hit.length);
    }
    return out;
  }

  /* =========================================================
     14. SEGMENTER  (combien de sons)
     ========================================================= */
  A.segment = function (step, ctx) {
    instruction(ctx, ctx.T('q_segment'));
    var card = el('div', 'bigimg');
    card.appendChild(el('div', 'bigimg__t read big', step.word));
    ctx.root.appendChild(card);
    if (step.audioKey) listen(ctx, step.audioKey, ctx.T('listen'));

    var list = [2, 3, 4].map(function (n) {
      return { label: String(n), correct: n === step.n, kind: 'num' };
    });
    choices(ctx, list, { cls: 'choices--num' });
    if (step.audioKey) setTimeout(function () { ctx.play(step.audioKey); }, 380);
  };

  /* =========================================================
     15. LIRE A VOIX HAUTE  (§22 : simule, sans reconnaissance vocale)
     ========================================================= */
  A['read-aloud'] = function (step, ctx) {
    instruction(ctx, step.text.length > 3 ? ctx.T('q_readWord') : ctx.T('q_readSyll'));
    var card = el('div', 'bigimg');
    card.appendChild(el('div', 'bigimg__t read big', step.text));
    ctx.root.appendChild(card);

    if (step.hint) ctx.root.appendChild(el('div', 'note', step.hint));

    var done = el('button', 'btn btn--primary btn--block', ctx.T('iReadIt'));
    done.addEventListener('click', function () {
      if (step.audioKey) ctx.play(step.audioKey);
      setTimeout(function () { ctx.win(true); }, 620);
    });
    ctx.root.appendChild(done);

    var hear = el('button', 'btn btn--quiet btn--block', ctx.T('listen'));
    hear.addEventListener('click', function () {
      if (step.audioKey) ctx.play(step.audioKey);
      else ctx.playText(step.text);
    });
    ctx.root.appendChild(hear);
  };

  /* =========================================================
     16. LE MOT ET SON SENS
     ========================================================= */
  A['word-to-image'] = function (step, ctx) {
    instruction(ctx, ctx.T('q_wordToImage'));
    var card = el('div', 'bigimg');
    card.appendChild(el('div', 'bigimg__t read big', step.word));
    ctx.root.appendChild(card);
    if (step.audioKey) listen(ctx, step.audioKey, ctx.T('listen'));

    var list = [{ label: step.good, correct: true, kind: 'img' }]
      .concat(step.bad.map(function (b) { return { label: b, correct: false, kind: 'img' }; }));
    choices(ctx, list);
  };

  /* =========================================================
     17. SUIVRE UNE CONSIGNE
     ========================================================= */
  A.instruction = function (step, ctx) {
    instruction(ctx, ctx.T('q_instruction'));
    listenText(ctx, step.say.text, step.say.lang, ctx.T('listen'));
    var list = [{ label: step.target, correct: true, kind: 'read', say: step.target }]
      .concat(step.others.map(function (o) { return { label: o, correct: false, kind: 'read', say: o }; }));
    choices(ctx, list, { cls: 'choices--read' });
    setTimeout(function () { App.Audio.speak(step.say.text, step.say.lang); }, 400);
  };

  /* =========================================================
     18. MOT OUTIL  (appris par coeur, pas dechiffrable)
     ========================================================= */
  A['tricky-word'] = function (step, ctx) {
    var card = el('div', 'discover');
    card.appendChild(el('div', 'discover__big read', step.word));
    card.appendChild(el('div', 'discover__title', step.note));
    ctx.root.appendChild(card);
    if (step.audioKey) listen(ctx, step.audioKey, ctx.T('listen'));
    else listenText(ctx, step.word, ctx.lang, ctx.T('listen'));

    instruction(ctx, ctx.T('q_instruction') + ' ' + step.word);
    var list = [{ label: step.word, correct: true, kind: 'read', say: step.word }]
      .concat(step.others.map(function (o) { return { label: o, correct: false, kind: 'read', say: o }; }));
    choices(ctx, list, { cls: 'choices--read' });
    setTimeout(function () { ctx.playText(step.word); }, 400);
  };

  /* =========================================================
     19. MINI-HISTOIRE  (on lit d'abord, l'image se revele ensuite)
     ========================================================= */
  A['mini-story'] = function (step, ctx) {
    var i = 0;
    var wrap = el('div', 'story');
    ctx.root.appendChild(wrap);
    draw();

    function draw() {
      wrap.innerHTML = '';
      var p = step.pages[i];
      wrap.appendChild(el('div', 'story__n', ctx.T('q_story') + '  \u00b7  ' + (i + 1) + '/' + step.pages.length));
      var line = el('div', 'story__line read');
      p.text.split(' ').forEach(function (w) {
        var s = el('span', 'story__w', w);
        s.addEventListener('click', function () {
          s.classList.add('is-on');
          ctx.playText(w.replace(/[.!?,]/g, ''));
          setTimeout(function () { s.classList.remove('is-on'); }, 700);
        });
        line.appendChild(s);
      });
      wrap.appendChild(line);

      var img = el('div', 'story__img', '\u2753');
      img.classList.add('is-hidden');
      wrap.appendChild(img);

      var read = el('button', 'btn btn--primary btn--block', ctx.T('iReadIt'));
      read.addEventListener('click', function () {
        img.textContent = p.e;
        img.classList.remove('is-hidden');
        read.remove();
        ctx.playText(p.text);
        var nx = el('button', 'btn btn--primary btn--block',
          i < step.pages.length - 1 ? ctx.T('turnPage') : ctx.T('continue'));
        nx.addEventListener('click', function () {
          i++;
          if (i < step.pages.length) draw();
          else ctx.win(true);
        });
        wrap.appendChild(nx);
      });
      wrap.appendChild(read);

      var hear = el('button', 'btn btn--quiet btn--block', ctx.T('listen'));
      hear.addEventListener('click', function () { ctx.playText(p.text); });
      wrap.appendChild(hear);
    }
  };

  /* =========================================================
     20. CLOTURE  (geree par le runner, declaree ici pour completude)
     ========================================================= */
  A.wrap = function (step, ctx) { ctx.win(true); };

  return {
    render: function (step, ctx) {
      var f = A[step.act];
      if (!f) { ctx.win(true); return false; }
      f(step, ctx);
      return true;
    },
    list: function () { return Object.keys(A); },
    _el: el,
    _shuffle: shuffle
  };
})();
