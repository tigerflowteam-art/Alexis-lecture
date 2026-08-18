/* =========================================================
   data/audio.js — Manifeste audio

   Chaque cle utilisee par l'application est declaree ici avec :
     - le texte que la synthese doit dire SI l'enregistrement manque
     - la langue a utiliser (jamais l'anglais avec une voix francaise)

   Le fichier attendu se deduit de la cle :
     fr:phoneme:m  ->  assets/audio/fr/phoneme/m.mp3

   POUR LES PHONEMES : on prononce LE SON, jamais le nom de la lettre.
     M  ->  mmmmm        et non "emme"
     S  ->  sssss        et non "esse"
   Le texte de repli ci-dessous est ecrit phonetiquement pour pousser la
   synthese vers le son. C'est un pis-aller : ces cles sont les toutes
   premieres a enregistrer avec une vraie voix.
   ========================================================= */

window.DATA = window.DATA || {};
DATA.audio = { map: {} };

(function () {
  function put(key, text, lang) { DATA.audio.map[key] = { text: text, lang: lang }; }

  /* ---------------------------------------------------------
     PHONEMES FRANCAIS — le son, etire, jamais le nom de lettre
     --------------------------------------------------------- */
  var FR_PHON = {
    a: 'aaaa', i: 'iiii', o: 'oooo', u: 'uuuu', e: '\u00e9\u00e9\u00e9',
    m: 'mmmmm', l: 'lllll', s: 'sssss', r: 'rrrrr', n: 'nnnnn', f: 'fffff', v: 'vvvvv',
    t: 'te', p: 'pe', d: 'de', b: 'be', c: 'ke',
    ou: 'ouuuu', ch: 'chhhh', on: 'onnnn', an: 'annnn', oi: 'oua', au: 'oooo'
  };
  for (var k in FR_PHON) put('fr:phoneme:' + k, FR_PHON[k], 'fr');

  /* ---------------------------------------------------------
     PHONEMES ANGLAIS — progression phonics, sons anglais
     --------------------------------------------------------- */
  var EN_PHON = {
    s: 'sss', a: 'ah', t: 'tuh', p: 'puh', i: 'ih', n: 'nnn', m: 'mmm', d: 'duh',
    g: 'guh', o: 'oh', c: 'kuh', k: 'kuh', e: 'eh', u: 'uh', r: 'rrr', h: 'huh',
    b: 'buh', f: 'fff', l: 'lll',
    sh: 'shhh', ch: 'chuh', th: 'thhh', ee: 'eee', oo: 'oooh', ai: 'ay'
  };
  for (var k2 in EN_PHON) put('en:phoneme:' + k2, EN_PHON[k2], 'en');

  /* ---------------------------------------------------------
     CONSIGNES ET REACTIONS
     Les cles ui:* sont partagees par les deux langues, avec un
     texte propre a chacune. L'interface enfant est monolingue (§9).
     --------------------------------------------------------- */
  var UI_FR = {
    listen: '\u00c9coute bien',
    again: '\u00c9coute encore',
    bravo: 'Bravo !',
    superbe: 'Superbe !',
    yes: 'Oui, c\'est \u00e7a !',
    tryagain: 'Essaie encore',
    almost: 'Presque ! \u00c9coute encore une fois',
    yourturn: '\u00c0 toi !',
    welldone: 'Tu as r\u00e9ussi ta mission !',
    newbook: 'Tu as gagn\u00e9 un nouveau livre !',
    listenword: '\u00c9coute ce mot',
    findsound: 'Trouve le son',
    readnow: 'Maintenant, lis'
  };
  for (var u in UI_FR) put('fr:ui:' + u, UI_FR[u], 'fr');

  var UI_EN = {
    listen: 'Listen carefully',
    again: 'Listen again',
    bravo: 'Well done!',
    superbe: 'Excellent!',
    yes: 'Yes, that\'s it!',
    tryagain: 'Try again',
    almost: 'Almost! Listen once more',
    yourturn: 'Your turn!',
    welldone: 'You finished your mission!',
    newbook: 'You unlocked a new book!',
    listenword: 'Listen to this word',
    findsound: 'Find the sound',
    readnow: 'Now, read it'
  };
  for (var u2 in UI_EN) put('en:ui:' + u2, UI_EN[u2], 'en');

  /* ---------------------------------------------------------
     Les mots, syllabes et phrases n'ont pas besoin d'entree :
     la cle porte deja le texte. fr:word:moto -> "moto".
     On declare seulement les exceptions ou la synthese se trompe.
     --------------------------------------------------------- */
  put('fr:syll:ma', 'ma', 'fr');
  put('fr:syll:mi', 'mi', 'fr');
  put('fr:syll:mo', 'mo', 'fr');
  put('fr:syll:la', 'la', 'fr');
  put('fr:syll:li', 'li', 'fr');
  put('fr:syll:lo', 'lo', 'fr');
  put('fr:word:mat', 'mate', 'fr');
  put('en:syll:sa', 'sa', 'en');
  put('en:syll:at', 'at', 'en');
  put('en:word:sat', 'sat', 'en');
})();
