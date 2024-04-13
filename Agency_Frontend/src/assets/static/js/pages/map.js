var style = "mapbox://styles/mapbox/streets-v12";
mapboxgl.accessToken = mapApiKey;

const map = new mapboxgl.Map({
  container: "map",
  style,
  center: [lon, lat],
  zoom: 13,
});

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  }),
  "top-left"
);
