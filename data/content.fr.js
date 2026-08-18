/* =========================================================
   data/content.fr.js — Banque de contenus FRANÇAIS
   t = texte | e = image | s = syllabes | u = unités graphiques (pour construire)
   sk = compétences requises (mots décodables, §20) | first = premier son
   ========================================================= */

window.DATA = window.DATA || {};
DATA.fr = DATA.fr || {};

/* ---------- MOTS ---------- */
DATA.fr.words = [
  /* Monde 5 — décodables avec M L T P R S + voyelles */
  { t:'MOTO',   e:'🏍️', s:['MO','TO'],       u:['M','O','T','O'],        first:'m', sk:['fr.g.m','fr.g.o','fr.g.t'], lvl:5 },
  { t:'LAMA',   e:'🦙',  s:['LA','MA'],       u:['L','A','M','A'],        first:'l', sk:['fr.g.l','fr.g.a','fr.g.m'], lvl:5 },
  { t:'PAPA',   e:'👨',  s:['PA','PA'],       u:['P','A','P','A'],        first:'p', sk:['fr.g.p','fr.g.a'],          lvl:5 },
  { t:'MAMIE',  e:'👵',  s:['MA','MIE'],      u:['M','A','M','I','E'],    first:'m', sk:['fr.g.m','fr.g.a','fr.g.i'], lvl:5 },
  { t:'PILE',   e:'🔋',  s:['PI','LE'],       u:['P','I','L','E'],        first:'p', sk:['fr.g.p','fr.g.i','fr.g.l'], lvl:5 },
  { t:'ROBE',   e:'👗',  s:['RO','BE'],       u:['R','O','B','E'],        first:'r', sk:['fr.g.r','fr.g.o','fr.g.b'], lvl:5 },
  { t:'LUNE',   e:'🌙',  s:['LU','NE'],       u:['L','U','N','E'],        first:'l', sk:['fr.g.l','fr.g.u','fr.g.n'], lvl:5 },
  { t:'VÉLO',   e:'🚲',  s:['VÉ','LO'],       u:['V','É','L','O'],        first:'v', sk:['fr.g.v','fr.g.e','fr.g.l'], lvl:5 },
  { t:'DÉ',     e:'🎲',  s:['DÉ'],            u:['D','É'],                first:'d', sk:['fr.g.d','fr.g.e'],          lvl:5 },
  { t:'SAC',    e:'🎒',  s:['SAC'],           u:['S','A','C'],            first:'s', sk:['fr.g.s','fr.g.a','fr.g.c'], lvl:5 },
  { t:'RIZ',    e:'🍚',  s:['RIZ'],           u:['R','I','Z'],            first:'r', sk:['fr.g.r','fr.g.i'],          lvl:5 },
  { t:'LIT',    e:'🛏️',  s:['LIT'],           u:['L','I','T'],            first:'l', sk:['fr.g.l','fr.g.i','fr.g.t'], lvl:5 },

  /* Monde 5 bis — trois syllabes */
  { t:'TOMATE', e:'🍅',  s:['TO','MA','TE'],  u:['T','O','M','A','T','E'],first:'t', sk:['fr.g.t','fr.g.o','fr.g.m','fr.g.a'], lvl:6 },
  { t:'SALADE', e:'🥗',  s:['SA','LA','DE'],  u:['S','A','L','A','D','E'],first:'s', sk:['fr.g.s','fr.g.a','fr.g.l','fr.g.d'], lvl:6 },
  { t:'PIRATE', e:'🏴',  s:['PI','RA','TE'],  u:['P','I','R','A','T','E'],first:'p', sk:['fr.g.p','fr.g.i','fr.g.r','fr.g.t'], lvl:6 },
  { t:'BANANE', e:'🍌',  s:['BA','NA','NE'],  u:['B','A','N','A','N','E'],first:'b', sk:['fr.g.b','fr.g.a','fr.g.n'],          lvl:6 },
  { t:'TULIPE', e:'🌷',  s:['TU','LI','PE'],  u:['T','U','L','I','P','E'],first:'t', sk:['fr.g.t','fr.g.u','fr.g.l','fr.g.p'], lvl:6 },
  { t:'CAROTTE',e:'🥕',  s:['CA','ROT','TE'], u:['C','A','R','O','T','T','E'],first:'c', sk:['fr.g.c','fr.g.a','fr.g.r','fr.g.t'], lvl:6 },

  /* Monde 6 — sons complexes */
  { t:'POULE',  e:'🐔',  s:['POU','LE'],      u:['P','OU','L','E'],       first:'p', sk:['fr.c.ou','fr.g.p','fr.g.l'], lvl:7 },
  { t:'SOURIS', e:'🐭',  s:['SOU','RIS'],     u:['S','OU','R','I','S'],   first:'s', sk:['fr.c.ou','fr.g.s','fr.g.r'], lvl:7 },
  { t:'MOUTON', e:'🐑',  s:['MOU','TON'],     u:['M','OU','T','ON'],      first:'m', sk:['fr.c.ou','fr.c.on','fr.g.m'],lvl:7 },
  { t:'CHAT',   e:'🐱',  s:['CHAT'],          u:['CH','A','T'],           first:'ch',sk:['fr.c.ch','fr.g.a','fr.g.t'], lvl:7 },
  { t:'CHIEN',  e:'🐕',  s:['CHIEN'],         u:['CH','I','EN'],          first:'ch',sk:['fr.c.ch'],                   lvl:7 },
  { t:'CHEVAL', e:'🐴',  s:['CHE','VAL'],     u:['CH','E','V','A','L'],   first:'ch',sk:['fr.c.ch','fr.g.v','fr.g.l'], lvl:7 },
  { t:'BALLON', e:'🎈',  s:['BAL','LON'],     u:['B','A','L','L','ON'],   first:'b', sk:['fr.c.on','fr.g.b','fr.g.l'], lvl:7 },
  { t:'POISSON',e:'🐟',  s:['POIS','SON'],    u:['P','OI','S','S','ON'],  first:'p', sk:['fr.c.oi','fr.c.on'],         lvl:8 },
  { t:'ÉTOILE', e:'⭐',  s:['É','TOI','LE'],  u:['É','T','OI','L','E'],   first:'é', sk:['fr.c.oi','fr.g.t','fr.g.l'], lvl:8 },
  { t:'BATEAU', e:'⛵',  s:['BA','TEAU'],     u:['B','A','T','EAU'],      first:'b', sk:['fr.c.au','fr.g.b','fr.g.t'], lvl:8 },
  { t:'OISEAU', e:'🐦',  s:['OI','SEAU'],     u:['OI','S','EAU'],         first:'oi',sk:['fr.c.oi','fr.c.au'],         lvl:8 },
  { t:'ORANGE', e:'🍊',  s:['O','RAN','GE'],  u:['O','R','AN','G','E'],   first:'o', sk:['fr.c.an','fr.g.o','fr.g.r'], lvl:8 },

  /* Mots-images pour la conscience phonologique (non décodables, oral seulement) */
  { t:'ARBRE',  e:'🌳',  s:['AR','BRE'],  first:'a', oral:true, lvl:1 },
  { t:'AVION',  e:'✈️',  s:['A','VION'],  first:'a', oral:true, lvl:1 },
  { t:'ANANAS', e:'🍍',  s:['A','NA','NAS'], first:'a', oral:true, lvl:1 },
  { t:'ÎLE',    e:'🏝️',  s:['ÎLE'],       first:'i', oral:true, lvl:1 },
  { t:'USINE',  e:'🏭',  s:['U','SI','NE'], first:'u', oral:true, lvl:1 },
  { t:'UNIFORME', e:'👔', s:['U','NI','FOR','ME'], first:'u', oral:true, lvl:1 },
  { t:'IGLOO',  e:'🛖',  s:['I','GLOO'],  first:'i', oral:true, lvl:1 },
  { t:'OURS',   e:'🐻',  s:['OURS'],      first:'o', oral:true, lvl:1 },
  { t:'MAISON', e:'🏠',  s:['MAI','SON'], first:'m', oral:true, lvl:1 },
  { t:'MUSIQUE',e:'🎵',  s:['MU','SI','QUE'], first:'m', oral:true, lvl:1 },
  { t:'RENARD', e:'🦊',  s:['RE','NARD'], first:'r', oral:true, lvl:1 },
  { t:'SOLEIL', e:'☀️',  s:['SO','LEIL'], first:'s', oral:true, lvl:1 },
  { t:'SERPENT',e:'🐍',  s:['SER','PENT'],first:'s', oral:true, lvl:1 },
  { t:'NUAGE',  e:'☁️',  s:['NU','AGE'],  first:'n', oral:true, lvl:1 },
  { t:'VACHE',  e:'🐄',  s:['VA','CHE'],  first:'v', oral:true, lvl:1 },
  { t:'FLEUR',  e:'🌸',  s:['FLEUR'],     first:'f', oral:true, lvl:1 },
  { t:'FUSÉE',  e:'🚀',  s:['FU','SÉE'],  first:'f', oral:true, lvl:1 },
  { t:'FRAISE', e:'🍓',  s:['FRAI','SE'], first:'f', oral:true, lvl:1 },
  { t:'DAUPHIN',e:'🐬',  s:['DAU','PHIN'],first:'d', oral:true, lvl:1 },
  { t:'CANARD', e:'🦆',  s:['CA','NARD'], first:'c', oral:true, lvl:1 },
  { t:'CADEAU', e:'🎁',  s:['CA','DEAU'], first:'c', oral:true, lvl:1 },
  { t:'PIZZA',  e:'🍕',  s:['PIZ','ZA'],  first:'p', oral:true, lvl:1 },
  { t:'POMME',  e:'🍎',  s:['POM','ME'],  first:'p', oral:true, lvl:1 },
  { t:'TORTUE', e:'🐢',  s:['TOR','TUE'], first:'t', oral:true, lvl:1 },
  { t:'ÉLÉPHANT',e:'🐘', s:['É','LÉ','PHANT'], first:'é', oral:true, lvl:1 },
  { t:'VOITURE',e:'🚗',  s:['VOI','TU','RE'],  first:'v', oral:true, lvl:1 },
  { t:'BÉBÉ',   e:'👶',  s:['BÉ','BÉ'],   first:'b', oral:true, lvl:1 }
];

