import { useState } from 'react';
import { motion } from 'framer-motion';

const PILLARS = [
  { id: 'I', label: 'Perpetual Funds' },
  { id: 'II', label: 'Ethical Investments' },
  { id: 'III', label: 'Tax-Advantaged Giving' },
];

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col relative select-none">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow from center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--glow)) 0%, transparent 70%)'
        }}
      />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
      >
        <div className="flex items-center gap-3">
          {/* Logo mark — two interlocked rings */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
            <circle cx="8" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="14" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
            Evergreen
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
            Coming Soon
          </span>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-semibold leading-none tracking-tighter text-foreground"
            style={{ fontSize: 'clamp(3.2rem, 10vw, 9rem)' }}
          >
            EVERGREEN<br />
            <span className="text-primary">CHARITY</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 md:mt-8 max-w-xl text-sm md:text-base text-muted-foreground font-light leading-relaxed tracking-wide"
        >
          Endow — permanent charitable funds for perpetual giving.
          <br className="hidden md:block" />
          {' '}Grant now, or invest and grant over time.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 w-px h-10 bg-gradient-to-b from-primary/60 to-transparent origin-top"
        />

        {/* Three pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-8 md:mt-10 flex flex-col md:flex-row items-center gap-4 md:gap-0"
        >
          {PILLARS.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 md:gap-0">
              <div className="flex flex-col items-center group">
                <span className="font-mono text-[0.5rem] tracking-[0.3em] text-primary/50 mb-1">
                  {p.id}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/50 group-hover:text-foreground/80 transition-colors duration-500">
                  {p.label}
                </span>
              </div>
              {i < PILLARS.length - 1 && (
                <div className="hidden md:block w-[1px] h-6 bg-border/50 mx-8 md:mx-12" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 md:mt-14 w-full max-w-sm"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-11 flex items-center justify-center border border-primary/30 bg-primary/5 font-mono text-xs tracking-[0.2em] uppercase text-primary"
            >
              We'll be in touch.
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex h-11 border border-border/50 bg-background/60 backdrop-blur-sm focus-within:border-primary/60 transition-colors duration-500"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 bg-transparent px-4 font-mono text-xs outline-none placeholder:text-muted-foreground/30 text-foreground tracking-wide"
              />
              <button
                type="submit"
                className="px-6 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-400 border-l border-border/50"
              >
                Waitlist
              </button>
            </form>
          )}
        </motion.div>
      </main>

      {/* Bottom bar */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 pb-6 md:pb-8"
      >
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground/30">
          &copy; 2024 Evergreen Charity
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground/30">
          Donor Advised Fund
        </span>
      </motion.footer>
    </div>
  );
}
