import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ChevronLeft, ChevronRight, Menu, X, BookOpen } from "lucide-react";
import PaletteSwitcher from "./PaletteSwitcher";

export interface ChapterMeta {
  id: string;
  num: string;
  arcStage: string;
  title: string;
}

export const chapters: ChapterMeta[] = [
  { id: "ch-1", num: "01", arcStage: "The World Before", title: "Why Now" },
  { id: "ch-2", num: "02", arcStage: "The Call to Adventure", title: "The Vision" },
  { id: "ch-3", num: "03", arcStage: "The Obstacle", title: "The Challenge" },
  { id: "ch-4", num: "04", arcStage: "The Foundation", title: "Cultural Prerequisites" },
  { id: "ch-5", num: "05", arcStage: "The Guide Appears", title: "The Methodology" },
  { id: "ch-6", num: "06", arcStage: "The Journey", title: "How Do I Start?" },
  { id: "ch-7", num: "07", arcStage: "Proof It Works", title: "What We've Seen" },
  { id: "ch-8", num: "08", arcStage: "The New World", title: "Your Move" },
];

interface ChapterSidebarProps {
  activeChapter: string | null;
  onSelectChapter: (id: string | null) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const ChapterSidebar = ({ activeChapter, onSelectChapter, isDark, onToggleTheme }: ChapterSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress in the main content area
  useEffect(() => {
    const handleScroll = () => {
      if (!activeChapter) { setScrollProgress(0); return; }
      const main = document.querySelector("main");
      if (!main) return;
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight - main.clientHeight;
      setScrollProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0);
    };
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => main.removeEventListener("scroll", handleScroll);
    }
  }, [activeChapter]);

  const activeIndex = chapters.findIndex((ch) => ch.id === activeChapter);

  const goToPrev = () => {
    if (activeIndex > 0) onSelectChapter(chapters[activeIndex - 1].id);
  };

  const goToNext = () => {
    if (activeIndex < chapters.length - 1) onSelectChapter(chapters[activeIndex + 1].id);
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPrev();
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-2">
        <button
          onClick={() => onSelectChapter(null)}
          className="flex items-center gap-2 text-left w-full group cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-gold shrink-0" />
          {!collapsed && (
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold-dim">
                AI-First
              </div>
              <div className="font-display text-sm text-foreground group-hover:text-gold transition-colors">
                The Playbook
              </div>
            </div>
          )}
        </button>
      </div>

      <div className="w-full h-px bg-border mx-0 my-2" />

      {/* Chapter list */}
      <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
        {/* Start Here entry */}
        <button
          onClick={() => {
            onSelectChapter("start-here");
            setMobileOpen(false);
          }}
          className={`w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer group ${
            activeChapter === "start-here"
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`shrink-0 ${activeChapter === "start-here" ? "text-gold" : "text-muted-foreground group-hover:text-gold-dim"}`}>
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            {!collapsed && (
              <div className="min-w-0">
                <div className={`font-display text-sm leading-tight truncate ${activeChapter === "start-here" ? "text-foreground" : ""}`}>
                  Start Here
                </div>
                <div className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground truncate mt-0.5">
                  Your Reading Path
                </div>
              </div>
            )}
          </div>
        </button>

        <div className="w-full h-px bg-border mx-0 my-1" />

        {chapters.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => {
                onSelectChapter(ch.id);
                setMobileOpen(false);
              }}
              className={`w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer group ${
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`font-mono text-[11px] tracking-wider shrink-0 ${
                  isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold-dim"
                }`}>
                  {ch.num}
                </span>
                {!collapsed && (
                  <div className="min-w-0">
                    <div className={`font-display text-sm leading-tight truncate ${
                      isActive ? "text-foreground" : ""
                    }`}>
                      {ch.title}
                    </div>
                    <div className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground truncate mt-0.5">
                      {ch.arcStage}
                    </div>
                  </div>
                )}
              </div>
              {isActive && !collapsed && (
                <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full gradient-gold-bg rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(scrollProgress * 100, 2)}%` }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="w-full h-px bg-border mx-0 my-2" />

      {/* Footer controls */}
      <div className="p-3 space-y-2">
        {/* Prev/Next */}
        {activeChapter && (
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrev}
              disabled={activeIndex <= 0}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {!collapsed && (
              <span className="font-mono text-[10px] text-muted-foreground">
                {activeIndex + 1} / {chapters.length}
              </span>
            )}
            <button
              onClick={goToNext}
              disabled={activeIndex >= chapters.length - 1}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Theme controls */}
        <div className={`flex items-center ${collapsed ? "flex-col gap-1" : "justify-center gap-1"}`}>
          <PaletteSwitcher isDark={isDark} />
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden lg:block"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border text-foreground shadow-md cursor-pointer"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border z-50 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-sidebar backdrop-blur-xl border-r border-sidebar-border z-40 transition-all duration-300 ${
          collapsed ? "w-[60px]" : "w-[240px]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Spacer */}
      <div className={`hidden lg:block shrink-0 transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[240px]"
      }`} />
    </>
  );
};

export default ChapterSidebar;
