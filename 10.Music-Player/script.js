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

const form = document.getElementById('form');
const search = document.getElementById('search');
const listSong = document.getElementById('list');

const songs = loadSongsFromStorage() || [];

// Keep track of song
let songIndex;

/*
if (songs.length > 0) {
  // let songIndex = Math.floor(Math.random() * songs.length);
  // Initially load song detail into DOM
  // loadSong(songs[songIndex]);
}
*/

// Update song details
function loadSong(song) {
  dom.title.innerText = song;
  dom.audio.src = getSongAudioURL(song.id);
  dom.cover.src = song.cover;
}

let songOrder = 1;
// Init song order

// Init
(function Init() {
  for (const song of songs) {
    song.order = songOrder++;
    listSong.appendChild(createSongItemDOM(song));
  }
})();

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

/////////////////////////////////////////////////////////////////
//                        AJAX
/////////////////////////////////////////////////////////////////
async function fetchSong(songTitle) {
  const raw = await fetch(getQueryURL(songTitle));
  const response = await raw.json();

  const songs = response.data;

  if (!songs) {
    throw new Error('Không tìm thấy bài hát!');
  }

  const firstSong = songs[0];

  return {
    artist: firstSong.artist,
    duration: firstSong.duration,
    id: firstSong.id,
    title: firstSong.name,
    cover: firstSong.thumb,
    order: songOrder++,
  };
}

function createSongItemDOM(song) {
  const item = document.createElement('li');
  item.classList.add('song');
  item.addEventListener('click', onSongClick);

  item.innerHTML = songTemplate
    .replace(/%song-order%/g, song.order)
    .replace(/%song-photo%/g, getCoverURL(song.cover))
    .replace(/%song-title%/g, song.title)
    .replace(/%song-artist%/g, song.artist)
    .replace(/%song-duration%/g, formatDuration(song.duration))
    .replace(/%song-id%/g, song.id);

  return item;
}

async function onSearchRequest(event) {
  showSpinLoading();

  event.preventDefault();

  const { value } = search;
  const songTitle = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

  const song = await fetchSong(songTitle);

  if (!song) {
    throw new Error('Không tìm thấy bài hát!');
  }

  if (!songs.find((el) => el.id === song.id)) {
    songs.push(song);
  }

  hideSpinLoading();

  dom.audio.src = getSongAudioURL(song.id);
  dom.title.innerText = song.title;
  dom.cover.src = getCoverURL(song.cover);
  playSong();

  const item = createSongItemDOM(song);
  listSong.appendChild(item);

  search.value = '';

  // Save to localstorage
  saveSongsToLocalStorage(songs);
}

form.addEventListener('submit', catchAsyncException(onSearchRequest));

function onSongClick(event) {
  const { songid, songphoto, songtitle } = event.target.dataset;

  dom.audio.src = getSongAudioURL(songid);
  dom.cover.src = songphoto;
  dom.title.innerText = songtitle;

  playSong();
}
