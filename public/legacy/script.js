document.addEventListener("DOMContentLoaded", () => {

  const btn =
    document.getElementById("menuBtn");

  const menu =
    document.getElementById("menu");

  if (btn && menu) {

    btn.addEventListener(
      "click",
      () => {

        menu.classList.toggle(
          "active",
        );

      },
    );
  }

});


// ===== MODAL =====

function openRegister() {

  const modal =
    document.getElementById(
      "registerModal",
    );

  if (modal) {

    modal.style.display =
      "block";
  }
}

function closeRegister() {

  const modal =
    document.getElementById(
      "registerModal",
    );

  if (modal) {

    modal.style.display =
      "none";
  }
}


// ===== PASSWORD TOGGLE =====

function togglePassword() {

  const input =
    document.getElementById(
      "regPassword",
    );

  const text =
    document.getElementById(
      "eyeText",
    );

  if (!input || !text) {
    return;
  }

  if (input.type === "password") {

    input.type = "text";

    text.textContent =
      "Hide";

  } else {

    input.type = "password";

    text.textContent =
      "Show";
  }
}


// ===== REGISTER =====

function register() {

  const email =
    document.getElementById(
      "regEmail",
    );

  const password =
    document.getElementById(
      "regPassword",
    );

  if (!email || !password) {
    return;
  }

  const emailError =
    document.getElementById(
      "regEmailError",
    );

  const passwordError =
    document.getElementById(
      "regPasswordError",
    );

  const success =
    document.getElementById(
      "regSuccess",
    );

  if (emailError) {
    emailError.textContent = "";
  }

  if (passwordError) {
    passwordError.textContent = "";
  }

  if (success) {
    success.textContent = "";
  }

  let valid = true;

  if (
    !email.value.includes("@")
  ) {

    if (emailError) {

      emailError.textContent =
        "Enter a valid email";
    }

    valid = false;
  }

  if (
    password.value.length < 4
  ) {

    if (passwordError) {

      passwordError.textContent =
        "Password too short";
    }

    valid = false;
  }

  if (!valid) {
    return;
  }

  const btn =
    document.getElementById(
      "regBtn",
    );

  if (btn) {

    btn.innerText =
      "Redirecting...";
  }

  setTimeout(() => {

    if (success) {

      success.innerText =
        "Continue inside the platform 🎉";
    }

    setTimeout(() => {

      closeRegister();

      window.location.href =
        "/";

    }, 1200);

  }, 500);
}