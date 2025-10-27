import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Prefer environment variables, but fall back to existing values to avoid breaking local dev
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://uawswmqbjyzhekqfjwsb.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhd3N3bXFianl6aGVrcWZqd3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzY4NzksImV4cCI6MjA3MTExMjg3OX0.npjx3LqnIhDcEj7QI4WM39_9hIMT_pVxzxiHV8u_RHQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});