import { motion } from "framer-motion";
import { ChapterContent } from "./ChapterContent";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import PilotTimeline from "@/components/PilotTimeline";
import SuccessMetrics from "@/components/SuccessMetrics";
import PostSprintSurvey from "@/components/PostSprintSurvey";
import ResourceDownload from "@/components/ResourceDownload";
import manusWorkshopImg from "@/assets/manus-workshop.jpg";

const Chapter6 = () => (
  <ChapterContent num="Chapter 06" arc="The Journey" title="How Do I Start">
    <p>
      You've read the case for change. You've seen the cultural prerequisites. Now: how do you actually start? This
      chapter is your agency's starter kit — a practical, 90-day sprint model designed so your agency runs it, owns it,
      and builds the muscle to keep going without external support.
    </p>

    <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dim mb-2">Before You Begin</div>
      <h4 className="font-display text-2xl text-foreground mb-4">Your Pre-Sprint Checklist</h4>
      <p className="text-sm text-muted-foreground mb-6">
        Before kicking off Month 1, ensure these five foundations are in place. Without them, the sprint will stall.
      </p>
      <div className="space-y-3">
        {[
          {
            check: "Leadership commitment",
            detail: "The Head of Agency has agreed to protect sprint time and participates visibly not just endorse.",
          },
          { check: "Nominated AI Lead", detail: "One DD-level (or above) who owns and champions the initiative." },
          {
            check: "Identified officers to participate",
            detail: "A cross-functional cohort from corporate functions: HR, Finance, Procurement, Comms, Ops.",
          },
          {
            check: "BAU trade-offs agreed",
            detail: "Specific deliverables deprioritised or deferred during sprint weeks. This is non-negotiable.",
          },
          {
            check: "Sprint support confirmed ",
            detail: "Sprint support, AI clinics, tool access, and deployment pathway via Rabbit Deploy.",
          },
        ].map((item) => (
          <div key={item.check} className="flex gap-3 items-start">
            <div className="shrink-0 w-5 h-5 rounded border-2 border-gold-dim/60 flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 rounded-sm gradient-gold-bg" />
            </div>
            <div>
              <span className="font-semibold text-foreground text-sm">{item.check}.</span>{" "}
              <span className="text-secondary-foreground text-sm">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-10">
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dim mb-4">The 90-Day Sprint</div>
      <h4 className="font-display text-2xl text-foreground mb-2">Your Three-Month Roadmap</h4>
      <p className="text-sm text-muted-foreground mb-6">
        Each month has a clear purpose, defined activities, and a tangible output.
      </p>
    </div>

    <PilotTimeline />

    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-10 rounded-xl overflow-hidden border border-border"
    >
      <img
        src={manusWorkshopImg}
        alt="SCG officers at a hands-on workshop with Manus AI, learning together"
        className="w-full h-auto object-cover"
      />
      <figcaption className="bg-surface-elevated px-4 py-3 text-center font-mono text-xs tracking-wider uppercase text-muted-foreground">
        SCG officers at a hands-on workshop with Manus AI
      </figcaption>
    </motion.figure>

    <SuccessMetrics />

    <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-10">
      <h4 className="font-display text-xl text-foreground mb-4">💡 Tips from Agencies That Have Done This</h4>
      <div className="space-y-4">
        {[
          {
            tip: "Start smaller than you think.",
            detail:
              "Five officers solving one real problem will create more momentum than thirty officers attending a workshop.",
          },
          {
            tip: "Make Sprint low-stakes to build confidence.",
            detail:
              "The goal is toe-dipping, not transformation. Let officers explore, fail safely, and build confidence before raising the bar.",
          },
          {
            tip: "Showcase learning — not just successes.",
            detail:
              "The team that tried and learned something is as valuable as the team that shipped. Celebrate both.",
          },
          {
            tip: "Document as you go.",
            detail:
              "Your agency playbook should be written during the sprint, not after. Capture decisions, friction points, and workarounds as you sprint.",
          },
        ].map((item) => (
          <div key={item.tip} className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full gradient-gold-bg mt-2.5 shrink-0" />
            <div>
              <span className="font-semibold text-foreground text-sm">{item.tip}</span>{" "}
              <span className="text-secondary-foreground text-sm">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-8 space-y-3">
      <h4 className="font-display text-lg text-foreground mb-3">📥 Starter Kit Resources</h4>
      <PostSprintSurvey />
      <ResourceDownload
        title="Impact Measurement Dashboard"
        description="Live dashboard template tracking time saved, officer confidence, adoption rates, and solution deployment across sprints."
        type="dashboard"
        href="https://go.gov.sg/aifirstp1"
      />
    </div>

    <QuoteBlock
      quote="You do not need coding skills to use AI for your work, just plain English, curiosity, and a willingness to learn and adjust along the way"
      attribution="Org Excellence Officer, GovTech"
    />
    <DualAudienceBlock
      leaderText="Your decision points come at phase gates. Discover reveals the opportunity size. Build proves value. Showcase is your proof to the rest of government. What your agency builds, owns, and demonstrates becomes the reference that moves others from waiting to acting."
      practitionerText="You'll be hands-on from Day 1. Expect to pair with practitioners, challenge assumptions, and prototype solutions using your real data and real constraints. The starter kit gives you everything you need. The only missing ingredient is your willingness to begin."
    />
  </ChapterContent>
);

export default Chapter6;
