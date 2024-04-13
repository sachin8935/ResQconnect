document.addEventListener("DOMContentLoaded", async function () {
  await fetch(url + "/incident/getallincidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    const data = response.json();
    const table = document.getElementById("incidentHistory");
    data.then((data) => {
      data.forEach((element) => {
        table.innerHTML += `
        <tr>
            <td>${element.incidentReportAgencyID}</td>
            <td>${element.incidentType}</td>
            <td>
                <span class="badge bg-light-danger w-100 p-2">${
                  element.incidentSeverity
                }</span>
            </td>
            <td>${element.incidentLocation}</td>
            <td>
                <a class="btn btn-primary btnh" id=${element._id}>
                    View Location
                </a>
            </td>
            <td>${element.incidentDate.substring(0, 10)}</td>
            <td>${element.incidentDate.substring(11, 19)}</td>
            <td>
                <span class="badge bg-success w-100 p-2">${
                  element.incidentStatus
                }</span>
            </td>
        </tr>
        `;
      });
    });
  });

  const btnhs = document.querySelectorAll(".btnh");
  btnhs.forEach((element) => {
    element.addEventListener("click", async (e) => {
      console.log(element);
      e.preventDefault();
      const incidentId = element.getAttribute("id");
      await fetch(url + "/incident/" + incidentId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        console.log(response);
        const data = response.json();
        data.then((data) => {
          console.log(data);
          setMap([data.incidentLongitude, data.incidentLatitude]);
        });
      });
    });
  });

  function setMap(coords) {
    map.setCenter(coords);
    const marker2 = new mapboxgl.Marker({
      color: "blue",
    })
      .setLngLat(coords)
      .addTo(map);

    setTimeout(() => marker2.remove(), 3000);
  }

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
