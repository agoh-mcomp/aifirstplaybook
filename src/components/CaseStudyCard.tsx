import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, Wrench } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  team: string;
  problem: string;
  solution: string;
  insight: string;
}

const CaseStudyCard = ({ title, team, problem, solution, insight }: CaseStudyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-surface-elevated border border-border rounded-xl overflow-hidden hover:border-gold-dim/40 transition-colors duration-300"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full gradient-gold-bg" />

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg gradient-gold-bg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-display text-2xl md:text-3xl text-foreground">{title}</h4>
            <span className="font-mono text-xs tracking-wider text-gold-dim">
              {team}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex gap-3 items-start">
            <div className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center mt-0.5" style={{ background: "hsl(var(--destructive) / 0.15)" }}>
              <AlertCircle className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground block mb-1">
                The Problem
              </span>
              <p className="text-secondary-foreground text-base leading-relaxed">{problem}</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center mt-0.5" style={{ background: "hsl(var(--coral) / 0.15)" }}>
              <Wrench className="w-4 h-4 text-gold" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold-dim block mb-1">
                The Solution
              </span>
              <p className="text-secondary-foreground text-base leading-relaxed">{solution}</p>
            </div>
          </div>
          <div className="flex gap-3 items-start pt-3 border-t border-border">
            <div className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center mt-0.5" style={{ background: "hsl(var(--chart-5) / 0.15)" }}>
              <Lightbulb className="w-4 h-4" style={{ color: "hsl(var(--chart-5))" }} />
            </div>
            <p className="text-muted-foreground text-sm italic leading-relaxed">
              {insight}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
