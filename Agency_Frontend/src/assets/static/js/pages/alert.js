let choices = document.querySelectorAll(".choices");
let initChoice;
for (let i = 0; i < choices.length; i++) {
  if (choices[i].classList.contains("multiple-remove")) {
    initChoice = new Choices(choices[i], {
      delimiter: ",",
      editItems: true,
      maxItemCount: -1,
      removeItemButton: true,
    });
  } else {
    initChoice = new Choices(choices[i]);
  }
}

$.extend(window.Parsley.options, {
  focus: "first",
  excluded:
    "input[type=button], input[type=submit], input[type=reset], .search, .ignore",
  triggerAfterFailure: "change blur",
  errorsContainer: function (element) {},
  trigger: "change",
  successClass: "is-valid",
  errorClass: "is-invalid",
  classHandler: function (el) {
    return el.$element.closest(".form-group");
  },
  errorsContainer: function (el) {
    return el.$element.closest(".form-group");
  },
  errorsWrapper: '<div class="parsley-error"></div>',
  errorTemplate: "<span></span>",
});

Parsley.on("field:validated", function (el) {
  var elNode = $(el)[0];
  if (elNode && !elNode.isValid()) {
    var rqeuiredValResult = elNode.validationResult.filter(function (vr) {
      return vr.assert.name === "required";
    });
    if (rqeuiredValResult.length > 0) {
      var fieldNode = $(elNode.element);
      var formGroupNode = fieldNode.closest(".form-group");
      var lblNode = formGroupNode.find(".form-label:first");
      if (lblNode.length > 0) {
        // change default error message to include field label
        var errorNode = formGroupNode.find(
          "div.parsley-error span[class*=parsley-]"
        );
        if (errorNode.length > 0) {
          var lblText = lblNode.text();
          if (lblText) {
            errorNode.html(lblText + " is required.");
          }
        }
      }
    }
  }
});

mapboxgl.accessToken = mapApiKey;
const coordinates = document.getElementById("coordinates");
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [lon, lat],
  zoom: 13,
});

const marker = new mapboxgl.Marker({
  draggable: true,
})
  .setLngLat([lon, lat])
  .addTo(map);

function onDragEnd() {
  const lngLat = marker.getLngLat();
  coordinates.style.display = "block";
  coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
}

marker.on("dragend", onDragEnd);

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  })
);

