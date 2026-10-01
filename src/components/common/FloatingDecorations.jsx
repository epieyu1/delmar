/**
 * FloatingDecorations — Elementos decorativos flotantes SVG
 * Sombrero, conchas y piezas de mochila que aparecen en los bordes de las secciones
 * Basados en los props/accesorios visibles en el flyer oficial
 */

/** Sombrero Wayúu/Playero de ala ancha en SVG */
export const SombreroSVG = ({ className = 'w-24 h-16', color = '#E89945', ...props }) => (
  <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-hidden="true" {...props}>
    {/* Ala del sombrero */}
    <ellipse cx="60" cy="52" rx="56" ry="14" fill={color} opacity="0.9" />
    <ellipse cx="60" cy="52" rx="56" ry="14" fill="none" stroke="#99482F" strokeWidth="1.5" />

    {/* Copa del sombrero */}
    <path d="M22 52 C22 52, 28 18, 60 18 C92 18, 98 52, 98 52 Z" fill={color} />
    <path d="M22 52 C22 52, 28 18, 60 18 C92 18, 98 52, 98 52" fill="none" stroke="#99482F" strokeWidth="1.5" />

    {/* Cinta del sombrero (banda tejida Wayúu en teal) */}
    <path d="M28 48 C44 44, 76 44, 92 48" stroke="#1C646D" strokeWidth="4" strokeLinecap="round" />
    <path d="M30 50 C46 46, 74 46, 90 50" stroke="#3AA6B2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

    {/* Patrón tejido en la copa */}
    <path d="M42 35 L60 22 L78 35" stroke="#99482F" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="3 2" />
    <path d="M36 42 L60 26 L84 42" stroke="#99482F" strokeWidth="1.2" fill="none" opacity="0.4" strokeDasharray="3 2" />
  </svg>
);

/** Concha marina en SVG */
export const ConchaSVG = ({ className = 'w-12 h-12', color = '#E89945', ...props }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-hidden="true" {...props}>
    {/* Espiral principal de la concha */}
    <circle cx="30" cy="30" r="24" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
    <circle cx="30" cy="30" r="17" fill={color} opacity="0.25" />
    <circle cx="30" cy="30" r="10" fill={color} opacity="0.4" />
    <circle cx="30" cy="30" r="4"  fill={color} opacity="0.8" />

    {/* Líneas radiales de la concha */}
    {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x2 = 30 + 22 * Math.cos(rad);
      const y2 = 30 + 22 * Math.sin(rad);
      return (
        <line key={i} x1="30" y1="30" x2={x2.toFixed(1)} y2={y2.toFixed(1)}
          stroke={color} strokeWidth="1" opacity="0.5" />
      );
    })}

    {/* Espiral interna */}
    <path
      d="M30 30 C33 27, 38 28, 39 32 C40 37, 36 41, 30 40 C23 39, 19 33, 21 27 C23 20, 31 18, 38 23"
      stroke="#99482F" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"
    />
  </svg>
);

