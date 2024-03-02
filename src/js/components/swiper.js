import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const swiperEl = document?.querySelector('.swiper');
const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
  let swiper;

  breakpoint = window.matchMedia(breakpoint);

  const enableSwiper = function (className, settings) {
    swiper = new Swiper(className, settings);

    if (callback) {
      callback(swiper);
    }
  }

  const checker = function () {
    if (breakpoint.matches) {
      return enableSwiper(swiperClass, swiperSettings);
    } else {
      if (swiper !== undefined) swiper.destroy(true, true);
      return;
    }
  };

  breakpoint.addEventListener('change', checker);
  checker();
}
const swiperOptions = {
  modules: [Navigation],
  spaceBetween: 24,
  slidesPerView: 1.3,
  centeredSlidesBounds: true,
  centeredSlides: true,
  focusableElements: 'input',
  navigation: {
    nextEl: '.swiper__button--next',
    prevEl: '.swiper__button--prev',
    disabledClass: 'swiper__button--disabled'
  },
  breakpoints: {
    540: {
      slidesPerView: 2,
    },
    725: {
      slidesPerView: 2.4,
    },
    940: {
      slidesPerView: 3,
    }
  }
}

if (swiperEl) {
  resizableSwiper(
    '(max-width: 1024px)',
    '.swiper--clients',
    swiperOptions
  );

  resizableSwiper(
    '(max-width: 1024px)',
    '.swiper--rating',
    swiperOptions
  );
}
