# Panel de administración

El panel vive en `/#/admin`. Sirve para crear, editar, ocultar y borrar piezas, subir fotos y
marcar destacadas. La tienda lee el catálogo de Supabase y, si no hay conexión, sigue mostrando
las doce piezas del código.

## Estado real a 2026-11-02

Proyecto `pklqdjixkhpkmtrhtzsm` (us-east-2). Se borró por completo el catálogo anterior y se
reconstruyó para Del Mar:

- Eliminados: 16 tablas, 25 políticas de `public`, 3 buckets (`productos`, `marcas`, `copias`)
  y 1 usuario de autenticación. Respaldo íntegro en `revision-rediseno/backup-supabase-2026-11-02/`
  (18 JSON con 92 kB: 18 productos, 78 tallas, 5 marcas, 5 ajustes, 1 perfil).
- Creados: `public.products` con **12 piezas** y **36 fotos** en `productos/delmar/<id>/`,
  bucket público, y las políticas de lectura, escritura y almacenamiento.
- Cuenta de prueba: `panel@delmar.test`. Cámbiala o bórrala cuando crees la definitiva.
- Conectado con la clave publicable `sb_publishable_…` en `.env.local`: lectura anónima
  `200` con `content-range: 0-11/12`, escritura anónima rechazada con `401`.

Comprobado contra la API real: lectura con sesión 200, alta 201, borrado 204, foto pública
sin clave 200 (`image/jpeg`, 230 626 bytes), y RLS aislando: con una pieza oculta, `anon` ve 11
y la administradora 12; `anon` intentando borrar afecta a 0 filas.

Prueba de punta a punta desde el navegador: entrar con la cuenta → 12 piezas → crear «Prueba
refresco» con foto (1200 × 1600) → aviso «Pieza publicada» → «Ver tienda» sin recargar muestra
13 tarjetas con la pieza nueva → borrarla → aviso «Pieza borrada» → la tienda vuelve a 12 sin
recargar. 0 errores de consola. Estado final de la base: 12 filas, 36 fotos, 36 objetos, sin
huérfanos.

## Despliegue en Vercel

En **Settings → Environment Variables** añade las dos y vuelve a desplegar:

```
VITE_SUPABASE_URL=https://pklqdjixkhpkmtrhtzsm.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_…
```

Sin ellas, el sitio funciona con los doce productos del código y `/#/admin` muestra la pantalla
de configuración. Nada se rompe.

## Puesta en marcha (una sola vez, ~10 minutos)

### 1 · Crear el proyecto

En [supabase.com](https://supabase.com) → **New project**. Elige la región más cercana (São Paulo
o Virginia). Guarda la contraseña de la base; no se usa en la web.

### 2 · Crear la tabla y las políticas

En el proyecto: **SQL Editor → New query**, pega todo [`supabase/schema.sql`](supabase/schema.sql)
y pulsa **Run**. Crea:

- la tabla `products` con los doce campos y los tres estados,
- las políticas RLS: lectura pública solo de piezas no ocultas, escritura solo con sesión,
- el bucket `productos` para las fotos, con lectura pública y subida autenticada.

Se puede ejecutar dos veces: no rompe nada.

### 3 · Crear la cuenta de la administradora

**Authentication → Users → Add user**:

- Email: el correo de la fundadora.
- Password: una contraseña larga (mínimo 12 caracteres).
- Marca **Auto Confirm User** para que no haga falta el correo de confirmación.

Esa es la única cuenta con permiso de escritura. No hay registro público: nadie puede crearse
una cuenta desde la web.

### 4 · Conectar las claves

Copia `.env.example` como `.env.local` y rellena las dos variables con **Project Settings → API**:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Usa la clave **publicable** (`sb_publishable_…`), que es pública a propósito: la protección está
en las políticas RLS. Una clave `sb_secret_…` o `service_role` en el frontend no funciona:
Supabase la rechaza con `401 Forbidden use of secret API key in browser`.

En Vercel: **Settings → Environment Variables**, las mismas dos, y vuelve a desplegar.

### 5 · Entrar

Abre `https://tudominio.com/#/admin`, correo y contraseña. La sesión se recuerda en ese
navegador.


## Nivel profesional: qué se exige y qué cumple

Contrastado con los paneles de catálogo de referencia (Shopify, WooCommerce, Square): todos
comparten búsqueda con facetas contadas, acciones masivas, cambio de estado en la fila,
duplicado, confirmación al borrar, avisos tras guardar, esqueleto de carga, estado vacío con
salida, validación por campo y vista previa. Ese es el listón que se aplica aquí.

