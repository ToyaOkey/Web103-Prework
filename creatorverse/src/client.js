import { createClient } from "@supabase/supabase-js";

const superbaseUrl=import.meta.env.VITE_SUPABASE_URL
const API_KEY= import.meta.env.VITE_SUPABASE_ANON
export const supabase = createClient(superbaseUrl, API_KEY);
