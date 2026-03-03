import { motion } from "framer-motion";

const voices = [
  {
    quote: "I can do it myself instead of thinking I need to rely on tech teams",
    dept: "People & Org",
  },
  {
    quote: "It is easy to learn! The toughest part is breaking that inertia",
    dept: "People & Org",
  },
  {
    quote: "You do not need coding skills to use AI for your work, just plain English, curiosity, and a willingness to learn and adjust along the way",
    dept: "Org Excellence",
  },
  {
    quote: 'Instead of asking "How do I finish this task?", I now ask "Which part of this process can AI automate, accelerate, or improve?"',
    dept: "Procurement",
  },
  {
    quote: "I realised AI isn't as daunting as I thought",
    dept: "Finance",
  },
  {
    quote: "Everyone can build AI solutions — it's about fundamentally reimagining how work gets done",
    dept: "Finance",
  },
  {
    quote: "I need to set aside time on this to save time",
    dept: "Strat Plans",
  },
];

const OfficerVoices = () => {
  return (
    <div className="mt-12 mb-4">
      <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-8">
        In Their Own Words — SCG Officers
      </h4>
      <div className="grid sm:grid-cols-2 gap-4">
        {voices.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="relative bg-surface-elevated border border-border rounded-lg p-5 flex flex-col justify-between"
          >
            <p className="font-display text-base md:text-lg italic leading-relaxed text-foreground mb-4">
              "{v.quote}"
            </p>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-gold-dim">
              — {v.dept}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OfficerVoices;
