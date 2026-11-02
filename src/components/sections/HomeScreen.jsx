import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import { BRAND_STORY } from '../../data/story';

export const HomeScreen = ({ productsList, onNavigate }) => {
  const featuredProduct = productsList[0];
  const categoriesCount = new Set(productsList.map(({ category }) => category)).size;
  const [placeName, regionName] = BRAND_STORY.contactSummary.location.split(' • ');

  return (
    <div className="home-screen-content" id="inicio">
      <section className="home-hero-block" aria-label="Del Mar Artesanías">
        {featuredProduct && (
          <div className="home-hero-image-wrap" aria-hidden="true">
            <ImageWithFallback
              src={featuredProduct.images[0]}
              fallback={featuredProduct.images[1] ?? featuredProduct.images[0]}
              alt=""
              className="home-hero-image"
              width="520"
              height="620"
              loading="eager"
            />
          </div>
        )}
        <svg className="home-hero-wave" viewBox="0 0 390 42" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 19C60 3 118 3 176 15C238 28 294 30 344 18C364 13 378 9 390 9V42H0V19Z" />
        </svg>
      </section>

      <section className="home-hero-intro">
        <h1 className="visually-hidden">{BRAND_STORY.sloganSecondary}</h1>
        <span className="home-hero-location">{BRAND_STORY.contactSummary.location}</span>
        <p className="home-hero-subtext">{BRAND_STORY.sloganPrimary}</p>
        <button type="button" className="home-hero-cta" onClick={() => onNavigate('catalogo')}>
          Explorar catálogo <Icon name="arrow-right" className="icon-14" />
        </button>
      </section>

      <section className="home-facts-row" aria-label="Información del catálogo">
        <div className="home-fact">
          <strong>{productsList.length}</strong>
          <span>piezas</span>
        </div>
        <div className="home-fact">
          <strong>{categoriesCount}</strong>
          <span>categorías</span>
        </div>
        <div className="home-fact home-fact--place">
          <strong>{placeName}</strong>
          <span>{regionName}</span>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
