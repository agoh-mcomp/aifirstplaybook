import PlaybookHero from "@/components/PlaybookHero";
import ChapterSection from "@/components/ChapterSection";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import StatCard from "@/components/StatCard";
import PhaseTimeline from "@/components/PhaseTimeline";
import PlaybookCTA from "@/components/PlaybookCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <PlaybookHero />

      {/* Chapter 1: Why Now */}
      <ChapterSection
        chapterNumber="Chapter 01"
        arcStage="The World Before"
        title="Why Now"
      >
        <p>
          The public sector is at an inflection point. Citizens expect digital-native
          services. Officers drown in manual workflows. Budgets tighten while demands
          compound. The gap between what government <em className="italic text-gold-dim">could</em> deliver
          and what it <em className="italic">does</em> deliver widens every quarter.
        </p>
        <p>
          AI isn't a future bet anymore — it's table stakes. Agencies that move now don't just
          gain efficiency; they redefine what's possible. Those that wait inherit the technical
          debt of indecision.
        </p>
        <DualAudienceBlock
          leaderText="The cost of inaction is no longer theoretical. Every month without AI-augmented operations is measurable in citizen wait times, officer burnout, and missed policy windows."
          practitionerText="You already know the pain. The spreadsheets, the copy-paste workflows, the 47-step approval chains. AI doesn't replace your expertise — it removes the friction around it."
        />
      </ChapterSection>

      {/* Chapter 2: The Vision */}
      <ChapterSection
        chapterNumber="Chapter 02"
        arcStage="The Call to Adventure"
        title="The Vision"
      >
        <p>
          Imagine an agency where officers spend 80% of their time on judgment and strategy —
          not data entry and formatting. Where policy analysis that took weeks happens in hours.
          Where citizens interact with services that anticipate their needs.
        </p>
        <p>
          <span className="gradient-gold font-display text-2xl italic">"AI-First"</span> doesn't
          mean AI-only. It means every process, every decision, every service is designed with AI
          as a foundational capability — not an afterthought bolted on.
        </p>
        <DualAudienceBlock
          leaderText="This is your mandate: not to adopt a technology, but to architect a new operating model. One where intelligence is embedded, not imported."
          practitionerText="Think of AI-First as a design principle. Before building any workflow, you ask: what would this look like if AI were a given? The answer changes everything."
        />
      </ChapterSection>

      {/* Chapter 3: The Challenge */}
      <ChapterSection
        chapterNumber="Chapter 03"
        arcStage="The Obstacle"
        title="The Challenge"
      >
        <p>
          Let's be honest about what stands in the way. Transformation fails not because
          of technology — but because of the human systems around it.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { label: "Fear", detail: "\"AI will replace us.\" No — but it will change how you work. The real risk is irrelevance through inaction." },
            { label: "Inertia", detail: "Legacy systems, legacy processes, legacy mindsets. The gravity of \"how we've always done it\" is the strongest force in government." },
            { label: "Capability", detail: "Most agencies lack AI literacy at scale. Not everyone needs to code — but everyone needs to understand what's possible." },
          ].map((item) => (
            <div key={item.label} className="bg-surface-elevated border border-border rounded-lg p-5">
              <h4 className="font-display text-xl text-foreground mb-2">{item.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
        <DualAudienceBlock
          leaderText="Your role isn't to eliminate resistance — it's to make the cost of standing still more visible than the cost of moving. Create urgency with evidence, not edicts."
          practitionerText="Start with one workflow. One team. One quick win. Transformation doesn't need permission from everyone — it needs proof from someone."
        />
      </ChapterSection>

      {/* Chapter 4: The Methodology */}
      <ChapterSection
        chapterNumber="Chapter 04"
        arcStage="The Guide Appears"
        title="The Methodology"
      >
        <p>
          This isn't theory. It's a battle-tested approach refined across dozens of
          government agencies — a sprint-based model designed for the realities of
          public-sector delivery.
        </p>
        <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
          <h4 className="font-display text-2xl text-foreground mb-6">Our Principles</h4>
          <div className="space-y-4">
            {[
              { num: "01", text: "Start with the problem, not the technology. AI is a means, never the end." },
              { num: "02", text: "Co-create with practitioners. The best solutions come from those who live the work." },
              { num: "03", text: "Ship fast, learn faster. Two-week sprints with real deliverables, not decks." },
              { num: "04", text: "Build capability, not dependency. Every engagement leaves your team stronger." },
              { num: "05", text: "Measure what matters. Citizen impact, officer time saved, decision quality." },
            ].map((p) => (
              <div key={p.num} className="flex gap-4 items-start">
                <span className="font-mono text-sm text-gold-dim mt-0.5">{p.num}</span>
                <p className="text-secondary-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <DualAudienceBlock
          leaderText="You don't need to understand every sprint ceremony. You need to trust the process, protect the team, and clear the blockers only you can clear."
          practitionerText="Each sprint has a clear input (a real problem), a clear output (a working prototype), and a clear feedback loop (users testing it). No vanity demos."
        />
      </ChapterSection>

      {/* Chapter 5: How It Works */}
      <ChapterSection
        chapterNumber="Chapter 05"
        arcStage="The Journey"
        title="How It Works"
      >
        <p>
          Four phases. Each builds on the last. Each produces tangible outputs your
          organisation can see, touch, and evaluate.
        </p>
        <PhaseTimeline />
        <DualAudienceBlock
          leaderText="Your decision points come at phase gates. Discover reveals the opportunity size. Design confirms feasibility. Build proves value. Scale is your commitment to change."
          practitionerText="You'll be hands-on from Day 1. Expect to pair with AI engineers, challenge assumptions, and prototype solutions using your real data and real constraints."
        />
      </ChapterSection>

      {/* Chapter 6: What We've Seen */}
      <ChapterSection
        chapterNumber="Chapter 06"
        arcStage="Proof It Works"
        title="What We've Seen"
      >
        <p>
          Across government, teams have already made the leap. The results aren't
          incremental — they're transformational.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          <StatCard value="70+" label="AI solutions built" delay={0} />
          <StatCard value="12×" label="Faster processing" delay={0.1} />
          <StatCard value="94%" label="Officer confidence" delay={0.2} />
        </div>
        <p className="mt-10">
          The confidence shift is the real metric. When officers go from <em className="text-muted-foreground">"AI is
          threatening"</em> to <em className="text-gold-dim">"AI is my best tool"</em>, you know the
          transformation is real. Not because the technology changed — but because the
          culture did.
        </p>
        <DualAudienceBlock
          leaderText="These aren't innovation theatre. These are production systems handling real workloads, signed off by real compliance teams, serving real citizens."
          practitionerText="Every solution started exactly where you are now — a team with a problem, a willingness to experiment, and a sprint to prove it out."
        />
      </ChapterSection>

      {/* Chapter 7: Your Move */}
      <ChapterSection
        chapterNumber="Chapter 07"
        arcStage="The New World"
        title="Your Move"
      >
        <p>
          This playbook isn't a prescription. It's a mirror. The question isn't whether
          AI will transform government — it's whether <em className="italic text-gold-dim">your
          agency</em> will lead that transformation or follow it.
        </p>
        <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
          <h4 className="font-display text-2xl text-foreground mb-6">Decision Points</h4>
          <div className="space-y-6">
            <div>
              <h5 className="font-body font-semibold text-foreground mb-1">If you're a leader:</h5>
              <ul className="list-disc list-inside space-y-1 text-secondary-foreground">
                <li>Nominate a transformation sponsor with budget authority</li>
                <li>Identify 2–3 high-impact use cases for a pilot sprint</li>
                <li>Set a 90-day milestone and protect the team's time</li>
              </ul>
            </div>
            <div>
              <h5 className="font-body font-semibold text-foreground mb-1">If you're a practitioner:</h5>
              <ul className="list-disc list-inside space-y-1 text-secondary-foreground">
                <li>Document your most painful workflow in detail</li>
                <li>Rally 3–5 colleagues willing to experiment</li>
                <li>Request a sprint briefing — bring data, not slides</li>
              </ul>
            </div>
          </div>
        </div>
        <DualAudienceBlock
          leaderText="Your legacy won't be the systems you maintained. It will be the transformation you had the courage to start."
          practitionerText="You don't need a mandate to start. You need a problem worth solving, a team willing to try, and two weeks to prove it works."
        />
      </ChapterSection>

      {/* CTA */}
      <PlaybookCTA />
    </div>
  );
};

export default Index;
