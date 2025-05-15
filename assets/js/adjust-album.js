// location.replace(`./album.html/${localStorage.getItem("clickedAlbum")}`);
const albumImg = document.querySelector(".album-cover");
const albumName = document.querySelector(".album-name");
const albumAuthor = document.querySelector(".album-desc");
const clickedAlbum = localStorage.getItem("clickedAlbum");
console.log(clickedAlbum);
const albums = JSON.parse(localStorage.getItem("currentUser")).albumContainer;
albums.forEach((album) => {
  if (album.albumId == clickedAlbum) {
    localStorage.setItem("currentPlaylist", JSON.stringify(album.songs));
    console.log(JSON.parse(localStorage.getItem("currentPlaylist")));
    localStorage.setItem("currentPlaylist", JSON.stringify(album.songs));
    let playlistLength =
      JSON.parse(localStorage.getItem("currentPlaylist")).length || 0;
    function renderAlbum() {
      albumImg.src = `assets/images/folder-icons/${album.albumImage}.png`;
      albumName.textContent = album.albumName;
      albumAuthor.textContent = album.albumDesc;
    }
    renderAlbum();
    let numArr = [];
    for (let i = 0; i < album.songs.length; i++) {
      numArr.push(i);
      let song = album.songs[i];
      document.querySelector("ul.songs").innerHTML += `
        <li class = "${i}">
          <div class="song-info">
            <div class="btn-container">
            <img src="assets/images/play.svg" alt="" class="play-pause ${i}" />
            </div>
            <img src="${song.image}" alt="song-icon" class="song-icon" />
            <div>
              <h3 class="song-title">${song.name}</h3>
              <h4 class="song-author">${song.author}</h4>
            </div>
          </div>
          <img src="assets/images/more.svg" alt="" class="more-icon ${i}" />
        </li>`;
    }

    console.log(numArr);
    const playPause = document.querySelectorAll("li .play-pause");
    const moreIcon = document.querySelectorAll("img.more-icon");
    playPause.forEach((playBtn, index) => {
      playBtn.addEventListener("click", () => {
        localStorage.setItem("i", `${numArr[index]}`);
        function renderTime() {
          const duration = JSON.parse(localStorage.getItem("currentPlaylist"))[
            parseInt(localStorage.getItem("i"))
          ].time;
          document.querySelector(".duration").textContent = duration;
        }
        renderTime();
        seekSlider.setAttribute(
          "max",
          parseInt(duration.textContent.split(":")[0] * 60) +
            parseInt(duration.textContent.split(":")[1])
        );
        playMusic(playlistLength);
      });
    });
    moreIcon.forEach((moreBtn, index) => {
      moreBtn.addEventListener("click", (event) => {
        const menu = document.querySelector(".songs-adjust");
        let posX = event.clientX;
        let posY = event.clientY;
        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
        menu.classList.remove("hidden");
        document.querySelector("main").appendChild(menu);

        const menuRect = menu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (menuRect.right > windowWidth) {
          menu.style.left = `calc(${posX}px - ${menuRect.width}px + 5rem)`;
        }
        if (menuRect.bottom > windowHeight) {
          menu.style.top = `calc(${posY}px - ${menuRect.height}px + 10rem)`;
        }
        document
          .querySelector(".songs-adjust span.remove")
          .addEventListener("click", () => {
            menu.classList.add("hidden");
          });
        var albumLists = document.querySelector("div.playlist-list");

        document
          .querySelector("div.playlist-list span.remove")
          .addEventListener("click", () => {
            albumLists.classList.add("hidden");
          });
        console.log(albumLists);
        document.querySelectorAll(".songs-adjust button").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (btn.classList.contains("add-btn")) {
              console.log(albumLists);
              albumLists.classList.remove("hidden");
              albumLists.style.left = `calc(${posX}px - 10vw)`;
              albumLists.style.top = `${posY}px`;
              // select playlist
              const arrOfLi = [];
              document
                .querySelectorAll("ul.playlists-select li.playlist-card")
                .forEach((li) => {
                  li.addEventListener("click", () => {
                    // console.log(li);
                    arrOfLi.push(li);
                    console.log(arrOfLi);
                  });
                });
              document
                .querySelector(".cfm-btn")
                .addEventListener("click", () => {
                  console.log(arrOfLi);
                  arrOfLi.map((li) => {
                    const albums = JSON.parse(
                      localStorage.getItem("currentUser")
                    ).albumContainer;
                    albums.forEach((album) => {
                      console.log(li);
                      if (album == null) {
                        albums.shift(albums.indexOf(album), 1);
                        // console.log(albums);
                      }
                      if (album.albumId == li.getAttribute("id")) {
                        album.songs.push(song);
                        console.log(album);
                      }
                      return album;
                    });
                    // luu albumContainer vao localStorage
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify({
                        ...JSON.parse(localStorage.getItem("currentUser")),
                        albumContainer: albums,
                      })
                    );
                    console.log(
                      JSON.parse(localStorage.getItem("currentUser"))
                    );
                  });
                });
            } else if (btn.classList.contains("remove-btn")) {
              const clickedSong = album.songs[index];
              console.log(clickedSong);
              album.songs.splice(index, 1);
              albums[albums.indexOf(album)] = album;
              console.log(albums);
              localStorage.setItem(
                "currentUser",
                JSON.stringify({
                  ...JSON.parse(localStorage.getItem("currentUser")),
                  albumContainer: albums,
                })
              );
              document.querySelector("ul.songs").innerHTML = "";
              for (let i = 0; i < album.songs.length; i++) {
                numArr.push(i);
                let song = album.songs[i];
                document.querySelector("ul.songs").innerHTML += `
                <li class = "${i}">
                  <div class="song-info">
                    <div class="btn-container">
                    <img src="assets/images/play.svg" alt="" class="play-pause ${i}" />
                    </div>
                    <img src="${song.image}" alt="song-icon" class="song-icon" />
                    <div>
                      <h3 class="song-title">${song.name}</h3>
                      <h4 class="song-author">${song.author}</h4>
                    </div>
                  </div>
                  <img src="assets/images/more.svg" alt="" class="more-icon ${i}" />
                </li>`;
              }
              location.reload();
            } else if (btn.classList.contains("play-song")) {
              console.log(`play song ${song.name}`);

              currentPlaylist.push(song);
              currentPlaylist = [...new Set(currentPlaylist)];
              // currentPlaylist = [];
              const currentUser = JSON.parse(
                localStorage.getItem("currentUser")
              );
              currentUser.currentPlaylist = currentPlaylist;
              console.log(currentUser);
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
              console.log(JSON.parse(localStorage.getItem("currentUser")));
            }
          });
        });
      });
    });
    const albumPlay = document.querySelector(".album-info img.play-pause");
    albumPlay.addEventListener("click", () => {
      localStorage.setItem("i", 0);
      document.querySelector("img.play-pause").src = "assets/images/pause.svg";
      reset();
      renderTime();
      playMusic(playlistLength);
    });
  }
});
