/* =========================================================
   js/rewards.js — Attribution des recompenses

   Rien d'aleatoire : on relit l'etat reel et on attribue ce qui
   vient d'etre merite. Chaque gain alimente aussi l'album.
   ========================================================= */

window.App = window.App || {};

App.Rewards = (function () {

  function owned() { return App.State.get().badges; }

  /* Renvoie la liste des recompenses gagnees a l'instant */
  function check() {
    var s = App.State.get();
    var gained = [];

    DATA.trophies.forEach(function (t) {
      if (s.badges.indexOf(t.id) >= 0) return;
      var ok = false;
      try { ok = t.when(App.State); } catch (e) { ok = false; }
      if (ok) {
        s.badges.push(t.id);
        gained.push({ icon: t.icon, label: t.label, kind: 'trophy' });
        App.State.remember(t.icon, t.label);
      }
    });

    var totalMissions = App.State.missionsDone('fr') + App.State.missionsDone('en');

    DATA.accessories.forEach(function (a) {
      if (s.accessories.indexOf(a.id) >= 0) return;
      if (totalMissions >= a.need) {
        s.accessories.push(a.id);
        gained.push({ icon: a.icon, label: a.label, kind: 'accessory' });
      }
    });

    DATA.avatars.forEach(function (a) {
      if (a.need && totalMissions >= a.need && s.badges.indexOf('avatar:' + a.id) < 0) {
        s.badges.push('avatar:' + a.id);
        gained.push({ icon: a.icon, label: a.label, kind: 'avatar' });
      }
    });

    App.State.save();
    return gained;
  }

  function avatarUnlocked(a) {
    if (!a.need) return true;
    return App.State.missionsDone('fr') + App.State.missionsDone('en') >= a.need;
  }

  function accessoryUnlocked(a) {
    return App.State.get().accessories.indexOf(a.id) >= 0;
  }

  function trophyOwned(t) {
    return App.State.get().badges.indexOf(t.id) >= 0;
  }

  function avatarIcon() {
    var id = App.State.get().child.avatar;
    var a = DATA.avatars.filter(function (x) { return x.id === id; })[0];
    return a ? a.icon : '\ud83e\udd8a';
  }

  return {
    check: check, owned: owned,
    avatarUnlocked: avatarUnlocked, accessoryUnlocked: accessoryUnlocked,
    trophyOwned: trophyOwned, avatarIcon: avatarIcon
  };
})();
