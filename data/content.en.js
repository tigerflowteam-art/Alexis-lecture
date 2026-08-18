/* =========================================================
   data/content.en.js — English content bank
   Decodable-first: every world-4 word is built only from taught graphemes.
   ========================================================= */

window.DATA = window.DATA || {};
DATA.en = DATA.en || {};

DATA.en.words = [
  /* World 4 — CVC, set 1 to 3 graphemes */
  { t:'SAT', e:'🪑', s:['SAT'], u:['S','A','T'], first:'s', sk:['en.g.s','en.g.a','en.g.t'], lvl:4 },
  { t:'TAP', e:'🚰', s:['TAP'], u:['T','A','P'], first:'t', sk:['en.g.t','en.g.a','en.g.p'], lvl:4 },
  { t:'PIN', e:'📌', s:['PIN'], u:['P','I','N'], first:'p', sk:['en.g.p','en.g.i','en.g.n'], lvl:4 },
  { t:'MAP', e:'🗺️', s:['MAP'], u:['M','A','P'], first:'m', sk:['en.g.m','en.g.a','en.g.p'], lvl:4 },
  { t:'CAT', e:'🐱', s:['CAT'], u:['C','A','T'], first:'c', sk:['en.g.c','en.g.a','en.g.t'], lvl:4 },
  { t:'DOG', e:'🐕', s:['DOG'], u:['D','O','G'], first:'d', sk:['en.g.d','en.g.o','en.g.g'], lvl:4 },
  { t:'PIG', e:'🐷', s:['PIG'], u:['P','I','G'], first:'p', sk:['en.g.p','en.g.i','en.g.g'], lvl:4 },
  { t:'SUN', e:'☀️', s:['SUN'], u:['S','U','N'], first:'s', sk:['en.g.s','en.g.u','en.g.n'], lvl:4 },
  { t:'CUP', e:'☕', s:['CUP'], u:['C','U','P'], first:'c', sk:['en.g.c','en.g.u','en.g.p'], lvl:4 },
  { t:'BED', e:'🛏️', s:['BED'], u:['B','E','D'], first:'b', sk:['en.g.b','en.g.e','en.g.d'], lvl:5 },
  { t:'HAT', e:'🎩', s:['HAT'], u:['H','A','T'], first:'h', sk:['en.g.h','en.g.a','en.g.t'], lvl:5 },
  { t:'BUS', e:'🚌', s:['BUS'], u:['B','U','S'], first:'b', sk:['en.g.b','en.g.u','en.g.s'], lvl:5 },
  { t:'FOX', e:'🦊', s:['FOX'], u:['F','O','X'], first:'f', sk:['en.g.f','en.g.o'],          lvl:5 },
  { t:'HEN', e:'🐔', s:['HEN'], u:['H','E','N'], first:'h', sk:['en.g.h','en.g.e','en.g.n'], lvl:5 },
  { t:'LEG', e:'🦵', s:['LEG'], u:['L','E','G'], first:'l', sk:['en.g.l','en.g.e','en.g.g'], lvl:5 },
  { t:'NET', e:'🥅', s:['NET'], u:['N','E','T'], first:'n', sk:['en.g.n','en.g.e','en.g.t'], lvl:5 },
  { t:'JAM', e:'🍯', s:['JAM'], u:['J','A','M'], first:'j', sk:['en.g.m','en.g.a'],          lvl:5 },
  { t:'POT', e:'🍲', s:['POT'], u:['P','O','T'], first:'p', sk:['en.g.p','en.g.o','en.g.t'], lvl:5 },

  /* World 5 — digraphs and vowel patterns */
  { t:'SHIP',  e:'🚢', s:['SHIP'],  u:['SH','I','P'],  first:'sh', sk:['en.d.sh','en.g.i','en.g.p'], lvl:6 },
  { t:'SHELL', e:'🐚', s:['SHELL'], u:['SH','E','LL'], first:'sh', sk:['en.d.sh','en.g.e','en.g.l'], lvl:6 },
  { t:'SHEEP', e:'🐑', s:['SHEEP'], u:['SH','EE','P'], first:'sh', sk:['en.d.sh','en.d.ee'],         lvl:6 },
  { t:'CHIP',  e:'🍟', s:['CHIP'],  u:['CH','I','P'],  first:'ch', sk:['en.d.ch','en.g.i','en.g.p'], lvl:6 },
  { t:'CHICK', e:'🐤', s:['CHICK'], u:['CH','I','CK'], first:'ch', sk:['en.d.ch','en.g.i'],          lvl:6 },
  { t:'CHAIR', e:'🪑', s:['CHAIR'], u:['CH','AI','R'], first:'ch', sk:['en.d.ch','en.d.ai'],         lvl:7 },
  { t:'TREE',  e:'🌳', s:['TREE'],  u:['T','R','EE'],  first:'t',  sk:['en.d.ee','en.g.t','en.g.r'], lvl:6 },
  { t:'BEE',   e:'🐝', s:['BEE'],   u:['B','EE'],      first:'b',  sk:['en.d.ee','en.g.b'],          lvl:6 },
  { t:'MOON',  e:'🌙', s:['MOON'],  u:['M','OO','N'],  first:'m',  sk:['en.d.oo','en.g.m','en.g.n'], lvl:7 },
  { t:'BOOK',  e:'📖', s:['BOOK'],  u:['B','OO','K'],  first:'b',  sk:['en.d.oo','en.g.b'],          lvl:7 },
  { t:'RAIN',  e:'🌧️', s:['RAIN'],  u:['R','AI','N'],  first:'r',  sk:['en.d.ai','en.g.r','en.g.n'], lvl:7 },
  { t:'TRAIN', e:'🚂', s:['TRAIN'], u:['T','R','AI','N'], first:'t', sk:['en.d.ai','en.g.t'],        lvl:7 },
  { t:'THUMB', e:'👍', s:['THUMB'], u:['TH','U','MB'], first:'th', sk:['en.d.th'],                   lvl:7 },

  /* Oral-only picture words (world 1) */
  { t:'SOCK',   e:'🧦', s:['SOCK'],   first:'s', oral:true, lvl:1 },
  { t:'SNAKE',  e:'🐍', s:['SNAKE'],  first:'s', oral:true, lvl:1 },
  { t:'APPLE',  e:'🍎', s:['AP','PLE'], first:'a', oral:true, lvl:1 },
  { t:'ANT',    e:'🐜', s:['ANT'],    first:'a', oral:true, lvl:1 },
  { t:'IGLOO',  e:'🛖', s:['IG','LOO'], first:'i', oral:true, lvl:1 },
  { t:'INSECT', e:'🐞', s:['IN','SECT'], first:'i', oral:true, lvl:1 },
  { t:'INK',    e:'🖋️', s:['INK'],    first:'i', oral:true, lvl:1 },
  { t:'TIGER',  e:'🐯', s:['TI','GER'], first:'t', oral:true, lvl:1 },
  { t:'PEN',    e:'🖊️', s:['PEN'],    first:'p', oral:true, lvl:1 },
  { t:'NOSE',   e:'👃', s:['NOSE'],   first:'n', oral:true, lvl:1 },
  { t:'NUT',    e:'🥜', s:['NUT'],    first:'n', oral:true, lvl:1 },
  { t:'MOUSE',  e:'🐭', s:['MOUSE'],  first:'m', oral:true, lvl:1 },
  { t:'DUCK',   e:'🦆', s:['DUCK'],   first:'d', oral:true, lvl:1 },
  { t:'GOAT',   e:'🐐', s:['GOAT'],   first:'g', oral:true, lvl:1 },
  { t:'GIFT',   e:'🎁', s:['GIFT'],   first:'g', oral:true, lvl:1 },
  { t:'OCTOPUS',e:'🐙', s:['OC','TO','PUS'], first:'o', oral:true, lvl:1 },
  { t:'EGG',    e:'🥚', s:['EGG'],    first:'e', oral:true, lvl:1 },
  { t:'ELEPHANT',e:'🐘',s:['E','LE','PHANT'], first:'e', oral:true, lvl:1 },
  { t:'UMBRELLA',e:'☂️',s:['UM','BREL','LA'], first:'u', oral:true, lvl:1 },
  { t:'RING',   e:'💍', s:['RING'],   first:'r', oral:true, lvl:1 },
  { t:'ROBOT',  e:'🤖', s:['RO','BOT'], first:'r', oral:true, lvl:1 },
  { t:'HAND',   e:'✋', s:['HAND'],   first:'h', oral:true, lvl:1 },
  { t:'HOUSE',  e:'🏠', s:['HOUSE'],  first:'h', oral:true, lvl:1 },
  { t:'BALL',   e:'⚽', s:['BALL'],   first:'b', oral:true, lvl:1 },
  { t:'FISH',   e:'🐟', s:['FISH'],   first:'f', oral:true, lvl:1 },
  { t:'FIRE',   e:'🔥', s:['FIRE'],   first:'f', oral:true, lvl:1 },
  { t:'LION',   e:'🦁', s:['LI','ON'], first:'l', oral:true, lvl:1 },
  { t:'LEAF',   e:'🍃', s:['LEAF'],   first:'l', oral:true, lvl:1 },
  { t:'CAKE',   e:'🎂', s:['CAKE'],   first:'c', oral:true, lvl:1 },
  { t:'KEY',    e:'🔑', s:['KEY'],    first:'c', oral:true, lvl:1 }
];

