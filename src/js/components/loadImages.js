import { gsap } from "gsap";

export default function OnLoadImages(selector, callback) {
  let images = gsap.utils.toArray(selector),
    onLoad = e => {
      images.splice(images.indexOf(e.target), 1);
      images.length || callback();
    };
  images.forEach(img => img.addEventListener("load", onLoad));
}
