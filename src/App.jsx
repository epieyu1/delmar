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
    <div className="app-shell">
      <Navbar />
      <main className="site-main">
        <HeroCarousel onSelectProduct={setSelectedProduct} />
        <CraftPillars />
        <Catalog productsList={productsList} onSelectProduct={setSelectedProduct} />
        <BrandStory />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default App;
