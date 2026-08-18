/* =========================================================
   data/books.js — Les livres

   Contrainte non negociable : le premier livre de chaque langue doit
   etre DECHIFFRABLE avec les seuls sons enseignes dans les missions 1
   a 5. Chaque texte a ete verifie mot a mot.

   FR — sons disponibles : M, A, L   (+ mots outils "le", "la")
   EN — sons disponibles : S, A, T, P, I, N, M   (+ tricky "the", "is", "a")

   Les livres suivants sont annonces mais verrouilles : ils demandent
   des sons qui viendront plus tard.
   ========================================================= */

window.DATA = window.DATA || {};

DATA.books = [

  /* ---------- FRANCAIS ---------- */
  {
    id: 'fr.b1', lang: 'fr', cover: '\ud83e\udd99',
    title: 'Mama et le lama',
    needs: 'M \u00b7 A \u00b7 L',
    pages: [
      { text: 'Mama.', e: '\ud83d\udc69' },
      { text: 'Le lama.', e: '\ud83e\udd99' },
      { text: 'Le lama a mal.', e: '\ud83d\ude23' },
      { text: 'Mama ! Mama !', e: '\ud83d\udce3' },
      { text: 'Mama a le lama.', e: '\ud83e\udd17' },
      { text: 'La la la !', e: '\ud83c\udfb5' }
    ],
    q: {
      ask: 'Qui aide le lama ?',
      good: 'Mama',
      bad: ['Le lama', 'La moto']
    }
  },

  {
    id: 'fr.b2', lang: 'fr', cover: '\ud83c\udf45',
    title: 'La tomate de Lila',
    needs: 'M \u00b7 A \u00b7 L \u00b7 I \u00b7 T \u00b7 O',
    locked: true,
    pages: [
      { text: 'Lila a une tomate.', e: '\ud83c\udf45' },
      { text: 'La tomate est molle.', e: '\ud83d\ude15' },
      { text: 'Lila a mal !', e: '\ud83d\ude16' },
      { text: 'Mama a la salade.', e: '\ud83e\udd57' }
    ]
  },

  {
    id: 'fr.b3', lang: 'fr', cover: '\ud83d\udc31',
    title: 'Le chat et le ballon',
    needs: 'CH \u00b7 ON \u00b7 OU',
    locked: true,
    pages: [
      { text: 'Le chat a un ballon.', e: '\ud83d\udc31' },
      { text: 'Le ballon roule.', e: '\ud83c\udf88' },
      { text: 'Le chat court.', e: '\ud83c\udfc3' },
      { text: 'Le ballon tombe dans l\'eau.', e: '\ud83d\udca6' },
      { text: 'Le chat est tout mouill\u00e9 !', e: '\ud83d\ude39' }
    ]
  },

  /* ---------- ENGLISH ---------- */
  {
    id: 'en.b1', lang: 'en', cover: '\ud83d\udc68',
    title: 'Sam in the pit',
    needs: 'S \u00b7 A \u00b7 T \u00b7 P \u00b7 I \u00b7 N \u00b7 M',
    pages: [
      { text: 'Sam is a man.', e: '\ud83d\udc68' },
      { text: 'Sam sat in a pit.', e: '\ud83d\udd73\ufe0f' },
      { text: 'Sam taps a tin.', e: '\ud83e\udd6b' },
      { text: 'Tap, tap, tap!', e: '\ud83d\udd28' },
      { text: 'A map!', e: '\ud83d\uddfa\ufe0f' },
      { text: 'Sam naps in the pit.', e: '\ud83d\ude34' }
    ],
    q: {
      ask: 'What did Sam find?',
      good: 'A map',
      bad: ['A cat', 'A pin']
    }
  },

  {
    id: 'en.b2', lang: 'en', cover: '\ud83d\udc37',
    title: 'The pig in the mud',
    needs: 'D \u00b7 G \u00b7 U',
    locked: true,
    pages: [
      { text: 'A pig sits in the mud.', e: '\ud83d\udc37' },
      { text: 'The pig digs and digs.', e: '\u26cf\ufe0f' },
      { text: 'The pig is a big mess!', e: '\ud83d\udca6' },
      { text: 'The pig naps in the sun.', e: '\u2600\ufe0f' }
    ]
  },

  {
    id: 'en.b3', lang: 'en', cover: '\ud83d\udea2',
    title: 'The ship and the moon',
    needs: 'SH \u00b7 OO \u00b7 EE',
    locked: true,
    pages: [
      { text: 'A ship sails at night.', e: '\ud83d\udea2' },
      { text: 'The moon is big and bright.', e: '\ud83c\udf19' },
      { text: 'The ship sees a shell.', e: '\ud83d\udc1a' },
      { text: 'The shell keeps the moonlight.', e: '\u2728' },
      { text: 'Sleep well, little ship.', e: '\ud83d\ude34' }
    ]
  }
];
