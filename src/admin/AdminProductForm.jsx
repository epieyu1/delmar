import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/products';
import { emptyProduct, STATUSES } from '../lib/productsApi';
import { formatCurrency } from '../utils/formatters';

const CATEGORY_OPTIONS = CATEGORIES.filter((name) => name !== 'Todos');

const AdminProductForm = ({ api, productId, onCancel, onSaved }) => {
  const [form, setForm] = useState(emptyProduct);
  const [loading, setLoading] = useState(Boolean(productId));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef(null);
  const initialRef = useRef(emptyProduct);
  const [errors, setErrors] = useState({});

  const dirty = JSON.stringify(form) !== JSON.stringify(initialRef.current);

  useEffect(() => {
    if (!productId) { setForm(emptyProduct); initialRef.current = emptyProduct; return undefined; }
    let alive = true;
    api.get(productId)
      .then((product) => {
        if (!alive) return;
        if (!product) { setError('Esa pieza ya no existe.'); return; }
        const loaded = { ...emptyProduct, ...product, price: String(product.price) };
        setForm(loaded);
        initialRef.current = loaded;
      })
      .catch((loadError) => { if (alive) setError(loadError.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [api, productId]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const handleCancel = () => {
    if (dirty && !window.confirm('Hay cambios sin guardar. ¿Salir igualmente?')) return;
    onCancel();
  };

  const set = (field) => (event) => {
    const { type, checked, value } = event.target;
    setForm((prev) => ({ ...prev, [field]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const addFiles = async (event) => {
    const files = [...(event.target.files ?? [])];
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const urls = [];
      for (const file of files) {
        urls.push(await api.upload(file, form.name || 'pieza'));
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
      setErrors((prev) => ({ ...prev, images: undefined }));
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const removeImage = (url) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((item) => item !== url) }));

  const moveImage = (index, delta) => setForm((prev) => {
    const items = [...prev.images];
    const target = index + delta;
    if (target < 0 || target >= items.length) return prev;
    [items[index], items[target]] = [items[target], items[index]];
    return { ...prev, images: items };
  });

  const makeCover = (url) =>
    setForm((prev) => ({ ...prev, images: [url, ...prev.images.filter((item) => item !== url)] }));

  const setDetail = (index, field, value) =>
    setForm((prev) => ({
      ...prev,
      details: prev.details.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Escribe el nombre completo.';
    if (!form.category.trim()) nextErrors.category = 'Elige o escribe una categoría.';
    if (form.price === '' || Number(form.price) < 0) nextErrors.price = 'Precio en pesos, sin puntos.';
    if (form.status !== 'oculto' && form.images.length === 0) nextErrors.images = 'Para publicar necesita al menos una foto.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    setError('');
    try {
      await api.save({ ...form, price: Number(form.price), sortOrder: Number(form.sortOrder) || 0 });
      initialRef.current = { ...form };
      onSaved(productId ? 'Cambios guardados' : 'Pieza publicada');
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="admin-muted admin-body">Cargando pieza…</p>;

  return (
    <form className="admin-body admin-form" onSubmit={handleSubmit} noValidate>
      <div className="admin-form__grid">
        <label className="admin-field admin-field--wide">
          <span>Nombre completo *</span>
          <input value={form.name} onChange={set('name')} required maxLength={120} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <small className="admin-field__error">{errors.name}</small> : null}
        </label>

        <label className="admin-field">
          <span>Nombre en la tarjeta</span>
          <input value={form.cardName} onChange={set('cardName')} maxLength={28} />
          <small>Máximo 28 caracteres: es el que se ve en la rejilla.</small>
        </label>

        <label className="admin-field">
          <span>Categoría *</span>
          <input list="admin-categorias" value={form.category} onChange={set('category')} required aria-invalid={Boolean(errors.category)} />
          {errors.category ? <small className="admin-field__error">{errors.category}</small> : null}
          <datalist id="admin-categorias">
            {CATEGORY_OPTIONS.map((name) => <option key={name} value={name} />)}
          </datalist>
        </label>

        <label className="admin-field">
          <span>Precio en pesos *</span>
          <input type="number" min="0" step="1000" value={form.price} onChange={set('price')} required aria-invalid={Boolean(errors.price)} />
          {errors.price ? <small className="admin-field__error">{errors.price}</small> : null}
        </label>

        <label className="admin-field">
          <span>Etiqueta corta</span>
          <input value={form.tag} onChange={set('tag')} maxLength={40} />
        </label>

        <label className="admin-field">
          <span>Estado</span>
          <select value={form.status} onChange={set('status')}>
            {STATUSES.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Orden</span>
          <input type="number" step="1" value={form.sortOrder} onChange={set('sortOrder')} />
          <small>Menor número aparece primero.</small>
        </label>

        <label className="admin-check admin-field--wide">
          <input type="checkbox" checked={form.featured} onChange={set('featured')} />
          <span>Destacada: sale en la portada, antes que las demás</span>
        </label>

        <label className="admin-field admin-field--wide">
          <span>Descripción corta</span>
          <textarea rows={2} maxLength={160} value={form.shortDesc} onChange={set('shortDesc')} />
        </label>

        <label className="admin-field admin-field--wide">
          <span>Descripción</span>
          <textarea rows={5} value={form.description} onChange={set('description')} />
        </label>

        <label className="admin-field">
          <span>Técnica</span>
          <input value={form.technique} onChange={set('technique')} />
        </label>

        <label className="admin-field">
          <span>Origen</span>
          <input value={form.origin} onChange={set('origin')} />
        </label>
      </div>

      <section className="admin-block">
        <h2 className="admin-block__title">Fotos</h2>
        <p className="admin-muted">La primera es la portada. Arrastra varias a la vez si quieres.</p>
        <div className="admin-thumbs">
          {form.images.map((url, index) => (
            <figure key={url} className="admin-thumb">
              <img src={url} alt="" />
              <figcaption>
                <span className="admin-thumb__index">{index === 0 ? 'Portada' : `Foto ${index + 1}`}</span>
                <span className="admin-thumb__row">
                  <button type="button" className="admin-mini" onClick={() => moveImage(index, -1)} disabled={index === 0} aria-label={`Mover la foto ${index + 1} hacia atrás`}>←</button>
                  <button type="button" className="admin-mini" onClick={() => moveImage(index, 1)} disabled={index === form.images.length - 1} aria-label={`Mover la foto ${index + 1} hacia adelante`}>→</button>
                  <button type="button" className="admin-mini" onClick={() => makeCover(url)} disabled={index === 0} aria-label={`Usar la foto ${index + 1} como portada`}>★</button>
                </span>
                <button type="button" className="admin-mini admin-mini--danger" onClick={() => removeImage(url)}>
                  Quitar
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
        <input ref={fileInput} type="file" accept="image/*" multiple onChange={addFiles} disabled={uploading} />
        {uploading ? <p className="admin-muted">Subiendo fotos…</p> : null}
        {errors.images ? <p className="admin-field__error">{errors.images}</p> : null}
      </section>

      <section className="admin-block">
        <h2 className="admin-block__title">Detalles</h2>
        {form.details.map((row, index) => (
          <div key={index} className="admin-detail-row">
            <input
              value={row.label}
              onChange={(event) => setDetail(index, 'label', event.target.value)}
              placeholder="Material"
              aria-label={`Etiqueta del detalle ${index + 1}`}
            />
            <input
              value={row.value}
              onChange={(event) => setDetail(index, 'value', event.target.value)}
              placeholder="Hilo tejido de alta calidad"
              aria-label={`Valor del detalle ${index + 1}`}
            />
            <button
              type="button"
              className="admin-mini admin-mini--danger"
              onClick={() => setForm((prev) => ({ ...prev, details: prev.details.filter((_, i) => i !== index) }))}
            >
              Quitar
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => setForm((prev) => ({ ...prev, details: [...prev.details, { label: '', value: '' }] }))}
        >
          Añadir detalle
        </button>
      </section>

      <section className="admin-block">
        <h2 className="admin-block__title">Así se verá en la tienda</h2>
        <div className="admin-preview">
          <div className="admin-preview__media">
            {form.images[0]
              ? <img src={form.images[0]} alt="" />
              : <span className="admin-preview__empty">Sin foto</span>}
          </div>
          <p className="admin-preview__name">{form.cardName || form.name || 'Nombre de la pieza'}</p>
          <p className="admin-preview__price">
            {form.price === '' ? '$ 0 COP' : `${formatCurrency(Number(form.price) || 0)}`}
          </p>
          <p className="admin-preview__cta">Pedir</p>
        </div>
      </section>

      {error ? <p className="admin-error" role="alert">{error}</p> : null}

      <div className="admin-form__actions">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={handleCancel}>Cancelar</button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving || uploading}>
          {saving ? 'Guardando…' : productId ? 'Guardar cambios' : 'Publicar pieza'}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
