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
      className="bg-surface-elevated border border-border rounded-lg p-6 text-center glow-gold"
    >
      <div className="font-display text-4xl md:text-5xl gradient-gold mb-2">{value}</div>
      <div className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">{label}</div>
    </motion.div>
  );
};

export default StatCard;
