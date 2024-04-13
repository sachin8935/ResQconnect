document.addEventListener("DOMContentLoaded", function () {
  const msg = document.getElementById("msg");
  const options = document.getElementById("incidents");
  fetch(url + "/incident/getallincidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        options.innerHTML += `<option value="${element._id}">${element.incidentType}</option>`;
      });
    });

  const incident = document.getElementById("incidents");
  const resource = document.getElementById("resource");
  const quant = document.getElementById("quant");
  const submit = document.getElementById("submit");
  const reset = document.getElementById("reset");
  submit.addEventListener("click", function (e) {
    fetch(url + "/request/create-resource-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestAgencyID: id,
        incidentID: incident.value,
        resourceRequested: resource.value,
        resourceQuantity: quant.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          msg.innerHTML = data.message;
        } else {
          msg.innerHTML = "Resource Requested Successfully";
        }
      });
  });
  reset.addEventListener("click", function (e) {
    incident.value = "";
    resource.value = "";
    quant.value = "";
  });

  mapboxgl.accessToken = mapApiKey;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/primeonpeasea/clmnvvihm01ww01pjgjqggbwb",
    center: [lon, lat],
    zoom: 14,
  });
  const marker = new mapboxgl.Marker({ color: "blue" })
    .setLngLat([lon, lat])
    .addTo(map);
  map.addControl(new mapboxgl.NavigationControl());
});
