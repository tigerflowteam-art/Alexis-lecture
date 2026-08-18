/* =========================================================
   data/worlds.js
   Les deux arbres de compétences, vus par l'enfant comme un voyage.
   Contenu 100% separe de l'interface (cahier des charges §43).
   ========================================================= */

window.DATA = window.DATA || {};

DATA.worlds = {
  fr: [
    { n: 1,  key: 'ecoute',    title: "J'écoute",                 sub: 'Les sons dans les mots',   icon: '👂', chapter: 'Je découvre' },
    { n: 2,  key: 'sons',      title: 'Je découvre les sons',     sub: 'Les lettres et leurs sons',icon: '🔤', chapter: 'Je découvre' },
    { n: 3,  key: 'construis', title: 'Je construis',             sub: 'Je colle deux sons',       icon: '🧩', chapter: 'Je construis' },
    { n: 4,  key: 'syllabes',  title: 'Je lis mes syllabes',      sub: 'MA · LO · PI',             icon: '🪄', chapter: 'Je construis' },
    { n: 5,  key: 'mots',      title: 'Je lis mes premiers mots', sub: 'MOTO · LAMA',              icon: '🎁', chapter: 'Je lis mes premiers mots' },
    { n: 6,  key: 'complexes', title: 'Les sons magiques',        sub: 'OU · ON · CH · OI',        icon: '✨', chapter: 'Je lis mes premiers mots' },
    { n: 7,  key: 'phrases',   title: 'Je lis des phrases',       sub: 'Le lama a une moto.',      icon: '📝', chapter: 'Je commence à lire' },
    { n: 8,  key: 'fluidite',  title: 'Je lis sans hésiter',      sub: 'De plus en plus vite',     icon: '🌊', chapter: 'Je commence à lire' },
    { n: 9,  key: 'comprends', title: 'Je comprends',             sub: "Ce que l'histoire raconte",icon: '💡', chapter: 'Je lis des histoires' },
    { n: 10, key: 'histoires', title: 'Je lis des histoires',     sub: 'Mes vrais livres',         icon: '📖', chapter: 'Je deviens lecteur' }
  ],
  en: [
    { n: 1,  key: 'listen',    title: 'I listen',                 sub: 'Sounds inside words',      icon: '👂', chapter: 'I discover' },
    { n: 2,  key: 'sounds',    title: 'I discover sounds',        sub: 'Letters and their sounds', icon: '🔤', chapter: 'I discover' },
    { n: 3,  key: 'blend',     title: 'I blend',                  sub: 'Pushing sounds together',  icon: '🧩', chapter: 'I build' },
    { n: 4,  key: 'cvc',       title: 'I read my first words',    sub: 'CAT · SUN · PIG',          icon: '🎁', chapter: 'I build' },
    { n: 5,  key: 'patterns',  title: 'I discover new patterns',  sub: 'SH · CH · TH · EE',        icon: '✨', chapter: 'I read my first words' },
    { n: 6,  key: 'tricky',    title: 'I learn tricky words',     sub: 'the · was · you',          icon: '🗝️', chapter: 'I read my first words' },
    { n: 7,  key: 'sentences', title: 'I read sentences',         sub: 'The cat is big.',          icon: '📝', chapter: 'I start reading' },
    { n: 8,  key: 'fluency',   title: 'I read fluently',          sub: 'Faster and smoother',      icon: '🌊', chapter: 'I start reading' },
    { n: 9,  key: 'understand',title: 'I understand',             sub: 'What the story means',     icon: '💡', chapter: 'I read stories' },
    { n: 10, key: 'stories',   title: 'I read stories',           sub: 'My real books',            icon: '📖', chapter: 'I become a reader' }
  ]
};

/* Etats de maitrise (cahier des charges §13) */
DATA.masteryStates = [
  { key: 'discovery',     dot: '○', label_fr: 'Découverte',       label_en: 'Discovered',    min: 0,  color: 'var(--m-discovery)' },
  { key: 'learning',      dot: '◔', label_fr: 'En apprentissage', label_en: 'Learning',      min: 30, color: 'var(--m-learning)' },
  { key: 'consolidation', dot: '◑', label_fr: 'Consolidation',    label_en: 'Consolidating', min: 60, color: 'var(--m-consolidation)' },
  { key: 'mastered',      dot: '★', label_fr: 'Maîtrisée',        label_en: 'Mastered',      min: 85, color: 'var(--m-mastered)' }
];
