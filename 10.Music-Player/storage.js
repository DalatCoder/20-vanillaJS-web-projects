function saveSongsToLocalStorage(songs) {
  return localStorage.setItem('songs', JSON.stringify(songs));
}

function loadSongsFromStorage() {
  return JSON.parse(localStorage.getItem('songs'));
}
