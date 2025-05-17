export const UMISAC_API =
  "https://68039ba20a99cb7408ec7fa6.mockapi.io/umisac/item_song";
window.handleSignOut = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentSong");
  localStorage.removeItem("clickedAlbum");
  localStorage.removeItem("currentPlaylist");
  localStorage.removeItem("currentTime");
  localStorage.removeItem("i");
  location.reload();
};
let accDisplay = document.querySelector(".account-info-display");
let accAvatar = document.querySelector(".avatar-display");
if (localStorage.getItem("currentUser")) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  accAvatar.src = currentUser.avatar
    ? encodeURIComponent(currentUser.avatar_url)
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        currentUser.username
      )}`;
  accDisplay.innerHTML = `
  <ul class="account-info">
  <li><span class="remove">X</span></li>
  <li>${currentUser.username}</li>
  <li onclick="handleSignOut()">Logout</li>
  </ul>
  `;
  accDisplay.querySelector("span.remove").addEventListener("click", () => {
    accDisplay.classList.add("hidden");
  });
} else {
  accDisplay.innerHTML = `
  <ul class="account-info">
  <li><a href="./register.html" class="reg-direct">Register</a></li></ul>
  `;
  accAvatar.src = "./assets/images/register.svg";
  document
    .querySelector("div.account-info-display")
    .addEventListener("click", () => {
      location.href = "./register.html";
    });
}

accDisplay.classList.add("hidden");
accAvatar.addEventListener("click", () => {
  accDisplay.classList.toggle("hidden");
});

(async function checkLoggedIn() {
  const requireReg = document.querySelector(".require-reg");
  if (!localStorage.getItem("currentUser")) {
    requireReg.classList.remove("hidden");
  } else {
    requireReg.classList.add("hidden");
  }
})();

const notice = document.querySelector(".notice");
const remove = notice.querySelectorAll(".remove");
remove.forEach((r) =>
  r.addEventListener("click", () => {
    notice.classList.add("hidden");
  })
);
