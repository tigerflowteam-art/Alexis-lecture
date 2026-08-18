/* =========================================================
   data/missions.fr.js — Missions FRANCAISES

   Une mission = une competence = une sequence complete :
     decouverte -> pratique -> decodage -> comprehension -> lecture -> recompense

   Chaque etape porte :
     act    la mecanique d'activite (voir js/activities.js)
     phase  la phase pedagogique, affichee a l'enfant
     ...    la charge de contenu propre a la mecanique

   Les cinq premieres missions sont jouables. Les suivantes sont
   declarees verrouillees : elles montrent la profondeur du parcours
   sans pretendre etre finies.
   ========================================================= */

window.DATA = window.DATA || {};

DATA.missions = DATA.missions || {};

DATA.missions.fr = [

/* =========================================================
   MISSION 1 — J'ECOUTE   (monde 1, aucune lettre)
   ========================================================= */
{
  id: 'fr.m01', world: 1, n: 1,
  title: 'J\u2019\u00e9coute',
  subtitle: 'Les sons cach\u00e9s dans les mots',
  icon: '\ud83d\udc42',
  skill: 'fr.ph.syllabes',
  learned: 'Entendre les morceaux et les sons des mots',
  steps: [

    { act: 'discover', phase: 'discover',
      big: '\ud83d\udc42',
      title: 'Les mots sont faits de morceaux',
      say: { text: 'Chaque mot est fait de petits morceaux. \u00c9coute : la... ma... Lama !', lang: 'fr' },
      lines: ['LA \u00b7 MA \u2192 LAMA', 'MO \u00b7 TO \u2192 MOTO'] },

    { act: 'syllable-count', phase: 'practice',
      items: [{ t: 'LAMA', e: '\ud83e\udd99', n: 2 }, { t: 'MOTO', e: '\ud83c\udfcd\ufe0f', n: 2 }] },

    { act: 'syllable-count', phase: 'practice',
      items: [{ t: 'TOMATE', e: '\ud83c\udf45', n: 3 }, { t: 'CHAT', e: '\ud83d\udc31', n: 1 }] },

    { act: 'rhyme', phase: 'practice',
      base: { t: 'CHAT', e: '\ud83d\udc31' },
      good: { t: 'RAT', e: '\ud83d\udc00' },
      bad: [{ t: 'LUNE', e: '\ud83c\udf19' }, { t: 'POMME', e: '\ud83c\udf4e' }] },

    { act: 'rhyme', phase: 'practice',
      base: { t: 'BALLON', e: '\ud83c\udf88' },
      good: { t: 'MOUTON', e: '\ud83d\udc11' },
      bad: [{ t: 'V\u00c9LO', e: '\ud83d\udeb2' }, { t: 'SOURIS', e: '\ud83d\udc2d' }] },

    { act: 'first-sound', phase: 'practice', oral: true,
      word: { t: 'MOTO', e: '\ud83c\udfcd\ufe0f' },
      good: 'mmmm', bad: ['ssss', 'llll'] },

    { act: 'first-sound', phase: 'practice', oral: true,
      word: { t: 'SOLEIL', e: '\u2600\ufe0f' },
      good: 'ssss', bad: ['mmmm', 'rrrr'] },

    { act: 'blend-oral', phase: 'decode',
      parts: ['mmmm', 'aaaa'], result: 'MA',
      good: { t: 'MA', e: '\ud83d\udd0a' },
      bad: [{ t: 'AM', e: '\ud83d\udd0a' }, { t: 'MI', e: '\ud83d\udd0a' }] },

    { act: 'blend-oral', phase: 'decode',
      parts: ['llll', 'aaaa'], result: 'LA',
      good: { t: 'LA', e: '\ud83d\udd0a' },
      bad: [{ t: 'AL', e: '\ud83d\udd0a' }, { t: 'LO', e: '\ud83d\udd0a' }] },

    { act: 'wrap', phase: 'reward',
      learned: 'Tu sais d\u00e9couper les mots et entendre leurs sons !' }
  ]
},

/* =========================================================
   MISSION 2 — LE SON M
   ========================================================= */
{
  id: 'fr.m02', world: 2, n: 2,
  title: 'Le son M',
  subtitle: 'mmmmm',
  icon: '\ud83d\udd24',
  skill: 'fr.g.m',
  letter: 'M', lower: 'm', phonemeKey: 'fr:phoneme:m',
  learned: 'Le son M et sa lettre',
  words: [{ t: 'MOTO', e: '\ud83c\udfcd\ufe0f' }, { t: 'MAISON', e: '\ud83c\udfe0' }, { t: 'MOUTON', e: '\ud83d\udc11' }],
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'M', letter: true, phonemeKey: 'fr:phoneme:m',
      title: 'Voici le son mmmmm',
      say: { text: 'mmmmm. Comme dans moto, maison, mouton.', lang: 'fr' },
      examples: [{ t: 'MOTO', e: '\ud83c\udfcd\ufe0f' }, { t: 'MAISON', e: '\ud83c\udfe0' }, { t: 'MOUTON', e: '\ud83d\udc11' }] },

    { act: 'sound-in-words', phase: 'practice',
      phonemeKey: 'fr:phoneme:m',
      good: { t: 'MOTO', e: '\ud83c\udfcd\ufe0f' },
      bad: [{ t: 'SOLEIL', e: '\u2600\ufe0f' }, { t: 'V\u00c9LO', e: '\ud83d\udeb2' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'fr:phoneme:m',
      good: 'M', bad: ['S', 'L', 'T'] },

    { act: 'sort', phase: 'practice',
      phonemeKey: 'fr:phoneme:m', letter: 'M',
      yes: [{ t: 'MAISON', e: '\ud83c\udfe0' }, { t: 'MOUTON', e: '\ud83d\udc11' }],
      no: [{ t: 'SOLEIL', e: '\u2600\ufe0f' }, { t: 'TOMATE', e: '\ud83c\udf45' }] },

    { act: 'catch', phase: 'practice',
      target: 'M', pool: ['M', 'N', 'M', 'W', 'M', 'H', 'V', 'M', 'N', 'M', 'W', 'M'] },

    { act: 'first-sound', phase: 'practice',
      word: { t: 'MAISON', e: '\ud83c\udfe0' },
      good: 'mmmm', bad: ['ssss', 'tttt'] },

    { act: 'memory', phase: 'practice',
      pairs: [{ e: '\ud83c\udfcd\ufe0f', label: 'MOTO' },
              { e: '\ud83c\udfe0', label: 'MAISON' },
              { e: '\ud83d\udc11', label: 'MOUTON' }] },

    { act: 'sound-in-words', phase: 'decode',
      phonemeKey: 'fr:phoneme:m',
      good: { t: 'MOUTON', e: '\ud83d\udc11' },
      bad: [{ t: 'POMME', e: '\ud83c\udf4e' }, { t: 'CHAT', e: '\ud83d\udc31' }],
      note: 'Attention : dans POMME on entend aussi mmmm, mais pas au d\u00e9but !' },

    { act: 'find-letter', phase: 'decode',
      phonemeKey: 'fr:phoneme:m',
      good: 'M', bad: ['W', 'N', 'E'] },

    { act: 'wrap', phase: 'reward',
      learned: 'Tu connais le son M et sa lettre !' }
  ]
},

/* =========================================================
   MISSION 3 — LE SON A
   ========================================================= */
{
  id: 'fr.m03', world: 2, n: 3,
  title: 'Le son A',
  subtitle: 'aaaaa',
  icon: '\ud83d\udd24',
  skill: 'fr.g.a',
  letter: 'A', lower: 'a', phonemeKey: 'fr:phoneme:a',
  learned: 'Le son A et sa lettre',
  words: [{ t: 'ARBRE', e: '\ud83c\udf33' }, { t: 'AVION', e: '\u2708\ufe0f' }, { t: 'ANANAS', e: '\ud83c\udf4d' }],
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'A', letter: true, phonemeKey: 'fr:phoneme:a',
      title: 'Voici le son aaaaa',
      say: { text: 'aaaaa. On ouvre grand la bouche. Comme dans arbre, avion, ananas.', lang: 'fr' },
      examples: [{ t: 'ARBRE', e: '\ud83c\udf33' }, { t: 'AVION', e: '\u2708\ufe0f' }, { t: 'ANANAS', e: '\ud83c\udf4d' }] },

    { act: 'sound-in-words', phase: 'practice',
      phonemeKey: 'fr:phoneme:a',
      good: { t: 'AVION', e: '\u2708\ufe0f' },
      bad: [{ t: '\u00cELE', e: '\ud83c\udfdd\ufe0f' }, { t: 'OURS', e: '\ud83d\udc3b' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'fr:phoneme:a',
      good: 'A', bad: ['O', 'I', 'U'] },

    { act: 'sort', phase: 'practice',
      phonemeKey: 'fr:phoneme:a', letter: 'A',
      yes: [{ t: 'ARBRE', e: '\ud83c\udf33' }, { t: 'ANANAS', e: '\ud83c\udf4d' }],
      no: [{ t: '\u00cELE', e: '\ud83c\udfdd\ufe0f' }, { t: 'ORANGE', e: '\ud83c\udf4a' }] },

    { act: 'catch', phase: 'practice',
      target: 'A', pool: ['A', 'O', 'A', 'E', 'A', 'U', 'A', 'O', 'A', 'I', 'A', 'E'] },

    { act: 'memory', phase: 'practice',
      pairs: [{ e: '\ud83c\udf33', label: 'ARBRE' },
              { e: '\u2708\ufe0f', label: 'AVION' },
              { e: '\ud83c\udf4d', label: 'ANANAS' }] },

    { act: 'first-sound', phase: 'decode',
      word: { t: 'ANANAS', e: '\ud83c\udf4d' },
      good: 'aaaa', bad: ['oooo', 'iiii'] },

    { act: 'find-letter', phase: 'decode',
      phonemeKey: 'fr:phoneme:a',
      good: 'A', bad: ['M', 'O', 'S'] },

    { act: 'letters-review', phase: 'decode',
      title: 'Tu connais maintenant deux sons',
      items: [{ letter: 'M', key: 'fr:phoneme:m' }, { letter: 'A', key: 'fr:phoneme:a' }] },

    { act: 'wrap', phase: 'reward',
      learned: 'Tu connais le son A et sa lettre !' }
  ]
},

/* =========================================================
   MISSION 4 — JE COLLE M ET A
   ========================================================= */
{
  id: 'fr.m04', world: 3, n: 4,
  title: 'Je colle M et A',
  subtitle: 'M + A \u2192 MA',
  icon: '\ud83e\udde9',
  skill: 'fr.b.m',
  learned: 'Coller deux sons pour faire une syllabe',
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'MA', letter: true,
      title: 'Deux sons qui se collent',
      say: { text: 'mmmm... aaaa... MA ! Quand on colle deux sons, on fait une syllabe.', lang: 'fr' },
      lines: ['M + A \u2192 MA'] },

    { act: 'blend', phase: 'decode',
      a: { l: 'M', key: 'fr:phoneme:m' }, b: { l: 'A', key: 'fr:phoneme:a' },
      result: 'MA', resultKey: 'fr:syll:ma',
      bad: ['AM', 'MI'],
      scaffold: ['fr:phoneme:m', 'fr:phoneme:a', 'fr:syll:ma'] },

    { act: 'blend', phase: 'decode',
      a: { l: 'A', key: 'fr:phoneme:a' }, b: { l: 'M', key: 'fr:phoneme:m' },
      result: 'AM', resultKey: 'fr:syll:am',
      bad: ['MA', 'AN'],
      scaffold: ['fr:phoneme:a', 'fr:phoneme:m', 'fr:syll:am'] },

    { act: 'build', phase: 'decode',
      target: 'MA', kind: 'letters',
      bricks: ['M', 'A', 'O', 'S'],
      audioKey: 'fr:syll:ma',
      scaffold: ['fr:phoneme:m', 'fr:phoneme:a', 'fr:syll:ma'] },

    { act: 'segment', phase: 'decode',
      word: 'MA', audioKey: 'fr:syll:ma', n: 2 },

    { act: 'read-aloud', phase: 'read',
      text: 'MA', audioKey: 'fr:syll:ma',
      hint: 'mmmm puis aaaa' },

    { act: 'build', phase: 'decode',
      target: 'MAMA', kind: 'letters',
      bricks: ['M', 'A', 'M', 'A'],
      audioKey: 'fr:word:mama',
      scaffold: ['fr:syll:ma', 'fr:syll:ma', 'fr:word:mama'] },

    { act: 'read-aloud', phase: 'read',
      text: 'MAMA', audioKey: 'fr:word:mama',
      hint: 'MA puis MA' },

    { act: 'word-to-image', phase: 'understand',
      word: 'MAMA', audioKey: 'fr:word:mama',
      good: '\ud83d\udc69', bad: ['\ud83c\udfcd\ufe0f', '\ud83c\udf33'] },

    { act: 'wrap', phase: 'reward',
      learned: 'Tu sais coller deux sons pour lire une syllabe !' }
  ]
},

