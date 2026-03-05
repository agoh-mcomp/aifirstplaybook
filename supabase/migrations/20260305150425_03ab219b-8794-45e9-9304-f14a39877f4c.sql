
-- Create a simple table to track playbook likes (anonymous, one row total)
CREATE TABLE public.playbook_likes (
  id TEXT PRIMARY KEY DEFAULT 'playbook',
  count INTEGER NOT NULL DEFAULT 0
);

-- Insert the initial row
INSERT INTO public.playbook_likes (id, count) VALUES ('playbook', 0);

-- Enable RLS
ALTER TABLE public.playbook_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can read the count
CREATE POLICY "Anyone can read likes" ON public.playbook_likes FOR SELECT USING (true);

-- Anyone can update likes
CREATE POLICY "Anyone can update likes" ON public.playbook_likes FOR UPDATE USING (true);
