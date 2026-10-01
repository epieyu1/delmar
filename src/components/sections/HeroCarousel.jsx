import { useEffect, useMemo, useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
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
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((index) => (index + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToNextSlide = () => setCurrentSlide((index) => (index + 1) % slides.length);
  const goToPreviousSlide = () =>
    setCurrentSlide((index) => (index - 1 + slides.length) % slides.length);

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
      <div className="hero-carousel-frame relative w-full overflow-hidden bg-deep-blue text-sand">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
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
            <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/35 via-transparent to-deep-blue/20 md:bg-gradient-to-r md:from-deep-blue/60 md:via-deep-blue/15 md:to-transparent" />

            <div className="absolute inset-x-5 top-[17%] z-20 flex flex-col items-center gap-4 text-center sm:gap-5 md:inset-x-auto md:bottom-[10%] md:left-[6%] md:top-auto md:w-[min(30vw,30rem)] md:items-start md:gap-5 md:text-left">
              <h1 className="font-serif text-2xl font-semibold leading-tight text-sand drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
                {slide.title}
              </h1>

              {slide.isExternal ? (
                <a
                  href={slide.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-wa-green px-5 py-3 text-xs font-semibold text-white shadow-md transition-colors hover:bg-wa-green-hover focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deep-blue sm:text-sm md:text-base"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>{slide.ctaText}</span>
                </a>
              ) : (
                <a
                  href={slide.ctaLink}
                  className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-semibold text-deep-blue shadow-md transition-colors hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-sand focus:ring-offset-2 focus:ring-offset-deep-blue sm:text-sm md:text-base"
                >
                  <span>{slide.ctaText}</span>
                  <Icon name="arrow-right" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 right-5 z-30 flex items-center justify-end gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deep-blue ${
                index === currentSlide ? 'w-7 bg-gold' : 'w-2 bg-sand/60 hover:bg-sand'
              }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToPreviousSlide}
          className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-sand/30 bg-deep-blue/70 p-3 text-sand backdrop-blur-sm transition-colors hover:bg-deep-blue focus:outline-none focus:ring-2 focus:ring-gold md:flex"
          aria-label="Diapositiva anterior"
        >
          <Icon name="chevron-left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-sand/30 bg-deep-blue/70 p-3 text-sand backdrop-blur-sm transition-colors hover:bg-deep-blue focus:outline-none focus:ring-2 focus:ring-gold md:flex"
          aria-label="Siguiente diapositiva"
        >
          <Icon name="chevron-right" className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
