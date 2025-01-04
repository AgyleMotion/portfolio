/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Select all carousels
const carousels = document.querySelectorAll('.work__box');

carousels.forEach((workBox) => {
  const carouselContainer = workBox.querySelector('.carousel__container');
  const prevButton = workBox.querySelector('.carousel__button--prev');
  const nextButton = workBox.querySelector('.carousel__button--next');

  let scrollAmount = 0; // Initialize scroll position
  const imageWidth = 300; // Adjust based on your image width
  const visibleImages = 3; // Adjust based on how many images are visible at once

  // Scroll to the next set of images
  nextButton.addEventListener('click', () => {
    scrollAmount += imageWidth * visibleImages;
    carouselContainer.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });

  // Scroll to the previous set of images
  prevButton.addEventListener('click', () => {
    scrollAmount -= imageWidth * visibleImages;
    carouselContainer.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });
});

