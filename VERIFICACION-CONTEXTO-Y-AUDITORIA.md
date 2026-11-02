# Verificación de contexto, skills y metodología de auditoría

**Fecha:** 31 de octubre de 2026
**Alcance:** revisión previa a la validación visual contra la imagen de referencia. No se modificó ningún archivo del proyecto; este informe es solo lectura más un `npm run build` de comprobación.
**Método:** lectura completa de `memoria/` (4 documentos), los 6 skills de `.agent/skills/`, y el código vivo (`src/`, 24 componentes, 12 productos, `src/index.css` con 3.059 líneas). Comprobaciones ejecutadas localmente: build de producción, hashes de imágenes, contraste calculado de la paleta, conteo de valores en píxeles, estado del repositorio Git.

---

## 1. Veredicto general

| Bloque | Estado | Qué significa |
|---|---|---|
| Código y build | **Correcto** | `npm run build` termina en 361 ms, 94 módulos, sin errores. |
| Coherencia de contenido | **Correcta** | 12 productos, precios y fotos reales; ningún dato de muestra ni del ejemplo. |
| Skills del proyecto | **Incorrectas en 4 de 6** | Describen un proyecto distinto (TypeScript + Tailwind + cero píxeles) del que existe (JSX + CSS puro). |
| Memoria del proyecto | **Parcialmente desactualizada** | La metodología sirve; el análisis técnico describe la versión anterior; el sistema de diseño no coincide con los tokens aplicados. |
| Metodología del auditor | **Válida como proceso, incompleta como umbral** | 6 de sus 8 criterios no son medibles y no exige evidencia; hay cambios posteriores al último dictamen. |
| Auditoría (cierre) | **Sin cerrar** | La ronda 3 quedó "pendiente" y el CSS se editó 22 minutos después del informe. |
| Repositorio Git local | **Roto** | El paquete de objetos no se puede leer; `git status`/`diff`/`push` fallan. |

**Conclusión:** el proyecto está sano en código y contenido, pero **la documentación de gobierno (skills + memoria + umbral) no describe lo que realmente hay**, y la auditoría no está cerrada. Antes de comparar con la referencia hay que decidir qué documento manda, porque hoy dos skills ordenan reescribir cosas que el auditor ya aprobó (migrar a TypeScript, eliminar los píxeles, usar Tailwind).

---

## 2. Skills, una por una

Los seis skills están en `.agent/skills/`. En esta sesión **no aparecen entre las skills cargadas del agente**: existen como archivos, pero nadie los inyecta automáticamente; hay que leerlos a mano. Eso ya es un hallazgo: dos de ellos se describen como "obligatorio activar al inicio de cualquier sesión" y no se activan.

| Skill | Qué exige | Realidad verificada | Veredicto |
|---|---|---|---|
| `scope-isolation-guard` | No tocar nada fuera del alcance; confirmar si el cambio afecta a más de un archivo; protege `products.js`, `story.js`, `pillars.js`, `whatsapp.js`, `public/`, `index.css` | Se cumple: los datos de negocio no tienen ediciones sueltas y el contenido es íntegro. Protege `tailwind.config.js`, **que no existe** en el repo. | **Vigente**, con una referencia muerta que hay que corregir |
| `add-product` | Fotos en subcarpeta propia, nombre descriptivo en minúsculas con guiones, sin copias idénticas; precios en pesos enteros; no inferir materiales ni medidas | `products.js` importa 41 fotos llamadas `WhatsApp Image 2026-10-03 at 7.58.09 PM (1).jpeg`; existe una copia **byte a byte idéntica** (`productos/bolso-bucket-dorado-correa-aros-tejidos/… (copia).jpeg`) | **Correcta pero incumplida por el repo** |
| `react-typescript-standards` | TypeScript estricto, prohibido `any`, Tailwind obligatorio, máximo 150 líneas por componente, tipos en `src/types/` | El proyecto es **JSX puro sin TypeScript ni Tailwind**; no existe `src/types/`; `ProductModal.jsx` tiene **194 líneas** (> 150) | **Desalineada**: ordena un stack que el proyecto no usa |
| `tailwind-responsive-ui` | Prohibido fijar anchos, altos, fuentes, padding o gaps en píxeles; todo con `clamp()`/`rem`/`vw`; área táctil mínima 44 px; nunca hexadecimales sueltos | `src/index.css` tiene **657 valores en píxeles** y **5 `clamp()`**; los filtros miden **28–29 px de alto** con letra de **8–9 px**; hay hexadecimales sueltos (`#77736E`); Tailwind no está instalado | **Contradice el código aprobado** |
| `frontend-clean-code` | 150 líneas por componente, `alt`/`loading` en imágenes, `useMemo` donde toca, sin lógica duplicada | Se cumple salvo el límite de 150 líneas (`ProductModal`). Sus ejemplos usan clases Tailwind inexistentes | **Mayormente vigente**, ejemplos obsoletos |
| `git-commit-push` | Revisar rama y diff, `git diff --cached --check`, nunca imprimir credenciales, askpass temporal, verificar el push | Procedimiento correcto y seguro. **Hoy no es ejecutable**: el object store local no se puede leer (§6) | **Correcto, bloqueado por el repositorio** |