/** Mochila Wayúu pequeña (fragmento/detalle) en SVG */
export const MochilaSVG = ({ className = 'w-14 h-16', ...props }) => (
  <svg viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-hidden="true" {...props}>
    {/* Cuerpo */}
    <path d="M10 20 C10 10, 60 10, 60 20 L65 55 C65 68, 5 68, 5 55 Z" fill="#99482F" />
    <path d="M10 20 C10 10, 60 10, 60 20 L65 55 C65 68, 5 68, 5 55 Z"
      fill="none" stroke="#0A2A43" strokeWidth="2" />

    {/* Rombo central dorado (motivo Kannas) */}
    <polygon points="35,20 55,38 35,56 15,38" fill="#E89945" />
    <polygon points="35,26 49,38 35,50 21,38" fill="#99482F" />
    <polygon points="35,31 44,38 35,45 26,38" fill="#FDFBF7" />
    <circle cx="35" cy="38" r="3" fill="#E89945" />

    {/* Borlas */}
    <line x1="52" y1="55" x2="58" y2="70" stroke="#E89945" strokeWidth="3" strokeLinecap="round" />
    <line x1="55" y1="55" x2="63" y2="68" stroke="#1C646D" strokeWidth="3" strokeLinecap="round" />
    <circle cx="58" cy="71" r="3" fill="#E89945" />
    <circle cx="63" cy="69" r="2.5" fill="#1C646D" />

    {/* Tira superior */}
    <path d="M22 10 C22 4, 48 4, 48 10" stroke="#0A2A43" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

/** Hoja de palma seca decorativa */
export const PalmaSVG = ({ className = 'w-16 h-20', ...props }) => (
  <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={className} aria-hidden="true" {...props}>
    <path d="M30 75 C30 75, 15 45, 8 25 C4 12, 10 8, 18 18 C26 28, 30 45, 30 75Z"
      fill="#C8A87A" opacity="0.7" />
    <path d="M30 75 C30 75, 45 45, 52 25 C56 12, 50 8, 42 18 C34 28, 30 45, 30 75Z"
      fill="#B8965A" opacity="0.7" />
    <path d="M30 10 L30 75" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
    {/* Venas de la hoja */}
    {[20, 30, 40, 50, 60].map((y, i) => (
      <g key={i}>
        <line x1="30" y1={y} x2={30 - (75-y)*0.5} y2={y - 5} stroke="#8B6914" strokeWidth="0.8" opacity="0.5" />
        <line x1="30" y1={y} x2={30 + (75-y)*0.5} y2={y - 5} stroke="#8B6914" strokeWidth="0.8" opacity="0.5" />
      </g>
    ))}
  </svg>
);

/**
 * Contenedor de decoraciones flotantes para las esquinas de sección
 * position: 'left' | 'right' | 'both'
 */
export const SectionDecorations = ({ position = 'both', variant = 'default', className = '' }) => {
  const leftDecos = {
    default: (
      <>
        <div className="absolute -left-6 top-8 opacity-30 pointer-events-none block rotate-[-15deg] scale-50 sm:scale-100 origin-left">
          <MochilaSVG className="w-20 h-24" />
        </div>
        <div className="absolute left-2 bottom-12 opacity-30 pointer-events-none block rotate-12 scale-50 sm:scale-100 origin-left">
          <ConchaSVG className="w-12 h-12" color="#1C646D" />
        </div>
      </>
    ),
    hero: (
      <div className="absolute left-0 bottom-0 opacity-30 pointer-events-none block scale-50 sm:scale-100 origin-left">
        <MochilaSVG className="w-24 h-28" />
      </div>
    ),
    catalog: (
      <div className="absolute -left-4 top-16 opacity-30 pointer-events-none block rotate-[-20deg] scale-50 sm:scale-100 origin-left">
        <ConchaSVG className="w-16 h-16" color="#99482F" />
      </div>
    )
  };

  const rightDecos = {
    default: (
      <>
        <div className="absolute -right-4 top-6 opacity-30 pointer-events-none block rotate-[20deg] scale-50 sm:scale-100 origin-right">
          <SombreroSVG className="w-28 h-20" />
        </div>
        <div className="absolute right-4 bottom-8 opacity-30 pointer-events-none block rotate-[-10deg] scale-50 sm:scale-100 origin-right">
          <ConchaSVG className="w-10 h-10" color="#E89945" />
        </div>
      </>
    ),
    hero: (
      <div className="absolute right-2 bottom-6 opacity-30 pointer-events-none block rotate-12 scale-50 sm:scale-100 origin-right">
        <ConchaSVG className="w-14 h-14" color="#E89945" />
      </div>
    ),
    catalog: (
      <>
        <div className="absolute -right-6 top-8 opacity-30 pointer-events-none block rotate-[15deg] scale-50 sm:scale-100 origin-right">
          <SombreroSVG className="w-32 h-22" />
        </div>
        <div className="absolute right-2 bottom-20 opacity-30 pointer-events-none block scale-50 sm:scale-100 origin-right">
          <PalmaSVG className="w-14 h-18" />
        </div>
      </>
    )
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {(position === 'left' || position === 'both') && (leftDecos[variant] || leftDecos.default)}
      {(position === 'right' || position === 'both') && (rightDecos[variant] || rightDecos.default)}
    </div>
  );
};

export default SectionDecorations;
