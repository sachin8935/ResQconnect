document.addEventListener("DOMContentLoaded", async function () {
  await fetch(url + "/agents/get-all-agents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    const userData = response.json();
    userData.then((data) => {
      const element = document.getElementById("agentsAvailable");
      htmlString = "";
      for (let i = 0; i < data.length; i++) {
        const agent = data[i];
        // agent.agentAgencyID === agencyId
        if (1) {
          const agentName = agent.agentName;
          const agentRole = agent.agentRole;
          const agentAssignment = agent.currentAssigned;
          const agentImage = agent.agentID;
          htmlString += `
          <div class="recent-message d-flex px-4 py-3">
            <input type="checkbox" id="${agentImage}" class="form-check-input">
            <div class="name ms-4">
              <h5 class="mb-1">${agentName}</h5>
              <h6 class="text-muted mb-0">${agentRole}</h6>
            </div>
            <div class="name ms-4">
              <h6 class="text-muted m-0">${agentAssignment}</h6>
            </div>
          </div>`;
        }
      }
      element.innerHTML = htmlString;
    });
  });

  await fetch(url + "/request/get-all-resource-requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    const resourceRequest = response.json();
    resourceRequest.then((data) => {
      const element = document.getElementById("resourceRequest");
      htmlString = "";
      for (let i = 0; i < data.length; i++) {
        const agency = data[i];
        var parentStringR = agency.requestAgencyID.toString() + "parentR";
        // agency.requestAgencyID === id
        if (1) {
          if (agency.assignedAgencyID === null) {
            const resourceRequested = agency.resourceRequested;
            const resourceQuantity = agency.resourceQuantity;
            htmlString += `
            <div style="border: 1px solid grey;" class="card row parentR d-flex justify-content-center align-items-center p-1" value="${parentStringR}">
              <div class="container m-2">
                <div class="row">
                  <div class="col-12 col-md-7 d-flex align-items-center">
                    <h5 class="m-0" style="overflow: hidden;
                    white-space: nowrap;">${resourceRequested}</h5>
                  </div>
                  <div class="col-12 col-md-1 d-flex align-items-center">
                    <p class="m-0">${resourceQuantity}</p>
                  </div>
                  <div class="col-12 col-md-2">
                    <a class="btn btn-success m-0 acceptr" value="${agency._id}">
                      <i class="bi bi-check-circle"></i>
                    </a>
                  </div>
                  <div class="col-12 col-md-2">
                    <a class="btn btn-danger m-0 rejectr">
                      <i class="bi bi-x-circle"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            `;
          }
        }
      }
      element.innerHTML = htmlString;
    });
  });

  await fetch(url + "/request/get-all-department-requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    const request = response.json();
    request.then((data) => {
      const element = document.getElementById("agnecyRequest");
      htmlString = "";
      for (let i = 0; i < data.length; i++) {
        const agency = data[i];
        // agency.requestAgencyID === id;
        if (1) {
          if (agency.assignedAgencyID === null) {
            const parentString = agency.requestAgencyID.toString() + "parent";
            const resourceRequested = agency.departmentRequested;
            htmlString += `
            <div style="border: 1px solid grey;" class="card row parent d-flex justify-content-center align-items-center p-1" value="${parentString}">
              <div class="container m-2">
                <div class="row">
                  <div class="col-12 col-md-8 d-flex align-items-center">
                    <h5 class="m-0" style="overflow: hidden; white-space: nowrap;">${resourceRequested}</h5>
                  </div>
                  <div class="col-12 col-md-2">
                    <a class="btn btn-success m-0 acceptr" value="${agency._id}">
                      <i class="bi bi-check-circle"></i>
                    </a>
                  </div>
                  <div class="col-12 col-md-2">
                    <a class="btn btn-danger m-0 rejectr">
                      <i class="bi bi-x-circle"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            `;
          }
        }
      }
      element.innerHTML = htmlString;
    });
  });

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
        options.innerHTML += `<option value="${element._id}">${element.incidentType}</option>`;
      });
    });

  const submit = document.getElementById("assignAgent");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const incident = document.getElementById("incidents").value;
    var arrayAgentIds = [];
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      arrayAgentIds.push(checkboxes[i].id);
    }
    const data = {
      incidentId: incident,
      agentIds: arrayAgentIds,
    };
    console.log(data);
    // fetch(url + "/incident/assignagents", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  });

  const accepts = document.querySelectorAll(".acceptr");
  accepts.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const requestId = element.getAttribute("value");
      fetch(url + "/request/accept-resource-request/" + requestId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        console.log(response);
        response.json().then((data) => {
          console.log(data.error);
        });
      });
    });
  });

  const acceptd = document.querySelectorAll(".acceptd");
  acceptd.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const requestId = element.getAttribute("value");
      fetch(url + "/request/accept-department-request/" + requestId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        console.log(response);
        response.json().then((data) => {
          console.log(data.error);
        });
      });
    });
  });

  const rejectr = document.querySelectorAll(".rejectr");
  rejectr.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      element.parentElement.parentElement.parentElement.parentElement.remove();
    });
  });

  const rejectd = document.querySelectorAll(".rejectd");
  rejectd.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      element.parentElement.parentElement.parentElement.parentElement.remove();
    });
  });

  const ele = document.querySelectorAll(".parentR");
  ele.forEach((element) => {
    element.addEventListener("click", (e) => {
      getCoodinates(element.getAttribute("value"));
    });
  });

  async function getCoodinates(idt) {
    await fetch(url + "/user/all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const userData = response.json();
      userData.then((data) => {
        data.forEach((element) => {
          const stringAdd = element._id.toString() + "parentR";
          const coor = element.location.coordinates;
          if (stringAdd === idt) {
            map.setCenter(coor);

            const marker2 = new mapboxgl.Marker({
              color: "black",
            })
              .setLngLat(coor)
              .addTo(map);

            setTimeout(() => marker2.remove(), 3000);
          }
        });
      });
    });
  }

  const ele2 = document.querySelectorAll(".parent");
  ele2.forEach((element) => {
    element.addEventListener("click", (e) => {
      getCoodinates2(element.getAttribute("value"));
    });
  });

  async function getCoodinates2(idt) {
    await fetch(url + "/user/all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const userData = response.json();
      userData.then((data) => {
        data.forEach((element) => {
          const stringAdd = element._id.toString() + "parent";
          const coor = element.location.coordinates;
          if (stringAdd === idt) {
            map.setCenter(coor);
            const marker3 = new mapboxgl.Marker({
              color: "blue",
            })
              .setLngLat(coor)
              .addTo(map);

            setTimeout(() => marker3.remove(), 3000);
          }
        });
      });
    });
  }

  mapboxgl.accessToken = mapApiKey;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/primeonpeasea/clmnvvihm01ww01pjgjqggbwb",
    center: [lon, lat],
    zoom: 15,
  });
  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat([lon, lat])
    .addTo(map);
  map.addControl(new mapboxgl.NavigationControl());
});
