/**
 * Logo oficial de Del Mar Artesanías
 * Fiel al flyer: sol con espiral náutilo, olas triples, tipografía script + versales con guiones
 */
export const BrandLogo = ({
  variant = 'dark',
  showSlogan = true,
  size = 'md',
  className = ''
}) => {
  const isDark = variant === 'dark';
  const navy    = isDark ? '#0A2A43' : '#FDFBF7';
  const gold    = '#E89945';
  const teal    = '#1C646D';
  const tealMid = '#3AA6B2';

  const sizes = {
    sm:  { icon: 'h-9 w-9',  brand: 'text-2xl', sub: 'text-[8px]', slogan: 'text-[10px]', gap: 'gap-2' },
    md:  { icon: 'h-11 w-11', brand: 'text-3xl', sub: 'text-[9px]', slogan: 'text-xs',    gap: 'gap-2.5' },
    lg:  { icon: 'h-14 w-14', brand: 'text-4xl', sub: 'text-[10px]', slogan: 'text-sm',   gap: 'gap-3' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${s.gap} select-none ${className}`}>
      {/* Isotipo: sol + espiral náutilo + olas (igual al flyer) */}
      <svg
        className={`${s.icon} flex-shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Rayos del sol */}
        <g stroke={gold} strokeWidth="3" strokeLinecap="round">
          <line x1="50" y1="6"  x2="50" y2="13" />
          <line x1="72" y1="12" x2="67" y2="18" />
          <line x1="84" y1="30" x2="77" y2="32" />
          <line x1="28" y1="12" x2="33" y2="18" />
          <line x1="16" y1="30" x2="23" y2="32" />
        </g>

        {/* Círculo solar exterior (halo) */}
        <circle cx="50" cy="32" r="20" fill={gold} opacity="0.18" />
        {/* Círculo solar principal dorado */}
        <circle cx="50" cy="32" r="15" fill={gold} />

        {/* Espiral náutilo en el centro del sol (igual al flyer) */}
        <path
          d="M50 32 C50 28, 54 26, 56 30 C58 34, 55 38, 50 38 C44 38, 40 33, 42 28 C44 22, 51 20, 57 25"
          stroke={navy}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="50" cy="32" r="2.5" fill={navy} opacity="0.6" />

        {/* Olas triples debajo del sol (igual al flyer) */}
        <path
          d="M14 56 C22 50, 30 60, 38 54 C44 50, 50 60, 58 54 C64 50, 72 58, 82 54"
          stroke={navy}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 66 C20 60, 30 70, 40 64 C48 60, 56 70, 66 64 C74 60, 82 68, 90 64"
          stroke={teal}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 76 C20 70, 32 80, 44 74 C54 70, 62 80, 72 74 C80 70, 88 76, 94 72"
          stroke={tealMid}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Bloque tipográfico */}
      <div className="flex flex-col items-start leading-none">
        {/* "Del Mar" en script grande */}
        <span
          className={`font-script font-bold ${s.brand} leading-none tracking-tight`}
          style={{ color: navy }}
        >
          Del Mar
        </span>

        {/* "— ARTESANÍAS —" con guiones */}
        <div className="flex items-center gap-1 mt-0.5">
          <span style={{ backgroundColor: gold }} className="h-px flex-1 w-3 min-w-[10px]" />
          <span
            className={`${s.sub} font-bold tracking-[0.22em] uppercase`}
            style={{ color: isDark ? teal : gold }}
          >
            Artesanías
          </span>
          <span style={{ backgroundColor: gold }} className="h-px flex-1 w-3 min-w-[10px]" />
        </div>

        {/* Slogan en script pequeño, oculto en xs */}
        {showSlogan && (
          <span
            className={`font-script ${s.slogan} mt-0.5 hidden sm:block`}
            style={{ color: gold }}
          >
            Historias que nacen junto al mar.
          </span>
        )}
      </div>
    </div>
  );
};
export default BrandLogo;
