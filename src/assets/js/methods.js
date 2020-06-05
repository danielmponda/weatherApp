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
}
