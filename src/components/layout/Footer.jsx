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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-sand/10">
          
          {/* Marca, Historia y Esencia */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="light" showSlogan={false} />
            <p className="font-script text-xl text-gold">
              "{BRAND_STORY.sloganPrimary}"
            </p>
            <p className="text-xs sm:text-sm text-sand/75 max-w-md leading-relaxed font-sans">
              Artesanías que nacen del corazón de una mujer guajira en Dibulla, La Guajira. Piezas tejidas a mano con identidad, historia, amor y tradición ancestral.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={generalWaMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-wa-green"
                title="WhatsApp Oficial"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Escríbenos a WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navegación rápida */}
          <div>
            <h4 className="font-serif font-bold text-gold text-sm tracking-wider uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-sand/80">
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
          <div>
            <h4 className="font-serif font-bold text-gold text-sm tracking-wider uppercase mb-4">
              Contacto y Envíos
            </h4>
            <ul className="space-y-3 text-xs text-sand/80">
              <li className="flex items-start gap-2">
                <Icon name="map-pin" className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Dibulla, La Guajira • Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="phone" className="w-4 h-4 text-gold shrink-0" />
                <span>+57 321 836 8605</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="seashell" className="w-4 h-4 text-gold shrink-0" />
                <span>Solo Artesanías 100% Auténticas</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="heart-soul" className="w-4 h-4 text-gold shrink-0" />
                <span>Envíos seguros a toda Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie de página con créditos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sand/50 gap-4">
          <p>© {getCurrentYear()} Del Mar Artesanías • Dibulla, La Guajira. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5 font-script text-base text-gold">
            <span>Historias que se llevan contigo ♡</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
