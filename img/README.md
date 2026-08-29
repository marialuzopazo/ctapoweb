# 📁 img/ — Recursos visuales de Estudio CTAPO

Todas las imágenes del sitio están acá adentro, ordenadas por dónde se usan.

## Estructura

| Carpeta | Qué va acá | Tamaño |
| :--- | :--- | :--- |
| `logo/` | Isotipo/logo del estudio (header, footer y favicon) | SVG o PNG transparente, ~260x80 |
| `banner/` | Fondo del hero de portada y el de las páginas internas | 1920x1080 |
| `carousel/` | Imágenes o video del carrousel de la home | 1600x900 (formato 16:9) |
| `equipo/` | Fotos de cada integrante | 600x600 (cuadrada), JPG/PNG/WebP |
| `galeria/` | Capturas de avance del videojuego (arte, UI, niveles, etc.) | 900x600 aprox, JPG/PNG/WebP livianos |

Cada imagen se referencia por su nombre de archivo en el HTML (`equipo.html`)
o en el array `GALERIA_ITEMS` de `js/galeria.js`. Si borrás o renombrás una
imagen, actualizá también esa referencia para no dejar un link roto.
