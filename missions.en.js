/* =========================================================
   data/missions.en.js — ENGLISH missions

   Progression phonics anglaise INDEPENDANTE (§15). Ce n'est pas
   une traduction du parcours francais : ordre systematic synthetic
   phonics (s, a, t, p, i, n, m), sons anglais, mots anglais.

   Ecart assume par rapport a l'exemple du brief : la mission 4
   introduit T et P, et la mission 5 introduit I, N et M. Sans ces
   sons, aucun vrai mot CVC n'est lisible et l'histoire finale
   serait impossible. Les titres restent ceux demandes.
   ========================================================= */

window.DATA = window.DATA || {};
DATA.missions = DATA.missions || {};

DATA.missions.en = [

/* =========================================================
   MISSION 1 — I LISTEN
   ========================================================= */
{
  id: 'en.m01', world: 1, n: 1,
  title: 'I listen',
  subtitle: 'Sounds hiding in words',
  icon: '\ud83d\udc42',
  skill: 'en.ph.syllables',
  learned: 'Hearing beats and sounds inside words',
  steps: [

    { act: 'discover', phase: 'discover',
      big: '\ud83d\udc42',
      title: 'Words are made of beats',
      say: { text: 'Every word has beats. Listen: rab... bit. Rabbit!', lang: 'en' },
      lines: ['RAB \u00b7 BIT \u2192 RABBIT', 'SUN \u2192 one beat'] },

    { act: 'syllable-count', phase: 'practice',
      items: [{ t: 'RABBIT', e: '\ud83d\udc07', n: 2 }, { t: 'SUN', e: '\u2600\ufe0f', n: 1 }] },

    { act: 'syllable-count', phase: 'practice',
      items: [{ t: 'ELEPHANT', e: '\ud83d\udc18', n: 3 }, { t: 'CAT', e: '\ud83d\udc31', n: 1 }] },

    { act: 'rhyme', phase: 'practice',
      base: { t: 'CAT', e: '\ud83d\udc31' },
      good: { t: 'HAT', e: '\ud83c\udfa9' },
      bad: [{ t: 'DOG', e: '\ud83d\udc15' }, { t: 'MOON', e: '\ud83c\udf19' }] },

    { act: 'rhyme', phase: 'practice',
      base: { t: 'STAR', e: '\u2b50' },
      good: { t: 'CAR', e: '\ud83d\ude97' },
      bad: [{ t: 'TREE', e: '\ud83c\udf33' }, { t: 'FISH', e: '\ud83d\udc1f' }] },

    { act: 'first-sound', phase: 'practice', oral: true,
      word: { t: 'SUN', e: '\u2600\ufe0f' },
      good: 'sss', bad: ['mmm', 'tuh'] },

    { act: 'first-sound', phase: 'practice', oral: true,
      word: { t: 'MOON', e: '\ud83c\udf19' },
      good: 'mmm', bad: ['sss', 'puh'] },

    { act: 'blend-oral', phase: 'decode',
      parts: ['sss', 'ah'], result: 'SA',
      good: { t: 'SA', e: '\ud83d\udd0a' },
      bad: [{ t: 'AS', e: '\ud83d\udd0a' }, { t: 'SO', e: '\ud83d\udd0a' }] },

    { act: 'blend-oral', phase: 'decode',
      parts: ['ah', 'tuh'], result: 'AT',
      good: { t: 'AT', e: '\ud83d\udd0a' },
      bad: [{ t: 'TA', e: '\ud83d\udd0a' }, { t: 'IT', e: '\ud83d\udd0a' }] },

    { act: 'wrap', phase: 'reward',
      learned: 'You can hear beats and sounds inside words!' }
  ]
},

/* =========================================================
   MISSION 2 — THE SOUND S
   ========================================================= */
{
  id: 'en.m02', world: 2, n: 2,
  title: 'The sound S',
  subtitle: 'sssss',
  icon: '\ud83d\udd24',
  skill: 'en.g.s',
  letter: 'S', lower: 's', phonemeKey: 'en:phoneme:s',
  learned: 'The sound S and its letter',
  words: [{ t: 'SUN', e: '\u2600\ufe0f' }, { t: 'SOCK', e: '\ud83e\udde6' }, { t: 'SNAKE', e: '\ud83d\udc0d' }],
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'S', letter: true, phonemeKey: 'en:phoneme:s',
      title: 'This is the sound sssss',
      say: { text: 'sssss. Like a snake. Sun, sock, snake.', lang: 'en' },
      examples: [{ t: 'SUN', e: '\u2600\ufe0f' }, { t: 'SOCK', e: '\ud83e\udde6' }, { t: 'SNAKE', e: '\ud83d\udc0d' }] },

    { act: 'sound-in-words', phase: 'practice',
      phonemeKey: 'en:phoneme:s',
      good: { t: 'SUN', e: '\u2600\ufe0f' },
      bad: [{ t: 'DOG', e: '\ud83d\udc15' }, { t: 'CAKE', e: '\ud83c\udf82' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'en:phoneme:s',
      good: 'S', bad: ['M', 'T', 'A'] },

    { act: 'sort', phase: 'practice',
      phonemeKey: 'en:phoneme:s', letter: 'S',
      yes: [{ t: 'SOCK', e: '\ud83e\udde6' }, { t: 'SNAKE', e: '\ud83d\udc0d' }],
      no: [{ t: 'CAT', e: '\ud83d\udc31' }, { t: 'MOON', e: '\ud83c\udf19' }] },

    { act: 'catch', phase: 'practice',
      target: 'S', pool: ['S', 'Z', 'S', 'C', 'S', 'O', 'S', 'Z', 'S', 'G', 'S', 'C'] },

    { act: 'first-sound', phase: 'practice',
      word: { t: 'SNAKE', e: '\ud83d\udc0d' },
      good: 'sss', bad: ['nnn', 'kuh'] },

    { act: 'memory', phase: 'practice',
      pairs: [{ e: '\u2600\ufe0f', label: 'SUN' },
              { e: '\ud83e\udde6', label: 'SOCK' },
              { e: '\ud83d\udc0d', label: 'SNAKE' }] },

    { act: 'sound-in-words', phase: 'decode',
      phonemeKey: 'en:phoneme:s',
      good: { t: 'SOCK', e: '\ud83e\udde6' },
      bad: [{ t: 'FISH', e: '\ud83d\udc1f' }, { t: 'BALL', e: '\u26bd' }] },

    { act: 'find-letter', phase: 'decode',
      phonemeKey: 'en:phoneme:s',
      good: 'S', bad: ['Z', 'C', 'G'] },

    { act: 'wrap', phase: 'reward',
      learned: 'You know the sound S and its letter!' }
  ]
},

/* =========================================================
   MISSION 3 — THE SOUND A
   ========================================================= */
{
  id: 'en.m03', world: 2, n: 3,
  title: 'The sound A',
  subtitle: 'ah',
  icon: '\ud83d\udd24',
  skill: 'en.g.a',
  letter: 'A', lower: 'a', phonemeKey: 'en:phoneme:a',
  learned: 'The sound A and its letter',
  words: [{ t: 'APPLE', e: '\ud83c\udf4e' }, { t: 'ANT', e: '\ud83d\udc1c' }, { t: 'CAT', e: '\ud83d\udc31' }],
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'A', letter: true, phonemeKey: 'en:phoneme:a',
      title: 'This is the sound ah',
      say: { text: 'ah, ah, ah. Apple, ant, cat.', lang: 'en' },
      examples: [{ t: 'APPLE', e: '\ud83c\udf4e' }, { t: 'ANT', e: '\ud83d\udc1c' }, { t: 'CAT', e: '\ud83d\udc31' }],
      note: 'In English, A says ah. It is not the French A.' },

    { act: 'sound-in-words', phase: 'practice',
      phonemeKey: 'en:phoneme:a',
      good: { t: 'ANT', e: '\ud83d\udc1c' },
      bad: [{ t: 'MOON', e: '\ud83c\udf19' }, { t: 'TREE', e: '\ud83c\udf33' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'en:phoneme:a',
      good: 'A', bad: ['O', 'E', 'U'] },

    { act: 'sort', phase: 'practice',
      phonemeKey: 'en:phoneme:a', letter: 'A',
      yes: [{ t: 'APPLE', e: '\ud83c\udf4e' }, { t: 'CAT', e: '\ud83d\udc31' }],
      no: [{ t: 'MOON', e: '\ud83c\udf19' }, { t: 'FISH', e: '\ud83d\udc1f' }] },

    { act: 'catch', phase: 'practice',
      target: 'A', pool: ['A', 'O', 'A', 'E', 'A', 'U', 'A', 'O', 'A', 'E', 'A', 'U'] },

    { act: 'memory', phase: 'practice',
      pairs: [{ e: '\ud83c\udf4e', label: 'APPLE' },
              { e: '\ud83d\udc1c', label: 'ANT' },
              { e: '\u2600\ufe0f', label: 'SUN' }] },

    { act: 'blend-oral', phase: 'decode',
      parts: ['sss', 'ah'], result: 'SA',
      good: { t: 'SA', e: '\ud83d\udd0a' },
      bad: [{ t: 'AS', e: '\ud83d\udd0a' }, { t: 'SO', e: '\ud83d\udd0a' }] },

    { act: 'letters-review', phase: 'decode',
      title: 'You know two sounds now',
      items: [{ letter: 'S', key: 'en:phoneme:s' }, { letter: 'A', key: 'en:phoneme:a' }] },

    { act: 'find-letter', phase: 'decode',
      phonemeKey: 'en:phoneme:a',
      good: 'A', bad: ['S', 'O', 'M'] },

    { act: 'wrap', phase: 'reward',
      learned: 'You know the sound A and its letter!' }
  ]
},

/* =========================================================
   MISSION 4 — BLENDING  (introduit T et P)
   ========================================================= */
{
  id: 'en.m04', world: 3, n: 4,
  title: 'Blending',
  subtitle: 's - a - t \u2192 SAT',
  icon: '\ud83e\udde9',
  skill: 'en.b.cvc',
  learned: 'Pushing sounds together to read',
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'T', letter: true, phonemeKey: 'en:phoneme:t',
      title: 'Two more sounds: T and P',
      say: { text: 'tuh. puh. Now we can blend.', lang: 'en' },
      examples: [{ t: 'TREE', e: '\ud83c\udf33' }, { t: 'TAP', e: '\ud83d\udeb0' }, { t: 'PIG', e: '\ud83d\udc37' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'en:phoneme:t',
      good: 'T', bad: ['P', 'S', 'A'] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'en:phoneme:p',
      good: 'P', bad: ['T', 'B', 'A'] },

    { act: 'blend', phase: 'decode',
      a: { l: 'A', key: 'en:phoneme:a' }, b: { l: 'T', key: 'en:phoneme:t' },
      result: 'AT', resultKey: 'en:syll:at',
      bad: ['TA', 'IT'],
      scaffold: ['en:phoneme:a', 'en:phoneme:t', 'en:syll:at'] },

    { act: 'build', phase: 'decode',
      target: 'SAT', kind: 'letters',
      bricks: ['S', 'A', 'T', 'P'],
      audioKey: 'en:word:sat',
      scaffold: ['en:phoneme:s', 'en:phoneme:a', 'en:phoneme:t', 'en:word:sat'] },

    { act: 'read-aloud', phase: 'read',
      text: 'SAT', audioKey: 'en:word:sat',
      hint: 's - a - t' },

    { act: 'build', phase: 'decode',
      target: 'TAP', kind: 'letters',
      bricks: ['T', 'A', 'P', 'S'],
      audioKey: 'en:word:tap',
      scaffold: ['en:phoneme:t', 'en:phoneme:a', 'en:phoneme:p', 'en:word:tap'] },

    { act: 'segment', phase: 'decode',
      word: 'TAP', audioKey: 'en:word:tap', n: 3 },

    { act: 'word-to-image', phase: 'understand',
      word: 'TAP', audioKey: 'en:word:tap',
      good: '\ud83d\udeb0', bad: ['\ud83d\udc31', '\ud83c\udf33'] },

    { act: 'wrap', phase: 'reward',
      learned: 'You can blend sounds into real words!' }
  ]
},

/* =========================================================
   MISSION 5 — FIRST WORDS  (introduit I, N, M + le mot outil "the")
   ========================================================= */
{
  id: 'en.m05', world: 4, n: 5,
  title: 'First words',
  subtitle: 'TIN \u00b7 MAN \u00b7 NAP',
  icon: '\ud83c\udf81',
  skill: 'en.w.cvc',
  learned: 'Reading my first real words',
  unlocksBook: 'en.b1',
  steps: [

    { act: 'discover', phase: 'discover',
      big: 'I N M', letter: true,
      title: 'Three new sounds',
      say: { text: 'ih. nnn. mmm. Now you can read many words.', lang: 'en' },
      examples: [{ t: 'INK', e: '\ud83d\udd8b\ufe0f' }, { t: 'NEST', e: '\ud83e\udeba' }, { t: 'MOON', e: '\ud83c\udf19' }] },

    { act: 'find-letter', phase: 'practice',
      phonemeKey: 'en:phoneme:n',
      good: 'N', bad: ['M', 'H', 'U'] },

    { act: 'blend', phase: 'decode',
      a: { l: 'I', key: 'en:phoneme:i' }, b: { l: 'N', key: 'en:phoneme:n' },
      result: 'IN', resultKey: 'en:syll:in',
      bad: ['NI', 'AN'],
      scaffold: ['en:phoneme:i', 'en:phoneme:n', 'en:syll:in'] },

    { act: 'build', phase: 'decode',
      target: 'TIN', kind: 'letters',
      bricks: ['T', 'I', 'N', 'S'],
      audioKey: 'en:word:tin',
      scaffold: ['en:phoneme:t', 'en:phoneme:i', 'en:phoneme:n', 'en:word:tin'] },

    { act: 'read-aloud', phase: 'read',
      text: 'TIN', audioKey: 'en:word:tin',
      hint: 't - i - n' },

    { act: 'build', phase: 'decode',
      target: 'MAN', kind: 'letters',
      bricks: ['M', 'A', 'N', 'P'],
      audioKey: 'en:word:man',
      scaffold: ['en:phoneme:m', 'en:phoneme:a', 'en:phoneme:n', 'en:word:man'] },

    { act: 'word-to-image', phase: 'understand',
      word: 'MAN', audioKey: 'en:word:man',
      good: '\ud83d\udc68', bad: ['\ud83d\udc31', '\ud83c\udf19'] },

    { act: 'tricky-word', phase: 'understand',
      word: 'THE', audioKey: 'en:word:the',
      note: 'You cannot sound this one out. Learn it by heart.',
      others: ['TIN', 'MAN'] },

    { act: 'instruction', phase: 'understand',
      say: { text: 'Tap the word TIN', lang: 'en' },
      target: 'TIN', others: ['TAP', 'MAN'] },

    { act: 'mini-story', phase: 'read',
      title: 'Sam and the tin',
      pages: [
        { text: 'Sam is a man.', e: '\ud83d\udc68' },
        { text: 'Sam sat.', e: '\ud83e\ude91' },
        { text: 'A tin!', e: '\ud83e\udd6b' },
        { text: 'Sam taps the tin.', e: '\ud83e\udd41' },
        { text: 'Sam naps in the tin.', e: '\ud83d\ude34' }
      ] },

    { act: 'wrap', phase: 'reward',
      learned: 'You read your first real English words!',
      unlocksBook: 'en.b1' }
  ]
},

/* =========================================================
   NEXT MISSIONS — announced, not playable yet
   ========================================================= */
{ id: 'en.m06', world: 4, n: 6, title: 'The sound D', subtitle: 'duh', icon: '\ud83d\udd24', locked: true, skill: 'en.g.d' },
{ id: 'en.m07', world: 4, n: 7, title: 'More CVC words', subtitle: 'MAD \u00b7 DIP \u00b7 SIT', icon: '\ud83c\udf81', locked: true, skill: 'en.w.cvcplus' },
{ id: 'en.m08', world: 5, n: 8, title: 'The sound SH', subtitle: 'shhh', icon: '\u2728', locked: true, skill: 'en.d.sh' },
{ id: 'en.m09', world: 5, n: 9, title: 'The sound CH', subtitle: 'chuh', icon: '\u2728', locked: true, skill: 'en.d.ch' },
{ id: 'en.m10', world: 5, n: 10, title: 'The sound EE', subtitle: 'eee', icon: '\u2728', locked: true, skill: 'en.d.ee' },
{ id: 'en.m11', world: 6, n: 11, title: 'Tricky words', subtitle: 'the \u00b7 was \u00b7 you', icon: '\ud83d\udddd\ufe0f', locked: true, skill: 'en.t.tricky' },
{ id: 'en.m12', world: 7, n: 12, title: 'I read a sentence', subtitle: 'The cat is big.', icon: '\ud83d\udcdd', locked: true, skill: 'en.s.sentence' },
{ id: 'en.m13', world: 9, n: 13, title: 'I understand', subtitle: 'What the story means', icon: '\ud83d\udca1', locked: true, skill: 'en.k.comprehension' },
{ id: 'en.m14', world: 10, n: 14, title: 'I read a book', subtitle: 'My real book', icon: '\ud83d\udcd6', locked: true, skill: 'en.h.book' }

];
