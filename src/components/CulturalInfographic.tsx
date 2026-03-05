import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
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

// Hardcoded colors for PDF rendering (html2canvas can't resolve CSS variables)
const PDF_COLORS = {
  bg: "#f5f5f7",
  bgGradientEnd: "#ecedf0",
  headerText: "#1a1f36",
  subText: "#6b7280",
  labelText: "#3b6cb5",
  nodeGradientStart: "#3b6cb5",
  nodeGradientEnd: "#5a8fd4",
  lineColor: "rgba(59, 108, 181, 0.25)",
  borderColor: "#e2e4e9",
  footerText: "#9ca3af",
};

const CulturalInfographic = () => {
  const infographicRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!infographicRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(infographicRef.current, {
        backgroundColor: PDF_COLORS.bg,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = canvas.width;
      const pdfHeight = canvas.height;
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("7-cultural-non-negotiables.pdf");
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  return (
    <div className="mt-10 space-y-4">
      {/* Infographic rendered with inline styles for reliable PDF capture */}
      <div
        ref={infographicRef}
        style={{
          background: `linear-gradient(160deg, ${PDF_COLORS.bg}, ${PDF_COLORS.bgGradientEnd})`,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${PDF_COLORS.borderColor}`,
          padding: "40px 40px 32px",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: PDF_COLORS.labelText,
              marginBottom: 10,
            }}
          >
            AI-First Playbook &middot; Chapter 04
          </div>
          <h3
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: 32,
              fontWeight: 700,
              color: PDF_COLORS.headerText,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            The 7 Cultural Non-Negotiables
          </h3>
          <p
            style={{
              fontSize: 15,
              color: PDF_COLORS.subText,
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            What it takes to shift mindsets — from AI-curious to AI-first.
          </p>
        </div>

        {/* Items with connecting line */}
        <div style={{ position: "relative" }}>
          {/* Vertical connecting line */}
          <div
            style={{
              position: "absolute",
              left: 23,
              top: 24,
              bottom: 24,
              width: 2,
              background: `linear-gradient(to bottom, transparent, ${PDF_COLORS.lineColor}, transparent)`,
            }}
          />

          {prerequisites.map((item, i) => (
            <div
              key={item.num}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                paddingTop: i === 0 ? 0 : 16,
                paddingBottom: i === prerequisites.length - 1 ? 0 : 16,
                position: "relative",
              }}
            >
              {/* Circle node */}
              <div
                style={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${PDF_COLORS.nodeGradientStart}, ${PDF_COLORS.nodeGradientEnd})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  boxShadow: "0 4px 12px rgba(59, 108, 181, 0.25)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 10,
                      color: PDF_COLORS.labelText,
                      letterSpacing: "0.15em",
                    }}
                  >
                    {item.num}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: PDF_COLORS.headerText,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: PDF_COLORS.subText,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {item.short}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: `1px solid ${PDF_COLORS.borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: PDF_COLORS.footerText,
            }}
          >
            Culture eats strategy for breakfast — and technology for lunch.
          </span>
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 9,
              letterSpacing: "0.1em",
              color: PDF_COLORS.footerText,
            }}
          >
            govtech.gov.sg
          </span>
        </div>
      </div>

      {/* Download button */}
      <motion.button
        onClick={handleDownload}
        disabled={isGenerating}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 text-sm font-body font-medium text-gold-dim hover:text-gold transition-colors cursor-pointer group disabled:opacity-50 disabled:cursor-wait"
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        )}
        {isGenerating ? "Generating PDF…" : "Download as PDF"}
      </motion.button>
    </div>
  );
};

export default CulturalInfographic;
