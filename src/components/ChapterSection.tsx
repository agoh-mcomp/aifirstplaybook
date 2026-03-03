import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChapterSectionProps {
  chapterNumber: string;
  arcStage: string;
  title: string;
  children: ReactNode;
  isHero?: boolean;
}

const ChapterSection = ({ chapterNumber, arcStage, title, children, isHero }: ChapterSectionProps) => {
  return (
    <section className="relative py-24 md:py-32">
      {!isHero && <div className="chapter-divider w-full mb-20" />}
      
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Chapter label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-sm tracking-[0.2em] uppercase text-gold-dim">
              {chapterNumber}
            </span>
            <span className="w-12 h-px bg-gold-dim" />
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {arcStage}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-10 text-foreground">
            {title}
          </h2>

          {/* Content */}
          <div className="space-y-6 text-lg leading-relaxed text-secondary-foreground font-body">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChapterSection;
