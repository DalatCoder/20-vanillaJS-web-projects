const dom = (function() {
  const word = document.getElementById('word');
  const text = document.getElementById('text');
  const scoreEl = document.getElementById('score');
  const timeEl = document.getElementById('time');
  const endGameEl = document.getElementById('end-game-container');
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

// Focus on text on start
dom.text.focus();

// Start counting down
let timeInterval = setInterval(updateTime, 1000);

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

function updateTime() {
  time--;
  dom.timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    
    // End game 
    gameOver();
  }
}

function gameOver() {
  dom.endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="window.location.reload()">Reload</button>
  ` 

  dom.endGameEl.style.display = 'flex';
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

    time += 5;
  }
})






