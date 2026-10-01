import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { BRAND_STORY } from '../../data/story';
import { CRAFT_PILLARS } from '../../data/pillars';
import { getStoryInquiryMessage } from '../../constants/whatsapp';

export const BrandStory = () => {
  const waQuoteMessage = getStoryInquiryMessage();

  return (
    <section
      id="historia"
      className="py-16 md:py-24 bg-gradient-to-b from-sand via-sand-light/50 to-sand relative overflow-hidden"
      aria-label="La Historia de Del Mar y Nuestra Creadora"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.28em] text-teal bg-teal/10 px-4 py-1.5 rounded-full mb-3">
            <Icon name="seashell" className="w-3.5 h-3.5 text-teal" />
            <span>Creadora & Fundadora Wayúu</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-deep-blue">
            {BRAND_STORY.headline}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-terracotta mt-2">
            "{BRAND_STORY.subtitle}"
          </p>
        </div>

        {/* Tarjeta Principal con la Foto Limpia de la Fundadora y el Relato */}
        <div className="bg-white rounded-3xl border-2 border-teal/20 shadow-floating overflow-hidden p-6 sm:p-10 lg:p-12 relative mb-12">
          
          {/* Acentos decorativos de esquinas */}
          <div className="absolute top-4 right-4 text-gold/25 pointer-events-none hidden sm:block">
            <Icon name="starfish" className="w-12 h-12" />
          </div>
          <div className="absolute bottom-4 left-4 text-teal/20 pointer-events-none hidden sm:block">
            <Icon name="seagulls" className="w-14 h-14" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Fotografía Oficial Limpia de la Fundadora */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-coastal border-4 border-sand-light aspect-[3/4] bg-sand-light group">
                <ImageWithFallback
                  src="/fundadora.jpg"
                  fallback="/fundadora-salinas.jpg"
                  alt="Creadora y Fundadora de Del Mar Artesanías en La Guajira"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Degradado sobre la foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/85 via-deep-blue/20 to-transparent"></div>
                
                {/* Placa de la Fundadora */}
                <div className="absolute bottom-6 left-6 right-6 text-sand">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-1">
                    <Icon name="heart-soul" className="w-4 h-4 text-gold" />
                    <span>Creadora & Fundadora</span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white">
                    Del Mar Artesanías
                  </p>
                  <p className="text-xs text-sand/80 mt-1 flex items-center gap-1">
                    <Icon name="map-pin" className="w-3.5 h-3.5 text-gold" />
                    <span>Dibulla • La Guajira, Colombia</span>
                  </p>
                </div>
              </div>

              {/* Insignia artesanal flotante */}
              <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-deep-blue text-sand p-4 rounded-2xl shadow-coastal border border-gold/30 max-w-xs items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
                  <Icon name="wayuu-sun" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gold">100% Auténtico Wayúu</p>
                  <p className="text-[11px] text-sand/80">Tejido a mano con amor y tradición</p>
                </div>
              </div>
            </div>

            {/* Texto y Narrativa Íntegra de la Fundadora */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="space-y-4 text-sm sm:text-base text-deep-blue/85 leading-relaxed font-sans">
                <p className="font-medium text-deep-blue text-base sm:text-lg">
                  {BRAND_STORY.paragraphs[0]}
                </p>

                {/* Resalte poético de vida, sueño, esencia */}
                <div className="py-3 px-5 bg-sand-light rounded-2xl border-l-4 border-terracotta text-terracotta font-serif text-lg sm:text-xl font-bold italic">
                  "{BRAND_STORY.paragraphs[1]}"
                </div>

                <p>
                  {BRAND_STORY.paragraphs[2]}
                </p>

                <p>
                  {BRAND_STORY.paragraphs[3]}
                </p>

                <p className="font-medium text-teal-dark">
                  {BRAND_STORY.paragraphs[4]}
                </p>
              </div>

              {/* Tarjeta de Agradecimiento y Cita de la Fundadora */}
              <div className="bg-deep-blue text-sand p-6 sm:p-7 rounded-2xl shadow-sm relative mt-6 border border-gold/30">
                <Icon name="quote" className="w-8 h-8 text-gold/30 absolute top-3 left-4" />
                <blockquote className="relative z-10 font-script text-2xl sm:text-3xl text-gold text-center py-1 leading-relaxed">
                  "{BRAND_STORY.quote}"
                </blockquote>
                <p className="text-center text-xs font-semibold tracking-widest uppercase text-sand/75 mt-2">
                  {BRAND_STORY.signature}
                </p>
              </div>

              {/* Botón de Contacto con la Creadora */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-sand-light">
                <div className="text-xs text-deep-blue/70">
                  <span className="block font-bold text-deep-blue">
                    📍 {BRAND_STORY.contactSummary.location}
                  </span>
                  <span>{BRAND_STORY.contactSummary.tagline}</span>
                </div>

                <a
                  href={waQuoteMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-wa-green hover:bg-wa-green-hover text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-wa-green/50"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Hablar con la Fundadora</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Los 4 Pilares dispuestos en cinta */}
        <div className="bg-sand-light rounded-3xl p-6 sm:p-8 border border-sand-light">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-teal mb-6">
            Los 4 Sellos de Nuestra Identidad
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CRAFT_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl p-4 text-center border border-sand-light shadow-sm flex flex-col items-center justify-center gap-2 hover:border-gold/50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
                  <Icon name={pillar.icon} className="w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-deep-blue uppercase tracking-wider">
                  {pillar.title}
                </span>
                <span className="text-[11px] text-deep-blue/60 leading-tight">
                  {pillar.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
export default BrandStory;
