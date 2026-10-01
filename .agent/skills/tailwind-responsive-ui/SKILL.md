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

## Principio Mobile-First

Todo CSS debe escribirse **primero para móvil** y escalar con breakpoints:

```
sin prefijo = móvil (< 640px)
sm:  = tablet pequeña (≥ 640px)
md:  = tablet (≥ 768px)
lg:  = escritorio (≥ 1024px)
xl:  = escritorio grande (≥ 1280px)
```

### ✅ Correcto — Mobile-First
```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
```

### ❌ Incorrecto — Desktop-first
```tsx
<div className="grid grid-cols-4 sm:grid-cols-2">
```

---

## Sistema de Tokens de Color

Tokens definidos en `tailwind.config.js`. **Nunca usar colores hexadecimales directos en clases Tailwind.**

| Token | Uso | Color |
|---|---|---|
| `deep-blue` | Fondos oscuros, textos principales | `#1C3A4A` |
| `teal` | Acentos secundarios, iconos | `#1C646D` |
| `teal-dark` | Variante oscura de teal | `#164E56` |
| `gold` | CTA primario, highlights, ornamentos | `#E89945` |
| `sand` | Fondos claros, texto sobre oscuro | `#F5EDD8` |
| `sand-light` | Variante más clara de sand | `#FDF8EF` |
| `terracotta` | Tags, badges, énfasis cálido | `#99482F` |
| `wa-green` | Botones de WhatsApp | `#25D366` |
| `wa-green-hover` | Hover de botones WhatsApp | `#1DA851` |

### Uso correcto de opacidades con tokens:
```tsx
// ✅ Opacidad con slash notation
<div className="bg-gold/20 text-gold border-gold/40">
<div className="bg-deep-blue/95">

// ❌ Nunca usar colores hardcodeados
<div style={{ backgroundColor: '#E89945' }}>
```

---

## Tipografía

| Clase Tailwind | Fuente | Uso |
|---|---|---|
| `font-serif` | Playfair Display | Títulos, nombres de productos |
| `font-script` | Great Vibes | Citas, slogan emocional, subtítulos poéticos |
| `font-sans` | Inter | Cuerpo de texto, descripciones, navegación |

### Escala tipográfica recomendada:

```tsx
// Título principal (h1/h2)
<h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue">

// Subtítulo poético
<p className="font-script text-lg sm:text-xl text-gold">

// Cuerpo de texto
<p className="font-sans text-sm sm:text-base text-deep-blue/85 leading-relaxed">

// Label/badge (uppercase)
<span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-teal">

// Texto pequeño auxiliar
<span className="text-[11px] text-deep-blue/60">
```

---

## Grilla de Catálogo de Productos

### Regla obligatoria: 2 columnas en móvil

```tsx
// ✅ Catálogo de productos — OBLIGATORIO 2 cols en móvil
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
```

### Grilla de pilares artesanales
```tsx
// ✅ 4 pilares — 2 en móvil, 4 en desktop
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
```

---

## Patrones de Cards

### Card de producto estándar
```tsx
// Aspect ratio fijo para uniformidad visual
<div className="
  group relative rounded-2xl sm:rounded-3xl overflow-hidden
  bg-white border-2 border-sand-light
  hover:border-gold/40 hover:shadow-floating
  transition-all duration-500 cursor-pointer
  aspect-[3/4]  // Ratio retrato para fotos de productos en maniquí
">
```

### Card de pilar artesanal
```tsx
<div className="
  group relative rounded-2xl sm:rounded-3xl overflow-hidden
  bg-white border-2 border-sand-light
  hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50
  shadow-sm hover:shadow-floating
  transition-all duration-500 cursor-pointer
  aspect-square sm:aspect-auto sm:h-56 md:h-64
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

### Botón CTA primario (dorado)
```tsx
<a href="#catalogo" className="
  inline-flex items-center gap-2
  bg-gold hover:bg-gold/90 text-deep-blue
  px-5 py-3 sm:px-7 sm:py-3.5 rounded-full
  font-bold text-xs sm:text-sm
  shadow-lg hover:shadow-xl
  transition-all active:scale-95 touch-manipulation
">
```

### Botón WhatsApp
```tsx
<a href={waLink} target="_blank" rel="noopener noreferrer" className="
  inline-flex items-center gap-2
  bg-wa-green hover:bg-wa-green-hover text-white
  px-5 py-3 sm:px-7 sm:py-3.5 rounded-full
  font-bold text-xs sm:text-sm
  shadow-lg hover:shadow-xl
  transition-all active:scale-95 touch-manipulation
">
  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
  <span>Texto del botón</span>
</a>
```

---

## Espaciado y Padding — Guía de Consistencia

| Contexto | Mobile | Tablet | Desktop |
|---|---|---|---|
| Padding de sección | `py-10` | `sm:py-14` | `md:py-16` |
| Padding interno de cards | `p-4` | `sm:p-5` | — |
| Gap de grillas | `gap-3` | `sm:gap-4` | `md:gap-6` |
| Padding horizontal global | `px-4` | `sm:px-6` | `lg:px-8` |
| Max-width del contenedor | — | — | `max-w-7xl mx-auto` |

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

Para texto sobre imágenes de fondo:

```tsx
// Gradiente horizontal (imagen de fondo, texto a la izquierda)
<div className="absolute inset-0 bg-gradient-to-r from-deep-blue/95 via-deep-blue/75 to-deep-blue/20 sm:to-transparent" />

// Gradiente vertical (texto flotante sobre foto)
<div className="absolute inset-0 bg-gradient-to-t from-deep-blue/85 via-deep-blue/20 to-transparent" />

// Gradiente suave de fondo de sección
<section className="bg-gradient-to-b from-sand via-sand-light/50 to-sand">
```
