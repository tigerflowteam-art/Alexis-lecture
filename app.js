/* =========================================================
   js/app.js — Demarrage
   ========================================================= */

(function () {
  function boot() {
    App.State.load();
    App.Audio.init();
    App.Mission.mount();
    App.UI.mount();
    App.Rewards.check();
    setTimeout(checkVoices, 1600);
    App.Audio.onReady(function () { setTimeout(checkVoices, 200); });
  }

  function checkVoices() {
    var box = document.getElementById('voiceNotice');
    if (!box) return;
    if (App.Audio.hasRecordings()) { box.hidden = true; return; }
    var missing = [];
    if (!App.Audio.has('fr')) missing.push('francaise');
    if (!App.Audio.has('en')) missing.push('anglaise');
    if (!missing.length) { box.hidden = true; return; }
    box.hidden = false;
    box.textContent = 'Aucune voix ' + missing.join(' ni ') +
      " n'est disponible sur cet appareil. L'audio est essentiel ici : ajoutez une voix " +
      'dans les reglages du systeme, ou ouvrez le prototype dans Chrome, Edge ou Safari.';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
