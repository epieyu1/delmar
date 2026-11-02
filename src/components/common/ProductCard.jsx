import ImageWithFallback from './ImageWithFallback';
import WhatsAppIcon from './WhatsAppIcon';
import { formatCurrency } from '../../utils/formatters';
import { getProductOrderMessage } from '../../constants/whatsapp';

export const ProductCard = ({ product, onSelect, eager = false }) => {
  const orderMessage = getProductOrderMessage(product);

  return (
    <article className="product-tile-card">
      <div className="product-tile-panel">
        <button
          type="button"
          className="product-tile-media"
          onClick={() => onSelect(product)}
          aria-label={`Ver detalles de ${product.name}`}
        >
          <ImageWithFallback
            src={product.images[0]}
            fallback={product.images[1] ?? product.images[0]}
            alt={product.name}
            className="product-tile-image"
            width="320"
            height="300"
            loading={eager ? 'eager' : 'lazy'}
          />
        </button>

        <div className="product-tile-meta">
          <span className="product-tile-title">{product.cardName ?? product.name}</span>
          <span className="product-tile-price">{formatCurrency(product.price)}</span>
        </div>
      </div>

      <div className="product-tile-footer">
        <a
          href={orderMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="product-tile-order"
          aria-label={`Pedir ${product.name} por WhatsApp`}
        >
          <WhatsAppIcon className="icon-12" />
          <span>Pedir</span>
        </a>
      </div>
    </article>
  );
};

export default ProductCard;
