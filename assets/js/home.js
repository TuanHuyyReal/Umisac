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
      // check neu menu bi an
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
          // add to playlist
          if (btn.classList.contains("add-btn")) {
            console.log(albumLists);
            albumLists.classList.remove("hidden");
            albumLists.style.left = `calc(${posX}px + 20vw)`;
            albumLists.style.top = `${posY}px`;
            // check neu menu bi an
            const albumRect = album.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            if (albumRect.right > windowWidth) {
              album.style.left = `calc(${posX}px - ${albumRect.width}px + 5rem)`;
            }
            if (albumRect.bottom > windowHeight) {
              album.style.bottom = `calc(${posY}px - ${albumRect.height}px + 10rem)`;
            }
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
              });
            });
          } else if (btn.classList.contains("remove-btn")) {
            console.log(`remove from playlist ${song.name}`);
          } else if (btn.classList.contains("play-song")) {
            console.log(`play song ${song.name}`);
            currentPlaylist = [];
            currentPlaylist.push(song);
            currentPlaylist = [...new Set(currentPlaylist)];
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            currentUser.currentPlaylist = currentPlaylist;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            localStorage.setItem(
              "currentPlaylist",
              JSON.stringify(currentPlaylist)
            );
            console.log(JSON.parse(localStorage.getItem("currentPlaylist")));
            i = 0;
            localStorage.setItem("i", JSON.stringify(i));
            console.log(JSON.parse(localStorage.getItem("i")));
          }
        });
      });
    });
  });
})();
// console.log(JSON.parse(localStorage.getItem("currentUser")).albumContainer);
