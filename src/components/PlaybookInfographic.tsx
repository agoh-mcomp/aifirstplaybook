import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";

/* ── Light-mode colour palette ── */
const C = {
  bg: "#FFFFFF",
  bgSoft: "#F8FAFC",
  bgWarm: "#FFFBF5",
  bgCard: "#F1F5F9",
  primary: "#1E3A5F",
  primaryLight: "#2C5282",
  gold: "#B8860B",
  goldDim: "#8B6914",
  goldLight: "#DAA520",
  goldBg: "#FDF6E3",
  text: "#1E293B",
  textMuted: "#475569",
  textDim: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  ch1: "#2563EB", ch2: "#7C3AED", ch3: "#DC2626", ch4: "#DB2777",
  ch5: "#0D9488", ch6: "#D97706", ch7: "#16A34A", ch8: "#EA580C",
};

/* ── Data ── */
const chapters = [
  { num: "01", title: "Why Now", arc: "THE WORLD BEFORE", color: C.ch1, keyInsight: "The window for managed transformation is narrowing. What we do in the next 2\u20133 years defines whether we lead or scramble.", stats: [{ val: "150K+", label: "Officers" }, { val: "3 days/wk", label: "On repetitive tasks" }], execTakeaway: "Inaction compounds daily across 150,000 officers." },
  { num: "02", title: "The Vision", arc: "THE CALL TO ADVENTURE", color: C.ch2, keyInsight: "AI-First is a mindset shift: \u2018Can AI augment my thinking, speed up my work, and help me solve problems?\u2019", stats: [{ val: "4 Pillars", label: "What Good Looks Like" }, { val: "4 Shifts", label: "Old \u2192 New Model" }], execTakeaway: "Shift from outsourced innovation to in-house building." },
  { num: "03", title: "The Challenge", arc: "THE OBSTACLE", color: C.ch3, keyInsight: "Barriers are human, cultural, and structural \u2014 not technical. This is a culture change problem.", stats: [{ val: "6", label: "Barriers Identified" }, { val: "#1 Gap", label: "Prototype \u2192 Deploy" }], execTakeaway: "Make standing still costlier than moving." },
  { num: "04", title: "Cultural Prerequisites", arc: "THE FOUNDATION", color: C.ch4, keyInsight: "Seven non-negotiable conditions separate agencies that transform from those that merely experiment.", stats: [{ val: "7", label: "Non-Negotiables" }, { val: "#1", label: "Leaders Must Model" }], execTakeaway: "Not optional \u2014 the difference between sticking and fading." },
  { num: "05", title: "The Methodology", arc: "THE GUIDE APPEARS", color: C.ch5, keyInsight: "Three monthly sprints over 90 days. Real problems, protected time, expert support.", stats: [{ val: "90 Days", label: "Sprint Duration" }, { val: "3 Phases", label: "Discover \u2192 Build \u2192 Show" }], execTakeaway: "Clear input, clear output, clear feedback loop." },
  { num: "06", title: "How Do I Start?", arc: "THE JOURNEY", color: C.ch6, keyInsight: "A practical 90-day model your agency runs, owns, and builds the muscle to sustain.", stats: [{ val: "5", label: "Pre-Sprint Checklist" }, { val: "4", label: "Success Tests" }], execTakeaway: "5 officers + 1 real problem > 30 at a workshop." },
  { num: "07", title: "What We\u2019ve Seen", arc: "PROOF IT WORKS", color: C.ch7, keyInsight: "73 AI solutions in 90 days. Confidence jumped 60%. \u2018AI is a tool\u2019 became \u2018AI is a partner.\u2019", stats: [{ val: "73", label: "Solutions Built" }, { val: "60%", label: "Confidence Jump" }], execTakeaway: "\u2018Not technical\u2019 officers built working prototypes in days." },
  { num: "08", title: "Your Move", arc: "THE NEW WORLD", color: C.ch8, keyInsight: "Four asks: Participate, Protect time, Nominate AI Lead, Permission to fail.", stats: [{ val: "4", label: "Leadership Asks" }, { val: "1", label: "Decision: Start Now" }], execTakeaway: "The best public service decides to stay ahead." },
];

