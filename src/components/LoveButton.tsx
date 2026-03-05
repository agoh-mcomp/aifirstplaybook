import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LoveButton = () => {
  const [count, setCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("playbook-liked");
    if (stored === "true") setLiked(true);

    supabase
      .from("playbook_likes")
      .select("count")
      .eq("id", "playbook")
      .single()
      .then(({ data }) => {
        if (data) setCount(data.count);
      });
  }, []);

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setAnimating(true);
    localStorage.setItem("playbook-liked", "true");
    setCount((c) => c + 1);

    setTimeout(() => setAnimating(false), 600);

    toast({
      title: "Thank you! ❤️",
      description: "We're glad you enjoyed the playbook.",
    });

    const { data } = await supabase.rpc("increment_playbook_likes");
    if (typeof data === "number") setCount(data);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={handleLike}
        whileTap={!liked ? { scale: 0.9 } : {}}
        className="relative group cursor-pointer"
        aria-label="Love this playbook"
      >
        <motion.div
          animate={animating ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Heart
            className={`w-10 h-10 transition-colors duration-300 ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground group-hover:text-red-400"
            }`}
          />
        </motion.div>

        {/* Burst particles */}
        <AnimatePresence>
          {animating && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-red-400"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 6) * 28,
                    y: Math.sin((i * Math.PI * 2) / 6) * 28,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      <span className="font-mono text-sm text-muted-foreground tabular-nums">
        {count.toLocaleString()} {count === 1 ? "love" : "loves"}
      </span>
    </div>
  );
};

export default LoveButton;
