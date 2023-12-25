import gsap from "gsap";

//menu animation
let mm = gsap.matchMedia();
const menuItem = gsap.utils.toArray('.menu__item');
const menuTl = gsap.timeline({
  paused: true,
  reversed: true,
});

mm.add(
  {
    isMobile: "(max-width:1024px)",
  },

  (context) => {
    if (context.conditions.isMobile) {
      menuTl.from(menuItem, {
        xPercent: 200,
        ease: "power4.out",
        opacity: 0,
        stagger: 0.12,
      });
    }
  }
);

class Menu {
  constructor(options = {}) {
    this.scrollY = 0;
    this.expanded = false;
    this.options = options;
    this.waitOnClose = options.waitOnClose || false;
    this.init();
  }

  init() {
    this.menuButton = this.options.menuButton || '.menu__button';
    this.menu = this.options.menu || '.menu__list--main';
    this.menuOpenClass = this.options.menuOpenClass || 'menu__list--open';
    this.onMenuOpen = this.options.onMenuOpen || (() => { });
    this.onMenuClose = this.options.onMenuClose || (() => { });

    this.menuButtonElement = document.querySelector(this.menuButton);
    this.menuElement = document.querySelector(this.menu);

    if (this.menuButtonElement) {
      this.menuButtonElement.addEventListener('click', this.toggleMenu.bind(this));
    }
  }

  openMenu() {
    if (!this.menuButtonElement || !this.menuElement) {
      return;
    }

    this.scrollY = window.scrollY;
    document.documentElement.style.setProperty('--window-scroll-y', `-${this.scrollY}px`);

    this.menuButtonElement.setAttribute('aria-expanded', 'true');
    this.menuButtonElement.setAttribute('aria-label', 'Закрыть меню');

    this.menuButtonElement.classList.toggle('menu__button--open', true);
    this.menuElement.classList.toggle(this.menuOpenClass, true);
    document.documentElement.classList.toggle('menu-open', true);

    this.onMenuOpen();
  }

  closeMenu() {
    if (!this.menuButtonElement || !this.menuElement) {
      return;
    }

    this.menuButtonElement.setAttribute('aria-expanded', 'false');
    this.menuButtonElement.setAttribute('aria-label', 'Открыть меню');

    if (this.waitOnClose) {
      return new Promise((resolve) => {
        menuTl.eventCallback('onReverseComplete', resolve).reverse();
      }).then(() => {
        this.handleMenuClosing();
      });
    } else {
      this.handleMenuClosing();
    }
  }

  handleMenuClosing() {
    this.menuButtonElement.setAttribute('aria-expanded', 'false');
    this.menuButtonElement.setAttribute('aria-label', 'Открыть меню');

    this.menuButtonElement.classList.toggle('menu__button--open', false);
    this.menuElement.classList.toggle(this.menuOpenClass, false);
    document.documentElement.classList.toggle('menu-open', false);

    window.scrollTo(0, this.scrollY);
    document.documentElement.style.removeProperty('--window-scroll-y');

    this.onMenuClose();
  }

  toggleMenu() {
    this.expanded = !this.expanded;
    this.expanded ? this.openMenu() : this.closeMenu();
  }
}

const menu = new Menu({
  menu: '.menu__container',
  menuOpenClass: 'menu__container--open',
  waitOnClose: true,
  onMenuOpen: () => {
    menuAnimPlay();
  },
});

function menuAnimPlay() {
  setTimeout(() => {
    menuTl.play();
  }, 400);
}
