/* ============================================================
   CAROUSEL.JS — Carrousel de imágenes/videos de la página principal
   ============================================================
   Solo se usa en index.html. Funciona con cualquier cantidad de
   ".carousel-slide" dentro de "#mainCarousel": para agregar o sacar
   diapositivas, alcanza con editar el HTML, este script se adapta solo.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('mainCarousel');
  if (!carousel) return; // esta página no tiene carrousel

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  const AUTOPLAY_MS = 6000; // tiempo entre diapositivas automáticas
  let currentIndex = 0;
  let autoplayTimer = null;

  // Genera un botón "dot" por cada diapositiva
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir a la diapositiva ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function goToSlide(index) {
    // Permite ciclar de la última a la primera y viceversa
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentIndex));
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
  nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

  // Navegación con teclado (flechas izquierda/derecha) cuando el
  // carrousel tiene el foco: mejora la accesibilidad.
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') nextSlide();
    if (event.key === 'ArrowLeft') prevSlide();
  });

  // Pausa el autoplay cuando el mouse o el teclado están sobre el
  // carrousel, para no interrumpir a alguien que lo está mirando/usando.
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  goToSlide(0);
  startAutoplay();
});
