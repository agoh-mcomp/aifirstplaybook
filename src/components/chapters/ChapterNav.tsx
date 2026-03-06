import { ArrowRight } from "lucide-react";
import { chapters } from "@/components/ChapterSidebar";

export function ChapterNav({ activeChapter, onSelect }: { activeChapter: string; onSelect: (id: string) => void }) {
  const idx = chapters.findIndex((ch) => ch.id === activeChapter);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
      {prev ? (
        <button
          onClick={() => {
            onSelect(prev.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <div className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">{prev.num}</div>
            <div className="font-display text-sm">{prev.title}</div>
          </div>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => {
            onSelect(next.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group text-right"
        >
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">{next.num}</div>
            <div className="font-display text-sm">{next.title}</div>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
