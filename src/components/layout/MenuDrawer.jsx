import { useEffect, useRef } from 'react';
import Icon from '../common/Icon';

export const MenuDrawer = ({ isOpen, sections, activeSection, onNavigate, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="menu-scrim" onClick={onClose} aria-hidden="true" />

      <nav id="menu-drawer" className="menu-drawer" aria-label="Secciones del sitio">
        <div className="menu-drawer__head">
          <span className="menu-drawer__title">Secciones</span>
          <button type="button" className="menu-drawer__close" onClick={onClose} ref={closeButtonRef} aria-label="Cerrar menú">
            <Icon name="x" className="icon-18" />
          </button>
        </div>

        <ul className="menu-drawer__list">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  className={`menu-drawer__link${isActive ? ' is-active' : ''}`}
                  onClick={() => onNavigate(id)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>{label}</span>
                  <Icon name="arrow-right" className="icon-14" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MenuDrawer;
