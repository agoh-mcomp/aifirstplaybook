import { motion } from "framer-motion";
import { chapters } from "@/components/ChapterSidebar";
import { useLoveCount } from "@/hooks/use-love-count";
import {
  BookOpen, ArrowRight, Zap, Eye, AlertTriangle, Heart, Compass, Rocket, BarChart3, Flag,
} from "lucide-react";

interface LandingPageProps {
  onSelectChapter: (id: string) => void;
}

const LandingPage = ({ onSelectChapter }: LandingPageProps) => {
  const loveCount = useLoveCount();
  const chapterIcons = [Zap, Eye, AlertTriangle, Heart, Compass, Rocket, BarChart3, Flag];

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8"
    >
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

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          onClick={() => onSelectChapter("start-here")}
          className="inline-flex items-center gap-2 gradient-gold-bg text-white font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer mb-6"
        >
          <BookOpen className="w-4 h-4" />
          Start Here — Find Your Reading Path
        </motion.button>

        {loveCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-1.5 mb-14 text-muted-foreground"
          >
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span className="font-mono text-xs tracking-wide">
              Loved by {loveCount.toLocaleString()} {loveCount === 1 ? "reader" : "readers"}
            </span>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
          {chapters.map((ch, i) => {
            const Icon = chapterIcons[i];
            return (
              <motion.button
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                onClick={() => onSelectChapter(ch.id)}
                className="group relative bg-surface-elevated border border-border rounded-xl p-5 hover:border-gold-dim transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, hsl(var(--coral) / 0.1), transparent 60%)`,
                  }}
                />
                <div className="flex items-center gap-2 mb-3 relative">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center"
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
      </div>
    </motion.div>
  );
};

export default LandingPage;
