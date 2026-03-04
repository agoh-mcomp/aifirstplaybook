import { motion } from "framer-motion";

interface Chapter {
  id: string;
  number: string;
  arcStage: string;
  title: string;
}

const chapters: Chapter[] = [
  { id: "ch-1", number: "01", arcStage: "The World Before", title: "Why Now" },
  { id: "ch-2", number: "02", arcStage: "The Call to Adventure", title: "The Vision" },
  { id: "ch-3", number: "03", arcStage: "The Obstacle", title: "The Challenge" },
  { id: "ch-4", number: "04", arcStage: "The Foundation", title: "Cultural Prerequisites" },
  { id: "ch-5", number: "05", arcStage: "The Guide Appears", title: "The Methodology" },
  { id: "ch-6", number: "06", arcStage: "The Journey", title: "How Do I Start?" },
  { id: "ch-7", number: "07", arcStage: "Proof It Works", title: "What We've Seen" },
  { id: "ch-8", number: "08", arcStage: "The New World", title: "Your Move" },
];

const TableOfContents = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold-dim">
              The Journey
            </span>
            <span className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {chapters.map((ch, i) => (
              <motion.button
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => scrollTo(ch.id)}
                className="group text-left bg-surface-elevated border border-border rounded-lg p-4 hover:border-gold-dim transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-gold-dim tracking-wider">
                    {ch.number}
                  </span>
                  <span className="w-4 h-px bg-border group-hover:bg-gold-dim transition-colors" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground truncate">
                    {ch.arcStage}
                  </span>
                </div>
                <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-colors">
                  {ch.title}
                </h3>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TableOfContents;
