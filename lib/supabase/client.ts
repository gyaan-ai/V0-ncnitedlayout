import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton client for browser usage
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null

export function createClientComponentClient() {
  // Only create client on browser side
  if (typeof window === "undefined") {
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }

  return supabaseClient
}

// Named export for backward compatibility - this is what was missing!
export function createClient() {
  return createClientComponentClient()
}

// Default export for convenience
export default createClientComponentClient

// For backward compatibility
export const supabase = createClientComponentClient()
