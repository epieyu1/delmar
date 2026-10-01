/**
 * Catálogo inicial de productos artesanales
 * Del Mar Artesanías • Dibulla, La Guajira
 */

export const CATEGORIES = [
  'Todos',
  'Mochilas',
  'Ropa y Tejidos',
  'Sombreros y Gorros',
  'Mantas y Vestidos',
  'Souvenirs'
];

export const INITIAL_PRODUCTS = [
  {
    id: 'top-crochet-marron',
    name: 'Top Crochet Tonos Tierra',
    category: 'Ropa y Tejidos',
    price: 85000,
    tag: 'Nuevo',
    image: '/top-crochet-marron.jpg',
    fallbackImage: '/fundadora.jpg',
    shortDesc: 'Top tejido a mano en crochet con patrón de rombos en tonos café y beige.',
    description: 'Hermoso top tejido artesanalmente con detalles de red en el abdomen. Sus tonos tierra evocan la arena y la calidez de La Guajira.',
    technique: 'Tejido a crochet hecho a mano',
    origin: 'Taller Del Mar • Dibulla'
  },
  {
    id: 'top-crochet-lila',
    name: 'Top Crochet Lila',
    category: 'Ropa y Tejidos',
    price: 80000,
    tag: 'Nuevo',
    image: '/top-crochet-lila.jpg',
    fallbackImage: '/fundadora.jpg',
    shortDesc: 'Delicado top lila tejido a crochet con detalle de red cruzada.',
    description: 'Top ligero y fresco con un hermoso color lila. Su diseño cuenta con un tejido tupido en el busto y una red estilizada en el abdomen.',
    technique: 'Tejido a crochet hecho a mano',
    origin: 'Taller Del Mar • Dibulla'
  },
  {
    id: 'conjunto-crochet-verde',
    name: 'Conjunto Crochet Verde con Flores',
    category: 'Ropa y Tejidos',
    price: 150000,
    tag: 'Exclusivo',
    image: '/conjunto-crochet-verde.jpg',
    fallbackImage: '/fundadora.jpg',
    shortDesc: 'Conjunto de dos piezas verde con aplicaciones de flores tejidas.',
    description: 'Conjunto de playa conformado por top y parte inferior tejida. Destaca por sus coloridas aplicaciones de margaritas y ajuste cómodo.',
    technique: 'Tejido a crochet con apliques',
    origin: 'Taller Del Mar • Dibulla'
  },
  {
    id: 'mochila-perlas-negra',
    name: 'Mochila Negra con Perlas',
    category: 'Mochilas',
    price: 180000,
    tag: 'Elegante',
    image: '/mochila-perlas-negra.jpg',
    fallbackImage: '/fundadora.jpg',
    shortDesc: 'Elegante mochila tejida negra adornada con perlas grandes.',
    description: 'Mochila sofisticada y versátil. Tejida cuidadosamente en hilo negro y decorada con hermosas perlas negras que le dan un toque único y elegante.',
    technique: 'Tejido tradicional con aplicación de pedrería',
    origin: 'Dibulla • La Guajira'
  },
  {
    id: 'top-crochet-blanco',
    name: 'Top Crochet Blanco Tiras',
    category: 'Ropa y Tejidos',
    price: 85000,
    tag: 'Nuevo',
    image: '/top-crochet-blanco.jpg',
    fallbackImage: '/fundadora.jpg',
    shortDesc: 'Top blanco tejido con detalles de cintas horizontales en el abdomen.',
    description: 'Un top tejido fresco e ideal para clima cálido. Su diseño innovador incluye finas tiras tejidas que envuelvan el abdomen de forma elegante.',
    technique: 'Tejido a crochet hecho a mano',
    origin: 'Taller Del Mar • Dibulla'
  },
  {
    id: 'sombrero-playero-devida',
    name: 'Sombrero Playero Wayúu "De Vida"',
    category: 'Sombreros y Gorros',
    price: 110000,
    tag: 'Colección Fundadora',
    image: '/fundadora.jpg',
    fallbackImage: '/fundadora-salinas.jpg',
    shortDesc: 'Sombrero de ala ancha tejido en fibra de palma natural con detalle personalizado.',
    description: 'El sombrero que acompaña a nuestra fundadora en los paisajes de sal y mar de Dibulla. Fresco, ligero y diseñado para protegerte del sol caribeño con autenticidad y gracia.',
    technique: 'Trenzado manual en palma de mawisa y bordado artesanal',
    origin: 'Dibulla • La Guajira'
  }
];
export default INITIAL_PRODUCTS;
