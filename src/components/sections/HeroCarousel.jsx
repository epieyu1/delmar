import { useEffect, useMemo, useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { BRAND_STORY } from '../../data/story';
import { getWhatsAppLink } from '../../constants/whatsapp';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = useMemo(
    () => [
      {
        id: 1,
        title: 'Historias que nacen junto al mar.',
        ctaText: 'Ver colección',
        ctaLink: '#catalogo',
        image: '/fundadora.jpg'
      },
      {
        id: 2,
        title: 'Artesanías con raíces que viajan contigo.',
        ctaText: 'Conoce nuestra historia',
        ctaLink: '#historia',
        image: '/fundadora.jpg'
      },
      {
        id: 3,
        title: 'Del mar de Dibulla a tu hogar.',
        ctaText: 'Consultar por WhatsApp',
        ctaLink: getWhatsAppLink(
          'Hola Del Mar Artesanías 🌊, deseo consultar sobre sus artesanías de Dibulla, La Guajira.'
        ),
        image: '/fundadora.jpg',
        isExternal: true
      }
    ],
    []
  );

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setCurrentSlide((index) => (index + 1) % slides.length), 9000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goToPreviousSlide = () =>
    setCurrentSlide((index) => (index - 1 + slides.length) % slides.length);
  const goToNextSlide = () => setCurrentSlide((index) => (index + 1) % slides.length);

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-deep-blue"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-label="Carrusel principal Del Mar"
    >
      <div className="hero-carousel-frame relative min-h-[550px] w-full overflow-hidden bg-deep-blue text-sand lg:min-h-[680px]">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              inert={!isActive}
              className={`hero-carousel-slide absolute inset-0 ${isActive ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'}`}
              aria-hidden={!isActive}
            >
              <ImageWithFallback
                src={slide.image}
                fallback="/fundadora-salinas.jpg"
                alt="Mujer wayúu frente al mar en La Guajira"
                width={768}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_75%]"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-deep-blue/85 via-deep-blue/55 to-transparent" />
              <div className="absolute inset-0 z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-5 py-12 text-center sm:px-8 md:items-start md:px-6 md:py-0 md:text-left">
                <div className="flex w-full max-w-lg flex-col items-center gap-3 sm:gap-4 md:w-[28%] md:items-start">
                  <span className="inline-flex max-w-full items-center rounded-full border border-gold/40 bg-deep-blue/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold shadow-sm backdrop-blur-sm sm:text-xs">
                    {BRAND_STORY.contactSummary.location}
                  </span>
                  <h1 className="font-serif text-2xl font-semibold leading-tight text-sand drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="max-w-prose text-sm leading-relaxed text-sand/95 drop-shadow sm:text-base">
                    {BRAND_STORY.paragraphs[0]}
                  </p>
                  <a
                    href={slide.ctaLink}
                    target={slide.isExternal ? '_blank' : undefined}
                    rel={slide.isExternal ? 'noopener noreferrer' : undefined}
                    className={`button-interaction inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deep-blue sm:text-sm md:text-base ${slide.isExternal ? 'bg-wa-green text-deep-blue hover:bg-wa-green-hover' : 'bg-gold text-deep-blue hover:bg-gold/90'}`}
                  >
                    {slide.isExternal && <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />}
                    <span>{slide.ctaText}</span>
                    {!slide.isExternal && <Icon name="arrow-right" className="h-4 w-4" aria-hidden="true" />}
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`button-interaction h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deep-blue ${index === currentSlide ? 'w-7 bg-gold' : 'w-2 bg-sand/60 hover:bg-sand'}`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToPreviousSlide}
          className="button-interaction absolute bottom-4 left-4 z-30 hidden items-center justify-center rounded-full border border-sand/30 bg-deep-blue/70 p-3 text-sand backdrop-blur-sm transition-colors hover:bg-deep-blue focus:outline-none focus:ring-2 focus:ring-gold md:flex"
          aria-label="Diapositiva anterior"
        >
          <Icon name="chevron-left" className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goToNextSlide}
          className="button-interaction absolute bottom-4 left-16 z-30 hidden items-center justify-center rounded-full border border-sand/30 bg-deep-blue/70 p-3 text-sand backdrop-blur-sm transition-colors hover:bg-deep-blue focus:outline-none focus:ring-2 focus:ring-gold md:flex"
          aria-label="Siguiente diapositiva"
        >
          <Icon name="chevron-right" className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
