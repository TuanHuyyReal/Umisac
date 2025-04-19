if (sessionStorage.getItem("currentUser")) {
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
  let users = sessionStorage.getItem("users");

  function success() {
    let avatar = JSON.parse(sessionStorage.getItem("users")).map((user) => {
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
    successContainer.classList.remove("hidden");
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: loginUsername,
        email: loginEmail,
        password: loginPw,
        avatar: avatar[0],
      })
    );
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email != loginEmail) {
      continue;
    } else {
      if (
        loginUsername != sessionStorage.getItem("users").username ||
        loginPw != sessionStorage.getItem("users").password
      ) {
        console.log(sessionStorage.getItem("users"));
        loginMessage.classList.remove("hidden");
        loginMessage.innerHTML = "Invalid username or password";
      } else {
        success();
      }
    }
  }

  if (!loginUsername || !loginPw) {
    loginMessage.classList.remove("hidden");
    loginMessage.innerHTML = "Please enter enough infos";
  } else if (loginUsername.trim() == "" || loginPw.trim() == "") {
    loginMessage.classList.remove("hidden");
    loginMessage.innerHTML = "Please enter enough infos";
  } else {
    success();
  }

  // console.log([loginUsername, loginPw]);
});
