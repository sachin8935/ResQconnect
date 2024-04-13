localStorage.setItem("apiUrl", "http://localhost:4000/api");
localStorage.setItem(
  "mapApiToken",
  "pk.eyJ1IjoicHJpbWVvbnBlYXNlYSIsImEiOiJjbG1udXB5eDEwMmUzMmtueHVhdzc0cnRhIn0.oOrd994PwnPALjqW9SkMbw"
);
const url = localStorage.getItem("apiUrl");
const mapApiKey = localStorage.getItem("mapApiToken");
const id = localStorage.getItem("userId");
const token = localStorage.getItem("refreshToken");
const agencyId = localStorage.getItem("agencyId");
const lat = parseFloat(localStorage.getItem("latitude"));
const lon = parseFloat(localStorage.getItem("longitude"));
window.onload = askForLocationPermission();

function askForLocationPermission() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, denied);
  }
}

function denied(error) {
  if (error.code === 1) {
    console.log("hello");
  }
}

function success(position) {
  console.log("location fetched");
  localStorage.setItem("latitude", position.coords.latitude);
  localStorage.setItem("longitude", position.coords.longitude);
}

if (0) {
  window.location.href = "auth-login.html";
} else {
  console.log("auth done!");
}
