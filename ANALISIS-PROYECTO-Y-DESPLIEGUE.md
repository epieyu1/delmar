# Del Mar Artesanías — Contexto completo del proyecto (base para el rediseño)

**Actualizado:** 29 de octubre de 2026
**Repositorio:** `github.com/epieyu1/delmar` (público) · rama `main` · commit `af0d658`
**Producción:** `https://delmar-eta.vercel.app`
**Verificado con:** clon del repo, build de producción propio, `curl` a producción y a ambos dominios, y lectura completa de `src/`.

---

## 0. Corrección importante sobre el dominio

Tú indicaste `delmar.vercel.app`. **Ese dominio no sirve este catálogo.** Lo comprobé:

| Dominio | Respuesta | Qué es |
|---|---|---|
| `delmar.vercel.app` | **HTTP 307 → `/login`** | **Otra aplicación** (Next.js, título `Delmar`, fuentes Geist, pantalla de login). No contiene la palabra «artesanías» en ninguna parte. |
| `delmar-eta.vercel.app` | **HTTP 200**, 3.481 bytes | **Tu catálogo**, idéntico al commit `af0d658` |

Los `.vercel.app` son globales: el nombre `delmar` ya está ocupado por un tercero (o por otro proyecto tuyo distinto). **El sitio real es `delmar-eta.vercel.app`** y no se puede renombrar a `delmar` mientras ese nombre exista. Si compartiste `delmar.vercel.app` con alguien, esa persona vio una pantalla de login ajena.

Esto refuerza lo único que de verdad falta: **un dominio propio** (ej. `delmarartesanias.com`), que además es lo que arregla la vista previa al compartir por WhatsApp.

---

## 1. Qué es el proyecto

Catálogo web de **Del Mar Artesanías**, marca artesanal de **Dibulla, La Guajira**, fundada por una mujer wayúu. Vende mochilas, bolsos, llaveros, pochets y sombreros tejidos a mano.

**No es una tienda transaccional.** No hay carrito, ni pagos, ni usuarios, ni inventario. El sitio existe para llevar al visitante a **WhatsApp** con el producto y el precio ya escritos en el mensaje. Número en el código: **+57 321 836 8605** (`src/constants/whatsapp.js`).

---

## 2. Dónde está todo (confirmado)

| Pieza | Dónde | Confirmación |
|---|---|---|
| Código fuente | **GitHub** `epieyu1/delmar` | 102 archivos, 9 commits, 6,6 MB, último push 6 oct 2026 |
| Producción | **Vercel** `delmar-eta.vercel.app` | `server: Vercel`, brotli, responde 200 con el build de `af0d658` |
| Base de datos | **No existe** | `grep` de `fetch(`, `axios`, `supabase`, `firebase`, `localStorage`, `/api/` en `src/` → **0 resultados** |
| Backend / API | **No existe** | Sitio 100 % estático; `dist` son archivos planos |
| Contenido del catálogo | **`src/data/products.js`** | 12 productos escritos a mano en el código |
| Imágenes | **Dentro del repositorio** | `productos/` 6,1 MB · `public/` 1,5 MB · `src/assets/` 1,2 MB |
| Hostinger | **No se usa** | Solo queda un `public/.htaccess` que Vercel publica pero ignora |
| CI/CD | Integración Git de Vercel | Sin `vercel.json`, sin GitHub Actions |

> «Todo en GitHub y Vercel» es exacto: **GitHub es la fuente de verdad y Vercel solo publica el resultado del build**. No hay nada más. Cualquier cambio de contenido o de diseño se hace editando archivos del repo y haciendo `push`; Vercel reconstruye solo.

---

## 3. Cómo está construido

- **React 18.3.1 + Vite 5.4.11**, JavaScript puro (`.jsx`, **sin TypeScript**), sin router, sin estado global, sin librerías de UI.
- **Todo el estilo en un archivo:** `src/index.css`, **527 líneas**, organizado en 8 bloques comentados (tokens, base, header, hero, secciones, catálogo, historia, footer, modales).
- **61 variables CSS** en `:root`: 19 de color, 47 de espacio/tipo/radio, más fuentes y marcas.
- **3 breakpoints:** `40rem` (640 px), `48rem` (768 px), `64rem` (1024 px).
- **5 secciones** con ancla: `#inicio`, `#pilares`, `#catalogo`, `#historia`, `#contacto`.
- **14 componentes** en `src/components/` (common · layout · sections · modals).
- **Tipografía:** Playfair Display (editorial) + DM Sans (UI), ambas por Google Fonts.
- **Build real:** 187 kB de JS (59,6 kB gzip) + 36,6 kB de CSS (6,8 kB gzip); `dist` de 8,5 MB, de los cuales 6,7 MB son imágenes.

### Mapa de la página

