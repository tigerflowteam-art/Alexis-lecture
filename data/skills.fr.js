/* =========================================================
   data/skills.fr.js — Arbre de compétences FRANÇAIS
   Chaque compétence porte : monde, type, phonème, audio, prérequis, exercices.
   Le programme FR n'est PAS une traduction du programme EN (§6).
   ========================================================= */

window.DATA = window.DATA || {};
DATA.fr = DATA.fr || {};

/* say  = texte envoyé à la synthèse vocale française pour produire LE SON
   name = nom de la lettre (à ne pas confondre avec le son)
   drills = mécaniques d'exercice compatibles avec cette compétence      */

DATA.fr.skills = [

  /* ---------- MONDE 1 — J'écoute (aucune lettre, que de l'oral) ---------- */
  { id:'fr.ph.syllabes', world:1, type:'phono', label:'Les syllabes', short:'Syllabes',
    phoneme:'—', say:'les syllabes', teach:"Un mot se découpe en morceaux. LA-MA, ça fait deux morceaux.",
    prereq:[], drills:['syllable-count'] },

  { id:'fr.ph.rimes', world:1, type:'phono', label:'Les rimes', short:'Rimes',
    phoneme:'—', say:'les rimes', teach:"Deux mots riment quand ils finissent pareil. CHAT et RAT.",
    prereq:[], drills:['rhyme'] },

  { id:'fr.ph.initial', world:1, type:'phono', label:'Le premier son', short:'1er son',
    phoneme:'—', say:'le premier son', teach:"Chaque mot commence par un son. MOTO commence par mmm.",
    prereq:[], drills:['image-to-first-sound'] },

  { id:'fr.ph.fusion', world:1, type:'phono', label:'Je colle les sons', short:'Fusion orale',
    phoneme:'—', say:'je colle les sons', teach:"Si je dis mmm... a..., ça fait MA.",
    prereq:['fr.ph.initial'], drills:['blend-oral'] },

  /* ---------- MONDE 2 — Je découvre les sons ---------- */
  { id:'fr.g.a', world:2, type:'grapheme', label:'A', lower:'a', name:'a', phoneme:'/a/', say:'aaa',
    examples:[{w:'ARBRE',e:'🌳'},{w:'AVION',e:'✈️'},{w:'ANANAS',e:'🍍'}], prereq:['fr.ph.initial'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.i', world:2, type:'grapheme', label:'I', lower:'i', name:'i', phoneme:'/i/', say:'iii',
    examples:[{w:'ÎLE',e:'🏝️'},{w:'IGLOO',e:'🛖'}], prereq:['fr.ph.initial'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.o', world:2, type:'grapheme', label:'O', lower:'o', name:'o', phoneme:'/o/', say:'ooo',
    examples:[{w:'ORANGE',e:'🍊'},{w:'OURS',e:'🐻'}], prereq:['fr.ph.initial'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.u', world:2, type:'grapheme', label:'U', lower:'u', name:'u', phoneme:'/y/', say:'uuu',
    examples:[{w:'USINE',e:'🏭'}], prereq:['fr.g.a'],
    drills:['sound-to-letter','letter-to-sound'] },

  { id:'fr.g.e', world:2, type:'grapheme', label:'É', lower:'é', name:'e accent aigu', phoneme:'/e/', say:'éé',
    examples:[{w:'ÉTOILE',e:'⭐'},{w:'ÉCOLE',e:'🏫'}], prereq:['fr.g.a'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'fr.g.m', world:2, type:'grapheme', label:'M', lower:'m', name:'èmme', phoneme:'/m/', say:'mmmm',
    examples:[{w:'MOTO',e:'🏍️'},{w:'MAISON',e:'🏠'},{w:'MOUTON',e:'🐑'}], prereq:['fr.g.a'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.l', world:2, type:'grapheme', label:'L', lower:'l', name:'èlle', phoneme:'/l/', say:'llll',
    examples:[{w:'LAMA',e:'🦙'},{w:'LUNE',e:'🌙'},{w:'LIVRE',e:'📖'}], prereq:['fr.g.a'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.t', world:2, type:'grapheme', label:'T', lower:'t', name:'té', phoneme:'/t/', say:'teu',
    examples:[{w:'TOMATE',e:'🍅'},{w:'TORTUE',e:'🐢'},{w:'TULIPE',e:'🌷'}], prereq:['fr.g.i'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.p', world:2, type:'grapheme', label:'P', lower:'p', name:'pé', phoneme:'/p/', say:'peu',
    examples:[{w:'POMME',e:'🍎'},{w:'PIZZA',e:'🍕'},{w:'POULE',e:'🐔'}], prereq:['fr.g.o'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.r', world:2, type:'grapheme', label:'R', lower:'r', name:'èrre', phoneme:'/ʁ/', say:'rrrr',
    examples:[{w:'ROBE',e:'👗'},{w:'RENARD',e:'🦊'},{w:'RIZ',e:'🍚'}], prereq:['fr.g.m'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.s', world:2, type:'grapheme', label:'S', lower:'s', name:'èsse', phoneme:'/s/', say:'ssss',
    examples:[{w:'SOLEIL',e:'☀️'},{w:'SERPENT',e:'🐍'},{w:'SAC',e:'🎒'}], prereq:['fr.g.m'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'fr.g.n', world:2, type:'grapheme', label:'N', lower:'n', name:'ènne', phoneme:'/n/', say:'nnnn',
    examples:[{w:'NUAGE',e:'☁️'},{w:'NID',e:'🪺'}], prereq:['fr.g.m'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'fr.g.d', world:2, type:'grapheme', label:'D', lower:'d', name:'dé', phoneme:'/d/', say:'deu',
    examples:[{w:'DÉ',e:'🎲'},{w:'DAUPHIN',e:'🐬'}], prereq:['fr.g.t'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'fr.g.v', world:2, type:'grapheme', label:'V', lower:'v', name:'vé', phoneme:'/v/', say:'vvvv',
    examples:[{w:'VACHE',e:'🐄'},{w:'VÉLO',e:'🚲'},{w:'VOITURE',e:'🚗'}], prereq:['fr.g.l'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'fr.g.f', world:2, type:'grapheme', label:'F', lower:'f', name:'èffe', phoneme:'/f/', say:'ffff',
    examples:[{w:'FLEUR',e:'🌸'},{w:'FUSÉE',e:'🚀'},{w:'FRAISE',e:'🍓'}], prereq:['fr.g.v'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'fr.g.b', world:2, type:'grapheme', label:'B', lower:'b', name:'bé', phoneme:'/b/', say:'beu',
    examples:[{w:'BALLON',e:'🎈'},{w:'BANANE',e:'🍌'},{w:'BATEAU',e:'⛵'}], prereq:['fr.g.p'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'fr.g.c', world:2, type:'grapheme', label:'C', lower:'c', name:'cé', phoneme:'/k/', say:'keu',
    examples:[{w:'CANARD',e:'🦆'},{w:'CAROTTE',e:'🥕'},{w:'CADEAU',e:'🎁'}], prereq:['fr.g.d'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  /* ---------- MONDE 3 — Je construis (fusion écrite) ---------- */
  { id:'fr.b.m', world:3, type:'blend', label:'M + voyelle', short:'MA MI MO MU',
    consonant:'fr.g.m', teach:"Je colle M et A : MA.",
    prereq:['fr.g.m','fr.g.a','fr.ph.fusion'], drills:['blend','word-builder'] },

  { id:'fr.b.l', world:3, type:'blend', label:'L + voyelle', short:'LA LI LO LU',
    consonant:'fr.g.l', prereq:['fr.g.l','fr.g.a','fr.b.m'], drills:['blend','word-builder'] },

  { id:'fr.b.t', world:3, type:'blend', label:'T + voyelle', short:'TA TI TO TU',
    consonant:'fr.g.t', prereq:['fr.g.t','fr.b.m'], drills:['blend','word-builder'] },

  { id:'fr.b.p', world:3, type:'blend', label:'P + voyelle', short:'PA PI PO PU',
    consonant:'fr.g.p', prereq:['fr.g.p','fr.b.m'], drills:['blend','word-builder'] },

  { id:'fr.b.r', world:3, type:'blend', label:'R + voyelle', short:'RA RI RO RU',
    consonant:'fr.g.r', prereq:['fr.g.r','fr.b.l'], drills:['blend','word-builder'] },

  { id:'fr.b.s', world:3, type:'blend', label:'S + voyelle', short:'SA SI SO SU',
    consonant:'fr.g.s', prereq:['fr.g.s','fr.b.l'], drills:['blend','word-builder'] },

  /* ---------- MONDE 4 — Je lis mes syllabes ---------- */
  { id:'fr.syl.read', world:4, type:'syllable', label:'Je lis une syllabe', short:'Lire MA, LO, PI',
    prereq:['fr.b.m','fr.b.l'], drills:['syllable-read','word-builder'] },

  { id:'fr.syl.segment', world:4, type:'syllable', label:'Je découpe un mot', short:'Segmentation',
    prereq:['fr.syl.read'], drills:['segment'] },

  /* ---------- MONDE 5 — Je lis mes premiers mots ---------- */
  { id:'fr.w.cvcv', world:5, type:'word', label:'Mots de deux syllabes', short:'MOTO · LAMA',
    prereq:['fr.syl.read','fr.b.t','fr.b.p'], drills:['word-to-image','image-to-word','letter-order','word-builder'] },

  { id:'fr.w.long', world:5, type:'word', label:'Mots de trois syllabes', short:'TOMATE · SALADE',
    prereq:['fr.w.cvcv','fr.b.s','fr.b.r'], drills:['word-to-image','image-to-word','letter-order'] },

  /* ---------- MONDE 6 — Les sons magiques (graphèmes complexes) ---------- */
  { id:'fr.c.ou', world:6, type:'complex', label:'OU', lower:'ou', phoneme:'/u/', say:'ououou',
    examples:[{w:'POULE',e:'🐔'},{w:'SOURIS',e:'🐭'},{w:'MOUTON',e:'🐑'}], prereq:['fr.w.cvcv'],
    drills:['sound-to-letter','sound-to-image','word-to-image','image-to-word'] },

  { id:'fr.c.ch', world:6, type:'complex', label:'CH', lower:'ch', phoneme:'/ʃ/', say:'chhh',
    examples:[{w:'CHAT',e:'🐱'},{w:'CHIEN',e:'🐕'},{w:'CHEVAL',e:'🐴'}], prereq:['fr.w.cvcv'],
    drills:['sound-to-letter','sound-to-image','word-to-image','image-to-word'] },

  { id:'fr.c.on', world:6, type:'complex', label:'ON', lower:'on', phoneme:'/ɔ̃/', say:'onnn',
    examples:[{w:'BALLON',e:'🎈'},{w:'PONT',e:'🌉'}], prereq:['fr.c.ou'],
    drills:['sound-to-letter','sound-to-image','image-to-word'] },

  { id:'fr.c.an', world:6, type:'complex', label:'AN', lower:'an', phoneme:'/ɑ̃/', say:'annn',
    examples:[{w:'ÉLÉPHANT',e:'🐘'},{w:'ORANGE',e:'🍊'}], prereq:['fr.c.on'],
    drills:['sound-to-letter','sound-to-image','image-to-word'] },

  { id:'fr.c.oi', world:6, type:'complex', label:'OI', lower:'oi', phoneme:'/wa/', say:'oi',
    examples:[{w:'POISSON',e:'🐟'},{w:'ÉTOILE',e:'⭐'},{w:'OISEAU',e:'🐦'}], prereq:['fr.c.ch'],
    drills:['sound-to-letter','sound-to-image','image-to-word'] },

  { id:'fr.c.au', world:6, type:'complex', label:'AU / EAU', lower:'au', phoneme:'/o/', say:'ooo',
    examples:[{w:'BATEAU',e:'⛵'},{w:'CADEAU',e:'🎁'}], prereq:['fr.c.oi'],
    drills:['sound-to-letter','sound-to-image','image-to-word'] },

  /* ---------- MONDE 7 — Je lis des phrases ---------- */
  { id:'fr.t.outils', world:7, type:'tricky', label:'Les petits mots', short:'le · la · un · est',
    teach:"Certains petits mots reviennent tout le temps. On les reconnaît d'un coup d'oeil.",
    prereq:['fr.w.cvcv'], drills:['tricky-word'] },

  { id:'fr.s.phrase', world:7, type:'sentence', label:'Je lis une phrase', short:'Le lama a une moto.',
    prereq:['fr.t.outils','fr.w.long'], drills:['sentence-read','sentence-order'] },

  /* ---------- MONDE 8 — Fluidité ---------- */
  { id:'fr.f.fluence', world:8, type:'fluency', label:'Je lis sans hésiter', short:'Fluidité',
    prereq:['fr.s.phrase'], drills:['sentence-read'] },

  /* ---------- MONDE 9 — Je comprends ---------- */
  { id:'fr.k.comprehension', world:9, type:'comprehension', label:'Je comprends ce que je lis', short:'Compréhension',
    prereq:['fr.s.phrase'], drills:['comprehension'] },

  /* ---------- MONDE 10 — Histoires ---------- */
  { id:'fr.h.livre', world:10, type:'story', label:'Je lis un livre', short:'Mes livres',
    prereq:['fr.k.comprehension','fr.f.fluence'], drills:['book'] }
];
