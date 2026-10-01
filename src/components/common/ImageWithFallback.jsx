import { useState, useEffect } from 'react';

/**
 * Componente de Imagen con control de fallback, lazy loading
 * y contención de desbordamiento estricta para Hostinger
 */
export const ImageWithFallback = ({
  src,
  alt = 'Artesanía Del Mar',
  fallback,
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <img
      src={hasError || !imgSrc ? fallback : imgSrc}
      alt={alt}
      loading={loading}
      className={`max-w-full block ${className}`}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallback);
        }
      }}
      {...props}
    />
  );
};
export default ImageWithFallback;
