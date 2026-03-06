import { ChapterContent } from "./ChapterContent";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import { Clock, Users, Lightbulb, TrendingUp } from "lucide-react";

const Chapter1 = () => (
  <ChapterContent num="Chapter 01" arc="The World Before" title="Why Now">
    <p>
      Singapore's public service has long prided itself on being world-class. If we are serious about staying
      that way, we cannot afford to treat AI as a peripheral concern — nor as a technology experiment we will
      get around to eventually.
    </p>
    <p>
      The window for deliberate, managed transformation is narrowing. What we choose to do in the next two to
      three years will define whether the public service remains a benchmark for others, or whether we are left
      scrambling to catch up.
    </p>
    <QuoteBlock
      quote="The productivity and capability differential that AI is creating — between those who embrace it deeply and those who treat it as a peripheral tool — will compound over the next few years in ways that are difficult to fully predict, but easy to anticipate in direction."
      attribution="Bernard Toh, DCE Strategy Corporate Governance, GovTech"
    />
    <p>
      The friction that currently exists between ideation and deployment in government is not a minor
      inconvenience. It is a fundamental constraint on how fast we can improve. Every time a good idea dies
      because it is "too small for a project" or "too complex for the tools I have access to," we lose
      something. Multiply that across a public service of over{" "}
      <span className="text-gold">150,000 officers</span>, day after day, and the cumulative cost is staggering.
    </p>
    <div className="bg-surface-elevated border border-border rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.6), transparent 70%)" }}
      />
      <h4 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-gold" />
        What's in It for Agencies?
      </h4>
      <div className="space-y-5">
        {[
          {
            title: "Time back for meaningful work",
            detail:
              "Corporate teams often spend up to three days a week on repetitive, low-value tasks. Even recovering a fraction frees people for work that actually matters.",
            icon: Clock,
          },
          {
            title: "A confident, capable workforce",
            detail:
              'The most significant outcome was watching officers who called themselves "not technical" build things that worked — and the shift in how they saw themselves afterwards. Confidence compounds and builds capability.',
            icon: Users,
          },
          {
            title: "Solutions built by the people who live with the problems",
            detail:
              "The person best placed to build a solution is almost always the person who lives with that problem every day. Not vendors. Not IT teams. Your own people.",
            icon: Lightbulb,
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 items-start">
            <div
              className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))",
              }}
            >
              <item.icon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-semibold text-foreground">{item.title}.</span>{" "}
              <span className="text-secondary-foreground">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <QuoteBlock quote="I realised AI isn't as daunting as I thought" attribution="Finance Officer, GovTech" />
    <DualAudienceBlock
      leaderText="Agencies that move boldly will find their officers more capable, their services more responsive, and their teams more engaged. Those that move cautiously will face the prospect of closing the gap under greater pressure, with less time."
      practitionerText="You already know the pain. The spreadsheets, the copy-paste workflows, the 47-step approval chains. AI doesn't replace your expertise — it removes the friction around it."
    />
  </ChapterContent>
);

export default Chapter1;
