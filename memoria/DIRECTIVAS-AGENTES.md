# Directivas de diseño y datos · Del Mar Artesanías

## 1. Enfoque móvil

Esta aplicación es una experiencia web móvil. El diseño ocupa el viewport del teléfono. No se debe dibujar una carcasa, mockup, lámina de presentación, fondo exterior ni barra de estado simulada. En una ventana grande de revisión se puede limitar el contenido a ancho móvil, pero sin hacer que parezca un teléfono físico.

## 2. Metodología

Seguir memoria/METODOLOGIA-GAUNTLET.md: planificar, implementar, comparar visualmente en tamaño móvil, auditar y corregir hasta cumplir todos los criterios.

## 3. Fuentes de contenido

- src/data/products.js: fichas, fotos, categorías y precios del catálogo.
- src/data/story.js: narrativa, slogans, ubicación y teléfono de contacto.
- src/data/pillars.js: pilares de identidad.
- src/constants/whatsapp.js: número y mensajes de contacto/pedido.

No inventar reseñas, tiendas, perfiles, inventario, disponibilidad, envíos, variantes, métricas ni contenido. Las cifras de presentación deben calcularse desde los datos existentes y etiquetarse con claridad.

## 4. Validación

- [ ] Se revisó con viewport móvil y ocupa el ancho real del dispositivo.
- [ ] No hay elementos del póster o del teléfono de muestra en la interfaz.
- [ ] Inicio presenta el hero y la retícula fotográfica de la referencia.
- [ ] Catálogo presenta filtros y productos en dos columnas.
- [ ] Las cinco pestañas y las interacciones previas siguen disponibles.
- [ ] El texto y las imágenes visibles pertenecen a Del Mar.
- [ ] WhatsApp enlaza al número oficial del proyecto.
- [ ] npm run build termina correctamente.
