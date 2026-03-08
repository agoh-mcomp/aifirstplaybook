import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import heroImg from "@/assets/infographic-hero.png";
import sprintImg from "@/assets/infographic-sprint.png";
import teamImg from "@/assets/infographic-team.png";

/* ── Vibrant palette ── */
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

const chapters = [
  {
    num: "01",
    title: "Why Now",
    insight:
      "The window for deliberate, managed transformation is narrowing. What's in it for Agencies? " +
      "1) Time back for meaningful work · 2) A confident, capable workforce · 3) Solutions built by the people who live with the problems.",
  },
  {
    num: "02",
    title: "The Vision",
    insight:
      "AI-First is a mindset: 'Can AI augment my thinking, speed up my work, and help me solve problems?' What Good Looks Like: " +
      "1) Augmented Expertise · 2) User Empowerment · 3) Compressed Cycle Times · 4) Culture of Learning.",
  },
  {
    num: "03",
    title: "The Challenge",
    insight:
      "Barriers are human, cultural, and structural — not technical. Six culture-change barriers: " +
      "1) 'This is extra work' · 2) Leaders Must Walk the Talk · 3) No Trusted Peer Reference · 4) Systemic Friction · 5) A Playbook That Isn't Theirs · 6) Deployment Gap.",
  },
  {
    num: "04",
    title: "Cultural Prerequisites",
    insight: "Seven non-negotiable conditions: 1) Leadership Modeling · 2) Permission to Invest Time · 3) Reward Learning & Risk · 4) Start with Problems · 5) Peer Proof Points · 6) Sustained Engagement · 7) Pragmatic Data Classification.",
  },
  {
    num: "05",
    title: "The Methodology",
    insight: "Three monthly sprints over 90 days. Real problems, protected time, expert support.",
  },
  {
    num: "06",
    title: "How Do I Start?",
    insight: "A practical 90-day model your agency runs, owns, and builds the muscle to sustain.",
  },
  {
    num: "07",
    title: "What We've Seen",
    insight: "73 AI solutions in 90 days. Confidence jumped 60%. Officers built working prototypes in days.",
  },
  {
    num: "08",
    title: "Your Move",
    insight: "Four asks: Participate, Protect time, Nominate AI Lead, Permission to fail.",
  },
];

const nonNegotiables = [
  {
    num: "1",
    title: "Leadership Modeling",
    desc: "Leaders participate as learners, not just sponsors.",
    example: "e.g. A Director joins a sprint team and builds a prototype alongside officers.",
    emoji: "👤",
  },
  {
    num: "2",
    title: "Permission to Invest Time",
    desc: "Explicit runway away from BAU to experiment.",
    example: "e.g. Officers get 2 protected half-days per week during the 90-day sprint.",
    emoji: "⏳",
  },
  {
    num: "3",
    title: "Reward Learning & Risk",
    desc: "Celebrate attempts and lessons, not just wins.",
    example: "e.g. 'Best Failed Experiment' award at Demo Day — normalising learning from failure.",
    emoji: "🏆",
  },
  {
    num: "4",
    title: "Start with Problems",
    desc: "Identify pain points before reaching for tools.",
    example: "e.g. 'We spend 3 days/week on manual data entry' → then explore AI solutions.",
    emoji: "🎯",
  },
  {
    num: "5",
    title: "Peer Proof Points",
    desc: "See people like you succeed and draw inspiration.",
    example: "e.g. HR officer automates leave reconciliation — peers in Finance see what's possible.",
    emoji: "🤝",
  },
  {
    num: "6",
    title: "Sustained Engagement",
    desc: "AI capability is a muscle — 3 sprints, not 1 hackathon.",
    example: "e.g. Progressive 90-day cycles: Discover → Build → Show → repeat with harder problems.",
    emoji: "🔄",
  },
  {
    num: "7",
    title: "Pragmatic Data Classification",
    desc: "Be willing to try commercial AI for non-sensitive work.",
    example: "e.g. Use AI for drafting comms and summarising public docs — no classified data needed.",
    emoji: "📊",
  },
];

/* ── Canvas helpers ── */
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number,
  maxLines = 99,
): number {
  const words = text.split(" ");
  let line = "",
    cy = y,
    lines = 0;
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) {
      lines++;
      if (lines >= maxLines) {
        ctx.fillText(line.trim() + "…", x, cy);
        return cy + lh;
      }
      ctx.fillText(line.trim(), x, cy);
      line = w + " ";
      cy += lh;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, cy);
  return cy + lh;
}

