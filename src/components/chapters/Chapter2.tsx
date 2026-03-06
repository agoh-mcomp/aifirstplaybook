import { ChapterContent } from "./ChapterContent";
import QuoteBlock from "@/components/QuoteBlock";
import DualAudienceBlock from "@/components/DualAudienceBlock";
import { Zap, Eye, UserCheck, Timer, Award } from "lucide-react";

const Chapter2 = () => (
  <ChapterContent num="Chapter 02" arc="The Call to Adventure" title="The Vision">
    <p>
      When people talk about AI diffusion in the public service, they often default to a narrow framing: are officers
      using Pair? Are they using Transcribe? These are good tools. But if we stop there, we will have missed the point
      entirely.
    </p>
    <p>
      <span className="gradient-gold font-display text-2xl italic">"AI-First"</span> is something much bigger. It is a
      mindset change. Instead of asking what AI tools can I use ? Ask can AI augment my thinking, speed up my work and
      help me solve problems.
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
      attribution="Procurement Officer, GovTech"
    />
    <DualAudienceBlock
      leaderText="AI-First demands a strategic shift: from outsourced innovation to in-house building by domain experts; from process stability to process agility; from IT/procurement gatekeeping to governance as an enabler of speed; and from perfect execution to a culture of experimentation and rapid prototyping."
      practitionerText={
        'Apply the "AI-First" design lens: before starting any task — budget reconciliation, procurement brief, or policy review - ask "What would this look like if AI were a given, not an afterthought?" Identify which steps are purely transactional vs. requiring human judgment, then use AI agents to handle high-volume/low-value toil so you can focus on the final strategic review.'
      }
    />
  </ChapterContent>
);

export default Chapter2;
