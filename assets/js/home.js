import { UMISAC_API } from "./config.js";
const playlistContainer = document.querySelector("ul.playlists");
const homeContent = document.querySelector(".content");
const homeMusicDisplay = document.querySelector(".music-display");
const homePlayer = document.querySelector(".player");
const playlists = [];
let currentPlaylist =
  JSON.parse(localStorage.getItem("currentUser")).currentPlaylist || [];
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
            albumLists.style.left = `calc(${posX}px + 20vw)`;
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

            // console.log(currentPlaylist);
            // console.log(currentPlaylist);
            currentPlaylist.push(song);
            currentPlaylist = [...new Set(currentPlaylist)];
            // currentPlaylist = [];
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            currentUser.currentPlaylist = currentPlaylist;
            console.log(currentUser);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            console.log(JSON.parse(localStorage.getItem("currentUser")));
          }
        });
      });
    });
  });
})();
// console.log(JSON.parse(localStorage.getItem("currentUser")).albumContainer);
const albumContainer =
  JSON.parse(localStorage.getItem("currentUser")).albumContainer || [];
if (albumContainer.length !== 0) {
  albumContainer.forEach((album) => {
    if (album == null) {
      albumContainer.shift(albumContainer.indexOf(album), 1);
      console.log(albumContainer);
    }
  });
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("currentUser")),
      albumContainer: albumContainer,
    })
  );
}
albumContainer.forEach((array) => {
  if (Array.isArray(array)) {
    array.forEach((album) => {
      if (Array.isArray(album)) {
        albumContainer.push(album);
      } else albumContainer.push(album);
    });
    albumContainer.shift(albumContainer.indexOf(array), 1);
  }
});
const asideUl = document.querySelector("main aside.playlists-container ul");
function renderAlbums() {
  albumContainer.forEach((album) => {
    if (
      !(albumContainer.length == 0 || !album || album == {} || album == null)
    ) {
      if (album.albumImage && album.albumName && album.albumDesc) {
        asideUl.innerHTML += `
        <li class="playlist-card" title = "${album.albumName}" id="${album.albumId}">
          <img src="assets/images/folder-icons/${album.albumImage}.png" alt="${album.albumName}" class="card-image" />
        </li>
        `;
        document.querySelector("ul.playlists-select").innerHTML += `
        <li class="playlist-card" title = "${album.albumName}" id = "${album.albumId}">
          <img src="assets/images/folder-icons/${album.albumImage}.png" alt="${album.albumName}" class="card-image" />
          <h2 class = "playlist-name">${album.albumName}</h2>

          </li>
        `;
      }
    }
  });
}
renderAlbums();
document.querySelector(`li.playlist-card`).addEventListener("click", () => {
  document.querySelector(".playlist-form").classList.remove("hidden");
  document.querySelector("form span.remove").addEventListener("click", () => {
    document.querySelector(".playlist-form").classList.add("hidden");
  });
  let boxes = document.querySelectorAll("input[type=checkbox]");
  boxes.forEach((b) => b.addEventListener("change", tick));
  function tick(e) {
    let state = e.target.checked; // save state of changed checkbox
    boxes.forEach((b) => (b.checked = false)); // clear all checkboxes
    e.target.checked = state; // restore state of changed checkbox
  }

  document
    .querySelector("button.playlist-sbm-btn")
    .addEventListener("click", () => {
      document.querySelector(".playlist-form").classList.add("hidden");
      let album = {
        albumImage: document.querySelector(`input[type="checkbox"]:checked`)
          .value,
        albumName: document.querySelector("#playlist-name-input").value,
        albumDesc: document.querySelector("#playlist-desc-input").value,
        albumId: Math.random().toString(16).slice(2),
        songs: [],
      };
      albumContainer.push(album);
      let currentUser = {
        username: JSON.parse(localStorage.getItem("currentUser")).username,
        email: JSON.parse(localStorage.getItem("currentUser")).email,
        password: JSON.parse(localStorage.getItem("currentUser")).password,
        albumContainer: albumContainer,
      };
      console.log(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      const updatedUsers = JSON.parse(localStorage.getItem("users")).map(
        (user) => {
          if (
            user.email == JSON.parse(localStorage.getItem("currentUser")).email
          ) {
            return JSON.parse(localStorage.getItem("currentUser"));
          } else return user;
        }
      );
      console.log(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      // console.log(JSON.parse(localStorage.getItem("currentUser")));
      const reload = setInterval(5000, () => {
        clearInterval(reload);
        location.reload();
      });
    });
});
