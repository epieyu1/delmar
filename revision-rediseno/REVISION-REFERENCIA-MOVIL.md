# Referencia móvil: Inicio y tarjetas de producto

**Fecha:** 31 de octubre de 2026
**Estado:** análisis únicamente. No se modificó ningún archivo del proyecto.
**Referencia:** la lámina de dos pantallas móviles (`_ (2).jpeg`, 736 × 981 px). Se ignora todo lo que no esté dentro de las dos pantallas: el fondo durazno y gris, las franjas con títulos y firmas, la marca de agua y los marcos de los teléfonos.

---

## 1. Qué entiendo que pides

1. **El objeto de comparación son las dos interfaces**, no la lámina. Ambas son vistas móviles; la web se revisa a ancho de teléfono.
2. **Inicio** debe parecerse a la pantalla izquierda: el bloque oscuro con la foto, la franja con las cifras y el botón coral, y debajo la rejilla.
3. **Las tarjetas de producto deben llevar mucha menos información**: foto, nombre y precio. Todo lo demás (descripción, técnica, detalles, categoría ampliada) se ve **al abrir la ficha**, que ya existe.
4. **No toco el proyecto sin tu autorización.** Este documento es el informe.

Si alguna de estas tres lecturas no es la tuya, corrígela antes de que toque código.

---

## 2. Inicio: referencia frente a lo que hay

| Elemento | Referencia (pantalla izquierda) | Del Mar hoy | Diferencia |
|---|---|---|---|
| Bloque superior | Fondo vino a sangre, foto del producto **recortada** flotando, sin tarjeta ni esquinas | Fondo vino ✓, foto de producto en **rectángulo redondeado** que ocupa el 54 % del ancho | La foto no flota: está enmarcada |
| Texto del hero | **Ninguno**: no hay titular, ni subtítulo, ni botón | Titular grande (`Historias que nacen junto al mar`), subtítulo y botón «Explorar catálogo» | Del Mar tiene 3 bloques de texto que la referencia no tiene |
| Cierre inferior | Onda orgánica asimétrica | Onda SVG ✓ | Equivalente |
| Insignias sobre la foto | 3 ó 4 círculos pequeños (dos a la izquierda, uno coral abajo, uno amarillo) | Ninguna | Faltan los círculos |
| Cifras | Tres cifras en la franja clara, número grande y etiqueta minúscula, **con un botón coral a la derecha** | Tres datos (12 piezas · 4 categorías · Dibulla), sin botón | Falta la acción coral; el tercer dato es texto, no cifra |
| Paginación | Cuatro puntos bajo la onda, uno activo | No hay | Falta |
| Encabezado de la rejilla | **Ninguno**: las tarjetas empiezan directo | «Del Mar Artesanías» + título de pilar + «Ver todas» | Del Mar añade una cabecera que la referencia no tiene |
| Tarjetas | 2 columnas | 2 columnas ✓ | Equivalente |
| Enlace a la historia | No existe | Tarjeta verde salvia «La Historia de Del Mar» | Elemento añadido |

**Lectura:** el esqueleto de Inicio ya sigue la referencia (vino → onda → cifras → rejilla de dos columnas). Lo que hoy lo aleja es **la cantidad de texto encima de la foto y la cabecera de la rejilla**, más los detalles que faltan (círculos, botón coral, puntos).

---

## 3. Tarjetas de producto: aquí está el problema de fondo

### 3.1 Cómo es la tarjeta de la referencia

- Bloque de foto con **fondo tintado** (rosa pálido en la primera, beige en las demás) y el producto **recortado flotando** dentro.
- Una insignia oscura minúscula en la esquina superior derecha de la foto.
- Nombre de **una línea, unos 12 caracteres**: «Coertehoats», «Oonorh Tsoen», «Giseort Anchie».
- Una línea micro con la categoría, debajo del nombre.
- Fila inferior: precio a la izquierda con un icono mínimo, y un control circular a la derecha.
- **Nada más.** Sin descripción, sin etiqueta, sin botón con texto.

### 3.2 Cómo es la tarjeta de Del Mar hoy

