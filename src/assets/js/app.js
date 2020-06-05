import { method } from './methods'
import { output } from './outputs'

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

  // send city coords to the OpenlayerMap
  try {
    if (document.querySelector('.openlayer-map')) {
      OpenlayerMap(lon, lat)
    }
  } catch (e) {}
}

// 05 Fetch new data using the darkskyApi
function darkSkyResults(lat, lon) {
  // Forecast Request : returns the current weather forecast for the next week.
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  fetch(`${proxy}${method.darkSky.baseurl}${method.darkSky.key}/${lat},${lon}`)
    .then(function (darkSkyweather) {
      return darkSkyweather.json()
    })
    .then(displaydarkSkyResults)
}

function displaydarkSkyResults(city) {
  //  console.log(city)
  // if theCityName is searched/set do nothing else display city.timezone
  theCityName
    ? ''
    : (cityName[0].innerText = city.timezone)(
        (cityName[1].innerText = city.timezone)
      )
  // theCityName ? cityName.innerText = "city" : "";
  output.currentItems(city)
  output.dailyItems(city.daily)
  hourcaller(city.currently.time)
}

// Onclick on the dailyItems
const dayy = document.querySelector('.daily-items-container')
dayy.addEventListener('click', selectDate)

function selectDate(e) {
  const date = e.target.firstElementChild.innerText
  hourcaller(date)
}

function hourcaller(date) {
  let day = document.querySelectorAll('.eachDay')
  var eachDayArr = Array.prototype.slice.call(day)
  // console.log(eachDayArr);

  eachDayArr.forEach((element) => {
    element.classList.remove('wow-im-learing')
  })

  let nowDay = eachDayArr.filter((element) => {
    if (element.firstElementChild.innerText == date) {
      return true
    }
  })

  try {
    if (nowDay) {
      nowDay[0].classList.add('wow-im-learing')
    }
  } catch (e) {}

  //  Time Machine Request : returns the observed or forecast weather conditions for a date in the past or future.
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  fetch(
    `${proxy}${method.darkSky.baseurl}${method.darkSky.key}/${glat},${glon},${date}`
  )
    .then(function (darkSkyweather) {
      return darkSkyweather.json()
    })
    .then(setNewHourly)
}

function setNewHourly(newData) {
  output.hourlyItems(newData)
  output.detailsItems(newData)
}