const nonNegotiables = [
  { num: "1", title: "Leadership Modeling", desc: "Leaders participate as learners, not just sponsors", emoji: "\uD83D\uDC64", color: C.ch1 },
  { num: "2", title: "Permission to Invest Time", desc: "Explicit runway away from BAU to experiment", emoji: "\u23F3", color: C.ch2 },
  { num: "3", title: "Reward Learning & Risk", desc: "Celebrate attempts and lessons, not just wins", emoji: "\uD83C\uDFC6", color: C.ch5 },
  { num: "4", title: "Start with Problems", desc: "Identify pain points before reaching for tools", emoji: "\uD83C\uDFAF", color: C.ch3 },
  { num: "5", title: "Peer Proof Points", desc: "See people like you succeed and draw inspiration", emoji: "\uD83E\uDD1D", color: C.ch7 },
  { num: "6", title: "Sustained Engagement", desc: "AI capability is a muscle \u2014 3 sprints, not 1 hackathon", emoji: "\uD83D\uDD04", color: C.ch6 },
  { num: "7", title: "Pragmatic Data Classification", desc: "Be willing to try commercial AI for non-sensitive work", emoji: "\uD83D\uDCCA", color: C.ch4 },
];

/* ── Canvas helpers ── */
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number, maxLines = 99) {
  const words = text.split(" ");
  let line = "", cy = y, lines = 0;
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) {
      lines++;
      if (lines >= maxLines) { ctx.fillText(line.trim() + "\u2026", x, cy); return cy + lh; }
      ctx.fillText(line.trim(), x, cy); line = w + " "; cy += lh;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, cy);
  return cy + lh;
}

