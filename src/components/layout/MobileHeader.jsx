import BrandLogo from '../common/BrandLogo';

export const MobileHeader = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <header className="mobile-top-header">
      <button
        type="button"
        className="header-menu-btn"
        onClick={onMenuToggle}
        aria-expanded={isMenuOpen}
        aria-controls="menu-drawer"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className="header-menu-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <BrandLogo className="header-brand" variant="dark" size="sm" />
    </header>
  );
};

export default MobileHeader;
