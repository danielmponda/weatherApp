import moment from 'moment'
export const method = {
  openWeatherApi: {
    key: '447f1d6cf3daf022a03b061d37cb17d7',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
  },

  darkSky: {
    key: '82230a13a430556496b2eaa6e79d0ee7',
    baseurl: 'https://api.darksky.net/forecast/',
  },
  tempWeatherIcon: (summary, time, offset) => {
    let tempWeatherIconNote = document.querySelectorAll('.weather-wrapper')

    let tempWeatherIcon = Array.from(tempWeatherIconNote)

    tempWeatherIcon[0].innerHTML = `<i class=" ${method.calcWeatherIcon(
      summary,
      time,
      offset
    )} temp-weather-icon"></i>`

    tempWeatherIcon[1].innerHTML = `<i class=" ${method.calcWeatherIcon(
      summary,
      time,
      offset
    )} temp-weather-icon"></i>`
  },
  animateValue: (id, start, end, duration) => {
    let range = end - start
    let current = start
    let increment = end > start ? 1 : -1
    let stepTime = Math.abs(Math.floor(duration / range))

    let objNode = document.querySelectorAll(id)
    let obj = Array.from(objNode)

    let timer = setInterval(function () {
      current += increment
      obj[0].innerHTML = current
      obj[1].innerHTML = current

      if (current == end) {
        clearInterval(timer)
      }
    }, stepTime)
  },
  calcWeatherIcon: (summary, time, offset) => {
    summary = summary.toLowerCase()

    // console.log(summary)

    const timeHour = moment(moment.unix(time))
      .utc()
      .utcOffset(offset)
      .format('HH')
    // moment(moment.unix(time)).format('HH');

    if (timeHour > 5 && timeHour < 17) {
      return summary == 'mostly cloudy'
        ? 'fas fa-cloud day'
        : summary == 'overcast'
        ? 'fas fa-cloud-sun day'
        : summary == 'clear'
        ? 'fas fa-sun day'
        : summary == 'partly cloudy'
        ? 'fas fa-cloud-sun day'
        : summary == 'cloudy'
        ? 'fas fa-cloud day'
        : summary == 'rain'
        ? 'fas fa-cloud-rain blue'
        : summary == 'snow'
        ? 'fas fa-slowflake day'
        : summary == 'sleet'
        ? 'fas fa-cloud-meatball day'
        : summary == 'wind'
        ? 'fas fa-wind day'
        : summary == 'fog'
        ? 'fas fa-cloud-smog day'
        : summary == 'humid'
        ? 'fas fa-cloud day'
        : 'fas fa-cloud-sun day'
    } else {
      return summary == 'mostly cloudy'
        ? 'fas fa-cloud-moon nyt'
        : summary == 'cvercast'
        ? 'fas fa-cloud-moon nyt'
        : summary == 'clear'
        ? 'fas fa-moon nyt'
        : summary == 'partly cloudy '
        ? 'fas fa-cloud-moon nyt'
        : summary == 'cloudy'
        ? 'fas fa-cloud-moon nyt'
        : summary == 'rain'
        ? 'fas fa-cloud-moon-rain nyt'
        : summary == 'snow'
        ? 'fas fa-slowflake nyt'
        : summary == 'sleet'
        ? 'fas fa-cloud-meatball nyt'
        : summary == 'wind'
        ? 'fas fa-wind nyt'
        : summary == 'fog'
        ? 'fas fa-cloud-meatball nyt'
        : summary == 'humid'
        ? 'fas fa-cloud nyt'
        : 'fas fa-cloud-moon nyt'
    }
  },
  showMenu: false,
  // console.log(showMenu)
  toggleMenu: function () {
    // console.log(method.showMenu)
    const menuBtn = document.querySelector('.menu-btn')

    const menu = document.querySelector('.menu')
    const menuNav = document.querySelector('.menu-nav')

    const navItems = document.querySelectorAll('.nav-item')

    // set the initial state of the Menu

    if (!method.showMenu) {
      // If ShowMenu is false
      menuBtn.classList.add('close') //
      menu.classList.add('show')
      menuNav.classList.add('show')
      navItems.forEach((item) => item.classList.add('show'))

      // Set the Menu state
      method.showMenu = true
      //  console.log(showMenu)
    } else {
      // If ShowMenu is True
      menuBtn.classList.remove('close')
      menu.classList.remove('show')
      menuNav.classList.remove('show')
      navItems.forEach((item) => item.classList.remove('show'))

      // set the Menu state
      method.showMenu = false
      //  console.log(showMenu)
    }
  },
  tempSymbSector: document.querySelector('.temp-symb-sector'),
  tempSymb: document.querySelector('.temp-symb'),

  coverter: function () {
    if (method.tempSymbSector.innerHTML == 'C') {
      method.tempSymbSector.innerHTML = 'F'
      method.tempSymb.innerHTML = 'C'
    } else {
      method.tempSymbSector.innerHTML = 'C'
      method.tempSymb.innerHTML = 'F'
    }
  },
}
