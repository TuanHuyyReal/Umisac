const albumContainer =
  JSON.parse(localStorage.getItem("currentUser")).albumContainer || [];

const asideUl = document.querySelector("main aside.playlists-container ul");
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
function renderAlbums() {
  albumContainer.forEach((album) => {
    if (
      !(albumContainer.length == 0 || !album || album == {} || album == null)
    ) {
      if (album.albumImage && album.albumName && album.albumDesc) {
        asideUl.innerHTML += `
        <li class="playlist-card" title = "${album.albumName}" id="${album.albumId}">
          <a href ="./album.html"><img src="assets/images/folder-icons/${album.albumImage}.png" alt="${album.albumName}" class="card-image" /></a>
        </li>
        `;
      }
    }
  });
}
renderAlbums();
document
  .querySelector(`li.playlist-card#create-playlist`)
  .addEventListener("click", () => {
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
              user.email ==
              JSON.parse(localStorage.getItem("currentUser")).email
            ) {
              return JSON.parse(localStorage.getItem("currentUser"));
            } else return user;
          }
        );
        console.log(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        // console.log(JSON.parse(localStorage.getItem("currentUser")));
        const reload = setTimeout(() => {
          clearTimeout(reload);
          location.reload();
        }, 5000);
      });
  });
