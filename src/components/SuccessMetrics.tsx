import { motion } from "framer-motion";

const SuccessMetrics = () => {
  const metrics = [
    {
      name: "Ownership Test",
      question: "Is the agency playbook something they authored and own, or something they received and filed?",
    },
    {
      name: "Sustainability Test",
      question: "Do officers believe they can keep going without GovTech holding their hand?",
    },
    {
      name: "Confidence Shift",
      question: "Have officers' confidence and capability in using AI moved measurably?",
    },
    {
      name: "Impact Test",
      question: "What percentage of solutions are scalable and adopted beyond the sprint?",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-10 bg-surface-elevated border border-border rounded-lg p-6 md:p-8"
    >
      <h4 className="font-display text-2xl text-foreground mb-2">What Success Looks Like</h4>
      <p className="text-sm text-muted-foreground mb-6">Not just the number of solutions built. The real measures are:</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <div key={m.name} className="flex gap-3 items-start">
            <span className="font-mono text-sm text-gold-dim mt-0.5">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <span className="font-semibold text-foreground block text-sm">{m.name}</span>
              <span className="text-muted-foreground text-sm">{m.question}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SuccessMetrics;
