/**
 * Utilidades de formateo para la tienda
 */

/**
 * Formatea un valor numérico a moneda colombiana (COP)
 * @param {number} amount - Valor numérico
 * @returns {string} Ejemplo: "$ 220.000 COP"
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0 COP';
  return `$${amount.toLocaleString('es-CO')} COP`;
};

/**
 * Formatea una fecha o año actual para el pie de página
 */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};