| # | Sección (ancla) | Componente | Datos que consume |
|---|---|---|---|
| 1 | `#inicio` | `Navbar` + `HeroCarousel` (4 diapositivas + tarjeta de pieza destacada) | `brandImages.js`, `products[0]`, `story.js` |
| 2 | `#pilares` | `CraftPillars` (franja de 4 fotos + 4 tarjetas) | `pillars.js`, `brandImages.js` |
| 3 | `#catalogo` | `Catalog` (buscador + 8 filtros + rejilla) | `products.js` (12 piezas) |
| 4 | `#historia` | `BrandStory` (foto, relato, cita, contacto) | `story.js`, `brandImages.js` |
| 5 | `#contacto` | `Footer` | `story.js`, `whatsapp.js` |

Además: `ProductModal` (ficha con galería, miniaturas y zoom a pantalla completa) se abre desde cualquier tarjeta.

---

## 4. Sistema de diseño actual (lo que se puede conservar o reemplazar)

**Paleta (10 tokens):**
`--bg-main #F4EFEA` · `--bg-card-light #EFE8E1` · `--bg-card-white #FFFFFF` · `--bg-dark #1C352D` · `--accent-terracotta #C86D46` · `--accent-terracotta-text #8F492F` · `--accent-whatsapp #25D366` · `--text-primary #1E2421` · `--text-muted #7A7570` · `--border-subtle #E2D8CE`
Más `--brand-ink #155C68` (tinta del logotipo) y `--forest-hover #29483D`.

**Escala fluida:** 11 tokens de tipografía (`--type-label` a `--type-quote`) y 20 de espacio, todos con `clamp()`. **No hay ni un tamaño fijo en píxeles** en el CSS: es la parte más sólida del proyecto y conviene no tocarla al rediseñar.

**Detalles de comportamiento que no deben romperse:**
- Navegación inferior fija en móvil (<768 px) y barra superior desde 768 px.
- Rejilla de catálogo: **2 columnas en móvil**, 3 en tablet, 4 en escritorio.
- Área táctil mínima de 44 px en todos los controles (`--touch-size`).
- `prefers-reduced-motion` respetado; carrusel que se pausa al pasar el ratón.
- Ficha de producto con foco atrapado en el zoom y retorno de foco al cerrar.

---

## 5. Código muerto que el rediseño puede eliminar sin riesgo

Verificado: **ningún componente los importa**.

| Archivo | Líneas | Estado |
|---|---|---|
| `src/components/common/FloatingDecorations.jsx` | 167 | Nunca se importa |
| `src/components/common/KannasBorder.jsx` | 49 | Nunca se importa |
| `src/components/modals/PhotoManagerModal.jsx` | 117 | Nunca se importa |
| `src/App.css` | 1 | Vacío, no se importa |
| `public/icons.svg` | — | Nadie lo referencia |
| 5 imágenes de `public/` | — | `top-crochet-blanco/lila/marron`, `conjunto-crochet-verde`, `mochila-perlas-negra` |

**Consecuencia directa:** `FloatingDecorations` era el único consumidor de las utilidades de Tailwind. Todos los `<Icon>` vivos pasan `className` explícito, y `max-w-full block` de `ImageWithFallback` ya está cubierto por la regla global `img, svg { display:block; max-width:100% }`. Por lo tanto:

> **El `<script src="https://cdn.tailwindcss.com">` se puede borrar sin que cambie un solo píxel.** Hoy es una petición externa + compilador en el navegador para clases que nunca se renderizan.

---

## 6. Contenido real disponible

- **12 productos** en 4 categorías: Bolsos (6), Mochilas (4), Llavero (1), Sombreros y Gorros (1).
- **Precios:** de 10.000 a 220.000 COP, coherentes entre dato, tarjeta, ficha y mensaje de WhatsApp.
- **41 archivos de imagen** de producto en `productos/`.
- **8 categorías declaradas**, de las cuales **3 no tienen producto**: *Ropa y Tejidos*, *Mantas y Vestidos*, *Souvenirs*. En un catálogo de 12 piezas, un filtro que devuelve «0 piezas» se lee como error.

**Problema de material, no de código:** las cuatro «fotos» de la franja de historia y del `og:image` (`fundadora.jpg`, `fundadora-salinas.jpg`, `dibulla-mar.jpg`, `artesanias-guajira.jpg`) son **el mismo archivo**, mismo MD5 `15550de4…`, 108.436 bytes. El carrusel y la franja de pilares muestran por tanto la misma imagen repetida. **Para un rediseño esto es el límite principal: sin fotos distintas, cualquier composición editorial se ve vacía.**

---

## 7. Reglas del propio repositorio que un rediseño debe respetar

Están escritas en `.agent/skills/` y son del proyecto, no mías:

1. **`scope-isolation-guard`:** no tocar archivos fuera del alcance pedido; si el cambio afecta a más de un archivo, presentar resumen de alcance y esperar confirmación. Protege expresamente `products.js`, `story.js`, `pillars.js`, `whatsapp.js`, `public/`, `index.css`.
2. **`tailwind-responsive-ui`:** prohibido fijar anchos, altos, fuentes, padding o gaps en píxeles; todo fluido con `clamp()`/`rem`/`vw`; móvil primero; catálogo **2 columnas en móvil**; nunca hexadecimales sueltos en clases.
3. **`react-typescript-standards`:** máximo **150 líneas por componente**; hoy lo incumplen `ProductModal` (193), `HeroCarousel` (183) y `FloatingDecorations` (167).
4. **`add-product`:** las fotos van en su subcarpeta dentro de `productos/`, con nombre descriptivo en minúsculas y guiones; sin duplicados idénticos.