| Pieza | Valor actual |
|---|---|
| Foto | Cuadrada-a-apaisada (`aspect-ratio 1.12 / 1`), `object-fit: cover`, sin fondo tintado visible |
| Categoría | Línea superior, 7 px, mayúsculas, gris |
| Nombre | **Nombre completo del catálogo**, 40–70 caracteres, 10 px, **sin límite de líneas** |
| Precio | 10 px, `$220.000 COP` |
| Etiqueta (`tag`) | Oculto en móvil ✓ |
| «Ver pieza» | Oculto en móvil ✓ |

**El punto exacto:** el 30 de octubre, para responder al hallazgo 3 de la auditoría («algunos nombres largos terminaban en puntos suspensivos»), se **quitó el límite de dos líneas** a `.product-tile-title` (`src/index.css`, líneas 3030–3036). Desde entonces la tarjeta muestra el nombre completo. Con nombres de hasta **70 caracteres** en una columna de unos 172 px, eso son **3 o 4 líneas de texto por tarjeta**. Ahí está la «mucha información» que ves.

Los diez nombres más largos del catálogo:

| Caracteres | Nombre |
|---|---|
| 70 | Mini Bucket Bag Artesanal – Verde Oliva & Beige (Interior Impermeable) |
| 67 | Mini Bolso Tejido de Mano con Apliques de Perlas y Herrajes Dorados |
| 66 | Sombrero Tejido Artesanal "Negro & Dorado" con Motivos Geométricos |
| 64 | Mini Mochila Artesanal de Lujo – Edición Bordado Floral & Perlas |
| 63 | Bolso Bucket Artesanal Dorado – Edición Especial Cadena de Aros |
| 61 | Mini Bolso Porta Celular Tejido en Relieve – Edición Mariposa |
| 57 | Mini Mochila Artesanal Recamada en Hilo Metálico y Perlas |
| 52 | Llaveros Souvenir Wayuu Artesanales – Kasha y Pompón |
| 49 | Mochilón Wayuu Gran Capacidad – Simbología Kanaas |
| 49 | Mochila Recamada de Lujo – Colección Gala Mediana |

### 3.3 La contradicción que no se puede resolver con CSS

- La referencia pide **nombres de una línea**.
- La auditoría de la ronda 1 rechazó los nombres cortados con puntos suspensivos.
- Con el nombre completo en el dato, **las dos cosas no caben a la vez**. O se corta (lo que la auditoría rechazó) o se muestran cuatro líneas (lo que la referencia no tiene).

La salida limpia es un **nombre corto para la tarjeta**, distinto del nombre completo que ya está en el catálogo. Eso es un cambio de datos y necesita tu aprobación, porque el nombre completo es el que va en la ficha y en el mensaje de WhatsApp.

Mi propuesta, construida **solo recortando** el nombre existente (no inventa palabras ni características):

| Nombre actual | Propuesta para la tarjeta |
|---|---|
| Mochilón Wayuu Gran Capacidad – Simbología Kanaas | Mochilón Wayuu Kanaas |
| Mini Bucket Bag Artesanal – Verde Oliva & Beige (Interior Impermeable) | Mini Bucket Bag Verde Oliva |
| Mini Mochila Artesanal de Lujo – Edición Bordado Floral & Perlas | Mini Mochila Bordado Floral |
| Llaveros Souvenir Wayuu Artesanales – Kasha y Pompón | Llaveros Kasha y Pompón |
| Monedero / Pouch Pequeño Bordado con Asa | Monedero Bordado con Asa |
| Mini Bolso Porta Celular Tejido en Relieve – Edición Mariposa | Mini Bolso Mariposa |
| Mini Mochila Artesanal Recamada en Hilo Metálico y Perlas | Mini Mochila Hilo Metálico |
| Mini Mochila de Mano / Bucket Bag Artesanal | Mini Bucket Bag Artesanal |
| Mini Bolso Tejido de Mano con Apliques de Perlas y Herrajes Dorados | Mini Bolso Perlas y Dorados |
| Bolso Bucket Artesanal Dorado – Edición Especial Cadena de Aros | Bolso Bucket Dorado |
| Mochila Recamada de Lujo – Colección Gala Mediana | Mochila Gala Mediana |
| Sombrero Tejido Artesanal "Negro & Dorado" con Motivos Geométricos | Sombrero Negro & Dorado |

