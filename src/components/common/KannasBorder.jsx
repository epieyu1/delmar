/**
 * Cenefa decorativa Wayúu Kannas
 * Idéntica a la franja geométrica azul-teal + dorado del flyer oficial
 * El patrón alterna rombos, chevrones y puntos como en el tejido real
 */
export const KannasBorder = ({ className = 'w-full h-5 sm:h-6', flipped = false }) => {
  return (
    <div
      className={`overflow-hidden select-none flex-shrink-0 ${className}`}
      aria-hidden="true"
      style={flipped ? { transform: 'scaleY(-1)' } : {}}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Patrón base: rombo geométrico Wayúu en navy + gold */}
          <pattern id="kannas-main" x="0" y="0" width="40" height="24" patternUnits="userSpaceOnUse">
            {/* Fondo azul marino */}
            <rect width="40" height="24" fill="#0A2A43" />

            {/* Línea dorada superior */}
            <line x1="0" y1="2.5" x2="40" y2="2.5" stroke="#E89945" strokeWidth="1.5" />
            {/* Línea dorada inferior */}
            <line x1="0" y1="21.5" x2="40" y2="21.5" stroke="#E89945" strokeWidth="1.5" />

            {/* Rombo grande teal */}
            <polygon points="20,4 36,12 20,20 4,12" fill="#1C646D" />
            {/* Rombo interior dorado */}
            <polygon points="20,7 30,12 20,17 10,12" fill="#E89945" />
            {/* Rombo interior pequeño navy */}
            <polygon points="20,9.5 26,12 20,14.5 14,12" fill="#0A2A43" />
            {/* Punto central dorado */}
            <circle cx="20" cy="12" r="1.8" fill="#E89945" />

            {/* Acentos de esquinas (chevrones) */}
            <path d="M0 7 L4 12 L0 17" fill="none" stroke="#3AA6B2" strokeWidth="1.5" />
            <path d="M40 7 L36 12 L40 17" fill="none" stroke="#3AA6B2" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="400" height="24" fill="url(#kannas-main)" />
      </svg>
    </div>
  );
};
export default KannasBorder;