> Nota: esas skills hablan de TypeScript estricto, pero el código es JSX. Si el rediseño va a migrar a TS, es una decisión aparte que conviene tomar ahora y no a mitad de obra.

---

## 8. Hallazgos técnicos que el rediseño debería resolver de paso

1. **Tailwind Play CDN en producción** para clases muertas (ver §5). La documentación oficial lo marca como solo para desarrollo.
2. **Caché apagada:** producción sirve JS/CSS con hash y las imágenes con `cache-control: public, max-age=0, must-revalidate`. Se revalida todo en cada visita. Falta un `vercel.json` con `immutable` para `/assets/*`.
3. **SEO incompleto:** sin `robots.txt`, sin `sitemap.xml`, sin datos estructurados (`LocalBusiness`/`Product`), sin `canonical`, y **cuatro `<h1>`** en el DOM (uno por diapositiva del carrusel).
4. **`og:image` y `twitter:image` en ruta relativa** (`/fundadora.jpg`): WhatsApp y Facebook necesitan URL absoluta con dominio.
5. **Peso:** `dist` de 8,5 MB; 6 fotos idénticas de 108 kB en `public/`; logotipos PNG de 272 kB y 300 kB (806×353 y 687×323) mostrados a ~50 px.
6. **Sin medición ni redes:** no hay analítica ni píxel de Meta, y el pie no enlaza Instagram ni TikTok.
7. **Nombres de archivo con espacios y paréntesis** (`WhatsApp Image 2026-10-03 at 7.55.11 PM.jpeg`), más un `(copia).jpeg` idéntico byte a byte en `productos/bolso-bucket-dorado…/`.
8. **Configuración huérfana:** `.oxlintrc.json` sin `oxlint` instalado ni script `lint`; `@types/react` sin TypeScript; `README.md` sigue siendo el de la plantilla de Vite.

---

## 9. Cómo enfocaría el cambio de diseño

**Sin riesgo, en cualquier orden:**
1. Borrar el CDN de Tailwind y el código muerto del §5 → menos peticiones, mismo resultado visual.
2. Quitar las 3 categorías vacías (o dejarlas solo cuando existan productos).
3. Añadir `vercel.json` con caché inmutable y cabeceras.
4. Optimizar logotipos y fotos a WebP; deduplicar `public/`.

**Requiere decisión de diseño (lo que cambia la identidad):**
5. **Dirección visual.** Hoy es «artesanal cálido»: marfil, verde bosque, terracota, serif editorial. Alternativas: (a) refinar lo actual con más aire y menos tarjetas, (b) llevarlo a «editorial de moda» con tipografía grande y foto a sangre, (c) «boutique caribeña» con color más saturado. Las tres caben en los tokens actuales sin reescribir componentes.
6. **Fotos.** Sin 4 imágenes distintas de la fundadora, la sección de historia no se puede rediseñar en serio.
7. **Contenido nuevo:** ¿Instagram/TikTok? ¿testimonios? ¿política de envíos? Cada bloque nuevo necesita datos reales, no de relleno.

**Orden que propongo:** material (fotos + dominio) → tokens y tipografía → secciones una por una con confirmación de alcance → rendimiento y SEO → `push` (Vercel publica solo).

---

## 10. Decisiones que necesito de ti para arrancar

1. **¿Qué dirección visual** quieres (a/b/c de arriba, o una referencia concreta)?
2. **¿Tienes fotos reales distintas** de la fundadora y de Dibulla? ¿Y fotos nuevas de producto?
3. **¿El dominio propio está comprado?** ¿Cuál y dónde?
4. **¿Los 12 productos y precios siguen vigentes?** ¿Falta o sobra alguno?
5. **¿Instagram/TikTok oficiales?** ¿Quieres medición desde el lanzamiento?
6. **¿Seguimos en JSX o migramos a TypeScript** durante el rediseño?

---

## 11. Checklist de despliegue (Vercel, sin Hostinger)

1. Confirmar la cuenta/equipo propietario del proyecto que sirve `delmar-eta.vercel.app`.
2. Comprar/conectar el dominio y verificar DNS + SSL.
3. Añadir `vercel.json`: caché inmutable para `/assets/*`, cabeceras de seguridad, y el rewrite si algún día hay rutas.
4. `og:image` y `twitter:image` con URL absoluta del dominio final.
5. Borrar Tailwind CDN y código muerto.
6. Optimizar imágenes y deduplicar `public/`.
7. `robots.txt` + `sitemap.xml` + datos estructurados `LocalBusiness`.
8. Revisar los 12 productos (precio, categoría, fotos, textos) y las categorías vacías.
9. Prueba real en móvil: abrir, filtrar, abrir ficha, pulsar «Pedir» y comprobar el mensaje en WhatsApp.
10. Historial de Vercel: cada `push` a `main` publica; no hay paso manual.
