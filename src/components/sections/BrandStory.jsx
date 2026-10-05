import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { BRAND_STORY } from '../../data/story';
import { BRAND_PHOTOGRAPHS } from '../../data/brandImages';
import { getStoryInquiryMessage } from '../../constants/whatsapp';

export const BrandStory = () => {
  const waQuoteMessage = getStoryInquiryMessage();

  return (
    <section id="historia" className="story-section section-space" aria-label="La historia de Del Mar y su fundadora">
      <div className="page-shell">
        <div className="story-layout">
          <div className="story-photo-column">
            <div className="story-photo-frame">
              <ImageWithFallback
                src={BRAND_PHOTOGRAPHS[0].src}
                fallback={BRAND_PHOTOGRAPHS[2].src}
                alt={BRAND_PHOTOGRAPHS[0].alt}
                className="story-photo"
                style={{ objectPosition: BRAND_PHOTOGRAPHS[0].position }}
                width="768"
                height="1024"
                loading="lazy"
              />
              <div className="story-photo-caption">
                <span><Icon name="heart-soul" className="icon-16" /> Creadora & Fundadora</span>
                <strong>Del Mar Artesanías</strong>
                <small><Icon name="map-pin" className="icon-14" /> Dibulla • La Guajira, Colombia</small>
              </div>
            </div>
            <div className="story-authenticity">
              <span className="story-authenticity__icon"><Icon name="wayuu-sun" className="icon-20" /></span>
              <span><strong>100% Auténtico Wayúu</strong><small>Tejido a mano con amor y tradición</small></span>
            </div>
          </div>

          <div className="story-copy">
            <span className="eyebrow">Creadora & Fundadora Wayúu</span>
            <h2 className="editorial-title editorial-title--section">{BRAND_STORY.headline}</h2>
            <p className="story-subtitle">“{BRAND_STORY.subtitle}”</p>
            <div className="story-paragraphs">
              <p>{BRAND_STORY.paragraphs[0]}</p>
              <p>{BRAND_STORY.paragraphs[1]}</p>
            </div>
            <blockquote className="story-quote">
              <Icon name="quote" className="story-quote__mark" />
              <p>{BRAND_STORY.quote}</p>
              <cite>{BRAND_STORY.signature}</cite>
            </blockquote>
            <div className="story-contact">
              <div>
                <span className="story-contact__location"><Icon name="map-pin" className="icon-14" /> {BRAND_STORY.contactSummary.location}</span>
                <span>{BRAND_STORY.contactSummary.tagline}</span>
              </div>
              <a href={waQuoteMessage} target="_blank" rel="noopener noreferrer" className="button button--whatsapp">
                <WhatsAppIcon className="icon-16" />
                <span>Hablar con la Fundadora</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
