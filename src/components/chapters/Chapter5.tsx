import { motion } from "framer-motion";
import { ChapterContent } from "./ChapterContent";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import DiscoverySurvey from "@/components/DiscoverySurvey";
import ResourceDownload from "@/components/ResourceDownload";
import { Compass, Crown, Target, ShieldCheck, HandshakeIcon, Award } from "lucide-react";
import scgWorkshopImg from "@/assets/scg-workshop.jpg";
import aiClinicsEdmImg from "@/assets/ai-clinics-edm.jpg";

const Chapter5 = () => (
  <ChapterContent num="Chapter 05" arc="The Guide Appears" title="The Methodology">
    <p>
      In July 2025, GovTech's Strategy, Corporate and Governance cluster kicked off "AI-First", an initiative to move
      from AI being something people were curious about to something they <em className="italic text-gold-dim">did</em>.
      The premise was simple: an internal survey revealed SCG officers spent close to{" "}
      <span className="text-gold">three days a week</span> on repetitive, low-value tasks.
    </p>
    <p>
      We ran three monthly sprints over 90 days, structured so teams had a real problem to tackle, access to AI tools
      and expert support, and protected time to experiment. Leaders including Bernard himself participated directly.
    </p>
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 rounded-xl overflow-hidden border border-border"
    >
      <img
        src={scgWorkshopImg}
        alt="SCG officers at a Lorong AI hands-on workshop learning AI together"
        className="w-full h-auto object-cover"
      />
      <figcaption className="bg-surface-elevated px-4 py-3 text-center font-mono text-xs tracking-wider uppercase text-muted-foreground">
        GovTech officers at a Lorong AI hands-on workshop
      </figcaption>
    </motion.figure>
    <div className="bg-surface-elevated border border-border rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.6), transparent 70%)" }}
      />
      <h4 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
        <Compass className="w-6 h-6 text-gold" />
        What Made It Work
      </h4>
      <div className="space-y-5">
        {[
          {
            num: "01",
            title: "Leadership as participant, not cheerleader.",
            text: "When officers saw their leaders in the trenches with them, the psychological permission to try was real. This is not something you can delegate.",
            icon: Crown,
          },
          {
            num: "02",
            title: "Start with real pain, not technology.",
            text: "We asked officers: what frustrates you most? What takes up time that shouldn't? The best solutions came from honest problem-finding.",
            icon: Target,
          },
          {
            num: "03",
            title: "Protected time and structured space.",
            text: "Experimentation requires slack. If officers are fully loaded with BAU, nothing will change. Leadership had to actively create conditions and tolerate short-term disruption.",
            icon: ShieldCheck,
          },
          {
            num: "04",
            title: "An ecosystem of support.",
            text: "AI clinics, workshops, Slack channels, expert access from GovTech's CIO Office and AI Practice. Without them, teams would have hit walls and giving up.",
            icon: HandshakeIcon,
          },
          {
            num: "05",
            title: "Celebrate learning, not just winning.",
            text: "Not every idea was good. Not every team produced something scalable. We celebrated the ones that tried, learned, and shared — not just the ones that won.",
            icon: Award,
          },
        ].map((p) => (
          <div key={p.num} className="flex gap-4 items-start">
            <div
              className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))" }}
            >
              <p.icon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-semibold text-foreground">{p.title}</span>{" "}
              <span className="text-secondary-foreground">{p.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 rounded-xl overflow-hidden border border-border"
    >
      <img
        src={aiClinicsEdmImg}
        alt="SCG AI-First EDM showing AI Clinics where officers brought their data and questions to sharpen ideas into workable solutions"
        className="w-full h-auto object-cover"
      />
      <figcaption className="bg-surface-elevated px-4 py-3 text-center font-mono text-xs tracking-wider uppercase text-muted-foreground">
        AI Clinics — Officers brought their data and questions to sharpen ideas into workable solutions
      </figcaption>
    </motion.figure>

    <div className="mt-8 space-y-3">
      <h4 className="font-display text-lg text-foreground mb-3">📥 Resources & Templates</h4>
      <DiscoverySurvey />
      <ResourceDownload
        title="Discovery Survey Results"
        description="View aggregated findings from the AI-First discovery survey — key pain points, workflow gaps, and prioritised AI opportunities."
        type="dashboard"
        href="https://go.gov.sg/aifirstdiscovery"
      />
    </div>
    <div className="mt-8 bg-surface-elevated border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <h4 className="font-display text-lg text-foreground">Explore the AI-First Initiative</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Visit the official AI-First site for the latest updates, resources, and community.
        </p>
      </div>
      <a
        href="https://go.gov.sg/ai-first"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 gradient-gold-bg text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg text-sm tracking-wide hover:opacity-90 transition-opacity"
      >
        Visit AI-First &rarr;
      </a>
    </div>
    <QuoteBlock quote="I need to set aside time on this to save time" attribution="Strat Plans Officer, GovTech" />
    <DualAudienceBlock
      leaderText="You don't need to master every sprint ceremony. You need to trust the process, protect the team, and clear the blockers only you can clear. Most importantly, participate yourself."
      practitionerText="Each sprint has a clear input (a real problem), a clear output (a working prototype), and a clear feedback loop (users testing it). If it doesn't have these, it is just vanity demos. Build for impact"
    />
  </ChapterContent>
);

export default Chapter5;
