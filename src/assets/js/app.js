/* eslint-disable */

import { method } from './methods'
import { output } from './outputs'

// State
let theCityName, glat, glon
// used for both city and zonetime
const cityNameNode = document.querySelectorAll('.cityname')

const cityName = Array.from(cityNameNode)
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

////////////////Search By Auto geolocation/////////////////
///////////////////////////////////////////////////////////

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

////////////////Search By Input onClick/////////////////////
///////////////////////////////////////////////////////////

// 03 Get Input Search and Add keypress EventListener
let searchBtn = null
searchBtn = document.querySelector('.search-btn')
searchBtn.addEventListener('click', searchGetResults)

function searchGetResults() {
  // alert(searchinput.value);
  const query = searchinput.value
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

////////////////Search By Input on Enter //////////////////
///////////////////////////////////////////////////////////

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

////////////////Search By Input on Enter //////////////////
///////////////////////////////////////////////////////////

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

// OpenlayerMap

const OpenlayerMap = (lon, lat) => {
  // <div id="map" class="map">

  const mapSection = document.querySelector('.map-section-a')
  const empty = document.querySelector('.empty')

  try {
    if (document.querySelector('#map')) {
      document
        .querySelector('#map')
        .parentNode.removeChild(document.querySelector('#map'))
    }
  } catch (e) {}

  const mapholder = document.createElement('div')
  mapholder.classList = 'map'
  mapholder.id = 'map'

  mapSection.insertBefore(mapholder, empty)

  var map = new ol.Map({
    // div target
    target: 'map',
    // layers
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    // view
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]),
      zoom: 10,
    }),
  })

  map.on('click', function (e) {
    // console.log(e.coordinate)
    let lon = e.coordinate[0]
    let lat = e.coordinate[1]
    // console.log(lon,lat)
    let newcords = ol.proj.transform([lon, lat], 'EPSG:3857', 'EPSG:4326')
    // darkSkyResults(newcords[1], newcords[0] )
    openWeatherCoords(newcords[1], newcords[0])
  })
}

// Add a sticky to the nav bar
window.onscroll = function () {
  myFunction()
}

var header = document.querySelector('nav')
var mainn = document.querySelector('main')
var thesearchbar = document.querySelector('.search-bar')
var sticky = header.offsetTop

function myFunction() {
  // console.log(sticky)
  // console.log(window.pageYOffset)

  if (window.pageYOffset > sticky) {
    header.classList.add('sticky')
    mainn.classList.add('fixer')
  } else {
    header.classList.remove('sticky')
    mainn.classList.remove('fixer')
  }
}

////////////////////////// firebaseConfig ////////////////////////
/////////////////////////////////////////////////////////////////

var firebaseConfig = {
  apiKey: 'AIzaSyBe6Pw_F6hr2kywHS_FJXa5JrNZVYCyijU',
  authDomain: 'portfoliocontactform-beb39.firebaseapp.com',
  databaseURL: 'https://portfoliocontactform-beb39.firebaseio.com',
  projectId: 'portfoliocontactform-beb39',
  storageBucket: 'portfoliocontactform-beb39.appspot.com',
  messagingSenderId: '87529637836',
  appId: '1:87529637836:web:68b29936dab1e3e474ff69',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

////////////////////////// Contact Form /////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// Conatact Form on Submit call submitFrom

document.getElementById('contactform').addEventListener('submit', submitFrom)

// function to get Input Value
function getInputValue(id) {
  return document.getElementById(id).value
}

function submitFrom(e) {
  e.preventDefault()
  console.log('hello')
  var userName = getInputValue('userName')
  var userEmail = getInputValue('userEmail')
  var userMessage = getInputValue('userMessage')

  console.log(userName, userEmail, userMessage)
  // Send data to firebase
  saveMessage(userName, userEmail, userMessage)

  // reset form input
  document.getElementById('contactform').reset()
}

////////////////////////// FireBase DB //////////////////////////
/////////////////////////////////////////////////////////////////

// Creating a table / Ref
var messagesRef = firebase.database().ref('messages')

// save message to firebase
function saveMessage(name, email, message) {
  // send data to table message
  var newMessageRef = messagesRef.push()
  // set data
  newMessageRef.set({
    name: name,
    email: email,
    message: message,
  })
}

////////////////////////// Menu /////////////////////////////////
/////////////////////////////////////////////////////////////////

const menuBtn = document.querySelector('.menu-btn') // Menu Button
const menu = document.querySelector('.menu') // Menu Wrapper
const menuNav = document.querySelector('.menu-nav') // Nav Section
const navItems = document.querySelectorAll('.nav-item') // Nav List

// Set Initail State of Menu
let showMenu = false

const toggleMenu = () => {
  if (!showMenu) {
    menuBtn.classList.add('close')
    menu.classList.add('show')
    menuNav.classList.add('show')
    menu.classList.add('show')
    navItems.forEach((item) => item.classList.add('show'))

    showMenu = true // Set Menu Off
  } else {
    menuBtn.classList.remove('close')
    menu.classList.remove('show')
    menuNav.classList.remove('show')
    menu.classList.remove('show')
    navItems.forEach((item) => item.classList.remove('show'))

    showMenu = false // Set Menu On
  }
}

// Menu Button Onclick call toggleMenu
menuBtn.addEventListener('click', toggleMenu)

// On click on each link also call toggleMenu
navItems.forEach((item) =>
  item.firstElementChild.addEventListener('click', toggleMenu)
)
