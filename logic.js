// Load data

var csvData = [];
var csvData2 = []
// Define arrays to hold markers
var productionMarkers = [];
var consumptionMarkers = [];

d3.csv("./Kirin_Beer_Data.csv").then((beerData) =>{
  csvData = beerData;
}).then(myFunction);


function myFunction(){
  csvData.forEach(function(data) {
    data.Production = +data.Production_Volume_2018;
    data.Production_Rank = +data.Production_Rank_2018;
    data.Consumption = +data.Consumption_Volume_2018;
    data.Consumption_Rank = +data.Consumption_Rank_2018;
    data.Latitude = +data.Latitude;
    data.Longitude = +data.Longitude;

    csvData2.push(
      {
        coordinates: [data.Latitude, data.Longitude],
        name: data.Country,
        production: data.Production,
        prod_rank: data.Production_Rank,
        consumption: data.Consumption,
        con_rank: data.Consumption_rank
      }
    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  });

  console.log(csvData)
  console.log(csvData.length)
for (var i = 0; i < csvData2.length; i++) {
  console.log(csvData2[i]["production"]);
  productionMarkers.push(
    L.circle(csvData2[i].coordinates, {
      stroke: true,
      fillOpacity: 0,
      color: "blue",
      fillColor: "yellow",
      radius:csvData2[i]["production"]*50
    }).bindPopup("<h1>" + csvData2[i].name + "</h1> <hr> <h3>Production: " + csvData2[i].production + "</h3>")
  );


  consumptionMarkers.push(
    L.circle(csvData2[i].coordinates, {
      stroke: false,
      fillOpacity: .5,
      color: "red",
      fillColor: "red",
      radius: csvData2[i]["consumption"]*50
    }).bindPopup("<h1>" + csvData2[i].name + "</h1> <hr> <h3>Consumption: " + csvData2[i].consumption + "</h3>")
    );
};
bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

// Define variables for our base layers
var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    noWrap:true,
    maxBounds: bounds,

    accessToken: API_KEY
});

// Create production and consumption layer
var production_layer = L.layerGroup(productionMarkers);
var consumption_layer = L.layerGroup(consumptionMarkers);

var baseMaps = {
  "Street Map": streetmap
};

// Create an overlay object
var overlayMaps = {
  "Beer Production": production_layer,
  "Beer Consumption": consumption_layer
};


// Define a map object
var myMap = L.map("map", {
  center: [15.5994, 8.6731],
  zoom: 2,
  worldCopyJump : false,
  maxBounds: bounds,
  layers: [streetmap, production_layer, consumption_layer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
}
  


