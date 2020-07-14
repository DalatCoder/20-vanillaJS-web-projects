const dom = (function () {
  const wordEl = document.getElementById('word');
  const wrongLettersEl = document.getElementById('wrong-letters');
  const playAgainBtn = document.getElementById('play-button');
  const popup = document.getElementById('popup-container');
  const notification = document.getElementById('notification-container');
  const finalMessage = document.getElementById('final-message');
  const figureParts = [...document.querySelectorAll('.figure-part')];

  return {
    wordEl,
    wrongLettersEl,
    playAgainBtn,
    popup,
    notification,
    finalMessage,
    figureParts,
  };
})();

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  const letters = selectedWord.split('');

  for (const letter of letters) {
    const span = document.createElement('span');
    span.classList.add('letter');
    span.innerText = '';

    if (correctLetters.includes(letter)) {
      span.innerText = letter;
    }

    dom.wordEl.appendChild(span);
  }

  // Remove newline characters
  const innerWord = dom.wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    dom.finalMessage.innerText = 'Congratulations! You won! 👌';
    dom.popup.style.display = 'flex';
  }
}

displayWord();

// Close popup window
window.addEventListener('click', (event) => {
  if (event.target === dom.popup) {
    dom.popup.style.display = 'none';
  }
});
