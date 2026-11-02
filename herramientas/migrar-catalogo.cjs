/**
 * Migración del catálogo del código a Supabase.
 *
 * Lee `src/data/products.js`, sube cada foto al bucket `productos` bajo
 * `delmar/<id>/<n>.<ext>` y sustituye las rutas locales por URLs públicas.
 * Después inserta las filas en `public.products`.
 *
 * Uso:
 *   SUPABASE_URL=... SUPABASE_SERVICE_KEY=... PGPASSWORD=... node herramientas/migrar-catalogo.cjs
 *
 * Es idempotente: `upsert` en las filas y `x-upsert` en las fotos.
 */
const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'src/data/products.js');
const BUCKET = 'productos';
const PREFIX = 'delmar';

const URL_BASE = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
const DB_PASSWORD = process.env.PGPASSWORD;

if (!URL_BASE || !KEY || !DB_PASSWORD) {
  console.error('Faltan SUPABASE_URL, SUPABASE_SERVICE_KEY o PGPASSWORD.');
  process.exit(1);
}

/** products.js es ESM con imágenes importadas: se resuelven a rutas de disco. */
function loadCatalog() {
  const source = fs.readFileSync(SOURCE, 'utf8');
  const imports = new Map();
  for (const match of source.matchAll(/^import\s+(\w+)\s+from\s+'([^']+)';$/gm)) {
    imports.set(match[1], path.resolve(path.dirname(SOURCE), match[2]));
  }
  let body = source
    .replace(/^import\s+.*;$/gm, '')
    .replace(/^export\s+default\s+.*$/gm, '')
    .replace(/^export\s+/gm, '');
  for (const [name, file] of imports) {
    body = body.replace(new RegExp(`\\b${name}\\b`, 'g'), JSON.stringify(file));
  }
  // eslint-disable-next-line no-new-func
  return new Function(`${body}; return INITIAL_PRODUCTS;`)();
}

async function uploadImage(file, productId, index) {
  const ext = (path.extname(file) || '.jpg').toLowerCase();
  const key = `${PREFIX}/${productId}/${index + 1}${ext}`;
  const body = fs.readFileSync(file);
  const response = await fetch(`${URL_BASE}/storage/v1/object/${BUCKET}/${key}`, {
    method: 'POST',
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': ext === '.png' ? 'image/png' : 'image/jpeg',
      'x-upsert': 'true',
      'cache-control': '31536000'
    },
    body
  });
  if (!response.ok) {
    throw new Error(`Subida fallida ${key}: ${response.status} ${await response.text()}`);
  }
  return `${URL_BASE}/storage/v1/object/public/${BUCKET}/${key}`;
}

(async () => {
  const products = loadCatalog();
  console.log(`Catálogo leído: ${products.length} piezas`);

  const client = new Client({
    host: process.env.PGHOST || 'aws-0-us-east-2.pooler.supabase.com',
    port: 5432,
    user: process.env.PGUSER || 'postgres.pklqdjixkhpkmtrhtzsm',
    password: DB_PASSWORD,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();

  let uploaded = 0;
  for (const [order, product] of products.entries()) {
    const urls = [];
    for (const [index, file] of product.images.entries()) {
      if (!fs.existsSync(file)) {
        console.warn(`  falta el archivo ${file}`);
        continue;
      }
      urls.push(await uploadImage(file, product.id, index));
      uploaded += 1;
    }

    await client.query(
      `insert into public.products
         (id, name, card_name, category, price, tag, images, short_desc, description,
          technique, origin, details, status, featured, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12::jsonb,'disponible',$13,$14)
       on conflict (id) do update set
         name = excluded.name, card_name = excluded.card_name, category = excluded.category,
         price = excluded.price, tag = excluded.tag, images = excluded.images,
         short_desc = excluded.short_desc, description = excluded.description,
         technique = excluded.technique, origin = excluded.origin,
         details = excluded.details, sort_order = excluded.sort_order`,
      [
        product.id,
        product.name,
        product.cardName ?? product.name,
        product.category,
        product.price,
        product.tag ?? '',
        JSON.stringify(urls),
        product.shortDesc ?? '',
        product.description ?? '',
        product.technique ?? '',
        product.origin ?? '',
        JSON.stringify(product.details ?? []),
        order === 0,
        order
      ]
    );
  }

  const count = await client.query('select count(*)::int n from public.products');
  console.log(`Filas en products: ${count.rows[0].n}`);
  console.log(`Fotos subidas: ${uploaded}`);
  await client.end();
})().catch((error) => {
  console.error('ERROR:', error.message);
  process.exit(1);
});
