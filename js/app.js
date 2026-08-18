/* =========================================================
   js/app.js — Démarrage
   ========================================================= */

(function () {
  function boot() {
    App.State.load();
    App.Audio.init();
    App.Lesson.mount();
    App.UI.mount();
    App.Rewards.checkBadges();

    /* la liste des voix arrive parfois après le premier rendu */
    App.Audio.onReady(function () {
      var p = document.getElementById('parent');
      if (p && !p.hidden) { /* la vue paramètres se redessine à l'ouverture */ }
    });

    /* Le bandeau d'avertissement audio, visible tout de suite si besoin */
    setTimeout(checkVoices, 1800);
  }

  function checkVoices() {
    var box = document.getElementById('voiceNotice');
    if (!box) return;
    var missing = [];
    if (!App.Audio.has('fr')) missing.push('française');
    if (!App.Audio.has('en')) missing.push('anglaise');
    if (!missing.length) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = '🔇 Aucune voix ' + missing.join(' ni ') +
      " n'est disponible sur cet appareil. L'application reste utilisable, mais l'audio est essentiel : " +
      "ajoutez une voix dans les réglages du système, ou ouvrez le prototype dans Chrome, Edge ou Safari.";
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
