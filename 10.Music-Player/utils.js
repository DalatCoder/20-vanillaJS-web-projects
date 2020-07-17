function catchAsyncException(func) {
  return (...args) => {
    func.apply(null, args).catch((err) => {
      showError(err.message);
      if (
        document
          .getElementById('spin-load-container')
          .classList.contains('show')
      ) {
        document.getElementById('spin-load-container').classList.remove('show');
      }

      console.error(err);
      // Log error
      return;
    });
  };
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  const errorContainer = document.querySelector('.error-container');

  errorMessage.innerText = message;
  errorContainer.classList.add('show');

  setTimeout(() => {
    errorContainer.classList.remove('show');
  }, 3000);
}

function showSpinLoading() {
  document.getElementById('spin-load-container').classList.add('show');
}

function hideSpinLoading() {
  document.getElementById('spin-load-container').classList.remove('show');
}

function getSongAudioURL(id) {
  return `http://api.mp3.zing.vn/api/streaming/audio/${id}/320`;
}

function getCoverURL(coverURL) {
  return 'https://photo-resize-zmp3.zadn.vn/w480_r1x1_jpeg/' + coverURL;
}

function getQueryURL(songTitle) {
  return 'https://myownserver.glitch.me/' + songTitle;
}

function formatDuration(time) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;

  let formatted = '';

  if (mins < 10) {
    formatted += '0';
  }
  formatted += mins.toString();

  formatted += ':';

  if (secs < 10) {
    formatted += '0';
  }
  formatted += secs.toString();

  return formatted;
}

function normalizeVietnameseString(string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function showSuggestsWindow() {
  document.querySelector('.search-container').classList.add('show-suggest');
}
function hideSuggestsWindow() {
  document.querySelector('.search-container').classList.remove('show-suggest');
}
