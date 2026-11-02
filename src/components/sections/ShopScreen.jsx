import { useMemo, useState } from 'react';
import Icon from '../common/Icon';
import ProductCard from '../common/ProductCard';
import { BRAND_STORY } from '../../data/story';

export const ShopScreen = ({ productsList, onSelectProduct, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(
    () => ['Todos', ...new Set(productsList.map(({ category }) => category))],
    [productsList]
  );
  const visibleProducts = useMemo(
    () => (selectedCategory === 'Todos'
      ? productsList
      : productsList.filter((product) => product.category === selectedCategory)),
    [productsList, selectedCategory]
  );
  const isGrouped = selectedCategory === 'Todos';
  const categoryGroups = categories
    .filter((category) => category !== 'Todos')
    .map((category) => ({
      category,
      items: visibleProducts.filter((product) => product.category === category)
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <section className="shop-screen-content" id="catalogo" aria-label="Catálogo de productos">
      <button type="button" className="catalog-back" onClick={onBack}>
        <Icon name="chevron-left" className="icon-16" />
        Volver al inicio
      </button>

      <div className="screen-header-block">
        <h2 className="screen-header-block__title">Catálogo</h2>
        <p className="screen-header-block__subtitle">{BRAND_STORY.contactSummary.location}</p>
      </div>

      <div className="shop-filter-pills-row" role="tablist" aria-label="Filtrar por categoría">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(category)}
              className={`shop-filter-pill${isSelected ? ' is-active' : ''}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {isGrouped ? (
        categoryGroups.map(({ category, items }, groupIndex) => (
          <section className={`catalog-group${groupIndex === 0 ? ' catalog-group--lead' : ''}`} key={category}>
            <div className="section-split-header">
              <h2 className="section-split-title">{category}</h2>
              <button type="button" className="section-split-link" onClick={() => setSelectedCategory(category)}>
                Ver todo <span>({items.length})</span>
              </button>
            </div>
            <div className={`shop-products-grid${items.length === 1 ? ' shop-products-grid--single' : ''}`}>
              {items.map((product, index) => <ProductCard key={product.id} product={product} onSelect={onSelectProduct} eager={index < 4} />)}
            </div>
          </section>
        ))
      ) : (
        <section className="catalog-group">
          <div className="section-split-header">
            <h2 className="section-split-title">{selectedCategory}</h2>
            <span className="catalog-result-count">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'pieza' : 'piezas'}
            </span>
          </div>
          <div className={`shop-products-grid${visibleProducts.length === 1 ? ' shop-products-grid--single' : ''}`}>
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} onSelect={onSelectProduct} eager={index < 4} />)}
          </div>
        </section>
      )}
    </section>
  );
};

export default ShopScreen;
