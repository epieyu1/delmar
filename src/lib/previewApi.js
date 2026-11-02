import { INITIAL_PRODUCTS } from '../data/products';

/**
 * Vista previa del panel sin Supabase (solo en `npm run dev`).
 * Permite recorrer el alta, la edición y el borrado sin cuentas ni claves.
 * Nada se guarda: al recargar vuelve a los doce productos del código.
 */
const seed = () =>
  INITIAL_PRODUCTS.map((product) => ({
    ...product,
    status: 'disponible',
    featured: false,
    sortOrder: 0
  }));

export const createPreviewApi = () => {
  let items = seed();

  return {
    list: async () => items.map((product) => ({ ...product })),
    get: async (id) => items.find((product) => product.id === id) ?? null,
    save: async (product) => {
      if (product.id) {
        items = items.map((row) => (row.id === product.id ? { ...row, ...product } : row));
        return product.id;
      }
      const id = `preview-${Date.now()}`;
      items = [{ ...product, id }, ...items];
      return id;
    },
    setStatus: async (ids, status) => {
      items = items.map((row) => (ids.includes(row.id) ? { ...row, status } : row));
    },
    remove: async (id) => {
      items = items.filter((row) => row.id !== id);
    },
    upload: async (file) => URL.createObjectURL(file)
  };
};

export default createPreviewApi;