function drawGoldDivider(ctx: CanvasRenderingContext2D, W: number, y: number) {
  const g = ctx.createLinearGradient(80, 0, W - 80, 0);
  g.addColorStop(0, "transparent");
  g.addColorStop(0.15, C.gold + "60");
  g.addColorStop(0.5, C.gold);
  g.addColorStop(0.85, C.gold + "60");
  g.addColorStop(1, "transparent");
  ctx.strokeStyle = g;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, y);
  ctx.lineTo(W - 80, y);
  ctx.stroke();
}

function drawSectionLabel(ctx: CanvasRenderingContext2D, W: number, y: number, text: string) {
  ctx.font = "700 15px 'JetBrains Mono', monospace";
  const tw = ctx.measureText(text).width;
  ctx.fillStyle = C.goldBg;
  rr(ctx, W / 2 - tw / 2 - 22, y - 14, tw + 44, 32, 16);
  ctx.fill();
  ctx.strokeStyle = C.gold + "40";
  ctx.lineWidth = 1.5;
  rr(ctx, W / 2 - tw / 2 - 22, y - 14, tw + 44, 32, 16);
  ctx.stroke();
  ctx.fillStyle = C.gold;
  ctx.textAlign = "center";
  ctx.fillText(text, W / 2, y + 6);
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

function drawTopBar(ctx: CanvasRenderingContext2D, W: number) {
  const g = ctx.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, C.navy);
  g.addColorStop(1, C.navyLight);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, 5);
}

function drawFooter(ctx: CanvasRenderingContext2D, W: number, H: number, pageNum: number, totalPages: number) {
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, H - 40);
  ctx.lineTo(W - 60, H - 40);
  ctx.stroke();
  ctx.fillStyle = C.textLight;
  ctx.font = "400 11px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`© 2026 Government Technology Agency of Singapore  •  Page ${pageNum} of ${totalPages}`, W / 2, H - 22);
  ctx.textAlign = "left";
  // Bottom accent
  ctx.fillStyle = C.gold;
  ctx.fillRect(0, H - 4, W, 4);
}

/* ══════════════════════════════════════════════════════════════ */

