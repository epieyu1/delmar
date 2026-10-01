import BrandLogo from '../common/BrandLogo';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getGeneralWhatsAppMessage } from '../../constants/whatsapp';
import { getCurrentYear } from '../../utils/formatters';
import { BRAND_STORY } from '../../data/story';

export const Footer = () => {
  const generalWaMessage = getGeneralWhatsAppMessage();

  return (
    <footer className="bg-deep-blue text-sand relative border-t border-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-sand/10 text-center">
          
          {/* Marca, Historia y Esencia */}
          <div className="flex flex-col items-center space-y-4">
            <BrandLogo variant="light" showSlogan={false} />
            <p className="font-serif text-lg sm:text-xl text-gold">
              "{BRAND_STORY.sloganPrimary}"
            </p>
            <p className="text-sm sm:text-base text-sand/75 max-w-md leading-relaxed font-sans">
              Artesanías que nacen del corazón de una mujer guajira en Dibulla, La Guajira. Piezas tejidas a mano con identidad, historia, amor y tradición ancestral.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={generalWaMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-wa-green"
                title="WhatsApp Oficial"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Escríbenos a WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navegación rápida */}
          <div className="flex flex-col items-center">
            <h4 className="font-serif font-bold text-gold text-base sm:text-lg tracking-wider uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-sand/80">
              <li>
                <a href="#inicio" className="hover:text-gold transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-gold transition-colors">
                  Los 4 Pilares
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-gold transition-colors">
                  Catálogo de Piezas
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-gold transition-colors">
                  La Historia de Del Mar
                </a>
              </li>
            </ul>
          </div>

          {/* Ubicación y Contacto Oficial (del Flyer) */}
          <div className="flex flex-col items-center">
            <h4 className="font-serif font-bold text-gold text-base sm:text-lg tracking-wider uppercase mb-4">
              Contacto y Envíos
            </h4>
            <ul className="flex flex-col items-center gap-3 text-sm sm:text-base text-sand/80">
              <li className="flex flex-col items-center gap-1">
                <Icon name="map-pin" className="w-4 h-4 text-gold shrink-0" />
                <span>Dibulla, La Guajira • Colombia</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <Icon name="phone" className="w-4 h-4 text-gold shrink-0" />
                <span>+57 321 836 8605</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <Icon name="seashell" className="w-4 h-4 text-gold shrink-0" />
                <span>Solo Artesanías 100% Auténticas</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <Icon name="heart-soul" className="w-4 h-4 text-gold shrink-0" />
                <span>Envíos seguros a toda Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie de página con créditos */}
        <div className="mt-8 flex flex-col items-center justify-center text-center text-xs sm:text-sm text-sand/60 gap-3 sm:gap-4">
          <p>© {getCurrentYear()} Del Mar Artesanías • Dibulla, La Guajira. Todos los derechos reservados.</p>
          <p className="flex items-center justify-center gap-1.5 font-serif text-sm sm:text-base text-gold">
            <span>Historias que se llevan contigo ♡</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
