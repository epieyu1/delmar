import { useEffect, useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { isSupabaseConfigured, restHeaders, SUPABASE_URL } from '../lib/config';
import { rowToProduct } from '../lib/productMapper';

const byFeaturedThenOrder = (a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  if ((a.sortOrder ?? 0) !== (b.sortOrder ?? 0)) return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  return a.name.localeCompare(b.name, 'es');
};

/**
 * Catálogo de la tienda. Lee la API REST de Supabase sin cargar el SDK: el
 * visitante no descarga el panel. Sin configurar, devuelve los doce productos
 * del código para que el sitio nunca quede vacío.
 */
export const useProducts = (version = 0) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [source, setSource] = useState(isSupabaseConfigured ? 'loading' : 'local');

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let alive = true;
    const controller = new AbortController();

    const query = `${SUPABASE_URL}/rest/v1/products?select=*&order=sort_order.asc,name.asc`;

    fetch(query, { headers: restHeaders, signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Supabase respondió ${response.status}`);
        return response.json();
      })
      .then((rows) => {
        if (!alive) return;
        setProducts(rows.map(rowToProduct).filter((p) => p.status !== 'oculto').sort(byFeaturedThenOrder));
        setSource('supabase');
      })
      .catch((error) => {
        if (!alive || error.name === 'AbortError') return;
        console.warn('[Del Mar] No se pudo leer el catálogo, se usan los productos del código:', error.message);
        setProducts(INITIAL_PRODUCTS);
        setSource('local');
      });

    return () => { alive = false; controller.abort(); };
  }, [version]);

  return { products, source };
};

export default useProducts;
