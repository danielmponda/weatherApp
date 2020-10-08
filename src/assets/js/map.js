// import 'ol/ol.css';
// import * as ol from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import * as olProj from 'ol/proj';

const map = new ol.Map({
  view: new ol.View({
    // -13.985382399999999  33.751039999999996
    // center: olProj.transform([glon, glat], 'EPSG:4326', 'EPSG:3857'),

    center: [3757148.5865434078, -1572539.5624645718],
    zoom: 0,
    maxZoom: 0,
    minZoom: 7,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
})

map.on('click', function (e) {
  // console.log(e.coordinate)

  let lon = e.coordinate[0]
  let lat = e.coordinate[1]

  let newcords = olProj.transform([lon, lat], 'EPSG:3857', 'EPSG:4326')

  var center_4326 = olProj.fromLonLat([glon, glat])

  var kaddj = olProj.get('EPSG:4326')

  console.log(kaddj)

  console.log(lon + '-' + lat)

  console.log(center_4326)

  // let testcords = olProj.transform([glon, glat], 'EPSG:3857 ', 'EPSG:3857')
  // let testcords =  new OpenLayers.LonLat(lon, lat).transform(map.getProjectionObject() , new OpenLayers.Projection("EPSG:4326"));

  // console.log(testcords)

  // EPSG:4326  EPSG:3857, EPSG:102113   3857
  // console.log(ol.proj.fromLonLat([5.2, 52.25], 'EPSG:28992'));

  // console.log(lon + "-"+ lat);

  // console.log(testcords);

  // console.log(newcords);

  darkSkyResults(newcords[1], newcords[0])
})

// map.on('pointerdrag', function(e){
//   // console.log(e.coordinate)
//   let lon = e.coordinate[0];
//   let lat = e.coordinate[1];

//   console.log(lon + "-"+ lat);

//   let newcords = olProj.transform([lon, lat], 'EPSG:3857', 'EPSG:4326')

//   // console.log(ol.proj.fromLonLat([5.2, 52.25], 'EPSG:28992'));

//   console.log(newcords);

//   darkSkyResults(newcords[1], newcords[0] )

// })
