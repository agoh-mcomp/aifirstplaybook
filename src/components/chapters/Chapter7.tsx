import { motion } from "framer-motion";
import { ChapterContent } from "./ChapterContent";
import StatCard from "@/components/StatCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import sprintWinnersImg from "@/assets/sprint-winners.jpg";
import discoveryShowcaseImg from "@/assets/discovery-showcase.jpg";

const Chapter7 = () => (
  <ChapterContent num="Chapter 07" arc="Proof It Works" title="What We've Seen">
    <p>
      The numbers from the SCG AI-First initiative were encouraging. But the more significant outcomes were
      cultural. The framing shifted — almost imperceptibly at first and then unmistakably — from{" "}
      <em className="text-muted-foreground">"AI is a tool I consume"</em> to{" "}
      <em className="text-gold-dim">"AI is a partner I work with."</em>
    </p>
    <div className="grid sm:grid-cols-4 gap-4 mt-10">
      <StatCard value="73" label="AI solutions in 90 days" delay={0} />
      <StatCard value="200+" label="Officers engaged" delay={0.1} />
      <StatCard value="40%+" label="Cross-division adoption" delay={0.2} />
      <StatCard value="60%" label="Confidence jump" delay={0.3} />
    </div>
    <p className="mt-8 text-sm text-muted-foreground">
      Officer confidence in using AI at work jumped from 1.97 to 3.12 on a 5-point scale in three months. This
      is not a technology experiment anymore. It is a proven model ready to scale.
    </p>
    <div className="mt-10 space-y-6">
      <CaseStudyCard
        title="AppraisAI"
        team="3 HR Officers"
        problem="Performance appraisal season consumed weeks of officer time with inconsistent evaluations."
        solution="Built an AI coach loaded with all 12 GovTech role schemas, level-by-level expectations, hard panel questions, and patterns from the strongest evaluators. Guides officers through impact-focused, evidence-based evaluations in a fraction of the time."
        insight="No external vendor could have assembled the institutional knowledge these HR officers curated. The people who live the problem are the people best placed to solve it."
      />
      <CaseStudyCard
        title="Pirates of Treasury"
        team="Cross Divisional Team of Finance and Digital Governance Officers"
        problem="Consolidating investment performance data from 14 disparate sources took 12 hours of manual, error-prone work monthly."
        solution="AI-powered integration that consolidates all 14 sources and produces real-time insights ready for the Board — reducing the process from 12 hours to 1 hour."
        insight="The people who built the solution were the same people who suffered through the old process every month. That is not a coincidence — it is the point."
      />
    </div>
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 rounded-xl overflow-hidden border border-border"
    >
      <img src={sprintWinnersImg} alt="SCG AI-First Sprint 2 Winners celebrating their achievements" className="w-full h-auto object-cover" />
      <figcaption className="bg-surface-elevated px-4 py-3 text-center font-mono text-xs tracking-wider uppercase text-muted-foreground">
        Celebrating SCG AI-First Sprint 2 Winners
      </figcaption>
    </motion.figure>
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 rounded-xl overflow-hidden border border-border"
    >
      <img src={discoveryShowcaseImg} alt="Discover Showcase with Minister of State (MDDI) Jasmin Lau and SCG AI-First officers" className="w-full h-auto object-cover" />
      <figcaption className="bg-surface-elevated px-4 py-3 text-center font-mono text-xs tracking-wider uppercase text-muted-foreground">
        Discover Showcase with Minister of State (MDDI) Jasmin Lau
      </figcaption>
    </motion.figure>
    <div className="mt-10">
      <h4 className="font-display text-lg text-foreground mb-4">🎬 SCG AI-First Transformation Journey</h4>
      <div className="rounded-lg overflow-hidden border border-border aspect-video">
        <iframe
          src="https://www.youtube.com/embed/CpjgrPZIkbI"
          title="SCG AI-First Transformation Journey and Solutions"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-3">
        Watch how SCG officers built and deployed AI solutions across the organisation in 90 days.
      </p>
    </div>
    <QuoteBlock
      quote="I can do it myself instead of thinking I need to rely on tech teams"
      attribution="People & Org Officer, GovTech"
    />
    <QuoteBlock
      quote="The person best placed to build a solution to a problem is almost always the person who lives with that problem every day. We have historically outsourced that knowledge to vendors, to IT teams, to project managers, and in doing so consistently produced solutions that are technically functional but operationally imperfect."
      attribution="Bernard Toh, DCE Strategy Corporate Governance, GovTech"
    />
    <QuoteBlock
      quote="Everyone can build AI solutions — it's about fundamentally reimagining how work gets done"
      attribution="Finance Officer, GovTech"
    />
    <DualAudienceBlock
      leaderText="These aren't innovation theatre. Officers who had told themselves they were 'not technical' built working prototypes. The pace of prototyping compressed from months to days."
      practitionerText="Every solution started exactly where you are now — a team with a problem, a willingness to experiment, and a sprint to prove it out."
    />
  </ChapterContent>
);

export default Chapter7;
