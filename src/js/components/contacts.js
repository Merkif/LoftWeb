import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactsList = gsap.utils.toArray('.contacts__list');
let mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width:1025px)",
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
          end: 'clamp(bottom bottom)',
        }
      })
    }
  }
);
