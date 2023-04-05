///Display map
mapboxgl.accessToken = 'pk.eyJ1IjoibXV6YW1pbDIwNiIsImEiOiJjbGN5eXh2cW0wc2lnM290ZzJsZnNlbmxsIn0.o2Obvl7E_nQefSN34XsFmw';
const map = new mapboxgl.Map({
  container: 'map',
  style:  'mapbox://styles/mapbox/streets-v12',
  center: [-100.486052, 37.830348],
  zoom: 2
});

let lat
let log
/// when user click on somewhere on the map
map.on('click', function(e) {
    console.log(e)
    console.log('Lat: ' + e.lngLat.lat + ', Lng: ' + e.lngLat.lng);
    lat = 'Lat: ' + e.lngLat.lat
    log =  'Lng: ' + e.lngLat.lng
    console.log(lat, log)


    const popup = new mapboxgl.Popup(e)
  
  .setLngLat(e.lngLat)
  .setHTML( ` <div class="pop-up h-auto p-4 gap-2 font-sans">
    <p>logitude:${log} </p>
    <p>latitude: ${lat}</p>
    <p>area: </p>
    </div>`)
  .addTo(map);

  popup.addTo(map)
 });





 ;





  