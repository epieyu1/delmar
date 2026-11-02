# Metodología Gauntlet · Del Mar Artesanías

Método de las cuatro cajas: **TAREA · MÉTODO · LISTÓN · ENTREGABLE**, según la guía del Gauntlet Prompt. El listón es una lista de puntos comprobables uno por uno, no adjetivos. La primera versión nunca es la respuesta.

---

## 1 · TAREA

Adaptar la web móvil de Del Mar Artesanías a la composición y el lenguaje visual de la lámina de referencia (dos pantallas de una app de comida), **sin copiar su contenido**: el catálogo, los textos, las fotos y los precios son los de Del Mar.

Es una experiencia móvil: la web ocupa el viewport real del teléfono, sin carcasa, sin barra de estado simulada y sin el fondo del póster. La referencia aporta diseño; no aporta datos.

Piezas incluidas: Inicio (hero y franja de cifras), Artesanía (cuatro piezas destacadas), Catálogo (pantalla aparte con las doce piezas), Historia y Contacto.

Fuera de alcance: la composición de escritorio y cualquier contenido de la lámina.

---

## 2 · MÉTODO

- **Trabajo autónomo.** No se pregunta cada dos pasos; lo ambiguo se decide, se aplica y se anota.
- **Trabajo en bucle.** Planificar → construir → probar en el navegador → revisar → corregir → repetir. Mínimo dos rondas antes de entregar.
- **Árbitro adversarial separado.** Una sesión distinta de la que construyó, que no ve el razonamiento del constructor y cuyo único objetivo es encontrar fallos. Prohibido elogiar y prohibidas las críticas vagas: cada defecto se reporta con selector, valor medido y qué debería ser.
- **El árbitro mira el resultado, no las intenciones.** Capturas renderizadas, `getComputedStyle`, `getBoundingClientRect` y contraste calculado sobre los píxeles de la captura, no sobre el código.
- **Bucle cerrado.** Cada hallazgo se convierte en un cambio concreto y se vuelve a medir. Se para cuando el listón está completo, no cuando "se ve bien".

---

## 3 · LISTÓN

El árbitro no puede dar el trabajo por terminado hasta comprobar, uno por uno y con evidencia, estos puntos a 390 × 844 CSS px (DPR 2):

**Paleta**

1. El único origen de color del proyecto es `src/styles/tokens.css`. La paleta es exactamente: mist `#E2F2EF`, glass `#C3DFE3`, aqua `#A5CFCD`, sea `#7FBBB2`, sand `#E4DED0`, shell `#EBEAE5`, y la tinta `#233F52`. Se comprueba con `getComputedStyle` sobre la captura, no leyendo el CSS.
2. Ningún `background-color`, `color` ni `border-*-color` computado —ni ningún texto con `opacity`— queda fuera de esa lista. `src/index.css` no contiene ni un hex, `rgb()` ni `hsl()` literal, y no existe ningún segundo bloque de paleta.

**Estructura**

3. Una sola página con scroll continuo: Inicio → Artesanía → Historia → Contacto. El catálogo vive en pantalla aparte y, al abrirse, las secciones del inicio se desmontan.
4. Existe una única rejilla de productos en el inicio (cuatro piezas) con el botón «Ver catálogo completo». No hay buscador en ningún sitio.

**Hero**

5. La foto ocupa el 88 % del ancho, toca el borde superior del bloque y mide unos 250 px de alto; el vino queda solo como marco lateral (~23 px por lado) y como banda inferior bajo la onda.
6. El texto del hero (ubicación, frase y botón) vive **fuera** de la foto, en la zona clara bajo la onda.

**Tarjeta**

7. Panel tintado con la foto dentro; nombre, precio y «Pedir» van sobre el mismo color del panel, y la franja del control mide 44 px.
8. La franja blanca es el propio control «Pedir» con el icono de WhatsApp: 44 px de alto, ancho completo de la tarjeta y `wa.me` con el nombre y el precio.
9. Las doce tarjetas son del mismo color en toda su superficie (`--panel` = glass): marco, nombre, precio y «Pedir» comparten fondo. No hay tintes alternos ni franjas de otro color dentro de la tarjeta.
10. Las dos tarjetas de una fila tienen exactamente la misma altura y ningún nombre lleva puntos suspensivos.

**Tipografía y legibilidad**

11. Ningún texto visible por debajo de 9 px; el texto corrido, mínimo 12 px.
12. Contraste ≥ 4,5:1 en todo texto de 14 px o menos, medido sobre la captura renderizada. El titular grande admite 3:1. **Una sola tinta**: `#233F52` en el 100 % del texto, incluidos los botones rellenos, que son teal con tinta encima (5,07:1) y borde de 1 px de tinta para que el control se distinga del fondo (9,55:1). Ningún texto claro sobre relleno.

**Interacción**

13. Todas las áreas táctiles, incluidas las generadas con pseudo-elementos, miden al menos 44 × 44 px: menú, «Pedir», «Volver al inicio», filtros.
14. Los filtros van en una sola fila desplazable, sin recortes y sin salto de línea.
15. El menú abre la lista de secciones, navega, marca la activa y se cierra con el enlace, con el fondo y con `Esc`.

**Robustez**

16. Sin desbordamiento horizontal a 360, 390 y 414 px.
17. Ninguna tarjeta visible aparece con la imagen en blanco en la primera pintura.
18. `npm run build` sin errores y consola sin errores ni advertencias.
19. Todo el contenido es real de Del Mar: nombres, fotos, precios, categorías, historia y contacto.

---

## 4 · ENTREGABLE

1. **Capturas** de cada pantalla a 390 × 844, DPR 2, en una carpeta con fecha.
2. **Tabla PASS/FAIL** con los 19 puntos del listón y, en cada uno, el número o la captura que lo sostiene.
3. **Resumen de la revisión del árbitro:** cuántas rondas hubo, qué rechazó en cada una y qué se corrigió.
4. **Defectos conocidos** que quedan abiertos, con su motivo.
5. **Archivos tocados** y respaldo del estado anterior.

Sin la tabla y el resumen de rondas, la entrega no se considera terminada.
