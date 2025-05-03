import { UMISAC_API } from "./config.js";

(async () => {
  const response = await fetch(UMISAC_API);
  const songData = await response.json();

  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value;
    const filteredData = songData.filter((song) => {
      return (
        song.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        song.author.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    // console.log(filteredData);
    document.querySelector("section.content").innerHTML = "";
    filteredData.forEach((filteredSong) => {
      document.querySelector("section.content").innerHTML += `
      <div class = "song-card">
        <img src="${filteredSong.image}" alt="${filteredSong.name}" class="card-image" />
        <h3 class="card-name">${filteredSong.name}</h3>
        <p class="card-artist">${filteredSong.author}</p>
    </div>
        `;
    });
  });
})();
