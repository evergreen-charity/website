import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Logos ────────────────────────────────────────────────────────────────────

// A — Loop Arrow: diagonal upward line that loops once then arrows upward —
//     perpetual momentum, giving that never stops rising
function LogoA({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Ascending path with one loop — enters from lower-left,
          curves up, circles around, exits upward to arrow tip */}
      <path
        d="M 9,42
           C 11,35 15,29 19,26
           C 21,24 23,22 23,20
           C 23,16 19,13 16,16
           C 13,19 14,24 18,26
           C 22,28 27,24 28,20
           C 29,16 28,12 30,9
           L 36,5"
        stroke="currentColor" strokeWidth="1.4" fill="none"
      />
      {/* Arrowhead at top-right */}
      <path d="M 31,5 L 36,5 L 35,10"
        stroke="currentColor" strokeWidth="1.3" fill="none"
      />
    </svg>
  );
}

// B — Diagonal 3D stack: four pines ascending from lower-left to upper-right,
//     each smaller + higher + fainter, no trunks — pure depth illusion
function LogoB({ size = 36 }: { size?: number }) {
  // drawn back → front so front tree sits on top
  const trees = [
    { cx: 30, apex: 5,  hw: 5,  base: 19, o: 0.2,  sw: 0.85 },
    { cx: 25, apex: 12, hw: 7,  base: 26, o: 0.42, sw: 1.0  },
    { cx: 20, apex: 19, hw: 9,  base: 34, o: 0.65, sw: 1.15 },
    { cx: 15, apex: 26, hw: 11, base: 42, o: 1.0,  sw: 1.35 },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {trees.map((t, i) => (
        <g key={i} stroke="currentColor" strokeOpacity={t.o}
           strokeLinejoin="round" strokeLinecap="round">
          <polygon
            points={`${t.cx},${t.apex} ${t.cx - t.hw},${t.base} ${t.cx + t.hw},${t.base}`}
            strokeWidth={t.sw} fill="none"
          />
        </g>
      ))}
    </svg>
  );
}

// C — Stacked Rings: concentric circles fading inward — tree rings, forever
function LogoC({ size = 36 }: { size?: number }) {
  const rings = [21, 17, 13.5, 10.5, 8, 5.5, 3.2];
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {rings.map((r, i) => (
        <circle key={r} cx="24" cy="24" r={r}
          stroke="currentColor"
          strokeWidth={i === 0 ? 1.4 : 1}
          strokeOpacity={Math.max(0.12, 1 - i * 0.13)}
        />
      ))}
      <circle cx="24" cy="24" r="1.2" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

const LOGOS = [
  { id: 'A', label: 'Loop',   Component: LogoA },
  { id: 'B', label: 'Forest', Component: LogoB },
  { id: 'C', label: 'Rings',  Component: LogoC },
];

const BRAND_COLORS = [
  { label: 'Void',   hex: '#0c0f0d' },
  { label: 'Grove',  hex: '#4a8c68' },
  { label: 'Ivory',  hex: '#e8e4d9' },
  { label: 'Lichen', hex: '#7a9b85' },
];

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState('B');

  const ActiveLogo = LOGOS.find(l => l.id === selected)!.Component;

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col relative select-none">

      {/* Grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtle warm vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 42%, hsl(var(--glow)) 0%, transparent 72%)'
        }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex items-center justify-between px-7 md:px-12 py-5 md:py-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary opacity-80"><ActiveLogo size={20} /></span>
          <span className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-muted-foreground">
            Evergreen Charity
          </span>
        </div>
        {/* Handwritten-feel rule on right */}
        <div className="h-px w-16 md:w-24 bg-border/30" />
      </motion.header>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">

        {/* Wordmark — Fraunces italic, big personality */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold leading-[0.88] text-foreground uppercase"
          style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
            letterSpacing: '0.06em',
          }}
        >
          Evergreen<br />
          <span className="text-primary" style={{ letterSpacing: '0.08em' }}>Charity</span>
        </motion.h1>

        {/* Thin ornamental rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 w-full max-w-[320px] flex items-center gap-2 origin-center"
        >
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-primary/40 text-[0.6rem] leading-none">✦</span>
          <div className="flex-1 h-px bg-border/40" />
        </motion.div>

        {/* Subtitle — Instrument Serif, reads like prose */}
        <motion.p
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="mt-4 max-w-[400px] text-[0.88rem] md:text-[0.95rem] leading-relaxed font-sans"
          style={{ color: 'hsl(var(--foreground) / 0.6)', letterSpacing: '0.01em' }}
        >
          Endow permanent charitable funds for perpetual giving.
          Grant now, or invest and grant over time.
        </motion.p>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58 }}
          className="mt-6 w-full max-w-[270px]"
        >
          {submitted ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-primary/70 py-3 border-b border-primary/20">
              We'll be in touch.
            </motion.p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex border-b border-border/60 focus-within:border-primary/60 transition-colors duration-500 pb-1">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent py-2.5 font-mono text-[0.85rem] outline-none placeholder:text-muted-foreground/40 text-foreground tracking-wide" />
              <button type="submit"
                className="pl-5 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-primary transition-colors duration-300">
                Waitlist
              </button>
            </form>
          )}
        </motion.div>

        {/* Logo chooser */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 md:mt-10 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[0.46rem] tracking-[0.3em] uppercase text-muted-foreground/25">
            Mark Options
          </span>
          <div className="flex gap-2">
            {LOGOS.map((logo) => {
              const active = selected === logo.id;
              return (
                <button key={logo.id} onClick={() => setSelected(logo.id)}
                  className={`group flex flex-col items-center gap-1.5 py-3 px-5 border transition-all duration-400 ${
                    active
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/20 hover:border-border/40'
                  }`}
                >
                  <span className={`transition-colors duration-300 ${active ? 'text-primary' : 'text-foreground/25 group-hover:text-foreground/50'}`}>
                    <logo.Component size={30} />
                  </span>
                  <span className="font-mono text-[0.44rem] tracking-[0.15em] uppercase"
                    style={{ color: active ? 'hsl(var(--primary) / 0.55)' : 'hsl(var(--muted-foreground) / 0.3)' }}>
                    {logo.id} · {logo.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="relative z-10 flex items-center justify-between px-7 md:px-12 py-4 md:py-5"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.44rem] tracking-[0.25em] uppercase text-muted-foreground/20 mr-1">Brand</span>
          {BRAND_COLORS.map(c => (
            <div key={c.label} title={c.label} className="w-3.5 h-3.5 border border-white/5"
              style={{ backgroundColor: c.hex }} />
          ))}
          <div className="w-px h-3 bg-border/20 mx-1.5" />
          <span className="font-mono text-[0.44rem] tracking-[0.1em] uppercase text-muted-foreground/20">
            Fraunces · Instrument Serif · DM Mono
          </span>
        </div>
        <span className="font-mono text-[0.44rem] tracking-[0.15em] uppercase text-muted-foreground/15">
          Donor Advised Fund
        </span>
      </motion.footer>
    </div>
  );
}
