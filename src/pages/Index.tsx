import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterSidebar, { chapters } from "@/components/ChapterSidebar";
import ChapterSection from "@/components/ChapterSection";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import StatCard from "@/components/StatCard";
import PlaybookCTA from "@/components/PlaybookCTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import QuoteBlock from "@/components/QuoteBlock";
import bernardTohImg from "@/assets/bernard-toh.jpg";

import EnablersGrid from "@/components/EnablersGrid";
import PilotTimeline from "@/components/PilotTimeline";
import SuccessMetrics from "@/components/SuccessMetrics";
import ResourceDownload from "@/components/ResourceDownload";
import DiscoverySurvey from "@/components/DiscoverySurvey";
import PostSprintSurvey from "@/components/PostSprintSurvey";
import {
  BookOpen,
  ArrowRight,
  Zap,
  Clock,
  Users,
  Lightbulb,
  ShieldCheck,
  Target,
  HandshakeIcon,
  RefreshCw,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Eye,
  Puzzle,
  Layers,
  UserCheck,
  Timer,
  Award,
  Compass,
  Rocket,
  Heart,
  Download,
  Flag,
  Crown,
} from "lucide-react";

const Index = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  // Landing / overview when no chapter selected
  const renderLanding = () => (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(var(--coral) / 0.4), transparent 70%)" }}
        />
      </div>

      <div className="relative text-center max-w-3xl">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-gold-dim mb-8">The AI-First Playbook</div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
          <span className="text-foreground">Your Agency.</span>
          <br />
          <span className="gradient-gold italic">Transformed.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-body">
          A practical guide for leaders and practitioners ready to move from AI-curious to AI-first.
        </p>

        {/* Start Here CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          onClick={() => setActiveChapter("start-here")}
          className="inline-flex items-center gap-2 gradient-gold-bg text-white font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer mb-14"
        >
          <BookOpen className="w-4 h-4" />
          Start Here — Find Your Reading Path
        </motion.button>

        {/* Chapter cards */}
        {(() => {
          const chapterIcons = [Zap, Eye, AlertTriangle, Heart, Compass, Rocket, BarChart3, Flag];
          const chapterColors = [
            "from-coral-dim/20 to-transparent",
            "from-chart-2/20 to-transparent",
            "from-destructive/20 to-transparent",
            "from-chart-4/20 to-transparent",
            "from-chart-3/20 to-transparent",
            "from-chart-5/20 to-transparent",
            "from-chart-1/20 to-transparent",
            "from-coral/20 to-transparent",
          ];
          return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
              {chapters.map((ch, i) => {
                const Icon = chapterIcons[i];
                return (
                  <motion.button
                    key={ch.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                    onClick={() => setActiveChapter(ch.id)}
                    className="group relative bg-surface-elevated border border-border rounded-xl p-5 hover:border-gold-dim transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Gradient accent */}
                    <div
                      className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top left, hsl(var(--coral) / 0.1), transparent 60%)`,
                      }}
                    />
                    <div className="flex items-center gap-2 mb-3 relative">
                      <div
                        className="w-7 h-7 rounded-md gradient-gold-bg/20 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))`,
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <span className="font-mono text-xs text-gold-dim tracking-wider">{ch.num}</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">
                      {ch.arcStage}
                    </span>
                    <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-colors flex items-center gap-2 relative">
                      {ch.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                    </h3>
                  </motion.button>
                );
              })}
            </div>
          );
        })()}
      </div>
    </motion.div>
  );

  const renderChapterContent = () => {
    const contentVariants = {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    return (
      <motion.div
        key={activeChapter}
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24"
      >
        {activeChapter === "ch-1" && (
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
              imageSrc={bernardTohImg}
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
            <QuoteBlock quote="I realised AI isn't as daunting as I thought" attribution="SCG Officer, Finance" />
            <DualAudienceBlock
              leaderText="Agencies that move boldly will find their officers more capable, their services more responsive, and their teams more engaged. Those that move cautiously will face the prospect of closing the gap under greater pressure, with less time."
              practitionerText="You already know the pain. The spreadsheets, the copy-paste workflows, the 47-step approval chains. AI doesn't replace your expertise — it removes the friction around it."
            />
          </ChapterContent>
        )}

        {activeChapter === "start-here" && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm tracking-[0.2em] uppercase text-gold-dim">Start Here</span>
              <span className="w-12 h-px bg-gold-dim" />
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Your Reading Path
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 text-foreground">
              How to Navigate This Playbook
            </h2>
            <p className="text-secondary-foreground text-lg leading-relaxed mb-4">
              This document is a modular toolkit designed to be used by different stakeholders at different stages of
              the transformation journey. You do not need to read it cover-to-cover — follow the path relevant to your
              role:
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 italic">
              Click any chapter below to jump straight in.
            </p>

            <div className="space-y-6">
              {[
                {
                  role: "Senior Leadership",
                  tagline: 'The "Why" and "Where"',
                  color: "gradient-gold-bg",
                  labelColor: "text-gold-dim",
                  description:
                    'Your role is to provide the mandate and protected space for your teams. Understand the "Friction Tax" your organisation is paying and the leadership behaviours required to dismantle it.',
                  chapters: [
                    { num: "01", id: "ch-1", title: "Why Now", note: "The strategic case for urgency" },
                    { num: "02", id: "ch-2", title: "The Vision", note: "What AI-First actually means" },
                    { num: "03", id: "ch-3", title: "The Challenge", note: "Barriers you must acknowledge" },
                    { num: "04", id: "ch-4", title: "Cultural Prerequisites", note: "The culture you must model" },
                    { num: "07", id: "ch-7", title: "Proof It Works", note: "Evidence to justify investment" },
                    { num: "08", id: "ch-8", title: "Your Move", note: "Call to action" },
                  ],
                },
                {
                  role: "Transformation Drivers & Sprint Runners",
                  tagline: 'The "How"',
                  color: "bg-accent",
                  labelColor: "text-accent-foreground",
                  description:
                    "You own the engine room. These chapters give you the methodology, templates, and sprint playbook to run your first 90-day cycle.",
                  chapters: [
                    { num: "02", id: "ch-2", title: "The Vision", note: "Align your team on the destination" },
                    { num: "03", id: "ch-3", title: "The Challenge", note: "Anticipate resistance patterns" },
                    { num: "05", id: "ch-5", title: "The Methodology", note: "The discovery & build framework" },
                    { num: "06", id: "ch-6", title: "90-Day Sprint Starter Kit", note: "Your execution playbook" },
                    { num: "07", id: "ch-7", title: "Proof It Works", note: "Case studies to reference" },
                    { num: "08", id: "ch-8", title: "Your Move", note: "Next steps" },
                  ],
                },
                {
                  role: "Officers on the Ground",
                  tagline: 'The "Execution"',
                  color: "bg-muted-foreground",
                  labelColor: "text-muted-foreground",
                  description:
                    'You live with the problems every day — these chapters show you how to turn friction into working solutions, even if you don\'t consider yourself "technical."',
                  chapters: [
                    { num: "05", id: "ch-5", title: "The Methodology", note: "How problems become prototypes" },
                    { num: "06", id: "ch-6", title: "90-Day Sprint Starter Kit", note: "Templates & toolkits" },
                    { num: "07", id: "ch-7", title: "Proof It Works", note: "Peer stories from officers like you" },
                  ],
                },
              ].map((item, i) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="bg-surface-elevated border border-border rounded-lg p-6 hover:border-gold-dim/40 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                    <span className="font-display text-lg text-foreground">{item.role}</span>
                    <span className={`font-mono text-[10px] tracking-[0.15em] uppercase ${item.labelColor}`}>
                      {item.tagline}
                    </span>
                  </div>
                  <p className="text-secondary-foreground text-sm leading-relaxed pl-[22px] mb-4">{item.description}</p>
                  <div className="pl-[22px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.chapters.map((ch) => (
                      <button
                        key={ch.num}
                        onClick={() => setActiveChapter(ch.id)}
                        className="group flex items-start gap-2 text-left p-2 rounded-md hover:bg-background/50 transition-colors cursor-pointer"
                      >
                        <span className="font-mono text-[11px] text-gold-dim mt-0.5 shrink-0">{ch.num}</span>
                        <div>
                          <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                            {ch.title}
                          </span>
                          <span className="block text-[11px] text-muted-foreground leading-tight">{ch.note}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeChapter === "ch-2" && (
          <ChapterContent num="Chapter 02" arc="The Call to Adventure" title="The Vision">
            <p>
              When people talk about AI diffusion in the public service, they often default to a narrow framing: are
              officers using Pair? Are they using Transcribe? These are good tools. But if we stop there, we will have
              missed the point entirely.
            </p>
            <p>
              <span className="gradient-gold font-display text-2xl italic">"AI-First"</span> is about something bigger
              than adopting tools. It is a mindset change. Instead of asking what AI tools to use — ask how can AI
              augment my thinking, speed up my work and help me solve problems.
            </p>
            <div className="bg-surface-elevated border border-border rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, hsl(var(--chart-2) / 0.6), transparent 70%)",
                }}
              />
              <h4 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
                <Eye className="w-6 h-6 text-gold" />
                What Good Looks Like
              </h4>
              <div className="space-y-4">
                {[
                  {
                    header: "Augmented Expertise",
                    text: "Officers using the best available tools to do their core work better, faster, and with more creativity",
                    icon: Zap,
                  },
                  {
                    header: "User Empowerment",
                    text: "Non-technical officers being able to build and deploy simple solutions themselves, without needing to engage IT teams or vendors",
                    icon: UserCheck,
                  },
                  {
                    header: "Compressed Cycle Times",
                    text: "A dramatically reduced cycle time from problem to prototype to deployment — from months or years, to days or hours",
                    icon: Timer,
                  },
                  {
                    header: "Culture of Learning",
                    text: "A culture where experimentation is the norm, and where trying something and failing is treated as learning, not as a lapse",
                    icon: Award,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))",
                      }}
                    >
                      <item.icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.header}</p>
                      <p className="text-secondary-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <QuoteBlock
              quote='Instead of asking "How do I finish this task?", I now ask "Which part of this process can AI automate, accelerate, or improve?"'
              attribution="SCG Officer, Procurement"
            />
            <DualAudienceBlock
              leaderText="AI-First demands a strategic shift: from outsourced innovation to in-house building by domain experts; from process stability to process agility; from IT/procurement gatekeeping to governance as an enabler of speed; and from perfect execution to a culture of experimentation and rapid prototyping."
              practitionerText={
                'Apply the "AI-First" design lens: before starting any task — budget reconciliation, procurement brief, or policy review — ask "What would this look like if AI were a given, not an afterthought?" Identify which steps are purely transactional vs. requiring human judgment, then use AI agents to handle high-volume/low-value toil so you can focus on the final strategic review.'
              }
            />
          </ChapterContent>
        )}

        {activeChapter === "ch-3" && (
          <ChapterContent num="Chapter 03" arc="The Obstacle" title="The Challenge">
            <p>
              Across conversations with various agency teams, the picture is consistent. Agencies want to start
              AI-First. The problem is they don't know how — and the conditions around them make starting harder than it
              should be. The barriers are not technical. They are human, cultural, and structural.
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
              attribution="SCG Officer, People & Org"
            />
            <DualAudienceBlock
              leaderText="None of these constraints are insurmountable. But they require deliberate choices, not passive support. Your role is to make the cost of standing still more visible than the cost of moving."
              practitionerText="Transformation doesn't need permission from everyone — Start with one workflow, one team, and one measurable quick win."
            />
          </ChapterContent>
        )}

        {activeChapter === "ch-4" && (
          <ChapterContent num="Chapter 04" arc="The Foundation" title="Cultural Prerequisites">
            <p>
              True transformation isn't found in a toolset; it is found in the conditions we create. Without the
              cultural foundations in place, no amount of tooling, training, or top-down directives will produce lasting
              change. These seven non-negotiables are the conditions that separate agencies that transform from agencies
              that merely experiment.
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
                  text: "Officers need explicit runway to invest the necessary time — away from BAU work — to experiment and build to reap time savings in the future. Specific BAU deliverables must be deprioritised or deferred during sprint periods. This is not about finding spare time; it's about creating it through deliberate trade-offs.",
                  icon: "⏳",
                },
                {
                  num: "03",
                  title: "Reward Learning and Risk-Taking",
                  text: "Experimentation must be celebrated even when solutions don't scale. Showcase attempts, lessons learned, and creative approaches — not just finished products — to signal that learning is the goal.",
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
                  text: "AI capability is a muscle that strengthens over time. SCG's three sprints over 90 days allowed officers to build confidence progressively — toe-dipping in Sprint 1, real solutions in Sprint 3. After Phase 1, SCG is now building confidence in helping corporate officers build and deploy prototypes for testing rapidly through vibe coding. Learning does not stop.",
                  icon: "🔄",
                },
                {
                  num: "07",
                  title: "Pragmatic Data Classification",
                  text: "Officers default to treating their work as sensitive, creating unnecessary barriers to using commercial AI tools. We must be pragmatic and willing to try commercial AI tools for non-confidential work.",
                  icon: "📊",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-surface-elevated border border-border rounded-lg p-6 flex gap-5 items-start"
                >
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

            <a
              href="#"
              download
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-gold-dim hover:text-gold transition-colors mt-6 group"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Download "The 7 Cultural Non-Negotiables" Infographic (PDF)
            </a>

            <DualAudienceBlock
              leaderText="These seven prerequisites are not optional extras. They are the difference between an initiative that sticks and one that fades. Your role is to create these conditions deliberately — not hope they emerge on their own."
              practitionerText="If you're reading this and recognising what's missing in your agency, you now have a language for it. Share this chapter with your leadership. Change starts when the conditions are right."
            />
          </ChapterContent>
        )}

        {activeChapter === "ch-5" && (
          <ChapterContent num="Chapter 05" arc="The Guide Appears" title="The Methodology">
            <p>
              In July 2025, GovTech's Strategy, Corporate and Governance cluster kicked off "AI-First" — an initiative
              to move from AI being something people read about to something they{" "}
              <em className="italic text-gold-dim">did</em>. The premise was simple: an internal survey revealed SCG
              officers spent close to <span className="text-gold">three days a week</span> on repetitive, low-value
              tasks.
            </p>
            <p>
              We ran three monthly sprints over 90 days, structured so teams had a real problem to tackle, access to AI
              tools and expert support, and protected time to experiment. Leaders — including Bernard himself —
              participated directly.
            </p>
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
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))",
                      }}
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
            <QuoteBlock quote="I need to set aside time on this to save time" attribution="SCG Officer, Strat Plans" />
            <DualAudienceBlock
              leaderText="You don't need to master every sprint ceremony. You need to trust the process, protect the team, and clear the blockers only you can clear. Most importantly — participate yourself."
              practitionerText="Each sprint has a clear input (a real problem), a clear output (a working prototype), and a clear feedback loop (users testing it). If it doesn't have these, it's just a vanity demos. Build for impact"
            />
          </ChapterContent>
        )}

        {activeChapter === "ch-6" && (
          <ChapterContent num="Chapter 06" arc="The Journey" title="How Do I Start">
            <p>
              You've read the case for change. You've seen the cultural prerequisites. Now: how do you actually start?
              This chapter is your agency's starter kit — a practical, 90-day sprint model designed so your agency runs
              it, owns it, and builds the muscle to keep going without external support.
            </p>

            <div className="bg-surface-elevated border border-border rounded-lg p-6 md:p-8 mt-8">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dim mb-2">
                Before You Begin
              </div>
              <h4 className="font-display text-2xl text-foreground mb-4">Your Pre-Sprint Checklist</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Before kicking off Month 1, ensure these five foundations are in place. Without them, the sprint will
                stall.
              </p>
              <div className="space-y-3">
                {[
                  {
                    check: "Leadership commitment",
                    detail: "PS or CE has agreed to protect sprint time and participate visibly — not just endorse.",
                  },
                  {
                    check: "Nominated AI Lead",
                    detail: "One DD-level (or above) who owns internal logistics and champions the initiative.",
                  },
                  {
                    check: "Identified officers to participate",
                    detail:
                      "A cross-functional cohort from corporate functions — HR, Finance, Procurement, Comms, Ops.",
                  },
                  {
                    check: "BAU trade-offs agreed",
                    detail:
                      "Specific deliverables deprioritised or deferred during sprint weeks. This is non-negotiable.",
                  },
                  {
                    check: "GovTech support confirmed ",
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
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dim mb-4">
                The 90-Day Sprint
              </div>
              <h4 className="font-display text-2xl text-foreground mb-2">Your Three-Month Roadmap</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Each month has a clear purpose, defined activities, and a tangible output.
              </p>
            </div>

            <PilotTimeline />
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
              attribution="SCG Officer, Org Excellence"
            />
            <DualAudienceBlock
              leaderText="Your decision points come at phase gates. Discover reveals the opportunity size. Build proves value. Showcase is your proof to the rest of government. What your agency builds, owns, and demonstrates becomes the reference that moves others from waiting to acting."
              practitionerText="You'll be hands-on from Day 1. Expect to pair with AI engineers, challenge assumptions, and prototype solutions using your real data and real constraints. The starter kit gives you everything you need — the only missing ingredient is your willingness to begin."
            />
          </ChapterContent>
        )}

        {activeChapter === "ch-7" && (
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
                team="Finance Officers"
                problem="Consolidating investment performance data from 14 disparate sources took 12 hours of manual, error-prone work monthly."
                solution="AI-powered integration that consolidates all 14 sources and produces real-time insights ready for the Board — reducing the process from 12 hours to 1 hour."
                insight="The people who built the solution were the same people who suffered through the old process every month. That is not a coincidence — it is the point."
              />
            </div>
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
              attribution="SCG Officer, People & Org"
            />
            <QuoteBlock
              quote="The person best placed to build a solution to a problem is almost always the person who lives with that problem every day. We have historically outsourced that knowledge to vendors, to IT teams, to project managers, and in doing so consistently produced solutions that are technically functional but operationally imperfect."
              attribution="Bernard Toh, DCE Strategy Corporate Governance, GovTech"
            />
            <QuoteBlock
              quote="Everyone can build AI solutions — it's about fundamentally reimagining how work gets done"
              attribution="SCG Officer, Finance"
            />
            <DualAudienceBlock
              leaderText="These aren't innovation theatre. Officers who had told themselves they were 'not technical' built working prototypes. The pace of prototyping compressed from months to days."
              practitionerText="Every solution started exactly where you are now — a team with a problem, a willingness to experiment, and a sprint to prove it out."
            />
          </ChapterContent>
        )}

        {activeChapter === "ch-8" && (
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
                What We Need From You
              </h4>
              <p className="text-sm text-muted-foreground mb-6">
                The pilot's success isn't about tools or frameworks. It's about cultural readiness.
              </p>
              <div className="space-y-5">
                {[
                  {
                    num: "01",
                    title: "Participate — don't just endorse.",
                    detail:
                      "Show up for at least one sprint session. Let officers see you learning alongside them. When the PS is an active participant, it creates the psychological permission for everyone else to experiment in a way no formal directive ever could.",
                    icon: Eye,
                  },
                  {
                    num: "02",
                    title: "Protect the time.",
                    detail:
                      "Experimentation always dies when it competes with day-to-day work and loses. We need a firm commitment to protect the time for participating officers. This is a leadership decision.",
                    icon: ShieldCheck,
                  },
                  {
                    num: "03",
                    title: "Nominate an AI Lead.",
                    detail:
                      "Appoint one person — DD-level or above — to be the internal coordination point. This person isn't doing GovTech's work; they're building the internal ownership that will last.",
                    icon: UserCheck,
                  },
                  {
                    num: "04",
                    title: "Give your officers permission to fail.",
                    detail:
                      "For cultural shift to happen, officers must feel safe trying things that might not work. That safety has to come from the top. A visible signal that an honest attempt is valued is more powerful than any workshop.",
                    icon: Heart,
                  },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 items-start">
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--coral) / 0.15), hsl(var(--coral) / 0.05))",
                      }}
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
              attribution="Bernard Toh, DCE Strategy Corporate Governance, GovTech"
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
              <div className="mt-16 font-mono text-xs text-muted-foreground tracking-wider">
                Built with conviction. Shared with purpose.
              </div>
            </div>
          </ChapterContent>
        )}

        {/* Chapter navigation at bottom */}
        {activeChapter && activeChapter !== "start-here" && (
          <ChapterNav activeChapter={activeChapter} onSelect={setActiveChapter} />
        )}
      </motion.div>
    );
  };

  return (
    <div id="playbook-root" className="min-h-screen bg-background flex">
      <ChapterSidebar
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <main className="flex-1 min-h-screen relative overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeChapter === null ? renderLanding() : renderChapterContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};

// Simple chapter header wrapper
function ChapterContent({
  num,
  arc,
  title,
  children,
}: {
  num: string;
  arc: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-sm tracking-[0.2em] uppercase text-gold-dim">{num}</span>
        <span className="w-12 h-px bg-gold-dim" />
        <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">{arc}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-10 text-foreground">{title}</h2>
      <div className="space-y-6 text-lg leading-relaxed text-secondary-foreground font-body">{children}</div>
    </div>
  );
}

// Bottom chapter navigation
function ChapterNav({ activeChapter, onSelect }: { activeChapter: string; onSelect: (id: string) => void }) {
  const idx = chapters.findIndex((ch) => ch.id === activeChapter);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
      {prev ? (
        <button
          onClick={() => {
            onSelect(prev.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <div className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">{prev.num}</div>
            <div className="font-display text-sm">{prev.title}</div>
          </div>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => {
            onSelect(next.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group text-right"
        >
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">{next.num}</div>
            <div className="font-display text-sm">{next.title}</div>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Index;
