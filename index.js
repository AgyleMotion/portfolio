/* ── CAROUSEL ── */
document.querySelectorAll('.carousel').forEach(carousel => {

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.slide');

  let index = 0;

  function move() {
    index++;
    if (index >= slides.length) {
      index = 0;
    }
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(move, 8000);

});

/* ── NAVIGATION ACTIVE STATE ── */

const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav__menu a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  // Force Contact active at bottom of page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    current = "contact";
  }

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});

/* ── MOBILE: REMOVE FOCUS RING AFTER NAV CLICK ── */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    link.blur();
  });
});
