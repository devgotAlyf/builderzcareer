import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Prefer environment variables, but fall back to existing values to avoid breaking local dev
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://sponvnwslzfoswitogvf.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwb252bndzbHpmb3N3aXRvZ3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MDY1NzcsImV4cCI6MjEwMDE4MjU3N30.aaPXMYFMyZRaclto5dDHjwe1ZNi-WucPn86IaAPtjvk";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