/* ---------- SYLLABES ISOLÉES (monde 3 et 4) ---------- */
DATA.fr.syllables = {
  'fr.b.m':['MA','MI','MO','MU'],
  'fr.b.l':['LA','LI','LO','LU'],
  'fr.b.t':['TA','TI','TO','TU'],
  'fr.b.p':['PA','PI','PO','PU'],
  'fr.b.r':['RA','RI','RO','RU'],
  'fr.b.s':['SA','SI','SO','SU']
};

/* ---------- RIMES (monde 1, oral) ---------- */
DATA.fr.rhymes = [
  { target:{t:'CHAT',e:'🐱'},  good:{t:'RAT',e:'🐀'},    bad:[{t:'LUNE',e:'🌙'},{t:'POMME',e:'🍎'}] },
  { target:{t:'LAMA',e:'🦙'},  good:{t:'PAPA',e:'👨'},   bad:[{t:'SOLEIL',e:'☀️'},{t:'VACHE',e:'🐄'}] },
  { target:{t:'MOTO',e:'🏍️'}, good:{t:'VÉLO',e:'🚲'},   bad:[{t:'POMME',e:'🍎'},{t:'CHIEN',e:'🐕'}] },
  { target:{t:'POULE',e:'🐔'}, good:{t:'BOULE',e:'⚪'},  bad:[{t:'CHAT',e:'🐱'},{t:'ARBRE',e:'🌳'}] },
  { target:{t:'BALLON',e:'🎈'},good:{t:'MOUTON',e:'🐑'}, bad:[{t:'FLEUR',e:'🌸'},{t:'RIZ',e:'🍚'}] },
  { target:{t:'SOURIS',e:'🐭'},good:{t:'RIZ',e:'🍚'},    bad:[{t:'BATEAU',e:'⛵'},{t:'LUNE',e:'🌙'}] }
];

