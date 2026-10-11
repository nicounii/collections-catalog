/* eslint-disable react/no-unknown-property */
import { useId } from 'react';
// Engraved catalog-plate art. Self-contained line illustrations so every lot
// reads as a deliberate exhibition plate — no remote imagery required.
// Each glyph sits inside a generated comic-style scene (halftone fields,
// burst rays, spotlights, wind streaks) so every illustrated lot renders as
// a full, image-like composition rather than a bare icon.

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
};

const faint = { ...s, strokeWidth: 1.1, opacity: 0.45 };

const glyphs = {
  urn: (
    <g {...s}>
      <path d="M72 58h56" />
      <path d="M80 58c-4 0-6-2-6-6v-8h52v8c0 4-2 6-6 6" />
      <path d="M74 58c-12 26-14 62 6 84 3 3 6 8 6 12h28c0-4 3-9 6-12 20-22 18-58 6-84" />
      <path d="M74 128c17 8 35 8 52 0" {...faint} />
      <path d="M86 92c0 6 28 6 28 0" {...faint} />
      <path d="M72 58c-14 8-16 30-4 40M128 58c14 8 16 30 4 40" />
      <path d="M78 156h44" />
    </g>
  ),
  clock: (
    <g {...s}>
      <path d="M86 44c6-8 22-8 28 0" />
      <path d="M66 62h68v88H66z" />
      <circle cx="100" cy="108" r="30" />
      <circle cx="100" cy="108" r="3.2" fill="currentColor" stroke="none" />
      <path d="M100 108V90M100 108l14 8" strokeWidth="2.4" />
      <path d="M74 62v88M126 62v88" strokeWidth="1" opacity="0.35" />
      <path d="M78 150h44M84 150l-4 12M116 150l4 12" />
      <path d="M76 74h48" {...faint} />
    </g>
  ),
  lamp: (
    <g {...s}>
      <path d="M78 60h44l-8 38H86z" />
      <path d="M84 60c0-6 32-6 32 0" />
      <path d="M100 98v34" />
      <path d="M66 150c0-11 15-18 34-18s34 7 34 18-15 18-34 18-34-7-34-18z" />
      <path d="M72 132c8-5 48-5 56 0" {...faint} />
      <path d="M62 150h76" {...faint} />
    </g>
  ),
  mirror: (
    <g {...s}>
      <path d="M62 152V96c0-26 17-44 38-44s38 18 38 44v56" />
      <path d="M72 152V97c0-21 13-36 28-36s28 15 28 36v55" {...faint} />
      <path d="M100 52c8-6 16 0 14 8" />
      <path d="M90 44c4-6 16-6 20 0" {...faint} />
      <path d="M58 152h84" />
      <path d="M70 162l-6 10M130 162l6 10" />
    </g>
  ),
  chair: (
    <g {...s}>
      <path d="M76 150V74c0-18 12-30 24-30s24 12 24 30v76" />
      <path d="M76 96c8-8 40-8 48 0" {...faint} />
      <path d="M100 44v106" strokeWidth="1.1" opacity="0.5" />
      <path d="M88 48v102M100 48v102M112 48v102" {...faint} />
      <ellipse cx="100" cy="150" rx="50" ry="13" />
      <path d="M62 152l-8 20M138 152l8 20M78 154l-4 22M122 154l4 22" />
    </g>
  ),
  teapot: (
    <g {...s}>
      <path d="M100 84c24 0 42 17 42 40s-18 40-42 40-42-17-42-40 18-40 42-40z" />
      <path d="M88 84h24l-3-12h-18z" />
      <path d="M95 68c4-6 14-6 18 0" />
      <path d="M58 116c-10 2-14 12-8 20" />
      <path d="M142 116c10 2 14 12 8 20" />
      <path d="M64 138c6 18 56 18 72 0" {...faint} />
    </g>
  ),
  candelabra: (
    <g {...s}>
      <ellipse cx="100" cy="172" rx="34" ry="9" />
      <path d="M100 128v44" />
      <path d="M100 128c-26 0-40-14-40-30M100 128c26 0 40-14 40-30M100 128v-34" />
      <g>
        <path d="M60 98v-12M80 84v-12M100 94v-12M120 84v-12M140 98v-12" />
        <path d="M56 98h8M76 84h8M96 94h8M116 84h8M136 98h8" />
        <path d="M60 74c3 3 3 8 0 10-3-2-3-7 0-10M100 70c3 3 3 8 0 10-3-2-3-7 0-10M140 74c3 3 3 8 0 10-3-2-3-7 0-10" {...faint} />
      </g>
      <path d="M118 150h-36l-6-10 6-10h36" {...faint} />
    </g>
  ),
  globe: (
    <g {...s}>
      <circle cx="100" cy="92" r="46" />
      <ellipse cx="100" cy="92" rx="18" ry="46" {...faint} />
      <path d="M54 92h92M58 72h84M58 112h84" {...faint} />
      <path d="M74 66c10-6 22 2 18 12-4 10-20 10-24 0M112 108c8-4 18 2 14 12" {...faint} />
      <path d="M100 138v14" />
      <path d="M72 166c0-8 12-14 28-14s28 6 28 14" />
      <path d="M64 168h72" />
    </g>
  ),
  gramophone: (
    <g {...s}>
      <path d="M96 118l34-56c4-6 12-6 16 0l-30 58" />
      <path d="M110 62h36c8 0 12 8 6 13l-30 24" {...faint} />
      <path d="M70 118h56v40H70z" />
      <path d="M78 130h40M78 140h40M78 150h40" {...faint} />
      <path d="M84 118c0-6 28-6 28 0" />
      <circle cx="86" cy="138" r="4.5" fill="currentColor" stroke="none" />
      <path d="M126 138l10 4" />
    </g>
  ),
  camera: (
    <g {...s}>
      <path d="M58 78h84v64H58z" />
      <path d="M58 78v64M142 78v64" strokeWidth="1" opacity="0.3" />
      <path d="M74 78c4-10 48-10 52 0" />
      <circle cx="100" cy="110" r="20" />
      <circle cx="100" cy="110" r="8" {...faint} />
      <path d="M58 92h16v50H58z" {...faint} />
      <path d="M126 96h12v28h-12z" {...faint} />
    </g>
  ),
  charger: (
    <g {...s}>
      <circle cx="100" cy="104" r="56" />
      <circle cx="100" cy="104" r="42" {...faint} />
      <circle cx="100" cy="104" r="18" />
      <path d="M60 76h80M60 132h80" {...faint} />
      <path d="M92 96c4-6 12-6 16 0 2 6-2 10-8 12-6-2-10-6-8-12z" {...faint} />
      <path d="M100 108v10M92 118h16" {...faint} />
    </g>
  ),
  blanket: (
    <g {...s}>
      <path d="M60 62h36l8 6 8-6h28v78H60z" {...faint} />
      <path d="M62 64h74v72" />
      <path d="M66 74h68M66 86h68M66 118h68" {...faint} />
      <path d="M62 92h74" strokeWidth="3" />
      <path d="M64 136v12M74 136v12M84 136v12M94 136v12M104 136v12M114 136v12M124 136v12M134 136v12" {...faint} />
    </g>
  ),
  bust: (
    <g {...s}>
      <path d="M100 60c12 0 21 9 21 21s-9 22-21 22-21-10-21-22 9-21 21-21z" />
      <path d="M88 96c-3 6-8 9-16 11-12 3-18 9-18 17v8h92v-8c0-8-6-14-18-17-8-2-13-5-16-11" />
      <path d="M94 92c4 4 8 4 12 0" {...faint} />
      <path d="M100 52c8-2 14 3 14 10" {...faint} />
      <path d="M74 132h52v20H74z" />
      <path d="M70 152h60v14H70z" />
    </g>
  ),
  decanter: (
    <g {...s}>
      <path d="M88 78h24v10l8 12c6 10 6 26 0 36-4 7-12 10-20 10s-16-3-20-10c-6-10-6-26 0-36l8-12z" />
      <path d="M92 62h16l-4-14h-8z" fill="currentColor" stroke="none" opacity="0.85" />
      <path d="M92 62l4 16h8l4-16" />
      <path d="M84 122c10 6 22 6 32 0" {...faint} />
      <path d="M134 96h14v58h-14z" {...faint} />
      <path d="M134 96c0-4 14-4 14 0" {...faint} />
    </g>
  ),
  longcase: (
    <g {...s}>
      <path d="M74 44h52v124H74z" />
      <path d="M68 44h64v34H68z" />
      <path d="M100 44v-8" />
      <circle cx="100" cy="84" r="16" />
      <path d="M100 84V74M100 84l8 5" strokeWidth="1.6" />
      <path d="M100 34h0" />
      <path d="M80 44v124M120 44v124" strokeWidth="1" opacity="0.3" />
      <path d="M74 118h52" />
      <path d="M90 118v50M110 118v50" {...faint} />
      <path d="M70 168h60v12H70z" />
    </g>
  ),
  frame: (
    <g {...s}>
      <path d="M56 56h88v96H56z" strokeWidth="3" />
      <path d="M66 66h68v76H66z" {...faint} />
      <path d="M56 56c-4 0-6 2-6 6v6h8zM144 56c4 0 6 2 6 6v6h-8zM56 152c-4 0-6-2-6-6v-6h8zM144 152c4 0 6-2 6-6v-6h-8z" />
      <path d="M100 122V84" />
      <path d="M100 96c-8-2-14-8-14-16 8 0 14 4 14 12M100 108c8-2 14-8 14-16-8 0-14 4-14 12" {...faint} />
      <path d="M100 84c6-2 10-8 8-14-6 0-10 4-8 10" {...faint} />
    </g>
  ),
  // --- superhero-memorabilia glyphs -------------------------------
  comic: (
    <g {...s}>
      <path d="M54 54h92v92H54z" />
      <path d="M100 54v92M54 100h92" />
      <path d="M62 62h30v30H62z" {...faint} />
      <path d="M108 62h30v30h-30z" {...faint} />
      <path d="M62 108h30v30H62z" {...faint} />
      <path d="M108 108h30v30h-30z" {...faint} />
    </g>
  ),
  figure: (
    <g {...s}>
      <circle cx="100" cy="54" r="13" />
      <path d="M100 67v54" />
      <path d="M100 82l-28-12M100 82l28-12" />
      <path d="M100 121l-20 40M100 121l20 40" />
      <path d="M88 161h-13M112 161h13" {...faint} />
      <path d="M100 84v34" {...faint} />
    </g>
  ),
  mask: (
    <g {...s}>
      <path d="M50 92c20-16 80-16 100 0 0 22-18 38-50 38s-50-16-50-38z" />
      <ellipse cx="78" cy="100" rx="13" ry="9" {...faint} />
      <ellipse cx="122" cy="100" rx="13" ry="9" {...faint} />
    </g>
  ),
  shield: (
    <g {...s}>
      <circle cx="100" cy="100" r="46" />
      <circle cx="100" cy="100" r="37" {...faint} />
      <path d="M100 76l5.9 15.9 16.9 0.7-13.3 10.5 4.6 16.3-14.1-9.4-14.1 9.4 4.6-16.3-13.3-10.5 16.9-0.7z" />
    </g>
  ),
  cape: (
    <g {...s}>
      <path d="M78 62c6-10 15-16 22-16s16 6 22 16c5 30 7 66 3 100-16-8-33-8-50 0-4-34-2-70 3-100z" />
      <path d="M100 56v110" {...faint} />
      <path d="M78 62c6 4 14 6 22 6s16-2 22-6" {...faint} />
    </g>
  ),
  web: (
    <g {...s}>
      <path d="M100 42v116M42 100h116M59 59l82 82M141 59l-82 82" />
      <path d="M100 58l30 42-30 42-30-42z" {...faint} />
      <path d="M100 74l17 26-17 26-17-26z" {...faint} />
    </g>
  ),
  raygun: (
    <g {...s}>
      <rect x="52" y="90" width="68" height="20" rx="10" />
      <circle cx="132" cy="100" r="11" />
      <path d="M84 110l-10 44M74 154h20" />
      <path d="M64 90v20M80 90v20" {...faint} />
    </g>
  ),
  badge: (
    <g {...s}>
      <path d="M100 44l14.1 36.6 39.2 2.1-30.5 24.7 10.1 37.9-32.9-21.3-32.9 21.3 10.1-37.9L46.7 82.7l39.2-2.1z" />
    </g>
  ),
};

