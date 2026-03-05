
-- Drop the permissive update policy
DROP POLICY "Anyone can update likes" ON public.playbook_likes;

-- Create a secure RPC function to increment likes
CREATE OR REPLACE FUNCTION public.increment_playbook_likes()
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.playbook_likes SET count = count + 1 WHERE id = 'playbook' RETURNING count;
$$;
