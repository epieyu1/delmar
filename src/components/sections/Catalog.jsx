import { useMemo, useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { CATEGORIES } from '../../data/products';
import { getProductOrderMessage } from '../../constants/whatsapp';
import { formatCurrency } from '../../utils/formatters';

export const Catalog = ({ productsList, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    return productsList.filter((product) => {
      const categoryMatches = selectedCategory === 'Todos' || product.category === selectedCategory;
      const searchableText = [product.name, product.category, product.tag, product.shortDesc]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('es');
      return categoryMatches && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [query, selectedCategory, productsList]);

  return (
    <section id="catalogo" className="catalog-section section-space" aria-label="Catálogo de productos">
      <div className="page-shell">
        <div className="section-heading catalog-heading">
          <span className="eyebrow">Colección exclusiva</span>
          <h2 className="editorial-title editorial-title--section">Historias teñidas por el mar</h2>
          <p>Explora nuestra selección de creaciones tejidas con pasión en Dibulla. Haz clic en cualquier pieza para conocer sus detalles o hacer tu pedido directo.</p>
        </div>

        <div className="catalog-tools">
          <label className="catalog-search" htmlFor="catalog-search">
            <input
              id="catalog-search"
              type="search"
              aria-label="Buscar en el catálogo"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar una pieza"
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
                <Icon name="x" className="icon-16" />
              </button>
            )}
          </label>

          <div className="category-filters" role="tablist" aria-label="Filtrar por categoría">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={isSelected ? 'category-pill is-active' : 'category-pill'}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <p className="catalog-count" aria-live="polite">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'pieza' : 'piezas'}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const waMsg = getProductOrderMessage(product);
              return (
                <article className="product-card" key={product.id}>
                  <button
                    type="button"
                    className="product-card__image-button"
                    onClick={() => onSelectProduct(product)}
                    aria-label={'Ver detalles de ' + product.name}
                  >
                    <span className="product-card__image-wrap">
                      <ImageWithFallback
                        src={product.images[0]}
                        fallback={product.images[1] ?? product.images[0]}
                        alt={product.name}
                        className="product-card__image"
                        width="640"
                        height="640"
                        loading="lazy"
                      />
                    </span>
                    <span className="product-card__tag">{product.tag}</span>
                  </button>
                  <div className="product-card__body">
                    <span className="product-card__category">{product.category}</span>
                    <button type="button" className="product-card__title" onClick={() => onSelectProduct(product)}>
                      {product.name}
                    </button>
                    <p className="product-card__description">{product.shortDesc}</p>
                    <div className="product-card__bottom">
                      <div className="product-card__price">
                        <span>Precio</span>
                        <strong>{formatCurrency(product.price)}</strong>
                      </div>
                      <a
                        href={waMsg}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-order-button"
                        aria-label={'Pedir ' + product.name + ' por WhatsApp'}
                        title="Pedir por WhatsApp"
                      >
                        <WhatsAppIcon className="icon-16" />
                        <span>Pedir</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty" role="status">
            <p>No encontramos piezas con esos filtros.</p>
            <button type="button" onClick={() => { setQuery(''); setSelectedCategory('Todos'); }}>
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