**El conflicto que hay que resolver sí o sí:** `react-typescript-standards` y `tailwind-responsive-ui` fueron escritas para otra versión del proyecto. Si un agente las carga tal cual, va a intentar (a) migrar a TypeScript, (b) reescribir 657 valores de píxeles a `clamp()`, (c) instalar Tailwind. Cualquiera de las tres cosas desarma el diseño que la auditoría viene validando en móvil. No es un detalle de estilo: es la diferencia entre "corregir el diseño" y "rehacer el proyecto".

---

## 3. Memoria, documento por documento

### `METODOLOGIA-GAUNTLET.md` — correcta en el proceso
Las cuatro cajas (tarea, método, umbral, entregable) son claras y honestas: exige auditor independiente, prohíbe el mockup, prohíbe contenido inventado y no acepta "compila, luego está bien". Sirve. Su debilidad está en el umbral, no en el método (§5).

### `DIRECTIVAS-AGENTES.md` — correcta
Coherente con la metodología. Su checklist repite el umbral con redacción más operativa; no se contradice con nada.

### `SISTEMA-DISENO-MOVIL.md` — los tokens no son los aplicados
El documento declara una paleta; el móvil aplica otra, porque el bloque `@media (max-width: 767px)` de `src/index.css` redefine las variables dentro de `.mobile-app-surface`:

| Token | Documentado | Aplicado en móvil | Diferencia |
|---|---|---|---|
| `--paper` | `#F5F0E8` | `#F5F1E8` | sí |
| `--paper-warm` | `#FBF8F1` | `#FFFCF5` | sí |
| `--wine` | `#381626` | `#3B1328` | sí |
| `--wine-deep` | `#29101D` | `#260D1B` | sí |
| `--coral` | `#E39A8D` | `#E9A08D` | sí |
| `--sage` | `#DCE3D8` | `#E4E7DE` | sí |
| `--ink` | `#202725` | `#2C2925` | sí |
| `--ink-soft` | `#69716C` | `#76716B` | sí |

Ningún token documentado es el que se ve en pantalla. Además, el documento dice "titulares en DM Sans" y eso se logra con `--font-editorial: var(--font-ui)` dentro del breakpoint móvil, un mecanismo que el documento no menciona. **El documento describe la intención; el CSS aplica otra cosa.**

### `INFORME-AUDITORIA.md` — no está cerrado
- Ronda 1: FAIL con 5 hallazgos. Ronda 2: FAIL con 1 bloqueante (el dock tapaba la segunda fila).
- Ronda 3: **"Auditoría independiente pendiente"**. No hay dictamen.
- `src/index.css` tiene fecha **30 oct 10:53**; el informe, **10:31**. Hay **22 minutos de cambios posteriores al informe** (el bloque final de overrides: `aspect-ratio 1.12/1`, `margin-bottom 72px` del primer grupo, filtros a 8 px). Esos cambios son, precisamente, los que arreglaban el hallazgo 2 y **nunca fueron auditados**.
- El informe no tiene **tabla criterio → PASS/FAIL**. El umbral exige que el auditor "confirme todos los criterios"; el documento solo transcribe hallazgos en prosa. Hoy no se puede afirmar que los 8 criterios estén confirmados: seis no se mencionan.
- La referencia auditada está en `~/Downloads/_ (2).jpeg`, **fuera del repositorio**. Comprobé que existe (83.690 bytes, 30 oct 09:46). Si ese archivo se mueve, la auditoría no se puede reproducir.

