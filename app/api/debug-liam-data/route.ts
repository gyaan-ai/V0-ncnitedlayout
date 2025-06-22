import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.SUPABASE_POSTGRES_URL!)

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const result = {
      tables_exist: {},
      profiles: null,
      athletes: null,
      api_response: null,
      errors: [],
    }

    // First, check what tables exist
    try {
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `
      result.tables_exist = {
        all_tables: tables.map((t) => t.table_name),
        has_profiles: tables.some((t) => t.table_name === "profiles"),
        has_athletes: tables.some((t) => t.table_name === "athletes"),
      }
    } catch (error) {
      result.errors.push(`Tables check error: ${error.message}`)
    }

    // Check profiles table only if it exists
    if (result.tables_exist.has_profiles) {
      try {
        const [profileResult] = await sql`
          SELECT 
            id,
            first_name,
            last_name,
            weight_class,
            high_school,
            college_committed,
            updated_at,
            user_type
          FROM profiles 
          WHERE LOWER(first_name) = 'liam'
            AND LOWER(last_name) = 'hickey'
            AND user_type = 'wrestler'
          ORDER BY updated_at DESC
          LIMIT 1
        `
        result.profiles = profileResult
      } catch (error) {
        result.errors.push(`Profiles query error: ${error.message}`)
      }
    } else {
      result.profiles = "TABLE_DOES_NOT_EXIST"
    }

    // Check athletes table only if it exists
    if (result.tables_exist.has_athletes) {
      try {
        const [athleteResult] = await sql`
          SELECT 
            id,
            first_name,
            last_name,
            weight_class,
            high_school,
            college_committed,
            updated_at,
            is_active
          FROM athletes 
          WHERE LOWER(first_name) = 'liam'
            AND LOWER(last_name) = 'hickey'
            AND is_active = true
          ORDER BY updated_at DESC
          LIMIT 1
        `
        result.athletes = athleteResult
      } catch (error) {
        result.errors.push(`Athletes query error: ${error.message}`)
      }
    } else {
      result.athletes = "TABLE_DOES_NOT_EXIST"
    }

    // Test the actual API
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

      const apiResponse = await fetch(`${baseUrl}/api/athletes/by-name?firstName=Liam&lastName=Hickey`, {
        headers: { "User-Agent": "Debug-Script" },
      })

      if (apiResponse.ok) {
        const apiData = await apiResponse.json()
        result.api_response = {
          ...apiData,
          source: apiData.id
            ? result.profiles?.id === apiData.id
              ? "profiles"
              : result.athletes?.id === apiData.id
                ? "athletes"
                : "unknown"
            : "no_data",
        }
      } else {
        result.errors.push(`API response error: ${apiResponse.status} ${apiResponse.statusText}`)
      }
    } catch (error) {
      result.errors.push(`API test error: ${error.message}`)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
