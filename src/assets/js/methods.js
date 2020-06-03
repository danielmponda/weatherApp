export const method = {
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
