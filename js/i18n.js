/* =========================================================
   js/i18n.js — Textes de l'interface enfant.
   Pendant une séance anglaise, l'enfant est en anglais : consignes comprises.
   L'espace parent, lui, reste en français.
   ========================================================= */

window.App = window.App || {};

App.T = (function () {
  var S = {
    fr: {
      hello: 'Bonjour', today: "Aujourd'hui", readFr: 'On lit en français !', readEn: 'On lit en anglais !',
      go: 'Continuer', nextStep: 'Ma prochaine étape', myBook: 'Mon livre',
      bookWaiting: 'Une nouvelle histoire t\'attend',
      tabHome: 'Accueil', tabMap: 'Mon aventure', tabBooks: 'Mes livres', tabRewards: 'Mes étoiles',
      listen: 'Écoute', tapToHear: 'Appuie pour écouter', again: 'Réécouter',
      q_soundToLetter: 'Quel son entends-tu ?',
      q_letterToSound: 'Quel son fait cette lettre ?',
      q_soundToImage: 'Quel mot commence par ce son ?',
      q_soundInside: 'Dans quel mot entends-tu ce son ?',
      q_firstSound: 'Quel est le premier son ?',
      q_blendOral: 'Devine le mot',
      q_blend: 'Regarde les sons se coller',
      q_blendPick: 'Qu\'est-ce que ça fait ?',
      q_syllableRead: 'Trouve la syllabe que tu entends',
      q_segment: 'Combien de sons dans ce mot ?',
      q_builder: 'Construis le mot',
      q_order: 'Remets les lettres dans l\'ordre',
      q_wordToImage: 'Lis le mot, puis choisis l\'image',
      q_imageToWord: 'Quel mot correspond à l\'image ?',
      q_syllableCount: 'Combien de syllabes ?',
      q_rhyme: 'Quel mot rime avec',
      q_tricky: 'Trouve le petit mot que tu entends',
      q_sentenceRead: 'Lis la phrase',
      q_sentenceOrder: 'Remets la phrase dans l\'ordre',
      q_comprehension: 'Réponds à la question',
      q_bilingual: 'Écoute les deux mots',
      same: 'Pareil', different: 'Différent',
      iReadIt: 'J\'ai lu !', tapWords: 'Appuie sur chaque mot',
      newSound: 'Un nouveau son', discover: 'Découvre',
      itSays: 'Il fait', gotIt: 'J\'ai compris',
      done: 'Déjà fini !', starsWon: 'étoiles gagnées',
      backHome: 'Retour', keepGoing: 'Continuer',
      lockedBook: 'Bientôt disponible', read: 'Lire',
      pageOf: 'Page', of: 'sur', nextPage: 'Page suivante', finishBook: 'J\'ai fini le livre',
      myCharacter: 'Mon personnage', myBadges: 'Mes trophées', locked: 'À débloquer',
      stars: 'étoiles', sounds: 'sons', books: 'livres',
      parentSpace: 'Espace parent',
      chooseAvatar: 'Choisis ton compagnon', chooseAcc: 'Tes accessoires'
    },
    en: {
      hello: 'Hello', today: 'Today', readFr: "Let's read in French!", readEn: "Let's read!",
      go: 'Continue', nextStep: 'My next step', myBook: 'My book',
      bookWaiting: 'A new story is waiting',
      tabHome: 'Home', tabMap: 'My journey', tabBooks: 'My books', tabRewards: 'My stars',
      listen: 'Listen', tapToHear: 'Tap to listen', again: 'Listen again',
      q_soundToLetter: 'Which sound do you hear?',
      q_letterToSound: 'What sound does this letter make?',
      q_soundToImage: 'Which word starts with this sound?',
      q_soundInside: 'Which word has this sound inside?',
      q_firstSound: 'What is the first sound?',
      q_blendOral: 'Guess the word',
      q_blend: 'Watch the sounds join up',
      q_blendPick: 'What does it say?',
      q_syllableRead: 'Find the one you hear',
      q_segment: 'How many sounds in this word?',
      q_builder: 'Build the word',
      q_order: 'Put the letters in order',
      q_wordToImage: 'Read the word, then pick the picture',
      q_imageToWord: 'Which word matches the picture?',
      q_syllableCount: 'How many beats?',
      q_rhyme: 'Which word rhymes with',
      q_tricky: 'Find the word you hear',
      q_sentenceRead: 'Read the sentence',
      q_sentenceOrder: 'Put the sentence in order',
      q_comprehension: 'Answer the question',
      q_bilingual: 'Listen to both words',
      same: 'Same', different: 'Different',
      iReadIt: 'I read it!', tapWords: 'Tap each word',
      newSound: 'A new sound', discover: 'Discover',
      itSays: 'It says', gotIt: 'Got it',
      done: 'All done!', starsWon: 'stars earned',
      backHome: 'Back', keepGoing: 'Keep going',
      lockedBook: 'Coming soon', read: 'Read',
      pageOf: 'Page', of: 'of', nextPage: 'Next page', finishBook: 'I finished the book',
      myCharacter: 'My character', myBadges: 'My trophies', locked: 'Locked',
      stars: 'stars', sounds: 'sounds', books: 'books',
      parentSpace: 'Parent space',
      chooseAvatar: 'Choose your buddy', chooseAcc: 'Your accessories'
    }
  };
  return function (lang, key) {
    return (S[lang] && S[lang][key]) || S.fr[key] || key;
  };
})();
