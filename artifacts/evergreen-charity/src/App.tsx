import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-primary selection:text-primary-foreground relative">
      {/* Ambient Depth Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {/* Top Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="flex justify-between items-start uppercase tracking-[0.2em] text-[0.65rem] md:text-xs text-muted-foreground z-10"
      >
        <div className="border border-border/60 px-4 py-2 rounded-none backdrop-blur-sm tracking-[0.25em] relative">
          Coming Soon
          {/* Micro detailing: corner accents */}
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/50" />
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-primary/50" />
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-primary/50" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-primary/50" />
        </div>
        <div className="px-4 py-2 opacity-50 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
          Institution 001
        </div>
      </motion.header>

      {/* Main Center */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-center w-full"
        >
          <h1 className="font-serif text-[3.2rem] sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tight text-foreground flex flex-col items-center">
            <span className="block text-primary/90 hover:text-primary transition-colors duration-1000 cursor-default">
              EVERGREEN
            </span>
            <span className="block">CHARITY</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            className="flex items-center justify-center gap-4 mt-8 md:mt-16 max-w-2xl mx-auto"
          >
            <div className="h-[1px] w-8 md:w-16 bg-primary/30" />
            <p className="text-[0.65rem] md:text-sm tracking-[0.3em] uppercase text-muted-foreground font-light text-center">
              Generational impact, rooted in permanence.
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-primary/30" />
          </motion.div>
        </motion.div>

        {/* 3 Value Pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
          className="w-full max-w-[800px] mx-auto mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-y border-border/40 py-8 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent"
        >
          {[
            { title: 'Perpetual Funds', num: 'I' },
            { title: 'Ethical Investments', num: 'II' },
            { title: 'Tax-Advantaged Giving', num: 'III' }
          ].map((item, i) => (
            <div key={item.title} className="flex flex-col items-center md:border-r border-border/40 last:border-r-0 relative z-10 group">
              <span className="text-[0.55rem] md:text-[0.65rem] tracking-[0.3em] uppercase text-primary/50 mb-3 font-serif">
                {item.num}
              </span>
              <span className="text-sm md:text-base font-serif tracking-widest text-foreground/80 group-hover:text-foreground transition-colors duration-700">
                {item.title}
              </span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Bottom Footer / Email Capture */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 2 }}
        className="w-full flex justify-center z-10 pb-4 md:pb-0"
      >
        <div className="w-full max-w-sm">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-12 md:h-14 flex items-center justify-center border border-border/60 bg-primary/5 text-primary text-xs tracking-[0.2em] uppercase font-light"
            >
              We'll be in touch.
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex h-12 md:h-14 border border-border/60 bg-background/40 backdrop-blur-md focus-within:border-primary/50 transition-colors duration-700"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 bg-transparent px-6 text-sm outline-none placeholder:text-muted-foreground/30 text-foreground font-light tracking-wide"
              />
              <button
                type="submit"
                className="px-8 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-500 border-l border-border/60 font-light"
              >
                Notify
              </button>
            </form>
          )}
        </div>
      </motion.footer>
    </div>
  );
}
