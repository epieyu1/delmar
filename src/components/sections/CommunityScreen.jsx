import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { BRAND_STORY } from '../../data/story';
import { BRAND_PHOTOGRAPHS } from '../../data/brandImages';
import { getStoryInquiryMessage } from '../../constants/whatsapp';

export const CommunityScreen = () => {
  const waMessage = getStoryInquiryMessage();

  return (
    <div className="community-screen-content" id="historia" aria-label="Historia de Del Mar Artesanías">
      <article className="story-card-mobile">
        <div className="story-card-mobile__image-wrap">
          <ImageWithFallback
            src={BRAND_PHOTOGRAPHS[0].src}
            fallback={BRAND_PHOTOGRAPHS[1].src}
            alt={BRAND_PHOTOGRAPHS[0].alt}
            className="story-card-mobile__image"
            width="700"
            height="500"
            loading="lazy"
          />
          <span className="story-card-mobile__badge">
            <Icon name="heart-soul" className="icon-16" />
            {BRAND_STORY.badge}
          </span>
        </div>

        <div className="story-card-mobile__hero-copy">
          <span className="eyebrow-label">{BRAND_STORY.contactSummary.location}</span>
          <h2>{BRAND_STORY.headline}</h2>
          <p>{BRAND_STORY.subtitle}</p>
        </div>

        <div className="story-card-mobile__body">
          <h2 className="story-card-mobile__slogan">{BRAND_STORY.sloganPrimary}</h2>
          {BRAND_STORY.paragraphs.map((paragraph) => (
            <p className="story-card-mobile__paragraph" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <blockquote className="story-quote-box">
        <Icon name="quote" className="story-quote-box__icon" />
        <p>“{BRAND_STORY.quote}”</p>
        <cite>{BRAND_STORY.signature}</cite>
      </blockquote>

      <a href={waMessage} target="_blank" rel="noopener noreferrer" className="story-contact-btn">
        <WhatsAppIcon className="icon-18" />
        <span>Escribir por WhatsApp</span>
      </a>
    </div>
  );
};

export default CommunityScreen;
