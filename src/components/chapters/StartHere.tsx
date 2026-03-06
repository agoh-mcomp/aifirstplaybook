import { motion } from "framer-motion";

interface StartHereProps {
  onSelectChapter: (id: string) => void;
}

const StartHere = ({ onSelectChapter }: StartHereProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-sm tracking-[0.2em] uppercase text-gold-dim">Start Here</span>
        <span className="w-12 h-px bg-gold-dim" />
        <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
          Your Reading Path
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 text-foreground">
        How to Navigate This Playbook
      </h2>
      <p className="text-secondary-foreground text-lg leading-relaxed mb-4">
        This document is a modular toolkit designed to be used by different stakeholders at different stages of
        the transformation journey. You do not need to read it cover-to-cover — follow the path relevant to your
        role:
      </p>
      <p className="text-muted-foreground text-base leading-relaxed mb-10 italic">
        Click any chapter below to jump straight in.
      </p>

      <div className="space-y-6">
        {[
          {
            role: "Senior Leadership",
            tagline: 'The "Why" and "Where"',
            color: "gradient-gold-bg",
            labelColor: "text-gold-dim",
            description:
              'Your role is to provide the mandate and protected space for your teams. Understand the "Friction Tax" your organisation is paying and the leadership behaviours required to dismantle it.',
            chapters: [
              { num: "01", id: "ch-1", title: "Why Now", note: "The strategic case for urgency" },
              { num: "02", id: "ch-2", title: "The Vision", note: "What AI-First actually means" },
              { num: "03", id: "ch-3", title: "The Challenge", note: "Barriers you must acknowledge" },
              { num: "04", id: "ch-4", title: "Cultural Prerequisites", note: "The culture you must model" },
              { num: "07", id: "ch-7", title: "Proof It Works", note: "Evidence to justify investment" },
              { num: "08", id: "ch-8", title: "Your Move", note: "Call to action" },
            ],
          },
          {
            role: "Transformation Drivers & Sprint Runners",
            tagline: 'The "How"',
            color: "bg-accent",
            labelColor: "text-accent-foreground",
            description:
              "You own the engine room. These chapters give you the methodology, templates, and sprint playbook to run your first 90-day cycle.",
            chapters: [
              { num: "02", id: "ch-2", title: "The Vision", note: "Align your team on the destination" },
              { num: "03", id: "ch-3", title: "The Challenge", note: "Anticipate resistance patterns" },
              { num: "05", id: "ch-5", title: "The Methodology", note: "The discovery & build framework" },
              { num: "06", id: "ch-6", title: "90-Day Sprint Starter Kit", note: "Your execution playbook" },
              { num: "07", id: "ch-7", title: "Proof It Works", note: "Case studies to reference" },
              { num: "08", id: "ch-8", title: "Your Move", note: "Next steps" },
            ],
          },
          {
            role: "Officers on the Ground",
            tagline: 'The "Execution"',
            color: "bg-muted-foreground",
            labelColor: "text-muted-foreground",
            description:
              'You live with the problems every day — these chapters show you how to turn friction into working solutions, even if you don\'t consider yourself "technical."',
            chapters: [
              { num: "05", id: "ch-5", title: "The Methodology", note: "How problems become prototypes" },
              { num: "06", id: "ch-6", title: "90-Day Sprint Starter Kit", note: "Templates & toolkits" },
              { num: "07", id: "ch-7", title: "Proof It Works", note: "Peer stories from officers like you" },
            ],
          },
        ].map((item, i) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-surface-elevated border border-border rounded-lg p-6 hover:border-gold-dim/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
              <span className="font-display text-lg text-foreground">{item.role}</span>
              <span className={`font-mono text-[10px] tracking-[0.15em] uppercase ${item.labelColor}`}>
                {item.tagline}
              </span>
            </div>
            <p className="text-secondary-foreground text-sm leading-relaxed pl-[22px] mb-4">{item.description}</p>
            <div className="pl-[22px] grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.chapters.map((ch) => (
                <button
                  key={ch.num}
                  onClick={() => onSelectChapter(ch.id)}
                  className="group flex items-start gap-2 text-left p-2 rounded-md hover:bg-background/50 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-[11px] text-gold-dim mt-0.5 shrink-0">{ch.num}</span>
                  <div>
                    <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                      {ch.title}
                    </span>
                    <span className="block text-[11px] text-muted-foreground leading-tight">{ch.note}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StartHere;
