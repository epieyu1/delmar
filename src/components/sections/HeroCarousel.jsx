import { useState, useEffect, useMemo } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import BrandLogo from '../common/BrandLogo';
import { getWhatsAppLink } from '../../constants/whatsapp';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = useMemo(
    () => [
      {
        id: 1,
        title: 'Soy la mujer detrás de Del Mar ♡',
        subtitle: 'Historias que nacen junto al mar.',
        description:
          'Del Mar nació de algo que para mí significa mucho más que un nombre. Es vida, sueños, esencia y familia. Cada pieza lleva un pedacito de ese sentimiento.',
        badge: 'Creadora & Fundadora Wayúu',
        ctaText: 'Ver Colección',
        ctaLink: '#catalogo',
        image: '/fundadora.jpg',
        fallbackImage: '/fundadora-salinas.jpg'
      },
      {
        id: 2,
        title: 'Historias que se llevan contigo',
        subtitle: 'Amor por nuestras raíces y el mar de Dibulla.',
        description:
          'Cada pieza que comparto lleva el mar, nuestra tierra, nuestras historias y el trabajo hecho con las manos.',
        badge: 'Dibulla • La Guajira',
        ctaText: 'Conoce Mi Historia',
        ctaLink: '#historia',
        image: '/fundadora-salinas.jpg',
        fallbackImage: '/fundadora.jpg'
      },
      {
        id: 3,
        title: 'De Dibulla para Toda Colombia',
        subtitle: 'Envíos directos con atención personalizada.',
        description:
          'Llevamos la calidez de nuestras raíces y el talento de nuestros artesanos directamente a tu hogar.',
        badge: 'Envíos a Nivel Nacional',
        ctaText: 'Consultar por WhatsApp',
        ctaLink: getWhatsAppLink(
          'Hola Del Mar Artesanías 🌊, deseo consultar sobre sus artesanías de Dibulla, La Guajira.'
        ),
        isExternal: true,
        image: '/dibulla-mar.jpg',
        fallbackImage: '/fundadora.jpg'
      }
    ],
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="inicio"
      className="relative pt-20 sm:pt-24 md:pt-28 overflow-hidden bg-gradient-to-b from-sand-light to-sand"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-label="Carrusel principal Del Mar"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 relative mt-4">

        {/* Carrusel principal */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-floating bg-deep-blue text-sand
          min-h-[72vw] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[580px] flex items-center border-2 border-gold/30">

          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={slide.image}
                    fallback={slide.fallbackImage}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center sm:object-right"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Gradiente para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/95 via-deep-blue/75 to-deep-blue/20 sm:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 via-deep-blue/30 to-transparent sm:hidden" />
                </div>

                {/* Contenido superpuesto */}
                <div className="relative z-20 h-full flex flex-col justify-center
                  px-5 py-8 sm:px-10 sm:py-12 max-w-lg sm:max-w-xl">

                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full
                    bg-gold/20 text-gold border border-gold/40 text-[10px] sm:text-xs
                    font-bold tracking-wider uppercase mb-3 backdrop-blur-sm">
                    <Icon name="wayuu-sun" className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                    <span>{slide.badge}</span>
                  </span>

                  {/* Título */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 text-sand">
                    {slide.title}
                  </h1>

                  {/* Subtítulo en script (igual al flyer) */}
                  <p className="font-script text-lg sm:text-xl text-gold font-medium mb-2">
                    {slide.subtitle}
                  </p>

                  {/* Descripción */}
                  <p className="text-xs sm:text-sm text-sand/85 leading-relaxed mb-6 max-w-sm sm:max-w-md">
                    {slide.description}
                  </p>

                  {/* CTA */}
                  {slide.isExternal ? (
                    <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer"
                      className="self-start inline-flex items-center gap-2 bg-wa-green hover:bg-wa-green-hover
                        text-white px-5 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm
                        shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation">
                      <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{slide.ctaText}</span>
                    </a>
                  ) : (
                    <a href={slide.ctaLink}
                      className="self-start inline-flex items-center gap-2 bg-gold hover:bg-gold/90
                        text-deep-blue px-5 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm
                        shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation">
                      <span>{slide.ctaText}</span>
                      <Icon name="arrow-right" className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {/* Flechas de navegación — solo desktop */}
          <button type="button" onClick={prevSlide}
            className="absolute left-3 z-30 p-2.5 sm:p-3 rounded-full bg-deep-blue/70 hover:bg-deep-blue
              text-sand backdrop-blur-md border border-sand/20 transition-all hidden sm:flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-gold/50"
            aria-label="Diapositiva anterior">
            <Icon name="chevron-left" className="w-5 h-5" />
          </button>
          <button type="button" onClick={nextSlide}
            className="absolute right-3 z-30 p-2.5 sm:p-3 rounded-full bg-deep-blue/70 hover:bg-deep-blue
              text-sand backdrop-blur-md border border-sand/20 transition-all hidden sm:flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-gold/50"
            aria-label="Siguiente diapositiva">
            <Icon name="chevron-right" className="w-5 h-5" />
          </button>

          {/* Puntos de paginación */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-2">
            {slides.map((_, idx) => (
              <button key={idx} type="button" onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 focus:outline-none touch-manipulation
                  ${idx === currentSlide ? 'w-6 sm:w-8 h-2 bg-gold' : 'w-2 h-2 bg-sand/40 hover:bg-sand/70'}`}
                aria-label={`Ir a la diapositiva ${idx + 1}`}
                aria-current={idx === currentSlide}
              />
            ))}
          </div>
        </div>

        {/* Logo del flyer debajo del carrusel en móvil (visible en pantalla pequeña) */}
        <div className="flex justify-center mt-4 sm:hidden" aria-hidden="true">
          <BrandLogo variant="dark" showSlogan size="md" />
        </div>
      </div>

    </section>
  );
};
export default HeroCarousel;
