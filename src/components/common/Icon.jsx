/**
 * Componente de Iconos SVG vectoriales optimizados
 * Incluye los íconos oficiales del flyer: Concha Marina, Tradición Wayúu, Olas del Mar, Hecho con el Alma
 */
export const Icon = ({ name, className = 'w-5 h-5', ...props }) => {
  const icons = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
    users: <g><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></g>,
    grid: <g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    'message-circle': <g><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /></g>,
    // 🐚 Concha marina / Artesanías Únicas (Flyer Oficial)
    seashell: (
      <g>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 21V3M12 21C15 17 18 13 18 8M12 21C9 17 6 13 6 8M12 21C16 19 19 15 20 12M12 21C8 19 5 15 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ),
    // 🕸️ Tradición Wayúu / Símbolo circular ancestral (Flyer Oficial)
    'wayuu-sun': (
      <g>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3V7M12 17V21M3 12H7M17 12H21M5.64 5.64L8.46 8.46M15.54 15.54L18.36 18.36M5.64 18.36L8.46 15.54M15.54 8.46L18.36 5.64" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </g>
    ),
    // 〰️ Inspiración del Mar / Olas Triples (Flyer Oficial)
    'ocean-waves': (
      <g>
        <path d="M2 7C4 5.5 6 5.5 8 7C10 8.5 12 8.5 14 7C16 5.5 18 5.5 20 7C21 7.7 22 7.7 23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12C4 10.5 6 10.5 8 12C10 13.5 12 13.5 14 12C16 10.5 18 10.5 20 12C21 12.7 22 12.7 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 17C4 15.5 6 15.5 8 17C10 18.5 12 18.5 14 17C16 15.5 18 15.5 20 17C21 17.7 22 17.7 23 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
    // 🤍 Hecho con el Alma / Corazón Del Mar (Flyer Oficial)
    'heart-soul': (
      <path
        d="M19.5 13.5719C20.8284 12.2435 21.5 10.4578 21.5 8.5C21.5 4.91015 18.5899 2 15 2C13.0422 2 11.2565 2.67157 9.92813 4M4.5 13.5719C3.17157 12.2435 2.5 10.4578 2.5 8.5C2.5 4.91015 5.41015 2 9 2C10.9578 2 12.7435 2.67157 14.0719 4M12 21.5L4.5 13.5719M12 21.5L19.5 13.5719"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    // Gaviotas volando
    seagulls: (
      <g>
        <path d="M2 10C4 7 7 7 10 10C13 7 16 7 18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5C13.5 3 15.5 3 17.5 5C19.5 3 21.5 3 23 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ),
    // Estrella de mar
    starfish: (
      <path
        d="M12 2L14.5 9L21.5 9.5L16 14L18 21L12 17L6 21L8 14L2.5 9.5L9.5 9L12 2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    ),
    // Rombo tejido Wayúu
    diamond: (
      <path
        d="M12 2L22 12L12 22L2 12Z M12 6L18 12L12 18L6 12Z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.1"
      />
    ),
    sparkles: (
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
    ),
    heart: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    ),
    waves: (
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5.1 2 2.5 0 2.5-2 5.1-2 1.3 0 1.9.5 2.3 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5 0 2.6 2 2.6 0 5.1 0 2.5 0 2.5-2 5.1-2 1.3 0 1.9.5 2.3 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5 0 2.6 2 2.6 0 5.1 0 2.5 0 2.5-2 5.1-2 1.3 0 1.9.5 2.3 1" />
    ),
    sun: (
      <g>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </g>
    ),
    image: (
      <g>
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </g>
    ),
    x: <path d="M18 6 6 18M6 6l12 12" />,
    menu: <path d="M4 12h16M4 6h16M4 18h16" />,
    'arrow-right': <path d="M5 12h14M12 5l7 7-7 7" />,
    'chevron-left': <path d="m15 18-6-6 6-6" />,
    'chevron-right': <path d="m9 18 6-6-6-6" />,
    eye: (
      <g>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    ),
    quote: (
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 7-4 8zm11 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 7-4 8z" />
    ),
    'map-pin': (
      <g>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </g>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    )
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {icons[name] || icons.sparkles}
    </svg>
  );
};
export default Icon;
