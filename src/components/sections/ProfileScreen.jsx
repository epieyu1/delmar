import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { BRAND_STORY } from '../../data/story';
import { getGeneralWhatsAppMessage, WHATSAPP_PHONE } from '../../constants/whatsapp';

export const ProfileScreen = () => {
  const generalWaMessage = getGeneralWhatsAppMessage();

  return (
    <div className="profile-screen-content" id="contacto" aria-label="Contacto">
      <div className="screen-header-block">
        <h2 className="screen-header-block__title">Contacto</h2>
        <p className="screen-header-block__subtitle">{BRAND_STORY.contactSummary.location}</p>
      </div>

      <section className="contact-card">
        <span className="eyebrow-label">{BRAND_STORY.contactSummary.tagline}</span>
        <h2 className="contact-card__title">{BRAND_STORY.subtitle}</h2>
        <p className="contact-card__badge">{BRAND_STORY.badge}</p>
        <a href={generalWaMessage} target="_blank" rel="noopener noreferrer" className="contact-card__action">
          <WhatsAppIcon className="icon-18" />
          <span>Escribir por WhatsApp</span>
        </a>
        <a href={`tel:+${WHATSAPP_PHONE}`} className="contact-card__phone">
          <Icon name="phone" className="icon-16" />
          <span>+57 {BRAND_STORY.contactSummary.phone}</span>
        </a>
      </section>

      <div className="contact-detail-card">
        <div className="contact-detail-card__row">
          <span className="contact-detail-card__icon"><Icon name="map-pin" className="icon-18" /></span>
          <div>
            <span className="contact-detail-card__label">Ubicación</span>
            <p>{BRAND_STORY.contactSummary.location}</p>
          </div>
        </div>
        <div className="contact-detail-card__row">
          <span className="contact-detail-card__icon"><Icon name="seashell" className="icon-18" /></span>
          <div>
            <span className="contact-detail-card__label">{BRAND_STORY.contactSummary.tagline}</span>
            <p>{BRAND_STORY.sloganSecondary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
