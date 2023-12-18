import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from './ScrollSmoother.min.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
let mm = gsap.matchMedia();
const sectionHeroTimeLine = gsap.timeline();
const sectionHeroTitle = gsap.utils.toArray('.section-hero__title *');

ScrollSmoother.create({
  wrapper: '.viewport',
  content: '.scroll-container',
  smooth: 1.2,
  effects: true,
  smoothTouch: 0.1
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

//scroll-sticker
const scrollSticker = document.querySelector('.scroll-sticker');
sectionHeroTimeLine.from(scrollSticker, {
  scale: 0,
  duration: 0.6,
  ease: "elastic.out(1,0.3)",
});

//desktop animations
mm.add("(min-width:1025px)", () => {
  //cursor
  gsap.set('.custom-cursor__follower', { xPercent: -50, yPercent: -50 });
  gsap.set('.custom-cursor__cursor', { xPercent: -50, yPercent: -50 });

  //horizontal section scroll
  let scrollTween;
  const horizontalSections = gsap.utils.toArray('.horizontal-scroll');
  const cases = gsap.utils.toArray('.case');
  const marqueeLight = gsap.utils.toArray('.marquee__item--light');
  const marqueeDark = gsap.utils.toArray('.marquee__item--dark');
  const cursorWrapper = document?.querySelector('.custom-cursor');
  const cursorFollower = cursorWrapper?.querySelector('.custom-cursor__follower');
  const cursor = cursorWrapper?.querySelector('.custom-cursor__cursor');
  const links = document?.querySelectorAll('a');
  const clientCards = gsap.utils.toArray('.client-card');
  const ratingCards = gsap.utils.toArray('.rating-card');
  const caseLinks = document.querySelectorAll('.case__link');
  const clientCardBtn = document.querySelectorAll('.client-card__action');

  window.addEventListener('mousemove', e => {
    gsap.to(cursor, 0.2, { x: e.clientX, y: e.clientY });
    gsap.to(cursorFollower, 0.9, { x: e.clientX, y: e.clientY });
  });

  links.forEach(a => {
    a.addEventListener('mousemove', () => {
      cursorWrapper.classList.add('custom-cursor--hover');
    })
    a.addEventListener('mouseleave', () => {
      cursorWrapper.classList.remove('custom-cursor--hover');
    })
  });

  caseLinks.forEach(link => {
    link.addEventListener('mousemove', () => {
      cursorWrapper.classList.add('custom-cursor--case');
    })
    link.addEventListener('mouseleave', () => {
      cursorWrapper.classList.remove('custom-cursor--case');
    })
  });

  clientCardBtn.forEach(btn => {
    btn.addEventListener('mousemove', () => {
      cursorWrapper.classList.add('custom-cursor--testimonial');
      if (btn.closest('.client-card').classList.contains('client-card--active')) {
        cursorWrapper.classList.add('custom-cursor--testimonial-close');
      } else {
        cursorWrapper.classList.remove('custom-cursor--testimonial-close');
      }
    })
    btn.addEventListener('mouseleave', () => {
      cursorWrapper.classList.remove('custom-cursor--testimonial');
      cursorWrapper.classList.remove('custom-cursor--testimonial-close');
    })
  });

  //horizontal sections
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

  sectionHeroTimeLine.to('.scroll-sticker__text', {
    rotate: 360,
    transformOrigin: "center",
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
    const caseContent = item.querySelectorAll('.case__title-text, .case__desc, .case__tags');
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
  marqueeLight.forEach((item) => {
    const track = item.querySelector('.marquee__track');
    gsap.from(track, {
      x: -1000,
      scrollTrigger: {
        trigger: item,
        containerAnimation: scrollTween,
        toggleActions: "play none none reverse",
        start: "clamp(0 100%)",
        end: "clamp(0 -40%)",
        scrub: 0
      }
    });
  });

  marqueeDark.forEach((item) => {
    const track = item.querySelector('.marquee__track');
    gsap.to(track, {
      x: -1000,
      scrollTrigger: {
        trigger: item,
        containerAnimation: scrollTween,
        toggleActions: "play none none reverse",
        start: "clamp(0 100%)",
        end: "clamp(0 -40%)",
        scrub: 0
      }
    });
  });

  //section services
  ScrollTrigger.create({
    trigger: ".horizontal-scroll__section.section-services",
    containerAnimation: scrollTween,
    toggleActions: "play none none reverse",
    toggleClass: {
      className: "theme-light",
      targets: "html"
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

  //client testimonials
  function toggleTestimonial(card) {
    card.classList.toggle('client-card--active');
    cursorWrapper.classList.toggle('custom-cursor--testimonial-close');
  }

  clientCards?.forEach(card => {
    const cardBtn = card.querySelector('.client-card__action');
    cardBtn.addEventListener('click', () => {
      clientCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard?.classList.remove('client-card--active');
        }
      });
      toggleTestimonial(card);

    });
  });

});
