import { neon } from "@neondatabase/serverless"
import { createClient } from "@supabase/supabase-js"

// Neon SQL client (existing functionality)
const sql = neon(process.env.SUPABASE_POSTGRES_URL!)

// Supabase client (missing export)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Keep the default export for backward compatibility
export default sql
