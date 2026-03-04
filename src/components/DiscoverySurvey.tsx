import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ClipboardList } from "lucide-react";

const surveyQuestions = [
  {
    id: "Q1",
    question: "SCG Function – Which group are you from?",
    type: "free-text" as const,
  },
  {
    id: "Q2",
    question: "Top 3 Time-Intensive Repetitive Tasks: Select the top 3 tasks that consume MOST time in your typical work week.",
    type: "multi-select" as const,
    options: [
      "Admin (scheduling, coordination, staffing meeting etc)",
      "Analyse data and/or Generate reports (weekly, monthly, quarterly)",
      "Budget planning and financial analysis",
      "Compliance monitoring and auditing",
      "Document Review (e.g. Policy, Legal and regulatory matters)",
      "Email correspondence (respond to emails)",
      "Meeting preparation, attendance and follow-up action",
      "Screen, Shortlist, Interview and Selection (e.g. for recruitment)",
      "Performance monitoring and evaluation",
      "Processing Applications (e.g. data request, exemptions, waivers)",
      "Procurement and vendor management (e.g. AOR, evaluation)",
      "Stakeholder Engagement and Comms (internal/external users)",
      "Risk evaluation and impact assessment",
      "Others (Please specify)",
    ],
  },
  {
    id: "Q2a",
    question: "For the identified tasks above, estimate what percentage of your time (in a week) you spend working on them.",
    type: "scale" as const,
    note: "From 1% – 100%",
  },
  {
    id: "Q2b",
    question: "Do you use automation/AI tools to perform the identified time-consuming tasks above?",
    type: "single-select" as const,
    options: ["Yes", "No"],
    note: "If you answered 'Yes', please specify what automation/AI tools and the task that it is currently used for.",
  },
  {
    id: "Q3",
    question: "AI Tools Familiar With: Do you use any AI tools for your work tasks?",
    type: "multi-select" as const,
    options: [
      "AIBots",
      "Pair Chat",
      "Pair Search",
      "Transcribe",
      "Other GenAI Tools (ChatGPT, Claude, Deepseek, etc.)",
      "No – I currently do not use AI tools for my work",
    ],
  },
  {
    id: "Q4",
    question: "AI Tool Usage: How frequently do you currently use AI tools in your work?",
    type: "single-select" as const,
    options: [
      "Never",
      "Occasionally (3–5 times per month)",
      "Regularly (3–5 times per week)",
      "Frequently (Daily)",
    ],
  },
  {
    id: "Q5",
    question: "Current Proficiency Level: How would you rate your current proficiency level with AI tools?",
    type: "single-select" as const,
    options: [
      "Beginner – I've never used GenAI tools or only tried them once",
      "Basic – I've used them for simple tasks like writing or summarising",
      "Confident – I can craft decent prompts and use GenAI for work regularly",
      "Advanced – I understand prompting strategies and optimise outputs",
      "Expert – I experiment with different models, tools and configurations",
    ],
  },
  {
    id: "Q6",
    question: "Current Challenges: When using AI tools for work, what are your biggest challenges? (Select all that apply)",
    type: "multi-select" as const,
    options: [
      "Concerns about accuracy and reliability",
      "Don't know how to write effective prompts",
      "Don't see value for my specific role",
      "Inconsistent quality across similar requests",
      "No time to learn new tools",
      "Outputs don't match required professional tone",
      "Outputs need extensive editing and fact-checking",
      "Privacy and data security concerns",
      "Results lack proper structure or formatting",
      "Takes many attempts to get usable results",
      "Technical difficulties or barriers",
      "Others (Please specify)",
    ],
  },
  {
    id: "Q7",
    question: "Skillset Needs: Which AI prompt engineering skills would help you most in your daily work? (Select up to 3)",
    type: "multi-select" as const,
    options: [
      "Creating reusable prompt templates for repetitive tasks",
      "Generating charts or visuals from structured information",
      "Getting AI to match government/professional tone and style",
      "Multi-step prompting for complex tasks",
      "Prompting AI to draft presentation slides or key talking points",
      "Quality checking and fact-verification methods",
      "Structuring prompts to get properly formatted outputs",
      "Techniques to refine prompts when first attempts fail",
      "Understanding which AI tool works best for different tasks",
      "Using AI to help analyse and interpret data (e.g. CSVs, reports, trends)",
      "Writing clear, specific prompts that get better first results",
      "Others (Please specify)",
    ],
  },
  {
    id: "Q8",
    question: "Future Possibilities: Which areas of GT's corporate functions do you think AI can drive impact and effectiveness?",
    type: "free-text" as const,
  },
];

const typeBadge = {
  "free-text": "Free Text",
  "single-select": "Single Select",
  "multi-select": "Multi-Select",
  scale: "Scale",
};

const DiscoverySurvey = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 bg-surface-elevated border border-border rounded-lg p-4 transition-colors hover:border-gold/40 text-left group"
      >
        <div className="shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <ClipboardList className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-dim">Survey Preview</span>
          <h5 className="font-display text-base text-foreground leading-tight">SCG AI-First Discovery Survey Questions</h5>
          <p className="text-xs text-muted-foreground mt-0.5">8 questions covering function, tasks, AI familiarity, challenges & skills</p>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-4 pl-2 border-l-2 border-gold/20">
              {surveyQuestions.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-surface-elevated/50 border border-border/60 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded">
                      {q.id}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {typeBadge[q.type]}
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium leading-relaxed">{q.question}</p>
                  
                  {q.options && (
                    <ul className="mt-3 space-y-1.5">
                      {q.options.map((opt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gold/40" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {q.note && (
                    <p className="mt-2 text-xs text-muted-foreground/80 italic">{q.note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverySurvey;
