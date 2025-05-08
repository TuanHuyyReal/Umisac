// location.replace(`./album.html/${localStorage.getItem("clickedAlbum")}`);
const albumImg = document.querySelector(".album-cover");
const albumName = document.querySelector(".album-name");
const albumAuthor = document.querySelector(".album-desc");
const clickedAlbum = localStorage.getItem("clickedAlbum");
console.log(clickedAlbum);
const albums = JSON.parse(localStorage.getItem("currentUser")).albumContainer;
albums.forEach((album) => {
  if (album.albumId == clickedAlbum) {
    console.log(album);
    function renderAlbum() {
      albumImg.src = `assets/images/folder-icons/${album.albumImage}.png`;
      albumName.textContent = album.albumName;
      albumAuthor.textContent = album.albumDesc;
    }
    renderAlbum();
  }
});
