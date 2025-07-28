function togglePassword() {
  const passwordInput = document.getElementById("passwordInput");
  const toggleBtn = event.target;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
}

const form = document.getElementById("signinForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      msg.textContent = "Sign-in info sent to your email!";
      form.reset();
    } else {
      response.json().then(data => {
        msg.textContent = data.error || "There was an error.";
      });
    }
  })
  .catch(error => {
    msg.textContent = "Error sending the form.";
  });
});
