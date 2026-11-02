import { useEffect, useMemo, useState } from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { formatCurrency } from '../utils/formatters';
import { STATUSES } from '../lib/productsApi';

const SORTS = [
  { value: 'orden', label: 'Orden del catálogo' },
  { value: 'nombre', label: 'Nombre A–Z' },
  { value: 'precio', label: 'Precio, mayor primero' }
];

const bySort = (a, b, sort) => {
  if (sort === 'nombre') return (a.cardName || a.name).localeCompare(b.cardName || b.name, 'es');
  if (sort === 'precio') return b.price - a.price;
  return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
};

const AdminProductList = ({ api, reloadKey, onCreate, onEdit, onDeleted, notify }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('todos');
  const [category, setCategory] = useState('todas');
  const [sort, setSort] = useState('orden');
  const [selected, setSelected] = useState(() => new Set());
  const [shown, setShown] = useState(10);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    api.list()
      .then((rows) => { setItems(rows); setError(''); })
      .catch((listError) => setError(listError.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [api, reloadKey]);

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'es')),
    [items]
  );

  const counts = useMemo(() => {
    const base = { todos: items.length };
    for (const option of STATUSES) base[option.value] = items.filter((i) => i.status === option.value).length;
    return base;
  }, [items]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items
      .filter((item) => (status === 'todos' ? true : item.status === status))
      .filter((item) => (category === 'todas' ? true : item.category === category))
      .filter((item) => (term
        ? [item.name, item.cardName, item.category, item.tag].join(' ').toLowerCase().includes(term)
        : true))
      .sort((a, b) => bySort(a, b, sort));
  }, [items, query, status, category, sort]);

  const page = visible.slice(0, shown);
  const remaining = visible.length - page.length;
  const allSelected = visible.length > 0 && visible.every((item) => selected.has(item.id));

  const toggle = (id) => setSelected((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const toggleAll = () => setSelected(() => {
    if (allSelected) return new Set();
    return new Set(visible.map((item) => item.id));
  });

  const changeStatus = async (ids, nextStatus) => {
    setBusy(true);
    try {
      await api.setStatus(ids, nextStatus);
      setItems((rows) => rows.map((row) => (ids.includes(row.id) ? { ...row, status: nextStatus } : row)));
      notify(ids.length === 1 ? 'Estado actualizado' : `${ids.length} estados actualizados`);
      setSelected(new Set());
    } catch (statusError) {
      setError(statusError.message);
    } finally {
      setBusy(false);
    }
  };

  const duplicate = async (product) => {
    setBusy(true);
    try {
      await api.save({
        ...product,
        id: null,
        name: `${product.name} (copia)`,
        cardName: `${product.cardName || product.name} (copia)`.slice(0, 28),
        status: 'oculto'
      });
      load();
      notify('Copia creada como oculta');
    } catch (duplicateError) {
      setError(duplicateError.message);
    } finally {
      setBusy(false);
    }
  };

  const removeOne = async (product) => {
    if (!window.confirm(`¿Borrar «${product.name}»? Esta acción no se puede deshacer.`)) return;
    setBusy(true);
    try {
      await api.remove(product.id);
      setItems((rows) => rows.filter((row) => row.id !== product.id));
      setSelected((prev) => { const next = new Set(prev); next.delete(product.id); return next; });
      notify('Pieza borrada');
      onDeleted?.();
    } catch (removeError) {
      setError(removeError.message);
    } finally {
      setBusy(false);
    }
  };

  const removeSelected = async () => {
    if (!window.confirm(`¿Borrar ${selected.size} piezas? No se puede deshacer.`)) return;
    setBusy(true);
    try {
      for (const id of selected) await api.remove(id);
      setSelected(new Set());
      load();
      notify('Piezas borradas');
      onDeleted?.();
    } catch (bulkError) {
      setError(bulkError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-body">
      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="search"
          placeholder="Buscar por nombre, categoría o etiqueta"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setShown(10); }}
          aria-label="Buscar producto"
        />
        <button type="button" className="admin-btn admin-btn--primary" onClick={onCreate}>
          Nuevo producto
        </button>
      </div>

      <div className="admin-facets" role="group" aria-label="Filtrar por estado">
        <button type="button" className={`admin-facet ${status === 'todos' ? 'is-on' : ''}`} onClick={() => { setStatus('todos'); setShown(10); }}>
          Todas <span>{counts.todos}</span>
        </button>
        {STATUSES.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`admin-facet ${status === option.value ? 'is-on' : ''}`}
            onClick={() => { setStatus(option.value); setShown(10); }}
          >
            {option.label} <span>{counts[option.value] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="admin-filters">
        <label className="admin-inline">
          <span>Categoría</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="todas">Todas</option>
            {categories.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <label className="admin-inline">
          <span>Ordenar</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {SORTS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      <div className="admin-summary">
        <label className="admin-selectall">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Seleccionar todas las visibles" />
          <span>{loading ? 'Cargando…' : `${visible.length} de ${items.length} piezas`}</span>
        </label>
        {selected.size > 0 ? (
          <div className="admin-bulk" role="group" aria-label="Acciones sobre la selección">
            <span>{selected.size} seleccionadas</span>
            <button type="button" className="admin-btn admin-btn--ghost" disabled={busy} onClick={() => changeStatus([...selected], 'disponible')}>Publicar</button>
            <button type="button" className="admin-btn admin-btn--ghost" disabled={busy} onClick={() => changeStatus([...selected], 'oculto')}>Ocultar</button>
            <button type="button" className="admin-btn admin-btn--danger" disabled={busy} onClick={removeSelected}>Borrar</button>
          </div>
        ) : null}
      </div>

      {error ? <p className="admin-error" role="alert">{error}</p> : null}

      {loading ? (
        <ul className="admin-list" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((row) => (
            <li key={row} className="admin-row admin-row--skeleton">
              <span className="admin-skel admin-skel--thumb" />
              <span className="admin-skel admin-skel--line" />
              <span className="admin-skel admin-skel--line admin-skel--short" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="admin-list">
          {page.map((product) => (
            <li key={product.id} className={`admin-row ${selected.has(product.id) ? 'is-selected' : ''}`}>
              <input
                type="checkbox"
                className="admin-row__check"
                checked={selected.has(product.id)}
                onChange={() => toggle(product.id)}
                aria-label={`Seleccionar ${product.name}`}
              />
              <span className="admin-row__thumb">
                <ImageWithFallback
                  src={product.images[0]}
                  fallback={product.images[1] ?? product.images[0]}
                  alt=""
                  loading="eager"
                />
              </span>

              <span className="admin-row__main">
                <span className="admin-row__name">{product.cardName || product.name}</span>
                <span className="admin-row__meta">
                  {product.category} · {formatCurrency(product.price).replace(' COP', '')}
                  {product.featured ? ' · destacada' : ''}
                </span>
              </span>

              <span className="admin-row__actions">
                <select
                  className="admin-status-select"
                  value={product.status}
                  onChange={(event) => changeStatus([product.id], event.target.value)}
                  aria-label={`Estado de ${product.name}`}
                >
                  {STATUSES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <button type="button" className="admin-btn admin-btn--ghost" onClick={() => onEdit(product.id)}>Editar</button>
                <button type="button" className="admin-btn admin-btn--ghost" disabled={busy} onClick={() => duplicate(product)}>Duplicar</button>
                <button type="button" className="admin-btn admin-btn--danger" disabled={busy} onClick={() => removeOne(product)}>Borrar</button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && remaining > 0 ? (
        <button type="button" className="admin-btn admin-btn--ghost admin-more" onClick={() => setShown((value) => value + 10)}>
          Mostrar 10 más ({remaining} {'restantes'})
        </button>
      ) : null}

      {!loading && visible.length === 0 ? (
        <p className="admin-empty">
          No hay piezas que coincidan con los filtros.
          <button type="button" className="admin-link" onClick={() => { setQuery(''); setStatus('todos'); setCategory('todas'); }}>
            Quitar filtros
          </button>
        </p>
      ) : null}
    </section>
  );
};

export default AdminProductList;
