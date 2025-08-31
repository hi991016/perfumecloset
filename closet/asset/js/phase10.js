/* -------------------------------- lazy load ------------------------------- */

const ll = new LazyLoad({
  threshold: 100,
  elements_selector: ".lazy",
});

/* ---------------------------------- lenis --------------------------------- */

const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(1 - t, 2.5)),
  smooth: true,
  mouseMultiplier: 1.0,
  smoothTouch: true,
  touchMultiplier: 1.5,
  infinite: false,
  direction: "vertical",
  gestureDirection: "vertical",
});
function raf(t) {
  lenis.raf(t);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ---------------------------- scroll header --------------------------- */

function updateHeader() {
  const isScrolled = window.scrollY < window.innerHeight - 80;
  $("[data-header-change]").toggleClass("scrolled", isScrolled);
}
$(document).ready(updateHeader);
$(window).on("scroll", updateHeader);

/* ---------------------------- scroll animation ---------------------------- */

const [animFade, animImg] = [
  document.querySelectorAll("[data-anim-fade]"),
  document.querySelectorAll("[data-anim-img]"),
];

const initScrollTrigger = (arr) => {
  arr.forEach((elem) => {
    const distInView =
      elem.getBoundingClientRect().top - window.innerHeight + 50;
    distInView < 0 && elem.classList.add("--show");
    // elem.classList.toggle("--show", distInView < 0);
  });
};

let ticking = false;
const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      initScrollTrigger(animFade);
      initScrollTrigger(animImg);
      ticking = false;
    });
    ticking = true;
  }
};

["pageshow", "scroll"].forEach((evt) => {
  window.addEventListener(evt, onScroll, { passive: true });
});
