import { useEffect } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getProductInquiryMessage } from '../../constants/whatsapp';
import { formatCurrency } from '../../utils/formatters';

export const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevenir scroll en el fondo mientras el modal está abierto
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const waMsg = getProductInquiryMessage(product);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-blue/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-sand-light bg-sand p-5 shadow-floating sm:p-8">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="button-interaction absolute right-4 top-4 z-10 rounded-full bg-sand-light p-2.5 text-deep-blue transition-colors hover:bg-deep-blue hover:text-sand focus:outline-none focus:ring-2 focus:ring-gold/50"
          aria-label="Cerrar ventana de detalle"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Imagen de la pieza */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-sand-light">
            <ImageWithFallback
              src={product.image}
              fallback={product.fallbackImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información detallada */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-teal tracking-widest uppercase">
                {product.category} • {product.tag}
              </span>
              <h3
                id="modal-product-title"
                className="font-serif font-bold text-xl sm:text-2xl text-deep-blue mt-1"
              >
                {product.name}
              </h3>
            </div>

            <p className="font-sans font-bold text-lg sm:text-xl text-terracotta">
              {formatCurrency(product.price)}
            </p>

            <p className="text-xs sm:text-sm text-deep-blue/80 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 pt-3 border-t border-sand-light text-[11px] sm:text-sm text-deep-blue/70">
              <p>
                <strong className="text-deep-blue">Técnica:</strong> {product.technique}
              </p>
              <p>
                <strong className="text-deep-blue">Origen:</strong> {product.origin}
              </p>
            </div>

            <a
              href={waMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="button-interaction mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-wa-green py-3.5 text-sm font-semibold text-deep-blue shadow-md transition-all hover:bg-wa-green-hover focus:outline-none focus:ring-2 focus:ring-wa-green/50 sm:text-base"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Solicitar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;
