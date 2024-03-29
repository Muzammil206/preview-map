///Display map
mapboxgl.accessToken = 'pk.eyJ1IjoibXV6YW1pbDIwNiIsImEiOiJjbGN5eXh2cW0wc2lnM290ZzJsZnNlbmxsIn0.o2Obvl7E_nQefSN34XsFmw';
const map = new mapboxgl.Map({
  container: 'map',
  style:  'mapbox://styles/mapbox/streets-v12',
  center: [9.0820, 8.6753],
  zoom: 5
});
//changing map style///////
// const changeMap = function(){
//   const layerList = document.getElementById('menu');
//  const inputs = layerList.getElementsByTagName('input');
  
//   for (const input of inputs) {
//   input.onclick = (layer) => {
//   const layerId = layer.target.id;
//   map.setStyle('mapbox://styles/mapbox/' + layerId);
//   };

//   }
// }
// changeMap()

let lat
let log
/// when user click on somewhere on the map


let hoveredStateId = null;
 
////add geojson data
 map.on('load', function()  {
    map.addSource('states', {
        'type': 'geojson',
        // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
        'data': 'GRID3_Nigeria_-_Local_Government_Area_Boundaries.geojson'
        // 'data': 'https://services3.arcgis.com/BU6Aadhn6tbBEdyk/arcgis/rest/services/NGA_LGA_Boundaries_2/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
        

    })
    

    map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'states',
        'layout': {},
        'paint': {
        // 'fill-color': '#627BC1',
        'fill-color': '#FFFFFF',
        'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.5
        ]
        }
        });

    
    
    map.addLayer({
        'id': 'state-borders',
        'type': 'line',
        'source': 'states',
        'layout': {},
        'paint': {
        'line-color': '#627BC1',
        'line-width': 2
    }
    });
 
    
    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
//     map.on('mousemove', 'state-fills', (e) => {
//         if (e.features.length > 0) {
//         if (hoveredStateId !== null) {
//         map.setFeatureState(
//         { source: 'states', id: hoveredStateId },
//         { hover: false }
//         );
//         }
//         hoveredStateId = e.features[0].id;
//         map.setFeatureState(
//         { source: 'states', id: hoveredStateId },
//         { hover: true }
//         );
//         }
//         });
         
//     // When the mouse leaves the state-fill layer, update the feature state of the
//     // previously hovered feature.
//     map.on('mouseleave', 'state-fills', () => {
//     if (hoveredStateId !== null) {
//     map.setFeatureState(
//     { source: 'states', id: hoveredStateId },
//     { hover: false }
//     );
//     }
//     hoveredStateId = null;
//     });
    

 })

 ///when user click  on each of  the local goverment

map.on('click', 'state-fills', function(e) {
  const features = e.features;
  const feature = features[0];
  const popup = new mapboxgl.Popup(e)

  .setLngLat(e.lngLat)
  .setLngLat(e.lngLat)
    .setHTML(`
     <div class=" font-serif">
      <h1 class=" font-bold text-center">properties</h1>
      <p class=" capitalize  ">Id:${feature.properties.uniq_id}</p>
      <p>Time-stamp:${feature.properties.timestamp}</p>
      <p>local government:${feature.properties.lganame}</p>
      <p>lgacode:${feature.properties.lgacode}</p>
      <p>State:${feature.properties.statename}</p>
      <p>Global-id:${feature.properties.globalid}</p>
    </div>`)
  .addTo(map);

popup.addTo(map)
});


///search menu
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  })
  );

  setTimeout(function() {
    // Once the map is ready, add the "map-loaded" class to the map container
    document.getElementById("preload").classList.add("hidden");
}, 4000);

