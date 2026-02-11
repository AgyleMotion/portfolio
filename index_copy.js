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

/* -----------------------------------------
  Carousels – CLICK ONLY (SAFE FOR ALL)
----------------------------------------- */

document.querySelectorAll(".carousel__button").forEach((button) => {
  const carousel = button.closest(".carousel");
  const container = carousel.querySelector(".carousel__container");
  const slides = carousel.querySelectorAll(
    ".work__image-box, .work__video-box"
  );

  if (!container || slides.length === 0) return;

  // Initialize index per carousel
  if (carousel.dataset.index === undefined) {
    carousel.dataset.index = "0";
  }

  const pauseVideos = () => {
    container.querySelectorAll("video").forEach(v => v.pause());
  };

  const update = () => {
    const index = Number(carousel.dataset.index);
    const width = carousel.getBoundingClientRect().width;
    container.style.transform = `translateX(-${index * width}px)`;
  };

  button.addEventListener("click", () => {
    let index = Number(carousel.dataset.index);

    if (button.classList.contains("carousel__button--next")) {
      if (index < slides.length - 1) index++;
    }

    if (button.classList.contains("carousel__button--prev")) {
      if (index > 0) index--;
    }

    carousel.dataset.index = index.toString();
    pauseVideos();
    update();
  });

  window.addEventListener("resize", update);
  update();
});

