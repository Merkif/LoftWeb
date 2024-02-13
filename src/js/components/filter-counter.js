const filters = [...document.querySelectorAll('.filter')];

filters.forEach(filter => {
  const total = filter.querySelector('[data-total]');
  const options = [...filter.querySelectorAll('.filter__option')];

  if(total) {
    total.dataset.total = options.length;
  }
});
