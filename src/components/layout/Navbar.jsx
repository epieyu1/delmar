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
                className="text-sm font-medium text-deep-blue hover:text-terracotta transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-terracotta hover:after:w-full after:transition-all"
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
              className="inline-flex items-center gap-2 bg-wa-green hover:bg-wa-green-hover text-white px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-wa-green/50"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Comprar</span>
            </a>
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden p-2.5 rounded-xl text-deep-blue hover:bg-sand-light transition-colors focus:outline-none focus:ring-2 focus:ring-deep-blue/30"
            aria-label={mobileDrawerOpen ? 'Cerrar Menú' : 'Abrir Menú'}
            aria-expanded={mobileDrawerOpen}
            aria-controls="mobile-menu"
          >
            <Icon name={mobileDrawerOpen ? 'x' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Drawer móvil accesible */}
      {mobileDrawerOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-50 flex flex-col bg-sand animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          <div className="flex items-center justify-between p-4 border-b border-sand-light">
            <BrandLogo variant="dark" />
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="p-2.5 rounded-xl text-deep-blue hover:bg-sand-light focus:outline-none focus:ring-2 focus:ring-deep-blue/30"
              aria-label="Cerrar Menú"
            >
              <Icon name="x" className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 px-6 py-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                Menú de Navegación
              </p>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block text-xl font-serif text-deep-blue hover:text-terracotta py-2 border-b border-sand-light/60 transition-colors"
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
                className="w-full inline-flex items-center justify-center gap-3 bg-wa-green text-white py-3.5 rounded-xl font-semibold text-sm shadow-md hover:bg-wa-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-wa-green/50"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
