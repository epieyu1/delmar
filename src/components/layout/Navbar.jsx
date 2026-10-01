import { useState, useEffect } from 'react';
import BrandLogo from '../common/BrandLogo';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getGeneralWhatsAppMessage } from '../../constants/whatsapp';

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Pilares', href: '#pilares' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Nuestra Historia', href: '#historia' }
  ];

  const generalWaMessage = getGeneralWhatsAppMessage();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-sand/95 backdrop-blur-md shadow-coastal py-3 border-b border-sand-light'
            : 'bg-sand/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href="#inicio"
              className="focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-lg p-1"
              aria-label="Ir al inicio - Del Mar Artesanías"
            >
              <BrandLogo variant="dark" />
            </a>

            {/* Menú de escritorio */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm lg:text-base font-medium text-deep-blue hover:text-terracotta transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-terracotta hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Botón de acción escritorio */}
            <div className="hidden md:flex items-center">
              <a
                href={generalWaMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="button-interaction inline-flex items-center gap-2 rounded-full bg-wa-green px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-deep-blue shadow-md transition-all hover:bg-wa-green-hover hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-wa-green/50 sm:text-sm lg:text-base"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Comprar</span>
              </a>
            </div>

            {/* Botón menú móvil */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen((isOpen) => !isOpen)}
              className="button-interaction md:hidden rounded-xl p-2.5 text-deep-blue transition-colors hover:bg-sand-light focus:outline-none focus:ring-2 focus:ring-deep-blue/30"
              aria-label={mobileDrawerOpen ? 'Cerrar Menú' : 'Abrir Menú'}
              aria-expanded={mobileDrawerOpen}
              aria-controls="mobile-menu"
            >
              {mobileDrawerOpen ? (
                <Icon name="x" className="w-6 h-6" aria-hidden="true" />
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 7.5h14M5 16.5h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer móvil accesible */}
      {mobileDrawerOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[60] flex flex-col bg-sand/40 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          <div className="flex items-center justify-between p-4 border-b border-sand-light">
            <BrandLogo variant="dark" />
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="button-interaction rounded-xl p-2.5 text-deep-blue transition-colors hover:bg-sand-light focus:outline-none focus:ring-2 focus:ring-deep-blue/30"
              aria-label="Cerrar Menú"
            >
              <Icon name="x" className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 px-6 py-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Menú de Navegación
              </p>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block border-b border-sand-light/60 py-2 font-serif text-lg font-semibold text-deep-blue transition-colors hover:text-terracotta sm:text-xl"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={generalWaMessage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileDrawerOpen(false)}
                className="button-interaction inline-flex w-full items-center justify-center gap-3 rounded-xl bg-wa-green py-3.5 text-sm font-semibold text-deep-blue shadow-md transition-colors hover:bg-wa-green-hover focus:outline-none focus:ring-2 focus:ring-wa-green/50 sm:text-base"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
