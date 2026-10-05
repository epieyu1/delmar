import { useEffect, useState } from 'react';
import BrandLogo from '../common/BrandLogo';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getGeneralWhatsAppMessage } from '../../constants/whatsapp';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio', icon: 'home', section: 'inicio' },
  { label: 'Nosotros', href: '#historia', icon: 'users', section: 'historia' },
  { label: 'Catálogo', href: '#catalogo', icon: 'grid', section: 'catalogo' },
  { label: 'Contacto', href: '#contacto', icon: 'message-circle', section: 'contacto' }
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const generalWaMessage = getGeneralWhatsAppMessage();

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.section)).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner page-shell">
          <a className="site-header__brand" href="#inicio" aria-label="Del Mar Artesanías, inicio">
            <BrandLogo variant="dark" size="sm" />
          </a>

          <nav className="site-header__links" aria-label="Navegación principal">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <a key={item.section} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              className="header-order-link"
              href={generalWaMessage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp"
            >
              <WhatsAppIcon className="icon-16" />
              <span>Contáctanos</span>
            </a>
          </div>
        </div>
      </header>

      <nav className="bottom-navigation" aria-label="Navegación móvil">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.section}
            className={'bottom-navigation__item' + (activeSection === item.section ? ' is-active' : '')}
            href={item.href}
            aria-current={activeSection === item.section ? 'location' : undefined}
          >
            <Icon name={item.icon} className="icon-18" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