document.addEventListener("DOMContentLoaded", function () {
  // <section id="multiple-column-form ">
  //   <div class="row match-height">
  //     <div class="col-12">
  //       <div class="card mb-4">
  //         <div class="card-header">
  //           <h3 class="card-title">Fill the required details below.</h3>
  //         </div>
  //         <div class="card-body">
  //           <form class="form" data-parsley-validate>
  //             <div class="row">
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-type" class="form-label">
  //                     Alert Type
  //                   </label>
  //                   <select
  //                     class="choices form-select"
  //                     id="incident-type"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   >
  //                     <optgroup label="Natural Disasters">
  //                       <option value="earthquake">Earthquake</option>
  //                       <option value="hurricane">
  //                         Hurricane/Typhoon/Cyclone
  //                       </option>
  //                       <option value="tornado">Tornado</option>
  //                       <option value="flood">Flood</option>
  //                       <option value="tsunami">Tsunami</option>
  //                       <option value="wildfire">Wildfire</option>
  //                       <option value="drought">Drought</option>
  //                       <option value="landslide">Landslide</option>
  //                       <option value="volcanic">Volcanic Eruption</option>
  //                       <option value="avalanche">Avalanche</option>
  //                       <option value="heatwave">Extreme Heat Wave</option>
  //                       <option value="coldwave">Extreme Cold Wave</option>
  //                       <option value="hailstorm">Hailstorm</option>
  //                       <option value="epidemic">Epidemic/Pandemic</option>
  //                     </optgroup>
  //                     <optgroup label="Technological and Man-Made Incidents">
  //                       <option value="industrial">Industrial Accidents</option>
  //                       <option value="hazardous">
  //                         Hazardous Material Spill
  //                       </option>
  //                       <option value="nuclear">Nuclear Accident</option>
  //                       <option value="chemical">Chemical Explosion</option>
  //                       <option value="radiological">
  //                         Radiological Incident
  //                       </option>
  //                       <option value="biological">Biological Incident</option>
  //                       <option value="cybersecurity">
  //                         Cybersecurity Breach
  //                       </option>
  //                       <option value="transportation">
  //                         Transportation Accidents
  //                       </option>
  //                       <option value="infrastructure">
  //                         Infrastructure Failure
  //                       </option>
  //                       <option value="urbanfires">Urban Fires</option>
  //                       <option value="terrorism">Terrorism</option>
  //                       <option value="civilunrest">
  //                         Civil Unrest/Civil Disturbance
  //                       </option>
  //                       <option value="massgatherings">
  //                         Mass Gatherings/Events
  //                       </option>
  //                       <option value="oilspill">Oil Spill</option>
  //                     </optgroup>
  //                     <optgroup label="Health Emergencies">
  //                       <option value="infectiousdisease">
  //                         Outbreak of Infectious Diseases
  //                       </option>
  //                       <option value="publichealth">
  //                         Public Health Emergency
  //                       </option>
  //                       <option value="medicalemergency">
  //                         Medical Emergency
  //                       </option>
  //                       <option value="biologicalcontamination">
  //                         Biological Contamination
  //                       </option>
  //                     </optgroup>
  //                     <optgroup label="Environmental Incidents">
  //                       <option value="oilspills">Oil Spills</option>
  //                       <option value="pollution">Pollution</option>
  //                       <option value="toxicwaste">Toxic Waste Dumping</option>
  //                     </optgroup>
  //                     <optgroup label="Geological Events">
  //                       <option value="sinkhole">Sinkhole</option>
  //                       <option value="subsidence">Subsidence</option>
  //                     </optgroup>
  //                     <optgroup label="Meteorological Events">
  //                       <option value="hailstorm">Hailstorm</option>
  //                       <option value="blizzard">Blizzard</option>
  //                       <option value="tornado">Tornado</option>
  //                     </optgroup>
  //                     <optgroup label="Social and Humanitarian Crises">
  //                       <option value="refugeecrisis">Refugee Crisis</option>
  //                       <option value="foodcrisis">Food Crisis</option>
  //                       <option value="watercrisis">Water Crisis</option>
  //                       <option value="homelessness">
  //                         Homelessness Crisis
  //                       </option>
  //                     </optgroup>
  //                     <optgroup label="Other Incidents">
  //                       <option value="searchrescue">
  //                         Search and Rescue Operation
  //                       </option>
  //                       <option value="animalcontrol">
  //                         Animal Control/Rescue
  //                       </option>
  //                       <option value="utilityoutage">Utility Outage</option>
  //                     </optgroup>
  //                     <optgroup label="Other/Unknown">
  //                       <option value="other">Other/Unknown</option>
  //                     </optgroup>
  //                   </select>
  //                 </div>
  //               </div>
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-location" class="form-label">
  //                     Alert Location
  //                   </label>
  //                   <input
  //                     type="text"
  //                     id="incident-location"
  //                     class="form-control"
  //                     placeholder="Enter the location of the incident"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div class="row">
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-longtitude" class="form-label">
  //                     Longtitude
  //                   </label>
  //                   <input
  //                     type="number"
  //                     id="incident-longtitude"
  //                     class="form-control"
  //                     placeholder="Enter the longtitude of the incident"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   />
  //                 </div>
  //               </div>
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-latitude" class="form-label">
  //                     Latitude
  //                   </label>
  //                   <input
  //                     type="number"
  //                     id="incident-latitude"
  //                     class="form-control"
  //                     placeholder="Enter the latitude of the incident"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div class="row">
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-description" class="form-label">
  //                     Alert Description
  //                   </label>
  //                   <textarea
  //                     class="form-control"
  //                     id="incident-description"
  //                     rows="10"
  //                     placeholder="Enter the description of the incident"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   ></textarea>
  //                 </div>
  //               </div>
  //               <div class="col-md-6 col-12">
  //                 <div
  //                   id="map"
  //                   class="w-100 rounded-3 accordion-flush mb-3"
  //                   style="min-height: 300px"
  //                 ></div>
  //                 <pre id="coordinates" class="coordinates"></pre>
  //               </div>
  //             </div>
  //             <div class="row">
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-severity">
  //                     Alert Severity Level
  //                   </label>
  //                   <select
  //                     class="form-select"
  //                     id="incident-severity"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   >
  //                     <option value="low">Low</option>
  //                     <option value="medium">Medium</option>
  //                     <option value="high">High</option>
  //                     <option value="critical">Critical</option>
  //                   </select>
  //                 </div>
  //               </div>
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident date"> Alert Date and Time </label>
  //                   <input
  //                     type="datetime-local"
  //                     id="incident-date"
  //                     class="form-control"
  //                     placeholder="Enter the date and time of the incident"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div class="row mb-4">
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-impact" class="form-label">
  //                     Informant Name
  //                   </label>
  //                   <input
  //                     type="text"
  //                     id="incident-impact"
  //                     class="form-control"
  //                     placeholder="Enter the name of the informant"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   />
  //                 </div>
  //               </div>
  //               <div class="col-md-6 col-12">
  //                 <div class="form-group">
  //                   <label for="incident-impact" class="form-label">
  //                     Informant Contact
  //                   </label>
  //                   <input
  //                     type="number"
  //                     id="incident-impact"
  //                     class="form-control"
  //                     placeholder="Enter the contact of the informant"
  //                     required
  //                     data-parsley-required="true"
  //                     data-parsley-trigger="change"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //             <div class="row">
  //               <div class="col-12 d-flex justify-content-end">
  //                 <button type="submit" class="btn btn-primary me-1 mb-1">
  //                   Submit
  //                 </button>
  //                 <button
  //                   type="reset"
  //                   class="btn btn-light-secondary me-1 mb-1"
  //                 >
  //                   Reset
  //                 </button>
  //               </div>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>

  var incidentType = document.getElementById("incident-type");
  var incidentLocation = document.getElementById("incident-location");
  var incidentLongtitude = document.getElementById("incident-longtitude");
  var incidentLatitude = document.getElementById("incident-latitude");
  var incidentDescription = document.getElementById("incident-description");
  var incidentSeverity = document.getElementById("incident-severity");
  // var incidentDate = $("#incident-date").parsley();
  var reporterName = document.getElementById("reporter-name");
  var reporterContact = document.getElementById("reporter-contact");
  var incideId = document.getElementById("incident-id");
  // distance
  var submt = document.getElementById("submit");
  // assigned agent null

  const data = {
    incidentId: incideId.value,
    incidentType: incidentType.value,
    incidentLocation: incidentLocation.value,
    incidentLongtitude: incidentLongtitude.value,
    incidentLatitude: incidentLatitude.value,
    incidentDescription: incidentDescription.value,
    incidentSeverity: incidentSeverity.value,
    reporterName: reporterName.value,
    reporterContact: reporterContact.value,
    distance: 4,
    assignedAgent: null,
  };

  submt.addEventListener("click", function (event) {
    fetch(url + "/incident/add-incident", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
  });
});
