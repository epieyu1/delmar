---
name: tailwind-responsive-ui
description: >
  Guía de maquetación Mobile-First con Tailwind CSS para Del Mar Artesanías.
  Incluye grillas adaptativas para catálogo de productos, sistema de tokens de
  color y tipografía, patrones de cards, y consistencia de diseño visual.
  Activar cuando se trabaje con layouts, grillas, cards o responsive design.
triggers:
  - on_layout_edit
  - on_grid_edit
  - on_responsive_design
---

# 🎨 Tailwind Responsive UI — Del Mar Artesanías

## Política obligatoria de medidas fluidas

Esta regla tiene prioridad sobre cualquier ejemplo fijo más abajo y debe aplicarse
en todos los rediseños de Del Mar Artesanías:

- No fijar anchos, altos, tamaños de fuente, padding, márgenes o gaps de contenido
  en píxeles.
- Preferir contenido intrínseco (`auto`, `min-content`, `max-content`), proporciones
  (`aspect-ratio`), fracciones (`fr`), porcentajes y límites fluidos con `clamp()`.
- Definir escalas tipográficas y espacios como tokens fluidos en `rem`, `vw` y `clamp()`;
  no crear una medida distinta para cada breakpoint si una interpolación fluida resuelve
  el cambio.
- Márgenes, padding y gaps deben reutilizar la escala compartida de espacios. Si un rol
  necesita otra proporción (por ejemplo, área táctil o espacio del banner), definir un
  token semántico en el sistema antes de introducir valores aislados en un componente.
- Usar breakpoints para reorganizar la composición o el número de columnas, no para
  saltar entre tamaños rígidos.
- Las únicas medidas físicas pequeñas permitidas son detalles de trazo/borde e iconos
  cuya legibilidad dependa de un tamaño mínimo. Los controles interactivos deben
  alcanzar el área táctil mínima accesible aunque su forma visual sea compacta.

Ejemplo recomendado:

```css
:root {
  --page-gutter: clamp(1rem, 4vw, 1.5rem);
  --section-space: clamp(2rem, 6vw, 4rem);
  --space-sm: clamp(.5rem, 1.3vw, .75rem);
  --space-md: clamp(.75rem, 2vw, 1rem);
  --space-card: clamp(.75rem, 2.5vw, 1.25rem);
  --touch-size: clamp(2.75rem, 3.2vw, 3rem);
  --type-body: clamp(.875rem, .82rem + .18vw, 1rem);
  --type-title: clamp(1.875rem, 1.45rem + 2vw, 2.125rem);
}

.page-shell { width: min(100%, 75rem); padding-inline: var(--page-gutter); margin-inline: auto; }
.section { padding-block: var(--section-space); }
.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(.75rem, 2vw, 1rem); }
```

## Principio Mobile-First

Todo CSS debe escribirse **primero para móvil** y escalar con breakpoints:

```
sin prefijo = móvil (< 40rem)
sm:  = tablet pequeña (≥ 40rem)
md:  = tablet (≥ 48rem)
lg:  = escritorio (≥ 64rem)
xl:  = escritorio grande (≥ 80rem)
```

### ✅ Correcto — Mobile-First
```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[clamp(.75rem,2vw,1.5rem)]">
```

### ❌ Incorrecto — Desktop-first
```tsx
<div className="grid grid-cols-4 sm:grid-cols-2">
```

---

## Sistema de Tokens de Color

Usar los tokens aprobados por el rediseño actual. El tema antiguo de Tailwind ya no es
la fuente de verdad para estos colores. **Nunca usar colores hexadecimales directos en
clases Tailwind.**

| Token | Uso | Color |
|---|---|---|
| `bg-main` | Fondo principal | `#F4EFEA` |
| `bg-card-light` | Tarjetas y superficies beige | `#EFE8E1` |
| `bg-card-white` | Superficie blanca | `#FFFFFF` |
| `bg-dark` | Verde bosque para bloques destacados y footer | `#1C352D` |
| `text-primary` | Texto principal | `#1E2421` |
| `text-muted` | Texto secundario | `#7A7570` |
| `accent-terracotta` | Acentos pequeños, tags e indicadores | `#C86D46` |
| `wa-green` | Icono de WhatsApp; no colorear todo el botón | `#25D366` |
| `border-subtle` | Divisores y bordes suaves | `#E2D8CE` |