// --- scene recipes per glyph --------------------------------------
// Each key maps to the backdrop layers generated behind the engraving.
const SCENES = {
  comic: { halftone: true, burst: true, wash: true },
  figure: { halftone: true, spotlight: true },
  mask: { glow: true },
  shield: { rings: true, burst: true },
  cape: { streaks: true, wash: true },
  web: { grid: true, halftone: true },
  raygun: { laser: true, halftone: true },
  badge: { starburst: true },
  bust: { spotlight: true, pedestal: true },
  frame: { gallery: true },
};

function BurstRays({ count = 12, r = 320, opacity = 0.1 }) {
  const paths = [];
  for (let i = 0; i < count; i++) {
    const step = 360 / count;
    const a0 = (i * step - step / 2) * (Math.PI / 180);
    const a1 = (i * step + step / 2) * (Math.PI / 180);
    const x0 = 100 + r * Math.cos(a0);
    const y0 = 100 + r * Math.sin(a0);
    const x1 = 100 + r * Math.cos(a1);
    const y1 = 100 + r * Math.sin(a1);
    paths.push(
      <path key={i} d={`M100 100 L${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)} Z`} />
    );
  }
  return <g fill="currentColor" opacity={opacity}>{paths}</g>;
}

export function Backdrop({ art }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const scene = SCENES[art] || { halftone: true };
  const accentStyle = { stopColor: 'var(--color-accent)' };
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`ht-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.5" fill="currentColor" opacity="0.14" />
        </pattern>
        <linearGradient id={`spot-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`wash-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={accentStyle} stopOpacity="0.34" />
          <stop offset="1" style={accentStyle} stopOpacity="0" />
        </radialGradient>
      </defs>

      {scene.halftone && <rect width="200" height="200" fill={`url(#ht-${uid})`} />}
      {scene.grid && (
        <g stroke="currentColor" strokeWidth="1" opacity="0.1">
          <path d="M0 50h200M0 100h200M0 150h200M50 0v200M100 0v200M150 0v200" />
        </g>
      )}
      {scene.burst && <BurstRays />}
      {scene.starburst && <BurstRays count={16} r={240} opacity={0.08} />}
      {scene.rings && (
        <g fill="none" stroke="currentColor" opacity="0.1">
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="84" />
          <circle cx="100" cy="100" r="98" />
        </g>
      )}
      {scene.wash && <circle cx="100" cy="100" r="130" fill={`url(#wash-${uid})`} />}
      {scene.spotlight && <path d="M100 0 L52 200 L148 200 Z" fill={`url(#spot-${uid})`} />}
      {scene.streaks && (
        <g stroke="currentColor" strokeWidth="1.4" opacity="0.16" strokeLinecap="round" fill="none">
          <path d="M-10 60 C 60 40, 140 80, 210 50" />
          <path d="M-10 100 C 70 80, 130 120, 210 90" />
          <path d="M-10 140 C 60 120, 150 160, 210 130" />
        </g>
      )}
      {scene.laser && (
        <g>
          <line x1="150" y1="100" x2="210" y2="100" strokeWidth="2.5" opacity="0.55" style={{ stroke: 'var(--color-accent)' }} />
          <circle cx="210" cy="100" r="4" fill="var(--color-accent)" opacity="0.8" />
        </g>
      )}
      {scene.glow && <ellipse cx="100" cy="104" rx="64" ry="48" fill={`url(#wash-${uid})`} opacity="0.7" />}
      {scene.gallery && (
        <rect x="72" y="72" width="122" height="122" fill="currentColor" opacity="0.07" transform="translate(7 9)" />
      )}
      {scene.pedestal && <ellipse cx="100" cy="178" rx="54" ry="10" fill="currentColor" opacity="0.1" />}
    </svg>
  );
}

