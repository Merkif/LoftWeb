import HystModal from "hystmodal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './swiped-events';

const testimonialBtns = document?.querySelectorAll('.client-card__action--modal');
const testimonialModalId = '#testimonial';
const modalContentContainer = document.querySelector('.hystmodal__content');
const modalClose = document?.querySelector('.hystmodal__close');
const modalHeadline = document?.querySelector('.hystmodal__headline');
const mm = gsap.matchMedia();

const setupModal = () => {
  return new HystModal({
    linkAttributeName: 'data-testimonial',
    waitTransitions: true,
    beforeOpen: (modal) => {
      const testimonialData = getTestimonial(modal);
      const modalHTML = modalTestimonialHTML(testimonialData);

      clearModalContent();
      modalContentContainer.insertAdjacentHTML('beforeend', modalHTML);
    },
    afterClose: (modal) => {
      clearModalContent();
      ScrollTrigger.refresh();
    },
  });
};

function getTestimonial(modal) {
  const card = modal.starter.parentElement;

  const textElement = card.querySelector('.testimonial__text');
  const authorNameElement = card.querySelector('.testimonial__author-name');
  const authorPositionElement = card.querySelector('.testimonial__author-position');
  const authorIconElement = card.querySelector('.client-card__icon use');

  const blockquote = textElement.textContent;
  const author = {
    name: authorNameElement.textContent,
    position: authorPositionElement.textContent,
    icon: authorIconElement.getAttribute('xlink:href')
  };

  return {
    blockquote,
    author
  };
}

function modalTestimonialHTML(testimonial) {
  const { author, blockquote } = testimonial || {};
  return `
    <div class="modal-testimonial">
      <div class="modal-testimonial__author">
        <span class="modal-testimonial__author-icon">
          <svg aria-hidden="true" width="40" height="20">
            <use xlink:href="${author?.icon || ''}"></use>
          </svg>
        </span>
        <span class="modal-testimonial__author-name">${author?.name || ''}</span>
        <span class="modal-testimonial__author-position">${author?.position || ''}</span>
      </div>
      <blockquote class="modal-testimonial__text">${blockquote || ''}</blockquote>
    </div>`;
}

function clearModalContent() {
  modalContentContainer.innerHTML = '';
}

const handleMediaQueries = (context) => {
  if (context.conditions.isMobile) {
    setDatasetForMobile();
  } else if (context.conditions.isDesktop) {
    clearDatasetForDesktop();
  }
};

const setDatasetForMobile = () => {
  testimonialBtns.forEach(btn => {
    btn.dataset.testimonial = testimonialModalId;
  });
};

const clearDatasetForDesktop = () => {
  testimonialBtns.forEach(btn => {
    if (btn.dataset.testimonial) {
      delete btn.dataset.testimonial;
    }
  });
};

const initialize = () => {
  const testimonialModal = setupModal();

  closeOnSwipedDown(modalClose, testimonialModal);
  closeOnSwipedDown(modalHeadline, testimonialModal);

  mm.add(
    {
      isMobile: "(max-width:1024px)",
      isDesktop: "(min-width:1025px)",
    },
    handleMediaQueries
  );
};

initialize();

function closeOnSwipedDown(el, modal) {
  el?.addEventListener('swiped-down', function(e) {
    modal.close();
  });
}
