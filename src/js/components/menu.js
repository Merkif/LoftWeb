import gsap from "gsap";
import './swiped-events';

//menu animation
let mm = gsap.matchMedia();
const menuContainer = document?.querySelector('.menu__container');
const menuTl = gsap.timeline({
  paused: true,
  reversed: true,
});

mm.add(
  {
    isMobile: "(max-width:1024px)",
    isDesktop: "(min-width:1025px)",
  },

  (context) => {
    if (context.conditions.isDesktop) {
      const menuItems = gsap.utils.toArray('.menu--hamburger .menu__item');
      menuTl.from(menuItems, {
        x:50,
        ease: "power4.out",
        opacity: 0,
        stagger: 0.05,
      });
    }
    else if (context.conditions.isMobile) {
      const menuItems = gsap.utils.toArray('.menu__item');
      menuTl.from(menuItems, {
        xPercent: 200,
        ease: "power4.out",
        opacity: 0,
        stagger: 0.12,
      });
      closeOnSwipedRight(menuContainer);
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

    if(mm.contexts[0].conditions.isMobile) {
      this.scrollY = window.scrollY;
      document.documentElement.style.setProperty('--window-scroll-y', `-${this.scrollY}px`);
      document.documentElement.classList.toggle('menu-open', true);
    }

    this.menuButtonElement.setAttribute('aria-expanded', 'true');
    this.menuButtonElement.setAttribute('aria-label', 'Закрыть меню');

    this.menuButtonElement.classList.toggle('menu__button--open', true);
    this.menuElement.classList.toggle(this.menuOpenClass, true);

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

    if(mm.contexts[0].conditions.isMobile) {
      document.documentElement.classList.toggle('menu-open', false);
      window.scrollTo(0, this.scrollY);
      document.documentElement.style.removeProperty('--window-scroll-y');
    }

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

function closeOnSwipedRight(el) {
  el.addEventListener('swiped-right', function(e) {
    menu.toggleMenu();
  });
}
