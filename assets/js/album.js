const albums = JSON.parse(localStorage.getItem("currentUser")).albumContainer;
const playlistsCards = document.querySelectorAll(
  "ul.playlists li.playlist-card"
);

playlistsCards.forEach((card) => {
  if (card.getAttribute("id") == "create-playlist") {
    // playlistsCards.slice(playlistsCards.indexOf(card), 1);
    console.log(card);
  }
  card.addEventListener("click", () => {
    localStorage.setItem("clickedAlbum", card.getAttribute("id"));
    window.location.href = `./album.html`;
  });
});