DATA.en.syllables = {
  'en.b.cv':  ['SA','MA','PI','TA','NI','DO'],
  'en.b.cvc': ['SAT','MAT','PIN','TIP','DIG','MAN']
};

DATA.en.rhymes = [
  { target:{t:'CAT',e:'🐱'},  good:{t:'HAT',e:'🎩'},  bad:[{t:'DOG',e:'🐕'},{t:'SUN',e:'☀️'}] },
  { target:{t:'BED',e:'🛏️'}, good:{t:'HEN',e:'🐔'},  bad:[{t:'MOON',e:'🌙'},{t:'FISH',e:'🐟'}] },
  { target:{t:'PIG',e:'🐷'},  good:{t:'BIG',e:'🐘'},  bad:[{t:'CUP',e:'☕'},{t:'TREE',e:'🌳'}] },
  { target:{t:'BUS',e:'🚌'},  good:{t:'PLUS',e:'➕'}, bad:[{t:'CAT',e:'🐱'},{t:'BOOK',e:'📖'}] },
  { target:{t:'MOON',e:'🌙'}, good:{t:'SPOON',e:'🥄'},bad:[{t:'PIG',e:'🐷'},{t:'HAND',e:'✋'}] }
];

DATA.en.tricky = ['the','to','I','no','go','he','she','we','me','be','was','you','they','all','are','my','her'];

