import { motion } from "framer-motion";

interface QuoteBlockProps {
  quote: string;
  attribution: string;
}

const QuoteBlock = ({ quote, attribution }: QuoteBlockProps) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 pl-6 border-l-2 border-gold-dim"
    >
      <p className="font-display text-xl md:text-2xl italic leading-relaxed text-foreground">
        "{quote}"
      </p>
      <footer className="mt-3 font-mono text-xs tracking-[0.15em] uppercase text-gold-dim">
        — {attribution}
      </footer>
    </motion.blockquote>
  );
};

export default QuoteBlock;
