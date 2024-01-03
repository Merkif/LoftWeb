import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from './ScrollSmoother.min.js';
import SplitType from 'split-type'

gsap.config({ nullTargetWarn: false, trialWarn: false, });
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//scroll Smoother
if (ScrollTrigger.isTouch !== 1) {
  let smoother = ScrollSmoother.create({
    wrapper: '.viewport',
    content: '.scroll-container',
    smooth: 1.2,
    effects: false,
  });
}

let mm = gsap.matchMedia();
const sectionHeroTimeLine = gsap.timeline();
const sectionHeroTitle = gsap.utils.toArray('.section-hero__title *');
let scrollTween = null;
const horizontalSections = gsap.utils.toArray('.horizontal-scroll');
const cases = gsap.utils.toArray('.case--main');
const marqueeLight = gsap.utils.toArray('.marquee__item--light');
const marqueeDark = gsap.utils.toArray('.marquee__item--dark');
const cursorWrapper = document?.querySelector('.custom-cursor');
const cursorFollower = cursorWrapper?.querySelector('.custom-cursor__follower');
const cursor = cursorWrapper?.querySelector('.custom-cursor__cursor');
const links = document?.querySelectorAll('a, .footer__links, .menu__list');
const clientCards = gsap.utils.toArray('.client-card');
const ratingCards = gsap.utils.toArray('.rating-card');
const caseLinks = document?.querySelectorAll('.case__link');
const clientCardBtn = document?.querySelectorAll('.client-card__action');
const scrollSticker = gsap.utils.toArray('.scroll-sticker');
const testimonialsContainer = document?.querySelector('.clients-list');
const headerImg = gsap.utils.toArray('.c-header__img, .c-header__grid');
const agencyFigure = gsap.utils.toArray('.l-agency__figure');
const splitText = new SplitType('.split-title', { types: 'words, chars' });
const splitTitle = gsap.utils.toArray('.split-title');
const agencyHero = SplitType.create('.l-agency__headline--hero, .l-agency__desc--hero', { types: 'words, chars' });
const agencyTl = gsap.timeline({});
const projectCards = gsap.utils.toArray('.project-list__item');
const archiveTable = gsap.utils.toArray('.archive__table tr');

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
sectionHeroTimeLine.from(scrollSticker, {
  scale: 0,
  duration: 0.6,
  ease: "elastic.out(1,0.3)",
});

