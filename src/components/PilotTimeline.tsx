import { motion } from "framer-motion";

const PilotTimeline = () => {
  const months = [
    {
      label: "Month 1",
      title: "Discover",
      items: [
        {
          name: "Leadership Buy-in",
          detail: "Head of Agency commits to protected sprint time and confirms visible participation in Month 2.",
        },
        {
          name: "Cultural Check",
          detail: "Assess how stretched teams are, how safe they feel to fail, and where the energy and resistance is.",
        },
        {
          name: "Find Champions",
          detail:
            "Identify officers already experimenting quietly. Give these 'change catalysts' legitimacy and support.",
        },
        {
          name: "Map the Pain",
          detail:
            "Corporate officers map their most time-consuming problems. Shared pain highlights universal problems, the first cultural shift.",
        },
      ],
      output:
        "A clear starting picture, real problems worth solving, identified champions, and officers who've heard from a peer that this is possible.",
    },
    {
      label: "Month 2",
      title: "Build",
      items: [
        {
          name: "Agency-Run Sprints",
          detail:
            "Protected time, real problems, and GovTech's support ecosystem: clinics, workshops, and Rabbit Deploy.",
        },
        {
          name: "The Leader's Moment",
          detail:
            "Head of Agency makes a visible appearance dropping in on a sprint, trying something, learning alongside the team. More powerful than any comms campaign.",
        },
      ],
      output: "Working prototypes built by the people who live with the problems every day.",
    },
    {
      label: "Month 3",
      title: "Showcase & Capture",
      items: [
        {
          name: "Internal Showcase",
          detail: "The agency owns the stage, GovTech helps design it. Invite observers from other ministry families.",
        },
        {
          name: "Agency-Authored Playbook",
          detail:
            "Shaped by and for the agency not a GovTech playbook. The act of creating it is part of the cultural change.",
        },
        {
          name: "Peer Coaches",
          detail: "Agency officers ready to support the next ministry family, making the model self-replicating.",
        },
      ],
      output:
        "An agency-owned playbook, a corps of peer coaches, and a WOG story bank that makes the journey feel doable.",
    },
  ];

  return (
    <div className="mt-10 space-y-6">
      {months.map((month, mi) => (
        <motion.div
          key={month.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: mi * 0.15 }}
          className="bg-surface-elevated border border-border rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim">{month.label}</span>
            <span className="w-8 h-px bg-border" />
            <h4 className="font-display text-2xl text-foreground">{month.title}</h4>
          </div>
          <div className="p-6 space-y-4">
            {month.items.map((item) => (
              <div key={item.name} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full gradient-gold-bg mt-2.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground text-sm">{item.name}.</span>{" "}
                  <span className="text-secondary-foreground text-sm">{item.detail}</span>
                </div>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-border">
              <span className="font-mono text-xs tracking-wider text-gold-dim uppercase">Output → </span>
              <span className="text-sm text-muted-foreground">{month.output}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PilotTimeline;