DATA.en.sentences = [
  { t:'The cat is big.',        e:'🐱', sk:['en.w.cvc','en.t.tricky'],
    q:{ q:'Who is big?', options:['The cat','The pig','The bus'], a:0 } },
  { t:'A pig is in the mud.',   e:'🐷', sk:['en.w.cvc','en.t.tricky'],
    q:{ q:'Where is the pig?', options:['In the mud','On the bed','In the cup'], a:0 } },
  { t:'Sam has a red hat.',     e:'🎩', sk:['en.w.cvcplus','en.t.tricky'],
    q:{ q:'What has Sam got?', options:['A red hat','A big dog','A blue cup'], a:0 } },
  { t:'The fish is in the pot.',e:'🐟', sk:['en.w.cvcplus','en.t.tricky'],
    q:{ q:'What is in the pot?', options:['The fish','The hen','The bus'], a:0 } },
  { t:'The ship is on the sea.',e:'🚢', sk:['en.d.sh','en.t.tricky'],
    q:{ q:'Where is the ship?', options:['On the sea','In the bed','On the map'], a:0 } },
  { t:'I can see the moon.',    e:'🌙', sk:['en.d.oo','en.t.tricky'],
    q:{ q:'What can I see?', options:['The moon','The sun','A tree'], a:0 } }
];

DATA.en.parentTips = [
  "Find three things in the kitchen that start with the sound sss.",
  "Clap the beats in family names: A-LEX-IS.",
  "Play a rhyming game in the car: \"I say CAT, you say...?\"",
  "Say a word sound by sound and let Alexis guess: c - u - p.",
  "Read a bedtime story and point at each word with your finger.",
  "Hunt for today's letter on street signs.",
  "Ask Alexis to find three things starting with /m/."
];
