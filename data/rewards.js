/* =========================================================
   data/rewards.js — Récompenses (§25, §26)
   Règle : toute récompense est liée à un apprentissage réel.
   Pas de coffre aléatoire, pas de monnaie infinie, pas de mécanique addictive.
   ========================================================= */

window.DATA = window.DATA || {};

/* Personnages : l'enfant en choisit un, il ne change pas le gameplay (§27) */
DATA.avatars = [
  { id:'fox',    emoji:'🦊', name_fr:'Filou le renard',   name_en:'Filou the fox' },
  { id:'owl',    emoji:'🦉', name_fr:'Ulysse la chouette',name_en:'Ulysses the owl' },
  { id:'cat',    emoji:'🐱', name_fr:'Moka le chat',      name_en:'Moka the cat' },
  { id:'dragon', emoji:'🐲', name_fr:'Braise le dragon',  name_en:'Ember the dragon' },
  { id:'panda',  emoji:'🐼', name_fr:'Pili le panda',     name_en:'Pili the panda' },
  { id:'robot',  emoji:'🤖', name_fr:'Bip le robot',      name_en:'Bip the robot' }
];

/* Accessoires : débloqués par des paliers d'apprentissage précis */
DATA.accessories = [
  { id:'hat',      emoji:'🎩', name_fr:'Chapeau',        need:{ type:'stars',   n:20 } },
  { id:'scarf',    emoji:'🧣', name_fr:'Écharpe',        need:{ type:'skills',  n:6 } },
  { id:'glasses',  emoji:'🕶️', name_fr:'Lunettes',       need:{ type:'books',   n:1 } },
  { id:'crown',    emoji:'👑', name_fr:'Couronne',       need:{ type:'skills',  n:14 } },
  { id:'cape',     emoji:'🦸', name_fr:'Cape',           need:{ type:'stars',   n:80 } },
  { id:'medal',    emoji:'🏅', name_fr:'Médaille',       need:{ type:'bilingual', n:1 } }
];

/* Grandes récompenses : les moments mémorables (§26) */
DATA.badges = [
  { id:'first-sound',  emoji:'🔊', title_fr:'Ton premier son !',        title_en:'Your first sound!',
    desc_fr:'Tu as découvert ta première lettre.', check:function(s){ return s.discovered >= 1; } },
  { id:'first-word',   emoji:'🎉', title_fr:'Ton premier mot lu !',     title_en:'Your first word!',
    desc_fr:'Tu as lu un mot tout seul.', check:function(s){ return s.wordsRead >= 1; } },
  { id:'ten-sounds',   emoji:'🌟', title_fr:'10 sons découverts !',     title_en:'10 sounds discovered!',
    desc_fr:'Tu connais déjà 10 sons.', check:function(s){ return s.discovered >= 10; } },
  { id:'first-book',   emoji:'📖', title_fr:'Ton premier livre !',      title_en:'Your first book!',
    desc_fr:'Tu as lu un livre en entier.', check:function(s){ return s.books >= 1; } },
  { id:'both-langs',   emoji:'🌍', title_fr:'Lecteur bilingue !',       title_en:'Bilingual reader!',
    desc_fr:'Tu apprends à lire dans deux langues.', check:function(s){ return s.frSkills >= 3 && s.enSkills >= 3; } },
  { id:'five-days',    emoji:'🔥', title_fr:'5 jours d\'affilée !',     title_en:'5 days in a row!',
    desc_fr:'Tu es venu 5 jours de suite.', check:function(s){ return s.streak >= 5; } },
  { id:'first-sentence',emoji:'📝',title_fr:'Ta première phrase !',     title_en:'Your first sentence!',
    desc_fr:'Tu as lu une phrase entière.', check:function(s){ return s.sentencesRead >= 1; } },
  { id:'mastered-five',emoji:'🏆', title_fr:'5 sons maîtrisés !',       title_en:'5 sounds mastered!',
    desc_fr:'Cinq sons sont devenus automatiques.', check:function(s){ return s.mastered >= 5; } },
  { id:'bilingual-eye',emoji:'👁️', title_fr:'Œil bilingue !',          title_en:'Bilingual eye!',
    desc_fr:'Tu as repéré une différence entre les deux langues.', check:function(s){ return s.bilingual >= 1; } },
  { id:'hundred-stars',emoji:'✨', title_fr:'100 étoiles !',            title_en:'100 stars!',
    desc_fr:'Cent bonnes réponses, bravo.', check:function(s){ return s.stars >= 100; } }
];

/* Encouragements courts (jamais de "WRONG", §31) */
DATA.praise = {
  fr: ['Bravo !','Super !','Oui, c\'est ça !','Parfait !','Tu l\'as eu !','Excellent !','Bien joué !'],
  en: ['Well done!','Yes!','That\'s it!','Perfect!','Nice one!','Great!','You got it!']
};
DATA.retry = {
  fr: ['Écoutons encore.','Presque ! Réécoute.','Reprenons ensemble.','Encore une fois, doucement.'],
  en: ['Let\'s listen again.','Almost! Listen again.','Let\'s try together.','One more time, slowly.']
};