### `ANALISIS-PROYECTO-Y-DESPLIEGUE.md` — describe la versión anterior
Es el documento más completo y el más desactualizado. Contraste con el código de hoy:

| Afirma | Realidad hoy |
|---|---|
| `index.css` de 527 líneas | **3.059 líneas** en tres capas apiladas |
| 5 secciones con ancla (`#inicio`, `#pilares`, `#catalogo`, `#historia`, `#contacto`) | App de **5 pestañas** sin anclas; solo sobreviven `#pilares` y `#contacto` en componentes **sin usar** |
| 14 componentes | **24** |
| Tailwind Play CDN en producción | **No existe**: `index.html` no lo carga y Tailwind no está instalado |
| Carrusel de 4 diapositivas, tipografía Playfair en titulares | Sin carrusel; en móvil los titulares son DM Sans |
| 8 categorías, 3 sin producto | Correcto (siguen declaradas en `CATEGORIES`, sin uso real) |
| 4 fotos de marca idénticas (mismo MD5) | Correcto: **7 archivos** con MD5 `15550de4…` |

Lo que sigue siendo exacto: 12 productos, rango 10.000–220.000 COP, sitio estático sin backend, `af0d658` como commit clonado, producción en `delmar-eta.vercel.app`. **Úsalo como historia, no como estado actual.**

### `DISENO-REFERENCIA-Y-ADAPTACION.md` — una lectura que debo confirmar contigo
Describe la pantalla derecha de la referencia como "título y controles sobre fondo claro, **filtros en píldoras** en una fila, cuadrícula de productos". Al abrir la imagen (`_ (2).jpeg`) veo en esa pantalla: cabecera con menú, marca y carrito, y **directamente la cuadrícula de dos columnas**; no veo una fila de filtros en píldoras. Puede ser que los píldoras vengan de la pantalla izquierda o de una lectura tuya de la intención del diseño. Antes de "corregir la web para que sea igual a la referencia" necesito que me confirmes si los filtros deben seguir existiendo como píldoras (es una función real del sitio) o si la referencia no los tiene y hay que replantearlos.

---

## 4. Lo que sí está bien y no hay que tocar

- **Contenido:** 12 productos con nombre, categoría, precio, descripción y detalles; 11 con bloque `details` y el restante con `technique`/`origin`, que la ficha usa como respaldo. Nada inventado.
- **WhatsApp:** `573218368605` en `src/constants/whatsapp.js`, con cuatro mensajes distintos según el contexto (general, pedido, consulta, historia). Todos codifican el texto con `encodeURIComponent`.
- **Funciones vivas:** 5 pestañas, búsqueda con normalización de acentos, filtros derivados de los productos reales, ficha con galería y miniaturas, zoom con foco atrapado y retorno de foco, `Esc` y flechas.
- **Accesibilidad de base:** `aria-label` en todos los botones de icono, `sr-only` en la barra inferior, foco visible, `prefers-reduced-motion` respetado.
- **Rendimiento del build:** 183,48 kB de JS (58,43 kB gzip) y 43,41 kB de CSS (7,68 kB gzip).
- **Sin contenido del ejemplo:** ninguna marca, nombre ni precio de la lámina de referencia aparece en el código.

---

## 5. La metodología del auditor: qué corregir para que sea un umbral real

### 5.1 Lo que ya está bien
Separa las cuatro cajas, exige independencia, prohíbe el mockup, prohíbe el contenido inventado y no acepta la compilación como aprobación. Eso es más disciplina de la que suele haber en un rediseño.

### 5.2 Los ocho huecos, con evidencia

