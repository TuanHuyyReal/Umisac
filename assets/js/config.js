export const UMISAC_API =
  "https://68039ba20a99cb7408ec7fa6.mockapi.io/umisac/item_song";
window.handleSignOut = () => {
  sessionStorage.removeItem("currentUser");
  location.reload();
};
let accDisplay = document.querySelector(".account-info-display");
let accAvatar = document.querySelector(".avatar-display");
if (sessionStorage.getItem("currentUser")) {
  if (!JSON.parse(sessionStorage.getItem("currentUser")).avatar) {
    accAvatar.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      JSON.parse(sessionStorage.getItem("currentUser")).username
    )}`;
  } else {
    accAvatar.src = encodeURIComponent(
      JSON.parse(sessionStorage.getItem("currentUser")).avatar_url
    );
  }
  accDisplay.innerHTML = `
  <ul class = "account-info">
  <li>${JSON.parse(sessionStorage.getItem("currentUser")).username}</li>
  <li onclick = "handleSignOut()">Logout</li>
  </ul>
  `;
} else {
  // accDisplay.style.display = "none";
  accDisplay.innerHTML = `
  <ul class = "account-info">
  <li><a href="./register.html" class = "reg-direct">Register</a></li></ul>
  `;
  accAvatar.src = "./assets/images/register.svg";
}
accDisplay.classList.add("hidden");

accAvatar.addEventListener("click", () => {
  accDisplay.classList.toggle("hidden");
  if (!accDisplay.classList.contains("hidden")) {
    accDisplay.style.animation = "slide 0.5s ease-in-out";
  } else {
    accDisplay.style.animation = "slide 0.5s ease-in-out reverse";
  }
});
