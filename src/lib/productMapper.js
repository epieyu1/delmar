export const STATUSES = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'agotado', label: 'Agotado' },
  { value: 'oculto', label: 'Oculto en la tienda' }
];

/** Fila de Postgres → objeto que ya consumen las tarjetas y el modal. */
export const rowToProduct = (row) => ({
  id: row.id,
  name: row.name,
  cardName: row.card_name || row.name,
  category: row.category,
  price: row.price,
  tag: row.tag || '',
  images: Array.isArray(row.images) ? row.images : [],
  shortDesc: row.short_desc || '',
  description: row.description || '',
  technique: row.technique || '',
  origin: row.origin || '',
  details: Array.isArray(row.details) ? row.details : [],
  status: row.status || 'disponible',
  featured: Boolean(row.featured),
  sortOrder: row.sort_order ?? 0
});

/** Objeto de la app → fila de Postgres. */
export const productToRow = (product) => ({
  name: product.name.trim(),
  card_name: product.cardName.trim() || product.name.trim(),
  category: product.category,
  price: Number(product.price) || 0,
  tag: product.tag.trim(),
  images: product.images,
  short_desc: product.shortDesc.trim(),
  description: product.description.trim(),
  technique: product.technique.trim(),
  origin: product.origin.trim(),
  details: product.details ?? [],
  status: product.status,
  featured: Boolean(product.featured),
  sort_order: Number(product.sortOrder) || 0
});

export const emptyProduct = {
  id: null,
  name: '',
  cardName: '',
  category: 'Mochilas',
  price: '',
  tag: '',
  images: [],
  shortDesc: '',
  description: '',
  technique: 'Tejido 100% a mano por artesanas Wayuu',
  origin: 'La Guajira, Colombia',
  details: [],
  status: 'disponible',
  featured: false,
  sortOrder: 0
};

export const slugify = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
