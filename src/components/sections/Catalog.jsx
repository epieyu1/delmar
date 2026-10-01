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
    <section id="catalogo" className="py-16 md:py-24 bg-sand" aria-label="Catálogo de productos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del catálogo */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
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
        <div className="flex justify-center mb-10">
          <div
            className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 no-scrollbar px-2"
            role="tablist"
            aria-label="Filtro de categorías de productos"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                    isSelected
                      ? 'bg-deep-blue text-sand shadow-md'
                      : 'bg-sand-light text-deep-blue/80 hover:bg-teal/10 hover:text-teal'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grilla responsiva de productos */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const waMsg = getProductOrderMessage(product);

            return (
              <article
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-sand-light shadow-sm hover:shadow-coastal transition-all duration-300 flex flex-col"
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
                  <span className="absolute top-3 left-3 bg-deep-blue/90 backdrop-blur-sm text-gold text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.tag}
                  </span>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-teal tracking-widest uppercase">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif font-bold text-base text-deep-blue mt-1 mb-2 hover:text-terracotta transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-deep-blue/70 line-clamp-2 leading-relaxed mb-4">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Fila de precio y acciones */}
                  <div className="pt-3 border-t border-sand-light flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[10px] text-deep-blue/50 block font-medium">
                        Precio
                      </span>
                      <span className="font-sans font-bold text-base text-terracotta">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="p-2 rounded-lg text-deep-blue hover:bg-sand-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50"
                        title="Ver Detalles de la pieza"
                        aria-label={`Ver detalles de ${product.name}`}
                      >
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      <a
                        href={waMsg}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-wa-green hover:bg-wa-green-hover text-white text-xs px-3.5 py-2 rounded-xl font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-wa-green/50"
                        title="Pedir por WhatsApp"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
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
