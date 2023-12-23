import smoother from "./gsap";

class MenuHandler {
  constructor(options = {}) {
    // this.scrollY = 0;
    this.expanded = false;
    this.options = options;
    this.init();
  }

  init() {
    this.menuButton = this.options.menuButton || '.menu__button';
    this.menu = this.options.menu || '.menu__list--main';
    this.onMenuOpen = this.options.onMenuOpen || (() => {});
    this.onMenuClose = this.options.onMenuClose || (() => {});

    this.menuButtonElement = document.querySelector(this.menuButton);
    this.menuElement = document.querySelector(this.menu);

    if (this.menuButtonElement) {
      this.menuButtonElement.addEventListener('click', this.toggleMenu.bind(this));
    }

    // if (this.menuElement) {
    //   this.syncHeight();
    //   window.addEventListener('resize', this.syncHeight.bind(this));
    // }
  }

  openMenu() {
    if (!this.menuButtonElement || !this.menuElement) {
      return;
    }

    // this.scrollY = window.scrollY;
    // document.documentElement.style.setProperty('--window-scroll-y', `-${this.scrollY}px`);

    this.menuButtonElement.setAttribute('aria-expanded', 'true');
    this.menuButtonElement.setAttribute('aria-label', 'Закрыть меню');

    this.menuButtonElement.classList.toggle('menu__button--open', true);
    this.menuElement.classList.toggle('menu__list--open', true);
    // document.documentElement.classList.toggle('is-locked', true);

    this.onMenuOpen();
  }

  closeMenu() {
    if (!this.menuButtonElement || !this.menuElement) {
      return;
    }

    this.menuButtonElement.setAttribute('aria-expanded', 'false');
    this.menuButtonElement.setAttribute('aria-label', 'Открыть меню');

    this.menuButtonElement.classList.toggle('menu__button--open', false);
    this.menuElement.classList.toggle('menu__list--open', false);
    // document.documentElement.classList.toggle('is-locked', false);

    // window.scrollTo(0, this.scrollY);
    // document.documentElement.style.removeProperty('--window-scroll-y');

    this.onMenuClose();
  }

  // syncHeight() {
  //   document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
  // }

  toggleMenu() {
    this.expanded = !this.expanded;
    this.expanded ? this.openMenu() : this.closeMenu();
  }
}

const menu = new MenuHandler({
  onMenuOpen() {
    smoother.paused(true);
  },
  onMenuClose() {
    smoother.paused(false);
  }
});
