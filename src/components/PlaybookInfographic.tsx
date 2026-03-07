import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import heroImg from "@/assets/infographic-hero.png";
import sprintImg from "@/assets/infographic-sprint.png";
import teamImg from "@/assets/infographic-team.png";

/* ── Vibrant palette: bright blues + gold + high contrast ── */
const C = {
  bg: "#FFFFFF",
  bgSoft: "#EDF2FF",
  navy: "#0A3D91",
  navyLight: "#1565C0",
  navyPale: "#D6E4FF",
  gold: "#C49000",
  goldDim: "#8B6914",
  goldLight: "#DAA520",
  goldBg: "#FFF8E1",
  text: "#0F172A",
  textMuted: "#1E293B",
  textDim: "#334155",
  textLight: "#94A3B8",
  border: "#CBD5E1",
};

/* ── Data ── */
const chapters = [
  { num: "01", title: "Why Now", keyInsight: "The window for managed transformation is narrowing. What we do in the next 2\u20133 years defines whether we lead or scramble.", stats: [{ val: "150K+", label: "Officers" }, { val: "3 days/wk", label: "On repetitive tasks" }], execTakeaway: "Inaction compounds daily across 150,000 officers." },
  { num: "02", title: "The Vision", keyInsight: "AI-First is a mindset shift: \u2018Can AI augment my thinking, speed up my work, and help me solve problems?\u2019", stats: [{ val: "4 Pillars", label: "What Good Looks Like" }, { val: "4 Shifts", label: "Old \u2192 New Model" }], execTakeaway: "Shift from outsourced innovation to in-house building." },
  { num: "03", title: "The Challenge", keyInsight: "Barriers are human, cultural, and structural \u2014 not technical. This is a culture change problem.", stats: [{ val: "6", label: "Barriers Identified" }, { val: "#1 Gap", label: "Prototype \u2192 Deploy" }], execTakeaway: "Make standing still costlier than moving." },
  { num: "04", title: "Cultural Prerequisites", keyInsight: "Seven non-negotiable conditions separate agencies that transform from those that merely experiment.", stats: [{ val: "7", label: "Non-Negotiables" }, { val: "#1", label: "Leaders Must Model" }], execTakeaway: "Not optional \u2014 the difference between sticking and fading." },
  { num: "05", title: "The Methodology", keyInsight: "Three monthly sprints over 90 days. Real problems, protected time, expert support.", stats: [{ val: "90 Days", label: "Sprint Duration" }, { val: "3 Phases", label: "Discover \u2192 Build \u2192 Show" }], execTakeaway: "Clear input, clear output, clear feedback loop." },
  { num: "06", title: "How Do I Start?", keyInsight: "A practical 90-day model your agency runs, owns, and builds the muscle to sustain.", stats: [{ val: "5", label: "Pre-Sprint Checklist" }, { val: "4", label: "Success Tests" }], execTakeaway: "5 officers + 1 real problem > 30 at a workshop." },
  { num: "07", title: "What We\u2019ve Seen", keyInsight: "73 AI solutions in 90 days. Confidence jumped 60%. \u2018AI is a tool\u2019 became \u2018AI is a partner.\u2019", stats: [{ val: "73", label: "Solutions Built" }, { val: "60%", label: "Confidence Jump" }], execTakeaway: "\u2018Not technical\u2019 officers built working prototypes in days." },
  { num: "08", title: "Your Move", keyInsight: "Four asks: Participate, Protect time, Nominate AI Lead, Permission to fail.", stats: [{ val: "4", label: "Leadership Asks" }, { val: "1", label: "Decision: Start Now" }], execTakeaway: "The best public service decides to stay ahead." },
];

