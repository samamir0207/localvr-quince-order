import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xecyvdkpiuteztnwcqvz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY3l2ZGtwaXV0ZXp0bndjcXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0Mzg1NjAsImV4cCI6MjA4NDAxNDU2MH0.JLXRPkI7G3Z2iF0k8TA4scivG2nCggae6XbMAT1TVW8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
