/* =========================================================
   data/books.js — Bibliothèque progressive (§21)
   Chaque livre : langue, niveau, compétences requises, pages, questions.
   Règle §22 : l'illustration ne doit pas donner la réponse.
   -> chaque page a "reveal:true" : on lit d'abord, l'image arrive ensuite.
   ========================================================= */

window.DATA = window.DATA || {};

DATA.books = [
  /* ---------------- FRANÇAIS ---------------- */
  {
    id:'fr.b1', lang:'fr', level:1, cover:'🦙', title:'Le lama',
    need:['fr.w.cvcv'], minWorld:5,
    pages:[
      { text:'Le lama a une moto.',   img:'🦙🏍️' },
      { text:'La moto va vite.',      img:'💨' },
      { text:'Le lama est ravi.',     img:'🦙✨' }
    ],
    questions:[
      { q:'Qui a une moto ?', options:['Le lama','Le chat','Papa'], a:0 },
      { q:'Comment va la moto ?', options:['Vite','Lentement','Elle ne roule pas'], a:0 }
    ]
  },
  {
    id:'fr.b2', lang:'fr', level:2, cover:'🍅', title:'La salade de Mamie',
    need:['fr.w.long'], minWorld:5,
    pages:[
      { text:'Mamie a une tomate.',        img:'👵🍅' },
      { text:'Elle prépare une salade.',   img:'🥗' },
      { text:'Papa arrive avec du riz.',   img:'👨🍚' },
      { text:'Tout le monde se régale.',   img:'😋' }
    ],
    questions:[
      { q:'Que prépare Mamie ?', options:['Une salade','Une pizza','Un gâteau'], a:0 },
      { q:'Qui arrive avec du riz ?', options:['Papa','Le lama','Le chat'], a:0 }
    ]
  },
  {
    id:'fr.b3', lang:'fr', level:3, cover:'🐱', title:'Le chat et le ballon',
    need:['fr.c.ch','fr.c.on'], minWorld:6,
    pages:[
      { text:'Le chat voit un ballon.',        img:'🐱🎈' },
      { text:'Le ballon roule sous le lit.',   img:'🛏️' },
      { text:'Le chat cherche partout.',       img:'🔍' },
      { text:'La souris a caché le ballon !',  img:'🐭🎈' },
      { text:'Ils jouent ensemble.',           img:'🐱🐭' }
    ],
    questions:[
      { q:'Où roule le ballon ?', options:['Sous le lit','Dans le sac','Sur la table'], a:0 },
      { q:'Qui a caché le ballon ?', options:['La souris','Le chien','Mamie'], a:0 }
    ]
  },

  /* ---------------- ENGLISH ---------------- */
  {
    id:'en.b1', lang:'en', level:1, cover:'🐱', title:'Sam the Cat',
    need:['en.w.cvc'], minWorld:4,
    pages:[
      { text:'Sam is a cat.',     img:'🐱' },
      { text:'Sam sat on a mat.', img:'🐱🧶' },
      { text:'Sam is happy.',     img:'😺' }
    ],
    questions:[
      { q:'Who is Sam?', options:['A cat','A dog','A pig'], a:0 },
      { q:'Where did Sam sit?', options:['On a mat','In a cup','On a bus'], a:0 }
    ]
  },
  {
    id:'en.b2', lang:'en', level:2, cover:'🐷', title:'The Pig in the Mud',
    need:['en.w.cvcplus'], minWorld:4,
    pages:[
      { text:'A pig is in the mud.',   img:'🐷' },
      { text:'The pig has a red hat.', img:'🎩' },
      { text:'A hen sits on the pig.', img:'🐔🐷' },
      { text:'The hat is now brown!',  img:'🟤' }
    ],
    questions:[
      { q:'What is in the mud?', options:['A pig','A hen','A cat'], a:0 },
      { q:'Who sits on the pig?', options:['A hen','A dog','Sam'], a:0 }
    ]
  },
  {
    id:'en.b3', lang:'en', level:3, cover:'🚢', title:'The Ship and the Moon',
    need:['en.d.sh','en.d.oo'], minWorld:5,
    pages:[
      { text:'A ship is on the sea.',      img:'🚢' },
      { text:'I can see the moon.',        img:'🌙' },
      { text:'A big fish jumps up.',       img:'🐟' },
      { text:'The ship sails home.',       img:'⛵🏠' },
      { text:'Good night, little ship.',   img:'😴' }
    ],
    questions:[
      { q:'What is on the sea?', options:['A ship','A bus','A tree'], a:0 },
      { q:'What jumps up?', options:['A big fish','A hen','The moon'], a:0 }
    ]
  }
];
