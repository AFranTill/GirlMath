import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://fklqqjwvfjjasthdayln.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrbHFxand2ZmpqYXN0aGRheWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Nzc2NzcsImV4cCI6MjA5MzI1MzY3N30.sFMfPIf3BxoUjHc8BUflI3D0qGYBgH1npNO2Az-aiqo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
