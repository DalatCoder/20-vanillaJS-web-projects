const dom = (function () {
  const musicContainer = document.getElementById('music-container');

  const prevBtn = document.getElementById('prev');
  const playBtn = document.getElementById('play');
  const nextBtn = document.getElementById('next');

  const audio = document.getElementById('audio');
  const progress = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const title = document.getElementById('title');
  const cover = document.getElementById('cover');

  return {
    musicContainer,
    prevBtn,
    playBtn,
    nextBtn,
    audio,
    progress,
    progressContainer,
    title,
    cover,
  };
})();

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song detail into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  dom.title.innerText = song;
  dom.audio.setAttribute('src', `music/${song}.mp3`);
  dom.cover.setAttribute('src', `images/${song}.jpg`);
}

// Play song
function playSong() {
  dom.musicContainer.classList.add('play');
  dom.playBtn.querySelector('i').classList.remove('fa-play');
  dom.playBtn.querySelector('i').classList.add('fa-pause');

  dom.audio.play();
}

// Pause song
function pauseSong() {
  dom.musicContainer.classList.remove('play');
  dom.playBtn.querySelector('i').classList.remove('fa-pause');
  dom.playBtn.querySelector('i').classList.add('fa-play');

  dom.audio.pause();
}

// Event listeners
dom.playBtn.addEventListener('click', () => {
  const isPlaying = dom.musicContainer.classList.contains('play');

  if (isPlaying) {
    // If song is playing => PAUSE
    pauseSong();
  } else {
    // If song is pausing => PLAY
    playSong();
  }
});
