import { useEffect, useMemo, useRef, useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { BRAND_STORY } from '../../data/story';
import { INITIAL_PRODUCTS } from '../../data/products';
import { BRAND_PHOTOGRAPHS } from '../../data/brandImages';
import { getWhatsAppLink } from '../../constants/whatsapp';
import { formatCurrency } from '../../utils/formatters';

export const HeroCarousel = ({ onSelectProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerRef = useRef(null);
  const touchStartX = useRef(null);
  const featuredProduct = INITIAL_PRODUCTS[0];
  const slides = useMemo(() => [
    {
      id: 1,
      title: 'Historias que nacen junto al mar.',
      ctaText: 'Ver colección',
      ctaLink: '#catalogo',
      photo: BRAND_PHOTOGRAPHS[0]
    },
    {
      id: 2,
      title: 'Artesanías con raíces que viajan contigo.',
      ctaText: 'Conoce nuestra historia',
      ctaLink: '#historia',
      photo: BRAND_PHOTOGRAPHS[1]
    },
    {
      id: 3,
      title: 'Del mar de Dibulla a tu hogar.',
      ctaText: 'Consultar por WhatsApp',
      ctaLink: getWhatsAppLink('Hola Del Mar Artesanías 🌊, deseo consultar sobre sus artesanías de Dibulla, La Guajira.'),
      isExternal: true,
      photo: BRAND_PHOTOGRAPHS[2]
    },
    {
      id: 4,
      title: BRAND_STORY.sloganPrimary,
      ctaText: 'Conoce nuestra historia',
      ctaLink: '#historia',
      photo: BRAND_PHOTOGRAPHS[3]
    }
  ], []);

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setCurrentSlide((index) => (index + 1) % slides.length);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleBannerTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    setIsPaused(true);
  };

  const handleBannerTouchEnd = (event) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    const swipeDistance = startX === null || endX === undefined ? 0 : startX - endX;
    const swipeThreshold = (bannerRef.current?.clientWidth ?? 0) * 0.12;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      setCurrentSlide((index) => (index + (swipeDistance > 0 ? 1 : -1) + slides.length) % slides.length);
    }

    touchStartX.current = null;
    setIsPaused(false);
  };

  const handleBannerTouchCancel = () => {
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="inicio"
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Presentación de Del Mar Artesanías"
    >
      <div className="page-shell hero-layout">
        <div
          ref={bannerRef}
          className="hero-banner"
          role="group"
          aria-roledescription="carrusel"
          aria-label="Presentación de Del Mar Artesanías"
          onTouchStart={handleBannerTouchStart}
          onTouchEnd={handleBannerTouchEnd}
          onTouchCancel={handleBannerTouchCancel}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={'hero-carousel__slide' + (isActive ? ' is-active' : '')}
                inert={!isActive}
                aria-hidden={!isActive}
              >
                <ImageWithFallback
                  src={slide.photo.src}
                  alt={slide.photo.alt}
                  className="hero-banner__image"
                  style={{ objectPosition: slide.photo.position }}
                  width="1200"
                  height="1600"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
                <div className="hero-banner__veil" />
                <div className="hero-banner__content" aria-live={isActive ? 'polite' : undefined}>
                  <span className="eyebrow hero-location">{BRAND_STORY.contactSummary.location}</span>
                  <h1 className="editorial-title hero-title">{slide.title}</h1>
                  <p className="hero-description">{BRAND_STORY.paragraphs[0]}</p>
                  <a
                    href={slide.ctaLink}
                    target={slide.isExternal ? '_blank' : undefined}
                    rel={slide.isExternal ? 'noopener noreferrer' : undefined}
                    className={slide.isExternal ? 'button button--whatsapp' : 'button button--light'}
                  >
                    {slide.isExternal && <WhatsAppIcon className="icon-16" />}
                    <span>{slide.ctaText}</span>
                    {!slide.isExternal && <Icon name="arrow-right" className="icon-16" />}
                  </a>
                </div>
              </div>
            );
          })}

          <div className="hero-carousel-controls" aria-label="Controles de presentación">
            <div className="hero-carousel-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={index === currentSlide ? 'is-active' : ''}
                  aria-label={'Ir a la diapositiva ' + (index + 1)}
                  aria-current={index === currentSlide ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>

        <article className="featured-card">
          <div className="featured-card__copy">
            <span className="eyebrow featured-card__eyebrow">Pieza destacada · {featuredProduct.category}</span>
            <h2>{featuredProduct.name}</h2>
            <p>{featuredProduct.shortDesc}</p>
            <strong className="featured-card__price">{formatCurrency(featuredProduct.price)}</strong>
            <button type="button" className="featured-card__link" onClick={() => onSelectProduct(featuredProduct)}>
              Ver pieza <Icon name="arrow-right" className="icon-16" />
            </button>
          </div>
          <div className="featured-card__image-wrap">
            <ImageWithFallback
              src={featuredProduct.images[0]}
              fallback={featuredProduct.images[1]}
              alt={featuredProduct.name}
              className="featured-card__image"
              width="480"
              height="480"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default HeroCarousel;
