const signUpSubmit = document.querySelector(
  ".signup-form button.signup-sbm-btn"
);
signUpSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let signupMessage = document.querySelector(
    ".signup-form small.signup-message"
  );
  signupMessage.classList.add("hidden");
  signupMessage.innerHTML = "";
  signupMessage.classList.remove("green");
  signupMessage.classList.remove("bold");
  let username = document.querySelector(
    ".signup-form input#signup-username-input"
  ).value;
  let email = document.querySelector(
    ".signup-form input#signup-email-input"
  ).value;
  let password = document.querySelector(
    ".signup-form input#signup-password"
  ).value;
  let confirmPass = document.querySelector(
    ".signup-form input#signup-confirm-pass"
  ).value;
  // code mượn trên stackoverflow
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);
  };
  console.log(validateEmail(email));
  const validateUsn = (username) => {
    return 6 <= username.trim().length && username.trim().length <= 18
      ? true
      : false;
  };
  console.log(validateUsn(username));
  if (!username || !email || !password || !confirmPass) {
    signupMessage.classList.remove("hidden");
    signupMessage.textContent += "Please enter enough infos.";
  } else if (
    username.trim() == "" ||
    email.trim() == "" ||
    password.trim() == "" ||
    confirmPass.trim() == ""
  ) {
    signupMessage.classList.remove("hidden");
    signupMessage.textContent += "Please enter enough infos.";
  } else if (validateUsn == false) {
    signupMessage.classList.remove("hidden");
    signupMessage.innerHTML += "Your username has to be from 6 to 18 letters.";
  }
  // if pw != confPw => signupMessage
  else if (
    password != confirmPass &&
    (confirmPass.trim() != "" || password.trim() != "")
  ) {
    signupMessage.classList.remove("hidden");
    signupMessage.textContent +=
      "Please sure that you entered the correct confirmation.";
  } else if (username == localStorage.getItem("username")) {
    signupMessage.classList.remove("hidden");
    signupMessage.innerHTML = "Username has been used!";
  } else if (!validateEmail(email)) {
    signupMessage.classList.remove("hidden");
    signupMessage.innerHTML += "You did not redeem an email with correct form.";
  } else {
    if (localStorage.getItem("users")) {
      let users = JSON.parse(localStorage.getItem("users"));
      let existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        alert("Email already exists. Please use a different email.");
        return;
      } else {
        let newUser = {
          username: username,
          email: email,
          password: password,
          id: Math.random().toString(16).slice(2),
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        signupMessage.classList.remove("hidden");
        signupMessage.innerHTML =
          '<span class="green bold">Registration successful! You can now log in.</span>';
        // location.href = "./login.html";
        alert("Registration successful! You can now log in.");
        location.reload();
      }
    } else {
      let newUser = {
        username: username,
        email: email,
        password: password,
      };
      let users = [newUser];
      localStorage.setItem("users", JSON.stringify(users));
      signupMessage.classList.remove("hidden");
      signupMessage.innerHTML =
        '<span class = "green bold">Registration successful! You can now log in.</span> ';
      // location.href = "./login.html";
      alert("Registration successful! You can now log in.");
      location.reload();
    }
  }

  console.log([username, email, password]);
});
