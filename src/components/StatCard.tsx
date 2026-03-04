import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ value, label, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-surface-elevated border border-border rounded-xl p-6 text-center glow-gold overflow-hidden group hover:border-gold-dim/50 transition-colors duration-300"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--coral) / 0.08), transparent 70%)",
        }}
      />
      <div className="font-display text-4xl md:text-5xl gradient-gold mb-2 relative">{value}</div>
      <div className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground relative">{label}</div>
    </motion.div>
  );
};

export default StatCard;
