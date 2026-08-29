/* ============================================================
   MAIN.JS — Comportamiento compartido por TODAS las páginas
   ============================================================
   Se importa con <script src="js/main.js" defer></script> antes que
   el JS específico de cada página (carousel.js / team.js / galeria.js).
   No depende de ninguna librería externa: JavaScript
   plano (vanilla JS), liviano y rápido de cargar (buena práctica
   de "green code": menos código = menos procesamiento y energía).

   Contiene:
   1. Menú hamburguesa accesible (mobile)
   2. Resaltado del link activo según la página actual
   3. Animación de aparición al hacer scroll (IntersectionObserver)
   4. Año automático en el footer (copyright)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNavLink();
  initScrollReveal();
  setFooterYear();
});

/* ------------------------------------------------------------
   1. Menú hamburguesa
   ------------------------------------------------------------
   El botón #navToggle controla la visibilidad de <nav id="primaryNav">
   agregando/quitando la clase "is-open". Se sincroniza aria-expanded
   para que lectores de pantalla anuncien correctamente el estado. */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al elegir un link (mejora la UX en mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Cierra el menú con la tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/* ------------------------------------------------------------
   2. Link activo en la navegación
   ------------------------------------------------------------
   Compara el nombre de archivo actual con el "href" de cada link
   del menú y le agrega la clase "is-active" al que corresponde. */
function highlightActiveNavLink() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentFile) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ------------------------------------------------------------
   3. Animación de aparición al hacer scroll
   ------------------------------------------------------------
   Usamos IntersectionObserver en lugar de escuchar el evento
   "scroll": el navegador solo nos avisa cuando un elemento realmente
   entra en pantalla, en vez de ejecutar código en cada pixel
   scrolleado. Esto reduce el uso de CPU/batería (green code). */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  // Si el navegador no soporta IntersectionObserver, mostramos
  // todo directamente para no dejar contenido oculto.
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // ya se mostró: dejamos de observarlo
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   4. Año automático en el footer
   ------------------------------------------------------------
   Evita tener que actualizar el HTML a mano cada 1 de enero. */
function setFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
