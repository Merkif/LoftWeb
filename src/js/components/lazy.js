import LazyLoad from "vanilla-lazyload";
let lazyLoadInstance = new LazyLoad({});

window.lazyFunctions = {
  light: function () {
    document.documentElement.classList.toggle('theme-light');
  },

  dark: function () {
    document.documentElement.classList.toggle('theme-dark');
  },
};

function executeLazyFunction(element) {
  let lazyFunctionName = element.getAttribute("data-theme");
  let lazyFunction = window.lazyFunctions[lazyFunctionName];
  if (!lazyFunction) return;
  lazyFunction(element);
}

let changeBg = new LazyLoad({
  elements_selector:'[data-theme]',
  callback_enter: executeLazyFunction,
  callback_exit: executeLazyFunction,
})
