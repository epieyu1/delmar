import { useCallback, useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminProductList from './AdminProductList';
import AdminProductForm from './AdminProductForm';
import AdminSetup from './AdminSetup';
import BrandLogo from '../components/common/BrandLogo';
import {
  deleteProduct,
  fetchProduct,
  fetchProducts,
  getSession,
  onAuthChange,
  saveProduct,
  setProductsStatus,
  signOut,
  uploadProductImage
} from '../lib/productsApi';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { createPreviewApi } from '../lib/previewApi';

const previewApi = createPreviewApi();
const canPreview = !isSupabaseConfigured && (import.meta.env.DEV || import.meta.env.VITE_PANEL_PREVIEW === '1');

const readRoute = () => {
  const hash = window.location.hash.replace(/^#/, '');
  const [, , sub, id] = hash.split('/');
  if (sub === 'nuevo') return { name: 'form', id: null };
  if (sub === 'editar' && id) return { name: 'form', id };
  return { name: 'list' };
};

export const AdminApp = () => {
  const [route, setRoute] = useState(readRoute);
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(isSupabaseConfigured);
  const [reloadKey, setReloadKey] = useState(0);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;
    getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setChecking(false);
    });
    const { data } = onAuthChange((_event, next) => setSession(next ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  const notify = useCallback((message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((list) => [...list, { id, message }]);
    window.setTimeout(() => setToasts((list) => list.filter((toast) => toast.id !== id)), 3200);
  }, []);

  // Las dos implementaciones comparten las mismas operaciones.
  const api = isSupabaseConfigured
    ? {
        list: fetchProducts,
        get: fetchProduct,
        save: saveProduct,
        remove: deleteProduct,
        upload: uploadProductImage,
        setStatus: setProductsStatus
      }
    : previewApi;

  const go = useCallback((path) => { window.location.hash = path; }, []);

  const afterSave = useCallback((message) => {
    setReloadKey((key) => key + 1);
    notify(message);
    go('#/admin');
  }, [go, notify]);

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    go('#/');
  };

  if (checking) {
    return (
      <main className="admin-shell admin-shell--center">
        <p className="admin-muted">Comprobando sesión…</p>
      </main>
    );
  }

  if (isSupabaseConfigured && !session) {
    return <AdminLogin onSignedIn={setSession} />;
  }

  if (!isSupabaseConfigured && !canPreview) {
    return <AdminSetup />;
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <a className="admin-brand" href="#/" aria-label="Del Mar Artesanías, ir a la tienda">
          <BrandLogo size="sm" />
        </a>
        <div className="admin-top__actions">
          <a className="admin-link" href="#/">Ver tienda</a>
          {isSupabaseConfigured ? (
            <button type="button" className="admin-btn admin-btn--ghost" onClick={handleSignOut}>Salir</button>
          ) : null}
        </div>
      </header>

      <div className="admin-heading">
        <p className="admin-top__eyebrow">Administración</p>
        <h1 className="admin-top__title">Catálogo</h1>
      </div>

      {canPreview ? (
        <p className="admin-banner">
          Vista previa sin Supabase: puedes recorrer el panel, pero <strong>nada se guarda</strong>.
          Añade <code>.env.local</code> para conectarlo de verdad.
        </p>
      ) : null}

      {route.name === 'form' ? (
        <AdminProductForm
          api={api}
          productId={route.id}
          onCancel={() => go('#/admin')}
          onSaved={afterSave}
        />
      ) : (
        <AdminProductList
          api={api}
          reloadKey={reloadKey}
          onCreate={() => go('#/admin/nuevo')}
          onEdit={(id) => go(`#/admin/editar/${id}`)}
          onDeleted={() => setReloadKey((key) => key + 1)}
          notify={notify}
        />
      )}

      <div className="admin-toasts" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <p key={toast.id} className="admin-toast">{toast.message}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminApp;
