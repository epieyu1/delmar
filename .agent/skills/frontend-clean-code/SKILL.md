---
name: frontend-clean-code
description: >
  Buenas prácticas de código limpio, legibilidad, modularidad y optimización
  de rendimiento para el frontend de Del Mar Artesanías. Activar cuando se
  evalúe la calidad del código, se refactorice un componente o se optimice
  el rendimiento de la interfaz.
triggers:
  - on_code_review
  - on_refactor
  - on_performance_review
---

# 🧹 Frontend Clean Code — Del Mar Artesanías

## Principio General

> El mejor código es el que se puede leer en voz alta y tiene sentido.
> Si necesitas un comentario para explicar *qué* hace una línea, el código
> debe renombrarse o reestructurarse. Los comentarios explican el *porqué*.

---

## 1. Funciones Puras y Responsabilidad Única

### ✅ Una función = una responsabilidad
```typescript
// ✅ Correcto — funciones pequeñas y específicas
const formatPrice = (price: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);

const getWhatsAppLink = (message: string): string =>
  `https://wa.me/573218368605?text=${encodeURIComponent(message)}`;

// ❌ Incorrecto — función con múltiples responsabilidades
const handleProduct = (product) => {
  const price = `$${product.price}`;
  const link = `https://wa.me/...?text=Hola, quiero ${product.name} por ${price}`;
  navigator.clipboard.writeText(link);
  window.open(link);
  trackAnalytics(product.id);
};
```

---

## 2. Nomenclatura Semántica

### Variables y estados
```typescript
// ✅ Nombres que describen el contenido/intención
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeCategory, setActiveCategory] = useState('Todos');
const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
const [isAutoPlaying, setIsAutoPlaying] = useState(true);

// ❌ Nombres ambiguos o genéricos
const [state, setState] = useState(false);
const [val, setVal] = useState(0);
const [x, setX] = useState('');
```

### Funciones y handlers
```typescript
// ✅ Verbos descriptivos
const handleCategoryChange = (category: string) => { ... };
const handleWhatsAppInquiry = (productName: string) => { ... };
const navigateToNextSlide = () => { ... };
const navigateToPrevSlide = () => { ... };

// ❌ Nombres genéricos o abreviados
const handle = (c) => { ... };
const fn = () => { ... };
const click = () => { ... };
```

---

## 3. DRY — Don't Repeat Yourself

### Extraer lógica repetida a funciones/hooks
```typescript
// ✅ Si el mismo mensaje de WhatsApp se construye en 3+ lugares, crear una constante
// src/constants/whatsapp.ts
export const WHATSAPP_NUMBER = '573218368605';

export const getProductInquiryMessage = (productName: string, price: number): string => {
  const formattedPrice = formatPrice(price);
  return `Hola Del Mar Artesanías 🌊, me interesa "${productName}" (${formattedPrice}). ¿Está disponible?`;
};

export const getGeneralWhatsAppMessage = (): string =>
  `Hola Del Mar Artesanías 🌊, quisiera información sobre sus artesanías de Dibulla.`;
```

### Extraer clases Tailwind repetidas a variables
```tsx
// ✅ Si el mismo grupo de clases aparece 3+ veces, extraer a una constante
const CARD_BASE_CLASSES = `
  group relative rounded-2xl sm:rounded-3xl overflow-hidden
  bg-white border-2 border-sand-light
  hover:border-gold/40 hover:shadow-floating
  transition-all duration-500 cursor-pointer
`.trim();

// Uso
<div className={`${CARD_BASE_CLASSES} aspect-[3/4]`}>
```

---

## 4. Componentes Modulares y Límite de Líneas

### Regla de 150 líneas máximo por componente
Si un componente supera 150 líneas, dividirlo:

```
CatalogSection.tsx (150 líneas máx)
├── CategoryFilterBar.tsx  → Barra de filtros de categorías
├── ProductGrid.tsx        → Grilla de productos filtrados
└── ProductCard.tsx        → Card individual de producto
```

### Ejemplo de división correcta:
```tsx
// ✅ Catalog.jsx — componente orquestador (< 50 líneas)
export const Catalog = () => {
  const { activeCategory, setActiveCategory, filteredProducts } =
    useProductFilter(INITIAL_PRODUCTS);

  return (
    <section id="catalogo">
      <CategoryFilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductGrid products={filteredProducts} />
    </section>
  );
};
```

---

## 5. Optimización de Rendimiento

### useMemo y useCallback — cuándo usarlos
```typescript
// ✅ useMemo para listas filtradas/ordenadas (operaciones costosas)
const filteredProducts = useMemo(() =>
  activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory),
  [products, activeCategory]
);

