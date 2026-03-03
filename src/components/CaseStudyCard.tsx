import { motion } from "framer-motion";

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
      className="bg-surface-elevated border border-border rounded-lg overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <h4 className="font-display text-2xl md:text-3xl text-foreground">{title}</h4>
          <span className="font-mono text-xs tracking-wider text-gold-dim bg-background px-3 py-1 rounded-full border border-border">
            {team}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground block mb-1">
              The Problem
            </span>
            <p className="text-secondary-foreground text-base leading-relaxed">{problem}</p>
          </div>
          <div>
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-gold-dim block mb-1">
              The Solution
            </span>
            <p className="text-secondary-foreground text-base leading-relaxed">{solution}</p>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-muted-foreground text-sm italic leading-relaxed">
              💡 {insight}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
