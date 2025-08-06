import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jrraitdsdntuowxiozlv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycmFpdGRzZG50dW93eGlvemx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTY1ODUsImV4cCI6MjA2OTc5MjU4NX0.uJYBY2B5JcKJyXC9AUevBb9ryKyrXFIly7Me_3SqhsE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
