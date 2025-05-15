import { UMISAC_API } from "./config.js";
// const playlistContainer = document.querySelector("ul.playlists");
const homeContent = document.querySelector(".content");

let currentPlaylist = JSON.parse(localStorage.getItem("currentPlaylist")) || [];
(async () => {
  const response = await fetch(UMISAC_API);
  const songData = await response.json();

  songData.forEach((song) => {
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");
    songCard.innerHTML = `
    <img src="${song.image}" alt="${song.name}" class="card-image" />
    <h3 class="card-name">${song.name}</h3>
    <p class="card-artist">${song.author}</p>
    `;
    homeContent.appendChild(songCard);
    songCard.addEventListener("click", (event) => {
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
      document.querySelectorAll(".songs-adjust button").forEach((btn) => {
        btn.addEventListener("click", () => {
          // add to playlist
          if (btn.classList.contains("add-btn")) {
            document.querySelector("ul.playlists-select").innerHTML = "";
            function renderAbLists() {
              albumContainer.forEach((album) => {
                if (
                  !(
                    albumContainer.length == 0 ||
                    !album ||
                    album == {} ||
                    album == null
                  )
                ) {
                  if (album.albumImage && album.albumName && album.albumDesc) {
                    document.querySelector("ul.playlists-select").innerHTML += `
                    <li class="playlist-card" title = "${album.albumName}" id = "${album.albumId}">
                      <img src="assets/images/folder-icons/${album.albumImage}.png" alt="${album.albumName}" class="card-image" />
                      <h2 class = "playlist-name">${album.albumName}</h2>
                      <input type="checkbox" class="checkbox" name = "li-check"/>
                    </li>
                    `;
                  }
                }
              });
            }
            renderAbLists();
            console.log(albumLists);
            albumLists.classList.remove("hidden");
            albumLists.style.left = `calc(${posX}px + 20vw)`;
            albumLists.style.top = `${posY}px`;
            // check neu menu bi an
            const albumRect = albumLists.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            if (albumRect.right > windowWidth) {
              albumLists.style.right = `calc(${posX}px - ${albumRect.width}px - 10vw)`;
            }
            if (albumRect.bottom > windowHeight) {
              albumLists.style.top = `calc(${posY}px - ${albumRect.height}px + 10rem)`;
            }
            // select playlist
            const arrOfLi = [];
            document
              .querySelectorAll("ul.playlists-select li.playlist-card")
              .forEach((li) => {
                const checkbox = li.querySelector('input[type="checkbox"]');
                li.addEventListener("click", () => {
                  checkbox.checked = !checkbox.checked;
                  if (!arrOfLi.includes(li)) {
                    arrOfLi.push(li);
                  } else arrOfLi.splice(arrOfLi.indexOf(li), 1);
                  console.log(arrOfLi);
                });
              });
            document.querySelector(".cfm-btn").addEventListener("click", () => {
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
                console.log(JSON.parse(localStorage.getItem("currentUser")));
                menu.classList.add("hidden");
                albumLists.classList.add("hidden");
              });
            });
          } else if (btn.classList.contains("remove-btn")) {
            const playlistSelect = document.querySelector(
              "ul.playlists-select"
            );
            playlistSelect.innerHTML = "";
            const albums = JSON.parse(
              localStorage.getItem("currentUser")
            ).albumContainer;

            let arr = [];
            albums.forEach((album) => {
              album["songs"].forEach((abSong) => {
                // tìm album có chứa song dc chọn
                if (abSong.name == song.name && !arr.includes(album)) {
                  arr.push(album);
                  console.log(album);
                  console.log(
                    `remove song ${song.name} from album ${album.albumName}`
                  );
                  playlistSelect.innerHTML += `
                  <li class="playlist-card" id="${album.albumId}">
                    <img src="assets/images/folder-icons/${album.albumImage}.png" alt="playlist-icon" class="playlist-icon" />
                    <h3 class="playlist-name">${album.albumName}</h3>
                    <input type="checkbox" class="checkbox" name = "li-check"/>
                  </li>
                  `;
                }
              });
            });
            const playlistList = document.querySelector(".playlist-list");
            playlistList.querySelector(".cfm-btn").textContent = "REMOVE!";
            playlistList.classList.remove("hidden");
            playlistList.style.left = `calc(${posX}px + 15vw)`;
            playlistList.style.top = `${posY}px`;
            console.log(playlistList);
            // check neu menu bi an
            const plListRect = playlistList.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            if (plListRect.right > windowWidth) {
              playlistList.style.left = `calc(${posX}px - ${plListRect.width}px - 10vw)`;
            }
            if (plListRect.bottom > windowHeight) {
              playlistList.style.top = `calc(${posY}px - ${plListRect.height}px + 10rem)`;
            }

            let arrOfLi = [];
            document
              .querySelectorAll("ul.playlists-select li.playlist-card")
              .forEach((li) => {
                const checkbox = li.querySelector(".checkbox");
                li.addEventListener("click", () => {
                  checkbox.checked = !checkbox.checked;
                  if (!arrOfLi.includes(li)) {
                    arrOfLi.push(li);
                  } else arrOfLi.splice(arrOfLi.indexOf(li), 1);
                  console.log(arrOfLi);
                });
              });
            document.querySelector(".cfm-btn").addEventListener("click", () => {
              arrOfLi.forEach((li) => {
                const albums = JSON.parse(
                  localStorage.getItem("currentUser")
                ).albumContainer;
                albums.forEach((album) => {
                  if (album.albumId == li.getAttribute("id")) {
                    const songs = album.songs;
                    console.log(songs, song);
                    songs.forEach((abSong) => {
                      if (abSong.name == song.name) {
                        songs.splice(songs.indexOf(abSong), 1);
                        console.log(songs);
                        localStorage.setItem(
                          "currentUser",
                          JSON.stringify({
                            ...JSON.parse(localStorage.getItem("currentUser")),
                            albumContainer: albums,
                          })
                        );
                      }
                    });
                  }
                });
              });
              menu.classList.add("hidden");
              playlistList.classList.add("hidden");
            });
          } else if (btn.classList.contains("play-song")) {
            // play btn
            console.log(`play song ${song.name}`);
            currentPlaylist = [];
            currentPlaylist.push(song);
            localStorage.setItem(
              "currentPlaylist",
              JSON.stringify(currentPlaylist)
            );
            console.log(JSON.parse(localStorage.getItem("currentPlaylist")));
            i = 0;
            localStorage.setItem("i", JSON.stringify(i));
            reset();
            renderTime();
            playMusic(
              JSON.parse(localStorage.getItem("currentPlaylist")).length
            );
          }
        });
      });
    });
  });
})();
// console.log(JSON.parse(localStorage.getItem("currentUser")).albumContainer);
const notice = document.querySelector(".notice");
const remove = notice.querySelectorAll(".remove");
remove.forEach((r) =>
  r.addEventListener("click", () => {
    notice.classList.add("hidden");
  })
);
