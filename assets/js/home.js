import { UMISAC_API } from "./config.js";
const playlistContainer = document.querySelector("ul.playlists");
const homeContent = document.querySelector(".content");
const homeMusicDisplay = document.querySelector(".music-display");
const homePlayer = document.querySelector(".player");
const playlists = [];
// console.log(JSON.parse(sessionStorage.getItem(albumContainer)));
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
const asideUl = document.querySelector("main aside.playlists-container ul");
JSON.parse(sessionStorage.getItem("albumContainer")).forEach((album) => {
  // const albumCard = document.createElement("div");
  asideUl.innerHTML += `
    <li class="playlist-card" title = "${album.albumName}">
      <img src="assets/images/folder-icons/${album.albumImage}.png" alt="${album.albumName}" class="card-image" />

    </li>
    `;
});
const albumContainer = sessionStorage.getItem("albumContainer")
  ? JSON.parse(sessionStorage.getItem("albumContainer"))
  : [];
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
      sessionStorage.setItem("albumContainer", JSON.stringify(albumContainer));
      console.log(JSON.parse(sessionStorage.getItem("albumContainer")));
      location.href = "./index.html";
    });
});

(async function playMusic() {
  // const albumContainer = document.querySelector("ul.playlists");
  playlists.forEach((playlist) => {});
});
