/* ============================================================
   GALERIA.JS — Galería de avances, filtros, lightbox y uploader
   ============================================================
   Solo se usa en pages/galeria.html.

  

/* ---------- 1. Datos de la galería ----------
   Cada objeto: { src, alt, titulo, descripcion, categoria } */
const GALERIA_ITEMS = [
  {
    src: '../img/galeria/avance-1.jpg',
    alt: 'presentacion en meetup',
    titulo: 'primera presetación del videojuego',
    descripcion: 'presentación del videojuego en meet up.',
    categoria: 'meet up',
  },
   {
    src: '../img/galeria/avance-77.jpg',
    alt: 'presentacion meetup 2',
    titulo: 'segunda presetación del estudio',
    descripcion: 'presentación del estudio ctapo',
    categoria: 'meet up',
  },
  {
    src: '../img/galeria/avance-2.jpeg',
    alt: 'trabajo en conjunto por discord',
    titulo: 'documentación en equipo',
    descripcion: 'comunicación y trabajo en equipo a través de reuniones generales',
    categoria: 'Discord',
  },
  {
    src: '../img/galeria/avance-3.jpeg',
    alt: 'merch',
    titulo: 'Stickers para los jugadores',
    descripcion: 'cada integrante puede elegir de que forma representar al estudio y videojuego',
    categoria: 'merch',
  },
  {
    src: '../img/galeria/avance-31.jpg',
    alt: 'merch',
    titulo: 'Stickers para los jugadores',
    descripcion: 'otra jornada en donde se presentaron stickers',
    categoria: 'merch',
  },
  
  {
    src: '../img/galeria/avance-7.png',
    alt: 'diseño y arte',
    titulo: 'arte',
    descripcion: 'Pixel Art - 2d - Diseño para Mambo de condenados',
    categoria: 'arte',
  },

  {
    src: '../img/galeria/avance-6.png',
    alt: 'diseño y arte',
    titulo: 'arte',
    descripcion: 'Pixel Art - 2d - Diseño para Mambo de condenados',
    categoria: 'arte',
  },

  {
    src: '../img/galeria/avance-8.png',
    alt: 'diseño y arte',
    titulo: 'arte',
    descripcion: 'Pixel Art - 2d - Diseño para Mambo de condenados',
    categoria: 'arte',
  },
];

const CATEGORY_LABELS = {
  todos: 'Todos',
  arte: 'Arte',
  nivel: 'Niveles',
  ui: 'Interfaz',
  animacion: 'Animación',
};

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return; // esta página no tiene galería

  const filtersContainer = document.getElementById('galleryFilters');
  let currentFilter = 'todos';

  /* ---------- Filtros ---------- */
  function renderFilters() {
    const categories = ['todos', ...new Set(GALERIA_ITEMS.map((item) => item.categoria))];
    filtersContainer.innerHTML = '';

    categories.forEach((categoria) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn' + (categoria === currentFilter ? ' is-active' : '');
      btn.textContent = CATEGORY_LABELS[categoria] || categoria;
      btn.dataset.filter = categoria;
      btn.addEventListener('click', () => {
        currentFilter = categoria;
        filtersContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        renderGrid();
      });
      filtersContainer.appendChild(btn);
    });
  }

  /* ---------- Grid ---------- */
  function renderGrid() {
    const visibleItems = GALERIA_ITEMS.filter(
      (item) => currentFilter === 'todos' || item.categoria === currentFilter
    );

    grid.innerHTML = '';

    if (!visibleItems.length) {
      grid.innerHTML = '<p class="gallery-empty">Todavía no hay imágenes en esta categoría.</p>';
      return;
    }

    visibleItems.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-item';
      button.setAttribute('aria-label', `Ver en grande: ${item.titulo}`);
      button.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
        <div class="gallery-overlay">
          <h3>${item.titulo}</h3>
          <p>${item.descripcion}</p>
        </div>
      `;
      button.addEventListener('click', () => openLightbox(item, visibleItems));
      grid.appendChild(button);
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeGroup = [];
  let activeIndex = 0;

  function openLightbox(item, group) {
    activeGroup = group;
    activeIndex = group.indexOf(item);
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const item = activeGroup[activeIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = `${item.titulo} — ${item.descripcion}`;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % activeGroup.length;
    updateLightbox();
  }

  function showPrev() {
    activeIndex = (activeIndex - 1 + activeGroup.length) % activeGroup.length;
    updateLightbox();
  }

  lightbox.querySelectorAll('[data-close-lightbox]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });
 

  renderFilters();
  renderGrid();
});