/* =========================================================
   MISSION 5 — LE SON L ET MES PREMIERS MOTS
   ========================================================= */
{
  id: 'fr.m05', world: 3, n: 5,
  title: 'Mes premiers mots',
  subtitle: 'Le son L \u00b7 LAMA',
  icon: '\ud83c\udf81',
  skill: 'fr.g.l',
  letter: 'L', lower: 'l', phonemeKey: 'fr:phoneme:l',
  learned: 'Le son L, et mon premier vrai mot',
  unlocksBook: 'fr.b1',
  words: [{ t: 'LAMA', e: '\ud83e\udd99' }, { t: 'LUNE', e: '\ud83c\udf19' }, { t: 'LIVRE', e: '\ud83d\udcd6' }],
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'L', letter: true, phonemeKey: 'fr:phoneme:l',
      title: 'Voici le son lllll',
      say: { text: 'lllll. La langue touche le haut de la bouche. Comme dans lama, lune, livre.', lang: 'fr' },
      examples: [{ t: 'LAMA', e: '\ud83e\udd99' }, { t: 'LUNE', e: '\ud83c\udf19' }, { t: 'LIVRE', e: '\ud83d\udcd6' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'fr:phoneme:l',
      good: 'L', bad: ['M', 'A', 'T'] },

    { act: 'sound-in-words', phase: 'practice',
      phonemeKey: 'fr:phoneme:l',
      good: { t: 'LUNE', e: '\ud83c\udf19' },
      bad: [{ t: 'MOTO', e: '\ud83c\udfcd\ufe0f' }, { t: 'ANANAS', e: '\ud83c\udf4d' }] },

    { act: 'blend', phase: 'decode',
      a: { l: 'L', key: 'fr:phoneme:l' }, b: { l: 'A', key: 'fr:phoneme:a' },
      result: 'LA', resultKey: 'fr:syll:la',
      bad: ['AL', 'LO'],
      scaffold: ['fr:phoneme:l', 'fr:phoneme:a', 'fr:syll:la'] },

    { act: 'build', phase: 'decode',
      target: 'LAMA', kind: 'syllables',
      bricks: ['LA', 'MA', 'MO', 'LI'],
      audioKey: 'fr:word:lama',
      scaffold: ['fr:syll:la', 'fr:syll:ma', 'fr:word:lama'] },

    { act: 'read-aloud', phase: 'read',
      text: 'LAMA', audioKey: 'fr:word:lama',
      hint: 'LA puis MA' },

    { act: 'word-to-image', phase: 'understand',
      word: 'LAMA', audioKey: 'fr:word:lama',
      good: '\ud83e\udd99', bad: ['\ud83d\udc11', '\ud83d\udc0e'] },

    { act: 'instruction', phase: 'understand',
      say: { text: 'Touche le mot LAMA', lang: 'fr' },
      target: 'LAMA', others: ['MAMA', 'MAL'] },

    { act: 'mini-story', phase: 'read',
      title: 'Le lama',
      pages: [
        { text: 'Le lama.', e: '\ud83e\udd99' },
        { text: 'Le lama a mal.', e: '\ud83d\ude23' },
        { text: 'Mama ! Mama !', e: '\ud83d\udce3' },
        { text: 'Mama a le lama.', e: '\ud83e\udd17' }
      ] },

    { act: 'wrap', phase: 'reward',
      learned: 'Tu as lu ton premier vrai mot : LAMA !',
      unlocksBook: 'fr.b1' }
  ]
},

