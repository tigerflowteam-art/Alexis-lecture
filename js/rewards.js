/* =========================================================
   js/rewards.js — Les grandes récompenses (§26)
   Un moment mémorable, pas une notification de plus.
   ========================================================= */

window.App = window.App || {};

App.Rewards = (function () {

  var queue = [];

  function snapshot() {
    var st = App.State.get();
    var fr = App.Engine.introduced('fr'), en = App.Engine.introduced('en');
    return {
      stars: st.stars,
      discovered: fr.length + en.length,
      mastered: App.Engine.mastered('fr').length + App.Engine.mastered('en').length,
      frSkills: fr.length, enSkills: en.length,
      books: st.booksRead.length,
      streak: st.streak,
      wordsRead: st.counters.wordsRead || 0,
      sentencesRead: st.counters.sentencesRead || 0,
      bilingual: st.counters.bilingual || 0
    };
  }

  function checkBadges() {
    var st = App.State.get();
    var s = snapshot();
    DATA.badges.forEach(function (b) {
      if (st.badges.indexOf(b.id) !== -1) return;
      var ok = false;
      try { ok = b.check(s); } catch (e) { ok = false; }
      if (ok) { st.badges.push(b.id); queue.push(b); }
    });
    unlockAccessories(s);
    App.State.save();
    flush();
  }

  function unlockAccessories(s) {
    var st = App.State.get();
    DATA.accessories.forEach(function (a) {
      if (st.accessories.indexOf(a.id) !== -1) return;
      var n = a.need, ok = false;
      if (n.type === 'stars') ok = s.stars >= n.n;
      if (n.type === 'skills') ok = s.mastered >= n.n;
      if (n.type === 'books') ok = s.books >= n.n;
      if (n.type === 'bilingual') ok = s.bilingual >= n.n;
      if (ok) st.accessories.push(a.id);
    });
  }

  function flush() {
    if (!queue.length) return;
    var b = queue.shift();
    show(b);
  }

  function show(b) {
    var box = document.getElementById('bigreward');
    box.innerHTML = '';
    var e = document.createElement('div'); e.className = 'bigreward__emo'; e.textContent = b.emoji;
    var t = document.createElement('div'); t.className = 'bigreward__t'; t.textContent = b.title_fr;
    var d = document.createElement('div'); d.className = 'bigreward__d'; d.textContent = b.desc_fr;
    var go = document.createElement('button');
    go.className = 'btn btn--primary btn--big'; go.textContent = 'Super !';
    go.addEventListener('click', function () {
      box.hidden = true;
      App.UI.refresh();
      setTimeout(flush, 300);
    });
    box.appendChild(e); box.appendChild(t); box.appendChild(d); box.appendChild(go);
    box.hidden = false;
    App.Audio.sfxStar();
  }

  function earnedAccessories() { return App.State.get().accessories; }

  return { checkBadges: checkBadges, snapshot: snapshot, earnedAccessories: earnedAccessories };
})();
