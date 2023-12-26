import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

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

resizableSwiper(
  '(max-width: 1024px)',
  '.swiper--clients',
  {
    modules: [Navigation],
    spaceBetween: 24,
    slidesPerView: 1.3,
    centeredSlidesBounds:true,
    centeredSlides:true,
    focusableElements:'input',
    navigation: {
      nextEl: '.swiper__button--next',
      prevEl: '.swiper__button--prev',
      disabledClass: 'swiper__button--disabled'
    },
    breakpoints: {
      500: {
        slidesPerView:2.3
      },
      590: {
        slidesPerView:3.3,
      }
    }
  }
);

resizableSwiper(
  '(max-width: 1024px)',
  '.swiper--rating',
  {
    modules: [Navigation],
    spaceBetween: 24,
    slidesPerView: 1.3,
    centeredSlidesBounds:true,
    centeredSlides:true,
    navigation: {
      nextEl: '.swiper__button--next',
      prevEl: '.swiper__button--prev',
      disabledClass: 'swiper__button--disabled'
    },
    breakpoints: {
      590: {
        slidesPerView:2,
      },
      725: {
        slidesPerView:2.4,
      },
      940: {
        slidesPerView:3,
      }
    }
  }
);
