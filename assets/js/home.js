import { UMISAC_API } from "./config.js";
const playlistContainer = document.querySelector("ul.playlists");
const homeContent = document.querySelector(".content");
const homeMusicDisplay = document.querySelector(".music-display");
const homePlayer = document.querySelector(".player");
const playlists = [];
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
  });
})();
// console.log(JSON.parse(localStorage.getItem("currentUser")).albumContainer);
const albumContainer =
  JSON.parse(localStorage.getItem("currentUser")).albumContainer || [];
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
        <li class="playlist-card" title = "${album.albumName}">
          <img src="assets/images/folder-icons/${album.albumImage}.png" alt="${album.albumName}" class="card-image" />
        </li>
        `;
      }
    }
  });
}
renderAlbums();
document.querySelector(`li.playlist-card`).addEventListener("click", () => {
  document.querySelector(".playlist-form").classList.remove("hidden");
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

(async function playMusic() {
  // const albumContainer = document.querySelector("ul.playlists");
  playlists.forEach((playlist) => {});
});
