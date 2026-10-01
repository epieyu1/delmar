import { useState, useMemo } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { CATEGORIES } from '../../data/products';
import { getProductOrderMessage } from '../../constants/whatsapp';
import { formatCurrency } from '../../utils/formatters';

export const Catalog = ({ productsList, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      return selectedCategory === 'Todos' || product.category === selectedCategory;
    });
  }, [selectedCategory, productsList]);

  return (
    <section id="catalogo" className="py-10 sm:py-16 lg:py-20 bg-sand" aria-label="Catálogo de productos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del catálogo */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-terracotta">
            Colección Exclusiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-blue mt-2 mb-4">
            Historias Teñidas por el Mar
          </h2>
          <p className="text-sm sm:text-base text-deep-blue/75 font-sans">
            Explora nuestra selección de creaciones tejidas con pasión en Dibulla. Haz clic en cualquier pieza para conocer sus detalles o hacer tu pedido directo.
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="mb-8 sm:mb-10">
          <div className="relative mx-auto w-full max-w-sm sm:hidden">
            <label htmlFor="catalog-category" className="sr-only">
              Filtrar por categoría
            </label>
            <select
              id="catalog-category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full appearance-none rounded-xl border border-sand-light bg-sand px-4 py-3 pr-10 text-sm font-medium text-deep-blue shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-right"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-deep-blue"
              aria-hidden="true"
            />
          </div>

          <div
            className="mx-auto hidden max-w-5xl flex-wrap items-center justify-center gap-2 sm:flex"
            role="tablist"
            aria-label="Filtro de categorías de productos"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`button-interaction rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:px-5 sm:text-sm ${
                    isSelected
                      ? 'bg-deep-blue text-sand shadow-md'
                      : 'bg-sand-light text-deep-blue/80 hover:bg-teal/10 hover:text-teal'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grilla responsiva de productos */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {filteredProducts.map((product) => {
            const waMsg = getProductOrderMessage(product);

            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sand-light bg-sand shadow-sm transition-all duration-300 hover:shadow-coastal"
              >
                {/* Contenedor de imagen cuadrado y contenido sin desbordamiento */}
                <div
                  className="relative aspect-square overflow-hidden bg-sand-light cursor-pointer select-none"
                  onClick={() => onSelectProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct(product);
                    }
                  }}
                  aria-label={`Ver detalles de ${product.name}`}
                >
                  <ImageWithFallback
                    src={product.image}
                    fallback={product.fallbackImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-deep-blue/90 backdrop-blur-sm text-gold text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.tag}
                  </span>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-5">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-teal tracking-widest uppercase">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif font-bold text-sm sm:text-base text-deep-blue mt-1 mb-2 hover:text-terracotta transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-deep-blue/70 line-clamp-2 leading-relaxed mb-4">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Fila de precio y acciones */}
                  <div className="pt-3 border-t border-sand-light flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-deep-blue/50 block font-medium">
                        Precio
                      </span>
                      <span className="font-sans font-bold text-sm sm:text-base text-terracotta">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="button-interaction rounded-lg p-2 text-deep-blue transition-colors hover:bg-sand-light focus:outline-none focus:ring-2 focus:ring-gold/50"
                        title="Ver Detalles de la pieza"
                        aria-label={`Ver detalles de ${product.name}`}
                      >
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      <a
                        href={waMsg}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-interaction inline-flex items-center gap-1.5 rounded-xl bg-wa-green px-3.5 py-2 text-[11px] font-semibold text-deep-blue shadow-sm transition-colors hover:bg-wa-green-hover focus:outline-none focus:ring-2 focus:ring-wa-green/50 sm:text-xs"
                        title="Pedir por WhatsApp"
                      >
                        <WhatsAppIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Pedir</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Catalog;
