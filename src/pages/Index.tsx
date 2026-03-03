import PlaybookHero from "@/components/PlaybookHero";
import ChapterSection from "@/components/ChapterSection";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import StatCard from "@/components/StatCard";
import PhaseTimeline from "@/components/PhaseTimeline";
import PlaybookCTA from "@/components/PlaybookCTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import QuoteBlock from "@/components/QuoteBlock";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PlaybookHero />

      {/* Chapter 1: Why Now */}
      <ChapterSection
        chapterNumber="Chapter 01"
        arcStage="The World Before"
        title="Why Now"
      >
        <p>
          Singapore's public service has long prided itself on being world-class. If we are serious
          about staying that way, we cannot afford to treat AI as a peripheral concern — nor as a
          technology experiment we will get around to eventually.
        </p>
        <p>
          The window for deliberate, managed transformation is narrowing. What we choose to do in the
          next two to three years will define whether the public service remains a benchmark for others,
          or whether we are left scrambling to catch up.
        </p>
        <QuoteBlock
          quote="The productivity and capability differential that AI is creating — between those who embrace it deeply and those who treat it as a peripheral tool — will compound over the next few years in ways that are difficult to fully predict, but easy to anticipate in direction."
          attribution="Bernard Toh, GovTech"
        />
        <p>
          The friction that currently exists between ideation and deployment in government is not a
          minor inconvenience. It is a fundamental constraint on how fast we can improve. Every time a
          good idea dies because it is "too small for a project" or "too complex for the tools I have
          access to," we lose something. Multiply that across a public service of over{" "}
          <span className="text-gold">150,000 officers</span>, day after day, and the cumulative cost
          is staggering.
        </p>
        <DualAudienceBlock
          leaderText="Agencies that move boldly will find their officers more capable, their services more responsive, and their teams more engaged. Those that move cautiously will face the prospect of closing the gap under greater pressure, with less time."
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
          When people talk about AI diffusion in the public service, they often default to a narrow
          framing: are officers using Pair? Are they using Transcribe? These are good tools. But if
          we stop there, we will have missed the point entirely.
        </p>
        <p>
          <span className="gradient-gold font-display text-2xl italic">"AI-First"</span> is about
          something bigger than adoption rates for any particular product. It is about public officers
          having access to the best tools available — so that the quality of their thinking, the speed
          of their work, and the scope of what they can achieve is genuinely elevated.
        </p>
        <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
          <h4 className="font-display text-2xl text-foreground mb-6">True AI Diffusion Means</h4>
          <div className="space-y-4">
            {[
              "Officers using the best available tools to do their core work better, faster, and with more creativity",
              "Non-technical officers being able to build and deploy simple solutions themselves, without needing to engage IT teams or vendors",
              "A dramatically reduced cycle time from problem to prototype to deployment — from months or years, to days or hours",
              "A culture where experimentation is the norm, and where trying something and failing is treated as learning, not as a lapse",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="font-mono text-sm text-gold-dim mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-secondary-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <DualAudienceBlock
          leaderText="This is not primarily a technology problem. It is a leadership problem. Your mandate is not to adopt a technology, but to architect a new operating model where intelligence is embedded, not imported."
          practitionerText="Think of AI-First as a design principle. Before building any workflow, ask: what would this look like if AI were a given? The answer changes everything."
        />
      </ChapterSection>

      {/* Chapter 3: The Challenge */}
      <ChapterSection
        chapterNumber="Chapter 03"
        arcStage="The Obstacle"
        title="The Challenge"
      >
        <p>
          Let's be honest about what stands in the way. Transformation fails not because of
          technology — but because of the human systems around it. Until we are willing to talk
          about these constraints openly, we will not make progress on them.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            {
              label: "Procurement Friction",
              detail:
                "Before an officer can even begin to experiment, they face a gauntlet of barriers — devices, licenses, procurement rules not designed for rapid experimentation. Collectively, they signal the system is not set up for trying new things.",
            },
            {
              label: "Tool Access Gap",
              detail:
                "Government-approved AI tools lag behind commercial alternatives. Officers who are used to the fluency of commercial tools find the experience limiting. We suppress adoption by placing the burden of discovery on the individual.",
            },
            {
              label: "Deployment Gap",
              detail:
                "The biggest gap is between prototype and deployment. Officers can build things quickly, but getting solutions to colleagues, connecting to real data, and keeping them running is beyond most non-technical officers.",
            },
            {
              label: "Data Ambiguity",
              detail:
                "Officers simply do not know what data they can use with which tools. This ambiguity is not neutral — it pushes people toward inaction. Clearer, more practical guidance would make a meaningful difference.",
            },
            {
              label: "BAU Sacred Cow",
              detail:
                "Officers are rewarded for delivery and stability, not experimentation. Leaders are accountable for not dropping the ball, making it difficult to create the slack and psychological safety AI-First requires.",
            },
            {
              label: "Leadership Gap",
              detail:
                "Nothing moves culture faster than leaders visibly doing the thing they are asking others to do. This does not scale through advocacy — it scales through example.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-surface-elevated border border-border rounded-lg p-5"
            >
              <h4 className="font-display text-xl text-foreground mb-2">{item.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
        <DualAudienceBlock
          leaderText="None of these constraints are insurmountable. But they require deliberate choices, not passive support. Your role is to make the cost of standing still more visible than the cost of moving."
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
          About a year ago, GovTech's Strategy, Corporate and Governance cluster kicked off
          "AI-First" — an initiative to move from AI being something people read about to something
          they <em className="italic text-gold-dim">did</em>. The premise was simple: an internal
          survey revealed SCG officers spent close to{" "}
          <span className="text-gold">three days a week</span> on repetitive, low-value tasks.
        </p>
        <p>
          We ran three monthly sprints over 90 days, structured so teams had a real problem to tackle,
          access to AI tools and expert support, and protected time to experiment. Leaders —
          including Bernard Toh himself — participated directly.
        </p>
        <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
          <h4 className="font-display text-2xl text-foreground mb-6">What Made It Work</h4>
          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Leadership as participant, not cheerleader.",
                text: "When officers saw their leaders in the trenches with them, the psychological permission to try was real. This is not something you can delegate.",
              },
              {
                num: "02",
                title: "Start with real pain, not technology.",
                text: "We asked officers: what frustrates you most? What takes up time that shouldn't? The best solutions came from honest problem-finding.",
              },
              {
                num: "03",
                title: "Protected time and structured space.",
                text: "Experimentation requires slack. If officers are fully loaded with BAU, nothing will change. Leadership had to actively create conditions and tolerate short-term disruption.",
              },
              {
                num: "04",
                title: "An ecosystem of support.",
                text: "AI clinics, workshops, Slack channels, expert access from GovTech's CIO Office and AI Practice. Without them, teams would have hit walls and given up.",
              },
              {
                num: "05",
                title: "Celebrate learning, not just winning.",
                text: "Not every idea was good. Not every team produced something scalable. We celebrated the ones that tried, learned, and shared — not just the ones that won.",
              },
            ].map((p) => (
              <div key={p.num} className="flex gap-4 items-start">
                <span className="font-mono text-sm text-gold-dim mt-0.5">{p.num}</span>
                <div>
                  <span className="font-semibold text-foreground">{p.title}</span>{" "}
                  <span className="text-secondary-foreground">{p.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DualAudienceBlock
          leaderText="You don't need to understand every sprint ceremony. You need to trust the process, protect the team, and clear the blockers only you can clear. Most importantly — participate yourself."
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
          Four phases. Each builds on the last. Each produces tangible outputs your organisation
          can see, touch, and evaluate.
        </p>
        <PhaseTimeline />
        <p className="mt-8">
          The lesson is that when you give officers the right conditions — tools, time, permission,
          and support — they will surprise you. The DG Sprints that followed proved it: officers
          with no engineering background used tools like Figma Make and Rabbit Deploy to build and
          deploy working applications that broke the limits of what we thought was possible.
        </p>
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
          The numbers from the SCG AI-First initiative were encouraging. But the more significant
          outcomes were cultural. The framing shifted — almost imperceptibly at first and then
          unmistakably — from{" "}
          <em className="text-muted-foreground">"AI is a tool I consume"</em> to{" "}
          <em className="text-gold-dim">"AI is a partner I work with."</em>
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          <StatCard value="73" label="AI solutions in 90 days" delay={0} />
          <StatCard value="200+" label="Officers engaged" delay={0.1} />
          <StatCard value="40%+" label="Cross-division adoption" delay={0.2} />
        </div>

        <div className="mt-12 space-y-6">
          <CaseStudyCard
            title="AppraisAI"
            team="3 HR Officers"
            problem="Performance appraisal season consumed weeks of officer time with inconsistent evaluations."
            solution="Built an AI coach loaded with all 12 GovTech role schemas, level-by-level expectations, hard panel questions, and patterns from the strongest evaluators. Guides officers through impact-focused, evidence-based evaluations in a fraction of the time."
            insight="No external vendor could have assembled the institutional knowledge these HR officers curated. The people who live the problem are the people best placed to solve it."
          />
          <CaseStudyCard
            title="Pirates of Treasury"
            team="Finance Officers"
            problem="Consolidating investment performance data from 14 disparate sources took 12 hours of manual, error-prone work monthly."
            solution="AI-powered integration that consolidates all 14 sources and produces real-time insights ready for the Board — reducing the process from 12 hours to 1 hour."
            insight="The people who built the solution were the same people who suffered through the old process every month. That is not a coincidence — it is the point."
          />
        </div>

        <QuoteBlock
          quote="The person best placed to build a solution to a problem is almost always the person who lives with that problem every day. We have historically outsourced that knowledge to vendors, to IT teams, to project managers, and in doing so consistently produced solutions that are technically functional but operationally imperfect."
          attribution="Bernard Toh"
        />

        <DualAudienceBlock
          leaderText="These aren't innovation theatre. Officers who had told themselves they were 'not technical' built working prototypes. The pace of prototyping compressed from months to days."
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
          AI diffusion is not optional. It is a non-negotiable condition for remaining a world-class
          public service. To achieve this, we as leaders need to be bolder than feels comfortable.
        </p>
        <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
          <h4 className="font-display text-2xl text-foreground mb-6">Decision Points</h4>
          <div className="space-y-6">
            <div>
              <h5 className="font-body font-semibold text-foreground mb-2">If you're a leader:</h5>
              <ul className="list-disc list-inside space-y-1.5 text-secondary-foreground">
                <li>Give your officers the best tools you can access</li>
                <li>Create the protected time and psychological safety for experimentation</li>
                <li>Participate yourself — not symbolically, but genuinely</li>
                <li>Build the internal champions who will carry this further than you can reach alone</li>
                <li>Nominate a transformation sponsor with budget authority</li>
                <li>Set a 90-day milestone and protect the team's time</li>
              </ul>
            </div>
            <div>
              <h5 className="font-body font-semibold text-foreground mb-2">
                If you're a practitioner:
              </h5>
              <ul className="list-disc list-inside space-y-1.5 text-secondary-foreground">
                <li>Document your most painful workflow in detail</li>
                <li>Rally 3–5 colleagues willing to experiment</li>
                <li>Request a sprint briefing — bring data, not slides</li>
                <li>
                  Remember: you don't need a mandate to start. You need a problem worth solving, a
                  team willing to try, and two weeks to prove it works
                </li>
              </ul>
            </div>
          </div>
        </div>
        <QuoteBlock
          quote="The best public service in the world does not wait to be told it is falling behind. It decides to stay ahead. That decision starts with each of us."
          attribution="Bernard Toh"
        />
        <DualAudienceBlock
          leaderText="Your legacy won't be the systems you maintained. It will be the transformation you had the courage to start. We did it with mostly non-technical corporate officers in 90 days. Imagine what you can do."
          practitionerText="GovTech is here to help. We have a model that has worked, a community of practitioners who have lived through it, and a genuine commitment to making this easier for you."
        />
      </ChapterSection>

      <PlaybookCTA />
    </div>
  );
};

export default Index;
