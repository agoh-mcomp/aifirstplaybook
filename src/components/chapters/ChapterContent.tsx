import React from "react";

export function ChapterContent({
  num,
  arc,
  title,
  children,
}: {
  num: string;
  arc: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-sm tracking-[0.2em] uppercase text-gold-dim">{num}</span>
        <span className="w-12 h-px bg-gold-dim" />
        <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">{arc}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-10 text-foreground">{title}</h2>
      <div className="space-y-6 text-lg leading-relaxed text-secondary-foreground font-body">{children}</div>
    </div>
  );
}
