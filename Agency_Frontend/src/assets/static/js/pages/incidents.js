let c = [];
document.addEventListener("DOMContentLoaded", function () {
  fetch(url + "/incident/getallincidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    const data = response.json();
    const table = document.getElementById("incidentHistory");

    table.innerHTML = "";

    data.then((data) => {
      data.forEach((element) => {
        if (element.distance < 5) {
          htmlString = `<tr>
        <td class="text-bold-500">${element.incidentId}</td>
        <td class="text-bold-500">${element.incidentType}</td>
        <td class="text-bold-500">${element.incidentLocation}</td>
        <td class="text-bold-500">${element.distance}</td>
        <td class="text-bold-500">${element.incidentDate.substring(0, 10)}</td>
        <td class="text-bold-500">${element.incidentSeverity}</td>
        <td class="text-bold-500">
          <button class="btn btn-primary" data-toggle="modal" data-target="#incidentModal" onclick="getIncidentDetails(${
            element.incidentId
          })">View</button>
        </td>
        <tr>`;
          table.innerHTML += htmlString;
          var feature = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                element.incidentLongitude,
                element.incidentLatitude,
              ],
            },
            properties: {
              title: "Danger Prone Area!",
            },
          };
          c.push(feature);
        }
      });
    });
  });
});

mapboxgl.accessToken = mapApiKey;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/primeonpeasea/clmnvvihm01ww01pjgjqggbwb",
  center: [lon, lat], // starting position [lng, lat]
  zoom: 14, // starting zoom
  // scrollZoom: false,
  // dragPan: false,
});

map.addControl(new mapboxgl.ScaleControl());

const marker1 = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);

var marker = new mapboxgl.Marker({});

const size = 200;
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 500;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.1;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
    context.fill();

    // Draw the inner circle.
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 100, 100, 1)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();

    return true;
  },
};

map.on("load", () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 1 });
  // Create an array to store the features
  // console.log(c);
  // Add the features to the source
  map.addSource("bruh", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: c,
    },
  });

  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "bruh",
    layout: {
      "icon-image": "pulsing-dot",
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 1.25],
      "text-anchor": "top",
    },
  });
});
