# 📁 js/ — JavaScript de Estudio CTAPO

Todo el JavaScript es **vanilla** (sin frameworks ni librerías externas):
carga rápido, no depende de conexión a un CDN externo y es fácil de leer
y modificar. Cada archivo está comentado explicando qué hace cada bloque.

| Archivo | Se usa en | Qué hace |
| :--- | :--- | :--- |
| `main.js` | Todas las páginas | Menú hamburguesa accesible, resaltado del link activo, animación de aparición al hacer scroll (`IntersectionObserver`) y año automático en el footer. |
| `carousel.js` | `index.html` | Carrousel de imágenes/video del hero: autoplay, botones, dots, teclado y pausa al pasar el mouse. |
| `team.js` | `pages/equipo.html` | Abre el modal de cada integrante (foto grande, bio, contacto y redes) leyendo los `data-*` de cada tarjeta. |
| `galeria.js` | `pages/galeria.html` | Renderiza la galería desde el array `GALERIA_ITEMS`, arma los filtros y controla el lightbox. |

La página de contacto (`pages/contacto.html`) solo usa `main.js`: no
tiene formulario, así que no necesita un script propio.
