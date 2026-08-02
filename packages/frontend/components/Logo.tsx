'use client';

// CodeOrigin.ai logo component
// Place the logo image at: public/logo.png
// This component renders the logo with proper sizing for different contexts

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 border border-amber-500/30 shadow-lg shadow-amber-500/20"
      style={{ width: size, height: size }}
    >
      {/* CC lettermark matching the CodeOrigin.ai brand */}
      <svg viewBox="0 0 32 32" fill="none" style={{ width: size * 0.65, height: size * 0.65 }}>
        {/* C shape - gold */}
        <path d="M8 8 L14 8 L14 11 L11 11 L11 21 L14 21 L14 24 L8 24 Z" fill="#1a1a1a" />
        {/* Second C with circuit dots */}
        <path d="M16 8 L22 8 L22 11 L19 11 L19 21 L22 21 L22 24 L16 24 Z" fill="#1a1a1a" />
        {/* Circuit dots */}
        <circle cx="25" cy="12" r="1.5" fill="#1a1a1a" />
        <circle cx="25" cy="16" r="1.5" fill="#1a1a1a" />
        <circle cx="25" cy="20" r="1.5" fill="#1a1a1a" />
        {/* Circuit lines */}
        <line x1="22" y1="12" x2="23.5" y2="12" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="22" y1="16" x2="23.5" y2="16" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="22" y1="20" x2="23.5" y2="20" stroke="#1a1a1a" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function LogoFull({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const iconSize = size === 'small' ? 28 : size === 'large' ? 40 : 32;
  const textClass = size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base';

  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={iconSize} />
      <div className="leading-tight">
        <span className={`font-black tracking-tight ${textClass}`}>
          <span className="text-amber-400">Code</span>
          <span className="text-white">Origin</span>
          <span className="text-amber-400">.ai</span>
        </span>
      </div>
    </div>
  );
}

export default LogoFull;
