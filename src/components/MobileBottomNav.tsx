import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, Sun, Moon, BookOpen, X } from "lucide-react";
import { chapters, type ChapterMeta } from "./ChapterSidebar";
import PaletteSwitcher from "./PaletteSwitcher";

interface MobileBottomNavProps {
  activeChapter: string | null;
  onSelectChapter: (id: string | null) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  scrollProgress: number;
}

const MobileBottomNav = ({ activeChapter, onSelectChapter, isDark, onToggleTheme, scrollProgress }: MobileBottomNavProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeIndex = chapters.findIndex((ch) => ch.id === activeChapter);
  const currentChapter = chapters[activeIndex];

  const goToPrev = () => {
    if (activeIndex > 0) onSelectChapter(chapters[activeIndex - 1].id);
  };

  const goToNext = () => {
    if (activeIndex < chapters.length - 1) onSelectChapter(chapters[activeIndex + 1].id);
  };

  if (!activeChapter || activeChapter === "start-here") return null;

  return (
    <>
      {/* Bottom nav bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      >
        {/* Progress bar */}
        <div className="h-0.5 bg-border">
          <motion.div
            className="h-full gradient-gold-bg"
            animate={{ width: `${Math.max(scrollProgress * 100, 0)}%` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        </div>

        <div className="bg-card/95 backdrop-blur-xl border-t border-border px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            {/* Prev button */}
            <button
              onClick={goToPrev}
              disabled={activeIndex <= 0}
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground active:bg-secondary transition-colors disabled:opacity-30 touch-manipulation"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Center: chapter info + drawer trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg hover:bg-secondary/50 active:bg-secondary transition-colors touch-manipulation"
            >
              <span className="font-mono text-[10px] tracking-wider text-gold-dim">{currentChapter?.num}</span>
              <span className="font-display text-sm text-foreground truncate">{currentChapter?.title}</span>
              <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </button>

            {/* Next button */}
            <button
              onClick={goToNext}
              disabled={activeIndex >= chapters.length - 1}
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground active:bg-secondary transition-colors disabled:opacity-30 touch-manipulation"
              aria-label="Next chapter"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Chapter dots */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5 pb-[env(safe-area-inset-bottom)]">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className="touch-manipulation p-0.5"
                aria-label={`Go to ${ch.title}`}
              >
                <div
                  className={`rounded-full transition-all duration-200 ${
                    i === activeIndex
                      ? "w-4 h-1.5 gradient-gold-bg"
                      : i < activeIndex
                      ? "w-1.5 h-1.5 bg-gold-dim/50"
                      : "w-1.5 h-1.5 bg-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chapter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-card rounded-t-2xl border-t border-border max-h-[80vh] overflow-y-auto"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              <div className="px-4 pb-2 flex items-center justify-between">
                <h3 className="font-display text-lg text-foreground">Chapters</h3>
                <div className="flex items-center gap-1">
                  <PaletteSwitcher isDark={isDark} />
                  <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="px-3 pb-4 space-y-1">
                {/* Home */}
                <button
                  onClick={() => { onSelectChapter(null); setDrawerOpen(false); }}
                  className="w-full text-left rounded-xl px-4 py-3 transition-colors hover:bg-secondary/50 active:bg-secondary touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gold-dim shrink-0" />
                    <span className="font-display text-sm text-foreground">Home</span>
                  </div>
                </button>

                {/* Foreword */}
                <button
                  onClick={() => { onSelectChapter("foreword"); setDrawerOpen(false); }}
                  className={`w-full text-left rounded-xl px-4 py-3 transition-colors touch-manipulation ${
                    activeChapter === "foreword" ? "bg-secondary" : "hover:bg-secondary/50 active:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gold-dim shrink-0" />
                    <div>
                      <span className="font-display text-sm text-foreground block">Foreword</span>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">A Message to Leaders</span>
                    </div>
                  </div>
                </button>

                {/* Start Here */}
                <button
                  onClick={() => { onSelectChapter("start-here"); setDrawerOpen(false); }}
                  className={`w-full text-left rounded-xl px-4 py-3 transition-colors touch-manipulation ${
                    activeChapter === "start-here" ? "bg-secondary" : "hover:bg-secondary/50 active:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gold-dim shrink-0" />
                    <div>
                      <span className="font-display text-sm text-foreground block">Start Here</span>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">Your Reading Path</span>
                    </div>
                  </div>
                </button>

                <div className="h-px bg-border my-1" />

                {/* Chapters */}
                {chapters.map((ch, i) => {
                  const isActive = activeChapter === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => { onSelectChapter(ch.id); setDrawerOpen(false); }}
                      className={`w-full text-left rounded-xl px-4 py-3 transition-colors touch-manipulation ${
                        isActive ? "bg-secondary" : "hover:bg-secondary/50 active:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs tracking-wider shrink-0 ${isActive ? "text-gold" : "text-muted-foreground"}`}>
                          {ch.num}
                        </span>
                        <div className="min-w-0">
                          <span className={`font-display text-sm block truncate ${isActive ? "text-foreground" : "text-foreground"}`}>
                            {ch.title}
                          </span>
                          <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground truncate block">
                            {ch.arcStage}
                          </span>
                        </div>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full gradient-gold-bg shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Safe area padding */}
              <div className="h-[env(safe-area-inset-bottom)]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileBottomNav;
