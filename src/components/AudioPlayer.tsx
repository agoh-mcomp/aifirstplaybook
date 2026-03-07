import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  chapterTitle: string;
  /** CSS selector or ref — the player extracts text from the chapter content container */
  contentRef?: React.RefObject<HTMLDivElement>;
}

const AudioPlayer = ({ chapterTitle, contentRef }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState(1);
  const [muted, setMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const charIndexRef = useRef(0);

  const extractText = useCallback(() => {
    if (contentRef?.current) {
      return contentRef.current.innerText || "";
    }
    return "";
  }, [contentRef]);

  const clearTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    charIndexRef.current = 0;
    clearTracking();
  }, []);

  const play = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    stop();
    const text = extractText();
    if (!text.trim()) return;

    textRef.current = text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.volume = muted ? 0 : 1;

    utterance.onboundary = (e) => {
      if (e.name === "word") {
        charIndexRef.current = e.charIndex;
        const pct = text.length > 0 ? (e.charIndex / text.length) * 100 : 0;
        setProgress(Math.min(pct, 100));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      clearTracking();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      clearTracking();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [isPaused, stop, extractText, rate, muted]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  // Update rate on-the-fly isn't supported by SpeechSynthesis, so we note it for next play
  const changeRate = (newRate: number) => {
    setRate(newRate);
  };

  // Cleanup on unmount or chapter change
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      clearTracking();
    };
  }, []);

  const rateLabel = rate === 1 ? "1×" : `${rate}×`;

  return (
    <div className="bg-surface-elevated border border-border rounded-xl p-4 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Volume2 className="w-4 h-4 text-gold" />
        <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
          Listen to {chapterTitle}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-secondary rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {/* Play / Pause */}
          {isPlaying ? (
            <Button variant="ghost" size="icon" onClick={pause} className="h-9 w-9">
              <Pause className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={play} className="h-9 w-9">
              <Play className="w-4 h-4" />
            </Button>
          )}

          {/* Stop */}
          <Button variant="ghost" size="icon" onClick={stop} className="h-9 w-9" disabled={!isPlaying && !isPaused}>
            <Square className="w-3.5 h-3.5" />
          </Button>

          {/* Mute */}
          <Button variant="ghost" size="icon" onClick={toggleMute} className="h-9 w-9">
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Speed</span>
          <div className="flex gap-1">
            {[0.75, 1, 1.25, 1.5].map((r) => (
              <button
                key={r}
                onClick={() => changeRate(r)}
                className={cn(
                  "font-mono text-xs px-2 py-1 rounded-md transition-colors",
                  rate === r
                    ? "bg-gold/20 text-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r === 1 ? "1×" : `${r}×`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