function drawBadge(ctx: CanvasRenderingContext2D, num: string, x: number, y: number, size: number, color: string) {
  // Gradient circle
  const grad = ctx.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size / 2);
  grad.addColorStop(0, color + "25");
  grad.addColorStop(1, color + "08");
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = color + "35";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = `700 ${Math.floor(size * 0.38)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.fillText(num, x + size / 2, y + size * 0.58);
  ctx.textAlign = "left";
}

function drawDecoCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, opacity: string = "08") {
  ctx.fillStyle = color + opacity;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}

function drawGoldDivider(ctx: CanvasRenderingContext2D, W: number, y: number) {
  const g = ctx.createLinearGradient(100, 0, W - 100, 0);
  g.addColorStop(0, "transparent"); g.addColorStop(0.15, C.gold + "60");
  g.addColorStop(0.5, C.gold); g.addColorStop(0.85, C.gold + "60");
  g.addColorStop(1, "transparent");
  ctx.strokeStyle = g; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(100, y); ctx.lineTo(W - 100, y); ctx.stroke();
}

function drawSectionTitle(ctx: CanvasRenderingContext2D, W: number, y: number, text: string) {
  // Pill background
  const tw = ctx.measureText(text).width;
  ctx.fillStyle = C.goldBg;
  rr(ctx, W / 2 - tw / 2 - 20, y - 12, tw + 40, 26, 13);
  ctx.fill();
  ctx.strokeStyle = C.gold + "30";
  ctx.lineWidth = 1;
  rr(ctx, W / 2 - tw / 2 - 20, y - 12, tw + 40, 26, 13);
  ctx.stroke();
  ctx.fillStyle = C.gold;
  ctx.textAlign = "center";
  ctx.fillText(text, W / 2, y + 4);
  ctx.textAlign = "left";
}

const PlaybookInfographic = () => {
  const [generating, setGenerating] = useState(false);

  const download = useCallback(async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 50));

    try {
      const { jsPDF } = await import("jspdf");
      const scale = 2;
      const W = 1200;
      const H = 5200;
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);

      /* ── Background ── */
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);

      // Decorative background circles
      drawDecoCircle(ctx, 150, 200, 300, C.ch1, "04");
      drawDecoCircle(ctx, W - 100, 600, 250, C.ch2, "03");
      drawDecoCircle(ctx, 200, 1400, 200, C.ch5, "03");
      drawDecoCircle(ctx, W - 150, 2000, 280, C.ch6, "03");
      drawDecoCircle(ctx, 300, 3000, 250, C.ch7, "03");
      drawDecoCircle(ctx, W - 200, 3800, 200, C.ch4, "03");

      // Dot grid
      ctx.fillStyle = "#E2E8F012";
      for (let gx = 40; gx < W; gx += 50) {
        for (let gy = 40; gy < H; gy += 50) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.6, 0, Math.PI * 2); ctx.fill();
        }
      }

      /* ══════════════ HEADER ══════════════ */
      // Top gold bar
      ctx.fillStyle = C.gold;
      ctx.fillRect(0, 0, W, 5);

      // Badge
      let curY = 55;
      ctx.fillStyle = C.goldBg;
      rr(ctx, W / 2 - 130, curY, 260, 34, 17);
      ctx.fill();
      ctx.strokeStyle = C.gold + "50";
      ctx.lineWidth = 1;
      rr(ctx, W / 2 - 130, curY, 260, 34, 17);
      ctx.stroke();
      ctx.fillStyle = C.gold;
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("\u23F1  3-MINUTE EXECUTIVE BRIEF", W / 2, curY + 22);

      // Title
      curY = 120;
      ctx.fillStyle = C.textDim;
      ctx.font = "500 14px 'JetBrains Mono', monospace";
      ctx.fillText("THE AI-FIRST PLAYBOOK", W / 2, curY);

      curY = 175;
      ctx.fillStyle = C.primary;
      ctx.font = "700 62px 'DM Serif Display', serif";
      ctx.fillText("Your Agency.", W / 2, curY);

      const tg = ctx.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0);
      tg.addColorStop(0, C.goldDim); tg.addColorStop(0.5, C.gold); tg.addColorStop(1, C.goldLight);
      ctx.fillStyle = tg;
      ctx.font = "italic 700 62px 'DM Serif Display', serif";
      ctx.fillText("Transformed.", W / 2, 240);

      ctx.fillStyle = C.textMuted;
      ctx.font = "400 17px 'Inter', sans-serif";
      ctx.fillText("A practical guide for leaders and practitioners", W / 2, 285);
      ctx.fillText("ready to move from AI-curious to AI-first.", W / 2, 310);

      // Hero stats banner with colour-coded icons
      curY = 350;
      const bannerGrad = ctx.createLinearGradient(60, curY, W - 60, curY);
      bannerGrad.addColorStop(0, C.primary); bannerGrad.addColorStop(1, C.primaryLight);
      ctx.fillStyle = bannerGrad;
      rr(ctx, 60, curY, W - 120, 95, 16);
      ctx.fill();

      const heroStats = [
        { val: "73", label: "AI Solutions Built", icon: "\u26A1" },
        { val: "90 Days", label: "Sprint Duration", icon: "\uD83D\uDCC5" },
        { val: "200+", label: "Officers Engaged", icon: "\uD83D\uDC65" },
        { val: "60%", label: "Confidence Jump", icon: "\uD83D\uDCC8" },
      ];
      const bw = (W - 120) / 4;
      heroStats.forEach((s, i) => {
        const bx = 60 + i * bw + bw / 2;
        // Icon
        ctx.font = "400 18px sans-serif";
        ctx.fillText(s.icon, bx - 4, curY + 32);
        // Value
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 28px 'DM Serif Display', serif";
        ctx.fillText(s.val, bx, curY + 38);
        // Label
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "400 11px 'Inter', sans-serif";
        ctx.fillText(s.label, bx, curY + 60);
        // Divider
        if (i < 3) {
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(60 + (i + 1) * bw, curY + 18);
          ctx.lineTo(60 + (i + 1) * bw, curY + 77);
          ctx.stroke();
        }
      });

      /* ══════════════ CHAPTERS ══════════════ */
      curY = 500;
      drawGoldDivider(ctx, W, curY - 18);
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      drawSectionTitle(ctx, W, curY, "THE HERO\u2019S JOURNEY \u2014 8 CHAPTERS");

      curY += 30;
      const mx = 60;
      const cardW = W - mx * 2;

      chapters.forEach((ch, i) => {
        const cardH = 210;
        const x = mx;
        const y = curY;

        // Card with subtle gradient
        const cg = ctx.createLinearGradient(x, y, x + cardW, y);
        cg.addColorStop(0, ch.color + "06");
        cg.addColorStop(1, C.bgSoft);
        ctx.fillStyle = cg;
        rr(ctx, x, y, cardW, cardH, 14);
        ctx.fill();
        ctx.strokeStyle = ch.color + "20";
        ctx.lineWidth = 1;
        rr(ctx, x, y, cardW, cardH, 14);
        ctx.stroke();

        // Decorative corner arc
        ctx.save();
        ctx.beginPath();
        rr(ctx, x, y, cardW, cardH, 14);
        ctx.clip();
        drawDecoCircle(ctx, x + cardW - 30, y - 10, 80, ch.color, "08");
        ctx.restore();

        // Left accent bar with gradient
        const abg = ctx.createLinearGradient(x, y, x, y + cardH);
        abg.addColorStop(0, ch.color); abg.addColorStop(1, ch.color + "40");
        ctx.fillStyle = abg;
        rr(ctx, x, y + 8, 5, cardH - 16, 3);
        ctx.fill();

        // Number badge
        drawBadge(ctx, ch.num, x + 20, y + 14, 48, ch.color);

        // Arc & title
        ctx.fillStyle = ch.color;
        ctx.font = "600 10px 'JetBrains Mono', monospace";
        ctx.fillText(ch.arc, x + 80, y + 30);
        ctx.fillStyle = C.text;
        ctx.font = "600 26px 'DM Serif Display', serif";
        ctx.fillText(ch.title, x + 80, y + 56);

        // Key insight
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 13.5px 'Inter', sans-serif";
        wrap(ctx, ch.keyInsight, x + 20, y + 86, cardW - 40, 20, 3);

        // Stats
        const sY = y + 148;
        ch.stats.forEach((s, si) => {
          const sx = x + 20 + si * 200;
          ctx.fillStyle = ch.color + "08";
          rr(ctx, sx, sY, 180, 46, 8); ctx.fill();
          ctx.strokeStyle = ch.color + "18";
          rr(ctx, sx, sY, 180, 46, 8); ctx.stroke();
          ctx.fillStyle = ch.color;
          ctx.font = "700 20px 'DM Serif Display', serif";
          ctx.fillText(s.val, sx + 12, sY + 22);
          ctx.fillStyle = C.textDim;
          ctx.font = "400 10px 'Inter', sans-serif";
          ctx.fillText(s.label, sx + 12, sY + 38);
        });

        // Exec takeaway
        const tX = x + 430;
        const tW = cardW - 430 - 20;
        ctx.fillStyle = C.goldBg;
        rr(ctx, tX, sY, tW, 46, 8); ctx.fill();
        ctx.strokeStyle = C.gold + "30";
        rr(ctx, tX, sY, tW, 46, 8); ctx.stroke();
        ctx.fillStyle = C.gold;
        ctx.font = "700 9px 'JetBrains Mono', monospace";
        ctx.fillText("\u25C6 EXEC TAKEAWAY", tX + 10, sY + 15);
        ctx.fillStyle = C.goldDim;
        ctx.font = "italic 11.5px 'Inter', sans-serif";
        wrap(ctx, ch.execTakeaway, tX + 10, sY + 32, tW - 20, 15, 2);

        curY += cardH + 12;
      });

      /* ══════════════ 7 NON-NEGOTIABLES ══════════════ */
      curY += 30;
      drawGoldDivider(ctx, W, curY - 12);
      curY += 14;
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      drawSectionTitle(ctx, W, curY, "THE 7 CULTURAL NON-NEGOTIABLES");

      curY += 14;
      ctx.fillStyle = C.textMuted;
      ctx.font = "italic 14px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("The conditions that separate agencies that transform from those that merely experiment.", W / 2, curY);
      ctx.textAlign = "left";

      curY += 30;

      // Visual hexagonal-inspired layout
      const nnW = 330;
      const nnH = 90;
      const nnGapX = 30;
      const nnGapY = 14;
      const nnStartX = (W - (3 * nnW + 2 * nnGapX)) / 2;

      nonNegotiables.forEach((nn, i) => {
        const col = i < 6 ? i % 3 : 1; // Last item centred
        const row = i < 6 ? Math.floor(i / 3) : 2;
        const nx = i < 6 ? nnStartX + col * (nnW + nnGapX) : (W - nnW) / 2;
        const ny = curY + row * (nnH + nnGapY);

        // Card with coloured gradient
        const ng = ctx.createLinearGradient(nx, ny, nx + nnW, ny + nnH);
        ng.addColorStop(0, nn.color + "08"); ng.addColorStop(1, "#FFFFFF");
        ctx.fillStyle = ng;
        rr(ctx, nx, ny, nnW, nnH, 12); ctx.fill();
        ctx.strokeStyle = nn.color + "22";
        ctx.lineWidth = 1;
        rr(ctx, nx, ny, nnW, nnH, 12); ctx.stroke();

        // Left colour bar
        ctx.fillStyle = nn.color;
        rr(ctx, nx, ny + 6, 4, nnH - 12, 2); ctx.fill();

        // Emoji icon in circle
        ctx.fillStyle = nn.color + "12";
        ctx.beginPath(); ctx.arc(nx + 34, ny + nnH / 2, 20, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = nn.color + "25";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(nx + 34, ny + nnH / 2, 20, 0, Math.PI * 2); ctx.stroke();
        ctx.font = "400 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(nn.emoji, nx + 34, ny + nnH / 2 + 6);
        ctx.textAlign = "left";

        // Number & title
        ctx.fillStyle = nn.color;
        ctx.font = "700 10px 'JetBrains Mono', monospace";
        ctx.fillText(nn.num, nx + 62, ny + 28);
        ctx.fillStyle = C.text;
        ctx.font = "600 16px 'DM Serif Display', serif";
        ctx.fillText(nn.title, nx + 78, ny + 30);

        // Description
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 12px 'Inter', sans-serif";
        wrap(ctx, nn.desc, nx + 62, ny + 52, nnW - 74, 16, 2);
      });

      curY += 3 * (nnH + nnGapY) + 20;

      /* ══════════════ 90-DAY SPRINT ══════════════ */
      curY += 10;
      drawGoldDivider(ctx, W, curY - 6);
      curY += 20;
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      drawSectionTitle(ctx, W, curY, "THE 90-DAY SPRINT FRAMEWORK");

      curY += 30;

      const phases = [
        { name: "Discovery", days: "Day 1\u201330", color: C.ch1, emoji: "\uD83D\uDD0D", activities: ["Run discovery survey", "Identify pain points", "Map AI opportunities", "Leadership kickoff"], output: "Prioritised problem list + team formation" },
        { name: "Build", days: "Day 31\u201360", color: C.ch5, emoji: "\uD83D\uDEE0\uFE0F", activities: ["Hands-on workshops", "AI clinics & mentoring", "Prototype with real data", "Iterate with users"], output: "Working prototypes solving real problems" },
        { name: "Showcase", days: "Day 61\u201390", color: C.ch6, emoji: "\uD83C\uDFAC", activities: ["Demo Day presentations", "Measure impact", "Document learnings", "Plan deployment & scale"], output: "Proven solutions + agency playbook" },
      ];

      const phW = 340;
      const phGap = 20;
      const phStartX = (W - (3 * phW + 2 * phGap)) / 2;

      phases.forEach((ph, i) => {
        const px = phStartX + i * (phW + phGap);
        const phH = 280;

        // Card
        const pg = ctx.createLinearGradient(px, curY, px, curY + phH);
        pg.addColorStop(0, ph.color + "06"); pg.addColorStop(1, C.bgSoft);
        ctx.fillStyle = pg;
        rr(ctx, px, curY, phW, phH, 12); ctx.fill();
        ctx.strokeStyle = ph.color + "20";
        ctx.lineWidth = 1;
        rr(ctx, px, curY, phW, phH, 12); ctx.stroke();

        // Top accent gradient bar
        const tbg = ctx.createLinearGradient(px, 0, px + phW, 0);
        tbg.addColorStop(0, ph.color); tbg.addColorStop(1, ph.color + "60");
        ctx.fillStyle = tbg;
        rr(ctx, px, curY, phW, 5, 2); ctx.fill();

        // Emoji
        ctx.font = "400 28px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(ph.emoji, px + 18, curY + 40);

        // Phase name
        ctx.fillStyle = ph.color;
        ctx.font = "700 26px 'DM Serif Display', serif";
        ctx.fillText(ph.name, px + 56, curY + 40);

        ctx.fillStyle = C.textDim;
        ctx.font = "600 11px 'JetBrains Mono', monospace";
        ctx.fillText(ph.days, px + 56, curY + 60);

        // Activities with custom bullets
        ph.activities.forEach((a, ai) => {
          const ay = curY + 90 + ai * 26;
          // Coloured bullet
          ctx.fillStyle = ph.color + "25";
          ctx.beginPath(); ctx.arc(px + 28, ay - 4, 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = ph.color;
          ctx.beginPath(); ctx.arc(px + 28, ay - 4, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = C.textMuted;
          ctx.font = "400 13px 'Inter', sans-serif";
          ctx.fillText(a, px + 44, ay);
        });

        // Output box
        const outY = curY + phH - 62;
        ctx.fillStyle = ph.color + "08";
        rr(ctx, px + 14, outY, phW - 28, 48, 8); ctx.fill();
        ctx.strokeStyle = ph.color + "18";
        rr(ctx, px + 14, outY, phW - 28, 48, 8); ctx.stroke();
        ctx.fillStyle = ph.color;
        ctx.font = "700 10px 'JetBrains Mono', monospace";
        ctx.fillText("\u2192 OUTPUT", px + 24, outY + 18);
        ctx.fillStyle = C.text;
        ctx.font = "italic 12px 'Inter', sans-serif";
        wrap(ctx, ph.output, px + 24, outY + 36, phW - 52, 15, 1);
      });

      // Connecting arrows between phases
      ctx.lineWidth = 2;
      for (let i = 0; i < 2; i++) {
        const ax = phStartX + (i + 1) * phW + i * phGap + phGap / 2;
        const ay = curY + 40;
        const ag = ctx.createLinearGradient(ax - 12, 0, ax + 12, 0);
        ag.addColorStop(0, phases[i].color); ag.addColorStop(1, phases[i + 1].color);
        ctx.strokeStyle = ag;
        ctx.beginPath(); ctx.moveTo(ax - 10, ay); ctx.lineTo(ax + 10, ay);
        ctx.moveTo(ax + 5, ay - 5); ctx.lineTo(ax + 10, ay); ctx.lineTo(ax + 5, ay + 5);
        ctx.stroke();
      }

      curY += 320;

      /* ══════════════ 4 LEADERSHIP ASKS ══════════════ */
      drawGoldDivider(ctx, W, curY - 6);
      curY += 20;
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      drawSectionTitle(ctx, W, curY, "YOUR 4 LEADERSHIP ASKS");

      curY += 25;

      const asks = [
        { num: "01", title: "Participate", desc: "Show up for at least one sprint. Learn alongside your officers.", emoji: "\uD83D\uDC41\uFE0F", color: C.ch1 },
        { num: "02", title: "Protect Time", desc: "Shield sprint time from BAU. Experimentation dies when it competes.", emoji: "\uD83D\uDEE1\uFE0F", color: C.ch5 },
        { num: "03", title: "Nominate AI Lead", desc: "One DD-level champion who drives engagement and organises sprints.", emoji: "\uD83D\uDC64", color: C.ch6 },
        { num: "04", title: "Permission to Fail", desc: "Signal that honest attempts are valued more than perfect execution.", emoji: "\u2764\uFE0F", color: C.ch8 },
      ];

      const askW = (W - 120 - 30) / 2;
      asks.forEach((a, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ax = 60 + col * (askW + 30);
        const ay = curY + row * 105;

        // Card
        const ag2 = ctx.createLinearGradient(ax, ay, ax + askW, ay + 90);
        ag2.addColorStop(0, a.color + "06"); ag2.addColorStop(1, C.bgSoft);
        ctx.fillStyle = ag2;
        rr(ctx, ax, ay, askW, 90, 12); ctx.fill();
        ctx.strokeStyle = a.color + "20";
        ctx.lineWidth = 1;
        rr(ctx, ax, ay, askW, 90, 12); ctx.stroke();

        // Left accent
        const abg2 = ctx.createLinearGradient(ax, ay, ax, ay + 90);
        abg2.addColorStop(0, a.color); abg2.addColorStop(1, a.color + "40");
        ctx.fillStyle = abg2;
        rr(ctx, ax, ay + 8, 4, 74, 2); ctx.fill();

        // Emoji
        ctx.font = "400 22px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(a.emoji, ax + 34, ay + 42);
        ctx.textAlign = "left";

        // Title
        ctx.fillStyle = C.text;
        ctx.font = "600 20px 'DM Serif Display', serif";
        ctx.fillText(a.title, ax + 60, ay + 36);
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 12px 'Inter', sans-serif";
        wrap(ctx, a.desc, ax + 60, ay + 56, askW - 80, 16, 2);
      });

      curY += 240;

      /* ══════════════ QUOTE ══════════════ */
      // Warm background quote box
      ctx.fillStyle = C.goldBg;
      rr(ctx, 60, curY, W - 120, 120, 16); ctx.fill();
      ctx.strokeStyle = C.gold + "30";
      ctx.lineWidth = 1;
      rr(ctx, 60, curY, W - 120, 120, 16); ctx.stroke();

      // Gold bar
      ctx.fillStyle = C.gold;
      rr(ctx, 60, curY + 14, 5, 92, 3); ctx.fill();

      // Big quote mark
      ctx.fillStyle = C.gold + "40";
      ctx.font = "italic 700 80px 'DM Serif Display', serif";
      ctx.textAlign = "left";
      ctx.fillText("\u201C", 78, curY + 60);

      ctx.fillStyle = C.text;
      ctx.font = "italic 16px 'Inter', sans-serif";
      ctx.textAlign = "center";
      wrap(ctx, "The best public service in the world does not wait to be told it is falling behind. It decides to stay ahead.", W / 2, curY + 46, W - 220, 24, 2);

      ctx.fillStyle = C.goldDim;
      ctx.font = "600 11px 'JetBrains Mono', monospace";
      ctx.fillText("\u2014 Bernard Toh, DCE Strategy, Corporate & Governance, GovTech", W / 2, curY + 100);
      ctx.textAlign = "left";

      curY += 150;

      /* ══════════════ FOOTER ══════════════ */
      drawGoldDivider(ctx, W, curY);
      curY += 24;
      ctx.fillStyle = C.textDim;
      ctx.font = "400 13px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("aifirstplaybook.lovable.app", W / 2, curY);

      curY += 24;
      ctx.fillStyle = C.goldDim;
      ctx.font = "600 10px 'JetBrains Mono', monospace";
      ctx.fillText("\u00A9 2026 Government Technology Agency of Singapore", W / 2, curY);

      // Bottom gold bar
      curY += 20;
      ctx.fillStyle = C.gold;
      ctx.fillRect(0, curY, W, 5);

      ctx.textAlign = "left";

      /* ── Export as PDF ── */
      const finalH = curY + 5;
      const trimmed = document.createElement("canvas");
      trimmed.width = W * scale;
      trimmed.height = finalH * scale;
      const tCtx = trimmed.getContext("2d")!;
      tCtx.drawImage(canvas, 0, 0, W * scale, finalH * scale, 0, 0, W * scale, finalH * scale);

      const pdfW = 210;
      const pdfH = 297;
      const pdf = new jsPDF("p", "mm", "a4");
      const pxPerMm = (W * scale) / pdfW;
      const pageHeightPx = Math.floor(pdfH * pxPerMm);
      const totalPages = Math.ceil((finalH * scale) / pageHeightPx);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        const sourceY = page * pageHeightPx;
        const sliceH = Math.min(pageHeightPx, finalH * scale - sourceY);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = W * scale;
        pageCanvas.height = sliceH;
        const pCtx = pageCanvas.getContext("2d")!;
        pCtx.drawImage(trimmed, 0, sourceY, W * scale, sliceH, 0, 0, W * scale, sliceH);
        const pageImg = pageCanvas.toDataURL("image/png");
        const sliceMm = Math.min(pdfH, sliceH / pxPerMm);
        pdf.addImage(pageImg, "PNG", 0, 0, pdfW, sliceMm, undefined, "FAST");
      }

      pdf.save("AI-First-Playbook-Executive-Brief.pdf");
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
        <div className="absolute top-0 right-0 w-60 h-60 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.6), transparent 70%)" }} />
        <div className="relative">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-3">
            {"\u23F1"} 3-Minute Executive Brief
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
            Playbook at a Glance
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-xl">
            Download a comprehensive visual summary as a PDF {"\u2014"} all 8 chapters, the 7 cultural non-negotiables, 90-day sprint framework, and 4 leadership asks. Designed for busy executives.
          </p>
          <button
            onClick={download}
            disabled={generating}
            className="inline-flex items-center gap-2 gradient-gold-bg text-white font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {generating ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Generating PDF{"\u2026"}</>
            ) : (
              <><Download className="w-4 h-4" />Download Executive Brief (PDF)</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaybookInfographic;