const nonNegotiables = [
  { num: "1", title: "Leadership Modeling", desc: "Leaders participate as learners, not just sponsors", emoji: "\uD83D\uDC64" },
  { num: "2", title: "Permission to Invest Time", desc: "Explicit runway away from BAU to experiment", emoji: "\u23F3" },
  { num: "3", title: "Reward Learning & Risk", desc: "Celebrate attempts and lessons, not just wins", emoji: "\uD83C\uDFC6" },
  { num: "4", title: "Start with Problems", desc: "Identify pain points before reaching for tools", emoji: "\uD83C\uDFAF" },
  { num: "5", title: "Peer Proof Points", desc: "See people like you succeed and draw inspiration", emoji: "\uD83E\uDD1D" },
  { num: "6", title: "Sustained Engagement", desc: "AI capability is a muscle \u2014 3 sprints, not 1 hackathon", emoji: "\uD83D\uDD04" },
  { num: "7", title: "Pragmatic Data Classification", desc: "Be willing to try commercial AI for non-sensitive work", emoji: "\uD83D\uDCCA" },
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

function drawGoldDivider(ctx: CanvasRenderingContext2D, W: number, y: number) {
  const g = ctx.createLinearGradient(100, 0, W - 100, 0);
  g.addColorStop(0, "transparent"); g.addColorStop(0.15, C.gold + "60");
  g.addColorStop(0.5, C.gold); g.addColorStop(0.85, C.gold + "60");
  g.addColorStop(1, "transparent");
  ctx.strokeStyle = g; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(100, y); ctx.lineTo(W - 100, y); ctx.stroke();
}

function drawSectionLabel(ctx: CanvasRenderingContext2D, W: number, y: number, text: string) {
  ctx.font = "700 14px 'JetBrains Mono', monospace";
  const tw = ctx.measureText(text).width;
  ctx.fillStyle = C.goldBg;
  rr(ctx, W / 2 - tw / 2 - 22, y - 14, tw + 44, 30, 15);
  ctx.fill();
  ctx.strokeStyle = C.gold + "40";
  ctx.lineWidth = 1.5;
  rr(ctx, W / 2 - tw / 2 - 22, y - 14, tw + 44, 30, 15);
  ctx.stroke();
  ctx.fillStyle = C.gold;
  ctx.textAlign = "center";
  ctx.fillText(text, W / 2, y + 5);
  ctx.textAlign = "left";
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const PlaybookInfographic = () => {
  const [generating, setGenerating] = useState(false);

  const download = useCallback(async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 50));

    try {
      const { jsPDF } = await import("jspdf");
      const [hero, sprint, team] = await Promise.all([
        loadImg(heroImg), loadImg(sprintImg), loadImg(teamImg),
      ]);

      const scale = 3;
      const W = 1200;
      const H = 6200;
      const sectionBreaks: number[] = [];
      const addPageBreak = (y: number) => sectionBreaks.push(Math.max(0, Math.floor(y)));
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      /* ── Background ── */
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);

      /* ══════════════ HEADER ══════════════ */
      // Top accent bar - bright blue gradient
      const topBar = ctx.createLinearGradient(0, 0, W, 0);
      topBar.addColorStop(0, C.navy); topBar.addColorStop(1, C.navyLight);
      ctx.fillStyle = topBar;
      ctx.fillRect(0, 0, W, 6);

      // Badge
      let curY = 55;
      ctx.fillStyle = C.goldBg;
      rr(ctx, W / 2 - 140, curY, 280, 38, 19);
      ctx.fill();
      ctx.strokeStyle = C.gold + "60";
      ctx.lineWidth = 1.5;
      rr(ctx, W / 2 - 140, curY, 280, 38, 19);
      ctx.stroke();
      ctx.fillStyle = C.gold;
      ctx.font = "700 13px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("\u23F1  3-MINUTE EXECUTIVE BRIEF", W / 2, curY + 25);

      // Title
      curY = 130;
      ctx.fillStyle = C.textDim;
      ctx.font = "500 15px 'JetBrains Mono', monospace";
      ctx.fillText("THE AI-FIRST PLAYBOOK", W / 2, curY);

      curY = 185;
      ctx.fillStyle = C.navy;
      ctx.font = "700 62px 'DM Serif Display', serif";
      ctx.fillText("Your Agency. Transformed.", W / 2, curY);

      ctx.fillStyle = C.textMuted;
      ctx.font = "400 19px 'Inter', sans-serif";
      ctx.fillText("A practical guide for leaders ready to move from AI-curious to AI-first.", W / 2, curY + 48);
      ctx.textAlign = "left";

      /* ── Hero image ── */
      curY = 270;
      const heroH = 280;
      const heroW = W - 140;
      ctx.save();
      rr(ctx, 70, curY, heroW, heroH, 16);
      ctx.clip();
      ctx.drawImage(hero, 70, curY, heroW, heroH);
      ctx.restore();
      ctx.strokeStyle = C.border;
      ctx.lineWidth = 1.5;
      rr(ctx, 70, curY, heroW, heroH, 16);
      ctx.stroke();

      /* ── Hero stats banner ── */
      curY += heroH + 30;
      const bannerGrad = ctx.createLinearGradient(50, curY, W - 50, curY + 100);
      bannerGrad.addColorStop(0, C.navy); bannerGrad.addColorStop(1, C.navyLight);
      ctx.fillStyle = bannerGrad;
      rr(ctx, 50, curY, W - 100, 100, 14);
      ctx.fill();

      const heroStats = [
        { val: "73", label: "AI Solutions Built" },
        { val: "90 Days", label: "Sprint Duration" },
        { val: "200+", label: "Officers Engaged" },
        { val: "60%", label: "Confidence Jump" },
      ];
      const bw = (W - 100) / 4;
      ctx.textAlign = "center";
      heroStats.forEach((s, i) => {
        const bx = 50 + i * bw + bw / 2;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 32px 'DM Serif Display', serif";
        ctx.fillText(s.val, bx, curY + 42);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.font = "500 13px 'Inter', sans-serif";
        ctx.fillText(s.label, bx, curY + 66);
        if (i < 3) {
          ctx.strokeStyle = "rgba(255,255,255,0.2)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(50 + (i + 1) * bw, curY + 18);
          ctx.lineTo(50 + (i + 1) * bw, curY + 82);
          ctx.stroke();
        }
      });
      ctx.textAlign = "left";
      addPageBreak(curY + 120);

      /* ══════════════ CHAPTERS ══════════════ */
      curY += 140;
      drawGoldDivider(ctx, W, curY - 22);
      drawSectionLabel(ctx, W, curY, "THE JOURNEY \u2014 8 CHAPTERS");

      curY += 40;
      const mx = 50;
      const cardW = (W - mx * 2 - 24) / 2;

      chapters.forEach((ch, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cardH = 210;
        const x = mx + col * (cardW + 24);
        const y = curY + row * (cardH + 20);

        // Card with brighter blue tint
        ctx.fillStyle = C.bgSoft;
        rr(ctx, x, y, cardW, cardH, 12);
        ctx.fill();
        ctx.strokeStyle = C.border;
        ctx.lineWidth = 1.5;
        rr(ctx, x, y, cardW, cardH, 12);
        ctx.stroke();

        // Left blue accent bar
        const accentGrad = ctx.createLinearGradient(x, y, x, y + cardH);
        accentGrad.addColorStop(0, C.navy); accentGrad.addColorStop(1, C.navyLight);
        ctx.fillStyle = accentGrad;
        rr(ctx, x, y + 10, 5, cardH - 20, 3);
        ctx.fill();

        // Number circle
        ctx.fillStyle = C.navy;
        ctx.beginPath(); ctx.arc(x + 36, y + 34, 20, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 16px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(ch.num, x + 36, y + 40);
        ctx.textAlign = "left";

        // Title - larger
        ctx.fillStyle = C.navy;
        ctx.font = "600 24px 'DM Serif Display', serif";
        ctx.fillText(ch.title, x + 66, y + 42);

        // Key insight - larger with more spacing
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 14px 'Inter', sans-serif";
        wrap(ctx, ch.keyInsight, x + 20, y + 72, cardW - 40, 21, 3);

        // Stats row - more spacing
        const sY = y + 142;
        ch.stats.forEach((s, si) => {
          const sx = x + 20 + si * (cardW / 2 - 14);
          const sw = cardW / 2 - 30;
          ctx.fillStyle = C.navyPale;
          rr(ctx, sx, sY, sw, 48, 8); ctx.fill();
          ctx.fillStyle = C.navy;
          ctx.font = "700 19px 'DM Serif Display', serif";
          ctx.fillText(s.val, sx + 12, sY + 22);
          ctx.fillStyle = C.textDim;
          ctx.font = "400 11px 'Inter', sans-serif";
          ctx.fillText(s.label, sx + 12, sY + 39);
        });
      });

      curY += 4 * (210 + 20) + 30;
      addPageBreak(curY - 8);

      /* ── Team illustration ── */
      const teamH = 240;
      const teamW = W - 180;
      ctx.save();
      rr(ctx, 90, curY, teamW, teamH, 16);
      ctx.clip();
      ctx.drawImage(team, 90, curY, teamW, teamH);
      ctx.restore();
      ctx.strokeStyle = C.border;
      ctx.lineWidth = 1.5;
      rr(ctx, 90, curY, teamW, teamH, 16);
      ctx.stroke();

      curY += teamH + 40;
      addPageBreak(curY - 8);

      /* ══════════════ 7 NON-NEGOTIABLES ══════════════ */
      drawGoldDivider(ctx, W, curY - 12);
      curY += 18;
      drawSectionLabel(ctx, W, curY, "THE 7 CULTURAL NON-NEGOTIABLES");

      curY += 20;
      ctx.fillStyle = C.textMuted;
      ctx.font = "italic 15px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("The conditions that separate agencies that transform from those that merely experiment.", W / 2, curY);
      ctx.textAlign = "left";

      curY += 38;

      nonNegotiables.forEach((nn, i) => {
        const nnH = 78;
        const nnY = curY + i * (nnH + 14);
        const nnX = 70;
        const nnW = W - 140;

        // Card with alternating bg
        ctx.fillStyle = i % 2 === 0 ? C.bgSoft : C.bg;
        rr(ctx, nnX, nnY, nnW, nnH, 10);
        ctx.fill();
        ctx.strokeStyle = C.border;
        ctx.lineWidth = 1.5;
        rr(ctx, nnX, nnY, nnW, nnH, 10);
        ctx.stroke();

        // Bright blue left bar
        const barGrad = ctx.createLinearGradient(nnX, nnY, nnX, nnY + nnH);
        barGrad.addColorStop(0, C.navyLight); barGrad.addColorStop(1, C.navy);
        ctx.fillStyle = barGrad;
        rr(ctx, nnX, nnY + 8, 5, nnH - 16, 3);
        ctx.fill();

        // Number circle
        ctx.fillStyle = C.navy;
        ctx.beginPath(); ctx.arc(nnX + 40, nnY + nnH / 2, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 15px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(nn.num, nnX + 40, nnY + nnH / 2 + 5);
        ctx.textAlign = "left";

        // Emoji
        ctx.font = "400 22px sans-serif";
        ctx.fillText(nn.emoji, nnX + 68, nnY + nnH / 2 + 8);

        // Title - larger, bolder
        ctx.fillStyle = C.navy;
        ctx.font = "600 19px 'DM Serif Display', serif";
        ctx.fillText(nn.title, nnX + 100, nnY + 30);

        // Description - larger
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 14px 'Inter', sans-serif";
        ctx.fillText(nn.desc, nnX + 100, nnY + 54);
      });

      curY += 7 * 92 + 40;
      addPageBreak(curY - 12);

      /* ══════════════ 90-DAY SPRINT ══════════════ */
      drawGoldDivider(ctx, W, curY - 6);
      curY += 24;
      drawSectionLabel(ctx, W, curY, "THE 90-DAY SPRINT FRAMEWORK");

      curY += 28;

      // Sprint illustration
      const spH = 220;
      const spW = W - 180;
      ctx.save();
      rr(ctx, 90, curY, spW, spH, 16);
      ctx.clip();
      ctx.drawImage(sprint, 90, curY, spW, spH);
      ctx.restore();
      ctx.strokeStyle = C.border;
      ctx.lineWidth = 1.5;
      rr(ctx, 90, curY, spW, spH, 16);
      ctx.stroke();

      curY += spH + 32;

      const phases = [
        { name: "Discovery", days: "Day 1\u201330", activities: ["Run discovery survey", "Identify pain points", "Map AI opportunities", "Leadership kickoff"], output: "Prioritised problem list + team formation" },
        { name: "Build", days: "Day 31\u201360", activities: ["Hands-on workshops", "AI clinics & mentoring", "Prototype with real data", "Iterate with users"], output: "Working prototypes solving real problems" },
        { name: "Showcase", days: "Day 61\u201390", activities: ["Demo Day presentations", "Measure impact", "Document learnings", "Plan deployment & scale"], output: "Proven solutions + agency playbook" },
      ];

      const phW = 340;
      const phGap = 24;
      const phStartX = (W - (3 * phW + 2 * phGap)) / 2;

      phases.forEach((ph, i) => {
        const px = phStartX + i * (phW + phGap);
        const phH = 290;

        // Card
        ctx.fillStyle = C.bgSoft;
        rr(ctx, px, curY, phW, phH, 12);
        ctx.fill();
        ctx.strokeStyle = C.border;
        ctx.lineWidth = 1.5;
        rr(ctx, px, curY, phW, phH, 12);
        ctx.stroke();

        // Top blue gradient bar
        const phBar = ctx.createLinearGradient(px, curY, px + phW, curY);
        phBar.addColorStop(0, C.navy); phBar.addColorStop(1, C.navyLight);
        ctx.fillStyle = phBar;
        rr(ctx, px, curY, phW, 6, 2);
        ctx.fill();

        // Phase name - larger
        ctx.fillStyle = C.navy;
        ctx.font = "700 26px 'DM Serif Display', serif";
        ctx.fillText(ph.name, px + 20, curY + 44);

        ctx.fillStyle = C.gold;
        ctx.font = "600 12px 'JetBrains Mono', monospace";
        ctx.fillText(ph.days, px + 20, curY + 66);

        // Activities - larger with more spacing
        ph.activities.forEach((a, ai) => {
          const ay = curY + 96 + ai * 30;
          ctx.fillStyle = C.navyLight;
          ctx.beginPath(); ctx.arc(px + 30, ay - 4, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = C.textMuted;
          ctx.font = "400 14px 'Inter', sans-serif";
          ctx.fillText(a, px + 44, ay);
        });

        // Output box - more spacing
        const outY = curY + phH - 66;
        ctx.fillStyle = C.goldBg;
        rr(ctx, px + 14, outY, phW - 28, 50, 8); ctx.fill();
        ctx.strokeStyle = C.gold + "40";
        rr(ctx, px + 14, outY, phW - 28, 50, 8); ctx.stroke();
        ctx.fillStyle = C.gold;
        ctx.font = "700 11px 'JetBrains Mono', monospace";
        ctx.fillText("\u2192 OUTPUT", px + 26, outY + 18);
        ctx.fillStyle = C.text;
        ctx.font = "italic 13px 'Inter', sans-serif";
        wrap(ctx, ph.output, px + 26, outY + 38, phW - 56, 16, 1);
      });

      // Connecting arrows
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = C.navy;
      for (let i = 0; i < 2; i++) {
        const ax = phStartX + (i + 1) * phW + i * phGap + phGap / 2;
        const ay = curY + 40;
        ctx.beginPath(); ctx.moveTo(ax - 12, ay); ctx.lineTo(ax + 12, ay);
        ctx.moveTo(ax + 6, ay - 6); ctx.lineTo(ax + 12, ay); ctx.lineTo(ax + 6, ay + 6);
        ctx.stroke();
      }

      curY += 330;
      addPageBreak(curY - 10);

      /* ══════════════ 4 LEADERSHIP ASKS ══════════════ */
      drawGoldDivider(ctx, W, curY - 6);
      curY += 24;
      drawSectionLabel(ctx, W, curY, "YOUR 4 LEADERSHIP ASKS");

      curY += 32;

      const asks = [
        { num: "01", title: "Participate", desc: "Show up for at least one sprint. Learn alongside your officers.", emoji: "\uD83D\uDC41\uFE0F" },
        { num: "02", title: "Protect Time", desc: "Shield sprint time from BAU. Experimentation dies when it competes.", emoji: "\uD83D\uDEE1\uFE0F" },
        { num: "03", title: "Nominate AI Lead", desc: "One DD-level champion who drives engagement and organises sprints.", emoji: "\uD83D\uDC64" },
        { num: "04", title: "Permission to Fail", desc: "Signal that honest attempts are valued more than perfect execution.", emoji: "\u2764\uFE0F" },
      ];

      const askW = (W - 100 - 24) / 2;
      asks.forEach((a, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ax = 50 + col * (askW + 24);
        const ay = curY + row * 110;

        // Card
        ctx.fillStyle = C.bgSoft;
        rr(ctx, ax, ay, askW, 95, 12);
        ctx.fill();
        ctx.strokeStyle = C.border;
        ctx.lineWidth = 1.5;
        rr(ctx, ax, ay, askW, 95, 12);
        ctx.stroke();

        // Blue left accent
        const askBar = ctx.createLinearGradient(ax, ay, ax, ay + 95);
        askBar.addColorStop(0, C.gold); askBar.addColorStop(1, C.goldDim);
        ctx.fillStyle = askBar;
        rr(ctx, ax, ay + 10, 5, 75, 3);
        ctx.fill();

        // Number circle
        ctx.fillStyle = C.navy;
        ctx.beginPath(); ctx.arc(ax + 38, ay + 47, 20, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 14px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(a.num, ax + 38, ay + 52);
        ctx.textAlign = "left";

        // Title - larger
        ctx.fillStyle = C.navy;
        ctx.font = "600 22px 'DM Serif Display', serif";
        ctx.fillText(a.title, ax + 68, ay + 40);
        ctx.fillStyle = C.textMuted;
        ctx.font = "400 13px 'Inter', sans-serif";
        wrap(ctx, a.desc, ax + 68, ay + 62, askW - 90, 18, 2);
      });

      curY += 260;
      addPageBreak(curY - 10);

      /* ══════════════ QUOTE ══════════════ */
      ctx.fillStyle = C.goldBg;
      rr(ctx, 50, curY, W - 100, 120, 16); ctx.fill();
      ctx.strokeStyle = C.gold + "40";
      ctx.lineWidth = 1.5;
      rr(ctx, 50, curY, W - 100, 120, 16); ctx.stroke();

      // Gold bar
      ctx.fillStyle = C.gold;
      rr(ctx, 50, curY + 14, 6, 92, 3); ctx.fill();

      // Quote mark
      ctx.fillStyle = C.gold + "50";
      ctx.font = "italic 700 86px 'DM Serif Display', serif";
      ctx.fillText("\u201C", 72, curY + 60);

      ctx.fillStyle = C.text;
      ctx.font = "italic 18px 'Inter', sans-serif";
      ctx.textAlign = "center";
      wrap(ctx, "The best public service in the world does not wait to be told it is falling behind. It decides to stay ahead.", W / 2, curY + 48, W - 200, 26, 2);

      ctx.fillStyle = C.goldDim;
      ctx.font = "600 12px 'JetBrains Mono', monospace";
      ctx.fillText("\u2014 Bernard Toh, DCE Strategy, Corporate & Governance, GovTech", W / 2, curY + 104);
      ctx.textAlign = "left";

      curY += 150;
      addPageBreak(curY - 10);

      /* ══════════════ FOOTER BAR ══════════════ */
      drawGoldDivider(ctx, W, curY);
      curY += 20;
      ctx.fillStyle = C.gold;
      ctx.fillRect(0, curY, W, 5);
      ctx.textAlign = "left";

      /* ── Export PDF ── */
      const finalH = curY + 5;

      const pdfW = 210;
      const footerY = 292;
      const pageContentMm = 286;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: false,
        precision: 16,
      });

      const pxPerMm = (W * scale) / pdfW;
      const nominalPageHeightPx = Math.floor(pageContentMm * pxPerMm);
      const finalPxHeight = finalH * scale;
      const breakpointsPx = [...new Set(sectionBreaks
        .map((y) => y * scale)
        .filter((y) => y > 0 && y < finalPxHeight)
        .map((y) => Math.floor(y)))].sort((a, b) => a - b);

      const slices: Array<{ start: number; end: number }> = [];
      let sourceY = 0;

      while (sourceY < finalPxHeight) {
        const idealEnd = Math.min(sourceY + nominalPageHeightPx, finalPxHeight);
        const minBreak = Math.min(finalPxHeight, sourceY + Math.floor(nominalPageHeightPx * 0.62));

        const breakBeforeIdeal = breakpointsPx
          .filter((breakY) => breakY > minBreak && breakY <= idealEnd)
          .pop();

        const sliceEnd = breakBeforeIdeal ?? idealEnd;
        slices.push({ start: sourceY, end: sliceEnd });
        sourceY = sliceEnd;
      }

      const totalPages = slices.length;

      slices.forEach((slice, pageIndex) => {
        if (pageIndex > 0) pdf.addPage();

        const sliceH = Math.max(1, slice.end - slice.start);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = W * scale;
        pageCanvas.height = sliceH;
        const pCtx = pageCanvas.getContext("2d")!;
        pCtx.imageSmoothingEnabled = true;
        pCtx.imageSmoothingQuality = "high";
        pCtx.drawImage(canvas, 0, slice.start, W * scale, sliceH, 0, 0, W * scale, sliceH);

        const pageImg = pageCanvas.toDataURL("image/png", 1.0);
        const sliceMm = sliceH / pxPerMm;
        pdf.addImage(pageImg, "PNG", 0, 0, pdfW, sliceMm, undefined, "NONE");

        pdf.setDrawColor(210, 214, 220);
        pdf.setLineWidth(0.2);
        pdf.line(12, 287.5, 198, 287.5);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(120, 125, 132);
        pdf.text(
          `© 2026 Government Technology Agency of Singapore  •  Page ${pageIndex + 1} of ${totalPages}`,
          105,
          footerY,
          { align: "center" }
        );
      });

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
            Download a visual summary as PDF {"\u2014"} all 8 chapters, the 7 cultural non-negotiables, 90-day sprint framework, and 4 leadership asks. Designed for busy executives.
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
