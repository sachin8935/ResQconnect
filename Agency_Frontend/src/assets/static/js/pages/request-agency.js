document.addEventListener("DOMContentLoaded", async function () {
  const msg = document.getElementById("msg");
  const options = document.getElementById("incidents");
  await fetch(url + "/incident/getallincidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        options.innerHTML += `<option value="${element._id}">${element.incidentType}, ${element.incidentLocation}</option>`;
      });
    });

  const dept = document.getElementById("inputAgencyType");
  await fetch(url + "/user/all-users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        if (element._id !== id) {
          dept.innerHTML += `<option value="${element._id}">Name: ${element.name}, Type: ${element.type}</option>`;
        }
      });
    });

  const incident = document.getElementById("incidents");
  const agency = document.getElementById("inputAgencyType");
  const submit = document.getElementById("submit");
  const reset = document.getElementById("reset");
  submit.addEventListener("click", async function (e) {
    await fetch(url + "/request/create-department-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestAgencyID: id,
        incidentID: incident.value,
        departmentRequested: agency.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          msg.innerHTML = `<div class="alert alert-info">data.message</div>`;
        } else {
          msg.innerHTML = `<div class="alert alert-warning">Resource Requested Successfully</div>`;
        }
      });
  });
  reset.addEventListener("click", function (e) {
    incident.value = "";
    agency.value = "";
  });

  const elinc = document.getElementById("incidents");
  elinc.addEventListener("change", async function (e) {
    const incidentId = elinc.value;
    const el = document.getElementById("incidentDetails");
    await fetch(url + "/incident/" + incidentId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const coor = [data.incidentLongitude, data.incidentLatitude];

        map.setCenter(coor);
        const marker2 = new mapboxgl.Marker({
          color: "blue",
        })
          .setLngLat(coor)
          .addTo(map);

        setTimeout(() => marker2.remove(), 3000);
      });
  });

  const elag = document.getElementById("inputAgencyType");
  elag.addEventListener("change", async function (e) {
    const agencyId = elag.value;
    const el = document.getElementById("agencyDetails");
    await fetch(url + "/user/" + agencyId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const coor = data.location.coordinates;

        map.setCenter(coor);
        const marker3 = new mapboxgl.Marker({
          color: "black",
        })
          .setLngLat(coor)
          .addTo(map);

        setTimeout(() => marker3.remove(), 3000);
      });
  });

  mapboxgl.accessToken = mapApiKey;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/primeonpeasea/clmnvvihm01ww01pjgjqggbwb",
    center: [lon, lat],
    zoom: 11,
  });
  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat([lon, lat])
    .addTo(map);
  map.addControl(new mapboxgl.NavigationControl());
});