### Uso correcto de opacidades con tokens:
```tsx
// ✅ Opacidad con slash notation
<div className="bg-[color:var(--accent-terracotta)]/20 text-[var(--accent-terracotta-text)]">
<div className="bg-[color:var(--bg-dark)]/95">

// ❌ Nunca usar colores hardcodeados
<div style={{ backgroundColor: '#E89945' }}>
```

---

## Tipografía

| Clase Tailwind | Fuente | Uso |
|---|---|---|
| `font-serif` | Playfair Display | Títulos y nombres de producto |
| `font-sans` | DM Sans | UI, cuerpo, descripciones y navegación |

### Escala tipográfica recomendada:

```tsx
// Título y cuerpo con tokens fluidos del sistema
<h1 className="font-serif text-[clamp(1.875rem,1.45rem+2vw,2.125rem)]">
<p className="font-sans text-[clamp(.875rem,.82rem+.18vw,1rem)] leading-relaxed">

// Etiquetas discretas; el tamaño también debe venir de un token fluido
<span className="text-[var(--type-label)] font-bold uppercase tracking-[.16em]">
```

## Logos y marcas

- Revisa el fondo del archivo de logo antes de usarlo. Prefiere SVG o PNG transparente
  para integrarlo directamente sobre la superficie del header, contenido o footer.
- No pongas una placa, tarjeta, borde redondeado ni fondo de color detrás del logo para
  ocultar un fondo incrustado. Tampoco uses modos de mezcla como sustituto de un asset
  transparente.
- Si solo existe un raster con fondo incorporado, prepara una versión transparente con
  bordes limpios y conserva el arte y los colores de marca. Comprueba el contraste sobre
  cada superficie donde aparecerá.
- Respeta la orientación del lockup. Si la composición requiere el nombre junto al
  símbolo, mantén esa relación en móvil y escritorio y verifica que el nombre siga siendo
  legible en ambos tamaños.
- Reutiliza el mismo componente `BrandLogo`, lockup y escala en header y footer. No uses
  otro archivo o una composición distinta para el footer. Solo cambia a la variante clara
  u oscura cuando la superficie lo requiera para conservar contraste; la variante debe
  mantener transparente el fondo y el mismo arte, proporción y relación entre símbolo y
  nombre.

---

## Grilla de Catálogo de Productos

### Regla obligatoria: 2 columnas en móvil

```tsx
// ✅ Catálogo de productos — OBLIGATORIO 2 cols en móvil
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(.75rem,2vw,1.5rem)]">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
```

### Grilla de pilares artesanales
```tsx
// ✅ 4 pilares — 2 en móvil, 4 en desktop
<div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(.75rem,2vw,1.5rem)]">
```

---

## Patrones de Cards

### Card de producto estándar
```tsx
// Proporción consistente; el tamaño sigue el ancho disponible.
<div className="
  group relative overflow-hidden rounded-[clamp(1rem,2vw,1.25rem)]
  bg-white border border-[var(--border-subtle)]
  hover:shadow-coastal transition-all duration-300 cursor-pointer
  aspect-square
">
```

### Card de pilar artesanal
```tsx
<article className="
  group grid min-w-0 justify-items-center gap-[clamp(.5rem,1.5vw,.75rem)]
  rounded-[clamp(1rem,2vw,1.25rem)] border border-[var(--border-subtle)]
  bg-[var(--bg-card-white)] p-[clamp(.75rem,2vw,1.25rem)]
  transition-colors duration-300 hover:border-[var(--accent-terracotta)]
">
```

---

## Sombras y Elevación

```
shadow-sm         → Elevación mínima (cards en reposo)
shadow-coastal    → Elevación media (foto de fundadora, insignias)
shadow-floating   → Elevación alta (carrusel, modales, hovers)
```

---

## Botones — Variantes

### Botón CTA primario
```tsx
<a href="#catalogo" className="
  inline-flex items-center gap-[clamp(.5rem,1.2vw,.75rem)]
  bg-[var(--bg-dark)] text-white rounded-[var(--radius-control)]
  min-h-[var(--touch-size)] px-[var(--space-md)]
  text-[clamp(.75rem,.7rem+.2vw,.875rem)] font-bold
  transition-colors duration-300 active:scale-[.98] touch-manipulation
">
```

