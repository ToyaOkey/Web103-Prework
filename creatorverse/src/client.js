import { createClient } from "@supabase/supabase-js";

const superbaseUrl="https://ompkgmgycmkltojttqsx.supabase.co"
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcGtnbWd5Y21rbHRvanR0cXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODEwMTYsImV4cCI6MjA2ODI1NzAxNn0.8bR0XLhUdsG-NkjaCOzYv0edz9wCuk0kwvhW4vT_5rQ"
export const supabase = createClient(superbaseUrl, API_KEY);
