document.addEventListener("DOMContentLoaded", async function () {
  await fetch(url + "/agents/get-all-agents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    const data = response.json();

    data.then((data) => {
      var agentsTable = document.getElementById("agentsTable");
      data.forEach((element) => {
        // element.agentAgencyID === agencyId
        if (1) {
          agentsTable.innerHTML += `
            <tr>
                <td class="text-bold-500">${element.agentID}</td>
                <td class="text-bold-500">${element.agentName}</td>
                <td class="text-bold-500">${element.agentRole}</td>
                <td class="text-bold-500">${element.agentStatus}</td>
                <td class="text-bold-500">${element.email}</td>
                <td class="text-bold-500">${element.currentAssigned}</td>
                <td>
                <div class="btn">
                    <a href="edit-agent.html"
                    ><i class="iconly-boldEdit"></i
                    ></a>
                </div>
                </td>
            </tr>
          `;
        }
      });
    });
  });
});
