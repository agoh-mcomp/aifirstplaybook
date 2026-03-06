import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ClipboardList } from "lucide-react";

type QuestionType = "free-text" | "single-select" | "multi-select" | "scale" | "slider" | "matrix";

interface SurveyQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  note?: string;
  matrixRows?: string[];
  matrixCols?: string[];
}

interface SurveySection {
  title: string;
  count: number;
  questions: SurveyQuestion[];
}

const surveySections: SurveySection[] = [
  {
    title: "Section 1: About You",
    count: 4,
    questions: [
      { id: "Q1", question: "What is your email address?", type: "free-text" },
      {
        id: "Q2",
        question: "Which SCG/Corporate Division are you from?",
        type: "single-select",
        options: [
          "Comms & Marketing",
          "CIO Office",
          "Digital Governance",
          "Finance",
          "Internal Audit",
          "Legal",
          "Organisational Excellence",
          "Partnerships and Engagement",
          "People & Organisation",
          "Procurement",
          "Strategy Planning & Transformation",
          "Other",
        ],
      },
      {
        id: "Q3",
        question: "Which AI-First activities did you participate in?",
        type: "multi-select",
        note: "Include team name where applicable. Check all that apply.",
        options: [
          "Sprint 1 (Aug)",
          "Sprint 2 (Sep)",
          "Sprint 3 (Oct)",
          "Weekly AI Clinics (office hours)",
          "Lorong AI Workshop (Aug)",
          "Changi Airport Experiential Visit (Sep)",
          "Manus AI hands-on workshop (Oct)",
          "AI-First CLW Showcase (5 Nov)",
          "AI-First Discover Showcase (14 Nov)",
          "I didn't participate",
          "Other",
        ],
      },
      {
        id: "Q3a",
        question:
          "How many hours on average did you spend on AI-First activities (sprints, workshop, clinics) per week?",
        type: "single-select",
        options: [
          "1-5 hours per week",
          "5-10 hours per week",
          "10-20 hours per week",
          "20-40 hours per week",
          "> 40 hours per week",
          "Did not spend time on AI-First activities",
        ],
      },
    ],
  },
  {
    title: "Section 2: Mindset Shifts",
    count: 4,
    questions: [
      {
        id: "Q4",
        question:
          "Before AI-First, how confident were you that you could build an AI solution directly (e.g., using AIBots, Pair or vibe coding)?",
        type: "scale",
        options: [
          "1 - Not confident at all",
          "2 - Slightly confident",
          "3 - Moderately confident",
          "4 - Confident",
          "5 - Very confident",
        ],
      },
      {
        id: "Q5",
        question: "NOW, how confident are you that you can build an AI solution directly?",
        type: "scale",
        options: [
          "1 - Not confident at all",
          "2 - Slightly confident",
          "3 - Moderately confident",
          "4 - Confident",
          "5 - Very confident",
        ],
      },
      {
        id: "Q6",
        question: "What was your biggest mindset breakthrough during the AI-First journey?",
        type: "free-text",
        note: 'Example: "I realized AI isn\'t difficult—it\'s a learnable skill" or "I now see myself as someone who can build solutions"',
      },
      {
        id: "Q7",
        question: "How has AI-First transformed the way you think, work and solve problems at work?",
        type: "scale",
        options: [
          "1 - No change — I think and work the same way as before",
          "2 - Low transformation — Small changes, beginning to shift my approach",
          "3 - Moderate transformation — Noticeable changes in how I work",
          "4 - High transformation — Major shift in my thinking and problem-solving",
          "5 - Significant transformation — Fundamentally changed how I approach work using AI-First approach",
        ],
      },
    ],
  },
  {
    title: "Section 3: Building Solutions in Days Not Months",
    count: 3,
    questions: [
      {
        id: "Q8",
        question: "Before AI-First, how long would it have taken you or your team to build a solution or prototype?",
        type: "scale",
        options: [
          "1 - Wouldn't know how — No idea where to start",
          "2 - Months+ — Major project, 3+ months",
          "3 - Weeks — Significant effort, 2-4 weeks",
          "4 - Days — Quick turnaround, under a week",
          "5 - Hours — Same day capability",
        ],
      },
      {
        id: "Q9",
        question: "NOW, how long does it take you or your team to build an AI solution or prototype?",
        type: "scale",
        options: [
          "1 - Wouldn't know how — No idea where to start",
          "2 - Months+ — Major project, 3+ months",
          "3 - Weeks — Significant effort, 2-4 weeks",
          "4 - Days — Quick turnaround, under a week",
          "5 - Hours — Same day capability",
        ],
      },
      {
        id: "Q9a",
        question: "Have you or your team built and deployed AI solutions?",
        type: "single-select",
        options: [
          "Yes, multiple solutions actively used",
          "Yes, one solution actively used",
          "Built prototype, not yet deployed",
          "Still exploring",
          "Not yet",
        ],
      },
    ],
  },
  {
    title: "Section 4: AI Augments Human Intelligence",
    count: 3,
    questions: [
      {
        id: "Q10",
        question:
          "What are the top 3 Time-Intensive Repetitive Tasks that consume MOST time in your typical work week?",
        type: "multi-select",
        note: "Select up to 3.",
        options: [
          "Admin (scheduling, coordination, staffing meeting etc)",
          "Analyse data and/or Generate reports (weekly, monthly, quarterly)",
          "Budget planning and financial analysis",
          "Compliance monitoring and auditing",
          "Document Review (e.g., Policy, Legal and regulatory matters)",
          "Email correspondence (respond to emails)",
          "Meeting preparation, attendance and follow-up action",
          "Screen, Shortlist, Interview and Selection (e.g., for recruitment)",
          "Performance monitoring and evaluation",
          "Processing Applications (e.g., data request, exemptions, waivers)",
          "Procurement and vendor management (e.g., AOR, evaluation)",
          "Stakeholder Engagement and Comms (internal/external users)",
          "Risk evaluation and impact assessment",
          "Others (please specify)",
        ],
      },
      {
        id: "Q11",
        question: "Time spent on mundane, repetitive and time-consuming work:",
        type: "slider",
        note: "Before AI-First: 65% of my time → NOW, after embracing AI tools and solutions: 10% of my time",
      },
      {
        id: "Q12",
        question: "How has AI-First initiative changed the way you work?",
        type: "multi-select",
        note: "Check all that apply. Grouped by category.",
        options: [
          "Productivity: I spend less time on repetitive tasks",
          "I complete work faster",
          "Productivity: I can handle higher volume of work",
          "Productivity: I have more time for strategic/creative work",
          "Work Quality: I produce higher quality outputs",
          "Work Quality: I can tackle problems I couldn't before",
          "Work Quality: I make better-informed decisions",
          "Work Quality: I can analyze data more effectively",
          "Thinking: I approach problems differently",
          "Thinking: I experiment more and take more risks",
          "Thinking: I think more creatively about solutions",
          "Thinking: I question traditional ways of working",
          "Collaboration: I collaborate differently with my team",
          "Collaboration: I learn new skills faster",
          "Collaboration: I share knowledge more effectively",
          "Collaboration: I work across divisions more easily",
          "Confidence: I feel more confident in my abilities",
          "Confidence: I'm more willing to try new things",
          "Confidence: I see myself as a builder, not just a user",
          "Confidence: I feel more empowered in my role",
          "Workflow: I've redesigned my workflows",
          "Workflow: I use different tools now",
          "Workflow: I've automated parts of my work",
          "Workflow: I've built solutions for my team",
          "Impact: I find my work more satisfying",
          "Impact: I feel less stressed by administrative workload",
          "Impact: I provide better service to stakeholders",
          "Impact: I have learnt new skills I can apply in my work",
          "No significant change for me yet",
          "Other",
        ],
      },
    ],
  },
  {
    title: "Section 5: What Worked & Greatest Impact",
    count: 3,
    questions: [
      {
        id: "Q13",
        question: "How effective was the AI-First programme to build AI capability in SCG?",
        type: "scale",
        note: "3 sprints, 3 workshops, AI Clinics, Closers and Comms and Engagement",
        options: [
          "1 - Not effective — Didn't help me learn or build",
          "2 - Somewhat effective — Some value but limited impact",
          "3 - Moderately effective — Good structure, helped me progress",
          "4 - Highly effective — Strong impact on my learning and building",
          "5 - Extremely effective — Essential to my transformation",
          "N/A — I didn't participate in AI-First activities",
        ],
      },
      {
        id: "Q13a",
        question: "Rate each AI-First format you experienced:",
        type: "matrix",
        note: "1 = Not effective, 5 = Extremely effective",
        matrixRows: [
          "Monthly Sprints",
          "Weekly AI Clinics (office hours)",
          "Workshops (Lorong AI and Manus)",
          "Experiential Visit (Changi Airport)",
          "Showcases (CLW, Discover)",
          "Comms and Engagement (AI-First Website, Closers/Townhall, EDMs, Slack Channel)",
        ],
        matrixCols: ["1", "2", "3", "4", "5", "N/A"],
      },
      {
        id: "Q14",
        question: "What were your main pain points or challenges during AI-First?",
        type: "multi-select",
        note: "Choose your top THREE blockers.",
        options: [
          "Time constraints — Too busy with BAU work",
          "Technical complexity — Steep learning curve",
          "Unclear use cases — Difficulty identifying problems to solve",
          "Tool limitations — AI tools didn't meet my needs",
          "Lack of support — Needed more guidance",
          "Team coordination — Difficulty working with sprint team",
          "Solution sustainability — Built something but can't scale it",
          "Data access — Couldn't get the data I needed",
          "Approval/governance — Unclear policies or slow approvals",
          "Integration challenges — AI doesn't work with existing systems",
          "Other",
          "I didn't face significant challenges",
        ],
      },
    ],
  },
  {
    title: "Section 6: Phase 2 Priorities",
    count: 3,
    questions: [
      {
        id: "Q15",
        question: "What support do you need most now after AI-First Phase 1 sprints are completed?",
        type: "multi-select",
        note: "Choose your top THREE to prioritize.",
        options: [
          "Help scaling solutions to teams/divisions",
          "Expert help for troubleshooting",
          "On-going AI training and workshops",
          "Organise another 90-day challenge (sprints)",
          "Establish SCG AI Community of Practice",
          "Protected time to experiment",
          "Better tool/platform access",
          "Use case library and repository",
          "Leadership buy-in",
          "Clearer AI policies and governance",
          "Cross-division collaboration",
          "Templates, playbooks and frameworks",
          "Other",
        ],
      },
      {
        id: "Q16",
        question: "What are your biggest blockers or barriers in continuing to use AI tools?",
        type: "multi-select",
        note: "Choose your top THREE to prioritize.",
        options: [
          "Time — Too busy to experiment or learn",
          "Skills gaps — Technical knowledge or prompting skills",
          "Unclear use cases — Don't know what problems AI can solve for me",
          "Tool access — Limited access to platforms or features",
          "Leadership support — Lack of organizational buy-in",
          "Scaling challenges — Can't move from POC to POV and Scale",
          "Ongoing support — Need ongoing support and help",
          "Data security concerns — Worried about security and confidentiality",
          "Trust/reliability — Concerned about AI accuracy",
          "Integration issues — Tools don't work with existing systems",
          "Policy/governance — Unclear guidelines or approval processes",
          "Other",
          "I don't have significant barriers",
        ],
      },
      {
        id: "Q17",
        question: "How can SCG be an exemplary AI adoption model for other public sector corporate functions?",
        type: "free-text",
        note: 'Think bold: What would make other agencies say "We want what SCG has"?',
      },
    ],
  },
];

