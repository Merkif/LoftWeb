import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from './ScrollSmoother.min.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const sectionHeroTimeLine = gsap.timeline();
const sectionHeroTitle = gsap.utils.toArray('.section-hero__title *');


if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '.viewport',
    content: '.scroll-container',
    smooth: 1.2,
    effects: true
  })
}

//hero-section
sectionHeroTitle.forEach((item, index) => {
  sectionHeroTimeLine.from(item, {
    y: +100,
    duration: 1,
    ease: "power4.out",
    opacity: 0,
    delay: 0.8,
  }, 0.15 * index);
});

//horizontal section scroll
const horizontalContainer = document.querySelector('.horizontal-scroll__container');
const cases = gsap.utils.toArray('.case');
const marquee = gsap.utils.toArray('.marquee__track');
let scrollWidthValue = horizontalContainer.scrollWidth - window.innerWidth;

const scrollTween = gsap.to(horizontalContainer, {
  x: -(scrollWidthValue),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll",
    pin: true,
    scrub: 1.2,
    start: "top top",
    end: `+=${+ (scrollWidthValue)}`,
    invalidateOnRefresh: true,
    invalidateOnResize: true,
  }
});

//scroll-sticker
const scrollSticker = document.querySelector('.scroll-sticker');
sectionHeroTimeLine.from(scrollSticker, {
  scale: 0,
  duration: 0.6,
  ease: "elastic.out(1,0.3)",
});

sectionHeroTimeLine.to(scrollSticker, {
  rotate: 360,
  scrollTrigger: {
    trigger: scrollSticker,
    containerAnimation: scrollTween,
    start: "clamp(left center)",
    toggleActions: "play none none reverse",
    end: "0 -10%",
    scrub: 0.1,
  }
});

//cases
cases.forEach((item) => {
  const caseContent = item.querySelector('.case__content');
  const caseTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      containerAnimation: scrollTween,
      scrub: 0,
      toggleActions: "play none none reverse",
      start: "left center",
      end: "left left",
      toggleClass: "case--active",
      invalidateOnRefresh: true,
      invalidateOnResize: true,
    }
  });

  gsap.to(caseContent, {
    x: 100,
    ease: "none",
    scrollTrigger: {
      trigger: item,
      containerAnimation: scrollTween,
      scrub: 2,
      toggleActions: "play none none reverse",
      start: "left right",
      end: "left left",
    }
  });
});

//marquee
marquee.forEach((item) => {
  const marqueeTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      containerAnimation: scrollTween,
      toggleActions: "play none none reverse",
      start: "clamp(0 100%)",
      end: "clamp(0 -40%)",
      scrub: 0
    }
  });

  marqueeTimeLine.from(item, {
    x: gsap.utils.random([800, -800]),
  });
});

//section services
const sectionServicesImg = document.querySelector('.horizontal-scroll__sections .section-services__img');
gsap.from(sectionServicesImg, {
  x: 300,
  ease: "none",
  scrollTrigger: {
    trigger: sectionServicesImg,
    containerAnimation: scrollTween,
    scrub: 1.4,
    end: "left center",
    invalidateOnRefresh: true,
    invalidateOnResize: true,
  }
});

const sectionServicesList = document.querySelector('.section-services__list');
gsap.to(sectionServicesList, {
  "--lines-height": "100%",
  ease: "none",
  scrollTrigger: {
    trigger: sectionServicesList,
    scrub: 1,
    start: "clamp(top center 30%)",
    end: "clamp(top center 46%)",
    invalidateOnRefresh: true,
    invalidateOnResize: true,
  }
});

// //theme switcher
// const lightTheme = gsap.utils.toArray('[data-theme="light"]');
// lightTheme.forEach((item) => {
//   const lightThemeTimeLine = gsap.timeline({
//     scrollTrigger: {
//       trigger: item,
//       scrub: 3,
//       toggleActions: "play none none reverse",
//       start: "clamp(left bottom)",
//       end: "clamp(top -60%)",
//       toggleClass: {
//         className:'theme-light',
//         targets:'html'
//       },
//       invalidateOnRefresh: true,
//       invalidateOnResize: true,
//       markers:true
//     }
//   });
// });


