import { motion } from "framer-motion";
import { Crown, Wrench } from "lucide-react";

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
      <div className="relative bg-surface-elevated rounded-xl p-6 border border-border overflow-hidden group hover:border-gold-dim/40 transition-colors duration-300">
        {/* Decorative accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.8), transparent 70%)",
          }}
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg gradient-gold-bg flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold-dim block">
              For Leaders
            </span>
            <span className="font-display text-sm text-foreground">Strategic View</span>
          </div>
        </div>
        <p className="text-secondary-foreground text-base leading-relaxed">{leaderText}</p>
      </div>
      <div className="relative bg-surface-elevated rounded-xl p-6 border border-border overflow-hidden group hover:border-muted-foreground/40 transition-colors duration-300">
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, hsl(var(--muted-foreground) / 0.5), transparent 70%)",
          }}
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-muted-foreground/20 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground block">
              For Practitioners
            </span>
            <span className="font-display text-sm text-foreground">Tactical View</span>
          </div>
        </div>
        <p className="text-secondary-foreground text-base leading-relaxed">{practitionerText}</p>
      </div>
    </motion.div>
  );
};

export default DualAudienceBlock;
