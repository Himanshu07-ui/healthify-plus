-- Create medicine_history table
CREATE TABLE public.medicine_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  medicine_name TEXT NOT NULL,
  generic_name TEXT,
  category TEXT,
  source TEXT NOT NULL, -- 'scan' or 'search'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medicine_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own medicine history" 
ON public.medicine_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medicine history" 
ON public.medicine_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medicine history" 
ON public.medicine_history 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_medicine_history_user_id ON public.medicine_history(user_id);
CREATE INDEX idx_medicine_history_created_at ON public.medicine_history(created_at DESC);