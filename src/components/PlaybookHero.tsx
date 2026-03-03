import { motion } from "framer-motion";

const PlaybookHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.4), transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-gold-dim mb-8">
            The AI-First Playbook
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
            <span className="text-foreground">Your Agency.</span>
            <br />
            <span className="gradient-gold italic">Transformed.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-body">
            A narrative guide for leaders and practitioners ready to move from
            AI-curious to AI-first. Your organisation is the hero of this story.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-muted-foreground"
          >
            <span className="font-mono text-xs tracking-wider">Scroll to begin</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-4 h-7 rounded-full border border-muted-foreground flex items-start justify-center pt-1"
            >
              <div className="w-1 h-1.5 rounded-full bg-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaybookHero;