| # | Criterio | Estado | Medición |
|---|---|---|---|
| 1 | Misma marca que la tienda | hecho | mismo archivo de logo, `naturalWidth` 687 en tienda y panel |
| 2 | Búsqueda por nombre, tarjeta, categoría y etiqueta | hecho | — |
| 3 | Facetas de estado con conteo en vivo | hecho | 4 píldoras; tras ocultar una: Todas 12 · Disponible 11 · Oculto 1 |
| 4 | Filtro por categoría y orden | hecho | 3 órdenes: catálogo, nombre A–Z, precio |
| 5 | Acciones masivas | hecho | con 2 filas: «2 seleccionadas · Publicar · Ocultar · Borrar» |
| 6 | Cambio de estado en la fila | hecho | control de 44 px; aviso «Estado actualizado» |
| 7 | Duplicar pieza | hecho | copia creada como oculta |
| 8 | Borrado con confirmación | hecho | diálogo nativo, individual y masivo |
| 9 | Esqueleto de carga | hecho | 5 filas |
| 10 | Estado vacío con salida | hecho | «Quitar filtros» |
| 11 | Validación por campo | hecho | 3 mensajes, `aria-invalid`, formulario `novalidate` |
| 12 | Guardia de cambios sin guardar | hecho | confirmación al cancelar + `beforeunload` |
| 13 | Vista previa de la tarjeta | hecho | nombre, precio y «Pedir» en vivo |
| 14 | Aviso después de guardar y borrar | hecho | aviso de 3200 ms |
| 15 | Áreas táctiles ≥ 44 px | hecho | facetas 44, estado 44, botones 44; mini 40 |
| 16 | Una sola paleta y una sola tinta | hecho | PASS en lista y formulario: 0 fuera de paleta, 0 alpha, 1 tinta `#233F52` |
| 17 | Sin desbordamiento | hecho | 0 px a 360, 390 y 414; acciones en 2 líneas a 360/390, 1 a 414 |
| 18 | La tienda no carga el panel | hecho | tienda 186,88 kB · panel 248,46 kB en trozo aparte |
| 19 | Reordenar fotos | **pendiente** | hoy solo se cambia la portada, no el orden |
| 20 | Paginación | **pendiente** | hoy la lista trae todas las piezas (12) |
| 21 | Permisos reales en la base | **pendiente** | el SQL está escrito, falta ejecutarlo en Supabase |

**Umbral de entrega:** ningún criterio marcado «hecho» sale sin medición en navegador; si uno
falla, no se entrega. Los tres pendientes están declarados, no escondidos.

## Qué hay dentro

| Acción | Dónde |
|---|---|
| Ver todas las piezas, buscar por nombre, categoría o etiqueta | lista del panel |
| Crear | «Nuevo producto» |
| Editar | «Editar» en la fila |
| Borrar | «Borrar», con confirmación |
| Subir fotos | dentro del formulario; la primera es la portada y se puede cambiar de orden |
| Destacar en portada | casilla «Destacada»; las destacadas salen antes en Inicio y en el catálogo |
| Ordenar | campo «Orden»: menor número primero dentro de lo destacado |
| Ocultar sin borrar | estado «Oculto en la tienda»: desaparece de la web y se conserva la ficha |
| Marcar agotada | estado «Agotado»: se muestra con el aviso y se sigue pidiendo por WhatsApp |

## Reglas que conviene saber

- **Borrar una pieza no borra sus fotos** del almacén. Se pueden limpiar en **Storage → productos**
  cuando haga falta.
- **El nombre de la tarjeta** es el que se ve en la rejilla: máximo 28 caracteres. El nombre
  completo es el que aparece en la ficha.
- **Precio**: número entero en pesos, sin puntos ni símbolos. `220000`.
- **Categoría**: se elige de la lista o se escribe una nueva; la nueva aparece sola en los filtros.
- Si Supabase no responde, la tienda cae a los doce productos del código y no muestra error al
  visitante. El panel, en cambio, sí avisa.

## Archivos implicados

```
supabase/schema.sql            tabla, políticas y bucket (pegar en Supabase)
.env.example                   plantilla de las dos variables
src/lib/config.js              lee las variables, sin cargar el SDK
src/lib/supabaseClient.js      cliente de Supabase (solo lo usa el panel)
src/lib/productsApi.js         crear, leer, editar, borrar, subir fotos
src/lib/productMapper.js       traducción entre Postgres y la app
src/hooks/useProducts.js       catálogo de la tienda por REST, con respaldo local
src/admin/*                    login, lista y formulario
src/styles/admin.css           estilos del panel, solo con tokens
```

La tienda no descarga el SDK de Supabase: el panel va en un trozo aparte (`AdminApp-*.js`) que
solo se carga al abrir `/#/admin`.
