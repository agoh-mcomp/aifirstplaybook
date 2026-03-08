import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2, VolumeX, ChevronDown } from "lucide-react";
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
  const currentCharIndexRef = useRef(0);
  const fullTextRef = useRef("");
  const [muted, setMuted] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cancelledRef = useRef(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const voiceMenuRef = useRef<HTMLDivElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      // Auto-select an energetic, polished female voice if none chosen yet
      if (!selectedVoiceURI && available.length > 0) {
        const enVoices = available.filter(v => v.lang.startsWith("en"));
        // Tier 1: Premium/enhanced voices known for being energetic & polished
        const tier1 = enVoices.find(v =>
          /ava.*premium|allison.*premium|zoe.*premium|nova|ava.*enhanced/i.test(v.name)
        );
        // Tier 2: High-quality natural female voices
        const tier2 = enVoices.find(v =>
          /\b(ava|allison|samantha|kate|serena|karen|martha)\b/i.test(v.name) && !/male/i.test(v.name)
        );
        // Tier 3: Any English female-sounding voice
        const tier3 = enVoices.find(v =>
          /fiona|victoria|tessa|moira|heather|susan|hazel|veena|zira/i.test(v.name)
        );
        const pick = tier1 || tier2 || tier3 || enVoices[0];
        if (pick) setSelectedVoiceURI(pick.voiceURI);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Close voice menu on outside click
  useEffect(() => {
    if (!showVoiceMenu) return;
    const handler = (e: MouseEvent) => {
      if (voiceMenuRef.current && !voiceMenuRef.current.contains(e.target as Node)) {
        setShowVoiceMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showVoiceMenu]);

  const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI) || null;

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

  const playFromIndex = useCallback((startIndex: number, playbackRate: number) => {
    if (!window.speechSynthesis) return;

    cancelledRef.current = true;
    window.speechSynthesis.cancel();

    const text = fullTextRef.current;
    if (!text.trim()) return;

    const remaining = text.slice(startIndex);
    if (!remaining.trim()) return;

    const utterance = new SpeechSynthesisUtterance(remaining);
    utterance.rate = playbackRate;
    utterance.volume = muted ? 0 : 1;
    if (selectedVoice) utterance.voice = selectedVoice;

    cancelledRef.current = false;

    utterance.onboundary = (e) => {
      if (cancelledRef.current) return;
      if (e.name === "word") {
        const absoluteIndex = startIndex + e.charIndex;
        currentCharIndexRef.current = absoluteIndex;
        const pct = text.length > 0 ? (absoluteIndex / text.length) * 100 : 0;
        setProgress(Math.min(pct, 100));
      }
    };

    utterance.onend = () => {
      if (cancelledRef.current) return;
      currentCharIndexRef.current = 0;
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
    };

    utterance.onerror = (e) => {
      if (cancelledRef.current) return;
      if (e.error === "interrupted" || e.error === "canceled") return;
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;

    setTimeout(() => {
      if (cancelledRef.current) return;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }, 50);
  }, [muted, selectedVoice]);

  const play = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (isPaused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    const text = extractText();
    if (!text.trim()) return;
    fullTextRef.current = text;
    currentCharIndexRef.current = 0;
    setProgress(0);
    playFromIndex(0, rate);
  }, [isPaused, extractText, rate, playFromIndex]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const changeRate = useCallback((newRate: number) => {
    setRate(newRate);
    if (isPlaying || isPaused) {
      playFromIndex(currentCharIndexRef.current, newRate);
    }
  }, [isPlaying, isPaused, playFromIndex]);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  // Group voices by language for the dropdown
  const englishVoices = voices.filter(v => v.lang.startsWith("en"));
  const otherVoices = voices.filter(v => !v.lang.startsWith("en"));

  return (
    <div className="bg-surface-elevated border border-border rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gold" />
          <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
            Listen to {chapterTitle}
          </span>
        </div>

        {/* Voice selector */}
        <div className="relative" ref={voiceMenuRef}>
          <button
            onClick={() => setShowVoiceMenu(!showVoiceMenu)}
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors max-w-[200px]"
          >
            <span className="truncate">
              {selectedVoice ? selectedVoice.name : "Select voice"}
            </span>
            <ChevronDown className={cn("w-3 h-3 shrink-0 transition-transform", showVoiceMenu && "rotate-180")} />
          </button>

          {showVoiceMenu && (
            <div className="absolute right-0 top-full mt-1 w-72 max-h-64 overflow-y-auto bg-background border border-border rounded-lg shadow-lg z-50">
              {englishVoices.length > 0 && (
                <>
                  <div className="px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground bg-muted/50 sticky top-0">
                    English
                  </div>
                  {englishVoices.map((v) => (
                    <button
                      key={v.voiceURI}
                      onClick={() => { setSelectedVoiceURI(v.voiceURI); setShowVoiceMenu(false); }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs hover:bg-accent transition-colors flex items-center justify-between gap-2",
                        selectedVoiceURI === v.voiceURI && "bg-gold/10 text-gold"
                      )}
                    >
                      <span className="truncate">{v.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{v.lang}</span>
                    </button>
                  ))}
                </>
              )}
              {otherVoices.length > 0 && (
                <>
                  <div className="px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground bg-muted/50 sticky top-0">
                    Other Languages
                  </div>
                  {otherVoices.map((v) => (
                    <button
                      key={v.voiceURI}
                      onClick={() => { setSelectedVoiceURI(v.voiceURI); setShowVoiceMenu(false); }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs hover:bg-accent transition-colors flex items-center justify-between gap-2",
                        selectedVoiceURI === v.voiceURI && "bg-gold/10 text-gold"
                      )}
                    >
                      <span className="truncate">{v.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{v.lang}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
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

        <div className="relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <span>{rate === 1 ? "1×" : `${rate}×`}</span>
            <ChevronDown className={cn("w-3 h-3 shrink-0 transition-transform", showSpeedMenu && "rotate-180")} />
          </button>

          {showSpeedMenu && (
            <div ref={speedMenuRef} className="absolute right-0 bottom-full mb-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              {[0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
                <button
                  key={r}
                  onClick={() => { changeRate(r); setShowSpeedMenu(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2 font-mono text-xs hover:bg-accent transition-colors",
                    rate === r ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r === 1 ? "1×" : `${r}×`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
