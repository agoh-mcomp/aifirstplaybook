import { motion } from "framer-motion";

interface Phase {
  name: string;
  duration: string;
  description: string;
}

const phases: Phase[] = [
  { name: "Discover", duration: "Week 1–2", description: "Map pain points, identify AI-ready processes, align stakeholders on ambition." },
  { name: "Design", duration: "Week 3–4", description: "Co-create solution blueprints with your teams. Define success metrics. Select tools." },
  { name: "Build", duration: "Week 5–8", description: "Rapid prototyping in focused sprints. Real users, real data, real feedback loops." },
  { name: "Scale", duration: "Week 9+", description: "Harden, integrate, train. Move from pilot to production with confidence." },
];

const PhaseTimeline = () => {
  return (
    <div className="mt-12 space-y-0">
      {phases.map((phase, i) => (
        <motion.div
          key={phase.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="relative pl-8 pb-10 last:pb-0"
        >
          {/* Vertical line */}
          {i < phases.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
          )}
          {/* Dot */}
          <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 border-gold-dim bg-background flex items-center justify-center">
            <div className="w-2 h-2 rounded-full gradient-gold-bg" />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
            <h4 className="font-display text-2xl text-foreground">{phase.name}</h4>
            <span className="font-mono text-xs text-gold-dim tracking-wider">{phase.duration}</span>
          </div>
          <p className="text-secondary-foreground leading-relaxed">{phase.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default PhaseTimeline;
