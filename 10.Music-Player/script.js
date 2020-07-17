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

  const form = document.getElementById('form');
  const search = document.getElementById('search');
  const searchContainer = document.querySelector('.search-container');
  const listSong = document.getElementById('list');

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
    form,
    search,
    listSong,
    searchContainer,
  };
})();

let songs;

// Keep track of song is playing
let songIndex;

// Display song order in DOM
let songOrder = 1;

// Update song details
function loadSong(song) {
  dom.audio.src = getSongAudioURL(song.id);
  dom.title.innerText = song.title;
  dom.cover.src = song.cover;
}

// Load default song
function loadDefaultSong() {
  dom.audio.src = 'music/ukulele.mp3';
  dom.cover.src = 'images/ukulele.jpg';
  dom.title.innerText = 'Ukulele';
}

// Init
function Init() {
  // https://stackoverflow.com/questions/8469145/how-to-detect-html5-audio-mp3-support
  var a = document.createElement('audio');
  if (
    Boolean(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, '')) ===
    false
  ) {
    document.body.innerHTML = 'Trình duyệt không hỗ trợ phát âm thanh!';
    showError('Trình duyệt không hỗ trợ phát âm thanh!');
    return;
  }

  songs = loadSongsFromStorage() || [];
  songIndex = 0;
  if (songs.length > 0) {
    songIndex = songs.length - 1;
  }

  for (const song of songs) {
    song.order = songOrder++;
    dom.listSong.appendChild(createSongItemDOM(song));
  }
}
Init();

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

  const song = songs[songIndex];
  if (song) {
    loadSong(song);
    playSong();
    return;
  }

  loadDefaultSong();
  playSong();
  showError('Không có bài hát nào trong danh sách!');
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  const song = songs[songIndex];
  if (song) {
    loadSong(song);
    playSong();
    return;
  }

  loadDefaultSong();
  playSong();
  showError('Không có bài hát nào trong danh sách!');
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

// Hide sugguest window
window.addEventListener('click', (event) => {
  if (!dom.searchContainer.contains(event.target)) {
    hideSuggestsWindow();
  }
});

dom.search.addEventListener('focus', showSuggestsWindow);

/////////////////////////////////////////////////////////////////
//                        AJAX
/////////////////////////////////////////////////////////////////

dom.form.addEventListener('submit', catchAsyncException(onSearchRequest));

dom.search.addEventListener(
  'input',
  catchAsyncException(debounce(onSearchRequest))
);

async function fetchSongs(songTitle) {
  const raw = await fetch(getQueryURL(songTitle));
  const response = await raw.json();

  const songs = response.data;

  if (!songs || songs.length === 0) {
    throw new Error('Không tìm thấy bài hát!');
  }

  return songs;
}

function createSongItemDOM(song) {
  const item = document.createElement('li');
  item.classList.add('song');
  item.addEventListener('click', onSongClick);

  item.innerHTML = songTemplate
    .replace(/%song-order%/g, song.order)
    .replace(/%song-photo%/g, song.cover)
    .replace(/%song-title%/g, song.title)
    .replace(/%song-artist%/g, song.artist)
    .replace(/%song-duration%/g, song.duration)
    .replace(/%song-id%/g, song.id);

  return item;
}

async function onSearchRequest(event) {
  showSpinLoading();

  event.preventDefault();

  const songTitle = normalizeVietnameseString(dom.search.value);

  const songs = await fetchSongs(songTitle);
  console.log(songs);

  hideSpinLoading();

  showSuggest(songs);
}

function onSongClick(event) {
  if (event.target.tagName !== 'A') {
    return;
  }

  const { songid } = event.target.dataset;

  const song = songs.find((song) => song.id === songid);

  loadSong(song);
  playSong();
}

function showSuggest(songs) {
  showSuggestsWindow();
  const list = document.createElement('ul');

  // Get first 5 songs
  for (let i = 0; i < 5; i++) {
    const song = songs[i];

    if (!song) {
      break;
    }

    const item = document.createElement('li');
    item.classList.add('song');
    item.innerHTML = songTemplate
      .replace(/%song-photo%/g, getCoverURL(song.thumb))
      .replace(/%song-title%/g, song.name)
      .replace(/%song-artist%/g, song.artist)
      .replace(/%song-duration%/g, formatDuration(song.duration))
      .replace(/%song-id%/g, song.id)
      .replace(/%song-artist%/g, song.artist)
      .replace(/%song-duration%/g, song.duration)
      .replace('<div class="song-order"><span>%song-order%</span></div>', '');

    item.addEventListener('click', onSuggestClick);
    list.appendChild(item);
  }

  document.getElementById('suggest').innerHTML = '';
  document.getElementById('suggest').appendChild(list);
}

async function onSuggestClick(event) {
  if (event.target.tagName !== 'A') {
    return;
  }

  hideSuggestsWindow();
  const {
    songid,
    songphoto,
    songtitle,
    songartist,
    songduration,
  } = event.target.dataset;

  const song = {
    id: songid,
    cover: songphoto,
    title: songtitle,
    artist: songartist,
    duration: songduration,
  };

  loadSong(song);
  playSong();

  const alreadySong = songs.find((s) => s.id === songid);
  if (!alreadySong) {
    songs.push(song);
    saveSongsToLocalStorage(songs);

    // Load UI
    dom.listSong.innerHTML = '';
    Init();
  }

  // Clear search term
  dom.search.value = '';
}
