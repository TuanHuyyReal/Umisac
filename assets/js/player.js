const playIconContainer = document.querySelector(".play-icon");
const playIconImg = document.querySelector("img.play-icon");
const audioPlayerContainer = document.querySelector(".player-timer");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const seekSlider = document.querySelector(".seek-slider");
const volumeSlider = document.querySelector(
  'input[type="range"]#volume-change'
);
const volumeIcon = document.querySelector(".volume-adjust img");
const next = document.querySelector(".next-icon");
const prev = document.querySelector(".prev-icon");
const audio = document.querySelector("audio");
const musicDisplay = document.querySelector(".music-display");

playIconImg.src = "assets/images/play.svg";
currentTime.textContent = localStorage.getItem("currentTime") || "00:00";
state = "";
let click = 0;
var i = localStorage.getItem("i") || 0;

let playlistLength =
  JSON.parse(localStorage.getItem("currentPlaylist")).length || 0;
if (playlistLength == 1) {
  i = 0;
}
localStorage.setItem("i", i);

function renderTime() {
  const duration = JSON.parse(localStorage.getItem("currentPlaylist"))[
    parseInt(localStorage.getItem("i"))
  ].time;
  document.querySelector(".duration").textContent = duration;
}
renderTime();
seekSlider.setAttribute(
  "max",
  parseInt(duration.textContent.split(":")[0] * 60) +
    parseInt(duration.textContent.split(":")[1])
);
function reset() {
  audio.currentTime = 0;
  currentTime.textContent = "00:00";
  seekSlider.value = 0;
  current = 0;
}
// clearInterval(update);
function playMusic(playlistLength) {
  reset();
  click++;
  state = "done";
  console.log(click);
  for (
    let i = JSON.parse(localStorage.getItem("i"));
    i < playlistLength && state == "done";
    i++
  ) {
    localStorage.setItem("i", i);

    audio.src =
      "./" +
      JSON.parse(localStorage.getItem("currentPlaylist"))[
        JSON.parse(localStorage.getItem("i"))
      ].audio;
    state = "play";
    audio.currentTime =
      currentTime.textContent.split(":")[0] * 60 +
      parseInt(currentTime.textContent.split(":")[1]);

    seekSlider.value = audio.currentTime;
    //render lên music display

    function renderMusicDisplay() {
      const currentSong = JSON.parse(localStorage.getItem("currentPlaylist"))[
        JSON.parse(localStorage.getItem("i"))
      ];
      musicDisplay.innerHTML = `
    <div class = "music-info">
      <img class = "music-img" src = "${currentSong["image"]}" alt ="">
      <div class="music-name">${currentSong.name}</div>
      <div class="music-author">${currentSong.author}</div>
    </div>
    `;
      document.querySelector(".player .song-info").innerHTML = `
        <img src="${
          JSON.parse(localStorage.getItem("currentPlaylist"))[
            JSON.parse(localStorage.getItem("i"))
          ].image
        }" alt="song-cover" class="song-cover" />
          <div class="song-title">
            <h2 class="song-name">${
              JSON.parse(localStorage.getItem("currentPlaylist"))[
                JSON.parse(localStorage.getItem("i"))
              ].name
            }</h2>
            <h3 class="song-artist">${
              JSON.parse(localStorage.getItem("currentPlaylist"))[
                JSON.parse(localStorage.getItem("i"))
              ].author
            }</h3>
          </div>
      `;
    }
    renderMusicDisplay();
    if (click % 2 !== 0) {
      playIconImg.src = "assets/images/pause.svg";
      state = "play";
      let current = 0;
      var update = setInterval(() => {
        current = Math.floor(audio.currentTime) + 1;
        const maxTime = audio.duration;
        // check nếu current >= maxTime thi qua bai moi
        // chỉnh display time
        if (current >= maxTime) {
          clearInterval(update);
          state = "done";
          currentTime.textContent = "00:00";
          i++;
          localStorage.setItem("i", i);
          renderMusicDisplay();
        } else {
          // neu khong thi update thoi gian
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
          // nếu load dc bài mới thì reset và gọi lại update interval
          reset();
          seekSlider.max = audio.duration;
          current = 0;
          seekSlider.value = current;
          currentTime.textContent = "00:00";
          audio.volume = volumeSlider.value / 100;
          setInterval(update);
          audio.play();
          state = "play";
          playIconImg.src = "assets/images/pause.svg";
        });
        document.addEventListener("keyup", (e) => {
          if (e.code == "Spacebar") {
            playMusic(playlistLength);
          }
          if (e.code == "ArrowRight") {
            setTimeout(() => {
              if (i == playlistLength - 1) {
                i = 0;
              } else {
                i++;
              }
            }, 10);
            localStorage.setItem("i", i);
            audio.src =
              "./" +
              JSON.parse(localStorage.getItem("currentPlaylist"))[
                parseInt(localStorage.getItem("i"))
              ].audio;
            renderMusicDisplay();
            duration.textContent = JSON.parse(
              localStorage.getItem("currentPlaylist")
            )[parseInt(localStorage.getItem("i"))].time;
            state = "play";
            clearInterval(update);
          }
          if (e.code == "ArrowLeft") {
            setTimeout(() => {
              if (i == 0) {
                i = playlistLength - 1;
              } else {
                i--;
              }
            }, 10);

            localStorage.setItem("i", i);
            console.log(JSON.parse(localStorage.getItem("i")));
            audio.src =
              "./" +
              JSON.parse(localStorage.getItem("currentPlaylist"))[
                parseInt(localStorage.getItem("i"))
              ].audio;
            renderMusicDisplay();
            duration.textContent = JSON.parse(
              localStorage.getItem("currentPlaylist")
            )[parseInt(localStorage.getItem("i"))].time;
            state = "play";
            clearInterval(update);
          }
        });
        audio.addEventListener("timeupdate", () => {
          if (!seekSlider.dragging) {
            // Chỉ update nếu không đang kéo
            current = Math.floor(audio.currentTime) + 1;
            seekSlider.value = current;
          }
          // cập nhật currentTime (thoi gian play)
          currentTime.textContent =
            current % 60 < 10
              ? current / 60 < 10
                ? `0${Math.floor(current / 60)}:0${current % 60}`
                : `0${Math.floor(current / 60)}:0${current % 60}`
              : current / 60 < 10
              ? `0${Math.floor(current / 60)}:${current % 60}`
              : `0${Math.floor(current / 60)}:${current % 60}`;

          //cap nhap thoi gian khi dieu chinh thanh slider

          seekSlider.addEventListener("click", () => {
            seekSlider.dragging = true;
            audio.currentTime = seekSlider.value;
            current = Math.floor(audio.currentTime);
            // cap nhat thoi gian theo value cua slider
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
        // neu audio dung thi cap nhat bai moi
        audio.addEventListener("ended", () => {
          state = "done";
          audio.src = `./${
            JSON.parse(localStorage.getItem("currentPlaylist"))[
              parseInt(localStorage.getItem("i"))
            ].audio
          }`;
          clearInterval(update);
          if (i == playlistLength - 1) {
            i = 0;
          } else {
            i++;
          }
          localStorage.setItem("i", i);
          audio.src =
            "./" +
            JSON.parse(localStorage.getItem("currentPlaylist"))[
              parseInt(localStorage.getItem("i"))
            ].audio;
          audio.currentTime = 0;
          currentTime.textContent = "00:00";
          current = 0;
          seekSlider.value = 0;
          renderMusicDisplay();

          // cap nhat duration
          duration.textContent = JSON.parse(
            localStorage.getItem("currentPlaylist")
          )[parseInt(localStorage.getItem("i"))].time;
          state = "play";
          clearInterval(update);
          setInterval(update);
        });
        // luu thoi gian
        localStorage.setItem("currentTime", currentTime.textContent);
        localStorage.setItem(
          "currentSong",
          JSON.stringify(
            JSON.parse(localStorage.getItem("currentPlaylist"))[
              parseInt(localStorage.getItem("i"))
            ]
          )
        );
        next.addEventListener("click", () => {
          setTimeout(() => {
            if (i == playlistLength - 1) {
              i = 0;
            } else {
              i += 1;
            }
          }, 1);

          localStorage.setItem("i", i);
          console.log(parseInt(localStorage.getItem("i")));
          audio.src =
            "./" +
            JSON.parse(localStorage.getItem("currentPlaylist"))[
              parseInt(localStorage.getItem("i"))
            ].audio;
          reset();
          renderTime();
          renderMusicDisplay();
          duration.textContent = JSON.parse(
            localStorage.getItem("currentPlaylist")
          )[parseInt(localStorage.getItem("i"))].time;
          state = "play";
          clearInterval(update);
        });
        prev.addEventListener("click", () => {
          setTimeout(() => {
            if (i == 0) {
              i = playlistLength - 1;
            } else {
              i--;
            }
          }, 10);
          localStorage.setItem("i", i);
          audio.src =
            "./" +
            JSON.parse(localStorage.getItem("currentPlaylist"))[
              parseInt(localStorage.getItem("i"))
            ].audio;
          renderMusicDisplay();
          state = "play";
          clearInterval(update);
        });
        volumeSlider.addEventListener("input", () => {
          audio.volume = volumeSlider.value / 100;
        });
        volumeIcon.addEventListener("click", () => {
          if (audio.volume == 0) {
            audio.volume = 0.5;
            volumeIcon.src = "assets/images/volume.svg";
          } else {
            audio.volume = 0;
            volumeIcon.src = "assets/images/mute.svg";
          }
        });
      }, 1000);
    } else {
      clearInterval(update);
      audio.pause();
      state = "pause";
      playIconImg.src = "assets/images/play.svg";
      audio.addEventListener("pause", () => {
        // clearInterval(update);
        state = "pause";
        playIconImg.src = "assets/images/play.svg";
      });
    }
  }
}
seekSlider.addEventListener("click", () => {
  seekSlider.dragging = true;
  audio.currentTime = seekSlider.value;
  currentTime.textContent =
    seekSlider.value % 60 < 10
      ? `0${Math.floor(seekSlider.value / 60)}:0${seekSlider.value % 60}`
      : `${Math.floor(seekSlider.value / 60)}:${seekSlider.value % 60}`;

  localStorage.setItem("currentTime", currentTime.textContent);
});

playIconContainer.addEventListener("click", playMusic(playlistLength));
