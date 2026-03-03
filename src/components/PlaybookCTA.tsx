import { motion } from "framer-motion";

const PlaybookCTA = () => {
  return (
    <section className="py-32 relative">
      <div className="chapter-divider w-full mb-20" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.15), transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-6 md:px-8 text-center relative"
      >
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-6">
          Epilogue
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-foreground">
          The story starts<br />
          <span className="italic gradient-gold">when you do.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 font-body">
          Every transformation begins with a single decision. Not to be perfect — but to begin.
          Your citizens are waiting. Your officers are ready. The tools exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="gradient-gold-bg text-primary-foreground font-body font-semibold px-8 py-4 rounded-lg text-base tracking-wide hover:opacity-90 transition-opacity">
            Request a Sprint Briefing
          </button>
          <button className="border border-border text-foreground font-body font-medium px-8 py-4 rounded-lg text-base hover:bg-secondary transition-colors">
            Download as PDF
          </button>
        </div>

        <div className="mt-20 font-mono text-xs text-muted-foreground tracking-wider">
          Built with conviction. Shared with purpose.
        </div>
      </motion.div>
    </section>
  );
};

export default PlaybookCTA;
