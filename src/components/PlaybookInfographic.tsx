import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Zap, Eye, AlertTriangle, Heart, Compass, Rocket, BarChart3, Flag } from "lucide-react";

const chapters = [
  { num: "01", title: "Why Now", arc: "The World Before", summary: "The burning platform — why agencies must transform now, not later", icon: Zap, color: "#3B82F6" },
  { num: "02", title: "The Vision", arc: "The Call to Adventure", summary: "What 'AI-First' really means — augmented expertise, compressed cycles", icon: Eye, color: "#8B5CF6" },
  { num: "03", title: "The Challenge", arc: "The Obstacle", summary: "Seven barriers standing between intent and execution", icon: AlertTriangle, color: "#EF4444" },
  { num: "04", title: "Cultural Prerequisites", arc: "The Foundation", summary: "The seven non-negotiable mindsets leaders must cultivate", icon: Heart, color: "#EC4899" },
  { num: "05", title: "The Methodology", arc: "The Guide Appears", summary: "The 90-day sprint framework — Discovery, Build, Showcase", icon: Compass, color: "#14B8A6" },
  { num: "06", title: "How Do I Start?", arc: "The Journey", summary: "Practical first steps for leaders and practitioners alike", icon: Rocket, color: "#F59E0B" },
  { num: "07", title: "What We've Seen", arc: "Proof It Works", summary: "Real results from pilot agencies — data, stories, outcomes", icon: BarChart3, color: "#22C55E" },
  { num: "08", title: "Your Move", arc: "The New World", summary: "Four leadership asks to set transformation in motion", icon: Flag, color: "#F97316" },
];

