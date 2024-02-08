function setHeaderHeight() {
  const headerHeight = document?.querySelector('.header')?.offsetHeight;
  document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
}

document.addEventListener('DOMContentLoaded', setHeaderHeight);

function debounce(func, delay) {
  let timeoutId;
  return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
          func.apply(context, args);
      }, delay);
  };
}

const debouncedSetHeaderHeight = debounce(setHeaderHeight, 250);
window.addEventListener('resize', debouncedSetHeaderHeight);
