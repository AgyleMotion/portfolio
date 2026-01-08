/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

/* -----------------------------------------
  Back to top button
 ---------------------------------------- */

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

const alterStyles = (rendered) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = rendered ? "visible" : "hidden";
  backToTopButton.style.opacity = rendered ? 1 : 0;
  backToTopButton.style.transform = rendered ? "scale(1)" : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(true);
  } else {
    isBackToTopRendered = false;
    alterStyles(false);
  }
});

/* -----------------------------------------
  Carousels (click-only, supports images + videos)
  - No autoplay
  - Works with multiple carousels
  - Safe if a carousel has no buttons (single image)
 ---------------------------------------- */

const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const container = carousel.querySelector(".carousel__container");
  const slides = carousel.querySelectorAll(".work__image-box, .work__video-box");
  const prevButton = carousel.querySelector(".carousel__button--prev");
  const nextButton = carousel.querySelector(".carousel__button--next");

  // If this carousel doesn't have the expected pieces (e.g., single image, no arrows), skip it safely.
  if (!container || slides.length === 0 || !prevButton || !nextButton) return;

  let currentIndex = 0;

  function pauseVideosInCarousel() {
    container.querySelectorAll("video").forEach((v) => v.pause());
  }

  function updateCarousel() {
    // This relies on CSS making each slide take 100% width of the carousel.
    const offset = -currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    pauseVideosInCarousel();
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    pauseVideosInCarousel();
    updateCarousel();
  });

  // Initialize position
  updateCarousel();
});
