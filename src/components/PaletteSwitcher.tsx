import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ColorPalette {
  id: string;
  name: string;
  preview: [string, string, string]; // 3 swatch colors (CSS)
  vars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

const palettes: ColorPalette[] = [
  {
    id: "navy-coral",
    name: "Navy & Coral",
    preview: ["hsl(222,40%,10%)", "hsl(12,80%,55%)", "hsl(210,30%,98%)"],
    vars: {
      light: {
        "--coral": "12 80% 55%",
        "--coral-dim": "12 55% 40%",
        "--coral-glow": "16 90% 62%",
        "--chapter-line": "12 55% 50%",
        "--ring": "12 80% 55%",
        "--background": "210 30% 98%",
        "--foreground": "220 30% 12%",
        "--card": "210 25% 95%",
        "--card-foreground": "220 30% 12%",
        "--primary": "220 45% 25%",
        "--primary-foreground": "210 30% 98%",
        "--secondary": "210 20% 92%",
        "--secondary-foreground": "220 30% 18%",
        "--muted": "210 15% 91%",
        "--muted-foreground": "220 15% 42%",
        "--surface-elevated": "215 25% 94%",
        "--border": "210 15% 87%",
      },
      dark: {
        "--coral": "12 85% 60%",
        "--coral-dim": "14 60% 45%",
        "--coral-glow": "16 95% 68%",
        "--chapter-line": "12 55% 35%",
        "--ring": "12 80% 58%",
        "--background": "222 40% 10%",
        "--foreground": "210 20% 95%",
        "--card": "222 35% 15%",
        "--card-foreground": "210 20% 95%",
        "--primary": "210 20% 93%",
        "--primary-foreground": "222 35% 15%",
        "--secondary": "222 25% 20%",
        "--secondary-foreground": "210 20% 95%",
        "--muted": "222 25% 20%",
        "--muted-foreground": "215 15% 62%",
        "--surface-elevated": "222 35% 14%",
        "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "dark-gold",
    name: "Dark & Gold",
    preview: ["hsl(220,18%,10%)", "hsl(38,80%,50%)", "hsl(40,20%,97%)"],
    vars: {
      light: {
        "--coral": "38 80% 45%",
        "--coral-dim": "38 50% 30%",
        "--coral-glow": "38 90% 55%",
        "--chapter-line": "38 50% 40%",
        "--ring": "38 50% 45%",
        "--background": "40 20% 97%",
        "--foreground": "220 20% 15%",
        "--card": "40 15% 94%",
        "--card-foreground": "220 20% 15%",
        "--primary": "220 20% 20%",
        "--primary-foreground": "40 20% 97%",
        "--secondary": "40 12% 90%",
        "--secondary-foreground": "220 20% 20%",
        "--muted": "40 10% 91%",
        "--muted-foreground": "220 10% 40%",
        "--surface-elevated": "40 15% 92%",
        "--border": "40 10% 85%",
      },
      dark: {
        "--coral": "38 80% 55%",
        "--coral-dim": "38 50% 35%",
        "--coral-glow": "38 90% 65%",
        "--chapter-line": "38 50% 25%",
        "--ring": "38 50% 45%",
        "--background": "220 18% 10%",
        "--foreground": "248 0.3% 98.4%",
        "--card": "220 18% 16%",
        "--card-foreground": "248 0.3% 98.4%",
        "--primary": "256 1.3% 92.9%",
        "--primary-foreground": "220 18% 16%",
        "--secondary": "220 14% 20%",
        "--secondary-foreground": "248 0.3% 98.4%",
        "--muted": "220 14% 20%",
        "--muted-foreground": "220 10% 62%",
        "--surface-elevated": "220 18% 12%",
        "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "teal-emerald",
    name: "Teal & Emerald",
    preview: ["hsl(180,30%,10%)", "hsl(160,60%,45%)", "hsl(170,25%,97%)"],
    vars: {
      light: {
        "--coral": "160 60% 38%",
        "--coral-dim": "165 40% 28%",
        "--coral-glow": "155 70% 48%",
        "--chapter-line": "160 45% 40%",
        "--ring": "160 60% 38%",
        "--background": "170 25% 97%",
        "--foreground": "180 25% 12%",
        "--card": "170 20% 94%",
        "--card-foreground": "180 25% 12%",
        "--primary": "180 35% 22%",
        "--primary-foreground": "170 25% 97%",
        "--secondary": "170 18% 91%",
        "--secondary-foreground": "180 25% 18%",
        "--muted": "170 12% 90%",
        "--muted-foreground": "180 15% 42%",
        "--surface-elevated": "172 20% 93%",
        "--border": "170 12% 86%",
      },
      dark: {
        "--coral": "160 65% 48%",
        "--coral-dim": "165 45% 35%",
        "--coral-glow": "155 75% 55%",
        "--chapter-line": "160 40% 30%",
        "--ring": "160 60% 48%",
        "--background": "180 30% 8%",
        "--foreground": "170 15% 95%",
        "--card": "180 28% 13%",
        "--card-foreground": "170 15% 95%",
        "--primary": "170 15% 92%",
        "--primary-foreground": "180 28% 13%",
        "--secondary": "180 22% 18%",
        "--secondary-foreground": "170 15% 95%",
        "--muted": "180 22% 18%",
        "--muted-foreground": "175 12% 58%",
        "--surface-elevated": "180 28% 11%",
        "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "plum-rose",
    name: "Plum & Rose",
    preview: ["hsl(280,30%,12%)", "hsl(340,65%,55%)", "hsl(300,15%,97%)"],
    vars: {
      light: {
        "--coral": "340 65% 50%",
        "--coral-dim": "340 40% 38%",
        "--coral-glow": "335 75% 60%",
        "--chapter-line": "340 45% 48%",
        "--ring": "340 65% 50%",
        "--background": "300 15% 97%",
        "--foreground": "280 25% 14%",
        "--card": "300 12% 94%",
        "--card-foreground": "280 25% 14%",
        "--primary": "280 30% 25%",
        "--primary-foreground": "300 15% 97%",
        "--secondary": "295 15% 91%",
        "--secondary-foreground": "280 25% 20%",
        "--muted": "295 10% 90%",
        "--muted-foreground": "280 12% 44%",
        "--surface-elevated": "298 14% 93%",
        "--border": "295 10% 86%",
      },
      dark: {
        "--coral": "340 70% 60%",
        "--coral-dim": "340 45% 42%",
        "--coral-glow": "335 80% 68%",
        "--chapter-line": "340 40% 32%",
        "--ring": "340 65% 58%",
        "--background": "280 30% 10%",
        "--foreground": "290 12% 95%",
        "--card": "280 28% 15%",
        "--card-foreground": "290 12% 95%",
        "--primary": "290 12% 92%",
        "--primary-foreground": "280 28% 15%",
        "--secondary": "280 22% 20%",
        "--secondary-foreground": "290 12% 95%",
        "--muted": "280 22% 20%",
        "--muted-foreground": "285 12% 58%",
        "--surface-elevated": "280 28% 13%",
        "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "slate-amber",
    name: "Slate & Amber",
    preview: ["hsl(215,20%,12%)", "hsl(35,90%,52%)", "hsl(220,15%,97%)"],
    vars: {
      light: {
        "--coral": "35 90% 48%",
        "--coral-dim": "30 55% 35%",
        "--coral-glow": "40 95% 58%",
        "--chapter-line": "35 55% 45%",
        "--ring": "35 90% 48%",
        "--background": "220 15% 97%",
        "--foreground": "215 22% 14%",
        "--card": "218 14% 94%",
        "--card-foreground": "215 22% 14%",
        "--primary": "215 25% 22%",
        "--primary-foreground": "220 15% 97%",
        "--secondary": "218 14% 91%",
        "--secondary-foreground": "215 22% 18%",
        "--muted": "218 10% 90%",
        "--muted-foreground": "215 12% 42%",
        "--surface-elevated": "218 14% 93%",
        "--border": "218 10% 86%",
      },
      dark: {
        "--coral": "35 92% 55%",
        "--coral-dim": "30 58% 40%",
        "--coral-glow": "40 96% 64%",
        "--chapter-line": "35 50% 30%",
        "--ring": "35 90% 55%",
        "--background": "215 22% 10%",
        "--foreground": "218 14% 95%",
        "--card": "215 22% 14%",
        "--card-foreground": "218 14% 95%",
        "--primary": "218 14% 92%",
        "--primary-foreground": "215 22% 14%",
        "--secondary": "215 18% 19%",
        "--secondary-foreground": "218 14% 95%",
        "--muted": "215 18% 19%",
        "--muted-foreground": "215 10% 58%",
        "--surface-elevated": "215 22% 12%",
        "--border": "0 0% 100% / 10%",
      },
    },
  },
];

function applyPalette(palette: ColorPalette, isDark: boolean) {
  const vars = isDark ? palette.vars.dark : palette.vars.light;
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

interface PaletteSwitcherProps {
  isDark: boolean;
}

const PaletteSwitcher = ({ isDark }: PaletteSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("navy-coral");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  const updatePos = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Re-apply when dark/light toggles
  useEffect(() => {
    const palette = palettes.find((p) => p.id === activeId);
    if (palette) applyPalette(palette, isDark);
  }, [isDark, activeId]);

  const handleToggle = () => {
    updatePos();
    setOpen((v) => !v);
  };

  const handleSelect = (palette: ColorPalette) => {
    setActiveId(palette.id);
    applyPalette(palette, isDark);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Change color palette"
      >
        <Palette className="w-4 h-4" />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{ position: "fixed", top: pos.top, right: pos.right }}
              className="bg-card border border-border rounded-lg shadow-lg p-2 w-52 z-[100]"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2 py-1">
                Color Palette
              </p>
              {palettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => handleSelect(palette)}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left text-sm transition-colors cursor-pointer ${
                    activeId === palette.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex gap-0.5 shrink-0">
                    {palette.preview.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="font-body text-xs">{palette.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default PaletteSwitcher;
