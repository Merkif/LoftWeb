import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from './ScrollSmoother.min.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const sectionHeroTimeLine = gsap.timeline();
const sectionHeroTitle = gsap.utils.toArray('.section-hero__title *');

ScrollSmoother.create({
  wrapper: '.viewport',
  content: '.scroll-container',
  smooth: 1.2,
  effects: true
})

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
const horizontalSections = gsap.utils.toArray('.horizontal-scroll');
const cases = gsap.utils.toArray('.case');
const marquee = gsap.utils.toArray('.marquee__track');
let scrollTween;

horizontalSections.forEach(function (sec, i) {
  let thisPinWrap = sec.querySelector('.horizontal-scroll__pin');
  let thisAnimWrap = thisPinWrap.querySelector('.horizontal-scroll__container');
  let getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

  scrollTween = gsap.fromTo(thisAnimWrap, {
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
  }, {
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
    ease: "none",
    scrollTrigger: {
      trigger: sec,
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      scrub: 1.2,
    }
  });
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
ScrollTrigger.create({
  trigger: ".horizontal-scroll__section.section-services",
  containerAnimation: scrollTween,
  toggleActions: "play none none reverse",
  toggleClass: {
    className:"theme-light",
    targets:"html"
  },
  start: "center 60%"
});

const sectionServicesImg = document.querySelector('.horizontal-scroll__section .section-services__img');
gsap.from(sectionServicesImg, {
  x: 300,
  ease: "none",
  scrollTrigger: {
    trigger: sectionServicesImg,
    containerAnimation: scrollTween,
    scrub: 1.4,
    end: "left center",
    invalidateOnRefresh: true,
  }
});

const sectionServicesList = document.querySelector('.section-services__list');
gsap.to(sectionServicesList, {
  "--lines-height": "100%",
  ease: "none",
  scrollTrigger: {
    trigger: sectionServicesList,
    scrub: 1,
    start: "clamp(0 60%)",
    end: "clamp(0 59%)",
    invalidateOnRefresh: true,
  }
});

//section clients
const clientCards = gsap.utils.toArray('.client-card');
const ratingCards = gsap.utils.toArray('.rating-card');

const clientCardsStagger = gsap.from(clientCards, {
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
  stagger: {
    each: 0.2,
    from: "random",
    grid: "auto",
  },
  delay: 0.2,
  paused: true,
});

const ratingCardsStagger = gsap.from(ratingCards, {
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
  stagger: {
    each: 0.12,
    from: "random",
    grid: "auto",
  },
  delay: 0.15,
  paused: true,
});

class IntersectionObserverHandler {
  constructor(targetSelector, callback, options = {}) {
    this.targets = document.querySelectorAll(targetSelector);
    this.callback = callback;
    this.options = { ...options, threshold: options.threshold || 0.5 };
    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (!entry.target.__intersected || !this.options.once)) {
          entry.target.__intersected = true;
          this.callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.options);

    this.targets.forEach(target => {
      target.__intersected = false;
      this.observer.observe(target);
    });
  }
}


function clientCardsStaggerPlay(target) {
  clientCardsStagger.play();
}

function ratingCardsStaggerPlay(target) {
  ratingCardsStagger.play();
}

new IntersectionObserverHandler('.section-clients__list', clientCardsStaggerPlay, {
  root: null,
  rootMargin: '0px',
  threshold: 0.6,
  once: true,
});

new IntersectionObserverHandler('.section-rating__list', ratingCardsStaggerPlay, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
  once: true,
});