/* ---------- MOTS-OUTILS (§13 du cahier : mots à reconnaître globalement) ---------- */
DATA.fr.tricky = ['le','la','les','un','une','est','et','il','elle','dans','sur','avec','du','mon','ma'];

/* ---------- PHRASES ---------- */
DATA.fr.sentences = [
  { t:'Le lama a une moto.',      e:'🦙🏍️', sk:['fr.w.cvcv','fr.t.outils'],
    q:{ q:'Qui a une moto ?', options:['Le lama','Le chat','Papa'], a:0 } },
  { t:'La tomate est rouge.',     e:'🍅',   sk:['fr.w.long','fr.t.outils'],
    q:{ q:'De quelle couleur est la tomate ?', options:['Rouge','Bleue','Verte'], a:0 } },
  { t:'Papa a un vélo.',          e:'👨🚲', sk:['fr.w.cvcv','fr.t.outils'],
    q:{ q:'Qu\'est-ce que papa a ?', options:['Un vélo','Une moto','Un chat'], a:0 } },
  { t:'Le chat est sur le lit.',  e:'🐱🛏️', sk:['fr.c.ch','fr.t.outils'],
    q:{ q:'Où est le chat ?', options:['Sur le lit','Dans le sac','Sur la moto'], a:0 } },
  { t:'La souris a une pomme.',   e:'🐭🍎', sk:['fr.c.ou','fr.t.outils'],
    q:{ q:'Que mange la souris ?', options:['Une pomme','Une salade','Une banane'], a:0 } },
  { t:'Le mouton est dans le pré.',e:'🐑🌿', sk:['fr.c.ou','fr.c.on'],
    q:{ q:'Où est le mouton ?', options:['Dans le pré','Sur le bateau','Dans la maison'], a:0 } }
];

/* ---------- CONSEILS PARENT (§37) ---------- */
DATA.fr.parentTips = [
  "Cherchez ensemble trois objets de la maison qui commencent par le son mmm.",
  "Tapez dans vos mains les syllabes des prénoms de la famille : A-LE-XIS.",
  "Jouez au jeu des rimes en voiture : \"je dis CHAT, tu dis... ?\"",
  "Demandez-lui de vous lire l'étiquette d'un produit du placard. Un seul mot suffit.",
  "Faites-lui deviner un mot en le disant son par son : mmm... o... teu... o.",
  "Lisez-lui une histoire du soir en suivant les mots avec le doigt.",
  "Cherchez la lettre du jour sur les panneaux dans la rue."
];
