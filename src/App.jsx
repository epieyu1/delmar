import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import HeroCarousel from './components/sections/HeroCarousel';
import CraftPillars from './components/sections/CraftPillars';
import Catalog from './components/sections/Catalog';
import BrandStory from './components/sections/BrandStory';
import Footer from './components/layout/Footer';
import ProductModal from './components/modals/ProductModal';
import { INITIAL_PRODUCTS } from './data/products';

export const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList] = useState(INITIAL_PRODUCTS);

  return (
    <div className="min-h-screen flex flex-col bg-sand text-deep-blue antialiased selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="flex-1">
        <HeroCarousel />
        <CraftPillars />
        <Catalog
          productsList={productsList}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />
        <BrandStory />
      </main>

      <Footer />

      {/* Modal de Detalle de Producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default App;
