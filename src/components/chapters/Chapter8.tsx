import { ChapterContent } from "./ChapterContent";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import EnablersGrid from "@/components/EnablersGrid";
import LoveButton from "@/components/LoveButton";
import { Eye, ShieldCheck, UserCheck, Heart, Flag, Compass, Crown, Rocket } from "lucide-react";

const Chapter8 = () => (
  <ChapterContent num="Chapter 08" arc="The New World" title="Your Move">
    <p>
      AI diffusion is not optional. It is a non-negotiable condition for remaining a world-class public service.
      To achieve this, we as leaders need to be bolder than feels comfortable.
    </p>
    <div className="bg-surface-elevated border border-border rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.6), transparent 70%)" }}
      />
      <h4 className="font-display text-2xl text-foreground mb-2 flex items-center gap-3">
        <Flag className="w-6 h-6 text-gold" />
        Call to Act Now
      </h4>
      <p className="text-sm text-muted-foreground mb-6">
        The pilot's success isn't about tools or frameworks. It's about cultural readiness.
      </p>
      <div className="space-y-5">
        {[
          { num: "01", title: "Participate — don't just endorse.", detail: "Show up for at least one sprint session. Let officers see you learning alongside them. When the Head of Agency is an active participant, it creates the psychological permission for everyone else to experiment in a way no formal directive ever could.", icon: Eye },
          { num: "02", title: "Protect the time.", detail: "Experimentation always dies when it competes with day-to-day work and loses. We need a firm commitment to protect the time for participating officers. This is a leadership decision.", icon: ShieldCheck },
          { num: "03", title: "Nominate an AI Lead.", detail: "Appoint one person — DD-level or above — to be the internal lead. This person will be leading the organising team to drive active engagement, organising sprints and participation; they're building the internal ownership that will last.", icon: UserCheck },
          { num: "04", title: "Give your officers permission to fail.", detail: "For cultural shift to happen, officers must feel safe trying things that might not work. That safety has to come from the top. A visible signal that an honest attempt is valued is more powerful than any workshop.", icon: Heart },
        ].map((item) => (
          <div key={item.num} className="flex gap-4 items-start">
            <div
              className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))" }}
            >
              <item.icon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-semibold text-foreground">{item.title}</span>{" "}
              <span className="text-secondary-foreground">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-surface-elevated border border-border rounded-xl p-6 md:p-8 mt-6 relative overflow-hidden">
      <h4 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
        <Compass className="w-6 h-6 text-gold" />
        Decision Points
      </h4>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="relative p-5 rounded-lg border border-border"
          style={{ background: "linear-gradient(135deg, hsl(var(--coral) / 0.05), transparent)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-4 h-4 text-gold" />
            <h5 className="font-body font-semibold text-foreground">If you're a leader:</h5>
          </div>
          <ul className="space-y-2 text-secondary-foreground text-sm">
            {[
              "Give your officers the best tools you can access",
              "Create the protected time and psychological safety for experimentation",
              "Participate yourself — not symbolically, but genuinely",
              "Build the internal champions who will carry this further than you can reach alone",
              "Set a 90-day milestone and protect the team's time",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full gradient-gold-bg mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="relative p-5 rounded-lg border border-border"
          style={{ background: "linear-gradient(135deg, hsl(var(--muted-foreground) / 0.05), transparent)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-4 h-4 text-muted-foreground" />
            <h5 className="font-body font-semibold text-foreground">If you're a practitioner:</h5>
          </div>
          <ul className="space-y-2 text-secondary-foreground text-sm">
            {[
              "Document your most painful workflow in detail",
              "Rally 3–5 colleagues willing to experiment",
              "Find out more at go.gov.sg/ai-first — bring data, not slides",
              "Remember: you don't need a mandate to start — you need a problem worth solving, a team willing to try, and two weeks to prove it works",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <QuoteBlock
      quote="The best public service in the world does not wait to be told it is falling behind. It decides to stay ahead. That decision starts with each of us."
      attribution="Bernard Toh, DCE Strategy, Corporate & Governance, GovTech"
    />
    <DualAudienceBlock
      leaderText="GovTech SCG proved it with non-technical corporate officers in 90 days. Your agency has the opportunity to be the one that proves it scales — and whose story moves the rest of government from waiting to acting."
      practitionerText="GovTech is here to help. We have a model that has worked, a community of practitioners who have lived through it, and a genuine commitment to making this easier for you."
    />

    <EnablersGrid />

    {/* Epilogue CTA inline */}
    <div className="mt-16 pt-16 border-t border-border text-center">
      <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-6">Epilogue</div>
      <h3 className="font-display text-3xl md:text-4xl leading-[1.1] mb-8 text-foreground">
        The story starts
        <br />
        <span className="italic gradient-gold">when you do.</span>
      </h3>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-body max-w-xl mx-auto">
        Every transformation begins with a single decision. Not to be perfect — but to begin. What is holding
        you back ?
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://go.gov.sg/ai-first"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-gold-bg text-primary-foreground font-body font-semibold px-8 py-4 rounded-lg text-base tracking-wide hover:opacity-90 transition-opacity cursor-pointer inline-block"
        >
          Find out More
        </a>
      </div>
      <div className="mt-12">
        <LoveButton />
      </div>
      <div className="mt-10 font-mono text-xs text-muted-foreground tracking-wider">
        Built with conviction. Shared with purpose.
      </div>
    </div>
  </ChapterContent>
);

export default Chapter8;
