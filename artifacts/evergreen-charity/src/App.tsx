import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Mark ─────────────────────────────────────────────────────────────────────

// Forest mark — three pines in a tight diagonal cluster, reading as one unit.
function ForestMark({ size = 36 }: { size?: number }) {
  // Shallow diagonal: trees share a close base range so they feel grouped
  const trees = [
    { cx: 27, apex: 9,  hw: 5,   base: 30, o: 0.25, sw: 0.9  }, // back
    { cx: 22, apex: 15, hw: 7,   base: 36, o: 0.6,  sw: 1.1  }, // mid
    { cx: 17, apex: 21, hw: 9.5, base: 42, o: 1.0,  sw: 1.35 }, // front
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
          <line
            x1={t.cx - t.hw * 0.5} y1={t.base + 2.5}
            x2={t.cx + t.hw * 0.5} y2={t.base + 2.5}
            strokeWidth={t.sw * 1.2}
          />
        </g>
      ))}
    </svg>
  );
}



// ─── Brand guidelines (hidden from UI, preserved for future use) ──────────────
// const BRAND_COLORS = [
//   { label: 'Void',   hex: '#0c0f0d' },
//   { label: 'Grove',  hex: '#4a8c68' },
//   { label: 'Ivory',  hex: '#e8e4d9' },
//   { label: 'Lichen', hex: '#7a9b85' },
// ];
// Typefaces: Space Grotesk (display/body) · Space Mono (labels)

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col relative select-none">

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--grid-line) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--grid-line) / 0.5) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />

      {/* Centre glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 55% at 50% 44%, hsl(var(--glow)) 0%, transparent 70%)'
      }} />

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">

        {/* Hero logo mark — front and centre, glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-primary mb-7 p-7 border border-primary/20 relative"
          style={{ boxShadow: '0 0 48px hsl(152 90% 50% / 0.1), inset 0 0 32px hsl(152 90% 50% / 0.04)' }}
        >
          <ForestMark size={120} />
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold leading-[0.88] text-foreground uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '0.08em',
          }}
        >
          Evergreen <span className="text-primary">Charity</span>
        </motion.h1>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 w-full max-w-[260px] h-px bg-primary/20 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 max-w-[380px] text-[0.88rem] md:text-[0.95rem] leading-relaxed font-sans"
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

      </main>

      {/* ── Footer (brand bar hidden — see BRAND_COLORS comment above to restore) ── */}
    </div>
  );
}
