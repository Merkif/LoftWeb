import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroller = gsap.utils.toArray('.c-scroller');
let mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width:1025px)",
  },

  (context) => {
    if (context.conditions.isDesktop) {
      scroller.forEach(scroller => {
        const img = scroller.querySelector('.c-scroller__img');
        let getToValue = () => -(scroller.scrollHeight - scroller.offsetHeight);

        gsap.to(img, {
          ease: "none",
          y: () => getToValue(),
          scrollTrigger: {
            pin: true,
            trigger: scroller,
            scrub: true,
            start: "center 52%",
            end: () => "+=" + (scroller.scrollHeight - scroller.offsetHeight),
            invalidateOnRefresh: true,
          }
        });
      });

    }
  }
);
