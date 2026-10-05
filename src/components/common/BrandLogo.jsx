import desktopEmblem from '../../assets/brand/emblem-desktop.png';
import mobileEmblem from '../../assets/brand/emblem-mobile.png';
import desktopEmblemLight from '../../assets/brand/emblem-desktop-light.png';
import mobileEmblemLight from '../../assets/brand/emblem-mobile-light.png';

export const BrandLogo = ({ variant = 'dark', size = 'md', className = '' }) => {
  const logoSize = ['sm', 'md', 'lg'].includes(size) ? size : 'md';
  const isLight = variant === 'light';
  const desktopImage = isLight ? desktopEmblemLight : desktopEmblem;
  const mobileImage = isLight ? mobileEmblemLight : mobileEmblem;

  return (
    <span className={['brand-logo', `brand-logo--${variant}`, `brand-logo--${logoSize}`, className].filter(Boolean).join(' ')}>
      <picture className="brand-logo__picture">
        <source media="(min-width: 48rem)" srcSet={desktopImage} />
        <img
          src={mobileImage}
          alt=""
          className="brand-logo__image"
          decoding="async"
        />
      </picture>
      <span className="brand-logo__wordmark">
        <span className="brand-logo__name">Del Mar</span>
        <span className="brand-logo__descriptor">Artesanías</span>
      </span>
    </span>
  );
};

export default BrandLogo;
