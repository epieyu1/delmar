# Informe de auditoría Gauntlet · Del Mar Artesanías

**Fecha:** 30 de octubre de 2026  
**Referencia:** `/Users/alexanderrestrepoepieyu/Downloads/_ (2).jpeg`  
**Viewport:** 390 × 844 CSS px  
**Alcance:** las cinco secciones en móvil; solo las interfaces dentro de la referencia.

## Criterio de lectura

La referencia contiene dos vistas móviles dentro de una lámina. La comparación se hace con esas vistas, no con las carcasas, el fondo exterior, las franjas de autor ni los indicadores del sistema. La web conserva los datos reales de Del Mar y no usa contenido del ejemplo.

## Ronda 1 · Rechazada

Auditor independiente: **FAIL**.

1. Historia: la insignia de fundadora se superponía visualmente al subtítulo del hero.
2. Artesanía y Catálogo: «Sombreros y Gorros» llegaba al borde y parecía recortado.
3. Inicio y Catálogo: algunos nombres largos terminaban en puntos suspensivos.
4. Artesanía filtrada por sombreros: la única tarjeta quedaba en la columna izquierda, con la derecha vacía.
5. La tipografía serif de los titulares se alejaba de la sans serif observada en la referencia.

## Cambios para la ronda 2

- Insignia de Historia movida a la parte superior de la foto, lejos del subtítulo.
- Filtros completos en una fila cuando caben; pueden envolver en pantallas estrechas.
- Nombres completos y altura de tarjeta compartida por fila.
- Resultado único centrado.
- Titulares móviles en sans serif.
- El título genérico de Inicio se reemplazó con el nombre de un pilar registrado de Del Mar.

## Ronda 2 · Rechazada

Auditor independiente: **FAIL**.

- Los hallazgos de la ronda anterior quedaron corregidos.
- Catálogo: el dock cubría el pie de la segunda fila de tarjetas, incluidos nombres y precios, y la siguiente sección «Bolsos» aparecía cortada en el borde inferior.
- En Inicio no observó texto ni productos de muestra. En Artesanía, filtros completos, nombres íntegros y resultado único centrado. En Historia, subtítulo e insignia separados. En Contacto, teléfono, ubicación y bloque de WhatsApp legibles.
- No observó carcasa simulada; los titulares ya estaban en sans serif.

## Cambios para la ronda 3

- Se redujo ligeramente la altura fotográfica de todas las tarjetas móviles manteniendo la misma proporción en cada sección.
- Se amplió el espacio entre grupos de Catálogo para separar el siguiente grupo del dock flotante.
- Se conserva el margen inferior del contenido para que los elementos al final de la página se puedan desplazar por completo sobre el dock.

## Verificación del constructor

- Navegación por las cinco pestañas revisada en el navegador.
- En Artesanía, el filtro «Sombreros y Gorros» muestra la ficha real centrada; los cinco filtros quedan completos.
- Inicio, Historia, Catálogo y Contacto muestran fotos y contenido de marca reales.
- `npm run build`: compilación Vite exitosa; 94 módulos transformados.

## Ronda 3 · Auditoría independiente pendiente

Se solicitó una nueva revisión de las cinco pestañas, con atención a la segunda fila y al siguiente grupo de Catálogo. El estado de aprobación queda **pendiente** hasta recibir el dictamen; la compilación y la revisión del constructor no sustituyen el PASS del auditor.