/* =========================================================
   MISSIONS SUIVANTES — annoncees, pas encore jouables
   ========================================================= */
{ id: 'fr.m06', world: 3, n: 6, title: 'Le son I', subtitle: 'iiiii', icon: '\ud83d\udd24', locked: true, skill: 'fr.g.i' },
{ id: 'fr.m07', world: 4, n: 7, title: 'Le son T', subtitle: 'te', icon: '\ud83d\udd24', locked: true, skill: 'fr.g.t' },
{ id: 'fr.m08', world: 4, n: 8, title: 'Je lis des syllabes', subtitle: 'MA \u00b7 LI \u00b7 TO', icon: '\ud83e\ude84', locked: true, skill: 'fr.syl.read' },
{ id: 'fr.m09', world: 5, n: 9, title: 'Le son O', subtitle: 'ooooo', icon: '\ud83d\udd24', locked: true, skill: 'fr.g.o' },
{ id: 'fr.m10', world: 5, n: 10, title: 'MOTO, TOMATE', subtitle: 'Mots de deux syllabes', icon: '\ud83c\udf81', locked: true, skill: 'fr.w.cvcv' },
{ id: 'fr.m11', world: 6, n: 11, title: 'Le son OU', subtitle: 'ououou', icon: '\u2728', locked: true, skill: 'fr.c.ou' },
{ id: 'fr.m12', world: 6, n: 12, title: 'Le son CH', subtitle: 'chhhh', icon: '\u2728', locked: true, skill: 'fr.c.ch' },
{ id: 'fr.m13', world: 7, n: 13, title: 'Les petits mots', subtitle: 'le \u00b7 la \u00b7 un', icon: '\ud83d\udddd\ufe0f', locked: true, skill: 'fr.t.outils' },
{ id: 'fr.m14', world: 7, n: 14, title: 'Je lis une phrase', subtitle: 'Le lama a une moto.', icon: '\ud83d\udcdd', locked: true, skill: 'fr.s.phrase' },
{ id: 'fr.m15', world: 10, n: 15, title: 'Je lis une histoire', subtitle: 'Mon vrai livre', icon: '\ud83d\udcd6', locked: true, skill: 'fr.h.livre' }

];