const PlaybookInfographic = () => {
  const [generating, setGenerating] = useState(false);

  const download = useCallback(async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 50));

    try {
      const { jsPDF } = await import("jspdf");
      const [hero, sprint, team] = await Promise.all([loadImg(heroImg), loadImg(sprintImg), loadImg(teamImg)]);

      const scale = 2;
      const W = 1200;
      // A4 aspect ratio: 297/210 ≈ 1.4143
      const PAGE_H = Math.round((W * 297) / 210); // ~1697px
      const totalPages = 3;

      function makeCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
        const c = document.createElement("canvas");
        c.width = W * scale;
        c.height = PAGE_H * scale;
        const ctx = c.getContext("2d")!;
        ctx.scale(scale, scale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.fillStyle = C.bg;
        ctx.fillRect(0, 0, W, PAGE_H);
        drawTopBar(ctx, W);
        return [c, ctx];
      }

      /* ══════════════ PAGE 1: Chapter Summary ══════════════ */
      const [c1, ctx1] = makeCanvas();

      let y = 50;
      // Badge
      ctx1.fillStyle = C.goldBg;
      rr(ctx1, W / 2 - 140, y, 280, 36, 18);
      ctx1.fill();
      ctx1.strokeStyle = C.gold + "60";
      ctx1.lineWidth = 1.5;
      rr(ctx1, W / 2 - 140, y, 280, 36, 18);
      ctx1.stroke();
      ctx1.fillStyle = C.gold;
      ctx1.font = "700 13px 'JetBrains Mono', monospace";
      ctx1.textAlign = "center";
      ctx1.fillText("⏱  3-MINUTE EXECUTIVE BRIEF", W / 2, y + 24);

      y = 120;
      ctx1.fillStyle = C.textDim;
      ctx1.font = "500 14px 'JetBrains Mono', monospace";
      ctx1.fillText("THE AI-FIRST PLAYBOOK", W / 2, y);

      y = 170;
      ctx1.fillStyle = C.navy;
      ctx1.font = "700 56px 'DM Serif Display', serif";
      ctx1.fillText("Your Agency. Transformed.", W / 2, y);

      ctx1.fillStyle = C.textMuted;
      ctx1.font = "400 20px 'Inter', sans-serif";
      ctx1.fillText("A practical guide for leaders ready to move from AI-curious to AI-first.", W / 2, y + 42);
      ctx1.textAlign = "left";

      // Hero image
      y = 250;
      const heroH = 240;
      const heroW = W - 140;
      ctx1.save();
      rr(ctx1, 70, y, heroW, heroH, 14);
      ctx1.clip();
      ctx1.drawImage(hero, 70, y, heroW, heroH);
      ctx1.restore();
      ctx1.strokeStyle = C.border;
      ctx1.lineWidth = 1.5;
      rr(ctx1, 70, y, heroW, heroH, 14);
      ctx1.stroke();

      // Stats banner
      y += heroH + 24;
      const bannerGrad = ctx1.createLinearGradient(50, y, W - 50, y + 80);
      bannerGrad.addColorStop(0, C.navy);
      bannerGrad.addColorStop(1, C.navyLight);
      ctx1.fillStyle = bannerGrad;
      rr(ctx1, 50, y, W - 100, 80, 12);
      ctx1.fill();

      const heroStats = [
        { val: "73", label: "AI Solutions Built" },
        { val: "90 Days", label: "Sprint Duration" },
        { val: "200+", label: "Officers Engaged" },
        { val: "60%", label: "Confidence Jump" },
      ];
      const bw = (W - 100) / 4;
      ctx1.textAlign = "center";
      heroStats.forEach((s, i) => {
        const bx = 50 + i * bw + bw / 2;
        ctx1.fillStyle = "#FFFFFF";
        ctx1.font = "700 28px 'DM Serif Display', serif";
        ctx1.fillText(s.val, bx, y + 36);
        ctx1.fillStyle = "rgba(255,255,255,0.75)";
        ctx1.font = "500 12px 'Inter', sans-serif";
        ctx1.fillText(s.label, bx, y + 56);
        if (i < 3) {
          ctx1.strokeStyle = "rgba(255,255,255,0.2)";
          ctx1.lineWidth = 1;
          ctx1.beginPath();
          ctx1.moveTo(50 + (i + 1) * bw, y + 14);
          ctx1.lineTo(50 + (i + 1) * bw, y + 66);
          ctx1.stroke();
        }
      });
      ctx1.textAlign = "left";

      // Chapter section label
      y += 110;
      drawGoldDivider(ctx1, W, y);
      y += 28;
      drawSectionLabel(ctx1, W, y, "THE JOURNEY — 8 CHAPTERS");
      y += 38;

      // 8 chapter cards in 2x4 grid
      const mx = 50;
      const cardW = (W - mx * 2 - 24) / 2;
      const cardH = 170;

      chapters.forEach((ch, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cx = mx + col * (cardW + 24);
        const cy = y + row * (cardH + 16);

        ctx1.fillStyle = C.bgSoft;
        rr(ctx1, cx, cy, cardW, cardH, 10);
        ctx1.fill();
        ctx1.strokeStyle = C.border;
        ctx1.lineWidth = 1;
        rr(ctx1, cx, cy, cardW, cardH, 10);
        ctx1.stroke();

        // Left accent
        const ag = ctx1.createLinearGradient(cx, cy, cx, cy + cardH);
        ag.addColorStop(0, C.navy);
        ag.addColorStop(1, C.navyLight);
        ctx1.fillStyle = ag;
        rr(ctx1, cx, cy + 8, 4, cardH - 16, 2);
        ctx1.fill();

        // Number circle
        ctx1.fillStyle = C.navy;
        ctx1.beginPath();
        ctx1.arc(cx + 32, cy + 30, 17, 0, Math.PI * 2);
        ctx1.fill();
        ctx1.fillStyle = "#FFFFFF";
        ctx1.font = "700 14px 'JetBrains Mono', monospace";
        ctx1.textAlign = "center";
        ctx1.fillText(ch.num, cx + 32, cy + 35);
        ctx1.textAlign = "left";

        // Title
        ctx1.fillStyle = C.navy;
        ctx1.font = "700 22px 'DM Serif Display', serif";
        ctx1.fillText(ch.title, cx + 58, cy + 36);

        // Insight
        ctx1.fillStyle = C.textMuted;
        ctx1.font = "400 16px 'Inter', sans-serif";
        wrap(ctx1, ch.insight, cx + 18, cy + 64, cardW - 36, 22, 4);
      });

      drawFooter(ctx1, W, PAGE_H, 1, totalPages);

      /* ══════════════ PAGE 2: 7 Non-Negotiables ══════════════ */
      const [c2, ctx2] = makeCanvas();

      y = 45;
      drawSectionLabel(ctx2, W, y, "THE 7 CULTURAL NON-NEGOTIABLES");
      y += 30;
      ctx2.fillStyle = C.textMuted;
      ctx2.font = "italic 18px 'Inter', sans-serif";
      ctx2.textAlign = "center";
      ctx2.fillText(
        "The conditions that separate agencies that transform from those that merely experiment.",
        W / 2,
        y,
      );
      ctx2.textAlign = "left";

      y += 36;

      // Team image
      const teamH = 180;
      const teamW = W - 160;
      ctx2.save();
      rr(ctx2, 80, y, teamW, teamH, 14);
      ctx2.clip();
      ctx2.drawImage(team, 80, y, teamW, teamH);
      ctx2.restore();
      ctx2.strokeStyle = C.border;
      ctx2.lineWidth = 1.5;
      rr(ctx2, 80, y, teamW, teamH, 14);
      ctx2.stroke();

      y += teamH + 30;

      // 7 items with expanded insights
      const nnH = 130;
      const nnGap = 14;

      nonNegotiables.forEach((nn, i) => {
        const nnY = y + i * (nnH + nnGap);
        const nnX = 60;
        const nnW = W - 120;

        ctx2.fillStyle = i % 2 === 0 ? C.bgSoft : C.bg;
        rr(ctx2, nnX, nnY, nnW, nnH, 10);
        ctx2.fill();
        ctx2.strokeStyle = C.border;
        ctx2.lineWidth = 1;
        rr(ctx2, nnX, nnY, nnW, nnH, 10);
        ctx2.stroke();

        // Left accent
        const bg = ctx2.createLinearGradient(nnX, nnY, nnX, nnY + nnH);
        bg.addColorStop(0, C.navyLight);
        bg.addColorStop(1, C.navy);
        ctx2.fillStyle = bg;
        rr(ctx2, nnX, nnY + 8, 5, nnH - 16, 3);
        ctx2.fill();

        // Number circle
        ctx2.fillStyle = C.navy;
        ctx2.beginPath();
        ctx2.arc(nnX + 38, nnY + 32, 18, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.fillStyle = "#FFFFFF";
        ctx2.font = "700 15px 'JetBrains Mono', monospace";
        ctx2.textAlign = "center";
        ctx2.fillText(nn.num, nnX + 38, nnY + 37);
        ctx2.textAlign = "left";

        // Emoji
        ctx2.font = "400 22px sans-serif";
        ctx2.fillText(nn.emoji, nnX + 66, nnY + 38);

        // Title
        ctx2.fillStyle = C.navy;
        ctx2.font = "700 20px 'DM Serif Display', serif";
        ctx2.fillText(nn.title, nnX + 96, nnY + 34);

        // Description
        ctx2.fillStyle = C.textMuted;
        ctx2.font = "400 16px 'Inter', sans-serif";
        ctx2.fillText(nn.desc, nnX + 96, nnY + 58);

        // Example in gold box
        ctx2.fillStyle = C.goldBg;
        rr(ctx2, nnX + 90, nnY + 74, nnW - 110, 42, 6);
        ctx2.fill();
        ctx2.strokeStyle = C.gold + "30";
        ctx2.lineWidth = 1;
        rr(ctx2, nnX + 90, nnY + 74, nnW - 110, 42, 6);
        ctx2.stroke();

        ctx2.fillStyle = C.goldDim;
        ctx2.font = "italic 14px 'Inter', sans-serif";
        wrap(ctx2, nn.example, nnX + 104, nnY + 94, nnW - 140, 20, 2);
      });

      drawFooter(ctx2, W, PAGE_H, 2, totalPages);

      /* ══════════════ PAGE 3: Sprint + GovTech Support ══════════════ */
      const [c3, ctx3] = makeCanvas();

      y = 45;
      drawSectionLabel(ctx3, W, y, "THE 90-DAY SPRINT FRAMEWORK");
      y += 34;

      // Sprint image
      const spH = 190;
      const spW = W - 160;
      ctx3.save();
      rr(ctx3, 80, y, spW, spH, 14);
      ctx3.clip();
      ctx3.drawImage(sprint, 80, y, spW, spH);
      ctx3.restore();
      ctx3.strokeStyle = C.border;
      ctx3.lineWidth = 1.5;
      rr(ctx3, 80, y, spW, spH, 14);
      ctx3.stroke();
      y += spH + 28;

      // 3 phase cards
      const phases = [
        {
          name: "Discovery",
          days: "Day 1–30",
          activities: ["Run discovery survey", "Identify pain points", "Map AI opportunities", "Leadership kickoff"],
          output: "Prioritised problem list + team formation",
        },
        {
          name: "Build",
          days: "Day 31–60",
          activities: [
            "Hands-on workshops",
            "AI clinics & mentoring",
            "Build prototype and deploy",
            "Iterate with users",
          ],
          output: "Working prototypes solving real problems",
        },
        {
          name: "Showcase",
          days: "Day 61–90",
          activities: ["Demo Day presentations", "Measure impact", "Document learnings", "Plan deployment & scale"],
          output: "Proven solutions + agency playbook",
        },
      ];

      const phW = 340;
      const phGap = 24;
      const phStartX = (W - (3 * phW + 2 * phGap)) / 2;
      const phH = 270;

      phases.forEach((ph, i) => {
        const px = phStartX + i * (phW + phGap);

        ctx3.fillStyle = C.bgSoft;
        rr(ctx3, px, y, phW, phH, 12);
        ctx3.fill();
        ctx3.strokeStyle = C.border;
        ctx3.lineWidth = 1;
        rr(ctx3, px, y, phW, phH, 12);
        ctx3.stroke();

        // Top bar
        const phBar = ctx3.createLinearGradient(px, y, px + phW, y);
        phBar.addColorStop(0, C.navy);
        phBar.addColorStop(1, C.navyLight);
        ctx3.fillStyle = phBar;
        rr(ctx3, px, y, phW, 6, 2);
        ctx3.fill();

        ctx3.fillStyle = C.navy;
        ctx3.font = "700 24px 'DM Serif Display', serif";
        ctx3.fillText(ph.name, px + 18, y + 40);
        ctx3.fillStyle = C.gold;
        ctx3.font = "600 12px 'JetBrains Mono', monospace";
        ctx3.fillText(ph.days, px + 18, y + 60);

        ph.activities.forEach((a, ai) => {
          const ay = y + 86 + ai * 28;
          ctx3.fillStyle = C.navyLight;
          ctx3.beginPath();
          ctx3.arc(px + 28, ay - 4, 4, 0, Math.PI * 2);
          ctx3.fill();
          ctx3.fillStyle = C.textMuted;
          ctx3.font = "400 16px 'Inter', sans-serif";
          ctx3.fillText(a, px + 42, ay);
        });

        const outY = y + phH - 60;
        ctx3.fillStyle = C.goldBg;
        rr(ctx3, px + 12, outY, phW - 24, 46, 8);
        ctx3.fill();
        ctx3.strokeStyle = C.gold + "40";
        rr(ctx3, px + 12, outY, phW - 24, 46, 8);
        ctx3.stroke();
        ctx3.fillStyle = C.gold;
        ctx3.font = "700 11px 'JetBrains Mono', monospace";
        ctx3.fillText("→ OUTPUT", px + 24, outY + 18);
        ctx3.fillStyle = C.text;
        ctx3.font = "italic 14px 'Inter', sans-serif";
        wrap(ctx3, ph.output, px + 24, outY + 36, phW - 52, 18, 1);
      });

      // Connecting arrows
      ctx3.lineWidth = 2.5;
      ctx3.strokeStyle = C.navy;
      for (let i = 0; i < 2; i++) {
        const ax = phStartX + (i + 1) * phW + i * phGap + phGap / 2;
        const ay = y + 38;
        ctx3.beginPath();
        ctx3.moveTo(ax - 12, ay);
        ctx3.lineTo(ax + 12, ay);
        ctx3.moveTo(ax + 6, ay - 6);
        ctx3.lineTo(ax + 12, ay);
        ctx3.lineTo(ax + 6, ay + 6);
        ctx3.stroke();
      }

      y += phH + 36;

      // GovTech Support section
      drawGoldDivider(ctx3, W, y);
      y += 28;
      drawSectionLabel(ctx3, W, y, "HOW GOVTECH CAN SUPPORT YOU");
      y += 38;

      const supports = [
        {
          title: "Proven Model",
          desc: "A tested sprint framework that has delivered 73 AI solutions across multiple agencies.",
          emoji: "🏗️",
        },
        {
          title: "Peer-to-Peer Support",
          desc: "Connect your officers with peers who've already built AI solutions in government.",
          emoji: "🤝",
        },
        {
          title: "Ecosystem for Scaling",
          desc: "Access to AI tools, platforms, and technical expertise to move from prototype to production.",
          emoji: "🚀",
        },
        {
          title: "Measurement Framework",
          desc: "Dashboards to track your agency's AI-First progress, confidence, and measurable outcomes.",
          emoji: "📊",
        },
      ];

      const supW = (W - 100 - 24) / 2;
      supports.forEach((s, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const sx = 50 + col * (supW + 24);
        const sy = y + row * 120;

        ctx3.fillStyle = C.bgSoft;
        rr(ctx3, sx, sy, supW, 106, 10);
        ctx3.fill();
        ctx3.strokeStyle = C.border;
        ctx3.lineWidth = 1;
        rr(ctx3, sx, sy, supW, 106, 10);
        ctx3.stroke();

        // Gold left accent
        const sg = ctx3.createLinearGradient(sx, sy, sx, sy + 106);
        sg.addColorStop(0, C.gold);
        sg.addColorStop(1, C.goldDim);
        ctx3.fillStyle = sg;
        rr(ctx3, sx, sy + 10, 5, 86, 3);
        ctx3.fill();

        ctx3.font = "400 24px sans-serif";
        ctx3.fillText(s.emoji, sx + 22, sy + 40);

        ctx3.fillStyle = C.navy;
        ctx3.font = "700 20px 'DM Serif Display', serif";
        ctx3.fillText(s.title, sx + 56, sy + 38);

        ctx3.fillStyle = C.textMuted;
        ctx3.font = "400 15px 'Inter', sans-serif";
        wrap(ctx3, s.desc, sx + 56, sy + 60, supW - 76, 21, 3);
      });

      y += 270;

      // Closing quote
      ctx3.fillStyle = C.goldBg;
      rr(ctx3, 50, y, W - 100, 110, 14);
      ctx3.fill();
      ctx3.strokeStyle = C.gold + "40";
      ctx3.lineWidth = 1.5;
      rr(ctx3, 50, y, W - 100, 110, 14);
      ctx3.stroke();

      ctx3.fillStyle = C.gold;
      rr(ctx3, 50, y + 12, 5, 86, 3);
      ctx3.fill();

      ctx3.fillStyle = C.gold + "40";
      ctx3.font = "italic 700 72px 'DM Serif Display', serif";
      ctx3.fillText("\u201C", 68, y + 52);

      ctx3.fillStyle = C.text;
      ctx3.font = "italic 17px 'Inter', sans-serif";
      ctx3.textAlign = "center";
      wrap(
        ctx3,
        "The best public service in the world does not wait to be told it is falling behind. It decides to stay ahead.",
        W / 2,
        y + 42,
        W - 200,
        24,
        2,
      );

      ctx3.fillStyle = C.goldDim;
      ctx3.font = "600 11px 'JetBrains Mono', monospace";
      ctx3.fillText("— Bernard Toh, DCE Strategy, Corporate & Governance, GovTech", W / 2, y + 96);
      ctx3.textAlign = "left";

      drawFooter(ctx3, W, PAGE_H, 3, totalPages);

      /* ── Export to PDF ── */
      const pdfW = 210;
      const pdfH = 297;
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });

      [c1, c2, c3].forEach((c, i) => {
        if (i > 0) pdf.addPage();
        const img = c.toDataURL("image/jpeg", 0.85);
        pdf.addImage(img, "JPEG", 0, 0, pdfW, pdfH, undefined, "FAST");
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
        <div
          className="absolute top-0 right-0 w-60 h-60 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, hsl(var(--coral) / 0.6), transparent 70%)" }}
        />
        <div className="relative">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dim mb-3">
            ⏱ 3-Minute Executive Brief
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">Playbook at a Glance</h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-xl">
            Download a visual summary as PDF — all 8 chapters, the 7 cultural non-negotiables, 90-day sprint framework,
            and how GovTech can support. Designed for busy executives.
          </p>
          <button
            onClick={download}
            disabled={generating}
            className="inline-flex items-center gap-2 gradient-gold-bg text-white font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Executive Brief (PDF)
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaybookInfographic;
