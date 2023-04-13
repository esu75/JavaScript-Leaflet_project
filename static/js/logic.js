//Author: Esubalew Adal

// Objective: Create Earthquake Visualization

var myMap = L.map("map", {
    center: [36.778259, -119.417931],
    zoom: 13
  });
  // Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  // Load the GeoJSON data.
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'





// Array to hold the magnitudes and the depth
var magAry = []
var depthAry = []

//Read (get) the JSON file using D3

d3.json(url).then(function(data){
    // get the features
var feature = data.features
//Iterate through the JSON file for all features

for (var i=0;i<feature.length; i++){
    var magnitude = feature[i].properties.mag
    var depth = feature[i].geometry.coordinates[2]
    var coordinates = [feature[i].geometry.coordinates[1], feature[i].geometry.coordinates[0]]
    var place = feature[i].properties.place
    magAry.push(magnitude);
    depthAry.push(depth)
    //Getting the max mag 
    var maxValuesMagnitude = d3.max(magAry)
    //Getting the max depth 
    var maxDepth = d3.max(depthAry)
    // console.log(maxValuesMagnitude)
    // console.log(maxDepth)


function markerColor(depth){
    if(depth >=-10 && depth<10) return "#98ee00"
    
    else if (depth >=10&& depth<30) return "#d4ee00"
    
    else if (depth >=30&& depth<50) return "#eecc00"
    
    else if (depth >=50&& depth<70) return "#FFAC1C"
   
    else if (depth >= 70&& depth<90) return "#FF9933"
    
   // else if (depth >=90) return 'orange';
    else return "#F42C38"
    
};

    //create circular markers
    options = {
        color:'markerColor(depth)',
        fillOpacity:.75,
        fillColor:markerColor(depth),
        radius:magnitude*15000
    }
    L.circle(coordinates, options).bindPopup(`<h1>Magnitude: ${magnitude}</h1> <hr> <h3>Place: ${place}</h3>`).addTo(myMap);
}
// });




var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    depth = [-10, 10, 30, 50, 70, 90];
    labels = [];
    legendInfo = "<strong> Legend </strong> <hr>";
    div.innerHTML = legendInfo;
    // push to labels array as list item
    for (var i = 0; i < depth.length; i++) {
        console.log(depth[i] + 1)
        labels.push('<li style="background-color:' + markerColor(depth[i] + 1) + '"> <span>' + depth[i] + (depth[i + 1]
             ? '&ndash;' + depth[i + 1] + '' : '+') + '</span></li>');
    }
    // add label items to the div under the <ul> tag
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};
// Add legend to the map
legend.addTo(myMap);

});


