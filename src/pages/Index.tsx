import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterSidebar, { chapters } from "@/components/ChapterSidebar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ChapterNav } from "@/components/chapters/ChapterNav";

// Lazy-loaded chapter components
const LandingPage = lazy(() => import("@/components/chapters/LandingPage"));
const StartHere = lazy(() => import("@/components/chapters/StartHere"));
const Foreword = lazy(() => import("@/components/Foreword"));
const Chapter1 = lazy(() => import("@/components/chapters/Chapter1"));
const Chapter2 = lazy(() => import("@/components/chapters/Chapter2"));
const Chapter3 = lazy(() => import("@/components/chapters/Chapter3"));
const Chapter4 = lazy(() => import("@/components/chapters/Chapter4"));
const Chapter5 = lazy(() => import("@/components/chapters/Chapter5"));
const Chapter6 = lazy(() => import("@/components/chapters/Chapter6"));
const Chapter7 = lazy(() => import("@/components/chapters/Chapter7"));
const Chapter8 = lazy(() => import("@/components/chapters/Chapter8"));
const Acknowledgements = lazy(() => import("@/components/Acknowledgements"));

const chapterComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "ch-1": Chapter1,
  "ch-2": Chapter2,
  "ch-3": Chapter3,
  "ch-4": Chapter4,
  "ch-5": Chapter5,
  "ch-6": Chapter6,
  "ch-7": Chapter7,
  "ch-8": Chapter8,
};

const ChapterFallback = () => (
  <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24 flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-gold-dim border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-xs tracking-wider text-muted-foreground">Loading chapter…</span>
    </div>
  </div>
);

const Index = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const handleScroll = () => {
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight - main.clientHeight;
      setScrollProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0);
    };
    main.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => main.removeEventListener("scroll", handleScroll);
  }, [activeChapter]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const renderContent = () => {
    if (activeChapter === null) {
      return (
        <Suspense fallback={<ChapterFallback />}>
          <LandingPage onSelectChapter={setActiveChapter} />
        </Suspense>
      );
    }

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
        <Suspense fallback={<ChapterFallback />}>
          {activeChapter === "foreword" && <Foreword />}
          {activeChapter === "start-here" && <StartHere onSelectChapter={setActiveChapter} />}
          {activeChapter === "acknowledgements" && <Acknowledgements />}
          {chapterComponents[activeChapter] && (() => {
            const ChapterComponent = chapterComponents[activeChapter];
            return <ChapterComponent />;
          })()}
        </Suspense>

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
      <main className="flex-1 min-h-screen relative overflow-y-auto pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
        <footer className="border-t border-border py-6 text-center">
          <p className="font-mono text-xs tracking-wider text-muted-foreground">
            © 2026 Government Technology Agency of Singapore
          </p>
        </footer>
      </main>
      <MobileBottomNav
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        scrollProgress={scrollProgress}
      />
    </div>
  );
};

export default Index;
