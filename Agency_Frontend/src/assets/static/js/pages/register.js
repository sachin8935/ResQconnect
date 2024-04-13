const url = localStorage.getItem("apiUrl");
const loc = document.getElementById("lCheckbox");
const register = document.getElementById("register");

var lon = 0;
var lat = 0;

if (localStorage.getItem("isLogged")) {
  window.location.href = "dashboard.html";
}

loc.addEventListener("click", (e) => {
  // Changed lCheckbox to loc
  if (e.target.checked) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
    });
  }
});

register.addEventListener("click", (e) => {
  const type = document.getElementById("inputAgencyType");
  const agencyId = document.getElementById("inputAgencyID");
  const name = document.getElementById("inputAgencyName");
  const email = document.getElementById("inputAgencyEmail");
  const password = document.getElementById("inputPassword");
  const confirmPassword = document.getElementById("inputConfirmPassword");
  const mobile = document.getElementById("inputAgencyMobile");
  const state = document.getElementById("inputState");
  const district = document.getElementById("inputDistrict");
  const pincode = document.getElementById("inputPincode");

  if (password.value === "") {
    e.preventDefault(); // Prevent form submission when password is empty
    console.log("Password cannot be empty");
  } else if (password.value !== confirmPassword.value) {
    e.preventDefault(); // Prevent form submission when passwords do not match
    console.log("Passwords do not match");
  } else {
    const data = {
      type: type.value,
      name: name.value,
      agencyId: agencyId.value,
      email: email.value,
      password: password.value,
      mobile: mobile.value,
      state: state.value,
      city: district.value,
      postalCode: pincode.value,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
    };
    fetch(url + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      response.json().then((data) => {
        // Parse response data as JSON
        console.log(data);
        if (response.status === 200) {
          // Redirect to login page after successful registration
          window.location.href = "auth-login.html";
        } else {
          console.log("error");
        }
      });
    });
  }
});
