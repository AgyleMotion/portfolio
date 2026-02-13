document.querySelectorAll('.carousel').forEach(carousel => {

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.slide');

  let index = 0;

  function move() {

    index++;

    if (index >= slides.length) {
      index = 0;
    }

    track.style.transform =
      `translateX(-${index * 100}%)`;

  }

  setInterval(move, 3500);

});

/* =========================
   NAVIGATION ACTIVE STATE
========================= */

const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav__menu a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});
