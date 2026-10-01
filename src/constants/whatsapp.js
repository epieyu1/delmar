/**
 * Constantes y utilidades para la integración con WhatsApp
 * Del Mar Artesanías • Dibulla, La Guajira
 */

export const WHATSAPP_PHONE = '573218368605';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_PHONE}`;

/**
 * Genera un enlace seguro a WhatsApp con mensaje codificado
 * @param {string} message - Texto predeterminado a enviar
 * @returns {string} URL formateada
 */
export const getWhatsAppLink = (message) => {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
};

/**
 * Mensaje general para el botón principal de comprar o consultar
 */
export const getGeneralWhatsAppMessage = () => {
  return getWhatsAppLink(
    'Hola Del Mar Artesanías 🌊, me gustaría obtener información sobre sus artesanías de Dibulla.'
  );
};

/**
 * Mensaje con intención de compra directa para un producto específico
 * @param {Object} product - Objeto con datos del producto
 */
export const getProductOrderMessage = (product) => {
  const priceFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(product.price);

  return getWhatsAppLink(
    `Hola Del Mar Artesanías 🌊, deseo comprar el producto "${product.name}" (${priceFormatted}). ¿Tienen disponibilidad y cómo sería el envío?`
  );
};

/**
 * Mensaje para consultar disponibilidad o detalles de un producto
 * @param {Object} product - Objeto con datos del producto
 */
export const getProductInquiryMessage = (product) => {
  const priceFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(product.price);

  return getWhatsAppLink(
    `Hola Del Mar Artesanías 🌊, deseo consultar la disponibilidad del producto "${product.name}" (${priceFormatted}).`
  );
};

/**
 * Mensaje desde la sección de historia de la marca
 */
export const getStoryInquiryMessage = () => {
  return getWhatsAppLink(
    'Hola Del Mar Artesanías 🌊, leí la historia de la marca en la web y me gustaría información de sus artesanías.'
  );
};
