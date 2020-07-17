function catchAsyncException(func) {
  return (...args) => {
    func.apply(null, args).catch((err) => {
      alert(err.message);
      if (
        document
          .getElementById('spin-load-container')
          .classList.contains('show')
      ) {
        document.getElementById('spin-load-container').classList.remove('show');
      }

      console.error(err);
      return;
    });
  };
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
