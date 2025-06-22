import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_SUPABASE_URL!, process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!)

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const result = {
      connection_test: null,
      tables: [],
      athletes_data: [],
      profiles_data: [],
      liam_search: null,
      errors: [],
    }

    // Test basic connection
    try {
      const { data, error } = await supabase.from("athletes").select("count").limit(1)
      if (error) {
        result.errors.push(`Connection test failed: ${error.message}`)
      } else {
        result.connection_test = "SUCCESS"
      }
    } catch (error) {
      result.errors.push(`Connection test error: ${error.message}`)
    }

    // Get all tables
    try {
      const { data: tables, error } = await supabase.rpc("get_table_names")
      if (error) {
        // Fallback: try to query known tables
        const knownTables = ["athletes", "profiles", "logo_library"]
        for (const table of knownTables) {
          try {
            const { data, error } = await supabase.from(table).select("*").limit(1)
            if (!error) {
              result.tables.push(table)
            }
          } catch (e) {
            // Table doesn't exist
          }
        }
      } else {
        result.tables = tables
      }
    } catch (error) {
      result.errors.push(`Tables query error: ${error.message}`)
    }

    // Check athletes table
    try {
      const { data: athletes, error } = await supabase.from("athletes").select("*").limit(10)

      if (error) {
        result.errors.push(`Athletes query error: ${error.message}`)
      } else {
        result.athletes_data = athletes || []
      }
    } catch (error) {
      result.errors.push(`Athletes table error: ${error.message}`)
    }

    // Check profiles table
    try {
      const { data: profiles, error } = await supabase.from("profiles").select("*").limit(10)

      if (error) {
        result.errors.push(`Profiles query error: ${error.message}`)
      } else {
        result.profiles_data = profiles || []
      }
    } catch (error) {
      result.errors.push(`Profiles table error: ${error.message}`)
    }

    // Search for Liam specifically
    try {
      // Try athletes table
      const { data: liamAthletes, error: athleteError } = await supabase
        .from("athletes")
        .select("*")
        .ilike("first_name", "%liam%")

      // Try profiles table
      const { data: liamProfiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .ilike("first_name", "%liam%")

      result.liam_search = {
        athletes: liamAthletes || [],
        profiles: liamProfiles || [],
        athlete_error: athleteError?.message,
        profile_error: profileError?.message,
      }
    } catch (error) {
      result.errors.push(`Liam search error: ${error.message}`)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Supabase debug error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
