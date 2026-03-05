import { motion } from "framer-motion";

interface Enabler {
  icon: string;
  title: string;
  description: string;
}

const enablers: Enabler[] = [
  {
    icon: "🧭",
    title: "A Proven Model",
    description:
      "Agencies don't have to start from scratch. The SCG AI-First sprint framework — problem-identification, protected build time, expert support, and celebrating learning — is ready for agencies to adapt and make their own.",
  },
  {
    icon: "🤝",
    title: "Peer-to-Peer Support",
    description:
      "SCG corporate officers in HR, Finance, Procurement, and Comms can speak directly with their counterparts in other agencies — not as GovTech representatives, but as peers who have been through the journey and can be honest about what it took.",
  },
  {
    icon: "🛠️",
    title: "An Ecosystem of Support",
    description:
      "AI clinics, expert drop-ins, tool access, and deployment support through Rabbit Deploy. Without this, officers hit walls and stop. With it, they build through them.",
  },
];

const EnablersGrid = () => {
  return (
    <div className="mt-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h4 className="font-display text-2xl text-foreground mb-2">What GovTech Brings to the Table</h4>
        <p className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
          The backbone, not the engine
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {enablers.map((enabler, i) => (
          <motion.div
            key={enabler.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface-elevated border border-border rounded-lg p-6 hover:border-gold-dim transition-colors duration-300"
          >
            <div className="text-2xl mb-3">{enabler.icon}</div>
            <h5 className="font-display text-xl text-foreground mb-2">{enabler.title}</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">{enabler.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 bg-background border border-border rounded-lg p-5"
      >
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-gold-dim mb-2">
          What GovTech will not do
        </p>
        <div className="flex flex-wrap gap-3">
          {["Write the agency playbook", "Run their sprints", "Own their outcomes"].map((item) => (
            <span
              key={item}
              className="text-sm text-muted-foreground border border-border rounded-full px-4 py-1.5"
            >
              ✕ {item}
            </span>
          ))}
        </div>
        <p className="text-sm text-secondary-foreground mt-3 italic">
          The moment GovTech becomes the main actor, agency ownership disappears — and ownership is
          the only thing that makes cultural change stick.
        </p>
      </motion.div>
    </div>
  );
};

export default EnablersGrid;
