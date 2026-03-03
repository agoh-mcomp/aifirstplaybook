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
  {
    id: "midnight-electric",
    name: "Midnight Electric",
    preview: ["hsl(240,25%,8%)", "hsl(210,100%,60%)", "hsl(230,20%,96%)"],
    vars: {
      light: {
        "--coral": "210 100% 50%", "--coral-dim": "215 70% 38%", "--coral-glow": "205 100% 62%",
        "--chapter-line": "210 70% 48%", "--ring": "210 100% 50%",
        "--background": "230 20% 97%", "--foreground": "230 25% 12%",
        "--card": "228 18% 94%", "--card-foreground": "230 25% 12%",
        "--primary": "230 35% 22%", "--primary-foreground": "230 20% 97%",
        "--secondary": "228 16% 91%", "--secondary-foreground": "230 25% 18%",
        "--muted": "228 12% 90%", "--muted-foreground": "230 12% 42%",
        "--surface-elevated": "228 16% 93%", "--border": "228 12% 86%",
      },
      dark: {
        "--coral": "210 100% 60%", "--coral-dim": "215 70% 45%", "--coral-glow": "205 100% 70%",
        "--chapter-line": "210 60% 32%", "--ring": "210 100% 58%",
        "--background": "240 25% 8%", "--foreground": "225 15% 95%",
        "--card": "238 24% 13%", "--card-foreground": "225 15% 95%",
        "--primary": "225 15% 93%", "--primary-foreground": "238 24% 13%",
        "--secondary": "238 20% 18%", "--secondary-foreground": "225 15% 95%",
        "--muted": "238 20% 18%", "--muted-foreground": "230 12% 58%",
        "--surface-elevated": "238 24% 11%", "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "forest-sage",
    name: "Forest & Sage",
    preview: ["hsl(150,25%,10%)", "hsl(90,40%,48%)", "hsl(100,15%,96%)"],
    vars: {
      light: {
        "--coral": "90 45% 42%", "--coral-dim": "95 30% 32%", "--coral-glow": "85 55% 52%",
        "--chapter-line": "90 35% 40%", "--ring": "90 45% 42%",
        "--background": "100 15% 97%", "--foreground": "140 20% 12%",
        "--card": "105 12% 94%", "--card-foreground": "140 20% 12%",
        "--primary": "145 28% 22%", "--primary-foreground": "100 15% 97%",
        "--secondary": "105 12% 91%", "--secondary-foreground": "140 20% 18%",
        "--muted": "105 8% 90%", "--muted-foreground": "140 10% 42%",
        "--surface-elevated": "105 12% 93%", "--border": "105 8% 86%",
      },
      dark: {
        "--coral": "90 50% 52%", "--coral-dim": "95 35% 38%", "--coral-glow": "85 60% 58%",
        "--chapter-line": "90 30% 28%", "--ring": "90 45% 50%",
        "--background": "150 25% 8%", "--foreground": "110 12% 95%",
        "--card": "148 24% 12%", "--card-foreground": "110 12% 95%",
        "--primary": "110 12% 92%", "--primary-foreground": "148 24% 12%",
        "--secondary": "148 20% 16%", "--secondary-foreground": "110 12% 95%",
        "--muted": "148 20% 16%", "--muted-foreground": "140 10% 55%",
        "--surface-elevated": "148 24% 10%", "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "warm-earth",
    name: "Warm Earth",
    preview: ["hsl(25,30%,12%)", "hsl(20,70%,50%)", "hsl(30,20%,96%)"],
    vars: {
      light: {
        "--coral": "20 70% 45%", "--coral-dim": "22 45% 34%", "--coral-glow": "18 80% 55%",
        "--chapter-line": "20 50% 42%", "--ring": "20 70% 45%",
        "--background": "30 20% 97%", "--foreground": "25 25% 12%",
        "--card": "28 16% 94%", "--card-foreground": "25 25% 12%",
        "--primary": "25 30% 22%", "--primary-foreground": "30 20% 97%",
        "--secondary": "28 14% 91%", "--secondary-foreground": "25 25% 18%",
        "--muted": "28 10% 90%", "--muted-foreground": "25 12% 42%",
        "--surface-elevated": "28 14% 93%", "--border": "28 10% 86%",
      },
      dark: {
        "--coral": "20 75% 55%", "--coral-dim": "22 50% 40%", "--coral-glow": "18 85% 62%",
        "--chapter-line": "20 40% 30%", "--ring": "20 70% 52%",
        "--background": "25 30% 9%", "--foreground": "30 14% 95%",
        "--card": "24 28% 13%", "--card-foreground": "30 14% 95%",
        "--primary": "30 14% 92%", "--primary-foreground": "24 28% 13%",
        "--secondary": "24 22% 17%", "--secondary-foreground": "30 14% 95%",
        "--muted": "24 22% 17%", "--muted-foreground": "25 12% 55%",
        "--surface-elevated": "24 28% 11%", "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "indigo-violet",
    name: "Indigo & Violet",
    preview: ["hsl(260,30%,10%)", "hsl(270,60%,58%)", "hsl(265,18%,97%)"],
    vars: {
      light: {
        "--coral": "270 60% 52%", "--coral-dim": "272 40% 40%", "--coral-glow": "268 70% 62%",
        "--chapter-line": "270 45% 48%", "--ring": "270 60% 52%",
        "--background": "265 18% 97%", "--foreground": "260 22% 14%",
        "--card": "263 14% 94%", "--card-foreground": "260 22% 14%",
        "--primary": "260 30% 24%", "--primary-foreground": "265 18% 97%",
        "--secondary": "263 14% 91%", "--secondary-foreground": "260 22% 18%",
        "--muted": "263 10% 90%", "--muted-foreground": "260 12% 44%",
        "--surface-elevated": "263 14% 93%", "--border": "263 10% 86%",
      },
      dark: {
        "--coral": "270 65% 62%", "--coral-dim": "272 45% 45%", "--coral-glow": "268 75% 70%",
        "--chapter-line": "270 35% 32%", "--ring": "270 60% 60%",
        "--background": "260 30% 9%", "--foreground": "265 12% 95%",
        "--card": "258 28% 14%", "--card-foreground": "265 12% 95%",
        "--primary": "265 12% 92%", "--primary-foreground": "258 28% 14%",
        "--secondary": "258 22% 19%", "--secondary-foreground": "265 12% 95%",
        "--muted": "258 22% 19%", "--muted-foreground": "262 12% 58%",
        "--surface-elevated": "258 28% 12%", "--border": "0 0% 100% / 10%",
      },
    },
  },
  {
    id: "mono-minimal",
    name: "Mono Minimal",
    preview: ["hsl(0,0%,8%)", "hsl(0,0%,55%)", "hsl(0,0%,97%)"],
    vars: {
      light: {
        "--coral": "0 0% 30%", "--coral-dim": "0 0% 40%", "--coral-glow": "0 0% 20%",
        "--chapter-line": "0 0% 45%", "--ring": "0 0% 30%",
        "--background": "0 0% 97%", "--foreground": "0 0% 10%",
        "--card": "0 0% 94%", "--card-foreground": "0 0% 10%",
        "--primary": "0 0% 15%", "--primary-foreground": "0 0% 97%",
        "--secondary": "0 0% 91%", "--secondary-foreground": "0 0% 15%",
        "--muted": "0 0% 90%", "--muted-foreground": "0 0% 42%",
        "--surface-elevated": "0 0% 93%", "--border": "0 0% 85%",
      },
      dark: {
        "--coral": "0 0% 65%", "--coral-dim": "0 0% 50%", "--coral-glow": "0 0% 75%",
        "--chapter-line": "0 0% 28%", "--ring": "0 0% 60%",
        "--background": "0 0% 8%", "--foreground": "0 0% 95%",
        "--card": "0 0% 13%", "--card-foreground": "0 0% 95%",
        "--primary": "0 0% 92%", "--primary-foreground": "0 0% 13%",
        "--secondary": "0 0% 18%", "--secondary-foreground": "0 0% 95%",
        "--muted": "0 0% 18%", "--muted-foreground": "0 0% 55%",
        "--surface-elevated": "0 0% 11%", "--border": "0 0% 100% / 10%",
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
              className="bg-card border border-border rounded-lg shadow-lg p-2 w-52 z-[100] max-h-[70vh] overflow-y-auto"
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
