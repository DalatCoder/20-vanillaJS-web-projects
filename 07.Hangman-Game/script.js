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

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  dom.wordEl.innerHTML = '';
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

//
function showNotification() {
  dom.notification.classList.add('show');

  setTimeout(() => {
    dom.notification.classList.remove('show');
  }, 2000);
}

// Update the wrong letters
function updateWrongLetters() {
  console.log('Update wrong');
}

displayWord();

window.addEventListener('keypress', (event) => {
  if (
    event.keyCode < 65 ||
    event.keyCode > 122 ||
    (90 < event.keyCode && event.keyCode < 97)
  ) {
    return;
  }

  const letter = event.key.toLowerCase();

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);

      updateWrongLetters();
    } else {
      showNotification();
    }
  }
});

// Close popup window
window.addEventListener('click', (event) => {
  if (event.target === dom.popup) {
    dom.popup.style.display = 'none';
  }
});
