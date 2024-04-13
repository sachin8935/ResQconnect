document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addAgentForm");
  const msg = document.querySelector(".msg");
  const agentName = document.getElementById("agentName");
  const agentRole = document.getElementById("agentRole");
  const agentID = document.getElementById("agentID");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phoneNumber");
  const agentDescription = document.getElementById("agentDescription");
  const submit = document.getElementById("submit");
  const reset = document.getElementById("reset");

  submit.addEventListener("click", async (e) => {
    e.preventDefault();
    const agent = {
      agentName: agentName.value,
      agentRole: agentRole.value,
      agentID: agentID.value,
      email: email.value,
      agentAgencyID: agencyId,
      contactInfo: {
        contactEmail: email.value,
        contactPhone: phoneNumber.value,
      },
      agentDescription: agentDescription.value,
      agentLocation: {
        latitude: lat,
        longitude: lon,
      },
      agentStatus: "available",
      currentAssigned: null,
      distance: 0,
    };

    await fetch(url + "/agents/create-a-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(agent),
    }).then((res) => {
      console.log(res);
      // msg.innerHTML = res.json().message;
      // setTimeout(() => msg.remove(), 3000);
      // form.reset();
    });

    reset.addEventListener("click", () => {
      agentName.value = "";
      agentRole.value = "";
      agentID.value = "";
      email.value = "";
      phoneNumber.value = "";
      agentDescription.value = "";
    });
  });

  mapboxgl.accessToken = mapApiKey;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/primeonpeasea/clmnvvihm01ww01pjgjqggbwb",
    center: [lon, lat], // starting position [lng, lat]
    zoom: 11, // starting zoom
    // scrollZoom: false,
    // dragPan: false,
  });
  map.addControl(new mapboxgl.ScaleControl());
  const marker1 = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
});
