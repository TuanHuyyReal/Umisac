const logo = document.querySelector('img[alt="Umisac"]');
const loader = document.querySelector(".loader");
logo.src = "assets/images/logo.png";
if (screen.width < 425) {
  logo.src = "assets/images/logo-2.png";
}
logo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
window.onload = () => {
  loader.classList.remove("hidden");
};
window.addEventListener("load", () => {
  loader.classList.add("hidden");
});
