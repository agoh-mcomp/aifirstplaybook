import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";

/* ── Colour palette — matches Midnight Electric theme ── */
const C = {
  bg: "#0B1628",
  bgCard: "#0F1D35",
  bgCardAlt: "#132444",
  gold: "#D4A853",
  goldDim: "#A68640",
  goldGlow: "#E8C87A",
  blue: "#0066FF",
  blueDim: "#1A4B8C",
  blueGlow: "#3D8BFF",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  textDim: "#64748B",
  border: "rgba(255,255,255,0.08)",
  // Chapter accent colours
  ch1: "#3B82F6",
  ch2: "#8B5CF6",
  ch3: "#EF4444",
  ch4: "#EC4899",
  ch5: "#14B8A6",
  ch6: "#F59E0B",
  ch7: "#22C55E",
  ch8: "#F97316",
};

/* ── Chapter data with executive-level insights ── */
const chapters = [
  {
    num: "01", title: "Why Now", arc: "THE WORLD BEFORE", color: C.ch1,
    keyInsight: "The window for managed transformation is narrowing. What we do in the next 2–3 years defines whether we lead or scramble to catch up.",
    stats: [{ val: "150K+", label: "Officers in SG Public Service" }, { val: "3 days/wk", label: "Spent on repetitive tasks" }],
    execTakeaway: "The cost of inaction compounds daily across 150,000 officers.",
  },
  {
    num: "02", title: "The Vision", arc: "THE CALL TO ADVENTURE", color: C.ch2,
    keyInsight: "AI-First is not about tools — it's a mindset shift. Ask: 'Can AI augment my thinking, speed up my work, and help me solve problems?'",
    stats: [{ val: "4 Pillars", label: "of What Good Looks Like" }, { val: "4 Shifts", label: "From Old → New Model" }],
    execTakeaway: "Shift from outsourced innovation to in-house building by domain experts.",
  },
  {
    num: "03", title: "The Challenge", arc: "THE OBSTACLE", color: C.ch3,
    keyInsight: "Barriers are not technical — they are human, cultural, and structural. This is a culture change problem.",
    stats: [{ val: "6", label: "Key Barriers Identified" }, { val: "#1 Gap", label: "Prototype → Deployment" }],
    execTakeaway: "Leaders must make the cost of standing still more visible than the cost of moving.",
  },
  {
    num: "04", title: "Cultural Prerequisites", arc: "THE FOUNDATION", color: C.ch4,
    keyInsight: "Seven non-negotiable conditions separate agencies that transform from agencies that merely experiment.",
    stats: [{ val: "7", label: "Non-Negotiable Mindsets" }, { val: "#1", label: "Leadership Must Model It" }],
    execTakeaway: "These prerequisites are not optional — they're the difference between sticking and fading.",
  },
  {
    num: "05", title: "The Methodology", arc: "THE GUIDE APPEARS", color: C.ch5,
    keyInsight: "Three monthly sprints over 90 days. Real problems, protected time, expert support. Leaders participate directly.",
    stats: [{ val: "90 Days", label: "Sprint Duration" }, { val: "3 Phases", label: "Discover → Build → Showcase" }],
    execTakeaway: "Each sprint: clear input (real problem), clear output (working prototype), clear feedback loop.",
  },
  {
    num: "06", title: "How Do I Start?", arc: "THE JOURNEY", color: C.ch6,
    keyInsight: "Your agency's starter kit: a practical 90-day model your agency runs, owns, and builds the muscle to sustain.",
    stats: [{ val: "5", label: "Pre-Sprint Checklist Items" }, { val: "4", label: "Success Tests" }],
    execTakeaway: "Five officers solving one real problem > thirty officers attending a workshop.",
  },
  {
    num: "07", title: "What We've Seen", arc: "PROOF IT WORKS", color: C.ch7,
    keyInsight: "SCG officers built 73 AI solutions in 90 days. Confidence jumped 60%. The framing shifted from 'AI is a tool' to 'AI is a partner.'",
    stats: [{ val: "73", label: "AI Solutions Built" }, { val: "60%", label: "Confidence Jump" }],
    execTakeaway: "Officers who called themselves 'not technical' built working prototypes in days.",
  },
  {
    num: "08", title: "Your Move", arc: "THE NEW WORLD", color: C.ch8,
    keyInsight: "Four leadership asks: Participate (don't just endorse), Protect time, Nominate AI Lead, Permission to fail.",
    stats: [{ val: "4", label: "Leadership Asks" }, { val: "1", label: "Decision: Start Now" }],
    execTakeaway: "The best public service doesn't wait to be told it's falling behind. It decides to stay ahead.",
  },
];

