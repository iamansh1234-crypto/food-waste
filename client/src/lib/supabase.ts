import { createClient, SupabaseClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export function getStorageKey(meal: string, date: string) {
  return `attend_logs_${date}_${meal}`;
}