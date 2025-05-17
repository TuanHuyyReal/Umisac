if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}
const submit = document.querySelector(".login-form button.sbm-btn");
const successContainer = document.querySelector("div.suc-container");
successContainer.classList.add("hidden");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let loginMessage = document.querySelector(".login-form small.message");
  loginMessage.classList.add("hidden");
  let loginUsername = document.querySelector(
    ".login-form input#username-input"
  ).value;
  let loginPw = document.querySelector(".login-form input#password").value;
  let loginEmail = document.querySelector(".login-form input#email").value;
  let users = JSON.parse(localStorage.getItem("users"));

  function success() {
    loginMessage.classList.add("hidden");
    const avatar = JSON.parse(localStorage.getItem("users")).map((user) => {
      if (user.email == loginEmail) {
        if (!user.avatar) {
          userAvatar = user.avatar;
        } else {
          userAvatar = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
            user.username
          )}`;
        }
        return userAvatar;
      }
    });
    const albumContainer = JSON.parse(localStorage.getItem("users")).map(
      (user) => {
        if (user.email == loginEmail && user.albumContainer) {
          return user.albumContainer;
        }
      }
    );
    const userId = JSON.parse(localStorage.getItem("users")).forEach((user) => {
      if (user.email == loginEmail) {
        return user.id;
      }
    });
    successContainer.classList.remove("hidden");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: loginUsername,
        email: loginEmail,
        password: loginPw,
        avatar: avatar[0],
        albumContainer: albumContainer,
        id: userId,
      })
    );
  }

  users.forEach((user) => {
    if (
      user.email == loginEmail &&
      user.password == loginPw &&
      user.username == loginUsername
    ) {
      success();
    } else {
      loginMessage.classList.remove("hidden");
      loginMessage.innerHTML = "Invalid username or password";
    }
  });

  if (!loginUsername || !loginPw || !loginEmail) {
    loginMessage.classList.remove("hidden");
    loginMessage.innerHTML = "Please enter enough infos";
  } else if (
    loginUsername.trim() == "" ||
    loginPw.trim() == "" ||
    loginEmail.trim() == ""
  ) {
    loginMessage.classList.remove("hidden");
    loginMessage.innerHTML = "Please enter enough infos";
  }
});