const typeBadge: Record<QuestionType, string> = {
  "free-text": "Free Text",
  "single-select": "Single Select",
  "multi-select": "Multi-Select",
  scale: "Scale",
  slider: "Slider",
  matrix: "Matrix",
};

const PostSprintSurvey = () => {
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
          <h5 className="font-display text-base text-foreground leading-tight">Post-Sprint Survey Questions</h5>
          <p className="text-xs text-muted-foreground mt-0.5">
            6 sections · 20 questions — mindset shifts, building capability, impact & Phase 2 priorities
          </p>
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
            <div className="mt-3 space-y-6 pl-2 border-l-2 border-gold/20">
              {/* Intro */}
              <div className="bg-surface-elevated/50 border border-border/60 rounded-lg p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Over the past months, you've been part of AI-First—sprints, workshops, clinics, and showcases. This
                  survey captures what worked, what transformed, and where we go next. Your insights shape Phase 2.
                </p>
                <p className="text-xs text-gold mt-2 font-mono">⏱ Estimated time: 5 minutes</p>
              </div>

              {surveySections.map((section, sIdx) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded">
                      {section.title}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{section.count} questions</span>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((q, idx) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sIdx * 4 + idx) * 0.02 }}
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

                        {q.note && <p className="mt-1.5 text-xs text-muted-foreground/80 italic">{q.note}</p>}

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

                        {q.type === "matrix" && q.matrixRows && q.matrixCols && (
                          <div className="mt-3 overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr>
                                  <th className="text-left text-muted-foreground font-normal pb-2 pr-4">Format</th>
                                  {q.matrixCols.map((col) => (
                                    <th
                                      key={col}
                                      className="text-center text-muted-foreground font-normal pb-2 px-2 min-w-[32px]"
                                    >
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {q.matrixRows.map((row) => (
                                  <tr key={row} className="border-t border-border/40">
                                    <td className="py-2 pr-4 text-muted-foreground">{row}</td>
                                    {q.matrixCols!.map((col) => (
                                      <td key={col} className="text-center py-2 px-2">
                                        <span className="inline-block w-3 h-3 rounded-full border border-gold/30" />
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostSprintSurvey;
