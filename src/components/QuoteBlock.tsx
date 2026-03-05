import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteBlockProps {
  quote: string;
  attribution: string;
  imageSrc?: string;
}

const QuoteBlock = ({ quote, attribution, imageSrc }: QuoteBlockProps) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 relative bg-surface-elevated/50 rounded-xl p-8 border border-border overflow-hidden"
    >
      {/* Decorative gradient corner */}
      <div
        className="absolute top-0 left-0 w-24 h-24 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top left, hsl(var(--coral) / 0.6), transparent 70%)",
        }}
      />
      <div className="absolute top-0 left-0 w-1 h-full gradient-gold-bg rounded-l-xl" />
      <Quote className="w-8 h-8 text-gold mb-4 opacity-40" />
      <p className="font-display text-xl md:text-2xl italic leading-relaxed text-foreground">
        "{quote}"
      </p>
      <footer className="mt-4 flex items-center gap-3">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={attribution}
            className="w-12 h-12 rounded-full object-cover border-2 border-gold-dim/30"
          />
        )}
        <div className="flex items-center gap-2">
          <div className="w-6 h-px gradient-gold-bg" />
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-gold-dim">
            {attribution}
          </span>
        </div>
      </footer>
    </motion.blockquote>
  );
};

export default QuoteBlock;
