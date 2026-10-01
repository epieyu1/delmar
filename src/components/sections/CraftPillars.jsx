import { CRAFT_PILLARS } from '../../data/pillars';
import Icon from '../common/Icon';
import ImageWithFallback from '../common/ImageWithFallback';
import BrandLogo from '../common/BrandLogo';

export const CraftPillars = () => {
  return (
    <section
      id="pilares"
      className="py-12 sm:py-16 lg:py-20 bg-sand relative overflow-hidden"
      aria-label="Nuestros 4 Pilares Artesanales"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado — estilo flyer */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          {/* Logo pequeño decorativo */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <BrandLogo variant="dark" showSlogan={false} size="sm" />
          </div>

          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-teal block mb-1">
            Nuestra Esencia
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue leading-tight">
            Historias que nacen junto al mar
          </h2>
          <p className="font-serif text-lg sm:text-xl text-gold mt-1">
            Artesanías con alma y corazón.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-8 bg-gold rounded-full" />
            <Icon name="diamond" className="w-4 h-4 text-gold" />
            <span className="h-px w-8 bg-gold rounded-full" />
          </div>
        </div>

        {/* Grilla de pilares — 2 cols en móvil, 4 en desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {CRAFT_PILLARS.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden
                shadow-sm hover:shadow-floating transition-all duration-500 cursor-pointer
                border-2 border-sand-light hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50
                bg-white aspect-square sm:aspect-auto sm:h-56 md:h-64"
            >
              {/* Vista en reposo */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between
                transition-opacity duration-500 group-hover:opacity-0 group-focus:opacity-0
                bg-gradient-to-b from-white to-sand-light/60">
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-teal/10 text-teal flex items-center justify-center">
                    <Icon name={item.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-[11px] sm:text-sm text-deep-blue uppercase tracking-wide leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-widest uppercase text-terracotta
                    bg-terracotta/10 px-2 py-0.5 rounded-full">
                    {item.subtitle}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-deep-blue/65 text-center leading-relaxed hidden sm:block">
                  {item.desc}
                </p>
              </div>

              {/* Vista hover — imagen y descripción */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500">
                <ImageWithFallback
                  src={item.image}
                  fallback={item.fallback}
                  alt={item.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/65 to-transparent
                  p-4 sm:p-5 flex flex-col justify-end text-sand">
                  <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold flex items-center justify-center mb-1.5">
                    <Icon name={item.icon} className="w-4 h-4" />
                  </div>
                  <span className="text-gold text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
                    {item.title}
                  </span>
                  <p className="text-[11px] sm:text-xs md:text-sm text-sand/90 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
export default CraftPillars;