export function Glyph({ art, className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0 0)">{glyphs[art] || glyphs.urn}</g>
    </svg>
  );
}

/**
 * Plate — an engraved exhibition plate.
 * variant: 'light' (parchment) | 'dark' (ink-elevated)
 */
export function Plate({ art, variant = 'light', lot, className = '', ratio = 'aspect-[4/5]', plain = false, children }) {
  const dark = variant === 'dark';
  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className}`}
      style={{
        background: dark
          ? 'linear-gradient(155deg, #16161b 0%, #0a0a0c 100%)'
          : 'linear-gradient(155deg, #ffffff 0%, #ececef 100%)',
        boxShadow: dark
          ? 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 28px 56px -28px rgba(0,0,0,0.55)'
          : 'inset 0 0 0 1px rgba(10,10,12,0.05), inset 0 28px 56px -28px rgba(10,10,12,0.20)',
      }}
    >
      {/* engraved diagonals */}
      <div className={`absolute inset-0 ${dark ? 'hatch-dark' : 'hatch'}`} />
      {/* generated comic-style scene */}
      <Backdrop art={art} />
      {/* warm vignette + accent glow */}
      <div className="absolute inset-0 vignette" />
      {!plain && (
        <>
          {/* plate rules — corner ticks in accent */}
          <div className="absolute inset-3.5 border" style={{ borderColor: dark ? 'rgba(230,36,41,0.30)' : 'rgba(10,10,12,0.14)' }} />
          <span className="absolute left-3.5 top-3.5 h-3 w-3 border-l border-t" style={{ borderColor: 'var(--color-accent)' }} />
          <span className="absolute right-3.5 top-3.5 h-3 w-3 border-r border-t" style={{ borderColor: 'var(--color-accent)' }} />
          <span className="absolute bottom-3.5 left-3.5 h-3 w-3 border-b border-l" style={{ borderColor: 'var(--color-accent)' }} />
          <span className="absolute bottom-3.5 right-3.5 h-3 w-3 border-b border-r" style={{ borderColor: 'var(--color-accent)' }} />
        </>
      )}

      <div className={`absolute inset-0 grid place-items-center ${dark ? 'text-on-dark' : 'text-ink'}`}>
        <Glyph art={art} className="h-[62%] w-[62%] opacity-[0.82]" />
      </div>

      {lot && !plain && (
        <span
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.62rem] tracking-[0.2em] ${
            dark ? 'text-on-dark-mute' : 'text-mute-light'
          }`}
        >
          {lot}
        </span>
      )}
      {children}
    </div>
  );
}