/* ── Canvas helpers ── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number, maxLines = 99) {
  const words = text.split(" ");
  let line = "", cy = y, lines = 0;
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) {
      lines++;
      if (lines >= maxLines) { ctx.fillText(line.trim() + "…", x, cy); return cy + lh; }
      ctx.fillText(line.trim(), x, cy);
      line = w + " "; cy += lh;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, cy);
  return cy + lh;
}

function drawIcon(ctx: CanvasRenderingContext2D, icon: string, x: number, y: number, size: number, color: string) {
  ctx.fillStyle = color + "20";
  roundRect(ctx, x, y, size, size, size * 0.25);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.font = `700 ${Math.floor(size * 0.45)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.fillText(icon, x + size / 2, y + size * 0.65);
  ctx.textAlign = "left";
}

const PlaybookInfographic = () => {
  const [generating, setGenerating] = useState(false);

  const download = useCallback(async () => {
    setGenerating(true);
    // Small delay to let the UI update
    await new Promise(r => setTimeout(r, 50));

    try {
      const scale = 2;
      const W = 1200;
      const H = 3400;
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);

      /* ── Background ── */
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, C.bg);
      bgGrad.addColorStop(0.3, "#0E1A30");
      bgGrad.addColorStop(0.7, "#0E1A30");
      bgGrad.addColorStop(1, C.bg);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = "rgba(59,130,246,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      /* ── Header ── */
      // Gold accent line
      const goldLine = ctx.createLinearGradient(80, 0, W - 80, 0);
      goldLine.addColorStop(0, "transparent");
      goldLine.addColorStop(0.2, C.gold);
      goldLine.addColorStop(0.8, C.gold);
      goldLine.addColorStop(1, "transparent");
      ctx.strokeStyle = goldLine;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(80, 60); ctx.lineTo(W - 80, 60); ctx.stroke();

      // "3-MIN EXECUTIVE BRIEF" badge
      ctx.fillStyle = C.gold + "30";
      roundRect(ctx, W / 2 - 110, 80, 220, 28, 14);
      ctx.fill();
      ctx.fillStyle = C.gold;
      ctx.font = "600 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("⏱  3-MINUTE EXECUTIVE BRIEF", W / 2, 99);

      // Title
      ctx.fillStyle = C.textMuted;
      ctx.font = "500 13px 'JetBrains Mono', monospace";
      ctx.fillText("THE AI-FIRST PLAYBOOK", W / 2, 140);

      ctx.fillStyle = C.text;
      ctx.font = "700 56px 'DM Serif Display', serif";
      ctx.fillText("Your Agency.", W / 2, 200);

      const titleGrad = ctx.createLinearGradient(W / 2 - 180, 0, W / 2 + 180, 0);
      titleGrad.addColorStop(0, C.goldDim);
      titleGrad.addColorStop(0.5, C.gold);
      titleGrad.addColorStop(1, C.goldGlow);
      ctx.fillStyle = titleGrad;
      ctx.font = "italic 700 56px 'DM Serif Display', serif";
      ctx.fillText("Transformed.", W / 2, 260);

      ctx.fillStyle = C.textMuted;
      ctx.font = "400 16px 'Inter', sans-serif";
      ctx.fillText("A practical guide for leaders and practitioners", W / 2, 300);
      ctx.fillText("ready to move from AI-curious to AI-first.", W / 2, 322);

      // Key stats banner
      const bannerY = 360;
      ctx.fillStyle = C.bgCard;
      ctx.strokeStyle = C.border;
      ctx.lineWidth = 1;
      roundRect(ctx, 80, bannerY, W - 160, 80, 12);
      ctx.fill(); ctx.stroke();

      const bannerStats = [
        { val: "73", label: "AI Solutions Built" },
        { val: "90 Days", label: "Sprint Duration" },
        { val: "200+", label: "Officers Engaged" },
        { val: "60%", label: "Confidence Jump" },
      ];
      const bw = (W - 160) / 4;
      bannerStats.forEach((s, i) => {
        const bx = 80 + i * bw + bw / 2;
        ctx.fillStyle = C.gold;
        ctx.font = "700 24px 'DM Serif Display', serif";
        ctx.fillText(s.val, bx, bannerY + 36);
        ctx.fillStyle = C.textDim;
        ctx.font = "400 11px 'Inter', sans-serif";
        ctx.fillText(s.label, bx, bannerY + 56);
        // Vertical divider
        if (i < 3) {
          ctx.strokeStyle = C.border;
          ctx.beginPath();
          ctx.moveTo(80 + (i + 1) * bw, bannerY + 18);
          ctx.lineTo(80 + (i + 1) * bw, bannerY + 62);
          ctx.stroke();
        }
      });

      /* ── Section: The Hero's Journey ── */
      let curY = 490;
      ctx.strokeStyle = goldLine;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(200, curY - 20); ctx.lineTo(W - 200, curY - 20); ctx.stroke();

      ctx.fillStyle = C.gold;
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("THE HERO'S JOURNEY — 8 CHAPTERS", W / 2, curY);
      ctx.textAlign = "left";

      curY += 30;

      /* ── Chapter Cards — full-width, stacked ── */
      const cardMarginX = 60;
      const cardW = W - cardMarginX * 2;

      chapters.forEach((ch, i) => {
        const cardH = 280;
        const x = cardMarginX;
        const y = curY;

        // Card bg
        ctx.fillStyle = i % 2 === 0 ? C.bgCard : C.bgCardAlt;
        ctx.strokeStyle = ch.color + "25";
        ctx.lineWidth = 1;
        roundRect(ctx, x, y, cardW, cardH, 14);
        ctx.fill(); ctx.stroke();

        // Left accent bar
        ctx.fillStyle = ch.color;
        roundRect(ctx, x, y, 5, cardH, 3);
        ctx.fill();

        // Chapter number & arc
        drawIcon(ctx, ch.num, x + 24, y + 20, 48, ch.color);

        ctx.fillStyle = ch.color + "90";
        ctx.font = "500 10px 'JetBrains Mono', monospace";
        ctx.fillText(ch.arc, x + 84, y + 36);

        ctx.fillStyle = C.text;
        ctx.font = "600 26px 'DM Serif Display', serif";
        ctx.fillText(ch.title, x + 84, y + 62);

        // Key insight (main content)
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 14px 'Inter', sans-serif";
        wrapText(ctx, ch.keyInsight, x + 24, y + 100, cardW - 48, 22, 3);

        // Stats boxes
        const statsY = y + 170;
        ch.stats.forEach((s, si) => {
          const sx = x + 24 + si * 220;
          ctx.fillStyle = ch.color + "12";
          roundRect(ctx, sx, statsY, 200, 55, 8);
          ctx.fill();
          ctx.strokeStyle = ch.color + "30";
          ctx.lineWidth = 1;
          roundRect(ctx, sx, statsY, 200, 55, 8);
          ctx.stroke();

          ctx.fillStyle = ch.color;
          ctx.font = "700 22px 'DM Serif Display', serif";
          ctx.fillText(s.val, sx + 14, statsY + 24);
          ctx.fillStyle = C.textDim;
          ctx.font = "400 11px 'Inter', sans-serif";
          ctx.fillText(s.label, sx + 14, statsY + 43);
        });

        // Executive takeaway — right-aligned callout
        const takeX = x + 470;
        const takeW = cardW - 470 - 24;
        ctx.fillStyle = C.gold + "10";
        roundRect(ctx, takeX, statsY, takeW, 55, 8);
        ctx.fill();
        ctx.strokeStyle = C.gold + "30";
        roundRect(ctx, takeX, statsY, takeW, 55, 8);
        ctx.stroke();

        // Gold diamond icon
        ctx.fillStyle = C.gold;
        ctx.font = "500 10px 'JetBrains Mono', monospace";
        ctx.fillText("◆ EXEC TAKEAWAY", takeX + 12, statsY + 18);
        ctx.fillStyle = C.goldGlow;
        ctx.font = "italic 12px 'Inter', sans-serif";
        wrapText(ctx, ch.execTakeaway, takeX + 12, statsY + 36, takeW - 24, 16, 2);

        curY += cardH + 16;
      });

      /* ── 90-Day Sprint Framework ── */
      curY += 20;
      ctx.strokeStyle = goldLine;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(200, curY); ctx.lineTo(W - 200, curY); ctx.stroke();

      curY += 30;
      ctx.fillStyle = C.gold;
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("THE 90-DAY SPRINT FRAMEWORK", W / 2, curY);
      ctx.textAlign = "left";

      curY += 30;

      const phases = [
        {
          name: "Discovery", days: "Day 1–30", color: C.ch1,
          activities: ["Run discovery survey", "Identify pain points", "Map AI opportunities", "Leadership kickoff"],
          output: "Prioritised problem list + team formation",
        },
        {
          name: "Build", days: "Day 31–60", color: C.ch5,
          activities: ["Hands-on workshops", "AI clinics & mentoring", "Prototype with real data", "Iterate with users"],
          output: "Working prototypes solving real problems",
        },
        {
          name: "Showcase", days: "Day 61–90", color: C.ch6,
          activities: ["Demo Day presentations", "Measure impact", "Document learnings", "Plan deployment & scale"],
          output: "Proven solutions + agency playbook",
        },
      ];

      const phW = 340;
      const phGap = 20;
      const phStartX = (W - (3 * phW + 2 * phGap)) / 2;

      phases.forEach((ph, i) => {
        const px = phStartX + i * (phW + phGap);
        const phH = 260;

        // Card
        ctx.fillStyle = C.bgCard;
        ctx.strokeStyle = ph.color + "30";
        ctx.lineWidth = 1;
        roundRect(ctx, px, curY, phW, phH, 12);
        ctx.fill(); ctx.stroke();

        // Top accent
        ctx.fillStyle = ph.color;
        roundRect(ctx, px, curY, phW, 4, 2);
        ctx.fill();

        // Phase name & days
        ctx.fillStyle = ph.color;
        ctx.font = "700 24px 'DM Serif Display', serif";
        ctx.fillText(ph.name, px + 20, curY + 38);

        ctx.fillStyle = C.textDim;
        ctx.font = "500 11px 'JetBrains Mono', monospace";
        ctx.fillText(ph.days, px + 20, curY + 58);

        // Activities
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 12px 'Inter', sans-serif";
        ph.activities.forEach((a, ai) => {
          const ay = curY + 85 + ai * 22;
          ctx.fillStyle = ph.color;
          ctx.beginPath(); ctx.arc(px + 28, ay - 4, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = C.textMuted;
          ctx.fillText(a, px + 40, ay);
        });

        // Output box
        const outY = curY + phH - 55;
        ctx.fillStyle = ph.color + "10";
        roundRect(ctx, px + 14, outY, phW - 28, 40, 6);
        ctx.fill();
        ctx.fillStyle = ph.color;
        ctx.font = "500 10px 'JetBrains Mono', monospace";
        ctx.fillText("OUTPUT", px + 24, outY + 16);
        ctx.fillStyle = C.text;
        ctx.font = "italic 11px 'Inter', sans-serif";
        wrapText(ctx, ph.output, px + 24, outY + 32, phW - 52, 14, 1);
      });

      // Arrows between phases
      ctx.strokeStyle = C.gold + "50";
      ctx.lineWidth = 2;
      for (let i = 0; i < 2; i++) {
        const ax = phStartX + (i + 1) * phW + i * phGap + phGap / 2;
        const ay = curY + 38;
        ctx.beginPath(); ctx.moveTo(ax - 6, ay); ctx.lineTo(ax + 6, ay);
        ctx.moveTo(ax + 2, ay - 4); ctx.lineTo(ax + 6, ay); ctx.lineTo(ax + 2, ay + 4);
        ctx.stroke();
      }

      curY += 300;

      /* ── 4 Leadership Asks ── */
      ctx.strokeStyle = goldLine;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(200, curY); ctx.lineTo(W - 200, curY); ctx.stroke();

      curY += 30;
      ctx.fillStyle = C.gold;
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("YOUR 4 LEADERSHIP ASKS", W / 2, curY);
      ctx.textAlign = "left";

      curY += 25;

      const asks = [
        { num: "01", title: "Participate", desc: "Show up for at least one sprint. Learn alongside your officers.", icon: "👁", color: C.ch1 },
        { num: "02", title: "Protect Time", desc: "Shield sprint time from BAU. Experimentation dies when it competes.", icon: "🛡", color: C.ch5 },
        { num: "03", title: "Nominate AI Lead", desc: "One DD-level champion who drives engagement and organises sprints.", icon: "👤", color: C.ch6 },
        { num: "04", title: "Permission to Fail", desc: "Signal that honest attempts are valued more than perfect execution.", icon: "❤", color: C.ch8 },
      ];

      const askW = (W - 120 - 30) / 2;
      asks.forEach((a, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ax = 60 + col * (askW + 30);
        const ay = curY + row * 100;

        ctx.fillStyle = C.bgCard;
        ctx.strokeStyle = a.color + "25";
        ctx.lineWidth = 1;
        roundRect(ctx, ax, ay, askW, 85, 10);
        ctx.fill(); ctx.stroke();

        // Left accent
        ctx.fillStyle = a.color;
        roundRect(ctx, ax, ay, 4, 85, 2);
        ctx.fill();

        drawIcon(ctx, a.num, ax + 18, ay + 16, 44, a.color);

        ctx.fillStyle = C.text;
        ctx.font = "600 20px 'DM Serif Display', serif";
        ctx.fillText(a.title, ax + 74, ay + 36);
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 12px 'Inter', sans-serif";
        wrapText(ctx, a.desc, ax + 74, ay + 56, askW - 94, 16, 2);
      });

      curY += 230;

      /* ── Quote ── */
      ctx.fillStyle = C.bgCard;
      roundRect(ctx, 80, curY, W - 160, 100, 12);
      ctx.fill();
      ctx.fillStyle = C.gold;
      ctx.font = "italic 700 36px 'DM Serif Display', serif";
      ctx.textAlign = "left";
      ctx.fillText(""", 100, curY + 40);
      ctx.fillStyle = C.text;
      ctx.font = "italic 15px 'Inter', sans-serif";
      ctx.textAlign = "center";
      wrapText(ctx, "The best public service in the world does not wait to be told it is falling behind. It decides to stay ahead.", W / 2, curY + 40, W - 240, 22, 2);
      ctx.fillStyle = C.goldDim;
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.fillText("— Bernard Toh, DCE Strategy, Corporate & Governance, GovTech", W / 2, curY + 84);
      ctx.textAlign = "left";

      curY += 130;

      /* ── Footer ── */
      ctx.strokeStyle = goldLine;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(80, curY); ctx.lineTo(W - 80, curY); ctx.stroke();

      ctx.fillStyle = C.textDim;
      ctx.font = "400 12px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("aifirstplaybook.lovable.app", W / 2, curY + 30);

      ctx.fillStyle = C.goldDim;
      ctx.font = "500 10px 'JetBrains Mono', monospace";
      ctx.fillText("© 2026 GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE", W / 2, curY + 52);
      ctx.textAlign = "left";

      /* ── Trim canvas to actual content height ── */
      const finalH = curY + 80;
      const trimmed = document.createElement("canvas");
      trimmed.width = W * scale;
      trimmed.height = finalH * scale;
      const tCtx = trimmed.getContext("2d")!;
      tCtx.drawImage(canvas, 0, 0, W * scale, finalH * scale, 0, 0, W * scale, finalH * scale);

      const link = document.createElement("a");
      link.download = "AI-First-Playbook-Executive-Brief.png";
      link.href = trimmed.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Infographic generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16 max-w-4xl mx-auto"
      data-pdf-hide
    >
      <div className="bg-surface-elevated border border-border rounded-xl p-8 md:p-10 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-60 h-60 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.6), transparent 70%)" }}
        />
        <div className="relative">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-3">
            ⏱ 3-Minute Executive Brief
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
            Playbook at a Glance
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-xl">
            Download a comprehensive visual summary — all 8 chapters, key stats, the 90-day sprint framework, and 4 leadership asks. Designed for busy executives who want the gist in one shareable image.
          </p>
          <button
            onClick={download}
            disabled={generating}
            className="inline-flex items-center gap-2 gradient-gold-bg text-white font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Infographic
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaybookInfographic;
