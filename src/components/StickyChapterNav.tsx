import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import PaletteSwitcher from "./PaletteSwitcher";

const chapters = [
  { id: "ch-1", num: "01", title: "Why Now" },
  { id: "ch-2", num: "02", title: "The Vision" },
  { id: "ch-3", num: "03", title: "The Challenge" },
  { id: "ch-4", num: "04", title: "The Methodology" },
  { id: "ch-5", num: "05", title: "How Do I Start?" },
  { id: "ch-6", num: "06", title: "What We've Seen" },
  { id: "ch-7", num: "07", title: "Your Move" },
];

const StickyChapterNav = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);

      let current: string | null = null;
      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = ch.id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = chapters.findIndex((ch) => ch.id === activeId);

  const goToPrev = () => {
    const prevIndex = activeIndex <= 0 ? 0 : activeIndex - 1;
    scrollTo(chapters[prevIndex].id);
  };

  const goToNext = () => {
    const nextIndex = activeIndex >= chapters.length - 1 ? chapters.length - 1 : activeIndex + 1;
    scrollTo(chapters[nextIndex].id);
  };

  return (
    <motion.nav
      initial={false}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-12 gap-1 overflow-x-auto scrollbar-hide">
          <a href="https://go.gov.sg/ai-first" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold-dim mr-3 shrink-0 hidden sm:block hover:text-gold transition-colors">
            AI-First
          </a>
          <span className="w-px h-5 bg-border mr-2 shrink-0 hidden sm:block" />
          {chapters.map((ch) => {
            const isActive = activeId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-secondary text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[10px]">{ch.num}</span>
                <span className="hidden md:inline">{ch.title}</span>
              </button>
            );
          })}
          <span className="w-px h-5 bg-border ml-auto shrink-0" />
          <button
            onClick={goToPrev}
            disabled={activeIndex <= 0}
            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            disabled={activeIndex >= chapters.length - 1}
            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="w-px h-5 bg-border shrink-0" />
          <PaletteSwitcher isDark={isDark} />
          <button
            onClick={toggleTheme}
            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default StickyChapterNav;
