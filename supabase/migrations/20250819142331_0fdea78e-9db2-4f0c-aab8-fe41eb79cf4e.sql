-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS job_alerts_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS preferred_location TEXT,
ADD COLUMN IF NOT EXISTS preferred_salary_min INTEGER,
ADD COLUMN IF NOT EXISTS preferred_job_types TEXT[];