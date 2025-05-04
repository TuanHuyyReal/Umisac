const playIconContainer = document.querySelector(".play-icon");
const playIconImg = document.querySelector("img.play-icon");
const audioPlayerContainer = document.querySelector(".player-timer");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const seekSlider = document.querySelector(".seek-slider");
const volumeSlider = document.querySelector(".volume-slider");
const next = document.querySelector(".next-icon");
const prev = document.querySelector(".prev-icon");
const audio = document.querySelector("audio");
const musicDisplay = document.querySelector(".music-display");
playIconImg.src = "assets/images/play.svg";
currentTime.textContent = localStorage.getItem("currentTime") || "00:00";
state = "";
let click = 0;
var i = localStorage.getItem("i") || 0;
localStorage.setItem("i", i);

let playlistLength =
  JSON.parse(localStorage.getItem("currentUser")).currentPlaylist.length || 0;

function renderTime() {
  const duration = JSON.parse(localStorage.getItem("currentUser"))
    .currentPlaylist[parseInt(localStorage.getItem("i"))].time;
  document.querySelector(".duration").textContent = duration;
}
renderTime();
seekSlider.setAttribute(
  "max",
  parseInt(duration.textContent.split(":")[0] * 60) +
    parseInt(duration.textContent.split(":")[1])
);

// clearInterval(update);
playIconContainer.addEventListener("click", () => {
  click++;
  state = "done";
  for (
    let i = JSON.parse(localStorage.getItem("i"));
    i < playlistLength && state == "done";
    i++
  ) {
    localStorage.setItem("i", i);

    audio.src =
      "./" +
      JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
        JSON.parse(localStorage.getItem("i"))
      ].audio;
    state = "play";
    audio.currentTime =
      currentTime.textContent.split(":")[0] * 60 +
      parseInt(currentTime.textContent.split(":")[1]);

    seekSlider.value = audio.currentTime;
    //render lên music display

    function renderMusicDisplay() {
      musicDisplay.innerHTML = `
    <div class = "music-info">
      <img class = "music-img" src = "${
        JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
          JSON.parse(localStorage.getItem("i"))
        ].image
      }">
      <div class="music-name">${
        JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
          JSON.parse(localStorage.getItem("i"))
        ].name
      }</div>
      <div class="music-author">${
        JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
          JSON.parse(localStorage.getItem("i"))
        ].author
      }</div>
    </div>
    `;
    }
    renderMusicDisplay();
    if (click % 2 !== 0) {
      playIconImg.src = "assets/images/pause.svg";
      let current = 0;
      var update = setInterval(() => {
        current = Math.floor(audio.currentTime) + 1;
        const maxTime = audio.duration;

        if (current >= maxTime) {
          clearInterval(update);
          state = "done";
          currentTime.textContent = "00:00";
          i++;
          localStorage.setItem("i", i);
          renderMusicDisplay();
        } else {
          currentTime.textContent =
            current % 60 < 10
              ? current / 60 < 10
                ? `0${Math.floor(current / 60)}:0${current % 60}`
                : `0${Math.floor(current / 60)}:0${current % 60}`
              : current / 60 < 10
              ? `0${Math.floor(current / 60)}:${current % 60}`
              : `0${Math.floor(current / 60)}:${current % 60}`;
        }
        audio.addEventListener("loadedmetadata", () => {
          seekSlider.max = audio.duration;
        });

        audio.addEventListener("timeupdate", () => {
          if (!seekSlider.dragging) {
            // Chỉ update nếu không đang kéo
            current = Math.floor(audio.currentTime) + 1;
            seekSlider.value = current;
          }
          currentTime.textContent =
            current % 60 < 10
              ? current / 60 < 10
                ? `0${Math.floor(current / 60)}:0${current % 60}`
                : `0${Math.floor(current / 60)}:0${current % 60}`
              : current / 60 < 10
              ? `0${Math.floor(current / 60)}:${current % 60}`
              : `0${Math.floor(current / 60)}:${current % 60}`;
          seekSlider.addEventListener("click", () => {
            seekSlider.dragging = true;
            audio.currentTime = seekSlider.value;
            current = Math.floor(audio.currentTime);

            currentTime.textContent =
              seekSlider.value % 60 < 10
                ? `0${Math.floor(seekSlider.value / 60)}:0${
                    seekSlider.value % 60
                  }`
                : `0${Math.floor(seekSlider.value / 60)}:${
                    seekSlider.value % 60
                  }`;
          });
        });

        audio.addEventListener("ended", () => {
          state = "done";
          audio.src = `./${
            JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
              parseInt(localStorage.getItem("i"))
            ].audio
          }`;
          clearInterval(update);
        });

        localStorage.setItem("currentTime", currentTime.textContent);
        localStorage.setItem(
          "currentSong",
          JSON.stringify(
            JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
              parseInt(localStorage.getItem("i"))
            ]
          )
        );
        next.addEventListener("click", () => {
          if (i == playlistLength - 1) {
            i = 0;
          } else {
            i++;
          }
          localStorage.setItem("i", i);
          audio.src =
            "./" +
            JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
              parseInt(localStorage.getItem("i"))
            ].audio;
          renderMusicDisplay();
          duration.textContent = JSON.parse(
            localStorage.getItem("currentUser")
          ).currentPlaylist[parseInt(localStorage.getItem("i"))].time;
          state = "play";
          clearInterval(update);
        });
        prev.addEventListener("click", () => {
          if (i == 0) {
            i = playlistLength - 1;
          } else {
            i--;
          }
          localStorage.setItem("i", i);
          audio.src =
            "./" +
            JSON.parse(localStorage.getItem("currentUser")).currentPlaylist[
              parseInt(localStorage.getItem("i"))
            ].audio;
          renderMusicDisplay();
          state = "play";
          clearInterval(update);
        });
      }, 1000);
    } else {
      clearInterval(update);
      playIconImg.src = "assets/images/play.svg";
    }
  }
});
seekSlider.addEventListener("click", () => {
  seekSlider.dragging = true;
  audio.currentTime = seekSlider.value;
  currentTime.textContent =
    seekSlider.value % 60 < 10
      ? `0${Math.floor(seekSlider.value / 60)}:0${seekSlider.value % 60}`
      : `${Math.floor(seekSlider.value / 60)}:${seekSlider.value % 60}`;

  localStorage.setItem("currentTime", currentTime.textContent);
});
