import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvjsuvrwtrfhucyllpjg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2anN1dnJ3dHJmaHVjeWxscGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDIzMzUsImV4cCI6MjA3MTExODMzNX0.Y_kUvcTIMb57RQ3XsyXqMzKqdbH_qGRCAPAdh5kpCag'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)