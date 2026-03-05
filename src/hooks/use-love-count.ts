import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useLoveCount() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    supabase
      .from("playbook_likes")
      .select("count")
      .eq("id", "playbook")
      .single()
      .then(({ data }) => {
        if (data) setCount(data.count);
      });
  }, []);

  return count;
}
