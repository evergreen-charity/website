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
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col relative">

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--grid-line) / 0.28) 0.5px, transparent 0.5px), linear-gradient(90deg, hsl(var(--grid-line) / 0.28) 0.5px, transparent 0.5px)`,
        backgroundSize: '64px 64px',
      }} />

      {/* Centre glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 55% at 50% 44%, hsl(var(--glow)) 0%, transparent 70%)'
      }} />

      {/* Porch light beam — full-page radial anchored at the lamp head */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: 'radial-gradient(ellipse 85% 75% at 95% 11%, hsl(152 90% 50% / 0.13) 0%, hsl(152 90% 50% / 0.06) 35%, transparent 68%)'
      }} />

      {/* Porch light fixture — top-right corner */}
      <div className="absolute top-0 right-0 pointer-events-none z-10" style={{ width: 160, height: 420 }}>
        <svg width="160" height="420" viewBox="0 0 160 420" fill="none">
          <defs></defs>

          {/* Wall bracket — mounted to right edge */}
          <rect x="130" y="14" width="30" height="6" fill="currentColor" fillOpacity="0.35" />

          {/* Arm extending inward */}
          <line x1="130" y1="17" x2="78" y2="17"
            stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.45" strokeLinecap="round" />

          {/* Vertical drop to fixture */}
          <line x1="78" y1="17" x2="78" y2="52"
            stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />

          {/* Lantern body — trapezoid shape */}
          <path d="M66,52 L90,52 L94,88 L62,88 Z"
            stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.45"
            fill="hsl(152,90%,50%)" fillOpacity="0.07" />

          {/* Top cap */}
          <rect x="63" y="48" width="30" height="5"
            fill="currentColor" fillOpacity="0.35" />

          {/* Bottom vent */}
          <line x1="64" y1="88" x2="92" y2="88"
            stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

          {/* Bulb glow */}
          <circle cx="78" cy="70" r="5"
            fill="hsl(152,90%,50%)" fillOpacity="0.9"
            style={{ animation: 'bulb-pulse 3s ease-in-out infinite' }} />
          <circle cx="78" cy="70" r="9"
            fill="hsl(152,90%,50%)" fillOpacity="0.2"
            style={{ animation: 'bulb-pulse 3s ease-in-out infinite' }} />

          {/* Drip chain below fixture */}
          <line x1="78" y1="88" x2="78" y2="112"
            stroke="hsl(152,90%,50%)" strokeWidth="0.8" strokeOpacity="0.3"
            strokeDasharray="2 3" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">

        {/* Hero logo mark — front and centre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-primary mb-5"
        >
          <ForestMark size={120} />
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold leading-[0.88] uppercase"
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
          className="mt-3 w-full max-w-[260px] h-px bg-primary/20 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-3 max-w-[380px] text-[0.88rem] md:text-[0.95rem] leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          style={{ color: 'hsl(var(--foreground) / 0.6)', letterSpacing: '0.01em' }}
        >
          Endow permanent charitable funds for perpetual giving.
          Grant now, or invest and grant over time.
        </motion.p>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58 }}
          className="mt-5 w-full max-w-[270px]"
        >
          {submitted ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-primary/70 py-3 border-b border-primary/20">
              We'll be in touch.
            </motion.p>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email) return;
                setSubmitting(true);
                try {
                  await fetch('https://formspree.io/f/mrpzabwq', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                } finally {
                  setSubmitting(false);
                  setSubmitted(true);
                }
              }}
              className="flex border-b border-border/50 focus-within:border-primary/50 transition-colors duration-500 pb-1 select-text">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
                className="flex-1 bg-transparent py-2.5 text-[0.85rem] outline-none placeholder:text-foreground/50 text-foreground tracking-wide" />
              <button type="submit" disabled={submitting}
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
                className="pl-5 text-[0.65rem] tracking-[0.2em] uppercase text-foreground/75 hover:text-primary transition-colors duration-300 disabled:opacity-40">
                {submitting ? '...' : 'Waitlist'}
              </button>
            </form>
          )}
        </motion.div>

      </main>

      {/* ── Footer (brand bar hidden — see BRAND_COLORS comment above to restore) ── */}
    </div>
  );
}
