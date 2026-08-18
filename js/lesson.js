/* =========================================================
   js/lesson.js — L'écran de leçon.
   Une seule tâche à l'écran (§30). L'erreur est normale (§31).
   ========================================================= */

window.App = window.App || {};

App.Lesson = (function () {

  var root, trackEl, taskEl, flagEl;
  var session = null, idx = 0, stars = 0, t0 = 0, busy = false;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function T(k) { return App.T(session ? session.lang : 'fr', k); }

  function mount() {
    root = document.getElementById('lesson');
    trackEl = document.getElementById('lessonTrack');
    taskEl = document.getElementById('task');
    flagEl = document.getElementById('lessonFlag');
    document.getElementById('lessonQuit').addEventListener('click', quit);
  }

  /* ---------------- Cycle de vie ---------------- */
  function start(lang, mode) {
    var plan = App.Engine.buildSession(lang, mode);
    session = plan; idx = 0; stars = 0; t0 = Date.now();
    document.documentElement.setAttribute('data-lang', lang);
    flagEl.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
    root.hidden = false;
    drawTrack();
    step();
  }

  function quit() {
    App.Audio.stop();
    saveTime();
    root.hidden = true;
    session = null;
    App.UI.refresh();
  }

  function saveTime() {
    if (!session || !t0) return;
    var secs = Math.min(1800, Math.round((Date.now() - t0) / 1000));
    if (secs > 3) App.State.addTime(session.lang, secs);
    t0 = 0;
  }

  function drawTrack() {
    trackEl.innerHTML = '';
    for (var i = 0; i < session.steps.length; i++) {
      var s = el('div', 'lbar__seg' + (i < idx ? ' is-done' : (i === idx ? ' is-now' : '')));
      trackEl.appendChild(s);
    }
  }

  function next() {
    idx++;
    drawTrack();
    step();
  }

  function step() {
    busy = false;
    App.Audio.stop();
    if (!session || idx >= session.steps.length) return finish();

    var plan = session.steps[idx];
    var ex = plan.kind === 'teach'
      ? App.Exercises.teach(plan, session.lang)
      : App.Exercises.make(plan, session.lang);

    if (!ex) { /* contenu indisponible : on saute proprement */ return next(); }
    render(ex);
  }

  /* ---------------- Rendu ---------------- */
  function render(ex) {
    taskEl.innerHTML = '';
    taskEl.scrollTop = 0;

    var inst = el('h2', 'task__inst', ex.instruction || '');
    taskEl.appendChild(inst);

    var body = el('div', 'task__body');
    taskEl.appendChild(body);

    if (ex.special === 'teach')          renderTeach(ex, body);
    else if (ex.special === 'blend')     renderBlend(ex, body);
    else if (ex.special === 'builder')   renderBuilder(ex, body);
    else if (ex.special === 'sentence')  renderSentence(ex, body);
    else if (ex.special === 'comprehension') renderComprehension(ex, body);
    else if (ex.special === 'bilingual') renderBilingual(ex, body);
    else                                 renderStandard(ex, body);
  }

  /* --- Carte "nouvelle notion" --- */
  function renderTeach(ex, body) {
    var sk = ex.skill;
    var wrap = el('div', 'teach');

    if (sk.label && (sk.type === 'grapheme' || sk.type === 'complex')) {
      var glyph = el('div', 'teach__glyph read', sk.label + ' <span style="opacity:.45">' + (sk.lower || sk.label.toLowerCase()) + '</span>');
      wrap.appendChild(glyph);
      wrap.appendChild(el('div', 'teach__phon', T('itSays') + ' ' + (sk.phoneme || '')));
    } else {
      wrap.appendChild(el('div', 'teach__glyph', '💡'));
      wrap.appendChild(el('div', 'teach__phon', sk.label || ''));
    }

    if (sk.teach) wrap.appendChild(el('p', 'muted', '<span style="color:rgba(255,244,228,.75)">' + sk.teach + '</span>'));

    var listen = el('button', 'listen', '🔊');
    listen.setAttribute('aria-label', T('listen'));
    listen.addEventListener('click', function () { playTeach(sk, listen); });
    wrap.appendChild(listen);

    if (sk.examples && sk.examples.length) {
      var ex3 = el('div', 'teach__ex');
      sk.examples.slice(0, 3).forEach(function (x) {
        var b = el('button', 'teach__exi');
        b.appendChild(el('span', 'teach__exe', x.e));
        b.appendChild(el('span', 'teach__exw', x.w));
        b.addEventListener('click', function () { App.Audio.speak(x.w, ex.lang, { slow: true }); });
        ex3.appendChild(b);
      });
      wrap.appendChild(ex3);
    }

    var go = el('button', 'btn btn--primary btn--big btn--block', T('gotIt'));
    go.addEventListener('click', function () {
      App.State.markSeen(sk.id);
      next();
    });
    wrap.appendChild(go);
    body.appendChild(wrap);

    setTimeout(function () { playTeach(sk, listen); }, 420);
  }

  function playTeach(sk, btn) {
    btn.classList.add('is-playing');
    var items = [];
    if (sk.say) items.push({ text: sk.say, lang: sk.lang || 'fr', slow: true, gap: 260 });
    if (sk.examples) sk.examples.slice(0, 2).forEach(function (x) {
      items.push({ text: x.w, lang: sk.lang || 'fr', gap: 200 });
    });
    App.Audio.sequence(items, function () { btn.classList.remove('is-playing'); });
  }

  /* --- Exercice standard : consigne + prompt + choix --- */
  function renderStandard(ex, body) {
    body.appendChild(promptNode(ex));
    body.appendChild(choicesNode(ex));
    body.appendChild(feedbackNode());
    autoplay(ex);
  }

  function promptNode(ex) {
    var p = ex.prompt || {};
    var box = el('div', '');

    if (p.type === 'audio' || p.type === 'audio-seq' || p.type === 'audio-word') {
      var b = el('button', 'listen', '🔊');
      b.setAttribute('aria-label', App.T(ex.lang, 'listen'));
      b.addEventListener('click', function () { playPrompt(ex, b); });
      box.appendChild(b);
      if (p.hint) box.appendChild(el('span', 'listen__hint', p.hint));
      box._audioBtn = b;
      box.dataset.audio = '1';
    } else if (p.type === 'glyph') {
      box.appendChild(el('div', 'showpiece', p.text));
    } else if (p.type === 'word') {
      box.appendChild(el('div', 'showpiece showpiece--word', p.text));
    } else if (p.type === 'emoji') {
      var e = el('div', 'showpiece showpiece--emoji', p.text);
      box.appendChild(e);
      if (p.say) {
        var s = el('button', 'btn btn--quiet btn--sm', '🔊 ' + App.T(ex.lang, 'listen'));
        s.style.margin = '12px auto 0'; s.style.display = 'flex';
        s.addEventListener('click', function () { App.Audio.speak(p.say, ex.lang, { slow: true }); });
        box.appendChild(s);
      }
      if (p.caption) box.appendChild(el('div', 'listen__hint read', p.caption));
    }
    return box;
  }

  function playPrompt(ex, btn) {
    var p = ex.prompt || {};
    if (btn) btn.classList.add('is-playing');
    var done = function () { if (btn) btn.classList.remove('is-playing'); };
    if (p.type === 'audio-seq') {
      var items = p.parts.map(function (x) { return { text: x, lang: p.lang, slow: true, gap: 300 }; });
      items.push({ pause: 380 });
      App.Audio.sequence(items, done);
    } else if (p.type === 'audio-word') {
      App.Audio.speak(p.say, p.lang, { slow: true, onend: done });
    } else {
      App.Audio.speak(p.say, p.lang, { slow: true, onend: done });
    }
  }

  function autoplay(ex) {
    var p = ex.prompt || {};
    if (p.type === 'word' && p.silent) return;   /* §22 : on lit d'abord, on n'entend pas */
    if (p.type === 'audio' || p.type === 'audio-seq' || p.type === 'audio-word' || p.autoplay) {
      setTimeout(function () {
        var b = taskEl.querySelector('.listen');
        playPrompt(ex, b);
      }, 380);
    }
  }

  function choicesNode(ex) {
    var cls = 'choices ' + (ex.layout === 'stack' ? 'choices--stack' : ex.layout === 'grid2' ? 'choices--2' : 'choices--3');
    var grid = el('div', cls);
    ex.choices.forEach(function (c) {
      var kind = c.kind === 'emoji' ? 'choice--emoji' :
                 c.kind === 'audio' ? 'choice--audio' :
                 c.kind === 'text'  ? 'choice--text'  :
                 c.kind === 'word'  ? 'choice--word'  : '';
      var b = el('button', 'choice ' + kind, c.label);
      b.addEventListener('click', function () {
        if (c.kind === 'audio') {
          App.Audio.speak(c.say, ex.lang, { slow: true });
          if (b._armed) { answer(ex, c, b, grid); return; }
          b._armed = true;
          setTimeout(function () { b._armed = false; }, 2600);
          b.classList.add('is-right');
          setTimeout(function () { b.classList.remove('is-right'); }, 260);
          return;
        }
        answer(ex, c, b, grid);
      });
      grid.appendChild(b);
    });
    if (ex.choices.some(function (c) { return c.kind === 'audio'; })) {
      var tip = el('div', 'listen__hint', App.T(ex.lang, 'tapToHear'));
      var wrap = el('div', '');
      wrap.appendChild(grid); wrap.appendChild(tip);
      return wrap;
    }
    return grid;
  }

  /* --- Fusion (signature) --- */
  function renderBlend(ex, body) {
    var b = ex.blend;
    var stage = el('div', 'blend');
    var st = el('div', 'blend__stage');
    var pa = el('div', 'blend__piece blend__piece--a', b.a);
    var pb = el('div', 'blend__piece blend__piece--b', b.b);
    var res = el('div', 'blend__result', b.result);
    var spark = el('div', 'blend__spark');
    st.appendChild(pa); st.appendChild(pb); st.appendChild(res); st.appendChild(spark);
    stage.appendChild(st);

    var play = el('button', 'btn btn--quiet', '▶︎ ' + App.T(ex.lang, 'listen'));
    stage.appendChild(play);
    body.appendChild(stage);

    var question = el('h3', 'task__inst', ex.question);
    question.style.marginTop = '8px';
    question.hidden = true;
    body.appendChild(question);

    var grid = choicesNode(ex);
    grid.hidden = true;
    body.appendChild(grid);
    body.appendChild(feedbackNode());

    function run() {
      stage.classList.remove('is-fusing', 'is-fused');
      App.Audio.sequence([
        { text: b.sayA, lang: ex.lang, slow: true, gap: 120 },
        { text: b.sayB, lang: ex.lang, slow: true, gap: 60 }
      ], function () {
        stage.classList.add('is-fusing');
        setTimeout(function () {
          stage.classList.add('is-fused');
          App.Audio.sfxFuse();
          App.Audio.speak(b.sayR, ex.lang, { slow: true, onend: function () {
            question.hidden = false; grid.hidden = false;
          } });
          setTimeout(function () { question.hidden = false; grid.hidden = false; }, 2200);
        }, 640);
      });
    }
    play.addEventListener('click', run);
    setTimeout(run, 420);
  }

  /* --- Construction / remise en ordre --- */
  function renderBuilder(ex, body) {
    var B = ex.builder;
    var wrap = el('div', 'stack');

    if (B.emoji) {
      var pic = el('div', 'showpiece showpiece--emoji', B.emoji);
      pic.style.fontSize = '68px';
      wrap.appendChild(pic);
    }
    if (B.showModel) {
      var model = el('div', 'showpiece showpiece--word read', B.word);
      model.style.fontSize = '2rem'; model.style.opacity = '.7';
      wrap.appendChild(model);
    }
    var hear = el('button', 'btn btn--quiet btn--sm', '🔊');
    hear.style.margin = '0 auto'; hear.style.display = 'flex';
    hear.addEventListener('click', function () { App.Audio.speak(B.word, ex.lang, { slow: true }); });
    wrap.appendChild(hear);

    var slots = el('div', 'slots');
    var slotEls = [];
    B.target.forEach(function () {
      var s = el('div', 'slot' + (B.kind === 'words' ? ' slot--w' : ''));
      if (B.kind === 'words') { s.style.width = 'auto'; s.style.minWidth = '78px'; s.style.padding = '0 10px'; s.style.fontSize = '20px'; }
      slots.appendChild(s); slotEls.push(s);
    });
    wrap.appendChild(slots);

    var bank = el('div', 'bank');
    var filled = 0;
    B.bank.forEach(function (u) {
      var brick = el('button', 'brick', u);
      if (B.kind === 'words') { brick.style.fontSize = '20px'; brick.style.minWidth = '0'; brick.style.padding = '0 14px'; }
      brick.addEventListener('click', function () {
        if (busy || filled >= B.target.length) return;
        var want = B.target[filled];
        var slot = slotEls[filled];
        slot.textContent = u;
        slot.classList.add('is-filled');
        brick.classList.add('is-used');
        brick._slot = slot;
        filled++;
        App.Audio.speak(B.kind === 'words' ? u : u.toLowerCase(), ex.lang, { slow: true, rate: .9 });

        if (u !== want) {
          setTimeout(function () { wrongBuild(ex, slot, brick, function () { filled--; }); }, 380);
          return;
        }
        if (filled === B.target.length) {
          slotEls.forEach(function (s) { s.classList.add('is-good'); });
          setTimeout(function () {
            App.Audio.speak(B.word, ex.lang, { slow: true });
            good(ex);
          }, 300);
        }
      });
      bank.appendChild(brick);
    });
    wrap.appendChild(bank);
    body.appendChild(wrap);
    body.appendChild(feedbackNode());
  }

  function wrongBuild(ex, slot, brick, undo) {
    slot.textContent = '';
    slot.classList.remove('is-filled');
    brick.classList.remove('is-used');
    undo();
    soft(ex);
  }

  /* --- Lecture de phrase --- */
  function renderSentence(ex, body) {
    var S = ex.sentence;
    var wrap = el('div', 'stack');
    var line = el('div', 'sentence');
    var readCount = 0;
    S.words.forEach(function (w) {
      var span = el('button', 'sentence__w', w);
      span.addEventListener('click', function () {
        if (!span._done) { span._done = true; readCount++; }
        line.querySelectorAll('.sentence__w').forEach(function (x) { x.classList.remove('is-lit'); });
        span.classList.add('is-lit');
        App.Audio.speak(w.replace(/[.!?]/g, ''), ex.lang, { slow: true });
      });
      line.appendChild(span);
    });
    wrap.appendChild(line);
    wrap.appendChild(el('div', 'listen__hint', ex.hint));

    var pic = el('div', 'sentence__pic');
    pic.style.opacity = '0';
    pic.style.transition = 'opacity .5s ease';
    pic.textContent = S.emoji || '';
    wrap.appendChild(pic);

    var whole = el('button', 'btn btn--quiet btn--block', '🔊');
    whole.addEventListener('click', function () { App.Audio.speak(S.text, ex.lang, { slow: true }); });
    wrap.appendChild(whole);

    var done = el('button', 'btn btn--primary btn--big btn--block', App.T(ex.lang, 'iReadIt'));
    done.addEventListener('click', function () {
      pic.style.opacity = '1';       /* l'image arrive APRÈS la lecture (§22) */
      App.State.bump('sentencesRead');
      App.Audio.speak(S.text, ex.lang, { slow: true });
      setTimeout(function () { good(ex); }, 700);
    });
    wrap.appendChild(done);
    body.appendChild(wrap);
    body.appendChild(feedbackNode());
  }

  /* --- Compréhension --- */
  function renderComprehension(ex, body) {
    var wrap = el('div', 'stack');
    var line = el('div', 'sentence read', ex.reading.text);
    line.style.fontSize = '1.35rem';
    wrap.appendChild(line);
    var hear = el('button', 'btn btn--quiet btn--sm', '🔊');
    hear.style.margin = '0 auto'; hear.style.display = 'flex';
    hear.addEventListener('click', function () { App.Audio.speak(ex.reading.text, ex.lang, { slow: true }); });
    wrap.appendChild(hear);
    wrap.appendChild(el('h3', 'task__inst', ex.question));
    body.appendChild(wrap);
    body.appendChild(choicesNode(ex));
    body.appendChild(feedbackNode());
    setTimeout(function () { App.Audio.speak(ex.reading.text + ' ' + ex.question, ex.lang, { slow: true }); }, 500);
  }

  /* --- Mission bilingue --- */
  function renderBilingual(ex, body) {
    var b = ex.bi;
    var wrap = el('div', 'stack');
    var grid = el('div', 'choices choices--2');

    [['fr', b.fr, '🇫🇷'], ['en', b.en, '🇬🇧']].forEach(function (row) {
      var card = el('button', 'choice choice--emoji');
      card.style.flexDirection = 'column';
      card.innerHTML = '<span style="font-size:34px">' + row[1].emoji + '</span>' +
                       '<span class="read" style="font-size:20px;font-weight:700">' + row[1].word + '</span>' +
                       '<span style="font-size:16px">' + row[2] + ' 🔊</span>';
      card.addEventListener('click', function () { App.Audio.speak(row[1].say, row[0], { slow: true }); });
      grid.appendChild(card);
    });
    wrap.appendChild(el('div', 'showpiece read', b.graph));
    wrap.appendChild(grid);
    wrap.appendChild(el('h3', 'task__inst', ex.question));
    body.appendChild(wrap);
    body.appendChild(choicesNode(ex));
    body.appendChild(feedbackNode());

    setTimeout(function () {
      App.Audio.sequence([
        { text: b.fr.say, lang: 'fr', slow: true, gap: 400 },
        { text: b.en.say, lang: 'en', slow: true }
      ]);
    }, 450);
  }

  /* ---------------- Réponses et retours ---------------- */
  function feedbackNode() {
    var fb = el('div', 'fb fb--good');
    fb.id = 'fb';
    fb.innerHTML = '<span class="fb__emo"></span><span class="fb__txt"></span>';
    var b = el('button', 'btn btn--sm', '→');
    b.id = 'fbGo';
    fb.appendChild(b);
    return fb;
  }

  function answer(ex, choice, node, grid) {
    if (busy) return;
    ex.tries = (ex.tries || 0) + 1;

    if (choice.correct) {
      node.classList.add('is-right');
      if (ex.skillId && ex.tries === 1) App.State.record(ex.skillId, ex.dim, true);
      good(ex);
    } else {
      node.classList.add('is-wrong');
      setTimeout(function () { node.classList.remove('is-wrong'); node.classList.add('is-off'); }, 420);
      if (ex.skillId && ex.tries === 1) App.State.record(ex.skillId, ex.dim, false);
      soft(ex);
      /* Mode "besoin d'aide" (§40) : on ne remet jamais le même obstacle
         à l'identique. Au 2e essai, on écarte une mauvaise réponse. */
      if (ex.tries >= 2 && grid) reduceChoices(ex, grid);
    }
  }

  /* Retire une mauvaise réponse encore active, en gardant toujours
     au moins deux boutons à l'écran. */
  function reduceChoices(ex, grid) {
    var nodes = [].slice.call(grid.querySelectorAll('.choice'));
    var alive = nodes.filter(function (n) { return !n.classList.contains('is-off'); });
    if (alive.length <= 2) return;
    for (var i = 0; i < nodes.length; i++) {
      var c = ex.choices[i];
      if (c && !c.correct && !nodes[i].classList.contains('is-off')) {
        nodes[i].classList.add('is-off');
        return;
      }
    }
  }

  function good(ex) {
    if (busy) return;
    busy = true;
    var n = 1 + (ex.tries <= 1 ? 1 : 0);
    stars += n;
    App.State.addStars(n);
    if (ex.dim === 'reading' && (ex.drill === 'word-to-image' || ex.drill === 'image-to-word' || ex.drill === 'letter-order')) {
      App.State.bump('wordsRead');
    }
    if (ex.drill === 'bilingual') App.State.bump('bilingual');
    App.Audio.sfxGood();

    var fb = document.getElementById('fb');
    if (fb) {
      fb.className = 'fb fb--good is-up';
      fb.querySelector('.fb__emo').textContent = '✨';
      fb.querySelector('.fb__txt').textContent = pickOne(DATA.praise[ex.lang]) + '  +' + n + ' ⭐';
      document.getElementById('fbGo').onclick = next;
    }
    setTimeout(next, 1250);
  }

  function soft(ex) {
    App.Audio.sfxSoft();
    var fb = document.getElementById('fb');
    if (!fb) return;
    fb.className = 'fb fb--soft is-up';
    fb.querySelector('.fb__emo').textContent = '👂';
    var msg = pickOne(DATA.retry[ex.lang]);
    if (ex.tries >= 2 && ex.help) msg = ex.help;
    fb.querySelector('.fb__txt').textContent = msg;
    var go = document.getElementById('fbGo');
    go.textContent = '🔊';
    go.onclick = function () {
      var b = taskEl.querySelector('.listen');
      if (ex.prompt && (ex.prompt.say || ex.prompt.parts)) playPrompt(ex, b);
      else if (ex.builder) App.Audio.speak(ex.builder.word, ex.lang, { slow: true });
      else if (ex.reading) App.Audio.speak(ex.reading.text, ex.lang, { slow: true });
    };
    setTimeout(function () { if (fb) fb.classList.remove('is-up'); }, 3200);
    if (ex.prompt && (ex.prompt.type === 'audio' || ex.prompt.type === 'audio-seq' || ex.prompt.type === 'audio-word')) {
      setTimeout(function () { playPrompt(ex, taskEl.querySelector('.listen')); }, 600);
    }
  }

  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ---------------- Fin de séance ---------------- */
  function finish() {
    saveTime();
    var lang = session ? session.lang : 'fr';
    App.State.get().log.unshift({ d: App.State.today(), lang: lang, stars: stars });
    App.State.get().log = App.State.get().log.slice(0, 40);
    App.State.save();

    taskEl.innerHTML = '';
    var f = el('div', 'finish');
    f.appendChild(el('div', 'finish__emo', '🎉'));
    f.appendChild(el('div', 'finish__h', App.T(lang, 'done')));
    f.appendChild(el('div', 'finish__stars', '⭐ ' + stars + ' ' + App.T(lang, 'starsWon')));

    var b1 = el('button', 'btn btn--primary btn--big btn--block', App.T(lang, 'keepGoing'));
    b1.addEventListener('click', function () { start(lang, 'daily'); });
    var b2 = el('button', 'btn btn--ghost btn--block', App.T(lang, 'backHome'));
    b2.addEventListener('click', quit);
    f.appendChild(b1); f.appendChild(b2);
    taskEl.appendChild(f);
    App.Audio.sfxStar();

    trackEl.querySelectorAll('.lbar__seg').forEach(function (s) {
      s.classList.remove('is-now'); s.classList.add('is-done');
    });

    setTimeout(function () { App.Rewards.checkBadges(); }, 700);
  }

  return { mount: mount, start: start, quit: quit };
})();
