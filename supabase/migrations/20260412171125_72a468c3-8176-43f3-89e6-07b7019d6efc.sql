
-- Mood entries for Mental Wellness
CREATE TABLE public.mood_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  mood_label TEXT NOT NULL DEFAULT 'neutral',
  notes TEXT,
  activities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own mood entries" ON public.mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own mood entries" ON public.mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own mood entries" ON public.mood_entries FOR DELETE USING (auth.uid() = user_id);

-- Medication reminders for Elderly Care
CREATE TABLE public.medication_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  medicine_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL DEFAULT 'daily',
  times TEXT[] NOT NULL DEFAULT '{}',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.medication_reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own medication reminders" ON public.medication_reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own medication reminders" ON public.medication_reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own medication reminders" ON public.medication_reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own medication reminders" ON public.medication_reminders FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_medication_reminders_updated_at BEFORE UPDATE ON public.medication_reminders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Blood donors for Emergency Response
CREATE TABLE public.blood_donors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  blood_group TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  last_donation_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;
-- All authenticated users can view donors (public registry)
CREATE POLICY "Anyone can view available donors" ON public.blood_donors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own donor profile" ON public.blood_donors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own donor profile" ON public.blood_donors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own donor profile" ON public.blood_donors FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_blood_donors_updated_at BEFORE UPDATE ON public.blood_donors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Emergency contacts
CREATE TABLE public.emergency_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  relationship TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own emergency contacts" ON public.emergency_contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own emergency contacts" ON public.emergency_contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own emergency contacts" ON public.emergency_contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own emergency contacts" ON public.emergency_contacts FOR DELETE USING (auth.uid() = user_id);

-- Telemedicine sessions
CREATE TABLE public.telemedicine_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  doctor_name TEXT NOT NULL,
  specialty TEXT,
  session_type TEXT NOT NULL DEFAULT 'video',
  status TEXT NOT NULL DEFAULT 'scheduled',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  notes TEXT,
  prescription TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.telemedicine_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own sessions" ON public.telemedicine_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own sessions" ON public.telemedicine_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sessions" ON public.telemedicine_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sessions" ON public.telemedicine_sessions FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_telemedicine_sessions_updated_at BEFORE UPDATE ON public.telemedicine_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Health assessments for Preventive Healthcare
CREATE TABLE public.health_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  assessment_type TEXT NOT NULL,
  risk_level TEXT NOT NULL DEFAULT 'low',
  score INTEGER,
  answers JSONB,
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.health_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own assessments" ON public.health_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own assessments" ON public.health_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own assessments" ON public.health_assessments FOR DELETE USING (auth.uid() = user_id);
