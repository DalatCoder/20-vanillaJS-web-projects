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
let songIndex = 1;

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

// Toggle play and pause
function toggleStatus() {
  const isPlaying = dom.musicContainer.classList.contains('play');

  if (isPlaying) {
    // If song is playing => PAUSE
    pauseSong();
  } else {
    // If song is pausing => PLAY
    playSong();
  }
}

// Pause song
function pauseSong() {
  dom.musicContainer.classList.remove('play');
  dom.playBtn.querySelector('i').classList.remove('fa-pause');
  dom.playBtn.querySelector('i').classList.add('fa-play');

  dom.audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime * 100) / duration;
  dom.progress.style.width = `${progressPercent}%`;
}

// Set progress bar value
function setProgressBar(event) {
  const progressWidth = event.target.clientWidth;
  const currentWidth = event.offsetX;
  const duration = dom.audio.duration;

  dom.audio.currentTime = (currentWidth / progressWidth) * duration;
}

// Event listeners
dom.playBtn.addEventListener('click', toggleStatus);

// Change song
dom.prevBtn.addEventListener('click', prevSong);
dom.nextBtn.addEventListener('click', nextSong);

// Time update
dom.audio.addEventListener('timeupdate', updateProgressBar);

// Song ends
dom.audio.addEventListener('ended', pauseSong);

// Click on progress bar
dom.progressContainer.addEventListener('click', setProgressBar);
