const clientCards = document?.querySelectorAll('.client-card');

function toggleTestimonial(card) {
  card.classList.toggle('client-card--active');
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
