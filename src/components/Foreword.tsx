import { motion } from "framer-motion";

const Foreword = () => {
  return (
    <div>
      {/* Title */}
      <div className="mb-12">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold-dim">Foreword</span>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mt-3 leading-tight">
          A Message to Leaders
        </h1>
        <div className="w-16 h-px bg-gold-dim mt-6" />
      </div>

      {/* Letter content */}
      <div className="space-y-6 text-lg leading-relaxed text-secondary-foreground font-body">
        <p className="italic text-foreground font-display text-xl">To the leaders reading this,</p>

        <p>
          Let me be honest — when we started our AI-First journey at GovTech's Strategy, Corporate &amp; Governance
          Group, we didn't have all the answers. We had conviction, curiosity, and a willingness to look a little
          foolish along the way.
        </p>

        <p>
          What happened next surprised even us. Officers who had never touched an AI tool were building working
          prototypes in weeks. Teams that used to wait months for vendor solutions were solving their own problems in
          days. The energy was unlike anything I'd seen in my years in public service.
        </p>

        <p>
          But here's what I really want you to know: the hardest part was never the technology. It was letting go — of
          old habits, of the need for everything to be perfect before we tried, of the instinct to delegate "innovation"
          to someone else's team.
        </p>

        <p>
          This playbook is everything we learned, written down so you don't have to start from scratch. It's not theory.
          It's what actually worked — and what didn't — inside a real government organisation with all the usual
          constraints you know well.
        </p>

        <p className="text-foreground font-medium">
          If I could ask you for just four things:
        </p>

        <div className="space-y-5 pl-1">
          {[
            {
              bold: "Get your hands dirty.",
              text: "Don't just champion AI from the townhall stage. Sit with your officers. Try the tools yourself. They need to see you learning, not just leading.",
            },
            {
              bold: "Make room.",
              text: "Transformation doesn't happen \"on top of\" everything else. Your people need time and space. Only you can create that.",
            },
            {
              bold: "Let people stumble.",
              text: "The first experiment might not work. That's fine. What kills transformation isn't failure — it's the fear of it.",
            },
            {
              bold: "Start now.",
              text: "Not next quarter. Not after the next reorganisation. Now. Every week you wait is a week your officers spend on work that AI could already be doing for them.",
            },
          ].map((item) => (
            <motion.div
              key={item.bold}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-3 items-start"
            >
              <div className="w-1 h-full min-h-[1.5rem] rounded-full bg-gold-dim/40 shrink-0 mt-1" />
              <p>
                <span className="text-foreground font-semibold">{item.bold}</span>{" "}
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <p>
          We've tested this. It works. GovTech is ready to walk alongside your agency — but it begins with you deciding
          to take the first step.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl md:text-3xl text-foreground italic mt-10"
        >
          The journey starts with a single step. The time to begin is now.
        </motion.p>

        {/* Signature */}
        <div className="pt-6 border-t border-border mt-10">
          <div className="font-display text-base text-foreground">Bernard Toh</div>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground mt-1">
            Deputy Chief Executive, Strategy, Corporate &amp; Governance
          </div>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
            Government Technology Agency of Singapore
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foreword;
