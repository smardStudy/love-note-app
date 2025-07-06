import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tpbllbtmdowtafhejnzu.supabase.co'; // replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwYmxsYnRtZG93dGFmaGVqbnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDMwODQsImV4cCI6MjA2NzMxOTA4NH0.jr7cYlbwL95W1UCm8GLMMZUSY3nsfnncB4NgOO8lTZo'; // replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey);


