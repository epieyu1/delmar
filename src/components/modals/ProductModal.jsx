import { useEffect, useRef, useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getProductInquiryMessage } from '../../constants/whatsapp';
import { formatCurrency } from '../../utils/formatters';

const ProductGallery = ({
  product,
  selectedImageIndex,
  onSelectImage,
  isZoomOpen,
  onOpenZoom,
  onCloseZoom,
  onPreviousImage,
  onNextImage
}) => {
  const imageButtonRef = useRef(null);
  const closeZoomButtonRef = useRef(null);
  const wasZoomOpen = useRef(false);
  const images = product.images;
  const activeImage = images[selectedImageIndex];
  const fallbackImage = images[(selectedImageIndex + 1) % images.length];

  useEffect(() => {
    if (isZoomOpen) closeZoomButtonRef.current?.focus();
    else if (wasZoomOpen.current) imageButtonRef.current?.focus();
    wasZoomOpen.current = isZoomOpen;
  }, [isZoomOpen]);

  return (
    <div>
      <button
        type="button"
        onClick={onOpenZoom}
        ref={imageButtonRef}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand-light focus:outline-none focus:ring-2 focus:ring-gold/60"
        aria-label={`Ampliar imagen ${selectedImageIndex + 1} de ${product.name}`}
      >
        <ImageWithFallback
          src={activeImage}
          fallback={fallbackImage}
          alt={`${product.name}, vista ${selectedImageIndex + 1}`}
          width="600"
          height="800"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          loading="eager"
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-deep-blue/80 px-3 py-1.5 text-xs font-medium text-sand opacity-100 shadow-sm sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          Ampliar imagen
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2" role="group" aria-label="Más imágenes del producto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onSelectImage(index)}
              aria-label={`Ver imagen ${index + 1} de ${product.name}`}
              aria-pressed={index === selectedImageIndex}
              className={`aspect-square overflow-hidden rounded-xl border-2 bg-sand-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                index === selectedImageIndex ? 'border-teal' : 'border-transparent hover:border-gold/60'
              }`}
            >
              <ImageWithFallback
                src={image}
                fallback={images[(index + 1) % images.length]}
                alt=""
                width="96"
                height="96"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-deep-blue/95 p-2 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${product.name}`}
          onKeyDown={(event) => {
            if (event.key !== 'Tab') return;
            const controls = event.currentTarget.querySelectorAll('button:not([disabled])');
            const firstControl = controls[0];
            const lastControl = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === firstControl) {
              event.preventDefault();
              lastControl.focus();
            } else if (!event.shiftKey && document.activeElement === lastControl) {
              event.preventDefault();
              firstControl.focus();
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onCloseZoom();
          }}
        >
          <button
            type="button"
            onClick={onCloseZoom}
            ref={closeZoomButtonRef}
            className="button-interaction absolute right-4 top-4 rounded-full bg-sand px-3 py-3 text-deep-blue shadow-lg focus:outline-none focus:ring-2 focus:ring-gold sm:right-6 sm:top-6"
            aria-label="Cerrar imagen ampliada"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
          {images.length > 1 && (
            <button type="button" onClick={onPreviousImage} className="button-interaction absolute left-2 rounded-full bg-sand/95 p-3 text-deep-blue shadow-lg focus:outline-none focus:ring-2 focus:ring-gold sm:left-6" aria-label="Imagen anterior">
              <Icon name="chevron-left" />
            </button>
          )}
          <ImageWithFallback
            src={activeImage}
            fallback={fallbackImage}
            alt={`${product.name}, imagen ampliada ${selectedImageIndex + 1}`}
            width="1200"
            height="1600"
            className="max-h-[86vh] max-w-[90vw] object-contain"
            loading="eager"
          />
          {images.length > 1 && (
            <button type="button" onClick={onNextImage} className="button-interaction absolute right-2 rounded-full bg-sand/95 p-3 text-deep-blue shadow-lg focus:outline-none focus:ring-2 focus:ring-gold sm:right-6" aria-label="Imagen siguiente">
              <Icon name="chevron-right" />
            </button>
          )}
          <span className="absolute bottom-4 rounded-full bg-deep-blue/80 px-4 py-2 text-sm font-medium text-sand" aria-live="polite">
            {selectedImageIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

export const ProductModal = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomOpen) setIsZoomOpen(false);
        else onClose();
      }

      if (isZoomOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        setSelectedImageIndex((index) => (index + direction + product.images.length) % product.images.length);
      }
    };

    // Prevenir scroll en el fondo mientras el modal está abierto
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose, isZoomOpen]);

  useEffect(() => {
    setSelectedImageIndex(0);
    setIsZoomOpen(false);
  }, [product?.id]);

  if (!product) return null;

  const waMsg = getProductInquiryMessage(product);
  const productDetails = product.details ?? [
    { label: 'Técnica', value: product.technique },
    { label: 'Origen', value: product.origin }
  ].filter(({ value }) => value);

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

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <ProductGallery
            key={product.id}
            product={product}
            selectedImageIndex={selectedImageIndex}
            onSelectImage={setSelectedImageIndex}
            isZoomOpen={isZoomOpen}
            onOpenZoom={() => setIsZoomOpen(true)}
            onCloseZoom={() => setIsZoomOpen(false)}
            onPreviousImage={() => setSelectedImageIndex((index) => (index - 1 + product.images.length) % product.images.length)}
            onNextImage={() => setSelectedImageIndex((index) => (index + 1) % product.images.length)}
          />

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

            {productDetails.length > 0 && (
              <div className="space-y-2 border-t border-sand-light pt-3 text-[11px] text-deep-blue/70 sm:text-sm">
                {productDetails.map(({ label, value }) => (
                  <p key={label}>
                    <strong className="text-deep-blue">{label}:</strong> {value}
                  </p>
                ))}
              </div>
            )}

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
