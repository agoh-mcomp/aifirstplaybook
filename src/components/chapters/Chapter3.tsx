import { motion } from "framer-motion";
import { ChapterContent } from "./ChapterContent";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import { Timer, Eye, Users, Layers, Puzzle, AlertTriangle } from "lucide-react";

const Chapter3 = () => (
  <ChapterContent num="Chapter 03" arc="The Obstacle" title="The Challenge">
    <p>
      Across conversations with various agency teams, the picture is consistent. Agencies want to start AI-First. The
      problem is they don't know how and the conditions around them make starting harder than it should be. The barriers
      are not technical. They are human, cultural, and structural.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {[
        {
          label: '"This is extra work"',
          detail:
            "Corporate officers are stretched. Experimentation competes with delivery and BAU always wins — until officers get protected time and explicit permission to try.",
          icon: Timer,
          color: "var(--coral)",
        },
        {
          label: "Leaders Must Walk the Talk",
          detail:
            "When the Head of Agency visibly joins a sprint, builds something, and learns with the team — that is when people believe in cultural change. Not before.",
          icon: Eye,
          color: "var(--chart-2)",
        },
        {
          label: "No Trusted Peer Reference",
          detail:
            "Agencies need a peer in the same function, at a comparable agency, who can say honestly: here's what we did, here's what was hard. Without that, the unknown risks feel bigger than the known benefits.",
          icon: Users,
          color: "var(--chart-3)",
        },
        {
          label: "Systemic Friction",
          detail:
            "Data classification uncertainty, procurement processes built for large IT projects, slow deployment of prototypes — many officers hit the wall and stop.",
          icon: Layers,
          color: "var(--chart-4)",
        },
        {
          label: "A Playbook That Isn't Theirs",
          detail:
            "A GovTech playbook handed to agencies doesn't produce ownership. Agencies need to author their own version. The act of creating it is part of the cultural change.",
          icon: Puzzle,
          color: "var(--chart-5)",
        },
        {
          label: "Deployment Gap",
          detail:
            "The biggest gap is between prototype and deployment. Getting solutions to colleagues, connecting to real data, and keeping them running is beyond most non-technical officers.",
          icon: AlertTriangle,
          color: "var(--destructive)",
        },
      ].map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          className="relative bg-surface-elevated border border-border rounded-xl p-5 overflow-hidden hover:border-gold-dim/30 transition-colors duration-300"
        >
          <div
            className="absolute top-0 left-0 w-full h-1 opacity-60"
            style={{ background: `linear-gradient(90deg, hsl(${item.color}), transparent)` }}
          />
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `hsl(${item.color} / 0.15)` }}
            >
              <item.icon className="w-4.5 h-4.5" style={{ color: `hsl(${item.color})` }} />
            </div>
            <h4 className="font-display text-lg text-foreground">{item.label}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
        </motion.div>
      ))}
    </div>
    <QuoteBlock
      quote="The common thread: this is a culture change problem, not a technology problem. The tools are there. What's missing are the conditions that empower officers to believe they can do it."
      attribution="AI-First Engagement Strategy"
    />
    <QuoteBlock
      quote="It is easy to learn! The toughest part is breaking that inertia"
      attribution="People & Org Officer, GovTech"
    />
    <DualAudienceBlock
      leaderText="None of these constraints are insurmountable. But they require deliberate choices, not passive support. Your role is to make the cost of standing still more visible than the cost of moving."
      practitionerText="Transformation doesn't need permission from everyone — Start with one workflow, one team, and one measurable quick win."
    />
  </ChapterContent>
);

export default Chapter3;