1. **Seis de los ocho criterios no son medibles.** "Retícula equilibrada", "la insignia no compite con el subtítulo", "conservan su funcionamiento", "no se monta sobre otro elemento": son adjetivos. Sin una medición definida, dos auditores dan veredictos distintos y ninguno es reproducible.
2. **No exige tabla criterio → PASS/FAIL.** El umbral dice "el auditor confirme todos estos criterios", pero el informe no los enumera. Resultado: hoy no hay forma de saber cuáles se confirmaron.
3. **No incorpora las reglas del propio repositorio.** El umbral ignora el área táctil de 44 px y el contraste de 4.5:1 que exigen `tailwind-responsive-ui` y `react-typescript-standards`. Medición de hoy: los filtros tienen **28–29 px de alto y letra de 8–9 px**; el texto secundario (`--ink-soft #76716B` sobre `--paper #F5F1E8`) da **4,29:1**, por debajo de AA. El umbral actual no lo detecta porque solo mira si algo se corta.
4. **No exige evidencia.** No pide captura por pestaña, ni viewport declarado, ni hash del commit auditado. Sin eso, la auditoría no se puede repetir ni comparar entre rondas: solo queda la narración del auditor.
5. **Un solo ancho.** Todo se audita a 390 × 844, pero el criterio 3 habla de "pantallas más estrechas" y el CSS tiene un breakpoint en 350 px **que nunca se auditó**.
6. **La referencia no está versionada.** Vive en `~/Downloads`. Debe copiarse a `memoria/referencia/` para que la comparación sea reproducible.
7. **No define quién es el auditor ni cómo se garantiza la independencia.** ¿Otra sesión? ¿Otro modelo? ¿Alguien que no vio el constructor? El informe dice "auditor independiente: FAIL" sin identidad ni procedimiento.
8. **El ciclo se rompió al final.** Ronda 3 pedida, CSS editado después, dictamen nunca emitido, y el entregable se declara "pendiente". Cualquier trabajo encima de eso se apoya en una versión no auditada.

### 5.3 Umbral propuesto (medible, criterio por criterio)

| # | Criterio | Cómo se mide | Pasa si |
|---|---|---|---|
| 1 | Sin carcasa ni mockup | Inspección del DOM + captura 390 × 844 | No hay marcos, barras de estado ni fondo de póster |
| 2 | Sin desbordamiento horizontal | `document.documentElement.scrollWidth ≤ clientWidth` en 360, 390, 414 y 768 | Se cumple en los cuatro anchos |
| 3 | Hero vino con cierre orgánico | Bloque a sangre con `--wine` + SVG de cierre + foto | Existe y la foto es de un producto real |
| 4 | Rejilla de 2 columnas | `getComputedStyle(grid).gridTemplateColumns` | 2 columnas en 360, 390 y 414 |
| 5 | Filtros completos y usables | Por cada píldora: `scrollWidth ≤ clientWidth`, alto ≥ 44 px, `font-size` ≥ 12 px | Todas cumplen |
| 6 | Legibilidad y contraste | Contraste calculado de cada par texto/fondo; `scrollHeight ≤ clientHeight` en títulos | ≥ 4.5:1 en texto normal; nada cortado |
| 7 | Contenido real | Comparación contra `products.js` y `story.js`; búsqueda de textos de la referencia | 0 coincidencias con el ejemplo; 12 precios idénticos |
| 8 | Funciones | 5 pestañas, búsqueda, 5 filtros, ficha, galería, zoom, `href` de WhatsApp | Todas responden; el número es `573218368605` |
| 9 | Build y consola | `npm run build` + errores de consola | Salida 0; consola limpia |
| 10 | Evidencia | Capturas por pestaña + viewport + hash del commit | Archivos adjuntos con nombre y fecha |

Este umbral convierte la revisión en algo que se puede repetir: mismos criterios, mismas mediciones, mismo veredicto. Sin él, la palabra "aprobado" no significa nada estable.

---

## 6. Estado técnico verificado hoy

**Build:** `npm run build` → 94 módulos, 361 ms, sin errores ni advertencias.

