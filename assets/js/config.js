export const SPOTIFY_API_KEY =
  "BQC7RbpjSe91a4T6ISd7cE7CupVhzXNuARmWB4RFNzTs27PAo9JflRPIa8WcRXKzneQp13BJa4Vhaj4y_hVTOGHvrpXpnO_kVsolDulS-HemIqx0UHbAPSOi5TviL_mcc57ltyLchSQ";

export const SPOTIFY_API_URL = "https://api.spotify.com/v1";
window.handleSignOut = () => {
  sessionStorage.removeItem("currentUser");
  location.reload();
};
let accDisplay = document.querySelector(".account-info-display");
let accAvatar = document.querySelector(".avatar-display");
if (sessionStorage.getItem("currentUser")) {
  if (!JSON.parse(sessionStorage.getItem("currentUser")).avatar) {
    accAvatar.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      JSON.parse(localStorage.getItem("currentUser")).username
    )}`;
  } else {
    accAvatar.src = encodeURIComponent(
      JSON.parse(sessionStorage.getItem("currentUser")).avatar_url
    );
  }
  accDisplay.innerHTML = `
  <ul class = "account-info">
  <li>${JSON.parse(sessionStorage.getItem("currentUser")).name}</li>
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
});
