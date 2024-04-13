const url = localStorage.getItem("apiUrl");

if (localStorage.getItem("isLogged") === "true") {
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const login = document.getElementById("login");

  login.addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      email: username.value,
      password: password.value,
    };
    fetch(url + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        const userData = response.json();
        userData.then((data) => {
          localStorage.setItem("userId", data._id);
          localStorage.setItem("refreshToken", data.token);
          localStorage.setItem("agencyId", data.agencyId);
          localStorage.setItem("isLogged", true);
        });
        window.location.href = "dashboard.html";
      } else {
        console.log("error");
      }
    });
  });
});
