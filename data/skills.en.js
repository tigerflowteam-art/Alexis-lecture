/* =========================================================
   data/skills.en.js — English skill tree
   Ordre "systematic synthetic phonics" (s a t p / i n m d / g o c k ...).
   Volontairement DIFFERENT du parcours francais : CH -> /tʃ/, pas /ʃ/ (§6).
   ========================================================= */

window.DATA = window.DATA || {};
DATA.en = DATA.en || {};

DATA.en.skills = [

  /* ---------- WORLD 1 — I listen ---------- */
  { id:'en.ph.syllables', world:1, type:'phono', label:'Syllables', short:'Clapping words',
    phoneme:'—', say:'syllables', teach:'Words break into beats. RAB-BIT has two beats.',
    prereq:[], drills:['syllable-count'] },

  { id:'en.ph.rhyme', world:1, type:'phono', label:'Rhyme', short:'Words that rhyme',
    phoneme:'—', say:'rhyme', teach:'CAT and HAT rhyme. They end the same way.',
    prereq:[], drills:['rhyme'] },

  { id:'en.ph.initial', world:1, type:'phono', label:'First sound', short:'Initial sound',
    phoneme:'—', say:'the first sound', teach:'Every word starts with a sound. SUN starts with sss.',
    prereq:[], drills:['image-to-first-sound'] },

  { id:'en.ph.blendoral', world:1, type:'phono', label:'Pushing sounds together', short:'Oral blending',
    phoneme:'—', say:'blending', teach:'c - a - t. Push them together: CAT.',
    prereq:['en.ph.initial'], drills:['blend-oral'] },

  /* ---------- WORLD 2 — I discover sounds (Set 1 to 5) ---------- */
  { id:'en.g.s', world:2, type:'grapheme', label:'S', lower:'s', name:'ess', phoneme:'/s/', say:'sss',
    examples:[{w:'SUN',e:'☀️'},{w:'SOCK',e:'🧦'},{w:'SNAKE',e:'🐍'}], prereq:['en.ph.initial'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.a', world:2, type:'grapheme', label:'A', lower:'a', name:'ay', phoneme:'/æ/', say:'ah',
    examples:[{w:'APPLE',e:'🍎'},{w:'ANT',e:'🐜'}], prereq:['en.ph.initial'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.t', world:2, type:'grapheme', label:'T', lower:'t', name:'tee', phoneme:'/t/', say:'tuh',
    examples:[{w:'TREE',e:'🌳'},{w:'TIGER',e:'🐯'},{w:'TAP',e:'🚰'}], prereq:['en.g.s'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.p', world:2, type:'grapheme', label:'P', lower:'p', name:'pee', phoneme:'/p/', say:'puh',
    examples:[{w:'PIG',e:'🐷'},{w:'PEN',e:'🖊️'},{w:'PAN',e:'🍳'}], prereq:['en.g.a'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.i', world:2, type:'grapheme', label:'I', lower:'i', name:'eye', phoneme:'/ɪ/', say:'ih',
    examples:[{w:'IGLOO',e:'🛖'},{w:'INK',e:'🖋️'}], prereq:['en.g.t'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.n', world:2, type:'grapheme', label:'N', lower:'n', name:'en', phoneme:'/n/', say:'nnn',
    examples:[{w:'NEST',e:'🪺'},{w:'NOSE',e:'👃'},{w:'NUT',e:'🥜'}], prereq:['en.g.i'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.m', world:2, type:'grapheme', label:'M', lower:'m', name:'em', phoneme:'/m/', say:'mmm',
    examples:[{w:'MOON',e:'🌙'},{w:'MAP',e:'🗺️'},{w:'MOUSE',e:'🐭'}], prereq:['en.g.i'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.d', world:2, type:'grapheme', label:'D', lower:'d', name:'dee', phoneme:'/d/', say:'duh',
    examples:[{w:'DOG',e:'🐕'},{w:'DUCK',e:'🦆'},{w:'DOOR',e:'🚪'}], prereq:['en.g.n'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.g', world:2, type:'grapheme', label:'G', lower:'g', name:'gee', phoneme:'/g/', say:'guh',
    examples:[{w:'GOAT',e:'🐐'},{w:'GIFT',e:'🎁'}], prereq:['en.g.d'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.o', world:2, type:'grapheme', label:'O', lower:'o', name:'oh', phoneme:'/ɒ/', say:'oh',
    examples:[{w:'OCTOPUS',e:'🐙'},{w:'OX',e:'🐂'}], prereq:['en.g.m'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.c', world:2, type:'grapheme', label:'C', lower:'c', name:'see', phoneme:'/k/', say:'kuh',
    examples:[{w:'CAT',e:'🐱'},{w:'CUP',e:'☕'},{w:'CAKE',e:'🎂'}], prereq:['en.g.o'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image','image-to-first-sound'] },

  { id:'en.g.e', world:2, type:'grapheme', label:'E', lower:'e', name:'ee', phoneme:'/e/', say:'eh',
    examples:[{w:'EGG',e:'🥚'},{w:'ELEPHANT',e:'🐘'}], prereq:['en.g.c'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.u', world:2, type:'grapheme', label:'U', lower:'u', name:'you', phoneme:'/ʌ/', say:'uh',
    examples:[{w:'UMBRELLA',e:'☂️'}], prereq:['en.g.e'],
    drills:['sound-to-letter','letter-to-sound'] },

  { id:'en.g.r', world:2, type:'grapheme', label:'R', lower:'r', name:'ar', phoneme:'/r/', say:'rrr',
    examples:[{w:'RAIN',e:'🌧️'},{w:'RING',e:'💍'},{w:'ROBOT',e:'🤖'}], prereq:['en.g.u'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.h', world:2, type:'grapheme', label:'H', lower:'h', name:'aitch', phoneme:'/h/', say:'huh',
    examples:[{w:'HAT',e:'🎩'},{w:'HAND',e:'✋'},{w:'HOUSE',e:'🏠'}], prereq:['en.g.r'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.b', world:2, type:'grapheme', label:'B', lower:'b', name:'bee', phoneme:'/b/', say:'buh',
    examples:[{w:'BUS',e:'🚌'},{w:'BALL',e:'⚽'},{w:'BED',e:'🛏️'}], prereq:['en.g.h'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.f', world:2, type:'grapheme', label:'F', lower:'f', name:'ef', phoneme:'/f/', say:'fff',
    examples:[{w:'FISH',e:'🐟'},{w:'FOX',e:'🦊'},{w:'FIRE',e:'🔥'}], prereq:['en.g.b'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  { id:'en.g.l', world:2, type:'grapheme', label:'L', lower:'l', name:'el', phoneme:'/l/', say:'lll',
    examples:[{w:'LION',e:'🦁'},{w:'LEAF',e:'🍃'},{w:'LEG',e:'🦵'}], prereq:['en.g.f'],
    drills:['sound-to-letter','letter-to-sound','sound-to-image'] },

  /* ---------- WORLD 3 — I blend ---------- */
  { id:'en.b.cv', world:3, type:'blend', label:'Two sounds', short:'s-a, m-a, p-i',
    teach:'Push two sounds together and they become one.',
    prereq:['en.g.s','en.g.a','en.ph.blendoral'], drills:['blend'] },

  { id:'en.b.cvc', world:3, type:'blend', label:'Three sounds', short:'s-a-t',
    teach:'c - a - t makes CAT.',
    prereq:['en.b.cv','en.g.t','en.g.p'], drills:['blend','word-builder'] },

  /* ---------- WORLD 4 — I read my first words ---------- */
  { id:'en.w.cvc', world:4, type:'word', label:'CVC words', short:'CAT · SUN · PIG',
    prereq:['en.b.cvc','en.g.m','en.g.d'], drills:['word-to-image','image-to-word','letter-order','word-builder','segment'] },

  { id:'en.w.cvcplus', world:4, type:'word', label:'More CVC words', short:'HAT · BUS · FOX',
    prereq:['en.w.cvc','en.g.h','en.g.b'], drills:['word-to-image','image-to-word','letter-order','segment'] },

  /* ---------- WORLD 5 — I discover new patterns ---------- */
  { id:'en.d.sh', world:5, type:'complex', label:'SH', lower:'sh', phoneme:'/ʃ/', say:'shhh',
    examples:[{w:'SHIP',e:'🚢'},{w:'SHELL',e:'🐚'},{w:'SHEEP',e:'🐑'}], prereq:['en.w.cvc'],
    drills:['sound-to-letter','sound-to-image','word-to-image','image-to-word'] },

  { id:'en.d.ch', world:5, type:'complex', label:'CH', lower:'ch', phoneme:'/tʃ/', say:'chuh',
    examples:[{w:'CHAIR',e:'🪑'},{w:'CHERRY',e:'🍒'},{w:'CHICK',e:'🐤'}], prereq:['en.d.sh'],
    drills:['sound-to-letter','sound-to-image','word-to-image','image-to-word'], bilingual:'fr.c.ch' },

  { id:'en.d.th', world:5, type:'complex', label:'TH', lower:'th', phoneme:'/θ/', say:'th',
    examples:[{w:'THUMB',e:'👍'},{w:'THREE',e:'3️⃣'}], prereq:['en.d.ch'],
    drills:['sound-to-letter','sound-to-image','image-to-word'] },

  { id:'en.d.ee', world:5, type:'complex', label:'EE', lower:'ee', phoneme:'/iː/', say:'eee',
    examples:[{w:'TREE',e:'🌳'},{w:'BEE',e:'🐝'}], prereq:['en.d.sh'],
    drills:['sound-to-letter','sound-to-image','word-to-image','image-to-word'] },

  { id:'en.d.oo', world:5, type:'complex', label:'OO', lower:'oo', phoneme:'/uː/', say:'ooo',
    examples:[{w:'MOON',e:'🌙'},{w:'BOOK',e:'📖'}], prereq:['en.d.ee'],
    drills:['sound-to-letter','sound-to-image','word-to-image','image-to-word'] },

  { id:'en.d.ai', world:5, type:'complex', label:'AI', lower:'ai', phoneme:'/eɪ/', say:'ay',
    examples:[{w:'RAIN',e:'🌧️'},{w:'TRAIN',e:'🚂'}], prereq:['en.d.oo'],
    drills:['sound-to-letter','sound-to-image','image-to-word'] },

  /* ---------- WORLD 6 — Tricky words ---------- */
  { id:'en.t.tricky', world:6, type:'tricky', label:'Tricky words', short:'the · was · you',
    teach:'Some words cannot be sounded out. We learn them by heart.',
    prereq:['en.w.cvc'], drills:['tricky-word'] },

  /* ---------- WORLD 7 — Sentences ---------- */
  { id:'en.s.sentence', world:7, type:'sentence', label:'I read a sentence', short:'The cat is big.',
    prereq:['en.t.tricky','en.w.cvcplus'], drills:['sentence-read','sentence-order'] },

  /* ---------- WORLD 8 — Fluency ---------- */
  { id:'en.f.fluency', world:8, type:'fluency', label:'I read fluently', short:'Fluency',
    prereq:['en.s.sentence'], drills:['sentence-read'] },

  /* ---------- WORLD 9 — Understanding ---------- */
  { id:'en.k.comprehension', world:9, type:'comprehension', label:'I understand what I read', short:'Comprehension',
    prereq:['en.s.sentence'], drills:['comprehension'] },

  /* ---------- WORLD 10 — Stories ---------- */
  { id:'en.h.book', world:10, type:'story', label:'I read a book', short:'My books',
    prereq:['en.k.comprehension','en.f.fluency'], drills:['book'] }
];

/* ---------- MISSIONS BILINGUES (§23) ----------
   Introduites seulement quand les deux bases sont solides. */
DATA.bilingual = [
  { id:'bi.ch', graph:'CH',
    fr:{ word:'CHAT', emoji:'🐱', phoneme:'/ʃ/', say:'chat' },
    en:{ word:'CHIP', emoji:'🍟', phoneme:'/tʃ/', say:'chip' },
    question_fr:'Le CH se dit-il pareil ?', answer:'different',
    explain_fr:'En français CH fait chhh. En anglais CH fait tch.' },
  { id:'bi.i', graph:'I',
    fr:{ word:'LIT', emoji:'🛏️', phoneme:'/i/', say:'lit' },
    en:{ word:'PIG', emoji:'🐷', phoneme:'/ɪ/', say:'pig' },
    question_fr:'Le I se dit-il pareil ?', answer:'different',
    explain_fr:'En français I fait iii. En anglais I fait ih.' },
  { id:'bi.m', graph:'M',
    fr:{ word:'MOTO', emoji:'🏍️', phoneme:'/m/', say:'moto' },
    en:{ word:'MOON', emoji:'🌙', phoneme:'/m/', say:'moon' },
    question_fr:'Le M se dit-il pareil ?', answer:'same',
    explain_fr:'Oui ! Le M fait mmm dans les deux langues.' },
  { id:'bi.ou', graph:'OU',
    fr:{ word:'POULE', emoji:'🐔', phoneme:'/u/', say:'poule' },
    en:{ word:'HOUSE', emoji:'🏠', phoneme:'/aʊ/', say:'house' },
    question_fr:'Le OU se dit-il pareil ?', answer:'different',
    explain_fr:'En français OU fait ou. En anglais OU fait souvent aou.' }
];
