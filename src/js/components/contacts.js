import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactsList = gsap.utils.toArray('.contacts__list');
let mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width:1281px)",
  },

  (context) => {
    if (context.conditions.isDesktop) {
      gsap.to(contactsList, {
        ease: 'none',
        scrollTrigger: {
          pin: true,
          scrub: true,
          trigger: '.contacts__list',
          start: 'clamp(0 25%)',
          pinSpacing: false,
          end: () => document.querySelector('.contacts').scrollHeight,
        }
      })
    }
  }
);
