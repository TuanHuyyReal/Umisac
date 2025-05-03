// import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const playIconContainer = document.querySelector(".play-icon");
const playIconImg = document.querySelector("img.play-icon");
const audioPlayerContainer = document.querySelector(".player-timer");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const seekSlider = document.querySelector(".seek-slider");
const volumeSlider = document.querySelector(".volume-slider");

playIconImg.src = "assets/images/play.svg";
currentTime.textContent = "00:00";
click = 0;

seekSlider.setAttribute(
  "max",
  parseInt(duration.textContent.split(":")[0] * 60) +
    parseInt(duration.textContent.split(":")[1])
);
// clearInterval(update);
playIconContainer.addEventListener("click", () => {
  click++;
  if (click % 2 !== 0) {
    playIconImg.src = "assets/images/pause.svg";
    let current = 0;
    console.log(current);
    var update = setInterval(() => {
      const maxTime = eval(
        duration.textContent.split(":")[0] * 60 +
          duration.textContent.split(":")[1]
      );
      current++;
      console.log(current);
      if (current == maxTime) {
        clearInterval(update);
      } else {
        if (current % 60 < 10) {
          currentTime.innerHTML = `0${Math.floor(current / 60)}:0${
            current % 60
          }`;
        } else {
          currentTime.textContent =
            Math.floor(current / 60) + ":" + (current % 60);
        }
      }
      seekSlider.addEventListener("input", () => {
        if (current % 60 < 10) {
          currentTime.innerHTML = `0${Math.floor(current / 60)}:0${
            current % 60
          }`;
        } else {
          currentTime.innerHTML = `0${Math.floor(current / 60)}:${
            current % 60
          }`;
        }
      });
      seekSlider.value = current;
      seekSlider.max = maxTime;
      seekSlider.setAttribute("value", current);
      console.log(currentTime);
      console.log(seekSlider.value);

      seekSlider.dispatchEvent(new Event("change", { bubbles: true }));
      seekSlider.dispatchEvent(new Event("input", { bubbles: true }));
    }, 1000);
  } else {
    clearInterval(update);
    playIconImg.src = "assets/images/play.svg";
  }
});
