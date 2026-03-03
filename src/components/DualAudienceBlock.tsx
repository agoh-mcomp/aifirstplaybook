import { motion } from "framer-motion";

interface DualAudienceBlockProps {
  leaderText: string;
  practitionerText: string;
}

const DualAudienceBlock = ({ leaderText, practitionerText }: DualAudienceBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid md:grid-cols-2 gap-6 mt-10"
    >
      <div className="bg-surface-elevated rounded-lg p-6 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full gradient-gold-bg" />
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-gold-dim">
            For Leaders
          </span>
        </div>
        <p className="text-secondary-foreground text-base leading-relaxed">{leaderText}</p>
      </div>
      <div className="bg-surface-elevated rounded-lg p-6 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
            For Practitioners
          </span>
        </div>
        <p className="text-secondary-foreground text-base leading-relaxed">{practitionerText}</p>
      </div>
    </motion.div>
  );
};

export default DualAudienceBlock;
