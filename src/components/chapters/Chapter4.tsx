import { motion } from "framer-motion";
import { ChapterContent } from "./ChapterContent";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import CulturalInfographic from "@/components/CulturalInfographic";
import christinaLeeEdmImg from "@/assets/christina-lee-edm.png";

const Chapter4 = () => (
  <ChapterContent num="Chapter 04" arc="The Foundation" title="Cultural Prerequisites">
    <p>
      True transformation isn't found in a toolset; it is found in the conditions we create. Without the cultural
      foundations in place, no amount of tooling, training, or top-down directives will produce lasting change. These
      seven non-negotiables are the conditions that separate agencies that transform from agencies that merely
      experiment.
    </p>

    <div className="space-y-6 mt-8">
      {[
        {
          num: "01",
          title: "Leadership Modeling and Mandate",
          text: "Leaders must participate as learners, not just sponsors. When a Director builds their own AI agent, it signals that this is a legitimate investment of time. Leaders must be held accountable to build and showcase their own solution during the sprint.",
          icon: "👤",
        },
        {
          num: "02",
          title: "Permission to Invest Time",
          text: "Officers need explicit runway to invest the necessary time away from BAU work to experiment and build to reap time savings in the future. Specific BAU deliverables must be deprioritised or deferred during sprint periods. This is not about finding spare time; it's about creating it through deliberate trade-offs.",
          icon: "⏳",
        },
        {
          num: "03",
          title: "Reward Learning and Risk-Taking",
          text: "Experimentation must be celebrated even when solutions don't scale. Showcase attempts, lessons learned, and creative approaches not just finished products to signal that learning is the goal.",
          icon: "🏆",
        },
        {
          num: "04",
          title: "Start with Problems, Not Solutions",
          text: 'Officers must identify genuine workflow pain points before reaching for AI tools. The question is never "Where can I use AI?" but "What problem am I trying to solve?" AI becomes the implementation choice only after understanding the problem deeply.',
          icon: "🎯",
        },
        {
          num: "05",
          title: "Peer Proof Points as Inspiration",
          text: 'Officers need to see people like them succeed and draw inspiration for ideas. Their peers in HR, Finance, Procurement — people who had also called themselves "not technical" — showing what they built and the tangible benefits they have derived.',
          icon: "🤝",
        },
        {
          num: "06",
          title: "Sustained Engagement, Not One-Off Hackathons",
          text: "AI capability is a muscle that strengthens over time. SCG's three sprints over 90 days allowed officers to build confidence progressively, toe-dipping in Sprint 1, real solutions in Sprint 3. After Phase 1, SCG is now building confidence in helping corporate officers build and deploy prototypes for testing rapidly through vibe coding. Learning does not stop.",
          icon: "🔄",
        },
        {
          num: "07",
          title: "Pragmatic Data Classification",
          text: "Officers default to treating their work as sensitive, creating unnecessary barriers to using commercial AI tools. We must be pragmatic and willing to try commercial AI tools for non-confidential work.",
          icon: "📊",
        },
      ].map((item) => (
        <div key={item.num} className="bg-surface-elevated border border-border rounded-lg p-6 flex gap-5 items-start">
          <div className="shrink-0 w-10 h-10 rounded-lg gradient-gold-bg flex items-center justify-center text-lg">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-gold-dim tracking-wider">{item.num}</span>
              <h4 className="font-display text-xl text-foreground">{item.title}</h4>
            </div>
            <p className="text-secondary-foreground leading-relaxed">{item.text}</p>
          </div>
        </div>
      ))}
    </div>

    <CulturalInfographic />

    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 rounded-xl overflow-hidden border border-border"
    >
      <img
        src={christinaLeeEdmImg}
        alt="Christina Lee shares how testing an AI conversation simulator changed her perspective on learning and development"
        className="w-full h-auto object-cover"
      />
      <figcaption className="bg-surface-elevated px-4 py-3 text-center font-mono text-xs tracking-wider uppercase text-muted-foreground">
        Human stories — Christina shares how AI shifted her perspective on learning and development
      </figcaption>
    </motion.figure>

    <DualAudienceBlock
      leaderText="These seven prerequisites are not optional extras. They are the difference between an initiative that sticks and one that fades. Your role is to create these conditions deliberately, not hope they emerge on their own."
      practitionerText="If you are reading this and recognising what's missing in your agency, you now have a language for it. Share this chapter with your leadership. Change starts when the conditions are right."
    />
  </ChapterContent>
);

export default Chapter4;
