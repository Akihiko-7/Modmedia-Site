import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idtajnzyikcrqqyeephb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdGFqbnp5aWtjcnFxeWVlcGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzExODEsImV4cCI6MjA1NjY0NzE4MX0.dmdooctqxdRcA3DkKXHo8T2jE69AFUpccrgpm7V73lI';
export const supabase = createClient(supabaseUrl, supabaseKey);