mm.add(
  {
    isMobile: "(max-width:1024px)",
    isDesktop: "(min-width:1025px)",
  },

  (context) => {
    if (context.conditions.isDesktop) {
      //cursor
      gsap.set('.custom-cursor__follower', { xPercent: -50, yPercent: -50 });
      gsap.set('.custom-cursor__cursor', { xPercent: -50, yPercent: -50 });

      window.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        gsap.to(cursor, {
          x: clientX,
          y: clientY
        });

        gsap.to(cursorFollower, {
          x: clientX,
          y: clientY,
          duration: .4,
          ease: "sine.out",
        });
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

      sectionHeroTimeLine.to('.scroll-sticker__text--horizontal', {
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

        gsap.fromTo(caseContent, {
          x: 200,
        }, {
          x: -110,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            scrub: 0.1,
            toggleActions: "play none none reverse",
            start: "clamp(0 100%)",
            end: "clamp(0 0%)",
          }
        });
      });

      //marquee
      function createMarqueeAnimation(item, x, animationType) {
        const track = item.querySelector('.marquee__track');

        const animationParams = {
          x,
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            toggleActions: "play none none reverse",
            start: "clamp(0 100%)",
            end: "clamp(0 -65%)",
            scrub: 0,
          }
        };

        if (animationType === 'from') {
          gsap.from(track, animationParams);
        } else if (animationType === 'to') {
          gsap.to(track, animationParams);
        }
      }

      function animateMarquee(items, x, animationType) {
        items.forEach((item) => {
          createMarqueeAnimation(item, x, animationType);
        });
      }

      animateMarquee(marqueeLight, -1200, 'from');
      animateMarquee(marqueeDark, -1200, 'to');

      const sectionServicesImg = document?.querySelector('.horizontal-scroll__section .section-services__img');
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

      const sectionServicesList = document?.querySelector('.section-services__list');
      gsap.to(sectionServicesList, {
        "--lines-height": context.conditions.isDesktop ? "100%" : '0',
        ease: "none",
        scrollTrigger: {
          trigger: sectionServicesList,
          scrub: 1,
          start: "clamp(0 60%)",
          end: "clamp(0 59%)",
          invalidateOnRefresh: true,
        }
      });

      //header img
      headerImg.forEach(img => {
        gsap.fromTo(img, {
          y: 150,
        }, {
          y: -220,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: "0 90%",
            scrub: 1,
          }
        })
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

      //client testimonial
      testimonialsContainer?.addEventListener('click', handleTestimonialClick);

      //project-cards
      projectCards.forEach(card => {
        gsap.from(card, {
          opacity: 0,
          y: 200,
          scale: 0.98,
          scrollTrigger: {
            scrub: true,
            trigger: card,
            start: "clamp(top 100%)",
            end: "clamp(top 30%)"
          }
        })
      });

      //archive table
      archiveTable.forEach(tr => {
        gsap.from(tr, {
          opacity: 0,
          scale: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            scrub: true,
            trigger: tr,
            start: "clamp(top 100%)",
            end: "clamp(top 30%)",
          }
        })
      });

      return () => {
        window.location.reload()
      }
    }
    else if (context.conditions.isMobile) {
      //header img
      headerImg.forEach(img => {
        gsap.fromTo(img, {
          y: 50,
        }, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: "0 90%",
            scrub: 1,
          }
        })
      });

      //scroll sticker
      sectionHeroTimeLine.to('.scroll-sticker__text--vertical', {
        rotate: 360,
        transformOrigin: "center",
        scrollTrigger: {
          trigger: scrollSticker,
          start: "clamp(0 80%)",
          end: "clamp(0 -10%)",
          toggleActions: "play none none reverse",
          scrub: 0.3,
        }
      });

      //client testimonial
      testimonialsContainer?.removeEventListener('click', handleTestimonialClick);

      //marquee
      function createMarqueeAnimation(item, x, animationType) {
        const track = item.querySelector('.marquee__track');
        const animationParams = {
          x,
          scrollTrigger: {
            trigger: item,
            toggleActions: "play none none reverse",
            start: "clamp(0 100%)",
            end: "clamp(0 -65%)",
            scrub: 0.3,
          }
        };

        if (animationType === 'from') {
          gsap.from(track, animationParams);
        } else if (animationType === 'to') {
          gsap.to(track, animationParams);
        }
      }

      function animateMarquee(items, x, animationType) {
        items.forEach((item) => {
          createMarqueeAnimation(item, x, animationType);
        });
      }

      animateMarquee(marqueeLight, -500, 'from');
      animateMarquee(marqueeDark, -500, 'from');
    }

    return () => {
      window.location.reload()
    }
  }
);

//split title
splitTitle.forEach(h => {
  const chars = h.querySelectorAll('.char')
  gsap.from(chars, {
    opacity: 0.2,
    stagger: 0.1,
    delay: 0.2,
    duration: 1,
    ease: "back.out",
    scrollTrigger: {
      trigger: h,
      start: "clamp(top 90%)",
      end: "clamp(top 7%)",
      scrub: true,
    }
  })
});

//agency img
agencyFigure.forEach(fig => {
  const img = fig.querySelector('img')
  gsap.from(img, {
    scale: 1.2,
    ease: "sine.out",
    scrollTrigger: {
      trigger: fig,
      start: "clamp(top 90%)",
      scrub: 1.2,
    }
  })
});

//client testimonials
function toggleTestimonial(card) {
  const { classList } = card;
  classList.toggle('client-card--active');
  cursorWrapper.classList.toggle('custom-cursor--testimonial-close');
}

function clickTestimonial(card) {
  clientCards.forEach(otherCard => {
    if (otherCard !== card && otherCard?.classList.contains('client-card--active')) {
      otherCard.classList.remove('client-card--active');
    }
  });
  toggleTestimonial(card);
}

function handleTestimonialClick(event) {
  const cardBtn = event.target.closest('.client-card__action');

  if (cardBtn) {
    const card = cardBtn.closest('.client-card');
    clickTestimonial(card);
  }
}

//agency
agencyTl.from('.l-agency__headline--hero .char', {
  opacity: 0.2,
  ease: "power4.out",
  stagger: {
    each: 0.03,
    from: "random",
    grid: "auto",
  },
  delay: 0.15,
})

agencyTl.from('.l-agency__desc--hero', {
  y: 150,
  opacity: 0,
  duration: 0.5,
})

agencyTl.from('.l-agency__desc--hero .char', {
  opacity: 0,
  ease: "power4.out",
  stagger: 0.01
}, 1)
