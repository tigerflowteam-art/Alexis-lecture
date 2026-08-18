/* =========================================================
   js/i18n.js — Localisation complete de l'interface enfant

   Regle (§9) : quand la journee est francaise, TOUT ce que voit
   Alexis est en francais. Quand elle est anglaise, TOUT est en
   anglais. Aucun melange, sauf dans les activites explicitement
   bilingues.

   L'espace parent reste toujours en francais : il s'adresse a
   Sophie, pas a l'enfant.
   ========================================================= */

window.App = window.App || {};

App.I18N = {

  fr: {
    /* --- Accueil --- */
    hello: 'Bonjour',
    today: 'Aujourd\'hui',
    langName: 'Fran\u00e7ais',
    todayTitle: 'On lit !',
    nextStep: 'Ma prochaine \u00e9tape',
    myBook: 'Mon livre',
    myJourney: 'Mon aventure',
    myStars: 'Mes \u00e9toiles',
    myBooks: 'Mes livres',
    home: 'Accueil',
    continue: 'Continuer',
    parentSpace: 'Espace parent',
    bookWaiting: 'Une histoire t\'attend',
    bookSoon: 'Ton premier livre, bient\u00f4t',

    /* --- Missions --- */
    mission: 'Mission',
    missionLocked: 'Pas encore ouverte',
    missionDone: 'Termin\u00e9e',
    missionNow: 'C\'est ici !',
    startMission: 'Commencer',
    replayMission: 'Refaire',
    world: 'Monde',
    missionsIn: 'missions',
    stepOf: '\u00c9tape',

    /* --- Boutons d'activite --- */
    listen: '\u00c9couter',
    listenAgain: '\u00c9couter encore',
    read: 'Lire',
    iReadIt: 'Je l\'ai lu !',
    next: 'Suivant',
    finish: 'Terminer',
    quit: 'Quitter',
    help: 'Aide',
    turnPage: 'Page suivante',
    closeBook: 'Fermer le livre',

    /* --- Consignes --- */
    q_hearSound: 'Quel son entends-tu ?',
    q_findLetter: 'Trouve la lettre qui fait ce son',
    q_whichWord: 'Dans quel mot entends-tu ce son ?',
    q_whichStarts: 'Quel mot commence par ce son ?',
    q_firstSound: 'Par quel son commence ce mot ?',
    q_sortYes: 'J\'entends le son',
    q_sortNo: 'Je n\'entends pas',
    q_sortIntro: 'Range chaque image du bon c\u00f4t\u00e9',
    q_catch: 'Touche chaque',
    q_catchIntro: 'Attrape les bonnes lettres !',
    q_memoryIntro: 'Retrouve les paires',
    q_blend: 'Colle les deux sons',
    q_blendResult: 'Qu\'est-ce que \u00e7a fait ?',
    q_build: 'Construis le mot',
    q_buildSyll: 'Construis la syllabe',
    q_segment: 'Combien de sons entends-tu ?',
    q_syllCount: 'Combien de morceaux ?',
    q_readSyll: 'Lis cette syllabe \u00e0 voix haute',
    q_readWord: 'Lis ce mot \u00e0 voix haute',
    q_wordToImage: 'Qu\'est-ce que ce mot veut dire ?',
    q_imageToWord: 'Quel mot correspond \u00e0 l\'image ?',
    q_instruction: 'Touche le mot',
    q_rhyme: 'Quel mot rime avec',
    q_story: 'Lis ton histoire',
    q_comprehension: 'As-tu bien compris ?',
    q_orderWord: 'Remets les lettres dans l\'ordre',
    q_orderSentence: 'Remets la phrase dans l\'ordre',

    /* --- Phases de mission --- */
    ph_discover: 'Je d\u00e9couvre',
    ph_practice: 'Je m\'entra\u00eene',
    ph_decode: 'Je d\u00e9code',
    ph_understand: 'Je comprends',
    ph_read: 'Je lis',
    ph_reward: 'Ma r\u00e9compense',

    /* --- Retours --- */
    fb_yes: 'Oui !',
    fb_bravo: 'Bravo !',
    fb_super: 'Superbe !',
    fb_perfect: 'Parfait !',
    fb_again: 'Essaie encore',
    fb_listen: '\u00c9coute encore une fois',
    fb_hint: 'Un indice',
    fb_slower: 'On y va doucement',

    /* --- Fin de mission --- */
    missionDoneTitle: 'Mission accomplie !',
    youLearned: 'Tu as appris',
    starsEarned: '\u00e9toiles gagn\u00e9es',
    backHome: 'Retour',
    newReward: 'Nouvelle r\u00e9compense !',
    bookUnlocked: 'Nouveau livre d\u00e9bloqu\u00e9 !',
    readItNow: 'Lis ton histoire !',
    laterBook: 'Plus tard',

    /* --- Mes etoiles --- */
    myCharacter: 'Mon personnage',
    myRewards: 'Mes r\u00e9compenses',
    myTrophies: 'Mes troph\u00e9es',
    myFinished: 'Mes livres termin\u00e9s',
    myBig: 'Mes grandes r\u00e9ussites',
    myAlbum: 'Mon album',
    albumEmpty: 'Ton album se remplira au fil de tes missions',
    locked: '\u00c0 d\u00e9bloquer',

    /* --- Livres --- */
    booksFr: 'En fran\u00e7ais',
    booksEn: 'En anglais',
    bookOpen: 'Lire',
    bookLocked: 'Termine plus de missions pour l\'ouvrir',
    bookDone: 'D\u00e9j\u00e0 lu',
    theEnd: 'Fin'
  },

  en: {
    hello: 'Hello',
    today: 'Today',
    langName: 'English',
    todayTitle: 'Let\'s read!',
    nextStep: 'My next step',
    myBook: 'My book',
    myJourney: 'My journey',
    myStars: 'My stars',
    myBooks: 'My books',
    home: 'Home',
    continue: 'Continue',
    parentSpace: 'Parents',
    bookWaiting: 'A story is waiting',
    bookSoon: 'Your first book, coming soon',

    mission: 'Mission',
    missionLocked: 'Not open yet',
    missionDone: 'Finished',
    missionNow: 'You are here!',
    startMission: 'Start',
    replayMission: 'Play again',
    world: 'World',
    missionsIn: 'missions',
    stepOf: 'Step',

    listen: 'Listen',
    listenAgain: 'Listen again',
    read: 'Read',
    iReadIt: 'I read it!',
    next: 'Next',
    finish: 'Finish',
    quit: 'Quit',
    help: 'Help',
    turnPage: 'Next page',
    closeBook: 'Close the book',

    q_hearSound: 'Which sound do you hear?',
    q_findLetter: 'Find the letter that makes this sound',
    q_whichWord: 'Which word has this sound inside?',
    q_whichStarts: 'Which word starts with this sound?',
    q_firstSound: 'Which sound does this word start with?',
    q_sortYes: 'I hear the sound',
    q_sortNo: 'I don\'t hear it',
    q_sortIntro: 'Put each picture on the right side',
    q_catch: 'Tap every',
    q_catchIntro: 'Catch the right letters!',
    q_memoryIntro: 'Find the pairs',
    q_blend: 'Push the two sounds together',
    q_blendResult: 'What does it make?',
    q_build: 'Build the word',
    q_buildSyll: 'Build the syllable',
    q_segment: 'How many sounds do you hear?',
    q_syllCount: 'How many beats?',
    q_readSyll: 'Read this out loud',
    q_readWord: 'Read this word out loud',
    q_wordToImage: 'What does this word mean?',
    q_imageToWord: 'Which word matches the picture?',
    q_instruction: 'Tap the word',
    q_rhyme: 'Which word rhymes with',
    q_story: 'Read your story',
    q_comprehension: 'Did you understand?',
    q_orderWord: 'Put the letters in order',
    q_orderSentence: 'Put the sentence in order',

    ph_discover: 'I discover',
    ph_practice: 'I practise',
    ph_decode: 'I decode',
    ph_understand: 'I understand',
    ph_read: 'I read',
    ph_reward: 'My reward',

    fb_yes: 'Yes!',
    fb_bravo: 'Well done!',
    fb_super: 'Excellent!',
    fb_perfect: 'Perfect!',
    fb_again: 'Try again',
    fb_listen: 'Listen once more',
    fb_hint: 'A hint',
    fb_slower: 'Let\'s go slowly',

    missionDoneTitle: 'Mission complete!',
    youLearned: 'You learned',
    starsEarned: 'stars earned',
    backHome: 'Back',
    newReward: 'New reward!',
    bookUnlocked: 'New book unlocked!',
    readItNow: 'Read your story!',
    laterBook: 'Later',

    myCharacter: 'My character',
    myRewards: 'My rewards',
    myTrophies: 'My trophies',
    myFinished: 'Books I finished',
    myBig: 'My big wins',
    myAlbum: 'My album',
    albumEmpty: 'Your album fills up as you finish missions',
    locked: 'To unlock',

    booksFr: 'In French',
    booksEn: 'In English',
    bookOpen: 'Read',
    bookLocked: 'Finish more missions to open it',
    bookDone: 'Already read',
    theEnd: 'The end'
  }
};

/* T('nextStep')        -> langue du jour
   T('nextStep', 'en')  -> force une langue                         */
App.T = function (key, lang) {
  var l = lang || App.State.langOfDay();
  var d = App.I18N[l] || App.I18N.fr;
  return d[key] != null ? d[key] : (App.I18N.fr[key] != null ? App.I18N.fr[key] : key);
};
