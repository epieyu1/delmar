import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import MobileHeader from './components/layout/MobileHeader';
import MenuDrawer from './components/layout/MenuDrawer';
import HomeScreen from './components/sections/HomeScreen';
import DiscoverScreen from './components/sections/DiscoverScreen';
import ShopScreen from './components/sections/ShopScreen';
import CommunityScreen from './components/sections/CommunityScreen';
import ProfileScreen from './components/sections/ProfileScreen';
import ProductModal from './components/modals/ProductModal';
import { useProducts } from './hooks/useProducts';

// El panel y el SDK de Supabase viven en un trozo aparte: la tienda no los descarga.
const AdminApp = lazy(() => import('./admin/AdminApp'));

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'artesania', label: 'Artesanía' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'historia', label: 'Historia' },
  { id: 'contacto', label: 'Contacto' }
];

const HOME_SECTIONS = SECTIONS.filter(({ id }) => id !== 'catalogo');

export const App = () => {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [pendingSection, setPendingSection] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [catalogVersion, setCatalogVersion] = useState(0);
  const { products: productsList } = useProducts(catalogVersion);
  const [hash, setHash] = useState(() => window.location.hash);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash);
      // Al salir del panel el catálogo se vuelve a pedir: lo editado aparece al instante.
      setCatalogVersion((value) => value + 1);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return undefined;
    root.scrollTo({ top: 0 });

    if (view !== 'home' || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    HOME_SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (view !== 'home' || !pendingSection) return;
    document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPendingSection(null);
  }, [view, pendingSection]);

  const openCatalog = useCallback(() => {
    setIsMenuOpen(false);
    setActiveSection('catalogo');
    setView('catalog');
  }, []);

  const navigateToSection = useCallback((id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    if (id === 'catalogo') {
      setView('catalog');
      return;
    }
    setView('home');
    setPendingSection(id);
  }, []);

  const goHome = useCallback(() => {
    setActiveSection('inicio');
    setView('home');
    setPendingSection('inicio');
  }, []);

  // El panel vive en #/admin y se sirve sin el armazón de la tienda.
  if (hash.startsWith('#/admin')) {
    return (
      <Suspense fallback={<div className="admin-shell admin-shell--center"><p className="admin-muted">Abriendo el panel…</p></div>}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <div className="app-viewport">
      <div className="mobile-app-surface">
        <MobileHeader
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />

        <main
          className={`mobile-scroll-container${isMenuOpen ? ' is-locked' : ''}`}
          ref={scrollContainerRef}
        >
          {view === 'catalog' ? (
            <ShopScreen
              productsList={productsList}
              onSelectProduct={setSelectedProduct}
              onBack={goHome}
            />
          ) : (
            <>
              <HomeScreen productsList={productsList} onNavigate={navigateToSection} />
              <DiscoverScreen
                productsList={productsList}
                onSelectProduct={setSelectedProduct}
                onOpenCatalog={openCatalog}
              />
              <CommunityScreen />
              <ProfileScreen />
            </>
          )}
        </main>

        <MenuDrawer
          isOpen={isMenuOpen}
          sections={SECTIONS}
          activeSection={activeSection}
          onNavigate={navigateToSection}
          onClose={() => setIsMenuOpen(false)}
        />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
