# Referencia visual y adaptación · Del Mar Artesanías

**Fecha:** 30 de octubre de 2026  
**Alcance:** rediseño responsive limitado a la experiencia móvil.  
**Referencia:** `/Users/alexanderrestrepoepieyu/Downloads/_ (2).jpeg`.

## Qué representa la imagen

La imagen es una lámina de presentación que contiene dos interfaces móviles. El objeto de comparación son las páginas que se ven **dentro** de esos móviles. Las carcasas, los márgenes del póster, las franjas con títulos y firmas, la marca de agua y los indicadores del sistema no son parte de la web y no se deben recrear.

La pantalla izquierda presenta un inicio con fondo vino oscuro, imagen grande de producto, una transición inferior curva, datos breves y tarjetas en dos columnas. La derecha presenta una página de tienda sobre fondo claro, filtros en píldoras, cuadrícula de productos fotográficos y navegación inferior con iconos. Son vistas de una aplicación móvil; la página debe ocupar el viewport del dispositivo real.

## Lectura de composición

### Elementos compartidos

- Cabecera compacta con marca y controles de aplicación.
- Jerarquía sencilla: encabezado, bloque principal, contenido fotográfico y navegación inferior.
- Fondos cálidos y superficies claras con acentos vino, coral y salvia.
- Fotos protagonistas en las tarjetas, con nombre y precio en una franja inferior.
- Barra de navegación flotante con cinco iconos y un estado activo circular.

### Inicio

- Hero fotográfico vino, de ancho completo, con texto dentro del bloque y un borde inferior orgánico.
- Breve franja de datos debajo del hero.
- Cuadrícula fotográfica de productos a dos columnas.

### Tienda

- Título y controles sobre fondo claro.
- Filtros en píldoras en una fila siempre que quepan; a anchos menores pueden ocupar más de una línea para mantener cada filtro completo.
- Tarjetas con imagen protagonista, nombre íntegro y precio; una sola coincidencia queda centrada.

## Paleta y tipografía de trabajo

Los colores son aproximaciones visuales del JPEG, no muestreos exactos del archivo. La aplicación utiliza estos tokens:

| Token | Color | Aplicación |
|---|---|---|
| `--paper` | `#F5F0E8` | Fondo principal |
| `--paper-warm` | `#FBF8F1` | Tarjetas y superficies claras |
| `--wine` | `#381626` | Hero y bloques de alta jerarquía |
| `--wine-deep` | `#29101D` | Acento profundo dentro del hero |
| `--coral` | `#E39A8D` | Botones y estado activo |
| `--sage` | `#DCE3D8` | Fondos suaves |
| `--ink` | `#202725` | Texto principal |
| `--ink-soft` | `#69716C` | Metadatos y descripciones |

La tipografía aplicada en titulares, textos y controles móviles es DM Sans/sans serif para acercar la lectura al referente. La regla está limitada a `.mobile-app-surface`; las reglas de pantallas anchas se conservan separadas.

## Adaptación con contenido real

| Función visual de la referencia | Contenido de Del Mar |
|---|---|
| Hero de inicio | Slogans existentes en `src/data/story.js` y foto de un producto real |
| Franja breve | Número de fichas y categorías calculado desde `src/data/products.js`, más ubicación oficial |
| Tarjetas de producto | Fotos, nombres, categorías y precios del catálogo existente |
| Filtros | Categorías que ya tienen productos registrados |
| Artesanía | Texto de `src/data/pillars.js` y relato de `src/data/story.js` |
| Historia | Foto de marca y textos de `src/data/story.js` |
| Contacto | Ubicación y canales de `src/data/story.js` y mensajes de `src/constants/whatsapp.js` |

No se reutilizan las marcas, los textos, los productos, los precios ni los alimentos del ejemplo. Tampoco se inventan reseñas, ventas, existencias o testimonios.

## Revisión de la versión previa

La primera revisión adversarial de la nueva iteración móvil rechazó cinco detalles: la insignia se superponía visualmente con el subtítulo de Historia; el último filtro llegaba al borde; algunos nombres de producto se truncaban; un filtro con una sola coincidencia dejaba una tarjeta desbalanceada; y los titulares serif se alejaban de la sans serif observada en la referencia. Esos puntos se corrigieron en la ronda posterior y quedan sujetos a un segundo dictamen independiente documentado en `memoria/INFORME-AUDITORIA.md`.

## Umbral Gauntlet

El diseño solo se declara aprobado cuando un auditor independiente confirma, sobre la página abierta a tamaño móvil, el parecido de composición y estilo, la legibilidad de títulos y tarjetas, el funcionamiento de todas las categorías y la ausencia de contenido de muestra. El detalle de los criterios y las rondas está en `memoria/METODOLOGIA-GAUNTLET.md` y `memoria/INFORME-AUDITORIA.md`.
