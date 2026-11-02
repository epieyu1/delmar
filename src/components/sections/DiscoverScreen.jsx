import ProductCard from '../common/ProductCard';
import Icon from '../common/Icon';
import { CRAFT_PILLARS } from '../../data/pillars';

const FEATURED_COUNT = 4;

export const DiscoverScreen = ({ productsList, onSelectProduct, onOpenCatalog }) => {
  const featuredProducts = productsList.slice(0, FEATURED_COUNT);

  return (
    <section className="discover-screen-content" id="artesania" aria-label="Artesanía Del Mar">
      <div className="screen-header-block">
        <h2 className="screen-header-block__title">{CRAFT_PILLARS[0].title}</h2>
        <p className="screen-header-block__subtitle">{CRAFT_PILLARS[0].desc}</p>
      </div>

      <div className="shop-products-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onSelectProduct} eager />
        ))}
      </div>

      <button type="button" className="section-cta" onClick={onOpenCatalog}>
        Ver catálogo completo <Icon name="arrow-right" className="icon-14" />
      </button>
    </section>
  );
};

export default DiscoverScreen;
