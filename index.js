/* -----------------------------------------
  Focus outline only for keyboard users
----------------------------------------- */

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
  Back to Top Button
----------------------------------------- */

const backToTopButton = document.querySelector(".back-to-top");

function updateBackToTop() {
  if (!backToTopButton) return;

  if (window.scrollY > 700) {
    backToTopButton.style.visibility = "visible";
    backToTopButton.style.opacity = "1";
    backToTopButton.style.transform = "scale(1)";
  } else {
    backToTopButton.style.visibility = "hidden";
    backToTopButton.style.opacity = "0";
    backToTopButton.style.transform = "scale(0)";
  }
}

window.addEventListener("scroll", updateBackToTop);

/* -----------------------------------------
  Carousels (CLICK ONLY)
  - Images + Videos supported
  - No autoplay
  - No looping
----------------------------------------- */

document.querySelectorAll(".carousel").forEach((carousel) => {
  const container = carousel.querySelector(".carousel__container");
  const slides = carousel.querySelectorAll(
    ".work__image-box, .work__video-box"
  );
  const prevButton = carousel.querySelector(".carousel__button--prev");
  const nextButton = carousel.querySelector(".carousel__button--next");

  // Skip carousels without arrows (single-image ones)
  if (!container || slides.length === 0 || !prevButton || !nextButton) return;

  let currentIndex = 0;

  // Ensure layout consistency
  container.style.display = "flex";
  container.style.transition = "transform 0.35s ease";

  slides.forEach((slide) => {
    slide.style.minWidth = "100%";
    slide.style.flexShrink = "0";
  });

  function pauseVideos() {
    container.querySelectorAll("video").forEach((video) => video.pause());
  }

  function updateCarousel() {
    const slideWidth = carousel.getBoundingClientRect().width;
    container.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      pauseVideos();
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      pauseVideos();
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  // Initialize position
  updateCarousel();
});
