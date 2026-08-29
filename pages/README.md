# 📁 pages/ Páginas internas de Estudio CTAPO

La página de inicio (`index.html`) vive en la raíz del proyecto; acá
adentro están las otras tres páginas del sitio. Todas comparten el
mismo header, footer y sistema de estilos (`css/variables.css` +
`css/base.css`).

### 📄 [equipo.html](./equipo.html)
Presenta al equipo del estudio. Cada integrante es un
`<article class="team-member">` con sus datos en atributos `data-*`
(nombre, rol, bio, email, redes). Al hacer clic en la foto se abre un
modal (manejado por `js/team.js`) 

### 📄 [galeria.html](./galeria.html)
Galería de avances del videojuego con filtros por categoría y lightbox.
El contenido de la galería se define en el array `GALERIA_ITEMS` dentro
de `js/galeria.js`, no en el HTML.

### 📄 [contacto.html](./contacto.html)
Información de contacto (email y redes) para contrataciones,
colaboraciones o postulaciones al equipo.
