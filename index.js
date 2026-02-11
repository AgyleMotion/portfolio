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
