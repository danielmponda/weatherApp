import { method } from './methods'

let theCityName, glat, glon

/////////////////////////////////////////////////////////////////////////////////
// 01 get location cords from the local machine
window.addEventListener('load', () => {
  // console.log(navigator.geolocation)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      glat = position.coords.latitude
      glon = position.coords.longitude

      openWeatherCoords(glat.toFixed(2), glon.toFixed(2))
    })
  } else {
  }
})

// 02 On window load Access lat & lon geolocation and fetch data from openWeatherApi and sent it to displayResults
function openWeatherCoords(lat, lon) {
  fetch(
    `${method.openWeatherApi.baseurl}weather?lat=${lat}&lon=${lon}&appid=${method.openWeatherApi.key}`
  )
    // fetch(`${method.openWeatherApi.baseurl}weather?q=${query}&units=metric&APPID=${method.openWeatherApi.key}`)
    .then(function (weather) {
      return weather.json()
    })
    .then(displayResults)
}

// 03 Get Input Search and Add keypress EventListener
let searchBtn = null
searchBtn = document.querySelector('.search-btn')
searchBtn.addEventListener('click', searchGetResults)

function searchGetResults() {
  // alert(searchinput.value);
  let query = searchinput.value
  query
    ? fetch(
        `${method.openWeatherApi.baseurl}weather?q=${query}&units=metric&APPID=${method.openWeatherApi.key}`
      )
        .then(function (weather) {
          return weather.json()
        })
        .then(displayResults)
    : ''
}

// Get Input Search and Add keypress EventListener
const searchinput = document.querySelector('input')
searchinput.addEventListener('keypress', getResults)

//  With the Results Send and API Request
function getResults(e) {
  let query
  e.keyCode == 13 ? (query = searchinput.value) : ''
  fetch(
    `${method.openWeatherApi.baseurl}weather?q=${query}&units=metric&APPID=${method.openWeatherApi.key}`
  )
    .then(function (weather) {
      return weather.json()
    })
    .then(displayResults)
}

// 04 Access City's Coord using data from openWeatherApi and send it to darkSkyResults
function displayResults(city) {
  const { lon, lat } = city.coord

  searchinput.value = ''
  glat = lat
  glon = lon
  theCityName = cityName[0].innerText = `${city.name}, ${city.sys.country}`
  cityName[1].innerText = `${city.name}, ${city.sys.country}`
  darkSkyResults(lat, lon)

  try {
    if (document.querySelector('.openlayer-map')) {
      OpenlayerMap(lon, lat)
    }
  } catch (e) {}
}