Cada propuesta usa palabras que ya están en el nombre original. **Aun así las necesito aprobadas por ti**, una por una o en bloque, antes de escribirlas en `products.js`.

---

## 4. Lo que la referencia tiene y Del Mar no puede replicar sin material nuevo

| Rasgo de la referencia | Por qué no es directo | Qué se puede hacer |
|---|---|---|
| Producto **recortado** flotando sobre fondo tintado | Las 41 fotos son tomas de WhatsApp con fondo real (playa, mesa, tela). No hay PNG con transparencia | (a) dejar la foto a sangre como ahora; (b) recortar las 12 fotos principales; (c) poner la misma foto con relleno y fondo tintado, que es una aproximación honesta |
| Insignia con número sobre la foto | No hay dato real de existencias, valoración ni novedad. Inventarlo viola las directivas | No ponerla, o usar un dato que exista (por ejemplo, la categoría) |
| Iconos de favorito y «añadir» | Del Mar no tiene favoritos ni carrito: serían controles falsos | Mantener solo acciones reales (abrir ficha, consultar por WhatsApp) |
| Círculos sobre la foto del hero | Son decorativos en la referencia | Se pueden añadir como decoración, sin función; conviene decidir si aportan o distraen |

---

## 5. Lo que ya está listo y no hay que rehacer

- **La ficha de producto ya concentra la información**: categoría + etiqueta, nombre completo, precio, descripción, detalles (confección, diseño, técnica u origen) y el botón de WhatsApp con el nombre y el precio escritos en el mensaje.
- **La rejilla ya es de dos columnas** en móvil.
- **El cierre ondulado del hero ya existe** y es el mismo recurso de la referencia.
- **Los colores base coinciden**: vino, crema y coral.
- **La etiqueta y el «Ver pieza» ya están ocultos** en móvil: la tarjeta no arrastra texto de más por ese lado.

Es decir: el trabajo pendiente está concentrado en **la tarjeta** (nombre corto y jerarquía) y en **la franja de cifras** (botón coral, tercer dato como cifra, puntos), no en reconstruir la pantalla.

---

## 6. Alcance que propongo, para cuando autorices

| Archivo | Cambio | Riesgo |
|---|---|---|
| `src/data/products.js` | Añadir `cardName` a los 12 productos con los nombres que apruebes | Bajo: no toca nombre, precio ni descripción |
| `src/components/common/ProductCard.jsx` | Mostrar `cardName`, categoría y precio; sin etiqueta ni texto extra | Bajo |
| `src/index.css` | Ajustar la tarjeta (una línea de nombre, jerarquía foto/nombre/precio) y la franja de cifras | Medio: el CSS tiene cuatro capas apiladas; hay que tocar la capa correcta o consolidar |
| `src/components/sections/HomeScreen.jsx` | Solo si decides cambiar la franja (botón coral, tercer dato) o el encabezado de la rejilla | Medio: es la pantalla que ya pasó auditoría |

**No propongo tocar** `story.js`, `pillars.js`, `whatsapp.js`, el modal de producto ni las fotos: no hacen falta para esto y están protegidos por `scope-isolation-guard`.

---

## 7. Lo que necesito que me confirmes

1. **El «0».** No sé a qué elemento te refieres con «el 0» en Inicio. Puede ser la franja de cifras (12 · 4 · Dibulla), el botón coral redondo que está a su derecha, los círculos sobre la foto, o un cero literal que se ve hoy en tu pantalla. Sin eso puedo equivocarme de elemento.
2. **Qué queda visible en la tarjeta.** Mi lectura es foto + nombre corto + precio. ¿La categoría se queda o se va también a la ficha?
3. **Los nombres cortos.** ¿Apruebas la tabla del punto 3.3, la ajustas, o prefieres otra vía (por ejemplo, mantener el nombre completo a dos líneas con puntos suspensivos, aceptando que se corten)?
4. **El hero.** La referencia no tiene titular ni botón; Del Mar sí. ¿Los mantenemos (aportan mensaje de marca) o los quitamos para igualar la referencia?
5. **La foto del hero y de las tarjetas.** ¿Foto a sangre como ahora, o quieres que prepare versiones recortadas para que el producto flote sobre el fondo tintado?