### Botón WhatsApp
```tsx
<a href={waLink} target="_blank" rel="noopener noreferrer" className="
  inline-flex items-center gap-[clamp(.5rem,1.2vw,.75rem)]
  rounded-[var(--radius-control)] border border-[var(--border-subtle)]
  bg-[var(--bg-dark)] text-white min-h-[var(--touch-size)] px-[var(--space-md)]
  text-[clamp(.75rem,.7rem+.2vw,.875rem)] font-bold
  transition-colors duration-300 active:scale-[.98] touch-manipulation
">
  <WhatsAppIcon className="size-[clamp(1rem,4vw,1.25rem)] text-[var(--accent-whatsapp)]" />
  <span>Texto del botón</span>
</a>
```

---

## Botones de contacto e indicadores

- Reserva el verde WhatsApp al icono. El CTA principal y los botones de pedido usan el
  mismo fondo verde bosque y texto claro; el icono conserva el verde WhatsApp. En el
  footer verde, la acción puede ser transparente con borde para seguir visible.
- Usa el mismo radio de control para acciones de contacto y pedido. Reserva las pills para
  filtros y etiquetas. El botón «Contáctanos» debe igualar el padding horizontal del CTA
  «Hablar con la Fundadora»; el botón de pedido puede usar el siguiente token fluido de la
  escala para ganar algo de aire lateral. Mantén el precio y la acción en una fila de grid
  compartida, y reserva una fila flexible para la descripción de cada tarjeta para anclar
  los botones a la misma línea aunque cambie la longitud del texto. Conserva el área táctil.
- Equilibra el relleno visual vertical y horizontal con el mismo token de espacio. Si hace
  falta reducir la superficie visible, conserva el área táctil mínima y dibuja el fondo en
  un pseudo-elemento centrado, sin que ese espacio extra parezca relleno del botón.
- Conserva un área táctil accesible aunque el icono o el indicador se vean pequeños.
- Los puntos del carrusel deben usar crema para estados inactivos y terracota para el
  activo, con una sombra o contorno discreto que los mantenga legibles sobre las fotos.
  No uses el verde WhatsApp para la paginación.

## Espaciado y Padding — Guía de Consistencia

| Contexto | Mobile | Tablet | Desktop |
|---|---|---|---|
| Padding de sección | `var(--section-space)` |
| Padding interno de cards | `var(--space-card)` |
| Gap de grillas | `var(--space-grid-wide)` |
| Padding horizontal global | `var(--page-gutter)` |
| Max-width del contenedor | `min(100%, 75rem)` con márgenes automáticos |

El espacio del contenido antes del footer debe provenir del padding inferior de la última
sección y del padding superior del footer, ambos con el token de sección. No sumes un
padding inferior adicional al `main` para compensar la navegación fija; reserva el espacio
de la navegación una sola vez al final del footer, donde el contenido puede quedar detrás.

---

## Transiciones y Micro-animaciones

```tsx
// ✅ Transición estándar de hover
className="transition-all duration-300"  // Rápida para hovers
className="transition-all duration-500"  // Media para cards
className="transition-all duration-700"  // Lenta para imágenes/carrusel

// ✅ Escala en hover (productos)
className="group-hover:scale-105 transition-transform duration-700"

// ✅ Fade in/out de capas en hover
className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"

// ✅ Efecto en botones táctiles
className="active:scale-95 touch-manipulation"
```

---

## Gradientes de Legibilidad

Regla obligatoria para cualquier texto sobre fotografías, banners o historias:

- Garantiza contraste legible para el área más clara de cada imagen y en cada estado
  del carrusel; no evalúes solo una foto ni el punto más oscuro.
- Para texto normal, apunta al menos a una relación de contraste de 4.5:1; para texto
  grande, al menos 3:1. Usa una capa oscura localizada detrás del área de lectura y no
  dependas de la sombra del texto como sustituto del contraste.
- Mantén la fotografía natural: concentra el oscurecimiento detrás del texto y deja
  respirar las zonas que no llevan contenido.

Ejemplo de gradientes localizados para texto sobre imágenes:

```tsx
// Gradiente localizado para sostener el contraste sin oscurecer la foto completa.
<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,53,45,.82),rgba(28,53,45,.68)_65%,transparent_95%)]" />

// Gradiente vertical (texto flotante sobre foto)
<div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(28,53,45,.86),rgba(28,53,45,.76)_50%,rgba(28,53,45,.58)_75%,transparent)]" />

// Gradiente suave de fondo de sección
<section className="bg-[linear-gradient(180deg,#F4EFEA,#EFE8E1_50%,#F4EFEA)]">
```
