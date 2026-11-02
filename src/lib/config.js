/**
 * Configuración de Supabase sin cargar el SDK: la tienda solo necesita la URL.
 *
 * Los dos valores de respaldo son públicos por diseño: la URL del proyecto y la
 * clave `sb_publishable_`. No dan acceso a nada que no esté permitido por las
 * políticas RLS de `supabase/schema.sql` (lectura del catálogo visible, escritura
 * solo con sesión). Van aquí para que el despliegue funcione aunque el panel de
 * Vercel rechace o no reciba las variables de entorno; si algún día las defines,
 * mandan ellas.
 */
const FALLBACK_URL = 'https://pklqdjixkhpkmtrhtzsm.supabase.co';
const FALLBACK_KEY = 'sb_publishable_keWqDS92u-BCeLF7jPRdLQ_yeTiTwFL';

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY;

export const SUPABASE_URL = url.replace(/\/$/, '');
export const SUPABASE_ANON_KEY = anonKey;
export const isSupabaseConfigured = Boolean(url && anonKey);
export const PHOTO_BUCKET = 'productos';

export const restHeaders = {
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
  'Content-Type': 'application/json'
};
