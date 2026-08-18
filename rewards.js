/* =========================================================
   data/rewards.js — Recompenses liees aux accomplissements (§18)

   Aucun coffre aleatoire. Chaque recompense repond a une phrase
   precise : "j'ai appris quelque chose". Le declencheur est ecrit
   dans when() : il lit l'etat reel, pas un compteur decoratif.
   ========================================================= */

window.DATA = window.DATA || {};

/* --- Personnages --- */
DATA.avatars = [
  { id: 'fox',    icon: '\ud83e\udd8a', label: 'Renard',   need: 0 },
  { id: 'owl',    icon: '\ud83e\udd89', label: 'Chouette', need: 3 },
  { id: 'lama',   icon: '\ud83e\udd99', label: 'Lama',     need: 5 },
  { id: 'turtle', icon: '\ud83d\udc22', label: 'Tortue',   need: 8 },
  { id: 'whale',  icon: '\ud83d\udc0b', label: 'Baleine',  need: 12 },
  { id: 'dragon', icon: '\ud83d\udc09', label: 'Dragon',   need: 18 }
];

/* --- Objets de collection : chacun marque une etape reelle --- */
DATA.trophies = [
  { id: 'first-sound', icon: '\ud83c\udf1f', label: 'Premier son ma\u00eetris\u00e9',
    hint: 'Terminer une mission de d\u00e9couverte de son',
    when: function (S) { return S.missionsDone('fr') >= 2 || S.missionsDone('en') >= 2; } },

  { id: 'first-blend', icon: '\ud83c\udf92', label: 'Premi\u00e8re fusion r\u00e9ussie',
    hint: 'Coller deux sons pour faire une syllabe',
    when: function (S) { return S.isMissionDone('fr.m04') || S.isMissionDone('en.m04'); } },

  { id: 'first-word', icon: '\ud83c\udf33', label: 'Premier mot lu',
    hint: 'Lire un vrai mot en entier',
    when: function (S) { return S.isMissionDone('fr.m05') || S.isMissionDone('en.m05'); } },

  { id: 'first-book', icon: '\ud83c\udfc6', label: 'Premier livre termin\u00e9',
    hint: 'Aller jusqu\'au bout d\'une histoire',
    when: function (S) { return S.get().booksRead.length >= 1; } },

  { id: 'five-missions', icon: '\ud83c\udfa8', label: 'Cinq missions termin\u00e9es',
    hint: 'Cinq missions accomplies, toutes langues confondues',
    when: function (S) { return S.missionsDone('fr') + S.missionsDone('en') >= 5; } },

  { id: 'bilingual', icon: '\ud83c\udf0d', label: 'Lecteur bilingue',
    hint: 'Progresser dans les deux langues',
    when: function (S) { return S.missionsDone('fr') >= 2 && S.missionsDone('en') >= 2; } },

  { id: 'ten-missions', icon: '\ud83d\udc51', label: 'Dix missions termin\u00e9es',
    hint: 'Un vrai parcours de lecteur',
    when: function (S) { return S.missionsDone('fr') + S.missionsDone('en') >= 10; } },

  { id: 'two-books', icon: '\ud83d\udcda', label: 'Deux livres lus',
    hint: 'Deux histoires termin\u00e9es',
    when: function (S) { return S.get().booksRead.length >= 2; } },

  { id: 'regular', icon: '\ud83d\udd25', label: 'Trois jours de suite',
    hint: 'Revenir trois jours d\'affil\u00e9e',
    when: function (S) { return S.get().streak >= 3; } },

  { id: 'week', icon: '\ud83c\udf08', label: 'Une semaine enti\u00e8re',
    hint: 'Sept jours de lecture',
    when: function (S) { return S.get().streak >= 7; } }
];

/* --- Accessoires du personnage --- */
DATA.accessories = [
  { id: 'hat',    icon: '\ud83c\udfa9', label: 'Chapeau',  need: 2 },
  { id: 'scarf',  icon: '\ud83e\udde3', label: '\u00c9charpe',  need: 4 },
  { id: 'glass',  icon: '\ud83d\udc53', label: 'Lunettes', need: 6 },
  { id: 'crown',  icon: '\ud83d\udc51', label: 'Couronne', need: 9 },
  { id: 'cape',   icon: '\ud83e\udde5', label: 'Cape',     need: 13 },
  { id: 'star',   icon: '\u2b50', label: '\u00c9toile',   need: 20 }
];
