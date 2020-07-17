const songTemplate = `
            <div class="song-order"><span>%song-order%</span></div>
            <div class="song-photo">
              <img
                src="%song-photo%"
                alt="%song-title% photo"
              />
            </div>
            <div class="song-info">
              <div class="title">
                <a 
                  href="javascript:;"
                  data-songID=%song-id%
                  data-songPhoto="%song-photo%"
                  data-songTitle="%song-title%"
                  data-songArtist="%song-artist%"
                  data-songDuration="%song-duration%"
                >%song-title%</a>
              </div>
              <div class="artist"><span>%song-artist%</span></div>
            </div>
            <div class="song-duration"><span>%song-duration%</span></div>
`;
