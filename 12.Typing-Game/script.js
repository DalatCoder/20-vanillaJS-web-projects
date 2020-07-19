const dom = (function() {
  const word = document.getElementById('word');
  const text = document.getElementById('text');
  const scoreEl = document.getElementById('score');
  const timeEl = document.getElementById('time');
  const endGameEl = document.getElementById('end-game');
  const settingsBtn = document.getElementById('settings-btn');
  const settings = document.getElementById('settings');
  const settingsForm = document.getElementById('settings-form');
  const difficultySelect = document.getElementById('difficulty');

  return {
    word,
    text,
    scoreEl,
    timeEl,
    endGameEl,
    settingsBtn,
    settings,
    settingsForm,
    difficultySelect
  }
})()

// List of words for game
const words = [
    'tore',
    'useful',
    'huge',
    'chivalrous',
    'cool',
    'splendid',
    'impress',
    'defiant',
    'paddle',
    'stop',
    'birthday',
    'violet'
]

// Init word
let randomWord;

// Init score 
let score = 0;

// Init time
let time = 10;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  dom.word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  dom.scoreEl.innerHTML = score;
}

addWordToDOM();

// Event listeners

dom.text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input
    e.target.value = '';
  }
})






