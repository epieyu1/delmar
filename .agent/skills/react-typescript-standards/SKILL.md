---
name: react-typescript-standards
description: >
  Estándares de arquitectura React + TypeScript para Del Mar Artesanías.
  Define reglas de tipado, estructura de archivos, patrones de componentes
  y convenciones de código. Activar cuando se crea o edita cualquier
  componente React en el proyecto.
triggers:
  - on_component_create
  - on_component_edit
---

# ⚛️ React + TypeScript Standards — Del Mar Artesanías

## Stack obligatorio
- **React 18+** con hooks funcionales. Prohibido el uso de componentes de clase.
- **TypeScript** estricto. Prohibido el tipo `any`. Usar `unknown` si el tipo es indeterminado.
- **Tailwind CSS** para estilos. Sin CSS inline ni archivos `.css` adicionales salvo `index.css`.
- **Vite** como bundler. No agregar configuraciones de Webpack.

---

## 1. Tipado Estricto

### Props de componentes
Siempre definir interfaces explícitas para las props:

```typescript
// ✅ Correcto
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  fallbackImage: string;
  category: string;
  tag?: string; // Opcionales marcados con ?
  shortDesc: string;
  onWhatsAppClick: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, ... }) => {
  // ...
};

// ❌ Prohibido
export const ProductCard = ({ id, name, price, ...props }: any) => { ... };
```

### Estado local
```typescript
// ✅ Correcto — tipo explícito en useState
const [activeCategory, setActiveCategory] = useState<string>('Todos');
const [isLoading, setIsLoading] = useState<boolean>(false);

// ✅ Tipo inferido cuando es obvio
const [count, setCount] = useState(0); // TypeScript infiere number
```

### Tipos de datos (data layer)
```typescript
// ✅ Definir tipos en src/types/ para todos los modelos de datos
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  tag: string;
  image: string;
  fallbackImage: string;
  shortDesc: string;
  description: string;
  technique: string;
  origin: string;
}

export type ProductCategory =
  | 'Todos'
  | 'Mochilas'
  | 'Ropa y Tejidos'
  | 'Sombreros y Gorros'
  | 'Mantas y Vestidos'
  | 'Souvenirs';
```

---

## 2. Estructura de Archivos

```
src/
├── components/
│   ├── common/          # Átomos: Button, Icon, Badge, ImageWithFallback
│   ├── sections/        # Secciones de página: HeroCarousel, Catalog, BrandStory
│   └── layout/          # Layout global: Navbar, Footer
├── data/                # Datos estáticos del negocio
│   ├── products.js      # Catálogo de productos
│   ├── story.js         # Textos de la historia de la marca
│   └── pillars.js       # Los 4 pilares
├── constants/           # Constantes globales (WhatsApp, etc.)
├── utils/               # Funciones utilitarias puras
├── types/               # Interfaces y tipos TypeScript (NUEVO en refactor)
└── hooks/               # Custom hooks reutilizables (NUEVO si se requiere)
```

### Regla de tamaño de componente
- **Máximo 150 líneas** por archivo de componente.
- Si un componente supera 150 líneas, debe dividirse en sub-componentes.

---

## 3. Patrones de Componentes

### Componente atómico (< 50 líneas)
```tsx
// src/components/common/Badge.tsx
interface BadgeProps {
  text: string;
  variant?: 'gold' | 'teal' | 'terracotta';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'gold',
  className = ''
}) => {
  const variantClasses = {
    gold: 'bg-gold/20 text-gold border-gold/40',
    teal: 'bg-teal/10 text-teal border-teal/30',
    terracotta: 'bg-terracotta/10 text-terracotta border-terracotta/30'
  };

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full border
      text-xs font-bold tracking-wider uppercase
      ${variantClasses[variant]} ${className}
    `}>
      {text}
    </span>
  );
};
```

### Custom Hooks para lógica reutilizable
```typescript
// src/hooks/useProductFilter.ts
import { useState, useMemo } from 'react';
import type { Product } from '../types/product';

export const useProductFilter = (products: Product[]) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const filteredProducts = useMemo(() =>
    activeCategory === 'Todos'
      ? products
      : products.filter(p => p.category === activeCategory),
    [products, activeCategory]
  );

  return { activeCategory, setActiveCategory, filteredProducts };
};
```

---

## 4. Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componente | PascalCase | `ProductCard`, `HeroCarousel` |
| Hook personalizado | camelCase con prefijo `use` | `useProductFilter` |
| Interface/Type | PascalCase | `ProductCardProps`, `BrandStoryData` |
| Constante global | UPPER_SNAKE_CASE | `WHATSAPP_NUMBER` |
| Variable/función | camelCase | `activeCategory`, `handleWhatsApp` |
| Archivo componente | PascalCase.tsx | `ProductCard.tsx` |
| Archivo hook | camelCase.ts | `useProductFilter.ts` |
| Archivo de datos | camelCase.js | `products.js` |

---

## 5. Reglas de Importación

```typescript
// Orden de imports (siempre en este orden):
// 1. React y hooks de React
import { useState, useEffect, useMemo, useCallback } from 'react';

// 2. Librerías externas
// (ninguna externa de momento en este proyecto)

// 3. Componentes internos (por capas: layout > sections > common)
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';

// 4. Datos, constantes y utils
import { INITIAL_PRODUCTS, CATEGORIES } from '../../data/products';
import { getWhatsAppLink } from '../../constants/whatsapp';

// 5. Tipos
import type { Product } from '../../types/product';
```

---

## 6. Manejo de Efectos Secundarios

```typescript
// ✅ Correcto — cleanup en useEffect
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, 7000);
  return () => clearInterval(timer); // Siempre limpiar timers
}, [slides.length]);

// ✅ Memorizar funciones caras
const filteredProducts = useMemo(() =>
  products.filter(p => activeCategory === 'Todos' || p.category === activeCategory),
  [products, activeCategory]
);
```

---

## 7. Accesibilidad (a11y)

Todo componente interactivo debe:
- Tener `aria-label` descriptivo en botones sin texto visible.
- Usar roles semánticos HTML5 (`<section>`, `<nav>`, `<article>`, `<main>`).
- Ser navegable por teclado (`tabIndex`, `onKeyDown`).
- Tener contraste adecuado (mínimo 4.5:1 para texto).

```tsx
// ✅ Correcto
<button
  type="button"
  onClick={prevSlide}
  aria-label="Diapositiva anterior"
  className="..."
>
  <Icon name="chevron-left" aria-hidden="true" />
</button>
```
