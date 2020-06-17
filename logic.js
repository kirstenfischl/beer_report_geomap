// Load data
d3.csv("./txt.csv").then(function(beerData) {

  console.log(beerData);

  var countries = beerData.map(data => data.Country);

  console.log("countries", countries);

  beerData.forEach(function(data) {
    data.Country = +data.Country; 
    console.log("Name:", data.Country);
  });
}).catch(function(error) {
  console.log(error, data);
});



// Function to determine marker size based on consumption/production
function markerSize(beer_production) {
  return beer_production * 50;
}

function markerSize(beer_consumption) {
  return beer_consumption * 50;
}

// An array containing all of the information needed to create city and state markers
var tests = [
  {
    coordinates: [35.8617, 104.1954],
    country: {
      name: "China",
      beer_production: 38927,
      beer_consumption: 39362
    }
  },
  {
    coordinates: [37.0902, -95.7129],
    country: {
      name: "United States",
      beer_production:  21461,
      beer_consumption: 24029
    }
  }
];

// Define arrays to hold created city and state markers
var productionMarkers = [];
var consumptionMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < tests.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  productionMarkers.push(
    L.circle(tests[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(tests[i].country.beer_production)
    }).bindPopup("<h1>" + tests[i].country.name + "</h1> <hr> <h3>Production: " + tests[i].country.beer_production + "</h3>")
  );

  // Setting the marker radius for the city by passing population into the markerSize function
  consumptionMarkers.push(
    L.circle(tests[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(tests[i].country.beer_consumption)
    }).bindPopup("<h1>" + tests[i].country.name + "</h1> <hr> <h3>Consumption: " + tests[i].country.beer_consumption + "</h3>")
    );
}

// Define variables for our base layers
var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create two separate layer groups: one for cities and one for states
var production = L.layerGroup(productionMarkers);
var consumption = L.layerGroup(consumptionMarkers);

var baseMaps = {
  "Street Map": streetmap
};

// Create an overlay object
var overlayMaps = {
  "Beer Production": production,
  "Beer Consumption": consumption
};

// Define a map object
var myMap = L.map("map", {
  center: [15.5994, 8.6731],
  zoom: 2.5,
  layers: [streetmap, production, consumption]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