const PlaybookInfographic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadInfographic = useCallback(async () => {
    const canvas = document.createElement("canvas");
    const scale = 2;
    const W = 1200;
    const H = 1800;
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#0B1628");
    grad.addColorStop(0.5, "#0F1D35");
    grad.addColorStop(1, "#0B1628");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid pattern
    ctx.strokeStyle = "rgba(59, 130, 246, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Top accent line
    const accentGrad = ctx.createLinearGradient(100, 0, W - 100, 0);
    accentGrad.addColorStop(0, "transparent");
    accentGrad.addColorStop(0.3, "#D4A853");
    accentGrad.addColorStop(0.7, "#D4A853");
    accentGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = accentGrad;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(100, 80); ctx.lineTo(W - 100, 80); ctx.stroke();

    // Header
    ctx.fillStyle = "rgba(212, 168, 83, 0.6)";
    ctx.font = "500 13px 'JetBrains Mono', monospace";
    ctx.letterSpacing = "4px";
    ctx.textAlign = "center";
    ctx.fillText("THE AI-FIRST PLAYBOOK", W / 2, 120);

    ctx.fillStyle = "#F1F5F9";
    ctx.font = "700 52px 'DM Serif Display', serif";
    ctx.fillText("Your Agency.", W / 2, 185);
    
    const titleGrad = ctx.createLinearGradient(W / 2 - 150, 0, W / 2 + 150, 0);
    titleGrad.addColorStop(0, "#D4A853");
    titleGrad.addColorStop(1, "#E8C87A");
    ctx.fillStyle = titleGrad;
    ctx.font = "italic 700 52px 'DM Serif Display', serif";
    ctx.fillText("Transformed.", W / 2, 245);

    ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
    ctx.font = "400 16px 'Inter', sans-serif";
    ctx.fillText("A practical guide for leaders and practitioners ready to move from AI-curious to AI-first.", W / 2, 290);

    // Divider
    ctx.strokeStyle = "rgba(212, 168, 83, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(200, 320); ctx.lineTo(W - 200, 320); ctx.stroke();

    // Journey label
    ctx.fillStyle = "rgba(212, 168, 83, 0.5)";
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    ctx.fillText("THE HERO'S JOURNEY — 8 CHAPTERS", W / 2, 360);

    // Chapter cards - 2 columns, 4 rows
    const cols = 2;
    const cardW = 500;
    const cardH = 150;
    const gapX = 40;
    const gapY = 24;
    const startX = (W - (cols * cardW + (cols - 1) * gapX)) / 2;
    const startY = 390;

    // Timeline spine
    const spineX = W / 2;
    ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(spineX, startY);
    ctx.lineTo(spineX, startY + 4 * (cardH + gapY) - gapY);
    ctx.stroke();
    ctx.setLineDash([]);

    chapters.forEach((ch, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      // Card background
      ctx.fillStyle = "rgba(15, 29, 53, 0.8)";
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 1;
      roundedRect(ctx, x, y, cardW, cardH, 12);
      ctx.fill();
      ctx.stroke();

      // Left accent bar
      ctx.fillStyle = ch.color;
      roundedRect(ctx, x, y, 4, cardH, 2);
      ctx.fill();

      // Chapter number
      ctx.fillStyle = ch.color;
      ctx.font = "700 28px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(ch.num, x + 24, y + 42);

      // Arc stage
      ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
      ctx.font = "500 10px 'JetBrains Mono', monospace";
      ctx.fillText(ch.arc.toUpperCase(), x + 80, y + 30);

      // Title
      ctx.fillStyle = "#F1F5F9";
      ctx.font = "600 22px 'DM Serif Display', serif";
      ctx.fillText(ch.title, x + 80, y + 56);

      // Summary
      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.font = "400 13px 'Inter', sans-serif";
      wrapText(ctx, ch.summary, x + 24, y + 90, cardW - 48, 20);

      // Timeline dot
      const dotY = y + cardH / 2;
      ctx.fillStyle = ch.color;
      ctx.beginPath();
      ctx.arc(spineX, dotY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0B1628";
      ctx.beginPath();
      ctx.arc(spineX, dotY, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Bottom section - Key framework
    const bottomY = startY + 4 * (cardH + gapY) + 40;
    
    ctx.strokeStyle = "rgba(212, 168, 83, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(200, bottomY); ctx.lineTo(W - 200, bottomY); ctx.stroke();

    ctx.fillStyle = "rgba(212, 168, 83, 0.5)";
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("THE 90-DAY SPRINT FRAMEWORK", W / 2, bottomY + 40);

    // Three phases
    const phases = [
      { name: "Discovery", days: "Day 1–30", desc: "Identify problems worth solving", color: "#3B82F6" },
      { name: "Build", days: "Day 31–60", desc: "Prototype and iterate with users", color: "#14B8A6" },
      { name: "Showcase", days: "Day 61–90", desc: "Demonstrate value, plan scale", color: "#F59E0B" },
    ];

    const phaseW = 320;
    const phaseGap = 30;
    const phaseStartX = (W - (3 * phaseW + 2 * phaseGap)) / 2;
    const phaseY = bottomY + 65;

    phases.forEach((phase, i) => {
      const px = phaseStartX + i * (phaseW + phaseGap);

      ctx.fillStyle = "rgba(15, 29, 53, 0.6)";
      ctx.strokeStyle = phase.color + "33";
      ctx.lineWidth = 1;
      roundedRect(ctx, px, phaseY, phaseW, 90, 10);
      ctx.fill();
      ctx.stroke();

      // Top accent
      ctx.fillStyle = phase.color;
      roundedRect(ctx, px, phaseY, phaseW, 3, 1);
      ctx.fill();

      ctx.fillStyle = phase.color;
      ctx.font = "700 20px 'DM Serif Display', serif";
      ctx.textAlign = "left";
      ctx.fillText(phase.name, px + 20, phaseY + 36);

      ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.fillText(phase.days, px + 20, phaseY + 56);

      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.font = "400 13px 'Inter', sans-serif";
      ctx.fillText(phase.desc, px + 20, phaseY + 76);
    });

    // Arrow connectors between phases
    ctx.strokeStyle = "rgba(212, 168, 83, 0.3)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 2; i++) {
      const ax = phaseStartX + (i + 1) * phaseW + i * phaseGap + phaseGap / 2 + 3;
      const ay = phaseY + 45;
      ctx.beginPath();
      ctx.moveTo(ax - 8, ay);
      ctx.lineTo(ax + 8, ay);
      ctx.moveTo(ax + 3, ay - 5);
      ctx.lineTo(ax + 8, ay);
      ctx.lineTo(ax + 3, ay + 5);
      ctx.stroke();
    }

    // Footer
    ctx.fillStyle = "rgba(148, 163, 184, 0.3)";
    ctx.font = "400 11px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("aifirstplaybook.lovable.app", W / 2, H - 60);

    ctx.strokeStyle = accentGrad;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(100, H - 80); ctx.lineTo(W - 100, H - 80); ctx.stroke();

    ctx.fillStyle = "rgba(212, 168, 83, 0.4)";
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("© 2026 GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE", W / 2, H - 40);

    // Download
    const link = document.createElement("a");
    link.download = "AI-First-Playbook-Infographic.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16"
      data-pdf-hide
    >
      <div className="bg-surface-elevated border border-border rounded-xl p-8 text-center">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-3">
          Visual Summary
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
          Playbook at a Glance
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Download a visual overview of the entire AI-First Playbook — all 8 chapters and the 90-day sprint framework in one infographic.
        </p>
        <button
          onClick={downloadInfographic}
          className="inline-flex items-center gap-2 gradient-gold-bg text-white font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Download Infographic
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
};

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line !== "") {
      ctx.fillText(line.trim(), x, currentY);
      line = word + " ";
      currentY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

export default PlaybookInfographic;
