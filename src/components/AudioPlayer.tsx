import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  chapterTitle: string;
  contentRef?: React.RefObject<HTMLDivElement>;
}

const AudioPlayer = ({ chapterTitle, contentRef }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState(1);
  const [muted, setMuted] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cancelledRef = useRef(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const extractText = useCallback(() => {
    if (contentRef?.current) {
      return contentRef.current.innerText || "";
    }
    return "";
  }, [contentRef]);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  }, []);

  const play = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (isPaused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Stop any existing speech first
    cancelledRef.current = true;
    window.speechSynthesis.cancel();

    const text = extractText();
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.volume = muted ? 0 : 1;

    // Pick a natural-sounding female voice
    const femaleVoice = voices.find(v =>
      /samantha|victoria|karen|zira|fiona|google.*female|google.*uk.*female|microsoft.*zira|tessa/i.test(v.name)
    ) || voices.find(v =>
      /female|woman/i.test(v.name)
    ) || voices.find(v =>
      v.lang.startsWith("en") && /fiona|samantha|karen|moira|tessa|veena|victoria|zira|susan|hazel|heather|kate|serena/i.test(v.name)
    ) || voices.find(v => v.lang.startsWith("en"));
    if (femaleVoice) utterance.voice = femaleVoice;

    // Reset cancelled flag right before speaking
    cancelledRef.current = false;

    utterance.onboundary = (e) => {
      if (cancelledRef.current) return;
      if (e.name === "word") {
        const pct = text.length > 0 ? (e.charIndex / text.length) * 100 : 0;
        setProgress(Math.min(pct, 100));
      }
    };

    utterance.onend = () => {
      if (cancelledRef.current) return;
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
    };

    utterance.onerror = (e) => {
      if (cancelledRef.current) return;
      // "interrupted" and "canceled" are expected when we stop manually
      if (e.error === "interrupted" || e.error === "canceled") return;
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;

    // Small delay to ensure cancel() has completed
    setTimeout(() => {
      if (cancelledRef.current) return;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);
    }, 50);
  }, [isPaused, extractText, rate, muted]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

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
          {isPlaying ? (
            <Button variant="ghost" size="icon" onClick={pause} className="h-9 w-9">
              <Pause className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={play} className="h-9 w-9">
              <Play className="w-4 h-4" />
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={stop} className="h-9 w-9" disabled={!isPlaying && !isPaused}>
            <Square className="w-3.5 h-3.5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleMute} className="h-9 w-9">
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground hidden sm:inline">Speed</span>
          <div className="flex gap-1">
            {[0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
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