**Repositorio Git: roto.** `.git/objects/pack/pack-3a217e57….pack` (8,19 MB) no se puede leer: falla incluso una lectura de 4 KB con `Operation timed out`. Consecuencias:
- `git status`, `git diff` y `git log` abortan con `failed to read object af0d658…`.
- No se puede saber con certeza qué está commiteado y qué no.
- **Un push es imposible en este estado**, así que el flujo GitHub → Vercel está cortado.
- Único commit conocido: `af0d658` (clon del 29 oct, 22:08). Los archivos de diseño son del 30 y 31 de octubre.

Esto no se arregla con un comando inocuo: hay que reponer el object store (volver a clonar en otra carpeta y traer los cambios, o descargar de nuevo el paquete). No lo hice porque implica mover el `.git` de tu proyecto y no tengo tu autorización.

**Peso y duplicados:**
- 6 archivos distintos de `public/` son **el mismo JPEG** (MD5 `15550de4…`, 108.436 bytes), más una séptima copia en `src/assets/images/`. `pillars.js` sigue apuntando a rutas de `public/` que esa imagen duplicada representa.
- 1 copia **byte a byte idéntica** dentro de `productos/bolso-bucket-dorado-correa-aros-tejidos/` (`… (copia).jpeg`), no usada en el catálogo.
- Logotipos de 265–300 KB mostrados a 32 px de ancho.

**Diseño, medido en el CSS vigente:**
- 3.059 líneas en **cuatro capas apiladas**: base (1–1.441), tema (1.443–2.029), "Gauntlet pass" (2.030–2.943) y overrides finales (2.944–3.059). Cada capa pisa la anterior; encontrar por qué un elemento se ve como se ve exige leer cuatro sitios.
- 657 valores en píxeles frente a 5 `clamp()`. Dos skills distintas piden exactamente lo contrario.
- 62 declaraciones de `font-size` ≤ 10 px; la más pequeña es **7 px** (descriptor del logotipo) y los filtros están en 8–9 px.
- Contraste: `--ink-soft` sobre `--paper` = **4,29:1**; iconos de navegación inactivos = **4,18:1**. Ambos por debajo de 4.5:1 para texto normal.
- La foto del hero es la imagen del **primer producto**, y ese mismo producto vuelve a aparecer en la rejilla de 4 tarjetas de Inicio: la misma fotografía se ve dos veces en la primera pantalla.
- 11 componentes no usados (`Navbar`, `Hero`, `Catalog`, `BrandStory`, `CraftPillars`, `ProductHighlight`, `QuickActions`, `Footer`, `FloatingDecorations`, `KannasBorder`, `PhotoManagerModal`), con su CSS incluido en el bundle.

**SEO y despliegue:** sin `vercel.json`, sin `robots.txt`, sin `sitemap.xml`, `og:image` en ruta relativa (`/fundadora.jpg`), `base: './'` en Vite. Nada de esto impide la revisión visual, pero sí afecta la vista previa al compartir.

---

## 7. Lo que necesito de ti antes de comparar con la referencia

1. **La imagen de referencia.** Encontré `~/Downloads/_ (2).jpeg`, que es la que citan la metodología y el informe de auditoría (lámina con dos pantallas móviles de una app de comida: izquierda con hero vino y estadísticas, derecha con cuadrícula de dos columnas). ¿Es esa, o me pasas otra?
2. **Alcance real.** La memoria dice "solo móvil; las pantallas anchas quedan fuera del rediseño", pero tú describes la web como "responsive". Hoy, a partir de 768 px, la app se queda en una columna de 420 px centrada. Si el escritorio entra en el alcance, el umbral necesita un criterio más y el diseño una decisión.
3. **Acceso al navegador.** El navegador integrado está deshabilitado en este equipo y Chrome en modo headless aborta al arrancar, así que no puedo capturar ni medir la página abierta. Para auditar de verdad necesito una de dos: que habilites el navegador integrado, o que autorices usar tu Chrome (abrirá pestañas del agente en tu sesión).
4. **Permiso para corregir.** Los cuatro skills desalineados, el análisis desactualizado, la tabla de tokens y el cierre de la auditoría se pueden corregir, pero son archivos fuera de "la web". `scope-isolation-guard` exige tu confirmación antes de tocar más de un archivo.
5. **Git.** Para publicar hay que reponer el object store. Dime si puedo re-clonar en una carpeta nueva y traer los cambios, o si prefieres hacerlo tú.
