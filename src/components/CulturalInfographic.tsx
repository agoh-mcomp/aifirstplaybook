import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const prerequisites = [
  { num: "01", title: "Leadership Modeling & Mandate", short: "Leaders participate as learners, not just sponsors", icon: "👤" },
  { num: "02", title: "Permission to Invest Time", short: "Explicit runway away from BAU to experiment", icon: "⏳" },
  { num: "03", title: "Reward Learning & Risk-Taking", short: "Celebrate attempts and lessons, not just wins", icon: "🏆" },
  { num: "04", title: "Start with Problems, Not Solutions", short: '"What problem am I solving?" before "Where can I use AI?"', icon: "🎯" },
  { num: "05", title: "Peer Proof Points", short: "See people like you succeed — HR, Finance, Procurement", icon: "🤝" },
  { num: "06", title: "Sustained Engagement", short: "Progressive sprints over 90 days, not one-off hackathons", icon: "🔄" },
  { num: "07", title: "Pragmatic Data Classification", short: "Be willing to try commercial AI for non-confidential work", icon: "📊" },
];

const CulturalInfographic = () => {
  const infographicRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!infographicRef.current) return;
    const canvas = await html2canvas(infographicRef.current, {
      backgroundColor: "#0f1117",
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("cultural-prerequisites-ai-first.pdf");
  }, []);

  return (
    <div className="mt-10 space-y-4">
      {/* Downloadable infographic */}
      <div
        ref={infographicRef}
        className="relative rounded-xl overflow-hidden border border-border"
        style={{ background: "linear-gradient(145deg, hsl(var(--background)), hsl(var(--surface-elevated)))" }}
      >
        {/* Header band */}
        <div className="px-6 pt-8 pb-4 md:px-10 md:pt-10">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dim mb-2">
            AI-First Playbook · Chapter 04
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
            The 7 Cultural Non-Negotiables
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            What it takes to shift mindsets — from AI-curious to AI-first.
          </p>
        </div>

        {/* Central ring layout */}
        <div className="px-6 pb-8 md:px-10 md:pb-10">
          {/* Vertical flow */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-dim/40 to-transparent" />

            <div className="space-y-1">
              {prerequisites.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="relative flex items-start gap-4 py-3"
                >
                  {/* Node dot */}
                  <div className="relative z-10 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full gradient-gold-bg flex items-center justify-center text-base md:text-lg shadow-lg">
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] text-gold-dim tracking-wider">{item.num}</span>
                      <h4 className="font-display text-base md:text-lg text-foreground truncate">{item.title}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.short}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer tagline */}
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
              Culture eats strategy for breakfast — and technology for lunch.
            </span>
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground">
              govtech.gov.sg
            </span>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 text-sm font-body font-medium text-gold-dim hover:text-gold transition-colors cursor-pointer group"
      >
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        Download as PDF
      </button>
    </div>
  );
};

export default CulturalInfographic;