// ✅ useMemo para slides (array grande, no cambia)
const slides = useMemo(() => [...], []);

// ✅ useCallback para handlers pasados como props a componentes hijos
const handleCategoryChange = useCallback((category: string) => {
  setActiveCategory(category);
}, []);

// ❌ NO usar useMemo/useCallback para operaciones simples
const title = useMemo(() => 'Del Mar Artesanías', []); // Innecesario
```

### Carga de imágenes
```tsx
// ✅ Lazy loading en imágenes que no son above-the-fold
<img loading="lazy" src={image} alt={name} />

// ✅ Eager loading solo para la imagen principal (LCP)
<img loading="eager" src={heroImage} alt="Hero" fetchPriority="high" />

// ✅ Siempre especificar width y height para evitar Layout Shift (CLS)
<img width={400} height={533} src={image} alt={name} />
```

### Evitar re-renders innecesarios
```tsx
// ✅ Memoizar componentes hijos costosos
const ProductCard = React.memo(({ id, name, price, image }: ProductCardProps) => {
  return ( ... );
});

// ✅ Extraer datos estáticos fuera del componente (no recrear en cada render)
// ❌ Dentro del componente (se recrea en cada render):
const Catalog = () => {
  const categories = ['Todos', 'Mochilas', ...]; // ← Se recrea en cada render
};

// ✅ Fuera del componente (constante):
const CATEGORIES = ['Todos', 'Mochilas', ...]; // ← Se define una vez
const Catalog = () => { ... };
```

---

## 6. Gestión de Errores y Fallbacks

```tsx
// ✅ Siempre tener fallback para imágenes
<ImageWithFallback
  src={product.image}
  fallback={product.fallbackImage}
  alt={product.name}
/>

// ✅ Renderizado condicional claro
{products.length === 0 ? (
  <EmptyState message="No hay productos en esta categoría." />
) : (
  <ProductGrid products={products} />
)}

// ✅ Estado de loading
{isLoading ? (
  <LoadingSpinner />
) : (
  <ProductGrid products={filteredProducts} />
)}
```

---

## 7. Comentarios Estratégicos

```tsx
// ✅ Comentarios que explican el PORQUÉ, no el QUÉ
// Pausa el carrusel en hover para mejor experiencia táctil en móvil
onMouseEnter={() => setIsAutoPlaying(false)}

// El aspect-ratio 3/4 imita la proporción de las fotos de maniquí
// para una grilla visualmente consistente
className="aspect-[3/4]"

// ❌ Comentarios que repiten el código (inútiles)
// Suma 1 al índice actual del slide
setCurrentSlide(prev => prev + 1);
```

---

## 8. Checklist de Calidad de Código

Antes de dar por finalizado un componente, verificar:

- [ ] ¿El nombre del componente describe exactamente lo que hace?
- [ ] ¿Las props tienen tipos explícitos (no `any`)?
- [ ] ¿El componente tiene menos de 150 líneas?
- [ ] ¿Existe lógica repetida que podría extraerse a un hook o constante?
- [ ] ¿Todas las imágenes tienen `alt`, `loading` y `fallback`?
- [ ] ¿Los efectos tienen cleanup (clearInterval, clearTimeout, abort)?
- [ ] ¿Los handlers tienen nombres que comienzan con `handle` o un verbo?
- [ ] ¿El componente es accesible con teclado y lector de pantalla?
- [ ] ¿Se usó `useMemo`/`useCallback` donde es necesario y no donde no lo es?
- [ ] ¿Los datos de negocio (precios, textos, contacto) vienen de `src/data/` y no están hardcodeados?
