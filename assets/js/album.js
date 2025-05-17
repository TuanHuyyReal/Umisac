const albums = JSON.parse(localStorage.getItem("currentUser")).albumContainer;
const playlistsCards = document.querySelectorAll(
  "ul.playlists li.playlist-card"
);

playlistsCards.forEach((card) => {
  if (card.getAttribute("id") !== "create-playlist") {
    var moreBtn = card.querySelector("button.more");
    card.addEventListener("click", () => {
      localStorage.setItem("clickedAlbum", card.getAttribute("id"));
      window.location.href = `./album.html`;
    });
  } else {
    card.addEventListener("click", () => {
      document.querySelector(".playlist-form").classList.remove("hidden");
      document
        .querySelector("form span.remove")
        .addEventListener("click", () => {
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
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          const reload = setTimeout(() => {
            clearTimeout(reload);
            location.reload();
          }, 5000);
        });
    });
  }
});
