import { CRAFT_PILLARS } from '../../data/pillars';
import { BRAND_PHOTOGRAPHS } from '../../data/brandImages';
import Icon from '../common/Icon';

export const CraftPillars = () => (
  <section id="pilares" className="essence-section section-space" aria-label="Nuestra esencia y pilares artesanales">
    <div className="page-shell">
      <div className="section-heading">
        <span className="eyebrow">Nuestra esencia</span>
        <h2 className="editorial-title editorial-title--section">Historias que nacen junto al mar</h2>
        <p>Artesanías con alma y corazón.</p>
      </div>

      <div className="essence-stories" aria-label="Historias de nuestra esencia">
        {BRAND_PHOTOGRAPHS.map((photo, index) => (
          <div className="essence-story" key={photo.src}>
            <span
              className="essence-story__image-frame"
              role="img"
              aria-label={photo.alt}
              style={{ backgroundImage: `url("${photo.src}")`, backgroundPosition: photo.position }}
            >
              <span className="essence-story__image-veil" aria-hidden="true" />
            </span>
            <span className="essence-story__label">{CRAFT_PILLARS[index].title}</span>
          </div>
        ))}
      </div>

      <div className="pillar-heading">
        <span className="eyebrow">Los 4 sellos de nuestra identidad</span>
      </div>
      <div className="pillars-grid">
        {CRAFT_PILLARS.map((item) => (
          <article className="pillar-card" key={item.id}>
            <span className="pillar-card__icon"><Icon name={item.icon} className="icon-20" /></span>
            <div>
              <h3>{item.title}</h3>
              <span className="pillar-card__subtitle">{item.subtitle}</span>
            </div>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CraftPillars;
