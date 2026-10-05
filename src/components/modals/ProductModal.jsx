import { useEffect, useRef, useState } from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import Icon from '../common/Icon';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getProductInquiryMessage } from '../../constants/whatsapp';
import { formatCurrency } from '../../utils/formatters';

const ProductGallery = ({ product, selectedImageIndex, onSelectImage, isZoomOpen, onOpenZoom, onCloseZoom, onPreviousImage, onNextImage }) => {
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
    <div className="product-gallery">
      <button
        type="button"
        onClick={onOpenZoom}
        ref={imageButtonRef}
        className="product-gallery__main"
        aria-label={'Ampliar imagen ' + (selectedImageIndex + 1) + ' de ' + product.name}
      >
        <ImageWithFallback
          src={activeImage}
          fallback={fallbackImage}
          alt={product.name + ', vista ' + (selectedImageIndex + 1)}
          width="600"
          height="800"
          className="product-gallery__image"
          loading="eager"
        />
        <span className="product-gallery__hint">Ampliar imagen</span>
      </button>

      {images.length > 1 && (
        <div className="product-gallery__thumbs" role="group" aria-label="Más imágenes del producto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onSelectImage(index)}
              aria-label={'Ver imagen ' + (index + 1) + ' de ' + product.name}
              aria-pressed={index === selectedImageIndex}
              className={index === selectedImageIndex ? 'product-gallery__thumb is-active' : 'product-gallery__thumb'}
            >
              <ImageWithFallback src={image} fallback={images[(index + 1) % images.length]} alt="" width="96" height="96" />
            </button>
          ))}
        </div>
      )}

      {isZoomOpen && (
        <div
          className="photo-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={'Imagen ampliada de ' + product.name}
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
          onClick={(event) => { if (event.target === event.currentTarget) onCloseZoom(); }}
        >
          <button type="button" onClick={onCloseZoom} ref={closeZoomButtonRef} className="photo-zoom__close" aria-label="Cerrar imagen ampliada">
            <Icon name="x" className="icon-20" />
          </button>
          {images.length > 1 && (
            <button type="button" onClick={onPreviousImage} className="photo-zoom__previous" aria-label="Imagen anterior">
              <Icon name="chevron-left" className="icon-20" />
            </button>
          )}
          <ImageWithFallback
            src={activeImage}
            fallback={fallbackImage}
            alt={product.name + ', imagen ampliada ' + (selectedImageIndex + 1)}
            width="1200"
            height="1600"
            className="photo-zoom__image"
            loading="eager"
          />
          {images.length > 1 && (
            <button type="button" onClick={onNextImage} className="photo-zoom__next" aria-label="Imagen siguiente">
              <Icon name="chevron-right" className="icon-20" />
            </button>
          )}
          <span className="photo-zoom__count" aria-live="polite">{selectedImageIndex + 1} / {images.length}</span>
        </div>
      )}
    </div>
  );
};

export const ProductModal = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (!product) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isZoomOpen) setIsZoomOpen(false);
        else onClose();
      }
      if (isZoomOpen && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        setSelectedImageIndex((index) => (index + direction + product.images.length) % product.images.length);
      }
    };
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
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="product-modal">
        <button type="button" onClick={onClose} className="modal-close" aria-label="Cerrar ventana de detalle">
          <Icon name="x" className="icon-20" />
        </button>
        <div className="product-modal__layout">
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
          <div className="product-modal__details">
            <span className="eyebrow">{product.category} · {product.tag}</span>
            <h2 id="modal-product-title">{product.name}</h2>
            <p className="product-modal__price">{formatCurrency(product.price)}</p>
            <p className="product-modal__description">{product.description}</p>
            {productDetails.length > 0 && (
              <div className="product-modal__facts">
                {productDetails.map(({ label, value }) => (
                  <p key={label}><strong>{label}:</strong> {value}</p>
                ))}
              </div>
            )}
            <a href={waMsg} target="_blank" rel="noopener noreferrer" className="button button--whatsapp product-modal__order">
              <WhatsAppIcon className="icon-18" /><span>Solicitar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
