import { supabase, PHOTO_BUCKET } from './supabaseClient';
import { productToRow, rowToProduct, slugify } from './productMapper';

export { STATUSES, emptyProduct, rowToProduct, productToRow } from './productMapper';

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });
  if (error) throw error;
  return data.map(rowToProduct);
};

export const fetchProduct = async (id) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return rowToProduct(data);
};

export const saveProduct = async (product) => {
  const row = productToRow(product);
  if (product.id) {
    const { error } = await supabase.from('products').update(row).eq('id', product.id);
    if (error) throw error;
    return product.id;
  }
  const id = slugify(product.name) || `pieza-${Date.now()}`;
  const { error } = await supabase.from('products').insert({ ...row, id });
  if (error) throw error;
  return id;
};

export const setProductsStatus = async (ids, status) => {
  const { error } = await supabase.from('products').update({ status }).in('id', ids);
  if (error) throw error;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

export const uploadProductImage = async (file, productKey) => {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${slugify(productKey) || 'pieza'}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false
  });
  if (error) throw error;
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
};

export const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
export const signOut = () => supabase.auth.signOut();
export const getSession = () => supabase.auth.getSession();
export const onAuthChange = (callback) => supabase.auth.onAuthStateChange(callback);
