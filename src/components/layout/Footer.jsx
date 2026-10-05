import BrandLogo from '../common/BrandLogo';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getGeneralWhatsAppMessage } from '../../constants/whatsapp';
import { getCurrentYear } from '../../utils/formatters';
import { BRAND_STORY } from '../../data/story';

export const Footer = () => {
  const generalWaMessage = getGeneralWhatsAppMessage();

  return (
    <footer id="contacto" className="site-footer">
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#inicio" aria-label="Volver al inicio"><BrandLogo variant="light" size="sm" /></a>
            <p className="footer-slogan">“{BRAND_STORY.sloganPrimary}”</p>
            <p className="footer-description">Artesanías que nacen del corazón de una mujer guajira en Dibulla, La Guajira. Piezas tejidas a mano con identidad, historia, amor y tradición ancestral.</p>
            <a href={generalWaMessage} target="_blank" rel="noopener noreferrer" className="footer-whatsapp">
              <WhatsAppIcon className="icon-16" /><span>Escríbenos a WhatsApp</span>
            </a>
          </div>

          <div className="footer-links">
            <h2>Navegación</h2>
            <a href="#inicio">Inicio</a>
            <a href="#pilares">Los 4 Pilares</a>
            <a href="#catalogo">Catálogo de Piezas</a>
            <a href="#historia">La Historia de Del Mar</a>
          </div>

          <div className="footer-contact">
            <h2>Contacto y Envíos</h2>
            <p><Icon name="map-pin" className="icon-16" /><span>Dibulla, La Guajira • Colombia</span></p>
            <p><Icon name="phone" className="icon-16" /><span>+57 {BRAND_STORY.contactSummary.phone}</span></p>
            <p><Icon name="seashell" className="icon-16" /><span>Solo Artesanías 100% Auténticas</span></p>
            <p><Icon name="heart-soul" className="icon-16" /><span>Envíos seguros a toda Colombia</span></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {getCurrentYear()} Del Mar Artesanías • Dibulla, La Guajira. Todos los derechos reservados.</p>
          <p>Historias que se llevan contigo ♡</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
