# 📁 css/ — Estilos de Estudio CTAPO

| Archivo | Qué contiene | Cuándo tocarlo |
| :--- | :--- | :--- |
| `variables.css` | **La paleta de colores, tipografías y espaciados de TODO el sitio.** | Para cambiar colores o fuentes: es lo único que necesitás editar. |
| `base.css` | Reset, tipografía general, header/nav, botones, footer y la animación de aparición (`.reveal`). Se usa en las 4 páginas. | Para cambiar el header, el menú, el footer o los botones en todas las páginas a la vez. |
| `home.css` | Estilos únicos de `index.html`: hero, carrousel y sección "objetivo". | Solo afecta a la home. |
| `equipo.css` | Estilos únicos de `pages/equipo.html`: tarjetas de integrantes y el modal de contacto/redes. | Solo afecta a la página de equipo. |
| `galeria.css` | Estilos únicos de `pages/galeria.html`: filtros, grid y lightbox. | Solo afecta a la página de galería. |
| `contacto.css` | Estilos únicos de `pages/contacto.html`: información de contacto y redes. | Solo afecta a la página de contacto. |

## Paleta de colores actual

| Variable | Color | Uso |
| :--- | :--- | :--- |
| `--color-primary` | `#8B5CF6` (violeta) | Botones, acentos principales |
| `--color-secondary` | `#22D3EE` (cian) | Links, hover, detalles |
| `--color-accent` | `#F43F5E` (rosa/rojo) | Errores, badges destacados |
| `--color-bg` | `#05070C` | Fondo general (oscuro) |
| `--color-bg-elevated` | `#0B0E17` | Header, tarjetas |
| `--color-text-strong` | `#F8FAFC` | Títulos |

Cambiando estos valores en `variables.css` el cambio se aplica en **todo** el sitio automáticamente, porque el resto del CSS usa `var(--color-primary)`, etc. en vez de colores "hardcodeados".
