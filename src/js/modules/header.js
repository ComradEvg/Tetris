// export class Header {
//    constructor() {
//       this.burger = document.querySelector('.burger')
//       this.header = document.querySelector('.header')
//       this.menu = document.querySelector('.header-bottom')
//       this.widthClient = document.documentElement.clientWidth
//    }

//    headerBegin() {
//       this.burger.addEventListener('click', this.burgerSwitch.bind(this))
//    }

//    burgerSwitch() {
//       if (!this.burger.classList.contains('burger--unlock')) {
//          this.burger.classList.add('burger--unlock')
//          this.menuOpen()
//       }
//       else {
//          this.menuClose()
//       }

//    }
//    menuOpen() {
//       if (!this.menu.classList.contains('header-bottom--unlock')) {
//          this.menu.classList.add('header-bottom--unlock')
//          document.body.style.overflowY = 'hidden';
//       }
//    }
//    menuClose() {
//          this.burger.classList.remove('burger--unlock')
//          this.menu.classList.remove('header-bottom--unlock')
//          document.body.style.overflowY = 'visible';
//    }

// }
